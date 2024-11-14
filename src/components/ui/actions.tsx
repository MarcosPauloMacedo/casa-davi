import { 
    EyeIcon, 
    TrashIcon, 
    PencilSquareIcon 
} from "@heroicons/react/16/solid";

import { TableCell } from "./table";
import { usePathname } from "next/navigation";

import Link from "next/link";

interface ActionsProps {
    data: any;
    onDelete: (data: any) => void;
}

export function Actions({ data, onDelete }: ActionsProps ) {
    const pathName = usePathname();
    const id = data.id;

    return (
        <TableCell className="flex gap-6 justify-center">
            <Link href={`${pathName}/visualizar?id=${id}`}>
                <EyeIcon className="w-5 h-5" />
            </Link> 
            <Link href={`${pathName}/editar?id=${id}`}>
                <PencilSquareIcon className="w-5 h-5" />
            </Link>
            <TrashIcon 
                className="cursor-pointer w-5 h-5" 
                onClick={() => onDelete(data)} 
            />
        </TableCell>
    )
}

