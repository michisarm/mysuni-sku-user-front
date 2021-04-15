import React from 'react';
import { ContentLayout } from '../../../../shared';
import cubePaths from '../../../routePaths';
import { useRequestCollege } from '../../../../shared/service/useCollege/useRequestCollege';
import { useRequestCineroom } from '../../../../shared/service/useCineroom/useRequestCineroom';
import CreateCubeDetailContainer from '../logic/CreateCubeDetailContainer';


function CreateCubeDetailPage() {
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
      <CreateCubeDetailContainer />
    </ContentLayout>
  );
}

export default CreateCubeDetailPage