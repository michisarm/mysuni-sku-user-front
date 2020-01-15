import React, { Component } from 'react';
import { mobxHelper, reactAlert, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import depot from '@nara.drama/depot';
import { CubeType, LearningState, ProposalState } from 'shared';
import { MediaType } from 'personalcube/media';
import { ClassroomModel } from 'personalcube/classroom';
import { RollBookService, StudentCdoModel, StudentJoinRdoModel, StudentService } from 'lecture';
import { InMyLectureCdoModel, InMyLectureModel, InMyLectureService } from 'myTraining';
import { AnswerSheetModalContainer } from 'assistant';
import { AnswerSheetModalContainer as SurveyAnswerSheetModal } from 'survey';
import LectureSubInfo from '../../../shared/LectureSubInfo';
import LectureCardContentWrapperView from '../view/LectureCardContentWrapperView';
import ClassroomModalView from '../view/ClassroomModalView';
import StudentModel from '../../../shared/model/StudentModel';


interface Props {
  studentService?: StudentService
  rollBookService?: RollBookService
  inMyLectureService?: InMyLectureService
  inMyLectureCdo: InMyLectureCdoModel
  studentCdo: StudentCdoModel
  studentJoins?: StudentJoinRdoModel[]
  student?: StudentModel
  inMyLecture: InMyLectureModel
  lectureCardId: string
  cubeType: CubeType
  viewObject: any
  typeViewObject: any
  children: React.ReactNode
  init?:() => void
}

interface State {
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

  async onSelectClassroom(classroom: ClassroomModel) {
    const { rollBookService, lectureCardId, student, studentService, studentCdo, typeViewObject } = this.props;
    const rollBook = await rollBookService!.findRollBookByLectureCardIdAndRound(lectureCardId, classroom.round);

    if (student && student.id) {
      studentService!.removeStudent(student.rollBookId)
        .then(() => this.registerStudent({ ...studentCdo, rollBookId: rollBook.id }));
    }
    else if ((!student || !student.id) && classroom.enrolling.enrollingAvailable) {
      this.registerStudent({ ...studentCdo, rollBookId: rollBook.id });
    }

    if (!classroom.enrolling.enrollingAvailable) {
      if (typeViewObject.siteUrl && typeViewObject.siteUrl.startsWith('http')) {
        window.open(typeViewObject.siteUrl, '_blank');
      }
      else reactAlert({ title: '알림', message: '잘못 된 URL 정보입니다.' });
    }
  }

  onRegisterStudent(proposalState?: ProposalState) {
    const { studentCdo, student, studentService } = this.props;
    if (!student || !student.id) {
      this.registerStudent({ ...studentCdo, proposalState: proposalState || studentCdo.proposalState });
    }
    else if (student.proposalState === ProposalState.Canceled) {
      //TODO
      // studentService!.modifyLearningState()
    }
  }

  registerStudent(studentCdo: StudentCdoModel) {
    const { studentService, lectureCardId } = this.props;
    return studentService!.registerStudent(studentCdo)
      .then(() => {
        studentService!.findStudent(studentCdo.rollBookId);
        studentService!.findIsJsonStudent(lectureCardId);
        studentService!.findStudentCount(studentCdo.rollBookId);
      });
  }

  testCallback() {
    const { studentService, student, init } = this.props;
    const { id: studentId } = student!;

    if (studentId) {
      studentService!.modifyLearningState(studentId, LearningState.Waiting)
        .then(() => {
          if (init) init();
        });
    }
  }

  onClickEnrollment() {
    //
    this.onRegisterStudent();
  }

  onClickChangeSeries() {
    this.classroomModal.show();
  }

  onClickPlay() {
    const { typeViewObject } = this.props;

    if (typeViewObject.url && typeViewObject.url.startsWith('http')) {
      this.onRegisterStudent(ProposalState.Approved);
      // window.open(typeViewObject.url.includes('http') ? typeViewObject.url : `https://${typeViewObject.url}`, '_blank');
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
      // window.open(typeViewObject.url.includes('http') ? typeViewObject.url : `https://${typeViewObject.url}`, '_blank');
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
    const { inMyLecture, inMyLectureCdo, inMyLectureService } = this.props;
    if (!inMyLecture || !inMyLecture.id) {
      inMyLectureService!.addInMyLecture(inMyLectureCdo)
        .then(() => inMyLectureService!.findInMyLecture(inMyLectureCdo.serviceId, inMyLectureCdo.serviceType));
    }
  }

  onRemove() {
    const { inMyLecture, inMyLectureService, inMyLectureCdo } = this.props;
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
        studentService!.findStudent(studentCdo.rollBookId);
        studentService!.findIsJsonStudent(lectureCardId);
        studentService!.findStudentCount(studentCdo.rollBookId);
      });
  }

  onClickDownloadReport(fileBoxId: string) {
    //
    depot.downloadDepot(fileBoxId);
  }

  onMarkComplete() {
    const { studentCdo, studentService, lectureCardId } = this.props;
    studentService!.studentMarkComplete(studentCdo.rollBookId)
      .then(() => {
        studentService!.findIsJsonStudent(lectureCardId);
      });
  }

  onTest() {
    this.examModal.onOpenModal();
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
          if (!applyingPeriod) return undefined;
          if (applyingPeriod!.startDateSub > new Date(today.toLocaleDateString() + '23:59:59')
            || applyingPeriod!.endDateSub < new Date(today.toLocaleDateString() + '00:00:00')) {
            return undefined;
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
        if (student && student.id && typeViewObject.mediaType === MediaType.LinkMedia && student.learningState === LearningState.Progress) {
          subActions.push({ type: LectureSubInfo.ActionType.MarkComplete, onAction: this.onMarkComplete });
        }
        break;
      case CubeType.WebPage:
      case CubeType.Experiential:
      case CubeType.Documents:
        if (student && student.id && student.learningState === LearningState.Progress) {
          subActions.push({ type: LectureSubInfo.ActionType.MarkComplete, onAction: this.onMarkComplete });
        }
        break;
      case CubeType.Community:
        break;
    }

    if (viewObject.examId && student && student.learningState === LearningState.Progress) {
      subActions.push({ type: LectureSubInfo.ActionType.Test, onAction: this.onTest });
    }
    return subActions.length ? subActions : undefined;
  }

  getOnCancel() {
    const { cubeType, student, studentService, lectureCardId } = this.props;
    console.log(student);

    switch (cubeType) {
      case CubeType.ClassRoomLecture:
      case CubeType.ELearning:
        if (student && student.id && (!student.learningState && student.proposalState !== ProposalState.Canceled)) {
          return () => {
            studentService!.removeStudent(student.rollBookId)
              .then(() => {
                studentService!.findStudent(student.rollBookId);
                studentService!.findIsJsonStudent(lectureCardId);
                studentService!.findStudentCount(student.rollBookId);
              });
          };
        }
        return undefined;
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
    const { inMyLecture, viewObject, cubeType, typeViewObject, children } = this.props;

    return (
      <LectureCardContentWrapperView>
        <LectureSubInfo
          required={viewObject.required}
          level={viewObject.difficultyLevel}
          clazz={{
            learningTime: viewObject.learningTime,
            capacity: typeViewObject ? typeViewObject.capacity : 0,
            cubeType,
            participantCount: viewObject.participantCount,
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
          onDownloadReport={
            ((viewObject && viewObject.reportFileBoxId) || (typeViewObject && typeViewObject.reportFileBoxId)) ?
              () => this.onClickDownloadReport(viewObject.reportFileBoxId || typeViewObject.reportFileBoxId) : undefined
          }
        />
        <ClassroomModalView
          ref={classroomModal => this.classroomModal = classroomModal}
          classrooms={typeViewObject.classrooms}
          onOk={this.onSelectClassroom}
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
              ref={surveyModal => this.surveyModal = surveyModal}
              // onSaveCallback={this.testCallback}
            />
          )
        }
        {children}
      </LectureCardContentWrapperView>
    );
  }
}

export default LectureCardContainer;
