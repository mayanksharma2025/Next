import { Metadata } from 'next'

type Props = {
  params: { productId: string }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { productId } = params
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(productId)
    }, 1000)
  })

  return {
    title: `Product ${title} page`,
  }
}

export default function ProductDetails({ params }: Props) {
  // console.log('productId', params.productId)
  return <h1>Details about product {params.productId}</h1>
}
