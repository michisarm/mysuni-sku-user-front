import React from 'react';

interface Props {
  tutorialIndex: string,
  handleTutorial: (tutorialNum:string) => void;
}

const LeftPanel: React.FC<Props> = ({tutorialIndex, handleTutorial}) => {
 
  return (
    <div className="left">
      <div className="inner">
        <a onClick={() => handleTutorial("tu01")} className={tutorialIndex && tutorialIndex === "tu01" ? "current" : ""}>업데이트 사항 소개</a>
        <a onClick={() => handleTutorial("tu02")} className={tutorialIndex && tutorialIndex === "tu02" ? "current" : ""}>학습 페이지</a>
        <a onClick={() => handleTutorial("tu03")} className={tutorialIndex && tutorialIndex === "tu03" ? "current" : ""}>My Learning</a>
        <a onClick={() => handleTutorial("tu04")} className={tutorialIndex && tutorialIndex === "tu04" ? "current" : ""}>검색</a> 
      </div>
    </div>
  );
};

export default LeftPanel;
