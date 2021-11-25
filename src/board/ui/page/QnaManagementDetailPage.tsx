import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import QnaDetailContainer from '../logic/QnaDetailContainer';
import { Area } from 'tracker/model';
import QnaManagementDetailContainer from '../logic/QnaManagementDetailContainer';
import routePaths from 'board/routePaths';

@observer
@reactAutobind
class QnaDetailPage extends Component {
  //
  render() {
    //
    return (
      <ContentLayout
        className="support bg-white"
        breadcrumb={[
          { text: 'Help Center', path: routePaths.supportNotice() },
          { text: '문의관리', path: routePaths.supportQnAMgt() },
        ]}
      >
        <div className="post-view-wrap" data-area={Area.BOARD_QNA_CONTENT}>
          <QnaManagementDetailContainer />
        </div>
      </ContentLayout>
    );
  }
}

export default QnaDetailPage;
