/* eslint-disable react-hooks/exhaustive-deps */
import { mobxHelper } from '@nara.platform/accent';
import LectureParams, { toPath } from 'lecture/detail/viewModel/LectureParams';
import CardForUserViewModel from 'lecture/model/learning/CardForUserViewModel';
import CardOrderBy from 'lecture/model/learning/CardOrderBy';
import CardQdo from 'lecture/model/learning/CardQdo';
import StudentLearningType from 'lecture/model/learning/StudentLearningType';
import { parseInt } from 'lodash';
import { inject, observer } from 'mobx-react';
import { InProgressXlsxModel } from 'myTraining/model/InProgressXlsxModel';
import NoSuchContentsView from 'myTraining/ui/view/NoSuchContentsView';
import { ProgressPageTableView } from 'myTraining/ui/view/table/ProgressPageTableView';
import React, { useCallback, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useHistory, useParams } from 'react-router-dom';
import { getCollgeName } from 'shared/service/useCollege/useRequestCollege';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import XLSX from 'xlsx';
import { StudentService, LectureService } from '../../../../lecture';
import FilterBoxService from '../../../../shared/present/logic/FilterBoxService';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { Direction, toggleDirection } from '../../../model/Direction';
import { LearningType, LearningTypeName } from '../../../model/LearningType';
import { Order } from '../../../model/Order';
import { MyTrainingRouteParams } from '../../../routeParams';
import { MyLearningContentType } from '../../../ui/model';
import TableHeaderColumn from '../../../ui/model/TableHeaderColumn';
import { TabHeader } from '../../../ui/view/tabHeader';
import { useScrollMove } from '../../../useScrollMove';
import MyLearningDeleteFinishModal from '../../view/MyLearningDeleteFinishModal';
import MyLearningDeleteModal from '../../view/MyLearningDeleteModal';
import MyLearningNoCheckModal from '../../view/MyLearningNoCheckModal';

interface ProgressPageContainerProps {
  lectureService?: LectureService;
  studentService?: StudentService;
  filterBoxService?: FilterBoxService;
}

function ProgressPageContainer({
  lectureService,
  studentService,
  filterBoxService,
}: ProgressPageContainerProps) {
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
    selectedServiceIds,
    cardQdo,
    setCardQdo,
    findMyLearningCardByQdo,
    clearMyLearningCard,
    clearOne,
    selectOne,
    clearAllSelectedServiceIds,
    sortMyLearningTableViews,
    column,
    direction,
  } = lectureService!;
  const { conditions, showResult, filterCount, openFilter, setOpenFilter } =
    filterBoxService!;

  const clearQdo = () => {
    const newCardQdo = new CardQdo();
    newCardQdo.limit = parseInt(params.pageNo) * PAGE_SIZE;
    newCardQdo.offset = 0;
    newCardQdo.searchable = true;
    newCardQdo.studentLearning = StudentLearningType.Learning;
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
  }, [contentType]);

  const requestmyTrainingsWithPage = async (
    qdo: CardQdo,
    firstCheck?: boolean
  ) => {
    await setIsLoading(true);
    await setCardQdo(qdo);
    await findMyLearningCardByQdo(firstCheck);
    // column && direction && (await sortMyLearningTableViews(column, direction));
    await checkShowSeeMore();
    await setIsLoading(false);
    await scrollOnceMove();
  };

  // ------------------------------------------------- header -------------------------------------------------

  const onClickDelete = useCallback(() => {
    const { selectedServiceIds } = lectureService!;

    if (selectedServiceIds.length === 0) {
      setNoCheckedModal(true);
      return;
    }

    setDeleteModal(true);
  }, []);

  const writeExcelFile = (xlsxList: MyXlsxList, filename: string) => {
    const excel = XLSX.utils.json_to_sheet(xlsxList);
    const temp = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(temp, excel, filename);
    XLSX.writeFile(temp, `${filename}.xlsx`);
  };

  const downloadExcel = async () => {
    const tableViews: CardForUserViewModel[] =
      await lectureService!.findMyLearningCardForExcel(clearQdo());
    const lastIndex = tableViews.length;
    let xlsxList: MyXlsxList = [];
    const filename = 'Learning_InProgress';

    xlsxList =
      (tableViews &&
        tableViews.length > 0 &&
        tableViews.map((view, index) => {
          const collegeName =
            (view.mainCollegeId && getCollgeName(view.mainCollegeId)) || '';
          return view.toXlsxForInProgress(lastIndex - index, collegeName);
        })) ||
      [];

    writeExcelFile(xlsxList, filename);
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
      sortMyLearningTableViews(column, direction);
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

  const getLearningType = (type: LearningType) => LearningTypeName[type];

  const onViewDetail = (e: any, myTraining: CardForUserViewModel) => {
    e.preventDefault();

    const cardId = myTraining.id;

    const params: LectureParams = {
      cardId,
      viewType: 'view',
      pathname: '',
    };

    history.push(toPath(params));

    if (contentType === MyLearningContentType.InProgress) {
      ReactGA.event({
        category: getPolyglotText(
          '학습중인 과정',
          'MyTrainingList-이벤트-과정'
        ),
        action: 'Click',
        label: `(Card) - ${parsePolyglotString(myTraining.name)}`,
      });
    }
    scrollSave();
  };

  // ------------------------------------------------- modal -------------------------------------------------
  const onCloseDeleteModal = useCallback(() => {
    setDeleteModal(false);
  }, []);

  const onConfirmModal = useCallback(async () => {
    const isHidden = await studentService!.hideWithSelectedServiceIds(
      selectedServiceIds
    );
    if (isHidden) {
      // 김민준
      // myTrainingService!.findAllTabCount();
      findMyLearningCardByQdo();
      clearAllSelectedServiceIds();
    }

    setDeleteModal(false);
    setDeleteFinishModal(true);
  }, []);

  const onCloseNoCheckedModal = useCallback(() => {
    setNoCheckedModal(false);
  }, []);

  const onCloseFinishModal = useCallback(() => {
    setDeleteFinishModal(false);
  }, []);

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
          onClickDelete={onClickDelete}
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
            <ProgressPageTableView
              totalCount={totalMyLearningCardCount}
              headerColumns={headerColumns}
              learningList={myLearningCards}
              showSeeMore={showSeeMore}
              getLearningType={getLearningType}
              onClickRow={onViewDetail}
              onClickSeeMore={onClickSeeMore}
              getOrderIcon={getOrderIcon}
              onClickSort={handleClickSort}
              selectedServiceIds={selectedServiceIds}
              onCheckAll={onCheckAll}
              onCheckOne={onCheckOne}
            />

            // <>
            //   <div className="mylearning-list-wrap">
            //     <Table className="ml-02-02">
            //       <colgroup>
            //         <col width="4%" />
            //         <col width="4%" />
            //         <col width="15%" />
            //         <col width="25%" />
            //         <col width="11%" />
            //         <col width="11%" />
            //         <col width="10%" />
            //         <col width="10%" />
            //         <col width="10%" />
            //       </colgroup>

            //       <Table.Header>
            //         <Table.Row>
            //           <Table.HeaderCell className="ck">
            //             <Checkbox
            //               checked={
            //                 selectedServiceIds.length ===
            //                 myTrainingTableViews.length
            //               }
            //               onChange={onCheckAll}
            //             />
            //           </Table.HeaderCell>
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
            //         {myTrainingTableViews.map((myTraining, index) => (
            //           <Table.Row key={`mytraining-list-${index}`}>
            //             <Table.Cell>
            //               <Checkbox
            //                 value={myTraining.serviceId}
            //                 checked={selectedServiceIds.includes(
            //                   myTraining.serviceId
            //                 )}
            //                 onChange={onCheckOne}
            //               />
            //             </Table.Cell>
            //             <Table.Cell>{myTrainingTableCount - index}</Table.Cell>
            //             <Table.Cell>
            //               {getCollgeName(myTraining.category?.collegeId || '')}
            //             </Table.Cell>
            //             <Table.Cell className="title">
            //               <a
            //                 href="#"
            //                 onClick={(e) => onViewDetail(e, myTraining)}
            //               >
            //                 <span
            //                   className={`ellipsis ${
            //                     myTraining.useNote ? 'noteOn' : ''
            //                   }`}
            //                 >
            //                   {parsePolyglotString(myTraining.name)}
            //                 </span>
            //               </a>
            //             </Table.Cell>
            //             <Table.Cell>
            //               {getLearningType(myTraining.cubeType) || '-'}{' '}
            //             </Table.Cell>
            //             <Table.Cell>
            //               {myTraining.difficultyLevel || '-'}
            //             </Table.Cell>
            //             <Table.Cell>
            //               {timeToHourMinutePaddingFormat(
            //                 myTraining.learningTime +
            //                   myTraining.additionalLearningTime
            //               )}
            //             </Table.Cell>
            //             <Table.Cell>
            //               {convertTimeToDate(myTraining.modifiedTime)}
            //             </Table.Cell>
            //             <Table.Cell>
            //               {`${myTraining.passedLearningCount}/${myTraining.totalLearningCount}`}
            //             </Table.Cell>
            //           </Table.Row>
            //         ))}
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
            '학습중인 과정이 없습니다.',
            'learning-my-학습중'
          )}
        />
      )}

      <MyLearningDeleteModal
        open={deleteModal}
        onClose={onCloseDeleteModal}
        onConfirm={onConfirmModal}
      />
      <MyLearningDeleteFinishModal
        open={deleteFinishModal}
        onConfirm={onCloseFinishModal}
      />
      <MyLearningNoCheckModal
        open={noCheckedModal}
        onConfirm={onCloseNoCheckedModal}
      />
    </>
  );
}

export default inject(
  mobxHelper.injectFrom(
    'lecture.studentService',
    'lecture.lectureService',
    'shared.filterBoxService'
  )
)(observer(ProgressPageContainer));

const PAGE_SIZE = 20;

export type MyXlsxList = InProgressXlsxModel[];
