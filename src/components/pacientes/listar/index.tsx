import { listText as text } from "./list-text";
import { PacienteTable } from "./table";
import { PageHeader } from "@/components/page-header";
import { AlertInfo } from "@/components/alerts/alert-info";

export function ListarPacientes() {
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
            <PacienteTable />
        </div>
    )
}