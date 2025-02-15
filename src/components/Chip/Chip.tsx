import React, { FC, ReactNode } from 'react';

import styles from './Chip.module.css';

type ChipProps = {
    children: ReactNode;
    className?: string;
    border?: 'square' | 'rounded';
};
const Chip: FC<ChipProps> = ({ children, className, border = 'rounded' }) => {
    return (
        <label className={`${styles.rootContainer} ${border === 'square' ? styles.squared : ''} ${className}`}>
            {children}
        </label>
    );
};

export default Chip;