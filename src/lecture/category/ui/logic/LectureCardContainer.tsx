import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import depot from '@nara.drama/depot';
import { mobxHelper } from 'shared';
import { CubeType } from 'personalcube/personalcube';
import { MediaType } from 'personalcube/media';
import { InMyLectureCdoModel, InMyLectureModel, InMyLectureService } from 'mytraining';
import LectureSubInfo from '../../../shared/LectureSubInfo';
import LectureCardContentWrapperView from '../view/LectureCardContentWrapperView';


interface Props {
  inMyLectureService?: InMyLectureService
  inMyLectureCdo: InMyLectureCdoModel
  inMyLecture: InMyLectureModel
  cubeType: CubeType
  viewObject: any
  typeViewObject: any
  children: React.ReactNode
}

interface State {
}

@inject(mobxHelper.injectFrom(
  'myTraining.inMyLectureService',
))
@reactAutobind
@observer
class LectureCardContainer extends Component<Props, State> {
  //
  onClickEnrollment() {
    console.log('enrollment');
  }

  onClickPlay() {
    const { typeViewObject } = this.props;

    if (typeViewObject.url) {
      window.open(typeViewObject.url, '_blank');
    }
    else {
      console.log('[UserFront] Url is empty.');
    }
  }

  onLearningStart() {
    const { typeViewObject } = this.props;

    if (typeViewObject.url) {
      window.open(`https://${typeViewObject.url}`, '_blank');
    }
    else {
      console.log('[UserFront] Url is empty.');
    }
  }

  onDownload() {
    const { typeViewObject } = this.props;
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
    console.log('join');
  }

  onClickDownloadReport(fileBoxId: string) {
    //
    depot.downloadDepot(fileBoxId);
  }

  getMainAction() {
    const { cubeType, typeViewObject } = this.props;

    switch (cubeType) {
      case CubeType.ClassRoomLecture:
        return { type: LectureSubInfo.ActionType.Enrollment, onAction: this.onClickEnrollment };
      case CubeType.ELearning:
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
        return { type: LectureSubInfo.ActionType.Join, onAction: this.onJoin };
      default:
        return undefined;
    }
  }

  render() {
    //
    const { inMyLecture, viewObject, typeViewObject, children } = this.props;

    return (
      <LectureCardContentWrapperView>
        <LectureSubInfo
          required={viewObject.required}
          level={viewObject.difficultyLevel}
          clazz={{
            learningTime: viewObject.learningTime,
            capacity: typeViewObject ? typeViewObject.capacity : 0,
            participantCount: viewObject.participantCount,
          }}
          operator={{
            instructor: viewObject.instructorName,
            name: viewObject.operatorName,
            company: viewObject.operatorCompany,
            email: viewObject.operatorEmail,
          }}
          mainAction={this.getMainAction()}
          onShare={this.onClickShare}
          onBookmark={inMyLecture && inMyLecture.id ? undefined : this.onClickBookmark}
          onRemove={inMyLecture && inMyLecture.id ? this.onRemove : undefined}
          onSurvey={viewObject.surveyId ? this.onClickSurvey : undefined}
          onDownloadReport={
            ((viewObject && viewObject.reportFileBoxId) || (typeViewObject && typeViewObject.reportFileBoxId)) ?
              () => this.onClickDownloadReport(viewObject.reportFileBoxId || typeViewObject.reportFileBoxId) : undefined
          }
        />

        {children}
      </LectureCardContentWrapperView>
    );
  }
}

export default LectureCardContainer;
