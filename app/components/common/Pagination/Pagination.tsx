'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-8" aria-label="Pagination">
      <ul className="flex justify-center gap-2">
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded disabled:opacity-0 bg-gray-200 text-[#b22222] hover:bg-gray-300"
            aria-label="Previous page"
          >
            ←
          </button>
        </li>
        {[...Array(totalPages)].map((_, i) => {
          const pageNumber = i + 1;
          return (
            <li key={`page-${pageNumber}`}>
              <button
                onClick={() => onPageChange(pageNumber)}
                className={`px-4 py-2 rounded ${
                  currentPage === pageNumber 
                    ? 'bg-[#b22222] hover:bg-[#8b1a1a] text-white' 
                    : 'bg-gray-200 text-[#b22222] hover:bg-gray-300 hover:text-[#8b1a1a]'
                }`}
                aria-current={currentPage === pageNumber ? 'page' : undefined}
                aria-label={`Page ${pageNumber}`}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded disabled:opacity-0 bg-gray-200 text-[#b22222] hover:bg-gray-300"
            aria-label="Next page"
          >
            →
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
