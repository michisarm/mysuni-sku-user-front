// operator-linebreak warning 때문에 eslint 비활성화
/* eslint-disable */
import React, { Component } from 'react';
import { mobxHelper, reactAlert, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import depot from '@nara.drama/depot';
import { CubeType, ProposalState } from 'shared/model';
import { MediaType } from 'personalcube/media/model';
import { ClassroomModel } from 'personalcube/classroom/model';
import { OverviewField } from 'personalcube';
import { PersonalCubeService } from 'personalcube/personalcube/stores';
import {
  LectureServiceType,
  StudentCdoModel,
  StudentJoinRdoModel,
} from 'lecture/model';
import {
  LectureService,
  RollBookService,
  StudentService,
} from 'lecture/stores';
import { ActionEventService } from 'shared/stores';
import { InMyLectureCdoModel } from 'myTraining/model';
import { InMyLectureService } from 'myTraining/stores';
import { AnswerSheetModal, CubeReportModal } from 'assistant';
import { AnswerSheetModal as SurveyAnswerSheetModal } from 'survey';
import { getYearMonthDateHourMinuteSecond } from 'shared/helper/dateTimeHelper';
import StudyActionType from 'shared/model/StudyActionType';
import LectureSubInfo from '../../../shared/LectureSubInfo';
import LectureExam from '../../../shared/LectureExam';
import LectureCardContentWrapperView from '../view/LectureCardContentWrapperView';
import ClassroomModalView from '../view/ClassroomModalView';
import StudentModel from '../../../model/StudentModel';
import RollBookModel from '../../../model/RollBookModel';
import ApplyReferenceModal from '../../../../approval/member/ui/logic/ApplyReferenceModal';
import { ApprovalMemberModel } from '../../../../approval/member/model/ApprovalMemberModel';

import { State as EnumState } from '../../../shared/LectureSubInfo/model';
import LectureLearningModalView from '../view/LectureLearningModalView';
import LearningState from '../../../../shared/model/LearningState';
import { ClassroomService } from '../../../../personalcube/classroom/stores';

interface Props extends RouteComponentProps<RouteParams> {
  actionEventService?: ActionEventService;
  studentService?: StudentService;
  lectureService?: LectureService;
  rollBookService?: RollBookService;
  inMyLectureService?: InMyLectureService;
  lectureServiceId: string;
  lectureCardId: string;
  lectureServiceType: LectureServiceType;
  inMyLectureCdo: InMyLectureCdoModel;
  studentCdo: StudentCdoModel;
  studentJoins?: StudentJoinRdoModel[];
  student?: StudentModel;
  classroomService?: ClassroomService;
  personalCubeService?: PersonalCubeService;

  cubeType: CubeType;
  viewObject: any;
  typeViewObject: any;
  children: React.ReactNode;
  init?: () => void;
  loaded: boolean;
  onPageRefresh?: () => void;
}

interface State {
  rollBook: RollBookModel;
  openLearningModal: boolean;
  openDownloadModal: boolean; // 다운로드 시 팝업으로 확인가능하게 하고 수업시작 by gon
  selectedClassRoom: ClassroomModel;
}

interface RouteParams {
  collegeId: string;
  cubeId: string;
  lectureCardId: string;
}

@inject(
  mobxHelper.injectFrom(
    'shared.actionEventService',
    'lecture.rollBookService',
    'lecture.studentService',
    'lecture.lectureService',
    'myTraining.inMyLectureService',
    'personalCube.classroomService',
    'personalCube.personalCubeService'
  )
)
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
    passedState: false,
    type: '',
    name: '',
    openLearningModal: false,
    openDownloadModal: false, // 다운로드 시 팝업으로 확인가능하게 하고 수업시작 by gon
    selectedClassRoom: new ClassroomModel(),
  };

  componentDidMount(): void {
    //
    this.findInMyLecture();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      !prevProps.loaded &&
      !this.props.loaded &&
      prevProps.viewObject?.state !== this.props.viewObject?.state &&
      prevProps.student?.id === this.props.student?.id
    ) {
      this.prevViewObjectState = prevProps.viewObject.state;
    } else if (!prevProps.loaded && this.props.loaded) {
      if (
        this.props.viewObject.state === 'Waiting' &&
        this.props.student?.learningState === 'TestWaiting'
      ) {
        reactAlert({
          title: '알림',
          message:
            '관리자가 채점중에 있습니다. 채점이 완료되면 메일로 결과를 확인하실 수 있습니다.',
        });
      } else if (
        this.props.viewObject.state === EnumState.Waiting &&
        this.props.student?.learningState === 'Failed'
      ) {
        reactAlert({
          title: '알림',
          message: '합격기준에 미달하였습니다. 재응시해주시기 바랍니다.',
        });
      } else if (this.props.viewObject.state === EnumState.Missed) {
        // reactAlert({ title: '알림', message: '합격기준에 미달하였습니다. 재응시해주시기 바랍니다.' });
      } else if (
        this.prevViewObjectState === EnumState.InProgress &&
        this.props.viewObject.state === EnumState.Completed
      ) {
        reactAlert({
          title: '알림',
          message:
            '과정이 이수완료되었습니다. 이수내역은 마이페이지 > 학습완료 메뉴에서 확인 가능합니다.',
        });
      } else if (
        this.prevViewObjectState === EnumState.Waiting &&
        this.props.viewObject.state === EnumState.Completed
      ) {
        reactAlert({
          title: '알림',
          message:
            '과정이 이수완료되었습니다. 이수내역은 마이페이지 > 학습완료 메뉴에서 확인 가능합니다.',
        });
      }

      this.state.subTest = this.props.viewObject.state;
    }
  }

  componentWillUnmount(): void {
    this.setState({ rollBook: new RollBookModel() });
  }

  findInMyLecture() {
    //
    const {
      inMyLectureService,
      lectureServiceId,
      lectureServiceType,
    } = this.props;

    inMyLectureService!.findInMyLecture(lectureServiceId, lectureServiceType);
  }

  async onSelectClassroom(classroom: ClassroomModel) {
    const { viewObject } = this.props;

    // 선택 차수
    this.setState({ selectedClassRoom: classroom });

    /*// 차수 선택시 id 값
    this.selectedClassroomId = classroom.id;
    // 차수 선택시 무료(true) 유료(false) 여부
    this.state.approvalProcess = classroom.freeOfCharge.approvalProcess;*/

    // 알림 메시지
    const messageStr =
      '본 과정은 과정담당자가 승인 후 신청완료 됩니다. <br> 승인대기중/승인완료 된 과정은 <br> &#39;Learning>학습예정&#39;에서 확인하실 수 있습니다.';

    const {
      rollBookService,
      lectureCardId,
      student,
      studentService,
      typeViewObject,
    } = this.props;
    const rollBook = await rollBookService!.findRollBookByLectureCardIdAndRound(
      lectureCardId,
      classroom.round
    );

    if (student && student.id) {
      // 수강신청(true), 승인 체크(true)
      if (
        classroom.enrolling.enrollingAvailable &&
        classroom.freeOfCharge.approvalProcess === true
      ) {
        studentService!
          .removeStudent(student.rollBookId)
          .then(() => this.setState({ rollBook }, this.onApplyReference));
      } else {
        // 과정 등록 flow api 호출
        this.getFreeOfChargeOk(rollBook);

        studentService!
          .removeStudent(student.rollBookId)
          .then(() => this.setState({ rollBook }, this.onApplyReferenceEmpty));

        reactAlert({ title: '알림', message: messageStr });
      }
    } else if (
      (!student || !student.id) &&
      classroom.enrolling.enrollingAvailable === true &&
      classroom.freeOfCharge.approvalProcess === true
    ) {
      // 수강신청(true), 승인 체크(true)
      this.setState({ rollBook }, this.onApplyReference);
    } else {
      // 과정 등록
      this.getFreeOfChargeOk(rollBook);

      // 수강신청(false), 승인 체크(false)
      this.setState({ rollBook }, this.onApplyReferenceEmpty);

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

    const { id, freeOfCharge } = this.state.selectedClassRoom;
    if (id) {
      // 차수 선택 시 ID 값
      studentCdo.classroomId = id;
      // 차수 선택시 무료(true) 유료(false) 여부
      studentCdo.approvalProcess = freeOfCharge.approvalProcess;
    }

    const { studentService, lectureCardId, init } = this.props;

    studentService!.registerStudent(studentCdo).then(() => {
      studentService!.findStudentByRollBookId(studentCdo.rollBookId);
      studentService!.findIsJsonStudentByCube(lectureCardId);
      studentService!.findStudentCount(studentCdo.rollBookId);
      if (init) init();
    });

    // 알림 메시지
    const messageStr =
      '본 과정은 승인권자(본인리더 or HR담당자)가 승인 후 신청완료 됩니다. <br> 승인대기중/승인완료 된 과정은<br>&#39;Learning>학습예정&#39;에서 확인하실 수 있습니다.';
    reactAlert({ title: '알림', message: messageStr });
  }

  publishStudyEvent(isClose?: boolean) {
    const { actionEventService, personalCubeService } = this.props;
    const {
      match,
      lectureServiceType,
      lectureCardId,
      cubeType,
      typeViewObject,
    } = this.props;
    const { collegeId, cubeId } = match.params;

    const serviceType = lectureServiceType;
    const cubeName = personalCubeService!.personalCube.name;

    let action: StudyActionType = StudyActionType.None;
    let menu: string = 'LearningStart';
    let path: string = '';

    switch (cubeType) {
      case CubeType.Video:
        action = StudyActionType.VideoStart;
        if (
          typeViewObject.mediaType === MediaType.LinkMedia ||
          typeViewObject.mediaType === MediaType.ContentsProviderMedia
        ) {
          action = StudyActionType.CPLinked;
          path = typeViewObject.url;
        }
        if (isClose) {
          action = StudyActionType.VideoClose;
          menu = 'ModalClose';
        }

        break;
      case CubeType.Audio:
        action = StudyActionType.AudioStart;
        if (
          typeViewObject.mediaType === MediaType.LinkMedia ||
          typeViewObject.mediaType === MediaType.ContentsProviderMedia
        ) {
          action = StudyActionType.CPLinked;
          path = typeViewObject.url;
        }
        if (isClose) {
          action = StudyActionType.AudioClose;
          menu = 'ModalClose';
        }
        break;

      case CubeType.WebPage:
        action = StudyActionType.WebPageLinked;
        path = typeViewObject.url;

        break;
      case CubeType.Experiential:
        action = StudyActionType.Experimential;
        path = typeViewObject.url;

        break;

      case CubeType.ELearning:
        action = StudyActionType.ElearningLinked;
        path = typeViewObject.siteUrl;

        break;

      case CubeType.Documents:
        action = StudyActionType.DocumnetDownload;
        menu = 'Download';

        if (isClose) menu = 'DownloadClose';
        break;
    }
    actionEventService?.registerStudyActionLog({
      action,
      serviceType,
      collegeId,
      cubeId,
      lectureCardId,
      menu,
      path,
      cubeName,
    });
  }

  onRegisterStudent(proposalState?: ProposalState) {
    const { studentCdo, student } = this.props;

    if (
      !student ||
      !student.id ||
      (student.proposalState !== ProposalState.Canceled &&
        student.proposalState !== ProposalState.Rejected)
    ) {
      this.registerStudent({
        ...studentCdo,
        proposalState: proposalState || studentCdo.proposalState,
      });
    } else if (
      student.proposalState === ProposalState.Canceled ||
      student.proposalState === ProposalState.Rejected
    ) {
      this.registerStudent({
        ...studentCdo,
        proposalState: student.proposalState,
      });
    }
  }

  registerStudent(studentCdo: StudentCdoModel) {
    // 차수 선택시 무료(true) 유료(false) 여부
    studentCdo.approvalProcess = false;

    const { studentService, lectureCardId, init } = this.props;
    return studentService!.registerStudent(studentCdo).then(() => {
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
      studentService!
        .modifyStudentForExam(studentId, viewObject.examId)
        .then(() => {
          if (init) init();
        });
    }
  }

  surveyCallback() {
    const { init } = this.props;
    if (init) init();
  }

  //
  onClickEnrollment() {
    //
    const { typeViewObject } = this.props;
    const isSingleClassroom: boolean =
      typeViewObject.classrooms &&
      typeViewObject.classrooms.length &&
      typeViewObject.classrooms.length === 1;
    if (isSingleClassroom) {
      this.setState(
        { selectedClassRoom: typeViewObject.classrooms[0] },
        this.onApplyReference
      );
    } else {
      this.onApplyReference();
    }
  }

  onClickChangeSeries() {
    this.classroomModal.show();
  }

  onClickPlay() {
    const { typeViewObject } = this.props;

    if (typeViewObject.url && typeViewObject.url.startsWith('http')) {
      this.publishStudyEvent();
      this.onRegisterStudent(ProposalState.Approved);

      //0413 window.open -> modal로 변경
      //window.open(typeViewObject.url, '_blank');
      this.setState({ openLearningModal: true });
    } else {
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
      this.setState({ openLearningModal: true });
    } else {
      reactAlert({ title: '알림', message: '잘못 된 URL 정보입니다.' });
      console.warn('[UserFront] Url is empty.');
    }
  }

  onOpenStart() {
    const { typeViewObject } = this.props;

    if (typeViewObject.url && typeViewObject.url.startsWith('http')) {
      this.publishStudyEvent();
      this.onRegisterStudent(ProposalState.Approved);
      // // 200508 avedpark 동영상링크 학습하기 -> 학습완료
      // if (typeViewObject.mediaType === MediaType.LinkMedia) {
      //   this.onMarkComplete();
      // }
      //0416

      window.open(typeViewObject.url, '_blank');

      //this.setState( {openLearningModal: true});
    } else {
      reactAlert({ title: '알림', message: '잘못 된 URL 정보입니다.' });
      console.warn('[UserFront] Url is empty.');
    }
  }

  // 다운로드 시 팝업으로 확인가능하게 하고 수업시작 by gon
  onDownload() {
    // request download file to nara
    // depot.downloadDepot(typeViewObject.fileBoxId);
    this.publishStudyEvent();
    this.setState({ openDownloadModal: true });
  }
  // 다운로드 시 팝업으로 확인가능하게 하고 수업시작 by gon
  onDownloadModalClose(regist: boolean) {
    if (regist) {
      // 학습진행 등록
      this.onRegisterStudent(ProposalState.Approved);
    }
    this.publishStudyEvent(true);
    this.setState({ openDownloadModal: false });
  }

  onClickBookmark() {
    //
    const inMyLectureService = this.props.inMyLectureService!;
    const { inMyLectureCdo } = this.props;
    const { inMyLecture } = inMyLectureService;

    if (!inMyLecture || !inMyLecture.id) {
      reactAlert({
        title: '알림',
        message: '본 과정이 관심목록에 추가되었습니다.',
      });
      inMyLectureService!
        .addInMyLecture(inMyLectureCdo)
        .then(() =>
          inMyLectureService!.findInMyLecture(
            inMyLectureCdo.serviceId,
            inMyLectureCdo.serviceType
          )
        );
    }
  }

  onRemove() {
    //
    const inMyLectureService = this.props.inMyLectureService!;
    const { inMyLectureCdo } = this.props;
    const { inMyLecture } = inMyLectureService;

    if (inMyLecture && inMyLecture.id) {
      reactAlert({
        title: '알림',
        message: '본 과정이 관심목록에서 제외되었습니다.',
      });
      inMyLectureService!
        .removeInMyLecture(inMyLecture.id)
        .then(() =>
          inMyLectureService!.findInMyLecture(
            inMyLectureCdo.serviceId,
            inMyLectureCdo.serviceType
          )
        );
    }
  }

  onClickSurvey() {
    this.surveyModal.onOpenModal();
  }

  onJoin() {
    const { studentCdo, studentService, lectureCardId } = this.props;
    studentService!.joinCommunity({ ...studentCdo }).then(() => {
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
      studentService!.studentMarkComplete(student.rollBookId).then(() => {
        studentService!.findIsJsonStudentByCube(lectureCardId);
        studentService!.findStudent(student.id);
      });
    }
  }

  onApplyReference() {
    this.applyReferenceModel.onOpenModal();
  }

  onApplyReferenceEmpty() {}

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
      reactAlert({
        title: 'Report 안내',
        message: '과정 이수 완료 후 Report 가능합니다.',
      });
    } else {
      reactAlert({
        title: 'Report 안내',
        message: '학습 시작 후 Report 참여 가능합니다.',
      });
    }
  }

  onTestNotReady() {
    const { viewObject } = this.props;

    if (viewObject.cubeType === 'Course' || viewObject.cubeType === 'Program') {
      reactAlert({
        title: 'Test 안내',
        message: '과정 이수 완료 후 Test 응시 가능합니다.',
      });
    } else {
      reactAlert({
        title: 'Test 안내',
        message: '학습 시작 후 Test 참여 가능합니다.',
      });
    }
  }

  OnSurveyNotReady() {
    const { viewObject } = this.props;

    if (viewObject.cubeType === 'Course' || viewObject.cubeType === 'Program') {
      reactAlert({
        title: 'Survey 안내',
        message: '과정 이수 완료 후 Survey 응시 가능합니다.',
      });
    } else {
      reactAlert({
        title: 'Survey 안내',
        message: '학습 시작 후 Survey 참여 가능합니다.',
      });
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
    if (
      student &&
      (student.proposalState === ProposalState.Canceled ||
        student.proposalState === ProposalState.Rejected)
    ) {
      proposalState = student.proposalState;
    }
    let rollBookId = studentCdo.rollBookId;
    if (rollBook && rollBook.id) rollBookId = rollBook.id;

    // this.registerStudent({ ...studentCdo, rollBookId, proposalState });
    this.registerStudentApprove({
      ...studentCdo,
      rollBookId,
      proposalState,
      leaderEmails: [member.email],
      url:
        'https://int.mysuni.sk.com/login?contentUrl=' +
        window.location.pathname,
    });
  }

  // 무료과정 등록
  getFreeOfChargeOk(rollBook: RollBookModel) {
    //
    const { studentCdo, student } = this.props;
    // const { rollBook } = this.state;
    let proposalState = studentCdo.proposalState;

    if (
      student &&
      (student.proposalState === ProposalState.Canceled ||
        student.proposalState === ProposalState.Rejected)
    ) {
      proposalState = student.proposalState;
    }
    let rollBookId = studentCdo.rollBookId;
    if (rollBook && rollBook.id) rollBookId = rollBook.id;

    studentCdo.url =
      'https://int.mysuni.sk.com/login?contentUrl=' + window.location.pathname;

    // Submitted으로 디폴트 입력 한다.
    proposalState = studentCdo.proposalState;

    const { viewObject } = this.props;
    // 이메일 담당자
    studentCdo.leaderEmails = [viewObject.operatorEmail];

    this.registerStudent({ ...studentCdo, rollBookId, proposalState });
  }

  onLearningModalClose() {
    const isClose = true;
    this.publishStudyEvent(isClose);
    const { studentCdo, lectureService, onPageRefresh } = this.props;
    this.setState({ openLearningModal: false });
    const lectureStudentCdo = {
      ...studentCdo,
      proposalState: ProposalState.Approved,
    };

    lectureService
      ?.confirmUsageStatisticsByCardId(lectureStudentCdo)
      .then(confirmed => {
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
              if (
                !studentJoins ||
                !studentJoins.length ||
                !studentJoins.filter(
                  join =>
                    join.proposalState !== ProposalState.Canceled &&
                    join.proposalState !== ProposalState.Rejected
                ).length
              ) {
                this.onRegisterStudent(ProposalState.Approved);
              }
              if (typeViewObject.siteUrl.startsWith('http')) {
                window.open(typeViewObject.siteUrl, '_blank');
              } else {
                reactAlert({
                  title: '알림',
                  message: '잘못 된 URL 정보입니다.',
                });
              }
            },
          };
        }
        const classroomAvailable: boolean =
          typeViewObject.classrooms && typeViewObject.classrooms.length;
        const hasAvailStudentJoins: boolean =
          !studentJoins ||
          !studentJoins.length ||
          !studentJoins.filter(
            join =>
              join.proposalState !== ProposalState.Canceled &&
              join.proposalState !== ProposalState.Rejected
          ).length;
        if (
          classroomAvailable &&
          typeViewObject.classrooms.length > 1 &&
          hasAvailStudentJoins
        ) {
          return {
            type: LectureSubInfo.ActionType.Enrollment,
            onAction: this.onClickChangeSeries,
          };
        } else {
          if (
            studentJoins &&
            studentJoins.length &&
            studentJoins.filter(
              join =>
                join.proposalState !== ProposalState.Canceled &&
                join.proposalState !== ProposalState.Rejected
            ).length
          ) {
            return undefined;
          }
          if (!applyingPeriod) {
            return {
              type: LectureSubInfo.ActionType.Enrollment,
              onAction: () =>
                reactAlert({
                  title: '수강신청 기간 안내',
                  message: '수강신청 기간이 아닙니다.',
                }),
            };
          }
          const {
            year: startYear,
            month: startMonth,
            date: startDate,
          } = getYearMonthDateHourMinuteSecond(applyingPeriod!.startDateSub)!;
          const {
            year: endYear,
            month: endMonth,
            date: endDate,
          } = getYearMonthDateHourMinuteSecond(applyingPeriod!.endDateSub)!;
          if (
            new Date(startYear, startMonth, startDate, 0, 0, 0).getTime() >
              today.getTime() ||
            new Date(endYear, endMonth, endDate, 23, 59, 59).getTime() <
              today.getTime()
          ) {
            return {
              type: LectureSubInfo.ActionType.Enrollment,
              onAction: () =>
                reactAlert({
                  title: '수강신청 기간 안내',
                  message: '수강신청 기간이 아닙니다.',
                }),
            };
          }
          return {
            type: LectureSubInfo.ActionType.Enrollment,
            onAction: this.onClickEnrollment,
          };
        }
      case CubeType.Audio:
      case CubeType.Video:
        if (
          typeViewObject.mediaType === MediaType.LinkMedia ||
          typeViewObject.mediaType === MediaType.ContentsProviderMedia
        ) {
          return {
            type: LectureSubInfo.ActionType.LearningStart,
            onAction: this.onOpenStart,
          };
        } else {
          return {
            type: LectureSubInfo.ActionType.Play,
            onAction: this.onClickPlay,
          };
        }
      case CubeType.WebPage:
      case CubeType.Experiential:
        return {
          type: LectureSubInfo.ActionType.LearningStart,
          onAction: this.onOpenStart,
        };
      case CubeType.Documents:
        return {
          type: LectureSubInfo.ActionType.Download,
          onAction: this.onDownload,
        };
      case CubeType.Community:
        if (
          studentJoins &&
          studentJoins.length &&
          studentJoins.filter(
            join =>
              join.proposalState !== ProposalState.Canceled &&
              join.proposalState !== ProposalState.Rejected
          ).length
        ) {
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
        if (
          student &&
          student.id &&
          student.proposalState === ProposalState.Submitted &&
          typeViewObject.classrooms &&
          typeViewObject.classrooms.length
        ) {
          subActions.push({
            type: LectureSubInfo.ActionType.ChangeSeries,
            onAction: this.onClickChangeSeries,
          });
        }
        break;
      case CubeType.Audio:
      case CubeType.Video:
        if (
          student &&
          student.id &&
          typeViewObject.mediaType === MediaType.LinkMedia &&
          student.learningState === LearningState.Progress &&
          !viewObject.examId
        ) {
          subActions.push({
            type: LectureSubInfo.ActionType.MarkComplete,
            onAction: this.onMarkComplete,
            subType: cubeType,
          });
        }
        break;
      case CubeType.WebPage:
      case CubeType.Experiential:
      case CubeType.Documents:
        if (
          student &&
          student.id &&
          student.learningState === LearningState.Progress &&
          !viewObject.examId
        ) {
          subActions.push({
            type: LectureSubInfo.ActionType.MarkComplete,
            onAction: this.onMarkComplete,
            subType: cubeType,
          });
        }
        break;
      case CubeType.Community:
        break;
    }

    // console.log('viewObject : ', JSON.stringify(viewObject));
    // console.log('student : ', JSON.stringify(student));
    if (
      viewObject &&
      viewObject.reportFileBoxId &&
      student &&
      student.proposalState === ProposalState.Approved &&
      student.learningState
    ) {
      if (student.serviceType === 'Lecture') {
        if (student.studentScore.homeworkScore) {
          subActions.push({
            type: LectureSubInfo.ActionType.Report,
            onAction: () =>
              reactAlert({ title: '알림', message: '이미 채점이 되었습니다.' }),
          });
        } else {
          subActions.push({
            type: LectureSubInfo.ActionType.Report,
            onAction: this.onReport,
          });
        }
      }
    }

    if (student && student.learningState === LearningState.Passed) {
      this.state.passedState = true;
    }

    this.setStateName('1', 'Test');

    if (viewObject.examId && student) {
      if (student.serviceType && student.serviceType === 'Lecture') {
        if (
          student.learningState === LearningState.Progress ||
          student.learningState === LearningState.HomeworkWaiting
        ) {
          this.setStateName('0', 'Test');
          subActions.push({ type: 'Test', onAction: this.onTest });
        } else if (
          student.learningState === LearningState.Failed &&
          student.numberOfTrials < 3
        ) {
          // this.setStateName('2', `재응시(${student.numberOfTrials}/3)`);
          subActions.push({
            type: `재응시 (${student.numberOfTrials})`,
            onAction: this.onTest,
          });
          this.setStateName('0', `재응시 (${student.numberOfTrials})`);
          // subActions.push({ type: LectureSubInfo.ActionType.Test, onAction: this.onTest });
        } else if (
          student.learningState === LearningState.Failed &&
          student.numberOfTrials > 2
        ) {
          // this.setStateName('3', `재응시(${student.numberOfTrials}/3)`);
          subActions.push({
            type: `재응시 (${student.numberOfTrials})`,
            onAction: this.onTest,
          });
          this.setStateName('0', `재응시 (${student.numberOfTrials})`);
        } else if (student.learningState === LearningState.Waiting) {
          subActions.push({
            type: `재응시 (${student.numberOfTrials})`,
            onAction: this.onTest,
          });
          this.setStateName('0', `재응시 (${student.numberOfTrials})`);
        } else if (student.learningState === LearningState.Missed) {
          // this.setStateName('4', '미이수');
          subActions.push({
            type: `재응시 (${student.numberOfTrials})`,
            onAction: this.onTest,
          });
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
      } else if (
        student.serviceType === 'Course' ||
        student.serviceType === 'Program'
      ) {
        if (
          student.learningState === LearningState.Progress ||
          student.learningState === LearningState.HomeworkWaiting
        ) {
          if (student.phaseCount === student.completePhaseCount) {
            this.setStateName('0', 'Test');
          } else {
            this.setStateName('1', 'Test');
          }
        } else if (
          student.learningState === LearningState.Failed &&
          student.numberOfTrials < 3
        ) {
          // this.setStateName('2', `재응시(${student.numberOfTrials}/3)`);
          // subActions.push({ type: `재응시( ${student.numberOfTrials} )`, onAction: this.onTest });
          this.setStateName('0', `재응시 (${student.numberOfTrials})`);
        } else if (
          student.learningState === LearningState.Failed &&
          student.numberOfTrials > 2
        ) {
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
          subActions.push({
            type: LectureSubInfo.ActionType.ParticipationCompleted,
            onAction: () =>
              reactAlert({
                title: '알림',
                message: 'Survey 설문 참여가 완료 되었습니다.',
              }),
          });
        } else {
          subActions.push({
            type: LectureSubInfo.ActionType.SurveyParticipation,
            onAction: this.onSurvey,
          });
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
    const {
      cubeType,
      student,
      studentService,
      lectureCardId,
      typeViewObject,
    } = this.props;

    switch (cubeType) {
      case CubeType.ClassRoomLecture:
      case CubeType.ELearning: {
        const today = new Date();
        const cancellablePeriod = typeViewObject.cancellablePeriod;

        if (student && student.id) {
          if (
            !cancellablePeriod &&
            !student.learningState &&
            student.proposalState !== ProposalState.Canceled &&
            student.proposalState !== ProposalState.Approved
          ) {
            return () => {
              studentService!.removeStudent(student!.rollBookId).then(() => {
                studentService!.findStudent(student!.id);
                studentService!.findIsJsonStudentByCube(lectureCardId);
                studentService!.findStudentCount(student!.rollBookId);
              });
            };
          } else if (
            !student.learningState &&
            student.proposalState !== ProposalState.Canceled &&
            student.proposalState !== ProposalState.Approved
          ) {
            const {
              year: startYear,
              month: startMonth,
              date: startDate,
            } = getYearMonthDateHourMinuteSecond(
              cancellablePeriod!.startDateSub
            )!;
            const {
              year: endYear,
              month: endMonth,
              date: endDate,
            } = getYearMonthDateHourMinuteSecond(
              cancellablePeriod!.endDateSub
            )!;
            if (
              new Date(startYear, startMonth, startDate, 0, 0, 0).getTime() <=
                today.getTime() &&
              new Date(endYear, endMonth, endDate, 23, 59, 59).getTime() >=
                today.getTime()
            ) {
              return () => {
                studentService!.removeStudent(student!.rollBookId).then(() => {
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
    const {
      inMyLectureService,
      viewObject,
      cubeType,
      typeViewObject,
      studentCdo,
      children,
    } = this.props;
    const { inMyLecture } = inMyLectureService!;
    const { openLearningModal, openDownloadModal } = this.state;
    const { classrooms } = this.props.classroomService!;

    // console.log('LectureCardContainer : ', JSON.stringify(this.state));

    return (
      <LectureCardContentWrapperView>
        {/* 다운로드 시 팝업으로 확인가능하게 하고 수업시작 by gon */}
        {openDownloadModal && (
          <OverviewField.FileDownloadPop
            fileBoxIds={[typeViewObject.fileBoxId]}
            onClose={value => this.onDownloadModalClose(value)}
          />
        )}
        <ClassroomModalView
          ref={classroomModal => (this.classroomModal = classroomModal)}
          classrooms={typeViewObject.classrooms}
          onOk={this.onSelectClassroom}
        />
        {(cubeType === CubeType.ClassRoomLecture ||
          cubeType === CubeType.ELearning) && (
          <ApplyReferenceModal
            ref={applyReferenceModel =>
              (this.applyReferenceModel = applyReferenceModel)
            }
            classrooms={typeViewObject.classrooms}
            selectedClassRoom={this.state.selectedClassRoom}
            handleOk={this.onClickApplyReferentOk}
          />
        )}
        {viewObject && viewObject.examId && (
          <AnswerSheetModal
            examId={viewObject.examId}
            type={this.state.type}
            ref={examModal => (this.examModal = examModal)}
            onSaveCallback={this.testCallback}
          />
        )}
        {viewObject && viewObject.surveyId && (
          <SurveyAnswerSheetModal
            surveyId={viewObject.surveyId}
            surveyCaseId={viewObject.surveyCaseId}
            ref={surveyModal => (this.surveyModal = surveyModal)}
            onSaveCallback={this.surveyCallback}
          />
        )}
        <CubeReportModal
          downloadFileBoxId={
            viewObject.reportFileBoxId || typeViewObject.reportFileBoxId
          }
          ref={reportModal => (this.reportModal = reportModal)}
          downloadReport={this.onClickDownloadReport}
          rollBookId={studentCdo.rollBookId}
        />
        {// 0413 window.open => modal view로 변경
        openLearningModal && typeViewObject && typeViewObject.videoUrl && (
          <LectureLearningModalView
            ref={lectureLearningModal =>
              (this.lectureLearningModal = lectureLearningModal)
            }
            videoUrl={typeViewObject.videoUrl}
            onClose={this.onLearningModalClose}
          />
        )}
        {children}
        {/* 구조상 버튼을 가려서 children 아래로 이동 */}
        {/* 핵인싸과정 신청하기 등 오른쪽 버튼 부분 */}
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
          onBookmark={
            inMyLecture && inMyLecture.id ? undefined : this.onClickBookmark
          }
          onRemove={inMyLecture && inMyLecture.id ? this.onRemove : undefined}
          // onSurvey={viewObject.surveyId ? this.onSurvey : undefined}
          /* onDownloadReport={
             ((viewObject && viewObject.reportFileBoxId) || (typeViewObject && typeViewObject.reportFileBoxId)) ?
               () => this.onClickDownloadReport(viewObject.reportFileBoxId || typeViewObject.reportFileBoxId) : undefined
           }*/
        />
        {viewObject && viewObject.tabState === 'list' && (
          <LectureExam
            onReport={viewObject.reportFileBoxId ? this.onReport : undefined}
            onReportNotReady={
              viewObject.reportFileBoxId ? this.onReportNotReady : undefined
            }
            onTest={viewObject.examId ? this.onTest : undefined}
            onTestNotReady={viewObject.examId ? this.onTestNotReady : undefined}
            onSurvey={viewObject.surveyId ? this.onSurvey : undefined}
            OnSurveyNotReady={
              viewObject.surveyId ? this.OnSurveyNotReady : undefined
            }
            viewObject={viewObject}
            passedState={this.state.passedState}
            type={this.state.type}
            name={this.state.name}
          />
        )}
      </LectureCardContentWrapperView>
    );
  }
}

export default withRouter(LectureCardContainer);
