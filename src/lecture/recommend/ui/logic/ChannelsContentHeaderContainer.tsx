
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentHeader } from 'shared';
import { SkProfileService } from 'profile';
import { ChannelModel } from 'college';
import { CollegeLectureCountService } from 'lecture';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';


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
    collegeLectureCountService!.findCollegeLectureCounts();
  }

  render() {
    //
    const { skProfileService, collegeLectureCountService, channels } = this.props;
    const { member } = skProfileService!.skProfile;

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
            totalChannelCount={collegeLectureCountService!.totalChannelCount}
            favoriteChannelCount={channels.length || 0}
          />
        </ContentHeader.Cell>
      </ContentHeader>
    );
  }
}

export default withRouter(ChannelsContentHeaderContainer);
