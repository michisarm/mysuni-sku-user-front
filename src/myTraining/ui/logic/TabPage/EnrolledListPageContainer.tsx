import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper, Offset } from '@nara.platform/accent';
import ReactGA from 'react-ga';
import { Icon, Segment, Table } from 'semantic-ui-react';
import { MyTrainingService } from '../../../stores';
import { SeeMoreButton } from '../../../../lecture';
import { TabHeader } from '../../../ui/view/tabHeader';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { MyTrainingRouteParams } from '../../../routeParams';
import { useScrollMove } from '../../../useScrollMove';
import { Direction, toggleDirection } from '../../../model/Direction';
import TableHeaderColumn, {
  inProgressPolyglot,
} from '../../../ui/model/TableHeaderColumn';
import { MyLearningContentType } from '../../../ui/model';
import { Order } from '../../../model/Order';
import { LearningTypeName } from '../../../model/LearningType';
import dateTimeHelper from '../../../../shared/helper/dateTimeHelper';
import { Loadingpanel, NoSuchContentPanel } from '../../../../shared';
import { getCollgeName } from 'shared/service/useCollege/useRequestCollege';
import LectureParams, { toPath } from 'lecture/detail/viewModel/LectureParams';
import { MyTrainingTableViewModel } from 'myTraining/model';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { useRequestFilterCountView } from 'myTraining/service/useRequestFilterCountView';
import NoSuchContentsView from 'myTraining/ui/view/NoSuchContentsView';

interface EnrolledListPageContainerProps {
  myTrainingService?: MyTrainingService;
}

function EnrolledListPageContainer({
  myTrainingService,
}: EnrolledListPageContainerProps) {
  //

  // ------------------------------------------------- init -------------------------------------------------
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { scrollOnceMove, scrollSave } = useScrollMove();

  const { myTrainingTableViews, myTrainingTableCount2 } = myTrainingService!;

  const headerColumns = TableHeaderColumn.getColumnsByContentType(contentType);

  const initialOrders = headerColumns
    .filter((headerColumn) => headerColumn.icon === true)
    .map((headerColumn) => ({
      column: headerColumn.text,
      direction: Direction.DESC,
    }));

  const [orders, setOrders] = useState<Order[]>(initialOrders);

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

  // ------------------------------------------------- header - filter -------------------------------------------------

  // ------------------------------------------------- table -------------------------------------------------

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

    if (contentType === MyLearningContentType.InProgress) {
      ReactGA.event({
        category: getPolyglotText(
          '학습중인 과정',
          'MyTrainingList-이벤트-과정'
        ),
        action: 'Click',
        label: `${
          myTraining.serviceType === 'Card' ? '(Card)' : '(Cube)'
        } - ${parsePolyglotString(myTraining.name)}`,
      });
    }
    scrollSave();
  };

  // ------------------------------------------------- modal -------------------------------------------------

  // ------------------------------------------------- etc -------------------------------------------------

  return (
    <>
      {(!resultEmpty && (
        <>
          <TabHeader
            resultEmpty={resultEmpty}
            totalCount={myTrainingTableCount2}
          >
            <div
              className="list-number"
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  '총 <strong>{totalCount}개</strong>의 리스트가 있습니다.',
                  'learning-학보드-게시물총수',
                  {
                    totalCount: (myTrainingTableCount2 || 0).toString(),
                  }
                ),
              }}
            />
          </TabHeader>
        </>
      )) || <div style={{ marginTop: 50 }} />}
      {myTrainingTableViews && myTrainingTableViews.length > 0 && (
        <>
          {(!resultEmpty && (
            <>
              <div className="mylearning-list-wrap">
                <Table className="ml-02-03">
                  <Table.Header>
                    <Table.Row>
                      {headerColumns &&
                        headerColumns.length &&
                        headerColumns.map((headerColumn) => (
                          <Table.HeaderCell
                            key={`learning-header-${headerColumn.key}`}
                            className={
                              headerColumn.text === '과정명' ? 'title' : ''
                            }
                          >
                            {inProgressPolyglot(headerColumn.text)}
                            {headerColumn.icon && (
                              <a
                                href="#"
                                onClick={(e) => {
                                  handleClickSort(headerColumn.text);
                                  e.preventDefault();
                                }}
                              >
                                <Icon
                                  className={getOrderIcon(
                                    headerColumn.text,
                                    true
                                  )}
                                >
                                  <span className="blind">
                                    {getOrderIcon(headerColumn.text)}
                                  </span>
                                </Icon>
                              </a>
                            )}
                          </Table.HeaderCell>
                        ))}
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {myTrainingTableViews.map((myTraining, index) => {
                      const learningType = LearningTypeName[myTraining.type];
                      const formattedLearningTime =
                        dateTimeHelper.timeToHourMinuteFormat(
                          myTraining.learningTime
                        );

                      return (
                        <Table.Row key={`mytraining-list-${index}`}>
                          <Table.Cell>
                            {myTrainingTableCount2 - index}
                          </Table.Cell>
                          <Table.Cell>
                            {getCollgeName(myTraining.collegeId)}
                          </Table.Cell>
                          <Table.Cell className="title">
                            <a
                              href="#"
                              onClick={(e) => onViewDetail(e, myTraining)}
                            >
                              <span
                                className={`ellipsis ${
                                  myTraining.useNote ? 'noteOn' : ''
                                }`}
                              >
                                {parsePolyglotString(myTraining.cubeName)}
                              </span>
                            </a>
                          </Table.Cell>
                          <Table.Cell>{learningType || '-'} </Table.Cell>
                          <Table.Cell>{myTraining.round} </Table.Cell>
                          <Table.Cell>
                            {myTraining.difficultyLevel || '-'}
                          </Table.Cell>
                          <Table.Cell>{formattedLearningTime}</Table.Cell>
                          <Table.Cell>
                            {(myTraining.stampCount !== 0 &&
                              myTraining.stampCount) ||
                              '-'}
                          </Table.Cell>
                          <Table.Cell>
                            {myTraining.learningStartDate}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </div>

              {showSeeMore && <SeeMoreButton onClick={onClickSeeMore} />}
            </>
          )) || (
              <NoSuchContentsView
                isLoading={isLoading}
                emptyText={getPolyglotText(
                  '필터 조건에 해당하는 결과가 없습니다.',
                  'mapg-msmp-검색x2'
                )}
              />
            ) || (
              <NoSuchContentsView
                isLoading={isLoading}
                emptyText={getPolyglotText(
                  '학습예정인 과정이 없습니다.',
                  'learning-my-학습예정'
                )}
              />
            )}
        </>
      )}
    </>
  );
}

export default inject(mobxHelper.injectFrom('myTraining.myTrainingService'))(
  observer(EnrolledListPageContainer)
);

const PAGE_SIZE = 20;
