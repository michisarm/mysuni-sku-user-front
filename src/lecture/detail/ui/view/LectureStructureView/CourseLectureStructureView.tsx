import React from 'react';
import {
  LectureStructure,
} from '../../../viewModel/LectureStructure';
import CourseView from './CourseView';

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
          items={lectureStructure.items}
          path={lectureStructure.course.path}
          test={lectureStructure.course.test}
          survey={lectureStructure.course.survey}
          report={lectureStructure.course.report}
        />
      )}
    </>
  );
};

export default CourseLectureStructureView;
