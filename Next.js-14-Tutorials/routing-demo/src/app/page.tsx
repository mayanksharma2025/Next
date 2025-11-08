import Link from 'next/link'

import { getUser } from './_lib/helper'

export default function Home() {
  console.log('user', getUser('user-1'))
  console.log('Resolved:', require.resolve('./_lib/helper'))
  return (
    <div className=" space-x-3">
      <h1>Welcome home!</h1>
      <Link href="/blog">Blog</Link> &nbsp;
      <Link href="/products">Products</Link>&nbsp;
      <Link href="/news">News</Link>&nbsp;
      {/* {JSON.stringify(getUser('user-1'))} */}
    </div>
  )
}
