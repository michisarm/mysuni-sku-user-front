import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import depot from '@nara.drama/depot';
import { CubeType, ProposalState } from 'shared';
import { MediaType } from 'personalcube/media';
import { ClassroomModel } from 'personalcube/classroom';
import { RollBookService, StudentCdoModel, StudentJoinRdoModel, StudentService } from 'lecture';
import { InMyLectureCdoModel, InMyLectureModel, InMyLectureService } from 'mypage';
import LectureSubInfo, { State as SubState } from '../../../shared/LectureSubInfo';
import LectureCardContentWrapperView from '../view/LectureCardContentWrapperView';
import ClassroomModalView from '../view/ClassroomModalView';


interface Props {
  studentService?: StudentService
  rollBookService?: RollBookService
  inMyLectureService?: InMyLectureService
  inMyLectureCdo: InMyLectureCdoModel
  studentCdo: StudentCdoModel
  studentJoins: StudentJoinRdoModel[]
  inMyLecture: InMyLectureModel
  lectureCardId: string
  cubeType: CubeType
  viewObject: any
  typeViewObject: any
  children: React.ReactNode
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

  async onSelectClassroom(classroom: ClassroomModel) {
    const { rollBookService, lectureCardId, studentJoins, studentService, studentCdo } = this.props;
    const rollBook = await rollBookService!.findRollBookByLectureCardIdAndRound(lectureCardId, classroom.round);
    if (!studentJoins.length) {
      studentService!.registerStudent({ ...studentCdo, rollBookId: rollBook.id })
        .then(() => {
          studentService!.findIsJsonStudent(lectureCardId);
          studentService!.findStudentCount(rollBook.id);
        });
    }
  }

  onRegisterStudent(proposalState?: ProposalState) {
    const { studentCdo, studentService, lectureCardId, studentJoins } = this.props;
    if (!studentJoins.length) {
      studentService!.registerStudent({ ...studentCdo, proposalState: proposalState || studentCdo.proposalState })
        .then(() => {
          studentService!.findIsJsonStudent(lectureCardId);
          studentService!.findStudentCount(studentCdo.rollBookId);
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

    if (typeViewObject.url) {
      this.onRegisterStudent(ProposalState.Approved);
      window.open(typeViewObject.url.includes('http') ? typeViewObject.url : `https://${typeViewObject.url}`, '_blank');
    }
    else {
      console.log('[UserFront] Url is empty.');
    }
  }

  onLearningStart() {
    const { typeViewObject } = this.props;

    if (typeViewObject.url) {
      this.onRegisterStudent(ProposalState.Approved);
      window.open(typeViewObject.url.includes('http') ? typeViewObject.url : `https://${typeViewObject.url}`, '_blank');
    }
    else {
      console.log('[UserFront] Url is empty.');
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

  onClickShare() {
    console.log('share');
  }

  onClickSurvey() {
    console.log('survey');
  }

  onJoin() {
    const { studentCdo, studentService, lectureCardId } = this.props;
    studentService!.joinCommunity({ ...studentCdo })
      .then(() => {
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

  getMainAction() {
    const { cubeType, typeViewObject, studentJoins } = this.props;
    const applyingPeriod = typeViewObject!.applyingPeriod;
    const today = new Date();

    switch (cubeType) {
      case CubeType.ClassRoomLecture:
      case CubeType.ELearning:
        if (studentJoins.length) return undefined;
        if (!applyingPeriod) return undefined;
        if (applyingPeriod!.startDateSub >= new Date(today.toLocaleDateString())
          || applyingPeriod!.endDateSub <= new Date(today.toLocaleDateString())) {
          return undefined;
        }
        if (typeViewObject.classrooms && typeViewObject.classrooms.length) {
          return { type: LectureSubInfo.ActionType.Enrollment, onAction: this.onClickChangeSeries };
        }
        return { type: LectureSubInfo.ActionType.Enrollment, onAction: this.onClickEnrollment };
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
        if (studentJoins.length) return undefined;
        return { type: LectureSubInfo.ActionType.Join, onAction: this.onJoin };
      default:
        return undefined;
    }
  }

  getSubActions() {
    const { cubeType, typeViewObject, viewObject, studentJoins } = this.props;

    switch (cubeType) {
      case CubeType.ClassRoomLecture:
      case CubeType.ELearning:
        if (studentJoins.length && studentJoins[0].proposalState === ProposalState.Submitted
          && typeViewObject.classrooms && typeViewObject.classrooms.length) {
          return [{ type: LectureSubInfo.ActionType.ChangeSeries, onAction: this.onClickChangeSeries }];
        }
        return undefined;
      case CubeType.Audio:
      case CubeType.Video:
        if (studentJoins.length && typeViewObject.mediaType === MediaType.LinkMedia && viewObject.state !== SubState.Completed) {
          return [{ type: LectureSubInfo.ActionType.MarkComplete, onAction: this.onMarkComplete }];
        }
        return undefined;
      case CubeType.WebPage:
      case CubeType.Experiential:
      case CubeType.Documents:
        if (studentJoins.length && viewObject.state !== SubState.Completed) {
          return [{ type: LectureSubInfo.ActionType.MarkComplete, onAction: this.onMarkComplete }];
        }
        return undefined;
      case CubeType.Community:
      default:
        return undefined;
    }
  }

  getOnCancel() {
    const { cubeType, studentJoins, studentService, studentCdo, lectureCardId } = this.props;

    switch (cubeType) {
      case CubeType.ClassRoomLecture:
      case CubeType.ELearning:
        if (studentJoins.length) {
          return () => {
            studentService!.removeStudent(studentCdo.rollBookId)
              .then(() => {
                studentService!.findIsJsonStudent(lectureCardId);
                studentService!.findStudentCount(studentCdo.rollBookId);
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
          onShare={this.onClickShare}
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
        {children}
      </LectureCardContentWrapperView>
    );
  }
}

export default LectureCardContainer;
