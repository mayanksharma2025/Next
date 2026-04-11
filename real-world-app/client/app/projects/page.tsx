import Image from "next/image";

async function getProducts() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products", {
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.slice(0, 12).map((p: any) => (
        <div key={p.id} className="aspect-[3/3]">
          <Image
            src={p.images[0]}
            alt={p.title}
            priority={p.id === 13 ? true : false}
            width={200}
            height={200}
            className="w-full h-auto"
            // unoptimized
          />
          <h2>{p.title}</h2>
        </div>
      ))}
    </div>
  );
}
