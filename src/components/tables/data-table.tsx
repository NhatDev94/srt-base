"use client"

import * as React from "react"
import {
    ColumnDef,
    VisibilityState,
    SortingState,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    type Table as TableType,
    HeaderContext,
    type Row
} from "@tanstack/react-table"

import { BaseFilterRequest } from '@nhatdev94/util'

import { Button, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@nhatdev94/common-ui"
import { DataTableFilter } from "./data-table-filter"
import { DataTableViewOptions } from "./data-table-view-option"
import { DataTablePagination } from "./data-table-pagination"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

declare module "@tanstack/react-table" {
    interface ColumnMeta<TData, TValue> {
        isSort?: boolean
    }
}

export interface RowActionConfig<TData> {
    id: string;
    label: string | React.ReactNode;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    onClick: (row: TData) => void;
    icon?: React.ReactNode;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
    emptyText?: string,
    isView?: boolean,
    isSearch?: boolean,
    pageSizeOption?: number[],
    rowIdName?: string,
    isSelect?: boolean,
    isLoading?: boolean,
    rowCount: number,
    rowActions?: RowActionConfig<TData>[];
    tableAction?: (table: TableType<TData>) => React.ReactNode,
    onChange: ({ pageIndex, pageSize, keyword, sortBy, isDescending }: BaseFilterRequest) => void,
}

const genColumns = <TData, TValue>(columns: ColumnDef<TData, TValue>[], isSelect: boolean, rowActions?: RowActionConfig<TData>[]): ColumnDef<TData, TValue>[] => {
    const newColumns = columns.map((col) => {
        // Nếu cột có đánh dấu isSort trong meta
        if (col.meta?.isSort) {
            return {
                ...col,
                header: (context: HeaderContext<TData, TValue>) => {
                    const column = context.column;
                    const isSorted = column.getIsSorted();
                    const handleSort = () => {
                        if (!isSorted) {
                            column.toggleSorting(false);
                        } else if (isSorted === "asc") {
                            column.toggleSorting(true);
                        } else {
                            column.clearSorting();
                        }
                    };

                    return (
                        <Button
                            variant="ghost"
                            className="-ml-4 h-8 data-[state=open]:bg-accent"
                            onClick={handleSort}
                        >
                            {/* flexRender sẽ tự lấy string header hoặc chạy function header cũ của bạn */}
                            {flexRender(col.header, context)}
                            <ArrowUpDown />
                        </Button>
                    )
                },
            } as ColumnDef<TData, TValue>;
        }
        return col
    })

    if (rowActions && rowActions.length > 0) {
        newColumns.push({
            id: "actions",
            header: () => <div className="text-center">Thao tác</div>,
            cell: ({ row }) => {
                const item = row.original;

                return (
                    <div className="text-right" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                {rowActions.map((action) => (
                                    <DropdownMenuItem
                                        key={action.id}
                                        onClick={() => action.onClick(item)}
                                        className={action.variant === "destructive" ? "text-red-600 focus:text-red-600" : ""}
                                    >
                                        {action.icon && <span className="mr-2">{action.icon}</span>}
                                        {action.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        });
    }

    if (isSelect) {
        const selectColumn = {
            id: "select",
            header: ({ table }: { table: TableType<TData> }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }: { row: Row<TData> }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        }
        return [selectColumn, ...newColumns]
    }
    return newColumns
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isSelect = false,
    isLoading = true,
    isSearch = false,
    isView = true,
    pageSizeOption,
    rowIdName,
    emptyText = 'No results.',
    rowCount,
    rowActions,
    onChange,
    tableAction
}: DataTableProps<TData, TValue>) {
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [searchValue, setSearchValue] = React.useState('')
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const finalColumns = React.useMemo(() => genColumns(columns, isSelect, rowActions), [columns, isSelect, rowActions]);
    const table = useReactTable({
        data,
        columns: finalColumns,
        rowCount: rowCount,
        manualPagination: true,
        manualSorting: true,
        enableSortingRemoval: true,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getRowId: (row, index) => {
            if (rowIdName) return String(row[rowIdName as keyof TData]);
            return (row as any).id || (row as any).uuid || String(index);
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination
        },
    })

    const handleChange = ({ pageIndex, pageSize, keyword, sortBy, isDescending }: BaseFilterRequest) => {
        console.log({ pageIndex, pageSize, keyword, sortBy, isDescending });

        onChange({ pageIndex, pageSize, keyword, sortBy, isDescending })
    }

    const handleSearch = (value: string) => {
        setSearchValue(value)
        setPagination(prev => ({ ...prev, pageIndex: 0 }));
    }

    React.useEffect(() => {
        const sortBy = sorting.length > 0 ? sorting[0].id : undefined;
        const isDescending = sorting.length > 0 ? sorting[0].desc : undefined;

        handleChange({ pageIndex: pagination.pageIndex + 1, pageSize: pagination.pageSize, keyword: searchValue, sortBy, isDescending });
    }, [pagination.pageIndex, pagination.pageSize, searchValue, sorting]);

    return (
        <div>
            <div className="flex items-center justify-between py-4">
                {isSearch && <DataTableFilter table={table} onSearch={handleSearch} />}

                <div className="w-fit flex items-center gap-x-4">
                    {tableAction && tableAction(table)}
                    {isView && <DataTableViewOptions table={table} />}
                </div>
            </div>
            <div className="overflow-hidden rounded-md border px-4">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {
                            isLoading ? Array.from({ length: 10 }).map((_, i) => (
                                <TableRow key={i}>
                                    {finalColumns.map((column, index) => (
                                        <TableCell key={index}>
                                            <Skeleton className="h-6 w-full animate-pulse" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                                : table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                            onClick={() => row.toggleSelected(!row.getIsSelected())}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={finalColumns.length} className="h-24 text-center">
                                            {emptyText}
                                        </TableCell>
                                    </TableRow>
                                )}
                    </TableBody>
                </Table>

                <div className="py-4">
                    <DataTablePagination table={table} pageSizeOption={pageSizeOption} />
                </div>
            </div>
        </div>
    )
}
