import React from 'react';
import LectureFile from '../../../viewModel/LectureOverview/LectureFile';
import LectureFileView from '../../view/LectureOverview/LectureFileView';

interface LectureFileViewProps {
  lectureFile?: LectureFile;
}

const LectureCubeFileContainer: React.FC<LectureFileViewProps> = function LectureCubeFileContainer({
  lectureFile,
}) {
  return <>{lectureFile && <LectureFileView lectureFile={lectureFile} />}</>;
};

export default LectureCubeFileContainer;
