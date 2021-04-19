import React from 'react';
import LectureWebpage from '../../viewModel/LectureWebpage';
import DefaultImg from '../../../../style/media/default-thumbnail.png';

interface Props { }

function action() {
  const action = document.getElementById('ACTION');
  if (action !== null) {
    action.click();
  }
}

const LectureWebpageView: React.FC<LectureWebpage &
  Props> = function LectureWebpageView({ title, description, image, url, urlType }) {
    return (
      <>
        {urlType && urlType === "embedded" && (
          <iframe className="iframe-area" src={url} />
        )
        }
        {urlType === null && (
          <div className="lms-open-graph">
            <img src={image ? image : DefaultImg} className="lms-open-image" />
            <div className="lms-open-con">
              <div className="lms-open-title">{title}</div>
              <div className="lms-open-copy">{description}</div>
              <a
                href={url}
                className="lms-open-link"
                target="_blank"
                id="webpage-link"
                onClick={action}
              >
                {url}
              </a>
            </div>
          </div>
        )
        }
      </>
    );
  };

export default LectureWebpageView;
