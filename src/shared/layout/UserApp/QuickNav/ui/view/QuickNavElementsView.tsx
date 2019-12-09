
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Icon, Button } from 'semantic-ui-react';


interface Props {
  topButtons: React.ReactNode,
  bottomButtons:  React.ReactNode,
}

@reactAutobind
export class MenuWrapperView extends Component<Props> {
  //
  render() {
    //
    const {
      topButtons, bottomButtons,
    } = this.props;

    return (
      <div className="quick-menu">
        <Button.Group className="quick-black horizontal">
          {topButtons}
        </Button.Group>

        <Button.Group className="quick-black" vertical>
          {bottomButtons}
        </Button.Group>
      </div>
    );
  }
}


interface TopMenuItemViewProps {
  iconName: string,
  text: string,
  onClick: () => void,
}

export class TopMenuItemView extends Component<TopMenuItemViewProps> {
  //
  render() {
    //
    const {
      iconName, text, onClick,
    } = this.props;

    return (
      <Button icon onClick={onClick}>
        <Icon className={iconName} />
        <Icon className="new16" />
        <span className="blind">new</span>{text}
      </Button>
    );
  }
}


interface BottomMenuItemViewProps {
  iconName: string,
  text: string,
  onClick: () => void,
}

export class BottomMenuItemView extends Component<BottomMenuItemViewProps> {
  //
  render() {
    //
    const {
      iconName, text, onClick,
    } = this.props;

    return (
      <Button onClick={onClick}>
        <Icon className={iconName} />{text}
      </Button>
    );
  }
}
