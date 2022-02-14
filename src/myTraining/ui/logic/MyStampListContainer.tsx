import { mobxHelper } from '@nara.platform/accent';
import LectureParams, { toPath } from 'lecture/detail/viewModel/LectureParams';
import CardForUserViewModel from 'lecture/model/learning/CardForUserViewModel';
import CardOrderBy from 'lecture/model/learning/CardOrderBy';
import CardQdo from 'lecture/model/learning/CardQdo';
import StudentLearningType from 'lecture/model/learning/StudentLearningType';
import { inject, observer } from 'mobx-react';
import { Direction, toggleDirection } from 'myTraining/model/Direction';
import { MyStampXlsxModel } from 'myTraining/model/MyStampXlsxModel';
import { Order } from 'myTraining/model/Order';
import React, { useEffect, useState, useCallback } from 'react';
import ReactGA from 'react-ga';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { getCollgeName } from 'shared/service/useCollege/useRequestCollege';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { Area } from 'tracker/model';
import XLSX from 'xlsx';
import { LectureService } from '../../../lecture';
import FilterBoxService from '../../../shared/present/logic/FilterBoxService';
import { MyPageRouteParams } from '../../model/MyPageRouteParams';
import myTrainingRoutePaths from '../../routePaths';
import { useScrollMove } from '../../useScrollMove';
import TableHeaderColumn from '../model/TableHeaderColumn';
import NoSuchContentsView from '../view/NoSuchContentsView';
import { TabHeader } from '../view/tabHeader';
import { MyStampPageTableView } from '../view/table/MyStampPageTableView';

interface MyStampListContainerProps {
  lectureService?: LectureService;
  filterBoxService?: FilterBoxService;
}

function MyStampListContainer({
  lectureService,
  filterBoxService,
}: MyStampListContainerProps) {
  // ------------------------------------------------- init -------------------------------------------------
  const history = useHistory();
  const params = useParams<MyPageRouteParams>();
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
    countMyStamp,
    myStampCount,
    myLearningCards,
    totalMyLearningCardCount,
    cardQdo,
    setCardQdo,
    findMyLearningCardByQdo,
    clearMyLearningCard,
    sortMyLearningTableViews,
  } = lectureService!;

  const { conditions, showResult, filterCount, openFilter, setOpenFilter } =
    filterBoxService!;

  const clearQdo = () => {
    const newCardQdo = new CardQdo();
    newCardQdo.limit = parseInt(params.pageNo) * PAGE_SIZE;
    newCardQdo.offset = 0;
    newCardQdo.studentLearning = StudentLearningType.LearningCompleted;
    newCardQdo.hasStamp = true;
    newCardQdo.ignoreAccessRule = true;
    newCardQdo.orderBy = CardOrderBy.StudentPassedTimeDesc;

    return newCardQdo;
  };

  const excelQdo = () => {
    const newCardQdo = new CardQdo();
    newCardQdo.limit = 999999;
    newCardQdo.offset = 0;
    newCardQdo.studentLearning = StudentLearningType.LearningCompleted;
    newCardQdo.hasStamp = true;
    newCardQdo.ignoreAccessRule = true;
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
    await countMyStamp();
    await setIsLoading(true);
    await setCardQdo(qdo);
    await findMyLearningCardByQdo(firstCheck);
    // column && direction && (await sortMyLearningTableViews(column, direction));
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
    const filename = 'MyPage_MyStamp';

    xlsxList =
      (tableViews &&
        tableViews.length > 0 &&
        tableViews.map((view, index) => {
          const collegeName =
            (view.mainCollegeId && getCollgeName(view.mainCollegeId)) || '';
          return view.toXlsxForMyStamp(lastIndex - index, collegeName);
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
    newQdo.hasStamp = true;
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

  const moveToLearningList = useCallback(() => {
    history.push(myTrainingRoutePaths.learningInProgress());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      scrollOnceMove();
    }, 200);
  }, [scrollOnceMove]);

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
      <div
        className="mypage_contents my-stamp-list"
        data-area={Area.MYPAGE_STAMP}
      >
        <strong className="mypage_title">
          <PolyglotText id="mapg-msmp-Stamp" defaultString="My Stamp" />
        </strong>
        <div className="ui segment full">
          <TabHeader
            resultEmpty={!(myStampCount > 0)}
            totalCount={totalMyLearningCardCount}
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
          {(myStampCount > 0 && (
            <>
              {(totalMyLearningCardCount > 0 && (
                <>
                  <MyStampPageTableView
                    totalCount={totalMyLearningCardCount}
                    headerColumns={headerColumns}
                    learningList={myLearningCards}
                    showSeeMore={showSeeMore}
                    onClickRow={onViewDetail}
                    onClickSeeMore={onClickSeeMore}
                    getOrderIcon={getOrderIcon}
                    onClickSort={handleClickSort}
                  />
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
            <NoSuchContentsView isLoading={isLoading}>
              <Segment className="full">
                <div className="table-wrapper">
                  <div className="community_nodata">
                    <Icon className="no-contents80" />
                    <p
                      dangerouslySetInnerHTML={{
                        __html: getPolyglotText(
                          `획득한 Stamp가 없습니다.<br/>Stamp가 있는 학습 과정을 찾아보세요.`,
                          'mapg-msmp-Stamp설명'
                        ),
                      }}
                    />
                    <Button
                      icon
                      className="right btn-blue2"
                      onClick={moveToLearningList}
                    >
                      <span className="border">
                        <PolyglotText
                          id="mapg-msmp-바로가기"
                          defaultString="Learning 학습중 바로가기"
                        />
                      </span>
                      <Icon className="morelink" />
                    </Button>
                  </div>
                </div>
              </Segment>
            </NoSuchContentsView>
          )}
        </div>
      </div>
    </>
  );
}

export default inject(
  mobxHelper.injectFrom('lecture.lectureService', 'shared.filterBoxService')
)(observer(MyStampListContainer));

const PAGE_SIZE = 20;

export type MyXlsxList = MyStampXlsxModel[];
