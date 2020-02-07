import React, { Component } from 'react';
import { mobxHelper, reactAlert, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import depot from '@nara.drama/depot';
import { CubeType, ProposalState, LearningState } from 'shared';
import { MediaType } from 'personalcube/media';
import { ClassroomModel } from 'personalcube/classroom';
import { RollBookService, StudentCdoModel, StudentJoinRdoModel, StudentService, LectureServiceType } from 'lecture';
import { InMyLectureCdoModel, InMyLectureService } from 'myTraining';
import { AnswerSheetModalContainer, CubeReportModalContainer } from 'assistant';
import { AnswerSheetModalContainer as SurveyAnswerSheetModal } from 'survey';
import { getYearMonthDateHourMinuteSecond } from 'shared/helper/dateTimeHelper';
import { MemberViewModel } from '@nara.drama/approval';
import LectureSubInfo from '../../../shared/LectureSubInfo';
import LectureCardContentWrapperView from '../view/LectureCardContentWrapperView';
import ClassroomModalView from '../view/ClassroomModalView';
import StudentModel from '../../../shared/model/StudentModel';
import ManagerListModalContainer from '../view/ManagerListModalContainer';
import RollBookModel from '../../../shared/model/RollBookModel';

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
class LectureCardContainer extends Component<Props, State> {
  //
  classroomModal: any = null;
  examModal: any = null;
  surveyModal: any = null;
  reportModal: any = null;
  managerModal: any = null;

  state = {
    rollBook: new RollBookModel(),
  };

  componentDidMount(): void {
    //
    this.findInMyLecture();
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
    // this.onManager();
    console.log('조직도 일시 중단 ( ~ 조직도 css 완료 전까지');
    const { rollBookService, lectureCardId, student, studentService, typeViewObject } = this.props;
    const rollBook = await rollBookService!.findRollBookByLectureCardIdAndRound(lectureCardId, classroom.round);

    if (student && student.id) {
      studentService!.removeStudent(student.rollBookId)
        .then(() => this.setState({ rollBook }, this.onManager ));
    }
    else if ((!student || !student.id) && classroom.enrolling.enrollingAvailable) {
      this.setState({ rollBook }, this.onManager );
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

  onClickManagerListOk(member: MemberViewModel) {
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
    studentCdo.url = window.location.href;

    this.registerStudent({ ...studentCdo, rollBookId, proposalState });
  }

  //
  onClickEnrollment() {
    //
    // this.onManager();
    console.log('조직도 일시 중단 ( ~ 조직도 css 완료 전까지');
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

  onManager() {
    this.managerModal.onShow(true);
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
          subActions.push({ type: LectureSubInfo.ActionType.MarkComplete, onAction: this.onMarkComplete });
        }
        break;
      case CubeType.WebPage:
      case CubeType.Experiential:
      case CubeType.Documents:
        if (student && student.id && student.learningState === LearningState.Progress && !viewObject.examId) {
          subActions.push({ type: LectureSubInfo.ActionType.MarkComplete, onAction: this.onMarkComplete });
        }
        break;
      case CubeType.Community:
        break;
    }


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

    if (viewObject && viewObject.reportFileBoxId && student
      && !student.learningState && student.learningState !== LearningState.Passed && student.learningState === LearningState.Missed) {
      if (student.studentScore.homeworkScore) {
        subActions.push({ type: LectureSubInfo.ActionType.Report, onAction: () => reactAlert({ title: '알림', message: '이미 채점이 되었습니다.' }) });
      }
      else subActions.push({ type: LectureSubInfo.ActionType.Report, onAction: this.onReport });
    }
    return subActions.length ? subActions : undefined;
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
          onSurvey={viewObject.surveyId ? this.onClickSurvey : undefined}
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
        <ManagerListModalContainer
          ref={managerModal => this.managerModal = managerModal}
          handleOk={this.onClickManagerListOk}
        />
        {
          viewObject && viewObject.examId && (
            <AnswerSheetModalContainer
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
        <CubeReportModalContainer
          downloadFileBoxId ={viewObject.reportFileBoxId || typeViewObject.reportFileBoxId}
          ref={reportModal => this.reportModal = reportModal}
          downloadReport = {this.onClickDownloadReport}
          rollBookId={studentCdo.rollBookId}
        />
        {children}
      </LectureCardContentWrapperView>
    );
  }
}

export default LectureCardContainer;
