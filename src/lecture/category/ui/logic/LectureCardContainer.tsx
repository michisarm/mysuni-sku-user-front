import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import depot from '@nara.drama/depot';
// import { reaction } from 'mobx';
import { observer } from 'mobx-react';

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

  // constructor(props: Props) {
  //   super(props);
  //
  //   // reaction(
  //   //   () => props.c
  //   // );
  // }

  componentDidMount() {
    //
    // const { classroomService } = this.props;

    // classroomService.findClassroom()


    // lectureCardService!.findAllLectureCards(0, 20);

    // Todo: 조회 서비스 교체해야함.
    // personalCubeService!.findAllPersonalCubesByQuery();
    // personalCubeService!.findAllPersonalCubes(0, 20);
  }

  onClickEnrollment() {
    console.log('enrollment');
  }

  onClickPlay() {
    const { typeViewObject } = this.props;

    if (typeViewObject.url) {
      window.open(typeViewObject.url, '_blank');
    }

    console.log('play');
  }

  onLearningStart() {
    const { typeViewObject } = this.props;

    if (typeViewObject.url) {
      window.open(typeViewObject.url, '_blank');
    }
    console.log('learning start');
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
