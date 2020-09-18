
import React, { Component } from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';

import { ReviewService } from '@nara.drama/feedback';
import { CubeType } from 'shared/model';
import { ActionLogService, PageService } from 'shared/stores';
import { NoSuchContentPanel } from 'shared';
import { SkProfileService } from 'profile/stores';
import { ChannelModel } from 'college/model';
import { LectureModel, LectureServiceType } from 'lecture/model';
import { LectureService } from 'lecture/stores';
import lectureRoutePaths from 'lecture/routePaths';
import { Lecture, SeeMoreButton } from 'lecture';
import routePaths from '../../routePaths';
import MyTrainingService from '../../present/logic/MyTrainingService';
import InMyLectureService from '../../present/logic/InMyLectureService';
import MyTrainingModel from '../../model/MyTrainingModel';
import InMyLectureModel from '../../model/InMyLectureModel';
import InMyLectureCdoModel from '../../model/InMyLectureCdoModel';

import MyLearningContentType from '../model/MyLearningContentType';
import LineHeaderContainer from '../logic/LineHeaderContainer';


interface Props extends RouteComponentProps<{ tab: string, pageNo: string }> {
  actionLogService?: ActionLogService,
  pageService?: PageService,
  reviewService?: ReviewService,
  skProfileService?: SkProfileService,
  lectureService?: LectureService,
  myTrainingService?: MyTrainingService,
  inMyLectureService?: InMyLectureService,
}

interface State {
  type: string
  channels: ChannelModel[]
}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'shared.pageService',
  'shared.reviewService',
  'profile.skProfileService',
  'lecture.lectureService',
  'myTraining.myTrainingService',
  'myTraining.inMyLectureService',
))
@observer
@reactAutobind
class MyLearningPage extends Component<Props, State> {
  //
  PAGE_KEY = 'training';

  PAGE_SIZE = 8;

  state = {
    type: '',
    channels: [],
  };

  componentDidMount(): void {
    this.init();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const { pageService, inMyLectureService, lectureService, myTrainingService } = this.props;
    const currentTab = this.props.match.params.tab;
    const currentPageNo = this.props.match.params.pageNo;

    if (prevProps.match.params.tab !== currentTab) {
      this.selectMenu(currentTab);
    }
    else if (prevProps.match.params.tab === currentTab && prevProps.match.params.pageNo !== currentPageNo) {
      const page = pageService!.pageMap.get(this.PAGE_KEY);
      const offset = page!.limit > this.PAGE_SIZE && page!.nextOffset === 0 ? page!.nextOffset + this.PAGE_SIZE : page!.nextOffset;
      if (currentPageNo === '1') {
        if (currentTab === MyLearningContentType.InMyList) {
          inMyLectureService!.clearInMyLectures();
        }
        if (currentTab === MyLearningContentType.Required) {
          lectureService!.clearLectures();
        } else {
          myTrainingService!.clear();
        }
        pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      }
      else {
        pageService!.initPageMap(this.PAGE_KEY, offset, this.PAGE_SIZE);
      }
      this.findPagingList(this.getPageNo() - 1);
    }
  }

  init() {
    //
    const { match } = this.props;

    this.selectMenu(match.params.tab);
  }

  selectMenu(type: string) {
    //
    const { type: prevType } = this.state;

    if (type !== prevType) {
      const { pageService, lectureService, inMyLectureService, myTrainingService } = this.props;

      if (type === MyLearningContentType.InMyList) {
        inMyLectureService!.clearInMyLectures();
      }
      if (type === MyLearningContentType.Required) {
        lectureService!.clearLectures();
      } else {
        myTrainingService!.clear();
      }

      const initialLimit = this.getPageNo() * this.PAGE_SIZE;
      pageService!.initPageMap(this.PAGE_KEY, 0, initialLimit);
      this.setState({ type }, this.findPagingList);
    }
  }

  async findPagingList(pageNo?: number) {
    const { inMyLectureService, myTrainingService, lectureService, pageService, reviewService } = this.props;
    const { channels } = this.state;
    const channelIds = channels.map((channel: ChannelModel) => channel.channelId);
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { type } = this.state;
    let offsetList: any = null;
    let feedbackIds: string[] = [];

    inMyLectureService!.findAllInMyLectures();

    if (type === MyLearningContentType.InMyList) {
      offsetList = await inMyLectureService!.findInMyLectures(page!.limit, page!.nextOffset, channelIds);
      feedbackIds = (offsetList.results || []).map((lecture: InMyLectureModel) => lecture.reviewId);
      await reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }
    else if (type === MyLearningContentType.Required) {
      offsetList = await lectureService!.findPagingRequiredLectures(page!.limit, page!.nextOffset, channelIds);
    }
    else {
      offsetList = await myTrainingService!.findAndAddAllMyTrainingsWithState(type, page!.limit, page!.nextOffset, channelIds);
    }

    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, offsetList.totalCount, pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1);
  }

  onActionLecture(training: MyTrainingModel | LectureModel | InMyLectureModel) {
    //
    const { type } = this.state;
    const { actionLogService, inMyLectureService, pageService } = this.props;

    actionLogService?.registerSeenActionLog({ lecture: training, subAction: '아이콘' });

    if (training instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(training.id)
        .then(() => {
          if (type === MyLearningContentType.InMyList) {
            inMyLectureService!.clearInMyLectures();
            pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
            this.findPagingList();
          }
          else {
            inMyLectureService!.removeInMyLectureInAllList(training.serviceId, training.serviceType);
          }
        });
    }
    else {
      let servicePatronKeyString = training.patronKey.keyString;
      if (training instanceof MyTrainingModel) servicePatronKeyString = training.servicePatronKeyString;
      inMyLectureService!.addInMyLecture(new InMyLectureCdoModel({
        serviceId: training.serviceId,
        serviceType: training.serviceType,
        category: training.category,
        name: training.name,
        description: training.description,
        cubeType: training.cubeType,
        learningTime: training.learningTime,
        stampCount: training.stampCount,
        coursePlanId: training.coursePlanId,

        requiredSubsidiaries: training.requiredSubsidiaries,
        cubeId: training.cubeId,
        courseSetJson: training.courseSetJson,
        courseLectureUsids: training.courseLectureUsids,
        lectureCardUsids: training.lectureCardUsids,

        reviewId: training.reviewId,
        baseUrl: training.baseUrl,
        servicePatronKeyString,
      })).then(() => {
        if (type === MyLearningContentType.InMyList) {
          inMyLectureService!.clearInMyLectures();
          pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
          this.findPagingList();
        }
        else {
          inMyLectureService!.addInMyLectureInAllList(training.serviceId, training.serviceType);
        }
      });
    }
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;
    const cineroom = patronInfo.getCineroomByPatronId(model.servicePatronKeyString) || patronInfo.getCineroomByDomain(model)!;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      // history.push(lectureRoutePaths.courseOverviewPrev(model.category.college.id, model.coursePlanId, model.serviceType, model.serviceId));
      history.push(lectureRoutePaths.courseOverview(cineroom.id, model.category.college.id, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      // history.push(lectureRoutePaths.lectureCardOverviewPrev(model.category.college.id, model.cubeId, model.serviceId));
      history.push(lectureRoutePaths.lectureCardOverview(cineroom.id, model.category.college.id, model.cubeId, model.serviceId));
    }
  }

  getPageNo() {
    //
    const { match } = this.props;

    return parseInt(match.params.pageNo, 10);
  }

  onClickSeeMore() {
    //
    const { actionLogService, history } = this.props;

    actionLogService?.registerClickActionLog({ subAction: 'list more' });
    history.replace(routePaths.currentPage(this.getPageNo() + 1));
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    if (!page || !page.pageNo || !page.totalPages) return false;
    return page!.pageNo < page!.totalPages;
  }

  onClickActionLog(text: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: text });
  }

  onFilter(channels: ChannelModel[]) {
    const { pageService, inMyLectureService, lectureService, myTrainingService } = this.props;
    const { type } = this.state;
    this.setState({ channels }, () => {
      if (type === MyLearningContentType.InMyList) {
        inMyLectureService!.clearInMyLectures();
      } else if (type === MyLearningContentType.Required) {
        lectureService!.clearLectures();
      } else {
        myTrainingService!.clear();
      }
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      this.findPagingList();
    });
  }

  renderNoSuchContent(noSuchContentPanel: React.ReactNode) {
    //
    const { skProfileService, history } = this.props;
    const { profileMemberName } = skProfileService!;

    return (
      <NoSuchContentPanel message={(
        <>
          <div className="text">{noSuchContentPanel}</div>
          <a
            className="ui icon right button btn-blue2"
            onClick={() => {
              this.onClickActionLog(`${profileMemberName}님에게 추천하는 학습 과정 보기`);
              history.push('/lecture/recommend');
            }}
          >
            {profileMemberName}님에게 추천하는 학습 과정 보기<i className="icon morelink" />
          </a>
        </>
      )}
      />
    );
  }

  render() {
    //
    const { inMyLectureService, lectureService, myTrainingService, reviewService, pageService } = this.props;
    const { ratingMap } = reviewService!;
    const { type, channels } = this.state;
    const { inMyLectureMap } = inMyLectureService!;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    let cardType = Lecture.GroupType.Box;
    let list: (MyTrainingModel | LectureModel | InMyLectureModel)[] = [];

    let noSuchContentPanel = '';

    switch (type) {
      case MyLearningContentType.InMyList:
        list = inMyLectureService!.inMyLectures;
        noSuchContentPanel = '관심목록에 추가한 학습 과정이 없습니다.';
        break;
      case MyLearningContentType.Required:
        list = lectureService!.lectures;
        noSuchContentPanel = '권장과정에 해당하는 학습 과정이 없습니다.';
        break;
      case MyLearningContentType.Completed:
        cardType = Lecture.GroupType.List;
        list = myTrainingService!.myTrainings;
        noSuchContentPanel = '학습완료에 해당하는 학습 과정이 없습니다.';
        break;
      case MyLearningContentType.Enrolled:
        noSuchContentPanel = '수강 대기중인 학습 과정이 없습니다.';
        list = myTrainingService!.myTrainings;
        break;
      case MyLearningContentType.InProgress:
        noSuchContentPanel = '수강중인 학습 과정이 없습니다.';
        list = myTrainingService!.myTrainings;
        break;
      case MyLearningContentType.Retry:
        list = myTrainingService!.myTrainings;
        noSuchContentPanel = '취소/미이수에 해당하는 학습 과정이 없습니다.';
        break;
    }

    if (!list || list.length < 1) {
      return this.renderNoSuchContent(noSuchContentPanel);
    }

    return (
      <>
        <LineHeaderContainer
          count={page && page.totalCount || 0}
          channels={channels}
          onFilter={this.onFilter}
          currentTab={this.props.match.params.tab}
        />

        <Lecture.Group type={cardType}>
          {list.map((value: MyTrainingModel | LectureModel | InMyLectureModel, index: number) => {
            let rating: number | undefined;
            if ((value instanceof InMyLectureModel || value instanceof LectureModel) && value.cubeType !== CubeType.Community) {
              rating = ratingMap.get(value.reviewId) || 0;
            }
            const inMyLecture = inMyLectureMap.get(value.serviceId) || undefined;
            return (
              <Lecture
                key={`training-${index}`}
                model={value}
                rating={rating}
                thumbnailImage={value.baseUrl || undefined}
                action={inMyLecture ? Lecture.ActionType.Remove : Lecture.ActionType.Add}
                onAction={() => {
                  reactAlert({ title: '알림', message: inMyLecture ? '본 과정이 관심목록에서 제외되었습니다.' : '본 과정이 관심목록에 추가되었습니다.' });
                  this.onActionLecture(inMyLecture || value);
                }}
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
      </>
    );
  }
}

export default withRouter(MyLearningPage);
