import { mobxHelper } from '@nara.platform/accent';
import { LectureService } from 'lecture';
import LectureParams, { toPath } from 'lecture/detail/viewModel/LectureParams';
import CardForUserViewModel from 'lecture/model/learning/CardForUserViewModel';
import CardOrderBy from 'lecture/model/learning/CardOrderBy';
import CardQdo from 'lecture/model/learning/CardQdo';
import StudentLearningType from 'lecture/model/learning/StudentLearningType';
import { inject, observer } from 'mobx-react';
import { CompletedXlsxModel } from 'myTraining/model/CompletedXlsxModel';
import NoSuchContentsView from 'myTraining/ui/view/NoSuchContentsView';
import { CompletedListPageTableView } from 'myTraining/ui/view/table/CompletedListPageTableView';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import ReactGA from 'react-ga';
import { useHistory, useParams } from 'react-router-dom';
import { getCollgeName } from 'shared/service/useCollege/useRequestCollege';
import XLSX from 'xlsx';
import FilterBoxService from '../../../../shared/present/logic/FilterBoxService';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { Direction, toggleDirection } from '../../../model/Direction';
import { Order } from '../../../model/Order';
import { MyTrainingRouteParams } from '../../../routeParams';
import TableHeaderColumn from '../../../ui/model/TableHeaderColumn';
import { TabHeader } from '../../../ui/view/tabHeader';
import { useScrollMove } from '../../../useScrollMove';
import { convertToKeyInMyLearningTable } from '../../../../lecture/shared/present/logic/LectureService';

interface CompletedListPageContainerProps {
  lectureService?: LectureService;
  filterBoxService?: FilterBoxService;
}

function CompletedListPageContainer({
  lectureService,
  filterBoxService,
}: CompletedListPageContainerProps) {
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
    completedCount,
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
    newCardQdo.studentLearning = StudentLearningType.LearningCompleted;
    newCardQdo.orderBy = CardOrderBy.StudentPassedTimeDesc;

    return newCardQdo;
  };

  const excelQdo = () => {
    const newCardQdo = new CardQdo();
    newCardQdo.limit = 9999999;
    newCardQdo.offset = 0;
    newCardQdo.studentLearning = StudentLearningType.LearningCompleted;
    newCardQdo.orderBy = CardOrderBy.StudentPassedTimeDesc;

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

  const writeExcelFile = (xlsxList: MyXlsxList, filename: string) => {
    const excel = XLSX.utils.json_to_sheet(xlsxList);
    const temp = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(temp, excel, filename);
    XLSX.writeFile(temp, `${filename}.xlsx`);
  };

  const downloadExcel = async () => {
    const tableViews: CardForUserViewModel[] =
      await lectureService!.findMyLearningCardForExcel(excelQdo());
    const lastIndex = tableViews.length;
    let xlsxList: MyXlsxList = [];
    const filename = 'Learning_CompletedProgress';

    xlsxList =
      (tableViews &&
        tableViews.length > 0 &&
        tableViews.map((view, index) => {
          const collegeName =
            (view.mainCollegeId && getCollgeName(view.mainCollegeId)) || '';
          return view.toXlsxForCompleted(lastIndex - index, collegeName);
        })) ||
      [];

    writeExcelFile(xlsxList, filename);
  };

  // -------------------------------------------- header - filter --------------------------------------------
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

  const onClickSort = useCallback(
    (column: string, direction: Direction) => {
      // lectureService!.sortMyLearningTableViews(column, direction);
      const cardQdo = CardQdo.getOrderByCardQdo({
        columnType: convertToKeyInMyLearningTable(column),
        direction,
        studentLearning: StudentLearningType.LearningCompleted,
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

  const getDireciton = (column: string) =>
    orders.filter((order) => order.column === column)[0]?.direction;

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

  // ------------------------------------------------- contents -------------------------------------------------
  const onViewDetail = (e: any, serviceId: string) => {
    e.preventDefault();

    const params: LectureParams = {
      cardId: serviceId,
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
          resultEmpty={!(completedCount > 0)}
          totalCount={totalMyLearningCardCount}
          filterOpotions={filterOptions}
          contentType={contentType}
          onClickDownloadExcel={downloadExcel}
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
      {(completedCount > 0 && (
        <>
          {(totalMyLearningCardCount > 0 && (
            <CompletedListPageTableView
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
                '?????? ????????? ???????????? ????????? ????????????.',
                'mapg-msmp-??????x4'
              )}
            />
          )}
        </>
      )) || (
        <NoSuchContentsView
          isLoading={isLoading}
          emptyText={getPolyglotText(
            'mySUNI ??????????????? ???????????? ?????? ????????? ????????????.',
            'learning-my-????????????'
          )}
        />
      )}
    </>
  );
}

export default inject(
  mobxHelper.injectFrom('lecture.lectureService', 'shared.filterBoxService')
)(observer(CompletedListPageContainer));

const PAGE_SIZE = 20;

export type MyXlsxList = CompletedXlsxModel[];
