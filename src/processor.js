const cv = require('./cv')
const net = require('./net')
const classNames = require('./classNames')

function extractResults (outputBlob) {
  return Array(outputBlob.rows).fill(0)
    .map((res, i) => {
      const classLabel = outputBlob.at(i, 1)
      const confidence = outputBlob.at(i, 2)

      return ({
        classLabel,
        confidence
      })
    })
}

function handleImage (img) {
  const imgResized = img.resize(300, 300)

  const inputBlob = cv.blobFromImage(imgResized)
  net.setInput(inputBlob)

  let outputBlob = net.forward()

  outputBlob = outputBlob.flattenFloat(
    outputBlob.sizes[2],
    outputBlob.sizes[3]
  )

  return extractResults(outputBlob)
    .map(r => Object.assign({}, r, { className: classNames[r.classLabel] }))
}

function process (imagePath) {
  const img = cv.imread(imagePath)

  return handleImage(img)
}

module.exports = { process }
