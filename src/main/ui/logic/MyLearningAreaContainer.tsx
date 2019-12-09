
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import MyLearningSummaryView from '../view/MyLearningSummaryView';
import MyLearningContentView from '../view/MyLearningContentView';


@reactAutobind
class MyLearningAreaContainer extends Component {
  //
  render() {
    return (
      <>
        <MyLearningSummaryView />
        <MyLearningContentView />
      </>
    );
  }
}

export default MyLearningAreaContainer;
