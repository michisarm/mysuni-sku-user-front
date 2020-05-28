
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import QnaModifyContainer from '../logic/QnaModifyContainer';
import { QnaModifyContentHeaderView } from '../view/QnaModifyElementsView';


@observer
@reactAutobind
class QnaModifyPagePage extends Component {
  //
  render() {
    //
    return (
      <ContentLayout className="bg-white">
        <QnaModifyContentHeaderView />

        <QnaModifyContainer />
      </ContentLayout>
    );
  }
}

export default QnaModifyPagePage;
