
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

// import { CoursePlanContentsModel, CoursePlanModel } from '../../../../course/model';


interface Props {
  // coursePlan: CoursePlanModel
  // coursePlanContents: CoursePlanContentsModel
  // header: React.ReactNode
  children: React.ReactNode
}

@reactAutobind
@observer
class TestExamSurverView extends Component<Props> {
  //
  render() {
    //
    const { children } = this.props;

    return (
      <div className="white-title">
        <div className="inner">
          {/*<strong>{coursePlanContents.examTitle}</strong>의 학습 과정 입니다.*/}
        </div>

        <div className="section header">
          {/*{header}*/}
        </div>

        <div className="section">
          {children}
        </div>
      </div>
    );
  }
}

export default TestExamSurverView;
