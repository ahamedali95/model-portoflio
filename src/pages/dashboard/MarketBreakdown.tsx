import { useQuery } from '@apollo/client';
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';

// import { useQuery } from '@api/hooks';
import { GET_MARKET_BREAKDOWN } from '@api/queries';
import BackIcon from '@assets/icons/arrow-back.svg';
import {
    Card,
    CardContent,
    CardHeader
} from '@components/Card';
import { Chip } from '@components/Chip';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableRow
} from '@components/Table';

import styles from './DashboardStyles.module.css';
import type { PartnerResponse, PortfolioBreakdown } from '../../../api-definitions';

const MarketBreakdown = () => {
    const params = useParams();
    // REST API GET:
    // const { data } = useQuery<PortfolioBreakdown>(`/api/portfolio/${params.portfolioId}/breakdown`);
    // GRAPHQL QUERY:
    const { data } = useQuery<{ marketBreakdown: PartnerResponse }>(GET_MARKET_BREAKDOWN, { variables: { id: params.portfolioId }});
    const marketBreakdown = useMemo(() => {
        const portfolioBreakdown: PortfolioBreakdown = {
            categories: {},
            subcategories: {},
            securities: {}
        };

        data?.marketBreakdown.forEach((item) => {
            const { categoryName, category } = item;
            const { category: categoryType, securities } = category;

            securities.forEach((security) => {
                portfolioBreakdown.securities[security.description] = {
                    description: security.description,
                    allocation: security.allocation
                };
            });

            if (!portfolioBreakdown.categories[categoryType]) {
                portfolioBreakdown.categories[categoryType] = {
                    id: '',
                    name: categoryType,
                    allocation: 0,
                    subcategories: []
                };
            }

            if (!portfolioBreakdown.subcategories[categoryName]) {
                portfolioBreakdown.subcategories[categoryName] = {
                    id: '',
                    name: categoryName,
                    allocation: 0,
                    securities: []
                };
            }

            portfolioBreakdown.categories[categoryType].subcategories.push(categoryName);

            portfolioBreakdown.subcategories[categoryName].securities = securities.map(
                (security) => security.description
            );

            const subcategoryAllocation = securities.reduce(
                (sum, security) => sum + security.allocation,
                0
            );
            portfolioBreakdown.subcategories[categoryName].allocation = subcategoryAllocation;
            portfolioBreakdown.categories[categoryType].allocation += subcategoryAllocation;
        });

        return portfolioBreakdown;
    }, [data?.marketBreakdown]);

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
        if (data?.marketBreakdown) {
            setHistory([
                {
                    ...history[0],
                    ids: Object.keys(marketBreakdown.categories)
                }
            ]);
        }
    }, [data?.marketBreakdown]);

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
                !!marketBreakdown &&
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
                                    className={styles.assetAllocationNavigation}
                                    onClick={() => handleTransition('back')}
                                    src={BackIcon}
                                />}
                                {lastRecord.pageTitle}
                            </span>
                            <span className={styles.assetTotal}>
                                {`${lastRecord.ids.length} assets`}
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {history.length === 2 && <Chip
                            border='square'
                            className={styles.chip}
                        >Show Direct-Indexed
                                                 </Chip>}
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
                                    Object.keys(marketBreakdown[pageMapped])
                                        .filter(id => lastRecord.ids.includes(id))
                                        .map((id) => {
                                            return (
                                                <TableRow key={id}>
                                                    <TableCell>
                                                        <span>
                                                            {id}
                                                            <span className={styles.description}>
                                                                {'description' in marketBreakdown[pageMapped][id] ? marketBreakdown[pageMapped][id].description : ''}
                                                            </span>
                                                        </span>
                                                    </TableCell>
                                                    <TableCell align='right'>
                                                        <div className={styles.assetCell}>
                                                            <span>
                                                                {marketBreakdown[pageMapped][id].allocation / 100}%
                                                            </span>
                                                            <span
                                                                className={styles.assetAllocationNavigation}
                                                                onClick={() => handleTransition('forward', marketBreakdown[pageMapped][id][nextPage], id)}
                                                            >
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
                                                Object.keys(marketBreakdown[pageMapped])
                                                    .filter(id => lastRecord.ids.includes(id))
                                                    .reduce((accumulator, value) => {
                                                        accumulator += marketBreakdown[pageMapped][value].allocation;

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