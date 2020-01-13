
import React from 'react';
import { axiosApi, setCustomDialog } from '@nara.platform/accent';

import Dialog from 'shared/components/Dialog';
import StoreProvider from './StoreProvider';
import Routes from './Routes';


initAxios();
setCustomDialog(onCustomDialog);


function App() {
  return (
    <StoreProvider>
      <Routes />
    </StoreProvider>
  );
}

function initAxios() {
  //
  if (process.env.NODE_ENV !== 'development') {
    axiosApi.setCatch(401, () => window.location.href = '/login');
  }
  axiosApi.setCatch(500, (e: any) => {
    const message = e.response.data['nara-message'];
    // reactAlert({ title: '알림', message: message || '서버 오류입니다.' });
    console.warn(message || '서버 오류입니다.');
  });
}

function onCustomDialog(options: any) {
  //
  const { type, title, message, warning, onClose, onOk, onCancel } = options;

  if (type === 'alert') {
    return (
      <Dialog
        warning={warning}
        title={title}
        message={message}
        onClose={onClose}
        onCancel={onCancel}
      />
    );
  } else if (type === 'confirm') {
    const okFunction = typeof onOk === 'function' ? onOk : () => {};

    return (
      <Dialog
        warning={warning}
        title={title}
        message={message}
        onOk={okFunction}
        onCancel={onCancel}
      />
    );
  }
  return null;
}

export default App;
