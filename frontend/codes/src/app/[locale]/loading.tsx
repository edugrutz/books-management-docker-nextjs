import { BookCardSkeleton } from "@/components/books/BookCardSkeleton";

export default function Loading() {
    return (
        <main className="lg:p-14 md:p-12 p-10 flex flex-col gap-6">
            {/* Simula a estrutura dos filtros e paginação para evitar layout shift */}
            <div className="flex flex-col gap-4 w-full h-[180px] bg-muted/10 rounded-lg animate-pulse" />

            <div className="flex justify-between items-center">
                <div className="h-10 w-48 bg-muted/20 rounded animate-pulse" />
                <div className="h-10 w-32 bg-muted/20 rounded animate-pulse" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                    <BookCardSkeleton key={i} />
                ))}
            </div>
        </main>
    );
}
