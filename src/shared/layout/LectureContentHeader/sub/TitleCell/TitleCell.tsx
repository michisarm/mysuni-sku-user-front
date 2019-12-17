
import React, { Component } from 'react';
import { DatePeriod, reactAutobind } from '@nara.platform/accent';

import { Label, Icon, LabelProps } from 'semantic-ui-react';


interface Props {
  title: string,
  type: string,
  creationTime: number,
  label?: { color: LabelProps['color'], text: string },
  learningPeriod?: DatePeriod
  children?: React.ReactNode,
}

@reactAutobind
class TitleCell extends Component<Props> {
  //
  render() {
    //
    const { label, title, type, creationTime, children, learningPeriod } = this.props;

    return (
      <div className="title-area">
        { label && (
          <Label color={label.color}>{label.text}</Label>
        )}

        <div className="header">{title}</div>
        <div className="deatil">
          <div className="item">
            <Label className="bold onlytext">
              <Icon className="course" /><span>{type}</span>
            </Label>
            <span className="channel">Leading Myself (?)</span>
          </div>
          <div className="item">
            <Label className="onlytext">
              <Icon className="date" /><span>Creation date : {new Date(creationTime).toLocaleDateString()}</span>
              {
                learningPeriod && (
                  <span className="ml17">Study start date, end date : {learningPeriod.startDate} ~ {learningPeriod.endDate}</span>
                ) || null
              }
            </Label>
          </div>
        </div>
        {children}
      </div>
    );
  }
}

export default TitleCell;
