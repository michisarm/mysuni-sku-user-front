import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ReviewService } from '@nara.drama/feedback';
import { CubeType, NoSuchContentPanel } from 'shared';
import { LectureService } from 'lecture';
import { ChannelModel } from 'college';
import { InMyLectureService, InMyLectureCdoModel, InMyLectureModel } from 'mypage';
import routePaths from '../../../routePaths';
import Lecture from '../../../shared/Lecture';
import LectureModel from '../../../shared/model/LectureModel';
import LectureServiceType from '../../../shared/model/LectureServiceType';
import OrderByType from '../../../shared/model/OrderByType';


interface Props extends RouteComponentProps {
  lectureService?: LectureService,
  reviewService?: ReviewService,
  inMyLectureService?: InMyLectureService,
  channel: ChannelModel
  onViewAll: (e: any, data: any) => void
}

interface State {
  lectures: LectureModel[]
  totalCount: number
}

@inject(mobxHelper.injectFrom(
  'lecture.lectureService',
  'shared.reviewService',
  'myTraining.inMyLectureService'
))
@reactAutobind
@observer
class ChannelLecturesContainer extends Component<Props, State> {
  //
  PAGE_SIZE = 8;

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
    const { lectureService, reviewService, inMyLectureService, channel } = this.props;
    const { results: lectures, totalCount } = await lectureService!.findPagingChannelLectures(channel.id, this.PAGE_SIZE, 0, OrderByType.Time);
    inMyLectureService!.findInMyLecturesAll();

    this.setState(({
      lectures,
      totalCount,
    }));
    const feedbackIds = (lectures || []).map((lecture: LectureModel) => lecture.reviewId);
    if (feedbackIds && feedbackIds.length) reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
  }

  onActionLecture(lecture: LectureModel | InMyLectureModel) {
    //
    const { inMyLectureService, lectureService } = this.props;
    if (lecture instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(lecture.id)
        .then(lectureService!.clearLectures)
        .then(this.findLectures);
    }
    else {
      inMyLectureService!.addInMyLecture(new InMyLectureCdoModel({
        serviceId: lecture.serviceId,
        serviceType: lecture.serviceType,
        category: lecture.category,
        name: lecture.name,
        description: lecture.description,
        cubeType: lecture.cubeType,
        learningTime: lecture.learningTime,
        stampCount: lecture.stampCount,
        coursePlanId: lecture.coursePlanId,

        requiredSubsidiaries: lecture.requiredSubsidiaries,
        cubeId: lecture.cubeId,
        courseSetJson: lecture.courseSetJson,
        courseLectureUsids: lecture.courseLectureUsids,
        lectureCardUsids: lecture.lectureCardUsids,

        reviewId: lecture.reviewId,
      }))
        .then(lectureService!.clearLectures)
        .then(this.findLectures);
    }
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;
    const collegeId = model.category.college.id;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      history.push(routePaths.courseOverview(collegeId, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(routePaths.lectureCardOverview(collegeId, model.cubeId, model.serviceId));
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
    const { channel, reviewService, inMyLectureService } = this.props;
    const { lectures, totalCount } =  this.state;
    const { ratingMap } =  reviewService as ReviewService;
    const { inMyLectureMap } =  inMyLectureService as InMyLectureService;

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
                  let rating: number | undefined = ratingMap.get(lecture.reviewId) || 0;
                  const inMyLecture = inMyLectureMap.get(lecture.serviceId) || undefined;
                  if (lecture.cubeType === CubeType.Community) rating = undefined;
                  return (
                    <Lecture
                      key={`lecture-${index}`}
                      model={lecture}
                      rating={rating}
                      // thumbnailImage="http://placehold.it/60x60"
                      action={inMyLecture ? Lecture.ActionType.Remove : Lecture.ActionType.Add}
                      onAction={() => this.onActionLecture(inMyLecture || lecture)}
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
