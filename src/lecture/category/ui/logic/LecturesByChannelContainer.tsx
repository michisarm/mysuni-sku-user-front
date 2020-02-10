
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';

import { ReviewService } from '@nara.drama/feedback';
import { CubeType, NoSuchContentPanel } from 'shared';
import { LectureService } from 'lecture';
import { ChannelModel } from 'college/model';
import { InMyLectureService, InMyLectureCdoModel, InMyLectureModel } from 'myTraining';
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
class LecturesByChannelContainer extends Component<Props, State> {
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
    inMyLectureService!.findAllInMyLectures();

    this.setState(({
      lectures,
      totalCount,
    }));
    const feedbackIds = (lectures || []).map((lecture: LectureModel) => lecture.reviewId);
    if (feedbackIds && feedbackIds.length) reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
  }

  onActionLecture(lecture: LectureModel | InMyLectureModel) {
    //
    const { inMyLectureService } = this.props;
    if (lecture instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(lecture.id)
        .then(() => inMyLectureService!.removeInMyLectureInAllList(lecture.serviceId, lecture.serviceType));
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
        baseUrl: lecture.baseUrl,
        servicePatronKeyString: lecture.patronKey.keyString,
      }))
        .then(() => inMyLectureService!.addInMyLectureInAllList(lecture.serviceId, lecture.serviceType));
    }
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;
    const collegeId = model.category.college.id;
    const cineroom = patronInfo.getCineroomByPatronId(model.servicePatronKeyString) || patronInfo.getCineroomByDomain(model)!;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      // history.push(routePaths.courseOverviewPrev(collegeId, model.coursePlanId, model.serviceType, model.serviceId));
      history.push(routePaths.courseOverview(cineroom.id, collegeId, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      // history.push(routePaths.lectureCardOverviewPrev(collegeId, model.cubeId, model.serviceId));
      history.push(routePaths.lectureCardOverview(cineroom.id, collegeId, model.cubeId, model.serviceId));
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
                      thumbnailImage={lecture.baseUrl || undefined}
                      action={inMyLecture ? Lecture.ActionType.Remove : Lecture.ActionType.Add}
                      onAction={() => this.onActionLecture(inMyLecture || lecture)}
                      onViewDetail={this.onViewDetail}
                    />
                  );
                })
              }
            </Lecture.Group>
          ) || (
            <NoSuchContentPanel message="등록된 학습 과정이 없습니다." />
          )
        }
      </>
    );
  }
}

export default withRouter(LecturesByChannelContainer);
