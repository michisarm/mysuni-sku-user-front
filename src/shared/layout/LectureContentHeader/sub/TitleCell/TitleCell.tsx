
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Label, Icon, LabelProps } from 'semantic-ui-react';


interface Props {
  title: string,
  label?: { color: LabelProps['color'], text: string },
  children?: React.ReactNode,
}

@reactAutobind
class TitleCell extends Component<Props> {
  //
  render() {
    //
    const { label, title, children } = this.props;

    return (
      <div className="title-area">
        { label && (
          <Label color={label.color}>Leadership</Label>
        )}

        <div className="header">{title}</div>
        <div className="deatil">
          <div className="item">
            <Label className="bold onlytext">
              <Icon className="course" /><span>Course</span>
            </Label>
            <span className="channel">Leading Myself</span>
          </div>
          <div className="item">
            <Label className="onlytext">
              <Icon className="date" /><span>Creation date : 2019. 12. 31</span>
              <span className="ml17">Study start date, end date : 2019. 12. 31 ~ 2020. 02. 20</span>
            </Label>
          </div>
        </div>
        {children}
      </div>
    );
  }
}

export default TitleCell;
