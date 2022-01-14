import React, { useEffect, useState } from 'react';
import {
  reactAutobind,
  mobxHelper,
  ReactComponent,
} from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import {
  RouteComponentProps,
  useHistory,
  useLocation,
  withRouter,
} from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';

import { ReviewService } from '@nara.drama/feedback';
import { NewPageService } from 'shared/stores';
import { NoSuchContentPanel, Loadingpanel } from 'shared';
import { ChannelModel } from 'college/model';
import { CollegeService } from 'college/stores';
import { InMyLectureCdoModel, InMyLectureModel } from 'myTraining/model';

import routePaths from '../../../routePaths';
import { LectureModel, LectureServiceType, OrderByType } from '../../../model';
import { LectureService } from '../../../stores';
import {
  Lecture,
  CardSorting,
  ChannelsPanel,
  SeeMoreButton,
} from '../../../shared';

import LecturesByChannelContainer from '../../../category/ui/logic/LecturesByChannelContainer';
import LectureCountService from '../../present/logic/LectureCountService';
import CategoryLecturesContentWrapperView from '../view/CategoryLecturesContentWrapperView';
import CategoryLecturesWrapperView from '../view/CategoryLecturesWrapperView';
import ChannelsLecturesWrapperView from '../view/ChannelsLecturesWrapperView';
import { DescriptionView } from '../view/CategoryLecturesElementsView';
import { CoursePlanService } from 'course/stores';
import { useScrollMove } from 'myTraining/useScrollMove';
import { Segment } from 'semantic-ui-react';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../model/LangSupport';
import { CardProps, LectureCardView } from '@sku/skuniv-ui-lecture-card';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { hoverTrack } from 'tracker/present/logic/ActionTrackService';
import { SkProfileService } from '../../../../profile/stores';
import {
  College,
  useAllColleges,
} from '../../../../shared/service/requestAllColleges';

interface Injected {
  newPageService: NewPageService;
  collegeService: CollegeService;
  lectureService: LectureService;
  lectureCountService: LectureCountService;
  reviewService: ReviewService;
  coursePlanService: CoursePlanService;
}

interface Props extends RouteComponentProps<RouteParams> {}

interface InnerProps extends RouteComponentProps<RouteParams> {
  collegeModelStore: College[];
  scrollOnceMove: () => void;
  scrollSave?: () => void;
}

interface State {
  lectures: CardProps[];
  sorting: OrderByType;
  totalCnt: number; // 20200728 category all 전체보기 선택 시 totalCount 메뉴에 있는 것으로 표시 by gon
  collegeOrder: boolean;
  loading: boolean;
  seeMoreButtonView: HTMLDivElement | null;
}

interface RouteParams {
  collegeId: string;
  pageNo: string;
}

const CollegeLecturesContainer: React.FC<Props> = ({ match }) => {
  const history = useHistory();
  const location = useLocation();
  const { scrollOnceMove, scrollSave } = useScrollMove();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const allColleges = useAllColleges();
  const lectureCountService = LectureCountService.instance;

  useEffect(() => {
    if (lectureCountService === undefined) {
      return;
    }
    const channels =
      allColleges
        .find((c) => c.id === match.params.collegeId)
        ?.channels.map(
          (c) =>
            new ChannelModel({
              id: c.id,
              name: c.name,
              channelId: c.id,
              checked: false,
            })
        ) || [];
    lectureCountService.setChannels(channels);
  }, [allColleges, match.params.collegeId, lectureCountService]);

  useEffect(() => {
    const listen = history.listen(scrollSave);
    return () => listen();
  }, [history, scrollSave]);

  return (
    <CollegeLecturesContainerInner
      collegeModelStore={allColleges}
      location={location}
      history={history}
      match={match}
      scrollSave={scrollSave}
      scrollOnceMove={scrollOnceMove}
    />
  );
};
export default withRouter(CollegeLecturesContainer);

@inject(
  mobxHelper.injectFrom(
    'shared.newPageService',
    'college.collegeService',
    'lecture.lectureService',
    'lecture.lectureCountService',
    'shared.reviewService',
    'myTraining.inMyLectureService',
    'course.coursePlanService'
  )
)
@reactAutobind
@observer
class CollegeLecturesContainerInner extends ReactComponent<
  InnerProps,
  State,
  Injected
> {
  //
  PAGE_KEY = 'lecture.category';

  PAGE_SIZE = 8;

  observer: IntersectionObserver | null = null;

  constructor(props: InnerProps) {
    //
    super(props);
    this.init();
    this.state = {
      lectures: [],
      sorting: OrderByType.Time,
      totalCnt: 0, // 20200728 category all 전체보기 선택 시 totalCount 메뉴에 있는 것으로 표시 by gon
      collegeOrder: false,
      loading: true,
      seeMoreButtonView: null,
    };
    const options = {
      threshold: 0.01,
    };
    if (window.IntersectionObserver !== undefined) {
      this.observer = new IntersectionObserver(
        this.intersectionCallback,
        options
      );
    }
  }

  async componentDidMount() {
    //
    this.setState({ loading: true });
    await this.findCollegeOrder();
    this.initialFindPagingCollegeLectures();
    this.findChannels();
  }

  async componentDidUpdate(prevProps: Props, prevState: State) {
    //
    const { params: prevParams } = prevProps.match;
    const { params } = this.props.match;

    if (prevParams.collegeId !== params.collegeId) {
      // eslint-disable-next-line
      this.setState({ loading: true });
      await this.findCollegeOrder();
      this.clearAndInit();
      this.initialFindPagingCollegeLectures();
    }
    if (prevParams.pageNo < params.pageNo) {
      // eslint-disable-next-line
      this.setState({ loading: true });
      this.addFindPagingCollegeLectures();
    }
    if (prevState.seeMoreButtonView !== this.state.seeMoreButtonView) {
      if (this.observer !== null) {
        if (this.state.seeMoreButtonView !== null) {
          this.observer.observe(this.state.seeMoreButtonView);
        } else {
          this.observer.disconnect();
        }
      }
    }
  }

  init() {
    //
    const { match, history } = this.props;
    const { newPageService, lectureService } = this.injected;
    const pageNo = 8;
    history.replace(routePaths.collegeLecturesPage(1));
    newPageService!.initPageMap(this.PAGE_KEY, pageNo, 1);
    lectureService!.clearCollegeLectures();
  }

  clearAndInit() {
    //

    this.init();
  }

  findChannels() {
    //
    const { match } = this.props;
    const { collegeService, lectureCountService } = this.injected;

    lectureCountService!.findLectureCountByCollegeId(
      match.params.collegeId,
      collegeService!.channels
    );
  }

  async initialFindPagingCollegeLectures() {
    //
    const { newPageService } = this.injected;
    const page = newPageService!.pageMap.get(this.PAGE_KEY)!;

    this.findPagingCollegeLectures(page.limit * page.pageNo, 0);
  }

  async addFindPagingCollegeLectures() {
    //
    const { newPageService } = this.injected;
    const page = newPageService!.pageMap.get(this.PAGE_KEY)!;

    this.findPagingCollegeLectures(page.limit, page.nextOffset);
  }

  async findPagingCollegeLectures(limit: number, offset: number) {
    //
    const { match, scrollOnceMove } = this.props;
    const { newPageService, lectureService } = this.injected;
    const { sorting } = this.state;

    const pageNo = offset !== 0 ? parseInt(match.params.pageNo, 10) : 1;

    const lectureOffsetList = await lectureService!.findPagingCollegeLectures(
      match.params.collegeId,
      limit,
      offset,
      sorting
    );

    // 20200728 category all 전체보기 선택 시 totalCount 메뉴에 있는 것으로 표시 by gon
    const totalCount = lectureOffsetList.totalCount;
    this.setState({ totalCnt: totalCount });

    newPageService!.setTotalCountAndPageNo(
      this.PAGE_KEY,
      lectureOffsetList.totalCount,
      pageNo
    );

    if (!lectureOffsetList.empty && typeof scrollOnceMove === 'function') {
      this.setState({ loading: false }); // Loading Progress 종료
      scrollOnceMove();
    }
  }

  async findCollegeOrder() {
    //
    const { match } = this.props;
    const { coursePlanService } = this.injected;
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
    const { match } = this.props;
    const { newPageService } = this.injected;
    const pageNo = parseInt(match.params.pageNo, 10);
    const page = newPageService!.pageMap.get(this.PAGE_KEY)!;

    return pageNo < page.totalPages;
  }

  onSelectChannel(e: any, { index, channel }: any) {
    //
    const { lectureCountService } = this.injected;

    lectureCountService!.setChannelsProp(index, 'checked', !channel.checked);
  }

  onChangeSorting(e: any, data: any) {
    //
    this.setState(
      {
        sorting: data.value,
        loading: true,
      },
      () => {
        this.clearAndInit();
        this.initialFindPagingCollegeLectures();
      }
    );
  }

  onViewDetail(e: any, { model }: any) {
    //
    const { history, scrollSave } = this.props;
    const { collegeService } = this.injected;
    const { college } = collegeService;
    const cineroom =
      patronInfo.getCineroomByPatronId(model.servicePatronKeyString) ||
      patronInfo.getCineroomByDomain(model);

    if (model.serviceType === LectureServiceType.Card) {
      // history.push(routePaths.courseOverviewPrev(college.collegeId, model.coursePlanId, model.serviceType, model.serviceId));
      history.push(routePaths.courseOverview(model.cardId));
    } else if (model.serviceType === LectureServiceType.Cube) {
      // history.push(routePaths.lectureCardOverviewPrev(college.collegeId, model.cubeId, model.serviceId));
      history.push(routePaths.lectureCardOverview(model.cardId, model.cubeId));
    }
  }

  onClickSeeMore() {
    //
    const { match, history } = this.props;
    const pageNo = parseInt(match.params.pageNo, 10);
    // this.findPagingCollegeLectures();
    // this.addFindPagingCollegeLectures();
    history.replace(routePaths.collegeLecturesPage(pageNo + 1));
  }

  onViewChannelAll(e: string, data: any) {
    //
    const { match, history } = this.props;

    history.push(
      routePaths.channelLectures(match.params.collegeId, data.channel.id)
    );
  }

  seeMoreButtonViewRef(ref: HTMLDivElement | null) {
    this.setState({ seeMoreButtonView: ref });
  }

  intersectionCallback(entries: IntersectionObserverEntry[]) {
    entries.forEach((c) => {
      if (c.isIntersecting) {
        this.onClickSeeMore();
      }
    });
  }

  renderCollegeLectures() {
    //

    const { newPageService, collegeService, reviewService, lectureService } =
      this.injected;
    const { lectures, sorting, totalCnt, collegeOrder, loading } = this.state; // 20200728 category all 전체보기 선택 시 totalCount 메뉴에 있는 것으로 표시 by gon
    const { college } = collegeService;
    const { ratingMap } = reviewService;

    const { _userLectureCards } = lectureService!;

    return (
      <CategoryLecturesWrapperView
        header={
          _userLectureCards &&
          _userLectureCards.length > 0 && (
            <>
              <DescriptionView
                name={`${parsePolyglotString(
                  college.name,
                  getDefaultLang(college.langSupports)
                )} Category`}
                count={totalCnt}
              />
              <CardSorting
                value={sorting}
                onChange={this.onChangeSorting}
                collegeOrder={collegeOrder}
              />
            </>
          )
        }
      >
        {_userLectureCards &&
        _userLectureCards.length > 0 &&
        _userLectureCards[0] ? (
          <>
            <Lecture.Group type={Lecture.GroupType.Box}>
              {_userLectureCards.map((userLectureCard: CardProps, index) => {
                return (
                  <React.Fragment key={index}>
                    <LectureCardView
                      {...userLectureCard}
                      useBookMark={true} // bookMark 기능을 사용하면 true, 사용하지 않으면 false
                      dataArea={Area.COLLEGE_CARD}
                      hoverTrack={hoverTrack}
                    />
                  </React.Fragment>
                );
              })}
            </Lecture.Group>
            {loading && (
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
            )}
            {!loading && this.isContentMore() && (
              <SeeMoreButton
                onClick={this.onClickSeeMore}
                ref={this.seeMoreButtonViewRef}
              />
            )}
          </>
        ) : (
          <NoSuchContentPanel
            message={getPolyglotText(
              '등록된 학습 과정이 없습니다.',
              'cicl-목록-목록없음'
            )}
          />
        )}
      </CategoryLecturesWrapperView>
    );
  }

  renderChannelsLectures() {
    //
    const { lectureCountService } = this.injected;
    if (lectureCountService === undefined) {
      return null;
    }
    const { channels } = lectureCountService;
    return (
      <ChannelsLecturesWrapperView>
        {(channels &&
          channels.length &&
          channels.map(
            (channel: ChannelModel) =>
              channel.checked && (
                <LecturesByChannelContainer
                  channel={channel}
                  onViewAll={this.onViewChannelAll}
                  key={`channel_cont_${channel.id}`}
                />
              )
          )) ||
          null}
      </ChannelsLecturesWrapperView>
    );
  }

  render() {
    //
    const { lectureCountService } = this.injected;
    const { channels } = lectureCountService;
    const allSelected =
      channels.every((c) => c.checked === true) ||
      channels.every((c) => c.checked !== true);

    return (
      <CategoryLecturesContentWrapperView>
        <ChannelsPanel
          channels={channels}
          onSelectChannel={this.onSelectChannel}
        />
        {allSelected
          ? this.renderCollegeLectures()
          : this.renderChannelsLectures()}
      </CategoryLecturesContentWrapperView>
    );
  }
}
