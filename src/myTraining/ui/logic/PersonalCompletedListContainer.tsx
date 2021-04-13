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
import { useScrollMove } from '../../useScrollMove';

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

  const { scrollOnceMove } = useScrollMove();

  const { apls: {results: aplTableViews }, aplCount: {all: aplTableCount } } = aplService!;

  useEffect(() => {
    aplService!.clearAplQueryProps();
    
    if(params.pageNo === '1') {  
     requestApls();
     return;
    }

    const currentPageNo = parseInt(params.pageNo);
    const limit = currentPageNo * PAGE_SIZE;

    requestAplsWithPage({ offset: 0, limit });

    return () => {
      aplService!.clearApls();
    }
  }, []);

  const requestApls = async () => {
    setIsLoading(true);
    const offsetApl = await aplService!.findAllAplsByQuery();
    const isEmpty = offsetApl.results.length === 0 ? true : false;
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  };

  const requestAplsWithPage = async (offset: Offset) => {
    setIsLoading(true);
    await aplService!.findAllAplsWithPage(offset);
    checkShowSeeMore();
    setIsLoading(false);
    scrollOnceMove();
  };

  const onClickSeeMore = async () => {
    const currentPageNo = parseInt(params.pageNo);
    const nextPageNo = currentPageNo + 1;

    const limit = PAGE_SIZE;
    const offset = currentPageNo * PAGE_SIZE;

    requestAplsWithPage({ offset, limit });
    
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);

    history.replace(`./${nextPageNo}`);
  };

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