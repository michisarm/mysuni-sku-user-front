
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Button, Icon } from 'semantic-ui-react';


interface Props {
  onClick: () => void,
}

@reactAutobind
class SeeMoreButtonView extends Component<Props> {
  //
  render() {
    //
    const { onClick } = this.props;

    return (
      <div className="more-comments">
        <Button icon className="left moreview" onClick={onClick}>
          <Icon className="moreview" />list more
        </Button>
      </div>
    );
  }
}

export default SeeMoreButtonView;
