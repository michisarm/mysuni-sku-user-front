import React, { useState, useRef, useEffect, useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import ReactGA from 'react-ga';
import { mobxHelper, Offset } from '@nara.platform/accent';
import { useHistory, useParams } from 'react-router-dom';
import { MyTrainingRouteParams } from '../../model/MyTrainingRouteParams';
import { CollegeService } from '../../../college/stores';
import { LectureService, SeeMoreButton } from '../../../lecture';
import { Direction } from '../../model/Direction';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import FilterBoxContainer from './FilterBoxContainer';
import MyLearningTableTemplate from '../view/table/MyLearningTableTemplate';
import MyLearningTableHeader from '../view/table/MyLearningTableHeader';
import MyLearningTableBody from '../view/table/MyLearningTableBody';
import { Segment } from 'semantic-ui-react';
import { Loadingpanel, NoSuchContentPanel } from '../../../shared';
import NoSuchContentPanelMessages from '../model/NoSuchContentPanelMessages';
import InMyLectureService from '../../present/logic/InMyLectureService';


interface RequiredCardListContainerProps {
  lectureService?: LectureService;
  collegeService?: CollegeService;
}

function RequiredCardListContainer({
  lectureService,
  collegeService,
}: RequiredCardListContainerProps) {
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  const [filterCount, setFilterCount] = useState<number>(0);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });

  const { lectureTableViews, lectureTableCount } = lectureService!;
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
    fetchRequiredCards();
    lectureService!.findAllFilterCountViews();

    return () => {
      lectureService!.clearAllTableViews();
      lectureService!.clearAllFilterCountViews();
    }
  }, []);

  const fetchRequiredCards = async () => {
    lectureService!.initFilterRdo();

    setIsLoading(true);
    const isEmpty = await lectureService!.findAllRqdTableViews();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
    return;
  };

  const fetchRequiredCardsByConditions = async () => {
    setIsLoading(true);
    const isEmpty = await lectureService!.findAllRqdTableViewsByConditions();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  }

  const getStampsByConditions = (count: number) => {
    if (count > 0) {
      fetchRequiredCardsByConditions();
    } else {
      fetchRequiredCards();
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

  const onClickSort = useCallback((column: string, direction: Direction) => {
          lectureService!.sortTableViews(column, direction);
      }, []);

  const onChangeFilterCount = useCallback((count: number) => {
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
    await lectureService!.findAllRqdTableViewsWithPage(pageInfo.current);

    setIsLoading(false);
    checkShowSeeMore();
  
  }, [contentType, pageInfo.current, params.pageNo]);

  const checkShowSeeMore = (): void => {
    const { lectureTableViews, lectureTableCount } = lectureService!;

    if (lectureTableViews.length >= lectureTableCount) {
      setShowSeeMore(false);
      return;
    }
    if (lectureTableCount <= PAGE_SIZE) {
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
            totalCount={lectureTableCount}
            filterCount={filterCount}
            openFilter={openFilter}
            onClickFilter={onClickFilter}
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
        lectureTableViews &&
        lectureTableViews.length > 0 && (
          <>
            {(!resultEmpty && (
              <>
                <MyLearningTableTemplate>
                  <MyLearningTableHeader
                    contentType={contentType}
                    onClickSort={onClickSort}
                  />
                  <MyLearningTableBody
                    models={lectureTableViews}
                    totalCount={lectureTableCount}
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
          <Loadingpanel={isLoading} />
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

export default inject(mobxHelper.injectFrom(

))(observer(RequiredCardListContainer));

const PAGE_SIZE = 20;