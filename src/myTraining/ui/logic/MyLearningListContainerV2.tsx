import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper, Offset } from '@nara.platform/accent';
import { NoSuchContentPanel } from 'shared';
import { SkProfileService } from 'profile/stores';
import { MyTrainingModelV2, InMyLectureModelV2 } from 'myTraining/model';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import { MyLearningContentType, MyPageContentType, NoSuchContentPanelMessages } from '../model';
import { MultiFilterBox } from '../view/filterbox';
import { MyLearningTableTemplate, MyLearningTableHeader, MyLearningTableBody } from '../view/table';
import { LectureService, SeeMoreButton } from '../../../lecture';
import { MyTrainingService, InMyLectureService } from '../../stores';
import MyLearningDeleteModal from '../view/MyLearningDeleteModal';
import { Direction } from '../view/table/MyLearningTableHeader';

interface Props extends RouteComponentProps {
  contentType: MyLearningContentType | MyPageContentType;
  skProfileService?: SkProfileService;
  myTrainingService?: MyTrainingService;
  inMyLectureService?: InMyLectureService;
  lectureService?: LectureService;
}

function MyLearningListContainerV2(props: Props) {
  const { contentType, skProfileService, myTrainingService, inMyLectureService } = props;
  const { profileMemberName } = skProfileService!;
  const { myTrainingV2s, myTrainingV2Count } = myTrainingService!;
  const { inMyLectureV2s, inMyLectureV2Count } = inMyLectureService!;

  /* states */
  const [filterCount, setFilterCount] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  const [viewType, setViewType] = useState<ViewType>('Course');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(true);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });

  /* effects */
  useEffect(() => {
    //
    initPageInfo();
    if (filterCount === 0) {
      fetchModelsByContentType(contentType);
    } else {
      fetchModelsByConditions(contentType, viewType);
    }

  }, [contentType, viewType, filterCount]);

  /* functions */
  const fetchModelsByContentType = async (contentType: MyLearningContentType | MyPageContentType) => {
    //
    clearAndInitStore(contentType);
    //
    switch (contentType) {
      /* 학습중 & mySUNI 학습완료 */
      case MyLearningContentType.InProgress:
      case MyLearningContentType.Completed: {
        myTrainingService!.changeFilterRdoWithViewType(viewType);
        const isEmpty = await myTrainingService!.findAllMyTrainingV2();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        return;
      }
      /* 관심목록 & 권장과정 */
      case MyLearningContentType.InMyList: {
        const isEmpty = await inMyLectureService!.findAllInMyLectureV2s();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        return;
      }
      case MyLearningContentType.Required: {
        return;
      }
      /* My Page :: My Stamp */
      case MyPageContentType.EarnedStampList: {
        const isEmpty = await myTrainingService!.findAllMyTrainingsV2WithStamp();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        return;
      }
      /* 학습예정 & 취소/미이수 */
      default: {
        myTrainingService!.clearAllMyTrainingV2();
        myTrainingService!.initFilterRdo(contentType);
        const isEmpty = await myTrainingService!.findAllMyTrainingV2();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
      }
    }
  };

  const fetchModelsByConditions = async (contentType: MyLearningContentType | MyPageContentType, viewType: string) => {
    switch (contentType) {
      case MyPageContentType.EarnedStampList: {
        const isEmpty = await myTrainingService!.findAllMyTrainingsV2WithStampByConditions();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        return;
      }
      case MyLearningContentType.InMyList: {
        const isEmpty = await inMyLectureService!.findAllInMyLectureV2ByConditions();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
        return;
      }
      default: {
        if (viewType) {
          viewType = changeViewTypeByContentType(contentType);
          myTrainingService!.changeFilterRdoWithViewType(viewType);
        }
        const isEmpty = await myTrainingService!.findllMyTrainingsV2WithConditions();
        setResultEmpty(isEmpty);
        checkShowSeeMore(contentType);
      }
    }
  };

  const clearAndInitStore = (contentType: MyLearningContentType | MyPageContentType) => {
    switch (contentType) {
      case MyLearningContentType.InMyList:
        inMyLectureService!.clearAllInMyLectureV2s();
        inMyLectureService!.initFilterRdo();
        break;
      case MyLearningContentType.Required:
        break;
      default:
        myTrainingService!.clearAllMyTrainingV2();
        myTrainingService!.initFilterRdo(contentType);
    }
  };

  const getModels = (contentType: MyLearningContentType | MyPageContentType): (MyTrainingModelV2 | InMyLectureModelV2)[] => {
    const { inMyLectureV2s } = inMyLectureService!;
    const { myTrainingV2s } = myTrainingService!;

    if (contentType === MyLearningContentType.InMyList) {
      return inMyLectureV2s;
    }
    return myTrainingV2s;
  };

  const getTotalCount = (contentType: MyLearningContentType | MyPageContentType): number => {
    const { inMyLectureV2Count } = inMyLectureService!;
    const { myTrainingV2Count } = myTrainingService!;

    if (contentType === MyLearningContentType.InMyList) {
      return inMyLectureV2Count;
    }
    return myTrainingV2Count;
  };

  const isModelExist = () => {
    return (myTrainingV2s && myTrainingV2s.length) || (inMyLectureV2s && inMyLectureV2s.length);
  };


  const changeViewTypeByContentType = (contentType: MyLearningContentType | MyPageContentType): string => {
    if (!(contentType === MyLearningContentType.InProgress || contentType === MyLearningContentType.Completed)) {
      return '';
    }
    return viewType;
  };

  const initPageInfo = () => {
    pageInfo.current = { offset: 0, limit: 20 };
  };

  const checkShowSeeMore = (contentType: MyLearningContentType | MyPageContentType): void => {
    const models: (MyTrainingModelV2 | InMyLectureModelV2)[] = getModels(contentType);
    const totalCount: number = getTotalCount(contentType);

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
  const onChangeFilterCount = (count: number) => {
    if (filterCount && filterCount === count) {
      fetchModelsByConditions(contentType, viewType);
    }

    setFilterCount(count);
  };

  const onClickFilter = () => {
    setActiveFilter(!activeFilter);
  };

  const onChangeViewType = (e: any, data: any) => {
    setViewType(data.value);
  };

  const onClickDelete = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onConfirmModal = () => {
    setOpenModal(false);
    //myTrainingView ids를 통해 delete 로직을 수행함.
    myTrainingService!.deleteBySelectedIds();
  };

  const onClickSort = (column: string, direction: Direction) => {
    switch (contentType) {
      case MyLearningContentType.InMyList:
        inMyLectureService!.sortInMyLectureV2sBy(column, direction);
        break;
      case MyLearningContentType.Required:

        break;
      default:
        myTrainingService!.sortMyTrainingV2sBy(column, direction);
    }
  };


  const onClickSeeMore = async () => {
    pageInfo.current.offset += pageInfo.current.limit;
    pageInfo.current.limit = PAGE_SIZE;
    switch (contentType) {
      case MyPageContentType.EarnedStampList:
        await myTrainingService!.findAllMyTrainingsV2WithStampAndPage(pageInfo.current);
        break;
      case MyLearningContentType.InMyList:
        await inMyLectureService!.findAllInMyLectureV2WithPage(pageInfo.current);
        break;
      default:
        await myTrainingService!.findAllMyTrainingsV2WithPage(pageInfo.current);
    }
    checkShowSeeMore(contentType);
  };

  /* Render Functions */
  const renderNoSuchContentPanel = (contentType: MyLearningContentType | MyPageContentType, withFilter: boolean = false) => {
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
        isModelExist() &&
        (
          <>
            <LineHeaderContainerV2
              contentType={contentType}
              viewType={viewType}
              onChangeViewType={onChangeViewType}
              resultEmpty={resultEmpty}
              filterCount={filterCount}
              activeFilter={activeFilter}
              onClickFilter={onClickFilter}
              onClickDelete={onClickDelete}
            />
            <MultiFilterBox
              contentType={contentType}
              activeFilter={activeFilter}
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
                <MyLearningDeleteModal
                  open={openModal}
                  onClose={onCloseModal}
                  onConfirm={onConfirmModal}
                />
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
  'lecture.lectureService'
))(withRouter(observer(MyLearningListContainerV2)));

/* globals */
const PAGE_SIZE = 20;

/* types */
export type ViewType = 'Course' | ''; // 코스만보기 | 전체보기

