import SmartImage from '../../products/SmartImage'

export default function ProductCard({ product }: any) {
  return (
    <div className="rounded-xl border p-4 bg-white shadow-sm">
      <SmartImage
        src={product.thumbnail}
        width={300}
        height={300}
        blurDataURL={product.blur}
        alt={product.title}
      />

      <h2 className="font-semibold text-lg mt-3">{product.title}</h2>

      <p className="text-sm text-gray-500 line-clamp-2">
        {product.description}
      </p>

      <div className="flex justify-between mt-3 font-medium">
        <span>${product.price}</span>
        <span>⭐ {product.rating}</span>
      </div>
    </div>
  )
}
