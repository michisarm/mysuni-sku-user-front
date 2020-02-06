
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { SkProfileService } from 'profile';
import { ChannelModel } from 'college';
import routePaths from '../../../routePaths';
import ChannelsContentHeaderContainer from '../logic/ChannelsContentHeaderContainer';
import ChannelsLecturesContainer from '../logic/ChannelsContainer';


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
    const { studySummaryFavoriteChannels } = skProfileService!;
    const channels = studySummaryFavoriteChannels.map(channel => new ChannelModel({ ...channel, channelId: channel.id })) || [];

    return (
      <ContentLayout
        className="mylearning"
        breadcrumb={[
          { text: `Recommend` },
        ]}
      >
        <ChannelsContentHeaderContainer
          channels={channels}
        />
        <ChannelsLecturesContainer
          channels={channels}
          onViewAll={this.routeTo}
        />
      </ContentLayout>
    );
  }
}

export default withRouter(ChannelLecturesPage);
