import React from 'react';
import LectureParams from '../../../viewModel/LectureParams';
import {
  LectureStructure,
  LectureStructureItemType,
} from '../../../viewModel/LectureStructure';
import CourseView from './CourseView';
import DiscussionView from './DiscussionView';
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
          activated={lectureStructure.test.activated}
        />
      )}
      {lectureStructure.survey !== undefined && (
        <SurveyView
          name={lectureStructure.survey.name}
          state={lectureStructure.survey.state}
          questionCount={lectureStructure.survey.questionCount}
          path={lectureStructure.survey.path}
          activated={lectureStructure.survey.activated}
        />
      )}
      {lectureStructure.report !== undefined && (
        <ReportView
          name={lectureStructure.report.name}
          state={lectureStructure.report.state}
          path={lectureStructure.report.path}
          activated={lectureStructure.report.activated}
        />
      )}
      {lectureStructure.discussion !== undefined && (
        <DiscussionView
          name={lectureStructure.discussion.name}
          state={lectureStructure.discussion.state}
          path={lectureStructure.discussion.path}
          activated={lectureStructure.discussion.activated}
        />
      )}
    </>
  );
};

export default CourseLectureStructureView;
