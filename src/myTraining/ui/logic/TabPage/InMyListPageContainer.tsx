import { mobxHelper } from '@nara.platform/accent';
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
import React, { useCallback, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useHistory, useParams } from 'react-router';
import FilterBoxService from 'shared/present/logic/FilterBoxService';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

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

  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
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
    newCardQdo.limit = PAGE_SIZE;
    newCardQdo.offset = 0;
    newCardQdo.searchable = true;
    newCardQdo.bookmark = true;
    newCardQdo.orderBy = CardOrderBy.BookmarkRegisteredTimeDesc;

    return newCardQdo;
  };

  useEffect(() => {
    clearMyLearningCard();

    const newQdo = clearQdo();

    requestmyTrainingsWithPage(newQdo, true);

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

    await findMyLearningCardByQdo();
    const { myLearningCards } = lectureService!;
    const isEmpty =
      (await (myLearningCards && myLearningCards.length > 0 && false)) || true;
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

  return (
    <>
      {
        <TabHeader
          resultEmpty={resultEmpty}
          filterCount={filterCount}
          totalCount={totalMyLearningCardCount}
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
            <InMyListPageTableView
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
            //         {inMyLectureTableViews.map((inMyLecture, index) => {
            //           const learningType =
            //             LearningTypeName[inMyLecture.cubeType];
            //           const collegeName = getCollgeName(
            //             inMyLecture.category.collegeId
            //           );
            //           const learningState =
            //             (inMyLecture.learningState &&
            //               LearningStateName[inMyLecture.learningState]) ||
            //             '-';
            //           const progressRate =
            //             (inMyLecture.learningState &&
            //               `${inMyLecture.passedLearningCount}/${inMyLecture.totalLearningCount}`) ||
            //             '-';

            //           return (
            //             <Table.Row key={`inMyLecture-list-${index}`}>
            //               <Table.Cell>
            //                 {inMyLectureTableCount - index}
            //               </Table.Cell>
            //               <Table.Cell>{collegeName}</Table.Cell>
            //               <Table.Cell className="title">
            //                 <a
            //                   href="#"
            //                   onClick={(e) =>
            //                     onViewDetail(e, inMyLecture.serviceId)
            //                   }
            //                 >
            //                   <span
            //                     className={`ellipsis ${
            //                       inMyLecture.useNote ? 'noteOn' : ''
            //                     }`}
            //                   >
            //                     {parsePolyglotString(inMyLecture.name)}
            //                   </span>
            //                 </a>
            //               </Table.Cell>
            //               <Table.Cell>{learningType || '-'} </Table.Cell>
            //               <Table.Cell>
            //                 {inMyLecture.difficultyLevel || '-'}
            //               </Table.Cell>
            //               <Table.Cell>
            //                 {timeToHourMinutePaddingFormat(
            //                   inMyLecture.learningTime
            //                 )}
            //               </Table.Cell>
            //               <Table.Cell>
            //                 {convertTimeToDate(inMyLecture.lastStudyDate)}
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
