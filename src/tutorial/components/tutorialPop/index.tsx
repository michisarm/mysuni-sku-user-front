import React, { useState } from 'react';
import LeftPanel from './left';
import RightPanel from './right';
import { useCallback } from 'react';

const TutorialPop: React.FC = () => {
  const [tutorialIndex, setTutorialIndex] = useState<string>("tu01");

  const handleTutorial = useCallback((tutorialNum: any) => {
    setTutorialIndex(tutorialNum);
  },[tutorialIndex])
  
  return (
    <>
      <LeftPanel tutorialIndex={tutorialIndex} handleTutorial={handleTutorial} />
      <RightPanel tutorialIndex={tutorialIndex} handleTutorial={handleTutorial} />
    </>
  );
};

export default TutorialPop;
