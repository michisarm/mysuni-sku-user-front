import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';
import { SkProfileService } from 'profile/stores';

import ReactGA from 'react-ga';
import { CheckableChannel } from '../../../../shared/viewmodel/CheckableChannel';
import { Action, Area } from 'tracker/model';
import { getChannelName } from 'shared/service/useCollege/useRequestCollege';
import { FavoriteChannelChangeModal } from 'shared';

interface Props {
  skProfileService?: SkProfileService;
  title?: React.ReactNode;
  configurable?: boolean;
  channels: CheckableChannel[];
  onSelectChannel: (e: any, data: OnSelectChannelData) => void;
  onConfirmCallback?: () => void;
}

interface OnSelectChannelData {
  index: number;
  channel: CheckableChannel;
}

interface States {
  multiple: boolean;
  open: boolean;
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@observer
@reactAutobind
class RecommendChannelsPanelContainer extends Component<Props, States> {
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

  onClickChannel(e: any, index: number, channel: CheckableChannel) {
    //
    const { onSelectChannel } = this.props;

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
                        data-area={Area.RECOMMEND_LIST}
                        data-action={Action.VIEW}
                        data-action-name="관심 채널 설정 PV"
                        data-pathname="관심 채널 설정"
                        data-page="#attention-channel"
                      >
                        <Icon
                          className="setting17"
                          style={{ position: 'relative' }}
                        />
                        <span className="blind">setting</span>
                      </Button>
                    }
                    favorites={channels.map((channel) => channel.id)}
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
                  {channels.map((channel, index) => {
                    if (getChannelName(channel.id) !== '') {
                      return (
                        <Button
                          key={`sub-category-${index}`}
                          className={`toggle toggle4 ${
                            channel.checked ? 'active' : ''
                          }`}
                          onClick={(e) =>
                            this.onClickChannel(e, index, channel)
                          }
                        >
                          {getChannelName(channel.id)}
                        </Button>
                      );
                    }
                  })}
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

export default RecommendChannelsPanelContainer;
