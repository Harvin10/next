import React from 'react'

interface Props {
  params: {
    id: string;
  }
}

const ProductDetail = ({ params }: Props) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Product Details - {params.id}</h1>
      {/* Product details content will go here */}
    </div>
  )
}

export default ProductDetail
