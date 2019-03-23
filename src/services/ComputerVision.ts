import { Service } from '@tsed/di'
import * as path from 'path'
import classNames from '../util/classNames'
import Item from '../models/Item'
import Position from '../models/Position'
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

  analyze (filename: string): Array<Item> {
    const fullPath = path.join(this.filePath, filename)

    const img = cv.imread(fullPath)

    const blob = this.process(img)

    return this.extract(blob, img)
      .filter((item: Item) => item.confidence >= this.requiredConfidence)
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

  private extract (blob: any, img: any): Array<Item> {
    return Array(blob.rows).fill(0)
    .map((res, i) => {
      const classLabel = blob.at(i, 1)
      const confidence = blob.at(i, 2)

      const bottomLeft = new cv.Point(
        blob.at(i, 3) * img.cols,
        blob.at(i, 6) * img.rows
      )

      const topRight = new cv.Point(
        blob.at(i, 5) * img.cols,
        blob.at(i, 4) * img.rows
      )

      const x = bottomLeft.x
      const y = topRight.y
      const width = topRight.x - bottomLeft.x
      const height = bottomLeft.y - topRight.y

      return ({
        confidence,
        type: this.classMappings[classNames[classLabel]],
        position: { x, y },
        size: { width, height }
      }) as Item
    })
  }

  private createNet () {
    const modelPath = ('./models')

    const prototxt = path.resolve(modelPath, 'deploy.prototxt')
    const modelFile = path.resolve(modelPath, 'VGG_coco_SSD_300x300_iter_400000.caffemodel')

    return cv.readNetFromCaffe(prototxt, modelFile)
  }
}
