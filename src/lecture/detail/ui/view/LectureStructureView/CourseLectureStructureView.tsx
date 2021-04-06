import React from 'react';
import { LectureStructure } from '../../../viewModel/LectureStructure';
import CourseView from './CourseView';

interface CourseLectureStructureViewProps {
  lectureStructure: LectureStructure;
}

const CourseLectureStructureView: React.FC<CourseLectureStructureViewProps> = function CourseLectureStructureView({
  lectureStructure,
}) {
  return (
    <>
      {lectureStructure.card !== undefined && (
        <CourseView
          key={lectureStructure.card.cardId}
          name={lectureStructure.card.name}
          state={lectureStructure.card.state}
          activated={lectureStructure.card.activated}
          cubes={lectureStructure.cubes}
          items={lectureStructure.items}
          path={lectureStructure.card.path}
          test={lectureStructure.card.test}
          survey={lectureStructure.card.survey}
          report={lectureStructure.card.report}
        />
      )}
    </>
  );
};

export default CourseLectureStructureView;
