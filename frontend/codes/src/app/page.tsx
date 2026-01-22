import { getBooks } from "@/lib/api";
import { BookCard } from "@/components/BookCard";

export default async function Home() {

  const books = await getBooks();

  return (
    <main>
      <h1>Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </main>
  );
}
