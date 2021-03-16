import React, { useCallback, useState } from 'react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import { Image } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import LectureSurveySummaryChoiceLayout from './LectureSurveySummaryChoiceLayout';

interface LectureSurveyDateViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveySummaryDateView: React.FC<LectureSurveyDateViewProps> = function LectureSurveySummaryDateView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
}) {
  const { sentencesMap } = lectureSurveyItem;
  const sentence = lectureSurveyAnswerItem?.sentence;
  const [number, setNumber] = useState(9);

  const onChangeValue = useCallback(
    (value: Date) => {
      const next = moment(value).format('YYYY-MM-DD');
    },
    [lectureSurveyItem]
  );

  const setCheckNumber = () => {
    setNumber(number + 9);
  };

  if (sentencesMap === undefined) {
    return null;
  }

  const lastIndex = Object.keys(sentencesMap).length || 0;

  return (
    <LectureSurveySummaryChoiceLayout {...lectureSurveyItem}>
      <div className="course-radio-survey-new">
        <div className="course-survey-list">
          <div className="ui h40 calendar" id="rangestart">
            <div style={{ margin: '20px 0' }}>
              {lectureSurveyItem.image && <img src={lectureSurveyItem.image} />}
            </div>
            <div className="ui input right icon">
              <DatePicker
                onChange={onChangeValue}
                selectsStart
                dateFormat="YYYY-MM-DD"
                value={sentence}
                readOnly={true}
              />
              <i className="calendar24 icon">
                <span className="blind">date</span>
              </i>
            </div>
            <ul className="improve-list">
              {Object.keys(sentencesMap)
                .sort((a, b) => (a > b ? 1 : -1))
                .map((key, index) => (
                  <>
                    {index >= 0 && index <= number ? (
                      <li>
                        {key} ({sentencesMap[key]})
                        <br />
                      </li>
                    ) : (
                      ''
                    )}
                  </>
                ))}
              <li className="improve-list-more">
                {lastIndex - 1 > number ? (
                  <>
                    <Image
                      style={{ display: 'inline-block' }}
                      src={`${process.env.PUBLIC_URL}/images/all/survey-list-more.png`}
                    />
                    <span onClick={setCheckNumber}>
                      더보기 ({lastIndex - number - 1}개)
                    </span>
                  </>
                ) : (
                  ''
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </LectureSurveySummaryChoiceLayout>
  );
};

export default LectureSurveySummaryDateView;
