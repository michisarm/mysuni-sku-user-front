import React from 'react';
import { LectureStructure } from '../../../viewModel/LectureStructure';
import CourseLectureStructureView from './CourseLectureStructureView';
import CubeLectureStructureView from './CubeLectureStructureView';
import ProgramLectureStructureView from './ProgramLectureStructureView';

interface LectureStructureViewProps {
  lectureStructure: LectureStructure;
}

const LectureStructureView: React.FC<LectureStructureViewProps> = function LectureStructureView({
  lectureStructure,
}) {
  if (lectureStructure.chapters.length > 0) {
    return (
      <div className="course-info-wrapper">
        <ProgramLectureStructureView lectureStructure={lectureStructure} />
        <div className="lms-fixed-holder" />
      </div>
    );
  }

  if (
    lectureStructure.items.length === 1 &&
    lectureStructure.card.test === undefined &&
    lectureStructure.card.report === undefined &&
    lectureStructure.card.survey === undefined
  ) {
    return (
      <div className="course-info-wrapper">
        <CubeLectureStructureView lectureStructure={lectureStructure} />
        <div className="lms-fixed-holder" />
      </div>
    );
  }

  return (
    <div className="course-info-wrapper">
      <CourseLectureStructureView lectureStructure={lectureStructure} />
      <div className="lms-fixed-holder" />
    </div>
  );
};

export default LectureStructureView;
