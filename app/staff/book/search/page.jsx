'use client';

import { useEffect, useState } from 'react';

async function getBooks(searchParams = {}) {
  const url = new URL('/api/books', window.location.origin);
  
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
    return data.books || [];
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

export default function BookSearch() {
  const [books, setBooks] = useState([]);
  const [searchForm, setSearchForm] = useState({
    authorName: '',
    bookName: '',
    isbn: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load all members initially
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getBooks();
      setBooks(data);
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
    
    const data = await getBooks(searchParams);
    setBooks(data);
    setIsLoading(false);
  };

  const handleClear = () => {
    setSearchForm({
      authorName: '',
      bookName: '',
      isbn: ''
    });
    // Reload all members
    getBooks().then(setBooks);
  };

  return (
    <>
    <h1 className="text-xl font-bold m-2 pl-2">Search Books</h1>
    <form onSubmit={handleSearch} className="p-4 rounded">
      <div className="flex gap-2 mb-2">
        <input 
          type="text" 
          name="author"
          value={searchForm.authorName}
          onChange={handleInputChange}
          placeholder="Author" 
          className="border border-gray-600 px-2 py-1 rounded"
        />
        <input 
          type="text" 
          name="title"
          value={searchForm.bookName}
          onChange={handleInputChange}
          placeholder="Title" 
          className="border border-gray-600 px-2 py-1 rounded"
        />
        <input 
          type="text" 
          name="isbn"
          value={searchForm.isbn}
          onChange={handleInputChange}
          placeholder="ISBN" 
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
      <table className="table-auto m-4 w-[95%] border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Book ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">ISBN</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.isbn} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{book.bookID}</td>
                <td className="border border-gray-300 px-4 py-2">{book.isbn}</td>
                <td className="border border-gray-300 px-4 py-2">{book.bookName}</td>
                <td className="border border-gray-300 px-4 py-2">{book.authorName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                No books found
              </td>
            </tr>
          )}
        </tbody> 
      </table>
    )}
   </> 
  );
}
