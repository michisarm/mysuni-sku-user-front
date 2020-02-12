
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentHeader } from 'shared';
import { SkProfileService } from 'profile/stores';
import lectureRoutePaths from 'lecture/routePaths';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import { ContentHeaderTotalTimeItem } from '../../shared';
import MyLearningSummaryService from '../../present/logic/MyLearningSummaryService';


interface Props extends RouteComponentProps<{ tab: string, pageNo: string }> {
  skProfileService?: SkProfileService,
  myLearningSummaryService?: MyLearningSummaryService,
}

@inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'myTraining.myLearningSummaryService',
))
@observer
@reactAutobind
class MyLearningContentHeaderContainer extends Component<Props> {
  //
  componentDidMount(): void {
    this.init();
  }

  init() {
    //
    const { myLearningSummaryService } = this.props;

    myLearningSummaryService!.findMyLearningSummary();
  }

  render() {
    //
    const { skProfileService, myLearningSummaryService, history } = this.props;
    const { skProfile } = skProfileService!;
    const { member } = skProfile;
    const { myLearningSummary } = myLearningSummaryService!;

    return (
      <ContentHeader>
        <ContentHeader.Cell inner>
          <ContentHeader.ProfileItem
            myPageActive
            image={skProfile.photoFilePath || profileImg}
            name={member.name}
            company={member.company}
            department={member.department}
          />
        </ContentHeader.Cell>
        <ContentHeader.Cell inner>
          <ContentHeaderTotalTimeItem
            minute={myLearningSummary.totalLearningTime}
          />
          { (myLearningSummary.suniLearningTime > 0 || myLearningSummary.myCompanyLearningTime > 0) ?
            <ContentHeader.ChartItem
              universityTime={myLearningSummary.suniLearningTime}
              myCompanyTime={myLearningSummary.myCompanyLearningTime}
            />
            :
            <ContentHeader.WaitingItem
              onClick={() => history.push(lectureRoutePaths.recommend())}
            />
          }
        </ContentHeader.Cell>
      </ContentHeader>
    );
  }
}

export default withRouter(MyLearningContentHeaderContainer);
