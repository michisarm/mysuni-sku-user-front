import { mobxHelper, Offset } from '@nara.platform/accent';
import LectureParams, { toPath } from 'lecture/detail/viewModel/LectureParams';
import { inject, observer } from 'mobx-react';
import { MyTrainingTableViewModel } from 'myTraining/model';
import NoSuchContentsView from 'myTraining/ui/view/NoSuchContentsView';
import { EnrolledListPageTableView } from 'myTraining/ui/view/table/EnrolledListPageTableView';
import { PersonalCubeService } from 'personalcube/personalcube/stores';
import React, { useCallback, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useHistory, useParams } from 'react-router-dom';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { Direction, toggleDirection } from '../../../model/Direction';
import { Order } from '../../../model/Order';
import { MyTrainingRouteParams } from '../../../routeParams';
import { MyTrainingService } from '../../../stores';
import { MyLearningContentType } from '../../../ui/model';
import TableHeaderColumn from '../../../ui/model/TableHeaderColumn';
import { TabHeader } from '../../../ui/view/tabHeader';
import { useScrollMove } from '../../../useScrollMove';

interface EnrolledListPageContainerProps {
  myTrainingService?: MyTrainingService;
  personalCubeService?: PersonalCubeService;
}

function EnrolledListPageContainer({
  myTrainingService,
  personalCubeService,
}: EnrolledListPageContainerProps) {
  //

  // ------------------------------------------------- init -------------------------------------------------
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { scrollOnceMove, scrollSave } = useScrollMove();

  const { myTrainingTableViews, myTrainingTableCount2 } = myTrainingService!;
  const { enrolledCount } = personalCubeService!;

  const headerColumns = TableHeaderColumn.getColumnsByContentType(contentType);

  const initialOrders = headerColumns
    .filter((headerColumn) => headerColumn.icon === true)
    .map((headerColumn) => ({
      column: headerColumn.text,
      direction: Direction.DESC,
    }));

  const [orders, setOrders] = useState<Order[]>(initialOrders);

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
      {
        <TabHeader
          resultEmpty={!(enrolledCount > 0)}
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
      }
      {enrolledCount > 0 && (
        <>
          {(myTrainingTableCount2 > 0 && (
            <EnrolledListPageTableView
              totalCount={myTrainingTableCount2}
              headerColumns={headerColumns}
              learningList={myTrainingTableViews}
              showSeeMore={showSeeMore}
              onClickRow={onViewDetail}
              onClickSeeMore={onClickSeeMore}
              getOrderIcon={getOrderIcon}
              onClickSort={handleClickSort}
            />
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

export default inject(
  mobxHelper.injectFrom(
    'myTraining.myTrainingService',
    'personalCube.personalCubeService'
  )
)(observer(EnrolledListPageContainer));

const PAGE_SIZE = 20;
