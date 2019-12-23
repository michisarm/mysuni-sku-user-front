import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Segment } from 'semantic-ui-react';
import { IdName, Lecture, mobxHelper } from 'shared';
import { CubeTypeNameType } from 'personalcube/personalcube';
import { CoursePlanService, CourseSetType } from 'course';
import { CourseLectureService, LectureModel, LectureServiceType, ProgramLectureService } from '../../../shared';


interface Props extends RouteComponentProps<{ coursePlanId: string, serviceType: LectureServiceType, serviceId: string }> {
  programLectureService?: ProgramLectureService,
  courseLectureService?:  CourseLectureService,
  coursePlanService?: CoursePlanService,
}

@inject(mobxHelper.injectFrom(
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
    this.findCourseLecture();
    this.findCoursePlan();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.match.params.coursePlanId !== this.props.match.params.coursePlanId) {
      this.findCourseLecture();
      this.findCoursePlan();
    }
  }

  async findCourseLecture() {
    //
    const { match, programLectureService, courseLectureService } = this.props;

    if (match.params.serviceType === LectureServiceType.Program) {
      console.log('This is programs');
    }
    else {
      console.log('This is Course');
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

  onViewDetail(type: CourseSetType, id: string) {
    //
    if (type === CourseSetType.Program) {
      this.props.history.push(`./${id}`);
    }
    else if (type === CourseSetType.Card) {
      this.props.history.push(`../../../cube/todo-cube-id/lecture-card/${id}`);
    }
  }

  renderProgramSet() {
    //
    const { coursePlanService } = this.props;
    const { coursePlanContents } = coursePlanService!;
    const programSet = coursePlanContents.courseSet.programSet;

    const mockLecture = new LectureModel();

    console.log('programSet', programSet);

    return (
      <>
        {programSet.courses.map((course: IdName, index: number) => (
          <Lecture
            key={`course-${index}`}
            lecture={{
              ...mockLecture,
              name: course.name,
              cubeTypeName: CubeTypeNameType.Course,
            }}
            toggle
            onViewDetail={() => this.onViewDetail(CourseSetType.Program, course.id)}
          />
        ))}
        {programSet.cards.map((card: IdName, index: number) => (
          <Lecture
            key={`course-${index}`}
            lecture={{
              ...mockLecture,
              name: card.name,
              cubeTypeName: CubeTypeNameType.Card,
            }}
            onViewDetail={() => this.onViewDetail(CourseSetType.Card, card.id)}
          />
        ))}
      </>
    );
  }

  renderCourseSet() {
    //
    const { coursePlanService } = this.props;
    const { coursePlanContents } = coursePlanService!;
    const learningCardSet = coursePlanContents.courseSet.learningCardSet;

    const mockLecture = new LectureModel();

    return learningCardSet.cards.map((course: IdName, index: number) => (
      <Lecture
        key={`course-${index}`}
        lecture={{
          ...mockLecture,
          name: course.name,
          cubeTypeName: CubeTypeNameType.Card,
        }}
        onViewDetail={() => this.onViewDetail(CourseSetType.Card, course.id)}
      />
    ));
  }

  render() {
    //
    const { coursePlanService } = this.props;
    const { coursePlanContents } = coursePlanService!;

    return (
      <Segment className="full">
        <Lecture.Group type={Lecture.GroupType.Course}>
          {coursePlanContents.courseSet.type ===  CourseSetType.Program ?
            this.renderProgramSet()
            :
            this.renderCourseSet()
          }
        </Lecture.Group>
      </Segment>
    );
  }
}

export default withRouter(CourseContainer);
