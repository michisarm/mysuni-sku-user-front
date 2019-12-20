
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Segment } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { SkProfileModel, SkProfileService, StudySummary } from 'profile';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from 'shared';
import { ChannelModel, CollegeService } from 'college';
import { RecommendChannelLecturesContainer } from 'lecture';
import RecommendHeaderView from '../view/RecommendHeaderView';

interface Props extends RouteComponentProps{
  skProfileService?: SkProfileService
  collegeService?: CollegeService
}

@inject(mobxHelper.injectFrom('skProfileService', 'collegeService'))
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

  routeTo(url: string) {
    this.props.history.push(url);
  }

  render() {
    const { skProfileService } = this.props;
    const { skProfile } = skProfileService as SkProfileService;

    const { member } = skProfile as SkProfileModel;
    const { studySummary } = skProfileService as SkProfileService;
    const { favoriteChannels } = studySummary as StudySummary;

    const channels = favoriteChannels && favoriteChannels.idNames && favoriteChannels.idNames
      && favoriteChannels.idNames.map(channel => new ChannelModel({ ...channel, channelId: channel.id })) || [];

    // channels.push(new ChannelModel({ id: 'CHN0000v', channelId: 'CHN0000v', name: '행복의 이해', checked: true }));
    // channels.push(new ChannelModel({ id: 'CHN0000q', channelId: 'CHN0000q', name: '마케팅', checked: true }));
    return (
      <div className="recommend-area" id="recommend">
        <Segment className="full">
          <RecommendHeaderView
            name={member.names.string}
            favoriteChannelCount={channels.length || 0}
            onViewAll={() => this.props.history.push(`${process.env.PUBLIC_URL}/recommend`)}
          />
          {
            channels && channels.length
            && channels.map((channel: ChannelModel) => {
              if (!channel.checked) return null;
              return (
                <RecommendChannelLecturesContainer
                  channel={channel}
                  routeTo={this.routeTo}
                  key={`channel_cont_${channel.id}`}
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
