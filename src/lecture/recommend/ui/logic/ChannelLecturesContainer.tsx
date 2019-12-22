
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
  onViewAll: (e: any, data: any) => void
}

interface State {
  lectures: LectureModel[]
  totalCount: number
}

@inject(mobxHelper.injectFrom('lecture.lectureService', 'shared.reviewService'))
@reactAutobind
@observer
class ChannelLecturesContainer extends Component<Props, State> {
  //
  state = {
    lectures: [],
    totalCount: 0,
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
    console.log('findChannelLectures');
    const { lectureService, reviewService, channel } = this.props;
    const { results: lectures, totalCount } = await lectureService!.findPagingChannelLectures(channel.id, 5, 0);

    this.setState(({
      lectures,
      totalCount,
    }));
    const feedbackIds = (lectures || []).map((lecture: LectureModel) => lecture.reviewFeedbackId);
    if (feedbackIds && feedbackIds.length) reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
  }

  onActionLecture() {

  }

  onViewDetail(e: any, data: any) {
    //
    const { lecture } = data;
    const { history } = this.props;

    if (lecture.serviceType === LectureServiceType.Card) {
      history.push(`./cube/${lecture.cubeId}/lecture-card/${lecture.serviceId}`);
    }
  }

  onViewAll(e: any) {
    const { channel, onViewAll } = this.props;

    onViewAll(e, {
      channel,
    });
  }

  render() {
    //
    const { channel, reviewService } = this.props;
    const { lectures, totalCount } =  this.state;
    const { ratingMap } =  reviewService as ReviewService;

    return (
      <>
        <Lecture.LineHeader
          channel={channel}
          title={(
            <>
              의 학습 과정입니다. <span className="channel">({totalCount})</span>
            </>
          )}
          onViewAll={this.onViewAll}
        />
        {
          lectures && lectures.length
          && (
            <Lecture.Group type={Lecture.GroupType.Line}>
              {
                lectures.map((lecture: LectureModel, index: number) => {
                  const rating = ratingMap.get(lecture.reviewFeedbackId) || 0;
                  return (
                    <Lecture
                      key={`lecture-${index}`}
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

export default withRouter(ChannelLecturesContainer);
