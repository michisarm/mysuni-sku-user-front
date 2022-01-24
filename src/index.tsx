import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// import 'semantic-ui-less/semantic.less';
// import '@nara.drama/approval/lib/snap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { patronInfo } from '@nara.platform/dock';
import { initializeBody } from './shared/helper/bodyHelper';

import './style/app.css';
import './style/css/layout.css';
import './style/css/content.css';
import 'react-quill/dist/quill.snow.css';
import '@sku/skuniv-ui-comment/lib/skuniv-ui-comment.css';

import { polyfill } from './polyfill';
import { beforeAppInitialize } from './beforeAppInitialize';
import { axiosApi } from '@nara.platform/accent';
import { currentAudienceId } from 'shared/helper/currentAudienceId';
import { isSuperManager } from 'shared/helper/isSuperManager';
import { getParentId } from 'shared/service/useRequestUserWorkspaces';

initAxios();
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

function initAxios() {
  if (isSuperManager()) {
    axiosApi.interceptors.request.use((config) => {
      const cineroomId = patronInfo.getCineroomId();
      const parentId = getParentId(cineroomId || '');
      config.headers.audienceId = currentAudienceId();
      if (parentId) {
        config.headers.cineroomIds = [cineroomId, parentId];
      } else {
        config.headers.cineroomIds = [cineroomId];
      }
      return config;
    });
  }

  if (process.env.NODE_ENV !== 'development') {
    axiosApi.setCatch(401, () => (window.location.href = '/login'));
  }
  axiosApi.setCatch(500, (e: any) => {
    const message = e.response.data['nara-message'];
    console.error(message);
  });
}
