'use client'

import { IUser } from "@/interfaces/IUser";
import { getUserById } from "@/services/users";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { visualizarText as text } from "./visualizar-text";
import { StatusComponent } from "@/utils/status-component-enum";
import { VisualizarData } from "./visualizar-data";

import { PageView } from "@/components/page-view";

export function VisualizarUsuario() {
    const id = useSearchParams().get('id') || '';

    const router = useRouter();

    const [user, setUser] = useState<IUser>({} as IUser);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [statusComponent, setStatusComponent] = useState(StatusComponent.LOADING);

    const handleError = () => {
        setStatusComponent(StatusComponent.ERROR)
        setOpenDialog(true);
    }

    const closeDialog = (open: boolean) => {
        setOpenDialog(open);
        router.back();
    }

    const getUser = async () => {
        const response = await getUserById(id)

        if(response.ok) {
            const user = await response.json();

            setUser(user);
            setStatusComponent(StatusComponent.SUCCESS);

        } else {
            handleError()
        }
    }

    useEffect(() => {
        if(id) {
            getUser();
        } else {
            handleError();
        }

    }, [])

    return (
        <PageView
            title={text.title}
            status={statusComponent}
            img={{
                src: text.img.src, 
                alt: text.img.alt
            }}
            errorDialog={{
                isOpen: openDialog, 
                setIsOpen: closeDialog, 
                description: text.dialogError
            }}>
            <VisualizarData user={user} />
        </PageView>
    )
}