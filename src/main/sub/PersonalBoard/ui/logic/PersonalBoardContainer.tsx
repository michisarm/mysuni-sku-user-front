import MyLearningSummaryModel from 'myTraining/model/MyLearningSummaryModel';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';


interface PersonalBoardProps {
  myLearningSummary : MyLearningSummaryModel
}

const PersonalBoardContainer: React.FC<PersonalBoardProps> = function PersonalBoard({
  myLearningSummary
}) {

  console.log('myLearningSummary', myLearningSummary)
const history = useHistory();

return (
<>
<span>1234</span>
뱃지<br/>
학습시간<br/>
학습시간상세<br/>
영역별 학습시간<br/>
우리회사 인기코스<br/>
</>
)
}

export default PersonalBoardContainer;