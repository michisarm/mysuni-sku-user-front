
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'semantic-ui-less/semantic.less';

import '@nara.drama/approval/lib/snap.css';

import './style/css/main.593f014c.chunk.css';
// 0721 badge layout 변경
// import './style/css/2.6a3c6d3d.chunk.css';
// 0724 badge layout 변경 - 발급기관로고 분리
//import './style/css/2.b6563bb3.chunk.css';
// 0810 PSJ 뱃지 디자인 변경
//import './style/css/2.2e9b8fef.chunk.css';
// import './style/css/2.996508f7.chunk.css';
//import './style/css/2.19382c8f.chunk.css';
import './style/css/2.8e18ebd2.chunk.css';

import './style/app.css';
import 'react-quill/dist/quill.snow.css';


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeBody } from './shared/helper/bodyHelper';


initializeBody();

ReactDOM.render(<App />, document.getElementById('root'));
