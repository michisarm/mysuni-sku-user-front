
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import AnswerDetailContainer from '../logic/AnswerDetailContainer';


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
          { text: 'Support' },
          { text: 'Q&A' },
          { text: 'Answered' },
        ]}
      >
        <div className="post-view-wrap">
          <AnswerDetailContainer />
        </div>
      </ContentLayout>
    );
  }
}

export default AnswerDetailPage;
