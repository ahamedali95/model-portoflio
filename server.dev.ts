import register from '@babel/register';

register({
    configFile: './babel.config.json'
});

import './server.src/index.ts';