import React, { FC, ReactNode } from 'react';

import { sx } from '@util';

type ChipProps = {
    children: ReactNode;
    className?: string;
    border?: 'square' | 'rounded';
};

const Chip: FC<ChipProps> = ({ children, className, border = 'rounded' }) => {
    return (
        <label className={sx('inline-block rounded-2xl border-solid border-1 min-w-48px h-12px border-neutral text-text bg-secondary px-2 py-1 leading-1 text-xs', border === 'square' && 'rounded-[6px]', className)}>
            {children}
        </label>
    );
};

export default Chip;