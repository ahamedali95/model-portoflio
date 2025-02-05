import React from 'react';
import { useParams } from 'react-router';

import { useQuery } from '@/api';
import { Chip } from '@/components/Chip';
import {
    Tab,
    TabContent,
    TabContext,
    TabList
} from '@/components/TabContext';
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from '@/components/Table';

import { type PortfolioDetail, RiskLevel } from '../../../api-definitions';

const ModelDetails = () => {
    const [ value, setValue ] = React.useState('1');
    const params = useParams();
    const { data } = useQuery<PortfolioDetail>(`/api/portfolio/${params.portfolioId}`);

    return (
        <>
            {
                !!data &&
                    <TabContext value={value}>
                        <TabList onChange={setValue}>
                            <Tab value='1'>Accounts</Tab>
                            <Tab value='2'>Model Details</Tab>
                        </TabList>
                        <TabContent value='2'>
                            <Table>

                                <TableBody>
                                    <TableRow>
                                        <TableCell>Risk Level</TableCell>
                                        <TableCell align='right'><Chip>{RiskLevel[data.riskLevel]}</Chip>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Tax Type</TableCell>
                                        <TableCell align='right'><Chip>{data.type}</Chip></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Created</TableCell>
                                        <TableCell align='right'>{data.created}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TabContent>
                        <TabContent value='1'>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Risk Level</TableCell>
                                        <TableCell align='right'><Chip>{RiskLevel['68']}</Chip></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Tax Type</TableCell>
                                        <TableCell align='right'><Chip>{data.type}</Chip></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Created</TableCell>
                                        <TableCell align='right'>2020-9-14</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TabContent>
                    </TabContext>
            }
        </>
    );
};

export default ModelDetails;