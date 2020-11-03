
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper, Offset } from '@nara.platform/accent';
import { NoSuchContentPanel } from 'shared';
import { SkProfileService } from 'profile/stores';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import { MyLearningContentType, MyPageContentType, NoSuchContentPanelMessages } from '../model';
import { MultiFilterBox } from '../view/filterbox';
import { MyLearningTableTemplate, MyLearningTableHeader, MyLearningTableBody } from '../view/table';
import MyLearningDeleteModal from '../view/MyLearningDeleteModal';
import { Direction } from '../view/table/MyLearningTableHeader';
import { MyTrainingService, InMyLectureService, AplService } from '../../stores';
import { LectureService, SeeMoreButton } from '../../../lecture';
import MyApprovalContentType from '../model/MyApprovalContentType';


interface Props extends RouteComponentProps<RouteParams> {
  contentType: MyContentType;
  skProfileService?: SkProfileService;
  myTrainingService?: MyTrainingService;
  inMyLectureService?: InMyLectureService;
  aplService?: AplService;
  lectureService?: LectureService;
}

interface RouteParams {
  tab: string;
  pageNo?: string;
}

function MyLearningListContainerV2(props: Props) {
  console.log('MyLearningListContainer :: render ::');
  const { contentType, skProfileService, myTrainingService, inMyLectureService, aplService, lectureService, history, match } = props;
  const { profileMemberName } = skProfileService!;

  /* states */
  const [filterCount, setFilterCount] = useState<number>(0);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [viewType, setViewType] = useState<ViewType>('Course');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });

  /* effects */
  useEffect(() => {
    initPage();
    if (filterCount === 0) {
      fetchModelsByContentType(contentType);
    } else {
      fetchModelsByConditions(contentType, viewType);
    }
  }, [contentType, viewType, filterCount]);

  useEffect(() => {
    /* just for clean up */
    return () => clearStore(contentType);
  }, [contentType]);

  /* functions */
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

  const fetchModelsByConditions = async (contentType: MyContentType, viewType: ViewType) => {
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

  const initPage = () => {
    initPageInfo();
    initPageNo();
  };

  const initPageInfo = () => {
    pageInfo.current = { offset: 0, limit: 20 };
  };

  const initPageNo = () => {
    history.replace('./1');
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
        aplService!.initQueryModel();
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
    const { aplCount } = aplService!;
    const { lectureTableCount } = lectureService!;

    switch (contentType) {
      case MyLearningContentType.InMyList:
        return inMyLectureTableCount;
      case MyLearningContentType.Required:
        return lectureTableCount;
      case MyLearningContentType.PersonalCompleted:
        return aplCount.all;
      default:
        return myTrainingTableCount;
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

  /* handlers */
  const onChangeFilterCount = useCallback((count: number) => {
    if (filterCount && filterCount === count) {
      fetchModelsByConditions(contentType, viewType);
    }

    setFilterCount(count);
  }, [filterCount, contentType, viewType]);

  const onClickFilter = useCallback(() => {
    setOpenFilter(prev => !prev);
  }, []);

  const onChangeViewType = useCallback((e: any, data: any) => {
    setViewType(data.value);
  }, []);

  const onClickDelete = useCallback(() => {
    setOpenModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const onConfirmModal = useCallback(async () => {
    setOpenModal(false);
    /* 
      선택된 ids 를 통해 delete 로직을 수행함. 
      delete 로직을 수행 후 목록 조회가 다시 필요함.
    */
    await myTrainingService!.hideBySelectedIds();
    await myTrainingService!.findAllTableViews();
  }, []);

  const onClickSort = useCallback((column: string, direction: Direction) => {
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
  }, [contentType]);

  const onClickSeeMore = useCallback(async () => {
    pageInfo.current.offset += pageInfo.current.limit;
    pageInfo.current.limit = PAGE_SIZE;
    switch (contentType) {
      case MyPageContentType.EarnedStampList:
        await myTrainingService!.findAllStampTableViewsWithPage(pageInfo.current);
        break;
      case MyLearningContentType.InMyList:
        await inMyLectureService!.findAllTableViewsWithPage(pageInfo.current);
        break;
      case MyLearningContentType.Required:
        await lectureService!.findAllRqdTableViewsWithPage(pageInfo.current);
        break;
      case MyLearningContentType.PersonalCompleted:
        await aplService!.findAllAplsWithPage(pageInfo.current);
        break;
      default:
        await myTrainingService!.findAllTableViewsWithPage(pageInfo.current);
    }
    checkShowSeeMore(contentType);
    history.replace(`./${getPageNo()}`);
  }, [contentType, match.params.pageNo]);

  /* Render Functions */
  const renderNoSuchContentPanel = (contentType: MyContentType, withFilter: boolean = false) => {
    const message = withFilter &&
      '필터 조건에 해당하는 결과가 없습니다.' || NoSuchContentPanelMessages.getMessageByConentType(contentType);

    const link = (contentType === MyLearningContentType.InProgress) &&
      { text: `${profileMemberName} 님에게 추천하는 학습 과정 보기`, path: '/lecture/recommend' } || undefined;

    return <NoSuchContentPanel message={message} link={link} />;
  };

  /* render */
  return (
    <>
      {
        isModelExist(contentType) &&
        (
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
              onChangeFilterCount={onChangeFilterCount}
            />
            {!resultEmpty && (
              <>
                <MyLearningTableTemplate
                  contentType={contentType}
                >
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
                {showSeeMore &&
                  (
                    <SeeMoreButton
                      onClick={onClickSeeMore}
                    />
                  )
                }
                {openModal &&
                  (
                    <MyLearningDeleteModal
                      open={openModal}
                      onClose={onCloseModal}
                      onConfirm={onConfirmModal}
                    />
                  )
                }
              </>
            ) || renderNoSuchContentPanel(contentType, true)}
          </>
        ) || renderNoSuchContentPanel(contentType)
      }
    </>
  );
}

export default inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'myTraining.myTrainingService',
  'myTraining.inMyLectureService',
  'myTraining.aplService',
  'lecture.lectureService'
))(withRouter(observer(MyLearningListContainerV2)));

/* globals */
const PAGE_SIZE = 20;

/* types */
export type ViewType = 'Course' | 'All' | ''; // 코스만보기 | 전체보기
export type ApprovalViewType = 'All' | 'Waiting' | 'Approval' | 'Reject';
export type MyContentType = MyLearningContentType | MyPageContentType | MyApprovalContentType;
