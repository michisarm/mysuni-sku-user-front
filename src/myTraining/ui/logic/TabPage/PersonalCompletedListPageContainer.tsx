import { mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { AplModel } from 'myTraining/model';
import { AplState } from 'myTraining/model/AplState';
import AplService from 'myTraining/present/logic/AplService';
import routePaths from 'myTraining/routePaths';
import NoSuchContentsView from 'myTraining/ui/view/NoSuchContentsView';
import { PersonalCompletedListPageTableView } from 'myTraining/ui/view/table/PersonalCompletedListPageTableView';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useHistory, useParams } from 'react-router-dom';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { MyTrainingRouteParams } from '../../../routeParams';
import TableHeaderColumn from '../../../ui/model/TableHeaderColumn';
import { TabHeader } from '../../../ui/view/tabHeader';
import { scrollSave, useScrollMove } from '../../../useScrollMove';

interface PersonalCompletedListPageContainerProps {
  aplService?: AplService;
}

function PersonalCompletedListPageContainer({
  aplService,
}: PersonalCompletedListPageContainerProps) {
  //

  // ------------------------------------------------- init -------------------------------------------------
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;
  const headerColumns = TableHeaderColumn.getColumnsByContentType(contentType);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);

  const {
    apls: { results: aplTableViews },
    aplCount: { all: aplTableCount },
    findAllAplsByQuery,
    findAllAplsWithPage,
    clearAplQueryProps,
    clearApls,
  } = aplService!;

  const useRequestAplList = async () => {
    const params = useParams<MyTrainingRouteParams>();
    const { scrollOnceMove } = useScrollMove();

    useEffect(() => {
      if (params.pageNo === '1') {
        requestAplList();
        return;
      }
      const currentPageNo = parseInt(params.pageNo);
      const limit = currentPageNo * PAGE_SIZE;
      requestAplListWithPage(0, limit);
      scrollOnceMove();
      return () => {
        clearAplQueryProps();
        clearApls();
      };
    }, []);
  };

  useRequestAplList();

  const requestAplList = async () => {
    setIsLoading(true);
    await findAllAplsByQuery();
    checkShowSeeMore();
    setIsLoading(false);
  };

  const requestAplListWithPage = async (offset: number, limit: number) => {
    setIsLoading(true);
    await findAllAplsWithPage({ offset, limit });
    checkShowSeeMore();
    setIsLoading(false);
  };

  // ------------------------------------------------- header -------------------------------------------------

  // ------------------------------------------------- header - filter -------------------------------------------------

  // ------------------------------------------------- table -------------------------------------------------

  const onClickItem = (page: string, id: string) => {
    scrollSave();
    history.push(routePaths.approvalPersonalLearningDetail(page, id));
  };

  const getAllowTime = (model: AplModel): string => {
    switch (model.state) {
      case AplState.Opened:
        if (model.updateHour || model.updateMinute) {
          return `${model.updateHour}시 ${model.updateMinute}분`;
        }
        return model.allowHour || model.allowMinute
          ? `${model.allowHour}시 ${model.allowMinute}분`
          : '-';
      case AplState.Rejected:
        return model.allowHour || model.allowMinute
          ? `${model.allowHour}시 ${model.allowMinute}분`
          : '-';
      case AplState.OpenApproval:
        return model.requestHour || model.requestMinute
          ? `${model.requestHour}시 ${model.requestMinute}분`
          : '-';
    }

    return '-';
  };

  const getApprovalTime = (model: AplModel): string => {
    if (model.state === AplState.Opened) {
      if (model.modifiedTime) {
        return moment(model.modifiedTime).format('YYYY.MM.DD');
      } else {
        return model.allowTime
          ? moment(model.allowTime).format('YYYY.MM.DD')
          : '-';
      }
    }

    if (model.state === AplState.Rejected) {
      return model.allowTime
        ? moment(model.allowTime).format('YYYY.MM.DD')
        : '-';
    }

    return '-';
  };

  const checkShowSeeMore = (): void => {
    setShowSeeMore((aplTableCount > aplTableViews.length && true) || false);
  };

  const onClickSeeMore = async () => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);

    const currentPageNo = parseInt(params.pageNo);
    const nextPageNo = currentPageNo + 1;

    const limit = PAGE_SIZE;
    const offset = currentPageNo * PAGE_SIZE;

    requestAplListWithPage(offset, limit);

    history.replace(`./${nextPageNo}`);
  };

  // ------------------------------------------------- contents -------------------------------------------------

  // ------------------------------------------------- modal -------------------------------------------------

  // ------------------------------------------------- etc -------------------------------------------------

  return (
    <>
      {
        <TabHeader
          resultEmpty={!(aplTableCount > 0)}
          totalCount={aplTableCount}
        >
          <div
            className="list-number"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                '전체 <strong>{count}개<strong>의 개인학습',
                'learning-개인보드-전체',
                { count: aplTableCount + '' || 0 + '' }
              ),
            }}
          />
        </TabHeader>
      }
      {(aplTableCount > 0 && (
        <PersonalCompletedListPageTableView
          totalCount={aplTableCount}
          headerColumns={headerColumns}
          learningList={aplTableViews}
          showSeeMore={showSeeMore}
          onClickRow={onClickItem}
          onClickSeeMore={onClickSeeMore}
          getApprovalTime={getApprovalTime}
          getAllowTime={getAllowTime}
        />
      )) || (
        <NoSuchContentsView
          isLoading={isLoading}
          emptyText={getPolyglotText(
            '승인된 개인학습 정보가 없습니다.',
            'learning-my-승인'
          )}
        />
      )}
    </>
  );
}

export default inject(mobxHelper.injectFrom('myTraining.aplService'))(
  observer(PersonalCompletedListPageContainer)
);

const PAGE_SIZE = 20;
