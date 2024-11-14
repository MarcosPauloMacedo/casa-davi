import { cellColumn, HeaderColumn } from "@/components/ui/columns"
import { IExame } from "@/interfaces/IExame"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<IExame>[] = [
    {
        accessorKey: "nome",
        header: ({ column }) => {
        return (
            <HeaderColumn column={column} header="Nome" />
        )
        },
        cell: ({ row }) => cellColumn({ row, accessorKey: "nome" }),
    },
    {
        accessorKey: "dataExame",
        header: ({ column }) => {
        return (
            <HeaderColumn column={column} header="Data do exame" />
        )
        },
        cell: ({ row }) => cellColumn({ row, accessorKey: "dataExame" }),
    },
    {
        accessorKey: "tratamento",
        header: ({ column }) => {
        return (
            <HeaderColumn column={column} header="Tratamento" />
        )
        },
        cell: ({ row }) => cellColumn({ row, accessorKey: "tratamento" }),
    }
]