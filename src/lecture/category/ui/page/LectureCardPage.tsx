import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ReviewService } from '@nara.drama/feedback';
import { BoardService, PostList, PostListByWriter } from '@sku/personalcube';
import { ContentLayout, ContentMenu, mobxHelper } from 'shared';
import { CollegeService } from 'college';
import { ContentsServiceType, CubeType, CubeTypeNameType, PersonalCubeService } from 'personalcube/personalcube';
import { CubeIntroService } from 'personalcube/cubeintro';
import { ClassroomService } from 'personalcube/classroom';
import { MediaService, MediaType } from 'personalcube/media';
import { OfficeWebService } from 'personalcube/officeweb';
import { LectureCardService } from 'lecture';
import { LearningCardService } from 'course';
import routePaths from '../../../routePaths';
import LectureCardHeaderView from '../view/LectureCardHeaderView';
import LectureCardContainer from '../logic/LectureCardContainer';
import LectureOverviewView from '../view/LectureOverviewView';
import LectureCommentsContainer from '../logic/LectureCommentsContainer';


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
  reviewService: ReviewService,
}

interface State {
  type: string
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
  'course.learningCardService',
  'shared.reviewService'
))
@reactAutobind
@observer
class LectureCardPage extends Component<Props, State> {
  //
  state= {
    type: 'Overview',
  };

  componentDidMount() {
    //
    this.init();
  }

  async init() {
    const {
      match, collegeService, personalCubeService, cubeIntroService, classroomService, reviewService,
      mediaService, officeWebService, boardService, lectureCardService, learningCardService,
    } = this.props;
    const { params } = match;

    collegeService.findCollege(params.collegeId);
    const lectureCard = await lectureCardService.findLectureCard(params.lectureCardId);
    reviewService.findReviewSummary(lectureCard!.reviewId);
    const learningCard = await learningCardService.findLearningCard(lectureCard!.learningCard.id);
    const personalCube = await personalCubeService.findPersonalCube(learningCard.personalCube.id);
    if (personalCube) {
      const { service, contents } = personalCube.contents;

      cubeIntroService.findCubeIntro(personalCube.cubeIntro.id);
      if (service.type === ContentsServiceType.Classroom) {
        classroomService.findClassrooms(personalCube.personalCubeId);
      }
      else if (service.type === ContentsServiceType.Media) {
        mediaService.findMedia(contents.id);
      }
      else if (service.type === ContentsServiceType.OfficeWeb) {
        officeWebService.findOfficeWeb(contents.id);
      }
      else if (service.type === ContentsServiceType.Community) {
        boardService.findBoard(contents.id);
        this.setState({ type: 'Posts' });
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
      participantCount: '0',  // Todo

      instructorName: cubeIntro.description.instructor.name,
      operatorName: cubeIntro.operation.operator.name,
      operatorCompany: cubeIntro.operation.operator.company,
      operatorEmail: cubeIntro.operation.operator.email,

      // Fields
      subCategories: personalCube.subCategories,
      description: cubeIntro.description.description,

      goal: cubeIntro.description.goal,
      applicants: cubeIntro.description.applicants,
      organizerName: cubeIntro.operation.organizer.name,

      completionTerms: cubeIntro.description.completionTerms,
      guide: cubeIntro.description.guide,

      tags: personalCube.tags,
      surveyId: personalCube.contents.surveyId,
      fileBoxId: personalCube.contents.fileBoxId,
      reportFileBoxId: cubeIntro.reportFileBox.fileBoxId,
      stamp: 0,

      //etc
      category: personalCube.category,
      cubeType: CubeType[personalCube.contents.type],
      cubeTypeName: CubeTypeNameType[CubeType[personalCube.contents.type]],
      name: personalCube.name,
      time: personalCube.time,
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
    const { classrooms } = this.props.classroomService!;

    let classroom = null;

    if (classrooms.length) {
      if (classrooms.length === 1) classroom = classrooms[0];
      else {
        //TODO 가장 가까운날짜
        classroom = classrooms[classrooms.length - 1];
      }
    }

    if (!classroom) return {};
    return {
      capacity: classroom.capacity,
      waitingCapacity: classroom.waitingCapacity,
      applyingPeriod: classrooms.length === 1 && classroom.enrolling.applyingPeriod,
      cancellablePeriod: classrooms.length === 1 && classroom.enrolling.cancellablePeriod,
      cancellationPenalty: classroom.enrolling.cancellationPenalty,
      location: classroom.operation.location,
      learningPeriod: classroom.enrolling.learningPeriod,
      reportFileBoxId: classroom.roundReportFileBox.fileBoxId,
      classrooms: classrooms.length > 1 && classrooms,
    };
  }

  getMediaViewObject() {
    //
    const { media } = this.props.mediaService!;
    let url = '';
    let videoUrl = '';

    switch (media.mediaType) {
      case MediaType.ContentsProviderMedia:
        url = media.mediaContents.contentsProvider.url;
        break;
      case MediaType.LinkMedia:
        url = media.mediaContents.linkMediaUrl;
        break;
      case MediaType.InternalMedia:
        videoUrl = media.mediaContents.internalMedias.length ? media.mediaContents.internalMedias[0].thumbUrl : '';
        url = media.mediaContents.internalMedias.length ? media.mediaContents.internalMedias[0].viewUrl : '';
        break;
    }

    return {
      url,
      videoUrl,
      learningPeriod: media.learningPeriod,
    };
  }

  getOfficeWebViewObject() {
    //
    const { officeWeb } = this.props.officeWebService;
    return {
      fileBoxId: officeWeb.fileBoxId,
      learningPeriod: officeWeb.learningPeriod,
      url: officeWeb.webPageUrl,
    };
  }

  getCommunityViewObject() {
    //
    const { board } = this.props.boardService;
    return {
      learningPeriod: board.learningPeriod,
    };
  }

  getMenus() {
    //
    const { personalCube } = this.props.personalCubeService;
    const menus: typeof ContentMenu.Menu[] = [];
    if (personalCube.contents.type === 'Community') {
      menus.push(
        { name: 'Posts', type: 'Posts' },
        { name: 'My Posts', type: 'MyPosts' },
        { name: 'Overview', type: 'Overview' },
      );
    }
    else {
      menus.push(
        { name: 'Overview', type: 'Overview' },
        { name: 'Comments', type: 'Comments' },
      );
    }

    return menus;
  }

  renderChildren(viewObject: any, typeViewObject: any) {
    //
    const { type } = this.state;
    const { personalCube } = this.props.personalCubeService;
    const { lectureCard } = this.props.lectureCardService;
    const { collegeId, lectureCardId } = this.props.match.params;
    switch (type) {
      case 'Overview':
        return (
          <LectureOverviewView
            viewObject={viewObject}
            typeViewObject={typeViewObject}
          />
        );
      case 'Comments':
        return (
          <LectureCommentsContainer
            reviewFeedbackId={lectureCard.reviewId}
            commentFeedbackId={lectureCard.commentId}
          />
        );
      case 'Posts':
        return (
          <PostList
            boardId={personalCube.contents.contents.id}
            emptyMessage="작성된 글이 없습니다."
            linkedUrl={`/lecture/college/${collegeId}/cube/${personalCube.personalCubeId}/lecture-card/${lectureCardId}/posts`}
            routeToPost={() => this.props.history.push(`/lecture/college/${collegeId}/cube/${personalCube.personalCubeId}/lecture-card/${lectureCardId}/posts/new`)}
            type={PostList.ListType.Basic}
          />
        );
      case 'MyPosts':
        return (
          <PostListByWriter
            boardId={personalCube.contents.contents.id}
            linkedUrl={`/lecture/college/${collegeId}/cube/${personalCube.personalCubeId}/lecture-card/${lectureCardId}/posts`}
            emptyMessage="내가 작성한 글이 없습니다."
            routeToPost={() => this.props.history.push(`/lecture/college/${collegeId}/cube/${personalCube.personalCubeId}/lecture-card/${lectureCardId}/posts/new`)}
          />
        );
      default:
        return null;
    }
  }

  render() {
    //
    const { collegeService, personalCubeService, reviewService } = this.props;
    const { college } = collegeService;
    const { personalCube } = personalCubeService;
    const { reviewSummary } = reviewService;
    const viewObject = this.getViewObject();
    const typeViewObject = this.getTypeViewObject();

    return (
      <ContentLayout
        className="channel"
        breadcrumb={[
          { text: `${college.name} College`, path: routePaths.collegeLectures(college.collegeId) },
          { text: `${college.name} Lecture` },
        ]}
      >
        <LectureCardHeaderView
          viewObject={viewObject}
          typeViewObject={typeViewObject}
          maxRating={reviewSummary.maxStarCount}
          rating={reviewSummary.average}
        />
        {
          typeViewObject.videoUrl && (
            <div className="between-section">
              <div className="cont-inner" style={{ height: '480px' }}>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <iframe
                  title={typeViewObject.videoUrl}
                  src={typeViewObject.videoUrl}
                  width="854"
                  height="480"
                  style={{padding: '0px', border: '0px'}}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay"
                />
                {/*<video width="854" height="480" id="video1">*/}
                {/*  <source src={typeViewObject.videoUrl} type="video/mp4" />*/}
                {/*</video>*/}
                {/*<img src={typeViewObject.videoUrl} />*/}
              </div>
            </div>
          ) || null
        }

        <ContentMenu
          menus={this.getMenus()}
          type={this.state.type}
          onSelectMenu={(type) => this.setState({ type })}
        />

        <LectureCardContainer
          cubeType={personalCube.contents.type}
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
