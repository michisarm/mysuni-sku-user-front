
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { patronInfo } from '@nara.platform/dock';

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
  contentType: string
}

enum ContentType {
  Required = 'Required',
  InMyList = 'InMyList',
  InProgress = 'InProgress',
  Enrolled = 'Enrolled',
}

enum ContentTypeName {
  Required = '권장과정',
  InMyList = '관심목록',
  InProgress = '학습중',
  Enrolled = '학습예정',
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

  state = {
    contentType: ContentType.Required,
  };

  componentDidMount(): void {
    //
    this.findMyContent();

    this.props.notieService!.countMenuNoties('Learning_Progress');
    this.props.notieService!.countMenuNoties('Learning_Waiting');
    this.props.lectureService!.countRequiredLectures();
  }

  async findMyContent() {
    //
    const { inMyLectureService, lectureService, myTrainingService, reviewService } = this.props;
    const { contentType } = this.state;

    inMyLectureService!.findAllInMyLectures();

    switch (contentType) {
      case ContentType.InMyList: {
        inMyLectureService!.clearInMyLectures();
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
        myTrainingService!.findAllMyTrainingsWithState(contentType, this.PAGE_SIZE, 0);
        break;
      case ContentType.Enrolled:
        myTrainingService!.clear();
        myTrainingService!.findAllMyTrainingsWithState(contentType, this.PAGE_SIZE, 0);
        break;
    }
  }

  getTabs() {
    //
    const notieService = this.props.notieService!;
    const lectureService = this.props.lectureService!;
    const inMyLectureService = this.props.inMyLectureService!;

    const inMyLectureAllCount = inMyLectureService.inMyLectureAllCount;

    return [
      {
        name: ContentType.Required,
        item: (
          <>
            { ContentTypeName.Required }
            { lectureService.requiredLecturesCount > 0 && <span className="count">+{lectureService.requiredLecturesCount}</span>}
          </>
        ),
        render: this.renderRequiredList,
      },
      {
        name: ContentType.InMyList,
        item: (
          <>
            { ContentTypeName.InMyList }
            { inMyLectureAllCount > 0 && <span className="count">+{inMyLectureAllCount}</span>}
          </>
        ),
        render: this.renderInMyList,
      },
      {
        name: ContentType.InProgress,
        item: (
          <>
            { ContentTypeName.InProgress }
            { notieService.progressedCount > 0 && <span className="count">+{notieService.progressedCount}</span>}
          </>
        ),
        render: this.renderInProgress,
      },
      {
        name: ContentType.Enrolled,
        item: (
          <>
            { ContentTypeName.Enrolled }
            { notieService.waitingCount > 0 && <span className="count">+{notieService.waitingCount}</span>}
          </>
        ),
        render: this.renderEnrolled,
      },
    ];
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

  onChangeTab({ name }: any) {
    //
    const { contentType } = this.state;

    if (name === contentType) {
      return;
    }

    const { lectureService, inMyLectureService, myTrainingService } = this.props;

    if (name === ContentType.Required) {
      lectureService!.clearLectures();
    }
    else if (name === ContentType.InMyList) {
      inMyLectureService!.clearInMyLectures();
    }
    else {
      myTrainingService!.clear();
    }

    this.setState(
      { contentType: name },
      this.findMyContent,
    );
  }

  onViewAll() {
    //
    const { history } = this.props;
    const { contentType } = this.state;

    history.push(myTrainingRoutes.learningTab(contentType));
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;
    const cineroom = patronInfo.getCineroomByPatronId(model.servicePatronKeyString) || patronInfo.getCineroomByDomain(model)!;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      history.push(lectureRoutePaths.courseOverview(cineroom.id, model.category.college.id, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(lectureRoutePaths.lectureCardOverview(cineroom.id, model.category.college.id, model.cubeId, model.serviceId));
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

  renderRequiredList() {
    //
    const { lectures } = this.props.lectureService!;
    const noSuchElement = <NoSuchContentPanel message={`${ContentTypeName.Required}에 해당하는 학습 과정이 없습니다.`} />;

    return this.renderList(lectures, noSuchElement);
  }

  renderInMyList() {
    //
    const { inMyLectures } = this.props.inMyLectureService!;
    const noSuchElement = <NoSuchContentPanel message={`${ContentTypeName.InMyList}에 추가한 학습 과정이 없습니다.`} />;

    return this.renderList(inMyLectures, noSuchElement);
  }

  renderInProgress() {
    //
    const { myTrainings } = this.props.myTrainingService!;
    const noSuchElement = <NoSuchContentPanel message={`${ContentTypeName.InProgress}인 과정이 없습니다.`} />;

    return this.renderList(myTrainings, noSuchElement);
  }

  renderEnrolled() {
    //
    const { myTrainings } = this.props.myTrainingService!;
    const noSuchElement = <NoSuchContentPanel message={`${ContentTypeName.Enrolled}중인 과정이 없습니다.`} />;

    return this.renderList(myTrainings, noSuchElement);
  }

  renderList(learnings: (MyTrainingModel | LectureModel | InMyLectureModel)[], noSuchComponent: React.ReactNode) {
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
            noSuchComponent
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
        onChangeTab={this.onChangeTab}
        renderItems={this.renderTabItems}
      />
    );
  }
}

export default withRouter(MyLearningContentContainer);
