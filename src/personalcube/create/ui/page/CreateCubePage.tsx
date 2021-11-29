import React from 'react';
import cubePaths from '../../../routePaths';
import { ContentLayout } from '../../../../shared';
import { ContentWrapperWithHeader } from '../view/DetailElementsView';
import CreateCubeContainer from '../logic/CreateCubeContainer';

function CreateCubePage() {
  return (
    <ContentLayout
      className="bg-white"
      breadcrumb={[
        { text: 'Create' },
        { text: 'Create', path: cubePaths.createCreate() },
      ]}
    >
      <ContentWrapperWithHeader>
        <CreateCubeContainer />
      </ContentWrapperWithHeader>
    </ContentLayout>
  );
}

export default CreateCubePage;
