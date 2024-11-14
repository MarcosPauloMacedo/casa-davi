import { Column, Row } from "@tanstack/react-table"
import { Button } from "./button"
import { ArrowUpDown } from "lucide-react";

interface HeaderColumnProps<TData, TValue> {
    column: Column<TData, TValue>
    header: string;
}

export function HeaderColumn<TData, TValue>({ column, header }: 
    HeaderColumnProps<TData, TValue>) {

    return (
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {header}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    )
}

interface cellColumnProps<TData> {
    row: Row<TData>
    accessorKey: string;
}

export function cellColumn<TData>({ row, accessorKey }: cellColumnProps<TData>) {
    return (
        <div className="lowercase px-4">{row.getValue(accessorKey)}</div>
    )
}