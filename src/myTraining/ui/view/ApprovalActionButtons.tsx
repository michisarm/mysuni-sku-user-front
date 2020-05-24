import React, {Component} from 'react';
import {
  Button, Icon,
} from 'semantic-ui-react';

class ApprovalActionButtons extends Component {
  render() {
    return(
      <div className="actions top">

        <Button icon className="left post return">
          <Icon className="return"/> 반려
        </Button>
        <Button icon className="left post approval">
          <Icon className="approval"/> 승인
        </Button>

        {/*Delete 버튼은 승인요청 목록에는 미노출*/}
        <Button icon className="left post delete">
          <Icon className="del24"/> Delete
        </Button>
      </div>
    );
  }
}

export default ApprovalActionButtons;
