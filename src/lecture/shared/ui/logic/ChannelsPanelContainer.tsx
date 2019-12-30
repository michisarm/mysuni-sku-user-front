
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';
import { mobxHelper } from 'shared';
import { FavoriteChannelChangeModal } from 'shared-component';
import { ChannelModel } from 'college';
import { SkProfileService } from 'profile';


interface OnSelectChannelData {
  index: number,
  channel: ChannelModel,
}

interface Props {
  skProfileService?: SkProfileService
  title?: React.ReactNode,
  configurable?: boolean,
  channels: ChannelModel[]
  onSelectChannel: (e: any, data: OnSelectChannelData) => void
}

interface States {
  open: boolean
}

@inject(mobxHelper.injectFrom('skProfileService'))
@observer
@reactAutobind
class ChannelsPanelContainer extends Component<Props, States> {
  //
  static defaultProps = {
    title: null,
    configurable: false,
  };

  state = {
    open: false,
  };

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

    onSelectChannel(e, {
      index,
      channel,
    });
  }

  render() {
    //
    const { channels, title, configurable } = this.props;
    const { open } = this.state;

    return (
      <div className="channel-of-interest">
        <div className="table-css type2 type3">
          <div className="row">
            <div className="cell vtop">
              <div className="tit-set">
                { title || `Channel (${channels.length})`}
                {configurable && (
                  <FavoriteChannelChangeModal
                    trigger={(
                      <Button icon className="img-icon">
                        <Icon className="setting17" /><span className="blind">setting</span>
                      </Button>
                    )}
                    favorites={channels}
                    onConfirmCallback={this.findStudySummary}
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
                <div className="belt">
                  {channels.map((channel, index) => (
                    <Button
                      key={`sub-category-${index}`}
                      className={`toggle toggle4 ${channel.checked ? 'active' : ''}`}
                      onClick={(e) => this.onClickChannel(e, index, channel)}
                    >
                      {channel.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="cell vtop">
              <div className="toggle-btn">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChannelsPanelContainer;
