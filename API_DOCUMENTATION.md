# QuickShelf Library Management System - API Documentation

## Overview

The QuickShelf Library Management System provides a RESTful API for managing books, members, and transactions in a library system. The API is built using the Crow C++ framework and follows REST conventions with proper HTTP status codes and JSON responses.

**Base URL**: `http://localhost:80`  
**API Version**: v1  
**Content-Type**: `application/json`

## Authentication

### Login
Validate user credentials.

**Endpoint**: `GET /api/login`

**Query Parameters**:
- `username` (string, required): User's username
- `password` (string, required): User's password

**Response**:
```json
{
  "message": "Login successful"
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid credentials

---

## Books

### Get All Books
Retrieve all books in the library.

**Endpoint**: `GET /api/books`

**Response**:
```json
{
  "message": "All books found",
  "data": {
    "books": [
      {
        "bookID": 1,
        "isbn": "978-0123456789",
        "title": "Sample Book",
        "author": "John Doe"
      }
    ]
  }
}
```

### Search Books
Search for books using query parameters.

**Endpoint**: `GET /api/books`

**Query Parameters**:
- `isbn` (string, optional): Book ISBN
- `bookName` (string, optional): Book title
- `authorName` (string, optional): Author name

**Example**: `GET /api/books?authorName=Doe&bookName=Sample`

**Response**:
```json
{
  "message": "Books search completed",
  "data": {
    "books": [
      {
        "bookID": 1,
        "isbn": "978-0123456789",
        "title": "Sample Book",
        "author": "John Doe"
      }
    ]
  }
}
```

### Get Book by ID
Retrieve a specific book by its ID.

**Endpoint**: `GET /api/books/{id}`

**Path Parameters**:
- `id` (integer, required): Book ID

**Response**:
```json
{
  "message": "Book ID 1 book found",
  "data": {
    "book": {
      "bookID": 1,
      "isbn": "978-0123456789",
      "title": "Sample Book",
      "author": "John Doe"
    }
  }
}
```

**Error Responses**:
- `404 Not Found`: Book with specified ID not found

### Create New Book
Add a new book to the library.

**Endpoint**: `POST /api/books`

**Request Body**:
```json
{
  "isbn": "978-0123456789",
  "bookName": "Sample Book",
  "authorName": "John Doe"
}
```

**Required Fields**:
- `isbn` (string): Book ISBN (cannot be empty)
- `bookName` (string): Book title (cannot be empty)
- `authorName` (string): Author name (cannot be empty)

**Response**:
```json
{
  "message": "Book with ID 1 created successfully",
  "data": {
    "book": {
      "bookID": 1,
      "isbn": "978-0123456789",
      "title": "Sample Book",
      "author": "John Doe"
    }
  }
}
```

**Error Responses**:
- `400 Bad Request`: Validation errors or book already exists

### Update Book
Update an existing book's information.

**Endpoint**: `PUT /api/books/{id}`

**Path Parameters**:
- `id` (integer, required): Book ID

**Request Body** (all fields optional):
```json
{
  "isbn": "978-0123456789",
  "bookName": "Updated Book Title",
  "authorName": "Updated Author"
}
```

**Response**:
```json
{
  "message": "Book with ID 1 updated successfully",
  "data": {
    "book": {
      "bookID": 1,
      "isbn": "978-0123456789",
      "title": "Updated Book Title",
      "author": "Updated Author"
    }
  }
}
```

**Error Responses**:
- `404 Not Found`: Book with specified ID not found
- `400 Bad Request`: Validation errors (empty fields)

### Delete Book
Remove a book from the library.

**Endpoint**: `DELETE /api/books/{id}`

**Path Parameters**:
- `id` (integer, required): Book ID

**Response**:
```json
{
  "message": "Book with ID 1 deleted successfully"
}
```

**Error Responses**:
- `404 Not Found`: Book with specified ID not found

---

## Members

### Get All Members
Retrieve all library members.

**Endpoint**: `GET /api/members`

**Response**:
```json
{
  "message": "All members found",
  "data": {
    "members": [
      {
        "memberID": 1,
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane.smith@email.com"
      }
    ]
  }
}
```

### Search Members
Search for members using query parameters.

**Endpoint**: `GET /api/members`

**Query Parameters**:
- `firstName` (string, optional): Member's first name
- `lastName` (string, optional): Member's last name
- `email` (string, optional): Member's email
- `username` (string, optional): Member's username

**Example**: `GET /api/members?firstName=Jane&email=jane@email.com`

**Response**:
```json
{
  "message": "Members search completed",
  "data": {
    "members": [
      {
        "memberID": 1,
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane.smith@email.com"
      }
    ]
  }
}
```

### Get Member by ID
Retrieve a specific member by their ID.

**Endpoint**: `GET /api/members/{id}`

**Path Parameters**:
- `id` (integer, required): Member ID

**Response**:
```json
{
  "message": "Member with ID 1 found",
  "data": {
    "member": {
      "memberID": 1,
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@email.com"
    }
  }
}
```

**Error Responses**:
- `404 Not Found`: Member with specified ID not found

### Create New Member
Register a new library member.

**Endpoint**: `POST /api/members`

**Request Body**:
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@email.com",
  "username": "janesmith",
  "password": "securepassword"
}
```

**Required Fields**:
- `firstName` (string): Member's first name (cannot be empty)
- `lastName` (string): Member's last name (cannot be empty)
- `email` (string): Member's email address (cannot be empty)
- `username` (string): Member's username (cannot be empty)
- `password` (string): Member's password (cannot be empty)

**Response**:
```json
{
  "message": "Member with ID 1 created successfully",
  "data": {
    "member": {
      "memberID": 1,
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@email.com"
    }
  }
}
```

**Error Responses**:
- `400 Bad Request`: Validation errors, email already exists, or username already exists

### Update Member
Update an existing member's information.

**Endpoint**: `PUT /api/members/{id}`

**Path Parameters**:
- `id` (integer, required): Member ID

**Request Body** (all fields required for updates):
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.updated@email.com",
  "username": "janesmith",
  "password": "newsecurepassword"
}
```

**Response**:
```json
{
  "message": "Member with ID 1 updated successfully",
  "data": {
    "member": {
      "memberID": 1,
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.updated@email.com"
    }
  }
}
```

**Error Responses**:
- `400 Bad Request`: Validation errors, email already exists, or username already exists

### Delete Member
Remove a member from the library system.

**Endpoint**: `DELETE /api/members/{id}`

**Path Parameters**:
- `id` (integer, required): Member ID

**Response**:
```json
{
  "message": "Member with ID 1 deleted successfully"
}
```

**Error Responses**:
- `404 Not Found`: Member with specified ID not found

---

## Transactions

### Get All Transactions
Retrieve all library transactions.

**Endpoint**: `GET /api/transactions`

**Response**:
```json
{
  "message": "All transactions found",
  "data": {
    "transactions": [
      {
        "transactionID": 1,
        "bookID": 1,
        "memberID": 1,
        "borrowDate": "2024-01-15T10:30:00Z",
        "dueDate": "2024-02-14T10:30:00Z"
      }
    ]
  }
}
```

### Search Transactions
Search for transactions using query parameters.

**Endpoint**: `GET /api/transactions`

**Query Parameters**:
- `bookID` (integer, optional): Book ID
- `memberID` (integer, optional): Member ID

**Example**: `GET /api/transactions?memberID=1&bookID=5`

**Response**:
```json
{
  "message": "Transactions search completed",
  "data": {
    "transactions": [
      {
        "transactionID": 1,
        "bookID": 5,
        "memberID": 1,
        "borrowDate": "2024-01-15T10:30:00Z",
        "dueDate": "2024-02-14T10:30:00Z"
      }
    ]
  }
}
```

**Error Responses**:
- `400 Bad Request`: Invalid parameter values (bookID or memberID must be valid integers)

### Get Transaction by ID
Retrieve a specific transaction by its ID.

**Endpoint**: `GET /api/transactions/{id}`

**Path Parameters**:
- `id` (integer, required): Transaction ID

**Response**:
```json
{
  "message": "Transaction with ID 1 found",
  "data": {
    "transaction": {
      "transactionID": 1,
      "bookID": 1,
      "memberID": 1,
      "borrowDate": "2024-01-15T10:30:00Z",
      "dueDate": "2024-02-14T10:30:00Z"
    }
  }
}
```

**Error Responses**:
- `404 Not Found`: Transaction with specified ID not found

### Create New Transaction (Borrow Book)
Create a new transaction to borrow a book.

**Endpoint**: `POST /api/transactions`

**Request Body**:
```json
{
  "bookID": 1,
  "memberID": 1
}
```

**Required Fields**:
- `bookID` (integer): ID of the book to borrow
- `memberID` (integer): ID of the member borrowing the book

**Response**:
```json
{
  "message": "Transaction with ID 1 created successfully",
  "data": {
    "transaction": {
      "transactionID": 1,
      "bookID": 1,
      "memberID": 1,
      "borrowDate": "2024-01-15T10:30:00Z",
      "dueDate": "2024-02-14T10:30:00Z"
    }
  }
}
```

**Error Responses**:
- `400 Bad Request`: Book not found, member not found, book already borrowed, or transaction already exists

### Delete Transaction
Remove a transaction from the system.

**Endpoint**: `DELETE /api/transactions/{id}`

**Path Parameters**:
- `id` (integer, required): Transaction ID

**Response**:
```json
{
  "message": "Transaction with ID 1 deleted successfully"
}
```

**Error Responses**:
- `404 Not Found`: Transaction with specified ID not found

---

## Error Handling

The API uses RFC 7807 Problem Details for HTTP APIs standard for error responses.

### Error Response Format

```json
{
  "type": "domain/errors/book-not-found",
  "title": "Book Not Found",
  "status": 404,
  "detail": "Book with ID 999 not found",
  "data": {
    // Original request data (when applicable)
  }
}
```

### Validation Error Format

```json
{
  "type": "routes/errors/validation",
  "title": "Validation Error",
  "status": 400,
  "detail": "Required fields cannot be empty",
  "data": {
    // Original request data
  },
  "invalid-params": [
    "ISBN cannot be empty",
    "Book name cannot be empty"
  ]
}
```

### Common Error Types

| Error Type | Status Code | Description |
|------------|-------------|-------------|
| `domain/errors/book-not-found` | 404 | Book with specified ID not found |
| `domain/errors/member-not-found` | 404 | Member with specified ID not found |
| `domain/errors/transaction-not-found` | 404 | Transaction with specified ID not found |
| `domain/errors/book-already-exists` | 400 | Book with same ISBN already exists |
| `domain/errors/member-already-exists` | 400 | Member with same details already exists |
| `domain/errors/email-already-exists` | 400 | Email address already in use |
| `domain/errors/username-already-exists` | 400 | Username already in use |
| `domain/errors/book-is-borrowed` | 400 | Book is currently borrowed |
| `domain/errors/book-is-not-borrowed` | 400 | Book is not currently borrowed |
| `routes/errors/validation` | 400 | Request validation failed |
| `about:blank` | 500 | Internal server error |

---

## Data Models

### Book
```json
{
  "bookID": 1,
  "isbn": "978-0123456789",
  "title": "Book Title",
  "author": "Author Name"
}
```

### Member
```json
{
  "memberID": 1,
  "firstName": "First",
  "lastName": "Last",
  "email": "email@example.com"
}
```

**Note**: Username and password are not included in API responses for security.

### Transaction
```json
{
  "transactionID": 1,
  "bookID": 1,
  "memberID": 1,
  "borrowDate": "2024-01-15T10:30:00Z",
  "dueDate": "2024-02-14T10:30:00Z"
}
```

**Date Format**: ISO 8601 format in UTC timezone (YYYY-MM-DDTHH:MM:SSZ)

---

## CORS Configuration

The API is configured with CORS support for:
- **Origin**: `http://localhost:3000`
- **Methods**: GET, POST, PUT, DELETE
- **Headers**: Content-Type

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data or business logic error |
| 401 | Unauthorized - Invalid credentials |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Usage Examples

### Borrowing a Book Workflow

1. **Search for a book**:
   ```
   GET /api/books?authorName=Tolkien
   ```

2. **Check member exists**:
   ```
   GET /api/members/1
   ```

3. **Create transaction**:
   ```
   POST /api/transactions
   {
     "bookID": 5,
     "memberID": 1
   }
   ```

### Creating a New Member

```bash
curl -X POST http://localhost:8080/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@email.com",
    "username": "johndoe",
    "password": "securepassword123"
  }'
```

### Searching for Books

```bash
curl "http://localhost:8080/api/books?authorName=Tolkien&bookName=Lord"
```

---

## Notes

- All timestamps are in UTC and follow ISO 8601 format
- Search operations are case-insensitive
- Password fields are never returned in API responses
- The API uses a singleton LibraryManager for data persistence
- CORS is configured specifically for frontend development at localhost:3000 