import { ButtonBack } from "../buttons/back";
import { ButtonRouter } from "../buttons/router";
import { TitleDescription } from "../title/title-description";

import styles from './header-page.module.css'

interface PageHeaderProps{
    title: string,
    description: string,
    routerButton?: string
}

export function PageHeader({ title, description, routerButton }: PageHeaderProps) {
    return (
        <header className={styles.headerPage}>
            <TitleDescription
                title={title}
                description={description}
            />
            <div className="pr-14">
                {routerButton ? 
                    <ButtonRouter src={routerButton} /> :
                    <ButtonBack />
                }
            </div>
        </header>
    )
}