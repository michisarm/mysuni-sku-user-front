import { mobxHelper, Offset } from '@nara.platform/accent';
import { LectureService } from 'lecture';
import LectureParams, { toPath } from 'lecture/detail/viewModel/LectureParams';
import CardOrderBy from 'lecture/model/learning/CardOrderBy';
import CardQdo from 'lecture/model/learning/CardQdo';
import StudentLearningType from 'lecture/model/learning/StudentLearningType';
import { inject, observer } from 'mobx-react';
import { Direction, toggleDirection } from 'myTraining/model/Direction';
import { Order } from 'myTraining/model/Order';
import { MyTrainingRouteParams } from 'myTraining/routeParams';
import TableHeaderColumn from 'myTraining/ui/model/TableHeaderColumn';
import NoSuchContentsView from 'myTraining/ui/view/NoSuchContentsView';
import { TabHeader } from 'myTraining/ui/view/tabHeader';
import { RequiredListPageTableView } from 'myTraining/ui/view/table/RequiredListPageTableView';
import { useScrollMove } from 'myTraining/useScrollMove';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import ReactGA from 'react-ga';
import { useHistory, useParams } from 'react-router-dom';
import FilterBoxService from 'shared/present/logic/FilterBoxService';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { convertToKeyInMyLearningTable } from '../../../../lecture/shared/present/logic/LectureService';

interface RequiredListPageContainerProps {
  lectureService?: LectureService;
  filterBoxService?: FilterBoxService;
}

function RequiredListPageContainer({
  lectureService,
  filterBoxService,
}: RequiredListPageContainerProps) {
  //

  // ------------------------------------------------- init -------------------------------------------------
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { scrollOnceMove, scrollSave } = useScrollMove();

  const headerColumns = TableHeaderColumn.getColumnsByContentType(contentType);

  const initialOrders = headerColumns
    .filter((headerColumn) => headerColumn.icon === true)
    .map((headerColumn) => ({
      column: headerColumn.text,
      direction: Direction.DESC,
    }));

  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const {
    requiredLecturesCount,
    myLearningCards,
    totalMyLearningCardCount,
    cardQdo,
    setCardQdo,
    findMyLearningCardByQdo,
    clearMyLearningCard,
  } = lectureService!;
  const {
    conditions,
    showResult,
    filterCount,
    openFilter,
    setOpenFilter,
  } = filterBoxService!;

  const clearQdo = () => {
    const newCardQdo = new CardQdo();
    newCardQdo.limit = parseInt(params.pageNo) * PAGE_SIZE;
    newCardQdo.offset = 0;
    newCardQdo.searchable = true;
    newCardQdo.required = true;

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

  // ------------------------------------------------- header -------------------------------------------------

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
    newQdo.required = true;
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

  const onClickSeeMore = () => {
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
      ? '???????????? ??????'
      : '???????????? ??????';
  };

  const onClickSort = useCallback((column: string, direction: Direction) => {
    // lectureService!.sortMyTrainingCards(column, direction);
    const cardQdo = CardQdo.getOrderByCardQdo({
      columnType: convertToKeyInMyLearningTable(column),
      direction,
      required: true,
    });

    setCardQdo(cardQdo);

    findMyLearningCardByQdo(true);
    history.replace('./1');
  }, []);

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

  // ------------------------------------------------- modal -------------------------------------------------

  // ------------------------------------------------- etc -------------------------------------------------

  return (
    <>
      {
        <TabHeader
          resultEmpty={!(requiredLecturesCount > 0)}
          totalCount={totalMyLearningCardCount}
          filterOpotions={filterOptions}
          contentType={contentType}
        >
          <div
            className="list-number"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                '??? <strong>{totalCount}???</strong>??? ???????????? ????????????.',
                'learning-?????????-???????????????',
                {
                  totalCount: (totalMyLearningCardCount || 0).toString(),
                }
              ),
            }}
          />
        </TabHeader>
      }
      {(requiredLecturesCount > 0 && (
        <>
          {(totalMyLearningCardCount > 0 && (
            <RequiredListPageTableView
              totalCount={totalMyLearningCardCount}
              headerColumns={headerColumns}
              learningList={myLearningCards}
              showSeeMore={showSeeMore}
              onClickRow={onViewDetail}
              onClickSeeMore={onClickSeeMore}
              getOrderIcon={getOrderIcon}
              onClickSort={handleClickSort}
              seeMoreButtonViewRef={seeMoreButtonViewRef}
              isLoading={isLoading}
            />
          )) || (
            <NoSuchContentsView
              isLoading={isLoading}
              emptyText={getPolyglotText(
                '?????? ????????? ???????????? ????????? ????????????.',
                'mapg-msmp-??????x5'
              )}
            />
          )}
        </>
      )) || (
        <NoSuchContentsView
          isLoading={isLoading}
          emptyText={getPolyglotText(
            '??????????????? ???????????? ?????? ????????? ????????????.',
            'learning-my-????????????'
          )}
        />
      )}
    </>
  );
}

export default inject(
  mobxHelper.injectFrom('lecture.lectureService', 'shared.filterBoxService')
)(observer(RequiredListPageContainer));

const PAGE_SIZE = 20;
