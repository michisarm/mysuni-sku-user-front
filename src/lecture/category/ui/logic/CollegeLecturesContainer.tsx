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
import { CubeType } from 'shared/model';
import { ActionLogService, NewPageService } from 'shared/stores';
import { NoSuchContentPanel, Loadingpanel } from 'shared';
import { ChannelModel, CollegeModel } from 'college/model';
import { CollegeService } from 'college/stores';
import { InMyLectureCdoModel, InMyLectureModel } from 'myTraining/model';
import { InMyLectureService } from 'myTraining/stores';

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
import { CardWithCardRealtedCount } from '../../../model/CardWithCardRealtedCount';
import CardView from '../../../shared/Lecture/ui/view/CardVIew';
import {
  getCollegeStore,
  onCollegeModelStore,
  useCollegeModelStore,
} from '../../../../shared/store/CollegeStore';

interface Props extends RouteComponentProps<RouteParams> {
  actionLogService?: ActionLogService;
  newPageService?: NewPageService;
  collegeService?: CollegeService;
  lectureService?: LectureService;
  lectureCountService?: LectureCountService;
  reviewService?: ReviewService;
  inMyLectureService?: InMyLectureService;
  coursePlanService?: CoursePlanService;
}

interface CollegeLecturesContainerInnerProps extends Props {
  collegeModelStore: CollegeModel[];
  scrollOnceMove: () => void;
  scrollSave?: () => void;
}

interface State {
  lectures: CardWithCardRealtedCount[];
  sorting: OrderByType;
  totalCnt: number; // 20200728 category all 전체보기 선택 시 totalCount 메뉴에 있는 것으로 표시 by gon
  collegeOrder: boolean;
  loading: boolean;
}

interface RouteParams {
  collegeId: string;
  pageNo: string;
}

const CollegeLecturesContainer: React.FC<Props> = ({
  actionLogService,
  newPageService,
  collegeService,
  lectureService,
  lectureCountService,
  reviewService,
  inMyLectureService,
  coursePlanService,
  match,
}) => {
  const history = useHistory();
  const location = useLocation();
  const { scrollOnceMove, scrollSave } = useScrollMove();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const collegeModelStore = useCollegeModelStore();

  useEffect(() => {
    if (lectureCountService === undefined || collegeModelStore === undefined) {
      return;
    }
    const channels =
      collegeModelStore
        .find(c => c.id === match.params.collegeId)
        ?.channels.map(
          c =>
            new ChannelModel({
              id: c.id,
              name: c.name,
              channelId: c.id,
              checked: false,
            })
        ) || [];
    lectureCountService.setChannels(channels);
  }, [collegeModelStore, match.params.collegeId, lectureCountService]);

  useEffect(() => {
    const listen = history.listen(scrollSave);
    return () => listen();
  }, []);

  if (collegeModelStore === undefined) {
    return null;
  }

  return (
    <CollegeLecturesContainerInner
      actionLogService={actionLogService}
      newPageService={newPageService}
      collegeService={collegeService}
      lectureService={lectureService}
      lectureCountService={lectureCountService}
      reviewService={reviewService}
      inMyLectureService={inMyLectureService}
      coursePlanService={coursePlanService}
      collegeModelStore={collegeModelStore}
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
    'shared.actionLogService',
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
class CollegeLecturesContainerInner extends Component<
  CollegeLecturesContainerInnerProps,
  State
> {
  //
  PAGE_KEY = 'lecture.category';

  PAGE_SIZE = 8;

  constructor(props: CollegeLecturesContainerInnerProps) {
    //
    super(props);
    this.init();
    this.state = {
      lectures: [],
      sorting: OrderByType.Time,
      totalCnt: 0, // 20200728 category all 전체보기 선택 시 totalCount 메뉴에 있는 것으로 표시 by gon
      collegeOrder: false,
      loading: true,
    };
  }

  async componentDidMount() {
    //
    await this.findCollegeOrder();
    this.initialFindPagingCollegeLectures();
    this.findChannels();
    this.findInMyLectures();
    const { lectureCountService, match } = this.props;
    onCollegeModelStore(collegeModelStore => {
      if (collegeModelStore === undefined) {
        return;
      }
      if (lectureCountService === undefined) {
        return;
      }
      const channels =
        collegeModelStore
          .find(c => c.id === match.params.collegeId)
          ?.channels.map(
            c =>
              new ChannelModel({
                id: c.id,
                name: c.name,
                channelId: c.id,
                checked: false,
              })
          ) || [];
      lectureCountService.setChannels(channels);
    }, 'CollegeLecturesContainerInner');
  }

  async componentDidUpdate(prevProps: Props) {
    //
    const { params: prevParams } = prevProps.match;
    const { params } = this.props.match;

    if (prevParams.collegeId !== params.collegeId) {
      await this.findCollegeOrder();
      this.clearAndInit();
      this.initialFindPagingCollegeLectures();
      this.findInMyLectures();
    }
    if (prevParams.pageNo !== params.pageNo) {
      this.addFindPagingCollegeLectures();
    }
  }

  init() {
    //
    const { match, newPageService, lectureService } = this.props;
    const pageNo = parseInt(match.params.pageNo, 10);
    newPageService!.initPageMap(this.PAGE_KEY, this.PAGE_SIZE, pageNo);
    lectureService!.clearLectures();
  }

  clearAndInit() {
    //
    this.init();
    this.setState({ lectures: [] });
  }

  findChannels() {
    //
    const { match, collegeService, lectureCountService } = this.props;

    lectureCountService!.findLectureCountByCollegeId(
      match.params.collegeId,
      collegeService!.channels
    );
  }

  findInMyLectures() {
    const { inMyLectureService } = this.props;
    inMyLectureService!.findAllInMyLectures();
  }

  async initialFindPagingCollegeLectures() {
    //
    const { newPageService } = this.props;
    const page = newPageService!.pageMap.get(this.PAGE_KEY)!;
    this.findPagingCollegeLectures(page.limit * page.pageNo, 0);
  }

  async addFindPagingCollegeLectures() {
    //
    const { newPageService } = this.props;
    const page = newPageService!.pageMap.get(this.PAGE_KEY)!;

    this.findPagingCollegeLectures(page.limit, page.nextOffset);
  }

  async findPagingCollegeLectures(limit: number, offset: number) {
    //
    const {
      match,
      newPageService,
      lectureService,
      scrollOnceMove,
    } = this.props;
    const { sorting } = this.state;
    const pageNo = parseInt(match.params.pageNo, 10);

    const lectureOffsetList = await lectureService!.findPagingCollegeLectures(
      match.params.collegeId,
      limit,
      offset,
      sorting
    );

    this.setState(prevState => ({
      lectures: [...prevState.lectures, ...lectureOffsetList.results],
    }));

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
    const { match, newPageService } = this.props;
    const pageNo = parseInt(match.params.pageNo, 10);
    const page = newPageService!.pageMap.get(this.PAGE_KEY)!;

    return pageNo < page.totalPages;
  }

  onSelectChannel(e: any, { index, channel }: any) {
    //
    const { lectureCountService } = this.props;

    lectureCountService!.setChannelsProp(index, 'checked', !channel.checked);
  }

  onChangeSorting(e: any, data: any) {
    //
    this.props.actionLogService?.registerClickActionLog({
      subAction: data.label,
    });

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

  onActionLecture(lecture: LectureModel | InMyLectureModel) {
    //
    const { actionLogService, inMyLectureService } = this.props;

    actionLogService?.registerSeenActionLog({ lecture, subAction: '아이콘' });

    if (lecture instanceof InMyLectureModel) {
      inMyLectureService!
        .removeInMyLecture(lecture.id)
        .then(() =>
          inMyLectureService!.removeInMyLectureInAllList(
            lecture.serviceId,
            lecture.serviceType
          )
        );
    } else {
      inMyLectureService!
        .addInMyLecture(
          new InMyLectureCdoModel({
            serviceId: lecture.serviceId,
            serviceType: lecture.serviceType,
            category: lecture.category,
            name: lecture.name,
            description: lecture.description,
            cubeType: lecture.cubeType,
            learningTime: lecture.learningTime,
            stampCount: lecture.stampCount,
            coursePlanId: lecture.coursePlanId,

            requiredSubsidiaries: lecture.requiredSubsidiaries,
            cubeId: lecture.cubeId,
            courseSetJson: lecture.courseSetJson,
            courseLectureUsids: lecture.courseLectureUsids,
            lectureCardUsids: lecture.lectureCardUsids,

            reviewId: lecture.reviewId,
            baseUrl: lecture.baseUrl,
            servicePatronKeyString: lecture.patronKey.keyString,
          })
        )
        .then(() =>
          inMyLectureService!.addInMyLectureInAllList(
            lecture.serviceId,
            lecture.serviceType
          )
        );
    }
  }

  onViewDetail(e: any, { model }: any) {
    //
    const { history, collegeService, scrollSave } = this.props;
    const { college } = collegeService!;
    const cineroom =
      patronInfo.getCineroomByPatronId(model.servicePatronKeyString) ||
      patronInfo.getCineroomByDomain(model)!;

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
    const { actionLogService, match, history } = this.props;
    const pageNo = parseInt(match.params.pageNo, 10);
    // this.findPagingCollegeLectures();
    actionLogService?.registerClickActionLog({ subAction: 'list more' });
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

  renderCollegeLectures() {
    //
    const {
      newPageService,
      collegeService,
      reviewService,
      inMyLectureService,
    } = this.props;
    const { lectures, sorting, totalCnt, collegeOrder, loading } = this.state; // 20200728 category all 전체보기 선택 시 totalCount 메뉴에 있는 것으로 표시 by gon
    const page = newPageService!.pageMap.get(this.PAGE_KEY);
    const { college } = collegeService!;
    const { ratingMap } = reviewService!;
    const { inMyLectureMap } = inMyLectureService!;

    return (
      <CategoryLecturesWrapperView
        header={
          lectures &&
          lectures.length > 0 && (
            <>
              <DescriptionView
                name={`${college.name} College`}
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
        ) : lectures && lectures.length > 0 && lectures[0] ? (
          <>
            <Lecture.Group type={Lecture.GroupType.Box}>
              {lectures.map(({ card, cardRelatedCount }) => {
                return (
                  <CardView
                    key={card.id}
                    cardId={card.id}
                    {...card}
                    {...cardRelatedCount}
                  />
                );
              })}
            </Lecture.Group>
            {this.isContentMore() && (
              <SeeMoreButton onClick={this.onClickSeeMore} />
            )}
          </>
        ) : (
          <NoSuchContentPanel message="등록된 학습 과정이 없습니다." />
        )}
      </CategoryLecturesWrapperView>
    );
  }

  renderChannelsLectures() {
    //
    const { lectureCountService } = this.props;
    if (lectureCountService === undefined) {
      return null;
    }
    const { channels } = lectureCountService;
    return (
      <ChannelsLecturesWrapperView>
        {channels &&
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
          )}
      </ChannelsLecturesWrapperView>
    );
  }

  render() {
    //
    const { lectureCountService } = this.props;
    const { allSelected, channels } = lectureCountService!;
    const { collegeModelStore } = this.props;
    const { params } = this.props.match;
    const { collegeId } = params;

    return (
      <CategoryLecturesContentWrapperView>
        <ChannelsPanel
          channels={channels}
          onSelectChannel={this.onSelectChannel}
        />
        {lectureCountService!.categoryType === 'CollegeLectures' || allSelected
          ? this.renderCollegeLectures()
          : this.renderChannelsLectures()}
      </CategoryLecturesContentWrapperView>
    );
  }
}
