import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Label } from 'semantic-ui-react';
import { patronInfo } from '@nara.platform/dock';
import { CommentService } from '@nara.drama/feedback';

import { CubeType, LearningState, ProposalState } from 'shared/model';
import { ContentLayout, Tab } from 'shared';
import { CollegeService } from 'college/stores';
import { SkProfileService } from 'profile/stores';
import { CoursePlanService } from 'course/stores';
import { InMyLectureCdoModel } from 'myTraining/model';

import routePaths from '../../../routePaths';
import { LectureViewModel, LectureServiceType, StudentCdoModel, StudentJoinRdoModel } from '../../../model';
import { CourseLectureService, LectureService, ProgramLectureService, StudentService } from '../../../stores';
import CourseContentHeaderContainer from '../logic/CourseContentHeaderContainer';
import LectureCardContainer from '../logic/LectureCardContainer';
import LectureOverviewView from '../view/LectureOverviewView';
import LectureCommentsContainer from '../logic/LectureCommentsContainer';
import CourseContainer from '../logic/CourseContainer';
import { State as SubState } from '../../../shared/LectureSubInfo';


interface Props extends RouteComponentProps<RouteParams> {
  skProfileService: SkProfileService,
  collegeService: CollegeService,
  coursePlanService: CoursePlanService,
  courseLectureService: CourseLectureService,
  programLectureService: ProgramLectureService,
  lectureService: LectureService,
  studentService: StudentService,
  commentService: CommentService,
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
  'shared.commentService',
))
@reactAutobind
@observer
class CoursePage extends Component<Props> {
  //
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
    await this.props.studentService!.findIsJsonStudent(this.props.match.params.serviceId);
    this.findStudent();
  }

  /**
   * Course Lecture or Prgrame Lecture 내 Video learning 을 Play한 경우 Lecture의 학습상태를 변경함.
   */
  async onRefreshLearningState()
  {
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
      // console.log(studentJoin);
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
    const { match, programLectureService, courseLectureService, commentService } = this.props;

    if (match.params.serviceType === LectureServiceType.Program) {
      const {
        lectureCardUsids,
        courseLectureUsids,
        commentId,
      } = await programLectureService.findProgramLecture(match.params.serviceId);
      commentService.countByFeedbackId(commentId);
      const lectureViews = await this.findLectureViews(lectureCardUsids, courseLectureUsids);

      this.findSubLectureViews(lectureViews);
    }
    else {
      const {
        lectureCardUsids,
        commentId,
      } = await courseLectureService.findCourseLecture(match.params.serviceId);
      commentService.countByFeedbackId(commentId);

      this.findLectureViews(lectureCardUsids);
    }
  }

  async findLectureViews(lectureCardUsids: string[], courseLectureUsids?: string[], ) {
    //
    const { match, lectureService } = this.props;

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

  getViewObject() {
    //
    const {
      coursePlanService, studentService, courseLectureService,
    } = this.props;
    const { coursePlan, coursePlanContents } = coursePlanService!;
    const { courseLecture } = courseLectureService!;
    const { student } = studentService!;

    // console.log('CoursePage getViewObject() student=', student);

    let state: SubState | undefined;
    let examId: string = '';
    let surveyId: string = '';
    let surveyCaseId: string = '';
    let reportFileBoxId: string = '';
    if (student && student.id) {
      if (student.proposalState === ProposalState.Approved) {
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

      examId = coursePlanContents.testId || '';

      if (!examId && student.phaseCount === student.completePhaseCount && student.learningState === LearningState.Progress) state = SubState.Waiting;

      surveyId = coursePlanContents.surveyId || '';
      surveyCaseId = coursePlanContents.surveyCaseId || '';
      reportFileBoxId = coursePlan.reportFileBox.fileBoxId || '';
    }

    return {
      // Sub info
      required: coursePlan.required,
      // difficultyLevel: cubeIntro.difficultyLevel,
      learningTime: coursePlan.learningTime,
      rollBooksPassedStudentCount: courseLecture.passedStudentCount,  // Todo

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

  getTabs() {
    //
    const { commentCount } = this.props.commentService;

    return [
      { name: 'List', item: 'List', render: this.renderList },
      { name: 'Overview', item: 'Overview', render: this.renderOverview },
      {
        name: 'Comments',
        item: (
          <>
            Comments
            {
              commentCount && commentCount.count > 0 && <span className="count">+{commentCount.count}</span>
              || <span className="count">{commentCount.count}</span>
            }
          </>
        ),
        render: this.renderComments,
      },
    ];
  }

  getReviewId() {
    //
    const { match, programLectureService, courseLectureService } = this.props;
    let reviewId;

    if (match.params.serviceType === LectureServiceType.Program) {
      reviewId = programLectureService.programLecture.reviewId;
    }
    else {
      reviewId = courseLectureService.courseLecture.reviewId;
    }
    return reviewId;
  }

  renderList() {
    //
    const { serviceId } = this.props.match.params!;

    // console.log('CoursePage renderList lectureCardId=', serviceId);

    return this.renderBaseContentWith(

      <CourseContainer
        lectureCardId={serviceId}
        onRefreshLearningState={this.onRefreshLearningState}
      />
    );
  }

  renderOverview() {
    //
    const viewObject = this.getViewObject();
    const typeViewObject = this.getTypeViewObject();

    return this.renderBaseContentWith(
      <LectureOverviewView
        viewObject={viewObject}
        typeViewObject={typeViewObject}
      />
    );
  }

  renderComments() {
    //
    const { programLectureService, courseLectureService, match } = this.props;
    const { params } = match;

    let reviewFeedbackId = '';
    let commentFeedbackId = '';

    if (params.serviceType === LectureServiceType.Program) {
      const { programLecture } = programLectureService;

      reviewFeedbackId = programLecture.reviewId;
      commentFeedbackId = programLecture.commentId;
    }
    else {
      const { courseLecture } = courseLectureService;

      reviewFeedbackId = courseLecture.reviewId;
      commentFeedbackId = courseLecture.commentId;
    }

    return this.renderBaseContentWith(
      <LectureCommentsContainer
        reviewFeedbackId={reviewFeedbackId}
        commentFeedbackId={commentFeedbackId}
      />
    );
  }

  renderBaseContentWith(courseContent: React.ReactNode) {
    //
    const { studentService, match } = this.props;
    const { student, studentJoins } = studentService!;
    const { params } = match;
    const { lectureCardId } = this.props.match.params!;
    const viewObject = this.getViewObject();
    const typeViewObject = this.getTypeViewObject();
    const inMyLectureCdo = this.getInMyLectureCdo(viewObject);

    // console.log('CoursePage renderBaseContentWith viewObject=', viewObject);

    return (
      <LectureCardContainer
        lectureServiceId={params.serviceId}
        lectureCardId={lectureCardId}
        lectureServiceType={params.serviceType}
        inMyLectureCdo={inMyLectureCdo}
        studentCdo={new StudentCdoModel()}
        student={student}
        studentJoins={studentJoins}
        cubeType={CubeType.None}
        viewObject={viewObject}
        typeViewObject={typeViewObject}
        init={this.init}
      >
        {courseContent}
      </LectureCardContainer>
    );
  }

  render() {
    //
    const { collegeService, coursePlanService } = this.props;
    const { college } = collegeService;
    const { coursePlan } = coursePlanService;
    const typeViewObject = this.getTypeViewObject();

    return (
      <ContentLayout
        className="channel"
        breadcrumb={[
          { text: `${college.name} College`, path: routePaths.collegeLectures(college.collegeId) },
          { text: `${coursePlan.category.channel.name} Channel`, path: routePaths.channelLectures(college.collegeId, coursePlan.category.channel.id) },
        ]}
      >
        <CourseContentHeaderContainer
          coursePlan={coursePlan}
          reviewId={this.getReviewId()}
          typeViewObject={typeViewObject}
        />

        <Tab
          className="tab-menu2 offset0"
          tabs={this.getTabs()}
          header={
            <div className="cont-inner summary">
              <Label className={coursePlan.category.color}>{coursePlan.category.college.name}</Label>
              <span className="detail-tit">{coursePlan.name}</span>
            </div>
          }
        />
      </ContentLayout>
    );
  }
}

export default withRouter(CoursePage);
