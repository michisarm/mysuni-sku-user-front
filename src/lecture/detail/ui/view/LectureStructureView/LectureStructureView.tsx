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
  return (
    <div className="course-info-wrapper">
      {lectureStructure.type === 'Program' && (
        <ProgramLectureStructureView lectureStructure={lectureStructure} />
      )}
      {lectureStructure.type === 'Card' && (
        <CourseLectureStructureView lectureStructure={lectureStructure} />
      )}
      {lectureStructure.type === 'Course' && (
        <CourseLectureStructureView lectureStructure={lectureStructure} />
      )}
      {lectureStructure.type === 'Cube' && (
        <CubeLectureStructureView lectureStructure={lectureStructure} />
      )}
      <div className="lms-fixed-holder" />
    </div>
  );
};

export default LectureStructureView;
