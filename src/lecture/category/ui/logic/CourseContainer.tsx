import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Segment } from 'semantic-ui-react';
import { IdName, mobxHelper } from 'shared';
import { CubeTypeNameType } from 'personalcube/personalcube';
import { CoursePlanService } from 'course';
import { Lecture } from '../../../../shared';
import { CourseSetType } from '../../../../course/model/CourseSetType';
import LectureModel from '../../../shared/model/LectureModel';


interface Props extends RouteComponentProps<{ coursePlanId: string}> {
  coursePlanService?: CoursePlanService,
}

@inject(mobxHelper.injectFrom(
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

  onViewDetail(type: CourseSetType, id: string) {
    //
    if (type === CourseSetType.Program) {
      this.props.history.push(`./${id}`);
    }
    else if (type === CourseSetType.Card) {
      this.props.history.push(`../cube/todo-cube-id/lecture-card/${id}`);
    }
  }

  renderProgramSet() {
    //
    const { coursePlanService } = this.props;
    const { coursePlanContents } = coursePlanService!;
    const programSet = coursePlanContents.courseSet.programSet;

    const mockLecture = new LectureModel();

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
