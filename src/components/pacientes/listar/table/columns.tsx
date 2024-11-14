'use client'

import { cellColumn, HeaderColumn } from "@/components/ui/columns"
import { IPacienteTable } from "@/interfaces/IPaciente"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<IPacienteTable>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
        return (
            <HeaderColumn column={column} header="Nome" />
        )
        },
        cell: ({ row }) => cellColumn({ row, accessorKey: "name" }),
    },
    {
        accessorKey: "surname",
        header: ({ column }) => {
        return (
            <HeaderColumn column={column} header="Sobrenome" />
        )
        },
        cell: ({ row }) => cellColumn({ row, accessorKey: "surname" }),
    },
    {
        accessorKey: "dateOfBirth",
        header: ({ column }) => {
        return (
            <HeaderColumn column={column} header="Data de Nascimento" />
        )
        },
        cell: ({ row }) => cellColumn({ row, accessorKey: "dateOfBirth" }),
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