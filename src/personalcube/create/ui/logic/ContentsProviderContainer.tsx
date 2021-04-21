import React from 'react';
import { useRequestContentsProviders } from '../../service/useRequestContentsProvider';
import ContentsProviderSelecteView from '../view/ContentProviderSelecteView';

function ContentsProviderContainer() {
  useRequestContentsProviders();
  
  return (
    <>
      <ContentsProviderSelecteView />
    </>
  );
}

export default ContentsProviderContainer;