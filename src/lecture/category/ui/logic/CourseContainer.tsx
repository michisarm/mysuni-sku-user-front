import React, { Component } from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Segment } from 'semantic-ui-react';
import SkProfileService from 'profile/present/logic/SkProfileService';
import { CoursePlanService } from 'course/stores';
import { ActionEventService } from 'shared/stores';
import { CubeType } from 'personalcube/personalcube/model';
import {
  LectureServiceType,
  LectureViewModel,
  StudentCdoModel,
} from '../../../model';
import {
  CourseLectureService,
  LectureService,
  ProgramLectureService,
} from '../../../stores';
import routePaths from '../../../routePaths';
import { Lecture } from '../../../shared';
import LectureLearningModalView from '../view/LectureLearningModalView';
import ProposalState from '../../../../shared/model/ProposalState';
import StudyActionType from '../../../../shared/model/StudyActionType';

interface Props extends RouteComponentProps<RouteParams> {
  actionEventService?: ActionEventService;
  skProfileService?: SkProfileService;
  lectureService?: LectureService;
  programLectureService?: ProgramLectureService;
  courseLectureService?: CourseLectureService;
  coursePlanService?: CoursePlanService;
  lectureCardId: string;
  onRefreshLearningState?: () => void;
  onPageRefresh?: () => void;
}

interface RouteParams {
  cineroomId: string;
  collegeId: string;
  coursePlanId: string;
  serviceType: LectureServiceType;
  serviceId: string;
}

interface State {
  openLearnModal: boolean;
}

@inject(
  mobxHelper.injectFrom(
    'shared.actionEventService',
    'profile.skProfileService',
    'lecture.lectureService',
    'lecture.programLectureService',
    'lecture.courseLectureService',
    'course.coursePlanService'
  )
)
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
  lectureView: LectureViewModel = new LectureViewModel();

  state = {
    openLearnModal: false,
  };

  componentDidMount() {
    // 이미 CoursePage에서 호출하고 있어서 주석처리
    // this.findCoursePlan();
    this.findSkProfile();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (
      prevProps.match.params.coursePlanId !==
      this.props.match.params.coursePlanId
    ) {
      this.findCoursePlan();
    }
  }

  async findCoursePlan() {
    //
    const { match, coursePlanService } = this.props;

    const coursePlan = await coursePlanService!.findCoursePlan(
      match.params.coursePlanId
    );

    if (coursePlan) {
      coursePlanService!.findCoursePlanContents(coursePlan.contentsId);
    }
  }

  async findSkProfile() {
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
        // this.publishViewEvent('viewDetail', routePaths.courseOverview(params.cineroomId, params.collegeId, coursePlanId, serviceType, serviceId, {
        //   programLectureId: params.serviceId,
        // }));
        history.push(
          routePaths.courseOverview(
            params.cineroomId,
            params.collegeId,
            coursePlanId,
            serviceType,
            serviceId,
            {
              programLectureId: params.serviceId,
            }
          )
        );
      } else {
        // this.publishViewEvent('viewDetail', routePaths.courseOverviewPrev(params.collegeId, coursePlanId, serviceType, serviceId, {
        //   programLectureId: params.serviceId,
        // }));
        history.push(
          routePaths.courseOverviewPrev(
            params.collegeId,
            coursePlanId,
            serviceType,
            serviceId,
            {
              programLectureId: params.serviceId,
            }
          )
        );
      }
    } else if (serviceType === LectureServiceType.Card) {
      // Program -> Card
      if (params.serviceType === LectureServiceType.Program) {
        if (params.cineroomId) {
          // this.publishViewEvent('viewDetail', routePaths.lectureCardOverview(params.cineroomId, params.collegeId, cubeId, serviceId, {
          //   programLectureId: params.serviceId,
          // }));
          history.push(
            routePaths.lectureCardOverview(
              params.cineroomId,
              params.collegeId,
              cubeId,
              serviceId,
              {
                programLectureId: params.serviceId,
              }
            )
          );
        } else {
          // this.publishViewEvent('viewDetail', routePaths.lectureCardOverviewPrev(params.collegeId, cubeId, serviceId, {
          //   programLectureId: params.serviceId,
          // }));
          history.push(
            routePaths.lectureCardOverviewPrev(
              params.collegeId,
              cubeId,
              serviceId,
              {
                programLectureId: params.serviceId,
              }
            )
          );
        }
      }
      // Course -> Card
      else {
        const queryParam = queryString.parse(search);

        if (params.cineroomId) {
          // this.publishViewEvent('viewDetail', routePaths.lectureCardOverview(params.cineroomId, params.collegeId, cubeId, serviceId, {
          //   programLectureId: queryParam.programLectureId as string,
          //   courseLectureId: params.serviceId,
          // }));
          history.push(
            routePaths.lectureCardOverview(
              params.cineroomId,
              params.collegeId,
              cubeId,
              serviceId,
              {
                programLectureId: queryParam.programLectureId as string,
                courseLectureId: params.serviceId,
              }
            )
          );
        } else {
          // this.publishViewEvent('viewDetail', routePaths.lectureCardOverviewPrev(params.collegeId, cubeId, serviceId, {
          //   programLectureId: queryParam.programLectureId as string,
          //   courseLectureId: params.serviceId,
          // }));
          history.push(
            routePaths.lectureCardOverviewPrev(
              params.collegeId,
              cubeId,
              serviceId,
              {
                programLectureId: queryParam.programLectureId as string,
                courseLectureId: params.serviceId,
              }
            )
          );
        }
      }
    }
  }

  publishStudyEvent() {
    const {
      actionEventService,
      coursePlanService,
      match,
      lectureCardId,
    } = this.props;
    const { collegeId, coursePlanId, serviceType } = match.params;
    const { cubeId, cubeType, name } = this.lectureView;

    const courseName = coursePlanService!.coursePlan.name;
    const cubeName = name;

    let action = StudyActionType.None;
    const menu = 'ModalClose';

    switch (cubeType) {
      case CubeType.Video: {
        action = StudyActionType.VideoClose;
        break;
      }

      case CubeType.Audio: {
        action = StudyActionType.AudioClose;
        break;
      }
    }

    actionEventService?.registerStudyActionLog({
      action,
      serviceType,
      collegeId,
      cubeId,
      lectureCardId,
      coursePlanId,
      menu,
      courseName,
      cubeName,
    });
  }

  publishViewEvent(menu: string, path?: string) {
    const { actionEventService } = this.props;
    actionEventService?.registerViewActionLog({ menu, path });
  }

  // 학습하기 - 학습 모달창 팝업
  onDoLearn(
    videoUrl: string,
    studentCdo: StudentCdoModel,
    lectureView?: LectureViewModel
  ): void {
    if (lectureView) this.lectureView = lectureView;
    this.learningVideoUrl = videoUrl;
    studentCdo.proposalState = ProposalState.Approved;
    this.learnStudentCdo = studentCdo;
    this.setState({
      openLearnModal: true,
    });
  }

  // 학습 모달창 닫기 - 학습통계정보 저장
  onLearningModalClose() {
    this.publishStudyEvent();
    const { lectureService, onPageRefresh } = this.props;
    if (this.learnStudentCdo) {
      const studentCdo = {
        ...this.learnStudentCdo,
        proposalState: ProposalState.Approved,
      };
      lectureService
        ?.confirmUsageStatisticsByCardId(studentCdo)
        .then(confirmed => {
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
                lecture={
                  <Lecture.Course
                    className="first"
                    lectureView={lecture}
                    thumbnailImage={lecture.baseUrl || undefined}
                    toggle={
                      lecture.serviceType === LectureServiceType.Program ||
                      lecture.serviceType === LectureServiceType.Course
                    }
                    onViewDetail={() => this.onViewDetail(lecture)}
                    collegeId={params.collegeId}
                    lectureCardId={lectureCardId}
                    member={member}
                    onRefreshLearningState={onRefreshLearningState}
                    onDoLearn={this.onDoLearn}
                    serviceType={lecture.serviceType}
                    coursePlanId={params.coursePlanId}
                    courseServiceType={params.serviceType}
                  />
                }
              >
                111111111111111111111111
                {getSubLectureViews(lecture.id).map((subLecture, index) => (
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
                    serviceType={lecture.serviceType}
                    coursePlanId={params.coursePlanId}
                    courseServiceType={params.serviceType}
                  />
                ))}
              </Lecture.CourseSection>
            ))}
          </Lecture.Group>
        </Segment>
        {openLearnModal && (
          <LectureLearningModalView
            ref={lectureLearningModal =>
              (this.lectureLearningModal = lectureLearningModal)
            }
            videoUrl={this.learningVideoUrl}
            onClose={this.onLearningModalClose}
          />
        )}
      </>
    );
  }
}

export default withRouter(CourseContainer);
