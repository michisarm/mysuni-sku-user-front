import { mobxHelper, reactAlert } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import {
  requestLearningObjectives,
  saveLearningObjectives,
} from '../../service/useLearningObjectives';
import {
  getLearningObjectivesItem,
  setLearningObjectivesItem,
} from '../../store/PersonalBoardStore';
import LearningObjectives from '../../viewModel/LearningObjectives';
import LearningObjectivesModal from '../view/LearningObjectivesModal';
import { registerPromotionEvent } from 'main/sub/PersonalBoard/api/personalBoardApi';

interface Props extends RouteComponentProps {
  open: boolean;
  setOpen: (state: boolean, type?: string) => void;
}

const LearningObjectivesModalContainer: React.FC<Props> = function LearningObjectivesModalContainer({
  open,
  setOpen,
}) {
  // useEffect(() => {
  //   requestLearningObjectives()
  // }, [])

  const handleInputChange = useCallback((name: string, value: any) => {
    const learningObjectivesItem = getLearningObjectivesItem();
    if (learningObjectivesItem === undefined) {
      return false;
    }
    const nextPostCreateItem = {
      ...learningObjectivesItem,
      [name]: Number(value),
    };
    setLearningObjectivesItem(nextPostCreateItem);
  }, []);

  const handleSave = useCallback(() => {
    const learningObjectivesItem = getLearningObjectivesItem();
    if (
      learningObjectivesItem &&
      learningObjectivesItem?.AnnualLearningObjectives > 999
    ) {
      reactAlert({
        title: '',
        message: `연간 학습목표는 1시간 부터 999시간 까지만 입력 가능할 수 있습니다.`,
      });
      return false;
    } else {
      saveLearningObjectives();
      registerPromotionEvent('learningGoal202202'); // insert event
      setOpen(false, 'save');
    }
  }, []);

  return (
    <LearningObjectivesModal
      open={open}
      setOpen={setOpen}
      handleInputChange={handleInputChange}
      handleSave={handleSave}
    />
  );
};

export default inject(mobxHelper.injectFrom())(
  withRouter(observer(LearningObjectivesModalContainer))
);
