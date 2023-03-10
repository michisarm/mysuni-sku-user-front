/* eslint-disable */
import React, { Component } from 'react';
import { mobxHelper, reactAlert, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import depot from '@nara.drama/depot';

import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';

import { LearningState, ProposalState } from 'shared/model';
import { EmployeeModel } from 'profile/model';
import {
  ContentsServiceType,
  PersonalCubeModel,
} from 'personalcube/personalcube/model';
import { MediaModel, MediaType } from 'personalcube/media/model';
import { PersonalCubeService } from 'personalcube/personalcube/stores';
import { MediaService } from 'personalcube/media/stores';
import { BoardService } from 'personalcube/community/stores';
import { ExaminationService, ExamPaperService } from 'assistant/stores';
import { SurveyCaseService, SurveyFormService } from 'survey/stores';

import {
  LectureViewModel,
  RollBookModel,
  StudentCdoModel,
  StudentJoinRdoModel,
  StudentModel,
  LectureFilterRdoModel,
} from '../../../../model';
import LectureSubInfo, { State as SubState } from '../../../LectureSubInfo';

import StudentService from '../../../present/logic/StudentService';
import RollBookService from '../../../present/logic/RollBookService';

import Action from '../../model/Action';
import { CourseSectionContext } from '../CourseSection';
import { AnswerProgress } from '../../../../../survey/answer/model/AnswerProgress';
import LectureExam2 from '../../../LectureExam/ui/logic/LectureExamContainer2';
import { AnswerSheetModal, CubeReportModal } from '../../../../../assistant';
import { AnswerSheetModal as SurveyAnswerSheetModal } from '../../../../../survey';
import StudentApi from '../../../present/apiclient/StudentApi';
import AnswerSheetApi from '../../../../../survey/answer/present/apiclient/AnswerSheetApi';
import { CubeIntroService } from '../../../../../personalcube/cubeintro/stores';
import { dateTimeHelper } from '../../../../../shared';
import CubeType from '../../../../../personalcube/personalcube/model/CubeType';
import AnswerSheetModel from '../../../../../survey/answer/model/AnswerSheetModel';
import { SurveyFormModel } from '../../../../../survey/form/model/SurveyFormModel';
import StudentInfoModel from '../../../../model/StudentInfoModel';
import { LectureExam } from '../../../LectureExam';
import SurveyCaseModel from '../../../../../survey/event/model/SurveyCaseModel';
import {
  LRSLectureService,
  NEWLectureService,
  POPLectureService,
  RQDLectureService,
} from '../../../../stores';

import './index.css';

interface Props {
  rollBookService?: RollBookService;
  boardService: BoardService;
  personalCubeService?: PersonalCubeService;
  studentService?: StudentService;
  rqdLectureService?: RQDLectureService;
  mediaService?: MediaService;
  collegeId?: string;
  lectureView: LectureViewModel;
  lectureViewSize?: number;
  lectureViewName?: string;
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
  member?: EmployeeModel;

  examinationService?: ExaminationService;
  examPaperService?: ExamPaperService;
  // answerSheetService?: AnswerSheetService,
  surveyCaseService?: SurveyCaseService;
  surveyFormService?: SurveyFormService;

  learningState?: string;
  isPreCoursePassed?: boolean;
  studentInfo?: StudentInfoModel | null;
  onLectureInitRequest?: () => void;
}

interface State {
  classNameForLearningState: string;
  inProgress: string;
  examTitle: string;
  surveyState: boolean;
  surveyTitle: string | any;
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
    'rqdLecture.rqdLectureService',
    'personalCube.mediaService',

    'assistant.examinationService',
    'assistant.examPaperService',
    // 'survey.answerSheetService',
    'survey.surveyCaseService',
    'survey.surveyFormService',
    'lecture.studentService'
  )
)
@reactAutobind
@observer
class CourseLectureContainer2 extends Component<Props, State> {
  //

  static contextType = CourseSectionContext;

  static defaultProps = {
    thumbnailImage: null,
    action: null,
    toggle: false,
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
  };

  examModal: any = null;
  surveyModal: any = null;
  reportModal: any = null;
  applyReferenceModel: any = null;

  viewObject: any = null;
  studentData: any = StudentModel;

  personalCube: PersonalCubeModel | null | undefined = {} as PersonalCubeModel;
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
  }

  componentDidMount() {
    const { lectureView, studentService } = this.props;
    const { setOpen } = this.context;

    if (lectureView.cubeId) {
      setOpen(true);
      this.init();
      return;
    }

    if (lectureView.learningState === LearningState.Progress) {
      setOpen(true);
    }

    this.init();
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    if (
      (this.props.studentInfo !== null &&
        prevProps.studentInfo !== this.props.studentInfo) ||
      this.props.isPreCoursePassed !== prevProps.isPreCoursePassed
    ) {
      this.init();
    }
  }

  async init() {
    // const {
    //   lectureView,
    //   examinationService,
    //   examPaperService,
    //   studentInfo,
    //   surveyFormService,
    // } = this.props;
    // if (lectureView) {
    //   if (studentInfo !== null) {
    //     this.getStudentInfoView();
    //   }
    //   examinationService?.setExamination(lectureView.examination);
    //   const examPaper = lectureView.examPaper;
    //   if (examPaper) {
    //     this.state.examTitle = examPaper.title;
    //     this.setState({ examTitle: examPaper.title });
    //   }
    //   if (lectureView.surveyCase?.id && lectureView.surveyCase.surveyFormId) {
    //     const answerSheetService = await AnswerSheetApi.instance.findAnswerSheet(
    //       lectureView.surveyCase.id
    //     );
    //     // const surveyForm = await surveyFormService!.findSurveyForm(lectureView.surveyCase.id);
    //     const surveyForm = await SurveyFormService.instance!.findSurveyForm(
    //       lectureView.surveyCase.surveyFormId
    //     );
    //     const disabled =
    //       answerSheetService &&
    //       answerSheetService.progress === AnswerProgress.Complete;
    //     this.state.surveyState = disabled;
    //     if (
    //       surveyForm &&
    //       surveyForm.titles &&
    //       surveyForm.titles.langStringMap
    //     ) {
    //       // @ts-ignore
    //       this.state.surveyTitle = surveyForm.titles.langStringMap.get('ko');
    //     }
    //     this.setState({ surveyState: disabled });
    //     this.setState({
    //       surveyTitle: surveyForm.titles.langStringMap.get('ko'),
    //     });
    //   }
    //   if (lectureView.cubeId) {
    //     // const cubeIntro = await CubeIntroService.instance.findCubeIntro(this.personalCube?.cubeIntro.id);
    //     const cubeIntro = lectureView.cubeIntro;
    //     if (
    //       cubeIntro &&
    //       cubeIntro?.reportFileBox &&
    //       cubeIntro?.reportFileBox.fileBoxId
    //     ) {
    //       this.state.reportFileId = cubeIntro?.reportFileBox.fileBoxId;
    //     }
    //   }
    //   this.viewObject = this.getViewObject();
    //   this.setExamState(this.studentData);
    // }
  }

  getStudentInfoView() {
    const { studentService, lectureView } = this.props;
    const { getLectureInfo } = studentService!;

    const studentLecture: StudentModel = getLectureInfo(lectureView.serviceId);
    if (studentLecture) {
      this.studentForVideoObj = studentLecture;
      const classNameForLearningStateTemp = this.setClassNameForLearningState(
        this.studentForVideoObj
      );
      this.setState({
        classNameForLearningState: classNameForLearningStateTemp,
      });
      this.studentData = studentLecture;

      this.setExamState(this.studentData);
    } else {
      this.setExamState();
    }
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
            studentForVideo.learningState === LearningState.Failed /*||
            studentForVideo.learningState === LearningState.TestWaiting ||
            studentForVideo.learningState === LearningState.HomeworkWaiting ||
            studentForVideo.learningState === LearningState.TestPassed*/
          ) {
            state = SubState.Waiting;
          }
          if (
            studentForVideo.learningState === LearningState.Progress ||
            studentForVideo.learningState === LearningState.TestPassed ||
            studentForVideo.learningState === LearningState.TestWaiting ||
            studentForVideo.learningState === LearningState.HomeworkWaiting
          )
            state = SubState.InProgress;
          if (studentForVideo.learningState === LearningState.Passed)
            state = SubState.Completed;
          if (studentForVideo.learningState === LearningState.Missed)
            state = SubState.Missed;
        }
      }

      this.state.inProgress = state;
      classNameForLearningState =
        state === SubState.InProgress ? 'fix bg' : 'fix line';

      // this.classNameForLearningState = classNameForLearningState;
    }

    return classNameForLearningState;
  }

  onToggle() {
    //
    const { open, setOpen } = this.context;
    setOpen(!open);

    /*

    if( this.state.inProgress === LearningState.Progress ) {
      setOpen(open);
    } else {
      setOpen(!open);
    }*/
  }

  registerStudentForVideo(studentCdo: StudentCdoModel) {
    //
    const { studentService, lectureView, onRefreshLearningState } = this.props;
    const { getStudentForVideo } = studentService!;

    //???????????? ??? ???????????? ???????????? ?????? ??? Lecture Card??? ??????????????? ?????????.
    return studentService!.registerStudent(studentCdo).then(() => {
      getStudentForVideo(lectureView.serviceId).then((studentForVideo) => {
        this.studentForVideoObj = studentForVideo;
        const classNameForLearningStateTemp = this.setClassNameForLearningState(
          this.studentForVideoObj
        );

        //Course ?????? ???????????? ??????
        onRefreshLearningState!();
        this.removeStorage();

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
      await this.registerStudentForVideo({
        ...studentCdo,
        proposalState: proposalState || studentCdo.proposalState,
      });
    } else if (
      this.studentForVideoObj.proposalState === ProposalState.Canceled ||
      this.studentForVideoObj.proposalState === ProposalState.Rejected
    ) {
      await this.registerStudentForVideo({
        ...studentCdo,
        proposalState: this.studentForVideoObj.proposalState,
      });
    }
    this.removeRqdLectureFromSessionStorage();
  }

  onLearningStartForVideo(url: string) {
    // const { onDoLearn } = this.props;

    if (url && url.startsWith('http')) {
      this.onRegisterStudentForVideo(ProposalState.Approved);
      this.popupLearnModal(url);
      //window.open(url, '_blank');
    } else {
      reactAlert({ title: '??????', message: '?????? ??? URL ???????????????.' });
    }
  }

  onClickPlayForVideo(url: string) {
    if (url && url.startsWith('http')) {
      this.onRegisterStudentForVideo(ProposalState.Approved);
      this.popupLearnModal(url);
      //window.open(url, '_blank');
    } else {
      reactAlert({ title: '??????', message: '?????? ??? URL ???????????????.' });
    }
  }

  onClickPlayForOpen(url: string) {
    if (url && url.startsWith('http')) {
      // this.publishStudyEvent(true, url);
      this.onRegisterStudentForVideo(ProposalState.Approved);
      window.open(url, '_blank');
    } else {
      reactAlert({ title: '??????', message: '?????? ??? URL ???????????????.' });
    }
  }

  // onClickPlayForOpen(url : string) {
  //   if (url && url.startsWith('http'))
  //   {
  //     this.onRegisterStudentForVideo(ProposalState.Approved);
  //     this.popupLearnModal(url);
  //     // const a = window.open('http://www.naver.com', '_blank');
  //   } else
  //   {
  //     reactAlert({ title: '??????', message: '?????? ??? URL ???????????????.' });
  //   }
  // }

  onEndLearn() {
    const studentCdo = this.getStudentCdo();
  }

  getMediaUrl(media: MediaModel): string {
    let url: string = '';
    const { lectureView } = this.props;

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

        if (lectureView.personalCube?.contents.type === CubeType.Video && url) {
          url += '&offerviewer=false&showtitle=false&showbrand=false';
        } else if (
          lectureView.personalCube?.contents.type === CubeType.Audio &&
          url
        ) {
          url +=
            '&offerviewer=false&interactivity=none&showtitle=false&showbrand=false';
        }
        break;
    }

    return url;
  }

  getStudentCdo(): StudentCdoModel {
    const { member, lectureView } = this.props;

    return new StudentCdoModel({
      rollBookId: lectureView.rollBooks.length
        ? lectureView.rollBooks[0].id
        : '',
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

  removeStorage() {
    const { lectureView } = this.props;
    RQDLectureService.instance.removeLectureFromStorage(lectureView.serviceId);
    NEWLectureService.instance.removeLectureFromStorage(lectureView.serviceId);
    POPLectureService.instance.removeLectureFromStorage(lectureView.serviceId);
    LRSLectureService.instance.removeLectureFromStorage(lectureView.serviceId);
  }

  removeRqdLectureFromSessionStorage() {
    /*
      ????????? & ???????????? ???,
      ?????????????????? display ?????? ?????? ???????????? ??? ???????????? ?????? ?????? ??????. 2020.10.05 by ?????????
    */
    const { rqdLectureService } = this.props;
    rqdLectureService!.findPagingRqdLectures(
      LectureFilterRdoModel.newLectures(8, 0),
      true
    );
  }

  async getMainActionForVideo() {
    //collegeId
    const { mediaService, isPreCoursePassed, lectureView } = this.props;
    // const { personalCube } = personalCubeService!;

    // const { service, contents } = this.personalCube!.contents;

    if (isPreCoursePassed) {
      //Video, Audio
      if (
        lectureView.personalCube?.contents.service.type ===
        ContentsServiceType.Media
      ) {
        const media = await mediaService!.findMedia(
          lectureView.personalCube?.contents.contents.id
        );
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
    } else {
      reactAlert({
        title: '??????????????????',
        message:
          '??? ????????? ?????? Course ????????? ???????????? ?????? ????????? ???????????????.',
      });
    }
    // else if (service.type === ContentsServiceType.Community)
    // {
    //   await boardService!.findBoard(contents.id);
    // }

    return null;
  }

  popupLearnModal(url: string) {
    const { onDoLearn, lectureView } = this.props;
    if (onDoLearn) {
      const studentCdo = this.getStudentCdo();
      onDoLearn(url, studentCdo, lectureView);
    }
  }

  getViewObject() {
    //
    const { lectureView } = this.props;
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
    examId = lectureView.examPaper?.id || '';
    examTitle = this.state.examTitle || '';
    surveyId = lectureView.surveyCase?.surveyFormId || '';
    surveyTitle = this.state.surveyTitle || '';
    surveyState = this.state.surveyState || false;
    surveyCaseId = lectureView.surveyCase?.id || '';
    reportFileBoxId = this.state.reportFileId || '';
    this.state.isContent = true;

    if (this.studentData && this.studentData.id) {
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
        if (this.studentData.learningState === LearningState.Progress)
          state = SubState.InProgress;
        if (this.studentData.learningState === LearningState.Passed)
          state = SubState.InProgress;
        if (this.studentData.learningState === LearningState.Missed)
          state = SubState.InProgress;
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

  getTestViewObject() {
    //
    // this.getStudentInfoView();
    const { lectureView } = this.props;
    this.state.isContent = false;

    let state: string | undefined;
    let examId: string = '';
    let examTitle: string = '';
    let surveyId: string = '';
    let surveyTitle: string = '';
    let surveyState: boolean = false;
    let surveyCaseId: string = '';
    let reportFileBoxId: string = '';

    state = lectureView.learningState || undefined;
    examId = lectureView.examPaper?.id || '';
    examTitle = lectureView.examPaper?.title || '';
    surveyId = lectureView.surveyCase?.id || '';
    surveyTitle = 'TEST' || '';
    surveyState = false;
    surveyCaseId = lectureView.surveyCase?.id || '';
    reportFileBoxId = '' || '';
    this.state.isContent = true;

    // if (lectureView.personalCube) {
    //   if (lectureView.learningState === null) {
    //     state = LearningState.Waiting;
    //   } else if (lectureView.learningState === LearningState.Passed) {
    //     state = LearningState.Progress;
    //   } else {
    //     state = LearningState.Progress;
    //   }
    // }

    if (this.studentData && this.studentData.id) {
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
        if (this.studentData.learningState === LearningState.Progress)
          state = SubState.InProgress;
        if (this.studentData.learningState === LearningState.Passed)
          state = SubState.InProgress;
        if (this.studentData.learningState === LearningState.Missed)
          state = SubState.InProgress;
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
    const { isPreCoursePassed } = this.props;
    if (isPreCoursePassed) {
      this.examModal.onOpenModal();
    } else {
      reactAlert({
        title: '??????????????????',
        message:
          '??? ????????? ?????? Course ????????? ???????????? ?????? ????????? ???????????????.',
      });
    }
  }

  // truefree 2020-04-03
  // Test ?????? ????????? ????????? ??? Alert ?????? ????????????....
  onReportNotReady() {
    reactAlert({
      title: 'Report ??????',
      message: '?????? ?????? ??? Report ?????? ???????????????.',
    });
    // reactAlert({ title: 'Test&Report ??????', message: '?????? ?????? ?????? ??? Test ??????(Report ??????) ???????????????.' });
    // reactAlert({ title: 'Test&Report ??????', message: '?????? ???????????? ???????????? Test??????(Report??????)??? ???????????????.' });
  }

  onAlreadyPassed() {
    reactAlert({ title: 'Test ??????', message: '?????? ????????? ???????????????.' });
  }

  onTestWaiting() {
    reactAlert({
      title: 'Test ??????',
      message: '??????????????? ???????????? ????????????.',
    });
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

  setExamState(studentData?: any) {
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
        } else if (
          studentData.learningState === LearningState.Passed ||
          studentData.learningState === LearningState.TestPassed
        ) {
          this.setStateName('5', '??????');
        } else if (studentData.learningState === LearningState.TestWaiting) {
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
        } else if (
          studentData.learningState === LearningState.Passed ||
          studentData.learningState === LearningState.TestPassed
        ) {
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

  checkPreCourseOnViewDetail(lecture: LectureViewModel) {
    const { isPreCoursePassed, onViewDetail } = this.props;
    if (isPreCoursePassed) {
      if (onViewDetail) onViewDetail(lecture);
    } else {
      reactAlert({
        title: '??????????????????',
        message:
          '??? ????????? ?????? Course ????????? ???????????? ?????? ????????? ???????????????.',
      });
    }
  }

  onClickDownloadReport(fileBoxId: string) {
    //
    depot.downloadDepot(fileBoxId);
  }

  getDuration() {
    if (this.studentData && this.studentData.durationViewSeconds !== null) {
      let durationViewSeconds = this.studentData.durationViewSeconds;
      durationViewSeconds =
        durationViewSeconds >= 90 ? 100 : durationViewSeconds;
      return durationViewSeconds;
    } else {
      return 0;
    }
  }

  setLearningStateForMedia() {
    const { lectureView, onViewDetail } = this.props;

    if (
      lectureView.cubeType === CubeType.Video ||
      lectureView.cubeType === CubeType.Audio
    ) {
      switch (this.state.inProgress) {
        case SubState.InProgress:
          return (
            <a
              href="#"
              className="btn-play orange"
              onClick={(e) => {
                this.getMainActionForVideo();
                e.preventDefault();
              }}
            >
              <span className="text">?????????({this.getDuration()}%)</span>
              <span className={'pie-wrapper progress-' + this.getDuration()}>
                <span className="pie">
                  <span className="left-side" />
                  <span className="right-side" />
                </span>
                <div className="shadow" />
              </span>
            </a>
          );
        case SubState.Waiting:
          return (
            <a
              href="#"
              className="btn-play orange"
              onClick={(e) => {
                this.getMainActionForVideo();
                e.preventDefault();
              }}
            >
              <span className="text">?????????({this.getDuration()}%)</span>
              <span className={'pie-wrapper progress-' + this.getDuration()}>
                <span className="pie">
                  <span className="left-side" />
                  <span className="right-side" />
                </span>
                <div className="shadow" />
              </span>
            </a>
          );
        case SubState.Completed:
          return (
            <a
              href="#"
              className="btn-play completed"
              onClick={(e) => {
                this.getMainActionForVideo();
                e.preventDefault();
              }}
            >
              <span className="text">????????????</span>
              <i className="icon play-completed24" />
            </a>
          );
        default:
          return (
            <a
              href="#"
              className="btn-play black"
              onClick={(e) => {
                this.getMainActionForVideo();
                e.preventDefault();
              }}
            >
              <span className="text">????????????</span>
              <i className="icon play-black24" />
            </a>
          );
      }
    } else {
      switch (this.state.inProgress) {
        case SubState.InProgress:
          return (
            <a
              href="#"
              className="btn-play orange"
              onClick={(e) => {
                this.checkPreCourseOnViewDetail(lectureView);
                e.preventDefault();
              }}
            >
              <span className="text">
                ?????????{/*({lectureView.sumViewSeconds}%)*/}
              </span>
              <span className={'pie-wrapper progress-' + 100}>
                <span className="pie">
                  <span className="left-side" />
                  <span className="right-side" />
                </span>
                <div className="shadow" />
              </span>
            </a>
          );
        case SubState.Waiting:
          return (
            <a
              href="#"
              className="btn-play orange"
              onClick={(e) => {
                this.checkPreCourseOnViewDetail(lectureView);
                e.preventDefault();
              }}
            >
              <span className="text">
                ?????????{/*({lectureView.sumViewSeconds}%)*/}
              </span>
              <span className={'pie-wrapper progress-' + 100}>
                <span className="pie">
                  <span className="left-side" />
                  <span className="right-side" />
                </span>
                <div className="shadow" />
              </span>
            </a>
          );
        case SubState.Completed:
          return (
            <a
              href="#"
              className="btn-play completed"
              onClick={(e) => {
                this.checkPreCourseOnViewDetail(lectureView);
                e.preventDefault();
              }}
            >
              <span className="text">????????????</span>
              <i className="icon play-completed24" />
            </a>
          );
        default:
          return (
            <a
              href="#"
              className="btn-play black"
              onClick={(e) => {
                this.checkPreCourseOnViewDetail(lectureView);
                e.preventDefault();
              }}
            >
              <span className="text">????????????</span>
              <i className="icon play-black24" />
            </a>
          );
      }
    }
  }

  setLearningStateForFirst() {
    const { lectureView, onViewDetail } = this.props;

    if (
      lectureView.cubeType === CubeType.Video ||
      lectureView.cubeType === CubeType.Audio
    ) {
      switch (this.state.inProgress) {
        case SubState.Completed:
          return (
            <div className="btn-completed">
              <Button className="img-completed">
                <span className="">????????????</span>
                <Icon className="play-completed24 s24" />
              </Button>
            </div>
          );
      }
    } else {
      switch (this.state.inProgress) {
        case SubState.Completed:
          return (
            <div className="btn-completed">
              <Button className="img-completed">
                <span className="">????????????</span>
                <Icon className="play-completed24 s24" />
              </Button>
            </div>
          );
      }
    }
    return null;
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
      lectureViewSize,
      lectureViewName,
      learningState,
    } = this.props;

    const { open } = this.context;

    const hourMinuteFormat = dateTimeHelper.timeToHourMinuteFormat(
      this.props.lectureView.learningTime
    );
    this.viewObject = this.getViewObject();

    return (
      <>
        {className === 'first' && lectureView.cubeId && (
          <div className="cube-box">
            <div className="bar typeA">
              <div className="tit">
                <span
                  className="ellipsis"
                  style={{ cursor: 'pointer' }}
                  onClick={onViewDetail}
                >
                  {lectureViewName}
                  {/*{lectureView.name}*/}
                </span>
              </div>
              <div className="right">
                <span>{lectureView.cubeTypeName}</span>
                <span>{hourMinuteFormat}</span>
                {this.setLearningStateForMedia()}
              </div>
            </div>
          </div>
        )}
        {className === 'first' && !lectureView.cubeId && (
          <div>
            <div className="bar">
              <div className="tit">
                <span
                  className="ellipsis"
                  style={{ cursor: 'pointer' }}
                  onClick={onViewDetail}
                >
                  {lectureViewName}
                  {/*{lectureView.name}*/}
                </span>
              </div>
              {lectureViewSize && (
                <>
                  <div className="num">{lectureViewSize}??? ?????? ??????</div>
                  {this.setLearningStateForFirst()}
                </>
              )}

              <div className="toggle-btn">
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
              </div>
            </div>
          </div>
        )}
        {className !== 'first' && (
          <>
            <ul className="step1">
              {lectureView.cubeTypeName && (
                <li>
                  <div className="tit">
                    <span
                      className="ellipsis"
                      style={{ cursor: 'pointer' }}
                      onClick={onViewDetail}
                    >
                      {lectureViewName}
                      {/*{lectureView.name}*/}
                    </span>
                  </div>
                  <div className="right">
                    <span>{lectureView.cubeTypeName}</span>
                    <span>{hourMinuteFormat}</span>
                    {this.setLearningStateForMedia()}
                    {/*TODO: ????????? ????????? ?????? ?????? ????????????*/}
                  </div>
                </li>
              )}
            </ul>
          </>
        )}
      </>
    );
  }
}

interface FieldProps {
  children: React.ReactNode;
}

const Field = ({ children }: FieldProps) => <li>{children}</li>;

export default CourseLectureContainer2;
