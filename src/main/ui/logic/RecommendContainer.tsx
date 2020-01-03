
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Segment } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { SkProfileService, StudySummary } from 'profile';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from 'shared';
import { ChannelModel, CollegeService } from 'college';
import { RecommendChannelLecturesContainer } from 'lecture';
import RecommendHeaderContainer from './RecommendHeaderContainer';

interface Props extends RouteComponentProps{
  skProfileService?: SkProfileService
  collegeService?: CollegeService
}

@inject(mobxHelper.injectFrom('profile.skProfileService', 'college.collegeService'))
@observer
@reactAutobind
class RecommendContainer extends Component<Props> {
  //
  componentDidMount(): void {
    this.init();
  }

  init() {
    const { skProfileService } = this.props;

    skProfileService!.findSkProfile();
    skProfileService!.findStudySummary();
  }

  routeTo(e: any, data: any) {
    this.props.history.push(`/channel/${data.channel.id}/recommend`);
  }

  render() {
    const { skProfileService } = this.props;

    const { studySummary } = skProfileService as SkProfileService;
    const { favoriteChannels } = studySummary as StudySummary;

    const channels = favoriteChannels && favoriteChannels.idNames && favoriteChannels.idNames
      && favoriteChannels.idNames.map(channel => new ChannelModel({ ...channel, channelId: channel.id, checked: true })) || [];

    // channels.push(new ChannelModel({ id: 'CHN0000v', channelId: 'CHN0000v', name: '행복의 이해', checked: true }));
    // channels.push(new ChannelModel({ id: 'CHN0000q', channelId: 'CHN0000q', name: '마케팅', checked: true }));
    return (
      <div className="recommend-area" id="recommend">
        <Segment className="full">
          <RecommendHeaderContainer />
          {
            channels && channels.length
            && channels.map((channel: ChannelModel, index: number) => {
              if (!channel.checked) return null;
              return (
                <RecommendChannelLecturesContainer
                  channel={channel}
                  key={`channel_cont_${index}`}
                  onViewAll={this.routeTo}
                />
              );
            }) || null
          }
        </Segment>
      </div>
    );
  }
}

export default withRouter(RecommendContainer);
