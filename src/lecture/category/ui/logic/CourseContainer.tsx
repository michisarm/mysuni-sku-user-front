import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Segment } from 'semantic-ui-react';
import SkProfileService from 'profile/present/logic/SkProfileService';
import { CoursePlanService } from 'course/stores';
import { LectureServiceType, LectureViewModel, StudentCdoModel } from '../../../model';
import { CourseLectureService, LectureService, ProgramLectureService } from '../../../stores';
import routePaths from '../../../routePaths';
import { Lecture } from '../../../shared';
import LectureLearningModalView from '../view/LectureLearningModalView';

interface Props extends RouteComponentProps<RouteParams> {
  skProfileService?: SkProfileService,
  lectureService?: LectureService,
  programLectureService?: ProgramLectureService,
  courseLectureService?:  CourseLectureService,
  coursePlanService?: CoursePlanService,
  lectureCardId : string,
  onRefreshLearningState?: () => void,
  onPageRefresh?:() => void,
}

interface RouteParams {
  cineroomId: string,
  collegeId: string,
  coursePlanId: string,
  serviceType: LectureServiceType,
  serviceId: string
}

interface State {
  openLearnModal: boolean
}

@inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'lecture.lectureService',
  'lecture.programLectureService',
  'lecture.courseLectureService',
  'course.coursePlanService',
))
@reactAutobind
@observer
class CourseContainer extends Component<Props, State> {
  //
  static defaultProps = {
    onRefreshLearningState: () => {},
  };

  lectureLearningModal: any = null;
  learningVideoUrl: string = '';
  learnStudentCdo: StudentCdoModel | null = null;


  state = {
    openLearnModal: false,
  };

  componentDidMount() {
    //
    this.findCoursePlan();
    this.findSkProfile();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.match.params.coursePlanId !== this.props.match.params.coursePlanId) {
      this.findCoursePlan();
    }
  }

  async findCoursePlan() {
    //
    const { match, coursePlanService } = this.props;

    const coursePlan = await coursePlanService!.findCoursePlan(match.params.coursePlanId);

    if (coursePlan) {
      coursePlanService!.findCoursePlanContents(coursePlan.contentsId);
    }
  }

  async findSkProfile()
  {
    const { skProfileService } = this.props;
    await skProfileService!.findSkProfile();
  }

  onViewDetail(lecture: LectureViewModel) {
    //
    const { cubeId, coursePlanId, serviceId, serviceType } = lecture;
    const { match, history, location } = this.props;
    const { params } = match;
    const { search } = location;

    // Program -> Course
    if (serviceType === LectureServiceType.Course) {
      if (params.cineroomId) {
        history.push(routePaths.courseOverview(params.cineroomId, params.collegeId, coursePlanId, serviceType, serviceId, {
          programLectureId: params.serviceId,
        }));
      }
      else {
        history.push(routePaths.courseOverviewPrev(params.collegeId, coursePlanId, serviceType, serviceId, {
          programLectureId: params.serviceId,
        }));
      }
    }
    else if (serviceType === LectureServiceType.Card) {
      // Program -> Card
      if (params.serviceType === LectureServiceType.Program) {

        if (params.cineroomId) {
          history.push(routePaths.lectureCardOverview(params.cineroomId, params.collegeId, cubeId, serviceId, {
            programLectureId: params.serviceId,
          }));
        }
        else {
          history.push(routePaths.lectureCardOverviewPrev(params.collegeId, cubeId, serviceId, {
            programLectureId: params.serviceId,
          }));
        }
      }
      // Course -> Card
      else {
        const queryParam = queryString.parse(search);

        if (params.cineroomId) {
          history.push(routePaths.lectureCardOverview(params.cineroomId, params.collegeId, cubeId, serviceId, {
            programLectureId: queryParam.programLectureId as string,
            courseLectureId: params.serviceId,
          }));
        }
        else {
          history.push(routePaths.lectureCardOverviewPrev(params.collegeId, cubeId, serviceId, {
            programLectureId: queryParam.programLectureId as string,
            courseLectureId: params.serviceId,
          }));
        }
      }
    }
  }

  // 학습하기 - 학습 모달창 팝업
  onDoLearn(videoUrl: string, studentCdo: StudentCdoModel):void {
    this.learningVideoUrl = videoUrl;
    this.learnStudentCdo = studentCdo;
    this.setState({
      openLearnModal: true,
    });
  }

  // 학습 모달창 닫기 - 학습통계정보 저장
  onLearningModalClose() {
    const { lectureService, onPageRefresh } = this.props;
    if (this.learnStudentCdo) {
      lectureService?.confirmUsageStatisticsByCardId(this.learnStudentCdo)
        .then((confirmed) => {
          if (onPageRefresh) {
            onPageRefresh();
          }
        });
    }

    this.learningVideoUrl = '';
    this.learnStudentCdo = null;
    this.setState({
      openLearnModal: false,
    });
  }

  render() {
    //
    const {
      skProfileService,
      lectureService,
      lectureCardId,
      match,
      onRefreshLearningState,
    } = this.props;
    const { params } = match;
    const { skProfile } = skProfileService!;
    const { member } = skProfile;
    const { lectureViews, getSubLectureViews } = lectureService!;
    const { openLearnModal } = this.state;
    return (
      <>
        <Segment className="full">
          <Lecture.Group type={Lecture.GroupType.Course}>
            {lectureViews.map((lecture: LectureViewModel, index: number) => (
              <Lecture.CourseSection
                key={`course-${index}`}
                lecture={(
                  <Lecture.Course
                    className="first"
                    lectureView={lecture}
                    thumbnailImage={lecture.baseUrl || undefined}
                    toggle={lecture.serviceType === LectureServiceType.Program || lecture.serviceType === LectureServiceType.Course}
                    onViewDetail={() => this.onViewDetail(lecture)}

                    collegeId={params.collegeId}
                    lectureCardId={lectureCardId}
                    member={member}
                    onRefreshLearningState={onRefreshLearningState}
                    onDoLearn={this.onDoLearn}
                  />
                )}
              >
                {getSubLectureViews(lecture.id).map((subLecture, index) =>
                  <Lecture.Course
                    key={`sub-lecture-${index}`}
                    className="included"
                    lectureView={subLecture}
                    thumbnailImage={subLecture.baseUrl || undefined}
                    onViewDetail={() => this.onViewDetail(subLecture)}

                    collegeId={params.collegeId}
                    lectureCardId={lectureCardId}
                    member={member}
                    onRefreshLearningState={onRefreshLearningState}
                    onDoLearn={this.onDoLearn}
                  />
                )}
              </Lecture.CourseSection>
            ))}
          </Lecture.Group>
        </Segment>
        {
          openLearnModal && (
            <LectureLearningModalView
              ref={lectureLearningModal => this.lectureLearningModal = lectureLearningModal }
              videoUrl={this.learningVideoUrl}
              onClose={this.onLearningModalClose}
            />
          )
        }
      </>
    );
  }
}

export default withRouter(CourseContainer);
