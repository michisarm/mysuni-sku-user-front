
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { ChannelModel, CollegeService } from 'college';
import { SkProfileService } from 'profile';
import routePaths from '../../../routePaths';
import ChannelLecturesHeaderView from '../view/ChannelLecturesHeaderView';
import LecturesByChannelContainer from '../logic/LecturesByChannelContainer';


interface Props extends RouteComponentProps<{ channelId: string }> {
  collegeService: CollegeService,
  skProfileService: SkProfileService,
}

@inject(mobxHelper.injectFrom(
  'college.collegeService',
  'profile.skProfileService',
))
@reactAutobind
@observer
class ChannelLecturesPage extends Component<Props> {
  //
  componentDidMount() {
    //
    const { skProfileService } = this.props;

    skProfileService.findStudySummary();
  }

  onSelectChannel(channel: ChannelModel) {
    this.props.history.push(routePaths.recommendChannelLectures(channel.id));
  }

  render() {
    //
    const { skProfileService, collegeService } = this.props;
    const { studySummaryFavoriteChannels } = skProfileService;
    const { channel } = collegeService;

    return (
      <ContentLayout
        className="mylearning"
        breadcrumb={[
          { text: `Recommend`, path: routePaths.recommend() },
          { text: `${channel.name}` },
        ]}
      >
        <ChannelLecturesHeaderView
          channel={channel}
          channels={studySummaryFavoriteChannels.map((channel) => new ChannelModel(channel))}
          onSelectChannel={this.onSelectChannel}
        />
        <LecturesByChannelContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(ChannelLecturesPage);
