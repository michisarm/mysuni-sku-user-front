
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Report, Test, Survey } from '../view/ZMSLectureExamElementsView';

interface Props {
  /** 과제 액션*/
  onReport?: () => void
  /** 테스트 액 */
  onTest?: () => void
  /** 설문 액션*/
  onSurvey?: () => void

  viewObject?: any
  type?: string
  name?: string
}

@reactAutobind
class ZMSLectureExamContainer extends Component<Props> {
  //
  render() {
    //
    const { onReport, onTest, onSurvey, viewObject, type, name } = this.props;

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

export default ZMSLectureExamContainer;

