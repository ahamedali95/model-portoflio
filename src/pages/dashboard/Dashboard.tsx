import React from 'react';

import styles from './DashboardStyles.module.css';
import Header from './Header';
import HistoricalPerformance from './HistoricalPerformance';
import MarketBreakdown from './MarketBreakdown';
import ModelDetails from './ModelDetails';

const Dashboard = () => {
    return (
        <div className={styles.rootContainer}>
            <Header />
            <ModelDetails />
            <HistoricalPerformance />
            <MarketBreakdown />
        </div>
    );
};

export default Dashboard;