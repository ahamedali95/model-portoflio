import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router';

// import { useQuery } from '@api/hooks';
import { GET_HISTORICAL_PERFORMANCE } from '@api/queries';
import TriangleIcon from '@assets/icons/triangle.svg';
import { Button } from '@components/Button';
import { Card, CardContent, CardHeader } from '@components/Card';
import { sx } from '@util';

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
    // REST API GET
    // const { data } = useQuery<HistoricalPerformance>(`/api/portfolio/${params.portfolioId}/performance/${timeFrame}`);
    // GRAPHQL QUERY
    const { data } = useQuery<{ historicalPerformance: HistoricalPerformance }>(GET_HISTORICAL_PERFORMANCE, {
        variables: {
            id: params.portfolioId,
            timeSpan: timeFrame
        }
    });
    const historicalPerformance = data?.historicalPerformance;

    return (
        <Card className={sx('h-24 min-h-0 mt-4')}>
            <CardHeader>
                <div className='flex flex-row justify-between items-center'>
                    <span>
                        Historical Performance
                    </span>
                    <span className='font-bold color-accent-sucess flex flex-row items-center justify-center'>
                        <img
                            alt='logo'
                            src={TriangleIcon}
                        />
                        <span>{`+${historicalPerformance?.twr ?? ''}%`}</span>
                    </span>
                </div>
            </CardHeader>
            <CardContent className='flex justify-end'>
                {
                    Object.keys(TimeSpan)
                        .map((time) => {
                            const timeKey = time as keyof typeof TimeSpan;

                            return (
                                <Button
                                    className='min-w-0 w-16 h-4 leading-0 m-2'
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