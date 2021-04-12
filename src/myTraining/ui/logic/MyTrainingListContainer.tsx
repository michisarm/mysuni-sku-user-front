import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
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
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { myTrainingTableViews, myTrainingTableCount } = myTrainingService!;
  const { conditions, showResult, filterCount } = filterBoxService!;

  useRequestFilterCountView();

  useEffect(() => {
    requestMyTrainings(contentType);

    return () => {
      myTrainingService!.clearAllTableViews();
    }
  }, [contentType]);

  useEffect(() => {
    if(showResult) {
      myTrainingService!.setFilterRdoByConditions(conditions);
      requestMyTrainingsByConditions();
    }
  }, [showResult]);

  useEffect(() => {
    if(params.pageNo === '1') {
      return;
    }    

    requestmyTrainingsWithPage();
  }, [params.pageNo]);
  
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
    history.replace('./1');
  };

  const requestmyTrainingsWithPage = async () => {
    const currentPageNo = parseInt(params.pageNo);

    const limit = PAGE_SIZE;
    const offset = (currentPageNo - 1) * PAGE_SIZE;

    setIsLoading(true);
    await myTrainingService!.findAllTableViewsWithPage({ limit, offset });
    checkShowSeeMore(); 
    setIsLoading(false);
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
      await updateInProgressStorage();
      myTrainingService!.findAllTabCount();
      myTrainingService!.findAllTableViews();
      myTrainingService!.clearAllSelectedServiceIds();
    }

    setDeleteModal(false);
  }, []);

  const onClickSort = useCallback(
    (column: string, direction: Direction) => {
      myTrainingService!.sortTableViews(column, direction);
    }, [contentType]
  );

  const onClickSeeMore = () => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);
    
    const currentPageNo = parseInt(params.pageNo);
    const nextPageNo = currentPageNo + 1;

    history.replace(`./${nextPageNo}`);
  }

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
              {deleteModal && (
                <MyLearningDeleteModal
                  open={deleteModal}
                  onClose={onCloseDeleteModal}
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