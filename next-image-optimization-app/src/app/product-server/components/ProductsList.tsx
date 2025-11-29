// components/ProductsList.tsx
import SmartImage from './SmartImage'

export default function ProductsList({ products }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p: any) => (
        <div key={p.id} className="p-4 shadow rounded-xl bg-white">
          <SmartImage
            src={p.src}
            blur={p.blur}
            width={600}
            height={600}
            alt={p.title}
          />

          <h2 className="mt-2 font-semibold">{p.title}</h2>
          <p className="text-gray-600">${p.price}</p>
        </div>
      ))}
    </div>
  )
}
