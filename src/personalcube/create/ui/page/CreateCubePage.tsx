import React from 'react';
import { ContentLayout } from '../../../../shared';
import { ContentWrapperWithHeader } from '../view/DetailElementsView';
import cubePaths from '../../../routePaths';
import CreateCubeContainer from '../logic/CreateCubeContainer';
import { useRequestCollege } from '../../../../shared/service/useCollege/useRequestCollege';
import { useRequestCineroom } from '../../../../shared/service/useCineroom/useRequestCineroom';

function CreateCubePage() {
  useRequestCollege();
  useRequestCineroom();

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