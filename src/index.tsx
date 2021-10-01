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

// 2021-09-29 19:11
import './style/css/2.1ba1de7b.chunk.css';
import './style/css/main.26713ef0.chunk.css';
import { initializeI18nResource } from 'shared/viewmodel/PolyglotText';

initializeBody();
initializeI18nResource()
  .then(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
  })
  .catch(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
  });
