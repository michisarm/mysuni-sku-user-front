
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { SkProfileService } from 'profile';
import { ChannelModel } from 'college';
import lectureRoutePaths from 'lecture/routePaths';
import { ChannelLecturesPanel } from 'lecture';
import HeaderContainer from './HeaderContainer';
import { Wrapper } from './RecommendElementsView';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@observer
@reactAutobind
class RecommendChannelsContainer extends Component<Props> {
  //
  componentDidMount(): void {
    this.findStudySummary();
  }

  findStudySummary() {
    //
    const { skProfileService } = this.props;
    skProfileService!.findStudySummary();
  }

  routeTo(e: any, data: any) {
    //
    this.props.history.push(lectureRoutePaths.recommendChannelLectures(data.channel.id));
  }


  render() {
    //
    const { skProfileService } = this.props;

    const { studySummaryFavoriteChannels } = skProfileService!;
    const favoriteChannels = studySummaryFavoriteChannels.map((channel) =>
      new ChannelModel({ ...channel, channelId: channel.id, checked: true })
    );

    return (
      <Wrapper>
        <HeaderContainer
          favoriteChannels={favoriteChannels}
          onFindStudySummary={this.findStudySummary}
        />

        {
          favoriteChannels.map((channel: ChannelModel, index: number) => (
            channel.checked && (
              <ChannelLecturesPanel
                key={`channel_cont_${index}`}
                channel={channel}
                onViewAll={this.routeTo}
              />
            )
          ))
        }
      </Wrapper>
    );
  }
}

export default withRouter(RecommendChannelsContainer);
