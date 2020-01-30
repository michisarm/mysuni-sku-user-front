
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout, ContentHeader } from 'shared';
import { SkProfileService } from 'profile';
import { ChannelModel } from 'college';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import routePaths from '../../../routePaths';
import ChannelsLecturesContainer from '../logic/ChannelsLecturesContainer';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
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

  routeTo(e: any, data: any) {
    //
    const { channel } = data;

    this.props.history.push(routePaths.recommendChannelLectures(channel.id));
  }

  render() {
    //
    const { skProfileService } = this.props;
    const { member } = skProfileService!.skProfile;
    const { studySummaryFavoriteChannels } = skProfileService!;
    const channels = studySummaryFavoriteChannels.map(channel => new ChannelModel({ ...channel, channelId: channel.id })) || [];

    return (
      <ContentLayout
        className="mylearning"
        breadcrumb={[
          { text: `Recommend` },
        ]}
      >
        <ContentHeader className="content-division">
          <ContentHeader.Cell inner>
            <ContentHeader.ProfileItem
              image={member.photoFilePath || profileImg}
              name={member.name}
              company={member.company}
              department={member.department}
              imageEditable={false}
              myPageActive
            />
          </ContentHeader.Cell>
          <ContentHeader.Cell inner>
            <ContentHeader.RecommendItem
              favoriteChannelCount={channels.length || 0}
            />
          </ContentHeader.Cell>
        </ContentHeader>
        <ChannelsLecturesContainer
          channels={channels}
          onViewAll={this.routeTo}
        />
      </ContentLayout>
    );
  }
}

export default withRouter(ChannelLecturesPage);
