import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function sx(...args: ClassValue[]) {
    return twMerge(clsx(args));
}

export default sx;