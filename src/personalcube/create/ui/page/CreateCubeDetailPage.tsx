import React from 'react';
import { ContentLayout } from '../../../../shared';
import cubePaths from '../../../routePaths';
import CreateCubeDetailContainer from '../logic/CreateCubeDetailContainer';
import { useRequestContentsProviders } from '../../service/useRequestContentsProvider';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';

function CreateCubeDetailPage() {
  useRequestContentsProviders();

  return (
    <ContentLayout
      className="bg-white"
      breadcrumb={[
        { text: getPolyglotText('Create', 'learning-BreadCreate-dth2') },
        {
          text: getPolyglotText('Create', 'learning-BreadCreate-dth3'),
          path: cubePaths.createCreate(),
        },
      ]}
    >
      <CreateCubeDetailContainer />
    </ContentLayout>
  );
}

export default CreateCubeDetailPage;
