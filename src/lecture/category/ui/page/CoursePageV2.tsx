import React, { Component } from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Label } from 'semantic-ui-react';
import { patronInfo } from '@nara.platform/dock';
import { CommentService } from '@nara.drama/feedback';

import { CubeType, LearningState, ProposalState } from 'shared/model';
import { ContentLayout, Tab } from 'shared';
import { ActionEventService } from 'shared/stores';
import { CollegeService } from 'college/stores';
import { SkProfileService } from 'profile/stores';
import { CoursePlanService } from 'course/stores';
import { ExaminationService, ExamPaperService } from 'assistant/stores';
import {
  AnswerSheetService,
  SurveyCaseService,
  SurveyFormService,
} from 'survey/stores';
import { InMyLectureCdoModel } from 'myTraining/model';
import { MyTrainingService } from 'myTraining/stores';
import routePaths from '../../../routePaths';
import {
  LectureServiceType,
  LectureViewModel,
  StudentCdoModel,
  StudentJoinRdoModel,
} from '../../../model';
import {
  CourseLectureService,
  LectureService,
  ProgramLectureService,
  StudentService,
} from '../../../stores';
import CourseContentHeaderContainer from '../logic/CourseContentHeaderContainer';
import LectureCardContainer from '../logic/LectureCardContainer';
import LectureOverviewViewV2 from '../view/LectureOverviewViewV2';
import LectureCommentsContainer from '../logic/LectureCommentsContainer';
import CourseContainer from '../logic/CourseContainer';
import { State as SubState } from '../../../shared/LectureSubInfo';
import { AnswerProgress } from '../../../../survey/answer/model/AnswerProgress';
import StudentApi from '../../../shared/present/apiclient/StudentApi';
import StudentInfoModel from '../../../model/StudentInfoModel';
import { SurveyFormModel } from '../../../../survey/form/model/SurveyFormModel';


interface Props extends RouteComponentProps<RouteParams> {
  actionEventService: ActionEventService;
  skProfileService: SkProfileService;
  collegeService: CollegeService;
  courseLectureService: CourseLectureService;
  programLectureService: ProgramLectureService;
  lectureService: LectureService;
  studentService: StudentService;
  commentService: CommentService;

  coursePlanService: CoursePlanService;
  examinationService: ExaminationService;
  examPaperService: ExamPaperService;
  answerSheetService: AnswerSheetService;
  surveyCaseService: SurveyCaseService;
  surveyFormService: SurveyFormService;
}

interface State {
  loaded: boolean;
  examTitle: string;
  surveyState: boolean;
  surveyTitle: string | any;
  tabState: string;
  isPreCoursePassed: boolean;
  type: string;
  name: string;
}

interface RouteParams {
  cineroomId: string;
  collegeId: string;
  lectureCardId: string;
  coursePlanId: string;
  serviceId: string;
  serviceType: LectureServiceType;
}

@inject(
  mobxHelper.injectFrom(
    'shared.actionEventService',
    'college.collegeService',
    'profile.skProfileService',
    'lecture.courseLectureService',
    'lecture.programLectureService',
    'lecture.lectureService',
    'lecture.studentService',
    'shared.commentService',

    'course.coursePlanService',
    'assistant.examinationService',
    'assistant.examPaperService',
    'survey.answerSheetService',
    'survey.surveyCaseService',
    'survey.surveyFormService'
  )
)
@reactAutobind
@observer
class CoursePageV2 extends Component<Props, State> {
  //
  state = {
    loaded: false,
    examTitle: '',
    surveyState: false,
    surveyTitle: '',
    tabState: '',
    isPreCoursePassed: true,
    passedState: false,
    type: '',
    name: '',
  };

  // 선수코스 학습 완료 여부
  isPreCoursePassed: boolean = true;

  constructor(props: Props) {
    //
    super(props);
    props.coursePlanService.clearCoursePlan();
    props.coursePlanService.clearCoursePlanContents();
    props.lectureService.clearLectureViews();

    // const { cineroomId, collegeId, lectureCardId, coursePlanId, serviceId, serviceType } = this.props.match.params!;
    //
    // console.log('Course Page : ', cineroomId);
    // console.log('Course Page : ', collegeId);
    // console.log('Course Page : ', lectureCardId);
    // console.log('Course Page : ', coursePlanId);
    // console.log('Course Page : ', serviceId);
    // console.log('Course Page : ', serviceType);
  }

  componentDidMount() {
    //
    this.setCineroom();
    this.init();
    // console.log('Course Page : componentDidMount');
  }

  componentDidUpdate(prevProps: Props) {
    //
    // console.log('serviceId : ', prevProps.match.params.serviceId, ' - ', this.props.match.params.serviceId);
    // console.log('serviceType : ', prevProps.match.params.serviceType, ' - ', this.props.match.params.serviceType);

    if (
      prevProps.match.params.serviceType !== this.props.match.params.serviceType
    ) {
      window.location.reload();
    } else if (
      prevProps.match.params.serviceId !== this.props.match.params.serviceId
    ) {
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
    this.setState({ loaded: false });
    await this.findBaseInfo();
    MyTrainingService.instance.saveNewLearningPassedToStorage('Passed');
    // this.findProgramOrCourseLecture();
    // await this.props.studentService!.findIsJsonStudent(this.props.match.params.serviceId);
    // await this.findStudent();
    // await this.getPreCourseModel();
    this.publishViewEvent();
    this.setState({ loaded: true });
  }

  publishViewEvent() {
    const { actionEventService, coursePlanService } = this.props;
    const { match } = this.props;
    const { serviceType, collegeId, coursePlanId, serviceId } = match.params;

    const courseName = coursePlanService.coursePlan.name;
    const menu = 'COURSE_VIEW';
    const lectureCardId = serviceId;

    actionEventService.registerViewActionLog({
      menu,
      serviceType,
      collegeId,
      coursePlanId,
      lectureCardId,
      courseName,
    });
  }

  /**
   * Course Lecture or Prgrame Lecture 내 Video learning 을 Play한 경우 Lecture의 학습상태를 변경함.
   */
  async onRefreshLearningState() {
    await this.props.studentService!.findIsJsonStudent(
      this.props.match.params.serviceId
    );
    this.findStudent();
  }

  compare(join1: StudentJoinRdoModel, join2: StudentJoinRdoModel) {
    if (join1.updateTime < join2.updateTime) return 1;
    return -1;
  }

  getStudentJoin() {
    const { studentService } = this.props;
    const { studentJoins }: StudentService = studentService!;

    if (studentJoins && studentJoins.length) {
      studentJoins.sort(this.compare);
      const studentJoin = studentJoins[0];
      return studentJoin;
    }
    return null;
  }

  async findStudent() {
    const { studentService } = this.props;
    const { studentJoins }: StudentService = studentService!;

    if (studentJoins && studentJoins.length) {
      const studentJoin = this.getStudentJoin();

      if (studentJoin) await studentService!.findStudent(studentJoin.studentId);
      else studentService!.clear();
    } else studentService!.clear();
  }

  async findStudentInfo() {
    const { coursePlanService } = this.props;
    return coursePlanService.setStudentInfo();
  }

  async findBaseInfo() {
    //
    const {
      match,
      collegeService,
      coursePlanService,
      answerSheetService,
      surveyCaseService,
      courseLectureService,
      lectureService,
      examinationService,
      examPaperService,
    } = this.props;
    const { params } = match;

    await coursePlanService
      .findAllCoursePlanInfo(params.coursePlanId, params.serviceId)
      .then(() =>
        this.findStudentInfo().then(() => {
          this.findSurveyAnswerSheet();
          this.getPreCourseModel();
        })
      );

    if (coursePlanService.coursePlanContents.testId) {
      // const examination = await ExaminationService.instance.findExamination(coursePlanService.coursePlanContents.testId);
      // const examPaper = await ExamPaperService.instance.findExamPaper(examination.paperId);1

      // console.log(
      //   'examPaperService.examPaper.title : ',
      //   examPaperService.examPaper.title
      // );
      const examTitle = examPaperService.examPaper.title;
      this.state.examTitle = examTitle;
      this.setState({examTitle});
    }
    //
    // collegeService.findCollege(params.collegeId);
    // const coursePlan = await coursePlanService.findCoursePlan(params.coursePlanId);
    // await coursePlanService.findCoursePlanContentsV2(coursePlan.contentsId);
    // if (coursePlanService.coursePlanContents.testId) {
    //   const examination = await ExaminationService.instance.findExamination(coursePlanService.coursePlanContents.testId);
    //   const examPaper = await ExamPaperService.instance.findExamPaper(examination.paperId);
    //
    //   this.state.examTitle = examPaper.title;
    // }
    //
    // if (coursePlanService.coursePlanContents.surveyCaseId) {
    //     await AnswerSheetService.instance.findAnswerSheet(coursePlanService.coursePlanContents.surveyCaseId);
    //     const surveyCase = await surveyCaseService!.findSurveyCase(coursePlanService.coursePlanContents.surveyCaseId);
    //     answerSheetService.setAnswerSheet(answerSheetService.answerSheet);
    //     const surveyCase = surveyCaseService.surveyCase;

    //   const obj = JSON.parse(JSON.stringify(surveyCaseService.getSurveyCase));
    //   const title = JSON.parse(JSON.stringify(obj.langStringMap));
    //
    //   const { answerSheet } = answerSheetService!;
    //   const disabled =
    //     answerSheet &&
    //     answerSheet.progress &&
    //     answerSheet.progress === AnswerProgress.Complete;
    //
    //   this.state.surveyState = disabled;
    //   this.state.surveyTitle = title.ko;
    // }
  }

  // 선수코스 세팅..
  getPreCourseModel() {
    // console.log('선수코스 세팅 시작!');
    const {
      match,
      coursePlanService,
      courseLectureService,
      studentService,
      history,
    } = this.props;
    const { location } = history;

    // console.log('location : ', location);
    let isPreCoursePassed = true;

    if (!location.search.match('postCourseLectureId')) {
      // course_plan 테이블

      // 선수코스 학습 상태 및 필수/선택 에 따라 현재 코스 학습 가능 여부를 판단.
      // console.log(studentService.StudentInfos);
      if (
        courseLectureService.getPreLectureViews &&
        studentService.StudentInfos!.preCourses
      ) {
        if ( courseLectureService.getPreLectureViews.length === studentService.StudentInfos!.preCourses?.length ) {
          const preLectureViews = courseLectureService.getPreLectureViews;
          const preCourseStudentList = studentService.StudentInfos!.preCourses;
          // console.log('preCoursePlanSet : ', preLectureViews, 'preCourseStudentList : ', preCourseStudentList);
          // @ts-ignore
          for (let i = 0; i < preCourseStudentList.length; i++) {
            // @ts-ignore
            const preCourse = preCourseStudentList[i];
            for (let j = 0; j < preLectureViews.length; j++) {
              const preLectureView = preLectureViews[j];
              // console.log( 'preCourseInfo : ', preLectureView.serviceId, preCourse.lectureUsid, preLectureView.required, preCourse.learningState );
              if (preLectureView.serviceId === preCourse.lectureUsid) {
                if (
                  preLectureView.required &&
                  preCourse.learningState !== 'Passed'
                ) {
                  // console.log('preLectureView.required : ', preLectureView.required, 'preCourse.learningState : ', preCourse.learningState);
                  isPreCoursePassed = false;
                  break;
                }
              }
            }
          }
        } else {
          const preLectureViews = courseLectureService.getPreLectureViews;
          const preCourseStudentList = studentService.StudentInfos!.preCourses;
          const preCourseIds: string[] = [];

          preCourseStudentList?.forEach( preCourse => {
            preCourseIds.push(preCourse.lectureUsid);
          });

          preLectureViews.forEach( preLectureView => {
            if (preLectureView.required && !preCourseIds.includes(preLectureView.serviceId)) {
              isPreCoursePassed = false;
            }
          });
        }
      } else if (
        courseLectureService.getPreLectureViews &&
        !studentService.StudentInfos!.preCourses
      ) {
        const preLectureViews = courseLectureService.getPreLectureViews;

        preLectureViews.forEach( preLectureView => {
          if (preLectureView.required) isPreCoursePassed = false;
        });

        // for (let j = 0; j < preLectureViews.length; j++) {
        //   const preLectureView = preLectureViews[j];
        //   if (preLectureView.required) isPreCoursePassed = false;
        //   break;
        // }
      }

      // console.log('isPreCoursePassed? : ', isPreCoursePassed);
      this.setState({ isPreCoursePassed });
    }
  }

  async findSurveyAnswerSheet() {
    const {
      coursePlanService,
      surveyFormService,
      examPaperService,
    } = this.props;

    if (coursePlanService.coursePlanContents.surveyCaseId) {
      await AnswerSheetService.instance
        .findAnswerSheet(coursePlanService.coursePlanContents.surveyCaseId)
        .then((response) => {
          // console.log('answerSheet : ', response);
          const disabled =
            response && response.progress === AnswerProgress.Complete;
          // this.state.surveyState = disabled;
          this.setState({ surveyState: disabled });
          // this.setState({})
        });
    }

    if (coursePlanService.coursePlanContents.surveyId) {
      await surveyFormService
        .findSurveyForm(coursePlanService.coursePlanContents.surveyId)
        .then((response) => {
          // console.log('surveyForm : ', response);
          const surveyForm: SurveyFormModel = response;
          this.setState({ surveyTitle: surveyForm.titles.langStringMap.get('ko') });
        });
    }

    if (coursePlanService.coursePlanContents.testId) {

      // console.log(
      //   'examPaperService.examPaper.title : ',
      //   examPaperService.examPaper.title
      // );
      const examTitle = examPaperService.examPaper.title;
      this.state.examTitle = examTitle;
      this.setState({examTitle});
    }
  }

  async findProgramOrCourseLecture() {
    //
    const {
      match,
      programLectureService,
      courseLectureService,
      commentService,
    } = this.props;

    if (match.params.serviceType === LectureServiceType.Program) {
      const {
        lectureCardUsids,
        courseLectureUsids,
        commentId,
      } = await programLectureService.findProgramLecture(
        match.params.serviceId
      );
      commentService.countByFeedbackId(commentId);
      const lectureViews = await this.findLectureViewsV2(
        lectureCardUsids,
        courseLectureUsids
      );

      this.findSubLectureViews(lectureViews);
    } else {
      const {
        lectureCardUsids,
        commentId,
      } = await courseLectureService.findCourseLecture(match.params.serviceId);
      commentService.countByFeedbackId(commentId);

      this.findLectureViewsV2(lectureCardUsids);
    }
  }

  async findLectureViewsV2(
    lectureCardUsids: string[],
    courseLectureUsids?: string[]
  ) {
    //
    const { match, lectureService } = this.props;

    return lectureService.findLectureViewsV2(
      match.params.coursePlanId,
      lectureCardUsids,
      courseLectureUsids
    );
  }

  async findSubLectureViews(lectureViews: LectureViewModel[]) {
    //
    const { lectureService } = this.props;

    lectureViews.map(async (lectureView) => {
      if (
        lectureView.serviceType === LectureServiceType.Program ||
        (lectureView.serviceType === LectureServiceType.Course &&
          lectureView.lectureCardUsids &&
          lectureView.lectureCardUsids.length > 0)
      ) {
        await lectureService.findSubLectureViewsV2(
          lectureView.id,
          lectureView.coursePlanId,
          lectureView.lectureCardUsids
        );
      }
    });
  }

  checkNullValue(value: any) {
    return value !== null ? value : '';
  }

  getViewObject() {
    //
    const {
      coursePlanService,
      studentService,
      courseLectureService,
      examPaperService,
      examinationService,
      surveyCaseService,
    } = this.props;
    const { coursePlan, coursePlanContents } = coursePlanService!;
    const { courseLecture } = courseLectureService!;
    const { student } = studentService!;

    let state: SubState | undefined;
    let examId: string = '';
    let examTitle: string = '';
    let surveyId: string = '';
    let surveyTitle: string = '';
    let surveyState: boolean = false;
    let surveyCaseId: string = '';
    let reportFileBoxId: string = '';
    let tabState: string = '';
    let passedState: boolean = false;
    let examType: string = '';
    let examName: string = '';

    // console.log('student : ', student);
    // console.log('examinationService : ', examinationService);
    if (student && student.id) {
      this.setExamState(student);

      if (student.proposalState === ProposalState.Approved) {
        if (
          student.learningState === LearningState.Waiting ||
          student.learningState === LearningState.HomeworkWaiting ||
          student.learningState === LearningState.TestWaiting ||
          student.learningState === LearningState.TestPassed ||
          student.learningState === LearningState.Failed
        ) {
          state = SubState.InProgress;
        }
        if (student.learningState === LearningState.Progress) {
          state = SubState.InProgress;
        }
        if (student.learningState === LearningState.Passed) {
          state = SubState.Completed;
        }
        if (student.learningState === LearningState.Missed) {
          state = SubState.Missed;
        }
      }

      if (student && student.learningState === LearningState.Passed) {
        passedState = true;
      }

      // if (student.learningState === LearningState.Progress) {
      //   if (student.phaseCount !== student.completePhaseCount) {
      //     state = SubState.Waiting;
      //   }
      // }

      if (
        !examId &&
        student.phaseCount !== student.completePhaseCount &&
        student.learningState === LearningState.Progress
      ) {
        // console.log('Course Page Waiting : ', SubState.InProgress);
        state = SubState.InProgress;
      }

      // console.log('student info  gget~~~~~~~~~~~~~~~~~');
    } else {
      this.setExamState();
    }

    examId = coursePlanContents.testId || '';
    // examTitle = this.state.examTitle || '';
    examTitle = examPaperService.examPaper?.title || '';
    surveyId = coursePlanContents.surveyId || '';
    surveyTitle = this.state.surveyTitle || '';
    // surveyTitle =
    //   surveyCaseService.surveyCase.titles?.langStringMap.get('ko') || '';
    surveyState = this.state.surveyState || false;
    surveyCaseId = coursePlanContents.surveyCaseId || '';
    reportFileBoxId = coursePlan.reportFileBox
      ? coursePlan.reportFileBox.fileBoxId
      : '';
    tabState = this.state.tabState || '';
    examType = this.state.type || '';
    examName = this.state.name || '';

    return {
      // Sub info
      required: coursePlan.required,
      // difficultyLevel: cubeIntro.difficultyLevel,
      learningTime: coursePlan.learningTime,
      rollBooksPassedStudentCount: courseLecture.passedStudentCount, // Todo

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

      examTitle,
      surveyId,
      surveyTitle,
      surveyState,
      surveyCaseId,
      tabState,
      passedState,
      examType,
      examName,

      fileBoxId: coursePlanContents.fileBoxId,
      totalCourseCount: coursePlanContents.totalCourseCount,
      reportFileBoxId,
      stamp: (coursePlan.stamp.stampReady && coursePlan.stamp.stampCount) || 0,

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
    const { coursePlanService } = this.props;
    const { coursePlanContents } = coursePlanService!;

    return {
      learningPeriod: coursePlanContents.learningPeriod,
      fileBoxId: '',
    };
  }

  getInMyLectureCdo(viewObject: any): InMyLectureCdoModel {
    const {
      coursePlanService,
      programLectureService,
      courseLectureService,
      match,
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
      courseLectureUsids:
        match.params.serviceType === 'Program'
          ? programLecture.courseLectureUsids
          : [],
      lectureCardUsids:
        match.params.serviceType === 'Program'
          ? programLecture.lectureCardUsids || []
          : courseLecture!.lectureCardUsids || [],
      reviewId:
        match.params.serviceType === 'Program'
          ? programLecture!.reviewId || ''
          : courseLecture!.reviewId || '',
      baseUrl: coursePlan.iconBox.baseUrl,
      servicePatronKeyString: coursePlan.patronKey.keyString,
    });
  }

  getTabs() {
    //
    const { commentCount } = this.props.commentService;

    return [
      /*{ name: 'List', item: 'List', render: this.renderList },*/
      { name: 'Overview', item: 'Overview', render: this.renderOverview },
      {
        name: 'Comments',
        item: (
          <>
            Comments
            {(commentCount && commentCount.count > 0 && (
              <span className="count">+{commentCount.count}</span>
            )) || <span className="count">{commentCount.count}</span>}
          </>
        ),
        render: this.renderComments,
      },
    ];
  }

  testCallback() {
    const { studentService } = this.props;
    const { student }: StudentService = studentService!;
    const viewObject = this.getViewObject();

    if (viewObject.examId) {
      StudentApi.instance
        .modifyStudentForExam(student.id, viewObject.examId)
        .then(() => {
        });
    }
  }

  surveyCallback() {
    if (this.init()) this.init();
  }

  getReviewId() {
    //
    const { match, programLectureService, courseLectureService } = this.props;
    let reviewId;

    if (match.params.serviceType === LectureServiceType.Program) {
      reviewId = programLectureService.programLecture.reviewId;
    } else {
      reviewId = courseLectureService.courseLecture.reviewId;
    }
    return reviewId;
  }

  onPageInit() {
    this.init();
  }

  onPageRefresh() {
    // const { history, match } = this.props;
    // const { params } = match;

    // history.replace('/empty');
    // setTimeout(() => {
    window.location.reload();
    // if (params.cineroomId) {
    //   history.replace(routePaths.courseOverview(params.cineroomId, params.collegeId, params.coursePlanId, params.serviceType, params.serviceId));
    // }
    // else {
    //   history.replace(routePaths.courseOverviewPrev(params.collegeId, params.coursePlanId, params.serviceType, params.serviceId));
    // }
    // });
  }

  // renderList() {
  //   //
  //   const { serviceId } = this.props.match.params!;
  //   const { coursePlanService } = this.props;
  //   this.state.tabState = 'list';
  //
  //   return this.renderBaseContentWith(
  //
  //     <CourseContainer
  //       lectureCardId={serviceId}
  //       onRefreshLearningState={this.onRefreshLearningState}
  //       coursePlanService={coursePlanService}
  //       onPageRefresh={this.onPageRefresh}
  //     />
  //   );
  // }

  setExamState(studentData?: any) {
    // console.log('시험정보 세팅');
    // console.log('studentData : ',studentData);
    // console.log('serviceType : ' + studentData.serviceType);

    if (studentData && studentData.learningState === LearningState.Passed) {
      this.state.passedState = true;
    }

    this.setStateName('1', 'Test');
    // console.log('setExamState : ', studentData);
    if (studentData) {
      if (
        studentData.phaseCount === studentData.completePhaseCount &&
        (studentData.learningState === LearningState.Progress ||
          studentData.learningState === LearningState.HomeworkWaiting)
      ) {
        this.setStateName('0', 'Test');
      } else if (
        studentData.phaseCount === studentData.completePhaseCount &&
        studentData.learningState === LearningState.Failed &&
        studentData.studentScore.numberOfTrials < 3
      ) {
        // this.setStateName('2', `재응시(${studentData.studentScore.numberOfTrials}/3)`);
        // // subActions.push({ type: `재응시(${student.numberOfTrials}/3)`, onAction: this.onTest });
        this.setStateName(
          '0',
          `재응시 (${studentData.studentScore.numberOfTrials})`
        );
      } else if (
        studentData.phaseCount === studentData.completePhaseCount &&
        studentData.learningState === LearningState.Failed &&
        studentData.studentScore.numberOfTrials > 2
      ) {
        // this.setStateName('3', `재응시(${studentData.studentScore.numberOfTrials}/3)`);
        // // subActions.push({ type: `재응시(${student.numberOfTrials}/3)`, onAction: this.onTest });
        this.setStateName(
          '0',
          `재응시 (${studentData.studentScore.numberOfTrials})`
        );
      } else if (studentData.learningState === LearningState.Missed) {
        // this.setStateName('4', '미이수');
        this.setStateName(
          '0',
          `재응시 (${studentData.studentScore.numberOfTrials})`
        );
      } else if (studentData.learningState === LearningState.Passed || studentData.learningState === LearningState.TestPassed) {
        this.setStateName('5', '이수');
      } else if (studentData.learningState === LearningState.TestWaiting) {
        this.setStateName('5', '결과대기');
      } else {
        this.setStateName('1', 'Test');
      }
    }

    // console.log('type : ' + this.state.type + ', name : ' + this.state.name);
  }

  setStateName(type: string, name: string) {
    this.state.type = type;
    this.state.name = name;
  }

  renderOverview() {
    //
    const { serviceId } = this.props.match.params!;
    const {
      coursePlanService,
      courseLectureService,
      studentService,
    } = this.props;
    const { StudentInfos } = studentService;
    const viewObject = this.getViewObject();
    const typeViewObject = this.getTypeViewObject();
    this.state.tabState = 'view';

    // console.log('renderOverview --------> ', viewObject);

    return this.renderBaseContentWith(
      <LectureOverviewViewV2
        viewObject={viewObject}
        typeViewObject={typeViewObject}
        onSaveCallback={this.testCallback}
        onSurveyCallback={this.surveyCallback}
        lectureCardId={serviceId}
        onRefreshLearningState={this.onRefreshLearningState}
        coursePlanService={coursePlanService}
        onPageInit={this.onPageInit}
        onPageRefresh={this.onPageRefresh}
        courseLectureService={courseLectureService}
        isPreCoursePassed={this.state.isPreCoursePassed}
        studentService={studentService}
        studentInfo={StudentInfos}
      />
    );
  }

  renderComments() {
    //
    const {
      programLectureService,
      courseLectureService,
      match,
      skProfileService,
    } = this.props;
    const { params } = match;
    const { member } = skProfileService!.skProfile;
    this.state.tabState = 'comments';

    let reviewFeedbackId = '';
    let commentFeedbackId = '';

    if (params.serviceType === LectureServiceType.Program) {
      const { programLecture } = programLectureService;

      reviewFeedbackId = programLecture.reviewId;
      commentFeedbackId = programLecture.commentId;
    } else {
      const { courseLecture } = courseLectureService;

      reviewFeedbackId = courseLecture.reviewId;
      commentFeedbackId = courseLecture.commentId;
    }

    return this.renderBaseContentWith(
      <LectureCommentsContainer
        reviewFeedbackId={reviewFeedbackId}
        commentFeedbackId={commentFeedbackId}
        name={member.name}
        email={member.email}
        companyName={member.company}
        departmentName={member.department}
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
        loaded={this.state.loaded}
        onPageRefresh={this.onPageRefresh}
        studentId={student.id}
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
          {
            text: `${college.name} College`,
            path: routePaths.collegeLectures(college.collegeId),
          },
          {
            text: `${coursePlan.category.channel.name} Channel`,
            path: routePaths.channelLectures(
              college.collegeId,
              coursePlan.category.channel.id
            ),
          },
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
              <Label className={coursePlan.category.color}>
                {coursePlan.category.college.name}
              </Label>
              <span className="detail-tit">{coursePlan.name}</span>
            </div>
          }
        />
      </ContentLayout>
    );
  }
}

export default withRouter(CoursePageV2);
