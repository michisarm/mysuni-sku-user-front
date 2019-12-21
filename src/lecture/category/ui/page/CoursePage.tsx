import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { BoardService } from '@sku/personalcube';
import { ContentLayout, ContentMenu, Type, mobxHelper } from 'shared';
import { CollegeService } from 'college';
import { CoursePlanService, LearningCardService } from 'course';
import { PersonalCubeService, ContentsServiceType } from 'personalcube/personalcube';
import { CubeIntroService } from 'personalcube/cubeintro';
import { ClassroomService } from 'personalcube/classroom';
import { MediaService } from 'personalcube/media';
import { OfficeWebService } from 'personalcube/officeweb';
import { LectureCardService } from 'lecture';

import LectureCardHeaderView from '../view/LectureCardHeaderView';
import LectureCardContainer from '../logic/LectureCardContainer';
import LectureOverviewView from '../view/LectureOverviewView';
import LectureCommentsContainer from '../logic/LectureCommentsContainer';
import CourseContainer from '../logic/CourseContainer';



interface Props extends RouteComponentProps<{ collegeId: string, lectureCardId: string, coursePlanId: string }> {
  collegeService: CollegeService,
  coursePlanService: CoursePlanService,
  personalCubeService: PersonalCubeService,
  cubeIntroService: CubeIntroService,
  classroomService: ClassroomService,
  mediaService: MediaService,
  officeWebService: OfficeWebService,
  boardService: BoardService,
  lectureCardService: LectureCardService,
  learningCardService: LearningCardService,
}

interface State {
  type: Type
}

@inject(mobxHelper.injectFrom(
  'collegeService',
  'course.coursePlanService',
  'personalCube.personalCubeService',
  'personalCube.cubeIntroService',
  'personalCube.classroomService',
  'personalCube.mediaService',
  'personalCube.officeWebService',
  'personalCube.boardService',
  'lecture.lectureCardService',
  'course.learningCardService'
))
@reactAutobind
@observer
class LectureCardPage extends Component<Props, State> {
  //
  state= {
    type: Type.Overview,
  };

  componentDidMount() {
    //
    this.init();
  }

  async init() {
    const {
      match, collegeService, coursePlanService,
    } = this.props;
    const { params } = match;

    collegeService.findCollege(params.collegeId);
    coursePlanService.findCoursePlan(params.coursePlanId);


    // const lectureCard = await lectureCardService.findLectureCard(params.lectureCardId);
    // const learningCard = await learningCardService.findLearningCard(lectureCard!.learningCard.id);
    // const personalCube = await personalCubeService.findPersonalCube(learningCard.personalCube.id);

    // if (personalCube) {
    //   cubeIntroService.findCubeIntro(personalCube.cubeIntro.id);
    // }
  }


  getViewObject() {
    //
    const {
      personalCubeService, cubeIntroService,
    } = this.props;
    const { personalCube } = personalCubeService!;
    const { cubeIntro } = cubeIntroService!;

    return {
      // Sub info
      required: false,  // Todo
      difficultyLevel: cubeIntro.difficultyLevel,
      learningTime: cubeIntro.learningTime,
      participantCount: '1,250',  // Todo

      instructorName: cubeIntro.description.instructor.name,
      operatorName: cubeIntro.operation.operator.name,
      operatorCompany: cubeIntro.operation.operator.company,
      operatorEmail: cubeIntro.operation.operator.email,

      // Fields
      description: cubeIntro.description.description,

      goal: cubeIntro.description.goal,
      applicants: cubeIntro.description.applicants,
      organizerName: cubeIntro.operation.organizer.name,

      completionTerms: cubeIntro.description.completionTerms,
      guide: cubeIntro.description.guide,

      tags: personalCube.tags,

      classroom: undefined,
    };
  }

  getTypeViewObject(): any {
    //
    const {
      personalCubeService,
    } = this.props;
    const { personalCube } = personalCubeService!;

    const contentsService = personalCube.contents.service;
    let cubeTypeViewObject = {};

    switch (contentsService.type) {
      case ContentsServiceType.Classroom:
        cubeTypeViewObject = this.getClassroomViewObject();
        break;
      case ContentsServiceType.Media:
        cubeTypeViewObject = this.getMediaViewObject();
        break;
      case ContentsServiceType.OfficeWeb:
        cubeTypeViewObject = this.getOfficeWebViewObject();
        break;
      case ContentsServiceType.Community:
        cubeTypeViewObject = this.getCommunityViewObject();
        break;
    }

    return cubeTypeViewObject;
  }

  getClassroomViewObject() {
    //
    const { classroom } = this.props.classroomService!;
    console.log('ClassroomViewObject');

    return {
      capacity: classroom.capacity,
      applyingPeriod: classroom.enrolling.applyingPeriod,
      cancellablePeriod: classroom.enrolling.cancellablePeriod,
      cancellationPenalty: classroom.enrolling.cancellationPenalty,
      location: classroom.operation.location,
    };
  }

  getMediaViewObject() {
    //
    return {};
  }

  getOfficeWebViewObject() {
    return {};
  }

  getCommunityViewObject() {
    return {};
  }

  getMenus() {
    //
    const menus: typeof ContentMenu.Menu[] = [
      { name: 'Posts', type: Type.List },
      { name: 'Overview', type: Type.Overview },
      { name: 'Comments', type: Type.Comments },
    ];

    return menus;
  }

  renderChildren(viewObject: any, typeViewObject: any) {
    //
    const { type } = this.state;
    const { personalCube } = this.props.personalCubeService;
    const { lectureCard } = this.props.lectureCardService;

    switch (type) {
      case Type.List:
        return (
          <CourseContainer />
        );
      case Type.Overview:
        return (
          <LectureOverviewView
            personalCube={personalCube}
            viewObject={viewObject}
            typeViewObject={typeViewObject}
          />
        );
      case Type.Comments:
        return (
          <LectureCommentsContainer
            reviewFeedbackId={lectureCard.reviewFeedbackId}
            commentFeedbackId={lectureCard.commentFeedbackId}
          />
        );
      default:
        return null;
    }
  }

  render() {
    //
    const { collegeService, personalCubeService } = this.props;
    const { college } = collegeService;
    const { personalCube } = personalCubeService;
    const viewObject = this.getViewObject();
    const typeViewObject = this.getTypeViewObject();

    console.log('render', 'Course');

    return (
      <ContentLayout
        className="channel"
        breadcrumb={[
          { text: `${college.name} College`, path: `../../${college.collegeId}/channels` },
          { text: `${college.name} Course` },
        ]}
      >
        <LectureCardHeaderView
          personalCube={personalCube}
        />
        <ContentMenu
          menus={this.getMenus()}
          type={this.state.type}
          onSelectMenu={(type) => this.setState({ type })}
        />
        <LectureCardContainer
          viewObject={viewObject}
          typeViewObject={typeViewObject}
        >
          { this.renderChildren(viewObject, typeViewObject) }
        </LectureCardContainer>
      </ContentLayout>
    );
  }
}

export default withRouter(LectureCardPage);
