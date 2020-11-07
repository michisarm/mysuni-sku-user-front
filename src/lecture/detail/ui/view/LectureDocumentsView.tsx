import React from 'react';
import LectureWebpage from '../../viewModel/LectureWebpage';
import DefaultImg from '../../../../style/media/default-thumbnail.png';

const LectureDocumentsView: React.FC<LectureWebpage> = function LectureDocumentsView({
  title,
  description,
  image,
  url,
  fileBoxId,
}) {
  return (
    <>
      <div
        className="video-container"
        style={{
          height: 684,
          backgroundColor: '#a8a8a8',
          marginBottom: 40,
        }}
      />
      {url !== '' && url !== null && (
        <div className="lms-open-graph">
          <img src={image ? image : DefaultImg} className="lms-open-image" />
          <div className="lms-open-con">
            <div className="lms-open-title">{title}</div>
            <div className="lms-open-copy">{description}</div>
            <a href={url} className="lms-open-link" type="_blank">
              {url}
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default LectureDocumentsView;
