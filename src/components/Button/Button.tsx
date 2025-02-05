import React from 'react';

import styles from './Button.module.css';

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
            className={`${styles.root} ${fullWidth ? styles.rootFullWidth : ''} ${variant === 'outlined' ? styles.rootOutlined : variant === 'contained' ? styles.rootContained : ''} ${className}`}
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