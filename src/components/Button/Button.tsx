import React from 'react';

import { sx } from '@util';

type ButtonProps = {
    children?: React.ReactNode;
    name: string;
    onClick: (content: any)=> unknown;
    className?: string;
    isDisabled?: boolean;
    fullWidth?: boolean;
    variant?: 'contained'
        | 'outlined'
        | 'text';
};

const Button: React.FC<ButtonProps> = ({
    children,
    name,
    onClick,
    className,
    isDisabled = false,
    fullWidth = false,
    variant = 'text'
}) => {
    return (
        <button
            className={sx('min-w-10 p-3 text-sm text-text rounded-[6px] cursor-pointer leading-1 bg-transparent bg-no-repeat border-none', isDisabled && 'cursor-not-allowed', fullWidth && 'w-full', variant === 'outlined' && 'bg-primary border-solid', variant === 'contained' && 'bg-primary', className)}
            disabled={isDisabled}
            name={name}
            onClick={() => onClick(children)}
            type='button'
        >
            {children}
        </button>
    );
};

export default Button;