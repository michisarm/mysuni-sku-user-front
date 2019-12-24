import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Segment } from 'semantic-ui-react';
import { Lecture, mobxHelper } from 'shared';
import { CoursePlanService } from 'course';
import {
  CourseLectureService,
  LectureService,
  LectureServiceType,
  ProgramLectureService,
  LectureViewModel,
} from '../../../shared';


interface Props extends RouteComponentProps<{ coursePlanId: string, serviceType: LectureServiceType, serviceId: string }> {
  lectureService?: LectureService,
  programLectureService?: ProgramLectureService,
  courseLectureService?:  CourseLectureService,
  coursePlanService?: CoursePlanService,
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
    const { serviceId, serviceType, coursePlanId, cubeId } = lecture;

    if (serviceType === LectureServiceType.Program || serviceType === LectureServiceType.Course) {
      this.props.history.push(`../../${coursePlanId}/${serviceType}/${serviceId}`);
    }
    else if (serviceType === LectureServiceType.Card) {
      this.props.history.push(`../../../cube/${cubeId}/lecture-card/${serviceId}`);
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
