import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// import 'semantic-ui-less/semantic.less';
// import '@nara.drama/approval/lib/snap.css';

import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import { initializeBody } from './shared/helper/bodyHelper';

import './style/app.css';
import './style/css/layout.css';
import './style/css/content.css';
import 'react-quill/dist/quill.snow.css';

import { polyfill } from './polyfill';
import { beforeAppInitialize } from './beforeAppInitialize';

polyfill();
initializeBody();
beforeAppInitialize()
  .then(() => {
    import('./App').then((AppModule: any) => {
      const App: any = AppModule.default;
      ReactDOM.render(<App />, document.getElementById('root'));
    });
  })
  .catch(() => {
    import('./App').then((AppModule: any) => {
      const App: any = AppModule.default;
      ReactDOM.render(<App />, document.getElementById('root'));
    });
  });
