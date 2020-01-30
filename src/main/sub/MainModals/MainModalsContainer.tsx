
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import ModalState from './model/ModalState';
import WelcomeModalView from './WelcomeModalView';
import SystemGuideModalView from './SystemGuideModalView';
import TutorialModalView from './TutorialModalView';


interface State {
  welcomeModalState: ModalState
  tutorialModalState: ModalState
  systemGuideModalState: ModalState
}

enum PageType {
  Welcome = 'welcome',
  Tutorial = 'tutorial',
  SystemGuide = 'systemGuide',
}

@reactAutobind
@observer
class MainModalsContainer extends Component<{}, State> {
  //
  static getLocalStorageKey(pageType: PageType) {
    //
    return `mySUNI.MainModals.${pageType}ModalDisabled`;
  }

  state = {
    welcomeModalState: new ModalState(),
    tutorialModalState: new ModalState(),
    systemGuideModalState: new ModalState(),
  };


  componentDidMount(): void {
    //
    this.initFromStorage(PageType.Welcome);
    this.initFromStorage(PageType.Tutorial);
    this.initFromStorage(PageType.SystemGuide);
  }

  initFromStorage(pageType: PageType) {
    //
    const disabled = window.localStorage.getItem(MainModalsContainer.getLocalStorageKey(pageType));

    if (disabled) {
      this.setModalStateProp(pageType, 'disabled', true);
    }
    else {
      this.setModalStateProp(pageType, 'open', true);
    }
  }

  getModalStateProp(pageType: PageType, propName: string): boolean {
    //
    const modalStateKey = `${pageType}ModalState`;

    return (this.state as any)[modalStateKey][propName];
  }

  setModalStateProp(pageType: PageType, propName: string, value: boolean) {
    //
    const modalStateKey = `${pageType}ModalState`;
    const modalState = (this.state as any)[modalStateKey];

    this.setState({
      [modalStateKey]: {
        ...modalState,
        [propName]: value,
      },
    } as any);
  }

  onOpen(pageType: PageType) {
    //
    this.setModalStateProp(pageType, 'open', true);
  }

  onClose(pageType: PageType) {
    //
    const disableChecked = this.getModalStateProp(pageType, 'disableChecked');

    if (disableChecked) {
      window.localStorage.setItem(MainModalsContainer.getLocalStorageKey(pageType), 'disabled');
    }
    this.setModalStateProp(pageType, 'open', false);
  }

  onCloseWelcome() {
    //
    this.onClose(PageType.Welcome);
    this.initFromStorage(PageType.Tutorial);
  }

  onCloseTutorial() {
    //
    this.onClose(PageType.Tutorial);
    this.initFromStorage(PageType.SystemGuide);
  }

  onCloseSystemGuide() {
    this.onClose(PageType.SystemGuide);
  }

  onCheckNoMoreSee(pageType: PageType, checked: boolean) {
    //
    this.setModalStateProp(pageType, 'disableChecked', checked);
  }

  render() {
    //
    const {
      welcomeModalState,
      tutorialModalState,
      systemGuideModalState,
    } = this.state;

    if (welcomeModalState.disabled && tutorialModalState.disabled && systemGuideModalState.disabled) {
      return null;
    }
    else if (welcomeModalState.open) {
      return (
        <WelcomeModalView
          modalState={welcomeModalState}
          onClose={this.onCloseWelcome}
          onCheckDisable={(e: any, data: any) => this.onCheckNoMoreSee(PageType.Welcome, data.checked)}
        />
      );
    }
    else if (tutorialModalState.open) {
      return (
        <TutorialModalView
          modalState={tutorialModalState}
          onClose={this.onCloseTutorial}
          onCheckDisable={(e: any, data: any) => this.onCheckNoMoreSee(PageType.Tutorial, data.checked)}
        />
      );
    }
    else if (systemGuideModalState.open) {
      return (
        <SystemGuideModalView
          modalState={systemGuideModalState}
          onClose={this.onCloseSystemGuide}
          onCheckDisable={(e: any, data: any) => this.onCheckNoMoreSee(PageType.SystemGuide, data.checked)}
        />
      );
    }
    return null;
  }
}

export default MainModalsContainer;

