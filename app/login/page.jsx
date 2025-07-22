'use client'

import Logo from '../components/logo'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../globals.css'
import { Inter } from 'next/font/google'

const inter = Inter ({ subsets: ['latin'], display: 'swap' })

const staticMember= {
  name: 'member1',
  password: 'pass'
}

const staticStaff= {
  name: 'staff1',
  password: 'pass'
}

export default function Login() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isMemberLoggedIn, setIsMemberLoggedIn] = useState('false')
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState('false')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name === staticMember.name && password === staticMember.password) {
      setIsMemberLoggedIn(true)
      router.push('/member/home')
    } else if (name === staticStaff.name && password === staticStaff.password) {
      setIsStaffLoggedIn(true)
      router.push('/staff/dashboard')
    } else {
      setError('Invalid username or password')
    }

  }

  return (
    <div className="flex items-center justify-center h-screen inter.className">
      <div className="bg-gradient-to-b from-blue-500 to-orange-200">
        <form onSubmit={handleSubmit} className="m-2">
          <div className='p-2'>
            <Logo width={210} height={95} />
            <h2 className="text-center text-2xl font-bold mt-4 mb-4">Please log in.</h2>
          </div>
          <div> 
           <label htmlFor="name">Name</label>
             <input
               id="name"
               type="text"
               value={name}
               placeholder='Name'
               className="bg-white block w-full p-2 mb-4 border rounded"
               onChange={(e) => setName(e.target.value)}
             />
           </div> 
           <div>
           <label htmlFor="password">Password</label>
             <input
               id="password"
               type="password"
               value={password}
               placeholder='Password'
               className="bg-white block w-full p-2 mb-4 border rounded"
               onChange={(e) => setPassword(e.target.value)}
             />
           </div>
           {error && <p style={{ color: 'red' }}>{error}</p>}
           <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log in</button>
        </form>
      </div>
    </div>
   )
}