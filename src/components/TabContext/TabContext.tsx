import React, {
    FC, ReactNode, createContext, useContext
} from 'react';

import { sx } from '@util';

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
            className={sx('font-bold text-sm hover:cursor-pointer pr-4 pt-4 pb-4 mt-1 mb-0 mr-2 leading-4 text-neutral', value === context?.tabValue && 'border-b-2 border-solid text-text')}
            onClick={() => onClick(value)}
        >
            {children}
        </h5>
    );
};

const TabList: FC<TabListProps> = ({ children, onChange }) => {
    return (
        <div className={sx('flex flex-row border-b-2 border-neutral border-solid transition-0s mb-3')}>
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