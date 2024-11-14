import { cellColumn, HeaderColumn } from "@/components/ui/columns"
import { IVacina } from "@/interfaces/IVacina"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<IVacina>[] = [
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
        accessorKey: "dataAplicacao",
        header: ({ column }) => {
        return (
            <HeaderColumn column={column} header="Data da aplicação" />
        )
        },
        cell: ({ row }) => cellColumn({ row, accessorKey: "dataAplicacao" }),
    },
    {
        accessorKey: "tratamento",
        header: ({ column }) => {
        return (
            <HeaderColumn column={column} header="Tipo de tratamento" />
        )
        },
        cell: ({ row }) => cellColumn({ row, accessorKey: "tratamento" }),
    }
]