interface PageViewDataProps {
    children: React.ReactNode;
}

import styles from './page-view.module.css';

export function PageViewData({children}: PageViewDataProps) {
    const stylePageViewData = `${styles.pageViewData} bg-card-theme`;

    return (
        <div className={stylePageViewData}>
            {children}
        </div>  
    )
}