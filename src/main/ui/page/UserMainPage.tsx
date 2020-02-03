
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ContentLayout } from 'shared';
import Carousel from '../../sub/Carousel';
import SearchBar from '../../sub/SearchBar';
import MyLearningSummary from '../../sub/MyLearningSummary';
import MyLearningContent from '../../sub/MyLearningContent';
// import Banner from '../../sub/Banner';
import RecommendChannels from '../../sub/RecommendChannels';
import MainModals from '../../sub/MainModals';


interface Props extends RouteComponentProps {
}

@reactAutobind
@observer
class UserMainPage extends Component<Props> {
  //
  render() {
    //
    return (
      <ContentLayout className="main">
        <div className="main-wrap">
          <Carousel
            autoScrolling
          />
          <SearchBar />
          <MyLearningSummary />
          <MyLearningContent />
          {/*<Banner />*/}
          <RecommendChannels />
          <MainModals />
        </div>
      </ContentLayout>
    );
  }
}

export default withRouter(UserMainPage);
