import React, {Component} from 'react';
import {mobxHelper, reactAlert, reactAutobind} from '@nara.platform/accent';
import {inject, observer} from 'mobx-react';

import depot from '@nara.drama/depot';

import classNames from 'classnames';
import {Button, Icon} from 'semantic-ui-react';

import {LearningState, ProposalState} from 'shared/model';
import {EmployeeModel} from 'profile/model';
import {ContentsServiceType, PersonalCubeModel} from 'personalcube/personalcube/model';
import {MediaModel, MediaType} from 'personalcube/media/model';
import {PersonalCubeService} from 'personalcube/personalcube/stores';
import {MediaService} from 'personalcube/media/stores';
import {BoardService} from 'personalcube/community/stores';
import {ExaminationService, ExamPaperService} from 'assistant/stores';
import {SurveyCaseService, SurveyFormService} from 'survey/stores';

import {LectureViewModel, RollBookModel, StudentCdoModel, StudentJoinRdoModel, StudentModel} from '../../../../model';
import LectureSubInfo, {State as SubState} from '../../../LectureSubInfo';

import StudentService from '../../../present/logic/StudentService';
import RollBookService from '../../../present/logic/RollBookService';

import Action from '../../model/Action';
import {CourseSectionContext} from '../CourseSection';
import {AnswerProgress} from '../../../../../survey/answer/model/AnswerProgress';
import LectureExam from '../../../LectureExam/ui/logic/LectureExamContainer2';
import {AnswerSheetModal, CubeReportModal} from '../../../../../assistant';
import {AnswerSheetModal as SurveyAnswerSheetModal} from '../../../../../survey';
import StudentApi from '../../../present/apiclient/StudentApi';
import AnswerSheetApi from '../../../../../survey/answer/present/apiclient/AnswerSheetApi';
import {CubeIntroService} from '../../../../../personalcube/cubeintro/stores';
import {dateTimeHelper} from '../../../../../shared';
import CubeType from '../../../../../personalcube/personalcube/model/CubeType';
import AnswerSheetModel from '../../../../../survey/answer/model/AnswerSheetModel';
import {SurveyFormModel} from '../../../../../survey/form/model/SurveyFormModel';
import StudentInfoModel from '../../../../model/StudentInfoModel';
import { LectureExam2 } from '../../../LectureExam';
import SurveyCaseModel from '../../../../../survey/event/model/SurveyCaseModel';
import { LRSLectureService, NEWLectureService, POPLectureService, RQDLectureService } from '../../../../stores';

interface Props {
  rollBookService?: RollBookService,
  boardService: BoardService,
  personalCubeService?: PersonalCubeService,
  studentService?: StudentService,
  mediaService?: MediaService,
  collegeId?: string,
  lectureView: LectureViewModel,
  lectureViewSize?: number,
  lectureViewName?: string,
  className?: string,
  thumbnailImage?: string,
  action?: Action,
  toggle?: boolean,
  open?: boolean,
  onAction?: () => void,
  onViewDetail?: (e: any) => void,
  onToggle?: () => void,
  onRefreshLearningState?: () => void,
  onDoLearn?: (videoUrl: string, studentCdo: StudentCdoModel) => void,
  student?: StudentModel,
  lectureCardId?: string,
  member? : EmployeeModel,

  examinationService?: ExaminationService,
  examPaperService?: ExamPaperService,
  // answerSheetService?: AnswerSheetService,
  surveyCaseService?: SurveyCaseService,
  surveyFormService?: SurveyFormService,

  learningState?: string
  isPreCoursePassed?:  boolean
  studentInfo?: StudentInfoModel | null
  onLectureInitRequest?: () => void
}

interface State
{
  classNameForLearningState: string,
  inProgress: string,
  examTitle: string,
  surveyState: boolean,
  surveyTitle: string | any,
  reportFileId: string,
  type: string,
  name: string,
  isContent: boolean,
}

@inject(mobxHelper.injectFrom(
  'lecture.rollBookService',
  'personalCube.boardService',
  'personalCube.personalCubeService',
  'lecture.studentService',
  'personalCube.mediaService',

  'assistant.examinationService',
  'assistant.examPaperService',
  // 'survey.answerSheetService',
  'survey.surveyCaseService',
  'survey.surveyFormService',
  'lecture.studentService',
))
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
  classNameForLearningState: string  = '';
  studentForVideoObj: StudentModel | null = {} as StudentModel;
  rollBooks: RollBookModel[] = [];



  state =
    {
      classNameForLearningState: 'fix line' || 'fix bg',
      inProgress: '',
      examTitle: '',
      reportFileId: '',
      surveyState: false,
      surveyTitle: '',
      passedState: false,
      type: '',
      name: '',
      isContent: false
    };

  constructor(props: Props)
  {
    //
    super(props);
  }

  componentDidMount()
  {

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

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    // console.log('componentDidUpdate', prevProps.studentInfo !== this.props.studentInfo);
    if ((this.props.studentInfo !== null && prevProps.studentInfo !== this.props.studentInfo) ||
      this.props.isPreCoursePassed !== prevProps.isPreCoursePassed) {
      this.init();
    }
  }

  async init()
  {
    const { lectureView, examinationService, examPaperService, studentInfo, surveyFormService } = this.props;

    if (lectureView) {

      if (studentInfo !== null) {
        this.getStudentInfoView();
      }

      examinationService?.setExamination(lectureView.examination);
      const examPaper = lectureView.examPaper;
      if (examPaper) {
        this.state.examTitle = examPaper.title;
        this.setState({examTitle:examPaper.title});
      }

      if (lectureView.surveyCase?.id) {
        const answerSheetService =  await AnswerSheetApi.instance.findAnswerSheet(lectureView.surveyCase.id);
        // const surveyForm = await surveyFormService!.findSurveyForm(lectureView.surveyCase.id);
        const surveyForm = await SurveyFormService.instance!.findSurveyForm(lectureView.surveyCase.surveyFormId);

        const disabled = answerSheetService && answerSheetService.progress === AnswerProgress.Complete;
        this.state.surveyState = disabled;

        // console.log('this.lectureView.surveyCase.id : ', lectureView.surveyCase.surveyFormId);
        // console.log('this.surveyForm : ', surveyForm);
        if (surveyForm && surveyForm.titles && surveyForm.titles.langStringMap) {
          // @ts-ignore
          this.state.surveyTitle = surveyForm.titles.langStringMap.get('ko');
        }
        this.setState({ surveyState:disabled });
        this.setState({ surveyTitle:surveyForm.titles.langStringMap.get('ko') });
      }

      if (lectureView.cubeId)
      {
        // const cubeIntro = await CubeIntroService.instance.findCubeIntro(this.personalCube?.cubeIntro.id);
        const cubeIntro = lectureView.cubeIntro;
        if (cubeIntro?.reportFileBox.fileBoxId) {
          this.state.reportFileId = cubeIntro?.reportFileBox.fileBoxId;
        }
      }

      this.viewObject = this.getViewObject();

      // console.log('this.viewObject : ', this.viewObject);
      this.setExamState(this.studentData);
    }
  }

  getStudentInfoView() {

    const { studentService, lectureView } = this.props;
    const { getLectureInfo } = studentService!;

    const studentLecture: StudentModel = getLectureInfo(lectureView.serviceId);
    if ( studentLecture ) {
      this.studentForVideoObj = studentLecture;
      const classNameForLearningStateTemp = this.setClassNameForLearningState(this.studentForVideoObj);
      this.setState({ classNameForLearningState: classNameForLearningStateTemp });
      this.studentData = studentLecture;

      this.setExamState(this.studentData);
    } else {
      this.setExamState();
    }
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

  compare(join1: StudentJoinRdoModel, join2: StudentJoinRdoModel) {
    if (join1.updateTime < join2.updateTime) return 1;
    return -1;
  }

  setClassNameForLearningState(studentForVideo: StudentModel)
  {
    let classNameForLearningState: string = 'fix line' || 'fix bg';

    if (studentForVideo)
    {
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
          if (studentForVideo.learningState === LearningState.Progress ||
            studentForVideo.learningState === LearningState.TestPassed ||
            studentForVideo.learningState === LearningState.TestWaiting ||
            studentForVideo.learningState === LearningState.HomeworkWaiting) state = SubState.InProgress;
          if (studentForVideo.learningState === LearningState.Passed) state = SubState.Completed;
          if (studentForVideo.learningState === LearningState.Missed) state = SubState.Missed;
        }
      }

      this.state.inProgress = state;
      classNameForLearningState = (state === SubState.InProgress) ? 'fix bg' : 'fix line';

      // this.classNameForLearningState = classNameForLearningState;
    }

    return classNameForLearningState;
  }

  onToggle() {
    //
    const { open, setOpen } = this.context;
    setOpen(!open);

    /*console.log('this.state.inProgress : ' + this.state.inProgress);

    if( this.state.inProgress === LearningState.Progress ) {
      setOpen(open);
    } else {
      setOpen(!open);
    }*/

  }

  registerStudentForVideo(studentCdo: StudentCdoModel)
  {
    //
    const { studentService, lectureView, onRefreshLearningState } = this.props;
    const { getStudentForVideo } = studentService!;

    //학습하기 시 출석부에 학생등록 처리 후 Lecture Card의 학습상태를 갱신함.
    return studentService!.registerStudent(studentCdo).then(() =>
    {
      getStudentForVideo(lectureView.serviceId).then((studentForVideo) =>
      {
        this.studentForVideoObj = studentForVideo;
        const classNameForLearningStateTemp = this.setClassNameForLearningState(this.studentForVideoObj);

        //Course 전체 학습상태 갱신
        onRefreshLearningState!();
        this.removeStorage();

        //학습하기한 Lecture Card의 학습하기 버튼 상태 갱신(CSS 변경)
        this.setState({ classNameForLearningState: classNameForLearningStateTemp });
      });

      // studentService!.findStudentForVideo(studentCdo.rollBookId);
      // studentService!.findIsJsonStudentForVideo(lectureView.serviceId);
      // studentService!.findStudentCount(studentCdo.rollBookId);
    });
  }

  async onRegisterStudentForVideo(proposalState?: ProposalState)
  {
    const studentCdo = this.getStudentCdo();

    if ((!this.studentForVideoObj || !this.studentForVideoObj.id) || (this.studentForVideoObj.proposalState !== ProposalState.Canceled
      && this.studentForVideoObj.proposalState !== ProposalState.Rejected))
    {
      this.registerStudentForVideo({ ...studentCdo, proposalState: proposalState || studentCdo.proposalState });
    }
    else if (this.studentForVideoObj.proposalState === ProposalState.Canceled || this.studentForVideoObj.proposalState === ProposalState.Rejected) {
      this.registerStudentForVideo({ ...studentCdo, proposalState: this.studentForVideoObj.proposalState });
    }
  }

  onLearningStartForVideo(url : string)
  {
    // const { onDoLearn } = this.props;

    if (url && url.startsWith('http')) {
      this.onRegisterStudentForVideo(ProposalState.Approved);
      this.popupLearnModal(url);
      //window.open(url, '_blank');
    } else
    {
      reactAlert({ title: '알림', message: '잘못 된 URL 정보입니다.' });
      console.warn('[UserFront] Url is empty.');
    }
  }

  onClickPlayForVideo(url : string)
  {
    if (url && url.startsWith('http')) {
      this.onRegisterStudentForVideo(ProposalState.Approved);
      this.popupLearnModal(url);
      //window.open(url, '_blank');
    } else {
      reactAlert({title: '알림', message: '잘못 된 URL 정보입니다.'});
      console.warn('[UserFront] Url is empty.');
    }
  }

  onClickPlayForOpen(url : string)
  {

    if (url && url.startsWith('http'))
    {
      this.onRegisterStudentForVideo(ProposalState.Approved);
      this.popupLearnModal(url);
      // const a = window.open('http://www.naver.com', '_blank');
    } else
    {
      reactAlert({ title: '알림', message: '잘못 된 URL 정보입니다.' });
      console.warn('[UserFront] Url is empty.');
    }


  }

  // onEndLearn() {
  //   const studentCdo = this.getStudentCdo();
  // }

  getMediaUrl(media: MediaModel) : string
  {
    let url : string = '';
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
        url = media.mediaContents.internalMedias.length ? media.mediaContents.internalMedias[0].viewUrl : '';

        if (this.personalCube!.contents.type === CubeType.Video && url)
        {
          url += '&offerviewer=false&showtitle=false&showbrand=false';
        } else if (this.personalCube!.contents.type === CubeType.Audio && url)
        {
          url += '&offerviewer=false&interactivity=none&showtitle=false&showbrand=false';
        }
        break;
    }

    return url;
  }

  getStudentCdo(): StudentCdoModel {
    const {
      member,
    } = this.props;

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

  removeStorage() {
    const { lectureView } = this.props;
    RQDLectureService.instance.removeLectureFromStorage(lectureView.serviceId);
    NEWLectureService.instance.removeLectureFromStorage(lectureView.serviceId);
    POPLectureService.instance.removeLectureFromStorage(lectureView.serviceId);
    LRSLectureService.instance.removeLectureFromStorage(lectureView.serviceId);
  }

  async getMainActionForVideo()
  {
    //collegeId
    const { mediaService, isPreCoursePassed, lectureView } = this.props;
    // const { personalCube } = personalCubeService!;

    const { service, contents } = this.personalCube!.contents;

    if (isPreCoursePassed) {
      //Video, Audio
      if (service.type === ContentsServiceType.Media) {
        const media = await mediaService!.findMedia(contents.id);

        //통계처리
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

        //외부 영상, CP사 영상
        if (media.mediaType === MediaType.LinkMedia || media.mediaType === MediaType.ContentsProviderMedia) {
          return { type: LectureSubInfo.ActionType.LearningStart, onAction: this.onClickPlayForOpen(url) };
        } else {
          return { type: LectureSubInfo.ActionType.Play, onAction: this.onClickPlayForVideo(url) };
        }
      }
    }  else {
      reactAlert({ title: '선수과정안내', message: '본 과정은 선수 Course 과정을 이수하신 후에 학습이 가능합니다.' });
    }
    // else if (service.type === ContentsServiceType.Community)
    // {
    //   await boardService!.findBoard(contents.id);
    // }

    return null;
  }

  popupLearnModal(url: string) {
    const { onDoLearn } = this.props;
    if (onDoLearn) {
      const studentCdo = this.getStudentCdo();
      onDoLearn(url, studentCdo);
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

    if (this.studentData  && this.studentData.id) {
      if (this.studentData.proposalState === ProposalState.Approved) {
        if (
          this.studentData.learningState    === LearningState.Waiting
          || this.studentData.learningState === LearningState.HomeworkWaiting
          || this.studentData.learningState === LearningState.TestWaiting
          || this.studentData.learningState === LearningState.TestPassed
          || this.studentData.learningState === LearningState.Failed
        ) {
          state = SubState.InProgress;
        }
        if (this.studentData.learningState === LearningState.Progress) state = SubState.InProgress;
        if (this.studentData.learningState === LearningState.Passed)   state = SubState.InProgress;
        if (this.studentData.learningState === LearningState.Missed)   state = SubState.InProgress;
        // if (this.studentData.learningState === LearningState.Passed) state = SubState.Completed;
        // if (this.studentData.learningState === LearningState.Missed) state = SubState.Missed;
      }

      if (!examId && this.studentData.phaseCount !== this.studentData.completePhaseCount &&
        this.studentData.learningState === LearningState.Progress) {
        state = SubState.InProgress;
      }
    }
    // console.log('getViewObject>>>> : ', this.state.isContent);
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
          this.studentData.learningState    === LearningState.Waiting
          || this.studentData.learningState === LearningState.HomeworkWaiting
          || this.studentData.learningState === LearningState.TestWaiting
          || this.studentData.learningState === LearningState.TestPassed
          || this.studentData.learningState === LearningState.Failed
        ) {
          state = SubState.InProgress;
        }
        if (this.studentData.learningState === LearningState.Progress) state = SubState.InProgress;
        if (this.studentData.learningState === LearningState.Passed)   state = SubState.InProgress;
        if (this.studentData.learningState === LearningState.Missed)   state = SubState.InProgress;
        // if (this.studentData.learningState === LearningState.Passed) state = SubState.Completed;
        // if (this.studentData.learningState === LearningState.Missed) state = SubState.Missed;
      }

      if (!examId && this.studentData.phaseCount !== this.studentData.completePhaseCount &&
        this.studentData.learningState === LearningState.Progress) {
        state = SubState.InProgress;
      }
    }

    // console.log('getViewObject>>>> : ', this.state.isContent);
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
      reactAlert({ title: '선수과정안내', message: '본 시험은 선수 Course 과정을 이수하신 후에 응시가 가능합니다.' });
    }
  }

  // truefree 2020-04-03
  // Test 응시 못하는 조건일 땐 Alert 띄워 달라길래....
  onReportNotReady() {
    reactAlert({ title: 'Report 안내', message: '학습 시작 후 Report 참여 가능합니다.' });
    // reactAlert({ title: 'Test&Report 안내', message: '과정 이수 완료 후 Test 응시(Report 제출) 가능합니다.' });
    // reactAlert({ title: 'Test&Report 안내', message: '모든 컨텐츠를 학습해야 Test응시(Report제출)가 가능합니다.' });
  }

  onAlreadyPassed() {
    reactAlert({ title: 'Test 안내', message: '이미 통과한 시험입니다.' });
  }

  onTestWaiting() {
    reactAlert({ title: 'Test 안내', message: '시험결과를 기다리고 있습니다.' });
  }

  onTestNotReady() {
    reactAlert({ title: 'Test 안내', message: '학습 시작 후 Test 참여 가능합니다.' });
    // reactAlert({ title: 'Test&Report 안내', message: '과정 이수 완료 후 Test 응시(Report 제출) 가능합니다.' });
    // reactAlert({ title: 'Test&Report 안내', message: '모든 컨텐츠를 학습해야 Test응시(Report제출)가 가능합니다.' });
  }

  OnSurveyNotReady() {
    reactAlert({ title: 'Survey 안내', message: '학습 시작 후 Survey 참여 가능합니다.' });
    // reactAlert({ title: 'Survey 안내', message: '과정 이수 완료 후 Survey 응시 가능합니다.' });
    // reactAlert({ title: 'Test&Report 안내', message: '모든 컨텐츠를 학습해야 Test응시(Report제출)가 가능합니다.' });
  }

  onSurvey() {
    this.surveyModal.onOpenModal();
  }

  surveyCallback() {
    if (this.init()) this.init();
  }

  testCallback() {
    const { onLectureInitRequest } = this.props;
    if (this.studentData) {
      StudentApi.instance.modifyStudentForExam(this.studentData.id, this.personalCube!.contents.examId)
        .then(() => {
          // if (this.init()) this.init();
          if (onLectureInitRequest) onLectureInitRequest();
        });
    }
  }

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
      if (studentData.serviceType || studentData.serviceType === 'Lecture') {
        if (studentData.learningState === LearningState.Progress ||
          studentData.learningState === LearningState.HomeworkWaiting) {
          this.setStateName('0', 'Test');
        } else if (studentData.learningState === LearningState.Failed && studentData.studentScore.numberOfTrials < 3) {
          // this.setStateName('2', `재응시(${studentData.studentScore.numberOfTrials}/3)`);
          this.setStateName('0', `재응시 (${studentData.studentScore.numberOfTrials})`);
        } else if (studentData.learningState === LearningState.Failed && studentData.studentScore.numberOfTrials > 2) {
          // this.setStateName('3', `재응시(${studentData.studentScore.numberOfTrials}/3)`);
          this.setStateName('0', `재응시 (${studentData.studentScore.numberOfTrials})`);
        } else if (studentData.learningState === LearningState.Missed) {
          // this.setStateName('4', '미이수');
          this.setStateName('0', `재응시 (${studentData.studentScore.numberOfTrials})`);
        } else if (studentData.learningState === LearningState.Passed || studentData.learningState === LearningState.TestPassed) {
          this.setStateName('5', '이수');
        } else if (studentData.learningState === LearningState.TestWaiting) {
          this.setStateName('5', '결과대기');
        } else {
          this.setStateName('1', 'Test');
        }
        // console.log('type : ' + this.state.type + ', name : ' + this.state.name);
      }
      else if (studentData.serviceType === 'Course' || studentData.serviceType === 'Program') {

        if (
          studentData.phaseCount === studentData.completePhaseCount
          && (studentData.learningState === LearningState.Progress
          || studentData.learningState === LearningState.HomeworkWaiting)
        ) {
          this.setStateName('0', 'Test');
        } else if (
          studentData.phaseCount === studentData.completePhaseCount
          && (studentData.learningState === LearningState.Failed && studentData.studentScore.numberOfTrials < 3)
        ) {
          // this.setStateName('2', `재응시(${studentData.studentScore.numberOfTrials}/3)`);
          // // subActions.push({ type: `재응시(${student.numberOfTrials}/3)`, onAction: this.onTest });
          this.setStateName('0', `재응시 (${studentData.studentScore.numberOfTrials})`);
        } else if (
          studentData.phaseCount === studentData.completePhaseCount
          && (studentData.learningState === LearningState.Failed && studentData.studentScore.numberOfTrials > 2)
        ) {
          // this.setStateName('3', `재응시(${studentData.studentScore.numberOfTrials}/3)`);
          // // subActions.push({ type: `재응시(${student.numberOfTrials}/3)`, onAction: this.onTest });
          this.setStateName('0', `재응시 (${studentData.studentScore.numberOfTrials})`);
        } else if (studentData.learningState === LearningState.Missed) {
          // this.setStateName('4', '미이수');
          this.setStateName('0', `재응시 (${studentData.studentScore.numberOfTrials})`);
        } else if (studentData.learningState === LearningState.Passed || studentData.learningState === LearningState.TestPassed) {
          this.setStateName('5', '이수');
        } else if (studentData.learningState === LearningState.TestPassed) {
          this.setStateName('5', '결과대기');
        } else {
          this.setStateName('1', 'Test');
        }
      }
    }

    // console.log('type : ' + this.state.type + ', name : ' + this.state.name);
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
      reactAlert({ title: '선수과정안내', message: '본 과정은 선수 Course 과정을 이수하신 후에 학습이 가능합니다.' });
    }
  }

  onClickDownloadReport(fileBoxId: string) {
    //
    depot.downloadDepot(fileBoxId);
  }

  getDuration() {
    if (this.studentData && this.studentData.durationViewSeconds !== null) {
      let durationViewSeconds = this.studentData.durationViewSeconds;
      durationViewSeconds = durationViewSeconds >= 90 ? 100 : durationViewSeconds;
      return durationViewSeconds;
    } else {
      return 0;
    }
  }

  setLearningStateForMedia() {
    const { lectureView, onViewDetail } = this.props;

    if (lectureView.cubeType === CubeType.Video || lectureView.cubeType === CubeType.Audio ) {
      switch (this.state.inProgress) {
        case SubState.InProgress:
          return (
            <a href="#" className="btn-play orange" onClick={e => {this.getMainActionForVideo(); e.preventDefault();}}>
              <span className="text">학습중({this.getDuration()}%)</span>
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
            <a href="#" className="btn-play completed">
              <span className="text">학습완료</span>
              <i className="icon play-completed24" />
            </a>
          );
        default:
          return (
            <a href="#" className="btn-play black" onClick={e => {this.getMainActionForVideo(); e.preventDefault();}}>
              <span className="text">학습하기</span>
              <i className="icon play-black24" />
            </a>
          );

      }
    } else {
      switch (this.state.inProgress) {
        case SubState.InProgress:
          return (
            <a href="#" className="btn-play orange" onClick={e => {this.checkPreCourseOnViewDetail(lectureView);}}>
              <span className="text">학습중{/*({lectureView.sumViewSeconds}%)*/}</span>
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
            <a href="#" className="btn-play completed">
              <span className="text">학습완료</span>
              <i className="icon play-completed24" />
            </a>
          );
        default:
          return (
            <a href="#" className="btn-play black" onClick={e => {this.checkPreCourseOnViewDetail(lectureView);}}>
              <span className="text">학습하기</span>
              <i className="icon play-black24" />
            </a>
          );

      }
    }
  }

  render() {
    //
    const { classNameForLearningState } = this.state;
    const {
      className, lectureView, thumbnailImage, toggle,
      onViewDetail, lectureViewSize, lectureViewName, learningState
    } = this.props;

    const { open } = this.context;

    const hourMinuteFormat = dateTimeHelper.timeToHourMinuteFormat(this.props.lectureView.learningTime);
    this.viewObject = this.getViewObject();

    return (
      <>

        {className === 'first' && (
          lectureView.cubeId && (
            <div className="cube-box">
              <div className="bar typeA">
                <div className="tit">
                  <span className="ellipsis" style={{cursor:'pointer'}} onClick={onViewDetail}>{lectureViewName}{/*{lectureView.name}*/}</span>
                </div>
                <div className="right">
                  <span>{lectureView.cubeTypeName}</span>
                  <span>{hourMinuteFormat}</span>
                  {this.setLearningStateForMedia()}
                </div>
              </div>
            </div>
          )
        )}

        {className === 'first' && (
          !lectureView.cubeId && (
            <div>
              <div className="bar">
                <div className="tit">
                  <span className="ellipsis" style={{cursor:'pointer'}} onClick={onViewDetail}>{lectureViewName}{/*{lectureView.name}*/}</span>
                </div>
                {
                  lectureViewSize && (
                    <div className="num">{lectureViewSize}개 강의 구성</div>
                  )
                }

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
                    <Icon className={classNames({ 'arrow-down': !open, 'arrow-up': open  })} />
                  </Button>
                </div>
              </div>
            </div>

          )
        )}

        {className !== 'first' && (
          <>
            <ul className="step1">
              { lectureView.cubeTypeName && (
                <li>
                  <div className="tit">
                    <span className="ellipsis">{lectureViewName}{/*{lectureView.name}*/}</span>
                  </div>
                  <div className="right">
                    <span>{lectureView.cubeTypeName}</span>
                    <span>{hourMinuteFormat}</span>
                    {this.setLearningStateForMedia()}
                    {/*TODO: 미디어 타입이 아닌 경우 학습상태*/}
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
  children: React.ReactNode,
}

const Field = ({ children }: FieldProps) => (
  <li>
    {children}
  </li>
);

export default CourseLectureContainer2;
