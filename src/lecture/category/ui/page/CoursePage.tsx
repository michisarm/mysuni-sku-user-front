import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout, ContentMenu, mobxHelper } from 'shared';
import { CollegeService } from 'college';
import { CoursePlanService } from 'course';
import { CubeType } from 'personalcube/personalcube';

import { ReviewService } from '@nara.drama/feedback';
import { CourseLectureService, LectureService, LectureServiceType, ProgramLectureService } from '../../../shared';
import LectureCardHeaderView from '../view/LectureCardHeaderView';
import LectureCardContainer from '../logic/LectureCardContainer';
import LectureOverviewView from '../view/LectureOverviewView';
import LectureCommentsContainer from '../logic/LectureCommentsContainer';
import CourseContainer from '../logic/CourseContainer';
import LectureViewModel from '../../../shared/model/LectureViewModel';


interface Props extends RouteComponentProps<RouteParams> {
  collegeService: CollegeService,
  coursePlanService: CoursePlanService,
  courseLectureService: CourseLectureService,
  programLectureService: ProgramLectureService,
  lectureService: LectureService,
  reviewService: ReviewService,
}

interface State {
  type: string
}

interface RouteParams {
  collegeId: string,
  lectureCardId: string,
  coursePlanId: string,
  serviceId: string,
  serviceType: LectureServiceType,
}

@inject(mobxHelper.injectFrom(
  'collegeService',
  'course.coursePlanService',
  'lecture.courseLectureService',
  'lecture.programLectureService',
  'lecture.lectureService',
  'shared.reviewService',
))
@reactAutobind
@observer
class CoursePage extends Component<Props, State> {
  //
  state= {
    type: 'List',
  };

  componentDidMount() {
    //
    this.init();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.match.params.serviceId !== this.props.match.params.serviceId) {
      this.init();
    }
  }

  async init() {
    //
    this.findBaseInfo();
    this.findProgramOrCourseLecture();
  }

  async findBaseInfo() {
    //
    const {
      match, collegeService, coursePlanService,
    } = this.props;
    const { params } = match;

    collegeService.findCollege(params.collegeId);

    const coursePlan = await coursePlanService.findCoursePlan(params.coursePlanId);
    coursePlanService.findCoursePlanContents(coursePlan.contentsId);
  }

  async findProgramOrCourseLecture() {
    //
    const { match, programLectureService, courseLectureService } = this.props;

    if (match.params.serviceType === LectureServiceType.Program) {
      const {
        reviewFeedbackId,
        lectureCards,
        courseLectures,
      } = await programLectureService.findProgramLecture(match.params.serviceId);
      const lectureViews = await this.findReviewFeedbackAndLectureViews(reviewFeedbackId, lectureCards, courseLectures);

      this.findSubLectureViews(lectureViews);
    }
    else {
      const {
        reviewFeedbackId,
        lectureCards,
      } = await courseLectureService.findCourseLecture(match.params.serviceId);
      this.findReviewFeedbackAndLectureViews(reviewFeedbackId, lectureCards);
    }
  }

  async findReviewFeedbackAndLectureViews(reviewFeedbackId: string, lectureCardIds: string[], courseLectureIds?: string[], ) {
    //
    const { lectureService, reviewService } = this.props;

    reviewService.findReviewSummary(reviewFeedbackId);
    return lectureService.findLectureViews(lectureCardIds, courseLectureIds);
  }

  async findSubLectureViews(lectureViews: LectureViewModel[]) {
    //
    const { lectureService } = this.props;

    lectureViews.map(async (lectureView) => {
      if (lectureView.serviceType === LectureServiceType.Program || lectureView.serviceType === LectureServiceType.Course
        && lectureView.lectureCards && lectureView.lectureCards.length > 0) {
        await lectureService.findSubLectureViews(lectureView.id, lectureView.lectureCards);
      }
    });
  }


  getViewObject() {
    //
    const {
      coursePlanService,
    } = this.props;
    const { coursePlan, coursePlanContents } = coursePlanService!;
    // const { cubeIntro } = cubeIntroService!;

    return {
      // Sub info
      required: false,  // Todo
      // difficultyLevel: cubeIntro.difficultyLevel,
      learningTime: 0,
      participantCount: '1,250',  // Todo

      // instructorName: cubeIntro.description.instructor.name,
      operatorName: coursePlan.courseOperator.name,
      operatorCompany: coursePlan.courseOperator.company,
      operatorEmail: coursePlan.courseOperator.email,

      // Fields
      subCategories: coursePlan.subCategories,
      description: coursePlanContents.description,

      tags: coursePlan.courseOpen.tags,
      surveyId: coursePlanContents.surveyId,
      fileBoxId: coursePlanContents.fileBoxId,
      reportFileBoxId: coursePlan.reportFileBox.fileBoxId,
      stamp: coursePlan.stamp.stampReady && coursePlan.stamp.stampCount || 0,

      //etc
      category: coursePlan.category,
      cubeType: CubeType.None,
      name: coursePlan.name,
      time: coursePlan.time,

      classroom: undefined,
    };
  }

  getTypeViewObject(): any {
    //
    const {
      coursePlanService,
    } = this.props;
    const { coursePlanContents } = coursePlanService!;

    return {
      learningPeriod: coursePlanContents.learningPeriod,
      fileBoxId: '',
    };
  }

  getMenus() {
    //
    const menus: typeof ContentMenu.Menu[] = [
      { name: 'List', type: 'List' },
      { name: 'Overview', type: 'Overview' },
      { name: 'Comments', type: 'Comments' },
    ];

    return menus;
  }

  renderChildren(viewObject: any, typeViewObject: any) {
    //
    const { type } = this.state;

    let reviewFeedbackId = '';
    let commentFeedbackId = '';
    if (this.props.match.params.serviceType === LectureServiceType.Program) {
      const { programLecture } = this.props.programLectureService;
      reviewFeedbackId = programLecture.reviewFeedbackId;
      commentFeedbackId = programLecture.commentFeedbackId;
    }
    else {
      const { courseLecture } = this.props.courseLectureService;
      reviewFeedbackId = courseLecture.reviewFeedbackId;
      commentFeedbackId = courseLecture.commentFeedbackId;
    }

    switch (type) {
      case 'List':
        return (
          <CourseContainer />
        );
      case 'Overview':
        return (
          <LectureOverviewView
            viewObject={viewObject}
            typeViewObject={typeViewObject}
          />
        );
      case 'Comments':
        return (
          <LectureCommentsContainer
            reviewFeedbackId={reviewFeedbackId}
            commentFeedbackId={commentFeedbackId}
          />
        );
      default:
        return null;
    }
  }

  render() {
    //
    const { collegeService, reviewService } = this.props;
    const { college } = collegeService;
    const { reviewSummary } = reviewService;
    const viewObject = this.getViewObject();
    const typeViewObject = this.getTypeViewObject();

    return (
      <ContentLayout
        className="channel"
        breadcrumb={[
          { text: `${college.name} College`, path: `../../../../${college.collegeId}/channels` },
          { text: `${college.name} Course` },
        ]}
      >
        <LectureCardHeaderView
          viewObject={viewObject}
          typeViewObject={typeViewObject}
          rating={reviewSummary.average}
          maxRating={reviewSummary.maxStarCount}
        />
        <ContentMenu
          menus={this.getMenus()}
          type={this.state.type}
          onSelectMenu={(type) => this.setState({ type })}
        />
        <LectureCardContainer
          cubeType={CubeType.None}
          viewObject={viewObject}
          typeViewObject={typeViewObject}
        >
          { this.renderChildren(viewObject, typeViewObject) }
        </LectureCardContainer>
      </ContentLayout>
    );
  }
}

export default withRouter(CoursePage);
