import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

const ProductDetail = ({ params }: Props) => {
  return (
    <div>Product ID: {params.id}</div>
  );
};

export default ProductDetail;
