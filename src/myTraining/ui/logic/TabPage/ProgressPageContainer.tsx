import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper, Offset } from '@nara.platform/accent';
import ReactGA from 'react-ga';
import { Checkbox, Icon, Segment, Table } from 'semantic-ui-react';
import XLSX from 'xlsx';
import { MyTrainingService } from '../../../stores';
import MyLearningDeleteModal from '../../view/MyLearningDeleteModal';
import MyLearningDeleteFinishModal from '../../view/MyLearningDeleteFinishModal';
import MyLearningNoCheckModal from '../../view/MyLearningNoCheckModal';
import { SeeMoreButton, StudentService } from '../../../../lecture';
import { TabHeader } from '../../../ui/view/tabHeader';
import FilterBoxService from '../../../../shared/present/logic/FilterBoxService';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import FilterBoxContainer from '../FilterBoxContainer';
import { MyTrainingRouteParams } from '../../../routeParams';
import { useScrollMove } from '../../../useScrollMove';
import { Direction, toggleDirection } from '../../../model/Direction';
import TableHeaderColumn, {
  inProgressPolyglot,
} from '../../../ui/model/TableHeaderColumn';
import { MyLearningContentType } from '../../../ui/model';
import { Order } from '../../../model/Order';
import { LearningType, LearningTypeName } from '../../../model/LearningType';
import {
  convertTimeToDate,
  timeToHourMinutePaddingFormat,
} from '../../../../shared/helper/dateTimeHelper';
import { Loadingpanel, NoSuchContentPanel } from '../../../../shared';
import { SkProfileService } from '../../../../profile/stores';
import { getCollgeName } from 'shared/service/useCollege/useRequestCollege';
import LectureParams, { toPath } from 'lecture/detail/viewModel/LectureParams';
import { MyTrainingTableViewModel } from 'myTraining/model';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { useRequestFilterCountView } from 'myTraining/service/useRequestFilterCountView';
import { InProgressXlsxModel } from 'myTraining/model/InProgressXlsxModel';
import { MyContentType } from 'myTraining/ui/model/MyContentType';
import { MyPageContentType } from '../../model/MyPageContentType';
import MyStampService from 'myTraining/present/logic/MyStampService';
import NoSuchContentsView from 'myTraining/ui/view/NoSuchContentsView';

interface ProgressPageContainerProps {
  skProfileService?: SkProfileService;
  myTrainingService?: MyTrainingService;
  studentService?: StudentService;
  filterBoxService?: FilterBoxService;
  myStampService?: MyStampService;
}

function ProgressPageContainer({
  skProfileService,
  myTrainingService,
  studentService,
  filterBoxService,
  myStampService,
}: ProgressPageContainerProps) {
  //

  // ------------------------------------------------- init -------------------------------------------------
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  const { profileMemberName } = skProfileService!;
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

  const {
    myTrainingTableViews,
    myTrainingTableCount,
    selectedServiceIds,
    clearOne,
    selectOne,
  } = myTrainingService!;
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

  const requestmyTrainingsWithPage = async (offset: Offset) => {
    setIsLoading(true);
    await myTrainingService!.findAllTableViewsWithPage(offset);
    checkShowSeeMore();
    setIsLoading(false);
    scrollOnceMove();
  };

  const requestMyTrainings = async () => {
    setIsLoading(true);
    const isEmpty = await myTrainingService!.findAllTableViews();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  };

  // ------------------------------------------------- header -------------------------------------------------

  const onClickDelete = useCallback(() => {
    const { selectedServiceIds } = myTrainingService!;

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
    const myTrainingTableViews: MyTrainingTableViewModel[] =
      await myTrainingService!.findAllTableViewsForExcel();
    const lastIndex = myTrainingTableViews.length;
    let xlsxList: MyXlsxList = [];
    const filename = 'Learning_InProgress';

    xlsxList = myTrainingTableViews.map((myTrainingTableView, index) => {
      const collegeName =
        (myTrainingTableView.category?.collegeId &&
          getCollgeName(
            // myTrainingTableView.category.college.id
            myTrainingTableView.category.collegeId
          )) ||
        '';
      return myTrainingTableView.toXlsxForInProgress(
        lastIndex - index,
        collegeName
      );
    });

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
    const isEmpty = await myTrainingService!.findAllTableViewsByConditions();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
    history.replace('./1');
  };

  useEffect(() => {
    if (showResult) {
      myTrainingService!.setFilterRdoByConditions(conditions);
      requestMyTrainingsByConditions();
    }
  }, [showResult]);

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

  const onCheckAll = useCallback(
    (e: any, data: any) => {
      const { clearAll, selectAll } = myTrainingService!;

      if (myTrainingTableViews.length === selectedServiceIds.length) {
        clearAll();
        return;
      }

      selectAll();
    },
    [myTrainingTableViews, selectedServiceIds]
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
      myTrainingService!.sortTableViews(column, direction);
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

  // ------------------------------------------------- contents -------------------------------------------------

  const getLearningType = (type: LearningType) => {
    return LearningTypeName[type];
  };

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

  const noSuchLink = () => {
    return (
      (contentType === MyLearningContentType.InProgress && {
        text: `${profileMemberName} 님에게 추천하는 학습 과정 보기`,
        path: '/lecture/recommend',
      }) ||
      undefined
    );
  };

  // ------------------------------------------------- modal -------------------------------------------------
  const onCloseDeleteModal = useCallback(() => {
    setDeleteModal(false);
  }, []);

  const onConfirmModal = useCallback(async () => {
    const { selectedServiceIds } = myTrainingService!;

    const isHidden = await studentService!.hideWithSelectedServiceIds(
      selectedServiceIds
    );
    if (isHidden) {
      await updateInProgressStorage();
      myTrainingService!.findAllTabCount();
      myTrainingService!.findAllTableViews();
      myTrainingService!.clearAllSelectedServiceIds();
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
  const updateInProgressStorage = async () => {
    const inProgressTableViews =
      await myTrainingService!.findAllInProgressStorage();
    sessionStorage.setItem(
      'inProgressTableViews',
      JSON.stringify(inProgressTableViews)
    );
  };

  return (
    <>
      {((!resultEmpty || filterCount > 0) && (
        <>
          <TabHeader
            resultEmpty={resultEmpty}
            totalCount={myTrainingTableCount}
            filterOpotions={filterOptions}
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
                    totalCount: (myTrainingTableCount || 0).toString(),
                  }
                ),
              }}
            />
          </TabHeader>
          <FilterBoxContainer />
        </>
      )) || <div style={{ marginTop: 50 }} />}
      {(myTrainingTableViews && myTrainingTableViews.length > 0 && (
        <>
          {(!resultEmpty && (
            <>
              <div className="mylearning-list-wrap">
                <Table className="ml-02-02">
                  <colgroup>
                    <col width="4%" />
                    <col width="4%" />
                    <col width="15%" />
                    <col width="25%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                  </colgroup>

                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell className="ck">
                        <Checkbox
                          checked={
                            selectedServiceIds.length ===
                            myTrainingTableViews.length
                          }
                          onChange={onCheckAll}
                        />
                      </Table.HeaderCell>
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
                    {myTrainingTableViews.map((myTraining, index) => (
                      <Table.Row key={`mytraining-list-${index}`}>
                        <Table.Cell>
                          <Checkbox
                            value={myTraining.serviceId}
                            checked={selectedServiceIds.includes(
                              myTraining.serviceId
                            )}
                            onChange={onCheckOne}
                          />
                        </Table.Cell>
                        <Table.Cell>{myTrainingTableCount - index}</Table.Cell>
                        <Table.Cell>
                          {getCollgeName(myTraining.category?.collegeId || '')}
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
                              {parsePolyglotString(myTraining.name)}
                            </span>
                          </a>
                        </Table.Cell>
                        <Table.Cell>
                          {getLearningType(myTraining.cubeType) || '-'}{' '}
                        </Table.Cell>
                        <Table.Cell>
                          {myTraining.difficultyLevel || '-'}
                        </Table.Cell>
                        <Table.Cell>
                          {timeToHourMinutePaddingFormat(
                            myTraining.learningTime +
                              myTraining.additionalLearningTime
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          {convertTimeToDate(myTraining.modifiedTime)}
                        </Table.Cell>
                        <Table.Cell>
                          {`${myTraining.passedLearningCount}/${myTraining.totalLearningCount}`}
                        </Table.Cell>
                      </Table.Row>
                    ))}
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
    'profile.skProfileService',
    'lecture.studentService',
    'myTraining.myTrainingService',
    'shared.filterBoxService',
    'myTraining.myStampService'
  )
)(observer(ProgressPageContainer));

const PAGE_SIZE = 20;

export type MyXlsxList = InProgressXlsxModel[];
