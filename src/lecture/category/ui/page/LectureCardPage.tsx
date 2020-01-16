import React, { Component } from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Label } from 'semantic-ui-react';

import { ReviewService } from '@nara.drama/feedback';
import { PostList, PostListByWriter } from '@sku/personalcube';
import { ContentLayout, ContentMenu, CubeType, ProposalState, LearningState } from 'shared';
import { SkProfileService } from 'profile';
import { CollegeService } from 'college';
import { ContentsServiceType, CubeTypeNameType, PersonalCubeService } from 'personalcube/personalcube';
import { BoardService } from 'personalcube/board';
import { CubeIntroService } from 'personalcube/cubeintro';
import { ClassroomService } from 'personalcube/classroom';
import { MediaService, MediaType } from 'personalcube/media';
import { OfficeWebService } from 'personalcube/officeweb';
import {
  LectureCardService,
  LectureService,
  LectureServiceType,
  RollBookService,
  StudentCdoModel,
  StudentCountRdoModel,
  StudentService,
} from 'lecture';
import { CourseSetModel, LearningCardService } from 'course';
import { InMyLectureCdoModel, InMyLectureService } from 'myTraining';
import routePaths from '../../../routePaths';
import LectureCardHeaderView from '../view/LectureCardHeaderView';
import LectureCardContainer from '../logic/LectureCardContainer';
import LectureOverviewView from '../view/LectureOverviewView';
import LectureCommentsContainer from '../logic/LectureCommentsContainer';
import { State as SubState } from '../../../shared/LectureSubInfo';
import StudentJoinRdoModel from '../../../shared/model/StudentJoinRdoModel';
import LinkedInModalContainer from '../logic/LinkedInModalContainer';


interface Props extends RouteComponentProps<{ collegeId: string, cubeId: string, lectureCardId: string }> {
  skProfileService: SkProfileService,
  collegeService: CollegeService,
  personalCubeService: PersonalCubeService,
  cubeIntroService: CubeIntroService,
  classroomService: ClassroomService,
  mediaService: MediaService,
  officeWebService: OfficeWebService,
  boardService: BoardService,
  lectureCardService: LectureCardService,
  lectureService: LectureService,
  rollBookService: RollBookService,
  studentService: StudentService,
  learningCardService: LearningCardService,
  reviewService: ReviewService,
  inMyLectureService?: InMyLectureService,
}

interface State {
  type: string
  linkedInOpen: boolean
}

@inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'college.collegeService',
  'personalCube.personalCubeService',
  'personalCube.cubeIntroService',
  'personalCube.classroomService',
  'personalCube.mediaService',
  'personalCube.officeWebService',
  'personalCube.boardService',
  'lecture.lectureCardService',
  'lecture.lectureService',
  'lecture.rollBookService',
  'lecture.studentService',
  'course.learningCardService',
  'shared.reviewService',
  'myTraining.inMyLectureService',
))
@reactAutobind
@observer
class LectureCardPage extends Component<Props, State> {
  //
  state= {
    type: 'Overview',
    linkedInOpen: false,
  };

  constructor(props: Props) {
    //
    super(props);
    props.personalCubeService.clearPersonalCube();
  }


  componentDidMount() {
    //
    this.init();
  }

  async init() {
    const {
      match, history, skProfileService, collegeService, personalCubeService, cubeIntroService, classroomService, reviewService, studentService,
      rollBookService, mediaService, officeWebService, boardService, lectureService, lectureCardService, inMyLectureService,
    } = this.props;
    const { params } = match;

    skProfileService.findSkProfile();
    lectureService.confirmUsageStatisticsByCardId(params.lectureCardId)
      .then((confirmed) => {
        if (confirmed) {
          history.replace('/empty');
          setTimeout(() => history.replace(routePaths.lectureCardOverview(params.collegeId, params.cubeId, params.lectureCardId)));
        }
      });


    collegeService.findCollege(params.collegeId);
    rollBookService!.findAllLecturesByLectureCardId(params.lectureCardId)
      .then(rollBooks => {
        rollBooks.map(rollBook => studentService!.findStudentCount(rollBook.id));
      });

    lectureCardService.findLectureCard(params.lectureCardId)
      .then((lectureCard) => {
        reviewService.findReviewSummary(lectureCard!.reviewId);
        inMyLectureService!.findInMyLecture(lectureCard!.usid, LectureServiceType.Card);
      });

    const personalCube = await personalCubeService.findPersonalCube(params.cubeId);
    await studentService.findIsJsonStudent(params.lectureCardId);

    if (personalCube) {
      const { service, contents } = personalCube.contents;

      await cubeIntroService.findCubeIntro(personalCube.cubeIntro.id);
      if (service.type === ContentsServiceType.Classroom) {
        await classroomService.findClassrooms(personalCube.personalCubeId);
      }
      else if (service.type === ContentsServiceType.Media) {
        mediaService.findMedia(contents.id).then((media) => {
          if (media.mediaType === MediaType.ContentsProviderMedia && media.mediaContents.contentsProvider.isLinkedInType) {
            this.setState({ linkedInOpen: true });
          }
        });
      }
      else if (service.type === ContentsServiceType.OfficeWeb) {
        officeWebService.findOfficeWeb(contents.id);
      }
      else if (service.type === ContentsServiceType.Community) {
        boardService.findBoard(contents.id);
        this.setState({ type: 'Posts' });
      }
    }
    this.findStudent();
  }

  compare(join1: StudentJoinRdoModel, join2: StudentJoinRdoModel) {
    if (join1.updateTime < join2.updateTime) return 1;
    return -1;
  }

  getStudentJoin() {
    const {
      studentService,
    } = this.props;
    const { studentJoins }: StudentService = studentService!;

    if (studentJoins && studentJoins.length) {
      studentJoins.sort(this.compare);
      const studentJoin = studentJoins[0];
      return studentJoin;
    }
    return null;
  }

  findStudent() {
    const {
      studentService,
    } = this.props;
    const { studentJoins }: StudentService = studentService!;

    if (studentJoins && studentJoins.length) {
      const studentJoin = this.getStudentJoin();
      if (studentJoin) studentService!.findStudent(studentJoin.rollbookId);
    }
  }


  getViewObject() {
    //
    const {
      personalCubeService, cubeIntroService, studentService, classroomService,
    } = this.props;
    const { personalCube } = personalCubeService!;
    const { cubeIntro } = cubeIntroService!;
    const { studentCounts, student }: StudentService = studentService!;
    const { classrooms } = classroomService!;
    const studentJoin = this.getStudentJoin();

    let participantCount = 0;
    studentCounts!.map((studentCount: StudentCountRdoModel) => {
      participantCount += studentCount.approvedCount;
    });

    let state: SubState | undefined;
    let examId: string = '';
    if (studentJoin) {
      if (student.proposalState === ProposalState.Submitted) state = SubState.WaitingForApproval;
      if (student.proposalState === ProposalState.Approved) {
        if (!student.learningState) state = SubState.Enrolled;
        if (student.learningState === LearningState.Progress) state = SubState.InProgress;
        if (student.learningState === LearningState.Passed) {
          state = SubState.Completed;
          if (personalCube.contents.type === CubeType.ELearning || personalCube.contents.type === CubeType.ClassRoomLecture) {
            const index = classrooms.map(classroom => classroom.round).findIndex(round => round === studentJoin.round);
            if (index) examId = classrooms[index].roundExamId;
          }
          else {
            examId = personalCube.contents.examId || '';
          }
        }
        if (student.learningState === LearningState.Missed) state = SubState.Missed;
        if (personalCube.contents.type === CubeType.Community) state = SubState.Joined;
      }
      if(student.proposalState === ProposalState.Rejected) state = SubState.Rejected;
    }

    return {
      // Sub info
      required: personalCube.required,
      difficultyLevel: cubeIntro.difficultyLevel,
      learningTime: cubeIntro.learningTime,
      participantCount,

      instructorName: cubeIntro.description.instructor.name,
      operatorName: cubeIntro.operation.operator.name,
      operatorCompany: cubeIntro.operation.operator.company,
      operatorEmail: cubeIntro.operation.operator.email,

      state: state || undefined,
      examId,

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
      thumbnailImage: personalCube.iconBox.baseUrl || '',
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
    const studentJoin = this.getStudentJoin();

    let classroom = null;
    let siteUrl = '';

    if (classrooms.length) {
      if (classrooms.length === 1) {
        classroom = classrooms[0];
        if (!classroom.enrolling.enrollingAvailable) siteUrl = classroom.operation.siteUrl;
      }
      else {
        //TODO 가장 가까운날짜
        classroom = classrooms[classrooms.length - 1];
      }
    }
    if (studentJoin && studentJoin.learningState === LearningState.Progress) {
      const index = classrooms.map(classroom => classroom.round).findIndex(round => round === studentJoin.round);
      if (index >= 0) {
        siteUrl = classrooms[index].operation.siteUrl;
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
      siteUrl,
    };
  }

  getMediaViewObject() {
    //
    const { media } = this.props.mediaService!;
    const { personalCube } = this.props.personalCubeService!;
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
      case MediaType.InternalMediaUpload:
        videoUrl = media.mediaContents.internalMedias.length ? media.mediaContents.internalMedias[0].viewUrl : '';
        url = media.mediaContents.internalMedias.length ? media.mediaContents.internalMedias[0].viewUrl : '';

        if (personalCube.contents.type === CubeType.Video && videoUrl && url) {
          videoUrl += '&offerviewer=false&showtitle=false';
          url += '&offerviewer=false&showtitle=false';
        }
        else if (personalCube.contents.type === CubeType.Audio && videoUrl && url) {
          videoUrl += '&offerviewer=false&interactivity=none&showtitle=false';
          url += '&offerviewer=false&interactivity=none&showtitle=false';
        }
        break;
    }

    return {
      mediaType: media.mediaType,
      url,
      videoUrl,
      learningPeriod: {
        startDate: media.learningPeriod.startDateDot,
        endDate: media.learningPeriod.endDateDot,
      },
    };
  }

  getOfficeWebViewObject() {
    //
    const { officeWeb } = this.props.officeWebService;
    return {
      fileBoxId: officeWeb.fileBoxId,
      learningPeriod: {
        startDate: officeWeb.learningPeriod.startDateDot,
        endDate: officeWeb.learningPeriod.endDateDot,
      },
      url: officeWeb.webPageUrl,
    };
  }

  getCommunityViewObject() {
    //
    const { board } = this.props.boardService;
    return {
      learningPeriod: {
        startDate: board.learningPeriod.startDateDot,
        endDate: board.learningPeriod.startDateDot,
      },
    };
  }

  getInMyLectureCdo(): InMyLectureCdoModel {
    const {
      personalCubeService, lectureCardService, cubeIntroService,
    } = this.props;
    const { personalCube } = personalCubeService!;
    const { cubeIntro } = cubeIntroService!;
    const { lectureCard } = lectureCardService!;
    return new InMyLectureCdoModel({
      serviceType: LectureServiceType.Card,
      serviceId: lectureCard.usid,
      category: personalCube.category,
      name: personalCube.name,
      description: cubeIntro.description.description,
      cubeType: personalCube.contents.type,
      learningTime: cubeIntro.learningTime,
      stampCount: 0,
      coursePlanId: '',
      requiredSubsidiaries: personalCube.requiredSubsidiaries,
      cubeId: personalCube.personalCubeId,
      courseSetJson: new CourseSetModel(),
      courseLectureUsids: [],
      lectureCardUsids: [],
      reviewId: lectureCard.reviewId,
    });
  }

  getStudentCdo(): StudentCdoModel {
    const {
      skProfileService, rollBookService, boardService,
    } = this.props;
    const { skProfile } = skProfileService!;
    const { rollBooks } = rollBookService!;
    const { member } = skProfile;
    return new StudentCdoModel({
      rollBookId: rollBooks.length ? rollBooks[0].id : '',
      name: member.name,
      email: member.email,
      company: member.company,
      department: member.department,
      proposalState: ProposalState.Submitted,
      programLectureUsid: '',
      courseLectureUsid: '',
      enClosed: boardService!.board!.boardConfig!.enClosed,
    });
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
    const { student } = this.props.studentService;
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
            emptyMessage="Community에 등록된 글이 없습니다."
            linkedUrl={`${process.env.PUBLIC_URL}/lecture/college/${collegeId}/cube/${personalCube.personalCubeId}/lecture-card/${lectureCardId}/posts`}
            routeToPost={
              student && student.id ? () => this.props.history.push(`/lecture/college/${collegeId}/cube/${personalCube.personalCubeId}/lecture-card/${lectureCardId}/posts/new`) : undefined
            }
            type={PostList.ListType.Basic}
          />
        );
      case 'MyPosts':
        return (
          <PostListByWriter
            boardId={personalCube.contents.contents.id}
            linkedUrl={`${process.env.PUBLIC_URL}/lecture/college/${collegeId}/cube/${personalCube.personalCubeId}/lecture-card/${lectureCardId}/posts`}
            emptyMessage="내가 작성한 글이 없습니다."
            routeToPost={
              student && student.id ? () => this.props.history.push(`/lecture/college/${collegeId}/cube/${personalCube.personalCubeId}/lecture-card/${lectureCardId}/posts/new`) : undefined
            }
          />
        );
      default:
        return null;
    }
  }

  render() {
    //
    const { collegeService, personalCubeService, reviewService, inMyLectureService, studentService } = this.props;
    const { linkedInOpen } = this.state;
    const { college } = collegeService;
    const { personalCube } = personalCubeService;
    const { reviewSummary } = reviewService;
    const { inMyLecture } = inMyLectureService!;
    const { student, studentJoins } = studentService!;
    const { lectureCardId } = this.props.match.params!;
    const viewObject = this.getViewObject();
    const typeViewObject = this.getTypeViewObject();
    const inMyLectureCdo = this.getInMyLectureCdo();
    const studentCdo = this.getStudentCdo();

    return (
      <ContentLayout
        className="channel"
        breadcrumb={[
          { text: `${college.name} College`, path: routePaths.collegeLectures(college.collegeId) },
          { text: `${personalCube.category.channel.name} Channel`, path: routePaths.channelLectures(college.collegeId, personalCube.category.channel.id) },
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
            <>
              <div className="cont-inner">
                <div className="ml17">
                  ※ 동영상 학습 시간은 익일 혹은 컨텐츠 재방문시 반영됩니다.
                </div>
              </div>
              <div className="between-section">
                <div className={`cont-inner ${viewObject.cubeType === CubeType.Audio ? 'audio-type' : ''}`}>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <iframe
                    title={typeViewObject.videoUrl}
                    src={typeViewObject.videoUrl}
                    width="854"
                    height="480"
                    style={{ padding: '0px', border: '0px' }}
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
            </>
          ) || null
        }

        <ContentMenu
          menus={this.getMenus()}
          type={this.state.type}
          onSelectMenu={(type) => this.setState({ type })}
          lectureHeader={
            <div className="cont-inner summary">
              <Label color={viewObject.category.color}>{viewObject.category.college.name}</Label>
              <span className="detail-tit">{viewObject.name}</span>
            </div>
          }
        >
          <LectureCardContainer
            inMyLecture={inMyLecture}
            inMyLectureCdo={inMyLectureCdo}
            studentCdo={studentCdo}
            studentJoins={studentJoins}
            student={student}
            lectureCardId={lectureCardId}
            cubeType={personalCube.contents.type}
            viewObject={viewObject}
            typeViewObject={typeViewObject}
            init={this.init}
          >
            { this.renderChildren(viewObject, typeViewObject) }
          </LectureCardContainer>
        </ContentMenu>

        <LinkedInModalContainer
          enabled={linkedInOpen}
        />
      </ContentLayout>
    );
  }
}

export default withRouter(LectureCardPage);
