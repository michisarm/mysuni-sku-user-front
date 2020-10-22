import React from 'react';
import {
  LectureStructure,
  LectureStructureCourseItemParams,
  LectureStructureItemType,
} from '../../../viewModel/LectureStructure';
import CourseView from './CourseView';
import ReportView from './ReportView';
import SurveyView from './SurveyView';
import TestView from './TestView';

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

interface CourseLectureStructureViewProps {
  lectureStructure: LectureStructure;
}

const CourseLectureStructureView: React.FC<CourseLectureStructureViewProps> = function CourseLectureStructureView({
  lectureStructure,
}) {
  return (
    <>
      {lectureStructure.course !== undefined && (
        <CourseView
          key={lectureStructure.course.id}
          name={lectureStructure.course.name}
          state={lectureStructure.course.state}
          activated={lectureStructure.course.activated}
          cubes={lectureStructure.cubes}
          path={getSelfPath(lectureStructure.course.params)}
        />
      )}
      {lectureStructure.test !== undefined && (
        <TestView
          name={lectureStructure.test.name}
          state={lectureStructure.test.state}
          questionCount={lectureStructure.test.questionCount}
          path={getItemPath(
            lectureStructure.test.params as LectureStructureCourseItemParams,
            lectureStructure.test.type
          )}
        />
      )}
      {lectureStructure.survey !== undefined && (
        <SurveyView
          name={lectureStructure.survey.name}
          state={lectureStructure.survey.state}
          questionCount={lectureStructure.survey.questionCount}
          path={getItemPath(
            lectureStructure.survey.params as LectureStructureCourseItemParams,
            lectureStructure.survey.type
          )}
        />
      )}
      {lectureStructure.report !== undefined && (
        <ReportView
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

export default CourseLectureStructureView;
