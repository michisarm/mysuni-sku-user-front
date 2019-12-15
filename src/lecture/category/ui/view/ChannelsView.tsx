
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';
import { ChannelModel } from 'college';


interface Props {
  open: boolean,
  channels: ChannelModel[],
  onToggle: () => void,
}

@reactAutobind
class ChannelsView extends Component<Props> {
  //
  render() {
    //
    const { open, channels, onToggle } = this.props;

    return (
      <div className="channel-of-interest">
        <div className="table-css type2 type3">
          <div className="row">
            <div className="cell vtop">
              <div className="tit-set">Channel ({channels.length})</div>
            </div>
            <div className="cell vtop">
              <div
                className={classNames({
                  'item-wrap': true,
                  active: open,
                })}
              >
                {/*  .active //  */}
                <div className="belt">
                  {channels.map((channel, index) => (
                    <Button key={`sub-category-${index}`} className={`toggle toggle4 ${channel.name ? 'active' : ''}`}>
                      {channel.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="cell vtop">
              <div className="toggle-btn">
                <Button icon className="img-icon" onClick={onToggle}>
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

export default ChannelsView;
