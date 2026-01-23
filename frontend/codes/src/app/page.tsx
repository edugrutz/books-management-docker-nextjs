"use client"

import { getBooks } from "@/services/api";
import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Paginator } from "@/components/Paginator";
import { useState, useEffect } from "react";
import { Book } from "@/types/book";
import { SearchBar } from "@/components/SearchBar";
import { searchBooksByTitle, searchBooksByAuthorName } from "@/services/api";
import { useDebounce } from "@/hooks/useDebounce";
import { deleteBookAction } from "@/actions/delete-book";

export default function Home() {

  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [titleSearchTerm, setTitleSearchTerm] = useState("");
  const debouncedTitleSearchTerm = useDebounce(titleSearchTerm, 500);

  const [authorSearchTerm, setAuthorSearchTerm] = useState("");
  const debouncedAuthorSearchTerm = useDebounce(authorSearchTerm, 500);

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        let response;

        if (debouncedTitleSearchTerm) {
          response = await searchBooksByTitle(debouncedTitleSearchTerm, page, pageSize);
        } else if (debouncedAuthorSearchTerm) {
          response = await searchBooksByAuthorName(debouncedAuthorSearchTerm, page, pageSize);
        } else {
          response = await getBooks(page, pageSize);
        }

        setBooks(response.data);
        setTotalPages(response.meta.pagination.total_pages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [debouncedTitleSearchTerm, debouncedAuthorSearchTerm, page, pageSize]);

  const handleDelete = async (id: number) => {
    setBooks(prev => prev.filter(book => book.id !== id))

    try {
      await deleteBookAction(id)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="p-6 flex flex-col gap-6">
      <div className="flex justify-end">
        <Button asChild variant="default" ><Link href="/create"><Plus /> Add Book</Link></Button>
      </div>
      <div className="flex gap-4">
        <SearchBar
          onSearch={(value) => {
            setTitleSearchTerm(value);
            setAuthorSearchTerm("");
            setPage(1);
          }}
          placeholder="Search by title"
          className="flex-1"
        />

        <SearchBar
          onSearch={(value) => {
            setAuthorSearchTerm(value);
            setTitleSearchTerm("");
            setPage(1);
          }}
          placeholder="Search by author"
          className="flex-1"
        />
      </div>
      <Paginator
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {loading ? (
          <div className="col-span-full text-center text-muted-foreground">
            Carregando...
          </div>
        ) : books && books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book.id} book={book} onDelete={() => handleDelete(book.id)} />
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground">
            Nenhum livro encontrado.
          </div>
        )}
      </div>
    </main>
  );
}
