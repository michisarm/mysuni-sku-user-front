import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeBody } from './shared/helper/bodyHelper';

import './style/app.css';
import 'react-quill/dist/quill.snow.css';

// 2021-03-12
import './style/css/2.1ba1de7b.chunk.css';
import './style/css/main.ef903c2d.chunk.css';

initializeBody();

ReactDOM.render(<App />, document.getElementById('root'));
