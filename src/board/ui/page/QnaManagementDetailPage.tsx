import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import QnaDetailContainer from '../logic/QnaDetailContainer';
import { Area } from 'tracker/model';
import QnaManagementDetailContainer from '../logic/QnaManagementDetailContainer';

@observer
@reactAutobind
class QnaDetailPage extends Component {
  //
  render() {
    //
    return (
      <ContentLayout
        className="support"
        breadcrumb={[{ text: 'Support' }, { text: '문의관리' }]}
      >
        <div className="post-view-wrap" data-area={Area.BOARD_QNA_CONTENT}>
          <QnaManagementDetailContainer />
        </div>
      </ContentLayout>
    );
  }
}

export default QnaDetailPage;
