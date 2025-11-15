import { cookies } from 'next/headers'

type Product = {
  id: number
  title: string
  price: number
  description: string
}
// Default its SSG
// cache: 'no-store' then SSR
//  next: { revalidate: 60 } then ISR

export default async function ProductsPage() {
  const productsResponse = await fetch('http://localhost:3001/products', {
    // cache: 'no-store', dont add this line its totally opposite...
    next: { revalidate: 60 },
  })
  const cookieStore = cookies()
  cookieStore.get('theme')
  const theme = cookieStore.get('theme')
  console.log({ theme })
  const detailsResponse = await fetch('http://localhost:3001/products/1')
  const details = await detailsResponse.json()
  const products = await productsResponse.json()
  return (
    <ul className="space-y-6 p-4">
      {products.map((product: Product) => (
        <li
          key={product.id}
          className="p-4  bg-white shadow-md rounded-lg text-gray-700"
        >
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p>{product.description}</p>
          <p className="text-lg font-medium">${product.price}</p>
          <p>{details.title}</p>
        </li>
      ))}
    </ul>
  )
}
