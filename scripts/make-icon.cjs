const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const svgPath = path.join(__dirname, '..', 'public', 'icon.svg')
const publicDir = path.join(__dirname, '..', 'public')

async function main() {
  const pngToIco = (await import('png-to-ico')).default
  const svg = fs.readFileSync(svgPath)

  // App icon (256px → PNG + ICO for Electron)
  const png256 = await sharp(svg).resize(256, 256).png().toBuffer()
  fs.writeFileSync(path.join(publicDir, 'icon.png'), png256)
  console.log('icon.png (256x256)')

  const icoBuf = await pngToIco([png256])
  fs.writeFileSync(path.join(publicDir, 'icon.ico'), icoBuf)
  console.log('icon.ico')

  // PWA icons
  const png192 = await sharp(svg).resize(192, 192).png().toBuffer()
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192)
  console.log('icon-192.png')

  const png512 = await sharp(svg).resize(512, 512).png().toBuffer()
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512)
  console.log('icon-512.png')
}

main().catch((err) => {
  console.error('Failed:', err.message)
  process.exit(1)
})
