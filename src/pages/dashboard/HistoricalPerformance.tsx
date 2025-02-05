import React from 'react';
import { useParams } from 'react-router';

import { useQuery } from '@/api';
import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader } from '@/components/Card';
import TriangleIcon from '@assets/icons/triangle.svg';

import styles from './DashboardStyles.module.css';
import type { HistoricalPerformance } from '../../../api-definitions';

enum TimeSpan {
    '1Y' = '1',
    '3Y' = '3',
    '5Y' = '5',
    '10Y' = '10'
}

const HistoricalPerformance = () => {
    const [ timeFrame, setTimeFrame ] = React.useState<TimeSpan>(TimeSpan['1Y']);
    const params = useParams();
    const { data } = useQuery<HistoricalPerformance>(`/api/portfolio/${params.portfolioId}/performance/${timeFrame}`);

    return (
        <Card className={styles.card}>
            <CardHeader>
                <div className={styles.cardHeader}>
                    <span>
                        Historical Performance
                    </span>
                    <span className={styles.metrics}>
                        <img
                            alt='logo'
                            src={TriangleIcon}
                        />
                        <span>{`+${data?.twr}%`}</span>
                    </span>
                </div>
            </CardHeader>
            <CardContent className={styles.cardContent}>
                {
                    Object.keys(TimeSpan)
                        .map((time) => {
                            const timeKey = time as keyof typeof TimeSpan;

                            return (
                                <Button
                                    className={styles.timeSpanBtn}
                                    key={time}
                                    name='year'
                                    onClick={() => setTimeFrame(TimeSpan[timeKey])}
                                    variant={timeFrame === TimeSpan[timeKey] ? 'contained' : 'text'}
                                >
                                    {time}
                                </Button>
                            );
                        })
                }
            </CardContent>
        </Card>
    );
};

export default HistoricalPerformance;