import React from 'react';
import { Tutorial02, Tutorial03, Tutorial04 } from './TutorialSwiper'

interface Props {
  tutorialIndex: string,
  handleTutorial: (tutorialNum:string) => void;
}

const RightPanel: React.FC<Props> = ({tutorialIndex, handleTutorial}) => {

  return (
    <div className="right">
      {
        tutorialIndex && tutorialIndex === "tu01" ? (
          <div id="tu1" className="tu-cont current">
            <div className="title">
              <div className="tit1">mySUNI가 한단계 성장했습니다.</div>
              <div className="tit2">학습자분들의 소중한 의견을 담아,<br />보다 편안하고 효과적인 학습 환경을 제공하고자 합니다.</div>
            </div>
            <div className="tu1-main">
              <div className="btn-list">
                <a onClick={() => handleTutorial("tu02")} className="icon01"><span>학습페이지</span></a>
                <a onClick={() => handleTutorial("tu03")} className="icon02"><span>My Learning</span></a>
                <a onClick={() => handleTutorial("tu04")} className="icon03"><span>검색</span></a>
              </div>
            </div>
          </div>
        ) : tutorialIndex === "tu02" ? (
        <Tutorial02 />
        ) : tutorialIndex === "tu03" ? (
        <Tutorial03 />
        ) : tutorialIndex === "tu04" ? (
        <Tutorial04 /> 
        ) : null
      }
    </div>
  );
};

export default RightPanel;
