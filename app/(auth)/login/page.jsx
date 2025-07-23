'use client'

import styles from './styles.module.css'
import Link from 'next/link'
import Logo from '@/app/components/logo'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '@/app/globals.css'

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
    <div className={styles.background}>
      <div className="bg-white drop-shadow-md border border-gray-300">
        <form onSubmit={handleSubmit} className="m-2">
          <div className='p-2'>
            <Logo width={210} height={95} />
            <h2 className="text-center text-2xl font-bold mt-2 mb-2">Log in</h2>
          </div>
          <div> 
             <input
               id="name"
               type="text"
               value={name}
               placeholder='Name'
               className="bg-gray-100 text-gray-800 block w-full p-2 mb-4 border border-gray-500 rounded"
               onChange={(e) => setName(e.target.value)}
             />
           </div> 
           <div>
             <input
               id="password"
               type="password"
               value={password}
               placeholder='Password'
               className="bg-gray-100 text-gray-800 block w-full p-2 mb-4 border border-gray-500 rounded"
               onChange={(e) => setPassword(e.target.value)}
             />
           </div>
           {error && <p style={{ color: 'red' }}>{error}</p>}
           <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log in</button>
           <p>Don't have an account? <Link className="text-blue-600 hover:text-gray-400" href="#">Sign up!</Link></p>
        </form>
      </div>
    </div>
   )
}