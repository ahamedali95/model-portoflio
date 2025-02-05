import React from 'react';
import {
    BrowserRouter, Navigate, Route, Routes
} from 'react-router';

import Dashboard from '@pages/dashboard/Dashboard';

const App = () => {
    return (
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
    );
};

export default App;