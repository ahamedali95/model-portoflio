import React from 'react';

import { sx } from '@util';

import Header from './Header';
import HistoricalPerformance from './HistoricalPerformance';
import MarketBreakdown from './MarketBreakdown';
import ModelDetails from './ModelDetails';

const Dashboard = () => {
    return (
        <div className={sx('flex flex-col justify-center ml-12 mr-12')}>
            <Header />
            <ModelDetails />
            <HistoricalPerformance />
            <MarketBreakdown />
        </div>
    );
};

export default Dashboard;