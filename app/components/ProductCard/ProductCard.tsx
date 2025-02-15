'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../common/Button/Button';

interface ProductDetailCardProps {
  id: string;
  image: string;
  price: string;
  description: string;
  location: string;
  whatsappLink: string;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ id, image, price, description, location, whatsappLink }) => {
  return (
    <Link href={`/products/${id}`} className="block h-full">
      <div className="max-w-full sm:max-w-sm h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col">
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            className="object-cover transition-transform duration-300 hover:scale-105"
            src={image}
            alt="Property"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 384px"
          />
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white px-2 sm:px-3 py-1 rounded-full shadow-md">
            <span className="font-bold text-gray-800 text-sm sm:text-base">{price}</span>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-3 sm:py-4 flex-1">
          <p className="text-gray-800 text-lg font-semibold mb-3 line-clamp-2">{description}</p>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <p className="text-gray-600 text-sm">{location}</p>
          </div>
        </div>

        <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 mt-auto">
          <Button
            onClick={() => {
              window.open(whatsappLink, '_blank');
            }}
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
    </Link>
  );
};

export default ProductDetailCard;
