
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import NoticeDetailContainer from '../logic/NoticeDetailContainer';
import { Area } from 'tracker/model';

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
          { text: 'Support' },
          { text: 'Notice' },
        ]}
      >
        <div
          className="post-view-wrap"
          data-area={Area.BOARD_NOTICE_CONTENT}
        >
          <NoticeDetailContainer />
        </div>
      </ContentLayout>
    );
  }
}

export default NoticeDetailPage;
