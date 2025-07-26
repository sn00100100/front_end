'use client';

import { useState, useEffect } from 'react';

// Example: Form submission using proxy routes
export default function CreateMemberForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle RFC 7807 error format
        const errorData = await response.json();
        throw new Error(errorData.title || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      setMessage({
        type: 'success',
        text: `Member ${result.member.firstName} ${result.member.lastName} created successfully!`
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
      });

    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to create member'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create New Member</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Message Display */}
        {message && (
          <div className={`p-3 rounded ${
            message.type === 'success' 
              ? 'bg-green-100 border border-green-400 text-green-700'
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded font-medium ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {isSubmitting ? 'Creating...' : 'Create Member'}
        </button>
      </form>
    </div>
  );
}

// Example: Book search with real-time filtering
export function BookSearchExample() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const searchBooks = async (query: string) => {
    setLoading(true);
    
    try {
      const searchParams = new URLSearchParams();
      if (query) {
        // Search across multiple fields
        searchParams.set('bookName', query);
        // You could also search by author: searchParams.set('authorName', query);
      }

      const response = await fetch(`/api/books?${searchParams.toString()}`);
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      setBooks(data.books || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search - searches 500ms after user stops typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchBooks(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Search Books</h2>
      
      <input
        type="text"
        placeholder="Search by book title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      />

      {loading && <p>Searching...</p>}

      <div className="space-y-2">
        {books.map((book: any) => (
          <div key={book.bookID} className="border rounded p-3">
            <h3 className="font-medium">{book.bookName}</h3>
            <p className="text-sm text-gray-600">by {book.authorName}</p>
            <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 