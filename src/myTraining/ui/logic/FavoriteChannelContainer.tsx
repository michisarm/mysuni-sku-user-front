
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { reaction } from 'mobx';

import classNames from 'classnames';
import { Button, Icon, Label } from 'semantic-ui-react';
import { FavoriteChannelChangeModal } from 'shared';
import { ChannelModel } from 'college/model';
import { ActionLogService } from 'shared/stores';
import { CollegeService } from 'college/stores';
import { SkProfileService } from 'profile/stores';

interface Props {
  actionLogService?: ActionLogService
  skProfileService?: SkProfileService
  collegeService?: CollegeService
}

interface States {
  multiple: boolean
  open: boolean
}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'college.collegeService',
  'profile.skProfileService'))
@observer
@reactAutobind
class FavoriteChannelContainer extends Component<Props, States> {
  //
  panelRef = React.createRef<HTMLDivElement>();

  channelsRef = React.createRef<HTMLDivElement>();

  state = {
    multiple: false,
    open: false,
  };

  componentDidMount(): void {
    //
    this.init();
    this.reactionMultiple();
    this.setMultiple();
  }

  init() {
    const { skProfileService } = this.props;
    skProfileService!.findStudySummary();
  }

  reactionMultiple() {
    //
    const { skProfileService } = this.props;

    reaction(
      () => skProfileService!.studySummaryFavoriteChannels,
      this.setMultiple,
    );
  }

  setMultiple() {
    //
    const { current } = this.channelsRef;

    /* 
      기존에는 current.offsetHeight > 32 이였으나 적용이 되지 않아 60 으로 수정함.
      관심 channel 목록이 두 줄인 경우, 63 정도의 높이가 나옴.
      하지만 반응형 size 를 고려한 정확한 수치가 필요함.
    */
    if (current && current.offsetHeight > 60) {
      this.setState({ multiple: true });
    } else {
      this.setState({ multiple: false });
    }
  }

  onToggle() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  onClickActionLog(text: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: text });
  }

  render() {
    const { skProfileService } = this.props;
    const { studySummaryFavoriteChannels } = skProfileService!;
    const { multiple, open } = this.state;

    const channels = studySummaryFavoriteChannels.map(channel =>
      new ChannelModel({ id: channel.id, channelId: channel.id, name: channel.name, checked: true })
    );

    return (
      <div className="channel-of-interest">
        <div className="table-css type2">
          <div className="row">
            <div className="cell vtop">
              <div className="tit-set">관심 Channel({channels.length || 0})

                <FavoriteChannelChangeModal
                  favorites={channels}
                  onConfirmCallback={this.init}
                  trigger={(
                    <Button icon className="img-icon" onClick={() => this.onClickActionLog('관심 Channel')}>
                      <Icon className="setting17" />
                      <span className="blind">setting</span>
                    </Button>
                  )}
                />
              </div>
            </div>
            <div className="cell vtop">
              <div
                ref={this.panelRef}
                className={classNames({
                  'item-wrap': true,
                  active: open,
                })}
              >
                <div
                  ref={this.channelsRef}
                  className="belt"
                >
                  {channels && channels.length !== 0 && channels.map((channel, index) => (
                    <Label className="channel" key={`channel-${index}`}>{channel.name}</Label>
                  ))}
                </div>
              </div>
            </div>
            <div className="cell vtop">
              <div className="toggle-btn">
                {multiple && (
                  <Button icon className="img-icon" onClick={this.onToggle}>
                    <Icon
                      className={classNames({
                        'sum-open': !open,
                        'sum-close': open
                      })}
                    />
                    <span className="blind">open</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FavoriteChannelContainer;
