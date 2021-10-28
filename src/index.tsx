import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import '@nara.drama/approval/lib/snap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeBody } from './shared/helper/bodyHelper';

import './style/app.css';
import 'react-quill/dist/quill.snow.css';

// 2021-10-06 14:00
import { initializeI18nResource } from 'shared/viewmodel/PolyglotText';
import { repeatPolyfill } from './polyfill';

repeatPolyfill();
initializeBody();
initializeI18nResource()
  .then(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
  })
  .catch(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
  });
