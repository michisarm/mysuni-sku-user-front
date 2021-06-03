import React from 'react';
import LectureWebpage from '../../viewModel/LectureWebpage';
import DefaultImg from '../../../../style/media/default-thumbnail.png';
import { startLearning } from '../../service/useLectureState/utility/cubeStateActions';
import {
  experimetial,
  webPageLinked,
} from '../../service/useActionLog/cubeStudyEvent';
import { getLectureParams } from '../../store/LectureParamsStore';
import { ActionType, Action, Area } from 'tracker/model';

interface Props { }

function action() {
  const lectureParams = getLectureParams();
  if (lectureParams?.cubeType === 'WebPage') {
    webPageLinked();
  }
  if (lectureParams?.cubeType === 'Experiential') {
    experimetial();
  }
  startLearning();
}

const LectureWebpageView: React.FC<LectureWebpage &
  Props> = function LectureWebpageView({
    title,
    description,
    image,
    url,
    urlType,
  }) {
    return (
      <>
        {urlType === 'embedded' && (
          <div className="iframe-area">
            <iframe
              src={url}
            />
          </div>
        )}
        {urlType !== 'embedded' && (
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
                data-area={Area.CUBE_CONTENT}
                data-action={Action.CLICK}
                data-action-type={ActionType.STUDY}
                data-action-external-link={url}
                data-action-name="학습하기 클릭"
              >
                {url}
              </a>
            </div>
          </div>
        )}
      </>
    );
  };

export default LectureWebpageView;
