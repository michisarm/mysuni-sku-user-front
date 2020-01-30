import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ReviewService } from '@nara.drama/feedback';
import { CubeType, NewPageService, NoSuchContentPanel } from 'shared';
import { CollegeService } from 'college';
import { LectureModel, LectureService } from 'lecture';
import { InMyLectureCdoModel, InMyLectureModel, InMyLectureService } from 'myTraining';
import { CardSorting, OrderByType, SeeMoreButton } from '../../../shared';
import routePaths from '../../../routePaths';
import Lecture from '../../../shared/Lecture';
import ChannelLecturesContentWrapperView from '../../../category/ui/view/ChannelLecturesContentWrapperView';
import LectureServiceType from '../../../shared/model/LectureServiceType';


interface Props extends RouteComponentProps<{ channelId: string, pageNo: string }> {
  newPageService?: NewPageService,
  collegeService?: CollegeService,
  lectureService?: LectureService,
  reviewService?: ReviewService,
  inMyLectureService?: InMyLectureService,
}

interface State {
  lectures: LectureModel[],
  sorting: string,
}

@inject(mobxHelper.injectFrom(
  'shared.newPageService',
  'college.collegeService',
  'lecture.lectureService',
  'shared.reviewService',
  'myTraining.inMyLectureService'
))
@reactAutobind
@observer
class LecturesByChannelContainer extends Component<Props, State> {
  //
  PAGE_KEY = 'recommendLecture.channel';

  CHANNEL_SIZE = 5;

  PAGE_SIZE = 8;

  state = {
    lectures: [],
    sorting: OrderByType.Time,
  };

  constructor(props: Props) {
    //
    super(props);
    this.init();
  }

  componentDidMount() {
    //
    this.initialFindPagingRecommendLectures();
    this.findChannel();
  }

  componentDidUpdate(prevProps: Props) {
    //
    const { params: prevParams } = prevProps.match;
    const { params } = this.props.match;

    if (prevParams.channelId !== params.channelId) {
      this.clearAndInit();
      this.initialFindPagingRecommendLectures();
      this.findChannel();
    }
    if (prevParams.pageNo !== params.pageNo) {
      this.addFindPagingRecommendLectures();
    }
  }

  init() {
    //
    const { match, newPageService, lectureService } = this.props;
    const pageNo = parseInt(match.params.pageNo, 10);

    newPageService!.initPageMap(this.PAGE_KEY, this.PAGE_SIZE, pageNo);
    lectureService!.clearRecommendLectures();
  }

  clearAndInit() {
    //
    this.init();
    this.setState({ lectures: []});
  }

  findChannel() {
    //
    const { match, collegeService } = this.props;

    collegeService!.findChannelById(match.params.channelId);
  }

  async initialFindPagingRecommendLectures() {
    //
    const { newPageService } = this.props;
    const page = newPageService!.pageMap.get(this.PAGE_KEY)!;

    this.findPagingRecommendLectures(page.limit * page.pageNo, 0);
  }

  async addFindPagingRecommendLectures() {
    //
    const { newPageService } = this.props;
    const page = newPageService!.pageMap.get(this.PAGE_KEY)!;

    this.findPagingRecommendLectures(page.limit, page.nextOffset);
  }

  async findPagingRecommendLectures(limit: number, offset: number) {
    const { match, newPageService, lectureService, reviewService, inMyLectureService } = this.props;
    const { params } = match;
    const { sorting } = this.state;
    const pageNo = parseInt(match.params.pageNo, 10);

    inMyLectureService!.findAllInMyLectures();

    const lectures = await lectureService!.addPagingRecommendLectures(this.CHANNEL_SIZE, 0, limit, offset, params.channelId, sorting);
    let feedbackIds: string[] = [];
    if (lectures && lectures.results && lectures.results.length) {
      feedbackIds = feedbackIds.concat(lectures.results.map(lecture => lecture.reviewId));
    }
    reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);

    this.setState((prevState) => ({
      lectures: [ ...prevState.lectures, ...lectures!.results],
    }));
    newPageService!.setTotalCountAndPageNo(this.PAGE_KEY, lectures!.totalCount, pageNo);

  }

  isContentMore() {
    //
    const { newPageService } = this.props;
    const page = newPageService!.pageMap.get(this.PAGE_KEY);

    return page!.pageNo < page!.totalPages;
  }

  onChangeSorting(e: any, data: any) {
    //
    this.setState({
      sorting: data.value,
    }, () => {
      this.clearAndInit();
      this.initialFindPagingRecommendLectures();
    });
  }

  onActionLecture(lecture: LectureModel | InMyLectureModel) {
    //
    const { inMyLectureService } = this.props;
    if (lecture instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(lecture.id)
        .then(() => inMyLectureService!.findAllInMyLectures());
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
        .then(() => inMyLectureService!.findAllInMyLectures());
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
    const { match, history } = this.props;
    const pageNo = parseInt(match.params.pageNo, 10);
    history.replace(routePaths.currentPage(pageNo + 1));
  }

  render() {
    //
    const { newPageService, reviewService, inMyLectureService } = this.props;
    const { lectures, sorting } = this.state;
    const page = newPageService!.pageMap.get(this.PAGE_KEY);
    const { ratingMap } = reviewService!;
    const { inMyLectureMap } =  inMyLectureService!;

    return (
      <ChannelLecturesContentWrapperView
        lectureCount={page!.totalCount}
        countDisabled={lectures.length < 1}
      >
        { lectures.length < 1 ?
          <NoSuchContentPanel message="선택하신 채널에 해당하는 추천 학습 과정이 없습니다." />
          :
          <>
            <CardSorting
              value={sorting}
              onChange={this.onChangeSorting}
            />

            <div className="section">
              <Lecture.Group type={Lecture.GroupType.Box}>
                {lectures.map((lecture: LectureModel, index: number) => {
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
                })}
              </Lecture.Group>

              { this.isContentMore() && (
                <SeeMoreButton
                  onClick={this.onClickSeeMore}
                />
              )}
            </div>
          </>
        }
      </ChannelLecturesContentWrapperView>
    );
  }
}

export default withRouter(LecturesByChannelContainer);
