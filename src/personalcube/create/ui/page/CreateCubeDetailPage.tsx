import React from 'react';
import { ContentLayout } from '../../../../shared';
import cubePaths from '../../../routePaths';
import { useRequestCollege } from '../../../../shared/service/useCollege/useRequestCollege';
import CreateCubeDetailContainer from '../logic/CreateCubeDetailContainer';
import { useRequestContentsProviders } from '../../service/useRequestContentsProvider';

function CreateCubeDetailPage() {
  useRequestCollege();
  useRequestContentsProviders();

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

export default CreateCubeDetailPage;
