import React from 'react';

import { Segment } from 'semantic-ui-react';
import { InstructorModel } from '../../model/InstructorModel';

interface Props {
  instructor: InstructorModel
}

class InstructorIntroduceView extends React.Component<Props> {
  //
  render() {
    //
    const { instructor } = this.props;
    const { memberSummary } = instructor;

    return (
      <Segment className="full">
        <div className="expert-cont">
          <div className="text-info">
            <div className="text01">세부강의 분야</div>
            <div className="text02">
              {memberSummary.introduction && memberSummary.introduction.split('\n').map( (line, index) => (
                <div key={`introduction-${index}`}>{line.replace('"', '')}<br /></div>
              ))}
            </div>

            <div className="dash" />

            <div className="text01">주요경력</div>
            <div className="text02">
              {instructor.career && instructor.career.split('\n').map( (line, index) => (
                <div key={`career-${index}`}>{line.replace('"', '')}<br /></div>
              ))}
            </div>
          </div>
        </div>
      </Segment>
    );
  }
}

export default InstructorIntroduceView;
