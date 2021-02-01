import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';
import { FavoriteChannelChangeModal } from 'shared';
import { ActionLogService } from 'shared/stores';
import { ChannelModel } from 'college/model';
import { SkProfileService } from 'profile/stores';

import ReactGA from 'react-ga';

interface Props {
  actionLogService?: ActionLogService;
  skProfileService?: SkProfileService;
  title?: React.ReactNode;
  configurable?: boolean;
  channels: ChannelModel[];
  onSelectChannel: (e: any, data: OnSelectChannelData) => void;
  onConfirmCallback?: () => void;
}

interface OnSelectChannelData {
  index: number;
  channel: ChannelModel;
}

interface States {
  multiple: boolean;
  open: boolean;
}

@inject(
  mobxHelper.injectFrom('shared.actionLogService', 'profile.skProfileService')
)
@observer
@reactAutobind
class ChannelsPanelContainer extends Component<Props, States> {
  //
  static defaultProps = {
    title: null,
    configurable: false,
  };

  state = {
    multiple: false,
    open: false,
  };

  panelRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.setMultiple();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.channels.length !== this.props.channels.length) {
      this.setMultiple();
    }
  }

  setMultiple() {
    //
    const panelHeight = this.panelRef.current!.offsetHeight;

    if (panelHeight >= 70) {
      this.setState({ multiple: true });
    }
  }

  findStudySummary() {
    const { skProfileService } = this.props;

    skProfileService!.findStudySummary();
  }

  onToggle() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  onClickChannel(e: any, index: number, channel: ChannelModel) {
    //
    const { onSelectChannel } = this.props;

    this.onClickActionLog(channel.name);

    onSelectChannel(e, {
      index,
      channel,
    });

    // react-ga event
    ReactGA.event({
      category: 'Recommend',
      action: 'Click',
      label: `Recommend-${channel.name}`,
    });
  }

  onClickActionLog(text: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: text });
  }

  render() {
    //
    const { channels, title, configurable, onConfirmCallback } = this.props;
    const { multiple, open } = this.state;

    return (
      <div className="channel-of-interest">
        <div className="table-css type2 type3">
          <div className="row">
            <div className="cell vtop">
              <div className="tit-set">
                {title || `Channel (${channels.length})`}
                {configurable && (
                  <FavoriteChannelChangeModal
                    trigger={
                      <Button
                        icon
                        className="img-icon"
                        onClick={() =>
                          this.onClickActionLog('관심 Channel 보기')
                        }
                      >
                        <Icon className="setting17" />
                        <span className="blind">setting</span>
                      </Button>
                    }
                    favorites={channels}
                    onConfirmCallback={() => {
                      this.findStudySummary();
                      if (onConfirmCallback) onConfirmCallback();
                    }}
                  />
                )}
              </div>
            </div>
            <div className="cell vtop">
              <div
                className={classNames({
                  'item-wrap': true,
                  active: open,
                })}
              >
                <div className="belt" ref={this.panelRef}>
                  {channels.map((channel, index) => (
                    <Button
                      key={`sub-category-${index}`}
                      className={`toggle toggle4 ${
                        channel.checked ? 'active' : ''
                      }`}
                      onClick={e => this.onClickChannel(e, index, channel)}
                    >
                      {channel.name}
                    </Button>
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
                        s26: true,
                        'arrow-down': !open,
                        'arrow-up': open,
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

export default ChannelsPanelContainer;
