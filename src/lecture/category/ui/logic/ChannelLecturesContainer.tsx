import React, { Component, useEffect, useState } from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import {
  RouteComponentProps,
  useHistory,
  useLocation,
  withRouter,
} from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';

import { ReviewService } from '@nara.drama/feedback';
import { CubeType } from 'shared/model';
import { ActionLogService, PageService } from 'shared/stores';
import { NoSuchContentPanel, Loadingpanel } from 'shared';
import { CollegeService } from 'college/stores';
import { PersonalCubeService } from 'personalcube/personalcube/stores';
import { InMyLectureCdoModel, InMyLectureModel } from 'myTraining/model';
import { InMyLectureService } from 'myTraining/stores';

import { LectureModel, LectureServiceType, OrderByType } from '../../../model';
import { LectureCardService, LectureService } from '../../../stores';
import routePaths from '../../../routePaths';
import { Lecture, CardSorting, SeeMoreButton } from '../../../shared';
import ChannelLecturesContentWrapperView from '../view/ChannelLecturesContentWrapperView';
import { CoursePlanService } from 'course/stores';
import ReactGA from 'react-ga';
import { useScrollMove } from 'myTraining/useScrollMove';
import { Segment } from 'semantic-ui-react';

interface Props
  extends RouteComponentProps<{ collegeId: string; channelId: string }> {
  actionLogService?: ActionLogService;
  pageService?: PageService;
  collegeService?: CollegeService;
  personalCubeService?: PersonalCubeService;
  lectureService?: LectureService;
  lectureCardService?: LectureCardService;
  reviewService?: ReviewService;
  inMyLectureService?: InMyLectureService;
  coursePlanService?: CoursePlanService;
  scrollSave?: () => void;
  setLoading?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setIsLoading?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  isLoading?: boolean | false;
}

interface State {
  sorting: string;
  collegeOrder: boolean;
}

const ChannelLecturesContainer: React.FC<Props> = ({
  actionLogService,
  pageService,
  collegeService,
  personalCubeService,
  lectureService,
  lectureCardService,
  reviewService,
  inMyLectureService,
  match,
}) => {
  const histroy = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const { scrollOnceMove, scrollSave } = useScrollMove();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (loading) {
      scrollOnceMove();
    }
  }, [loading]);

  return (
    <ChannelLecturesInnerContainer
      actionLogService={actionLogService}
      pageService={pageService}
      collegeService={collegeService}
      personalCubeService={personalCubeService}
      lectureService={lectureService}
      lectureCardService={lectureCardService}
      reviewService={reviewService}
      inMyLectureService={inMyLectureService}
      history={histroy}
      location={location}
      match={match}
      scrollSave={scrollSave}
      setLoading={setLoading}
      setIsLoading={setIsLoading}
      isLoading={isLoading}
    />
  );
};

export default withRouter(ChannelLecturesContainer);

@inject(
  mobxHelper.injectFrom(
    'shared.actionLogService',
    'shared.pageService',
    'lecture.lectureService',
    'lecture.lectureCardService',
    'shared.reviewService',
    'myTraining.inMyLectureService',
    'course.coursePlanService'
  )
)
@reactAutobind
@observer
class ChannelLecturesInnerContainer extends Component<Props, State> {
  //
  PAGE_KEY = 'lecture.channel';

  PAGE_SIZE = 8;

  state = {
    sorting: OrderByType.Time,
    collegeOrder: false,
  };

  constructor(props: Props) {
    //
    super(props);
    this.init();
  }

  async componentDidMount() {
    //
    try {
      await this.findCollegeOrder();
    } catch (error) {
      console.error('TODO', error);
    }
    this.findPagingChannelLectures();
  }

  async componentDidUpdate(prevProps: Props) {
    //
    if (
      prevProps.match.params.channelId !== this.props.match.params.channelId
    ) {
      this.init();
      try {
        await this.findCollegeOrder();
      } catch (error) {
        console.error('TODO', error);
      }
      this.findPagingChannelLectures();
    }
  }

  init() {
    //
    const {
      pageService,
      lectureService,
      setLoading,
      setIsLoading,
    } = this.props;
    setLoading && setLoading(false);
    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    lectureService!.clearLectures();
    // 뒤로가기 할때 포지션이 처음으로 감. 수정되면 적용..
    // setIsLoading && setIsLoading(true);
  }

  async findPagingChannelLectures() {
    //
    const {
      match,
      pageService,
      lectureService,
      reviewService,
      inMyLectureService,
      setLoading,
      setIsLoading,
    } = this.props;
    const { sorting } = this.state;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    inMyLectureService!.findAllInMyLectures();

    // const lectureOffsetList = await lectureService!.findPagingChannelLectures(match.params.channelId, page!.limit, page!.nextOffset, sorting);
    const lectureOffsetList = await lectureService!.findPagingChannelOrderLectures(
      match.params.collegeId,
      match.params.channelId,
      page!.limit,
      page!.nextOffset,
      sorting
    );

    if (!lectureOffsetList.empty) {
      setLoading && setLoading(true);
    } else {
      setLoading && setLoading(false);
    }
    setIsLoading && setIsLoading(false);

    const feedbackIds = (lectureService!.lectures || []).map(
      (lecture: LectureModel) => lecture.reviewId
    );
    if (feedbackIds && feedbackIds.length) {
      reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }

    pageService!.setTotalCountAndPageNo(
      this.PAGE_KEY,
      lectureOffsetList.totalCount,
      page!.pageNo + 1
    );
  }

  async findCollegeOrder() {
    //
    const { match, coursePlanService } = this.props;
    const collegeSortOrderCount = await coursePlanService!.findCollegeSortOrder(
      match.params.collegeId
    );

    if (collegeSortOrderCount > 0) {
      this.setState({ collegeOrder: true, sorting: OrderByType.collegeOrder });
    } else {
      this.setState({ collegeOrder: false, sorting: OrderByType.Time });
    }
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    return page!.pageNo < page!.totalPages;
  }

  onChangeSorting(e: any, data: any) {
    //
    this.props.actionLogService?.registerClickActionLog({
      subAction: data.label,
    });
    sessionStorage.setItem('channelSort', data.value);
    sessionStorage.removeItem('channelOffset');
    this.setState(
      {
        sorting: data.value,
      },
      () => {
        this.init();
        this.findPagingChannelLectures();
      }
    );
  }

  onActionLecture(lecture: LectureModel | InMyLectureModel) {
    //
    const { actionLogService, inMyLectureService } = this.props;

    actionLogService?.registerSeenActionLog({ lecture, subAction: '아이콘' });

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
    const { history, scrollSave } = this.props;
    const collegeId = model.category.college.id;
    const cineroom =
      patronInfo.getCineroomByPatronId(model.servicePatronKeyString) ||
      patronInfo.getCineroomByDomain(model)!;

    if (
      model.serviceType === LectureServiceType.Program ||
      model.serviceType === LectureServiceType.Course
    ) {
      // history.push(routePaths.courseOverviewPrev(collegeId, model.coursePlanId, model.serviceType, model.serviceId));
      history.push(
        routePaths.courseOverview(
          cineroom.id,
          collegeId,
          model.coursePlanId,
          model.serviceType,
          model.serviceId
        )
      );
    } else if (model.serviceType === LectureServiceType.Card) {
      // history.push(routePaths.lectureCardOverviewPrev(collegeId, model.cubeId, model.serviceId));
      history.push(
        routePaths.lectureCardOverview(
          cineroom.id,
          collegeId,
          model.cubeId,
          model.serviceId
        )
      );
    }
    // console.log('카드명', data?.model?.name, 'channle', data?.model?.category?.channel?.name, 'college', data?.model?.category?.college.name);
    scrollSave && scrollSave();
    ReactGA.event({
      category: `${data?.model?.category?.college.name}_${data?.model?.category?.channel?.name}`,
      action: 'Click Card',
      label: `${data?.model?.name}`,
    });
  }

  onClickSeeMore() {
    //
    this.props.actionLogService?.registerClickActionLog({
      subAction: 'list more',
    });
    this.findPagingChannelLectures();
  }

  render() {
    //
    const {
      pageService,
      lectureService,
      reviewService,
      inMyLectureService,
      isLoading,
    } = this.props;
    const { sorting, collegeOrder } = this.state;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { lectures } = lectureService!;
    const { ratingMap } = reviewService!;
    const { inMyLectureMap } = inMyLectureService!;

    return (
      <ChannelLecturesContentWrapperView
        lectureCount={page!.totalCount}
        countDisabled={lectures.length < 1}
      >
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
        ) : lectures && lectures.length > 0 ? (
          <>
            <CardSorting
              value={sorting}
              onChange={this.onChangeSorting}
              collegeOrder={collegeOrder}
            />
            <div className="section">
              <Lecture.Group type={Lecture.GroupType.Box}>
                {lectures.map((lecture: LectureModel, index: number) => {
                  let rating: number | undefined =
                    ratingMap.get(lecture.reviewId) || 0;
                  const inMyLecture =
                    inMyLectureMap.get(lecture.serviceId) || undefined;
                  if (lecture.cubeType === CubeType.Community) {
                    rating = undefined;
                  }
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
                      onAction={() => {
                        reactAlert({
                          title: '알림',
                          message: inMyLecture
                            ? '본 과정이 관심목록에서 제외되었습니다.'
                            : '본 과정이 관심목록에 추가되었습니다.',
                        });
                        this.onActionLecture(inMyLecture || lecture);
                      }}
                      onViewDetail={this.onViewDetail}
                    />
                  );
                })}
              </Lecture.Group>

              {this.isContentMore() && (
                <SeeMoreButton onClick={this.onClickSeeMore} />
              )}
            </div>
          </>
        ) : (
          <NoSuchContentPanel message="등록된 학습 과정이 없습니다." />
        )}
      </ChannelLecturesContentWrapperView>
    );
  }
}
