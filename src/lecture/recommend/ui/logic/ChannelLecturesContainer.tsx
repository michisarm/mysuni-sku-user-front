
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Lecture, mobxHelper, NoSuchContentPanel } from 'shared';
import { LectureService, LectureServiceType } from 'lecture';
import { ChannelModel } from 'college';
import LectureModel from '../../../shared/model/LectureModel';

interface Props extends RouteComponentProps {
  lectureService?: LectureService,
  channel: ChannelModel
  routeTo: (url: string) => void
}

interface State {
}

@inject(mobxHelper.injectFrom('lecture.lectureService'))
@reactAutobind
@observer
class ChannelsLecturesContainer extends Component<Props, State> {
  //
  componentDidMount() {
    //
    const { lectureService, channel } = this.props;

    lectureService!.findPagingChannelLectures(channel.id, 0, 5,);
  }

  onActionLecture() {

  }

  onViewDetail(e: any, data: any) {
    //
    const { lecture } = data;
    const { history } = this.props;

    console.log('serviceType', lecture.serviceType);
    if (lecture.serviceType === LectureServiceType.Card) {
      history.push(`./lecture-card/${lecture.serviceId}`);
    }
  }

  onViewAll() {
    const { channel, routeTo } = this.props;
    routeTo(`/channel/${channel.id}/recommend`);
  }

  render() {
    //
    const { channel, lectureService } = this.props;
    const { lectures } =  lectureService as LectureService;

    return (
      <>
        <Lecture.LineHeader
          channel={channel}
          onViewAll={this.onViewAll}
        />
        {
          lectures && lectures.length
          && (
            <Lecture.Group type={Lecture.GroupType.Line}>
              {
                lectures.map((lecture: LectureModel) => (
                  <Lecture
                    key={lecture.id}
                    lecture={lecture}
                    // thumbnailImage="http://placehold.it/60x60"
                    action={Lecture.ActionType.Add}
                    onAction={this.onActionLecture}
                    onViewDetail={this.onViewDetail}
                  />
                ))
              }
            </Lecture.Group>
          ) || (
            <NoSuchContentPanel message="선택하신 채널에 해당하는 추천 학습과정이 없습니다." />
          )
        }
      </>
    );
  }
}

export default withRouter(ChannelsLecturesContainer);
