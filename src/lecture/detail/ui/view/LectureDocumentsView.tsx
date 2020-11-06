import React from 'react';
import LectureWebpage from '../../viewModel/LectureWebpage';

const LectureDocumentsView: React.FC<LectureWebpage> = function LectureDocumentsView({
  fileBoxId,
}) {
  return (
    <div className="video-container"
      style={{
        height: 684,
        backgroundColor: '#a8a8a8',
      }}
    />
  );
};

export default LectureDocumentsView;
