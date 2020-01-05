
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import Carousel from '../../sub/Carousel';
import SearchBar from '../../sub/SearchBar';
import MyLearningSummary from '../../sub/MyLearningSummary';
import MyLearningContentContainer from '../../sub/MyLearningContent/MyLearningContentContainer';
import RecommendChannels from '../../sub/RecommendChannels';


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
          <Carousel />
          <SearchBar />
          <MyLearningSummary />
          <MyLearningContentContainer />
          <RecommendChannels />
        </div>
      </ContentLayout>
    );
  }
}

export default withRouter(UserMainPage);
