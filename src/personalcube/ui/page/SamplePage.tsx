
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { ContentLayout } from '../../../shared';


@reactAutobind
class SamplePage extends Component {
  //
  render() {
    return (
      <ContentLayout>
        <h1>Sample</h1>
      </ContentLayout>
    );
  }
}

export default SamplePage;
