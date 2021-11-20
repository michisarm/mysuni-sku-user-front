/* eslint-disable react-hooks/exhaustive-deps */
import { mobxHelper, Offset } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { MyTrainingRouteParams } from 'myTraining/routeParams';
import { SkProfileService } from 'profile/stores';
import React, { useCallback, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useHistory, useParams } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { Loadingpanel, NoSuchContentPanel } from 'shared';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { SeeMoreButton, StudentService } from '../../../lecture';
import FilterBoxService from '../../../shared/present/logic/FilterBoxService';
import { Direction } from '../../model/Direction';
import { MyTrainingService } from '../../stores';
import { useScrollMove } from '../../useScrollMove';
import { MyContentType } from '../model/MyContentType';
import { MyLearningContentType } from '../model/MyLearningContentType';
import { nosuchMessagesPolyglot } from '../model/NoSuchContentPanelMessages';
import MyLearningDeleteFinishModal from '../view/MyLearningDeleteFinishModal';
import MyLearningDeleteModal from '../view/MyLearningDeleteModal';
import MyLearningNoCheckModal from '../view/MyLearningNoCheckModal';
import MyTrainingListView from '../view/MyTrainingListView';
import MyLearningListHeaderView from '../view/table/MyLearningListHeaderView';
import MyLearningListTemplate from '../view/table/MyLearningListTemplate';
import FilterBoxContainer from './FilterBoxContainer';
import LineHeaderContainerV2 from './LineHeaderContainerV2';

interface EnrolledListContainerProps {
  skProfileService?: SkProfileService;
  myTrainingService?: MyTrainingService;
  studentService?: StudentService;
  filterBoxService?: FilterBoxService;
}

function EnrolledListContainer({
  skProfileService,
  myTrainingService,
  studentService,
  filterBoxService,
}: EnrolledListContainerProps) {
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  const { profileMemberName } = skProfileService!;
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteFinishModal, setDeleteFinishModal] = useState<boolean>(false);
  const [noCheckedModal, setNoCheckedModal] = useState<boolean>(false);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { scrollOnceMove } = useScrollMove();

  const { myTrainingTableViews, myTrainingTableCount2 } = myTrainingService!;
  const { conditions, showResult, filterCount } = filterBoxService!;

  // useRequestFilterCountView();

  useEffect(() => {
    myTrainingService!.clearAllTableViews();
    myTrainingService!.initFilterRdo(contentType);

    if (params.pageNo === '1') {
      requestMyTrainings();
      return;
    }

    const currentPageNo = parseInt(params.pageNo);
    const limit = currentPageNo * PAGE_SIZE;

    requestmyTrainingsWithPage({ offset: 0, limit });

    return () => {};
  }, [contentType]);

  useEffect(() => {
    if (showResult) {
      myTrainingService!.setFilterRdoByConditions(conditions);
      requestMyTrainingsByConditions();
    }
  }, [showResult]);

  const requestMyTrainings = async () => {
    setIsLoading(true);
    if (contentType === MyLearningContentType.Enrolled) {
      const isEmpty = await myTrainingService!.findEnrollTableViews();
      setResultEmpty(isEmpty);

      setIsLoading(false);
    }
  };

  const requestMyTrainingsByConditions = async () => {
    setIsLoading(true);
    const isEmpty = await myTrainingService!.findAllTableViewsByConditions();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
    history.replace('./1');
  };

  const requestmyTrainingsWithPage = async (offset: Offset) => {
    setIsLoading(true);
    await myTrainingService!.findAllTableViewsWithPage(offset);
    checkShowSeeMore();
    setIsLoading(false);
    scrollOnceMove();
  };

  const checkShowSeeMore = (): void => {
    const { myTrainingTableViews, myTrainingTableCount } = myTrainingService!;

    if (myTrainingTableViews.length >= myTrainingTableCount) {
      setShowSeeMore(false);
      return;
    }
    if (myTrainingTableCount <= PAGE_SIZE) {
      setShowSeeMore(false);
      return;
    }

    setShowSeeMore(true);
  };

  const onClickDelete = useCallback(() => {
    const { selectedServiceIds } = myTrainingService!;

    if (selectedServiceIds.length === 0) {
      setNoCheckedModal(true);
      return;
    }

    setDeleteModal(true);
  }, []);

  const onCloseDeleteModal = useCallback(() => {
    setDeleteModal(false);
  }, []);

  const onConfirmModal = useCallback(async () => {
    const { selectedServiceIds } = myTrainingService!;

    const isHidden = await studentService!.hideWithSelectedServiceIds(
      selectedServiceIds
    );
    if (isHidden) {
      myTrainingService!.findAllTabCount();
      myTrainingService!.findAllTableViews();
      myTrainingService!.clearAllSelectedServiceIds();
    }

    setDeleteModal(false);
    setDeleteFinishModal(true);
  }, []);

  const onCloseNoCheckedModal = useCallback(() => {
    setNoCheckedModal(false);
  }, []);

  const onCloseFinishModal = useCallback(() => {
    setDeleteFinishModal(false);
  }, []);

  const onClickSort = useCallback(
    (column: string, direction: Direction) => {
      myTrainingService!.sortTableViews(column, direction);
    },
    [contentType]
  );

  const onClickSeeMore = () => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);

    const currentPageNo = parseInt(params.pageNo);
    const nextPageNo = currentPageNo + 1;

    const limit = PAGE_SIZE;
    const offset = currentPageNo * PAGE_SIZE;

    requestmyTrainingsWithPage({ offset, limit });

    history.replace(`./${nextPageNo}`);
  };

  const noSuchMessage = (
    contentType: MyContentType,
    withFilter: boolean = false
  ) => {
    return (
      (withFilter &&
        getPolyglotText(
          '필터 조건에 해당하는 결과가 없습니다.',
          'mapg-msmp-검색x2'
        )) ||
      nosuchMessagesPolyglot(contentType)
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

  return (
    <>
      {((!resultEmpty || filterCount > 0) && (
        <>
          {contentType === MyLearningContentType.Enrolled && (
            <LineHeaderContainerV2
              contentType={contentType}
              resultEmpty={resultEmpty}
              totalCount={myTrainingTableCount2}
              onClickDelete={onClickDelete}
            />
          )}
          <FilterBoxContainer contentType={contentType} />
        </>
      )) || <div style={{ marginTop: 50 }} />}
      {(myTrainingTableViews && myTrainingTableViews.length > 0 && (
        <>
          {(!resultEmpty && (
            <>
              <MyLearningListTemplate contentType={contentType}>
                <MyLearningListHeaderView
                  contentType={contentType}
                  onClickSort={onClickSort}
                />

                {contentType === MyLearningContentType.Enrolled && (
                  <MyTrainingListView
                    myTrainings={myTrainingTableViews}
                    totalCount={myTrainingTableCount2}
                  />
                )}
              </MyLearningListTemplate>
              {showSeeMore && <SeeMoreButton onClick={onClickSeeMore} />}
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
      <MyLearningDeleteModal
        open={deleteModal}
        onClose={onCloseDeleteModal}
        onConfirm={onConfirmModal}
      />
      <MyLearningDeleteFinishModal
        open={deleteFinishModal}
        onConfirm={onCloseFinishModal}
      />
      <MyLearningNoCheckModal
        open={noCheckedModal}
        onConfirm={onCloseNoCheckedModal}
      />
    </>
  );
}

export default inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'myTraining.myTrainingService',
    'lecture.studentService',
    'shared.filterBoxService'
  )
)(observer(EnrolledListContainer));

const PAGE_SIZE = 20;
