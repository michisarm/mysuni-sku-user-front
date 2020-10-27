import React from 'react';
import { useLectureFile } from '../../../service/useLectureFile';
import LectureFileView from '../../view/LectureOverview/LectureFileView';

const LectureCubeFileContainer: React.FC = function LectureCubeFileContainer() {
  const [lectureFile] = useLectureFile();
  return <>{lectureFile && <LectureFileView lectureFile={lectureFile} />}</>;
};

export default LectureCubeFileContainer;
