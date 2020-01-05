
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import MainCarouselContainer from '../logic/MainCarouselContainer';
import SearchBar from '../../sub/SearchBar';
import MyLearningSummaryContainer from '../logic/MyLearningSummaryContainer';
import MyLearningContentContainer from '../logic/MyLearningContentContainer';
import RecommendContainer from '../logic/RecommendContainer';


interface Props extends RouteComponentProps {
}

@reactAutobind
@observer
class UserMainPage extends Component<Props> {
  //
  render() {
    //
    return (
      <ContentLayout>
        <div className="main-wrap">
          <MainCarouselContainer />
          <SearchBar />
          <MyLearningSummaryContainer />
          <MyLearningContentContainer />
          <RecommendContainer />
        </div>
      </ContentLayout>
    );
  }
}

export default withRouter(UserMainPage);
