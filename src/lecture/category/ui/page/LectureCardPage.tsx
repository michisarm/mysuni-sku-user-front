import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { BoardService, PostList, PostListByWriter } from '@sku/personalcube';
import { ContentLayout, ContentMenu, Type, mobxHelper } from 'shared';
import { CollegeService } from 'college';
import { PersonalCubeService, ContentsServiceType } from 'personalcube/personalcube';
import { CubeIntroService } from 'personalcube/cubeintro';
import { ClassroomService } from 'personalcube/classroom';
import { MediaService } from 'personalcube/media';
import { OfficeWebService } from 'personalcube/officeweb';
import { LectureCardService } from 'lecture';
import { LearningCardService } from 'course';
import LectureCardHeaderView from '../view/LectureCardHeaderView';
import LectureCardContainer from '../logic/LectureCardContainer';
import LectureOverviewView from '../view/LectureOverviewView';



interface Props extends RouteComponentProps<{ collegeId: string, lectureCardId: string }> {
  collegeService: CollegeService,
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
      match, collegeService, personalCubeService, cubeIntroService, classroomService,
      mediaService, officeWebService, boardService, lectureCardService, learningCardService,
    } = this.props;
    const { params } = match;

    collegeService.findCollege(params.collegeId);
    const lectureCard = await lectureCardService.findLectureCard(params.lectureCardId);
    const learningCard = await learningCardService.findLearningCard(lectureCard!.learningCard.id);
    const personalCube = await personalCubeService.findPersonalCube(learningCard.personalCube.id);
    if (personalCube) {
      const { service, contents } = personalCube.contents;

      cubeIntroService.findCubeIntro(personalCube.cubeIntro.id);
      if (service.type === ContentsServiceType.Classroom) {
        classroomService.findClassroom(contents.id);
      }
      else if (service.type === ContentsServiceType.Media) {
        mediaService.findMedia(contents.id);
      }
      else if (service.type === ContentsServiceType.OfficeWeb) {
        officeWebService.findOfficeWeb(contents.id);
      }
      else if (service.type === ContentsServiceType.Community) {
        boardService.findBoard(contents.id);
        this.setState({ type: Type.Posts });
      }
    }
    // lectureCardService.findLectureCard(params.lectureCardId);
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
      //cubeIntroService, classroomService,
    } = this.props;
    const { personalCube } = personalCubeService!;
    // const { cubeIntro } = cubeIntroService!;
    // const { classroom } = classroomService!;

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
    const { personalCube } = this.props.personalCubeService;
    const menus: typeof ContentMenu.Menu[] = [];
    if (personalCube.contents.type === 'Community') {
      menus.push(
        { name: 'Posts', type: Type.Posts },
        { name: 'My Posts', type: Type.MyPosts },
        { name: 'Overview', type: Type.Overview },
      );
    }
    else {
      menus.push(
        { name: 'Overview', type: Type.Overview },
        { name: 'Comments', type: Type.Comments },
      );
    }

    return menus;
  }

  renderChildren(viewObject: any, typeViewObject: any) {
    //
    const { type } = this.state;
    const { personalCube } = this.props.personalCubeService;
    const { collegeId, lectureCardId } = this.props.match.params;
    switch (type) {
      case Type.Overview:
        return (
          <LectureOverviewView
            personalCube={personalCube}
            viewObject={viewObject}
            typeViewObject={typeViewObject}
          />
        );
      case Type.Comments:
        return null;
      case Type.Posts:
        return (
          <PostList
            boardId={personalCube.contents.contents.id}
            emptyMessage="작성된 글이 없습니다."
            linkedUrl={`${process.env.PUBLIC_URL}/lecture/college/${collegeId}/lecture-card/${lectureCardId}/posts`}
            routeToPost={() => this.props.history.push(`../posts/new`)}
            type={PostList.ListType.Basic}
          />
        );
      case Type.MyPosts:
        return (
          <PostListByWriter
            boardId={personalCube.contents.contents.id}
            linkedUrl={`${process.env.PUBLIC_URL}/lecture/college/${collegeId}/lecture-card/${lectureCardId}/posts`}
            emptyMessage="내가 작성한 글이 없습니다."
            routeToPost={() => this.props.history.push(`../posts/new`)}
          />
        );
      default:
        return null;
    }
  }

  render() {
    //
    const { collegeService, personalCubeService, lectureCardService } = this.props;
    const { college } = collegeService;
    const { personalCube } = personalCubeService;
    const { lectureCard } = lectureCardService;
    const viewObject = this.getViewObject();
    const typeViewObject = this.getTypeViewObject();

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
