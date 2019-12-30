import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ReviewService } from '@nara.drama/feedback';
import { mobxHelper, PageService } from 'shared';
import { CollegeService } from 'college';
import { PersonalCubeService } from 'personalcube/personalcube';
import { LectureCardService, LectureModel, LectureService } from 'lecture';
import { InMyLectureService, InMyLectureCdoModel, InMyLectureModel } from 'mytraining';
import { CardSorting, SeeMoreButton } from '../../../shared';
import routePaths from '../../../routePaths';
import Lecture from '../../../shared/Lecture';
import ChannelLecturesContentWrapperView from '../view/ChannelLecturesContentWrapperView';
import LectureServiceType from '../../../shared/model/LectureServiceType';


interface Props extends RouteComponentProps<{ channelId: string }> {
  pageService?: PageService,
  collegeService?: CollegeService,
  personalCubeService?: PersonalCubeService,
  lectureService?: LectureService,
  lectureCardService?: LectureCardService,
  reviewService?: ReviewService,
  inMyLectureService?: InMyLectureService,
}

interface State {
  sorting: string,
}

@inject(mobxHelper.injectFrom(
  'shared.pageService',
  'lecture.lectureService',
  'lecture.lectureCardService',
  'shared.reviewService',
  'myTraining.inMyLectureService'
))
@reactAutobind
@observer
class ChannelLecturesContainer extends Component<Props, State> {
  //
  PAGE_KEY = 'lecture.channel';

  PAGE_SIZE = 8;

  state = {
    sorting: 'latest',
  };


  constructor(props: Props) {
    //
    super(props);
    this.init();
  }


  componentDidMount() {
    //
    this.findPagingChannelLectures();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.match.params.channelId !== this.props.match.params.channelId) {
      this.init();
      this.findPagingChannelLectures();
    }
  }

  init() {
    //
    const { pageService, lectureService } = this.props;

    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    lectureService!.clear();
  }

  async findPagingChannelLectures() {
    //
    const { match, pageService, lectureService, reviewService, inMyLectureService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    inMyLectureService!.findInMyLecturesAll();
    const lectureOffsetList = await lectureService!.findPagingChannelLectures(match.params.channelId, page!.limit, page!.nextOffset);
    const feedbackIds = (lectureService!.lectures || []).map((lecture: LectureModel) => lecture.reviewId);
    if (feedbackIds && feedbackIds.length) reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);

    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, lectureOffsetList.totalCount, page!.pageNo + 1);
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    return page!.pageNo < page!.totalPages;
  }

  onChangeSorting(e: any, data: any) {
    //
    this.setState({
      sorting: data.value,
    });
  }

  onActionLecture(lecture: LectureModel | InMyLectureModel) {
    //
    const { inMyLectureService } = this.props;
    if (lecture instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(lecture.id)
        .then(this.findPagingChannelLectures);
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
      })).then(this.findPagingChannelLectures);
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

  onClickSeeMore() {
    //
    this.findPagingChannelLectures();
  }

  render() {
    //
    const { pageService, lectureService, reviewService, inMyLectureService } = this.props;
    const { sorting } = this.state;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { lectures } = lectureService!;
    const { ratingMap } = reviewService!;
    const { inMyLectureMap } =  inMyLectureService!;

    return (
      <ChannelLecturesContentWrapperView
        lectureCount={page!.totalCount}
      >
        <>
          <CardSorting
            value={sorting}
            onChange={this.onChangeSorting}
          />

          <div className="section">
            <Lecture.Group type={Lecture.GroupType.Box}>
              {lectures.map((lecture: LectureModel, index: number) => {
                const rating = ratingMap.get(lecture.reviewId) || 0;
                const inMyLecture = inMyLectureMap.get(lecture.serviceId) || undefined;
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
              })}
            </Lecture.Group>

            { this.isContentMore() && (
              <SeeMoreButton
                onClick={this.onClickSeeMore}
              />
            )}
          </div>
        </>
      </ChannelLecturesContentWrapperView>
    );
  }
}

export default withRouter(ChannelLecturesContainer);
