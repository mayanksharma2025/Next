import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const images = [
  // Load from the api, not manual list
]

async function loadImages() {
  const api = await fetch('http://localhost:3000/api/images')
  return await api.json()
}

async function run() {
  const imgs = await loadImages()
  const outputDir = './public/gallery'

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir)

  for (const img of imgs) {
    const base = img.public_id.split('/').pop()

    // AVIF
    const avif = `${img.url.replace(/\.jpg|\.png|\.jpeg/, '.avif')}`
    const avifRes = await fetch(avif)
    fs.writeFileSync(
      path.join(outputDir, `${base}.avif`),
      Buffer.from(await avifRes.arrayBuffer())
    )

    // WebP
    const webp = `${img.url.replace(/\.jpg|\.png|\.jpeg/, '.webp')}`
    const webpRes = await fetch(webp)
    fs.writeFileSync(
      path.join(outputDir, `${base}.webp`),
      Buffer.from(await webpRes.arrayBuffer())
    )
  }
}

run()
