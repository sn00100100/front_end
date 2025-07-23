'use client'

import React, { useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Adjust the path based on your JSON file's location
        const response = await fetch('/public/book.json')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Static JSON Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.title}>
            <h2>{item.isbn}</h2>
            <p>{item.author}</p>
            <p>{item.bookID}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}