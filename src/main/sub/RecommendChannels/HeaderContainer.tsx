
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button, Icon } from 'semantic-ui-react';
import { FavoriteChannelChangeModal } from 'shared-component';
import { SkProfileService } from 'profile';
import { ChannelModel } from 'college';
import lectureRoutePaths from 'lecture/routePaths';
import HeaderView from './HeaderView';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService
  favoriteChannels: ChannelModel[];
  onFindStudySummary: () => void,
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@reactAutobind
@observer
class HeaderContainer extends Component<Props> {
  //
  componentDidMount(): void {
    //
    this.init();
  }

  init() {
    //
    const { skProfileService } = this.props;
    skProfileService!.findSkProfile();
  }

  onViewAll() {
    //
    this.props.history.push(lectureRoutePaths.recommend());
  }

  render() {
    //
    const { skProfileService, favoriteChannels, onFindStudySummary } = this.props;
    const { skProfile } = skProfileService!;

    return (
      <HeaderView
        memberName={skProfile.member.name}
        onViewAll={this.onViewAll}
      >
        <FavoriteChannelChangeModal
          trigger={(
            <Button icon className="img-icon">
              <span className="underline">현재 선택된 관심 Channel(<span className="sel">{favoriteChannels.length}</span>)</span>
              <Icon className="setting17" /><span className="blind">setting</span>
            </Button>
          )}
          favorites={favoriteChannels}
          onConfirmCallback={onFindStudySummary}
        />
      </HeaderView>
    );
  }
}

export default withRouter(HeaderContainer);
