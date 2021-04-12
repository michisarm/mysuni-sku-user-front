import React, { useState, useRef, useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
import { mobxHelper, Offset } from '@nara.platform/accent';
import { Segment } from 'semantic-ui-react';
import ReactGA from 'react-ga';
import InMyLectureService from '../../present/logic/InMyLectureService';
import { MyTrainingRouteParams } from '../../model/MyTrainingRouteParams';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import FilterBoxContainer from './FilterBoxContainer';
import { SeeMoreButton } from '../../../lecture';
import { Loadingpanel, NoSuchContentPanel } from '../../../shared';
import { Direction } from '../../model/Direction';
import NoSuchContentPanelMessages from '../model/NoSuchContentPanelMessages';
import { MyContentType } from '../model/MyContentType';
import InMyLectureListView from '../view/InMyLectureListVIew';
import MyLearningListHeaderView from '../view/table/MyLearningListHeaderView';
import MyLearningListTemplate from '../view/table/MyLearningListTemplate';
import FilterBoxService from '../../../shared/present/logic/FilterBoxService';
import { useRequestFilterCountView } from '../../service/useRequestFilterCountView';


interface InMyLectureListContainerProps {
  inMyLectureService?: InMyLectureService;
  filterBoxService?: FilterBoxService;
}

function InMyLectureListContainer({
  inMyLectureService,
  filterBoxService,
}: InMyLectureListContainerProps) {
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });

  const { inMyLectureTableViews, inMyLectureTableCount } = inMyLectureService!;
  const { conditions, filterCount, showResult } = filterBoxService!;

  useRequestFilterCountView();

  useEffect(() => {
    requestInMyLectures();

    return () => {
      inMyLectureService!.clearAllTableViews();
    }
  }, []);

  useEffect(() => {
    if(showResult) {
      inMyLectureService!.setFilterRdoByConditions(conditions);
      requestInMyLecturesByConditions();
    }
  }, [showResult]);

  const requestInMyLectures = async() => {
    setIsLoading(true);
    inMyLectureService!.initFilterRdo();
    const isEmpty = await inMyLectureService!.findAllTableViews();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  };

  const requestInMyLecturesByConditions = async() => {
    setIsLoading(true);
    const isEmpty = await inMyLectureService!.findAllTableViewsByConditions();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  }

  const getNextPageNo = (): number => {
    const currentPageNo = params.pageNo;
    const nextPageNo = parseInt(currentPageNo) + 1;
    return nextPageNo;
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


  const onClickSort = useCallback((column: string, direction: Direction) => { 
      inMyLectureService!.sortTableViews(column, direction);
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
          />
          <FilterBoxContainer />
        </>
      )) || <div style={{ marginTop: 50 }} />}
      {
        inMyLectureTableViews &&
        inMyLectureTableViews.length > 0 && (
          <>
            {(!resultEmpty && (
              <>
                <MyLearningListTemplate>
                  <MyLearningListHeaderView
                    contentType={contentType}
                    onClickSort={onClickSort}
                  />
                  <InMyLectureListView
                    inMyLectures={inMyLectureTableViews}
                    totalCount={inMyLectureTableCount}
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

export default inject(
  mobxHelper.injectFrom(
    'myTraining.inMyLectureService',
    'shared.filterBoxService',
  )
)(observer(InMyLectureListContainer));

const PAGE_SIZE = 20;