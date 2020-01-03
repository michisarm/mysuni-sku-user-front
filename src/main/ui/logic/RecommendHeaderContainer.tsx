
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Icon } from 'semantic-ui-react';
import { FavoriteChannelChangeModal } from 'shared-component';
import { inject, observer } from 'mobx-react';
import { SkProfileModel, SkProfileService, StudySummary } from 'profile';
import { ChannelModel } from 'college';
import { mobxHelper } from 'shared';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@reactAutobind
@observer
class RecommendHeaderContainer extends Component<Props> {
  //
  componentDidMount(): void {
    this.init();
  }

  init() {
    const { skProfileService } = this.props;

    skProfileService!.findSkProfile();
    this.findStudySummary();
  }

  findStudySummary() {
    const { skProfileService } = this.props;

    skProfileService!.findStudySummary();
  }

  render() {
    //
    const { skProfileService } = this.props;
    const { skProfile } = skProfileService as SkProfileService;

    const { member } = skProfile as SkProfileModel;
    const { studySummary } = skProfileService as SkProfileService;
    const { favoriteChannels } = studySummary as StudySummary;

    const channels = favoriteChannels && favoriteChannels.idNames && favoriteChannels.idNames
      && favoriteChannels.idNames.map(channel => new ChannelModel({ ...channel, channelId: channel.id })) || [];

    return (
      <div className="recommend-head">
        <span className="tit">{member.name}님을 위한 추천 채널</span>
        <Button icon className="right btn-black" onClick={() => this.props.history.push('/recommend')}>
          View all<Icon className="morelink" />
        </Button>
        <div className="right">
          <FavoriteChannelChangeModal
            trigger={(
              <Button icon className="img-icon">
                <span className="underline">현재 선택된 관심 Channel(<span className="sel">{channels.length}</span>)</span>
                <Icon className="setting17" /><span className="blind">setting</span>
              </Button>
            )}
            favorites={channels}
            onConfirmCallback={this.findStudySummary}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(RecommendHeaderContainer);
