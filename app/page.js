import Link from 'next/link'

export default function Home() {
  return (
   <div className="flex p-2">
       <div>
          <h1>Welcome to the Quick Shelf Library Management System!</h1>
          <Link href="/login" className="hover:underline">Log in to get started</Link>
       </div>
   </div> 
  );
}