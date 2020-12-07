import React, { useEffect } from 'react';
import { axiosApi, setCustomDialog } from '@nara.platform/accent';
import ReactGA from 'react-ga';

import Dialog from './shared/components/Dialog';
import StoreProvider from './StoreProvider';
import Routes from './Routes';
import { pdfjs } from 'react-pdf';

initAxios();
setCustomDialog(onCustomDialog);
initPdfjs();

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.panopto.com/scripts/embedapi.min.js';
    script.async = true;

    //FIXME 아래 방법으로 하는 것도 고려 필요.
    //const firstScriptTag = document.getElementsByTagName('script')[0];
    //if (firstScriptTag !== null) {
    //firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
    //}

    //react-ga init
    ReactGA.initialize(`${process.env.REACT_APP_API_GA_ID}`);

    document.body.appendChild(script);
    console.log('pathname', window.location.pathname);
    if (window.location.pathname === '/pages/1') {
      setTimeout(() => {
        ReactGA.pageview(window.location.pathname, [], 'mySUNI 메인');
      }, 1000);
    }
    if (window.location.pathname === '/') {
      setTimeout(() => {
        ReactGA.pageview('/', [], 'mySUNI 메인');
      }, 1000);
    }

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
  //pdfjs.GlobalWorkerOptions.workerSrc = process.env.PUBLIC_URL + '/assets/js/pdf.worker.min.js';
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
}

function initAxios() {
  //
  if (process.env.NODE_ENV !== 'development') {
    axiosApi.setCatch(401, () => (window.location.href = '/login'));
  }
  axiosApi.setCatch(500, (e: any) => {
    const message = e.response.data['nara-message'];
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
