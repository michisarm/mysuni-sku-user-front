import React from 'react';
import { useLectureStructure } from '../../service/useLectureStructure/useLectureStructure';
import LectureStructureView from '../view/LectureStructureView/LectureStructureView';

function LectureStructureContainer() {
  const [lectureStructure] = useLectureStructure();
  return (
    <>
      {lectureStructure && (
        <LectureStructureView lectureStructure={lectureStructure} />
      )}
    </>
  );
}

export default LectureStructureContainer;
