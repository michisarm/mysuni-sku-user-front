
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

// import moment from 'moment';
import ModalState from './model/ModalState';
// import WelcomeModalView from './WelcomeModalView';
import SystemGuideModalView from './SystemGuideModalView';
import TrustedSiteModalView from './TrustedSiteModalView';
//import TutorialModalView from './TutorialModalView';


interface State {
  // welcomeModalState: ModalState
  //tutorialModalState: ModalState
  systemGuideModalState: ModalState
  trustedSiteModalState: ModalState
}

enum PageType {
  // Welcome = 'welcome',
  //Tutorial = 'tutorial',
  SystemGuide = 'systemGuide',
  TrustedSite = 'trustedSite'
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
    // welcomeModalState: new ModalState(),
    //tutorialModalState: new ModalState(),
    systemGuideModalState: new ModalState(),
    trustedSiteModalState: new ModalState()
  };


  componentDidMount(): void {
    //
    // this.initFromStorage(PageType.Welcome);
    // this.initFromStorage(PageType.Tutorial);
    this.initFromStorage(PageType.SystemGuide);
    this.initFromStorage(PageType.TrustedSite);
  }

  initFromStorage(pageType: PageType) {
    //
    const disabledValue = window.localStorage.getItem(MainModalsContainer.getLocalStorageKey(pageType));
    let disabled = false;

    if (disabledValue) {
      // if (pageType === PageType.Welcome) {
      //   const today = moment().format('YYYY-MM-DD');
      //
      //   if (today === disabledValue) {
      //     disabled = true;
      //   }
      // }
      // else {
      disabled = true;
      // }
    }

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
      // if (pageType === PageType.Welcome) {
      //   const today = moment().format('YYYY-MM-DD');
      //   window.localStorage.setItem(MainModalsContainer.getLocalStorageKey(pageType), today);
      // }
      // else {
      window.localStorage.setItem(MainModalsContainer.getLocalStorageKey(pageType), 'disabled');
      // }
    }
    this.setModalStateProp(pageType, 'open', false);
  }

  onCloseWelcome() {
    //
    // this.onClose(PageType.Welcome);
    //this.initFromStorage(PageType.Tutorial);
  }

  onCloseTutorial() {
    //
    //this.onClose(PageType.Tutorial);
    // this.initFromStorage(PageType.SystemGuide);
  }

  onCloseSystemGuide() {
    this.onClose(PageType.SystemGuide);
    this.initFromStorage(PageType.TrustedSite);
  }

  onCloseTrustedSite(){
    this.onClose(PageType.TrustedSite);
  }

  onCheckNoMoreSee(pageType: PageType, checked: boolean) {
    //
    this.setModalStateProp(pageType, 'disableChecked', checked);
  }

  render() {
    //
    const {
      // welcomeModalState,
      // tutorialModalState,
      systemGuideModalState,
      trustedSiteModalState
    } = this.state;

    if (systemGuideModalState.disabled && trustedSiteModalState.disabled) {
      return null;
    }

    if (systemGuideModalState.open) {
      return (
        <SystemGuideModalView
          modalState={systemGuideModalState}
          onClose={this.onCloseSystemGuide}
          onCheckDisable={(e: any, data: any) => this.onCheckNoMoreSee(PageType.SystemGuide, data.checked)}
        />
      );
    } else if (trustedSiteModalState.open) {
      return (
        <TrustedSiteModalView
          modalState={trustedSiteModalState}
          onClose={this.onCloseTrustedSite}
          onCheckDisable={(e: any, data: any) => this.onCheckNoMoreSee(PageType.TrustedSite, data.checked)}
        />
      );
    }

    // if (tutorialModalState.disabled
    // && welcomeModalState.disabled
    // && systemGuideModalState.disabled
    // ) {
    //   return null;
    // }
    // 2012-02-21 요구사항 - MinJun, JeeSu
    // else if (welcomeModalState.open) {
    //   return (
    //     <WelcomeModalView
    //       modalState={welcomeModalState}
    //       onClose={this.onCloseWelcome}
    //       onCheckDisable={(e: any, data: any) => this.onCheckNoMoreSee(PageType.Welcome, data.checked)}
    //     />
    //   );
    // }
    // 2020-04-08 김우성 - 사용방법 팝업 제거
    // else if (tutorialModalState.open) {
    //   return (
    //     <TutorialModalView
    //       modalState={tutorialModalState}
    //       onClose={this.onCloseTutorial}
    //       onCheckDisable={(e: any, data: any) => this.onCheckNoMoreSee(PageType.Tutorial, data.checked)}
    //     />
    //   );
    // }
    // 2012-02-14 요구사항 - JuneHee
    // else if (systemGuideModalState.open) {
    //   return (
    //     <SystemGuideModalView
    //       modalState={systemGuideModalState}
    //       onClose={this.onCloseSystemGuide}
    //       onCheckDisable={(e: any, data: any) => this.onCheckNoMoreSee(PageType.SystemGuide, data.checked)}
    //     />
    //   );
    // }

    return null;
  }
}

export default MainModalsContainer;

