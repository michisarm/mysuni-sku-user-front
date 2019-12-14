import { Button, Icon, Segment } from 'semantic-ui-react';
import * as React from 'react';

class CreateNoDataView extends React.Component {
  render() {
    return (
      <Segment className="full">
        <div className="ui full segment">
          <div className="no-cont-wrap">
            <Icon className="no-contents80" /><span className="blind">콘텐츠 없음</span>
            <div className="text">아직 생성한 학습이 없습니다.</div>
            <Button icon className="right btn-blue2">
                Create 바로가기 <Icon className="morelink" />
            </Button>
          </div>
        </div>
      </Segment>
    );
  }
}

export default CreateNoDataView;
