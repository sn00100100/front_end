'use client'

import { useState } from 'react'
import data from '@/data/bookstest.json'

const SearchBar = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(data);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredData = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term)
      );
    });
    setSearchResults(filteredData);
  };

  return (
    <div>
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name or email"
      />
      <ul>
        {searchResults.map((item) => (
          <li key={item.id}>
            {item.name} ({item.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;