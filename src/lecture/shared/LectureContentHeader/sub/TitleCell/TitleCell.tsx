
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import moment from 'moment';
import { CubeType } from 'personalcube/personalcube';
import { Label, Icon, LabelProps } from 'semantic-ui-react';
import { CategoryModel, DatePeriod } from 'shared';
import CubeIconType from '../../../Lecture/model/CubeIconType';


interface Props {
  title: string,
  type: CubeType,
  typeName: string,
  creationTime: number,
  label?: { color: LabelProps['color'], text: string },
  category?: CategoryModel,
  learningPeriod?: DatePeriod
  children?: React.ReactNode,
}

@reactAutobind
class TitleCell extends Component<Props> {
  //
  render() {
    //
    const { label, category, title, type, typeName, creationTime, children, learningPeriod } = this.props;
    return (
      <div className="title-area">
        { label ?
          <Label color={label.color}>{label.text}</Label>
          :
          category && category.college.name && (
            <Label color={category.color}>{category.college.name}</Label>
          )
        }

        <div className="header">{title}</div>
        <div className="deatil">
          <div className="item">
            <Label className="bold onlytext">
              <Icon className={CubeIconType[type]} /><span>{typeName}</span>
            </Label>
            { category && category.channel.name && <span className="channel">{category.channel.name}</span>}
          </div>
          <div className="item">
            <Label className="onlytext">
              { creationTime ?
                <>
                  <Icon className="date" />
                  <span>Creation date : {moment(creationTime).format('YYYY.MM.DD')}</span>
                </>
                : null
              }
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
