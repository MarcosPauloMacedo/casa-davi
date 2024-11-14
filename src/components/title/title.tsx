import styles from './title.module.css';

interface TitleProps {
    title: string;
}

export function Title({ title }: TitleProps) {
    const styleTitle = `${styles.title} text-primary-theme`
    return (
        <h1 className={styleTitle}>{title}</h1>
    )
}