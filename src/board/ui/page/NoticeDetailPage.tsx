import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import NoticeDetailContainer from '../logic/NoticeDetailContainer';
import { Area } from 'tracker/model';
import routePaths from 'board/routePaths';

@observer
@reactAutobind
class NoticeDetailPage extends Component {
  //
  render() {
    //
    return (
      <ContentLayout
        className="support"
        breadcrumb={[
          { text: 'Help Center', path: routePaths.supportNotice() },
          { text: 'Notice', path: routePaths.supportNotice() },
        ]}
      >
        <div className="post-view-wrap" data-area={Area.BOARD_NOTICE_CONTENT}>
          <NoticeDetailContainer />
        </div>
      </ContentLayout>
    );
  }
}

export default NoticeDetailPage;
