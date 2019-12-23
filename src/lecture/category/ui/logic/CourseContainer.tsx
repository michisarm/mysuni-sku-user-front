import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Segment } from 'semantic-ui-react';
import { IdName, Lecture, mobxHelper } from 'shared';
import { CubeTypeNameType } from 'personalcube/personalcube';
import { CoursePlanService, CourseSetType } from 'course';
import {
  CourseLectureService,
  LectureModel,
  LectureService,
  LectureServiceType,
  ProgramLectureService,
} from '../../../shared';
import LectureViewModel from '../../../shared/model/LectureViewModel';


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
    // this.findCourseLecture();
    this.findCoursePlan();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.match.params.coursePlanId !== this.props.match.params.coursePlanId) {
      // this.findCourseLecture();
      this.findCoursePlan();
    }
  }

  // async findCourseLecture() {
  //   //
  //   const { match, programLectureService, courseLectureService } = this.props;
  //
  //   if (match.params.serviceType === LectureServiceType.Program) {
  //     console.log('This is programs');
  //   }
  //   else {
  //     console.log('This is Course');
  //   }
  // }

  async findCoursePlan() {
    //
    const { match, coursePlanService } = this.props;



    const coursePlan = await coursePlanService!.findCoursePlan(match.params.coursePlanId);

    if (coursePlan) {
      coursePlanService!.findCoursePlanContents(coursePlan.contentsId);
    }
  }

  onViewDetail(serviceType: LectureServiceType, id: string) {
    //
    if (serviceType === LectureServiceType.Program || serviceType === LectureServiceType.Course) {
      this.props.history.push(`./${id}`);
    }
    else if (serviceType === LectureServiceType.Card) {
      this.props.history.push(`../../../cube/todo-cube-id/lecture-card/${id}`);
    }
  }

  renderProgramSet() {
    //
    const { lectureService } = this.props;
    const { lectureViews } = lectureService!;
    console.log('programSet lectureViews', lectureViews);

    return (
      <>
        {lectureViews.map((lecture: LectureViewModel, index: number) => (
          <Lecture
            key={`course-${index}`}
            lecture={{} as any}
            lectureView={lecture}
            toggle={lecture.serviceType === LectureServiceType.Program || lecture.serviceType === LectureServiceType.Course}
            onViewDetail={() => this.onViewDetail(lecture.serviceType, lecture.id)}
          />
        ))}
      </>
    );
    /*
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
     */
  }

  // renderCourseSet() {
  //   //
  //   const { coursePlanService } = this.props;
  //   const { coursePlanContents } = coursePlanService!;
  //   const learningCardSet = coursePlanContents.courseSet.learningCardSet;
  //
  //   const mockLecture = new LectureModel();
  //
  //   return learningCardSet.cards.map((course: IdName, index: number) => (
  //     <Lecture
  //       key={`course-${index}`}
  //       lecture={{
  //         ...mockLecture,
  //         name: course.name,
  //         cubeTypeName: CubeTypeNameType.Card,
  //       }}
  //       onViewDetail={() => this.onViewDetail(lecture.serviceType, course.id)}
  //     />
  //   ));
  // }

  render() {
    //
    const { coursePlanService } = this.props;
    const { coursePlanContents } = coursePlanService!;

    return (
      <Segment className="full">
        <Lecture.Group type={Lecture.GroupType.Course}>
          {this.renderProgramSet()}
          {/*{coursePlanContents.courseSet.type ===  CourseSetType.Program ?*/}
          {/*  this.renderProgramSet()*/}
          {/*  :*/}
          {/*  this.renderCourseSet()*/}
          {/*}*/}
        </Lecture.Group>
      </Segment>
    );
  }
}

export default withRouter(CourseContainer);
