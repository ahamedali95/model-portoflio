import React, { FC, ReactNode } from 'react';

import styles from './Card.module.css';

type CardContentProps = {
    children?: ReactNode;
    className?: string;
};

type CardHeaderProps = {
    children?: ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
};

type CardProps = {
    children: ReactNode;
    className?: string;
};

const CardHeader: FC<CardHeaderProps> = ({
    children,
    className,
    title = '',
    subtitle = ''
}) => {
    return (
        <div className={`${styles.cardHeader} ${className}`}>
            {
                title &&
                <span className={styles.cardHeaderTitle}>
                    {title}
                </span>
            }
            {
                subtitle &&
                <span className={styles.cardHeaderSubtitle}>
                    {subtitle}
                </span>
            }
            {children}
        </div>
    );
};

const CardContent: FC<CardContentProps> = ({ children, className }) => {
    return (
        <div className={`${styles.cardContent} ${className}`}>
            {children}
        </div>
    );
};

const Card: FC<CardProps> = ({ children, className }) => {
    return (
        <div className={`${styles.root} ${className}`}>
            {children}
        </div>
    );
};

export { Card, CardHeader, CardContent };