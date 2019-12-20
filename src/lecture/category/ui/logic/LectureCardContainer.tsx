import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
// import { reaction } from 'mobx';
import { observer } from 'mobx-react';

import { LectureSubInfo } from 'shared';
import { CubeIntroModel } from 'personalcube/cubeintro';
import LectureCardContentWrapperView from '../view/LectureCardContentWrapperView';


interface Props {
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

  onClickBookmark() {
    console.log('bookmark');
  }

  onClickShare() {
    console.log('share');
  }

  onClickSurvey() {
    console.log('survey');
  }

  getOperator(cubeIntro: CubeIntroModel) {
    //
    return {
      ...cubeIntro.operation.operator,
      instructor: cubeIntro.description.instructor.name,
    };
  }

  render() {
    //
    const { viewObject, typeViewObject, children } = this.props;

    console.log('Container.viewModel', viewObject);
    console.log('Container.typeViewModel', typeViewObject);

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
          mainAction={{ type: LectureSubInfo.ActionType.Enrollment, onAction: this.onClickEnrollment }}
          onShare={this.onClickShare}
          onBookmark={this.onClickBookmark}
          onSurvey={this.onClickSurvey}
        />

        {children}
      </LectureCardContentWrapperView>
    );
  }
}

export default LectureCardContainer;
