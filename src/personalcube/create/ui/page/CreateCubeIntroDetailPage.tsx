
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import routePaths from '../../../routePaths';
import DetailIntroContainer from '../logic/DetailIntroContainer';
import { ContentWrapperWithHeader } from '../view/DetailElementsView';


@observer
@reactAutobind
class CreateCubeIntroDetailPage extends Component {
  //
  render() {
    //
    return (
      <ContentLayout
        className="bg-white"
        breadcrumb={[
          { text: 'Create' },
          { text: 'Create', path: routePaths.createCreate() },
        ]}
      >
        <ContentWrapperWithHeader>
          <DetailIntroContainer />
        </ContentWrapperWithHeader>
      </ContentLayout>
    );
  }
}

export default CreateCubeIntroDetailPage;
