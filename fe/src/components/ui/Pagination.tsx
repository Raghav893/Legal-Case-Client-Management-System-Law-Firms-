import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
      <button 
        disabled={currentPage === 0} 
        onClick={() => onPageChange(currentPage - 1)}
        style={{ padding: '4px 8px', border: '1px solid var(--border)', borderRadius: '2px', backgroundColor: 'var(--surface)' }}
      >
        Prev
      </button>
      <span style={{ padding: '8px' }}>
        {currentPage + 1} / {totalPages}
      </span>
      <button 
        disabled={currentPage === totalPages - 1} 
        onClick={() => onPageChange(currentPage + 1)}
        style={{ padding: '4px 8px', border: '1px solid var(--border)', borderRadius: '2px', backgroundColor: 'var(--surface)' }}
      >
        Next
      </button>
    </div>
  );
}
