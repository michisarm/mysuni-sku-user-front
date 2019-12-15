import React, { Component, createRef } from 'react';
import {
  Icon, Button,
} from 'semantic-ui-react';

interface Props {

}

class ContentsMoreView extends React.Component<Props> {
  render() {
    return (
      <div className="more-comments">
        <Button icon className="left moreview"><Icon className="moreview" /> list more</Button>
      </div>
    );
  }
}


export default ContentsMoreView;
