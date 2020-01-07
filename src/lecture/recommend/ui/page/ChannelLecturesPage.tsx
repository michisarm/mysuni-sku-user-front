
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { ChannelModel, CollegeService } from 'college';
import routePaths from '../../../routePaths';
import ChannelLecturesHeaderView from '../view/ChannelLecturesHeaderView';
import LecturesByChannelContainer from '../logic/LecturesByChannelContainer';


interface Props extends RouteComponentProps<{ channelId: string }> {
  collegeService: CollegeService,
}

@inject(mobxHelper.injectFrom(
  'college.collegeService',
))
@reactAutobind
@observer
class ChannelLecturesPage extends Component<Props> {
  //
  componentDidMount() {
    //
    const { collegeService } = this.props;

    collegeService.findAllChannel();
  }

  onSelectChannel(channel: ChannelModel) {
    this.props.history.push(routePaths.recommendChannelLectures(channel.id));
  }

  render() {
    //
    const { collegeService } = this.props;
    const { channel, channels } = collegeService;

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
          channels={channels}
          onSelectChannel={this.onSelectChannel}
        />
        <LecturesByChannelContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(ChannelLecturesPage);
