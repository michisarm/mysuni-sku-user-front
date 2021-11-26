import { mobxHelper } from '@nara.platform/accent';
import { LectureService } from 'lecture';
import LectureParams, { toPath } from 'lecture/detail/viewModel/LectureParams';
import CardForUserViewModel from 'lecture/model/learning/CardForUserViewModel';
import CardOrderBy from 'lecture/model/learning/CardOrderBy';
import CardQdo from 'lecture/model/learning/CardQdo';
import StudentLearningType from 'lecture/model/learning/StudentLearningType';
import { inject, observer } from 'mobx-react';
import NoSuchContentsView from 'myTraining/ui/view/NoSuchContentsView';
import { RetryListPageTableView } from 'myTraining/ui/view/table/RetryListPageTableView';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import ReactGA from 'react-ga';
import { useHistory, useParams } from 'react-router-dom';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { Direction, toggleDirection } from '../../../model/Direction';
import { Order } from '../../../model/Order';
import { MyTrainingRouteParams } from '../../../routeParams';
import TableHeaderColumn from '../../../ui/model/TableHeaderColumn';
import { TabHeader } from '../../../ui/view/tabHeader';
import { useScrollMove } from '../../../useScrollMove';

interface RetryListPageContainerProps {
  lectureService?: LectureService;
}

function RetryListPageContainer({
  lectureService,
}: RetryListPageContainerProps) {
  //

  // ------------------------------------------------- init -------------------------------------------------
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { scrollSave, scrollOnceMove } = useScrollMove();

  const headerColumns = TableHeaderColumn.getColumnsByContentType(contentType);
  const initialOrders = headerColumns
    .filter((headerColumn) => headerColumn.icon === true)
    .map((headerColumn) => ({
      column: headerColumn.text,
      direction: Direction.DESC,
    }));
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const {
    retryCount,
    myLearningCards,
    totalMyLearningCardCount,
    selectedServiceIds,
    cardQdo,
    setCardQdo,
    findMyLearningCardByQdo,
    clearMyLearningCard,
    clearOne,
    selectOne,
    clearAllSelectedServiceIds,
  } = lectureService!;

  // const { conditions, showResult, filterCount, openFilter, setOpenFilter } =
  //   filterBoxService!;

  const clearQdo = () => {
    const newCardQdo = new CardQdo();
    newCardQdo.limit = PAGE_SIZE;
    newCardQdo.offset = 0;
    newCardQdo.studentLearning = StudentLearningType.LearningCancel;
    newCardQdo.orderBy = CardOrderBy.StudentModifiedTimeDesc;

    return newCardQdo;
  };

  useEffect(() => {
    clearMyLearningCard();

    if (selectedServiceIds && selectedServiceIds.length > 0) {
      clearAllSelectedServiceIds();
    }
    const newQdo = clearQdo();

    requestmyTrainingsWithPage(newQdo, true).finally(() => {
      if (parseInt(params.pageNo) > 1) {
        newQdo.limit = PAGE_SIZE;
        setCardQdo(newQdo);
      }
    });

    return () => {};
  }, []);

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

  // -------------------------------------------- header - filter --------------------------------------------

  // useEffect(() => {
  //   if (showResult) {
  //     myTrainingService!.setFilterRdoByConditions(conditions);
  //     requestMyTrainingsByConditions();
  //   }
  // }, [showResult]);

  // const onClickOpenFilter = () => {
  //   setOpenFilter(!openFilter);
  // };

  // const filterOptions = {
  //   openFilter,
  //   onClickOpen: onClickOpenFilter,
  //   filterCount,
  // };

  // const requestMyTrainingsByConditions = async () => {
  //   setIsLoading(true);

  //   const newQdo = cardQdo;
  //   newQdo.setBycondition(conditions);
  //   await setCardQdo(newQdo);

  //   await findMyLearningCardByQdo();
  //   const { myLearningCards } = lectureService!;
  //   const isEmpty =
  //     (await (myLearningCards && myLearningCards.length > 0 && false)) || true;
  //   await setResultEmpty(isEmpty);
  //   await checkShowSeeMore();
  //   setIsLoading(false);
  //   history.replace('./1');
  // };

  // useEffect(() => {
  //   if (showResult) {
  //     requestMyTrainingsByConditions();
  //   }
  // }, [showResult]);

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
      console.log(entries);
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

  const onCheckAll = useCallback(
    (e: any, data: any) => {
      const { clearAll, selectAll } = lectureService!;

      if (myLearningCards.length === selectedServiceIds.length) {
        clearAll();
        return;
      }

      selectAll();
    },
    [myLearningCards, selectedServiceIds]
  );

  const onCheckOne = useCallback(
    (e: any, data: any) => {
      if (selectedServiceIds.includes(data.value)) {
        clearOne(data.value);
        return;
      }

      selectOne(data.value);
    },
    [selectedServiceIds, clearOne, selectOne]
  );

  const onClickSort = useCallback(
    (column: string, direction: Direction) => {
      lectureService!.sortMyLearningTableViews(column, direction);
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

  const getDireciton = (column: string) =>
    orders.filter((order) => order.column === column)[0].direction;

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

  // ------------------------------------------------- contents -------------------------------------------------

  const onViewDetail = (e: any, myTraining: CardForUserViewModel) => {
    e.preventDefault();

    const cardId = myTraining.id;

    const params: LectureParams = {
      cardId,
      viewType: 'view',
      pathname: '',
    };

    history.push(toPath(params));

    scrollSave();
  };

  // ------------------------------------------------- modal -------------------------------------------------

  // ------------------------------------------------- etc -------------------------------------------------

  return (
    <>
      {
        <TabHeader
          resultEmpty={!(retryCount > 0)}
          totalCount={totalMyLearningCardCount}
          // filterCount={filterCount}
          // filterOpotions={filterOptions}
        >
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
        </TabHeader>
      }
      {(retryCount > 0 && (
        <>
          {(totalMyLearningCardCount > 0 && (
            <RetryListPageTableView
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
                'mapg-msmp-검색x4'
              )}
            />
          )}
        </>
      )) || (
        <NoSuchContentsView
          isLoading={isLoading}
          emptyText={getPolyglotText(
            '취소/미이수에 해당하는 학습 과정이 없습니다.',
            'learning-my-취소'
          )}
        />
      )}
    </>
  );
}

export default inject(mobxHelper.injectFrom('lecture.lectureService'))(
  observer(RetryListPageContainer)
);

const PAGE_SIZE = 999999;