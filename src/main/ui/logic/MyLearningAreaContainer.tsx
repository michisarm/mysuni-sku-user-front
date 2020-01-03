
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import MyLearningSummaryContainer from './MyLearningSummaryContainer';
import MyLearningContentContainer from './MyLearningContentContainer';


interface Props extends RouteComponentProps {
}

interface State {
}

@reactAutobind
class MyLearningAreaContainer extends Component<Props, State> {
  //

  render() {
    return (
      <>
        <MyLearningSummaryContainer />
        <MyLearningContentContainer />
      </>
    );
  }
}

export default withRouter(MyLearningAreaContainer);
