
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { IdName, mobxHelper } from 'shared';
import { LectureCardService } from 'lecture';
import ChannelLecturesView from '../view/ChannelLecturesView';

interface Props {
  lectureCardService?: LectureCardService,
  channel: IdName
  routeTo: (url: string) => void
}

interface State {
}

@inject(mobxHelper.injectFrom('lecture.lectureCardService'))
@reactAutobind
@observer
class ChannelsLecturesContainer extends Component<Props, State> {
  //
  componentDidMount() {
    //
    const { lectureCardService, channel } = this.props;

    lectureCardService!.findAllLectureCards(0, 5, '', channel.id);
  }

  onViewAll() {
    const { channel, routeTo } = this.props;
    routeTo(`/channel/${channel.id}/recommend`);
  }

  render() {
    //
    const { channel, lectureCardService } = this.props;
    const { lectureCards } =  lectureCardService as LectureCardService;

    return (
      <ChannelLecturesView
        channel={channel}
        lectureCards={lectureCards}
        onViewAll={this.onViewAll}
      />
    );
  }
}

export default ChannelsLecturesContainer;
