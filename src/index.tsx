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

// 2021-10-06 14:00
import './style/css/2.1ba1de7b.chunk.css';
import './style/css/main.eddd47d7.chunk.css';
import { initializeI18nResource } from 'shared/viewmodel/PolyglotText';
import { repeatPolyfill } from './polyfill';
import { axiosApi, StorageModel } from '@nara.platform/accent';

function onLogin() {
  //
  const postData = new FormData();
  postData.append('grant_type', 'password');
  postData.append('scope', 'client');
  postData.append('username', 'ss.park@sk.com');
  postData.append('password', '1');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa('nara:narasecret'),
    },
    noAuth: true,
  };

  return axiosApi
    .post('/api/checkpoint/oauth/token', postData, config)
    .then(({ data }: any) => {
      //
      if (!data.access_token) {
        return;
      }
      const accessToken = data.access_token;

      new StorageModel('cookie', 'isLogin').saveAsString('true');
      new StorageModel('localStorage', 'token').saveAsString(accessToken);
      new StorageModel('localStorage', 'workspaces').save(data.workspaces);
      new StorageModel('localStorage', 'displayName').saveAsString(
        data.displayName
      );
      new StorageModel('localStorage', 'email').saveAsString('ss.park@sk.com');
      // setCookie('token', accessToken);
      // setCookie('workspaces', JSON.stringify(data.workspaces));
      // setCookie('displayName', data.displayName);
      // setCookie('email', 'ss.park@sk.com');

      const cineroomWorkspaces = data.workspaces.cineroomWorkspaces;
      const cineroom = cineroomWorkspaces.find(
        (cineroom: any) => cineroom.name === 'SK University'
      );

      new StorageModel('localStorage', 'cineroomId').saveAsString(
        cineroom
          ? cineroom.id
          : cineroomWorkspaces[cineroomWorkspaces.length - 1].id
      );
      localStorage.setItem('dashBoardSentenceIndex', 'undefined');

      // setCookie('cineroomId', cineroom ? cineroom.id : cineroomWorkspaces[cineroomWorkspaces.length - 1].id);

      if (
        data.additionalInformation &&
        data.additionalInformation.companyCode
      ) {
        new StorageModel('localStorage', 'companyCode').saveAsString(
          data.additionalInformation.companyCode
        );
        // setCookie('companyCode', data.additionalInformation.companyCode);
      }
    });
}

onLogin().then(() => {
  repeatPolyfill();
  initializeBody();
  initializeI18nResource()
    .then(() => {
      ReactDOM.render(<App />, document.getElementById('root'));
    })
    .catch(() => {
      ReactDOM.render(<App />, document.getElementById('root'));
    });
});
