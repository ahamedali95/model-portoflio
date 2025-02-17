import React, { FC, ReactNode } from 'react';

import { sx } from '@util';

type TableFooterProps = {
    children: ReactNode;
    className?: string;
};

type TableProps = {
    children: ReactNode;
};

type TableCellProps = {
    children: ReactNode;
    className?: string;
    align?:
        'inherit'
        | 'right';
};

type TableRowProps = {
    children: ReactNode;
    className?: string;
};

type TableHeadProps = {
    children: ReactNode;
    className?: string;
};

type TableBodyProps = {
    children: ReactNode;
    className?: string;
};

const TableFooter: FC<TableFooterProps> = ({ children, className = '' }) => {
    return (
        <tfoot
            className={sx(className)}
        >
            {children}
        </tfoot>
    );
};

const TableCell: FC<TableCellProps> = ({ children, className = '', align = 'inherit' }) => {
    return (
        <td
            className={sx('p-4 text-neutral first:text-text', className)}
            style={{ float: align }}
        >
            {children}
        </td>
    );
};

const TableRow: FC<TableRowProps> = ({ children, className = '' }) => {
    return (
        <tr className={sx('border-neutral border-solid border-1 pl-1 pr-1', className)}>
            {children}
        </tr>
    );
};

const TableHead: FC<TableHeadProps> = ({ children, className = '' }) => {
    return (
        <thead className={sx(className)}>
            {children}
        </thead>
    );
};

const TableBody: FC<TableBodyProps> = ({ children, className = '' }) => {
    return (
        <tbody className={sx(className)}>
            {children}
        </tbody>
    );
};

const Table: FC<TableProps> = ({ children }) => {
    return (
        <table className={sx('border-neutral rounded-[6px] border-collapse border-hidden shadow-[0px_0px_0px_1px_#666] w-full')}>
            {children}
        </table>
    );
};

export {
    Table, TableCell, TableHead, TableRow, TableBody, TableFooter
};