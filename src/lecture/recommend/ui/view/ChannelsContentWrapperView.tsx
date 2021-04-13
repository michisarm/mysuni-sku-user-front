import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { CheckableChannel } from '../../../../shared/viewmodel/CheckableChannel';
import RecommendChannelsPanelContainer from '../logic/RecommendChannelsPanelContainer';
import { Area } from 'tracker/model';

interface Props {
  channels: CheckableChannel[];
  children: React.ReactNode;
  onSelectChannel: (channel: CheckableChannel) => void;
  onConfirmCallback: () => void;
}

class ChannelsContentWrapperView extends Component<Props> {
  //
  render() {
    //
    const {
      channels,
      children,
      onSelectChannel,
      onConfirmCallback,
    } = this.props;

    return (
      <Segment className="full">
        <div className="recommend-detail" data-area={Area.RECOMMEND_LIST}>
          <RecommendChannelsPanelContainer
            channels={channels}
            title="관심 Channel 보기"
            configurable
            onSelectChannel={(_: any, { channel }) => onSelectChannel(channel)}
            onConfirmCallback={onConfirmCallback}
          />
          {children}
        </div>
      </Segment>
    );
  }
}

export default ChannelsContentWrapperView;
