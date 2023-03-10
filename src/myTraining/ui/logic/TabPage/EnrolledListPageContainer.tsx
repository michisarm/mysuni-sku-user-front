import { mobxHelper, Offset } from '@nara.platform/accent';
import { LectureService } from 'lecture';
import LectureParams, { toPath } from 'lecture/detail/viewModel/LectureParams';
import EnrolledCardModel from 'lecture/model/EnrolledCardModel';
import { inject, observer } from 'mobx-react';
import { MyTrainingTableViewModel } from 'myTraining/model';
import NoSuchContentsView from 'myTraining/ui/view/NoSuchContentsView';
import { EnrolledListPageTableView } from 'myTraining/ui/view/table/EnrolledListPageTableView';
import { PersonalCubeService } from 'personalcube/personalcube/stores';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
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
  lectureService?: LectureService;
}

function EnrolledListPageContainer({
  lectureService,
}: EnrolledListPageContainerProps) {
  //

  // ------------------------------------------------- init -------------------------------------------------
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { scrollOnceMove, scrollSave } = useScrollMove();

  const { enrolledCount, enrolledList, clearEnrolledList } = lectureService!;

  const headerColumns = TableHeaderColumn.getColumnsByContentType(contentType);

  const initialOrders = headerColumns
    .filter((headerColumn) => headerColumn.icon === true)
    .map((headerColumn) => ({
      column: headerColumn.text,
      direction: Direction.DESC,
    }));

  const [orders, setOrders] = useState<Order[]>(initialOrders);

  useEffect(() => {
    // myTrainingService!.clearAllTableViews();
    // myTrainingService!.initFilterRdo(contentType);

    clearEnrolledList();
    requestMyTrainings();
  }, [contentType]);

  const requestMyTrainings = async () => {
    setIsLoading(true);
    // await myTrainingService!.findEnrollTableViews();
    await lectureService!.findEnrolledList();
    setIsLoading(false);
    scrollOnceMove();
  };

  // const requestmyTrainingsWithPage = async (offset: Offset) => {
  //   setIsLoading(true);
  //   // await myTrainingService!.findAllTableViewsWithPage(offset);
  //   await lectureService!.findEnrolledList();
  //   // checkShowSeeMore();
  //   setIsLoading(false);
  //   scrollOnceMove();
  // };

  // ------------------------------------------------- header -------------------------------------------------

  // ------------------------------------------------- header - filter -------------------------------------------------

  // ------------------------------------------------- table -------------------------------------------------

  // const checkShowSeeMore = (): void => {
  //   const { myTrainingTableViews, myTrainingTableCount } = myTrainingService!;

  //   if (myTrainingTableViews.length >= myTrainingTableCount) {
  //     setShowSeeMore(false);
  //     return;
  //   }
  //   if (myTrainingTableCount <= PAGE_SIZE) {
  //     setShowSeeMore(false);
  //     return;
  //   }

  //   setShowSeeMore(true);
  // };

  // const onClickSeeMore = () => {
  //   setTimeout(() => {
  //     ReactGA.pageview(window.location.pathname, [], 'Learning');
  //   }, 1000);

  //   const currentPageNo = parseInt(params.pageNo);
  //   const nextPageNo = currentPageNo + 1;

  //   const limit = PAGE_SIZE;
  //   const offset = currentPageNo * PAGE_SIZE;

  //   requestmyTrainingsWithPage({ offset, limit });

  //   history.replace(`./${nextPageNo}`);
  // };

  // const intersectionCallback = useCallback(
  //   (entries: IntersectionObserverEntry[]) => {
  //     console.log(entries);
  //     entries.forEach((c) => {
  //       if (c.isIntersecting) {
  //         onClickSeeMore();
  //       }
  //     });
  //   },
  //   [onClickSeeMore]
  // );

  // const observer = useMemo<IntersectionObserver | null>(() => {
  //   const options = {
  //     threshold: 0.01,
  //   };
  //   if (window.IntersectionObserver !== undefined) {
  //     const next = new IntersectionObserver(intersectionCallback, options);
  //     return next;
  //   }

  //   return null;
  // }, [intersectionCallback]);

  // const seeMoreButtonViewRef = useCallback(
  //   (ref: HTMLDivElement | null) => {
  //     if (ref !== null) {
  //       observer?.observe(ref);
  //     } else {
  //       observer?.disconnect();
  //     }
  //   },
  //   [observer]
  // );

  const onClickSort = useCallback(
    (column: string, direction: Direction) => {
      lectureService!.sortEnrolledCards(column, direction);
    },
    [contentType]
  );

  const getDireciton = (column: string) => {
    return orders.filter((order) => order.column === column)[0]?.direction;
  };

  const getOrderIcon = (column: string, fromStyle: boolean = false) => {
    if (fromStyle) {
      return getDireciton(column) === Direction.DESC
        ? 'list-down16'
        : 'list-up16';
    }

    return getDireciton(column) === Direction.DESC
      ? '???????????? ??????'
      : '???????????? ??????';
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
  const onViewDetail = (e: any, card: EnrolledCardModel) => {
    e.preventDefault();

    const cardId = card.cardId || card.cubeId;

    const params: LectureParams = {
      cardId,
      viewType: 'view',
      pathname: '',
    };

    history.push(toPath(params));

    if (contentType === MyLearningContentType.InProgress) {
      ReactGA.event({
        category: getPolyglotText(
          '???????????? ??????',
          'MyTrainingList-?????????-??????'
        ),
        action: 'Click',
        label: `${
          card.type === card.cardId ? '(Card)' : '(Cube)'
        } - ${parsePolyglotString(card.name)}`,
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
          totalCount={enrolledCount}
        >
          <div
            className="list-number"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                '??? <strong>{totalCount}???</strong>??? ???????????? ????????????.',
                'learning-?????????-???????????????',
                {
                  totalCount: (enrolledCount || 0).toString(),
                }
              ),
            }}
          />
        </TabHeader>
      }
      {(enrolledCount > 0 && (
        <>
          {(enrolledCount > 0 && (
            <EnrolledListPageTableView
              totalCount={enrolledCount}
              headerColumns={headerColumns}
              learningList={enrolledList}
              showSeeMore={showSeeMore}
              onClickRow={onViewDetail}
              // onClickSeeMore={onClickSeeMore}
              getOrderIcon={getOrderIcon}
              onClickSort={handleClickSort}
              isLoading={isLoading}
              // seeMoreButtonViewRef={seeMoreButtonViewRef}
            />
          )) || (
            <NoSuchContentsView
              isLoading={isLoading}
              emptyText={getPolyglotText(
                '?????? ????????? ???????????? ????????? ????????????.',
                'mapg-msmp-??????x2'
              )}
            />
          )}
        </>
      )) || (
        <NoSuchContentsView
          isLoading={isLoading}
          emptyText={getPolyglotText(
            '??????????????? ????????? ????????????.',
            'learning-my-????????????'
          )}
        />
      )}
    </>
  );
}

export default inject(
  mobxHelper.injectFrom(
    // 'myTraining.myTrainingService',
    // 'personalCube.personalCubeService'
    'lecture.lectureService'
  )
)(observer(EnrolledListPageContainer));

const PAGE_SIZE = 20;
