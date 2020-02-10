
import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { patronInfo } from '@nara.platform/dock';

import { ReviewService } from '@nara.drama/feedback';
import { PageService, CubeType, NoSuchContentPanel } from 'shared';
import { ChannelModel } from 'college/model';
import lectureRoutePaths from 'lecture/routePaths';
import { LectureService, LectureModel, LectureServiceType, Lecture } from 'lecture';
import { SeeMoreButton } from 'lecture/shared';
import { InMyLectureService, InMyLectureModel, InMyLectureCdoModel } from 'myTraining';

import SharedListPanelTopLineView from '../view/SharedListPanelTopLineView';


interface Props extends RouteComponentProps<{ tab: string }> {
  pageService?: PageService,
  lectureService?: LectureService,
  inMyLectureService?: InMyLectureService,
  reviewService?: ReviewService
  onChangeSharedCount: (sharedCount: number) => void
}

interface States {
  channels: ChannelModel[]
}

@inject(mobxHelper.injectFrom(
  'shared.pageService',
  'shared.reviewService',
  'lecture.lectureService',
  'myTraining.inMyLectureService',
))
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
    //
    const { pageService } = this.props;

    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    this.findSharedLectures(true);
  }

  async findSharedLectures(init: boolean = false) {
    //
    const { pageService, lectureService, reviewService, inMyLectureService, onChangeSharedCount } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { channels } = this.state;
    const channelIds = channels.map((channel: ChannelModel) => channel.channelId);

    let lectureOffsetList;

    if (init) {
      lectureOffsetList = await lectureService!.findSharedLectures(page!.limit, channelIds);

    }
    else {
      lectureOffsetList = await lectureService!.findPagingSharedLectures(page!.limit, page!.nextOffset, channelIds);
    }

    let feedbackIds: string[] = [];

    if (lectureOffsetList.results.length > 0) {
      feedbackIds = lectureOffsetList.results.map(lecture => lecture.reviewId);
      reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }

    inMyLectureService!.findAllInMyLectures();

    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, lectureOffsetList.totalCount, page!.pageNo + 1);
    onChangeSharedCount(lectureOffsetList.totalCount);
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
    const { pageService, lectureService  } = this.props;

    this.setState({ channels }, () => {
      lectureService!.clearLectures();
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      this.findSharedLectures();
    });
  }

  onClickSeeMore() {
    //
    this.findSharedLectures();
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;
    const collegeId = model.category.college.id;
    const cineroom = patronInfo.getCineroomByPatronId(model.servicePatronKeyString) || patronInfo.getCineroomByDomain(model)!;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      history.push(lectureRoutePaths.courseOverview(cineroom.id, collegeId, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(lectureRoutePaths.lectureCardOverview(cineroom.id, collegeId, model.cubeId, model.serviceId));
    }
  }

  onToggleBookmarkLecture(lecture: LectureModel | InMyLectureModel) {
    //
    const { inMyLectureService } = this.props;

    if (lecture instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(lecture.id)
        .then(() => inMyLectureService!.removeInMyLectureInAllList(lecture.serviceId, lecture.serviceType));
    }
    else {
      inMyLectureService!.addInMyLecture(InMyLectureCdoModel.fromLecture(lecture))
        .then(() => inMyLectureService!.addInMyLectureInAllList(lecture.serviceId, lecture.serviceType));
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
            { lectures.map((lecture, index) => {
              const inMyLecture = inMyLectureMap.get(lecture.serviceId) || undefined;
              return (
                <Lecture
                  key={`lecture-${index}`}
                  model={lecture}
                  rating={this.getRating(lecture)}
                  thumbnailImage={lecture.baseUrl || undefined}
                  action={inMyLecture ? Lecture.ActionType.Remove : Lecture.ActionType.Add}
                  onAction={() => this.onToggleBookmarkLecture(inMyLecture || lecture)}
                  onViewDetail={this.onViewDetail}
                />
              );
            })}
          </Lecture.Group>

          { this.isContentMore() && (
            <SeeMoreButton
              onClick={this.onClickSeeMore}
            />
          )}
        </div>
      </>
    );
  }
}

export default withRouter(SharedListContainer);
