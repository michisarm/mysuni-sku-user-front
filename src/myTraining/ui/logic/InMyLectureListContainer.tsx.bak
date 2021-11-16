import React, { useState, useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
import { mobxHelper, Offset } from '@nara.platform/accent';
import { Segment } from 'semantic-ui-react';
import ReactGA from 'react-ga';
import InMyLectureService from '../../present/logic/InMyLectureService';
import { MyTrainingRouteParams } from 'myTraining/routeParams';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import FilterBoxContainer from './FilterBoxContainer';
import { SeeMoreButton } from '../../../lecture';
import { Loadingpanel, NoSuchContentPanel } from '../../../shared';
import { Direction } from '../../model/Direction';
import { nosuchMessagesPolyglot } from '../model/NoSuchContentPanelMessages';
import { MyContentType } from '../model/MyContentType';
import InMyLectureListView from '../view/InMyLectureListVIew';
import MyLearningListHeaderView from '../view/table/MyLearningListHeaderView';
import MyLearningListTemplate from '../view/table/MyLearningListTemplate';
import FilterBoxService from '../../../shared/present/logic/FilterBoxService';
import { useScrollMove } from '../../useScrollMove';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

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

  const { scrollOnceMove } = useScrollMove();

  const { inMyLectureTableViews, inMyLectureTableCount } = inMyLectureService!;
  const { conditions, filterCount, showResult } = filterBoxService!;

  // useRequestFilterCountView();

  useEffect(() => {
    inMyLectureService!.clearAllTableViews();
    inMyLectureService!.initFilterRdo();

    if (params.pageNo === '1') {
      requestInMyLectures();
      return;
    }

    const currentPageNo = parseInt(params.pageNo);
    const limit = currentPageNo * PAGE_SIZE;

    requestInMyLecturesWithPage({ offset: 0, limit });
  }, []);

  useEffect(() => {
    if (showResult) {
      inMyLectureService!.setFilterRdoByConditions(conditions);
      requestInMyLecturesByConditions();
    }
  }, [showResult]);

  const requestInMyLectures = async () => {
    setIsLoading(true);
    const isEmpty = await inMyLectureService!.findAllTableViews();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  };

  const requestInMyLecturesByConditions = async () => {
    setIsLoading(true);
    const isEmpty = await inMyLectureService!.findAllTableViewsByConditions();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
    history.replace('./1');
  };

  const requestInMyLecturesWithPage = async (offset: Offset) => {
    setIsLoading(true);
    await inMyLectureService!.findAllTableViewsWithPage(offset);
    checkShowSeeMore();
    setIsLoading(false);
    scrollOnceMove();
  };

  const checkShowSeeMore = (): void => {
    const { inMyLectureTableViews, inMyLectureTableCount } =
      inMyLectureService!;

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

  const onClickSeeMore = async () => {
    const currentPageNo = parseInt(params.pageNo);
    const nextPageNo = currentPageNo + 1;

    const limit = PAGE_SIZE;
    const offset = currentPageNo * PAGE_SIZE;

    requestInMyLecturesWithPage({ offset, limit });

    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);

    history.replace(`./${nextPageNo}`);
  };

  const onClickSort = useCallback((column: string, direction: Direction) => {
    inMyLectureService!.sortTableViews(column, direction);
  }, []);

  const noSuchMessage = (
    contentType: MyContentType,
    withFilter: boolean = false
  ) => {
    return (
      (withFilter &&
        getPolyglotText(
          '필터 조건에 해당하는 결과가 없습니다.',
          'mapg-msmp-검색x3'
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
            totalCount={inMyLectureTableCount}
          />
          <FilterBoxContainer contentType={contentType} />
        </>
      )) || <div style={{ marginTop: 50 }} />}
      {(inMyLectureTableViews && inMyLectureTableViews.length > 0 && (
        <>
          {(!resultEmpty && (
            <>
              <MyLearningListTemplate contentType={contentType}>
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
  mobxHelper.injectFrom(
    'myTraining.inMyLectureService',
    'shared.filterBoxService'
  )
)(observer(InMyLectureListContainer));

const PAGE_SIZE = 20;
