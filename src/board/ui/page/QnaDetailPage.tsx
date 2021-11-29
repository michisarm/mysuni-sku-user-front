import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import QnaDetailContainer from '../logic/QnaDetailContainer';
import { Area } from 'tracker/model';
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
          { text: '1:1 문의', path: routePaths.supportQnA() },
        ]}
      >
        <div className="post-view-wrap" data-area={Area.BOARD_QNA_CONTENT}>
          <QnaDetailContainer />
        </div>
      </ContentLayout>
    );
  }
}

export default QnaDetailPage;
