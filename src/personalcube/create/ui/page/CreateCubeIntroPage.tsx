
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import routePaths from '../../../routePaths';
import CubeIntroContentContainer from '../logic/CubeIntroContentContainer';
import { ContentWrapperWithHeader } from '../view/DetailElementsView';


@observer
@reactAutobind
class CreateCubeIntroPage extends Component {
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
          <CubeIntroContentContainer />
        </ContentWrapperWithHeader>
      </ContentLayout>
    );
  }
}

export default CreateCubeIntroPage;
