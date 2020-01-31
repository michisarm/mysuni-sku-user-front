import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';

import { Label } from 'semantic-ui-react';
import { ContentLayout, ContentMenu, CubeType, ProposalState } from 'shared';
import { CollegeService } from 'college';
import { CoursePlanService } from 'course';
import { InMyLectureService, InMyLectureCdoModel } from 'myTraining';

import { ReviewService } from '@nara.drama/feedback';
import { SkProfileService } from 'profile';
import routePaths from '../../../routePaths';
import {
  CourseLectureService,
  LectureService,
  LectureServiceType,
  ProgramLectureService,
  StudentService,
} from '../../../shared';
import LectureCardHeaderView from '../view/LectureCardHeaderView';
import LectureCardContainer from '../logic/LectureCardContainer';
import LectureOverviewView from '../view/LectureOverviewView';
import LectureCommentsContainer from '../logic/LectureCommentsContainer';
import CourseContainer from '../logic/CourseContainer';
import LectureViewModel from '../../../shared/model/LectureViewModel';
import StudentCdoModel from '../../../shared/model/StudentCdoModel';
import StudentJoinRdoModel from '../../../shared/model/StudentJoinRdoModel';
import { State as SubState } from '../../../shared/LectureSubInfo';
import LearningState from '../../../../shared/model/LearningState';


interface Props extends RouteComponentProps<RouteParams> {
  skProfileService: SkProfileService,
  collegeService: CollegeService,
  coursePlanService: CoursePlanService,
  courseLectureService: CourseLectureService,
  programLectureService: ProgramLectureService,
  lectureService: LectureService,
  studentService: StudentService,
  reviewService: ReviewService,
  inMyLectureService?: InMyLectureService,
}

interface State {
  type: string
}

interface RouteParams {
  cineroomId: string
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
  'lecture.studentService',
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
    this.setCineroom();
    this.init();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.match.params.serviceId !== this.props.match.params.serviceId) {
      this.init();
    }
  }

  componentWillUnmount(): void {
    //
    patronInfo.clearWorkspace();
  }

  setCineroom() {
    //
    const { params } = this.props.match;

    if (params.cineroomId) {
      patronInfo.setWorkspaceById(params.cineroomId);
    }
  }

  async init() {
    //
    this.findBaseInfo();
    this.findProgramOrCourseLecture();
    this.findInMyLecture();
    await this.props.studentService!.findIsJsonStudent(this.props.match.params.serviceId);
    this.findStudent();
  }

  compare(join1: StudentJoinRdoModel, join2: StudentJoinRdoModel) {
    if (join1.updateTime < join2.updateTime) return 1;
    return -1;
  }

  getStudentJoin() {
    const {
      studentService,
    } = this.props;
    const { studentJoins }: StudentService = studentService!;

    if (studentJoins && studentJoins.length) {
      studentJoins.sort(this.compare);
      const studentJoin = studentJoins[0];
      return studentJoin;
    }
    return null;
  }

  findStudent() {
    const {
      studentService,
    } = this.props;
    const { studentJoins }: StudentService = studentService!;

    if (studentJoins && studentJoins.length) {
      const studentJoin = this.getStudentJoin();
      if (studentJoin) studentService!.findStudent(studentJoin.studentId);
      else studentService!.clear();
    }
    else studentService!.clear();
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
      coursePlanService, studentService,
    } = this.props;
    const { coursePlan, coursePlanContents } = coursePlanService!;
    const { student } = studentService!;

    let state: SubState | undefined;
    let examId: string = '';
    let surveyId: string = '';
    let surveyCaseId: string = '';
    let reportFileBoxId: string = '';
    if (student && student.id) {
      if (student.proposalState === ProposalState.Submitted) state = SubState.WaitingForApproval;
      if (student.proposalState === ProposalState.Approved) {
        if (!student.learningState) state = SubState.Enrolled;
        if (
          student.learningState === LearningState.Waiting || student.learningState === LearningState.HomeworkWaiting
          || student.learningState === LearningState.TestWaiting
          || student.learningState === LearningState.TestPassed || student.learningState === LearningState.Failed
        ) {
          state = SubState.Waiting;
        }
        if (student.learningState === LearningState.Progress) state = SubState.InProgress;
        if (student.learningState === LearningState.Passed) state = SubState.Completed;
        if (student.learningState === LearningState.Missed) state = SubState.Missed;
      }
      if (student.proposalState === ProposalState.Rejected) state = SubState.Rejected;

      examId = coursePlanContents.examId || '';
      surveyId = coursePlanContents.surveyId || '';
      surveyCaseId = coursePlanContents.surveyCaseId || '';
      reportFileBoxId = coursePlan.reportFileBox.fileBoxId || '';
    }

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

      state: state || undefined,
      examId,

      // Fields
      subCategories: coursePlan.subCategories,
      description: coursePlanContents.description,

      tags: coursePlan.courseOpen.tags,

      surveyId,
      surveyCaseId,

      fileBoxId: coursePlanContents.fileBoxId,
      reportFileBoxId,
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
            studentCdo={new StudentCdoModel()}
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
