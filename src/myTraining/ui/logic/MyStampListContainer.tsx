import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Segment, Icon, Button } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import { MyPageRouteParams } from '../../model/MyPageRouteParams';
import { inject, observer } from 'mobx-react';
import { Offset, mobxHelper } from '@nara.platform/accent';
import ReactGA from 'react-ga';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import { SeeMoreButton } from '../../../lecture';
import { Loadingpanel, NoSuchContentPanel } from '../../../shared';
import NoSuchContentPanelMessages, {
  nosuchMessagesPolyglot,
} from '../model/NoSuchContentPanelMessages';
import { MyPageContentType } from '../model/MyPageContentType';
import { Direction } from '../../model/Direction';
import MyStampListView from '../view/MyStampListView';
import MyStampService from '../../present/logic/MyStampService';
import FilterBoxService from '../../../shared/present/logic/FilterBoxService';
import MyLearningListHeaderView from '../view/table/MyLearningListHeaderView';
import MyLearningListTemplate from '../view/table/MyLearningListTemplate';
import { useRequestFilterCountView } from '../../service/useRequestFilterCountView';
import FilterBoxContainer from './FilterBoxContainer';
import { useScrollMove } from '../../useScrollMove';
import myTrainingRoutePaths from '../../routePaths';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { Area } from 'tracker/model';

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

  const { scrollOnceMove } = useScrollMove();

  const { myStamps, myStampCount } = myStampService!;
  const { conditions, showResult, filterCount } = filterBoxService!;

  useRequestFilterCountView();

  useEffect(() => {
    myStampService!.clearAllMyStamps();
    myStampService!.initFilterRdo();
    if (params.pageNo === '1') {
      requestStamps();
      return;
    }

    const currentPageNo = parseInt(params.pageNo);
    const limit = currentPageNo * PAGE_SIZE;

    requestStampsWithPage({ offset: 0, limit });
  }, []);

  useEffect(() => {
    if (showResult) {
      myStampService!.setFilterRdoByConditions(conditions);
      requestStampsByConditions();
    }
  }, [showResult]);

  const requestStamps = async () => {
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
  };

  const requestStampsWithPage = async (offset: Offset) => {
    setIsLoading(true);
    await myStampService!.findAllMyStampsWithPage(offset);
    checkShowSeeMore();
    setIsLoading(false);
    scrollOnceMove();
  };

  const onClickSort = useCallback((column: string, direction: Direction) => {
    myStampService!.sortMyStamps(column, direction);
  }, []);

  const onClickSeeMore = () => {
    const currentPageNo = parseInt(params.pageNo);
    const nextPageNo = currentPageNo + 1;

    const limit = PAGE_SIZE;
    const offset = currentPageNo * PAGE_SIZE;

    requestStampsWithPage({ offset, limit });

    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Learning');
    }, 1000);

    history.replace(`./${nextPageNo}`);
  };

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

  const moveToLearningList = useCallback(() => {
    history.push(myTrainingRoutePaths.learningInProgress());
  }, []);

  const noSuchMessage = (
    contentType: MyPageContentType,
    withFilter: boolean = false
  ) => {
    return (
      (withFilter &&
        getPolyglotText(
          '필터 조건에 해당하는 결과가 없습니다.',
          'mapg-msmp-검색x'
        )) ||
      nosuchMessagesPolyglot(contentType)
    );
  };

  return (
    <>
      <div className="mypage_contents my-stamp-list" data-area={Area.MYPAGE_STAMP}>
        <strong className="mypage_title">
          <PolyglotText id="mapg-msmp-Stamp" defaultString="My Stamp" />
        </strong>
        <div className="ui segment full">
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
          {(myStamps && myStamps.length > 0 && (
            <>
              {(!resultEmpty && (
                <>
                  <MyLearningListTemplate contentType={contentType}>
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
                // <NoSuchContentPanel
                //   message={noSuchMessage(contentType)}
                // />
                <Segment className="full">
                  <div className="table-wrapper">
                    <div className="community_nodata">
                      <Icon className="no-contents80" />
                      <p
                        dangerouslySetInnerHTML={{
                          __html: getPolyglotText(
                            `획득한 Stamp가 없습니다.<br/>Stamp가 있는 학습 과정을 찾아보세요.`,
                            'mapg-msmp-Stamp설명'
                          ),
                        }}
                      />
                      <Button
                        icon
                        className="right btn-blue2"
                        onClick={moveToLearningList}
                      >
                        <span className="border">
                          <PolyglotText
                            id="mapg-msmp-바로가기"
                            defaultString="Learning 학습중 바로가기"
                          />
                        </span>
                        <Icon className="morelink" />
                      </Button>
                    </div>
                  </div>
                </Segment>
              )}
            </Segment>
          )}
        </div>
      </div>
    </>
  );
}

export default inject(
  mobxHelper.injectFrom('myTraining.myStampService', 'shared.filterBoxService')
)(observer(MyStampListContainer));

const PAGE_SIZE = 20;
