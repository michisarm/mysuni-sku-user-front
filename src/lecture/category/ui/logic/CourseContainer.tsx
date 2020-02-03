import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import queryString from 'query-string';
import { Segment } from 'semantic-ui-react';
import { CoursePlanService } from 'course';
import {
  CourseLectureService,
  LectureService,
  ProgramLectureService,
  LectureServiceType,
  LectureViewModel,
  Lecture,
} from '../../../shared';
import routePaths from '../../../routePaths';
import SkProfileService from '../../../../profile/present/logic/SkProfileService';


interface Props extends RouteComponentProps<RouteParams> {
  skProfileService?: SkProfileService,
  lectureService?: LectureService,
  programLectureService?: ProgramLectureService,
  courseLectureService?:  CourseLectureService,
  coursePlanService?: CoursePlanService,
  lectureCardId : string
}

interface RouteParams {
  cineroomId: string,
  collegeId: string,
  coursePlanId: string,
  serviceType: LectureServiceType,
  serviceId: string
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
class CourseContainer extends Component<Props> {
  //
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

  render() {
    //
    const {
      skProfileService,
      lectureService,
      lectureCardId,
      match,
    } = this.props;
    const { params } = match;
    const { skProfile } = skProfileService!;
    const { member } = skProfile;
    const { lectureViews, getSubLectureViews } = lectureService!;

    return (
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
                />
              )}
            </Lecture.CourseSection>
          ))}
        </Lecture.Group>
      </Segment>
    );
  }
}

export default withRouter(CourseContainer);
