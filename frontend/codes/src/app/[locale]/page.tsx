import { getBooks } from "@/services/api";
import { Paginator } from "@/components/Paginator";
import { BookFilters } from "@/components/BookFilters";
import { searchBooks } from "@/services/api";
import { BookList } from "@/components/BookList";
import { setRequestLocale } from 'next-intl/server';

interface HomeProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    page_size?: string;
    q?: string;
    title?: string;
    author_name?: string;
  }>;
}

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

  return (
    <main className="lg:p-14 md:p-12 p-10 flex flex-col gap-6">
      <BookFilters />
      <Paginator
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        showCompact={true}
      />
      <BookList initialBooks={books} />
      {pageSize >= 25 && (
        <Paginator
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          showNumeric={false}
          showCompact={true}
          showPageSize={false}
        />
      )}
    </main>
  );
}
