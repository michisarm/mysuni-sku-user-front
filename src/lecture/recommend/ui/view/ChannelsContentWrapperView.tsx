
import React, { Component } from 'react';

import { Segment } from 'semantic-ui-react';
import { ChannelModel } from 'college/model';
import ChannelsPanelContainer from '../../../shared/ui/logic/ChannelsPanelContainer';


interface Props {
  channels: ChannelModel[]
  children: React.ReactNode
  onSelectChannel: (channel: ChannelModel) => void
  onConfirmCallback: () => void
}

class ChannelsContentWrapperView extends Component<Props> {
  //
  render() {
    //
    const { channels, children, onSelectChannel, onConfirmCallback } = this.props;

    return (
      <Segment className="full">
        <div className="recommend-detail">
          <ChannelsPanelContainer
            channels={channels}
            title="관심 Channel 보기"
            configurable
            onSelectChannel={(e, { channel }) => onSelectChannel(channel)}
            onConfirmCallback={onConfirmCallback}
          />
          {children}
        </div>
      </Segment>
    );
  }
}

export default ChannelsContentWrapperView;
