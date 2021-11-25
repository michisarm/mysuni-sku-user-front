import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import FaqDetailContainer from '../logic/FaqDetailContainer';
import { Area } from 'tracker/model';
import routePaths from 'board/routePaths';

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
          { text: 'Help Center', path: routePaths.supportNotice() },
          { text: 'FAQ' },
        ]}
      >
        <div className="post-view-wrap" data-area={Area.BOARD_FAQ_CONTENT}>
          <FaqDetailContainer />
        </div>
      </ContentLayout>
    );
  }
}

export default FaqDetailPage;
