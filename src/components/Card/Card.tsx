import React, { FC, ReactNode } from 'react';

import { sx } from '@util';

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
        <div className={sx('border-neutral border-b-solid border-b-[1.5px] bg-secondary min-h-12 p-4 leading-4', className)}>
            {
                title &&
                <span className={sx('mt-1 mr-0.5 text-text font-bold')}>
                    {title}
                </span>
            }
            {
                subtitle &&
                <span className={sx('text-text mt-2 block text-sm')}>
                    {subtitle}
                </span>
            }
            {children}
        </div>
    );
};

const CardContent: FC<CardContentProps> = ({ children, className }) => {
    return (
        <div className={sx('w-full', className)}>
            {children}
        </div>
    );
};

const Card: FC<CardProps> = ({ children, className }) => {
    return (
        <div className={sx('border-neutral border-[1.5px] rounded-[6px] border-solid min-h-30px overflow-y-auto', className)}>
            {children}
        </div>
    );
};

export { Card, CardHeader, CardContent };