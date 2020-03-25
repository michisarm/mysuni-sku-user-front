
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { CoursePlanContentsModel, CoursePlanModel } from '../../../../course/model';


interface Props {
  coursePlan: CoursePlanModel
  coursePlanContents: CoursePlanContentsModel
}

@reactAutobind
@observer
class TestExamSurverView extends Component<Props> {
  //
  render() {
    //
    const { coursePlanContents } = this.props;

    return (
      <div className="white-title">
        <div className="inner">
          <strong>{coursePlanContents.examTitle}</strong>의 학습 과정 입니다.
        </div>
      </div>
    );
  }
}

export default TestExamSurverView;
