import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  initLectureCourseSatisfaction,
  useLectureCoureSatisfaction,
} from 'lecture/detail/store/LectureOverviewStore';
import { useLectureParams } from 'lecture/detail/store/LectureParamsStore';
import { useHistory } from 'react-router-dom';
import { Button, Icon, Rating } from 'semantic-ui-react';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { useLectureStructure } from 'lecture/detail/store/LectureStructureStore';
import { reactAlert } from '@nara.platform/accent';

export default function LectureCourseSummarySatisfactionView() {
  const history = useHistory();
  const params = useLectureParams();
  const satisfaction =
    useLectureCoureSatisfaction() || initLectureCourseSatisfaction();
  const lectureStructure = useLectureStructure();
  const canSurvey = lectureStructure?.card?.survey?.can;

  if (
    satisfaction.surveyCaseId === undefined ||
    satisfaction.surveyCaseId === ''
  ) {
    return null;
  }
  if (satisfaction.isDoneSurvey === undefined) {
    return null;
  }

  const onClickEvaluation = () => {
    if (canSurvey) {
      history.push(`/lecture/card/${params?.cardId}/survey`);
      return;
    }
    reactAlert({
      title: getPolyglotText('Survey 안내', 'Survey-CouseView-Survey안내'),
      message: getPolyglotText(
        '학습 진행 후 Survey 참여 가능합니다.',
        'Survey-CouseView-참여안내'
      ),
    });
  };

  return (
    <div className="header-rating">
      <Rating
        defaultRating={5}
        maxRating={5}
        rating={
          satisfaction?.totalCount !== 0
            ? satisfaction && satisfaction.average
            : 5
        }
        disabled
        className="fixed-rating"
      />
      <span>
        {satisfaction?.totalCount !== 0
          ? `${Math.floor(satisfaction.average * 10) / 10}(${
              satisfaction?.totalCount
            }
            ${getPolyglotText('명', 'cicl-학상본문-명')})`
          : '0'}
      </span>
      {satisfaction.isDoneSurvey && (
        <Button className="re-feedback" onClick={onClickEvaluation}>
          <Icon className="edit16" />
          {getPolyglotText('평가하기', 'survey-reviewOverview-평가')}
        </Button>
      )}
    </div>
  );
}
