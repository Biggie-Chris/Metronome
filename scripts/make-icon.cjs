const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const svgPath = path.join(__dirname, '..', 'public', 'icon.svg')
const pngPath = path.join(__dirname, '..', 'public', 'icon.png')
const icoPath = path.join(__dirname, '..', 'public', 'icon.ico')

async function main() {
  const pngToIco = (await import('png-to-ico')).default
  const svg = fs.readFileSync(svgPath)

  const pngBuf = await sharp(svg).resize(256, 256).png().toBuffer()
  fs.writeFileSync(pngPath, pngBuf)
  console.log('icon.png generated')

  const icoBuf = await pngToIco([pngBuf])
  fs.writeFileSync(icoPath, icoBuf)
  console.log('icon.ico generated')
}

main().catch((err) => {
  console.error('Failed to generate icon:', err.message)
  process.exit(1)
})
