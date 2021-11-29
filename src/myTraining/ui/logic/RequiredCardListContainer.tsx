import React, { useState, useEffect, useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import ReactGA from 'react-ga';
import { mobxHelper, Offset } from '@nara.platform/accent';
import { useHistory, useParams } from 'react-router-dom';
import { LectureService, SeeMoreButton } from '../../../lecture';
import { Direction } from '../../model/Direction';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import FilterBoxContainer from './FilterBoxContainer';
import { Segment } from 'semantic-ui-react';
import { Loadingpanel, NoSuchContentPanel } from '../../../shared';
import { nosuchMessagesPolyglot } from '../model/NoSuchContentPanelMessages';
import { MyLearningContentType } from '../model/MyLearningContentType';
import RequiredCardListView from '../view/RequiredCardListView';
import MyLearningListTemplate from '../view/table/MyLearningListTemplate';
import MyLearningListHeaderView from '../view/table/MyLearningListHeaderView';
import FilterBoxService from '../../../shared/present/logic/FilterBoxService';
import { useScrollMove } from '../../useScrollMove';
import { MyTrainingRouteParams } from 'myTraining/routeParams';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

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

  const { scrollOnceMove } = useScrollMove();

  const { lectureTableViews, lectureTableCount } = lectureService!;
  const { conditions, showResult, filterCount } = filterBoxService!;

  // useRequestFilterCountView();

  useEffect(() => {
    lectureService!.clearAllTableViews();
    lectureService!.initFilterRdo();

    if (params.pageNo === '1') {
      requestRequiredCards();
      return;
    }

    const currentPageNo = parseInt(params.pageNo);
    const limit = currentPageNo * PAGE_SIZE;

    requestRequiredCardsWithPage({ offset: 0, limit });
  }, []);

  useEffect(() => {
    if (showResult) {
      lectureService!.setFilterRdoByConditions(conditions);
      requestRequiredCardsByConditions();
    }
  }, [showResult]);

  const requestRequiredCards = async () => {
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
    history.replace('./1');
  };

  const requestRequiredCardsWithPage = async (offset: Offset) => {
    setIsLoading(true);
    await lectureService!.findAllRqdTableViewsWithPage(offset);
    checkShowSeeMore();
    setIsLoading(false);
    scrollOnceMove();
  };

  const onClickSort = useCallback((column: string, direction: Direction) => {
    lectureService!.sortTableViews(column, direction);
  }, []);

  const onClickSeeMore = () => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);

    const currentPageNo = parseInt(params.pageNo);
    const nextPageNo = currentPageNo + 1;

    const limit = PAGE_SIZE;
    const offset = currentPageNo * PAGE_SIZE;

    requestRequiredCardsWithPage({ offset, limit });

    history.replace(`./${nextPageNo}`);
  };

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
      (withFilter &&
        getPolyglotText(
          '필터 조건에 해당하는 결과가 없습니다.',
          'mapg-msmp-검색x5'
        )) ||
      nosuchMessagesPolyglot(contentType)
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
          <FilterBoxContainer contentType={contentType} />
        </>
      )) || <div style={{ marginTop: 50 }} />}
      {(lectureTableViews && lectureTableViews.length > 0 && (
        <>
          {(!resultEmpty && (
            <>
              <MyLearningListTemplate contentType={contentType}>
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
            <NoSuchContentPanel message={noSuchMessage(contentType)} />
          )}
        </Segment>
      )}
    </>
  );
}

export default inject(
  mobxHelper.injectFrom('lecture.lectureService', 'shared.filterBoxService')
)(observer(RequiredCardListContainer));

const PAGE_SIZE = 20;
