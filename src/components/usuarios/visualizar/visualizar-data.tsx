import { PageViewData } from "@/components/page-view/page-view-data";
import { TextDisplay } from "@/components/text-display";
import { IUser } from "@/interfaces/IUser";
import { Status } from "@/utils/status-enum";
import { Fragment } from "react";

import { Subtitle } from "@/components/subtitle";

interface VisualizarDataProps {
    user: IUser;
}

export function VisualizarData({ user }: VisualizarDataProps) {
    return (
        <PageViewData>
            <Fragment>
                <Subtitle title={user.name} />
                <TextDisplay title="Nome: " text={user.name} />
                <TextDisplay title="Usuário: " text={user.username} />
                <TextDisplay title="Email: " text={user.email} />
                <TextDisplay title="Status: " text={Status[user.status]} />
            </Fragment>
        </PageViewData>
    )
}