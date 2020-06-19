
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Card } from 'semantic-ui-react';


export enum GroupType {
  Box = 'Box',
  Line = 'Line',
  Course = 'Course',
  List = 'List',
  ListStamp = 'ListStamp',
  Community = 'Community',
}

interface Props {
  type: GroupType
  totalCourseCount?: number
}

export const LearningCardContext = React.createContext({
  groupType: GroupType.Box,
});

@reactAutobind
class CardGroup2 extends Component<Props> {
  //
  getContextValue() {
    //
    const { type } = this.props;

    return {
      groupType: type,
    };
  }

  render() {
    //
    const { type, children, totalCourseCount } = this.props;
    let elements = null;

    if (type === GroupType.Box) {
      elements = (
        <Card.Group className="box-cards">
          {children}
        </Card.Group>
      );
    }
    else if (type === GroupType.List) {
      elements = (
        <Card.Group className="list-cards">
          {children}
        </Card.Group>
      );
    }
    else if (type === GroupType.ListStamp) {
      elements = (
        <Card.Group className="list-cards">
          {children}
        </Card.Group>
      );
    }
    else if (type === GroupType.Line) {
      elements = (
        <div className="scrolling">
          <ul className="belt">
            {children}
          </ul>
        </div>
      );
    }
    /*else if (type === GroupType.Course) {
      elements = (
        <div className="contents course-list non-height">
          {children}
        </div>
      );
    }*/
    else if (type === GroupType.Course) {
      elements = (
        // <div className="contents course-list non-height">
        <div className="ov-paragraph course-area">
          <div className="title-style">
            <div className="ui label onlytext bold size24">
              <i aria-hidden="true" className="course24 icon"/>
              <span>Course 콘텐츠</span>
            </div>
            {
              totalCourseCount && (
                <div className="title-right">
                  <span>총 <strong>{totalCourseCount} 개</strong> 강의 구성</span>
                </div>
              )
            }
          </div>
          <div className="course-cont">
            {children}
          </div>
        </div>
      );
    }
    else if (type === GroupType.Community) {
      elements = (
        <div className="community-accordion">
          {children}
        </div>
      );
    }



    return (
      <LearningCardContext.Provider value={this.getContextValue()}>
        {elements}
      </LearningCardContext.Provider>
    );
  }
}

export default CardGroup2;
