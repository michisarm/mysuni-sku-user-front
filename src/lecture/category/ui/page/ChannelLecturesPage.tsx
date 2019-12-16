
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
    const { match, collegeService } = this.props;
    const { params } = match;

    collegeService.findChannel(params.collegeId, params.channelId);
  }

  componentDidUpdate(prevProps: Props) {
    //
    const { match, collegeService } = this.props;

    if (prevProps.match.params.collegeId !== match.params.collegeId) {
      collegeService.findCollege(match.params.collegeId);
    }
  }


  render() {
    //
    const { collegeService } = this.props;
    const { college, channel } = collegeService;

    return (
      <ContentLayout
        breadcrumb={[
          { text: `${college.name} College`, path: `../../${college.collegeId}` },
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
