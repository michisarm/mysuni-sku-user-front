
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button, Icon } from 'semantic-ui-react';


interface Props extends RouteComponentProps {
  memberName: string;
  onViewAll: () => void,
}

@reactAutobind
@observer
class RecommendHeaderContainer extends Component<Props> {
  //
  render() {
    //
    const { memberName, onViewAll, children } = this.props;

    return (
      <div className="recommend-head">
        <span className="tit">{memberName}님을 위한 추천 채널</span>
        <Button icon className="right btn-black" onClick={onViewAll}>
          View all<Icon className="morelink" />
        </Button>
        <div className="right">
          {children}
        </div>
      </div>
    );
  }
}

export default withRouter(RecommendHeaderContainer);
