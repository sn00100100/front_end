'use client';

import { useEffect, useState } from 'react';

async function getAllMembers() {
  const url = "http://127.0.0.1:80/api/members";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const members = await response.json();
    return members.data?.members || [];
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

export default function Book() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllMembers();
      setMembers(data);
    }
    fetchData();
  }, []);

  return (
   <>
    <h1 className="text-xl font-bold m-2">Search member</h1>
    <form>
      <input type="text" placeholder="First" className='border border-gray-600'></input> 
      <input type="text" placeholder="Last" className='border border-gray-600'></input> 
      <input type="text" placeholder="Email" className='border border-gray-600'></input> 
      <button>Search</button>
    </form>
    <table className="table-auto m-4">
      <thead>
        <tr>
          <th>First</th>
          <th>Last</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <tr key={member.email} className="gap-2">
            <td>{member.firstName}</td>
            <td className='ps-7'>{member.lastName}</td>
            <td className='ps-7'>{member.email}</td>
          </tr>
        ))}
      </tbody> 
    </table>
   </> 
  );
}