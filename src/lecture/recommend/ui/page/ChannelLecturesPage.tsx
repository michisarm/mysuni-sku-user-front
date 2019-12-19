
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { CollegeService } from 'college';
import ChannelLecturesHeaderView from '../view/ChannelLecturesHeaderView';
import ChannelLecturesContainer from '../logic/ChannelLecturesContainer';


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

    // collegeService.findAllChannels();
    // collegeService.findChannel(params.channelId);
  }

  componentDidUpdate(prevProps: Props) {
    //
    const { match, collegeService } = this.props;

    if (prevProps.match.params.channelId !== match.params.channelId) {
      // collegeService.findChannel(match.params.channelId);
    }
  }


  render() {
    //
    const { collegeService } = this.props;
    const { college, channel } = collegeService;

    return (
      <ContentLayout
        className="mylearning"
        breadcrumb={[
          { text: `${college.name} College`, path: `../../${college.collegeId}` },
          { text: `${channel.name} Channel` },
        ]}
      >
        <ChannelLecturesHeaderView
          channel={collegeService.channel}
        />
        {/*<ChannelLecturesContainer />*/}
      </ContentLayout>
    );
  }
}

export default withRouter(ChannelLecturesPage);
