import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper, Offset } from '@nara.platform/accent';
import ReactGA from 'react-ga';
import { Segment, Table } from 'semantic-ui-react';
import { SeeMoreButton } from '../../../../lecture';
import { TabHeader } from '../../../ui/view/tabHeader';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { MyTrainingRouteParams } from '../../../routeParams';
import { scrollSave, useScrollMove } from '../../../useScrollMove';
import TableHeaderColumn, {
  inProgressPolyglot,
} from '../../../ui/model/TableHeaderColumn';
import { Loadingpanel, NoSuchContentPanel } from '../../../../shared';
import { getChannelName } from 'shared/service/useCollege/useRequestCollege';
import { AplModel } from 'myTraining/model';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import AplService from 'myTraining/present/logic/AplService';
import routePaths from 'myTraining/routePaths';
import { AplState } from 'myTraining/model/AplState';
import { aplStateNamePolyglotText } from 'myTraining/model/AplStateName';
import moment from 'moment';
import NoSuchContentsView from 'myTraining/ui/view/NoSuchContentsView';

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

  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
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
    const offsetApl = await findAllAplsByQuery();
    const isEmpty = offsetApl.results.length === 0 ? true : false;
    setResultEmpty(isEmpty);
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
      {(!resultEmpty && (
        <TabHeader resultEmpty={resultEmpty} totalCount={aplTableCount}>
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
      )) || <div style={{ marginTop: 50 }} />}
      {(aplTableViews && aplTableViews.length > 0 && (
        <>
          {(!resultEmpty && (
            <>
              <div className="mylearning-list-wrap">
                <Table className="ml-02-09">
                  <colgroup>
                    <col width="10%" />
                    <col width="25%" />
                    <col width="15%" />
                    <col width="10%" />
                    <col width="5%" />
                    <col width="15%" />
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
                          </Table.HeaderCell>
                        ))}
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {aplTableViews.map((apl, index) => {
                      const channelName = getChannelName(apl.channelId);
                      return (
                        <Table.Row key={`personalCompleted-list-${index}`}>
                          <Table.Cell>{aplTableCount - index}</Table.Cell>
                          <Table.Cell className="title">
                            <a onClick={() => onClickItem('learning', apl.id)}>
                              <span className="ellipsis">{apl.title}</span>
                            </a>{' '}
                          </Table.Cell>
                          <Table.Cell>
                            <span className="ellipsis">{channelName}</span>
                          </Table.Cell>
                          <Table.Cell>{getAllowTime(apl)}</Table.Cell>
                          <Table.Cell>
                            {parsePolyglotString(
                              apl.approvalUserIdentity?.name
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            {apl.approvalUserIdentity?.email || '-'}
                          </Table.Cell>
                          <Table.Cell>
                            {aplStateNamePolyglotText(apl.state)}
                          </Table.Cell>
                          <Table.Cell>{getApprovalTime(apl)}</Table.Cell>
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
                '승인된 개인학습 정보가 없습니다.',
                'learning-my-승인'
              )}
            />
          )}
        </>
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
