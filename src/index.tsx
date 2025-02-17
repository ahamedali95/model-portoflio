import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import '@layout/global';

const root = createRoot(document.getElementById('root')!);
root.render(
    <App />
);