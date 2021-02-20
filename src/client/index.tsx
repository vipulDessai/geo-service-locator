import React from 'react';
import ReactDOM from 'react-dom';

import { App } from '@/client/App';

import '@/client/_helpers/axios-configurator';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

module.hot.accept();