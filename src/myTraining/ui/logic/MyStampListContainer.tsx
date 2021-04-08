import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Segment } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import { MyPageRouteParams } from '../../model/MyPageRouteParams';
import { Offset, mobxHelper } from '@nara.platform/accent';
import ReactGA from 'react-ga';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import FilterBoxContainer from './FilterBoxContainer';
import MyLearningTableTemplate from '../view/table/MyLearningTableTemplate';
import MyLearningTableHeader from '../view/table/MyLearningTableHeader';
import MyLearningTableBody from '../view/table/MyLearningTableBody';
import { SeeMoreButton } from '../../../lecture';
import { Loadingpanel, NoSuchContentPanel } from '../../../shared';
import { CollegeService } from '../../../college/stores';
import MyTrainingService from '../../present/logic/MyTrainingService';
import { inject, observer } from 'mobx-react';
import NoSuchContentPanelMessages from '../model/NoSuchContentPanelMessages';
import { MyPageContentType } from '../model/MyPageContentType';
import { Direction } from '../../model/Direction';



interface MyStampListContainerProps {
  myTrainingService?: MyTrainingService;
  collegeService?: CollegeService;
}

function MyStampListContainer({
  myTrainingService,
  collegeService,
}: MyStampListContainerProps) {
  const history = useHistory();
  const params = useParams<MyPageRouteParams>();
  const contentType = params.tab;

  const [filterCount, setFilterCount] = useState<number>(0);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
  const [refresh, setRefesh] = useState<boolean>(false);

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });
  const learningOffset: any = sessionStorage.getItem('learningOffset');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { myTrainingTableViews, myTrainingTableCount } = myTrainingService!;
  const { colleges } = collegeService!;


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
    fetchStamps();
    myTrainingService!.findAllFilterCountViews();

    return () => {
      myTrainingService!.clearAllTableViews();
      myTrainingService!.clearAllTableViews();
    }
  }, []);


  useEffect(() => {
    if (refresh) {
      refeshPageInfo();
    }
  }, [refresh]);


  const refeshPageInfo = () => setRefesh(() => !refresh);

  const fetchStamps = async () => {
    myTrainingService!.initFilterRdo(contentType);

    setIsLoading(true);
    const isEmpty = await myTrainingService!.findAllStampTableViews();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  };

  const fetchStampsByConditions = async () => {
    setIsLoading(true);
    const isEmpty = await myTrainingService!.findAllStampTableViewsByConditions();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  }

  const getStampsByConditions = (count: number) => {
    if (count > 0) {
      // initPage();
      fetchStampsByConditions();
    } else {
      fetchStamps();
    }
  };


  const getNextPageNo = (): number => {
    const currentPageNo = params.pageNo;
    if (currentPageNo) {
      const nextPageNo = parseInt(currentPageNo) + 1;
      return nextPageNo;
    }
    return 1;
  };

  const onClickFilter = useCallback(() => {
    setOpenFilter(prev => !prev);
  }, []);

  const onClickDelete = useCallback(() => {
    setOpenModal(true);
  }, []);

  const onClickSort = useCallback((column: string, direction: Direction) => {
          myTrainingService!.sortTableViews(column, direction);
      }, []);

  const onChangeFilterCount = useCallback((count: number) => {
    /* if (filterCount && filterCount === count) {
      initPage();
      fetchModelsByConditions(contentType, viewType);
    }
    */
    setFilterCount(count);
  }, []);
  

  const onClickSeeMore = useCallback(async () => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);

    pageInfo.current.limit = PAGE_SIZE;
    pageInfo.current.offset += pageInfo.current.limit;

    history.replace(`./${getNextPageNo()}`);
    
    sessionStorage.setItem('learningOffset', JSON.stringify(pageInfo.current));
    await myTrainingService!.findAllStampTableViewsWithPage(pageInfo.current);

    setIsLoading(false);
    checkShowSeeMore();
  
  }, [contentType, pageInfo.current, params.pageNo]);

  const checkShowSeeMore = (): void => {
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


  const noSuchMessage = (
    contentType: MyPageContentType,
    withFilter: boolean = false
  ) => {
    return (
      (withFilter && '필터 조건에 해당하는 결과가 없습니다.') ||
      NoSuchContentPanelMessages.getMessageByConentType(contentType)
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
            filterCount={filterCount}
            openFilter={openFilter}
            onClickFilter={onClickFilter}
            onClickDelete={onClickDelete}
          />
          <FilterBoxContainer
            openFilter={openFilter}
            onClickFilter={onClickFilter}
            onChangeFilterCount={onChangeFilterCount}
            getModels={getStampsByConditions}
          />
        </>
      )) || <div style={{ marginTop: 50 }} />}
      {
        myTrainingTableViews &&
        myTrainingTableViews.length > 0 && (
          <>
            {(!resultEmpty && (
              <>
                <MyLearningTableTemplate>
                  <MyLearningTableHeader
                    contentType={contentType}
                    onClickSort={onClickSort}
                  />
                  <MyLearningTableBody
                    models={myTrainingTableViews}
                    totalCount={myTrainingTableCount}
                  />
                </MyLearningTableTemplate>
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
    'myTraining.inMyLectureService',
    'myTraining.aplService',
    'lecture.lectureService',
    'lecture.studentService',
    'college.collegeService'
  )
)(observer(MyStampListContainer));

const PAGE_SIZE = 20;