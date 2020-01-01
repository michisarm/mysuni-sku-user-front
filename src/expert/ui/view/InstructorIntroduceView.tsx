import { Segment } from 'semantic-ui-react';
import * as React from 'react';
import { InstructorModel } from '../../model/InstructorModel';

interface Props {
  result: InstructorModel
}


class InstructorIntroduceView extends React.Component<Props> {
  render() {
    const { result } = this.props;
    return (
      <Segment className="full">
        <div className="expert-cont">
          <div className="text-info">
            <div className="text02">{result && result.career}</div>
            <div className="dash" />
            <div className="text01">강사소개</div>
            <div className="text02">{result && result.memberSummary && result.memberSummary.introduction}</div>
          </div>
        </div>
      </Segment>
    );
  }
}

export default InstructorIntroduceView;
