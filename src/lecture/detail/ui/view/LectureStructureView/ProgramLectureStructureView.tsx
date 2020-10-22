import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import {
  LectureStructure,
  LectureStructureCourseItemParams,
  LectureStructureItemType,
} from '../../../viewModel/LectureStructure';
import CourseView from './CourseView';
import ProgramCubeView from './ProgramCubeView';
import ProgramHeaderView from './ProgramHeaderView';
import ProgramReportView from './ProgramReportView';
import ProgramSurveyView from './ProgramSurveyView';
import ProgramTestView from './ProgramTestView';

function getSelfPath(params: LectureStructureCourseItemParams) {
  const {
    cineroomId,
    collegeId,
    coursePlanId,
    serviceType,
    serviceId,
  } = params;
  if (cineroomId === undefined) {
    return `/lecture/college/${collegeId}/course-plan/${coursePlanId}/${serviceType}/${serviceId}`;
  }
  return `/lecture/cineroom/${cineroomId}/college/${collegeId}/course-plan/${coursePlanId}/${serviceType}/${serviceId}`;
}

function getCoursePath(
  params: LectureStructureCourseItemParams,
  courseId: string
) {
  const {
    cineroomId,
    collegeId,
    coursePlanId,
    serviceType,
    serviceId,
  } = params;
  if (cineroomId === undefined) {
    return `/lecture/college/${collegeId}/course-plan/${coursePlanId}/${serviceType}/${serviceId}/course/${courseId}`;
  }
  return `/lecture/cineroom/${cineroomId}/college/${collegeId}/course-plan/${coursePlanId}/${serviceType}/${serviceId}/course/${courseId}`;
}

function getCubePath(params: LectureStructureCourseItemParams, cubeId: string) {
  const {
    cineroomId,
    collegeId,
    coursePlanId,
    serviceType,
    serviceId,
  } = params;
  if (cineroomId === undefined) {
    return `/lecture/college/${collegeId}/course-plan/${coursePlanId}/${serviceType}/${serviceId}/cube/${cubeId}`;
  }
  return `/lecture/cineroom/${cineroomId}/college/${collegeId}/course-plan/${coursePlanId}/${serviceType}/${serviceId}/cube/${cubeId}`;
}

function getItemPath(
  params: LectureStructureCourseItemParams,
  itemType: LectureStructureItemType
) {
  const {
    cineroomId,
    collegeId,
    coursePlanId,
    serviceType,
    serviceId,
  } = params;
  if (cineroomId === undefined) {
    return `/lecture/college/${collegeId}/course-plan/${coursePlanId}/${serviceType}/${serviceId}/${itemType.toLowerCase()}`;
  }
  return `/lecture/cineroom/${cineroomId}/college/${collegeId}/course-plan/${coursePlanId}/${serviceType}/${serviceId}/${itemType.toLowerCase()}`;
}

interface ProgramLectureStructureViewProps {
  lectureStructure: LectureStructure;
}

const ProgramLectureStructureView: React.FC<ProgramLectureStructureViewProps> = function ProgramLectureStructureView({
  lectureStructure,
}) {
  return (
    <>
      {lectureStructure.course !== undefined && (
        <Link to={getSelfPath(lectureStructure.course.params)}>
          <ProgramHeaderView name={lectureStructure.course.name} />
        </Link>
      )}
      {lectureStructure.courses.map(course => (
        <CourseView
          key={course.id}
          name={course.name}
          state={course.state}
          activated={course.activated}
          cubes={course.cubes}
          test={course.test}
          survey={course.survey}
          report={course.report}
          path={getCoursePath(course.params, course.coursePlanId)}
        />
      ))}
      {lectureStructure.cubes.length > 0 &&
        lectureStructure.cubes.map(cube => {
          return (
            <ProgramCubeView
              name={cube.name}
              state={cube.state}
              activated={cube.activated}
              learningTime={cube.learningTime}
              cubeType={cube.cubeType}
              path={getCubePath(lectureStructure.course!.params, cube.cubeId)}
            />
          );
        })}
      {lectureStructure.test !== undefined && (
        <ProgramTestView
          name={lectureStructure.test.name}
          state={lectureStructure.test.state}
          path={getItemPath(
            lectureStructure.test.params as LectureStructureCourseItemParams,
            lectureStructure.test.type
          )}
        />
      )}
      {lectureStructure.survey !== undefined && (
        <ProgramSurveyView
          name={lectureStructure.survey.name}
          state={lectureStructure.survey.state}
          path={getItemPath(
            lectureStructure.survey.params as LectureStructureCourseItemParams,
            lectureStructure.survey.type
          )}
        />
      )}
      {lectureStructure.report !== undefined && (
        <ProgramReportView
          name={lectureStructure.report.name}
          state={lectureStructure.report.state}
          path={getItemPath(
            lectureStructure.report.params as LectureStructureCourseItemParams,
            lectureStructure.report.type
          )}
        />
      )}
    </>
  );
};

export default ProgramLectureStructureView;
