export type PaginatorProps = {
    page: number
    totalPages: number
    pageSize: number
    totalItems: number
    onPageChange: (page: number) => void
    onPageSizeChange: (pageSize: number) => void
}