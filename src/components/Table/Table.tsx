import React, { FC, ReactNode } from 'react';

import styles from './TableStyles.module.css';

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
            className={`${styles.tableFooter} ${className}`}
        >
            {children}
        </tfoot>
    );
};

const TableCell: FC<TableCellProps> = ({ children, className = '', align = 'inherit' }) => {
    return (
        <td
            className={`${styles.tableCell} ${className}`}
            style={{ float: align }}
        >
            {children}
        </td>
    );
};

const TableRow: FC<TableRowProps> = ({ children, className = '' }) => {
    return (
        <tr className={`${styles.tableRow} ${className}`}>
            {children}
        </tr>
    );
};

const TableHead: FC<TableHeadProps> = ({ children, className = '' }) => {
    return (
        <thead className={`${styles.tableHead} ${className}`}>
            {children}
        </thead>
    );
};

const TableBody: FC<TableBodyProps> = ({ children, className = '' }) => {
    return (
        <tbody className={`${styles.tableBody} ${className}`}>
            {children}
        </tbody>
    );
};

const Table: FC<TableProps> = ({ children }) => {
    return (
        <table className={styles.table}>
            {children}
        </table>
    );
};

export {
    Table, TableCell, TableHead, TableRow, TableBody, TableFooter
};