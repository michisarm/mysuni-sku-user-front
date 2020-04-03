
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Report, Test, Survey } from '../view/LectureExamElementsView';

interface Props {
  /** 과제 액션*/
  onReport?: () => void
  /** 테스트 액션 */
  onTest?: () => void
  /** 테스트 비활성화 시 */
  onTestNotReady?: () => void
  /** 설문 액션*/
  onSurvey?: () => void

  viewObject?: any
  type?: string
  name?: string
}

@reactAutobind
class LectureExamContainer extends Component<Props> {
  //
  render() {
    //
    const { onReport, onTest, onTestNotReady, onSurvey, viewObject, type, name } = this.props;

    return (
      <div className="ui full segment">
        <div className="contents">
          <Report
            OnReport={onReport}
            viewObject={viewObject}
            type={type}
            name={name}
          />
          <Test
            OnTest={onTest}
            OnTestNotReady={onTestNotReady}
            viewObject={viewObject}
            type={type}
            name={name}
          />
          <Survey
            onSurvey={onSurvey}
            viewObject={viewObject}
            type={type}
            name={name}
          />
        </div>
      </div>
    );
  }
}

export default LectureExamContainer;

