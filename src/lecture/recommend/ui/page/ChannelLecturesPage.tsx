
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { ChannelModel, CollegeService } from 'college';
import ChannelLecturesHeaderView from '../view/ChannelLecturesHeaderView';
import ChannelLecturesContainer from '../../../category/ui/logic/ChannelLecturesContainer';


interface Props extends RouteComponentProps<{ channelId: string }> {
  collegeService: CollegeService,
}

@inject('collegeService')
@reactAutobind
@observer
class ChannelLecturesPage extends Component<Props> {
  //
  componentDidMount() {
    //
    const { match, collegeService } = this.props;
    const { params } = match;

    collegeService.findAllChannel();
    collegeService.findChannelById(params.channelId);
  }

  componentDidUpdate(prevProps: Props) {
    //
    const { match, collegeService } = this.props;

    if (prevProps.match.params.channelId !== match.params.channelId) {
      collegeService.findChannelById(match.params.channelId);
    }
  }

  onSelectChannel(channel: ChannelModel) {
    this.props.history.push(`/channel/${channel.id}/recommend`);
  }

  render() {
    //
    const { collegeService } = this.props;
    const { channel, channels } = collegeService;

    return (
      <ContentLayout
        className="mylearning"
        breadcrumb={[
          { text: `Recommend`, path: `/recommend` },
          { text: `${channel.name}`, path: `/channel/${channel.id}/recommend` },
        ]}
      >
        <ChannelLecturesHeaderView
          channel={channel}
          channels={channels}
          onSelectChannel={this.onSelectChannel}
        />
        <ChannelLecturesContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(ChannelLecturesPage);
