
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { ReviewService } from '@nara.drama/feedback';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Lecture, mobxHelper, NoSuchContentPanel } from 'shared';
import { LectureService, LectureServiceType } from 'lecture';
import { ChannelModel } from 'college';
import LectureModel from '../../../shared/model/LectureModel';

interface Props extends RouteComponentProps {
  lectureService?: LectureService,
  reviewService?: ReviewService,
  channel: ChannelModel
  routeTo: (url: string) => void
}

interface State {
  lectures: LectureModel[]
}

@inject(mobxHelper.injectFrom('lecture.lectureService', 'shared.reviewService'))
@reactAutobind
@observer
class ChannelsLecturesContainer extends Component<Props, State> {
  //
  state = {
    lectures: [],
  };

  componentDidMount() {
    //
    this.findLectures();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const { channel } = this.props;
    const { channel: prevChannel } = prevProps;

    if (channel && channel.id !== prevChannel.id) this.findLectures();
  }

  async findLectures() {
    //
    const { lectureService, reviewService, channel } = this.props;
    const { results: lectures } = await lectureService!.findChannelLectures(channel.id, 5, 0);
    this.setState(({ lectures }));
    const feedbackIds = (lectures || []).map((lecture: LectureModel) => lecture.reviewFeedbackId);
    if (feedbackIds && feedbackIds.length) reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
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
    const { channel, reviewService } = this.props;
    const { lectures } =  this.state;
    const { ratingMap } =  reviewService as ReviewService;

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
                lectures.map((lecture: LectureModel) => {
                  const rating = ratingMap.get(lecture.reviewFeedbackId) || 0;
                  return (
                    <Lecture
                      key={lecture.id}
                      lecture={lecture}
                      rating={rating}
                      // thumbnailImage="http://placehold.it/60x60"
                      action={Lecture.ActionType.Add}
                      onAction={this.onActionLecture}
                      onViewDetail={this.onViewDetail}
                    />
                  );
                })
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
