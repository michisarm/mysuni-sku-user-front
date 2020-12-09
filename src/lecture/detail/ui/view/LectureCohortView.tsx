import React from 'react';
import LectureWebpage from '../../viewModel/LectureWebpage';

import DefaultImg from '../../../../style/media/default-thumbnail.png';

interface Props {
  action?: () => void;
}

const PUBLIC_URL = process.env.PUBLIC_URL;

const LectureCohortView: React.FC<LectureWebpage &
  Props> = function LectureCohortView({
  title,
  description,
  image,
  url,
  action,
}) {
  return (
    <div className="lms-open-graph">
      <img src={image ? image : DefaultImg} className="lms-open-image" />
      <div className="lms-open-con">
        <div className="lms-open-title">{title}</div>
        <div className="lms-open-copy">{description}</div>
        <a
          href={'${PUBLIC_URL}/'+url}
          className="lms-open-link"
          target="_blank"
          id="webpage-link"
          onClick={action}
        >
          커뮤니티로 이동
        </a>
      </div>
    </div>
  );
};

export default LectureCohortView;
