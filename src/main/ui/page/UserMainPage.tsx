
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { ActionEventService } from 'shared/stores';
import Carousel from '../../sub/Carousel';
import SearchBar from '../../sub/SearchBar';
import MyLearningSummary from '../../sub/MyLearningSummary';
import MyLearningContent from '../../sub/MyLearningContent';
// import Banner from '../../sub/Banner';
import RecommendChannels from '../../sub/RecommendChannels';
import MainModals from '../../sub/MainModals';



interface Props extends RouteComponentProps {
  actionEventService: ActionEventService
}

@inject(mobxHelper.injectFrom(
  'shared.actionEventService'
))
@reactAutobind
@observer
class UserMainPage extends Component<Props> {

  componentDidMount() {
    this.publishViewEvent();
  }

  publishViewEvent() {
    const { actionEventService } = this.props;
    const menu = 'MAIN_VIEW';

    actionEventService.registerViewActionLog({menu});
  }

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
