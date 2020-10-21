import { useLectureList } from '../../service/useLectureList';
import React from 'react';

function LectureListContainer() {
  useLectureList();
  return null;
}

export default LectureListContainer;
