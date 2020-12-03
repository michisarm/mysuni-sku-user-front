import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import ReactGA from 'react-ga';

import moment from 'moment';
import { CubeType, CubeTypeNameType } from 'personalcube/personalcube/model';
import { Icon, Label, LabelProps } from 'semantic-ui-react';
import { CategoryModel, DatePeriod } from 'shared/model';
import CubeIconType from '../../../Lecture/model/CubeIconType';


interface Props {
  title: string,
  type: CubeType | 'Program' | 'Course',
  creationTime: number,
  typeName?: string,
  label?: { color: LabelProps['color'], text: string },
  category?: CategoryModel,
  learningPeriod?: DatePeriod
  children?: React.ReactNode,
}

@reactAutobind
class TitleCell extends Component<Props> {
  //
  componentDidMount() {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname + window.location.search, [], `${this.props.title}`);
    }, 2000);
  }

  render() {
    //
    const { label, category, title, type, typeName, creationTime, children, learningPeriod } = this.props;
    const cubeTypeName = typeName || CubeTypeNameType[type];

    return (
      <div className="title-area">
        {label ?
          <Label color={label.color}>{label.text}</Label>
          :
          category && category.college.name && (
            <Label className={category.color}>{category.college.name}</Label>
          )
        }

        <div className="header">{title}</div>
        <div className="deatil">
          <div className="item">
            <Label className="bold onlytext">
              <Icon className={CubeIconType[type]} /><span>{cubeTypeName}</span>
            </Label>
            {category && category.channel.name && <span className="channel">{category.channel.name}</span>}
          </div>
          <div className="item">
            <Label className="onlytext">
              {creationTime ?
                <>
                  <Icon className="date" />
                  <span>등록일 : {moment(creationTime).format('YYYY.MM.DD')}</span>
                </>
                : null
              }
              {
                learningPeriod && (type === CubeType.ClassRoomLecture || type === CubeType.ELearning) && (
                  <span className="ml17">학습기간 : {learningPeriod.startDate} ~ {learningPeriod.endDate}</span>
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
