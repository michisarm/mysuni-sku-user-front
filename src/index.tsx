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

// 2021-01-29
// import './style/css/2.bf2d4321.chunk.css';
// import './style/css/main.8d05ad6b.chunk.css';

import './style/css/2.8665e745.chunk.css';
import './style/css/main.efd3da57.chunk.css';

initializeBody();

ReactDOM.render(<App />, document.getElementById('root'));
