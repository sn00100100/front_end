import '@/app/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { HomeIcon, UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { BookOpenIcon, Square3Stack3DIcon } from '@heroicons/react/24/solid'

export default function MemberLayout({ children }) {
  return (
    <div className="flex flex-row">
      <nav className="basis-2/12 h-screen bg-blue-200 border">
        <div className="m-2">
          <Image src="/logo.png" alt="logo" width={210} height={95} />
        </div>
        <div> 
          <ul>
            <li className='content-center pl-2 mb-2 hover:bg-blue-100'>
              <Link href="/" className="flex active:underline">
                <HomeIcon className="size-6 mr-1" />
                Home
              </Link>
            </li>
            <li className='content-center pl-2 mb-2 hover:bg-blue-100'>
              <Link href="/member/search" className="flex">
                <MagnifyingGlassIcon className="size-6 mr-1" />
                Search
              </Link>
            </li>
            <li className='content-center pl-2 mb-2 hover:bg-blue-100'>
              <Link href="/member/catalog" className="flex">
                <Square3Stack3DIcon className="size-6 mr-1" />
                Catalog
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="basis-10/12">
        <div className="flex justify-end bg-blue-200 border-b border-t">
          <UserCircleIcon className="size-10 fill-black align-items-end" />
          <p className="mr-2">User's Name</p>
        </div>
        <div>
          <section>{ children }</section>
        </div>
      </div>
    </div>
  );
}