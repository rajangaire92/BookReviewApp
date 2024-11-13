import { useGetBooksQuery } from "../../api/book/query";

export function ListBooks() {
  const { data, isLoading, isError, error } = useGetBooksQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div
      style={{
        backgroundColor: '#f3f4f6', // Light gray background
        backgroundImage: 'url("https://images.unsplash.com/photo-1512820790803-83ca734da794")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        padding: '2rem',
        borderRadius: '10px',
      }}
      className="list-books-container container mx-auto max-w-screen-lg"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.data.map((book) => (
          <div
            key={book._id}
            className="book-card"
            style={{
              background: 'linear-gradient(to bottom right, #f9f9f9, #ffffff)', // Gradient background for the card
              borderLeft: '4px solid #6b21a8', // Dark purple border on the left side
              borderRight: '4px solid #fa709a', // Soft pink border on the right side
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              fontFamily: '"Poppins", sans-serif',
              cursor: 'pointer',
            }}
          >
            <h3
              style={{
                color: '#6b21a8', // Deep purple for title text
                fontSize: '1.5rem',
                fontWeight: '700',
              }}
            >
              {book.title}
            </h3>
            <p
              style={{
                color: '#4b5563', // Grayish color for text
                fontStyle: 'italic',
                fontSize: '0.9rem',
              }}
            >
              Author: {book.author}
            </p>
            <p
              style={{
                color: '#4b5563', // Grayish color for text
                fontStyle: 'italic',
                fontSize: '0.9rem',
              }}
            >
              Genre: {book.genre}
            </p>
            <p
              style={{
                color: '#374151', // Slightly darker gray for description
                fontSize: '1rem',
                marginTop: '1rem',
              }}
            >
              {book.description ? book.description : "No description available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
