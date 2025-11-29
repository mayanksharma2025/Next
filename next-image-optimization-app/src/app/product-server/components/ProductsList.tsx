// app/components/ProductsList.tsx
import Image from 'next/image'

interface Product {
  id: number
  src: string
  width: number
  height: number
  title: string
  price: number
  category: string
  description: string
}

interface ProductsListProps {
  products: Product[]
}

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >
          <div className="relative w-full aspect-square bg-gray-200">
            <Image
              src={p.src}
              alt={p.title}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={p.src}
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg">{p.title}</h3>
            <p className="text-gray-500 text-sm">{p.category}</p>
            <p className="mt-2 font-bold text-blue-600">${p.price}</p>
            <p className="text-gray-600 text-sm mt-1">{p.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
