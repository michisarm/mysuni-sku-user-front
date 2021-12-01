import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Icon } from 'semantic-ui-react';
import LectureWebpage from '../../viewModel/LectureWebpage';
import DefaultImg from '../../../../style/media/default-thumbnail.png';
import { startLearning } from '../../service/useLectureState/utility/cubeStateActions';
import { ActionType, Action, Area } from 'tracker/model';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {}

function action() {
  startLearning();
}

const LectureWebpageView: React.FC<LectureWebpage & Props> =
  function LectureWebpageView({
    title,
    description,
    height,
    image,
    url,
    urlType,
  }) {
    return (
      <>
        {urlType === 'embedded' && (
          <div className="iframe-area s990" style={{ height: height || 630 }}>
            <iframe src={url} allowFullScreen />
          </div>
        )}
        {urlType !== 'embedded' && (
          <div className="lms-open-graph-link">
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
              <span className="link">{url}</span>
              <span className="txt">
                <span>
                  <PolyglotText
                    defaultString="바로가기"
                    id="Create-NMWebpage-바로가기"
                  />
                </span>
                <Icon>
                  <Image
                    src={`${process.env.PUBLIC_URL}/images/all/icon-arrow-b-16-px-black.svg`}
                    alt="바로가기"
                  />
                </Icon>
              </span>
            </a>
          </div>
        )}
      </>
    );
  };

export default LectureWebpageView;
