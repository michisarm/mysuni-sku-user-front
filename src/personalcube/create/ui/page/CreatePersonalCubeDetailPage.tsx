
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import routePaths from '../../../routePaths';
import PersonalCubeContentContainer from '../logic/PersonalCubeContentContainer';
import { ContentWrapperWithHeader } from '../view/DetailElementsView';


@observer
@reactAutobind
class CreatePersonalCubeDetailPage extends Component {
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
          <PersonalCubeContentContainer />
        </ContentWrapperWithHeader>
      </ContentLayout>
    );
  }
}

export default CreatePersonalCubeDetailPage;
