import Link from 'next/link'

export default async function Blog() {
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve('all blog posts')
    }, 2000)
  })
  return (
    <div>
      <Link href={`/blog/first`}>First Page</Link>
      <h1>My blog post count - {response as string}</h1>
    </div>
  )
}
