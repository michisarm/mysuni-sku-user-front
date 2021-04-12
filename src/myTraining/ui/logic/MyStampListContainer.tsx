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
import FilterBoxService from '../../../shared/present/logic/FilterBoxService';
import MyLearningListHeaderView from '../view/table/MyLearningListHeaderView';
import MyLearningListTemplate from '../view/table/MyLearningListTemplate';
import { useRequestFilterCountView } from '../../service/useRequestFilterCountView';
import FilterBoxContainer from './FilterBoxContainer';


interface MyStampListContainerProps {
  myStampService?: MyStampService;
  filterBoxService?: FilterBoxService;
}


function MyStampListContainer({
  myStampService,
  filterBoxService,
}: MyStampListContainerProps) {
  const history = useHistory();
  const params = useParams<MyPageRouteParams>();
  const contentType = params.tab;

  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { myStamps, myStampCount } = myStampService!;
  const { conditions, showResult, filterCount } = filterBoxService!;

  useRequestFilterCountView();

  useEffect(() => {
    requestStamps();

    return () => {
      myStampService!.clearAllMyStamps();
    }
  }, []);

  useEffect(() => {
    if(showResult) {
      myStampService!.setFilterRdoByConditions(conditions);
      requestStampsByConditions();
    }

  }, [showResult]);

  useEffect(() => {
    if(params.pageNo === '1') {
      return;
    }

    requestStampsWithPage();
  }, [params.pageNo]);

  const requestStamps = async () => {
    myStampService!.initFilterRdo();

    setIsLoading(true);
    const isEmpty = await myStampService!.findAllMyStamps();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  };

  const requestStampsByConditions = async () => {
    setIsLoading(true);
    const isEmpty = await myStampService!.findAllMyStampsByCondition();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
    history.replace('./1');
  }

  const requestStampsWithPage = async () => {
    const currentPageNo = parseInt(params.pageNo);

    const limit = PAGE_SIZE;
    const offset = (currentPageNo - 1) * PAGE_SIZE;

    setIsLoading(true);
    await myStampService!.findAllMyStampsWithPage({ limit, offset });
    checkShowSeeMore(); 
    setIsLoading(false)
  }

  const onClickSort = useCallback((column: string, direction: Direction) => {
    myStampService!.sortMyStamps(column, direction);
  }, []);

  const onClickSeeMore = () => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);

    const currentPageNo = parseInt(params.tab);
    const nextPageNo = currentPageNo + 1;


    history.replace(`./${nextPageNo}`);
  }

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
          <FilterBoxContainer />
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
    'shared.filterBoxService',
  )
)(observer(MyStampListContainer));

const PAGE_SIZE = 20;