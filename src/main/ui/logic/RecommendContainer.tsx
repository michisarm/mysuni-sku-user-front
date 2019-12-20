
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import MyLearningSummaryView from '../view/MyLearningSummaryView';
import MyLearningContentView from '../view/MyLearningContentView';


@reactAutobind
class RecommendContainer extends Component {
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

export default RecommendContainer;
