import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products Page',
  description: 'This is my all the products from this page',
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // const productsResponse = await fetch("http://localhost:3001/products");
  // const products = await productsResponse.json();
  // console.log({ products });
  return <div className="bg-green-300 h-full">{children}</div>
}
