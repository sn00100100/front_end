'use client';

import { useEffect, useState } from 'react';

async function getMembers(searchParams = {}) {
  // Use the proxy route instead of direct backend call
  const url = new URL('/api/members', window.location.origin);
  
  // Add search parameters if provided
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value.trim()) {
      url.searchParams.set(key, value);
    }
  });

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    // The proxy route returns { members } not { data: { members } }
    return data.members || [];
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

export default function MemberSearch() {
  const [members, setMembers] = useState([]);
  const [searchForm, setSearchForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load all members initially
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getMembers();
      setMembers(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Filter out empty search parameters
    const searchParams = {};
    Object.entries(searchForm).forEach(([key, value]) => {
      if (value.trim()) {
        searchParams[key] = value.trim();
      }
    });
    
    const data = await getMembers(searchParams);
    setMembers(data);
    setIsLoading(false);
  };

  const handleClear = () => {
    setSearchForm({
      firstName: '',
      lastName: '',
      email: ''
    });
    // Reload all members
    getMembers().then(setMembers);
  };

  return (
   <>
    <h1 className="text-xl font-bold m-2">Search Members</h1>
    <form onSubmit={handleSearch} className="mb-4 p-4 border rounded">
      <div className="flex gap-2 mb-2">
        <input 
          type="text" 
          name="firstName"
          value={searchForm.firstName}
          onChange={handleInputChange}
          placeholder="First Name" 
          className="border border-gray-600 px-2 py-1 rounded"
        />
        <input 
          type="text" 
          name="lastName"
          value={searchForm.lastName}
          onChange={handleInputChange}
          placeholder="Last Name" 
          className="border border-gray-600 px-2 py-1 rounded"
        />
        <input 
          type="text" 
          name="email"
          value={searchForm.email}
          onChange={handleInputChange}
          placeholder="Email" 
          className="border border-gray-600 px-2 py-1 rounded"
        />
      </div>
      <div className="flex gap-2">
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
        <button 
          type="button" 
          onClick={handleClear}
          className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
        >
          Clear
        </button>
      </div>
    </form>
    
    {isLoading ? (
      <p className="m-4">Loading...</p>
    ) : (
      <table className="table-auto m-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {members.length > 0 ? (
            members.map((member) => (
              <tr key={member.email} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{member.firstName}</td>
                <td className="border border-gray-300 px-4 py-2">{member.lastName}</td>
                <td className="border border-gray-300 px-4 py-2">{member.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                No members found
              </td>
            </tr>
          )}
        </tbody> 
      </table>
    )}
   </> 
  );
}