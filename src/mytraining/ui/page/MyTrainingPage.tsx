
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentHeader, ContentLayout, ContentMenu, mobxHelper } from 'shared';
import { SkProfileModel, SkProfileService } from 'profile';
import MyLearningSummaryService from '../../present/logic/MyLearningSummaryService';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService
  myLearningSummaryService?: MyLearningSummaryService
}

interface State {
  type: string
}

@inject(mobxHelper.injectFrom('skProfileService', 'myTraining.myLearningSummaryService'))
@observer
@reactAutobind
class MyTrainingPage extends Component<Props, State> {
  //
  state= {
    type: 'InProgress',
  };

  componentDidMount(): void {
    this.init();
  }

  init() {
    const { skProfileService, myLearningSummaryService } = this.props;

    skProfileService!.findSkProfile();
    myLearningSummaryService!.findMyLearningSummary();
    this.onSelectMenu(this.state.type);
  }

  onSelectMenu(type: string) {
    switch (type) {
      case 'InMyList':
        break;
      case 'Required':
        break;
      case 'Retry':
        break;
      default:
    }

    this.setState({ type });
  }


  render() {
    //
    const { skProfileService, myLearningSummaryService } = this.props;
    const { skProfile } = skProfileService as SkProfileService;
    const { myLearningSummary } = myLearningSummaryService as MyLearningSummaryService;

    const { member } = skProfile as SkProfileModel;

    return (
      <ContentLayout
        className="mylearning"
        breadcrumb={[
          { text: `Learning` },
        ]}
      >
        <ContentHeader className="content-division">
          <ContentHeader.Cell inner>
            <ContentHeader.ProfileItem
              image={member && member.base64Photo || `${process.env.PUBLIC_URL}/images/all/profile-56-px.png`}
              name={member.name}
              teams={[member.company || '', member.department || '']}
              imageEditable={false}
              myPageActive
            />
          </ContentHeader.Cell>
          <ContentHeader.Cell inner>
            <ContentHeader.TotalTimeItem
              minute={myLearningSummary.totalLearningTime}
            />
            {
              myLearningSummary.suniLearningTime > 0 && myLearningSummary.myCompanyLearningTime > 0 && (
                <ContentHeader.ChartItem
                  universityTime={myLearningSummary.suniLearningTime}
                  myCompanyTime={myLearningSummary.myCompanyLearningTime}
                />
              ) || (
                <ContentHeader.WaitingItem
                  onClick={() => this.props.history.push('/recommend')}
                />
              )
            }
          </ContentHeader.Cell>
        </ContentHeader>
        <ContentMenu
          menus={[
            {
              name: 'In Progress',
              type: 'InProgress',
            },
            {
              name: 'In my list',
              type: 'InMyList',
            },
            {
              name: 'Enrolled',
              type: 'Enrolled',
            },
            {
              name: 'Required',
              type: 'Required',
            },
            {
              name: 'Completed',
              type: 'Completed',
            },
            {
              name: 'Retry',
              type: 'Retry',
            },
          ]}
          type={this.state.type}
          onSelectMenu={this.onSelectMenu}
        />
      </ContentLayout>
    );
  }
}

export default withRouter(MyTrainingPage);
