
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { CollegeService } from 'college';
import { PersonalCubeService } from 'personalcube/personalcube';
import { LectureCardService } from 'lecture';
import LectureCardHeaderView from '../view/LectureCardHeaderView';
import CategoryLecturesContainer from '../logic/CategoryLecturesContainer';


interface Props extends RouteComponentProps<{ collegeId: string, lectureCardId: string }> {
  collegeService: CollegeService,
  personalCubeService: PersonalCubeService,
  lectureCardService: LectureCardService,
}

@inject('collegeService', 'personalCubeService', 'lectureCardService')
@reactAutobind
@observer
class LectureCardPage extends Component<Props> {
  //
  componentDidMount() {
    //
    const { match, collegeService, personalCubeService, lectureCardService } = this.props;
    const { params } = match;

    collegeService.findCollege(params.collegeId);
    personalCubeService.findPersonalCube('CUBE-4');
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
          lectureCard={lectureCard}
        />
        <CategoryLecturesContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(LectureCardPage);
