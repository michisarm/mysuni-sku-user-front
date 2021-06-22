import React from 'react';
import { LectureStructure } from '../../../viewModel/LectureStructure';
import CourseLectureStructureView from './CourseLectureStructureView';
import CubeLectureStructureNoteView from './CubeLectureStructureNoteView';
import CubeLectureStructureView from './CubeLectureStructureView';
import ProgramLectureStructureNoteView from './ProgramLectureStructureNoteView';
import ProgramLectureStructureView from './ProgramLectureStructureView';

interface LectureStructureViewProps {
  lectureStructure: LectureStructure;
  noteTab: boolean;
  cubeType: any;
}

const LectureStructureView: React.FC<LectureStructureViewProps> = function LectureStructureView({
  lectureStructure,
  noteTab,
  cubeType
}) {
  if (lectureStructure.chapters.length > 0) {
    return (
      <div className="course-info-wrapper">
        {
          !noteTab && (
            <ProgramLectureStructureView lectureStructure={lectureStructure} />
          )
        }
        {
          noteTab && (
            <ProgramLectureStructureNoteView lectureStructure={lectureStructure} noteTab={noteTab} cubeType={cubeType}/>
          )
        }
        <div className="lms-fixed-holder" />
      </div>
    );
  }

  if (
    lectureStructure.items.length === 1 &&
    lectureStructure.cubes.length === 1 &&
    lectureStructure.card.test === undefined &&
    lectureStructure.card.report === undefined &&
    lectureStructure.card.survey === undefined
  ) {
    return (
      <div className="course-info-wrapper">
        {
          !noteTab && (
            <CubeLectureStructureView lectureStructure={lectureStructure}/>
          )
        }
        {
          noteTab && (
            <CubeLectureStructureNoteView lectureStructure={lectureStructure} noteTab={noteTab} cubeType={cubeType}/>
          )
        }
        <div className="lms-fixed-holder" />
      </div>
    );
  }

  return (
    <div className="course-info-wrapper">
      {
        noteTab !== undefined && lectureStructure !== undefined && lectureStructure.cubes.length !== 0 &&(
          <>
            <CourseLectureStructureView lectureStructure={lectureStructure} noteTab={noteTab} cubeType={cubeType}/>
            <div className="lms-fixed-holder" />
          </>
        )
      }
    </div>
  );
};

export default LectureStructureView;
