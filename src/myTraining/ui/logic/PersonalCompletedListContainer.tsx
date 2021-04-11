import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Segment } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Offset, mobxHelper } from '@nara.platform/accent';
import ReactGA from 'react-ga';
import {
  AplService,
} from '../../stores';
import { MyTrainingRouteParams } from '../../model/MyTrainingRouteParams';
import NoSuchContentPanelMessages from '../model/NoSuchContentPanelMessages';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import { SeeMoreButton } from '../../../lecture';
import { Loadingpanel, NoSuchContentPanel } from '../../../shared';
import PersonalCompletedListView from '../view/PersonalCompletedListView';
import MyLearningListHeaderView from '../view/table/MyLearningListHeaderView';
import MyLearningListTemplate from '../view/table/MyLearningListTemplate';

interface PersonalCompletedListContainerProps {
  aplService?: AplService;
}

function PersonalCompletedListContainer({
  aplService,
}: PersonalCompletedListContainerProps) {
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;
  
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });

  const { apls: {results: aplTableViews }, aplCount: {all: aplTableCount } } = aplService!;

  useEffect(() => {
    fetchApls();

    return () => {
      aplService!.clearApls();
    }
  }, []);

  const fetchApls = async () => {
    aplService!.clearAplQueryProps();

    setIsLoading(true);
    const offsetApl = await aplService!.findAllAplsByQuery();
    const isEmpty = offsetApl.results.length === 0 ? true : false;
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  };

  const getNextPageNo = (): number => {
    const currentPageNo = params.pageNo;
    const nextPageNo = parseInt(currentPageNo) + 1;
    return nextPageNo;
  };


  const onClickSeeMore = useCallback(async () => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);

    pageInfo.current.limit = PAGE_SIZE;
    pageInfo.current.offset += pageInfo.current.limit;

    history.replace(`./${getNextPageNo()}`);
    
    sessionStorage.setItem('learningOffset', JSON.stringify(pageInfo.current));
    await aplService!.findAllAplsWithPage(pageInfo.current);

    setIsLoading(false);
    checkShowSeeMore();
  
  }, [contentType, pageInfo.current, params.pageNo]);

  const checkShowSeeMore = (): void => {
    const { apls: { results: aplTableViews }, aplCount: { all: aplTableCount } } = aplService!;

    if (aplTableViews.length >= aplTableCount) {
      setShowSeeMore(false);
      return;
    }
    if (aplTableCount <= PAGE_SIZE) {
      setShowSeeMore(false);
      return;
    }

    setShowSeeMore(true);
  };

  const noSuchMessage = NoSuchContentPanelMessages.getMessageByConentType(contentType);

  return (
    <>
      {
        !resultEmpty && (
          <>
            <LineHeaderContainerV2
              contentType={contentType}
              resultEmpty={resultEmpty}
              totalCount={aplTableCount}
            />
          </>
        ) || <div style={{ marginTop: 50 }} />}
      {
        aplTableViews &&
        aplTableViews.length > 0 && (
          <>
            {(!resultEmpty && (
              <>
                <MyLearningListTemplate>
                  <MyLearningListHeaderView
                    contentType={contentType}
                  />
                  <PersonalCompletedListView
                    apls={aplTableViews}
                    totalCount={aplTableCount}
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
                    message={noSuchMessage}
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
              message={noSuchMessage}
            />
          )}
        </Segment>
      )}
    </>
  );
}

export default inject(mobxHelper.injectFrom(
  'myTraining.aplService',
))(observer(PersonalCompletedListContainer));

const PAGE_SIZE = 20;