"use client"

import { Field, FieldLabel } from "@/components/ui/field"
import { PaginatorProps } from "./types"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationFirst,
    PaginationLast,
} from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useTranslations } from "next-intl"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

export function Paginator({
    page,
    totalPages,
    pageSize,
    totalItems,
    showNumeric = false,
    showPageSize = true,
    showCompact = false
}: PaginatorProps) {
    const t = useTranslations('actions')
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const PAGE_SIZES = [10, 25, 50, 100]

    const updateUrl = (paramsUpdate: Record<string, string>) => {
        const params = new URLSearchParams(searchParams)
        Object.entries(paramsUpdate).forEach(([key, value]) => {
            params.set(key, value)
        })
        router.push(`${pathname}?${params.toString()}`)
    }

    const handlePageChange = (newPage: number) => {
        updateUrl({ page: newPage.toString() })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handlePageSizeChange = (newPageSize: string) => {
        updateUrl({
            page_size: newPageSize,
            page: "1"
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className={`flex flex-col sm:flex-row items-center gap-4 ${(!showPageSize || showNumeric) ? "sm:justify-center" : "sm:justify-between"}`}>
            {showPageSize && (
                <Field orientation="horizontal" className="w-fit">
                    <FieldLabel htmlFor="select-rows-per-page">{t('rows_per_page')}</FieldLabel>
                    <Select
                        value={pageSize.toString()}
                        onValueChange={handlePageSizeChange}
                    >
                        <SelectTrigger className="w-20" id="select-rows-per-page">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent align="start">
                            <SelectGroup>
                                {PAGE_SIZES.map((size) => (
                                    <SelectItem key={size} value={size.toString()}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <p className="text-xs">{t('total_items')} {totalItems} {t('items')}</p>
                </Field>
            )}

            <Pagination className="mx-0 w-auto">
                <PaginationContent>
                    {showCompact && !showNumeric && (
                        <PaginationItem>
                            <PaginationFirst
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handlePageChange(1)
                                }}
                                aria-disabled={page === 1}
                                className={page === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (page > 1) handlePageChange(page - 1)
                            }}
                            aria-disabled={page === 1}
                            className={page === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {showCompact && !showNumeric && (
                        <PaginationItem>
                            <span className="text-sm font-medium px-2">
                                {t('page_info', { page, total: totalPages })}
                            </span>
                        </PaginationItem>
                    )}

                    {showNumeric}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (page < totalPages) handlePageChange(page + 1)
                            }}
                            aria-disabled={page === totalPages}
                            className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {showCompact && !showNumeric && (
                        <PaginationItem>
                            <PaginationLast
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handlePageChange(totalPages)
                                }}
                                aria-disabled={page === totalPages}
                                className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    )
}
