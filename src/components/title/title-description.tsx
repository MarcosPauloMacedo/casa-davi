import styles from './title.module.css';

interface TitleProps {
    title: string;
    description?: string;
}

export function TitleDescription({ title, description }: TitleProps) {
    const styleTitleDescription = `${styles.titleDescription} text-primary-theme`

    return (
        <h1 className={styleTitleDescription}>
            {title} <span className={styles.spanDescription}>{description}</span>
        </h1>
    )
}