
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import classNames from 'classnames';

import { Card } from 'semantic-ui-react';


export enum GroupType {
  Box = 'Box',
  List = 'List',
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
    const { type } = this.props;

    return (
      <LearningCardContext.Provider value={this.getContextValue()}>
        <Card.Group className={classNames({
          'box-cards': type === GroupType.Box,
          'list-cards': type === GroupType.List,
        })}
        >
          {this.props.children}
        </Card.Group>
      </LearningCardContext.Provider>
    );
  }
}

export default CardGroup;
