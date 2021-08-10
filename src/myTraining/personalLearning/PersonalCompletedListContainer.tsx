import React from 'react';
import { observer } from 'mobx-react';
import { Segment } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { MyTrainingRouteParams } from 'myTraining/routeParams';
import { AplService } from '../stores';
import NoSuchContentPanelMessages from '../ui/model/NoSuchContentPanelMessages';
import LineHeaderContainerV2 from '../ui/logic/LineHeaderContainerV2';
import { SeeMoreButton } from '../../lecture';
import { Loadingpanel, NoSuchContentPanel } from '../../shared';
import MyLearningListHeaderView from '../ui/view/table/MyLearningListHeaderView';
import MyLearningListTemplate from '../ui/view/table/MyLearningListTemplate';
import { useIsLoading } from 'shared/store/IsLoadingStore';
import { useResultEmpty } from 'myTraining/myTraining.stores';
import { useRequestAplList } from './presonalCompletedList.services';
import { onClickItem, onClickSeeMore } from './personalCompletedList.events';
import PersonalCompletedListView from './PersonalCompletedListView';

function PersonalCompletedListContainer() {
  useRequestAplList();
  const params = useParams<MyTrainingRouteParams>();
  const isLoading = useIsLoading() || false;
  const resultEmpty = useResultEmpty() || false;

  const {
    apls: { results: aplTableViews },
    aplCount: { all: aplTableCount },
  } = AplService.instance;

  const noSuchMessage = NoSuchContentPanelMessages.getMessageByConentType(
    params.tab
  );

  const seeMoreVisible = aplTableCount > aplTableViews.length;
  return (
    <>
      {(resultEmpty === false && (
        <LineHeaderContainerV2
          contentType={params.tab}
          resultEmpty={resultEmpty}
          totalCount={aplTableCount}
        />
      )) || <div style={{ marginTop: 50 }} />}
      {(aplTableViews && aplTableViews.length > 0 && (
        <>
          {(resultEmpty === false && (
            <>
              <MyLearningListTemplate contentType={params.tab}>
                <MyLearningListHeaderView contentType={params.tab} />
                <PersonalCompletedListView
                  totalCount={aplTableCount}
                  apls={aplTableViews}
                  onClickItem={onClickItem}
                />
              </MyLearningListTemplate>
              {seeMoreVisible && <SeeMoreButton onClick={onClickSeeMore} />}
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
              {isLoading === false && (
                <NoSuchContentPanel message={noSuchMessage} />
              )}
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
          {isLoading === false && (
            <NoSuchContentPanel message={noSuchMessage} />
          )}
        </Segment>
      )}
    </>
  );
}

export default observer(PersonalCompletedListContainer);
