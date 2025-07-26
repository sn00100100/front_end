// Demo: Runtime Validation in Action
// This shows how the new validation catches problems that would cause silent failures

import { Book } from '../app/lib/models/Book.js';
import { Member } from '../app/lib/models/Member.js';

console.log('=== VALIDATION DEMO ===\n');

// ❌ BAD DATA SCENARIO 1: Missing required fields
console.log('📋 Scenario 1: Backend returns incomplete book data');
const badBookData = {
  bookID: 123,
  isbn: "978-1234567890",
  // Missing bookName and authorName!
};

console.log('Raw data from API:', badBookData);

try {
  const book = Book.fromJSON(badBookData);
  console.log('✅ Book created:', book);
} catch (error) {
  console.log('🚨 Validation caught the error:', error.message);
  console.log('   This prevents UI crashes when trying to display book.bookName!');
}

console.log('\n' + '='.repeat(50) + '\n');

// ❌ BAD DATA SCENARIO 2: Wrong data types
console.log('📋 Scenario 2: Backend returns wrong data types');
const badMemberData = {
  memberID: "should-be-number",  // Wrong type!
  firstName: 123,               // Wrong type!
  lastName: null,               // Wrong type!
  email: "valid@email.com"
};

console.log('Raw data from API:', badMemberData);

try {
  const member = Member.fromJSON(badMemberData);
  console.log('✅ Member created:', member);
} catch (error) {
  console.log('🚨 Validation caught the error:', error.message);
  console.log('   This prevents crashes when the UI tries to call firstName.toUpperCase()!');
}

console.log('\n' + '='.repeat(50) + '\n');

// ✅ GOOD DATA SCENARIO
console.log('📋 Scenario 3: Backend returns valid data');
const goodBookData = {
  bookID: 456,
  isbn: "978-0987654321",
  bookName: "The Great Gatsby",
  authorName: "F. Scott Fitzgerald"
};

console.log('Raw data from API:', goodBookData);

try {
  const book = Book.fromJSON(goodBookData);
  console.log('✅ Book created successfully:', book);
  console.log('   Safe to use in UI: book.bookName =', book.bookName);
} catch (error) {
  console.log('🚨 Unexpected error:', error.message);
}

console.log('\n' + '='.repeat(50) + '\n');

// 🔍 REAL-WORLD USAGE EXAMPLE
console.log('📋 Real-world usage in React component:');
console.log(`
// Before (vulnerable to crashes):
function BookCard({ bookData }) {
  return (
    <div>
      <h3>{bookData.bookName}</h3>          {/* Could be undefined! */}
      <p>by {bookData.authorName}</p>       {/* Could be null! */}
      <span>ISBN: {bookData.isbn}</span>    {/* Could be a number! */}
    </div>
  );
}

// After (guaranteed safe):
function BookCard({ book }) {  // book is now a validated Book instance
  return (
    <div>
      <h3>{book.bookName}</h3>              {/* Always a string ✅ */}
      <p>by {book.authorName}</p>           {/* Always a string ✅ */}
      <span>ISBN: {book.isbn}</span>        {/* Always a string ✅ */}
    </div>
  );
}
`); 