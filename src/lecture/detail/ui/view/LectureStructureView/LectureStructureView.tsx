import React from 'react';
import { LectureStructure } from '../../../viewModel/LectureStructure';
import CourseLectureStructureView from './CourseLectureStructureView';
import CubeLectureStructureView from './CubeLectureStructureView';

interface LectureStructureViewProps {
  lectureStructure: LectureStructure;
}

const LectureStructureView: React.FC<LectureStructureViewProps> = function LectureStructureView({
  lectureStructure,
}) {
  return (
    <div className="course-info-wrapper">
      {lectureStructure.cubes.length !== 1 && (
        <CourseLectureStructureView lectureStructure={lectureStructure} />
      )}
      {lectureStructure.cubes.length === 1 && (
        <CubeLectureStructureView lectureStructure={lectureStructure} />
      )}
      <div className="lms-fixed-holder" />
    </div>
  );
};

export default LectureStructureView;
