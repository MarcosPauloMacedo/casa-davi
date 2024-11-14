'use client'

import { Fragment, useEffect, useState } from "react";
import { StatusComponent } from "@/utils/status-component-enum";
import { Title } from "@/components/title/title";
import { ButtonBack } from "@/components/buttons/back";
import { ErrorDialog } from "@/components/all-dialogs/error-dialog";
import { LoadingCard } from "../loading/card";
import Image from "next/image";

import styles from './page-view.module.css';

function PageLoading() {
    return (
        <div className={styles.pageLoading}>
            <LoadingCard />
        </div>
    )
}

interface PageContentProps {
    img: {
        src: string,
        alt: string
    },
    children: React.ReactNode
}

function PageContent({ img, children }: PageContentProps) {
    return (
        <Fragment>
            <div className={styles.sectionImg}>
                <div className={styles.img}>
                    <Image 
                        src={img.src} 
                        alt={img.alt} 
                        fill={true}
                        objectFit="cover"
                    />
                </div>
                <ButtonBack className={styles.buttonBack} />
            </div>
            {children}
        </Fragment> 
    )
}

interface PageViewProps {
    title: string,
    status: StatusComponent,
    img: {
        src: string,
        alt: string
    },
    errorDialog: {
        isOpen: boolean,
        setIsOpen: (open: boolean) => void
        description: string
    },
    children: React.ReactNode
}

export function PageView({ title, status, img, errorDialog, children }: PageViewProps) {

    const [statusComponent, setStatusComponent] = useState<StatusComponent>
    (StatusComponent.LOADING);

    useEffect(() => {
        setStatusComponent(status)
    }, [status])

    return (
        <div className={styles.pageView}>
            <header>
                <Title title={title} />
            </header>
            <div className={styles.content}>
                {statusComponent === StatusComponent.LOADING &&
                    <PageLoading />
                }
                {statusComponent === StatusComponent.SUCCESS && 
                    <PageContent img={img}>
                        {children}
                    </PageContent>
                }
            </div>
            {statusComponent === StatusComponent.ERROR && 
                <ErrorDialog
                    isOpen={errorDialog.isOpen}
                    setIsOpen={errorDialog.setIsOpen}
                    descriptionText={errorDialog.description}
                />
            }
        </div>
    )
}