
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import FaqDetailContainer from '../logic/FaqDetailContainer';


@observer
@reactAutobind
class FaqDetailPage extends Component {
  //
  render() {
    //
    return (
      <ContentLayout
        className="support"
        breadcrumb={[
          { text: 'Support' },
          { text: 'FAQ' },
        ]}
      >
        <div className="post-view-wrap">
          <FaqDetailContainer />
        </div>
      </ContentLayout>
    );
  }
}

export default FaqDetailPage;
