
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { ContentLayout } from 'shared';


@reactAutobind
class SamplePage extends Component {
  //
  render() {
    return (
      <ContentLayout
        breadcrumb={[
          { text: 'depth1', path: '/depth1-path' },
          { text: 'depth2', path: '' },
        ]}
      >
        <h1>Sample</h1>
      </ContentLayout>
    );
  }
}

export default SamplePage;
