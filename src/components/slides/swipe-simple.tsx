import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Subtitle } from "../subtitle";
import { IRoutesSwipeSimple } from "@/interfaces/ISlides";
import Link from "next/link";

import styles from './swipe-simple.module.css'

interface SwipeSimpleProps {
    routes: IRoutesSwipeSimple[];
}

export function SwipeSimple({ routes  }: SwipeSimpleProps ) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? routes.length - 1 : prevSlide - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide === routes.length - 1 ? 0 : prevSlide + 1));
    };

    const styleBgCardTheme = 'bg-card-theme'
    return (
        <div className={styles.swipeSimple}>
            <div onClick={handlePrev} className={`${styles.arrowLeft} ${styleBgCardTheme}`}>
                <ChevronLeftIcon className={styles.icon} />
            </div>
            <Link className={`${styles.link} ${styleBgCardTheme}`} href={routes[currentSlide].href}>
                <Subtitle className={styles.subtitle} title={routes[currentSlide].title} />
            </Link>
            <div onClick={handleNext}  className={`${styles.arrowRight} ${styleBgCardTheme}`}>
                <ChevronRightIcon className={styles.icon} />
            </div>
        </div>
    )
}