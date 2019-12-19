
import React, { Component } from 'react';

import { Segment } from 'semantic-ui-react';
import { IdName } from 'shared';
import { ChannelModel } from 'college';
import ChannelsPanelView from '../../../shared/ui/view/ChannelsPanelView';


interface Props {
  channels: IdName[]
  children: React.ReactNode
  onSelectChannel: (channel: ChannelModel) => void
}

class ChannelLecturesContentWrapperView extends Component<Props> {
  //
  render() {
    //
    const { channels, children, onSelectChannel } = this.props;

    return (
      <Segment className="full">
        <div className="recommend-detail">
          <ChannelsPanelView
            channels={channels}
            title="관심 Channel 보기"
            onSettings={() => {}}
            onSelectChannel={onSelectChannel}
          />
          {children}
        </div>
      </Segment>
    );
  }
}

export default ChannelLecturesContentWrapperView;
