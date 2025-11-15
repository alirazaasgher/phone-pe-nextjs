'use client';
import { useMemo } from 'react';
import PhoneCard from '../components/PhoneCard';
import ResultsHeader from '../components/ResultsHeader';
import ActiveFilters from '../components/ActiveFilters';
import Link from 'next/link';
const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-10 text-center">
    <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h3l2-2h4l2 2h3a2 2 0 012 2v12a2 2 0 01-2 2z" />
      </svg>
    </div>
    <h4 className="text-lg font-medium text-gray-800">{message}</h4>
    <p className="text-gray-500">Try adjusting your filters or check back later.</p>
  </div>
);

export default function ClientPhoneGrid({ phones, filters, parsed }) {
  return (
    <div className='p-4'>
    <div className="bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex text-sm text-gray-500 space-x-2">
                <span><Link href= "/">Home</Link></span>
                <span className="text-gray-400">›</span>
                <span>Mobiles</span>
                <span className="text-gray-400">›</span>
                </nav>
            </div>
          </div>
        </div>
      </div>
      <ResultsHeader filters={filters} filteredResults="0" trending={[]} parsed={parsed} />
      <ActiveFilters filters={filters} parsed={parsed} />

      {phones.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {phones.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <EmptyState message="No phones found." />
        </div>
      )}
    </div>

  );
}
