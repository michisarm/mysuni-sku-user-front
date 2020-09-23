import React, { useState, useEffect, useRef } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { mobxHelper, Offset } from '@nara.platform/accent';
import { NoSuchContentPanel } from 'shared';
import { SkProfileService } from 'profile/stores';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import { MyLearningContentType, NoSuchContentPanelMessages } from '../model';
import MultiFilterBox from '../view/filterbox/MultiFilterBox';
import MyLearningTableTemplate from '../view/table/MyLearningTableTemplate';
import { LectureService, SeeMoreButton } from '../../../lecture';
import { MyTrainingService } from '../../stores';
import MyLearningDeleteModal from '../view/MyLearningDeleteModal';
import { Direction } from '../view/table/MyLearningTableHeader';

interface Props extends RouteComponentProps {
  contentType: MyLearningContentType;
  skProfileService?: SkProfileService;
  myTrainingService?: MyTrainingService;
  lectureService?: LectureService;
}

function MyLearningListContainerV2(props: Props) {
  const { contentType, skProfileService, myTrainingService } = props;
  const { profileMemberName } = skProfileService!;
  const { myTrainingV2s, myTrainingV2Count } = myTrainingService!;

  /* states */
  const [filterCount, setFilterCount] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  const [viewType, setViewType] = useState<string>('Course');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(true);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });

  /* effects */
  useEffect(() => {
    // 
    clearPageInfo();
    if (filterCount === 0) {
      fetchModelsByContentType(contentType);
    } else {
      fetchModelsByConditions(viewType);
    }

  }, [contentType, viewType, filterCount]);

  /* functions */
  const fetchModelsByContentType = async (contentType: MyLearningContentType) => {
    //
    myTrainingService!.clearAllMyTrainingV2(contentType);
    //
    switch (contentType) {
      case MyLearningContentType.InProgress:
      case MyLearningContentType.Completed: {
        myTrainingService!.changeFilterRdoWithViewType(viewType);
        const isEmpty = await myTrainingService!.findAllMyTrainingV2();
        setResultEmpty(isEmpty);
        checkShowSeeMore();
        return;
      }
      case MyLearningContentType.InMyList:
      case MyLearningContentType.Required:
        return;
      default: {
        const isEmpty = await myTrainingService!.findAllMyTrainingV2();
        setResultEmpty(isEmpty);
        checkShowSeeMore();
      }

    }
  };

  const fetchModelsByConditions = async (viewType?: string) => {
    if (viewType) {
      myTrainingService!.changeFilterRdoWithViewType(viewType);
    }
    const isEmpty = await myTrainingService!.findllMyTrainingsV2WithConditions();
    setResultEmpty(isEmpty);

    checkShowSeeMore();
  };

  const clearPageInfo = () => {
    pageInfo.current = { offset: 0, limit: 20 };
  };

  const checkShowSeeMore = () => {
    const { myTrainingV2s, myTrainingV2Count } = myTrainingService!;

    if (myTrainingV2s.length >= myTrainingV2Count) {
      setShowSeeMore(false);
      return;
    }

    if (myTrainingV2Count <= PAGE_SIZE) {
      setShowSeeMore(false);
      return;
    }

    setShowSeeMore(true);
  };


  /* handlers */
  const onFilterCount = (count: number) => {
    if (filterCount && filterCount === count) {
      fetchModelsByConditions(viewType);
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
    myTrainingService!.sortBy(column, direction);
  };

  const onSeeMore = async () => {
    pageInfo.current.offset += pageInfo.current.limit;
    pageInfo.current.limit = PAGE_SIZE;

    await myTrainingService!.findAllMyTrainingsV2WithPage(pageInfo.current);
    checkShowSeeMore();
  };

  /* Render Functions */
  const renderNoSuchContentPanel = (contentType: MyLearningContentType, withFilter: boolean = false) => {
    const message = withFilter
      && '필터 조건에 해당하는 결과가 없습니다.' || NoSuchContentPanelMessages.getByContentType(contentType);
    const link = (contentType === MyLearningContentType.InProgress)
      && { text: `${profileMemberName} 님에게 추천하는 학습 과정 보기`, path: '/lecture/recommend' } || undefined;

    return <NoSuchContentPanel message={message} link={link} />;
  };

  /* render */
  return (
    <>
      {
        myTrainingV2s &&
        myTrainingV2s.length &&
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
              activeFilter={activeFilter}
              onFilterCount={onFilterCount}
            />
            {!resultEmpty && (
              <>

                <MyLearningTableTemplate
                  contentType={contentType}
                  models={myTrainingV2s}
                  totalCount={myTrainingV2Count}
                  onClickSort={onClickSort}
                />
                {showSeeMore &&
                  (
                    <SeeMoreButton
                      onClick={onSeeMore}
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
  'lecture.lectureService'
))(withRouter(observer(MyLearningListContainerV2)));

/* globals */
const PAGE_SIZE = 20;