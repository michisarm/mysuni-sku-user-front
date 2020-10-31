import React from 'react';
import LectureWebpage from '../../viewModel/LectureWebpage';

const LectureDocumentsView: React.FC<LectureWebpage> = function LectureDocumentsView({
  fileBoxId,
}) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 950,
        height: 684,
        backgroundColor: '#f8f8f8',
      }}
    />
  );
};

export default LectureDocumentsView;
