
import React, { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Button, Icon } from 'semantic-ui-react';


interface Props {
  onClick: () => void,
}

@reactAutobind
class SeeMoreButtonView extends PureComponent<Props> {
  //
  render() {
    console.log('SeeMoreButton :: render :: ');
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
