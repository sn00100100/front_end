'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { BookOpenIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid'
import { ComputerDesktopIcon, } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function MemberNavLinks({ linkText }) {
    if (linkText === 'Home' ) {
      return (
        <li className='content-center pl-2 pt-1 pb-1 mb-2'>
          <Link href="/member/home">
            <button className="flex hover:text-blue-600 active:underline transition hover:transition duration-300 hover:translate-x-5 cursor-pointer">
              <ComputerDesktopIcon className="size-6 mr-1" />
              { linkText }
          </button>
          </Link>
        </li>
      )
    } else if (linkText === 'Catalog' ) {
      return (
        <li className='content-center pl-2 pt-1 pb-1 mb-2'>
          <Link href="/member/catalog">
          <button href='@/app/staff/catalog' className="flex hover:text-blue-600 active:underline transition hover:transition duration-300 hover:translate-x-5 cursor-pointer">
            <BookOpenIcon className="size-6 mr-1" />
            { linkText }
          </button>
          </Link>
        </li>
      )
    } else if (linkText === 'Overdue Fees' ) {
      return (
        <li className='content-center pl-2 pt-1 pb-1 mb-2'>
          <button href="/member/catalog" className="flex hover:text-blue-600 active:underline transition hover:transition duration-300 hover:translate-x-5 cursor-pointer">
            <CurrencyDollarIcon className="size-6 mr-1" />
            { linkText }
            </button>
        </li>
      )
    } else if (linkText === 'Search' ) {
      return (
        <li className='content-center pl-2 pt-1 pb-1 mb-2 hover:text-blue-600 transition hover:transition duration-300 hover:translate-x-5'>
          <button href="/member/search" className="flex hover:text-blue-600 active:underline transition hover:transition duration-300 hover:translate-x-5 cursor-pointer">
            <MagnifyingGlassIcon className="size-6 mr-1" />
            { linkText }
            </button>
        </li>
      )
    } else if (linkText === 'Logout' ) {
      return (
        <li className='content-center pl-2 pt-1 pb-1 mb-2 hover:text-blue-600 transition hover:transition duration-300 hover:translate-x-5'>
          <Link href="/login" className="flex active:underline">
          <ArrowLeftEndOnRectangleIcon className="size-6 mr-1" />
          { linkText }
          </Link>
        </li>
      )
    }
}