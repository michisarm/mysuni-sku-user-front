
import React, { Component } from 'react';

import { Segment } from 'semantic-ui-react';
import { ChannelModel } from 'college';
import ChannelsPanelContainer from '../../../shared/ui/logic/ChannelsPanelContainer';


interface Props {
  channels: ChannelModel[]
  children: React.ReactNode
  onSelectChannel: (channel: ChannelModel) => void
}

class ChannelLecturesContentWrapperContainer extends Component<Props> {
  //
  render() {
    //
    const { channels, children, onSelectChannel } = this.props;

    return (
      <Segment className="full">
        <div className="recommend-detail">
          <ChannelsPanelContainer
            channels={channels}
            title="관심 Channel 보기"
            configurable
            onSelectChannel={(e, { channel }) => onSelectChannel(channel)}
          />
          {children}
        </div>
      </Segment>
    );
  }
}

export default ChannelLecturesContentWrapperContainer;
