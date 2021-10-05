import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import QnaDetailContainer from '../logic/QnaDetailContainer';
import { Area } from 'tracker/model';

@observer
@reactAutobind
class QnaDetailPage extends Component {
  //
  render() {
    //
    return (
      <ContentLayout
        className="support"
        breadcrumb={[{ text: 'Support' }, { text: '나의 이용문의' }]}
      >
        <div className="post-view-wrap" data-area={Area.BOARD_QNA_CONTENT}>
          <QnaDetailContainer />
        </div>
      </ContentLayout>
    );
  }
}

export default QnaDetailPage;
