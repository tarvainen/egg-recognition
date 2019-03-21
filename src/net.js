const path = require('path')
const fs = require('fs')
const cv = require('./cv')

const modelPath = path.resolve('./models')

if (!fs.existsSync(modelPath)) {
  throw new Error(`Model directory not found at ${modelPath}!`)
}

const prototxt = path.resolve(modelPath, 'deploy.prototxt')
const modelFile = path.resolve(modelPath, 'VGG_coco_SSD_300x300_iter_400000.caffemodel')

module.exports = cv.readNetFromCaffe(prototxt, modelFile)
