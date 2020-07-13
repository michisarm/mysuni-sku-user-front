import React, {useEffect, useRef, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {runInAction} from 'mobx';
import {RouteComponentProps, withRouter} from 'react-router';
import {mobxHelper, reactAlert} from '@nara.platform/accent';
import {patronInfo} from '@nara.platform/dock';
import {ReviewService} from '@nara.drama/feedback';
import {ActionLogService, PageService} from 'shared/stores';
import {LectureService, NewLectureService, PopularLectureService, RecommendLectureService} from 'lecture/stores';
import {LectureModel, LectureServiceType, OrderByType} from 'lecture/model';
import {InMyLectureCdoModel, InMyLectureModel} from 'myTraining/model';
import {InMyLectureService} from 'myTraining/stores';
import {CubeType} from 'shared/model';
import lectureRoutePaths from 'lecture/routePaths';
import {Lecture, SeeMoreButton} from 'lecture/shared';
import routePaths from 'personalcube/routePaths';
import {NoSuchContentPanel} from 'shared';
import {ContentType, OrderType} from '../page/NewLearningPage';
import LectureFilterRdoModel from '../../../lecture/model/LectureFilterRdoModel';


interface Props extends RouteComponentProps<{ type: string, pageNo: string }> {
  actionLogService?: ActionLogService,
  pageService?: PageService,
  reviewService?: ReviewService,
  inMyLectureService?: InMyLectureService,
  lectureService?: LectureService,
  newLectureService?: NewLectureService,
  popularLectureService?: PopularLectureService,
  recommendLectureService?: RecommendLectureService,

  contentType: string,
  order: string,
  totalCount: number,

  moveToScrollY: (ypos: number) => void,
  setNewOrder: (order: OrderType) => void,
  showTotalCount: (count: number) => void,
}

const NewLearningListView : React.FC<Props> = (Props) => {
  //
  const { contentType, order, pageService, reviewService, inMyLectureService, lectureService,
    newLectureService, popularLectureService, recommendLectureService, actionLogService,
    moveToScrollY, setNewOrder, showTotalCount, match, history } = Props;
  const { inMyLectureMap } = inMyLectureService!;

  const PAGE_KEY = 'lecture.' + contentType;
  const PAGE_SIZE = 16;

  const [yPos, setYPos] = useState(0);

  const lectures = useRef<LectureModel[] | null>(null);
  const curOrder = useRef('');  // 컴포넌트 렌더링에 관여하지 않는다.
  const pageNo = useRef(1);

  const fromMain = useRef(false);
  const refresh = useRef(false);
  const fromBack = useRef(false);

  // 최초 렌더링 후 한번만 호출됨
  useEffect(() => {
    //
    /***** 상세보기 후 히스토리백 원상복귀 & 메인에서 전체보기 클릭 시 처리 *****/

    // 메인 페이지로부터 이동
    if (window.sessionStorage.getItem('from_main') === 'TRUE') {
      fromMain.current = true;
      history.replace(routePaths.currentPage(1));
      match.params.pageNo = '1';
      if (order === OrderType.Popular) {
        setNewOrder(OrderType.New);
        return () => {};
      }
      curOrder.current = OrderType.New;
    }
    // 리프레시 시 호출됨
    else if (window.sessionStorage.getItem('page_moved') !== 'TRUE') {
      curOrder.current = order;
      setNewOrder(order === OrderType.New ? OrderType.New : OrderType.Popular);
      refresh.current = true;
    }
    // (인기순) 상세보기 페이지로부터 이동
    else {
      // y Position 설정
      const preOrder = window.sessionStorage.getItem('order_type');
      setNewOrder(preOrder === OrderType.New ? OrderType.New : OrderType.Popular);
      curOrder.current = preOrder!;
      fromBack.current = true;
    }

    window.sessionStorage.setItem('page_moved', '');

    /****************************************************************************/

    pageNo.current = getPageNo();

    const initialLimit = pageNo.current * PAGE_SIZE;
    pageService!.initPageMap(PAGE_KEY, 0, initialLimit);

    findLectures(true);

    // 페이지 닫힐 때 호출됨: history back을 위한 y position 설정
    return () => {
      window.sessionStorage.setItem('page_moved', 'TRUE');
      window.sessionStorage.setItem('order_type', curOrder.current);
      window.sessionStorage.setItem('y_pos', window.scrollY.toString());
    };

  }, []);

  useEffect(() => {
    // 메인으로부터 이동
    if (fromMain.current) {
      fromMain.current = false;
      window.sessionStorage.setItem('from_main', '');
      setYPos(0);
      return; // () => {};
    }
    // Refresh 처리
    else if (refresh.current) {
      refresh.current = false;
      setYPos(0);
      return;
    }
    // 상세보기 후 히스토리백 원상복귀
    else if (fromBack.current) {
      fromBack.current = false;
      const ypos = (window.sessionStorage.getItem('y_pos'));
      setYPos(ypos && ypos.length > 0 ? parseInt(ypos) : 0);
      return;
    }

    // 보기 순서 변경 (update)
    if (order !== curOrder.current) {
      if (match.params.pageNo !== '1') {
        match.params.pageNo = '1';
        pageNo.current = 1;
        history.replace(routePaths.currentPage(1));
      }
      curOrder.current = order;
      setYPos(0);
      window.scrollTo(0, 0);
    }
    // Refresh : 같은 페이지
    else if (getPageNo() === pageNo.current) {
      return;
    }

    const page = pageService!.pageMap.get(PAGE_KEY);

    if (getPageNo() > 1) {
      const offset = page!.limit > PAGE_SIZE && page!.nextOffset === 0 ?
        page!.nextOffset + PAGE_SIZE : page!.nextOffset;
      pageService!.initPageMap(PAGE_KEY, offset, PAGE_SIZE);
    }
    else {
      pageService!.initPageMap(PAGE_KEY, 0, PAGE_SIZE);
    }

    findLectures(match.params.pageNo === '1');

  }, [order, yPos, match.params.pageNo]);

  const findLectures = (clear: boolean) => {
    //
    switch (contentType) {
      case ContentType.Required:
        if (clear) { lectureService!.clearLectures(); }
        findRequiredLectures(getPageNo() - 1);
        break;

      case ContentType.New:
        if (clear) { newLectureService!.clearLectures(); }
        findNewLectures(getPageNo() - 1);
        break;

      case ContentType.Popular:
        if (clear) { popularLectureService!.clearLectures(); }
        findPopularLectures(getPageNo() - 1);
        break;
      case ContentType.Recommend:
        if (clear) { recommendLectureService!.clearLectures(); }
        findRecommendLectures(getPageNo() - 1);
        break;
    }
  };

  const getPageNo = () => {
    return parseInt(match.params.pageNo, 10);
  };

  const findRequiredLectures = async (pageNo: number) => {
    //
    const page = pageService!.pageMap.get(PAGE_KEY);

    // const orderBy = order === OrderType.New ? OrderByType.Time : OrderByType.Popular;
    // const lectureFilterRdo = LectureFilterRdoModel.newLectures(page!.limit, page!.nextOffset/*, orderBy*/);
    const lectureOffsetList = await lectureService!.findPagingRequiredLectures(page!.limit, page!.nextOffset);

    lectures.current = lectureService!.lectures;

    let feedbackIds: string[] = [];

    if (lectureOffsetList.results.length > 0) {
      feedbackIds = lectureOffsetList.results.map((lecture: LectureModel) => lecture.reviewId);
      reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }

    inMyLectureService!.findAllInMyLectures();

    pageService!.setTotalCountAndPageNo(PAGE_KEY, lectureOffsetList.totalCount, pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1);

    showTotalCount(lectureOffsetList.totalCount);
  };

  const findNewLectures = async (pageNo?: number) => {
    //
    const page = pageService!.pageMap.get(PAGE_KEY);

    // const orderBy = order === OrderType.New ? OrderByType.Time : OrderByType.Popular;
    const lectureFilterRdo = LectureFilterRdoModel.newLectures(page!.limit, page!.nextOffset/*, orderBy*/);
    const lectureOffsetList = await newLectureService!.findPagingNewLectures(lectureFilterRdo);

    lectures.current = newLectureService!.newLectures;

    let feedbackIds: string[] = [];

    if (lectureOffsetList.results.length > 0) {
      feedbackIds = lectureOffsetList.results.map((lecture: LectureModel) => lecture.reviewId);
      reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }

    inMyLectureService!.findAllInMyLectures();

    pageService!.setTotalCountAndPageNo(PAGE_KEY, lectureOffsetList.totalCount, pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1);

    showTotalCount(lectureOffsetList.totalCount);
  };

  const findPopularLectures = async (pageNo?: number) => {
    //
    const page = pageService!.pageMap.get(PAGE_KEY);

    // const orderBy = order === OrderType.New ? OrderByType.Time : OrderByType.Popular;
    const lectureFilterRdo = LectureFilterRdoModel.newLectures(page!.limit, page!.nextOffset/*, orderBy*/);
    const lectureOffsetList = await popularLectureService!.findPagingPopularLectures(lectureFilterRdo);

    lectures.current = popularLectureService!.popularLectures;

    let feedbackIds: string[] = [];

    if (lectureOffsetList.results.length > 0) {
      feedbackIds = lectureOffsetList.results.map(lecture => lecture.reviewId);
      reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }

    inMyLectureService!.findAllInMyLectures();

    pageService!.setTotalCountAndPageNo(PAGE_KEY, lectureOffsetList.totalCount, pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1);

    showTotalCount(lectureOffsetList.totalCount);
  };

  const findRecommendLectures = async (pageNo?: number) => {
    //
    const page = pageService!.pageMap.get(PAGE_KEY);

    // const orderBy = order === OrderType.New ? OrderByType.Time : OrderByType.Popular;
    const lectureFilterRdo = LectureFilterRdoModel.newLectures(page!.limit, page!.nextOffset/*, orderBy*/);
    const lectureOffsetList = await recommendLectureService!.findPagingRecommendLectures(lectureFilterRdo);

    lectures.current = recommendLectureService!.recommendLectures;

    let feedbackIds: string[] = [];

    if (lectureOffsetList.results.length > 0) {
      feedbackIds = lectureOffsetList.results.map(lecture => lecture.reviewId);
      reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }

    inMyLectureService!.findAllInMyLectures();

    pageService!.setTotalCountAndPageNo(PAGE_KEY, lectureOffsetList.totalCount, pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1);

    showTotalCount(lectureOffsetList.totalCount);
  };

  const getRating = (lecture: LectureModel) => {
    //
    const { ratingMap } = reviewService!;

    let rating: number | undefined = ratingMap.get(lecture.reviewId) || 0;

    if (lecture.cubeType === CubeType.Community) {
      rating = undefined;
    }
    return rating;
  };

  const onClickSeeMore = () => {
    //
    setYPos(window.scrollY);
    history.replace(routePaths.currentPage(getPageNo() + 1));
  };

  const onViewDetail = (e: any, data: any) => {
    //
    const { model } = data;
    const collegeId = model.category.college.id;
    const cineroom = patronInfo.getCineroomByPatronId(model.servicePatronKeyString) || patronInfo.getCineroomByDomain(model)!;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      history.push(lectureRoutePaths.courseOverview(cineroom.id, collegeId, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(lectureRoutePaths.lectureCardOverview(cineroom.id, collegeId, model.cubeId, model.serviceId));
    }
  };

  const onToggleBookmarkLecture = (lecture: LectureModel | InMyLectureModel) => {
    //
    actionLogService?.registerSeenActionLog({ lecture, subAction: '아이콘' });

    if (lecture instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(lecture.id)
        .then(() => inMyLectureService!.removeInMyLectureInAllList(lecture.serviceId, lecture.serviceType));
    }
    else {
      inMyLectureService!.addInMyLecture(InMyLectureCdoModel.fromLecture(lecture))
        .then(() => inMyLectureService!.addInMyLectureInAllList(lecture.serviceId, lecture.serviceType));
    }
  };

  const isContentMore = () => {
    const page = pageService!.pageMap.get(PAGE_KEY);
    return page && page.pageNo < page.totalPages;
  };

  return (
    <div className="section">
      { lectures && lectures.current && lectures.current.length > 0 ?
        <>
          <Lecture.Group type={Lecture.GroupType.Box}>
            {lectures.current?.map((lecture: any, index: any) => {
              const inMyLecture = inMyLectureMap.get(lecture.serviceId) || undefined;
              return (
                <Lecture
                  key={`lecture-${index}`}
                  model={lecture}
                  rating={getRating(lecture)}
                  thumbnailImage={lecture.baseUrl || undefined}
                  action={inMyLecture ? Lecture.ActionType.Remove : Lecture.ActionType.Add}
                  onAction={() => {
                    reactAlert({title: '알림', message: inMyLecture ? '본 과정이 관심목록에서 제외되었습니다.' : '본 과정이 관심목록에 추가되었습니다.'});
                    onToggleBookmarkLecture(inMyLecture || lecture);
                  }}
                  onViewDetail={onViewDetail}
                />
              );
            })}
          </Lecture.Group>
          { isContentMore() && ( <SeeMoreButton onClick={onClickSeeMore} /> ) }
          { moveToScrollY(yPos) }
        </>
        :
        <NoSuchContentPanel message="아직 생성한 학습이 없습니다." />
      }
    </div>
  );
};

export default inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'shared.pageService',
  'shared.reviewService',
  'myTraining.inMyLectureService',
  'lecture.lectureService',
  'newLecture.newLectureService',
  'popularLecture.popularLectureService',
  'recommendLecture.recommendLectureService',
))(withRouter(observer(NewLearningListView)));
