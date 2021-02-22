import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RouteComponentProps, useLocation, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper, Offset } from '@nara.platform/accent';
import { NoSuchContentPanel } from 'shared';
import { SkProfileService } from 'profile/stores';
import { CollegeService } from 'college/stores';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import {
  MyLearningContentType,
  MyPageContentType,
  NoSuchContentPanelMessages,
} from '../model';
import { MultiFilterBox } from '../view/filterbox';
import {
  MyLearningTableTemplate,
  MyLearningTableHeader,
  MyLearningTableBody,
} from '../view/table';
import MyLearningDeleteModal from '../view/MyLearningDeleteModal';
import { Direction } from '../view/table/MyLearningTableHeader';
import {
  MyTrainingService,
  InMyLectureService,
  AplService,
} from '../../stores';
import {
  LectureService,
  SeeMoreButton,
  StudentService,
} from '../../../lecture';
import MyApprovalContentType from '../model/MyApprovalContentType';
import FilterCountViewModel from '../../model/FilterCountViewModel';
import ReactGA from 'react-ga';

interface Props extends RouteComponentProps<RouteParams> {
  contentType: MyContentType;
  skProfileService?: SkProfileService;
  myTrainingService?: MyTrainingService;
  inMyLectureService?: InMyLectureService;
  aplService?: AplService;
  lectureService?: LectureService;
  studentService?: StudentService;
  collegeService?: CollegeService;
}

interface RouteParams {
  tab: string;
  pageNo?: string;
}

function MyLearningListContainerV2(props: Props) {
  const { contentType, history, match } = props;
  const {
    skProfileService,
    myTrainingService,
    inMyLectureService,
    aplService,
    lectureService,
    studentService,
    collegeService,
  } = props;
  const { profileMemberName } = skProfileService!;
  const { colleges } = collegeService!;
  const { inprogressCount } = myTrainingService!;

  /* states */
  const [filterCount, setFilterCount] = useState<number>(0);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [viewType, setViewType] = useState<ViewType>('Course');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
  const [refresh, setRefesh] = useState<boolean>(false)

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });
  const prevOffset: any = sessionStorage.getItem('prevOffset');

  /* effects */
  useEffect(() => {
    /* 상위 컴포넌트에서 조회되는 colleges 가 없을 경우, MultiFilterBox 에 전달하기 위해 다시 조회함.*/
    if (!colleges || !colleges.length) {
      collegeService!.findAllColleges();
    }
  }, []);

  useEffect(() => {
    refeshPageInfo();
    fetchModelsByContentType(contentType);
  }, [contentType, viewType]);

  useEffect(() => {
    /* just for clean up */
    return () => clearStore(contentType);
  }, [contentType]);

  useEffect(() => {
    /* 
      contentType 및 viewType 이 변함에 따라 
      필터 항목 별 카운트는 다시 조회되어야 함. 
    */
    fetchFilterCountViews(contentType);

    return () => clearFilterCountViews(contentType);
  }, [contentType, viewType]);

  /* functions */

  const fetchFilterCountViews = (contentType: MyContentType): void => {
    /* 필터 항목 별 카운트를 조회하기 위함. */
    switch (contentType) {
      case MyLearningContentType.PersonalCompleted:
        break;
      case MyLearningContentType.InMyList:
        inMyLectureService!.findAllFilterCountViews();
        break;
      case MyLearningContentType.Required:
        lectureService!.findAllFilterCountViews();
        break;
      default:
        myTrainingService!.findAllFilterCountViews();
    }
  };

  const clearFilterCountViews = (contentType: MyContentType): void => {
    switch (contentType) {
      case MyLearningContentType.InMyList:
        inMyLectureService!.clearAllFilterCountViews();
        break;
      case MyLearningContentType.Required:
        lectureService!.clearAllFilterCountViews();
        break;
      default:
        myTrainingService!.clearAllFilterCountViews();
    }
  };

  const fetchModelsByContentType = async (contentType: MyContentType) => {
    //
    //clearStore(contentType);
    initStore(contentType);
    switch (contentType) {
      /* 학습중 & mySUNI 학습완료 */
      case MyLearningContentType.InProgress:
      case MyLearningContentType.Completed: {
        myTrainingService!.changeFilterRdoWithViewType(viewType);
        const isEmpty = await myTrainingService!.findAllTableViews();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        return;
      }
      /* 개인학습 완료 & 승인관리 페이지 개인학습 */
      case MyLearningContentType.PersonalCompleted: {
        const offsetApl = await aplService!.findAllAplsByQuery();
        const isEmpty = offsetApl.results.length === 0 ? true : false;
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        return;
      }
      /* 관심목록 & 권장과정 */
      case MyLearningContentType.InMyList: {
        const isEmpty = await inMyLectureService!.findAllTableViews();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        return;
      }
      case MyLearningContentType.Required: {
        const isEmpty = await lectureService!.findAllRqdTableViews();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        return;
      }
      /* My Page :: My Stamp */
      case MyPageContentType.EarnedStampList: {
        const isEmpty = await myTrainingService!.findAllStampTableViews();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        return;
      }
      /* 학습예정 & 취소/미이수 */
      default: {
        const isEmpty = await myTrainingService!.findAllTableViews();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
      }
    }
  };

  const fetchModelsByConditions = async (
    contentType: MyContentType,
    viewType: ViewType
  ) => {
    switch (contentType) {
      case MyPageContentType.EarnedStampList: {
        const isEmpty = await myTrainingService!.findAllStampTableViewsByConditions();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        return;
      }
      case MyLearningContentType.InMyList: {
        const isEmpty = await inMyLectureService!.findAllTableViewsByConditions();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        return;
      }
      case MyLearningContentType.Required: {
        const isEmpty = await lectureService!.findAllRqdTableViewsByConditions();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        return;
      }

      default: {
        if (viewType) {
          viewType = changeViewType(contentType);
          myTrainingService!.changeFilterRdoWithViewType(viewType);
        }
        const isEmpty = await myTrainingService!.findAllTableViewsByConditions();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
      }
    }
  };

  const refeshPageInfo = () => setRefesh(() => !refresh);

  useEffect(() => {
    if (refresh) {
      refeshPageInfo();
      getPageInfo();
    }
  }, [refresh])

  const TableViewsMenu = ['InProgress', 'Enrolled', 'Completed', 'Retry']

  const getPageInfo = () => {
    const matchesMenu = TableViewsMenu.includes(contentType);

    if (prevOffset !== null && matchesMenu && refresh) {
      // if (prevOffset !== null && matchesMenu && refresh) {
      pageInfo.current = JSON.parse(prevOffset)
      findTableViewsPage(pageInfo.current);
    } else if (prevOffset !== null && contentType === 'Required' && refresh) {
      pageInfo.current = JSON.parse(prevOffset)
      findRequiredViewPage(pageInfo.current);
    } else if (prevOffset !== null && contentType === 'InMyList' && refresh) {
      pageInfo.current = JSON.parse(prevOffset)
      findInMyListViewPage(pageInfo.current);
    } else if (prevOffset !== null && contentType === 'PersonalCompleted' && refresh) {
      pageInfo.current = JSON.parse(prevOffset)
      findPersonalCompletedViewPage(pageInfo.current);
    }
  };

  const getPageNo = (): number => {
    const currentPageNo = match.params.pageNo;
    if (currentPageNo) {
      const nextPageNo = parseInt(currentPageNo) + 1;
      return nextPageNo;
    }
    return 1;
  };

  const clearStore = (contentType: MyContentType) => {
    switch (contentType) {
      case MyLearningContentType.InMyList:
        inMyLectureService!.clearAllTableViews();
        break;
      case MyLearningContentType.Required:
        lectureService!.clearAllTableViews();
        break;
      case MyLearningContentType.PersonalCompleted:
        aplService!.clearApls();
        break;
      default:
        myTrainingService!.clearAllTableViews();
    }
  };

  const initStore = (contentType: MyContentType) => {
    switch (contentType) {
      case MyLearningContentType.InMyList:
        inMyLectureService!.initFilterRdo();
        break;
      case MyLearningContentType.Required:
        lectureService!.initFilterRdo();
        break;
      case MyLearningContentType.PersonalCompleted:
        aplService!.clearAplQueryProps();
        break;
      default:
        myTrainingService!.initFilterRdo(contentType);
    }
  };

  const getModels = (contentType: MyContentType) => {
    const { myTrainingTableViews } = myTrainingService!;
    const { inMyLectureTableViews } = inMyLectureService!;
    const { apls: offsetApl } = aplService!;
    const { lectureTableViews } = lectureService!;

    switch (contentType) {
      case MyLearningContentType.InMyList:
        return inMyLectureTableViews;
      case MyLearningContentType.Required:
        return lectureTableViews;
      case MyLearningContentType.PersonalCompleted:
        return offsetApl.results;
      default:
        return myTrainingTableViews;
    }
  };

  const getTotalCount = (contentType: MyContentType): number => {
    const { inMyLectureTableCount } = inMyLectureService!;
    const { myTrainingTableCount } = myTrainingService!;
    const { lectureTableCount } = lectureService!;
    const {
      aplCount: { all: aplTableCount },
    } = aplService!; /* 승인 완료된 카운트만 */

    switch (contentType) {
      case MyLearningContentType.InMyList:
        return inMyLectureTableCount;
      case MyLearningContentType.Required:
        return lectureTableCount;
      case MyLearningContentType.PersonalCompleted:
        return aplTableCount;
      default:
        return myTrainingTableCount;
    }
  };

  const getFilterCountViews = (
    contentType: MyContentType
  ): FilterCountViewModel[] => {
    switch (contentType) {
      case MyLearningContentType.InMyList:
        return inMyLectureService!.filterCountViews;
      case MyLearningContentType.Required:
        return lectureService!.filterCountViews;
      default:
        return myTrainingService!.filterCountViews;
    }
  };

  const getTotalFilterCountView = (
    contentType: MyContentType
  ): FilterCountViewModel => {
    switch (contentType) {
      case MyLearningContentType.InMyList:
        return inMyLectureService!.totalFilterCountView;
      case MyLearningContentType.Required:
        return lectureService!.totalFilterCountView;
      default:
        return myTrainingService!.totalFilterCountView;
    }
  };

  const isModelExist = (contentType: MyContentType) => {
    const { myTrainingTableViews } = myTrainingService!;
    const { inMyLectureTableViews } = inMyLectureService!;
    const { apls: offsetApl } = aplService!;
    const { lectureTableViews } = lectureService!;

    switch (contentType) {
      case MyLearningContentType.InMyList:
        return inMyLectureTableViews && inMyLectureTableViews.length;
      case MyLearningContentType.Required:
        return lectureTableViews && lectureTableViews.length;
      case MyLearningContentType.PersonalCompleted:
        return offsetApl.results && offsetApl.results.length;
      default:
        return myTrainingTableViews && myTrainingTableViews.length;
    }
  };

  const changeViewType = (contentType: MyContentType): ViewType => {
    switch (contentType) {
      case MyLearningContentType.InProgress:
      case MyLearningContentType.Completed:
        return viewType;
      default:
        return '';
    }
  };

  const checkShowSeeMore = (contentType: MyContentType): void => {
    const models = getModels(contentType);
    const totalCount = getTotalCount(contentType);

    if (models.length >= totalCount) {
      setShowSeeMore(false);
      return;
    }
    if (totalCount <= PAGE_SIZE) {
      setShowSeeMore(false);
      return;
    }

    setShowSeeMore(true);
  };

  const updateInProgressStorage = async () => {
    /* 러닝페이지 학습중 스토리지 업데이트 */
    const inProgressTableViews = await myTrainingService!.findAllInProgressTableViewsForStorage();
    sessionStorage.setItem(
      'inProgressTableViews',
      JSON.stringify(inProgressTableViews)
    );

    /* 메인페이지 학습중 스토리지 업데이트 */
    await myTrainingService!.findAllMyTrainingsWithState(
      'InProgress',
      8,
      0,
      [],
      true
    );
  };

  /* handlers */
  const onChangeFilterCount = useCallback((count: number) => {
    /* if (filterCount && filterCount === count) {
      initPage();
      fetchModelsByConditions(contentType, viewType);
    }
    */
    setFilterCount(count);
  }, []);

  const getModelsByConditions = (count: number) => {
    if (count > 0) {
      // initPage();
      fetchModelsByConditions(contentType, viewType);
    } else {
      fetchModelsByContentType(contentType);
    }
  };

  const onClickFilter = useCallback(() => {
    setOpenFilter(prev => !prev);
  }, []);

  const onChangeViewType = useCallback((e: any, data: any) => {
    setViewType(data.value);
    sessionStorage.removeItem('prevOffset');
    sessionStorage.removeItem('SCROLL_POS');
    pageInfo.current = { offset: 0, limit: 20 };
    window.scrollTo(0, 0)
  }, [pageInfo.current]);

  const onClickDelete = useCallback(() => {
    setOpenModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const onConfirmModal = useCallback(async () => {
    const { selectedServiceIds } = myTrainingService!;
    /*
      선택된 serviceIds 를 통해 DELETE(숨김) 처리를 함.
      숨김 처리 후 목록 업데이트를 위해 다시 목록 조회가 필요함.
    */
    const isHidden = await studentService!.hideWithSelectedServiceIds(
      selectedServiceIds
    );
    if (isHidden) {
      await updateInProgressStorage();
      myTrainingService!.findAllTabCount();
      myTrainingService!.findAllTableViews();
      myTrainingService!.clearAllSelectedServiceIds();
    }

    setOpenModal(false);
  }, []);

  const onClickSort = useCallback(
    (column: string, direction: Direction) => {
      switch (contentType) {
        case MyLearningContentType.InMyList:
          inMyLectureService!.sortTableViews(column, direction);
          break;
        case MyLearningContentType.Required:
          lectureService!.sortTableViews(column, direction);
          break;
        default:
          myTrainingService!.sortTableViews(column, direction);
      }
    },
    [contentType]
  );

  const findRequiredViewPage = async (pageInfo: Offset) => {
    await lectureService!.findAllRqdTableViewsWithPage(pageInfo);
  }

  const findInMyListViewPage = async (pageInfo: Offset) => {
    await inMyLectureService!.findAllTableViewsWithPage(pageInfo);
  }

  const findPersonalCompletedViewPage = async (pageInfo: Offset) => {
    await aplService!.findAllAplsWithPage(pageInfo);
  }

  const findTableViewsPage = async (pageInfo: Offset) => {
    switch (contentType) {
      case MyPageContentType.EarnedStampList:
        await myTrainingService!.findAllStampTableViewsWithPage(
          pageInfo
        );
        break;
      default:
        await myTrainingService!.findAllTableViewsWithPage(pageInfo);
    }
  }

  const onClickSeeMore = useCallback(async () => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);
    pageInfo.current.limit = PAGE_SIZE;
    pageInfo.current.offset += pageInfo.current.limit
    sessionStorage.setItem('prevOffset', JSON.stringify(pageInfo.current))
    if (contentType === 'Required') findRequiredViewPage(pageInfo.current)
    if (contentType === 'InMyList') findInMyListViewPage(pageInfo.current)
    if (contentType !== 'InMyList' && contentType !== 'Required') findTableViewsPage(pageInfo.current);
    checkShowSeeMore(contentType);
    history.replace(`./${getPageNo()}`);
  }, [contentType, pageInfo.current]);

  /* Render Functions */
  const renderNoSuchContentPanel = (
    contentType: MyContentType,
    withFilter: boolean = false
  ) => {
    const message =
      (withFilter && '필터 조건에 해당하는 결과가 없습니다.') ||
      NoSuchContentPanelMessages.getMessageByConentType(contentType);

    const link =
      (contentType === MyLearningContentType.InProgress && {
        text: `${profileMemberName} 님에게 추천하는 학습 과정 보기`,
        path: '/lecture/recommend',
      }) ||
      undefined;

    return <NoSuchContentPanel message={message} link={link} />;
  };



  /* render */
  return (
    <>
      {(!resultEmpty || filterCount > 0) && (
        <>
          <LineHeaderContainerV2
            contentType={contentType}
            viewType={viewType}
            onChangeViewType={onChangeViewType}
            resultEmpty={resultEmpty}
            totalCount={getTotalCount(contentType)}
            filterCount={filterCount}
            openFilter={openFilter}
            onClickFilter={onClickFilter}
            onClickDelete={onClickDelete}
          />
          <MultiFilterBox
            contentType={contentType}
            viewType={viewType}
            openFilter={openFilter}
            onClickFilter={onClickFilter}
            onChangeFilterCount={onChangeFilterCount}
            getModels={getModelsByConditions}
            colleges={colleges}
            totalFilterCount={getTotalFilterCountView(contentType)}
            filterCounts={getFilterCountViews(contentType)}
          />
        </>
      )}
      {(isModelExist(contentType) && (
        <>
          {(!resultEmpty && (
            <>
              <MyLearningTableTemplate contentType={contentType}>
                <MyLearningTableHeader
                  contentType={contentType}
                  onClickSort={onClickSort}
                />
                <MyLearningTableBody
                  contentType={contentType}
                  models={getModels(contentType)}
                  totalCount={getTotalCount(contentType)}
                />
              </MyLearningTableTemplate>
              {showSeeMore && <SeeMoreButton onClick={onClickSeeMore} />}
              {openModal && (
                <MyLearningDeleteModal
                  open={openModal}
                  onClose={onCloseModal}
                  onConfirm={onConfirmModal}
                />
              )}
            </>
          )) ||
            renderNoSuchContentPanel(contentType, true)}
        </>
      )) ||
        renderNoSuchContentPanel(contentType)}
    </>
  );
}

export default inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'myTraining.myTrainingService',
    'myTraining.inMyLectureService',
    'myTraining.aplService',
    'lecture.lectureService',
    'lecture.studentService',
    'college.collegeService'
  )
)(withRouter(observer(MyLearningListContainerV2)));

/* globals */
const PAGE_SIZE = 20;

/* types */
export type ViewType = 'Course' | 'All' | ''; // 코스만보기 | 전체보기
export type ApprovalViewType = 'All' | 'Waiting' | 'Approval' | 'Reject';
export type MyContentType =
  | MyLearningContentType
  | MyPageContentType
  | MyApprovalContentType;
