import React, {
    FC, ReactNode, createContext, useContext
} from 'react';

import styles from './TabStyles.module.css';

const MyTabContext = createContext<{ tabValue: string } | null>(null);

type TabProps = {
    onClick?: (value: string)=> unknown;
    children: ReactNode;
    value: string;
};

type TabListProps = {
    children: React.ReactElement<{ onClick: (value: string)=> unknown }>[];
    onChange: (value: string)=> unknown;
};

type TabContentProps = {
    children: ReactNode;
    value: string;
};

type TabContextProps = {
    value: string;
    children: ReactNode;
};

const TabContent: FC<TabContentProps> = ({ children, value }) => {
    const context = useContext(MyTabContext);

    return (
        <>
            {context?.tabValue === value ? children : null}
        </>
    );
};

const Tab: FC<TabProps> = ({ onClick = () => {}, children, value }) => {
    const context = useContext(MyTabContext);

    return (
        <h5
            className={`${styles.tab} ${value === context?.tabValue ? styles.tabSelected : ''}`}
            onClick={() => onClick(value)}
        >
            {children}
        </h5>
    );
};

const TabList: FC<TabListProps> = ({ children, onChange }) => {
    return (
        <div className={styles.tabListRootContainer}>
            {
                React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, {
                        key: index,
                        onClick: onChange
                    });
                })
            }
        </div>
    );
};

const TabContext: FC<TabContextProps> = ({ children, value }) => {
    return (
        <MyTabContext.Provider value={{ tabValue: value }}>
            {children}
        </MyTabContext.Provider>
    );
};

export {
    TabContext, Tab, TabList, TabContent
};