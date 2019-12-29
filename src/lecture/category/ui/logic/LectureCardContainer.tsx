import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import depot from '@nara.drama/depot';
import { CubeType } from 'personalcube/personalcube';
import LectureSubInfo from '../../../shared/LectureSubInfo';
import LectureCardContentWrapperView from '../view/LectureCardContentWrapperView';


interface Props {
  cubeType: CubeType
  viewObject: any
  typeViewObject: any
  children: React.ReactNode
}

interface State {
}

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
      window.open(typeViewObject.url, '_blank');
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
    console.log('bookmark');
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
    const { cubeType } = this.props;
    switch (cubeType) {
      case CubeType.ClassRoomLecture:
        return { type: LectureSubInfo.ActionType.Enrollment, onAction: this.onClickEnrollment };
      case CubeType.ELearning:
        return { type: LectureSubInfo.ActionType.Enrollment, onAction: this.onClickEnrollment };
      case CubeType.Audio:
      case CubeType.Video:
        return { type: LectureSubInfo.ActionType.Play, onAction: this.onClickPlay };
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
    const { viewObject, typeViewObject, children } = this.props;

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
          onBookmark={this.onClickBookmark}
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
