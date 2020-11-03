import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'semantic-ui-less/semantic.less';

import '@nara.drama/approval/lib/snap.css';

import './style/css/main.19ba8933.chunk.css';
import './style/css/2.84fb28b1.chunk.css';

import './style/app.css';
import 'react-quill/dist/quill.snow.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeBody } from './shared/helper/bodyHelper';

initializeBody();

ReactDOM.render(<App />, document.getElementById('root'));
