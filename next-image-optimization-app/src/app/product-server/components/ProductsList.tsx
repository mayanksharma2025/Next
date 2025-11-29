// app/products/components/ProductsList.tsx
import SmartImage from './SmartImage'
import { shimmer, toBase64 } from '../lib/shimmer'

interface Product {
  id: number
  src: string
  width: number
  height: number
  title?: string
  price?: number
  category?: string
  description?: string
  blur?: string
}

interface Props {
  products: Product[]
}

export default function ProductsList({ products }: Props) {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No products found.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {products.map((p) => {
        // create an SSR blurDataURL using svg shimmer
        const blurDataURL = `data:image/svg+xml;base64,${toBase64(
          shimmer(p.width || 600, p.height || 600)
        )}`

        return (
          <div
            key={p.id}
            className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <SmartImage
              src={p.src}
              width={p.width || 600}
              height={p.height || 600}
              blurDataURL={blurDataURL}
              alt={p.title ?? ''}
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-gray-500 text-sm">{p.category}</p>
              <p className="mt-2 font-bold text-blue-600">${p.price}</p>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {p.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
