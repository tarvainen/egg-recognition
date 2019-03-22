
import { Service } from '@tsed/di'
const processor = require('../processor')

@Service()
export class ImageAnalyzer {
  analyze (filename: string) {
    const requiredConfidence = 0.15

    const fullPath = `${process.cwd()}/.tmp/${filename}`

    // Map some values to eggs and chickens
    const classMappings: any = {
      'sports ball': 'egg',
      'apple': 'egg',
      'orange': 'egg',
      'frisbee': 'egg',
      'person': 'chicken'
    }

    const results = processor.process(fullPath)
      .filter((result: any): boolean => !!classMappings[result.className])

    const output = results.map(
      (item: any) => ({
        type: classMappings[item.className],
        looksLike: item.className,
        sure: item.confidence > requiredConfidence
      })
    )

    return output.filter((o: any): boolean => o.sure)
  }
}
