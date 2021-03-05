import moment from 'moment';
import { MyLearningSummaryModal } from 'myTraining';
import React from 'react';
import { Button } from 'semantic-ui-react';
import { timeToHourMinutePaddingFormat } from 'shared/helper/dateTimeHelper';
import { useLearningTimeDetailItem } from '../../store/PersonalBoardStore';

const LearningTimeDetailView: React.FC = function LearningTimeDetailView({
}) {
  const badgeLearningTimeDetailItem = useLearningTimeDetailItem()
  return (
    <>
    {/* {badgeLearningTimeDetailItem && (
    <div style={{border: '2px solid', borderColor: 'blue'}}>
      <span>학습시간상세 pie chart</span><br/>
      <span>mySUNI{timeToHourMinutePaddingFormat(badgeLearningTimeDetailItem.suniLearningTime)}</span><br/>
      <span>관계사{timeToHourMinutePaddingFormat(badgeLearningTimeDetailItem.displayMyCompanyLearningTime)}</span><br/>
      <span>강의시간{timeToHourMinutePaddingFormat(badgeLearningTimeDetailItem.aplAllowTime)}</span><br/>
      <span>개인학습{timeToHourMinutePaddingFormat(badgeLearningTimeDetailItem.totalCollegeTime)}</span><br/>
      <span>전체시간{badgeLearningTimeDetailItem.suniLearningTime+badgeLearningTimeDetailItem.displayMyCompanyLearningTime+badgeLearningTimeDetailItem.aplAllowTime+badgeLearningTimeDetailItem.totalCollegeTime}</span><br/>
    </div> */}
    {badgeLearningTimeDetailItem && (
      <MyLearningSummaryModal
        trigger={(
          <a>
            <div className="personal-card-item">
              <div className="card-item-tit mb23">
                <h3>학습 시간 상세</h3>
                <span>{moment().year()}년 기준</span>
              </div>
              <div className="card-item-con sty2">
                <div className="item-con-box">
                  <div className="item-con-left detail">
                    {/* <img src={gr_img}/> */}
                  </div>
                  <div className="item-con-right detail">
                    <div className="card-gauge-bar">
                      파이 차트 들어가야한다.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        )}
      />
    )}
    </>
  );
};

export default LearningTimeDetailView;
