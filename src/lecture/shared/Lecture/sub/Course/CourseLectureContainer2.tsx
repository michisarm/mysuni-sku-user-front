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
  isPreCoursePassed?: boolean
}

interface State
{
  classNameForLearningState: string,
  inProgress: string,
  examTitle: string,
  surveyState: boolean,
  surveyTitle: string,
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
    this.init();
  }

  componentDidMount()
  {

    const { lectureView } = this.props;
    const { setOpen } = this.context;

    if (lectureView.learningState === 'Progress' && lectureView.cubeTypeName === 'Course') {
      setOpen(true);
    }

    // this.getStudentInfoView();
    setTimeout(() => {
      this.getStudentInfoView();
    },500);

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
  //     console.log('componentDidUpdate this.props : ', this.props);
  //     console.log('componentDidUpdate prevProps : ', prevProps);
  //     this.init();
  //   }
  // }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {


    // console.log('componentDidUpdate this.props : ', this.props);
    // console.log('componentDidUpdate prevProps : ', prevProps);
    // console.log('componentDidUpdate prevState : ', prevState);

    // if( this.props.learningState === 'InProgress' ) {
    //   this.state.openState = true;
    // }
    // console.log('this.context.open : ' + this.context.open + ', this.state.openState : ' + this.state.openState);
    //
    // if( this.context.open !== this.state.openState) {
    //   this.context.open = true;
    //   // this.onToggle();
    //   console.log('토글토글');
    // }
  }

  async init()
  {
    const { personalCubeService, rollBookService, studentService, lectureView, examinationService, examPaperService, surveyFormService } = this.props;
    const { getStudentForVideo, getStudentInfo } = studentService!;


    if (lectureView && lectureView.cubeId) {
      // this.personalCube = await personalCubeService!.findPersonalCube(lectureView.cubeId);
      // this.rollBooks = await rollBookService!.findAllLecturesByLectureCardId(lectureView.serviceId);

      this.personalCube = lectureView.personalCube;
      this.rollBooks = lectureView.rollBooks;

      // console.log('init lectureView : ', lectureView);
      // console.log('init personalCube : ', this.personalCube);
      // console.log('init rollBoo.ks : ', this.rollBooks[0]);

      if (this.rollBooks[0]) {
        // this.studentData = await StudentApi.instance.findStudentByRollBookId(this.rollBooks[0].id);

        if (this.personalCube?.contents.examId)
        {
          // const examination = await examinationService!.findExamination(this.personalCube?.contents.examId);
          // const examPaper = await examPaperService!.findExamPaper(examination.paperId);
          examinationService?.setExamination(lectureView.examination);
          const examPaper = examPaperService?.setExamPaper(lectureView.examPaper);
          if (examPaper) {
            this.state.examTitle = examPaper.title;
          }
        }

        if (this.personalCube?.contents.surveyCaseId) {
          // const answerSheetService =  await AnswerSheetApi.instance.findAnswerSheet(this.personalCube?.contents.surveyCaseId);
          // const surveyCase = await surveyFormService!.findSurveyForm(this.personalCube?.contents.surveyId);
          const answerSheetService =  lectureView.answerSheet === null ? new AnswerSheetModel() : lectureView.answerSheet;
          const surveyCase = lectureView.surveyForm  === null ? new SurveyFormModel() : lectureView.surveyForm;

          // console.log('surveyCase : ', surveyCase);

          const obj =  JSON.parse(JSON.stringify(surveyCase.titles));
          const title = JSON.parse(JSON.stringify(obj.langStringMap));

          const disabled = answerSheetService && answerSheetService.progress && answerSheetService.progress === AnswerProgress.Complete;
          this.state.surveyState = disabled;
          this.state.surveyTitle =  title.ko;
        }

        if (this.personalCube?.cubeIntro.id)
        {
          // const cubeIntro = await CubeIntroService.instance.findCubeIntro(this.personalCube?.cubeIntro.id);
          const cubeIntro = lectureView.cubeIntro;
          if (cubeIntro?.reportFileBox.fileBoxId) {
            this.state.reportFileId = cubeIntro?.reportFileBox.fileBoxId;
          }
        }

        this.viewObject = this.getViewObject();
        this.setExamState(this.studentData);
      }

      // const studentLecture: StudentModel = getStudentInfo(lectureView.serviceId);
      // if ( studentLecture ) {
      //   this.studentForVideoObj = studentLecture;
      //   const classNameForLearningStateTemp = this.setClassNameForLearningState(this.studentForVideoObj);
      //   this.setState({ classNameForLearningState: classNameForLearningStateTemp });
      // }

      // getStudentForVideo(lectureView.serviceId).then((studentForVideo) =>
      // {
      //   this.studentForVideoObj = studentForVideo;
      //   const classNameForLearningStateTemp = this.setClassNameForLearningState(this.studentForVideoObj);
      //   this.setState({ classNameForLearningState: classNameForLearningStateTemp });
      // });
    }

    // this.studentForVideoObj = await getStudentForVideo(lectureView.serviceId);
    // this.classNameForLearningState = this.setClassNameForLearningState(this.studentForVideoObj);
  }

  getStudentInfoView() {

    const { studentService, lectureView } = this.props;
    const { getStudentInfo } = studentService!;

    const studentLecture: StudentModel = getStudentInfo(lectureView.serviceId);
    if ( studentLecture ) {
      this.studentForVideoObj = studentLecture;
      const classNameForLearningStateTemp = this.setClassNameForLearningState(this.studentForVideoObj);
      this.setState({ classNameForLearningState: classNameForLearningStateTemp });
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
            studentForVideo.learningState === LearningState.Waiting || studentForVideo.learningState === LearningState.HomeworkWaiting
            || studentForVideo.learningState === LearningState.TestWaiting
            || studentForVideo.learningState === LearningState.TestPassed || studentForVideo.learningState === LearningState.Failed
          ) {
            state = SubState.Waiting;
          }
          if (studentForVideo.learningState === LearningState.Progress) state = SubState.InProgress;
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
    const { isPreCoursePassed } = this.props;

    console.log( 'isPreCoursePassed : ', isPreCoursePassed );

    if (isPreCoursePassed) {
      if (url && url.startsWith('http')) {
        this.onRegisterStudentForVideo(ProposalState.Approved);
        this.popupLearnModal(url);
        //window.open(url, '_blank');
      } else {
        reactAlert({title: '알림', message: '잘못 된 URL 정보입니다.'});
        console.warn('[UserFront] Url is empty.');
      }
    } else {
      reactAlert({ title: '선수과정안내', message: '본 과정은 선수 Course 과정을 이수하신 후에 학습이 가능합니다.' });
    }
  }

  onClickPlayForOpen(url : string)
  {
    const { isPreCoursePassed } = this.props;

    if (isPreCoursePassed) {
      if (url && url.startsWith('http'))
      {
        //this.onRegisterStudentForVideo(ProposalState.Approved);
        //this.popupLearnModal(url);
        const a = window.open('http://www.naver.com', '_blank');
      } else
      {
        reactAlert({ title: '알림', message: '잘못 된 URL 정보입니다.' });
        console.warn('[UserFront] Url is empty.');
      }
    } else {
      reactAlert({ title: '선수과정안내', message: '본 과정은 선수 Course 과정을 이수하신 후에 학습이 가능합니다.' });
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

  async getMainActionForVideo()
  {
    //collegeId
    const { mediaService } = this.props;
    // const { personalCube } = personalCubeService!;

    const { service, contents } = this.personalCube!.contents;

    //Video, Audio
    if (service.type  === ContentsServiceType.Media)
    {
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
      if (media.mediaType === MediaType.LinkMedia || media.mediaType === MediaType.ContentsProviderMedia)
      {
        return { type: LectureSubInfo.ActionType.LearningStart, onAction: this.onClickPlayForOpen(url) };
      } else {
        return { type: LectureSubInfo.ActionType.Play, onAction: this.onClickPlayForVideo(url) };
      }
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

    if (this.personalCube && this.studentData  && this.studentData.id) {
      if (this.studentData.proposalState === ProposalState.Approved) {
        if (
          this.studentData.learningState === LearningState.Waiting || this.studentData.learningState === LearningState.HomeworkWaiting
          || this.studentData.learningState === LearningState.TestWaiting
          || this.studentData.learningState === LearningState.TestPassed || this.studentData.learningState === LearningState.Failed
        ) {
          state = SubState.InProgress;
        }
        if (this.studentData.learningState === LearningState.Progress) state = SubState.InProgress;
        if (this.studentData.learningState === LearningState.Passed) state = SubState.InProgress;
        if (this.studentData.learningState === LearningState.Missed) state = SubState.InProgress;
        // if (this.studentData.learningState === LearningState.Passed) state = SubState.Completed;
        // if (this.studentData.learningState === LearningState.Missed) state = SubState.Missed;
      }

      if (!examId && this.studentData.phaseCount !== this.studentData.completePhaseCount &&
        this.studentData.learningState === LearningState.Progress) {
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
  // Test 응시 못하는 조건일 땐 Alert 띄워 달라길래....
  onReportNotReady() {
    reactAlert({ title: 'Report 안내', message: '학습 시작 후 Report 참여 가능합니다.' });
    // reactAlert({ title: 'Test&Report 안내', message: '과정 이수 완료 후 Test 응시(Report 제출) 가능합니다.' });
    // reactAlert({ title: 'Test&Report 안내', message: '모든 컨텐츠를 학습해야 Test응시(Report제출)가 가능합니다.' });
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

  testCallback() {
    if (this.studentData) {
      StudentApi.instance.modifyStudentForExam(this.studentData.id, this.personalCube!.contents.examId)
        .then(() => {
          if (this.init()) this.init();
        });
    }
  }

  setExamState(studentData: any) {

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
        } else if (studentData.learningState === LearningState.Passed) {
          this.setStateName('5', '이수');
        } else if (studentData.learningState === LearningState.TestPassed) {
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
          && (studentData.learningState === LearningState.Failed && studentData.studentScoLectureOverviewViewV2.re.numberOfTrials > 2)
        ) {
          // this.setStateName('3', `재응시(${studentData.studentScore.numberOfTrials}/3)`);
          // // subActions.push({ type: `재응시(${student.numberOfTrials}/3)`, onAction: this.onTest });
          this.setStateName('0', `재응시 (${studentData.studentScore.numberOfTrials})`);
        } else if (studentData.learningState === LearningState.Missed) {
          // this.setStateName('4', '미이수');
          this.setStateName('0', `재응시 (${studentData.studentScore.numberOfTrials})`);
        } else if (studentData.learningState === LearningState.Passed) {
          this.setStateName('5', '이수');
        } else if (studentData.learningState === LearningState.TestPassed) {
          this.setStateName('5', '결과대기');
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

  setLearningStateForMedia() {
    const { lectureView, onViewDetail } = this.props;

    if (lectureView.cubeType === CubeType.Video || lectureView.cubeType === CubeType.Audio ) {
      switch (this.state.inProgress) {
        case SubState.InProgress:
          return (
            <a href="#" className="btn-play orange" onClick={e => {this.getMainActionForVideo(); e.preventDefault();}}>
              <span className="text">학습중({lectureView.sumViewSeconds}%)</span>
              <span className={'pie-wrapper progress-' + lectureView.sumViewSeconds}>
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
            <a href="#" className="btn-play orange" onClick={onViewDetail}>
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
            <a href="#" className="btn-play black" onClick={onViewDetail}>
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

    // let openState = this.context.open;

    // if( learningState === SubState.InProgress ) {
    //   openState = true;
    //   setOpen(openState);
    // }

    const hourMinuteFormat = dateTimeHelper.timeToHourMinuteFormat(this.props.lectureView.learningTime);

    //Lecture Card가 Video인 경우만 학습하기 버튼이 보이고, 진행상태인 경우 버튼 css적용(fix bg)
    // const className1 = lectureView.cubeType === CubeType.Video ? classNameForLearningState : 'fix line';
    // const thumbnail = this.state.inProgress !== SubState.Completed ? thumbnailImage :
    //   `${process.env.PUBLIC_URL}/images/all/thumb-card-complete-60-px@2x.png`;

    // console.log('lecture container viewObject : ', this.viewObject);
    // console.log('lecture container personalCube : ', this.personalCube);


    const { _studentInfo } = this.props.studentService!;
    const studentInfo = _studentInfo ? _studentInfo : {} as StudentInfoModel;

    // console.log('studentInfo ----------------->', studentInfo);
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

              {
                this.viewObject && this.state.isContent && (
                  <LectureExam
                    onReport={this.viewObject.reportFileBoxId ? this.onReport : undefined}
                    onReportNotReady={this.personalCube?.contents.examId ? this.onReportNotReady : undefined}
                    onTest={this.personalCube?.contents.examId ? this.onTest : undefined}
                    onTestNotReady={this.personalCube?.contents.examId ? this.onTestNotReady : undefined}
                    onSurvey={this.personalCube?.contents.surveyId ? this.onSurvey : undefined}
                    OnSurveyNotReady={this.personalCube?.contents.surveyId ? this.OnSurveyNotReady : undefined}
                    viewObject={this.viewObject}
                    passedState={this.state.passedState}
                    type={this.state.type}
                    name={this.state.name}
                    sort="cube"
                  />
                )
              }
            </div>
          )
        )}


        {className === 'first' && (
          !lectureView.cubeId && (
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
          )
        )}

        {className !== 'first' && (
          <div className="detail">
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

              {
                this.viewObject && this.state.isContent && (
                  <LectureExam
                    onReport={this.viewObject.reportFileBoxId ? this.onReport : undefined}
                    onReportNotReady={this.personalCube?.contents.examId ? this.onReportNotReady : undefined}
                    onTest={this.personalCube?.contents.examId ? this.onTest : undefined}
                    onTestNotReady={this.personalCube?.contents.examId ? this.onTestNotReady : undefined}
                    onSurvey={this.personalCube?.contents.surveyId ? this.onSurvey : undefined}
                    OnSurveyNotReady={this.personalCube?.contents.surveyId ? this.OnSurveyNotReady : undefined}
                    viewObject={this.viewObject}
                    passedState={this.state.passedState}
                    type={this.state.type}
                    name={this.state.name}
                    sort="detail"
                  />
                )
              }
            </ul>
          </div>
        )}

        {
          this.viewObject && this.personalCube?.contents.examId && (
            <AnswerSheetModal
              examId={this.personalCube?.contents.examId}
              ref={examModal => this.examModal = examModal}
              onSaveCallback={this.testCallback}
            />
          )
        }
        {
          this.viewObject && this.personalCube?.contents.surveyId && (
            <SurveyAnswerSheetModal
              surveyId={this.personalCube?.contents.surveyId}
              surveyCaseId={this.personalCube?.contents.surveyCaseId}
              ref={surveyModal => this.surveyModal = surveyModal}
              // onSaveCallback={this.testCallback}
              serviceId={lectureView.serviceId}
              serviceType={lectureView.serviceType}
            />
          )
        }

        {
          this.viewObject && this.viewObject.reportFileBoxId && (
            <CubeReportModal
              downloadFileBoxId ={this.viewObject.reportFileBoxId}
              ref={reportModal => this.reportModal = reportModal}
              downloadReport = {this.onClickDownloadReport}
              rollBookId={this.rollBooks[0].id}
            />
          )
        }
        {/*<div><span>test</span><span>{studentInfo && studentInfo.student && studentInfo.student.company ||'' }</span></div>*/}
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
