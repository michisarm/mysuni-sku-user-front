
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { CollegeService } from 'college';
import { PersonalCubeService } from 'personalcube/personalcube';
import { CubeIntroService } from 'personalcube/cubeintro';
import { LectureCardService } from 'lecture';
import LectureCardHeaderView from '../view/LectureCardHeaderView';
import LectureCardContainer from '../logic/LectureCardContainer';


interface Props extends RouteComponentProps<{ collegeId: string, lectureCardId: string }> {
  collegeService: CollegeService,
  personalCubeService: PersonalCubeService,
  cubeIntroService: CubeIntroService,
  lectureCardService: LectureCardService,
}

@inject('collegeService', 'personalCubeService', 'cubeIntroService', 'lectureCardService')
@reactAutobind
@observer
class LectureCardPage extends Component<Props> {
  //
  componentDidMount() {
    //
    const { match, collegeService, personalCubeService, cubeIntroService, lectureCardService } = this.props;
    const { params } = match;

    collegeService.findCollege(params.collegeId);
    personalCubeService.findPersonalCube('CUBE-4')
      .then((personalCube) => {
        console.log('responsePersonalCube',  personalCube);
        if (personalCube) {
          console.log('findCubeIntro', personalCube.cubeIntro.id);
          cubeIntroService.findCubeIntro(personalCube.cubeIntro.id);
          // .then((cubeIntro) => console.log('cubeIntro', cubeIntro));
        }
      });
    lectureCardService.findLectureCard(params.lectureCardId);
  }


  render() {
    //
    const { collegeService, personalCubeService, lectureCardService } = this.props;
    const { college } = collegeService;
    const { personalCube } = personalCubeService;
    const { lectureCard } = lectureCardService;

    console.log('Page.personalCube', personalCube);
    console.log('Page.lectureCard', lectureCard);

    return (
      <ContentLayout
        className="channel"
        breadcrumb={[
          { text: `${college.name} College`, path: `../../${college.collegeId}` },
          { text: `${college.name} Lecture` },
        ]}
      >
        <LectureCardHeaderView
          personalCube={personalCube}
        />
        <LectureCardContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(LectureCardPage);
