import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper, Offset } from '@nara.platform/accent';
import { NoSuchContentPanel, Loadingpanel } from 'shared';
import { SkProfileService } from 'profile/stores';
import { CollegeService } from 'college/stores';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import MyLearningDeleteModal from '../view/MyLearningDeleteModal';
import {
  MyTrainingService,
} from '../../stores';
import {
  LectureService,
  SeeMoreButton,
  StudentService,
} from '../../../lecture';
import ReactGA from 'react-ga';
import { Segment } from 'semantic-ui-react';
import FilterBoxContainer from './FilterBoxContainer';
import { Direction } from '../../model/Direction';
import { MyLearningContentType } from '../model/MyLearningContentType';
import { MyPageContentType } from '../model/MyPageContentType';
import NoSuchContentPanelMessages from '../model/NoSuchContentPanelMessages';
import { MyContentType } from '../model/MyContentType';
import MyLearningTableTemplate from '../view/table/MyLearningTableTemplate';
import MyLearningTableHeader from '../view/table/MyLearningTableHeader';
import MyLearningTableBody from '../view/table/MyLearningTableBody';
import { MyTrainingRouteParams } from '../../model/MyTrainingRouteParams';

interface MyTrainingListContainerProps {
  skProfileService?: SkProfileService;
  myTrainingService?: MyTrainingService;
  lectureService?: LectureService;
  studentService?: StudentService;
  collegeService?: CollegeService;
}

function MyTrainingListContainer({
  skProfileService,
  myTrainingService,
  lectureService,
  studentService,
  collegeService,
}: MyTrainingListContainerProps) {
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  const { profileMemberName } = skProfileService!;
  const { colleges } = collegeService!;

  const [filterCount, setFilterCount] = useState<number>(0);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
  const [refresh, setRefesh] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });
  const learningOffset: any = sessionStorage.getItem('learningOffset');

  useEffect(() => {
    if(
      colleges &&
      colleges.length > 0
    ) {
      return;
    }

    collegeService!.findAllColleges();
  }, []);

  useEffect(() => {
    refeshPageInfo();
    fetchModelsByContentType(contentType);
    fetchFilterCountViews(contentType);

    return () => {
      clearStore(contentType);
      clearFilterCountViews(contentType);
    }
  }, [contentType]);


  useEffect(() => {
    if (refresh) {
      refeshPageInfo();
      getPageInfo();
    }
  }, [refresh]);

  const refeshPageInfo = () => setRefesh(() => !refresh);
  
  const fetchFilterCountViews = (contentType: MyContentType): void => {
    /* 필터 항목 별 카운트를 조회하기 위함. */
    switch (contentType) {
      case MyLearningContentType.Required:
        lectureService!.findAllFilterCountViews();
        break;
      default:
        myTrainingService!.findAllFilterCountViews();
    }
  };

  const clearFilterCountViews = (contentType: MyContentType): void => {
    switch (contentType) {
      case MyLearningContentType.Required:
        lectureService!.clearAllFilterCountViews();
        break;
      default:
        myTrainingService!.clearAllFilterCountViews();
    }
  };

  const fetchModelsByContentType = async (contentType: MyContentType) => {
    initStore(contentType);
    switch (contentType) {
      case MyLearningContentType.InProgress:
      case MyLearningContentType.Completed: {
        setIsLoading(true);
        const isEmpty = await myTrainingService!.findAllTableViews();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        setIsLoading(false);
        return;
      }
    
      /* 권장과정 */
      case MyLearningContentType.Required: {
        setIsLoading(true);
        const isEmpty = await lectureService!.findAllRqdTableViews();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        setIsLoading(false);
        return;
      }

      default: {
        setIsLoading(true);
        const isEmpty = await myTrainingService!.findAllTableViews();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        setIsLoading(false);
      }
    }
  };

  const fetchModelsByConditions = async (
    contentType: MyContentType,
  ) => {
    switch (contentType) {
      case MyLearningContentType.Required: {
        setIsLoading(true);
        const isEmpty = await lectureService!.findAllRqdTableViewsByConditions();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        setIsLoading(false);
        return;
      }

      default: {
        setIsLoading(true);
        const isEmpty = await myTrainingService!.findAllTableViewsByConditions();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        setIsLoading(false);
      }
    }
  };


  const TableViewsMenu = ['InProgress', 'Enrolled', 'Completed', 'Retry'];

  const getPageInfo = async () => {
    const matchesMenu = TableViewsMenu.includes(contentType);
    if (learningOffset !== null && matchesMenu && refresh) {
      setIsLoading(true);
      // if (learningOffset !== null && matchesMenu && refresh) {
      pageInfo.current = JSON.parse(learningOffset);
      await findTableViewsPage(pageInfo.current);
    }
  };

  const getPageNo = (): number => {
    const currentPageNo = params.pageNo;
    if (currentPageNo) {
      const nextPageNo = parseInt(currentPageNo) + 1;
      return nextPageNo;
    }
    return 1;
  };

  const clearStore = (contentType: MyContentType) => {
    switch (contentType) {
      case MyLearningContentType.Required:
        lectureService!.clearAllTableViews();
        break;
      default:
        myTrainingService!.clearAllTableViews();
    }
  };

  const initStore = (contentType: MyContentType) => {
    switch (contentType) {
      case MyLearningContentType.Required:
        lectureService!.initFilterRdo();
        break;
      default:
        myTrainingService!.initFilterRdo(contentType);
    }
  };

  const getModels = (contentType: MyContentType) => {
    const { myTrainingTableViews } = myTrainingService!;
    const { lectureTableViews } = lectureService!;

    switch (contentType) {
      case MyLearningContentType.Required:
        return lectureTableViews;
      default:
        return myTrainingTableViews;
    }
  };

  const getTotalCount = (contentType: MyContentType): number => {
    const { myTrainingTableCount } = myTrainingService!;
    const { lectureTableCount } = lectureService!;

    switch (contentType) {
      case MyLearningContentType.Required:
        return lectureTableCount;
      default:
        return myTrainingTableCount;
    }
  };

  const isModelExist = (contentType: MyContentType) => {
    const { myTrainingTableViews } = myTrainingService!;
    const { lectureTableViews } = lectureService!;

    switch (contentType) {
      case MyLearningContentType.Required:
        return lectureTableViews && lectureTableViews.length;
      default:
        return myTrainingTableViews && myTrainingTableViews.length;
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
    const inProgressTableViews = await myTrainingService!.findAllInProgressStorage();
    sessionStorage.setItem('inProgressTableViews', JSON.stringify(inProgressTableViews));

    // /* 메인페이지 학습중 스토리지 업데이트 */
    // await myTrainingService!.findAllMyTrainingsWithState(
    //   'InProgress',
    //   8,
    //   0,
    //   [],
    //   true
    // );
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
      fetchModelsByConditions(contentType);
    } else {
      fetchModelsByContentType(contentType);
    }
  };

  const onClickFilter = useCallback(() => {
    setOpenFilter(prev => !prev);
  }, []);

  const onClickDelete = useCallback(() => {
    setOpenModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const onConfirmModal = useCallback(async () => {
    const { selectedServiceIds } = myTrainingService!;

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
    setIsLoading(false);
  };

  const findTableViewsPage = async (pageInfo: Offset) => {
    await myTrainingService!.findAllTableViewsWithPage(pageInfo);
    setIsLoading(false);
  };

  const onClickSeeMore = useCallback(async () => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);
    pageInfo.current.limit = PAGE_SIZE;
    pageInfo.current.offset += pageInfo.current.limit;
    history.replace(`./${getPageNo()}`);
    sessionStorage.setItem('learningOffset', JSON.stringify(pageInfo.current));
    if (contentType === 'Required') findRequiredViewPage(pageInfo.current);
    if (contentType !== 'InMyList' && contentType !== 'Required') {
      findTableViewsPage(pageInfo.current);
    }
    checkShowSeeMore(contentType);
  }, [contentType, pageInfo.current, params.pageNo]);

  /* Render Functions */
  const noSuchMessage = (
    contentType: MyContentType,
    withFilter: boolean = false
  ) => {
    return (
      (withFilter && '필터 조건에 해당하는 결과가 없습니다.') ||
      NoSuchContentPanelMessages.getMessageByConentType(contentType)
    );
  };
  
  const noSuchLink = (contentType: MyContentType) => {
    return (
      (contentType === MyLearningContentType.InProgress && {
        text: `${profileMemberName} 님에게 추천하는 학습 과정 보기`,
        path: '/lecture/recommend',
      }) ||
      undefined
    );
  };

  /* render */
  return (
    <>
      {((!resultEmpty || filterCount > 0) && (
        <>
          <LineHeaderContainerV2
            contentType={contentType}
            resultEmpty={resultEmpty}
            totalCount={getTotalCount(contentType)}
            filterCount={filterCount}
            openFilter={openFilter}
            onClickFilter={onClickFilter}
            onClickDelete={onClickDelete}
          />
          <FilterBoxContainer
            openFilter={openFilter}
            onClickFilter={onClickFilter}
            onChangeFilterCount={onChangeFilterCount}
            getModels={getModelsByConditions}
          />
        </>
      )) || <div style={{ marginTop: 50 }} />}
      {(isModelExist(contentType) && (
        <>
          {(!resultEmpty && (
            <>
              <MyLearningTableTemplate>
                <MyLearningTableHeader
                  contentType={contentType}
                  onClickSort={onClickSort}
                />
                <MyLearningTableBody
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
          )) || (
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
              {!isLoading && (
                <NoSuchContentPanel
                  message={noSuchMessage(contentType, true)}
                  link={noSuchLink(contentType)}
                />
              )}
            </Segment>
          )}
        </>
      )) || (
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
          {!isLoading && (
            <NoSuchContentPanel
              message={noSuchMessage(contentType)}
              link={noSuchLink(contentType)}
            />
          )}
        </Segment>
      )}
    </>
  );
}

export default inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'myTraining.myTrainingService',
    'lecture.lectureService',
    'lecture.studentService',
    'college.collegeService'
  )
)(observer(MyTrainingListContainer));

const PAGE_SIZE = 20;