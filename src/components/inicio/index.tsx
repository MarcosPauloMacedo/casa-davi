'use client'

import { useRouter } from "next/navigation";
import { Title } from "../title/title";
import { Button } from "../ui/button";
import { Logo } from "./inicio-logo";
import { inicioText as text} from "./inicio-text";
import { InicioHeader } from "./inicio-header";

import styles from './inicio.module.css';

export function Inicio() {
    const router = useRouter();

    const handleRouter = (href: string) => {
        router.push(href);
    }

    return (
        <div>
            <InicioHeader />
            <div className={styles.inicioContainer}>
                <Logo />
                <div>
                    <Title title={text.title} />
                    <p className={styles.description}>{text.description}</p>
                    <div className={styles.sectionButton}>
                        {text.buttons.map((button, index) => (
                            <Button 
                                onClick={() => handleRouter(button.href)} 
                                key={index} variant="secondary">
                                {button.text}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}