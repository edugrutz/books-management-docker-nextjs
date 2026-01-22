import { getBooks } from "@/lib/api";
import { BookCard } from "@/components/BookCard";
import Link from "next/link";

export default async function Home() {

  const books = await getBooks();

  return (
    <main className="p-6 flex flex-col gap-6">
      <h1>Books</h1>
      <div>
        <Link href="/create" className="border rounded p-4"  >Create Book</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </main>
  );
}
