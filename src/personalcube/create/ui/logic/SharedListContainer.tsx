
import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { patronInfo } from '@nara.platform/dock';

import { ReviewService } from '@nara.drama/feedback';
import { Segment } from 'semantic-ui-react';
import { PageService, CubeType, NoSuchContentPanel } from 'shared';
import { ChannelModel } from 'college';
import lectureRoutePaths from 'lecture/routePaths';
import { LectureService, LectureModel, LectureServiceType, Lecture } from 'lecture';
import { SeeMoreButton } from 'lecture/shared';
import { InMyLectureService, InMyLectureModel, InMyLectureCdoModel } from 'myTraining';

import LineHeaderContainer from 'myTraining/ui/logic/LineHeaderContainer';
// import Lecture from '../../../../lecture/shared/Lecture/ui/logic/LectureContainer';
// import LectureServiceType from '../../../../lecture/shared/model/LectureServiceType';



interface Props extends RouteComponentProps<{ tab: string }> {
  pageService?: PageService,
  lectureService?: LectureService,
  inMyLectureService?: InMyLectureService,
  reviewService?: ReviewService
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
    const { pageService, lectureService, reviewService, inMyLectureService } = this.props;
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

    if (lectureOffsetList && lectureOffsetList.results && lectureOffsetList.results.length) {
      feedbackIds = lectureOffsetList.results.map(lecture => lecture.reviewId);
      reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }

    inMyLectureService!.findAllInMyLectures();

    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, lectureOffsetList.totalCount, page!.pageNo + 1);
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    return page!.pageNo < page!.totalPages;
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

  onClickSeeMore() {
    //
    this.findSharedLectures();
  }

  onFilter(channels: ChannelModel[]) {
    const { pageService, lectureService  } = this.props;

    this.setState({ channels }, () => {
      lectureService!.clearLectures();
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      this.findSharedLectures();
    });
  }

  onToggleBookmarkLecture(lecture: LectureModel | InMyLectureModel) {
    //
    const { inMyLectureService } = this.props;

    if (lecture instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(lecture.id)
        .then(() => inMyLectureService!.findAllInMyLectures());
    }
    else {
      inMyLectureService!.addInMyLecture(new InMyLectureCdoModel({
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
      }))
        .then(() => inMyLectureService!.findAllInMyLectures());
    }
  }

  render() {
    //
    const { lectureService, reviewService, inMyLectureService } = this.props;
    const { lectures, totalLectureCount } = lectureService!;
    const { ratingMap } = reviewService!;
    const { inMyLectureMap } = inMyLectureService!;
    const { channels } = this.state;

    return (
      <Segment className="full">
        <LineHeaderContainer
          count={totalLectureCount}
          channels={channels}
          onFilter={this.onFilter}
        />

        { lectures.length > 0 ?
          <div className="section">
            <Lecture.Group type={Lecture.GroupType.Box}>
              { lectures.map((lecture: LectureModel, index: number) => {
                let rating: number | undefined = ratingMap.get(lecture.reviewId) || 0;
                const inMyLecture = inMyLectureMap.get(lecture.serviceId) || undefined;
                if (lecture.cubeType === CubeType.Community) rating = undefined;
                return (
                  <Lecture
                    key={`lecture-${index}`}
                    model={lecture}
                    rating={rating}
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
          :
          <NoSuchContentPanel message="아직 생성한 학습이 없습니다." />
        }
      </Segment>
    );
  }
}

export default withRouter(SharedListContainer);
