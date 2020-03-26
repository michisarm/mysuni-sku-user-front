import React, { Component } from 'react';
import { mobxHelper, reactAlert, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import depot from '@nara.drama/depot';
import { CubeType, LearningState, ProposalState } from 'shared/model';
import { MediaType } from 'personalcube/media/model';
import { ClassroomModel } from 'personalcube/classroom/model';
import { LectureServiceType, StudentCdoModel, StudentJoinRdoModel } from 'lecture/model';
import { RollBookService, StudentService } from 'lecture/stores';
import { InMyLectureCdoModel } from 'myTraining/model';
import { InMyLectureService } from 'myTraining/stores';
import { AnswerSheetModal } from 'assistant';
import { getYearMonthDateHourMinuteSecond } from 'shared/helper/dateTimeHelper';
import LectureSubInfo from '../../../shared/LectureSubInfo';
import TestExamSurverView from '../view/TestExamSurverView';
import StudentModel from '../../../model/StudentModel';
import RollBookModel from '../../../model/RollBookModel';
import { ApprovalMemberModel } from '../../../../approval/member/model/ApprovalMemberModel';
import { CoursePlanModel, CoursePlanContentsModel } from '../../../../course/model';

interface Props {
  studentService?: StudentService
  rollBookService?: RollBookService
  inMyLectureService?: InMyLectureService
  lectureServiceId: string
  lectureCardId: string
  lectureServiceType: LectureServiceType
  inMyLectureCdo: InMyLectureCdoModel
  studentCdo: StudentCdoModel
  studentJoins?: StudentJoinRdoModel[]
  student?: StudentModel

  cubeType: CubeType
  viewObject: any
  typeViewObject: any
  children: React.ReactNode
  init?:() => void
  loaded: boolean

  coursePlan: CoursePlanModel
  coursePlanContents: CoursePlanContentsModel

}

interface State {
  rollBook: RollBookModel
}

@inject(mobxHelper.injectFrom(
  'lecture.rollBookService',
  'lecture.studentService',
  'myTraining.inMyLectureService',
))
@reactAutobind
@observer
class TestExamSurverContainer extends Component<Props, State> {
  //
  classroomModal: any = null;
  examModal: any = null;
  surveyModal: any = null;
  reportModal: any = null;
  applyReferenceModel: any = null;
  prevViewObjectState: string = '';

  state = {
    rollBook: new RollBookModel(),
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
      // if (this.props.viewObject.state === 'Waiting' && this.props.student?.learningState === 'TestWaiting') {
      //   reactAlert({ title: '알림', message: '관리자가 채점중에 있습니다. 채점이 완료되면 메일로 결과를 확인하실 수 있습니다.' });
      // } else if (this.props.viewObject.state === 'Waiting' && this.props.student?.learningState === 'Failed') {
      //   reactAlert({ title: '알림', message: '합격기준에 미달하였습니다. 재응시해주시기 바랍니다.' });
      // } else if (this.props.viewObject.state === 'Missed') {
      //   reactAlert({ title: '알림', message: '과정이 미이수되었습니다. 처음부터 다시 학습 후 Test를 응시해주시기 바랍니다.' });
      // } else if (this.prevViewObjectState === 'InProgress' && this.props.viewObject.state === 'Completed') {
      //   reactAlert({ title: '알림', message: '과정이 이수완료되었습니다. 이수내역은 마이페이지 > 학습완료 메뉴에서 확인 가능합니다.' });
      // } else if (this.prevViewObjectState === 'Waiting' && this.props.viewObject.state === 'Completed') {
      //   reactAlert({ title: '알림', message: '과정이 이수완료되었습니다. 이수내역은 마이페이지 > 학습완료 메뉴에서 확인 가능합니다.' });
      // }
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
    this.onApplyReference();
    const { rollBookService, lectureCardId, student, studentService, typeViewObject } = this.props;
    const rollBook = await rollBookService!.findRollBookByLectureCardIdAndRound(lectureCardId, classroom.round);

    if (student && student.id) {
      studentService!.removeStudent(student.rollBookId)
        .then(() => this.setState({ rollBook }, this.onApplyReference ));
    }
    else if ((!student || !student.id) && classroom.enrolling.enrollingAvailable) {
      this.setState({ rollBook }, this.onApplyReference );
    }

    if (!classroom.enrolling.enrollingAvailable) {
      if (typeViewObject.siteUrl && typeViewObject.siteUrl.startsWith('http')) {
        window.open(typeViewObject.siteUrl, '_blank');
      }
      else reactAlert({ title: '알림', message: '잘못 된 URL 정보입니다.' });
    }
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
    const { studentService, lectureCardId } = this.props;
    return studentService!.registerStudent(studentCdo)
      .then(() => {
        studentService!.findStudentByRollBookId(studentCdo.rollBookId);
        studentService!.findIsJsonStudentByCube(lectureCardId);
        studentService!.findStudentCount(studentCdo.rollBookId);
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
      window.open(typeViewObject.url, '_blank');
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
      window.open(typeViewObject.url, '_blank');
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

  onTest() {
    this.examModal.onOpenModal();
  }

  onReport() {
    this.reportModal.onOpenModal();
  }

  onApplyReference() {
    this.applyReferenceModel.onOpenModal();
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

    this.registerStudent({ ...studentCdo, rollBookId, proposalState });
  }

  getMainAction() {
    const { cubeType, typeViewObject, studentJoins } = this.props;
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
        if (typeViewObject.classrooms && typeViewObject.classrooms.length && typeViewObject.classrooms.length > 1
          && (!studentJoins || !studentJoins.length || !studentJoins.filter(join =>
            (join.proposalState !== ProposalState.Canceled && join.proposalState !== ProposalState.Rejected)).length)) {
          return { type: LectureSubInfo.ActionType.Enrollment, onAction: this.onClickChangeSeries };
        }
        else {
          if (studentJoins && studentJoins.length
            && studentJoins.filter(join => (join.proposalState !== ProposalState.Canceled && join.proposalState !== ProposalState.Rejected)).length) {
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
          return { type: LectureSubInfo.ActionType.LearningStart, onAction: this.onLearningStart };
        }
        else {
          return { type: LectureSubInfo.ActionType.Play, onAction: this.onClickPlay };
        }
      case CubeType.WebPage:
      case CubeType.Experiential:
        return { type: LectureSubInfo.ActionType.LearningStart, onAction: this.onLearningStart };
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
    const { viewObject, student } = this.props;
    const subActions = [];

    if (viewObject.examId && student) {
      if (!student.serviceType || student.serviceType === 'Lecture') {
        if (student.learningState === LearningState.Progress || student.learningState === LearningState.HomeworkWaiting) {
          subActions.push({ type: LectureSubInfo.ActionType.Test, onAction: this.onTest });
        } else if (student.learningState === LearningState.Failed && student.numberOfTrials < 3) {
          subActions.push({ type: `재응시(${student.numberOfTrials}/3)`, onAction: this.onTest });
        }
      }
      else if (student.serviceType === 'Course' || student.serviceType === 'Program') {
        if (
          student.phaseCount === student.completePhaseCount
          && (student.learningState === LearningState.Progress || student.learningState === LearningState.HomeworkWaiting)
        ) {
          subActions.push({ type: LectureSubInfo.ActionType.Test, onAction: this.onTest });
        } else if (
          student.phaseCount === student.completePhaseCount
          && (student.learningState === LearningState.Failed && student.numberOfTrials < 3)
        ) {
          subActions.push({ type: `재응시(${student.numberOfTrials}/3)`, onAction: this.onTest });
        }
      }
    }

    return subActions.length ? subActions : undefined;
  }

  render() {
    //
    const { viewObject, children } = this.props;

    return (
      <TestExamSurverView>
        {
          <AnswerSheetModal
            examId={viewObject.examId}
            ref={examModal => this.examModal = examModal}
            onSaveCallback={this.testCallback}
          />
        }

        {children}
      </TestExamSurverView>
    );
  }
}

export default TestExamSurverContainer;
