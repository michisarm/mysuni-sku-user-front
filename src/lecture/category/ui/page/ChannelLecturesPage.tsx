
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { CollegeService } from 'college';
import ChannelLecturesHeaderView from '../view/ChannelLecturesHeaderView';
import ChannelLecturesContainer from '../logic/ChannelLecturesContainer';


interface Props extends RouteComponentProps<{ collegeId: string, channelId: string }> {
  collegeService: CollegeService,
}

@inject('collegeService')
@reactAutobind
@observer
class ChannelLecturesPage extends Component<Props> {
  //
  componentDidMount() {
    //
    this.findCollegeAndChannel();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.match.params.collegeId !== this.props.match.params.collegeId
        || prevProps.match.params.channelId !== this.props.match.params.channelId) {
      this.findCollegeAndChannel();
    }
  }

  findCollegeAndChannel() {
    //
    const { match, collegeService } = this.props;

    collegeService.findCollegeAndChannel(match.params.collegeId, match.params.channelId);
  }


  render() {
    //
    const { collegeService } = this.props;
    const { college, channel } = collegeService;

    return (
      <ContentLayout
        breadcrumb={[
          { text: `${college.name} College`, path: `../../${college.collegeId}/channels` },
          { text: `${channel.name} Channel` },
        ]}
      >
        <ChannelLecturesHeaderView
          channel={collegeService.channel}
        />
        <ChannelLecturesContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(ChannelLecturesPage);
