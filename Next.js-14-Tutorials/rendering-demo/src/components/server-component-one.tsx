import fs from 'fs'

export const ServerComponentOne = ({ cb }: { cb: Function }) => {
  const file = fs.readFileSync(
    'src/components/server-component-one.tsx',
    'utf-8'
  )
  cb(file)
  // console.log({ file })
  return <h1>{file}</h1>
}
