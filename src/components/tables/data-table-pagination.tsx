'use client'
import { type Table } from "@tanstack/react-table"
import {
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@nhatdev94/common-ui"
import { Button } from "@nhatdev94/common-ui"


export type DataTablePaginationProps<TData> = {
    table: Table<TData>,
    pageSizeOption?: number[],
    onChangePageSize?: (pageSize: number) => void,
    onPrevios?: () => void,
    onNext?: () => void
}

export function DataTablePagination<TData>({
    table,
    pageSizeOption = [10, 20, 25, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
    const currentPage = table.getState().pagination.pageIndex;
    const totalPages = table.getPageCount();
    console.log(totalPages);
    
    const getPageNumbers = () => {
        const pages = [];
        const showEllipsis = totalPages > 5; 

        if (!showEllipsis) {
            for (let i = 0; i < totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 2) {
                pages.push(0, 1, 2, 3, "...", totalPages - 1);
            } else if (currentPage >= totalPages - 3) {
                pages.push(0, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1);
            } else {
                pages.push(0, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages - 1);
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8 w-17.5">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {pageSizeOption.map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-25 items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={table.previousPage}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft />
                    </Button>
                    {
                        getPageNumbers().map((page, index) => (
                            <div key={index}>
                                {page === "..." ? (
                                    <span className="flex h-8 w-8 items-center justify-center">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </span>
                                ) : (
                                    <Button
                                        variant={currentPage === page ? "default" : "outline"}
                                        className="h-8 w-8 p-0"
                                        onClick={() => table.setPageIndex(page as number)}
                                    >
                                        {(page as number) + 1}
                                    </Button>
                                )}
                            </div>
                        ))
                    }
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={table.nextPage}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}
