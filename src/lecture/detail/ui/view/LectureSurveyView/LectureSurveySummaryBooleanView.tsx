import React, { useCallback } from 'react';
import { selectBooleanAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import { useLectureSurveyAnswerSummaryList, useLectureSurveySummary } from 'lecture/detail/store/LectureSurveyStore';
import LectureSurveySummaryChoiceLayout from './LectureSurveySummaryChoiceLayout';

interface LectureSurveySummaryBooleanViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveySummaryBooleanView: React.FC<LectureSurveySummaryBooleanViewProps> = function LectureSurveySummaryBooleanView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
}) {
  const answerList = useLectureSurveyAnswerSummaryList();
  const lectureSurveySummary = useLectureSurveySummary();

  const onChangeValue = useCallback(() => {
    const next =
      lectureSurveyAnswerItem !== undefined &&
      lectureSurveyAnswerItem.itemNumbers !== undefined &&
      lectureSurveyAnswerItem.itemNumbers[0] === '1'
        ? '0'
        : '1';
    selectBooleanAnswer(lectureSurveyItem, next);
  }, [lectureSurveyItem, lectureSurveyAnswerItem]);
  const { questionNumber, numberCountMap } = lectureSurveyItem;
  let booleanRespondCount = 0;
  let yesCount = 0;
  let noCount = 0;
  let yesAvg = '';
  let noAvg = '';

  const respondCount = lectureSurveySummary?.respondentCount.respondentCount;
  if (numberCountMap !== undefined && respondCount !== undefined) {
    yesCount = numberCountMap[1] || 0;
    noCount = numberCountMap[0] || 0;
    booleanRespondCount = yesCount + noCount;

    yesAvg = ((yesCount / booleanRespondCount) * 100).toFixed(1);
    noAvg = ((noCount / booleanRespondCount) * 100).toFixed(1);
  }

  return (
    <LectureSurveySummaryChoiceLayout {...lectureSurveyItem}>
      <div className="course-survey-list">
        <div className="preview">
          <div className="lms-toggle init" style={{ position: 'relative', top: '0' }}>
            {/*처음 로딩시 className="lms-switch init"*/}
            {/*클릭이후  className="lms-switch"*/}
            <label
              htmlFor={questionNumber}
              className={`lms-switch ${
                lectureSurveyAnswerItem === undefined || lectureSurveyAnswerItem.itemNumbers === undefined ? 'init' : ''
              }`}
            >
              <input
                type="checkbox"
                id={questionNumber}
                checked={
                  lectureSurveyAnswerItem !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers[0] === '1'
                }
                onChange={onChangeValue}
              />
              <span className="slider" />
              <span className="lms-radio-text" />
            </label>
          </div>
          <div className="course-survey-yesOrNoBar-wrapper">
            <span className="course-survey-yesOrNoBar-text">YES</span>
            {/* progress bar */}
            <div className="course-survey-list-backgrondBar yesOrNoBar">
              <span className="course-survey-list-persent-left">
                <span className="course-survey-list-persent-number">{yesCount || 0}</span>({yesAvg !== 'NaN' ? yesAvg : '0'}%)
              </span>
              <div style={yesAvg < noAvg ? {height: '100%', backgroundColor: '#2185d0', opacity: 0.5, borderRadius: '6px'} : {height: '100%', backgroundColor: '#f4f7fd', opacity: 0.5, borderRadius: '6px'} }>
                <div style={yesAvg < noAvg ? { width: 100 - Number(noAvg)+'%', backgroundColor: '#f4f7fd', height: '100%', borderRadius: '6px'} : { width: yesAvg + '%', backgroundColor: '#2185d0', height: '100%', borderRadius: '6px'}} />
              </div>
              <span className="course-survey-list-persent-right">
                <span className="course-survey-list-persent-number">{noCount || 0}</span>({noAvg !== 'NaN' ? noAvg : '0'}%)
              </span>
            </div>

            <span className="course-survey-yesOrNoBar-text">NO</span>
          </div>
        </div>
      </div>
    </LectureSurveySummaryChoiceLayout>
  );
};
export default LectureSurveySummaryBooleanView;
