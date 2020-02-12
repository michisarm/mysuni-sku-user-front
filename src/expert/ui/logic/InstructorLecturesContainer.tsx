
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { PageService, NoSuchContentPanel } from 'shared';
import { ReviewService } from '@nara.drama/feedback/src/snap/snap';
import { LectureModel, LectureServiceType } from 'lecture/model';
import { LectureService } from 'lecture/stores';
import routePaths from 'lecture/routePaths';
import { Lecture, SeeMoreButton } from 'lecture';


interface Props extends RouteComponentProps<{ instructorId : string }> {
  pageService?: PageService,
  reviewService?: ReviewService,
  lectureService?: LectureService,
  onChangeLecturesCount: (lecturesCount: number) => void,
}

@inject(mobxHelper.injectFrom(
  'shared.pageService',
  'shared.reviewService',
  'lecture.lectureService',
))
@reactAutobind
@observer
@observer
@reactAutobind
class InstructorLecturesContainer extends Component<Props> {
  //
  PAGE_KEY = 'lecture.instructor';

  PAGE_SIZE = 8;

  constructor(props: Props) {
    //
    super(props);
    this.init();
  }

  componentDidMount() {
    //
    this.findPagingInstructorLectures();
  }

  init() {
    //
    const { pageService, lectureService } = this.props;

    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    lectureService!.clearLectures();
  }

  async findPagingInstructorLectures() {
    //
    const { pageService, lectureService, reviewService, onChangeLecturesCount } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { instructorId } = this.props.match.params;

    const lectureOffsetList = await lectureService!.findAllLecturesByInstructorId(instructorId, page!.limit, page!.nextOffset);
    const feedbackIds = (lectureService!.lectures || []).map((lecture: LectureModel) => lecture.reviewId);
    if (feedbackIds && feedbackIds.length) reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);

    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, lectureOffsetList.totalCount, page!.pageNo + 1);
    onChangeLecturesCount(lectureOffsetList.totalCount);
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    return page!.pageNo < page!.totalPages;
  }

  onActionLecture() {

  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;
    const collegeId = model.category.college.id;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      history.push(routePaths.courseOverviewPrev(collegeId, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(routePaths.lectureCardOverviewPrev(collegeId, model.cubeId, model.serviceId));
    }
  }

  onClickSeeMore() {
    //
    this.findPagingInstructorLectures();
  }


  render() {
    //
    const { lectureService, reviewService } = this.props;
    // const { pageService, lectureService, reviewService } = this.props;
    // const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { lectures } = lectureService!;
    const { ratingMap } = reviewService!;

    return (
      <div className="expert-cont">
        { lectures.length > 0 ?
          <>
            <Lecture.Group type={Lecture.GroupType.Box}>
              {lectures.map((lecture: LectureModel, index: number) => {
                const rating = ratingMap.get(lecture.reviewId) || 0;
                return (
                  <Lecture
                    key={`lecture-${index}`}
                    model={lecture}
                    rating={rating}
                    thumbnailImage={lecture.baseUrl || undefined}
                    action={Lecture.ActionType.Add}
                    onAction={this.onActionLecture}
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
          </>
          :
          <NoSuchContentPanel message="등록된 강의가 없습니다." />
        }
      </div>
    );
  }

}

export default withRouter(InstructorLecturesContainer);
