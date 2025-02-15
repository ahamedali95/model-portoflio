import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router';

import { GET_MODEL_DETAILS } from '@api/queries';
import { Chip } from '@components/Chip';
import {
    Tab,
    TabContent,
    TabContext,
    TabList
} from '@components/TabContext';
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from '@components/Table';

import { type PortfolioDetail, RiskLevel } from '../../../api-definitions';

const ModelDetails = () => {
    const [ value, setValue ] = React.useState('1');
    const params = useParams();
    // REST API GET:
    // const { data } = useQuery<PortfolioBreakdown>(`/api/portfolio/${params.portfolioId}`);
    // GRAPHQL QUERY:
    const { data } = useQuery<{ portfolio: PortfolioDetail }>(GET_MODEL_DETAILS, { variables: { id: params.portfolioId }});
    const portfolio = data?.portfolio;

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
                                    <TableCell align='right'><Chip>{RiskLevel[portfolio?.riskLevel!]}</Chip>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tax Type</TableCell>
                                    <TableCell align='right'><Chip>{portfolio?.type}</Chip></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Created</TableCell>
                                    <TableCell align='right'>{portfolio?.created}</TableCell>
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
                                    <TableCell align='right'><Chip>{portfolio?.type}</Chip></TableCell>
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