'use client'

import {  RowActionConfig } from "@nhatdev94/common-ui";
import { DataTable } from "@/components/tables";
import { columns, Employee } from "./columns";
import { Button } from "@nhatdev94/common-ui";
import { type Table } from "@tanstack/react-table";
import { BaseFilterRequest } from "@nhatdev94/util";
import { ConfirmPopup } from "@nhatdev94/common-ui";
import { useState } from "react";

type Props = {
    data: Employee[],
    rowCount: number,
    api: (value: BaseFilterRequest) => void,
    isLoading: boolean,
    isSearch?: boolean
}

export function Table(props: Props) {
    const [open, setOpen] = useState(false)
    const tableAction = (table: Table<Employee>) => {
        const rowsSelects = table.getSelectedRowModel().rows

        return (
            <div className="flex items-center gap-x-4">
                <Button >New Employee</Button>
                <Button onClick={() => console.log(rowsSelects)
                } >Delete</Button>
            </div>
        )
    }

   const rowActions: RowActionConfig<Employee>[] = [
     {
            id: "view",
            label: "Xem",
            variant: "outline",
            onClick: (item) => console.log("Viewing:", item),
        },
        {
            id: "delete",
            label: "Xóa",
            variant: "destructive",
            className: "text-red-600",
            onClick: (item) => {
                setOpen(true)
            }
        }
   ]

    return (
        <>
        <DataTable
            isSelect={true}
            columns={columns}
            data={props.data}
            rowCount={props.rowCount}
            onChange={props.api}
            isLoading={props.isLoading}
            isSearch={props.isSearch}
            tableAction={tableAction}
            rowActions={rowActions}
        />

        <ConfirmPopup open={open}
            onCancel={() => setOpen(false)}
            onConfirm={() => setOpen(false)}
        />
        </>
    )
}