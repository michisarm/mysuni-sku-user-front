import React from 'react';
import { Segment } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import ReactGA from 'react-ga';
import { AplService } from '../stores';
import { MyTrainingRouteParams } from '../model/MyTrainingRouteParams';
import NoSuchContentPanelMessages from '../ui/model/NoSuchContentPanelMessages';
import LineHeaderContainerV2 from '../ui/logic/LineHeaderContainerV2';
import { SeeMoreButton } from '../../lecture';
import { Loadingpanel, NoSuchContentPanel } from '../../shared';
import PersonalCompletedListView from '../ui/view/PersonalCompletedListView';
import MyLearningListHeaderView from '../ui/view/table/MyLearningListHeaderView';
import MyLearningListTemplate from '../ui/view/table/MyLearningListTemplate';
import { useIsLoading } from 'shared/store/IsLoadingStore';
import { useResultEmpty } from 'myTraining/myTraining.stores';
import {
  requestAplListWithPage,
  useRequestAplList,
} from './presonalCompletedList.services';

const PAGE_SIZE = 20;

function PersonalCompletedListContainer() {
  useRequestAplList();
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const isLoading = useIsLoading() || false;
  const resultEmpty = useResultEmpty() || false;

  const {
    apls: { results: aplTableViews },
    aplCount: { all: aplTableCount },
  } = AplService.instance;

  const onClickSeeMore = async () => {
    const currentPageNo = parseInt(params.pageNo);
    const nextPageNo = currentPageNo + 1;

    const limit = PAGE_SIZE;
    const offset = currentPageNo * PAGE_SIZE;

    requestAplListWithPage(offset, limit);

    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);

    history.replace(`./${nextPageNo}`);
  };

  const noSuchMessage = NoSuchContentPanelMessages.getMessageByConentType(
    params.tab
  );

  return (
    <>
      {(!resultEmpty && (
        <>
          <LineHeaderContainerV2
            contentType={params.tab}
            resultEmpty={resultEmpty}
            totalCount={aplTableCount}
          />
        </>
      )) || <div style={{ marginTop: 50 }} />}
      {(aplTableViews && aplTableViews.length > 0 && (
        <>
          {(!resultEmpty && (
            <>
              <MyLearningListTemplate>
                <MyLearningListHeaderView contentType={params.tab} />
                <PersonalCompletedListView
                  apls={aplTableViews}
                  totalCount={aplTableCount}
                />
              </MyLearningListTemplate>
              {aplTableCount > aplTableViews.length && (
                <SeeMoreButton onClick={onClickSeeMore} />
              )}
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
              {!isLoading && <NoSuchContentPanel message={noSuchMessage} />}
            </Segment>
          )}
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
          {!isLoading && <NoSuchContentPanel message={noSuchMessage} />}
        </Segment>
      )}
    </>
  );
}

export default observer(PersonalCompletedListContainer);
