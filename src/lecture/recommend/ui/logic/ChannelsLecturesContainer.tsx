
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { mobxHelper } from 'shared';
import { ChannelModel, CollegeService } from 'college';
import ChannelLecturesContentWrapperContainer from './ChannelLecturesContentWrapperContainer';
import ChannelLecturesContainer from './ChannelLecturesContainer';


interface Props {
  collegeService?: CollegeService

  channels: ChannelModel[]
  onViewAll:(e: any, data: any) => void
}

interface State {
}

@inject(mobxHelper.injectFrom('collegeService'))
@reactAutobind
@observer
class ChannelsLecturesContainer extends Component<Props, State> {
  //
  componentDidMount(): void {
    const { collegeService, channels } = this.props;

    collegeService!.setChannels(channels && channels.length && channels.map(chanel => ({ ...chanel, checked: true })) || []);
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const { collegeService, channels } = this.props;
    const { channels: prevChannels } = prevProps;

    if (channels !== prevChannels) {
      collegeService!.setChannels(channels && channels.length && channels.map(chanel => ({
        ...chanel,
        checked: true,
      })) || []);
    }
  }

  onSelectChannel(channel: ChannelModel) {
    const { collegeService } = this.props;
    if (collegeService) {
      const index = collegeService._channels.map((channel: ChannelModel) => channel.id).findIndex((id: string) => channel.id === id);
      collegeService!.setChannelsProp(index, 'checked', !channel.checked);
    }
  }

  render() {
    //
    const { collegeService, onViewAll } = this.props;
    const { channels } = collegeService as CollegeService;

    return (
      <ChannelLecturesContentWrapperContainer
        channels={channels}
        onSelectChannel={this.onSelectChannel}
      >
        <div className="recommend-area">
          {
            channels && channels.length
            && channels.map((channel: ChannelModel) => {
              if (!channel.checked) return null;
              return (
                <ChannelLecturesContainer
                  channel={channel}
                  onViewAll={onViewAll}
                  key={`channel_cont_${channel.id}`}
                />
              );
            }) || null
          }
        </div>
      </ChannelLecturesContentWrapperContainer>
    );
  }
}

export default ChannelsLecturesContainer;
