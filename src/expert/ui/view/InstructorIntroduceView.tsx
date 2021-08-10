import React, { Component } from 'react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { InstructorWithIdentity } from 'expert/model/InstructorWithIdentity';

interface Props {
  instructorWithIdentity: InstructorWithIdentity | null;
}

class InstructorIntroduceView extends Component<Props> {
  //
  render() {
    //
    const { instructorWithIdentity } = this.props;

    return (
      <div className="expert-cont">
        <div className="text-info">
          <div className="text01">
            <PolyglotText
              id="통검-강사소개-세부분야"
              defaultString="세부강의 분야"
            />
          </div>
          <div className="text02">
            {parsePolyglotString(
              instructorWithIdentity?.instructor.lectureField
            )
              .split('\n')
              .map((line, index) => (
                // memberSummary.introduction &&
                //   memberSummary.introduction.split('\n').map((line, index) => (
                <div key={`introduction-${index}`}>
                  {line.replace('"', '')}
                  <br />
                </div>
              ))}
          </div>

          <div className="dash" />

          <div className="text01">
            <PolyglotText
              id="통검-강사소개-주요경력"
              defaultString="주요경력"
            />
          </div>
          <div className="text02">
            {parsePolyglotString(instructorWithIdentity?.instructor.career)
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
