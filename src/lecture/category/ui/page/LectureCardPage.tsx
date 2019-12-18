import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { CollegeService } from 'college';
import { PersonalCubeService, ContentsServiceType } from 'personalcube/personalcube';
import { CubeIntroService } from 'personalcube/cubeintro';
import { ClassroomService } from 'personalcube/classroom';
import { MediaService } from 'personalcube/media';
import { OfficeWebService } from 'personalcube/officeweb';
import { LectureCardService } from 'lecture';
import LectureCardHeaderView from '../view/LectureCardHeaderView';
import LectureCardContainer from '../logic/LectureCardContainer';


interface Props extends RouteComponentProps<{ collegeId: string, lectureCardId: string }> {
  collegeService: CollegeService,
  personalCubeService: PersonalCubeService,
  cubeIntroService: CubeIntroService,
  classroomService: ClassroomService,
  mediaService: MediaService,
  officeWebService: OfficeWebService,
  lectureCardService: LectureCardService,
}

@inject('collegeService', 'personalCubeService', 'cubeIntroService', 'classroomService', 'mediaService', 'officeWebService', 'lectureCardService')
@reactAutobind
@observer
class LectureCardPage extends Component<Props> {
  //
  componentDidMount() {
    //
    const {
      match, collegeService, personalCubeService, cubeIntroService, classroomService, mediaService, officeWebService,
    } = this.props;
    const { params } = match;

    collegeService.findCollege(params.collegeId);
    personalCubeService.findPersonalCube('CUBE-1')
      .then((personalCube) => {
        if (personalCube) {
          const { type: cubeType, service, contents } = personalCube.contents;

          cubeIntroService.findCubeIntro(personalCube.cubeIntro.id);
          console.log('Contents', cubeType, contents.id);

          if (service.type === ContentsServiceType.Classroom) {
            // classroomService.findClassroom(contents.id);
            console.log('classroom', classroomService);
          }
          else if (service.type === ContentsServiceType.Media) {
            mediaService.findMedia(contents.id);
          }
          else if (service.type === ContentsServiceType.OfficeWeb) {
            officeWebService.findOfficeWeb(contents.id);
          }
          else if (service.type === ContentsServiceType.Community) {
            // Todo
          }
        }
      });
    // lectureCardService.findLectureCard(params.lectureCardId);
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
