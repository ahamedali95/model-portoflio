import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import {
    BrowserRouter, Navigate, Route, Routes
} from 'react-router';

import Dashboard from '@pages/dashboard/Dashboard';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache()
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Navigate
                    replace
                    to='/portfolio/3233283984/dashboard'
                />
                <Routes>
                    <Route
                        element={<Dashboard />}
                        path='/portfolio/:portfolioId/dashboard'
                    />
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    );
};

export default App;