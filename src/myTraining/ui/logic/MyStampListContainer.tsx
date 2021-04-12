import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Segment } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import { MyPageRouteParams } from '../../model/MyPageRouteParams';
import { inject, observer } from 'mobx-react';
import { Offset, mobxHelper } from '@nara.platform/accent';
import ReactGA from 'react-ga';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import { SeeMoreButton } from '../../../lecture';
import { Loadingpanel, NoSuchContentPanel } from '../../../shared';
import NoSuchContentPanelMessages from '../model/NoSuchContentPanelMessages';
import { MyPageContentType } from '../model/MyPageContentType';
import { Direction } from '../../model/Direction';
import MyStampListView from '../view/MyStampListView';
import MyStampService from '../../present/logic/MyStampService';
import MyStampFilterBoxContainer from './MyStampFilterBoxContainer';
import FilterBoxService from '../../../shared/present/logic/FilterBoxService';
import MyLearningListHeaderView from '../view/table/MyLearningListHeaderView';
import MyLearningListTemplate from '../view/table/MyLearningListTemplate';
import FilterCountService from '../../present/logic/FilterCountService';


interface MyStampListContainerProps {
  myStampService?: MyStampService;
  filterCountService?: FilterCountService;
  filterBoxService?: FilterBoxService;
}


function MyStampListContainer({
  myStampService,
  filterCountService,
  filterBoxService,
}: MyStampListContainerProps) {
  const history = useHistory();
  const params = useParams<MyPageRouteParams>();
  const contentType = params.tab;

  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });

  const { myStamps, myStampCount } = myStampService!;
  const { filterCount } = filterBoxService!;


  useEffect(() => {
    fetchStamps();
    filterCountService!.findAllFilterCountViews(contentType);

    return () => {
      myStampService!.clearAllMyStamps();
      filterCountService!.clearAllFilterCountViews();
    }
  }, []);

  const fetchStamps = async () => {
    myStampService!.initFilterRdo();

    setIsLoading(true);
    const isEmpty = await myStampService!.findAllMyStamps(pageInfo.current);
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  };

  const fetchStampsByConditions = async () => {
    setIsLoading(true);
    const isEmpty = await myStampService!.findAllMyStampsByCondition();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  }

  const getStampsByConditions = (count: number) => {
    if (count > 0) {
      fetchStampsByConditions();
    } else {
      fetchStamps();
    }
  };

  const getNextPageNo = (): number => {
    const currentPageNo = params.pageNo;
    if (currentPageNo) {
      const nextPageNo = parseInt(currentPageNo) + 1;
      return nextPageNo;
    }
    return 1;
  };

  const onClickSort = useCallback((column: string, direction: Direction) => {
          myStampService!.sortMyStamps(column, direction);
      }, []);

  const onClickSeeMore = useCallback(async () => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);

    pageInfo.current.limit = PAGE_SIZE;
    pageInfo.current.offset += pageInfo.current.limit;

    history.replace(`./${getNextPageNo()}`);
    
    sessionStorage.setItem('learningOffset', JSON.stringify(pageInfo.current));
    await myStampService!.findAllMyStampsWithPage(pageInfo.current);

    setIsLoading(false);
    checkShowSeeMore();
  
  }, [contentType, pageInfo.current, params.pageNo]);

  const checkShowSeeMore = (): void => {
    const { myStamps, myStampCount } = myStampService!;

    if (myStamps.length >= myStampCount) {
      setShowSeeMore(false);
      return;
    }
    if (myStampCount <= PAGE_SIZE) {
      setShowSeeMore(false);
      return;
    }

    setShowSeeMore(true);
  };


  const noSuchMessage = (
    contentType: MyPageContentType,
    withFilter: boolean = false
  ) => {
    return (
      (withFilter && '필터 조건에 해당하는 결과가 없습니다.') ||
      NoSuchContentPanelMessages.getMessageByConentType(contentType)
    );
  };

  return (
    <>
      {((!resultEmpty || filterCount > 0) && (
        <>
          <LineHeaderContainerV2
            contentType={contentType}
            resultEmpty={resultEmpty}
            totalCount={myStampCount}
          />
          <MyStampFilterBoxContainer
            getModels={getStampsByConditions}
          />
        </>
      )) || <div style={{ marginTop: 50 }} />}
      {
        myStamps &&
        myStamps.length > 0 && (
          <>
            {(!resultEmpty && (
              <>
                <MyLearningListTemplate>
                  <MyLearningListHeaderView
                    contentType={contentType}
                    onClickSort={onClickSort}
                  />
                  <MyStampListView
                    myStamps={myStamps}
                    totalCount={myStampCount}
                  />
                </MyLearningListTemplate>
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
                    message={noSuchMessage(contentType, true)}
                  />
                )}
              </Segment>
            )}
          </>
      ) || (
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
              message={noSuchMessage(contentType)}
            />
          )}
        </Segment>
      )}
    </>
  );
}

export default inject(
  mobxHelper.injectFrom(
    'myTraining.myStampService',
    'myTraining.filterCountService',
    'shared.filterBoxService',
  )
)(observer(MyStampListContainer));

const PAGE_SIZE = 20;