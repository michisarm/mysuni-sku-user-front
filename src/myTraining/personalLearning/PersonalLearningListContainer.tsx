import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Offset } from '@nara.platform/accent';
import { AplService } from 'myTraining/stores';
import { MyApprovalContentType } from '../ui/model/MyApprovalContentType';
import { SeeMoreButton } from 'lecture';
import {
  ListLeftTopPanel,
  ListRightTopPanel,
  ListTopPanelTemplate,
} from '../ui/view/panel';
import { NoSuchContentPanel } from 'shared';
import { MyApprovalRouteParams } from '../model/MyApprovalRouteParams';
import { PersonalLearningListView } from './PersonalLearningListView';
import routePaths from '../routePaths';
import NoSuchContentPanelMessages, {
  nosuchMessagesPolyglot,
} from '../ui/model/NoSuchContentPanelMessages';
import MyLearningListHeaderView from '../ui/view/table/MyLearningListHeaderView';
import MyLearningListTemplate from '../ui/view/table/MyLearningListTemplate';
import { onClickItem } from './personalLearningList.events';

function PersonalLearningListContainer() {
  const aplService = AplService.instance;
  const { apls: offsetApl, aplCount } = aplService;

  const history = useHistory();
  const params = useParams<MyApprovalRouteParams>();

  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [viewType, setViewType] = useState<ApprovalViewType>('');

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });

  useEffect(() => {
    initPage();
    fetchModelsByViewType(viewType);

    return () => clearStore();
  }, [viewType]);

  const initPage = () => {
    initPageInfo();
    initPageNo();
  };

  const initPageInfo = (): void => {
    pageInfo.current = { offset: 0, limit: 20 };
  };

  const initPageNo = (): void => {
    history.push(routePaths.currentPage(1));
  };

  const getPageNo = (): number => {
    const currentPageNo = params.pageNo;
    if (currentPageNo) {
      const nextPageNo = parseInt(currentPageNo) + 1;
      return nextPageNo;
    }

    return 1;
  };

  const clearStore = (): void => {
    aplService!.clearApls();
  };

  const initStore = (): void => {
    aplService!.initQueryModel();
  };

  const fetchModelsByViewType = async (viewType: ApprovalViewType) => {
    initStore();
    await aplService!.findAllAplsForApproval(viewType);
    checkShowSeeMore();
  };

  const checkShowSeeMore = () => {
    if (offsetApl.results.length >= offsetApl.totalCount) {
      setShowSeeMore(false);
      return;
    }
    if (offsetApl.totalCount <= PAGE_SIZE) {
      setShowSeeMore(false);
      return;
    }

    setShowSeeMore(true);
  };

  const onChangeViewType = useCallback((e: any, data: any) => {
    setViewType(data.value);
  }, []);

  const onClickSeeMore = useCallback(async () => {
    pageInfo.current.offset += pageInfo.current.limit;
    pageInfo.current.limit = PAGE_SIZE;
    await aplService!.findAllAplsWithPage(pageInfo.current);

    checkShowSeeMore();
    history.replace(routePaths.currentPage(getPageNo()));
  }, []);

  const message = nosuchMessagesPolyglot(params.tab);

  return (
    <div className="confirm-list-wrap">
      <ListTopPanelTemplate
        className="list-top"
        contentType={MyApprovalContentType.PersonalLearning}
      >
        {offsetApl && offsetApl.results && offsetApl.results.length > 0 && (
          <ListLeftTopPanel contentType={params.tab} countModel={aplCount} />
        )}
        <ListRightTopPanel
          contentType={params.tab}
          checkedViewType={viewType}
          onChangeViewType={onChangeViewType}
        />
      </ListTopPanelTemplate>
      {(offsetApl && offsetApl.results && offsetApl.results.length > 0 && (
        <MyLearningListTemplate contentType={params.tab}>
          <MyLearningListHeaderView contentType={params.tab} />
          <PersonalLearningListView
            apls={offsetApl.results}
            totalCount={offsetApl.totalCount}
            onClickItem={onClickItem}
          />
        </MyLearningListTemplate>
      )) || <NoSuchContentPanel message={message} />}
      {showSeeMore && <SeeMoreButton onClick={onClickSeeMore} />}
    </div>
  );
}

export default observer(PersonalLearningListContainer);

export type ApprovalViewType = '' | 'OpenApproval' | 'Opened' | 'Rejected';
const PAGE_SIZE = 20;
