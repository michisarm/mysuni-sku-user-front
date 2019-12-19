
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout, ContentHeader, mobxHelper } from 'shared';
import { SkProfileModel, EmployeeModel, SkProfileService, StudySummary } from 'profile';
import { ChannelModel } from 'college';
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
    const { companyNames: company, departmentNames: realTeam  } = member as EmployeeModel;
    const { studySummary } = skProfileService as SkProfileService;
    const { favoriteChannels } = studySummary as StudySummary;

    const channels = favoriteChannels && favoriteChannels.idNames && favoriteChannels.idNames
      && favoriteChannels.idNames.map(channel => new ChannelModel({ ...channel, channelId: channel.id })) || [];

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
              name={member.names.string}
              teams={[company && company.string || '', realTeam && realTeam.string || '']}
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
