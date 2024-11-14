"use client"

import { cellColumn, HeaderColumn } from "@/components/ui/columns"
import { IUserTable } from "@/interfaces/IUser"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<IUserTable>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <HeaderColumn column={column} header="Name" />
      )
    },
    cell: ({ row }) => cellColumn({ row, accessorKey: "name" }),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <HeaderColumn column={column} header="Email" />
      )
    },
    cell: ({ row }) => cellColumn({ row, accessorKey: "email" }),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <HeaderColumn column={column} header="Status" />
      )
    },
    cell: ({ row }) => cellColumn({ row, accessorKey: "status" }),
  }
]
