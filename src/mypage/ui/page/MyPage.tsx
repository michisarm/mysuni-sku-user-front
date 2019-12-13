
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { ContentLayout } from 'shared';
import TitleContainer from '../logic/TitleContainer';
import CompletedContainer from '../logic/CompletedContainer';


@reactAutobind
class MyPage extends Component {
  //
  render() {
    return (
      <ContentLayout
        breadcrumb={[
          { text: 'depth1', path: '/depth1-path' },
          { text: 'depth2', path: '' },
        ]}
      >
        <TitleContainer />
        <CompletedContainer /> {/*tab event EarnedStampContainer*/}
      </ContentLayout>
    );
  }
}

export default MyPage;
