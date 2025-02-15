import React from 'react';

import { Chip } from '@components/Chip';

import styles from './DashboardStyles.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <h2>
                Stacklet 80/20 Model Portfolio
            </h2>
            <div className={styles.portfolioType}>
                <Chip>Tax-Advantaged</Chip>
                <Chip>Stacklet</Chip>
            </div>
        </header>
    );
};

export default Header;