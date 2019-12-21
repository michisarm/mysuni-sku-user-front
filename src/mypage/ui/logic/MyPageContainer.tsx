
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { ContentLayout } from 'shared';
import { inject, observer } from 'mobx-react';
import TitleContainer from './TitleContainer';
import MenuItemContainer from './MenuItemContainer';
import { SkProfileService } from '../../../profile';
import { CollegeService } from '../../../college';

interface Props{
  skProfileService : SkProfileService
  collegeService : CollegeService
}

@inject('skProfileService', 'collegeService')
@observer
@reactAutobind
class MyPageContainer extends Component<Props> {

  componentDidMount(): void {
    const { skProfileService, collegeService } = this.props;
    if (skProfileService) {
      skProfileService.findSkProfile();  //login한 사용자
      skProfileService.findStudySummary();
      collegeService.findAllColleges();
    }

  }

  channelChange() {
    const { collegeService } = this.props;
    collegeService.favoriteChannelChangeModalOpen = true;
  }

  handleCloseChannelChange() {
    const { collegeService } = this.props;
    collegeService.favoriteChannelChangeModalOpen = false;
  }

  render() {
    const { skProfile, studySummary } = this.props.skProfileService;
    return (
      <ContentLayout
        className = "MyPage"
        breadcrumb={[
          { text: 'MyPage', path: '/mypage' },
        ]}
      >
        <TitleContainer skProfile={skProfile}
          studySummary={studySummary}
          onFavoritChannelChange={this.channelChange}
        />
        <MenuItemContainer />
      </ContentLayout>
    );
  }
}

export default MyPageContainer;
