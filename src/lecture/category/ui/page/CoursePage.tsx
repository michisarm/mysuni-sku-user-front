import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Label } from 'semantic-ui-react';

import { ContentLayout, ContentMenu, CubeType, ProposalState } from 'shared';
import { CollegeService } from 'college';
import { CoursePlanService } from 'course';
import { InMyLectureService, InMyLectureCdoModel } from 'myTraining';

import { ReviewService } from '@nara.drama/feedback';
import { SkProfileService } from 'profile';
import routePaths from '../../../routePaths';
import { CourseLectureService, LectureService, LectureServiceType, ProgramLectureService } from '../../../shared';
import LectureCardHeaderView from '../view/LectureCardHeaderView';
import LectureCardContainer from '../logic/LectureCardContainer';
import LectureOverviewView from '../view/LectureOverviewView';
import LectureCommentsContainer from '../logic/LectureCommentsContainer';
import CourseContainer from '../logic/CourseContainer';
import LectureViewModel from '../../../shared/model/LectureViewModel';
import StudentCdoModel from '../../../shared/model/StudentCdoModel';
import RollBookService from '../../../shared/present/logic/RollBookService';


interface Props extends RouteComponentProps<RouteParams> {
  skProfileService: SkProfileService,
  collegeService: CollegeService,
  coursePlanService: CoursePlanService,
  courseLectureService: CourseLectureService,
  programLectureService: ProgramLectureService,
  lectureService: LectureService,
  rollBookService: RollBookService,
  reviewService: ReviewService,
  inMyLectureService?: InMyLectureService,
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
  'college.collegeService',
  'profile.skProfileService',
  'course.coursePlanService',
  'lecture.courseLectureService',
  'lecture.programLectureService',
  'lecture.lectureService',
  'lecture.rollBookService',
  'shared.reviewService',
  'myTraining.inMyLectureService',
))
@reactAutobind
@observer
class CoursePage extends Component<Props, State> {
  //
  state= {
    type: 'List',
  };

  constructor(props: Props) {
    //
    super(props);
    props.coursePlanService.clearCoursePlan();
    props.coursePlanService.clearCoursePlanContents();
    props.lectureService.clearLectureViews();
  }

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
    this.findInMyLecture();
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
        reviewId,
        lectureCardUsids,
        courseLectureUsids,
      } = await programLectureService.findProgramLecture(match.params.serviceId);
      const lectureViews = await this.findReviewFeedbackAndLectureViews(reviewId, lectureCardUsids, courseLectureUsids);

      this.findSubLectureViews(lectureViews);
    }
    else {
      const {
        reviewId,
        lectureCardUsids,
      } = await courseLectureService.findCourseLecture(match.params.serviceId);
      this.findReviewFeedbackAndLectureViews(reviewId, lectureCardUsids);
    }
  }

  async findReviewFeedbackAndLectureViews(reviewId: string, lectureCardUsids: string[], courseLectureUsids?: string[], ) {
    //
    const { match, lectureService, reviewService } = this.props;

    reviewService.findReviewSummary(reviewId);
    return lectureService.findLectureViews(match.params.coursePlanId, lectureCardUsids, courseLectureUsids);
  }

  async findSubLectureViews(lectureViews: LectureViewModel[]) {
    //
    const { lectureService } = this.props;

    lectureViews.map(async (lectureView) => {
      if (lectureView.serviceType === LectureServiceType.Program || lectureView.serviceType === LectureServiceType.Course
        && lectureView.lectureCardUsids && lectureView.lectureCardUsids.length > 0) {
        await lectureService.findSubLectureViews(lectureView.id, lectureView.coursePlanId, lectureView.lectureCardUsids);
      }
    });
  }

  async findInMyLecture() {
    const { inMyLectureService, match } = this.props;
    const { params } = match;
    return inMyLectureService!.findInMyLecture(params.serviceId, params.serviceType);
  }


  getViewObject() {
    //
    const {
      coursePlanService,
    } = this.props;
    const { coursePlan, coursePlanContents } = coursePlanService!;

    return {
      // Sub info
      required: coursePlan.required,
      // difficultyLevel: cubeIntro.difficultyLevel,
      learningTime: coursePlan.learningTime,
      participantCount: '0',  // Todo

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
      cubeType: 'Course',
      cubeTypeName: 'Course',
      name: coursePlan.name,
      time: coursePlan.time,

      classroom: undefined,
      thumbnailImage: coursePlan.iconBox.baseUrl || '',
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

  getInMyLectureCdo(viewObject: any): InMyLectureCdoModel {
    const {
      coursePlanService, programLectureService, courseLectureService, match,
    } = this.props;
    const { coursePlan, coursePlanContents } = coursePlanService!;
    const { programLecture } = programLectureService!;
    const { courseLecture } = courseLectureService!;
    return new InMyLectureCdoModel({
      serviceType: this.props.match.params.serviceType,
      serviceId: this.props.match.params.serviceId,
      category: coursePlan.category,
      name: coursePlan.name,
      description: coursePlanContents.description,
      cubeType: null,
      learningTime: viewObject.learningTime,
      stampCount: coursePlan.stamp.stampCount,
      coursePlanId: coursePlan.coursePlanId,
      requiredSubsidiaries: coursePlan.courseOpen.requiredSubsidiaries,
      cubeId: '',
      courseSetJson: coursePlanContents.courseSet,
      courseLectureUsids: match.params.serviceType === 'Program' ? programLecture.courseLectureUsids : [],
      lectureCardUsids: match.params.serviceType === 'Program' ? programLecture.lectureCardUsids || [] : courseLecture!.lectureCardUsids || [],
      reviewId: match.params.serviceType === 'Program' ? programLecture!.reviewId || '' : courseLecture!.reviewId || '',
      baseUrl: coursePlan.iconBox.baseUrl,
      servicePatronKeyString: coursePlan.patronKey.keyString,
    });
  }

  getStudentCdo(): StudentCdoModel {
    const {
      skProfileService, rollBookService, programLectureService, courseLectureService,
    } = this.props;
    const { skProfile } = skProfileService!;
    const { rollBook } = rollBookService!;
    const { member } = skProfile;
    return new StudentCdoModel({
      rollBookId: rollBook.id,
      name: member.name,
      email: member.email,
      company: member.company,
      department: member.department,
      proposalState: ProposalState.Submitted,
      programLectureUsid: programLectureService!.programLecture!.usid,
      courseLectureUsid: courseLectureService!.courseLecture!.usid,
    });
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
      reviewFeedbackId = programLecture.reviewId;
      commentFeedbackId = programLecture.commentId;
    }
    else {
      const { courseLecture } = this.props.courseLectureService;
      reviewFeedbackId = courseLecture.reviewId;
      commentFeedbackId = courseLecture.commentId;
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
    const { collegeService, coursePlanService, reviewService, inMyLectureService } = this.props;
    const { college } = collegeService;
    const { coursePlan } = coursePlanService;
    const { reviewSummary } = reviewService;
    const { inMyLecture } = inMyLectureService!;
    const { lectureCardId } = this.props.match.params!;
    const viewObject = this.getViewObject();
    const typeViewObject = this.getTypeViewObject();
    const inMyLectureCdo = this.getInMyLectureCdo(viewObject);
    const studentCdo = this.getStudentCdo();

    return (
      <ContentLayout
        className="channel"
        breadcrumb={[
          { text: `${college.name} College`, path: routePaths.collegeLectures(college.collegeId) },
          { text: `${coursePlan.category.channel.name} Channel`, path: routePaths.channelLectures(college.collegeId, coursePlan.category.channel.id) },
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
          lectureHeader={
            <div className="cont-inner summary">
              <Label color={viewObject.category.color}>{viewObject.category.college.name}</Label>
              <span className="detail-tit">{viewObject.name}</span>
            </div>
          }
        >
          <LectureCardContainer
            inMyLecture={inMyLecture}
            inMyLectureCdo={inMyLectureCdo}
            studentCdo={studentCdo}
            lectureCardId={lectureCardId}
            cubeType={CubeType.None}
            viewObject={viewObject}
            typeViewObject={typeViewObject}
          >
            { this.renderChildren(viewObject, typeViewObject) }
          </LectureCardContainer>
        </ContentMenu>
      </ContentLayout>
    );
  }
}

export default withRouter(CoursePage);
