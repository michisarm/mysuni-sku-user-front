
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Survey, Report } from '../view/LectureExamElementsView';


interface Props {
  /** 설문 액션*/
  onSurvey?: () => void
  /** 과제 다운로드 액션*/
  onDownloadReport?: () => void
}

@reactAutobind
class LectureExamContainer extends Component<Props> {
  //
  render() {
    //
    const { onSurvey, onDownloadReport } = this.props;

    return (
      <div className="sub-info-wrap">
        <Survey onSurvey={onSurvey} />
        <Report onDownloadReport={onDownloadReport} />
      </div>
    );
  }
}

export default LectureExamContainer;

