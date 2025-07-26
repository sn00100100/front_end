'use client';

import { useState, useEffect } from 'react';
import type { Member } from '@/app/lib/models/Member';

// Example: Client Component using the proxy routes
export default function MemberSearch() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Fetch all members on component mount
  useEffect(() => {
    fetchMembers();
  }, []);

  // Generic function to call your proxy API
  const fetchMembers = async (search?: URLSearchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = search 
        ? `/api/members?${search.toString()}`
        : '/api/members';
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.title || 'Failed to fetch members');
      }
      
      const data = await response.json();
      setMembers(data.members || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching members:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchQuery = new URLSearchParams();
    if (searchParams.firstName) searchQuery.set('firstName', searchParams.firstName);
    if (searchParams.lastName) searchQuery.set('lastName', searchParams.lastName);
    if (searchParams.email) searchQuery.set('email', searchParams.email);
    
    await fetchMembers(searchQuery);
  };

  // Create a new member
  const createMember = async (memberData: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.title || 'Failed to create member');
      }

      const data = await response.json();
      
      // Refresh the list after creation
      fetchMembers();
      
      return data.member;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create member');
      throw err;
    }
  };

  // Delete a member
  const deleteMember = async (memberId: number) => {
    try {
      const response = await fetch(`/api/members/${memberId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.title || 'Failed to delete member');
      }

      // Refresh the list after deletion
      fetchMembers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete member');
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold m-2">Search Members</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="First Name"
          value={searchParams.firstName}
          onChange={(e) => setSearchParams({...searchParams, firstName: e.target.value})}
          className="border border-gray-600 mr-2 p-1"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={searchParams.lastName}
          onChange={(e) => setSearchParams({...searchParams, lastName: e.target.value})}
          className="border border-gray-600 mr-2 p-1"
        />
        <input
          type="email"
          placeholder="Email"
          value={searchParams.email}
          onChange={(e) => setSearchParams({...searchParams, email: e.target.value})}
          className="border border-gray-600 mr-2 p-1"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Results Table */}
      <table className="table-auto m-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.memberID}>
              <td>{member.memberID}</td>
              <td>{member.firstName}</td>
              <td className="ps-7">{member.lastName}</td>
              <td className="ps-7">{member.email}</td>
              <td>
                <button 
                  onClick={() => deleteMember(member.memberID)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 