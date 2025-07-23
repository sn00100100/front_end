'use client'

import styles from './styles.module.css'
import Link from 'next/link'
import Logo from '@/app/components/logo'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '@/app/globals.css'

const staticMember= {
  username: 'member1',
  password: 'pass'
}

const staticStaff= {
  username: 'staff1',
  password: 'pass'
}

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isMemberLoggedIn, setIsMemberLoggedIn] = useState('false')
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState('false')
  const router = useRouter()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (username === staticMember.username && password === staticMember.password) {
      localStorage.setItem('username', username)
      setIsMemberLoggedIn(true)
      router.push('/member/home')
    } else if (username === staticStaff.username && password === staticStaff.password) {
      localStorage.setItem('username', username)
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
               value={username}
               placeholder='Name'
               className="bg-gray-100 text-gray-800 block w-full p-2 mb-4 border border-gray-500 rounded"
               onChange={(e) => setUsername(e.target.value)}
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