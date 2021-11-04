import React, { useState, useEffect, useCallback } from 'react';
import { mobxHelper, Offset } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react';
import ReactGA from 'react-ga';
import { Icon, Segment, Table } from 'semantic-ui-react';
import InMyLectureService from '../../../present/logic/InMyLectureService';
import { TabHeader } from 'myTraining/ui/view/tabHeader';
import FilterBoxService from 'shared/present/logic/FilterBoxService';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import FilterBoxContainer from '../FilterBoxContainer';
import { useRequestFilterCountView } from 'myTraining/service/useRequestFilterCountView';
import { useHistory, useParams } from 'react-router';
import { MyTrainingRouteParams } from 'myTraining/routeParams';
import { useScrollMove } from 'myTraining/useScrollMove';
import { Direction, toggleDirection } from 'myTraining/model/Direction';
import TableHeaderColumn, {
  inProgressPolyglot,
} from 'myTraining/ui/model/TableHeaderColumn';
import { MyLearningContentType } from 'myTraining/ui/model';
import { Order } from 'myTraining/model/Order';
import LectureParams, { toPath } from 'lecture/detail/viewModel/LectureParams';
import { LearningTypeName } from 'myTraining/model/LearningType';
import { getCollgeName } from 'shared/service/useCollege/useRequestCollege';
import { LearningStateName } from 'shared/model';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import {
  convertTimeToDate,
  timeToHourMinutePaddingFormat,
} from 'shared/helper/dateTimeHelper';
import { stateNamePolytglot } from 'shared/model/LearningStateName';
import { Loadingpanel, NoSuchContentPanel } from 'shared';
import { SeeMoreButton } from 'lecture';

interface InMyListPageContainerProps {
  inMyLectureService?: InMyLectureService;
  filterBoxService?: FilterBoxService;
}

function InMyListPageContainer({
  inMyLectureService,
  filterBoxService,
}: InMyListPageContainerProps) {
  //

  // ------------------------------------------------- init -------------------------------------------------
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { scrollOnceMove } = useScrollMove();

  const { inMyLectureTableViews, inMyLectureTableCount } = inMyLectureService!;
  const { conditions, filterCount, showResult, setOpenFilter, openFilter } =
    filterBoxService!;

  const history = useHistory();
  const { scrollSave } = useScrollMove();

  const headerColumns = TableHeaderColumn.getColumnsByContentType(contentType);

  useEffect(() => {
    inMyLectureService!.clearAllTableViews();
    inMyLectureService!.initFilterRdo();

    if (params.pageNo === '1') {
      requestInMyLectures();
      return;
    }

    const currentPageNo = parseInt(params.pageNo);
    const limit = currentPageNo * PAGE_SIZE;

    requestInMyLecturesWithPage({ offset: 0, limit });
  }, []);

  // ------------------------------------------------- header - filter -------------------------------------------------
  useRequestFilterCountView();

  const onClickOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  const filterOptions = {
    openFilter,
    onClickOpen: onClickOpenFilter,
    filterCount,
  };

  const requestInMyLecturesByConditions = async () => {
    setIsLoading(true);
    const isEmpty = await inMyLectureService!.findAllTableViewsByConditions();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
    history.replace('./1');
  };

  useEffect(() => {
    if (showResult) {
      inMyLectureService!.setFilterRdoByConditions(conditions);
      requestInMyLecturesByConditions();
    }
  }, [showResult]);

  // ------------------------------------------------- table -------------------------------------------------

  // table - change list
  const requestInMyLectures = async () => {
    setIsLoading(true);
    const isEmpty = await inMyLectureService!.findAllTableViews();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  };

  const requestInMyLecturesWithPage = async (offset: Offset) => {
    setIsLoading(true);
    await inMyLectureService!.findAllTableViewsWithPage(offset);
    checkShowSeeMore();
    setIsLoading(false);
    scrollOnceMove();
  };

  const checkShowSeeMore = (): void => {
    const { inMyLectureTableViews, inMyLectureTableCount } =
      inMyLectureService!;

    if (inMyLectureTableViews.length >= inMyLectureTableCount) {
      setShowSeeMore(false);
      return;
    }
    if (inMyLectureTableCount <= PAGE_SIZE) {
      setShowSeeMore(false);
      return;
    }

    setShowSeeMore(true);
  };

  const onClickSeeMore = async () => {
    const currentPageNo = parseInt(params.pageNo);
    const nextPageNo = currentPageNo + 1;

    const limit = PAGE_SIZE;
    const offset = currentPageNo * PAGE_SIZE;

    requestInMyLecturesWithPage({ offset, limit });

    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);

    history.replace(`./${nextPageNo}`);
  };

  // table - sorting
  const initialOrders = headerColumns
    .filter((headerColumn) => headerColumn.icon === true)
    .map((headerColumn) => ({
      column: headerColumn.text,
      direction: Direction.DESC,
    }));

  const [orders, setOrders] = useState<Order[]>(initialOrders);

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
    inMyLectureService!.sortTableViews(column, direction);
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

  return (
    <>
      {((!resultEmpty || filterCount > 0) && (
        <>
          <TabHeader
            resultEmpty={resultEmpty}
            totalCount={inMyLectureTableCount}
            filterOpotions={filterOptions}
          >
            <div
              className="list-number"
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  '총 <strong>{totalCount}개</strong>의 리스트가 있습니다.',
                  'learning-학보드-게시물총수',
                  {
                    totalCount: (inMyLectureTableCount || 0).toString(),
                  }
                ),
              }}
            />
          </TabHeader>
          <FilterBoxContainer />
        </>
      )) || <div style={{ marginTop: 50 }} />}
      {inMyLectureTableViews && inMyLectureTableViews.length > 0 && (
        <>
          {(!resultEmpty && (
            <>
              <div className="mylearning-list-wrap">
                <Table className="ml-02-03">
                  <colgroup>
                    <col width="8%" />
                    <col width="12%" />
                    <col width="20%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                  </colgroup>

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
                    {inMyLectureTableViews.map((inMyLecture, index) => {
                      const learningType =
                        LearningTypeName[inMyLecture.cubeType];
                      const collegeName = getCollgeName(
                        inMyLecture.category.collegeId
                      );
                      const learningState =
                        (inMyLecture.learningState &&
                          LearningStateName[inMyLecture.learningState]) ||
                        '-';
                      const progressRate =
                        (inMyLecture.learningState &&
                          `${inMyLecture.passedLearningCount}/${inMyLecture.totalLearningCount}`) ||
                        '-';

                      return (
                        <Table.Row key={`inMyLecture-list-${index}`}>
                          <Table.Cell>
                            {inMyLectureTableCount - index}
                          </Table.Cell>
                          <Table.Cell>{collegeName}</Table.Cell>
                          <Table.Cell className="title">
                            <a
                              href="#"
                              onClick={(e) =>
                                onViewDetail(e, inMyLecture.serviceId)
                              }
                            >
                              <span
                                className={`ellipsis ${
                                  inMyLecture.useNote ? 'noteOn' : ''
                                }`}
                              >
                                {parsePolyglotString(inMyLecture.name)}
                              </span>
                            </a>
                          </Table.Cell>
                          <Table.Cell>{learningType || '-'} </Table.Cell>
                          <Table.Cell>
                            {inMyLecture.difficultyLevel || '-'}
                          </Table.Cell>
                          <Table.Cell>
                            {timeToHourMinutePaddingFormat(
                              inMyLecture.learningTime
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            {convertTimeToDate(inMyLecture.lastStudyDate)}
                          </Table.Cell>
                          <Table.Cell>{progressRate}</Table.Cell>
                          <Table.Cell>
                            {stateNamePolytglot(learningState)}
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
            <Segment
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                height: 400,
                boxShadow: '0 0 0 0',
                border: 0,
              }}
            >
              <Loadingpanel loading={isLoading} />
              {!isLoading && (
                <NoSuchContentPanel
                  message={getPolyglotText(
                    '필터 조건에 해당하는 결과가 없습니다.',
                    'mapg-msmp-검색x3'
                  )}
                />
              )}
            </Segment>
          )}
        </>
      )}
    </>
  );
}

export default inject(
  mobxHelper.injectFrom(
    'myTraining.inMyLectureService',
    'shared.filterBoxService'
  )
)(observer(InMyListPageContainer));

const PAGE_SIZE = 20;
