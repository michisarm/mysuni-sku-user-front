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

//2021-01-28
import './style/css/2.bc941637.chunk.css';
import './style/css/main.7d7b4bea.chunk.css';

initializeBody();

ReactDOM.render(<App />, document.getElementById('root'));
