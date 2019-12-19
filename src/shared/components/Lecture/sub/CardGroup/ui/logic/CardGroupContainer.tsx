
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import classNames from 'classnames';

import { Card } from 'semantic-ui-react';


export enum GroupType {
  Box = 'Box',
  List = 'List',
  Line = 'Line',
}

interface Props {
  type: GroupType,
}

export const LearningCardContext = React.createContext({
  groupType: GroupType.Box,
});

@reactAutobind
class CardGroup extends Component<Props> {
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

    return (
      <LearningCardContext.Provider value={this.getContextValue()}>
        { type === GroupType.Line ?
          <div className="scrolling">
            <ul className="belt">
              {children}
            </ul>
          </div>
          :
          <Card.Group className={classNames({
            'box-cards': type === GroupType.Box,
            'list-cards': type === GroupType.List,
          })}
          >
            {children}
          </Card.Group>
        }
      </LearningCardContext.Provider>
    );
  }
}

export default CardGroup;
