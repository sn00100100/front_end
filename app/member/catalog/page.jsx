'use client'

// import styles from './styles.module.css'
import myData from '@/data/bookstest.json'

export default function Catalog() {
    return (
        <div>
            <ul>
                {myData.data.books.map((book) => (
                    <li className="m-2" key={book.bookID}>
                        <h2 className="text-blue-500 font-bold">{book.bookID}. {book.title}</h2>
                        <p>author: {book.author}</p>
                        <p className="border-b border-gray-300">isbn: {book.isbn}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}