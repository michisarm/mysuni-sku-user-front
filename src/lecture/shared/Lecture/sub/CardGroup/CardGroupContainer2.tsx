
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
  type: GroupType,
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
    const { type, children } = this.props;
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
        <div className="contents course-list non-height">
          <div className="course-box fn-parents open">
            <div className="bar">
              {children}
            </div>
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
