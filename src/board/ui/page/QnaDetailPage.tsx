
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import QnaDetailContainer from '../logic/QnaDetailContainer';


@observer
@reactAutobind
class QnaDetailPage extends Component {
  //
  render() {
    //
    return (
      <ContentLayout
        className="support"
        breadcrumb={[
          { text: 'Support' },
          { text: 'Q&A' },
        ]}
      >
        <div className="post-view-wrap">
          <QnaDetailContainer />
        </div>
      </ContentLayout>
    );
  }
}

export default QnaDetailPage;
