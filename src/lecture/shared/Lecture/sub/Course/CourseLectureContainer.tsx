import React, { Component } from 'react';
import { mobxHelper, reactAlert, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import depot from '@nara.drama/depot';

import classNames from 'classnames';
import moment from 'moment';
import { Icon, Button } from 'semantic-ui-react';

import { ProposalState, LearningState } from 'shared/model';
import { EmployeeModel } from 'profile/model';
import {
  PersonalCubeModel,
  CubeType,
  ContentsServiceType,
} from 'personalcube/personalcube/model';
import { MediaModel, MediaType } from 'personalcube/media/model';
import StudyActionType from 'shared/model/StudyActionType';
import { PersonalCubeService } from 'personalcube/personalcube/stores';
import { MediaService } from 'personalcube/media/stores';
import { BoardService } from 'personalcube/community/stores';
import { ExamPaperService, ExaminationService } from 'assistant/stores';
import { SurveyCaseService, SurveyFormService } from 'survey/stores';
import { CoursePlanService } from 'course/stores';

import {
  LectureViewModel,
  StudentModel,
  RollBookModel,
  StudentCdoModel,
  StudentJoinRdoModel,
  LectureServiceType,
} from '../../../../model';
import LectureSubInfo, { State as SubState } from '../../../LectureSubInfo';

import StudentService from '../../../present/logic/StudentService';
import RollBookService from '../../../present/logic/RollBookService';
import {
  Title,
  SubField,
  Buttons,
  Thumbnail,
} from '../../../ui/view/LectureElementsView';

import Action from '../../model/Action';
import { CubeIconType } from '../../model';
import { CourseSectionContext } from '../CourseSection';
import { AnswerProgress } from '../../../../../survey/answer/model/AnswerProgress';
import LectureExam from '../../../LectureExam/ui/logic/LectureExamContainer';
import { AnswerSheetModal, CubeReportModal } from '../../../../../assistant';
import { AnswerSheetModal as SurveyAnswerSheetModal } from '../../../../../survey';
import StudentApi from '../../../present/apiclient/StudentApi';
import AnswerSheetApi from '../../../../../survey/answer/present/apiclient/AnswerSheetApi';
import { CubeIntroService } from '../../../../../personalcube/cubeintro/stores';

interface Props {
  rollBookService?: RollBookService;
  boardService: BoardService;
  personalCubeService?: PersonalCubeService;
  studentService?: StudentService;
  mediaService?: MediaService;
  coursePlanService?: CoursePlanService;
  collegeId?: string;
  lectureView: LectureViewModel;
  className?: string;
  thumbnailImage?: string;
  action?: Action;
  toggle?: boolean;
  open?: boolean;
  onAction?: () => void;
  onViewDetail?: (e: any) => void;
  onToggle?: () => void;
  onRefreshLearningState?: () => void;
  onDoLearn?: (
    videoUrl: string,
    studentCdo: StudentCdoModel,
    lectureView?: LectureViewModel
  ) => void;
  student?: StudentModel;
  lectureCardId?: string;
  coursePlanId?: string;
  serviceType?: LectureServiceType;
  courseServiceType?: LectureServiceType;
  member?: EmployeeModel;

  examinationService?: ExaminationService;
  examPaperService?: ExamPaperService;
  // answerSheetService?: AnswerSheetService,
  surveyCaseService?: SurveyCaseService;
  surveyFormService?: SurveyFormService;
}

interface State {
  classNameForLearningState: string;
  inProgress: string;
  examTitle: string;
  surveyState: boolean;
  surveyTitle: string;
  reportFileId: string;
  type: string;
  name: string;
  isContent: boolean;
}

@inject(
  mobxHelper.injectFrom(
    'lecture.rollBookService',
    'personalCube.boardService',
    'personalCube.personalCubeService',
    'lecture.studentService',
    'personalCube.mediaService',
    'course.coursePlanService',

    'assistant.examinationService',
    'assistant.examPaperService',
    // 'survey.answerSheetService',
    'survey.surveyCaseService',
    'survey.surveyFormService'
  )
)
@reactAutobind
@observer
class CourseLectureContainer extends Component<Props, State> {
  //

  static contextType = CourseSectionContext;

  static defaultProps = {
    thumbnailImage: null,
    action: null,
    toggle: false,
    open: false,
    onAction: () => {},
    onViewDetail: () => {},
    onToggle: () => {},
    onRefreshLearningState: () => {},
    className: '',
    rollBookService: RollBookService,
    boardService: BoardService,
    personalCubeService: PersonalCubeService,
    studentService: StudentService,
    mediaService: MediaService,
    coursePlanService: CoursePlanService,
  };

  examModal: any = null;
  surveyModal: any = null;
  reportModal: any = null;
  applyReferenceModel: any = null;

  viewObject: any = null;
  studentData: any = StudentModel;

  personalCube: PersonalCubeModel | null = {} as PersonalCubeModel;
  classNameForLearningState: string = '';
  studentForVideoObj: StudentModel | null = {} as StudentModel;
  rollBooks: RollBookModel[] = [];

  state = {
    classNameForLearningState: 'fix line' || 'fix bg',
    inProgress: '',
    examTitle: '',
    reportFileId: '',
    surveyState: false,
    surveyTitle: '',
    passedState: false,
    type: '',
    name: '',
    isContent: false,
  };

  constructor(props: Props) {
    //
    super(props);
    this.init();
  }

  componentDidMount() {
    //
    // if (this.rollBooks[0]) {
    //   this.init();
    // }
    // this.init();
  }
  //
  // componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
  //
  //   if (this.props !== prevProps) {
  //     this.init();
  //   }
  // }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {}

  async init() {
    const {
      personalCubeService,
      rollBookService,
      studentService,
      lectureView,
      examinationService,
      examPaperService,
      surveyFormService,
    } = this.props;
    const { getStudentForVideo } = studentService!;

    if (lectureView && lectureView.cubeId) {
      this.personalCube = await personalCubeService!.findPersonalCube(
        lectureView.cubeId
      );
      this.rollBooks = await rollBookService!.findAllLecturesByLectureCardId(
        lectureView.serviceId
      );
      // alert(lectureView.serviceId);

      if (this.rollBooks[0]) {
        this.studentData = await StudentApi.instance.findStudentByRollBookId(
          this.rollBooks[0].id
        );

        if (this.personalCube?.contents.examId) {
          const examination = await examinationService!.findExamination(
            this.personalCube?.contents.examId
          );
          const examPaper = await examPaperService!.findExamPaper(
            examination.paperId
          );
          this.state.examTitle = examPaper.title;
        }

        if (this.personalCube?.contents.surveyCaseId) {
          const answerSheetService = await AnswerSheetApi.instance.findAnswerSheet(
            this.personalCube?.contents.surveyCaseId
          );
          const surveyCase = await surveyFormService!.findSurveyForm(
            this.personalCube?.contents.surveyId
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

        if (this.personalCube?.cubeIntro.id) {
          const cubeIntro = await CubeIntroService.instance.findCubeIntro(
            this.personalCube?.cubeIntro.id
          );
          if (cubeIntro?.reportFileBox.fileBoxId) {
            this.state.reportFileId = cubeIntro?.reportFileBox.fileBoxId;
          }
        }

        this.viewObject = this.getViewObject();
        this.setExamState(this.studentData);
      }

      getStudentForVideo(lectureView.serviceId).then(studentForVideo => {
        this.studentForVideoObj = studentForVideo;
        const classNameForLearningStateTemp = this.setClassNameForLearningState(
          this.studentForVideoObj
        );
        this.setState({
          classNameForLearningState: classNameForLearningStateTemp,
        });
      });
    }

    // this.studentForVideoObj = await getStudentForVideo(lectureView.serviceId);
    // this.classNameForLearningState = this.setClassNameForLearningState(this.studentForVideoObj);
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

  compare(join1: StudentJoinRdoModel, join2: StudentJoinRdoModel) {
    if (join1.updateTime < join2.updateTime) return 1;
    return -1;
  }

  setClassNameForLearningState(studentForVideo: StudentModel) {
    let classNameForLearningState: string = 'fix line' || 'fix bg';

    if (studentForVideo) {
      let state: SubState = SubState.Waiting;

      if (studentForVideo && studentForVideo.id) {
        if (studentForVideo.proposalState === ProposalState.Approved) {
          if (
            studentForVideo.learningState === LearningState.Waiting ||
            studentForVideo.learningState === LearningState.HomeworkWaiting ||
            studentForVideo.learningState === LearningState.TestWaiting ||
            studentForVideo.learningState === LearningState.TestPassed ||
            studentForVideo.learningState === LearningState.Failed
          ) {
            state = SubState.Waiting;
          }
          if (studentForVideo.learningState === LearningState.Progress) {
            state = SubState.InProgress;
          }
          if (studentForVideo.learningState === LearningState.Passed) {
            state = SubState.Completed;
          }
          if (studentForVideo.learningState === LearningState.Missed) {
            state = SubState.Missed;
          }
        }
      }

      this.state.inProgress = state;
      classNameForLearningState =
        state === SubState.InProgress ? 'fix bg' : 'fix line';

      // this.classNameForLearningState = classNameForLearningState;
    }

    return classNameForLearningState;
  }

  publishStudyEvent(isCPLinked?: boolean, url?: string) {
    const { coursePlanService } = this.props;
    const {
      collegeId,
      lectureCardId,
      coursePlanId,
      lectureView,
      courseServiceType,
    } = this.props;
    const { cubeId, cubeType, name } = lectureView;

    const serviceType = courseServiceType;
    const courseName = coursePlanService!.coursePlan.name;
    const cubeName = name;

    let action = StudyActionType.None;
    const menu = 'LearningStart';
    let path = '';

    switch (cubeType) {
      case CubeType.Video:
        action = StudyActionType.VideoStart;
        if (isCPLinked && url) {
          action = StudyActionType.CPLinked;
          path = url;
        }

        break;

      case CubeType.Audio:
        action = StudyActionType.AudioStart;
        if (isCPLinked && url) {
          action = StudyActionType.CPLinked;
          path = url;
        }

        break;
    }
  }

  onToggle() {
    //
    const { open, setOpen } = this.context;

    setOpen(!open);
  }

  registerStudentForVideo(studentCdo: StudentCdoModel) {
    //
    const { studentService, lectureView, onRefreshLearningState } = this.props;
    const { getStudentForVideo } = studentService!;

    //???????????? ??? ???????????? ???????????? ?????? ??? Lecture Card??? ??????????????? ?????????.
    return studentService!.registerStudent(studentCdo).then(() => {
      getStudentForVideo(lectureView.serviceId).then(studentForVideo => {
        this.studentForVideoObj = studentForVideo;
        const classNameForLearningStateTemp = this.setClassNameForLearningState(
          this.studentForVideoObj
        );

        //Course ?????? ???????????? ??????
        onRefreshLearningState!();

        //??????????????? Lecture Card??? ???????????? ?????? ?????? ??????(CSS ??????)
        this.setState({
          classNameForLearningState: classNameForLearningStateTemp,
        });
      });

      // studentService!.findStudentForVideo(studentCdo.rollBookId);
      // studentService!.findIsJsonStudentForVideo(lectureView.serviceId);
      // studentService!.findStudentCount(studentCdo.rollBookId);
    });
  }

  async onRegisterStudentForVideo(proposalState?: ProposalState) {
    const studentCdo = this.getStudentCdo();

    if (
      !this.studentForVideoObj ||
      !this.studentForVideoObj.id ||
      (this.studentForVideoObj.proposalState !== ProposalState.Canceled &&
        this.studentForVideoObj.proposalState !== ProposalState.Rejected)
    ) {
      this.registerStudentForVideo({
        ...studentCdo,
        proposalState: proposalState || studentCdo.proposalState,
      });
    } else if (
      this.studentForVideoObj.proposalState === ProposalState.Canceled ||
      this.studentForVideoObj.proposalState === ProposalState.Rejected
    ) {
      this.registerStudentForVideo({
        ...studentCdo,
        proposalState: this.studentForVideoObj.proposalState,
      });
    }
  }

  onLearningStartForVideo(url: string) {
    // const { onDoLearn } = this.props;

    if (url && url.startsWith('http')) {
      // this.publishActionEvent();
      this.onRegisterStudentForVideo(ProposalState.Approved);
      this.popupLearnModal(url);
      //window.open(url, '_blank');
    } else {
      reactAlert({ title: '??????', message: '?????? ??? URL ???????????????.' });
    }
  }

  onClickPlayForVideo(url: string) {
    // const { onDoLearn } = this.props;

    if (url && url.startsWith('http')) {
      this.publishStudyEvent();
      this.onRegisterStudentForVideo(ProposalState.Approved);
      this.popupLearnModal(url);
      //window.open(url, '_blank');
    } else {
      reactAlert({ title: '??????', message: '?????? ??? URL ???????????????.' });
    }
  }

  onClickPlayForOpen(url: string) {
    // const { onDoLearn } = this.props;

    if (url && url.startsWith('http')) {
      //this.onRegisterStudentForVideo(ProposalState.Approved);
      //this.popupLearnModal(url);
      this.publishStudyEvent(true, url);
      window.open(url, '_blank');
    } else {
      reactAlert({ title: '??????', message: '?????? ??? URL ???????????????.' });
    }
  }

  // onEndLearn() {
  //   const studentCdo = this.getStudentCdo();
  // }

  getMediaUrl(media: MediaModel): string {
    let url: string = '';
    // const { personalCube } = this.props.personalCubeService!;

    switch (media.mediaType) {
      case MediaType.ContentsProviderMedia:
        url = media.mediaContents.contentsProvider.url;
        break;
      case MediaType.LinkMedia:
        url = media.mediaContents.linkMediaUrl;
        break;
      case MediaType.InternalMedia:
      case MediaType.InternalMediaUpload:
        url = media.mediaContents.internalMedias.length
          ? media.mediaContents.internalMedias[0].viewUrl
          : '';

        if (this.personalCube!.contents.type === CubeType.Video && url) {
          url += '&offerviewer=false&showtitle=false&showbrand=false';
        } else if (this.personalCube!.contents.type === CubeType.Audio && url) {
          url +=
            '&offerviewer=false&interactivity=none&showtitle=false&showbrand=false';
        }
        break;
    }

    return url;
  }

  getStudentCdo(): StudentCdoModel {
    const { member } = this.props;

    return new StudentCdoModel({
      rollBookId: this.rollBooks.length ? this.rollBooks[0].id : '',
      name: member!.name,
      email: member!.email,
      company: member!.company,
      department: member!.department,
      proposalState: ProposalState.Submitted,
      programLectureUsid: '',
      courseLectureUsid: '',
      leaderEmails: [],
      url: '',
      enClosed: false,
      classroomId: '',
      approvalProcess: false,
      //enClosed: boardService!.board!.boardConfig!.enClosed,
    });
  }

  async getMainActionForVideo() {
    //collegeId
    const { mediaService } = this.props;
    // const { personalCube } = personalCubeService!;

    const { service, contents } = this.personalCube!.contents;

    //Video, Audio
    if (service.type === ContentsServiceType.Media) {
      const media = await mediaService!.findMedia(contents.id);

      //????????????
      // if (media.mediaType === MediaType.InternalMedia) {
      //   const studentCdo = {
      //     ...this.getStudentCdo(),
      //     proposalState: ProposalState.Approved,
      //   };
      //
      //   lectureService.confirmUsageStatisticsByCardId(studentCdo)
      //     .then((confirmed) => {
      //       if (confirmed) {
      //         history.replace('/empty');
      //         setTimeout(() => history.replace(routePaths.lectureCardOverview(collegeId, lectureView.cubeId, lectureView.serviceId)));
      //       }
      //     });
      // }

      const url = this.getMediaUrl(media);

      //?????? ??????, CP??? ??????
      if (
        media.mediaType === MediaType.LinkMedia ||
        media.mediaType === MediaType.ContentsProviderMedia
      ) {
        return {
          type: LectureSubInfo.ActionType.LearningStart,
          onAction: this.onClickPlayForOpen(url),
        };
      } else {
        return {
          type: LectureSubInfo.ActionType.Play,
          onAction: this.onClickPlayForVideo(url),
        };
      }
    }
    // else if (service.type === ContentsServiceType.Community)
    // {
    //   await boardService!.findBoard(contents.id);
    // }

    return null;
  }

  // ???????????? - ?????? ????????? ??????
  popupLearnModal(url: string) {
    const { onDoLearn, lectureView } = this.props;
    if (onDoLearn) {
      const studentCdo = this.getStudentCdo();
      onDoLearn(url, studentCdo, lectureView);
    }
  }

  getViewObject() {
    //
    this.state.isContent = false;

    let state: string | undefined;
    let examId: string = '';
    let examTitle: string = '';
    let surveyId: string = '';
    let surveyTitle: string = '';
    let surveyState: boolean = false;
    let surveyCaseId: string = '';
    let reportFileBoxId: string = '';

    state = this.state.inProgress || undefined;
    examId = this.personalCube?.contents.examId || '';
    examTitle = this.state.examTitle || '';
    surveyId = this.personalCube?.contents.surveyId || '';
    surveyTitle = this.state.surveyTitle || '';
    surveyState = this.state.surveyState || false;
    surveyCaseId = this.personalCube?.contents.surveyCaseId || '';
    reportFileBoxId = this.state.reportFileId || '';
    this.state.isContent = true;

    if (this.personalCube && this.studentData && this.studentData.id) {
      if (this.studentData.proposalState === ProposalState.Approved) {
        if (
          this.studentData.learningState === LearningState.Waiting ||
          this.studentData.learningState === LearningState.HomeworkWaiting ||
          this.studentData.learningState === LearningState.TestWaiting ||
          this.studentData.learningState === LearningState.TestPassed ||
          this.studentData.learningState === LearningState.Failed
        ) {
          state = SubState.InProgress;
        }
        if (this.studentData.learningState === LearningState.Progress) {
          state = SubState.InProgress;
        }
        if (this.studentData.learningState === LearningState.Passed) {
          state = SubState.InProgress;
        }
        if (this.studentData.learningState === LearningState.Missed) {
          state = SubState.InProgress;
        }
        // if (this.studentData.learningState === LearningState.Passed) state = SubState.Completed;
        // if (this.studentData.learningState === LearningState.Missed) state = SubState.Missed;
      }

      if (
        !examId &&
        this.studentData.phaseCount !== this.studentData.completePhaseCount &&
        this.studentData.learningState === LearningState.Progress
      ) {
        state = SubState.InProgress;
      }
    }

    return {
      // Sub info
      state,
      examId,
      // Fields
      examTitle,
      surveyId,
      surveyTitle,
      surveyState,
      surveyCaseId,
      reportFileBoxId,
    };
  }

  onApplyReference() {
    this.applyReferenceModel.onOpenModal();
  }

  onReport() {
    this.reportModal.onOpenModal();
  }

  onTest() {
    this.examModal.onOpenModal();
  }

  // truefree 2020-04-03
  // Test ?????? ????????? ????????? ??? Alert ?????? ????????????....
  onReportNotReady() {
    reactAlert({
      title: 'Report ??????',
      message: '?????? ?????? ??? Report ?????? ???????????????.',
    });
    // reactAlert({ title: 'Test&Report ??????', message: '?????? ?????? ?????? ??? Test ??????(Report ??????) ???????????????.' });
    // reactAlert({ title: 'Test&Report ??????', message: '?????? ???????????? ???????????? Test??????(Report??????)??? ???????????????.' });
  }

  onTestNotReady() {
    reactAlert({
      title: 'Test ??????',
      message: '?????? ?????? ??? Test ?????? ???????????????.',
    });
    // reactAlert({ title: 'Test&Report ??????', message: '?????? ?????? ?????? ??? Test ??????(Report ??????) ???????????????.' });
    // reactAlert({ title: 'Test&Report ??????', message: '?????? ???????????? ???????????? Test??????(Report??????)??? ???????????????.' });
  }

  OnSurveyNotReady() {
    reactAlert({
      title: 'Survey ??????',
      message: '?????? ?????? ??? Survey ?????? ???????????????.',
    });
    // reactAlert({ title: 'Survey ??????', message: '?????? ?????? ?????? ??? Survey ?????? ???????????????.' });
    // reactAlert({ title: 'Test&Report ??????', message: '?????? ???????????? ???????????? Test??????(Report??????)??? ???????????????.' });
  }

  onSurvey() {
    this.surveyModal.onOpenModal();
  }

  testCallback() {
    if (this.studentData) {
      StudentApi.instance
        .modifyStudentForExam(
          this.studentData.id,
          this.personalCube!.contents.examId
        )
        .then(() => {
          if (this.init()) this.init();
        });
    }
  }

  setExamState(studentData: any) {
    if (studentData && studentData.learningState === LearningState.Passed) {
      this.state.passedState = true;
    }

    this.setStateName('1', 'Test');
    if (studentData) {
      if (studentData.serviceType || studentData.serviceType === 'Lecture') {
        if (
          studentData.learningState === LearningState.Progress ||
          studentData.learningState === LearningState.HomeworkWaiting
        ) {
          this.setStateName('0', 'Test');
        } else if (
          studentData.learningState === LearningState.Failed &&
          studentData.studentScore.numberOfTrials < 3
        ) {
          // this.setStateName('2', `?????????(${studentData.studentScore.numberOfTrials}/3)`);
          this.setStateName(
            '0',
            `????????? (${studentData.studentScore.numberOfTrials})`
          );
        } else if (
          studentData.learningState === LearningState.Failed &&
          studentData.studentScore.numberOfTrials > 2
        ) {
          // this.setStateName('3', `?????????(${studentData.studentScore.numberOfTrials}/3)`);
          this.setStateName(
            '0',
            `????????? (${studentData.studentScore.numberOfTrials})`
          );
        } else if (studentData.learningState === LearningState.Missed) {
          // this.setStateName('4', '?????????');
          this.setStateName(
            '0',
            `????????? (${studentData.studentScore.numberOfTrials})`
          );
        } else if (studentData.learningState === LearningState.Passed) {
          this.setStateName('5', '??????');
        } else if (studentData.learningState === LearningState.TestPassed) {
          this.setStateName('5', '????????????');
        } else {
          this.setStateName('1', 'Test');
        }
      } else if (
        studentData.serviceType === 'Course' ||
        studentData.serviceType === 'Program'
      ) {
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
          // this.setStateName('2', `?????????(${studentData.studentScore.numberOfTrials}/3)`);
          // // subActions.push({ type: `?????????(${student.numberOfTrials}/3)`, onAction: this.onTest });
          this.setStateName(
            '0',
            `????????? (${studentData.studentScore.numberOfTrials})`
          );
        } else if (
          studentData.phaseCount === studentData.completePhaseCount &&
          studentData.learningState === LearningState.Failed &&
          studentData.studentScore.numberOfTrials > 2
        ) {
          // this.setStateName('3', `?????????(${studentData.studentScore.numberOfTrials}/3)`);
          // // subActions.push({ type: `?????????(${student.numberOfTrials}/3)`, onAction: this.onTest });
          this.setStateName(
            '0',
            `????????? (${studentData.studentScore.numberOfTrials})`
          );
        } else if (studentData.learningState === LearningState.Missed) {
          // this.setStateName('4', '?????????');
          this.setStateName(
            '0',
            `????????? (${studentData.studentScore.numberOfTrials})`
          );
        } else if (studentData.learningState === LearningState.Passed) {
          this.setStateName('5', '??????');
        } else if (studentData.learningState === LearningState.TestPassed) {
          this.setStateName('5', '????????????');
        } else {
          this.setStateName('1', 'Test');
        }
      }
    }
  }

  setStateName(type: string, name: string) {
    this.state.type = type;
    this.state.name = name;
  }

  onClickDownloadReport(fileBoxId: string) {
    //
    depot.downloadDepot(fileBoxId);
  }

  render() {
    //
    const { classNameForLearningState } = this.state;
    const {
      className,
      lectureView,
      thumbnailImage,
      toggle,
      onViewDetail,
    } = this.props;
    const { open } = this.context;

    //Lecture Card??? Video??? ????????? ???????????? ????????? ?????????, ??????????????? ?????? ?????? css??????(fix bg)
    const className1 =
      lectureView.cubeType === CubeType.Video
        ? classNameForLearningState
        : 'fix line';
    const thumbnail =
      this.state.inProgress !== SubState.Completed
        ? thumbnailImage
        : `${process.env.PUBLIC_URL}/images/all/thumb-card-complete-60-px@2x.png`;

    return (
      <div>
        <div className={`card-box ${className}`}>
          <Thumbnail image={thumbnail} />
          <Title title={lectureView.name} category={lectureView.category}>
            <div className="deatil">
              {lectureView.cubeTypeName && (
                <Field>
                  {/* <SubField
                    bold
                    icon={
                      CubeIconType[lectureView.cubeType] ||
                      CubeIconType[lectureView.serviceType]
                    }
                    text={lectureView.cubeTypeName}
                  /> */}
                  <span className="channel">
                    {lectureView.category.channel.name}
                  </span>
                </Field>
              )}
              <Field>
                <SubField
                  icon="date"
                  text={`????????? : ${moment(lectureView.creationDate).format(
                    'YYYY.MM.DD'
                  )}`}
                >
                  {lectureView.learningPeriod && (
                    <span className="ml17">
                      ???????????? :{' '}
                      {lectureView.learningPeriod &&
                        lectureView.learningPeriod.startDate}{' '}
                      ~{' '}
                      {lectureView.learningPeriod &&
                        lectureView.learningPeriod.endDate}
                    </span>
                  )}
                </SubField>
              </Field>
            </div>
          </Title>

          {/*<CubeRightInfo*/}
          {/*  learningType={lectureView.cubeType}*/}
          {/*  learningState={this.studentData.learningState}*/}
          {/*  learningTime="11m"*/}
          {/*/>*/}

          <Buttons>
            {/*<Button className="fix line" onClick={onViewDetail}>????????????</Button>*/}
            {lectureView.cubeType === CubeType.Video &&
              (this.state.inProgress !== SubState.Completed ? (
                <Button
                  className={className1}
                  onClick={this.getMainActionForVideo}
                >
                  ????????????
                </Button>
              ) : (
                <span className="completed-txt">????????????</span>
              ))}
          </Buttons>
          {toggle && (
            <Button
              icon
              className={classNames({
                'img-icon': true,
                'fn-more-toggle': true,
                'card-open': !open,
                'card-close': open,
              })}
              onClick={this.onToggle}
            >
              <Icon
                className={classNames({
                  'arrow-down': !open,
                  'arrow-up': open,
                })}
              />
            </Button>
          )}
          {this.viewObject && this.personalCube?.contents.examId && (
            <AnswerSheetModal
              examId={this.personalCube?.contents.examId}
              type={this.state.type}
              ref={examModal => (this.examModal = examModal)}
              onSaveCallback={this.testCallback}
            />
          )}
          {this.viewObject && this.personalCube?.contents.surveyId && (
            <SurveyAnswerSheetModal
              surveyId={this.personalCube?.contents.surveyId}
              surveyCaseId={this.personalCube?.contents.surveyCaseId}
              ref={surveyModal => (this.surveyModal = surveyModal)}
              // onSaveCallback={this.testCallback}
              serviceId={lectureView.serviceId}
              serviceType={lectureView.serviceType}
            />
          )}
          {this.viewObject && this.viewObject.reportFileBoxId && (
            <CubeReportModal
              downloadFileBoxId={this.viewObject.reportFileBoxId}
              ref={reportModal => (this.reportModal = reportModal)}
              downloadReport={this.onClickDownloadReport}
              rollBookId={this.rollBooks[0].id}
            />
          )}
        </div>

        {this.viewObject && this.state.isContent === true && (
          <LectureExam
            onReport={
              this.viewObject.reportFileBoxId ? this.onReport : undefined
            }
            onReportNotReady={
              this.personalCube?.contents.examId
                ? this.onReportNotReady
                : undefined
            }
            onTest={
              this.personalCube?.contents.examId ? this.onTest : undefined
            }
            onTestNotReady={
              this.personalCube?.contents.examId
                ? this.onTestNotReady
                : undefined
            }
            onSurvey={
              this.personalCube?.contents.surveyId ? this.onSurvey : undefined
            }
            OnSurveyNotReady={
              this.personalCube?.contents.surveyId
                ? this.OnSurveyNotReady
                : undefined
            }
            viewObject={this.viewObject}
            passedState={this.state.passedState}
            type={this.state.type}
            name={this.state.name}
          />
        )}
      </div>
    );
  }
}

interface FieldProps {
  children: React.ReactNode;
}

const Field = ({ children }: FieldProps) => (
  <div className="item">{children}</div>
);

export default CourseLectureContainer;
