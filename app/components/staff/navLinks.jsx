'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { BookOpenIcon, DocumentTextIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import { ArrowsRightLeftIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid'
import { ComputerDesktopIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function NavLinks({ linkText }) {
    if (linkText === 'Dashboard' ) {
      return (
        <li className='content-center pl-2 pt-1 pb-1 mb-2 '>
          <button href="/staff/dashboard" className="flex hover:text-blue-600 active:underline transition hover:transition duration-300 hover:translate-x-5 cursor-pointer">
            <ComputerDesktopIcon className="size-6 mr-1" />
            { linkText }
          </button>
        </li>
      )
    } else if (linkText === 'Member' ) {
      return (
        <li className='content-center pl-2 pt-1 pb-1 mb-2'>
          <div className='flex text-gray-500'>
          <UserGroupIcon className="size-6 mr-1" />
          { linkText }
          </div>
         <div className="flex pe-10 justify-center">
          <ul className="grid gap-2">
            <li className="flex">
              <button href="/staff/member/add" className="flex hover:text-blue-600 active:underline transition hover:transition duration-300 hover:translate-x-2 cursor-pointer">
                <PlusIcon className="size-6 mr-1" />
                Add
              </button>
            </li>
            <li className="flex">
              <button href="/staff/member/delete" className="flex hover:text-blue-600 active:underline transition hover:transition duration-300 hover:translate-x-2 cursor-pointer">
                <MinusIcon className="size-6 mr-1" />
                Delete
              </button>
            </li>
            <li className='flex'>
              <button href="/staff/member/search" className="flex hover:text-blue-600 active:underline transition hover:transition duration-300 hover:translate-x-2 cursor-pointer">
                <MagnifyingGlassIcon className="size-6 mr-1" />
                Search
              </button>
            </li>
          </ul>
          </div> 
        </li>
      )
    } else if (linkText === 'Book' ) {
      return (
        <li className='content-center pl-2 pt-1 pb-1 mb-2'>
          <div className='flex text-gray-500'>
          <BookOpenIcon className="size-6 mr-1" />
          { linkText }
          </div>
         <div className="flex pe-10 justify-center">
          <ul className="grid gap-2">
            <li className="flex">
              <button href="/staff/member/add" className="flex hover:text-blue-600 active:underline transition hover:transition duration-300 hover:translate-x-2 cursor-pointer">
                <PlusIcon className="size-6 mr-1" />
                Add
              </button>
            </li>
            <li className="flex">
              <button href="/staff/member/delete" className="flex hover:text-blue-600 active:underline transition hover:transition duration-300 hover:translate-x-2 cursor-pointer">
                <MinusIcon className="size-6 mr-1" />
                Delete
              </button>
            </li>
            <li className='flex'>
              <button href="/staff/member/search" className="flex hover:text-blue-600 active:underline transition hover:transition duration-300 hover:translate-x-2 cursor-pointer">
                <MagnifyingGlassIcon className="size-6 mr-1" />
                Search
              </button>
            </li>
          </ul>
          </div> 
        </li>
      )
    } else if (linkText === 'Search' ) {
      return (
        <li className='content-center pl-2 pt-1 pb-1 mb-2 hover:text-blue-600 transition hover:transition duration-300 hover:translate-x-5'>
          <Link href="/staff/search" className="flex active:underline">
          <MagnifyingGlassIcon className="size-6 mr-1" />
          { linkText }
          </Link>
        </li>
      )
    } else if (linkText === 'Transaction' ) {
      return (
      <li className='content-center pl-2 pt-1 pb-1 mb-2'>
          <div className='flex text-gray-500'>
          <ArrowsRightLeftIcon className="size-6 mr-1" />
          { linkText }
          </div>
         <div className="flex pe-10 justify-center">
          <ul className="grid gap-2">
            <li className="flex">
              <button href="/staff/member/add" className="flex hover:text-blue-600 active:underline transition hover:transition duration-300 hover:translate-x-2 cursor-pointer">
                <PlusIcon className="size-6 mr-1" />
                Add
              </button>
            </li>
            <li className="flex">
              <button href="/staff/member/delete" className="flex hover:text-blue-600 active:underline transition hover:transition duration-300 hover:translate-x-2 cursor-pointer">
                <MinusIcon className="size-6 mr-1" />
                Delete
              </button>
            </li>
            <li className='flex'>
              <button href="/staff/member/search" className="flex hover:text-blue-600 active:underline transition hover:transition duration-300 hover:translate-x-2 cursor-pointer">
                <MagnifyingGlassIcon className="size-6 mr-1" />
                Search
              </button>
            </li>
          </ul>
          </div> 
        </li>
      )
    } else if (linkText === 'Report' ) {
      return (
        <li className='content-center pl-2 pt-1 pb-1 mb-2 hover:text-blue-600 transition hover:transition duration-300 hover:translate-x-5'>
          <Link href="/staff/report" className="flex active:underline">
          <DocumentTextIcon className="size-6 mr-1" />
          { linkText }
          </Link>
        </li>
      )
    } else if (linkText === 'Logout' ) {
      return (
        <li className='content-center pl-2 pt-1 pb-1 mb-2 hover:text-blue-600 transition hover:transition duration-300 hover:translate-x-5'>
          <Link href="/logout" className="flex active:underline">
          <ArrowLeftEndOnRectangleIcon className="size-6 mr-1" />
          { linkText }
          </Link>
        </li>
      )
    }
}