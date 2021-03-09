import React, { useEffect, useState } from 'react';
import { requestDashBoardSentence } from '../../service/getBadgeLearningTime';
import { useDashBoardSentenceItem } from '../../store/DashBoardSentenceStore';
import DashBoardSentenceView from '../view/DashBoardSentenceView';

function DashBoardSentenceContainer(){

  const [dashBoardTxt, setDashBoardTxt] = useState<any>()

  const dashBoardSentence = useDashBoardSentenceItem()
  useEffect(() => {
    const index = localStorage.getItem('dashBoardSentenceIndex')
      localStorage.setItem('dashBoardSentenceIndex', index? String(Number(index)+1) : '0')
    requestDashBoardSentence()
  }, [])

  useEffect(() => {
    if(dashBoardSentence === undefined) {
      setDashBoardTxt('')
      return
    }
    const dashBoardTxt = dashBoardSentence.dashboardSentence[Number(localStorage.getItem('dashBoardSentenceIndex'))]
    if(dashBoardTxt === undefined) {
      localStorage.setItem('dashBoardSentenceIndex', '0')
    } else {
      setDashBoardTxt(dashBoardTxt)
    }
  }, [dashBoardSentence])

return (
  
  <>
  {/* {dashBoardTxt && (
    <span>{dashBoardTxt}</span>
  )}
  {dashBoardTxt === undefined && (
    <span>기본값입니다.</span>
  )} */}
  { dashBoardTxt && (
    <DashBoardSentenceView dashBoardTxt={dashBoardTxt}/>
  )}
  </>
)
}
export default DashBoardSentenceContainer