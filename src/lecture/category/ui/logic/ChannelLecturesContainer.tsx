import React, { Component, useEffect, useState } from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import {
  RouteComponentProps,
  useHistory,
  useLocation,
  withRouter,
} from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';

import { ReviewService } from '@nara.drama/feedback';
import { PageService } from 'shared/stores';
import { NoSuchContentPanel, Loadingpanel } from 'shared';
import { CollegeService } from 'college/stores';
import { PersonalCubeService } from 'personalcube/personalcube/stores';
import { LectureServiceType, OrderByType } from '../../../model';
import { LectureCardService, LectureService } from '../../../stores';
import routePaths from '../../../routePaths';
import { Lecture, CardSorting, SeeMoreButton } from '../../../shared';
import ChannelLecturesContentWrapperView from '../view/ChannelLecturesContentWrapperView';
import { CoursePlanService } from 'course/stores';
import ReactGA from 'react-ga';
import { useScrollMove } from 'myTraining/useScrollMove';
import { Segment } from 'semantic-ui-react';
import {
  LectureCardView,
  parseUserLectureCards,
} from '@sku/skuniv-ui-lecture-card';
import { SkProfileService } from '../../../../profile/stores';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { hoverTrack } from 'tracker/present/logic/ActionTrackService';

interface Props
  extends RouteComponentProps<{ collegeId: string; channelId: string }> {
  pageService?: PageService;
  collegeService?: CollegeService;
  personalCubeService?: PersonalCubeService;
  lectureService?: LectureService;
  lectureCardService?: LectureCardService;
  reviewService?: ReviewService;
  coursePlanService?: CoursePlanService;
  scrollSave?: () => void;
  scrollOnceMove?: () => void;
}

interface State {
  sorting: string;
  collegeOrder: boolean;
  channelOffset: number;
  loading: boolean;
}

const ChannelLecturesContainer: React.FC<Props> = ({
  pageService,
  collegeService,
  personalCubeService,
  lectureService,
  lectureCardService,
  reviewService,
  match,
}) => {
  const history = useHistory();
  const location = useLocation();
  const { scrollOnceMove, scrollSave } = useScrollMove();

  useEffect(() => {
    const listen = history.listen(scrollSave);
    return () => listen();
  }, [history, scrollSave]);

  return (
    <ChannelLecturesInnerContainer
      pageService={pageService}
      collegeService={collegeService}
      personalCubeService={personalCubeService}
      lectureService={lectureService}
      lectureCardService={lectureCardService}
      reviewService={reviewService}
      history={history}
      location={location}
      match={match}
      scrollSave={scrollSave}
      scrollOnceMove={scrollOnceMove}
    />
  );
};

export default withRouter(ChannelLecturesContainer);

@inject(
  mobxHelper.injectFrom(
    'shared.pageService',
    'lecture.lectureService',
    'lecture.lectureCardService',
    'shared.reviewService',
    'myTraining.inMyLectureService',
    'course.coursePlanService'
  )
)
@reactAutobind
@observer
class ChannelLecturesInnerContainer extends Component<Props, State> {
  //
  PAGE_KEY = 'lecture.channel';

  PAGE_SIZE = 8;

  state = {
    sorting: OrderByType.Time,
    collegeOrder: false,
    channelOffset: 0,
    loading: true,
  };

  constructor(props: Props) {
    //
    super(props);
    this.init();
  }

  async componentDidMount() {
    //
    try {
      await this.findCollegeOrder();
    } catch (error) {
      console.error('TODO', error);
    }
    this.findPagingChannelLectures();
  }

  async componentDidUpdate(prevProps: Props) {
    //
    const { pageService } = this.props;
    if (
      prevProps.match.params.channelId !== this.props.match.params.channelId
    ) {
      this.init();
      pageService!.initPageMap(
        this.PAGE_KEY,
        0, // offset
        this.PAGE_SIZE // limit
      );
      sessionStorage.removeItem('channelOffset');

      try {
        await this.findCollegeOrder();
      } catch (error) {
        console.error('TODO', error);
      }
      this.findPagingChannelLectures();
    }
  }

  init() {
    //
    const { pageService, lectureService } = this.props;
    const getChannelOffset: string | null =
      sessionStorage.getItem('channelOffset');
    const prevChannelOffset = getChannelOffset
      ? JSON.parse(getChannelOffset)
      : null;

    pageService!.initPageMap(
      this.PAGE_KEY,
      0, // offset
      prevChannelOffset ? prevChannelOffset : this.PAGE_SIZE // limit
    );
    lectureService!.clearLectures();
  }

  async findPagingChannelLectures() {
    //
    const { match, pageService, lectureService, scrollOnceMove } = this.props;

    const getChannelOffset: string | null =
      sessionStorage.getItem('channelOffset');

    const prevChannelOffset = getChannelOffset
      ? JSON.parse(getChannelOffset)
      : null;

    this.setState({ channelOffset: prevChannelOffset });
    const { sorting, channelOffset } = this.state;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    const lectureOffsetList =
      await lectureService!.findPagingChannelOrderLectures(
        match.params.collegeId,
        match.params.channelId,
        page!.limit,
        page!.nextOffset,
        sorting
      );
    this.setState({ loading: false });

    if (typeof scrollOnceMove === 'function') {
      scrollOnceMove();
    }

    if (channelOffset > 0 && page) {
      page.limit = 8;
    }

    pageService!.setTotalCountAndPageNo(
      this.PAGE_KEY,
      lectureOffsetList.totalCount,
      channelOffset > 0 ? channelOffset / 8 + page!.pageNo : page!.pageNo + 1
    );
    this.setState({ channelOffset: 0 });
  }

  async findCollegeOrder() {
    //
    const { match, coursePlanService } = this.props;
    const collegeSortOrderCount = await coursePlanService!.findCollegeSortOrder(
      match.params.collegeId
    );

    if (collegeSortOrderCount > 0) {
      this.setState({ collegeOrder: true, sorting: OrderByType.collegeOrder });
    } else {
      this.setState({ collegeOrder: false, sorting: OrderByType.Time });
    }
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    return page!.pageNo < page!.totalPages;
  }

  onChangeSorting(e: any, data: any) {
    //
    // sessionStorage.setItem('channelSort', data.value);
    sessionStorage.removeItem('channelOffset');
    this.setState(
      {
        sorting: data.value,
        loading: true,
      },
      () => {
        this.init();
        this.findPagingChannelLectures();
      }
    );
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;

    if (model.serviceType === LectureServiceType.Card) {
      history.push(routePaths.courseOverview(model.cardId));
    } else {
      history.push(routePaths.lectureCardOverview(model.cardId, model.cubeId));
    }

    ReactGA.event({
      category: `${data?.model?.category?.college.name}_${data?.model?.category?.channel?.name}`,
      action: 'Click Card',
      label: `${data?.model?.name}`,
    });
  }

  onClickSeeMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    if (page) {
      page.limit = 8;
    }

    this.findPagingChannelLectures();
  }

  render() {
    //
    const { pageService, lectureService } = this.props;
    const { sorting, collegeOrder, loading } = this.state;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { lectures } = lectureService!;

    const userLanguage = SkProfileService.instance.skProfile.language;

    return (
      <ChannelLecturesContentWrapperView
        lectureCount={page!.totalCount}
        countDisabled={lectures.length < 1}
      >
        {loading ? (
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
            <Loadingpanel loading={loading} />
          </Segment>
        ) : lectures && lectures.length > 0 ? (
          <>
            <CardSorting
              value={sorting}
              onChange={this.onChangeSorting}
              collegeOrder={collegeOrder}
            />
            <div className="section">
              <Lecture.Group type={Lecture.GroupType.Box}>
                {parseUserLectureCards(lectures, userLanguage).map(
                  (cards, index) => {
                    return (
                      <LectureCardView
                        {...cards}
                        useBookMark={true}
                        dataArea={
                          window.location.pathname.includes('/recommend')
                            ? Area.RECOMMEND_CARD
                            : Area.COLLEGE_CARD
                        }
                        hoverTrack={hoverTrack}
                      />
                    );
                  }
                )}
              </Lecture.Group>

              {this.isContentMore() && (
                <SeeMoreButton onClick={this.onClickSeeMore} />
              )}
            </div>
          </>
        ) : (
          <NoSuchContentPanel message="등록된 학습 과정이 없습니다." />
        )}
      </ChannelLecturesContentWrapperView>
    );
  }
}
