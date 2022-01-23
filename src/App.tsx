import React, { useEffect } from 'react';
import { axiosApi, setCustomDialog } from '@nara.platform/accent';
import ReactGA from 'react-ga';

import Dialog from './shared/components/Dialog';
import StoreProvider from './StoreProvider';
import Routes from './Routes';
import { pdfjs } from 'react-pdf';
import { isSuperManager } from 'shared/helper/isSuperManager';
import { currentAudienceId } from 'shared/helper/currentAudienceId';

initAxios();
initDialog();
initPdfjs();

function App() {
  useEffect(() => {
    //react-ga init
    ReactGA.initialize(`${process.env.REACT_APP_API_GA_ID}`);

    const script = document.createElement('script');
    script.src = 'https://developers.panopto.com/scripts/embedapi.min.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <StoreProvider>
      <Routes />
    </StoreProvider>
  );
}

function initPdfjs() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
}

function initAxios() {
  if (isSuperManager()) {
    axiosApi.interceptors.request.use((config) => {
      config.headers.audienceId = currentAudienceId();
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

function initDialog() {
  function onCustomDialog(options: any) {
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
  setCustomDialog(onCustomDialog);
}

export default App;
