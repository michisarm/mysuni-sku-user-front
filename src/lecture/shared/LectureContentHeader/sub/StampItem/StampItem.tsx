
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Icon } from 'semantic-ui-react';


interface Props {
  value: number;
}

@reactAutobind
class StampItem extends Component<Props> {
  //
  render() {
    //
    const { value } = this.props;

    return (
      <div className="ui stamp2 label">
        <div>
          <Icon className="stamp48" />
          <span className="text1">x</span>
          <span className="text2">{value}</span>
        </div>
        <div>
          <span className="text3">획득가능 Stamp</span>
        </div>
      </div>
    );
  }
}

export default StampItem;
