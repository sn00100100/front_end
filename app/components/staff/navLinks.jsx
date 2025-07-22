'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { BookOpenIcon, DocumentTextIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import { ArrowsRightLeftIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid'
import { ComputerDesktopIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation' 

export default function NavLinks({ linkText }) {
    if (linkText === 'Dashboard' ) {
      return (
        <li className='content-center pl-2 pt-1 pb-1 mb-2 hover:bg-blue-100'>
          <Link href="/staff/dashboard" className="flex active:underline">
          <ComputerDesktopIcon className="size-6 mr-1" />
          { linkText }
          </Link>
        </li>
      )
    } else if (linkText === 'Member' ) {
      return (
        <li className='content-center pl-2 pb-1 pt-1 mb-2 hover:bg-blue-100'>
          <Link href="/staff/member" className="flex active:underline">
          <UserGroupIcon className="size-6 mr-1" />
          { linkText }
          </Link>
        </li>
      )
    } else if (linkText === 'Book' ) {
      return (
        <li className='content-center pl-2 pb-1 pt-1 mb-2 hover:bg-blue-100'>
          <Link href="/staff/book" className="flex active:underline">
          <BookOpenIcon className="size-6 mr-1" />
          { linkText }
          </Link>
        </li>
      )
    } else if (linkText === 'Search' ) {
      return (
        <li className='content-center pl-2 pb-1 pt-1 mb-2 hover:bg-blue-100'>
          <Link href="/staff/search" className="flex active:underline">
          <MagnifyingGlassIcon className="size-6 mr-1" />
          { linkText }
          </Link>
        </li>
      )
    } else if (linkText === 'Transaction' ) {
      return (
        <li className='content-center pl-2 pb-1 pt-1 mb-2 hover:bg-blue-100'>
          <Link href="/staff/transaction" className="flex active:underline">
          <ArrowsRightLeftIcon className="size-6 mr-1" />
          { linkText }
          </Link>
        </li>
      )
    } else if (linkText === 'Report' ) {
      return (
        <li className='content-center pl-2 pb-1 pt-1 hover:bg-blue-100'>
          <Link href="/staff/report" className="flex active:underline">
          <DocumentTextIcon className="size-6 mr-1" />
          { linkText }
          </Link>
        </li>
      )
    } else if (linkText === 'Logout' ) {
      return (
        <li className='content-center pl-2 pt-2 hover:bg-blue-100'>
          <Link href="/logout" className="flex active:underline">
          <ArrowLeftEndOnRectangleIcon className="size-6 mr-1" />
          { linkText }
          </Link>
        </li>
      )
    }
}



{/* comment comment comment */}

// export default function NavLink({ href, children }) {
//   const pathname = usePathname();
//   const isActive = pathname === href;

//   return (
//     <Link href={href} className={isActive ? 'text-blue-500 font-bold' : 'text-gray-700'}>
//       {children}
//     </Link>
//   );
// }