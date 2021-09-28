import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import { Area } from 'tracker/model';
import QnaManagementDetailContainer from '../logic/QnaManagementDetailContainer';

@observer
@reactAutobind
class QnaManagementDetailPage extends Component {
  //
  render() {
    //
    return (
      <ContentLayout
        className="support bg-white"
        breadcrumb={[{ text: 'Support' }, { text: 'QnA 관리' }]}
      >
        <div
          className="post-view-wrap"
          data-area={Area.BOARD_QNA_MANAGEMENT_CONTENT}
        >
          <QnaManagementDetailContainer />
        </div>
      </ContentLayout>
    );
  }
}

export default QnaManagementDetailPage;
