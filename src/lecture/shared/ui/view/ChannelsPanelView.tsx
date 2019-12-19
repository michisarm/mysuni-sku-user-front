
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';
import { ChannelModel } from 'college';


interface Props {
  title?: string
  channels: ChannelModel[]
  onSettings?: () => void
  onSelectChannel: (channel: ChannelModel) => void
}

interface States {
  open: boolean
}

@reactAutobind
class ChannelsPanelView extends Component<Props, States> {
  //
  state = {
    open: false,
  };

  onToggle() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    //
    const { channels, title, onSettings, onSelectChannel } = this.props;
    const { open } = this.state;

    return (
      <div className="channel-of-interest">
        <div className="table-css type2 type3">
          <div className="row">
            <div className="cell vtop">
              <div className="tit-set">
                { title || `Channel (${channels.length})`}
                {
                  onSettings && (
                    <Button icon className="img-icon" onClick={onSettings}>
                      <Icon className="setting17" /><span className="blind">setting</span>
                    </Button>
                  ) || null
                }
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
                      onClick={() => onSelectChannel(channel)}
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
                      'arrow-down': open,
                      'arrow-up': !open,
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

export default ChannelsPanelView;
