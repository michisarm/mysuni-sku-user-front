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
import React, { useCallback, useEffect, useState } from 'react';
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

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteFinishModal, setDeleteFinishModal] = useState<boolean>(false);
  const [noCheckedModal, setNoCheckedModal] = useState<boolean>(false);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
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
    newCardQdo.studentLearning = StudentLearningType.LearningCompleted;
    newCardQdo.orderBy = CardOrderBy.PassedStudentCountDesc;

    return newCardQdo;
  };

  const excelQdo = () => {
    const newCardQdo = new CardQdo();
    newCardQdo.limit = 9999999;
    newCardQdo.offset = 0;
    newCardQdo.searchable = true;
    newCardQdo.studentLearning = StudentLearningType.LearningCompleted;
    newCardQdo.orderBy = CardOrderBy.PassedStudentCountDesc;

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
          console.dir(view);
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

    const isEmpty = await !findMyLearningCardByQdo(true);
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
          totalCount={totalMyLearningCardCount}
          filterCount={filterCount}
          resultEmpty={resultEmpty}
          filterOpotions={filterOptions}
          contentType={contentType}
          onClickDownloadExcel={downloadExcel}
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
            <CompletedListPageTableView
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
            //       <Table.Header>
            //         <Table.Row>
            //           {headerColumns &&
            //             headerColumns.length > 0 &&
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
            //         {myTrainingTableViews.map((myTraining, index) => {
            //           const collegeId = myTraining.category?.collegeId || '';
            //           return (
            //             <Table.Row key={`mytraining-list-${index}`}>
            //               <Table.Cell>
            //                 {myTrainingTableCount - index}
            //               </Table.Cell>
            //               <Table.Cell>{getCollgeName(collegeId)}</Table.Cell>
            //               <Table.Cell className="title">
            //                 <a
            //                   href="#"
            //                   onClick={(e) => onViewDetail(e, myTraining)}
            //                 >
            //                   <span
            //                     className={`ellipsis ${
            //                       myTraining.useNote ? 'noteOn' : ''
            //                     }`}
            //                   >
            //                     {parsePolyglotString(myTraining.name)}
            //                   </span>
            //                 </a>
            //               </Table.Cell>
            //               <Table.Cell>
            //                 {LearningTypeName[myTraining.cubeType] || '-'}{' '}
            //               </Table.Cell>
            //               <Table.Cell>
            //                 {myTraining.difficultyLevel || '-'}
            //               </Table.Cell>
            //               <Table.Cell>
            //                 {timeToHourMinutePaddingFormat(
            //                   myTraining.learningTime +
            //                     myTraining.additionalLearningTime
            //                 )}
            //               </Table.Cell>
            //               <Table.Cell>
            //                 {convertTimeToDate(myTraining.endDate)}
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
                'mapg-msmp-검색x4'
              )}
            />
          )}
        </>
      )) || (
        <NoSuchContentsView
          isLoading={isLoading}
          emptyText={getPolyglotText(
            'mySUNI 학습완료에 해당하는 학습 과정이 없습니다.',
            'learning-my-학습완료'
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
