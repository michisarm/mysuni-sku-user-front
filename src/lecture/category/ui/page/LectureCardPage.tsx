import React, { Component } from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Label } from 'semantic-ui-react';
import { patronInfo } from '@nara.platform/dock';

import { CommentService } from '@nara.drama/feedback';
import { PostList, PostListByWriter } from '@sku/personalcube';
import { ProposalState, LearningState } from 'shared/model';
import { ContentLayout, Tab } from 'shared';
import { SkProfileService } from 'profile/stores';
import { CollegeService } from 'college/stores';

import {
  ContentsServiceType,
  CubeType,
  CubeTypeNameType,
} from 'personalcube/personalcube/model';
import { PersonalCubeService } from 'personalcube/personalcube/stores';
import { ClassroomModel } from 'personalcube/classroom/model';
import { MediaType } from 'personalcube/media/model';

import { CubeIntroService } from 'personalcube/cubeintro/stores';
import { ClassroomService } from 'personalcube/classroom/stores';
import { MediaService } from 'personalcube/media/stores';
import { OfficeWebService } from 'personalcube/officeweb/stores';
import { BoardService } from 'personalcube/community/stores';

import { CoursePlanService } from 'course/stores';
import { ExamPaperService, ExaminationService } from 'assistant/stores';
import { SurveyCaseService, SurveyFormService } from 'survey/stores';
import { ActionEventService } from 'shared/stores';

import { InMyLectureCdoModel } from 'myTraining/model';
import { MyTrainingService } from 'myTraining/stores';
import routePaths from '../../../routePaths';
import {
  StudentJoinRdoModel,
  StudentCdoModel,
  LectureServiceType,
} from '../../../model';
import {
  LectureCardService,
  LectureService,
  RollBookService,
  StudentService,
} from '../../../stores';
import { State as SubState } from '../../../shared/LectureSubInfo';
import LectureCardContentHeaderContainer from '../logic/LectureCardContentHeaderContainer';
import LectureCardContainer from '../logic/LectureCardContainer';
import LectureCommentsContainer from '../logic/LectureCommentsContainer';
import LinkedInModalContainer from '../logic/LinkedInModalContainer';
import LectureOverviewView from '../view/LectureOverviewView';
import { getYearMonthDateHourMinuteSecond } from '../../../../shared/helper/dateTimeHelper';
import { AnswerProgress } from '../../../../survey/answer/model/AnswerProgress';
import AnswerSheetApi from '../../../../survey/answer/present/apiclient/AnswerSheetApi';
import StudentApi from '../../../shared/present/apiclient/StudentApi';


interface Props extends RouteComponentProps<RouteParams> {
  skProfileService: SkProfileService;
  collegeService: CollegeService;
  personalCubeService: PersonalCubeService;
  cubeIntroService: CubeIntroService;
  classroomService: ClassroomService;
  mediaService: MediaService;
  officeWebService: OfficeWebService;
  boardService: BoardService;
  lectureCardService: LectureCardService;
  lectureService: LectureService;
  rollBookService: RollBookService;
  studentService: StudentService;
  commentService: CommentService;

  coursePlanService: CoursePlanService;
  examinationService: ExaminationService;
  examPaperService: ExamPaperService;
  // answerSheetService: AnswerSheetService,
  surveyCaseService: SurveyCaseService;
  surveyFormService?: SurveyFormService;
  actionEventService: ActionEventService;
}

interface State {
  linkedInOpen: boolean;
  loaded: boolean;
  examTitle: string;
  surveyTitle: string;
  type: string;
  name: string;
}

interface RouteParams {
  cineroomId: string;
  collegeId: string;
  cubeId: string;
  lectureCardId: string;
}

@inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'college.collegeService',
    'personalCube.personalCubeService',
    'personalCube.cubeIntroService',
    'personalCube.classroomService',
    'personalCube.mediaService',
    'personalCube.officeWebService',
    'personalCube.boardService',
    'lecture.lectureCardService',
    'lecture.lectureService',
    'lecture.rollBookService',
    'lecture.studentService',
    'shared.commentService',

    'course.coursePlanService',
    'assistant.examinationService',
    'assistant.examPaperService',
    // 'survey.answerSheetService',
    'survey.surveyCaseService',
    'survey.surveyFormService',
    'shared.actionEventService'
  )
)
@reactAutobind
@observer
class LectureCardPage extends Component<Props, State> {
  //
  state = {
    linkedInOpen: false,
    loaded: false,
    examTitle: '',
    surveyState: false,
    surveyTitle: '',
    type: '',
    name: '',
    activeTab: 'Posts',
  };

  constructor(props: Props) {
    //
    super(props);
    props.personalCubeService.clearPersonalCube();

    const {
      cineroomId,
      collegeId,
      cubeId,
      lectureCardId,
    } = this.props.match.params!;

    // console.log('Lecture Card Page : ', cineroomId);
    // console.log('Lecture Card Page : ', collegeId);
    // console.log('Lecture Card Page : ', cubeId);
    // console.log('Lecture Card Page : ', lectureCardId);
  }

  componentDidMount() {
    //
    this.setCineroom();
    this.init();
    this.publishViewEvent();

    // console.log('Lecture Card Page : componentDidMount');
  }

  componentWillUnmount(): void {
    //
    patronInfo.clearWorkspace();
    // console.log('Lecture Card Page : componentWillUnmount');
  }

  setCineroom() {
    //
    const { params } = this.props.match;

    if (params.cineroomId) {
      patronInfo.setWorkspaceById(params.cineroomId);
    }
  }

  async init() {
    const {
      match,
      history,
      skProfileService,
      collegeService,
      personalCubeService,
      cubeIntroService,
      classroomService,
      studentService,
      rollBookService,
      mediaService,
      officeWebService,
      boardService,
      lectureService,
      lectureCardService,
      commentService,
    } = this.props;
    const { params } = match;

    // remove
    localStorage.removeItem('finishedChk');
    // remove
    localStorage.removeItem('numberOfTrials');
    // remove
    localStorage.removeItem('finishedChkFirst');

    this.setState({ loaded: false });

    const promises = Promise.all([
      personalCubeService.findPersonalCube(params.cubeId),
      skProfileService.findSkProfile(),
      rollBookService!.findAllLecturesByLectureCardId(params.lectureCardId),
    ]);
    // alert('LectureCardPage.216:' + params.lectureCardId);
    promises.then(async ([personalCube, skProfile, rollbooks]) => {
      //
      if (personalCube) {
        const { service, contents } = personalCube.contents;

        await cubeIntroService.findCubeIntro(personalCube.cubeIntro.id);

        // console.log('mediaService : ', mediaService);
        // console.log('contents : ', contents);

        if (service.type === ContentsServiceType.Classroom) {
          await classroomService.findClassrooms(personalCube.personalCubeId);
        } else if (service.type === ContentsServiceType.Media) {
          mediaService.findMedia(contents.id).then(media => {
            if (
              media &&
              media.mediaType === MediaType.ContentsProviderMedia &&
              media.mediaContents.contentsProvider.isLinkedInType
            ) {
              this.setState({ linkedInOpen: true });
            }
            if (media && media.mediaType === MediaType.InternalMedia) {
              const studentCdo = {
                ...this.getStudentCdo(),
                proposalState: ProposalState.Approved,
              };

              lectureService
                .confirmUsageStatisticsByCardId(studentCdo)
                .then(confirmed => {
                  if (confirmed) {
                    history.replace('/empty');
                    setTimeout(() => {
                      if (params.cineroomId) {
                        history.replace(
                          routePaths.lectureCardOverview(
                            params.cineroomId,
                            params.collegeId,
                            params.cubeId,
                            params.lectureCardId
                          )
                        );
                      } else {
                        history.replace(
                          routePaths.lectureCardOverviewPrev(
                            params.collegeId,
                            params.cubeId,
                            params.lectureCardId
                          )
                        );
                      }
                    });
                  }
                  
                });
            }
          });
        } else if (service.type === ContentsServiceType.OfficeWeb) {
          officeWebService.findOfficeWeb(contents.id);
        } else if (service.type === ContentsServiceType.Community) {
          boardService.findBoard(contents.id);
        }
      }
    });

    collegeService.findCollege(params.collegeId);
    lectureCardService
      .findLectureCard(params.lectureCardId)
      .then(lectureCard => {
        if (lectureCard && lectureCard!.commentId) {
          commentService!.countByFeedbackId(lectureCard!.commentId);
        }
      });
    await studentService.findIsJsonStudentByCube(params.lectureCardId);
    await this.findStudent();

    await this.searchForExams();

    MyTrainingService.instance.saveNewLearningPassedToStorage('Passed');

    this.setState({ loaded: true });
  }

  async publishViewEvent() {
    const { actionEventService, personalCubeService } = this.props;
    const { match } = this.props;
    const { collegeId, cubeId, lectureCardId } = match.params;

    const personalCube = await personalCubeService.findPersonalCube(cubeId);
    const cubeName = personalCube?.name;
    const menu = 'CUBE_VIEW';
    const serviceType = LectureServiceType.Card;

    actionEventService.registerViewActionLog({
      menu,
      serviceType,
      collegeId,
      cubeId,
      lectureCardId,
      cubeName,
    });
  }

  /*
   * 20200421 MSJ
   * 시험 정보가 있는지 검색
   */
  async searchForExams() {
    const {
      personalCubeService,
      examinationService,
      examPaperService,
      surveyFormService,
    } = this.props;
    const { personalCube } = personalCubeService!;

    if (personalCube.contents.examId) {
      const examination = await examinationService!.findExamination(
        personalCube.contents.examId
      );
      const examPaper = await examPaperService!.findExamPaper(
        examination.paperId
      );

      this.state.examTitle = examPaper.title;
    }

    if (personalCube.contents.surveyCaseId) {
      const answerSheetService = await AnswerSheetApi.instance.findAnswerSheet(
        personalCube.contents.surveyCaseId
      );
      const surveyCase = await surveyFormService!.findSurveyForm(
        personalCube.contents.surveyId
      );

      const obj = JSON.parse(JSON.stringify(surveyCase.titles));
      const title = JSON.parse(JSON.stringify(obj.langStringMap));

      const disabled =
        answerSheetService &&
        answerSheetService.progress &&
        answerSheetService.progress === AnswerProgress.Complete;

      this.state.surveyState = disabled;
      this.state.surveyTitle = title.ko;
    }

    this.setExamState();
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

  setExamState() {
    const { studentService } = this.props;
    const { student }: StudentService = studentService!;

    this.setStateName('1', 'Test');

    if (student.serviceType || student.serviceType === 'Lecture') {
      if (
        student.learningState === LearningState.Progress ||
        student.learningState === LearningState.HomeworkWaiting
      ) {
        this.setStateName('0', 'Test');
      } else if (
        student.learningState === LearningState.Failed &&
        student.studentScore.numberOfTrials < 3
      ) {
        // this.setStateName('2', `재응시(${student.studentScore.numberOfTrials}/3)`);
        this.setStateName('0', `재응시 (${student.numberOfTrials})`);
      } else if (
        student.learningState === LearningState.Failed &&
        student.studentScore.numberOfTrials > 2
      ) {
        // this.setStateName('3', `재응시(${student.studentScore.numberOfTrials}/3)`);
        this.setStateName('0', `재응시 (${student.numberOfTrials})`);
      } else if (student.learningState === LearningState.Waiting) {
        // this.setStateName('3', `재응시(${student.studentScore.numberOfTrials}/3)`);
        this.setStateName('0', `재응시 (${student.numberOfTrials})`);
      } else if (student.learningState === LearningState.Missed) {
        // this.setStateName('4', '미이수');
        this.setStateName('0', `재응시 (${student.numberOfTrials})`);
      } else if (
        student.learningState === LearningState.Passed ||
        student.learningState === LearningState.TestPassed
      ) {
        this.setStateName('5', '이수');
      } else {
        this.setStateName('1', 'Test');
      }
    } else if (
      student.serviceType === 'Course' ||
      student.serviceType === 'Program'
    ) {
      if (
        student.phaseCount === student.completePhaseCount &&
        (student.learningState === LearningState.Progress ||
          student.learningState === LearningState.HomeworkWaiting)
      ) {
        if (student.phaseCount === student.completePhaseCount) {
          this.setStateName('0', 'Test');
        } else {
          this.setStateName('1', 'Test');
        }
        // subActions.push({ type: LectureSubInfo.ActionType.Test, onAction: this.onTest });
      } else if (
        student.phaseCount === student.completePhaseCount &&
        student.learningState === LearningState.Failed &&
        student.studentScore.numberOfTrials < 3
      ) {
        // this.setStateName('2', `재응시(${student.studentScore.numberOfTrials}/3)`);
        // // subActions.push({ type: `재응시(${student.numberOfTrials}/3)`, onAction: this.onTest });
        this.setStateName('0', `재응시 (${student.numberOfTrials})`);
      } else if (
        student.phaseCount === student.completePhaseCount &&
        student.learningState === LearningState.Failed &&
        student.studentScore.numberOfTrials > 2
      ) {
        // this.setStateName('3', `재응시(${student.studentScore.numberOfTrials}/3)`);
        // // subActions.push({ type: `재응시(${student.numberOfTrials}/3)`, onAction: this.onTest });
        this.setStateName('0', `재응시 (${student.numberOfTrials})`);
      } else if (student.learningState === LearningState.Waiting) {
        // this.setStateName('4', '미이수');
        this.setStateName('0', `재응시 (${student.numberOfTrials})`);
      } else if (student.learningState === LearningState.Missed) {
        // this.setStateName('4', '미이수');
        this.setStateName('0', `재응시 (${student.numberOfTrials})`);
      } else if (
        student.learningState === LearningState.Passed ||
        student.learningState === LearningState.TestPassed
      ) {
        this.setStateName('5', '이수');
      } else {
        this.setStateName('1', 'Test');
      }
    }
  }

  setStateName(type: string, name: string) {
    this.state.type = type;
    this.state.name = name;
  }

  getViewObject() {
    //
    const {
      personalCubeService,
      cubeIntroService,
      studentService,
      classroomService,
      rollBookService,
      match,
    } = this.props;
    const { personalCube } = personalCubeService!;
    const { cubeIntro } = cubeIntroService!;
    const { student }: StudentService = studentService!;
    const { classrooms } = classroomService!;
    const {
      rollBooksPassedStudentCount,
      rollBooksStudentCount,
      rollBooks,
    } = rollBookService!;
    const studentJoin = this.getStudentJoin();

    let state: SubState | undefined;
    let examId: string = '';
    let examTitle: string = '';
    let surveyId: string = '';
    let surveyTitle: string = '';
    let surveyState: boolean = false;
    let surveyCaseId: string = '';
    let reportFileBoxId: string = '';
    let passedState: boolean = false;
    let examType: string = '';
    let examName: string = '';
    let studentId: string = '';
    let rollBookId: string = '';
    let serviceId: string = '';

    examId = personalCube.contents.examId || '';
    examTitle = this.state.examTitle || '';
    surveyId = personalCube.contents.surveyId || '';
    surveyTitle = this.state.surveyTitle || '';
    surveyState = this.state.surveyState || false;
    surveyCaseId = personalCube.contents.surveyCaseId || '';
    reportFileBoxId = cubeIntro.reportFileBox.fileBoxId;
    examType = this.state.type || '';
    examName = this.state.name || '';
    studentId = student.id || '';
    rollBookId = rollBooks[0]?.id || '';
    serviceId = match.params.lectureCardId || '';

    // console.log('lecture card page student : ', student);

    if (student && student.id && studentJoin) {
      if (student.proposalState === ProposalState.Submitted) {
        state = SubState.WaitingForApproval;
      }
      if (student.proposalState === ProposalState.Approved) {
        if (!student.learningState) state = SubState.Enrolled;
        if (
          student.learningState === LearningState.Waiting ||
          student.learningState === LearningState.HomeworkWaiting ||
          student.learningState === LearningState.TestWaiting ||
          student.learningState === LearningState.TestPassed ||
          student.learningState === LearningState.Failed
        ) {
          state = SubState.Waiting;
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
        if (personalCube.contents.type === CubeType.Community) {
          state = SubState.Joined;
        }
      }

      if (student.proposalState === ProposalState.Rejected) {
        state = SubState.Rejected;
      }

      if (student && student.learningState === LearningState.Passed) {
        passedState = true;
      } else {
        passedState = false;
      }

      // if ((personalCube.contents.type === CubeType.ELearning || personalCube.contents.type === CubeType.ClassRoomLecture)
      //   && classrooms && classrooms.length) {
      //   const index = classrooms.map(classroom => classroom.round).findIndex(round => round === studentJoin.round);
      //   if (index >= 0 && classrooms) {
      //     // examId = classrooms[index].roundExamId;
      //     // examTitle = this.state.examTitle || '';
      //     // surveyId = classrooms[index].roundSurveyId;
      //     // surveyTitle = this.state.surveyTitle || '';
      //     // surveyState = this.state.surveyState || false;
      //     // surveyCaseId = classrooms[index].roundSurveyCaseId;
      //     // reportFileBoxId = classrooms[index].roundReportFileBox.fileBoxId;
      //     // examType = this.state.type || '';
      //     // examName = this.state.name || '';
      //   }
      // }
      // else {
      //
      // }
    }

    return {
      // Sub info
      required: personalCube.required,
      difficultyLevel: cubeIntro.difficultyLevel,
      learningTime: cubeIntro.learningTime,
      rollBooksPassedStudentCount,
      rollBooksStudentCount,

      instructorName: cubeIntro.description.instructor.name,
      operatorName: cubeIntro.operation.operator.name,
      operatorCompany: cubeIntro.operation.operator.company,
      operatorEmail: cubeIntro.operation.operator.email,

      state: state || undefined,
      examId,

      // Fields
      subCategories: personalCube.subCategories,
      description: cubeIntro.description.description,

      goal: cubeIntro.description.goal,
      applicants: cubeIntro.description.applicants,
      organizerName: cubeIntro.operation.organizer.name,

      completionTerms: cubeIntro.description.completionTerms,
      guide: cubeIntro.description.guide,

      tags: personalCube.tags,
      examTitle,
      surveyId,
      surveyTitle,
      surveyState,
      surveyCaseId,
      passedState,
      examType,
      examName,
      studentId,
      rollBookId,
      fileBoxId: personalCube.contents.fileBoxId,
      reportFileBoxId,
      stamp: 0,
      serviceId,

      //etc
      category: personalCube.category,
      cubeType: CubeType[personalCube.contents.type],
      cubeTypeName: CubeTypeNameType[CubeType[personalCube.contents.type]],
      name: personalCube.name,
      time: personalCube.time,
      classroom: undefined,
      thumbnailImage: personalCube.iconBox.baseUrl || '',
    };
  }

  getTypeViewObject(): any {
    //
    const {
      personalCubeService,
      //cubeIntroService, classroomService,
    } = this.props;
    const { personalCube } = personalCubeService!;
    // const { cubeIntro } = cubeIntroService!;
    // const { classroom } = classroomService!;

    const contentsService = personalCube.contents.service;
    let cubeTypeViewObject = {};

    switch (contentsService.type) {
      case ContentsServiceType.Classroom:
        cubeTypeViewObject = this.getClassroomViewObject();
        break;
      case ContentsServiceType.Media:
        cubeTypeViewObject = this.getMediaViewObject();
        break;
      case ContentsServiceType.OfficeWeb:
        cubeTypeViewObject = this.getOfficeWebViewObject();
        break;
      case ContentsServiceType.Community:
        cubeTypeViewObject = this.getCommunityViewObject();
        break;
    }

    return cubeTypeViewObject;
  }

  getClassroomViewObject() {
    //
    const { classrooms } = this.props.classroomService!;
    const studentJoin = this.getStudentJoin();

    let classroom = null;
    let siteUrl = '';

    if (classrooms.length) {
      // 차수가 하나인 경우
      if (classrooms.length === 1) {
        classroom = classrooms[0];
        // 수강신청 가능 유무(e-learnning case)
        if (!classroom.enrolling.enrollingAvailable) {
          siteUrl = classroom.operation.siteUrl;
        }
      }
      // 차수가 여러개인 경우
      else {
        // 오늘이 차수의 학습기간 내에 있는지 여부
        const filteredClassrooms = classrooms.filter(classroom => {
          if (classroom.enrolling && classroom.enrolling.learningPeriod) {
            const today = new Date();
            const learningPeriod = classroom.enrolling.learningPeriod;
            const {
              year: startYear,
              month: startMonth,
              date: startDate,
            } = getYearMonthDateHourMinuteSecond(learningPeriod!.startDateSub)!;
            const {
              year: endYear,
              month: endMonth,
              date: endDate,
            } = getYearMonthDateHourMinuteSecond(learningPeriod!.endDateSub)!;
            if (
              new Date(startYear, startMonth, startDate, 0, 0, 0).getTime() <
                today.getTime() &&
              new Date(endYear, endMonth, endDate, 23, 59, 59).getTime() >
                today.getTime()
            ) {
              return true;
            }
            return false;
          }
          return false;
        });
        if (filteredClassrooms.length) {
          // 오늘이 학습기간내인 차수가 여러개인 경우 시작일이 먼저인 것으로
          if (filteredClassrooms.length > 1) {
            const compare = (
              classroom1: ClassroomModel,
              classroom2: ClassroomModel
            ) => {
              if (
                classroom1.enrolling.learningPeriod.startDate >
                classroom2.enrolling.learningPeriod.startDate
              ) {
                return 1;
              }
              return -1;
            };
            filteredClassrooms.sort(compare);
          }
          classroom = filteredClassrooms[0];
        }
        // 오늘이 학습기간내인 것이 없는 경우
        else {
          // 오늘 이후의 학습기간을 가진 차수 조회
          const filteredClassrooms = classrooms.filter(classroom => {
            if (classroom.enrolling && classroom.enrolling.learningPeriod) {
              const today = new Date();
              const learningPeriod = classroom.enrolling.learningPeriod;
              const {
                year: startYear,
                month: startMonth,
                date: startDate,
              } = getYearMonthDateHourMinuteSecond(
                learningPeriod!.startDateSub
              )!;
              if (
                new Date(
                  startYear,
                  startMonth,
                  startDate,
                  23,
                  59,
                  59
                ).getTime() > today.getTime()
              ) {
                return true;
              }
              return false;
            }
            return false;
          });
          // 오늘 이후의 학습기간을 가진 차수가 여러개인 경우 제일 가까운 차수
          if (filteredClassrooms.length) {
            if (filteredClassrooms.length > 1) {
              const compare = (
                classroom1: ClassroomModel,
                classroom2: ClassroomModel
              ) => {
                if (
                  classroom1.enrolling.learningPeriod.startDate >
                  classroom2.enrolling.learningPeriod.startDate
                ) {
                  return 1;
                }
                return -1;
              };
              filteredClassrooms.sort(compare);
            }
            classroom = filteredClassrooms[0];
          }
          // 이도저도 아닌경우 마지막 차수
          else {
            classroom = classrooms[classrooms.length - 1];
          }
        }
      }
    }
    if (studentJoin) {
      const index = classrooms
        .map(classroom => classroom.round)
        .findIndex(round => round === studentJoin.round);
      if (index >= 0) {
        classroom = classrooms[index];
        // 20200714 e-learning 학습하기 버튼 완료후에도 보이게 변경
        if (
          studentJoin.learningState === LearningState.Progress ||
          studentJoin.learningState === LearningState.Passed
        ) {
          siteUrl = classrooms[index].operation.siteUrl;
        }
      }
    }

    if (!classroom) return {};
    return {
      capacity: classroom.capacity,
      waitingCapacity: classroom.waitingCapacity,
      applyingPeriod:
        classrooms.length === 1 && classroom.enrolling.applyingPeriod,
      cancellablePeriod:
        classrooms.length === 1 && classroom.enrolling.cancellablePeriod,
      cancellationPenalty: classroom.enrolling.cancellationPenalty,
      location: classroom.operation.location,
      learningPeriod: classroom.enrolling.learningPeriod,
      classrooms: classrooms.length > 0 && classrooms,
      siteUrl,
    };
  }

  getMediaViewObject() {
    //
    const { media } = this.props.mediaService!;
    const { personalCube } = this.props.personalCubeService!;
    let url = '';
    let videoUrl = '';

    switch (media && media.mediaType) {
      case MediaType.ContentsProviderMedia:
        url = media.mediaContents.contentsProvider.url;
        break;
      case MediaType.LinkMedia:
        url = media.mediaContents.linkMediaUrl;
        break;
      case MediaType.InternalMedia:
      case MediaType.InternalMediaUpload:
        videoUrl = media.mediaContents.internalMedias.length
          ? media.mediaContents.internalMedias[0].viewUrl
          : '';
        url = media.mediaContents.internalMedias.length
          ? media.mediaContents.internalMedias[0].viewUrl
          : '';

        if (personalCube.contents.type === CubeType.Video && videoUrl && url) {
          videoUrl += '&offerviewer=false&showtitle=false&showbrand=false';
          url += '&offerviewer=false&showtitle=false&showbrand=false';
        } else if (
          personalCube.contents.type === CubeType.Audio &&
          videoUrl &&
          url
        ) {
          videoUrl +=
            '&offerviewer=false&interactivity=none&showtitle=false&showbrand=false';
          url +=
            '&offerviewer=false&interactivity=none&showtitle=false&showbrand=false';
        }
        break;
    }

    return {
      mediaType: media && media.mediaType,
      url,
      videoUrl,
      learningPeriod: {
        startDate: media && media.learningPeriod.startDateDot,
        endDate: media && media.learningPeriod.endDateDot,
      },
    };
  }

  getOfficeWebViewObject() {
    //
    const { officeWeb } = this.props.officeWebService;
    return {
      fileBoxId: officeWeb.fileBoxId,
      learningPeriod: {
        startDate: officeWeb.learningPeriod.startDateDot,
        endDate: officeWeb.learningPeriod.endDateDot,
      },
      url: officeWeb.webPageUrl,
    };
  }

  getCommunityViewObject() {
    //
    const { board } = this.props.boardService;
    return {
      learningPeriod: {
        startDate: board.learningPeriod.startDateDot,
        endDate: board.learningPeriod.startDateDot,
      },
    };
  }

  getInMyLectureCdo(): InMyLectureCdoModel {
    //
    const {
      personalCubeService,
      lectureCardService,
      cubeIntroService,
    } = this.props;
    const { personalCube } = personalCubeService!;
    const { cubeIntro } = cubeIntroService!;
    const { lectureCard } = lectureCardService!;

    return InMyLectureCdoModel.fromLectureCard(
      personalCube,
      cubeIntro,
      lectureCard
    );
  }

  getStudentCdo(): StudentCdoModel {
    const { skProfileService, rollBookService, boardService } = this.props;
    const { skProfile } = skProfileService!;
    const { rollBooks } = rollBookService!;
    const { member } = skProfile;
    return new StudentCdoModel({
      rollBookId: rollBooks.length ? rollBooks[0].id : '',
      name: member.name,
      email: member.email,
      company: member.company,
      department: member.department,
      proposalState: ProposalState.Submitted,
      programLectureUsid: '',
      courseLectureUsid: '',
      enClosed: boardService!.board!.boardConfig!.enClosed,
      leaderEmails: [],
      url: '',
      classroomId: '',
      approvalProcess: false,
    });
  }

  getTabs() {
    //
    const { commentCount } = this.props.commentService;
    const { personalCube } = this.props.personalCubeService;
    const tabs = [];

    if (personalCube.contents.type === 'Community') {
      tabs.push(
        { name: 'Posts', item: 'Posts', render: this.renderPosts },
        { name: 'My Posts', item: 'MyPosts', render: this.renderMyPosts },
        { name: 'Overview', item: 'Overview', render: this.renderOverview }
      );
    } else {
      tabs.push(
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
          render: this.renderComment,
        }
      );
    }

    return tabs;
  }

  getTabName() {
    //
    const { personalCube } = this.props.personalCubeService;
    let tabName = '';

    if (personalCube.contents.type === 'Community') {
      tabName = 'Posts';
    } else {
      tabName = 'Overview';
    }

    return tabName;
  }

  getMediaSize() {
    //
    const { personalCube } = this.props.personalCubeService!;
    const width = personalCube.contents.type === CubeType.Video ? 800 : 400;
    const height = personalCube.contents.type === CubeType.Video ? 450 : 225;

    return { width, height };
  }

  testCallback() {
    const { personalCubeService, studentService } = this.props;
    const { personalCube } = personalCubeService!;
    const { student }: StudentService = studentService!;

    if (personalCube.contents.examId) {
      StudentApi.instance
        .modifyStudentForExam(student.id, personalCube.contents.examId)
        .then(() => {
          if (this.init()) this.init();
        });
    }
  }

  onPageRefresh() {
    // const { history, match, location } = this.props;
    // const { params } = match;
    // const { search } = location;
    // const queryParam = queryString.parse(search);
    this.init();
    // history.replace('/empty');
    // setTimeout(() => {

    // if (params.cineroomId) {
    //   history.replace(routePaths.lectureCardOverview(params.cineroomId, params.collegeId, params.cubeId, params.lectureCardId,
    //     { courseLectureId: queryParam.programLectureId as string }));
    // }
    // else {
    //   history.replace(routePaths.lectureCardOverviewPrev(params.collegeId, params.cubeId, params.lectureCardId));
    // }
    // });
  }

  renderOverview() {
    //
    // const { servic, serviceType } = this.props.match.params!;
    const parmas = this.props.match;
    const viewObject = this.getViewObject();
    const typeViewObject = this.getTypeViewObject();

    return this.renderBaseContentWith(
      <LectureOverviewView
        viewObject={viewObject}
        typeViewObject={typeViewObject}
        onSaveCallback={this.testCallback}
        serviceId={parmas.params.lectureCardId}
        serviceType={parmas.params.cubeId}
      />
    );
  }

  renderComment() {
    //
    const { lectureCard } = this.props.lectureCardService;
    const studentCdo = this.getStudentCdo();

    return this.renderBaseContentWith(
      <LectureCommentsContainer
        reviewFeedbackId={lectureCard.reviewId}
        commentFeedbackId={lectureCard.commentId}
        name={studentCdo.name}
        email={studentCdo.email}
        companyName={studentCdo.company}
        departmentName={studentCdo.department}
      />
    );
  }

  renderPosts() {
    //
    const { personalCube } = this.props.personalCubeService;
    const { student } = this.props.studentService;
    const { history, match } = this.props;
    const { params } = match;
    const postUrl = `/lecture/college/${params.collegeId}/cube/${personalCube.personalCubeId}/lecture-card/${params.lectureCardId}/posts`;

    return this.renderBaseContentWith(
      <PostList
        type={PostList.ListType.Basic}
        boardId={personalCube.contents.contents.id}
        emptyMessage="Community에 등록된 글이 없습니다."
        linkedUrl={`${process.env.PUBLIC_URL}${postUrl}`}
        offset={0}
        limit={10}
        routeToPost={
          student.id ? () => history.push(`${postUrl}/new`) : undefined
        }
      />
    );
  }

  renderMyPosts() {
    //
    const { personalCube } = this.props.personalCubeService;
    const { student } = this.props.studentService;
    const { history, match } = this.props;
    const { params } = match;
    const postsUrl = `/lecture/college/${params.collegeId}/cube/${personalCube.personalCubeId}/lecture-card/${params.lectureCardId}/posts`;

    return this.renderBaseContentWith(
      <PostListByWriter
        boardId={personalCube.contents.contents.id}
        linkedUrl={`${process.env.PUBLIC_URL}${postsUrl}`}
        emptyMessage="내가 작성한 글이 없습니다."
        offset={0}
        limit={10}
        routeToPost={
          student.id ? () => history.push(`${postsUrl}/new`) : undefined
        }
      />
    );
  }

  renderBaseContentWith(cardContent: React.ReactNode) {
    //
    const { personalCubeService, studentService } = this.props;
    const { personalCube } = personalCubeService;
    const { student, studentJoins } = studentService!;
    const { params } = this.props.match;
    const viewObject = this.getViewObject();
    const typeViewObject = this.getTypeViewObject();
    const inMyLectureCdo = this.getInMyLectureCdo();
    const studentCdo = this.getStudentCdo();

    return (
      <LectureCardContainer
        lectureServiceId={params.lectureCardId}
        lectureCardId={params.lectureCardId}
        lectureServiceType={LectureServiceType.Card}
        inMyLectureCdo={inMyLectureCdo}
        studentCdo={studentCdo}
        studentJoins={studentJoins}
        student={student}
        cubeType={personalCube.contents.type}
        viewObject={viewObject}
        typeViewObject={typeViewObject}
        init={this.init}
        loaded={this.state.loaded}
        onPageRefresh={this.onPageRefresh}
      >
        {cardContent}
      </LectureCardContainer>
    );
  }

  render() {
    //
    const {
      collegeService,
      personalCubeService,
      lectureCardService,
    } = this.props;
    const { linkedInOpen, activeTab } = this.state;
    const { college } = collegeService;
    const { personalCube } = personalCubeService;
    const { lectureCard } = lectureCardService;
    const viewObject = this.getViewObject();
    const typeViewObject = this.getTypeViewObject();
    // const { width, height } = this.getMediaSize();

    return (
      <ContentLayout
        className="channel"
        breadcrumb={[
          {
            text: `${college.name} College`,
            path: routePaths.collegeLectures(college.collegeId),
          },
          {
            text: `${personalCube.category.channel.name} Channel`,
            path: routePaths.channelLectures(
              college.collegeId,
              personalCube.category.channel.id
            ),
          },
        ]}
      >
        <LectureCardContentHeaderContainer
          personalCube={personalCube}
          lectureCard={lectureCard}
          typeViewObject={typeViewObject}
        />

        {/*{
          typeViewObject.videoUrl && (
            <>
              <div className="cont-inner">
                <div className="ml17">
                  ※ 동영상 학습 시간은 익일 혹은 컨텐츠 재방문시 반영됩니다.
                </div>
              </div>

              {<div className="between-section">
                <div className={`cont-inner ${viewObject.cubeType === CubeType.Audio ? 'audio-type' : ''}`}>
                  <iframe
                    title={typeViewObject.videoUrl}
                    src={typeViewObject.videoUrl}
                    width={width}
                    height={height}
                    style={{ padding: '0px', border: '0px' }}
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay"
                  />
                  <video width="854" height="480" id="video1">
                    <source src={typeViewObject.videoUrl} type="video/mp4" />
                  </video>
                  <img src={typeViewObject.videoUrl} />
                </div>
              </div>}
            </>
          ) || null
        }*/}

        <Tab
          className="tab-menu2 offset0"
          tabs={this.getTabs()}
          defaultActiveName={this.getTabName()}
          header={
            <div className="cont-inner summary">
              <Label className={viewObject.category.color}>
                {viewObject.category.college.name}
              </Label>
              <span className="detail-tit">{viewObject.name}</span>
            </div>
          }
        />

        <LinkedInModalContainer enabled={linkedInOpen} />
      </ContentLayout>
    );
  }
}

export default withRouter(LectureCardPage);
