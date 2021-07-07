
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Button, Icon } from 'semantic-ui-react';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';


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
          <Icon className="moreview" /><PolyglotText defaultString="list more" id="rcmd-추천-ListMore" />
        </Button>
      </div>
    );
  }
}

export default SeeMoreButtonView;
