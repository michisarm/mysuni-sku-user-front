import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import AnswerDetailContainer from '../logic/AnswerDetailContainer';
import { Area } from 'tracker/model';
import routePaths from 'board/routePaths';

@observer
@reactAutobind
class AnswerDetailPage extends Component {
  //
  render() {
    //
    return (
      <ContentLayout
        className="support"
        breadcrumb={[
          { text: 'Help Center', path: routePaths.supportNotice() },
          { text: 'Q&A' },
          { text: 'Answered' },
        ]}
      >
        <div className="post-view-wrap" data-area={Area.BOARD_QNA_CONTENT}>
          <AnswerDetailContainer />
        </div>
      </ContentLayout>
    );
  }
}

export default AnswerDetailPage;
