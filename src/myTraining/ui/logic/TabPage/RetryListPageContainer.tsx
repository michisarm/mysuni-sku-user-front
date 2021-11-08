import { mobxHelper, Offset } from '@nara.platform/accent';
import LectureParams, { toPath } from 'lecture/detail/viewModel/LectureParams';
import { inject, observer } from 'mobx-react';
import { MyTrainingTableViewModel } from 'myTraining/model';
import { useRequestFilterCountView } from 'myTraining/service/useRequestFilterCountView';
import NoSuchContentsView from 'myTraining/ui/view/NoSuchContentsView';
import { RetryListPageTableView } from 'myTraining/ui/view/table/RetryListPageTableView';
import React, { useCallback, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useHistory, useParams } from 'react-router-dom';
import FilterBoxService from '../../../../shared/present/logic/FilterBoxService';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { Direction, toggleDirection } from '../../../model/Direction';
import { Order } from '../../../model/Order';
import { MyTrainingRouteParams } from '../../../routeParams';
import { MyTrainingService } from '../../../stores';
import { MyLearningContentType } from '../../../ui/model';
import TableHeaderColumn from '../../../ui/model/TableHeaderColumn';
import { TabHeader } from '../../../ui/view/tabHeader';
import { useScrollMove } from '../../../useScrollMove';

interface RetryListPageContainerProps {
  myTrainingService?: MyTrainingService;
  filterBoxService?: FilterBoxService;
}

function RetryListPageContainer({
  myTrainingService,
  filterBoxService,
}: RetryListPageContainerProps) {
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

  const { scrollSave } = useScrollMove();

  const headerColumns = TableHeaderColumn.getColumnsByContentType(contentType);
  const initialOrders = headerColumns
    .filter((headerColumn) => headerColumn.icon === true)
    .map((headerColumn) => ({
      column: headerColumn.text,
      direction: Direction.DESC,
    }));
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const { scrollOnceMove } = useScrollMove();
  const { myTrainingTableViews, myTrainingTableCount } = myTrainingService!;
  const { conditions, showResult, filterCount, openFilter, setOpenFilter } =
    filterBoxService!;

  useRequestFilterCountView();

  useEffect(() => {
    myTrainingService!.clearAllTableViews();
    myTrainingService!.initFilterRdo(contentType);

    if (params.pageNo === '1') {
      requestMyTrainings();
      return;
    }

    const currentPageNo = parseInt(params.pageNo);
    const limit = currentPageNo * PAGE_SIZE;

    requestmyTrainingsWithPage({ offset: 0, limit });

    return () => {};
  }, [contentType]);

  const requestMyTrainings = async () => {
    setIsLoading(true);
    if (contentType === MyLearningContentType.Enrolled) {
      const isEmpty = await myTrainingService!.findEnrollTableViews();
      setResultEmpty(isEmpty);

      setIsLoading(false);
    } else {
      const isEmpty = await myTrainingService!.findAllTableViews();
      setResultEmpty(isEmpty);
      checkShowSeeMore();
      setIsLoading(false);
    }
  };

  const requestmyTrainingsWithPage = async (offset: Offset) => {
    setIsLoading(true);
    await myTrainingService!.findAllTableViewsWithPage(offset);
    checkShowSeeMore();
    setIsLoading(false);
    scrollOnceMove();
  };

  // ------------------------------------------------- header -------------------------------------------------

  // -------------------------------------------- header - filter --------------------------------------------

  useEffect(() => {
    if (showResult) {
      myTrainingService!.setFilterRdoByConditions(conditions);
      requestMyTrainingsByConditions();
    }
  }, [showResult]);

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
    const isEmpty = await myTrainingService!.findAllTableViewsByConditions();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
    history.replace('./1');
  };

  // ------------------------------------------------- table -------------------------------------------------

  const onClickSort = useCallback(
    (column: string, direction: Direction) => {
      myTrainingService!.sortTableViews(column, direction);
    },
    [contentType]
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
      ? '내림차순 정렬'
      : '오름차순 정렬';
  };

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

  const checkShowSeeMore = (): void => {
    const { myTrainingTableViews, myTrainingTableCount } = myTrainingService!;

    if (myTrainingTableViews.length >= myTrainingTableCount) {
      setShowSeeMore(false);
      return;
    }
    if (myTrainingTableCount <= PAGE_SIZE) {
      setShowSeeMore(false);
      return;
    }

    setShowSeeMore(true);
  };

  const onClickSeeMore = () => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);

    const currentPageNo = parseInt(params.pageNo);
    const nextPageNo = currentPageNo + 1;

    const limit = PAGE_SIZE;
    const offset = currentPageNo * PAGE_SIZE;

    requestmyTrainingsWithPage({ offset, limit });

    history.replace(`./${nextPageNo}`);
  };

  // ------------------------------------------------- contents -------------------------------------------------
  const onViewDetail = (e: any, myTraining: MyTrainingTableViewModel) => {
    e.preventDefault();

    const cardId =
      myTraining.serviceType === 'Card'
        ? myTraining.serviceId
        : myTraining.cardId;

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
          totalCount={myTrainingTableCount}
          filterCount={filterCount}
          resultEmpty={resultEmpty}
          filterOpotions={filterOptions}
        >
          <div
            className="list-number"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                '총 <strong>{totalCount}개</strong>의 리스트가 있습니다.',
                'learning-학보드-게시물총수',
                {
                  totalCount: (myTrainingTableCount || 0).toString(),
                }
              ),
            }}
          />
        </TabHeader>
      }
      {(myTrainingTableViews && myTrainingTableViews.length > 0 && (
        <>
          {(!resultEmpty && (
            <RetryListPageTableView
              totalCount={myTrainingTableCount}
              headerColumns={headerColumns}
              learningList={myTrainingTableViews}
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
            //                 {myTraining.stampCount || '-'}
            //               </Table.Cell>
            //               <Table.Cell>
            //                 {convertTimeToDate(myTraining.modifiedTime)}
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
            '취소/미이수에 해당하는 학습 과정이 없습니다.',
            'learning-my-취소'
          )}
        />
      )}
    </>
  );
}

export default inject(
  mobxHelper.injectFrom(
    'shared.filterBoxService',
    'myTraining.myTrainingService'
  )
)(observer(RetryListPageContainer));

const PAGE_SIZE = 20;
