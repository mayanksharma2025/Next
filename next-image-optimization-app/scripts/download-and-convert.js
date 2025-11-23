const fetch = require('node-fetch')
const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')

const outDir = path.join(process.cwd(), 'public', 'images')

const cloudinaryUrls = [
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1756136747/hleyh3rsayocytxkmgw6.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1756136791/onrh2qi3mmcmlt9qzkyf.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1755997759/wxjtxjpuizba3bahb4es.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1755995337/b9jmx254ae2vdayygffp.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1755861810/kjbx9e92k2stfxhj5khe.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1755861662/llolkfj6kauoo02ixkb5.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1755861659/raixnb3zqctoomksbvf9.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1755773019/uwvrttbhfnkxmy2souhp.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1755773005/rqftbg90cixkuoffnxnn.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1750006203/r1jtkohyv2ifwcndl4vv.jpg',
]

async function download(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed: ${url}: ${res.status}`)
  const buffer = await res.buffer()
  await fs.outputFile(dest, buffer)
}

async function convertAll() {
  await fs.remove(outDir)
  await fs.ensureDir(outDir)

  for (const url of cloudinaryUrls) {
    try {
      const file = path.basename(new URL(url).pathname)
      const base = file.replace(/\.[^/.]+$/, '')

      const jpg = path.join(outDir, `${base}.jpg`)
      const webp = path.join(outDir, `${base}.webp`)
      const avif = path.join(outDir, `${base}.avif`)

      console.log('Downloading →', url)
      await download(url, jpg)

      console.log('Converting →', base)
      await sharp(jpg).webp({ quality: 75 }).toFile(webp)
      await sharp(jpg).avif({ quality: 60 }).toFile(avif)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  console.log('Done → Saved in /public/images')
}

convertAll().catch((e) => {
  console.error(e)
  process.exit(1)
})
