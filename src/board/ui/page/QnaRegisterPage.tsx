
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import QnaRegisterContainer from '../logic/QnaRegisterContainer';
import { QnaRegisterContentHeaderView } from '../view/QnaRegisterElementsView';


@observer
@reactAutobind
class QnaRegisterPage extends Component {
  //
  render() {
    //
    return (
      <ContentLayout className="bg-white">
        <QnaRegisterContentHeaderView />

        <QnaRegisterContainer />
      </ContentLayout>
    );
  }
}

export default QnaRegisterPage;
