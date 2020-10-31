import React from 'react';
import LectureWebpage from '../../viewModel/LectureWebpage';

const LectureWebpageView: React.FC<LectureWebpage> = function LectureWebpageView({
  title,
  description,
  image,
  url,
}) {
  return (
    <div className="lms-open-graph">
      <img src={image} className="lms-open-image" />
      <div className="lms-open-con">
        <div className="lms-open-title">{title}</div>
        <div className="lms-open-copy">{description}</div>
        <a href={url} className="lms-open-link" type="_blank">
          {url}
        </a>
      </div>
    </div>
  );
};

export default LectureWebpageView;
