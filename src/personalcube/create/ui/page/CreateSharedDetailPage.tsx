
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import routePaths from '../../../routePaths';
import SharedDetailContainer from '../logic/SharedDetailContainer';


@observer
@reactAutobind
class CreateSharedDetailPage extends Component {
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
        <SharedDetailContainer />
      </ContentLayout>
    );
  }
}

export default CreateSharedDetailPage;
