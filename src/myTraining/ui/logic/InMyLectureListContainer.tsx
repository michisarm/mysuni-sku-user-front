import React, { useState, useRef, useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
import { mobxHelper, Offset } from '@nara.platform/accent';
import { Segment } from 'semantic-ui-react';
import ReactGA from 'react-ga';
import InMyLectureService from '../../present/logic/InMyLectureService';
import { CollegeService } from '../../../college/stores';
import { MyTrainingRouteParams } from '../../model/MyTrainingRouteParams';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import FilterBoxContainer from './FilterBoxContainer';
import MyLearningTableTemplate from '../view/table/MyLearningTableTemplate';
import MyLearningTableHeader from '../view/table/MyLearningTableHeader';
import MyLearningTableBody from '../view/table/MyLearningTableBody';
import { SeeMoreButton } from '../../../lecture';

import { Loadingpanel, NoSuchContentPanel } from '../../../shared';
import { Direction } from '../../model/Direction';
import NoSuchContentPanelMessages from '../model/NoSuchContentPanelMessages';
import { MyContentType } from '../model/MyContentType';


interface InMyLectureListContainerProps {
  inMyLectureService?: InMyLectureService;
  collegeService?: CollegeService;
}

function InMyLectureListContainer({
  inMyLectureService,
  collegeService,
}: InMyLectureListContainerProps) {
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  const [filterCount, setFilterCount] = useState<number>(0);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });

  const { inMyLectureTableViews, inMyLectureTableCount } = inMyLectureService!;
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
    fetchInMyLectures();
    inMyLectureService!.findAllFilterCountViews();

    return () => {
      inMyLectureService!.clearAllTableViews();
      inMyLectureService!.clearAllFilterCountViews();
    }
  }, []);

  const fetchInMyLectures = async() => {
    inMyLectureService!.initFilterRdo();

    setIsLoading(true);
    const isEmpty = await inMyLectureService!.findAllTableViews();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  };

  const fetchInMyLecturesByConditions = async() => {
    setIsLoading(true);
    const isEmpty = await inMyLectureService!.findAllTableViewsByConditions();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  }

  const getInMyLecturesByConditions = (count: number) => {
    if (count > 0) {
      fetchInMyLecturesByConditions();
    } else {
      fetchInMyLectures();
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

  const checkShowSeeMore = (): void => {
    const { inMyLectureTableViews, inMyLectureTableCount } = inMyLectureService!;

    if (inMyLectureTableViews.length >= inMyLectureTableCount) {
      setShowSeeMore(false);
      return;
    }
    if (inMyLectureTableCount <= PAGE_SIZE) {
      setShowSeeMore(false);
      return;
    }

    setShowSeeMore(true);
  };

  const onClickSeeMore = useCallback(async () => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);

    pageInfo.current.limit = PAGE_SIZE;
    pageInfo.current.offset += pageInfo.current.limit;

    history.replace(`./${getNextPageNo()}`);
    
    sessionStorage.setItem('learningOffset', JSON.stringify(pageInfo.current));
    await inMyLectureService!.findAllTableViewsWithPage(pageInfo.current);

    setIsLoading(false);
    checkShowSeeMore();
  
  }, [contentType, pageInfo.current, params.pageNo]);


  const onClickFilter = useCallback(() => {
    setOpenFilter(prev => !prev);
  }, []);


  const onClickSort = useCallback((column: string, direction: Direction) => { 
      inMyLectureService!.sortTableViews(column, direction);
    }, []);

  const onChangeFilterCount = useCallback((count: number) => {
    setFilterCount(count);
  }, []);

  const noSuchMessage = (
    contentType: MyContentType,
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
            totalCount={inMyLectureTableCount}
            filterCount={filterCount}
            openFilter={openFilter}
            onClickFilter={onClickFilter}
          />
          <FilterBoxContainer
            openFilter={openFilter}
            onClickFilter={onClickFilter}
            onChangeFilterCount={onChangeFilterCount}
            getModels={getInMyLecturesByConditions}
          />
        </>
      )) || <div style={{ marginTop: 50 }} />}
      {
        inMyLectureTableViews &&
        inMyLectureTableViews.length > 0 && (
          <>
            {(!resultEmpty && (
              <>
                <MyLearningTableTemplate>
                  <MyLearningTableHeader
                    contentType={contentType}
                    onClickSort={onClickSort}
                  />
                  <MyLearningTableBody
                    models={inMyLectureTableViews}
                    totalCount={inMyLectureTableCount}
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
    'myTraining.inMyLectureService',
    'college.collegeService',
  )
)(observer(InMyLectureListContainer));

const PAGE_SIZE = 20;