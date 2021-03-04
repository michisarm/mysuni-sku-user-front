import { mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { requestLearningObjectives } from '../../service/useLearningObjectives';
import { getLearningObjectivesItem, setLearningObjectivesItem } from '../../store/PersonalBoardStore';
import LearningObjectives from '../../viewModel/LearningObjectives';
import LearningObjectivesModal from '../view/LearningObjectivesModal';


interface Props extends RouteComponentProps {
  open: boolean;
  setOpen: (state:boolean) => void,
}

const LearningObjectivesModalContainer: React.FC<Props> = function LearningObjectivesModalContainer({
  open,
  setOpen
}){
  useEffect(() => {
    console.log('((((((((((((((((((((((')
    requestLearningObjectives()
  }, [])

  const handleInputChange = useCallback((name: string, value: any) => {
    const test = getLearningObjectivesItem()
    if(test === undefined) {
      return false
    }
    const nextPostCreateItem = { ...test, [name]: Number(value) };
    setLearningObjectivesItem(nextPostCreateItem)
  }, [])

  const handleSave = useCallback(() => {
    setOpen(false)
  },[])

return (
  <LearningObjectivesModal
    open={open}
    setOpen={setOpen}
    handleInputChange={handleInputChange}
    handleSave={handleSave}
  />
)
}

// export default PersonalBoardContainer;

export default inject(
  mobxHelper.injectFrom(
  )
)(withRouter(observer(LearningObjectivesModalContainer)));