import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import queryString from 'query-string';
import { Segment } from 'semantic-ui-react';
import { mobxHelper } from 'shared';
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


interface Props extends RouteComponentProps<RouteParams> {
  lectureService?: LectureService,
  programLectureService?: ProgramLectureService,
  courseLectureService?:  CourseLectureService,
  coursePlanService?: CoursePlanService,
}

interface RouteParams {
  collegeId: string,
  coursePlanId: string,
  serviceType: LectureServiceType,
  serviceId: string
}

@inject(mobxHelper.injectFrom(
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

  onViewDetail(lecture: LectureViewModel) {
    //
    const { cubeId, coursePlanId, serviceId, serviceType } = lecture;
    const { match, history, location } = this.props;
    const { params } = match;
    const { search } = location;

    // Program -> Course
    if (serviceType === LectureServiceType.Course) {
      history.push(routePaths.courseOverview(params.collegeId, coursePlanId, serviceType, serviceId, {
        programLectureId: params.serviceId,
      }));
    }
    else if (serviceType === LectureServiceType.Card) {
      // Program -> Card
      if (params.serviceType === LectureServiceType.Program) {
        history.push(routePaths.lectureCardOverview(params.collegeId, cubeId, serviceId, {
          programLectureId: params.serviceId,
        }));
      }
      // Course -> Card
      else {
        const queryParam = queryString.parse(search);

        history.push(routePaths.lectureCardOverview(params.collegeId, cubeId, serviceId, {
          programLectureId: queryParam.programLectureId as string,
          courseLectureId: params.serviceId,
        }));
      }
    }
  }

  render() {
    //
    const { lectureService } = this.props;
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
                  toggle={lecture.serviceType === LectureServiceType.Program || lecture.serviceType === LectureServiceType.Course}
                  onViewDetail={() => this.onViewDetail(lecture)}
                />
              )}
            >
              {getSubLectureViews(lecture.id).map((subLecture, index) =>
                <Lecture.Course
                  key={`sub-lecture-${index}`}
                  className="included"
                  lectureView={subLecture}
                  onViewDetail={() => this.onViewDetail(subLecture)}
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
