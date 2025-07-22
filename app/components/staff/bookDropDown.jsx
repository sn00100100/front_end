'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

export default function BookDropDown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <li 
      className="flex relative pl-2 pt-1 pb-1 hover:bg-blue-100"
    >
      <button
        onClick={toggleDropdown}
        className="flex w-full content-center"
      >
        <BookOpenIcon className="size-6 mr-1" />
        Book 
        { isOpen ? <ChevronDownIcon className="size-6 mr-1" /> : <ChevronLeftIcon className="size-6 mr-1" /> }
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg py-1 z-10 border">
          <Link href="/search" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
            Add 
          </Link>
          <Link href="/search" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
            Delete
          </Link>
          <Link href="/search" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
            Search
          </Link>
          {/* Add more menu items as needed */}
        </div>
      )}
    </li>
  );
}