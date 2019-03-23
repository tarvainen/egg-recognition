import { Service } from '@tsed/di'
import * as path from 'path'
import classNames from '../util/classNames'
const cv = require('/usr/lib/node_modules/opencv4nodejs')

@Service()
export default class ComputerVision {

  private requiredConfidence: number = 0.15

  private filePath: string = `${process.cwd()}/.tmp/`

  private classMappings: any = {
    'sports ball': 'egg',
    'apple': 'egg',
    'orange': 'egg',
    'frisbee': 'egg',
    'person': 'chicken'
  }

  private net: any = null

  constructor () {
    this.net = this.createNet()
  }

  analyze (filename: string): any {
    const fullPath = path.join(this.filePath, filename)

    const img = cv.imread(fullPath)

    const blob = this.process(img)

    const objects = this.extract(blob)
      .map(result => ({ ...result, className: classNames[result.classLabel] }))
      .filter((result: any): boolean => !!this.classMappings[result.className])

    const output = objects.map(
      (item: any) => ({
        type: this.classMappings[item.className],
        looksLike: item.className,
        sure: item.confidence > this.requiredConfidence
      })
    )

    return output.filter((o: any): boolean => o.sure)
  }

  private process (img: any) {
    const imgResized = img.resize(300, 300)

    const inputBlob = cv.blobFromImage(imgResized)
    this.net.setInput(inputBlob)

    let outputBlob = this.net.forward()

    outputBlob = outputBlob.flattenFloat(
      outputBlob.sizes[2],
      outputBlob.sizes[3]
    )

    return outputBlob
  }

  private extract (blob: any) {
    return Array(blob.rows).fill(0)
    .map((res, i) => {
      const classLabel = blob.at(i, 1)
      const confidence = blob.at(i, 2)

      return ({
        classLabel,
        confidence
      })
    })
  }

  private createNet () {
    const modelPath = ('./models')

    const prototxt = path.resolve(modelPath, 'deploy.prototxt')
    const modelFile = path.resolve(modelPath, 'VGG_coco_SSD_300x300_iter_400000.caffemodel')

    return cv.readNetFromCaffe(prototxt, modelFile)
  }
}
