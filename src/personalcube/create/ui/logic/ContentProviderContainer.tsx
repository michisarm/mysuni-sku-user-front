import React from 'react';
import { useRequestContentProvider } from '../../service/useRequestContentProvider';
import ContentProviderSelecteView from '../view/ContentProviderSelecteView';

function ContentProviderContainer() {
  useRequestContentProvider();

  return (
    <>
      <ContentProviderSelecteView />
    </>
  );
}

export default ContentProviderContainer;