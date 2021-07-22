import React, { Component } from 'react';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { InstructorModel } from '../../model/InstructorModel';

interface Props {
  instructor: InstructorModel;
}

class InstructorIntroduceView extends Component<Props> {
  //
  render() {
    //
    const { instructor } = this.props;
    const { memberSummary } = instructor;

    return (
      <div className="expert-cont">
        <div className="text-info">
          <div className="text01">세부강의 분야</div>
          <div className="text02">
            {memberSummary.introduction &&
              parsePolyglotString(memberSummary.introduction)
                .split('\n')
                .map((line, index) => (
                  <div key={`introduction-${index}`}>
                    {line.replace('"', '')}
                    <br />
                  </div>
                ))}
          </div>

          <div className="dash" />

          <div className="text01">주요경력</div>
          <div className="text02">
            {instructor.career &&
              parsePolyglotString(instructor.career)
                .split('\n')
                .map((line, index) => (
                  <div key={`career-${index}`}>
                    {line.replace('"', '')}
                    <br />
                  </div>
                ))}
          </div>
        </div>
      </div>
    );
  }
}

export default InstructorIntroduceView;
