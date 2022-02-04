/* eslint-disable react-hooks/exhaustive-deps */
import { mobxHelper, reactAlert } from '@nara.platform/accent';
import { LectureService } from 'lecture';
import LectureParams, { toPath } from 'lecture/detail/viewModel/LectureParams';
import CardOrderBy from 'lecture/model/learning/CardOrderBy';
import CardQdo from 'lecture/model/learning/CardQdo';
import { inject, observer } from 'mobx-react';
import { Direction, toggleDirection } from 'myTraining/model/Direction';
import { Order } from 'myTraining/model/Order';
import { MyTrainingRouteParams } from 'myTraining/routeParams';
import TableHeaderColumn from 'myTraining/ui/model/TableHeaderColumn';
import NoSuchContentsView from 'myTraining/ui/view/NoSuchContentsView';
import { TabHeader } from 'myTraining/ui/view/tabHeader';
import { InMyListPageTableView } from 'myTraining/ui/view/table/InMyListPageTableView';
import { useScrollMove } from 'myTraining/useScrollMove';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import ReactGA from 'react-ga';
import { useHistory, useParams } from 'react-router';
import FilterBoxService from 'shared/present/logic/FilterBoxService';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { convertToKeyInMyLearningTable } from '../../../../lecture/shared/present/logic/LectureService';
import StudentLearningType from '../../../../lecture/model/learning/StudentLearningType';
import { Button } from 'semantic-ui-react';
import { onOpenPlaylistAddPopUpView } from 'playlist/playlistAddPopUp/playlistAddPopUpView.events';
import { PlaylistAddPopUpView } from 'playlist/playlistAddPopUp/PlaylistAddPopUpView';
import { getAddLearningCardIds } from 'playlist/playlistAddPopUp/playlistAddPopUpView.store';

interface InMyListPageContainerProps {
  lectureService?: LectureService;
  filterBoxService?: FilterBoxService;
}

function InMyListPageContainer({
  lectureService,
  filterBoxService,
}: InMyListPageContainerProps) {
  //

  // ------------------------------------------------- init -------------------------------------------------
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const headerColumns = TableHeaderColumn.getColumnsByContentType(contentType);
  const initialOrders = headerColumns
    .filter((headerColumn) => headerColumn.icon === true)
    .map((headerColumn) => ({
      column: headerColumn.text,
      direction: Direction.DESC,
    }));
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const { scrollOnceMove, scrollSave } = useScrollMove();

  const history = useHistory();

  const {
    bookmarkCount,
    myLearningCards,
    totalMyLearningCardCount,
    cardQdo,
    setCardQdo,
    findMyLearningCardByQdo,
    clearMyLearningCard,
  } = lectureService!;

  const { conditions, filterCount, showResult, setOpenFilter, openFilter } =
    filterBoxService!;

  // useRequestFilterCountView();

  const clearQdo = () => {
    const newCardQdo = new CardQdo();
    newCardQdo.limit = parseInt(params.pageNo) * PAGE_SIZE;
    newCardQdo.offset = 0;
    newCardQdo.searchable = true;
    newCardQdo.bookmark = true;
    newCardQdo.orderBy = CardOrderBy.BookmarkRegisteredTimeDesc;

    return newCardQdo;
  };

  useEffect(() => {
    clearMyLearningCard();

    const newQdo = clearQdo();

    requestmyTrainingsWithPage(newQdo, true).finally(() => {
      if (parseInt(params.pageNo) > 1) {
        newQdo.limit = PAGE_SIZE;
        setCardQdo(newQdo);
      }
    });

    return () => {};
  }, [contentType]);

  const requestmyTrainingsWithPage = async (
    qdo: CardQdo,
    firstCheck?: boolean
  ) => {
    await setIsLoading(true);
    await setCardQdo(qdo);
    await findMyLearningCardByQdo(firstCheck);
    await checkShowSeeMore();
    await setIsLoading(false);
    await scrollOnceMove();
  };

  // ------------------------------------------------- header - filter -------------------------------------------------

  const onClickOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  const filterOptions = {
    openFilter,
    onClickOpen: onClickOpenFilter,
    filterCount,
  };

  const requestMyTrainingsByConditions = async () => {
    setIsLoading(true);

    const newQdo = cardQdo;
    newQdo.setBycondition(conditions);
    await setCardQdo(newQdo);

    await findMyLearningCardByQdo(true);
    await checkShowSeeMore();
    setIsLoading(false);
    history.replace('./1');
  };

  useEffect(() => {
    if (showResult) {
      requestMyTrainingsByConditions();
    }
  }, [showResult]);

  // ------------------------------------------------- table -------------------------------------------------

  const checkShowSeeMore = (): void => {
    const { myLearningCards, totalMyLearningCardCount } = lectureService!;

    if (myLearningCards.length >= totalMyLearningCardCount) {
      setShowSeeMore(false);
      return;
    }
    if (totalMyLearningCardCount <= PAGE_SIZE) {
      setShowSeeMore(false);
      return;
    }

    setShowSeeMore(true);
  };

  const onClickSeeMore = async () => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);

    const currentPageNo = parseInt(params.pageNo, 10);
    const nextPageNo = currentPageNo + 1;

    cardQdo.limit = PAGE_SIZE;
    cardQdo.offset = currentPageNo * PAGE_SIZE;

    requestmyTrainingsWithPage(cardQdo);

    history.replace(`./${nextPageNo}`);
  };

  const intersectionCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((c) => {
        if (c.isIntersecting) {
          onClickSeeMore();
        }
      });
    },
    [onClickSeeMore]
  );

  const observer = useMemo<IntersectionObserver | null>(() => {
    const options = {
      threshold: 0.01,
    };
    if (window.IntersectionObserver !== undefined) {
      const next = new IntersectionObserver(intersectionCallback, options);
      return next;
    }

    return null;
  }, [intersectionCallback]);

  const seeMoreButtonViewRef = useCallback(
    (ref: HTMLDivElement | null) => {
      if (ref !== null) {
        observer?.observe(ref);
      } else {
        observer?.disconnect();
      }
    },
    [observer]
  );

  // table - sorting

  const getDireciton = (column: string) => {
    return orders.filter((order) => order.column === column)[0].direction;
  };

  const getOrderIcon = (column: string, fromStyle: boolean = false) => {
    if (fromStyle) {
      return getDireciton(column) === Direction.DESC
        ? 'list-down16'
        : 'list-up16';
    }

    return getDireciton(column) === Direction.DESC
      ? '내림차순 정렬'
      : '오름차순 정렬';
  };

  const onClickSort = useCallback(
    (column: string, direction: Direction) => {
      // lectureService!.sortMyLearningTableViews(column, direction);
      const cardQdo = CardQdo.getOrderByCardQdo({
        columnType: convertToKeyInMyLearningTable(column),
        direction,
        studentLearning: StudentLearningType.None,
        bookmark: true,
      });

      setCardQdo(cardQdo);

      findMyLearningCardByQdo(true);
      history.replace('./1');
    },
    [contentType]
  );

  const handleClickSort = useCallback(
    (column: string) => {
      const clickedOrder = orders.filter((order) => order.column === column)[0];
      const nonClickedOrder = orders.filter((order) => order.column !== column);

      setOrders([
        ...nonClickedOrder,
        { column, direction: toggleDirection(clickedOrder.direction) },
      ]);

      onClickSort!(clickedOrder.column, clickedOrder.direction);
    },
    [orders, onClickSort]
  );

  // ------------------------------------------------- contents -------------------------------------------------
  const onViewDetail = (e: any, cardId: string) => {
    e.preventDefault();

    scrollSave();

    const params: LectureParams = {
      cardId,
      viewType: 'view',
      pathname: '',
    };

    history.push(toPath(params));
  };

  const onCkickOpenPlaylistAddPopUp = useCallback(() => {
    const checkedCardIds = getAddLearningCardIds();

    if (checkedCardIds.length !== 0) {
      onOpenPlaylistAddPopUpView();
    } else {
      reactAlert({
        title: getPolyglotText('Playlist 추가하기', 'playlist-popup-추가하기'),
        message: getPolyglotText(
          'Playlist에 추가할 과정을 선택해주세요.',
          'playlist-popup-추가과정선택'
        ),
      });
    }
  }, []);

  return (
    <>
      {
        <TabHeader
          resultEmpty={!(bookmarkCount > 0)}
          totalCount={totalMyLearningCardCount}
          filterOpotions={filterOptions}
          contentType={contentType}
        >
          <PlaylistAddPopUpView />
          <div className="left-wrap">
            <Button className="post add" onClick={onCkickOpenPlaylistAddPopUp}>
              +{' '}
              <PolyglotText
                defaultString="Playlist 추가"
                id="playlist-popup-추가버튼"
              />
            </Button>
            <div
              className="list-number"
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  '총 <strong>{totalCount}개</strong>의 리스트가 있습니다.',
                  'learning-학보드-게시물총수',
                  {
                    totalCount: (totalMyLearningCardCount || 0).toString(),
                  }
                ),
              }}
            />
          </div>
        </TabHeader>
      }
      {(bookmarkCount > 0 && (
        <>
          {(totalMyLearningCardCount > 0 && (
            <InMyListPageTableView
              totalCount={totalMyLearningCardCount}
              headerColumns={headerColumns}
              learningList={myLearningCards}
              showSeeMore={showSeeMore}
              onClickRow={onViewDetail}
              onClickSeeMore={onClickSeeMore}
              getOrderIcon={getOrderIcon}
              onClickSort={handleClickSort}
              isLoading={isLoading}
              seeMoreButtonViewRef={seeMoreButtonViewRef}
            />
          )) || (
            <NoSuchContentsView
              isLoading={isLoading}
              emptyText={getPolyglotText(
                '필터 조건에 해당하는 결과가 없습니다.',
                'mapg-msmp-검색x3'
              )}
            />
          )}
        </>
      )) || (
        <NoSuchContentsView
          isLoading={isLoading}
          emptyText={getPolyglotText(
            '관심목록에 추가한 학습 과정이 없습니다.',
            'learning-my-관심목록'
          )}
        />
      )}
    </>
  );
}

export default inject(
  mobxHelper.injectFrom(
    'lecture.lectureService',
    'myTraining.inMyLectureService',
    'shared.filterBoxService'
  )
)(observer(InMyListPageContainer));

const PAGE_SIZE = 20;
