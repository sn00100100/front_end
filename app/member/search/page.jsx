'use client'
import SearchBarTitle from '@/app/components/member/search'
import { useState } from 'react'

export default function Dashboard() {
  const items = [
    { id: 1, title: 'Cat in the Hat', author: 'Dr. Seuess' },
    { id: 2, title: 'Game of Thrones', author: 'George Martin' },
    { id: 3, title: 'Harry Potter', author: 'JK Rowling' }
  ]
  const [filteredItems, setFilteredItems] = useState(items)

  const handleSearch = (searchQuery) => {
    const lowerCaseQuery = searchQuery.toLowerCase()
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(lowerCaseQuery)
    )
    setFilteredItems(filtered)
  }

  return (
   <>
    <h1 className="text-xl font-bold p-2">What can we help you find?</h1>
    <SearchBar data={items} onSearch={handleSearch} />
    <SearchBar data={items} onSearch={handleSearch} />
    <SearchBar data={items} onSearch={handleSearch} />
    <ul className="p-2">
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
   </> 
  );
}
