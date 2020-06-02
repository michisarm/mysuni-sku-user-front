import React, { Component } from 'react';
import { mobxHelper, reactAlert, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import depot from '@nara.drama/depot';
import { CubeType, LearningState, ProposalState } from 'shared/model';
import { MediaType } from 'personalcube/media/model';
import { ClassroomModel } from 'personalcube/classroom/model';
import { LectureServiceType, StudentCdoModel, StudentJoinRdoModel } from 'lecture/model';
import { RollBookService, StudentService, LectureService } from 'lecture/stores';
import { InMyLectureCdoModel } from 'myTraining/model';
import { InMyLectureService } from 'myTraining/stores';
import { AnswerSheetModal, CubeReportModal } from 'assistant';
import { AnswerSheetModal as SurveyAnswerSheetModal } from 'survey';
import { getYearMonthDateHourMinuteSecond } from 'shared/helper/dateTimeHelper';
import LectureSubInfo, {State as SubState} from '../../../shared/LectureSubInfo';
import LectureExam from '../../../shared/LectureExam';
import LectureCardContentWrapperView from '../view/LectureCardContentWrapperView';
import ClassroomModalView from '../view/ClassroomModalView';
import StudentModel from '../../../model/StudentModel';
import RollBookModel from '../../../model/RollBookModel';
import ApplyReferenceModal from '../../../../approval/member/ui/logic/ApplyReferenceModal';
import { ApprovalMemberModel } from '../../../../approval/member/model/ApprovalMemberModel';
import { State as EnumState } from '../../../shared/LectureSubInfo/model';
import LectureLearningModalView from '../view/LectureLearningModalView';
import { ClassroomService } from '../../../../personalcube/classroom/stores';

interface Props {
  studentService?: StudentService
  lectureService?: LectureService
  rollBookService?: RollBookService
  inMyLectureService?: InMyLectureService
  lectureServiceId: string
  lectureCardId: string
  lectureServiceType: LectureServiceType
  inMyLectureCdo: InMyLectureCdoModel
  studentCdo: StudentCdoModel
  studentJoins?: StudentJoinRdoModel[]
  student?: StudentModel
  classroomService?: ClassroomService

  cubeType: CubeType
  viewObject: any
  typeViewObject: any
  children: React.ReactNode
  init?:() => void
  loaded: boolean
  onPageRefresh?:() => void
}

interface State {
  rollBook: RollBookModel
  openLearningModal: boolean
}

@inject(mobxHelper.injectFrom(
  'lecture.rollBookService',
  'lecture.studentService',
  'lecture.lectureService',
  'myTraining.inMyLectureService',
  'personalCube.classroomService',
))

@reactAutobind
@observer
class LectureCardContainer extends Component<Props, State> {
  //
  classroomModal: any = null;
  examModal: any = null;
  surveyModal: any = null;
  reportModal: any = null;
  applyReferenceModel: any = null;
  lectureLearningModal: any = null;
  prevViewObjectState: string = '';

  state = {
    rollBook: new RollBookModel(),
    subTest: String,
    type: '',
    name: '',
    openLearningModal: false,
    classroomId: '',
    approvalProcess: false,
  };


  componentDidMount(): void {
    //
    this.findInMyLecture();
  }

  componentDidUpdate(prevProps: any, prevState: any) {

    if (!prevProps.loaded && !this.props.loaded
      && prevProps.viewObject?.state !== this.props.viewObject?.state
      && prevProps.student?.id === this.props.student?.id) {
      this.prevViewObjectState = prevProps.viewObject.state;
    } else if (!prevProps.loaded && this.props.loaded) {
      if (this.props.viewObject.state === 'Waiting' && this.props.student?.learningState === 'TestWaiting') {
        reactAlert({ title: '알림', message: '관리자가 채점중에 있습니다. 채점이 완료되면 메일로 결과를 확인하실 수 있습니다.' });
      } else if (this.props.viewObject.state === EnumState.Waiting && this.props.student?.learningState === 'Failed') {
        reactAlert({ title: '알림', message: '합격기준에 미달하였습니다. 재응시해주시기 바랍니다.' });
      } else if (this.props.viewObject.state === EnumState.Missed) {
        reactAlert({ title: '알림', message: '합격기준에 미달하였습니다. 재응시해주시기 바랍니다.' });
      } else if (this.prevViewObjectState === EnumState.InProgress && this.props.viewObject.state === EnumState.Completed) {
        reactAlert({ title: '알림', message: '과정이 이수완료되었습니다. 이수내역은 마이페이지 > 학습완료 메뉴에서 확인 가능합니다.' });
      } else if (this.prevViewObjectState === EnumState.Waiting && this.props.viewObject.state === EnumState.Completed) {
        reactAlert({ title: '알림', message: '과정이 이수완료되었습니다. 이수내역은 마이페이지 > 학습완료 메뉴에서 확인 가능합니다.' });
      }

      this.state.subTest = this.props.viewObject.state;
    }
  }

  componentWillUnmount(): void {
    this.setState({ rollBook: new RollBookModel() });
  }

  findInMyLecture() {
    //
    const { inMyLectureService, lectureServiceId, lectureServiceType } = this.props;

    inMyLectureService!.findInMyLecture(lectureServiceId, lectureServiceType);
  }

  async onSelectClassroom(classroom: ClassroomModel) {

    const { viewObject } = this.props;

    // 차수 선택시 id 값
    this.state.classroomId = classroom.id;
    // 차수 선택시 무료(true) 유료(false) 여부
    this.state.approvalProcess = classroom.freeOfCharge.approvalProcess;

    const operatorName = viewObject.operatorName;
    const operatorEmail = viewObject.operatorEmail;

    // 알림 메시지
    const messageStr = '선택하신 강좌로 수강신청이 완료 되었습니다. <br> 관련 문의는 ' + operatorName +
      ' 담당자에게 연락 부탁 드립니다.' +
      '<br> - 담당자 성명 : ' + operatorName +
      '<br> - 담당자 이메일 : ' + operatorEmail;

    const { rollBookService, lectureCardId, student, studentService, typeViewObject } = this.props;
    const rollBook = await rollBookService!.findRollBookByLectureCardIdAndRound(lectureCardId, classroom.round);

    if (student && student.id) {

      // 수강신청(true), 유료여부(false), 승인 체크(true)
      if(classroom.enrolling.enrollingAvailable && (classroom.freeOfCharge.freeOfCharge === false) && (classroom.freeOfCharge.approvalProcess === true)) {
        studentService!.removeStudent(student.rollBookId)
          .then(() => this.setState({ rollBook }, this.onApplyReference ));
      } else {
        // 과정 등록
        this.getFreeOfChargeOk();

        studentService!.removeStudent(student.rollBookId)
          .then(() => this.setState({ rollBook }, this.onApplyReferenceEmpty ));

        reactAlert({ title: '알림', message: messageStr });

      }
    } else if ((!student || !student.id) && (classroom.enrolling.enrollingAvailable === true) && (classroom.freeOfCharge.freeOfCharge === false) && (classroom.freeOfCharge.approvalProcess === true) ) {
      // 수강신청(true), 유료여부(false), 승인 체크(true)
      this.setState({ rollBook }, this.onApplyReference );

    } else {
      // 과정 등록
      this.getFreeOfChargeOk();

      // 수강신청(false), 무료여부(true), 승인 체크(false)
      this.setState({ rollBook }, this.onApplyReferenceEmpty );

      reactAlert({ title: '알림', message: messageStr });
    }

    // if (!classroom.enrolling.enrollingAvailable) {
    //
    //   console.log('onSelectClassroom if classroom.enrolling.enrollingAvailable :: ' + classroom.enrolling.enrollingAvailable);
    //
    //   if (typeViewObject.siteUrl && typeViewObject.siteUrl.startsWith('http')) {
    //     window.open(typeViewObject.siteUrl, '_blank');
    //   }
    //   else reactAlert({ title: '알림', message: '잘못 된 URL 정보입니다.' });
    // }
  }

  registerStudentApprove(studentCdo: StudentCdoModel) {
    // 차수선택 시 id, freeOfCharge 값 전달

    // 차수 선택 시 ID 값
    studentCdo.classroomId = this.state.classroomId;
    // 차수 선택시 무료(true) 유료(false) 여부
    studentCdo.approvalProcess = this.state.approvalProcess;

    const { studentService, lectureCardId, init } = this.props;

    return studentService!.registerStudent(studentCdo)
      .then(() => {
        studentService!.findStudentByRollBookId(studentCdo.rollBookId);
        studentService!.findIsJsonStudentByCube(lectureCardId);
        studentService!.findStudentCount(studentCdo.rollBookId);
        if (init) init();
      });
  }

  onRegisterStudent(proposalState?: ProposalState) {

    const { studentCdo, student } = this.props;

    if ((!student || !student.id) || (student.proposalState !== ProposalState.Canceled && student.proposalState !== ProposalState.Rejected)) {
      this.registerStudent({ ...studentCdo, proposalState: proposalState || studentCdo.proposalState });
    }
    else if (student.proposalState === ProposalState.Canceled || student.proposalState === ProposalState.Rejected) {
      this.registerStudent({ ...studentCdo, proposalState: student.proposalState });
    }
  }

  registerStudent(studentCdo: StudentCdoModel) {
    // 차수 선택시 무료(true) 유료(false) 여부
    studentCdo.approvalProcess = false;

    const { studentService, lectureCardId, init } = this.props;
    return studentService!.registerStudent(studentCdo)
      .then(() => {
        studentService!.findStudentByRollBookId(studentCdo.rollBookId);
        studentService!.findIsJsonStudentByCube(lectureCardId);
        studentService!.findStudentCount(studentCdo.rollBookId);
        if (init) init();
      });
  }

  testCallback() {
    const { studentService, student, init, viewObject } = this.props;
    const { id: studentId } = student!;

    if (studentId) {
      studentService!.modifyStudentForExam(studentId, viewObject.examId)
        .then(() => {
          if (init) init();
        });
    }
  }

  //
  onClickEnrollment() {
    //
    this.onApplyReference();
  }

  onClickChangeSeries() {
    this.classroomModal.show();
  }

  onClickPlay() {
    const { typeViewObject } = this.props;

    if (typeViewObject.url && typeViewObject.url.startsWith('http')) {
      this.onRegisterStudent(ProposalState.Approved);

      //0413 window.open -> modal로 변경
      //window.open(typeViewObject.url, '_blank');
      this.setState( { openLearningModal: true });
    }
    else {
      reactAlert({ title: '알림', message: '잘못 된 URL 정보입니다.' });
      console.warn('[UserFront] Url is empty.');
    }
  }

  onLearningStart() {
    const { typeViewObject } = this.props;

    if (typeViewObject.url && typeViewObject.url.startsWith('http')) {
      this.onRegisterStudent(ProposalState.Approved);

      //0413 window.open -> modal로 변경
      //window.open(typeViewObject.url, '_blank');
      this.setState( { openLearningModal: true });
    }
    else {
      reactAlert({ title: '알림', message: '잘못 된 URL 정보입니다.' });
      console.warn('[UserFront] Url is empty.');
    }
  }

  onOpenStart() {
    const { typeViewObject } = this.props;

    if (typeViewObject.url && typeViewObject.url.startsWith('http')) {
      this.onRegisterStudent(ProposalState.Approved);
      // // 200508 avedpark 동영상링크 학습하기 -> 학습완료
      // if (typeViewObject.mediaType === MediaType.LinkMedia) {
      //   this.onMarkComplete();
      // }
      //0416
      window.open(typeViewObject.url, '_blank');
      //this.setState( {openLearningModal: true});
    }
    else {
      reactAlert({ title: '알림', message: '잘못 된 URL 정보입니다.' });
      console.warn('[UserFront] Url is empty.');
    }
  }

  onDownload() {
    const { typeViewObject } = this.props;
    this.onRegisterStudent(ProposalState.Approved);
    depot.downloadDepot(typeViewObject.fileBoxId);
  }

  onClickBookmark() {
    //
    const inMyLectureService = this.props.inMyLectureService!;
    const { inMyLectureCdo } = this.props;
    const { inMyLecture } = inMyLectureService;

    if (!inMyLecture || !inMyLecture.id) {
      reactAlert({ title: '알림', message: '본 과정이 관심목록에 추가되었습니다.' });
      inMyLectureService!.addInMyLecture(inMyLectureCdo)
        .then(() => inMyLectureService!.findInMyLecture(inMyLectureCdo.serviceId, inMyLectureCdo.serviceType));
    }
  }

  onRemove() {
    //
    const inMyLectureService = this.props.inMyLectureService!;
    const { inMyLectureCdo } = this.props;
    const { inMyLecture } = inMyLectureService;

    if (inMyLecture && inMyLecture.id) {
      reactAlert({ title: '알림', message: '본 과정이 관심목록에서 제외되었습니다.' });
      inMyLectureService!.removeInMyLecture(inMyLecture.id)
        .then(() => inMyLectureService!.findInMyLecture(inMyLectureCdo.serviceId, inMyLectureCdo.serviceType));
    }
  }

  onClickSurvey() {
    this.surveyModal.onOpenModal();
  }

  onJoin() {
    const { studentCdo, studentService, lectureCardId } = this.props;
    studentService!.joinCommunity({ ...studentCdo })
      .then(() => {
        studentService!.findStudentByRollBookId(studentCdo.rollBookId);
        studentService!.findIsJsonStudentByCube(lectureCardId);
        studentService!.findStudentCount(studentCdo.rollBookId);
      });
  }

  onClickDownloadReport(fileBoxId: string) {
    //
    depot.downloadDepot(fileBoxId);
  }

  onMarkComplete() {
    const { student, studentService, lectureCardId } = this.props;
    if (student && student.id) {
      studentService!.studentMarkComplete(student.rollBookId)
        .then(() => {
          studentService!.findIsJsonStudentByCube(lectureCardId);
          studentService!.findStudent(student.id);
        });
    }
  }

  onApplyReference() {
    this.applyReferenceModel.onOpenModal();
  }

  onApplyReferenceEmpty() {
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
    const { viewObject } = this.props;

    if (viewObject.cubeType === 'Course' || viewObject.cubeType === 'Program') {
      reactAlert({ title: 'Report 안내', message: '과정 이수 완료 후 Report 가능합니다.' });
    } else {
      reactAlert({ title: 'Report 안내', message: '학습 시작 후 Report 참여 가능합니다.' });
    }
  }

  onTestNotReady() {
    const { viewObject } = this.props;

    if (viewObject.cubeType === 'Course' || viewObject.cubeType === 'Program') {
      reactAlert({ title: 'Test 안내', message: '과정 이수 완료 후 Test 응시 가능합니다.' });
    } else {
      reactAlert({ title: 'Test 안내', message: '학습 시작 후 Test 참여 가능합니다.' });
    }
  }

  OnSurveyNotReady() {
    const { viewObject } = this.props;

    if (viewObject.cubeType === 'Course' || viewObject.cubeType === 'Program') {
      reactAlert({ title: 'Survey 안내', message: '과정 이수 완료 후 Survey 응시 가능합니다.' });
    } else {
      reactAlert({ title: 'Survey 안내', message: '학습 시작 후 Survey 참여 가능합니다.' });
    }
  }

  onSurvey() {
    this.surveyModal.onOpenModal();
  }

  onClickApplyReferentOk(member: ApprovalMemberModel) {
    //
    const { studentCdo, student } = this.props;
    const { rollBook } = this.state;
    let proposalState = studentCdo.proposalState;
    if (student && (student.proposalState === ProposalState.Canceled || student.proposalState === ProposalState.Rejected)) {
      proposalState = student.proposalState;
    }
    let rollBookId = studentCdo.rollBookId;
    if (rollBook && rollBook.id) rollBookId = rollBook.id;

    studentCdo.leaderEmails = [member.email];
    studentCdo.url = 'https://int.mysuni.sk.com/login?contentUrl=' + window.location.pathname;

    // this.registerStudent({ ...studentCdo, rollBookId, proposalState });
    this.registerStudentApprove({ ...studentCdo, rollBookId, proposalState });
  }

  // 무료과정 등록
  getFreeOfChargeOk() {
    //
    const { studentCdo, student } = this.props;
    const { rollBook } = this.state;
    let proposalState = studentCdo.proposalState;

    if (student && (student.proposalState === ProposalState.Canceled || student.proposalState === ProposalState.Rejected)) {
      proposalState = student.proposalState;
    }
    let rollBookId = studentCdo.rollBookId;
    if (rollBook && rollBook.id) rollBookId = rollBook.id;

    studentCdo.url = 'https://int.mysuni.sk.com/login?contentUrl=' + window.location.pathname;

    // Submitted으로 디폴트 입력 한다.
    proposalState = studentCdo.proposalState;

    const { viewObject } = this.props;
    // 이메일 담당자
    studentCdo.leaderEmails = [viewObject.operatorEmail];

    this.registerStudent({ ...studentCdo, rollBookId, proposalState });
  }

  onLearningModalClose() {
    const { studentCdo, lectureService, onPageRefresh } = this.props;
    this.setState({ openLearningModal: false });
    const lectureStudentCdo = {
      ...studentCdo,
      proposalState: ProposalState.Approved,
    };

    lectureService?.confirmUsageStatisticsByCardId(lectureStudentCdo)
      .then((confirmed) => {
        if (onPageRefresh) {
          onPageRefresh();
        }
      });
  }

  getMainAction() {
    const { cubeType, typeViewObject, studentJoins, viewObject } = this.props;
    const applyingPeriod = typeViewObject!.applyingPeriod;
    const today = new Date();

    switch (cubeType) {
      case CubeType.ClassRoomLecture:
      case CubeType.ELearning:
        if (typeViewObject.siteUrl) {
          return {
            type: LectureSubInfo.ActionType.LearningStart,
            onAction: () => {
              if ((!studentJoins || !studentJoins.length || !studentJoins.filter(join =>
                (join.proposalState !== ProposalState.Canceled && join.proposalState !== ProposalState.Rejected)).length)) {
                this.onRegisterStudent(ProposalState.Approved);
              }
              if (typeViewObject.siteUrl.startsWith('http')) window.open(typeViewObject.siteUrl, '_blank');
              else reactAlert({ title: '알림', message: '잘못 된 URL 정보입니다.' });
            },
          };
        }

        // console.log('getMainAction studentJoins : ', studentJoins);


        if (typeViewObject.classrooms && typeViewObject.classrooms.length && typeViewObject.classrooms.length > 1
          && (!studentJoins || !studentJoins.length || !studentJoins.filter(join =>
            (join.proposalState !== ProposalState.Canceled && join.proposalState !== ProposalState.Rejected)).length)) {
        // if (typeViewObject.classrooms && typeViewObject.classrooms.length && typeViewObject.classrooms.length > 1
        //   && (!studentJoins || !studentJoins.length || studentJoins?.filter(join => (join.proposalState === ProposalState.Submitted)).length === 0)) {

          return { type: LectureSubInfo.ActionType.Enrollment, onAction: this.onClickChangeSeries };
        }
        else {
          if (studentJoins && studentJoins.length
            && studentJoins.filter(join => (join.proposalState !== ProposalState.Canceled && join.proposalState !== ProposalState.Rejected)).length) {
          // if (studentJoins && studentJoins.length && studentJoins?.filter(join => (join.proposalState === ProposalState.Canceled)).length === 0) {
            return undefined;
          }
          if (!applyingPeriod) return { type: LectureSubInfo.ActionType.Enrollment, onAction: () => reactAlert({ title: '수강신청 기간 안내', message: '수강신청 기간이 아닙니다.' }) };
          const { year: startYear, month: startMonth, date: startDate } = getYearMonthDateHourMinuteSecond(applyingPeriod!.startDateSub)!;
          const { year: endYear, month: endMonth, date: endDate } = getYearMonthDateHourMinuteSecond(applyingPeriod!.endDateSub)!;
          if (new Date(startYear, startMonth, startDate, 0, 0, 0).getTime() > today.getTime()
            || new Date(endYear, endMonth, endDate, 23, 59, 59).getTime() < today.getTime()) {
            return { type: LectureSubInfo.ActionType.Enrollment, onAction: () => reactAlert({ title: '수강신청 기간 안내', message: '수강신청 기간이 아닙니다.' }) };
          }
          return { type: LectureSubInfo.ActionType.Enrollment, onAction: this.onClickEnrollment };
        }

      case CubeType.Audio:
      case CubeType.Video:
        if (typeViewObject.mediaType === MediaType.LinkMedia || typeViewObject.mediaType === MediaType.ContentsProviderMedia) {
          return { type: LectureSubInfo.ActionType.LearningStart, onAction: this.onOpenStart };
        }
        else {
          return { type: LectureSubInfo.ActionType.Play, onAction: this.onClickPlay };
        }
      case CubeType.WebPage:
      case CubeType.Experiential:
        return { type: LectureSubInfo.ActionType.LearningStart, onAction: this.onOpenStart };
      case CubeType.Documents:
        return { type: LectureSubInfo.ActionType.Download, onAction: this.onDownload };
      case CubeType.Community:
        if (studentJoins && studentJoins.length
          && studentJoins.filter(join => (join.proposalState !== ProposalState.Canceled && join.proposalState !== ProposalState.Rejected)).length) {
          return undefined;
        }
        return { type: LectureSubInfo.ActionType.Join, onAction: this.onJoin };
      default:
        return undefined;
    }
  }

  getSubActions() {
    const { cubeType, typeViewObject, viewObject, student } = this.props;
    const subActions = [];

    switch (cubeType) {
      case CubeType.ClassRoomLecture:
      case CubeType.ELearning:
        if (student && student.id && student.proposalState === ProposalState.Submitted
          && typeViewObject.classrooms && typeViewObject.classrooms.length) {
          subActions.push({ type: LectureSubInfo.ActionType.ChangeSeries, onAction: this.onClickChangeSeries });
        }
        break;
      case CubeType.Audio:
      case CubeType.Video:
        if (student && student.id && typeViewObject.mediaType === MediaType.LinkMedia
          && student.learningState === LearningState.Progress && !viewObject.examId) {
          subActions.push({ type: LectureSubInfo.ActionType.MarkComplete, onAction: this.onMarkComplete, subType: cubeType });
        }
        break;
      case CubeType.WebPage:
      case CubeType.Experiential:
      case CubeType.Documents:
        if (student && student.id && student.learningState === LearningState.Progress && !viewObject.examId) {
          subActions.push({ type: LectureSubInfo.ActionType.MarkComplete, onAction: this.onMarkComplete, subType: cubeType });
        }
        break;
      case CubeType.Community:
        break;
    }

    if (viewObject && viewObject.reportFileBoxId && student && student.proposalState === ProposalState.Approved && student.learningState) {
      if (student.serviceType === 'Lecture') {
        if (student.studentScore.homeworkScore) {
          subActions.push({
            type: LectureSubInfo.ActionType.Report,
            onAction: () => reactAlert({ title: '알림', message: '이미 채점이 되었습니다.' }),
          });
        } else subActions.push({ type: LectureSubInfo.ActionType.Report, onAction: this.onReport });
      }
    }

    this.setStateName('1', 'Test');

    if (viewObject.examId && student) {
      if (student.serviceType && student.serviceType === 'Lecture') {
        if (student.learningState === LearningState.Progress || student.learningState === LearningState.HomeworkWaiting) {
          this.setStateName('0', 'Test');
          subActions.push({ type: 'Test', onAction: this.onTest });
        } else if (student.learningState === LearningState.Failed && student.numberOfTrials < 3) {
          // this.setStateName('2', `재응시(${student.numberOfTrials}/3)`);
          subActions.push({ type: `재응시 (${student.numberOfTrials})`, onAction: this.onTest });
          this.setStateName('0', `재응시 (${student.numberOfTrials})`);
          // subActions.push({ type: LectureSubInfo.ActionType.Test, onAction: this.onTest });
        } else if (student.learningState === LearningState.Failed && student.numberOfTrials > 2) {
          // this.setStateName('3', `재응시(${student.numberOfTrials}/3)`);
          subActions.push({ type: `재응시 (${student.numberOfTrials})`, onAction: this.onTest });
          this.setStateName('0', `재응시 (${student.numberOfTrials})`);
        } else if (student.learningState === LearningState.Waiting) {
          subActions.push({ type: `재응시 (${student.numberOfTrials})`, onAction: this.onTest });
          this.setStateName('0', `재응시 (${student.numberOfTrials})`);
        } else if (student.learningState === LearningState.Missed) {
          // this.setStateName('4', '미이수');
          subActions.push({ type: `재응시 (${student.numberOfTrials})`, onAction: this.onTest });
          this.setStateName('0', `재응시 (${student.numberOfTrials})`);
          // subActions.push({ type: LectureSubInfo.ActionType.Test, onAction: this.onTest });
        } else if (student.learningState === LearningState.Passed) {
          this.setStateName('5', '이수');
        } else if (student.learningState === LearningState.TestPassed) {
          this.setStateName('5', '결과대기');
        } else {
          subActions.push({ type: 'Test', onAction: this.onTestNotReady });
          this.setStateName('1', 'Test');
        }
      } else if (student.serviceType === 'Course' || student.serviceType === 'Program') {
        if (student.learningState === LearningState.Progress || student.learningState === LearningState.HomeworkWaiting) {
          if (student.phaseCount === student.completePhaseCount) {
            this.setStateName('0', 'Test');
          } else {
            this.setStateName('1', 'Test');
          }
        } else if (student.learningState === LearningState.Failed && student.numberOfTrials < 3) {
          // this.setStateName('2', `재응시(${student.numberOfTrials}/3)`);
          // subActions.push({ type: `재응시( ${student.numberOfTrials} )`, onAction: this.onTest });
          this.setStateName('0', `재응시 (${student.numberOfTrials})`);
        } else if (student.learningState === LearningState.Failed && student.numberOfTrials > 2) {
          // this.setStateName('3', `재응시(${student.numberOfTrials}/3)`);
          // subActions.push({ type: `재응시( ${student.numberOfTrials} )`, onAction: this.onTest });
          this.setStateName('0', `재응시 (${student.numberOfTrials})`);
        } else if (student.learningState === LearningState.Waiting) {
          // this.setStateName('3', `재응시(${student.numberOfTrials}/3)`);
          // subActions.push({ type: `재응시( ${student.numberOfTrials} )`, onAction: this.onTest });
          this.setStateName('0', `재응시 (${student.numberOfTrials})`);
        } else if (student.learningState === LearningState.Missed) {
          // this.setStateName('4', '미이수');
          // subActions.push({ type: `재응시( ${student.numberOfTrials} )`, onAction: this.onTest });
          this.setStateName('0', `재응시 (${student.numberOfTrials})`);
        } else if (student.learningState === LearningState.Passed) {
          this.setStateName('5', '이수');
        } else if (student.learningState === LearningState.TestPassed) {
          this.setStateName('5', '결과대기');
        } else {
          this.setStateName('1', 'Test');
        }
      }
      const studentNumberOfTrials = student.numberOfTrials;
      //console.log('student numberOfTrials ::' + studentNumberOfTrials);
      // setter
      localStorage.setItem('numberOfTrials', studentNumberOfTrials.toString());
    }

    if (viewObject && viewObject.surveyId && student) {
      if (student.serviceType === 'Lecture') {
        if (viewObject && viewObject.surveyState) {
          subActions.push({ type: LectureSubInfo.ActionType.ParticipationCompleted,
            onAction: () => reactAlert({ title: '알림', message: 'Survey 설문 참여가 완료 되었습니다.' }),
          });
        } else {
          subActions.push({ type: LectureSubInfo.ActionType.SurveyParticipation, onAction: this.onSurvey });
        }
      }
    }

    return subActions.length ? subActions : undefined;
  }

  setStateName(type: string, name: string) {
    this.state.type = type;
    this.state.name = name;
  }

  getOnCancel() {
    const { cubeType, student, studentService, lectureCardId, typeViewObject } = this.props;

    switch (cubeType) {
      case CubeType.ClassRoomLecture:
      case CubeType.ELearning: {
        const today = new Date();
        const cancellablePeriod = typeViewObject.cancellablePeriod;

        if (student && student.id) {
          if (!cancellablePeriod && (!student.learningState && student.proposalState !== ProposalState.Canceled
            && student.proposalState !== ProposalState.Approved)) {
            return () => {
              studentService!.removeStudent(student!.rollBookId)
                .then(() => {
                  studentService!.findStudent(student!.id);
                  studentService!.findIsJsonStudentByCube(lectureCardId);
                  studentService!.findStudentCount(student!.rollBookId);
                });
            };
          }
          else if (!student.learningState && student.proposalState !== ProposalState.Canceled
            && student.proposalState !== ProposalState.Approved) {
            const { year: startYear, month: startMonth, date: startDate } = getYearMonthDateHourMinuteSecond(cancellablePeriod!.startDateSub)!;
            const { year: endYear, month: endMonth, date: endDate } = getYearMonthDateHourMinuteSecond(cancellablePeriod!.endDateSub)!;
            if (new Date(startYear, startMonth, startDate, 0, 0, 0).getTime() <= today.getTime()
              && new Date(endYear, endMonth, endDate, 23, 59, 59).getTime() >= today.getTime()) {
              return () => {
                studentService!.removeStudent(student!.rollBookId)
                  .then(() => {
                    studentService!.findStudent(student!.id);
                    studentService!.findIsJsonStudentByCube(lectureCardId);
                    studentService!.findStudentCount(student!.rollBookId);
                  });
              };
            }
          }
        }
        return undefined;
      }
      case CubeType.Audio:
      case CubeType.Video:
      case CubeType.WebPage:
      case CubeType.Experiential:
      case CubeType.Documents:
      case CubeType.Community:
      default:
        return undefined;
    }
  }

  render() {
    //
    const { inMyLectureService, viewObject, cubeType, typeViewObject, studentCdo, children } = this.props;
    const { inMyLecture } = inMyLectureService!;
    const { openLearningModal } = this.state;
    const { classrooms } = this.props.classroomService!;

    let state: SubState | undefined;
    let enrollingAvailable: boolean = false;
    let freeOfCharge: boolean = false;
    let approvalProcess: boolean = false;

    const index = classrooms.map(classrooma => classrooma.round).findIndex(round => round);
    if (index >= 0 && classrooms) {
      enrollingAvailable = classrooms[index].enrolling.enrollingAvailable;
      freeOfCharge = classrooms[index].freeOfCharge.freeOfCharge;
      approvalProcess = classrooms[index].freeOfCharge.approvalProcess;
    }

    const enrollingAvailableChk = enrollingAvailable;
    const freeOfChargeChk = freeOfCharge;
    const approvalProcessChk = approvalProcess;

    let approvalChk = 'N';
    if(enrollingAvailableChk === true && (freeOfChargeChk === false) && (approvalProcessChk === true) ) {
      approvalChk = 'Y';
    }

    const approvalClassChk = approvalChk;

    return (
      <LectureCardContentWrapperView>
        <LectureSubInfo
          required={viewObject.required}
          level={viewObject.difficultyLevel}
          clazz={{
            learningTime: viewObject.learningTime,
            capacity: typeViewObject ? typeViewObject.capacity : 0,
            cubeType,
            passedStudentCount: viewObject.rollBooksPassedStudentCount,
            studentCount: viewObject.rollBooksStudentCount,
          }}
          operator={{
            instructor: viewObject.instructorName,
            name: viewObject.operatorName,
            company: viewObject.operatorCompany,
            email: viewObject.operatorEmail,
          }}
          state={viewObject.state}
          mainAction={this.getMainAction()}
          subActions={this.getSubActions()}
          onCancel={this.getOnCancel()}
          onBookmark={inMyLecture && inMyLecture.id ? undefined : this.onClickBookmark}
          onRemove={inMyLecture && inMyLecture.id ? this.onRemove : undefined}
          // onSurvey={viewObject.surveyId ? this.onSurvey : undefined}
          /* onDownloadReport={
             ((viewObject && viewObject.reportFileBoxId) || (typeViewObject && typeViewObject.reportFileBoxId)) ?
               () => this.onClickDownloadReport(viewObject.reportFileBoxId || typeViewObject.reportFileBoxId) : undefined
           }*/
        />

        <ClassroomModalView
          ref={classroomModal => this.classroomModal = classroomModal}
          classrooms={typeViewObject.classrooms}
          onOk={this.onSelectClassroom}
        />

        {
          (cubeType === CubeType.ClassRoomLecture || cubeType === CubeType.ELearning) && (
            <ApplyReferenceModal
              ref={applyReferenceModel => this.applyReferenceModel = applyReferenceModel}
              classrooms={typeViewObject.classrooms}
              approvalClassChk={approvalClassChk}
              handleOk={this.onClickApplyReferentOk}
            />
          )
        }

        {
          viewObject && viewObject.examId && (
            <AnswerSheetModal
              examId={viewObject.examId}
              ref={examModal => this.examModal = examModal}
              onSaveCallback={this.testCallback}
            />
          )
        }

        {
          viewObject && viewObject.surveyId && (
            <SurveyAnswerSheetModal
              surveyId={viewObject.surveyId}
              surveyCaseId={viewObject.surveyCaseId}
              ref={surveyModal => this.surveyModal = surveyModal}
              // onSaveCallback={this.testCallback}
            />
          )
        }

        <CubeReportModal
          downloadFileBoxId ={viewObject.reportFileBoxId || typeViewObject.reportFileBoxId}
          ref={reportModal => this.reportModal = reportModal}
          downloadReport = {this.onClickDownloadReport}
          rollBookId={studentCdo.rollBookId}
        />

        {
          // 0413 window.open => modal view로 변경
          openLearningModal && typeViewObject && typeViewObject.videoUrl && (
            <LectureLearningModalView
              ref={lectureLearningModal => this.lectureLearningModal = lectureLearningModal }
              videoUrl={typeViewObject.videoUrl}
              onClose={this.onLearningModalClose}
            />
          )
        }

        {children}

        {/*<OverviewField.FileDownload*/}
        {/*  fileBoxIds={[ viewObject.fileBoxId ]}*/}
        {/*/>*/}

        {
          viewObject && viewObject.tabState === 'list' && (
            <LectureExam
              onReport={viewObject.reportFileBoxId ? this.onReport : undefined}
              onReportNotReady={viewObject.reportFileBoxId ? this.onReportNotReady : undefined}
              onTest={viewObject.examId ? this.onTest : undefined}
              onTestNotReady={viewObject.examId ? this.onTestNotReady : undefined}
              onSurvey={viewObject.surveyId ? this.onSurvey : undefined}
              OnSurveyNotReady={viewObject.surveyId ? this.OnSurveyNotReady : undefined}
              viewObject={viewObject}
              type={this.state.type}
              name={this.state.name}
            />
          )
        }

      </LectureCardContentWrapperView>

    );
  }
}

export default LectureCardContainer;
