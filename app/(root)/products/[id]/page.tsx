'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '../../../components/common/Button/Button'; // Import the Button component

interface Props {
  params: {
    id: string;
  };
}

const ProductDetail = ({ params }: Props) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <Image
          src={product.image}
          alt={product.description}
          width={500}
          height={300}
          className="w-full md:w-1/2 rounded-lg shadow-md mb-4 md:mb-0 md:mr-8"
        />
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product.description}</h1>
          <p className="text-gray-700 mb-4">{product.location}</p>
          <p className="text-xl font-semibold mb-4">Price: {product.price}</p>
          <div className="mb-4">
            <p className="font-semibold">Property Type: {product.propertyType}</p>
            <p>Bedrooms: {product.bedrooms}</p>
            <p>Bathrooms: {product.bathrooms}</p>
            <p>Square Footage: {product.squareFootage} sqft</p>
            <p>Year Built: {product.yearBuilt}</p>
          </div>
          <Button
            onClick={() => router.push(product.whatsappLink)}
            variant="primary"
            className="w-full"
            bgColor="#4CAF50"
            textColor="white"
            icon={
              <Image
                src="/images/whatsapp-icon.png"
                alt="WhatsApp"
                width={18}
                height={18}
                className="w-[18px] h-[18px] sm:w-5 sm:h-5"
              />
            }
          >
            <span className="whitespace-nowrap">
              <span className="hidden sm:inline">Contact via </span>
              WhatsApp
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
