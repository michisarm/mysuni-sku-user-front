import React, { useState, useRef, useEffect, useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import ReactGA from 'react-ga';
import { mobxHelper, Offset } from '@nara.platform/accent';
import { useHistory, useParams } from 'react-router-dom';
import { MyTrainingRouteParams } from '../../model/MyTrainingRouteParams';
import { LectureService, SeeMoreButton } from '../../../lecture';
import { Direction } from '../../model/Direction';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import FilterBoxContainer from './FilterBoxContainer';
import { Segment } from 'semantic-ui-react';
import { Loadingpanel, NoSuchContentPanel } from '../../../shared';
import NoSuchContentPanelMessages from '../model/NoSuchContentPanelMessages';
import { MyLearningContentType } from '../model/MyLearningContentType';
import RequiredCardListView from '../view/RequiredCardListView';
import MyLearningListTemplate from '../view/table/MyLearningListTemplate';
import MyLearningListHeaderView from '../view/table/MyLearningListHeaderView';
import FilterBoxService from '../../../shared/present/logic/FilterBoxService';
import { useRequestFilterCountView } from '../../service/useRequestFilterCountView';


interface RequiredCardListContainerProps {
  lectureService?: LectureService;
  filterBoxService?: FilterBoxService;
}

function RequiredCardListContainer({
  lectureService,
  filterBoxService,
}: RequiredCardListContainerProps) {
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });

  const { lectureTableViews, lectureTableCount } = lectureService!;
  const { conditions, showResult, filterCount } = filterBoxService!;

  useRequestFilterCountView();
  
  useEffect(() => {
    requestRequiredCards();

    return () => {
      lectureService!.clearAllTableViews();
    }
  }, []);

  useEffect(() => {
    if(showResult) {
      lectureService!.setFilterRdoByConditions(conditions);
      requestRequiredCardsByConditions();
    }
  }, [showResult]);

  const requestRequiredCards = async () => {
    lectureService!.initFilterRdo();

    setIsLoading(true);
    const isEmpty = await lectureService!.findAllRqdTableViews();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  };

  const requestRequiredCardsByConditions = async () => {
    setIsLoading(true);
    const isEmpty = await lectureService!.findAllRqdTableViewsByConditions();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  }

  const getNextPageNo = (): number => {
    const currentPageNo = params.pageNo;
    const nextPageNo = parseInt(currentPageNo) + 1;
    return nextPageNo;
  };

  const onClickSort = useCallback((column: string, direction: Direction) => {
    lectureService!.sortTableViews(column, direction);
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
    contentType: MyLearningContentType,
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
          />
          <FilterBoxContainer />
        </>
      )) || <div style={{ marginTop: 50 }} />}
      {
        lectureTableViews &&
        lectureTableViews.length > 0 && (
          <>
            {(!resultEmpty && (
              <>
                <MyLearningListTemplate>
                  <MyLearningListHeaderView
                    contentType={contentType}
                    onClickSort={onClickSort}
                  />
                  <RequiredCardListView 
                    requiredCards={lectureTableViews}
                    totalCount={lectureTableCount}
                  />
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

export default inject(mobxHelper.injectFrom(
  'lecture.lectureService',
  'shared.filterBoxService',
))(observer(RequiredCardListContainer));

const PAGE_SIZE = 20;