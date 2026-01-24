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

import { useTranslation } from "react-i18next"
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
    const { t } = useTranslation()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const updateUrl = (paramsUpdate: Record<string, string>) => {
        const params = new URLSearchParams(searchParams)
        Object.entries(paramsUpdate).forEach(([key, value]) => {
            params.set(key, value)
        })
        router.push(`${pathname}?${params.toString()}`)
    }

    const handlePageChange = (newPage: number) => {
        updateUrl({ page: newPage.toString() })
    }

    const handlePageSizeChange = (newPageSize: string) => {
        updateUrl({
            page_size: newPageSize,
            page: "1"
        })
    }

    const renderPageNumbers = () => {
        const pages = []
        const siblingCount = 1

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= page - siblingCount && i <= page + siblingCount)
            ) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={i === page}
                            onClick={(e) => {
                                e.preventDefault()
                                handlePageChange(i)
                            }}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                )
            } else if (
                i === page - siblingCount - 1 ||
                i === page + siblingCount + 1
            ) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationEllipsis />
                    </PaginationItem>
                )
            }
        }
        return pages
    }

    return (
        <div className={`flex flex-col sm:flex-row items-center gap-4 ${(!showPageSize || showNumeric) ? "sm:justify-center" : "sm:justify-between"}`}>
            {showPageSize && (
                <Field orientation="horizontal" className="w-fit">
                    <FieldLabel htmlFor="select-rows-per-page">{t('actions.rows_per_page')}</FieldLabel>
                    <Select
                        value={pageSize.toString()}
                        onValueChange={handlePageSizeChange}
                    >
                        <SelectTrigger className="w-20" id="select-rows-per-page">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent align="start">
                            <SelectGroup>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <p className="text-xs">{t('actions.total_items')} {totalItems} {t('actions.items')}</p>
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
                                {t('actions.page_info', { page, total: totalPages })}
                            </span>
                        </PaginationItem>
                    )}

                    {showNumeric && renderPageNumbers()}

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
