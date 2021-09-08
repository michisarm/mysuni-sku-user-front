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

// 2021-08-31-20:15
import './style/css/2.88bea98c.chunk.css';
import './style/css/main.9923d159.chunk.css';
import { initializeI18nResource } from 'shared/viewmodel/PolyglotText';

initializeBody();
initializeI18nResource()
  .then(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
  })
  .catch(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
  });
