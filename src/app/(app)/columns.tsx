

"use client" // BẮT BUỘC CÓ DÒNG NÀY

import { DataTable } from "@/components/tables";
import { Badge, Button, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@nhatdev94/common-ui";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";


export type Employee = {
  id: string
  employeeCode: string
  fullName: string
  position: string
  phone: string
  email: string
  workStatus: string
  classification: string
  realStartDate: string
}

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "employeeCode",
    header: "Mã NV",
    meta: {
      maxWidthClassPixel: 'max-w-80'
    }
  },
  {
    accessorKey: "fullName",
    header: 'Fullname',
    meta: {
      isSort: true
    }
  },
  {
    accessorKey: "position",
    header: "Chức vụ",
    meta: {isSort: true}
  },
  {
    accessorKey: "workStatus",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("workStatus") as string
      return (
        <Badge variant={status === "OFFICIAL" ? "default" : "secondary"}>
          {status === "OFFICIAL" ? "Chính thức" : "Thử việc"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "classification",
    header: "Phân loại",
    cell: ({ row }) => {
      const classification = row.getValue("classification") as string
      const config: Record<string, { label: string; variant: any }> = {
        HAT_NHAN: { label: "Hạt nhân", variant: "default" },
        COT_LOI: { label: "Cốt lõi", variant: "outline" },
        BAO_DONG: { label: "Báo động", variant: "destructive" },
      }

      const item = config[classification] || { label: classification, variant: "secondary" }
      return <Badge variant={item.variant}>{item.label}</Badge>
    },
  },
  {
    accessorKey: "realStartDate",
    header: "Ngày vào làm",
    cell: ({ row }) => {
      return new Date(row.getValue("realStartDate")).toLocaleDateString('vi-VN')
    }
  },
  
]