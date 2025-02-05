import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { useQuery } from '@/api';
import {
    Card,
    CardContent,
    CardHeader
} from '@/components/Card';
import { Chip } from '@/components/Chip';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableRow
} from '@/components/Table';
import BackIcon from '@assets/icons/arrow-back.svg';

import styles from './DashboardStyles.module.css';
import type { PortfolioBreakdown } from '../../../api-definitions';

const MarketBreakdown = () => {
    const params = useParams();
    const { data } = useQuery<PortfolioBreakdown>(`/api/portfolio/${params.portfolioId}/breakdown`);
    const [ history, setHistory ] = React.useState<{
        view: number;
        ids: string[];
        pageTitle: string;
    }[]>([
        {
            view: 0,
            ids: [],
            pageTitle: 'Market Breakdown'
        }
    ]);

    useEffect(() => {
        if (data) {
            console.log(data);
            setHistory([
                {
                    ...history[0],
                    ids: Object.keys(data.categories)
                }
            ]);
        }
    }, [data]);

    const pageMapping: Record<number, keyof PortfolioBreakdown> = {
        0: 'categories',
        1: 'subcategories',
        2: 'securities'
    } as const;

    const handleTransition = (direction: 'back' | 'forward', ids: string[] = [], pageTitle: string = '') => {
        if (direction === 'forward') {
            setHistory([
                ...history,
                {
                    view: history[history.length - 1]?.view + 1,
                    ids,
                    pageTitle
                }
            ]);
        } else if (direction === 'back') {
            setHistory(history.slice(0, -1));
        }
    };

    const lastRecord = history[history.length - 1];
    const currentPage = lastRecord.view;
    const pageMapped = pageMapping[currentPage];
    const nextPage = pageMapping[currentPage + 1];

    return (
        <>
            {
                !!data &&
                    <Card className={styles.marketBreakdownRoot}>
                        <CardHeader>
                            <div className={styles.cardHeader}>
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                >
                                    {!!lastRecord.view && <img
                                        alt='back-button'
                                        onClick={() => handleTransition('back')}
                                        src={BackIcon}
                                        className={styles.assetAllocationNavigation}
                                    />}
                                    {lastRecord.pageTitle}
                                </span>
                                <span className={styles.assetTotal}>
                                    {`${lastRecord.ids.length} assets`}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {history.length === 2 && <Chip className={styles.chip} border='square'>Show Direct-Indexed</Chip>}
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Asset</TableCell>
                                        <TableCell
                                            align='right'
                                            className={styles.cell}
                                        >
                                            Allocation
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        Object.keys(data[pageMapped])
                                            .filter(id => lastRecord.ids.includes(id))
                                            .map((id) => {
                                                return (
                                                    <TableRow key={id}>
                                                        <TableCell>
                                                            <span>
                                                                {id}
                                                                <span className={styles.description}>
                                                                    {'description' in data[pageMapped][id] ? data[pageMapped][id].description : ''}
                                                                </span>
                                                            </span></TableCell>
                                                        <TableCell align='right'>
                                                            <div className={styles.assetCell}>
                                                                <span>
                                                                    {data[pageMapped][id].allocation / 100}%
                                                                </span>
                                                                <span onClick={() => handleTransition('forward', data[pageMapped][id][nextPage], id)} className={styles.assetAllocationNavigation}>
                                                                    {pageMapped !== 'securities' && '>'}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                    }
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell
                                            align='right'
                                            className={styles.footer}
                                        >
                                            <span style={{ marginRight: '2rem' }}>
                                                Total
                                            </span>
                                            <span>
                                                {
                                                    Object.keys(data[pageMapped])
                                                        .filter(id => lastRecord.ids.includes(id))
                                                        .reduce((accumulator, value) => {
                                                            accumulator += data[pageMapped][value].allocation;

                                                            return accumulator;
                                                        }, 0) / 100 + '%'
                                                }
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </CardContent>
                    </Card>
            }
        </>
    );
};

export default MarketBreakdown;