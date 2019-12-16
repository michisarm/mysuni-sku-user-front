
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import classNames from 'classnames';

import { Label, Icon } from 'semantic-ui-react';


interface Props {
  icon: string,
  text: string,
}


@reactAutobind
class Title extends Component<Props> {
  //
  render() {
    //
    const { icon, text } = this.props;

    return (
      <h3 className="title-style">
        <Label className="onlytext bold size24">
          <Icon className={icon} /><span>{text}</span>
        </Label>
      </h3>
    );
  }
}

export default Title;
