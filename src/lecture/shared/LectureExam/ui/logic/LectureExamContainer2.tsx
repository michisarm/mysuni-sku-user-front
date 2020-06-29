
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Report, Test, Survey } from '../view/LectureExamElementsView2';

interface Props {
  /** 과제 액션*/
  onReport?: () => void
  /** 과 비활성화 시 */
  onReportNotReady?: () => void
  /** 테스트제 액션 */
  onTest?: () => void
  /** 테스트 비활성화 시 */
  onTestNotReady?: () => void
  /** 설문 액션*/
  onSurvey?: () => void
  /** 설문 비활성화 시 **/
  OnSurveyNotReady?: () => void

  viewObject?: any
  passedState: boolean
  type?: string
  name?: string
  sort?: string
}

@reactAutobind
class LectureExamContainer extends Component<Props> {
  //
  render() {
    //
    const { onReport, onReportNotReady, onTest, onTestNotReady, onSurvey, OnSurveyNotReady, viewObject, passedState, type, name, sort } = this.props;

    return (
      <>
        {sort === 'box' ? (
          <div className="course-cont">
            <div className="cube-box">
              <Report
                OnReport={onReport}
                onReportNotReady={onReportNotReady}
                viewObject={viewObject}
                passedState={passedState}
                type={type}
                name={name}
                sort={sort}
              />
              <Test
                OnTest={onTest}
                OnTestNotReady={onTestNotReady}
                viewObject={viewObject}
                type={type}
                name={name}
                sort={sort}
              />
              <Survey
                onSurvey={onSurvey}
                OnSurveyNotReady={OnSurveyNotReady}
                viewObject={viewObject}
                type={type}
                name={name}
                sort={sort}
              />
            </div>
          </div>
        ) : (
          <>
            <Report
              OnReport={onReport}
              onReportNotReady={onReportNotReady}
              viewObject={viewObject}
              passedState={passedState}
              type={type}
              name={name}
              sort={sort}
            />
            <Test
              OnTest={onTest}
              OnTestNotReady={onTestNotReady}
              viewObject={viewObject}
              type={type}
              name={name}
              sort={sort}
            />
            <Survey
              onSurvey={onSurvey}
              OnSurveyNotReady={OnSurveyNotReady}
              viewObject={viewObject}
              type={type}
              name={name}
              sort={sort}
            />
          </>
        )}
      </>
    );
  }
}

export default LectureExamContainer;
