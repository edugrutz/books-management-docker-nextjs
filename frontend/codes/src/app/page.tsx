"use client"

import { getBooks } from "@/services/api";
import { BookCard } from "@/components/BookCard";
import { Paginator } from "@/components/Paginator";
import { useState, useEffect } from "react";
import { Book } from "@/types/book";
import { BookFilters } from "@/components/BookFilters";
import { searchBooks } from "@/services/api";
import { useDebounce } from "@/hooks/useDebounce";
import { deleteBookAction } from "@/actions/delete-book";

export default function Home() {

  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [titleSearchTerm, setTitleSearchTerm] = useState("");
  const debouncedTitleSearchTerm = useDebounce(titleSearchTerm, 500);

  const [authorSearchTerm, setAuthorSearchTerm] = useState("");
  const debouncedAuthorSearchTerm = useDebounce(authorSearchTerm, 500);

  const [generalSearchTerm, setGeneralSearchTerm] = useState("");
  const debouncedGeneralSearchTerm = useDebounce(generalSearchTerm, 500);

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        let response;

        if (debouncedTitleSearchTerm || debouncedAuthorSearchTerm || debouncedGeneralSearchTerm) {
          response = await searchBooks(
            {
              title: debouncedTitleSearchTerm,
              author: debouncedAuthorSearchTerm,
              general: debouncedGeneralSearchTerm
            },
            page,
            pageSize
          );
        } else {
          response = await getBooks(page, pageSize);
        }

        setBooks(response.data);
        setTotalPages(response.meta.pagination.total_pages);
        setTotalItems(response.meta.pagination.total);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [debouncedTitleSearchTerm, debouncedAuthorSearchTerm, debouncedGeneralSearchTerm, page, pageSize, refreshTrigger]);

  useEffect(() => {
    const handleBookCreated = () => {
      setPage(1);
      setRefreshTrigger(prev => prev + 1);
    };

    window.addEventListener("book-created", handleBookCreated);
    return () => window.removeEventListener("book-created", handleBookCreated);
  }, []);

  const handleDelete = async (id: number) => {
    setBooks(prev => prev.filter(book => book.id !== id))

    try {
      await deleteBookAction(id)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="lg:p-14 md:p-12 p-10 flex flex-col gap-6">
      <BookFilters
        general={generalSearchTerm}
        title={titleSearchTerm}
        author={authorSearchTerm}
        onGeneralChange={(val) => { setGeneralSearchTerm(val); setPage(1); }}
        onTitleChange={(val) => { setTitleSearchTerm(val); setPage(1); }}
        onAuthorChange={(val) => { setAuthorSearchTerm(val); setPage(1); }}
      />
      <Paginator
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
        showCompact={true}
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
      {pageSize >= 25 && (
        <Paginator
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setPage}
          onPageSizeChange={handlePageSizeChange}
          showNumeric={false}
          showCompact={true}
          showPageSize={false}
        />
      )}
    </main>
  );
}
