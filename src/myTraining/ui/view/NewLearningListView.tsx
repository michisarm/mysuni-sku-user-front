import React, { Fragment, useEffect, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { mobxHelper, reactAlert } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { ReviewService } from '@nara.drama/feedback';
import { PageService } from 'shared/stores';
import {
  ENRLectureService,
  LRSLectureService,
  NEWLectureService,
  POPLectureService,
} from 'lecture/stores';
import { LectureModel, LectureServiceType, OrderByType } from 'lecture/model';
import { InMyLectureCdoModel, InMyLectureModel } from 'myTraining/model';
import { CubeType } from 'shared/model';
import lectureRoutePaths from 'lecture/routePaths';
import myTrainingRoutePaths from 'myTraining/routePaths';
import { Lecture, SeeMoreButton } from 'lecture/shared';
import routePaths from 'personalcube/routePaths';
import { NoSuchContentPanel } from 'shared';
import SkProfileService from '../../../profile/present/logic/SkProfileService';
import RQDLectureService from '../../../lecture/shared/present/logic/RQDLectureService';
import LectureFilterRdoModel from '../../../lecture/model/LectureFilterRdoModel';
import ReactGA from 'react-ga';
import { EnrollingViewType } from 'myTraining/ui/logic/NewLearningListContainer';
import { Area } from 'tracker/model';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

enum ContentType {
  New = 'New',
  Popular = 'Popular',
  Recommend = 'Recommend',
  Required = 'Required',
  Enrolling = 'Enrolling',
}

interface Props extends RouteComponentProps<{ type: string; pageNo: string }> {
  skProfileService?: SkProfileService;
  pageService?: PageService;
  reviewService?: ReviewService;
  rqdLectureService?: RQDLectureService;
  newLectureService?: NEWLectureService;
  popLectureService?: POPLectureService;
  lrsLectureService?: LRSLectureService;
  enrLectureService?: ENRLectureService;

  contentType: string;
  order: string;
  totalCount: number;

  setNewOrder: (order: OrderByType) => void;
  showTotalCount: (count: number) => void;
  setPageTitle: (contentType: ContentType) => void;
  viewType?: EnrollingViewType;
}

const NewLearningListView: React.FC<Props> = (Props) => {
  //
  const {
    contentType,
    order,
    skProfileService,
    pageService,
    reviewService,
    rqdLectureService,
    newLectureService,
    popLectureService,
    lrsLectureService,
    enrLectureService,
    setNewOrder,
    showTotalCount,
    setPageTitle,
    match,
    history,
    viewType,
  } = Props;

  const PAGE_KEY = 'lecture.' + contentType;
  const PAGE_SIZE = 16;

  const [yPos, setYPos] = useState(0);
  const [dataArea, setDataArea] = useState<Area | null>(null);

  const lectures = useRef<LectureModel[] | null>(null);
  const curOrder = useRef(''); // 컴포넌트 렌더링에 관여하지 않는다.
  const pageNo = useRef(1);

  const fromMain = useRef(false);
  const refresh = useRef(false);
  const fromBack = useRef(false);

  // 최초 렌더링 후 한번만 호출됨
  useEffect(() => {
    //
    /***** 상세보기 후 히스토리백 원상복귀 & 메인에서 전체보기 클릭 시 처리 *****/
    fromMain.current =
      window.sessionStorage.getItem('from_main') !== null &&
      window.sessionStorage.getItem('from_main') === 'TRUE';
    refresh.current =
      window.sessionStorage.getItem('page_moved') !== null &&
      window.sessionStorage.getItem('page_moved') !== 'TRUE';
    fromBack.current = !fromMain.current && !refresh.current;

    // 메인 페이지로부터 이동
    if (fromMain.current) {
      fromMain.current = true;
      history.replace(routePaths.currentPage(1));
      match.params.pageNo = '1';
      if (order === OrderByType.Popular) {
        setNewOrder(OrderByType.New);
        return () => {};
      }
      curOrder.current = OrderByType.New;
    }
    // 리프레시 시 호출됨
    else if (refresh.current) {
      refresh.current = true;
      curOrder.current = order;
      setNewOrder(
        order === OrderByType.New ? OrderByType.New : OrderByType.Popular
      );
    }
    // (인기순) 상세보기 페이지로부터 이동
    else {
      // fromBack.current === true
      fromBack.current = true;
      // y Position 설정
      const preOrder = window.sessionStorage.getItem('order_type');
      setNewOrder(
        preOrder === OrderByType.New ? OrderByType.New : OrderByType.Popular
      );
      curOrder.current = preOrder!;
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
  }, [viewType]);

  // // 최초 렌더링 후 한번만 호출됨
  // useEffect(() => {
  //   //
  //   /***** 상세보기 후 히스토리백 원상복귀 & 메인에서 전체보기 클릭 시 처리 *****/

  //   fromMain.current =
  //     window.sessionStorage.getItem('from_main') !== null &&
  //     window.sessionStorage.getItem('from_main') === 'TRUE';
  //   refresh.current =
  //     window.sessionStorage.getItem('page_moved') !== null &&
  //     window.sessionStorage.getItem('page_moved') !== 'TRUE';
  //   fromBack.current = !fromMain.current && !refresh.current;

  //   // 메인 페이지로부터 이동
  //   if (fromMain.current) {
  //     fromMain.current = true;
  //     history.replace(routePaths.currentPage(1));
  //     match.params.pageNo = '1';
  //     if (order === OrderByType.Popular) {
  //       setNewOrder(OrderByType.New);
  //       return () => {};
  //     }
  //     curOrder.current = OrderByType.New;
  //   }
  //   // 리프레시 시 호출됨
  //   else if (refresh.current) {
  //     refresh.current = true;
  //     curOrder.current = order;
  //     setNewOrder(
  //       order === OrderByType.New ? OrderByType.New : OrderByType.Popular
  //     );
  //   }
  //   // (인기순) 상세보기 페이지로부터 이동
  //   else {
  //     // fromBack.current === true
  //     fromBack.current = true;
  //     // y Position 설정
  //     const preOrder = window.sessionStorage.getItem('order_type');
  //     setNewOrder(
  //       preOrder === OrderByType.New ? OrderByType.New : OrderByType.Popular
  //     );
  //     curOrder.current = preOrder!;
  //   }

  //   window.sessionStorage.setItem('page_moved', '');

  //   /****************************************************************************/

  //   pageNo.current = getPageNo();

  //   const initialLimit = pageNo.current * PAGE_SIZE;
  //   pageService!.initPageMap(PAGE_KEY, 0, initialLimit);

  //   findLectures(true);

  //   // 페이지 닫힐 때 호출됨: history back을 위한 y position 설정
  //   return () => {
  //     window.sessionStorage.setItem('page_moved', 'TRUE');
  //     window.sessionStorage.setItem('order_type', curOrder.current);
  //     window.sessionStorage.setItem('y_pos', window.scrollY.toString());
  //   };
  // }, []);

  useEffect(() => {
    // 메인으로부터 이동
    if (fromMain.current) {
      fromMain.current = false;
      window.sessionStorage.setItem('from_main', '');
      setYPos(0);
      return;
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
      const ypos = window.sessionStorage.getItem('y_pos');
      setYPos(ypos && ypos != null && ypos.length > 0 ? parseInt(ypos) : 0);
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
      const offset =
        page!.limit > PAGE_SIZE && page!.nextOffset === 0
          ? page!.nextOffset + PAGE_SIZE
          : page!.nextOffset;
      pageService!.initPageMap(PAGE_KEY, offset, PAGE_SIZE);
    } else {
      pageService!.initPageMap(PAGE_KEY, 0, PAGE_SIZE);
    }

    findLectures(match.params.pageNo === '1');
  }, [order, yPos, match.params.pageNo]);

  const findLectures = (clear: boolean) => {
    //
    const pgNo = getPageNo() - 1;
    switch (contentType) {
      case ContentType.Required:
        if (clear) {
          rqdLectureService!.clearLectures();
        }
        findRqdLectures(pgNo);
        break;

      case ContentType.New:
        if (clear) {
          newLectureService!.clearLectures();
        }
        findNewLectures(pgNo);
        break;

      case ContentType.Popular:
        if (clear) {
          popLectureService!.clearLectures();
        }
        findPopLectures(pgNo);
        break;
      case ContentType.Recommend:
        if (clear) {
          lrsLectureService!.clearLectures();
        }
        findLrsLectures(pgNo);
        break;
      case ContentType.Enrolling:
        if (clear) {
          enrLectureService!.clearLectures();
        }
        findEnrLectures(pgNo, viewType);
        break;
    }
  };

  const getPageNo = () => {
    return parseInt(match.params.pageNo, 10);
  };

  const findRqdLectures = async (pageNo: number) => {
    //
    const page = pageService!.pageMap.get(PAGE_KEY);

    // const orderBy = order === OrderByType.New ? OrderByType.New : OrderByType.Popular;
    const lectureFilterRdo = LectureFilterRdoModel.newLectures(
      page!.limit,
      page!.nextOffset /*, orderBy*/
    );
    const lectureOffsetList = await rqdLectureService!.findPagingRqdLectures(
      lectureFilterRdo
    );

    rqdLectureService!.setTitle(lectureOffsetList.title);
    setPageTitle(ContentType.Required);

    lectures.current = rqdLectureService!.rqdLectures;

    let feedbackIds: string[] = [];

    if (lectureOffsetList.results.length > 0) {
      feedbackIds = lectureOffsetList.results.map(
        (lecture: LectureModel) => lecture.reviewId
      );
      reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }

    pageService!.setTotalCountAndPageNo(
      PAGE_KEY,
      lectureOffsetList.totalCount,
      pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1
    );

    showTotalCount(lectureOffsetList.totalCount);
  };

  const findNewLectures = async (pageNo?: number) => {
    //
    const page = pageService!.pageMap.get(PAGE_KEY);

    // const orderBy = order === OrderByType.New ? OrderByType.New : OrderByType.Popular;
    const lectureFilterRdo = LectureFilterRdoModel.newLectures(
      page!.limit,
      page!.nextOffset /*, orderBy*/
    );
    const lectureOffsetList = await newLectureService!.findPagingNewLectures(
      lectureFilterRdo
    );

    newLectureService!.setTitle(lectureOffsetList.title);
    setPageTitle(ContentType.New);

    lectures.current = newLectureService!.newLectures;

    let feedbackIds: string[] = [];

    if (lectureOffsetList.results.length > 0) {
      feedbackIds = lectureOffsetList.results.map(
        (lecture: LectureModel) => lecture.reviewId
      );
      reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }

    pageService!.setTotalCountAndPageNo(
      PAGE_KEY,
      lectureOffsetList.totalCount,
      pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1
    );

    showTotalCount(lectureOffsetList.totalCount);
  };

  const findPopLectures = async (pageNo?: number) => {
    //
    const page = pageService!.pageMap.get(PAGE_KEY);

    // const orderBy = order === OrderByType.New ? OrderByType.New : OrderByType.Popular;
    const lectureFilterRdo = LectureFilterRdoModel.newLectures(
      page!.limit,
      page!.nextOffset /*, orderBy*/
    );
    const lectureOffsetList = await popLectureService!.findPagingPopLectures(
      lectureFilterRdo
    );

    popLectureService!.setTitle(lectureOffsetList.title);
    setPageTitle(ContentType.Popular);

    lectures.current = popLectureService!.popLectures;

    let feedbackIds: string[] = [];

    if (lectureOffsetList.results.length > 0) {
      feedbackIds = lectureOffsetList.results.map(
        (lecture) => lecture.reviewId
      );
      reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }

    pageService!.setTotalCountAndPageNo(
      PAGE_KEY,
      lectureOffsetList.totalCount,
      pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1
    );

    showTotalCount(lectureOffsetList.totalCount);
  };

  const findLrsLectures = async (pageNo?: number) => {
    //
    const page = pageService!.pageMap.get(PAGE_KEY);

    // const orderBy = order === OrderByType.New ? OrderByType.New : OrderByType.Popular;
    const lectureFilterRdo = LectureFilterRdoModel.lrsLectures(
      page!.limit,
      page!.nextOffset,
      skProfileService!.skProfile.email
      /*, orderBy*/
    );
    const lectureOffsetList = await lrsLectureService!.findPagingLrsLectures(
      lectureFilterRdo
    );

    lrsLectureService!.setTitle(lectureOffsetList.title);
    setPageTitle(ContentType.Recommend);

    lectures.current = lrsLectureService!.lrsLectures;

    let feedbackIds: string[] = [];

    if (lectureOffsetList.results && lectureOffsetList.results.length > 0) {
      feedbackIds = lectureOffsetList.results.map(
        (lecture) => lecture.reviewId
      );
      reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }

    pageService!.setTotalCountAndPageNo(
      PAGE_KEY,
      lectureOffsetList.totalCount,
      pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1
    );

    showTotalCount(lectureOffsetList.totalCount);
  };

  const findEnrLectures = async (
    pageNo?: number,
    viewType: EnrollingViewType = 'All'
  ) => {
    //
    const page = pageService!.pageMap.get(PAGE_KEY);

    let excludeClosed = false;

    if (viewType === 'Available') {
      excludeClosed = true;
    }

    // if(window.sessionStorage.getItem("order_type") === OrderByType.Available) orderBy = OrderByType.Available;

    // const orderBy = order === OrderByType.New ? OrderByType.New : OrderByType.Popular;
    const lectureFilterRdo = LectureFilterRdoModel.enrLectures(
      page!.limit,
      page!.nextOffset,
      excludeClosed,
      OrderByType.Time
    );
    const lectureOffsetList = await enrLectureService!.findEnrollingLectures(
      lectureFilterRdo
    );

    enrLectureService!.setTitle(lectureOffsetList.title);
    setPageTitle(ContentType.Enrolling);

    lectures.current = enrLectureService!.enrLectures;

    const feedbackIds: string[] = [];

    if (lectureOffsetList.results && lectureOffsetList.results.length > 0) {
      //feedbackIds = lectureOffsetList.results.map(lecture => lecture.reviewId);
      reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }

    pageService!.setTotalCountAndPageNo(
      PAGE_KEY,
      lectureOffsetList.totalCount,
      pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1
    );

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
    history.replace(routePaths.currentPage(getPageNo() + 1));
    setYPos(window.scrollY);
  };

  // react-ga 카테고리 별 분기처리
  const [state, setState] = useState<string>('');
  useEffect(() => {
    if (window.location.href.match('/New/')?.length) {
      setState('신규과정');
    }
    if (window.location.href.match('/Popular/')?.length) {
      setState('인기과정');
    }
    if (window.location.href.match('/Required/')?.length) {
      setState('권장과정');
    }
    if (window.location.href.match('/Recommend/')?.length) {
      setState('추천과정');
    }
  }, []);

  const onViewDetail = (e: any, data: any) => {
    //
    const { model } = data;

    const collegeId = model.category.college.id;
    const cineroom =
      patronInfo.getCineroomByPatronId(model.servicePatronKeyString) ||
      patronInfo.getCineroomByDomain(model)!;

    if (model.serviceType === LectureServiceType.Card) {
      history.push(lectureRoutePaths.courseOverview(model.serviceId));
    } else if (model.serviceType === LectureServiceType.Card) {
      history.push(
        lectureRoutePaths.lectureCardOverview(model.serviceId, model.cubeId)
      );
    }

    // react-ga event
    ReactGA.event({
      category: `${state}`,
      action: 'Click',
      label: `${model.serviceType === 'Course' ? '(Course)' : '(Cube)'} - ${
        model.name
      }`,
    });

    window.sessionStorage.setItem('y_pos', window.scrollY.toString());
  };

  const onToggleBookmarkLecture = (
    lecture: LectureModel | InMyLectureModel
  ) => {
    // //
    // if (lecture instanceof InMyLectureModel) {
    //   inMyLectureService!
    //     .removeInMyLecture(lecture.id)
    //     .then(() =>
    //       inMyLectureService!.removeInMyLectureInAllList(
    //         lecture.serviceId,
    //         lecture.serviceType
    //       )
    //     );
    // } else {
    //   inMyLectureService!
    //     .addInMyLecture(InMyLectureCdoModel.fromLecture(lecture))
    //     .then(() =>
    //       inMyLectureService!.addInMyLectureInAllList(
    //         lecture.serviceId,
    //         lecture.serviceType
    //       )
    //     );
    // }
  };

  const isContentMore = () => {
    const page = pageService!.pageMap.get(PAGE_KEY);
    return page && page.pageNo < page.totalPages;
  };

  /* render functions by 김동구 */
  const renderNoSuchContentPanel = (contentType: ContentType | string) => {
    // 권장과정일 경우, NoSuchContentPanel 의 message, link 다르게 표시. (개선요청사항)
    if (contentType === ContentType.Required) {
      return (
        <NoSuchContentPanel
          message={getPolyglotText(
            '모든 권장 과정의 학습을 시작하셨습니다.',
            '신규학습-신규목록-모두이수'
          )}
          link={{
            text: getPolyglotText(
              '전체 권장과정 List를 확인하시겠습니까?',
              '신규학습-신규목록-목록확인'
            ),
            path: myTrainingRoutePaths.learningRequired(),
          }}
        />
      );
    }
    // default
    return (
      <NoSuchContentPanel
        message={getPolyglotText(
          '아직 생성한 학습이 없습니다.',
          '신규학습-신규목록-학습없음'
        )}
      />
    );
  };

  useEffect(() => {
    let area = null;
    switch (contentType) {
      case ContentType.Required:
        area = Area.NEWLEARNING_REQUIRED;
        break;
      case ContentType.New:
        area = Area.NEWLEARNING_NEW;
        break;
      case ContentType.Popular:
        area = Area.NEWLEARNING_POPULAR;
        break;
      case ContentType.Recommend:
        area = Area.NEWLEARNING_RECOMMEND;
        break;
      default:
        break;
    }
    if (area) {
      setDataArea(area);
    }
  }, [contentType]);

  return (
    <div className="section" data-area={dataArea}>
      {lectures &&
      lectures.current &&
      lectures.current.length > 0 &&
      lectures.current[0] ? (
        <>
          <Lecture.Group type={Lecture.GroupType.Box}>
            {lectures.current?.map((lecture: any, index: any) => {
              // const inMyLecture =
              //   inMyLectureMap.get(lecture.serviceId) || undefined;
              return null;
              // return (
              //   <Lecture
              //     key={`lecture-${index}`}
              //     model={lecture}
              //     rating={getRating(lecture)}
              //     thumbnailImage={lecture.baseUrl || undefined}
              //     action={
              //       inMyLecture
              //         ? Lecture.ActionType.Remove
              //         : Lecture.ActionType.Add
              //     }
              //     onAction={() => {
              //       reactAlert({
              //         title: getPolyglotText('알림', '신규학습-신규목록-알림'),
              //         message: inMyLecture
              //           ? getPolyglotText(
              //               '본 과정이 관심목록에서 제외되었습니다.',
              //               '신규학습-신규목록-관심제외'
              //             )
              //           : getPolyglotText(
              //               '본 과정이 관심목록에 추가되었습니다.',
              //               '신규학습-신규목록-관심추가'
              //             ),
              //       });
              //       onToggleBookmarkLecture(inMyLecture || lecture);
              //     }}
              //     onViewDetail={onViewDetail}
              //     contentType={contentType}
              //   />
              // );
            })}
          </Lecture.Group>
          {isContentMore() && <SeeMoreButton onClick={onClickSeeMore} />}
          {window.scrollTo(0, yPos)}
        </>
      ) : (
        renderNoSuchContentPanel(contentType)
      )}
    </div>
  );
};

export default inject(
  mobxHelper.injectFrom(
    'shared.pageService',
    'shared.reviewService',
    'profile.skProfileService',
    'myTraining.inMyLectureService',
    'rqdLecture.rqdLectureService',
    'newLecture.newLectureService',
    'popLecture.popLectureService',
    'lrsLecture.lrsLectureService',
    'enrLecture.enrLectureService'
  )
)(withRouter(observer(NewLearningListView)));
