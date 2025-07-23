import books from '@/data/bookstest.json'

export default function Book() {
  return (
   <>
    <h1 className="text-xl font-bold m-2">Search book</h1>
    <form>
      <input type="text" placeholder="Author" className='border border-gray-600'></input> 
      <input type="text" placeholder="Title" className='border border-gray-600'></input> 
      <input type="text" placeholder="ISBN" className='border border-gray-600'></input> 
      <button>Search</button>
    </form>
    <table className="table-auto m-4">
      <thead>
      <tr>
        <th>Author</th>
        <th>Title</th>
        <th>ISBN</th>
      </tr>
      </thead>
      <tbody>
      {books.data.books.map((book) => (
        <tr key={book.bookID} className="gap-2">
          <td>{book.title}</td>
          <td className='ps-7'>{book.author}</td>
          <td className='ps-7'>{book.isbn}</td>
        </tr>
        ))}
      </tbody> 
    </table>
   </> 
  );
}
