import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { ChannelModel } from 'college/model';
import { ActionLogService } from 'shared/stores';
import { CollegeService } from 'college/stores';
import { SkProfileService } from 'profile/stores';
import routePaths from '../../../routePaths';
import ChannelLecturesHeaderView from '../view/ChannelLecturesHeaderView';
import ChannelLecturesContainer from '../../../category/ui/logic/ChannelLecturesContainer';
import { getChannelName } from '../../../../shared/service/useCollege/useRequestCollege';

interface Props extends RouteComponentProps<{ channelId: string }> {
  actionLogService?: ActionLogService;
  collegeService: CollegeService;
  skProfileService: SkProfileService;
}

@inject(
  mobxHelper.injectFrom(
    'shared.actionLogService',
    'college.collegeService',
    'profile.skProfileService'
  )
)
@reactAutobind
@observer
class RecommendChannelLecturesPage extends Component<Props> {
  //
  componentDidMount() {
    //
    const { skProfileService } = this.props;

    skProfileService.findStudySummary();
  }

  onSelectChannel(channel: ChannelModel) {
    this.props.actionLogService?.registerClickActionLog({
      subAction: channel.name,
    });
    this.props.history.push(routePaths.recommendChannelLectures(channel.id));
  }

  render() {
    //
    const {
      skProfileService,
      match: {
        params: { channelId },
      },
    } = this.props;
    const { studySummaryFavoriteChannels } = skProfileService;
    const channel: ChannelModel = new ChannelModel({
      id: channelId,
      name: getChannelName(channelId),
    });

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
          channels={studySummaryFavoriteChannels.map(
            channel => new ChannelModel(channel)
          )}
          onSelectChannel={this.onSelectChannel}
        />
        <ChannelLecturesContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(RecommendChannelLecturesPage);
