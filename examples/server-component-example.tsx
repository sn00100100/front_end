import { getMembers } from '@/app/lib/api/members';
import { getBooks } from '@/app/lib/api/books';
// import ClientSearchForm from './ClientSearchForm'; // This would be your client component

// Example: Server Component using API wrappers directly
export default async function DashboardPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Server components can call the API wrappers directly
  // This happens on the server, so no CORS issues
  
  let members = [];
  let books = [];
  let error = null;

  try {
    // Convert Next.js searchParams to URLSearchParams
    const memberQuery = new URLSearchParams();
    if (searchParams.memberSearch) {
      memberQuery.set('firstName', searchParams.memberSearch as string);
    }

    const bookQuery = new URLSearchParams();
    if (searchParams.bookSearch) {
      bookQuery.set('bookName', searchParams.bookSearch as string);
    }

    // Fetch data in parallel
    [members, books] = await Promise.all([
      getMembers(memberQuery),
      getBooks(bookQuery)
    ]);

  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    error = err instanceof Error ? err.message : 'Failed to load data';
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Staff Dashboard</h1>
      
      {/* Error handling */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Members Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Recent Members ({members.length})</h2>
          <div className="bg-gray-50 p-4 rounded">
            {members.slice(0, 5).map((member) => (
              <div key={member.memberID} className="border-b py-2 last:border-b-0">
                <p className="font-medium">{member.firstName} {member.lastName}</p>
                <p className="text-sm text-gray-600">{member.email}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Books Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Recent Books ({books.length})</h2>
          <div className="bg-gray-50 p-4 rounded">
            {books.slice(0, 5).map((book) => (
              <div key={book.bookID} className="border-b py-2 last:border-b-0">
                <p className="font-medium">{book.bookName}</p>
                <p className="text-sm text-gray-600">by {book.authorName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive search form - this will be a client component */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Search & Manage</h2>
        {/* <ClientSearchForm initialMembers={members} initialBooks={books} /> */}
        <p className="text-gray-600">Interactive components would go here...</p>
      </div>
    </div>
  );
}

// Note: This shows the hybrid approach
// - Server component fetches initial data using API wrappers (no CORS issues)
// - Client component handles interactions using proxy routes (same-origin calls) 