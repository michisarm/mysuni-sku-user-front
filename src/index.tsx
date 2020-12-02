import ReactGA from 'react-ga';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'semantic-ui-less/semantic.less';

import '@nara.drama/approval/lib/snap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeBody } from './shared/helper/bodyHelper';

import './style/app.css';
import 'react-quill/dist/quill.snow.css';

//2020-11-05
import './style/css/2.0fe58991.chunk.css';
import './style/css/main.dbdb0136.chunk.css';

initializeBody();

// ReactGA.initialize(`${process.env.REACT_APP_API_GA_ID}`);

ReactDOM.render(<App />, document.getElementById('root'));
