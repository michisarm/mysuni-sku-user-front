import React, { useEffect, useState } from 'react';
import { requestDashBoardSentence } from '../../service/getBadgeLearningTime';
import { useDashBoardSentenceItem } from '../../store/DashBoardSentenceStore';
import DashBoardSentenceView from '../view/DashBoardSentenceView';

function DashBoardSentenceContainer(){

  const [dashBoardTxt, setDashBoardTxt] = useState<any>()

  const dashBoardSentence = useDashBoardSentenceItem()

  useEffect(() => {
    const index = localStorage.getItem('dashBoardSentenceIndex')
    localStorage.setItem('dashBoardSentenceIndex', index === 'undefined' ? '0' : String(Number(index)+1))
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
  { dashBoardTxt && (
    <DashBoardSentenceView dashBoardTxt={dashBoardTxt}/>
  )}
  </>
)
}
export default DashBoardSentenceContainer