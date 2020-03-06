
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button, Icon } from 'semantic-ui-react';
import { ActionLogService } from 'shared/stores';
import { FavoriteChannelChangeModal } from 'shared';
import { ChannelModel } from 'college/model';
import { SkProfileService } from 'profile/stores';

import lectureRoutePaths from 'lecture/routePaths';
import HeaderView from './HeaderView';


interface Props extends RouteComponentProps {
  actionLogService?: ActionLogService,
  skProfileService?: SkProfileService,
  totalChannelCount: number,
  favoriteChannels: ChannelModel[],
  onFindStudySummary: () => void,
}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'profile.skProfileService',))
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
    const { actionLogService } = this.props;

    actionLogService?.registerClickActionLog({ subAction: 'View all' });

    this.props.history.push(lectureRoutePaths.recommend());
  }

  onConfirmFavorite() {
    //
    const { match, history, onFindStudySummary } = this.props;

    onFindStudySummary();

    if (match.path === '/') {
      history.replace('/');
    }
  }

  onClickActionLog(text: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: text });
  }

  render() {
    //
    const { skProfileService, totalChannelCount, favoriteChannels } = this.props;
    const { skProfile } = skProfileService!;

    return (
      <HeaderView
        memberName={skProfile.member.name}
        onViewAll={this.onViewAll}
      >
        <FavoriteChannelChangeModal
          trigger={(
            <Button icon className="img-icon" onClick={() => this.onClickActionLog('현재 선택된 관심 Channel')}>
              <span className="underline">현재 선택된 관심 Channel(<span className="sel">{favoriteChannels.length}</span>/{totalChannelCount})</span>
              <Icon className="setting17" /><span className="blind">setting</span>
            </Button>
          )}
          favorites={favoriteChannels}
          onConfirmCallback={this.onConfirmFavorite}
        />
      </HeaderView>
    );
  }
}

export default withRouter(HeaderContainer);
