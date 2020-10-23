import React from 'react';
import { useLectureTest } from '../../service/useLectureTest/useLectureTest';
import LectureTestView from '../view/LectureTestView/LectureTestView';

function LectureTestContainer() {
  const lectureStructure = useLectureTest()[0]!;

  return (
    <LectureTestView 
      lectureStructure={lectureStructure}
    />
  );
}

export default LectureTestContainer;
