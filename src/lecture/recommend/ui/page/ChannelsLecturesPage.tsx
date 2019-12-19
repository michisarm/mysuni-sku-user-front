
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout, ContentHeader, mobxHelper } from 'shared';
import { SkProfileModel, EmployeeModel, TeamModel, SkProfileService, StudySummary } from 'profile';
import ChannelsLecturesContainer from '../logic/ChannelsLecturesContainer';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService
}

@inject(mobxHelper.injectFrom('skProfileService', 'collegeService'))
@observer
@reactAutobind
class ChannelLecturesPage extends Component<Props> {
  //
  componentDidMount(): void {
    this.init();
  }

  init() {
    const { skProfileService } = this.props;

    skProfileService!.findSkProfile();
    skProfileService!.findStudySummary();
  }

  routeTo(url: string) {
    this.props.history.push(url);
  }

  render() {
    //
    const { skProfileService } = this.props;
    const { skProfile } = skProfileService as SkProfileService;

    const { member } = skProfile as SkProfileModel;
    const { team } = member as EmployeeModel;
    const { company, team: realTeam } = team as TeamModel;
    const { studySummary } = skProfileService as SkProfileService;
    const { favoriteChannels } = studySummary as StudySummary;

    const channels = favoriteChannels && favoriteChannels.idNames && favoriteChannels.idNames || [];

    return (
      <ContentLayout
        className="mylearning"
        breadcrumb={[
          { text: `Recommend`, path: `/recommend` },
        ]}
      >
        <ContentHeader className="content-division">
          <ContentHeader.Cell inner>
            <ContentHeader.ProfileItem
              image={member && member.base64Photo || `${process.env.PUBLIC_URL}/images/all/profile-56-px.png`}
              name={member.name}
              teams={[company && company.name || '', realTeam && realTeam.name || '']}
              imageEditable={false}
              myPageActive
            />
          </ContentHeader.Cell>
          <ContentHeader.Cell inner>
            <ContentHeader.RecommendItem
              totalChannelCount={999}
              favoriteChannelCount={channels.length || 0}
            />
          </ContentHeader.Cell>
        </ContentHeader>
        <ChannelsLecturesContainer
          channels={channels}
          routeTo={this.routeTo}
        />
      </ContentLayout>
    );
  }
}

export default withRouter(ChannelLecturesPage);
