import React from 'react';

interface LectureUrlCardViewProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

const LectureUrlCardView: React.FC<LectureUrlCardViewProps> = function LectureUrlCardView({
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
