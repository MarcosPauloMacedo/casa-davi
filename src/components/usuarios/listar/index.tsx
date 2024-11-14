import { AlertInfo } from "@/components/alerts/alert-info";
import { listText as text } from "./list-text";
import { UsuarioTable } from "./table";
import { PageHeader } from "@/components/page-header";

export function ListarUsuarios() {
    return (
        <div className="container">
            <PageHeader
                title={text.title}
                description={text.description}
                routerButton="/inicio"
            />
            <AlertInfo 
                title={text.info.title}
                description={text.info.description}
            />
            <UsuarioTable />
        </div>
    )
}