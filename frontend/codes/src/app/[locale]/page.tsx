import { getBooks, searchBooks } from "@/services/api";
import { BookFilters } from "@/components/books/BookFilters";
import { BookList } from "@/components/books/BookList";
import { Paginator } from "@/components/Paginator";
import { MIN_PAGE_SIZE_FOR_DOUBLE_PAGINATOR } from "@/constants/pagination";
import { setRequestLocale } from 'next-intl/server';
import { HomeProps } from "@/types/routing";

export default async function Home({ params, searchParams }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const queryParams = await searchParams;
  const page = Number(queryParams.page) || 1;
  const pageSize = Number(queryParams.page_size) || 10;
  const q = queryParams.q || "";
  const title = queryParams.title || "";
  const author = queryParams.author_name || "";

  let response;

  if (q || title || author) {
    response = await searchBooks(
      {
        title: title || undefined,
        author: author || undefined,
        general: q || undefined
      },
      page,
      pageSize
    );
  } else {
    response = await getBooks(page, pageSize);
  }

  const books = response.data;
  const totalPages = response.meta.pagination.total_pages;
  const totalItems = response.meta.pagination.total;

  const paginatorProps = {
    page,
    totalPages,
    pageSize,
    totalItems,
  };

  return (
    <main className="lg:p-14 md:p-12 p-10 flex flex-col gap-6">
      <BookFilters />
      <BookList
        books={books}
        headerSlot={<Paginator {...paginatorProps} showCompact={true} />}
        footerSlot={
          pageSize >= MIN_PAGE_SIZE_FOR_DOUBLE_PAGINATOR ? (
            <Paginator
              {...paginatorProps}
              showNumeric={false}
              showCompact={true}
              showPageSize={false}
            />
          ) : null
        }
      />
    </main>
  );
}
