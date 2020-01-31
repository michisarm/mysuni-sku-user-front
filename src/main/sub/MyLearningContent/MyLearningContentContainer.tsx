
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';
import { ReviewService } from '@nara.drama/feedback';
import { CubeType, Tab, NoSuchContentPanel } from 'shared';
import NotieService from 'layout/UserApp/present/logic/NotieService';
import lectureRoutePaths from 'lecture/routePaths';
import myTrainingRoutes from 'myTraining/routePaths';
import { LectureService, LectureModel, LectureServiceType, Lecture } from 'lecture';
import { MyTrainingService, InMyLectureService, MyTrainingModel, InMyLectureCdoModel, InMyLectureModel } from 'myTraining';
import { ContentWrapper, TabsView } from './MyLearningContentElementsView';


interface Props extends RouteComponentProps {
  notieService?: NotieService,
  reviewService?: ReviewService,
  lectureService?: LectureService,
  myTrainingService?: MyTrainingService,
  inMyLectureService?: InMyLectureService,
}

interface State {
  type: string
}

enum ContentType {
  InMyList = 'InMyList',
  Required = 'Required',
  InProgress = 'InProgress',
  Enrolled = 'Enrolled',
}

@inject(mobxHelper.injectFrom(
  'layout.notieService',
  'shared.reviewService',
  'lecture.lectureService',
  'myTraining.myTrainingService',
  'myTraining.inMyLectureService',
))
@observer
@reactAutobind
class MyLearningContentContainer extends Component<Props, State> {
  //
  PAGE_SIZE = 8;

  state= {
    type: ContentType.Required,
  };

  componentDidMount(): void {
    //
    this.findMyContent();

    this.props.notieService!.countMenuNoties('Learning_Progress');
    this.props.notieService!.countMenuNoties('Learning_Waiting');
  }

  getTabs() {
    //
    const notieService = this.props.notieService!;

    return [
      { name: ContentType.Required, item: '권장과정', render: this.renderRequiredList },
      { name: ContentType.InMyList, item: '관심목록', render: this.renderInMyList },
      {
        name: ContentType.InProgress,
        item: (
          <>
            학습중
            { notieService.progressedCount > 0 && <span className="count">+{notieService.progressedCount}</span>}
          </>
        ),
        render: this.renderInProgress,
      },
      {
        name: ContentType.Enrolled,
        item: (
          <>
            학습예정
            { notieService.waitingCount > 0 && <span className="count">+{notieService.waitingCount}</span>}
          </>
        ),
        render: this.renderEnrolled,
      },
    ];
  }

  async findMyContent() {
    //
    const { inMyLectureService, lectureService, myTrainingService, reviewService } = this.props;
    const { type } = this.state;

    inMyLectureService!.findAllInMyLectures();

    switch (type) {
      case ContentType.InMyList: {
        inMyLectureService!.clear();
        const offsetList = await inMyLectureService!.findInMyLectures(this.PAGE_SIZE, 0);
        const feedbackIds = (offsetList.results || []).map((lecture: InMyLectureModel) => lecture.reviewId);

        reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
        break;
      }
      case ContentType.Required:
        lectureService!.clearLectures();
        lectureService!.findPagingRequiredLectures(this.PAGE_SIZE, 0);
        break;
      case ContentType.InProgress:
        myTrainingService!.clear();
        myTrainingService!.findAllMyTrainingsWithState(type, this.PAGE_SIZE, 0);
        break;
      case ContentType.Enrolled:
        myTrainingService!.clear();
        myTrainingService!.findAllMyTrainingsWithState(type, this.PAGE_SIZE, 0);
        break;
    }
  }

  onSelectTab({ name }: any) {
    //
    const { type } = this.state;

    if (type !== name) {
      const { lectureService, inMyLectureService, myTrainingService } = this.props;

      if (name === ContentType.InMyList) {
        inMyLectureService!.clear();
      }
      if (name === ContentType.Required) {
        lectureService!.clearLectures();
      } else {
        myTrainingService!.clear();
      }

      this.setState(
        { type: name },
        this.findMyContent,
      );
    }
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      history.push(lectureRoutePaths.courseOverview(model.category.college.id, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(lectureRoutePaths.lectureCardOverview(model.category.college.id, model.cubeId, model.serviceId));
    }
  }

  onActionLecture(training: MyTrainingModel | LectureModel | InMyLectureModel) {
    //
    const { inMyLectureService } = this.props;

    if (training instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(training.id)
        .then(this.findMyContent);
    }
    else {
      let servicePatronKeyString = training.patronKey.keyString;

      if (training instanceof MyTrainingModel) {
        servicePatronKeyString = training.servicePatronKeyString;
      }
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
      })).then(this.findMyContent);
    }
  }

  onViewAll() {
    //
    const { history } = this.props;
    const { type } = this.state;

    history.push(myTrainingRoutes.learningTab(type));
  }

  getInMyLecture(serviceId: string) {
    //
    const { inMyLectureMap } = this.props.inMyLectureService!;

    return inMyLectureMap.get(serviceId);
  }

  getRating(learning: LectureModel | InMyLectureModel) {
    //
    const { ratingMap } = this.props.reviewService!;
    let rating: number | undefined;

    if (learning instanceof InMyLectureModel && learning.cubeType !== CubeType.Community) {
      rating = ratingMap.get(learning.reviewId) || 0;
    }
    else if (learning instanceof LectureModel && learning.cubeType !== CubeType.Community) {
      rating = learning.rating;
    }
    return rating;
  }

  renderRequiredList() {
    //
    const { lectures } = this.props.lectureService!;

    return this.renderList(lectures);
  }

  renderInMyList() {
    //
    const { inMyLectures } = this.props.inMyLectureService!;

    return this.renderList(inMyLectures);
  }

  renderInProgress() {
    //
    const { myTrainings } = this.props.myTrainingService!;

    return this.renderList(myTrainings);
  }

  renderEnrolled() {
    //
    const { myTrainings } = this.props.myTrainingService!;

    return this.renderList(myTrainings);
  }

  renderList(learnings: (MyTrainingModel | LectureModel | InMyLectureModel)[]) {
    //
    return (
      <>
        <hr className="dash" />

        <ContentWrapper>
          <div className="right">
            <Button icon className="right btn-blue" onClick={this.onViewAll}>
              View all
              <Icon className="morelink" />
            </Button>
          </div>

          { learnings.length > 0 ?
            <Lecture.Group type={Lecture.GroupType.Line}>
              { learnings.map((learning: LectureModel | MyTrainingModel | InMyLectureModel, index: number) => {
                //
                const inMyLecture = this.getInMyLecture(learning.serviceId);

                return (
                  <Lecture
                    key={`learning-${index}`}
                    model={learning}
                    rating={this.getRating(learning)}
                    thumbnailImage={learning.baseUrl || undefined}
                    action={inMyLecture ? Lecture.ActionType.Remove : Lecture.ActionType.Add}
                    onAction={() => this.onActionLecture(inMyLecture || learning)}
                    onViewDetail={this.onViewDetail}
                  />
                );
              })}
            </Lecture.Group>
            :
            <NoSuchContentPanel message="해당하는 학습과정이 없습니다." />
          }
        </ContentWrapper>
      </>
    );
  }

  renderTabItems({ tabs, activeName, onClickTab }: any) {
    //
    return (
      <TabsView>
        { tabs.map((tab: any, index: number) => (
          <a
            key={`tab-${index}`}
            className={classNames('item', { active: activeName === tab.name })}
            onClick={() => onClickTab(tab)}
          >
            {tab.item}
          </a>
        ))}
      </TabsView>
    );
  }

  render() {
    //
    const tabs = this.getTabs();

    return (
      <Tab
        wrapperClassName="my-learning-area-tab"
        tabs={tabs}
        onChangeTab={this.onSelectTab}
        renderItems={this.renderTabItems}
      />
    );
  }
}

export default withRouter(MyLearningContentContainer);
