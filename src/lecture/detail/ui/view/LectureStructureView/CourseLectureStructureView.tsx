import React from 'react';
import LectureParams from '../../../viewModel/LectureParams';
import {
  LectureStructure,
  LectureStructureItemType,
} from '../../../viewModel/LectureStructure';
import CourseView from './CourseView';
import ReportView from './ReportView';
import SurveyView from './SurveyView';
import TestView from './TestView';

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
          path={lectureStructure.course.path}
        />
      )}
      {lectureStructure.test !== undefined && (
        <TestView
          name={lectureStructure.test.name}
          state={lectureStructure.test.state}
          questionCount={lectureStructure.test.questionCount}
          path={lectureStructure.test.path}
        />
      )}
      {lectureStructure.survey !== undefined && (
        <SurveyView
          name={lectureStructure.survey.name}
          state={lectureStructure.survey.state}
          questionCount={lectureStructure.survey.questionCount}
          path={lectureStructure.survey.path}
        />
      )}
      {lectureStructure.report !== undefined && (
        <ReportView
          name={lectureStructure.report.name}
          state={lectureStructure.report.state}
          path={lectureStructure.report.path}
        />
      )}
    </>
  );
};

export default CourseLectureStructureView;
