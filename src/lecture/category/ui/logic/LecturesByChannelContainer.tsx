import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';

import { ReviewService } from '@nara.drama/feedback';
import { CubeType } from 'shared/model';
import { NoSuchContentPanel, Loadingpanel } from 'shared';
import { ChannelModel } from 'college/model';
import { InMyLectureCdoModel, InMyLectureModel } from 'myTraining/model';
import { InMyLectureService } from 'myTraining/stores';
import { LectureService } from '../../../stores';
import { LectureModel, LectureServiceType, OrderByType } from '../../../model';
import routePaths from '../../../routePaths';
import { Lecture } from '../../../shared';
import { Segment } from 'semantic-ui-react';

interface Props extends RouteComponentProps {
  lectureService?: LectureService;
  reviewService?: ReviewService;
  inMyLectureService?: InMyLectureService;
  channel: ChannelModel;
  onViewAll: (e: any, data: any) => void;
}

interface State {
  lectures: LectureModel[];
  totalCount: number;
  isLoading: boolean;
}

@inject(
  mobxHelper.injectFrom(
    'lecture.lectureService',
    'shared.reviewService',
    'myTraining.inMyLectureService'
  )
)
@reactAutobind
@observer
class LecturesByChannelContainer extends Component<Props, State> {
  //
  PAGE_SIZE = 8;

  state = {
    lectures: [],
    totalCount: 0,
    isLoading: false,
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
    const {
      lectureService,
      reviewService,
      inMyLectureService,
      channel,
    } = this.props;

    this.setState({ isLoading: true });
    const {
      results: lectures,
      totalCount,
    } = await lectureService!.findPagingChannelLectures(
      channel.id,
      this.PAGE_SIZE,
      0,
      OrderByType.Time
    );
    inMyLectureService!.findAllInMyLectures().then(() => {
      this.setState({
        isLoading: false,
      });
    });

    this.setState({
      lectures,
      totalCount,
    });
    const feedbackIds = (lectures || []).map(
      (lecture: LectureModel) => lecture.reviewId
    );
    if (feedbackIds && feedbackIds.length) {
      reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }
  }

  onActionLecture(lecture: LectureModel | InMyLectureModel) {
    //
    const { inMyLectureService } = this.props;
    if (lecture instanceof InMyLectureModel) {
      inMyLectureService!
        .removeInMyLecture(lecture.id)
        .then(() =>
          inMyLectureService!.removeInMyLectureInAllList(
            lecture.serviceId,
            lecture.serviceType
          )
        );
    } else {
      inMyLectureService!
        .addInMyLecture(
          new InMyLectureCdoModel({
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
          })
        )
        .then(() =>
          inMyLectureService!.addInMyLectureInAllList(
            lecture.serviceId,
            lecture.serviceType
          )
        );
    }
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;
    const collegeId = model.category.college.id;
    const cineroom =
      patronInfo.getCineroomByPatronId(model.servicePatronKeyString) ||
      patronInfo.getCineroomByDomain(model)!;

    if (model.serviceType === LectureServiceType.Card) {
      // history.push(routePaths.courseOverviewPrev(collegeId, model.coursePlanId, model.serviceType, model.serviceId));
      history.push(routePaths.courseOverview(model.cardId));
    } else {
      // history.push(routePaths.lectureCardOverviewPrev(collegeId, model.cubeId, model.serviceId));
      history.push(routePaths.lectureCardOverview(model.cardId, model.cubeId));
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
    const { lectures, totalCount, isLoading } = this.state;
    const { ratingMap } = reviewService as ReviewService;
    const { inMyLectureMap } = inMyLectureService as InMyLectureService;

    return (
      <>
        <Lecture.LineHeader
          channel={channel}
          title={
            <>
              의 학습 과정입니다.{' '}
              <span className="channel">({totalCount})</span>
            </>
          }
          onViewAll={this.onViewAll}
        />
        {isLoading ? (
          <Segment
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
              height: 400,
              boxShadow: '0 0 0 0',
              border: 0,
            }}
          >
            <Loadingpanel loading={isLoading} />
          </Segment>
        ) : (
          (lectures && lectures.length && (
            <Lecture.Group type={Lecture.GroupType.Line}>
              {lectures.map((lecture: LectureModel, index: number) => {
                let rating: number | undefined =
                  ratingMap.get(lecture.reviewId) || 0;
                const inMyLecture =
                  inMyLectureMap.get(lecture.serviceId) || undefined;
                if (lecture.cubeType === CubeType.Community) rating = undefined;
                return (
                  <Lecture
                    key={`lecture-${index}`}
                    model={lecture}
                    rating={rating}
                    thumbnailImage={lecture.baseUrl || undefined}
                    action={
                      inMyLecture
                        ? Lecture.ActionType.Remove
                        : Lecture.ActionType.Add
                    }
                    onAction={() =>
                      this.onActionLecture(inMyLecture || lecture)
                    }
                    onViewDetail={this.onViewDetail}
                  />
                );
              })}
            </Lecture.Group>
          )) || <NoSuchContentPanel message="등록된 학습 과정이 없습니다." />
        )}
      </>
    );
  }
}

export default withRouter(LecturesByChannelContainer);
