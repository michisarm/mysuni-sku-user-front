import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper, Offset } from '@nara.platform/accent';
import { NoSuchContentPanel, Loadingpanel } from 'shared';
import { SkProfileService } from 'profile/stores';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import MyLearningDeleteModal from '../view/MyLearningDeleteModal';
import {
  MyTrainingService,
} from '../../stores';
import {
  SeeMoreButton,
  StudentService,
} from '../../../lecture';
import ReactGA from 'react-ga';
import { Segment } from 'semantic-ui-react';
import FilterBoxContainer from './FilterBoxContainer';
import { Direction } from '../../model/Direction';
import { MyLearningContentType } from '../model/MyLearningContentType';
import NoSuchContentPanelMessages from '../model/NoSuchContentPanelMessages';
import { MyContentType } from '../model/MyContentType';
import { MyTrainingRouteParams } from '../../model/MyTrainingRouteParams';
import MyTrainingListView from '../view/MyTrainingListView';
import FilterBoxService from '../../../shared/present/logic/FilterBoxService';
import MyLearningListHeaderView from '../view/table/MyLearningListHeaderView';
import MyLearningListTemplate from '../view/table/MyLearningListTemplate';
import { useRequestFilterCountView } from '../../service/useRequestFilterCountView';

interface MyTrainingListContainerProps {
  skProfileService?: SkProfileService;
  myTrainingService?: MyTrainingService;
  studentService?: StudentService;
  filterBoxService?: FilterBoxService;
}

function MyTrainingListContainer({
  skProfileService,
  myTrainingService,
  studentService,
  filterBoxService,
}: MyTrainingListContainerProps) {
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  const { profileMemberName } = skProfileService!;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
  const [refresh, setRefesh] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });
  const learningOffset: any = sessionStorage.getItem('learningOffset');

  const { myTrainingTableViews, myTrainingTableCount } = myTrainingService!;
  const { conditions, showResult, filterCount } = filterBoxService!;

  useRequestFilterCountView();

  useEffect(() => {
    refeshPageInfo();
    requestMyTrainings(contentType);

    return () => {
      myTrainingService!.clearAllTableViews();
    }
  }, [contentType]);


  useEffect(() => {
    if (refresh) {
      refeshPageInfo();
      getPageInfo();
    }
  }, [refresh]);

  useEffect(() => {
    if(showResult) {
      myTrainingService!.setFilterRdoByConditions(conditions);
      requestMyTrainingsByConditions();
    }
  }, [showResult]);

  const refeshPageInfo = () => setRefesh(() => !refresh);
  
  const requestMyTrainings = async (contentType: MyContentType) => {
    myTrainingService!.initFilterRdo(contentType);
    setIsLoading(true);
    const isEmpty = await myTrainingService!.findAllTableViews();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  };

  const requestMyTrainingsByConditions = async () => {
    setIsLoading(true);
    const isEmpty = await myTrainingService!.findAllTableViewsByConditions();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  };

  const getPageInfo = async () => {
    if (learningOffset !== null && refresh) {
      setIsLoading(true);
      if (learningOffset !== null && refresh) {
        pageInfo.current = JSON.parse(learningOffset);
        await myTrainingService!.findAllTableViewsWithPage(pageInfo.current);
      }
    }
  };

  const getPageNo = (): number => {
    const currentPageNo = params.pageNo;
    const nextPageNo = parseInt(currentPageNo) + 1;
    
    return nextPageNo;
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

  const updateInProgressStorage = async () => {
    const inProgressTableViews = await myTrainingService!.findAllInProgressStorage();
    sessionStorage.setItem('inProgressTableViews', JSON.stringify(inProgressTableViews));
  };

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
      myTrainingService!.sortTableViews(column, direction);
    }, [contentType]
  );

  const onClickSeeMore = useCallback(async () => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);
    pageInfo.current.limit = PAGE_SIZE;
    pageInfo.current.offset += pageInfo.current.limit;
    history.replace(`./${getPageNo()}`);
    sessionStorage.setItem('learningOffset', JSON.stringify(pageInfo.current));
    await myTrainingService!.findAllTableViewsWithPage(pageInfo.current);
    
    setIsLoading(false);
    checkShowSeeMore();
    
  }, [contentType, pageInfo.current, params.pageNo]);

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

  return (
    <>
      {((!resultEmpty || filterCount > 0) && (
        <>
          <LineHeaderContainerV2
            contentType={contentType}
            resultEmpty={resultEmpty}
            totalCount={myTrainingTableCount}
            onClickDelete={onClickDelete}
          />
          <FilterBoxContainer />
        </>
      )) || <div style={{ marginTop: 50 }} />}
      {
        myTrainingTableViews &&
        myTrainingTableViews.length > 0 && (
        <>
          {(!resultEmpty && (
            <>
              <MyLearningListTemplate>
                <MyLearningListHeaderView
                  contentType={contentType}
                  onClickSort={onClickSort}
                />
                <MyTrainingListView
                  myTrainings={myTrainingTableViews}
                  totalCount={myTrainingTableCount}
                />
              </MyLearningListTemplate>
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
      ) || (
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
    'lecture.studentService',
    'shared.filterBoxService',
  )
)(observer(MyTrainingListContainer));

const PAGE_SIZE = 20;