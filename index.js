const fs = require('fs')
const processor = require('./src/processor')

const [, , imagePath] = process.argv

if (!fs.existsSync(imagePath)) {
  throw new Error(`Image ${imagePath} does not exist!`)
}

const requiredConfidence = 0.15

// Map some values to eggs and chickens
const classMappings = {
  'sports ball': 'egg',
  'apple': 'egg',
  'orange': 'egg',
  'frisbee': 'egg',
  'person': 'chicken'
}

const results = processor.process(imagePath)
  .filter(result => !!classMappings[result.className])

const output = results.map(
  item => ({
    type: classMappings[item.className],
    looksLike: item.className,
    sure: item.confidence > requiredConfidence
  })
)

// Just print out results for now
console.log(output.filter(o => o.sure))
