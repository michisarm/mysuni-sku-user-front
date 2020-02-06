
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentHeader } from 'shared';
import { FavoriteChannelChangeModal } from 'sharedComponent';
import { SkProfileService } from 'profile';
import { ChannelModel } from 'college';
import { CollegeLectureCountService } from 'lecture';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import { Icon, Label } from 'semantic-ui-react';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService
  collegeLectureCountService?: CollegeLectureCountService
  channels: ChannelModel[]
}

@inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'lecture.collegeLectureCountService',
))
@observer
@reactAutobind
class ChannelsContentHeaderContainer extends Component<Props> {
  //
  componentDidMount(): void {
    this.init();
  }

  init() {
    //
    const { skProfileService, collegeLectureCountService } = this.props;

    skProfileService!.findSkProfile();
    skProfileService!.findStudySummary();
    collegeLectureCountService!.findCollegeLectureCounts();
  }

  getFavoriteChannelButton() {
    //
    return (
      <Label className="onlytext">
        <Icon className="channel16" /><span><a>관심 Channel</a></span>
      </Label>
    );
  }

  render() {
    //
    const { skProfileService, collegeLectureCountService, channels } = this.props;
    const { studySummaryFavoriteChannels } = skProfileService!;
    const { member } = skProfileService!.skProfile;

    const favoriteChannels = studySummaryFavoriteChannels.map((channel) =>
      new ChannelModel({ ...channel, channelId: channel.id, checked: true })
    );

    return (
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
            top={
              <FavoriteChannelChangeModal
                trigger={this.getFavoriteChannelButton()}
                favorites={favoriteChannels}
                onConfirmCallback={() => {}}
              />
            }
            totalChannelCount={collegeLectureCountService!.totalChannelCount}
            favoriteChannelCount={channels.length || 0}
          />
        </ContentHeader.Cell>
      </ContentHeader>
    );
  }
}

export default withRouter(ChannelsContentHeaderContainer);
