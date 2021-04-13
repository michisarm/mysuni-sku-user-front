
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Icon, Button } from 'semantic-ui-react';
import { Action, Area } from 'tracker/model';

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
      <div className="quick-menu" data-area={Area.FOOTER_HAMBURGER}>
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
  notieActive: boolean,
}

export class TopMenuItemView extends Component<TopMenuItemViewProps> {
  //
  render() {
    //
    const {
      iconName, text, onClick, notieActive,
    } = this.props;

    return (
      <Button icon onClick={onClick}>
        <Icon className={iconName} />
        {
          (notieActive) && <Icon className="new16" />
        }
        <span className="blind">new</span>{text}
      </Button>
    );
  }
}


interface BottomMenuItemViewProps {
  iconName: string,
  text: string,
  onClick?: () => void,
}

export class BottomMenuItemView extends Component<BottomMenuItemViewProps> {
  //
  render() {
    //
    const {
      iconName, text, onClick,
    } = this.props;

    const dataSet: any = {};
    if (text === '관심채널') {
      dataSet['data-area'] = Area.FOOTER_HAMBURGER;
      dataSet['data-action'] = Action.VIEW;
      dataSet['data-action-name'] = '관심 채널 설정 PV';
      dataSet['data-pathname'] = '관심 채널 설정';
      dataSet['data-page'] = '#attention-channel';
    }
    return (
      <Button onClick={onClick} {...dataSet}>
        <Icon className={iconName} />
        {text}
      </Button>
    );
  }
}
