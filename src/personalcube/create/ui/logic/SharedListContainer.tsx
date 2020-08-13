import React from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { patronInfo } from '@nara.platform/dock';

import { ReviewService } from '@nara.drama/feedback';
import { CubeType } from 'shared/model';
import { ActionLogService, PageService } from 'shared/stores';
import { NoSuchContentPanel } from 'shared';
import { ChannelModel } from 'college/model';
import { LectureModel, LectureServiceType } from 'lecture/model';
import { LectureService } from 'lecture/stores';
import { Lecture, SeeMoreButton } from 'lecture';
import lectureRoutePaths from 'lecture/routePaths';
import { InMyLectureModel, InMyLectureCdoModel } from 'myTraining/model';
import { InMyLectureService } from 'myTraining/stores';

import routePaths from '../../../routePaths';
import SharedListPanelTopLineView from '../view/SharedListPanelTopLineView';

interface Props extends RouteComponentProps<{ tab: string; pageNo: string }> {
  actionLogService?: ActionLogService;
  pageService?: PageService;
  lectureService?: LectureService;
  inMyLectureService?: InMyLectureService;
  reviewService?: ReviewService;
  onChangeSharedCount: (sharedCount: number) => void;
}

interface States {
  channels: ChannelModel[];
}

@inject(
  mobxHelper.injectFrom(
    'shared.actionLogService',
    'shared.pageService',
    'shared.reviewService',
    'lecture.lectureService',
    'myTraining.inMyLectureService'
  )
)
@observer
@reactAutobind
class SharedListContainer extends React.Component<Props, States> {
  //
  PAGE_KEY = 'lecture.shared';

  PAGE_SIZE = 8;

  state = {
    channels: [],
  };

  componentDidMount() {
    // tab click 시 초기화 by gon
    this.init();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    // tab click 시 초기화 by gon
    const prevTab = prevProps.match.params.tab;
    const currentTab = this.props.match.params.tab;
    if (prevTab === currentTab) {
      this.getSearchInTab(prevProps);
    } else {
      this.init();
    }
  }

  // tab click 시 초기화 by gon
  init() {
    const { pageService, lectureService } = this.props;
    const initialLimit = this.getPageNo() * this.PAGE_SIZE;
    pageService!.initPageMap(this.PAGE_KEY, 0, initialLimit);
    lectureService!.clearLectures();
    this.findSharedLectures();
    // tab click 시 초기화 by gon
    this.setState({ channels: [] }, () => {
      lectureService!.clearLectures();
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      this.findSharedLectures();
    });
  }

  // tab click 시 초기화 by gon
  getSearchInTab(prevProps: Readonly<Props>) {
    const { pageService, lectureService } = this.props;
    const prevTab = prevProps.match.params.tab;
    const currentTab = this.props.match.params.tab;
    const currentPageNo = this.props.match.params.pageNo;

    if (
      prevTab === currentTab &&
      prevProps.match.params.pageNo !== currentPageNo
    ) {
      const page = pageService!.pageMap.get(this.PAGE_KEY);
      const offset =
        page!.limit > this.PAGE_SIZE && page!.nextOffset === 0
          ? page!.nextOffset + this.PAGE_SIZE
          : page!.nextOffset;
      if (currentPageNo === '1') {
        lectureService!.clearLectures();
        pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      } else {
        pageService!.initPageMap(this.PAGE_KEY, offset, this.PAGE_SIZE);
      }
      this.findSharedLectures(this.getPageNo() - 1);
    }
  }

  async findSharedLectures(pageNo?: number) {
    //
    const {
      pageService,
      lectureService,
      reviewService,
      inMyLectureService,
      onChangeSharedCount,
    } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { channels } = this.state;
    const channelIds = channels.map(
      (channel: ChannelModel) => channel.channelId
    );
    // shared list 조회
    const lectureOffsetList = await lectureService!.findSharedLectures(
      page!.limit,
      page!.nextOffset,
      channelIds
    );

    let feedbackIds: string[] = [];

    if (lectureOffsetList.results.length > 0) {
      feedbackIds = lectureOffsetList.results.map(lecture => lecture.reviewId);
      reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }

    inMyLectureService!.findAllInMyLectures();

    pageService!.setTotalCountAndPageNo(
      this.PAGE_KEY,
      lectureOffsetList.totalCount,
      pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1
    );
    onChangeSharedCount(lectureOffsetList.totalCount);
  }

  getPageNo() {
    //
    const { match } = this.props;

    return parseInt(match.params.pageNo, 10);
  }

  getRating(lecture: LectureModel) {
    //
    const { ratingMap } = this.props.reviewService!;

    let rating: number | undefined = ratingMap.get(lecture.reviewId) || 0;

    if (lecture.cubeType === CubeType.Community) {
      rating = undefined;
    }
    return rating;
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    return page && page.pageNo < page.totalPages;
  }

  onFilter(channels: ChannelModel[]) {
    //
    const { pageService, lectureService } = this.props;

    this.setState({ channels }, () => {
      lectureService!.clearLectures();
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      this.findSharedLectures();
    });
  }

  onClickSeeMore() {
    //
    const { history } = this.props;

    history.replace(routePaths.currentPage(this.getPageNo() + 1));
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;
    const collegeId = model.category.college.id;
    const cineroom =
      patronInfo.getCineroomByPatronId(model.servicePatronKeyString) ||
      patronInfo.getCineroomByDomain(model)!;

    if (
      model.serviceType === LectureServiceType.Program ||
      model.serviceType === LectureServiceType.Course
    ) {
      history.push(
        lectureRoutePaths.courseOverview(
          cineroom.id,
          collegeId,
          model.coursePlanId,
          model.serviceType,
          model.serviceId
        )
      );
    } else if (model.serviceType === LectureServiceType.Card) {
      history.push(
        lectureRoutePaths.lectureCardOverview(
          cineroom.id,
          collegeId,
          model.cubeId,
          model.serviceId
        )
      );
    }
  }

  onToggleBookmarkLecture(lecture: LectureModel | InMyLectureModel) {
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
      inMyLectureService!.addInMyLecture(InMyLectureCdoModel.fromLecture(lecture)).then(() =>
        inMyLectureService!.addInMyLectureInAllList(
          lecture.serviceId,
          lecture.serviceType
        )
      );
    }
  }

  render() {
    //
    const { lectureService, inMyLectureService } = this.props;
    const { lectures, totalLectureCount } = lectureService!;
    const { inMyLectureMap } = inMyLectureService!;
    const { channels } = this.state;

    if (lectures.length < 1) {
      return <NoSuchContentPanel message="아직 생성한 학습이 없습니다." />;
    }

    return (
      <>
        <SharedListPanelTopLineView
          totalCount={totalLectureCount}
          channels={channels}
          onFilter={this.onFilter}
        />

        <div className="section">
          <Lecture.Group type={Lecture.GroupType.Box}>
            {lectures.map((lecture, index) => {
              const inMyLecture =
                inMyLectureMap.get(lecture.serviceId) || undefined;
              return (
                <Lecture
                  key={`lecture-${index}`}
                  model={lecture}
                  rating={this.getRating(lecture)}
                  thumbnailImage={lecture.baseUrl || undefined}
                  action={
                    inMyLecture
                      ? Lecture.ActionType.Remove
                      : Lecture.ActionType.Add
                  }
                  onAction={() => {
                    reactAlert({
                      title: '알림',
                      message: inMyLecture
                        ? '본 과정이 관심목록에서 제외되었습니다.'
                        : '본 과정이 관심목록에 추가되었습니다.',
                    });
                    this.onToggleBookmarkLecture(inMyLecture || lecture);
                  }}
                  onViewDetail={this.onViewDetail}
                />
              );
            })}
          </Lecture.Group>

          {this.isContentMore() && (
            <SeeMoreButton onClick={this.onClickSeeMore} />
          )}
        </div>
      </>
    );
  }
}

export default withRouter(SharedListContainer);
