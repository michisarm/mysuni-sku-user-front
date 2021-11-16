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
import React, { useCallback, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useHistory, useParams } from 'react-router-dom';
import FilterBoxService from 'shared/present/logic/FilterBoxService';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

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
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
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
    myLearningCards,
    totalMyLearningCardCount,
    cardQdo,
    setCardQdo,
    findMyLearningCardByQdo,
    clearMyLearningCard,
  } = lectureService!;
  const { conditions, showResult, filterCount, openFilter, setOpenFilter } =
    filterBoxService!;

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
    await setCardQdo(newQdo);

    const isEmpty = await !findMyLearningCardByQdo(true);
    await console.log(isEmpty);
    await setResultEmpty(isEmpty);
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

  const onClickSort = useCallback((column: string, direction: Direction) => {
    lectureService!.sortTableViews(column, direction);
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
          resultEmpty={resultEmpty}
          totalCount={totalMyLearningCardCount}
          filterCount={filterCount}
          filterOpotions={filterOptions}
          contentType={contentType}
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
      {(myLearningCards && myLearningCards.length > 0 && (
        <>
          {(!resultEmpty && (
            <RequiredListPageTableView
              totalCount={totalMyLearningCardCount}
              headerColumns={headerColumns}
              learningList={myLearningCards}
              showSeeMore={showSeeMore}
              onClickRow={onViewDetail}
              onClickSeeMore={onClickSeeMore}
              getOrderIcon={getOrderIcon}
              onClickSort={handleClickSort}
            />
            // <>
            //   <div className="mylearning-list-wrap">
            //     <Table className="ml-02-03">
            //       <colgroup>
            //         <col width="8%" />
            //         <col width="12%" />
            //         <col width="20%" />
            //         <col width="10%" />
            //         <col width="10%" />
            //         <col width="10%" />
            //         <col width="10%" />
            //         <col width="10%" />
            //         <col width="10%" />
            //       </colgroup>

            //       <Table.Header>
            //         <Table.Row>
            //           {headerColumns &&
            //             headerColumns.length &&
            //             headerColumns.map((headerColumn) => (
            //               <Table.HeaderCell
            //                 key={`learning-header-${headerColumn.key}`}
            //                 className={
            //                   headerColumn.text === '과정명' ? 'title' : ''
            //                 }
            //               >
            //                 {inProgressPolyglot(headerColumn.text)}
            //                 {headerColumn.icon && (
            //                   <a
            //                     href="#"
            //                     onClick={(e) => {
            //                       handleClickSort(headerColumn.text);
            //                       e.preventDefault();
            //                     }}
            //                   >
            //                     <Icon
            //                       className={getOrderIcon(
            //                         headerColumn.text,
            //                         true
            //                       )}
            //                     >
            //                       <span className="blind">
            //                         {getOrderIcon(headerColumn.text)}
            //                       </span>
            //                     </Icon>
            //                   </a>
            //                 )}
            //               </Table.HeaderCell>
            //             ))}
            //         </Table.Row>
            //       </Table.Header>

            //       <Table.Body>
            //         {lectureTableViews.map((requiredCard, index) => {
            //           const learningType = LearningTypeName[requiredCard.type];
            //           const collegeName = getCollgeName(
            //             requiredCard.category.collegeId
            //           );
            //           const learningState =
            //             (requiredCard.learningState &&
            //               LearningStateName[
            //                 requiredCard.learningState as LearningState
            //               ]) ||
            //             '-';
            //           const progressRate =
            //             (requiredCard.learningState &&
            //               `${requiredCard.passedLearningCount}/${requiredCard.totalLearningCount}`) ||
            //             '-';

            //           return (
            //             <Table.Row key={`requried-card-${index}`}>
            //               <Table.Cell>{lectureTableCount - index}</Table.Cell>
            //               <Table.Cell>{collegeName}</Table.Cell>
            //               <Table.Cell className="title">
            //                 <a
            //                   href="#"
            //                   onClick={(e) => {
            //                     onViewDetail(e, requiredCard.serviceId);
            //                   }}
            //                 >
            //                   <span
            //                     className={`ellipsis ${
            //                       requiredCard.useNote ? 'noteOn' : ''
            //                     }`}
            //                   >
            //                     {requiredCard.name &&
            //                       parsePolyglotString(requiredCard.name)}
            //                   </span>
            //                 </a>
            //               </Table.Cell>
            //               <Table.Cell>{learningType || '-'} </Table.Cell>
            //               <Table.Cell>
            //                 {requiredCard.difficultyLevel || '-'}
            //               </Table.Cell>
            //               <Table.Cell>
            //                 {timeToHourMinutePaddingFormat(
            //                   requiredCard.learningTime
            //                 )}
            //               </Table.Cell>
            //               <Table.Cell>
            //                 {convertTimeToDate(requiredCard.updateTime)}
            //               </Table.Cell>
            //               <Table.Cell>{progressRate}</Table.Cell>
            //               <Table.Cell>
            //                 {stateNamePolytglot(learningState)}
            //               </Table.Cell>
            //             </Table.Row>
            //           );
            //         })}
            //       </Table.Body>
            //     </Table>
            //   </div>
            //   {showSeeMore && <SeeMoreButton onClick={onClickSeeMore} />}
            // </>
          )) || (
            <NoSuchContentsView
              isLoading={isLoading}
              emptyText={getPolyglotText(
                '필터 조건에 해당하는 결과가 없습니다.',
                'mapg-msmp-검색x5'
              )}
            />
          )}
        </>
      )) || (
        <NoSuchContentsView
          isLoading={isLoading}
          emptyText={getPolyglotText(
            '권장과정에 해당하는 학습 과정이 없습니다.',
            'learning-my-권장과정'
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
