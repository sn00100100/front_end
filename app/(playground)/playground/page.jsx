// import styles from './styles.module.css'
import myData from '@/data/bookstest.json'

export default function Playground () {
    return (
        // <div className={styles.background}>
        <div>
            <ul>
                {myData.data.books.map((book) => (
                    <li key={book.bookID}>
                        <h2>{book.bookID}. {book.title}</h2>
                        <p>author: {book.author}</p>
                        <p>isbn: {book.isbn}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}