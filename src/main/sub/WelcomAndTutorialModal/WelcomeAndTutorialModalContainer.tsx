
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import WelcomeModalView from './WelcomeModalView';
import TutorialModalView from './TutorialModalView';


interface State {
  openWelcome: boolean
  openTutorial: boolean
  // noMoreSeeWelcome: boolean
  noMoreSeeTutorial: boolean
  noMoreSeeCheckedWelcome: boolean
  noMoreSeeCheckedTutorial: boolean
}

enum PageType {
  Welcome = 'Welcome',
  Tutorial = 'Tutorial',
}

@reactAutobind
@observer
class LinkedInModal extends Component<{}, State> {
  //
  state = {
    openWelcome: false,
    openTutorial: false,
    // noMoreSeeWelcome: false,
    noMoreSeeCheckedWelcome: false,
    noMoreSeeTutorial: false,
    noMoreSeeCheckedTutorial: false,
  };


  componentDidMount(): void {
    //
    this.initFromStorage(PageType.Welcome);
    this.initFromStorage(PageType.Tutorial);
  }

  initFromStorage(pageType: PageType) {
    //
    const noMoreSee = window.localStorage.getItem(this.getLocalStorageKey(pageType));

    if (noMoreSee) {
      this.setState({ [`noMoreSee${pageType}`]: true } as any);
    }
    else {
      this.setState({ [`open${pageType}`]: true } as any);
    }
  }

  getLocalStorageKey(pageType: PageType) {
    return `mySUNI.noMoreSee${pageType}`;
  }

  onOpen(pageType: PageType) {
    //
    this.setState({ [`open${pageType}`]: true } as any);
  }

  onCloseWelcome() {
    //
    this.onClose(PageType.Welcome);
    this.initFromStorage(PageType.Tutorial);
  }

  onCloseTutorial() {
    //
    this.onClose(PageType.Tutorial);
  }

  onClose(pageType: PageType) {
    //
    const noMoreSeeChecked = (this.state as any)[`noMoreSeeChecked${pageType}`];

    if (noMoreSeeChecked) {
      window.localStorage.setItem(this.getLocalStorageKey(pageType), 'true');
    }

    this.setState({ [`open${pageType}`]: false } as any);
  }

  onCheckNoMoreSee(pageType: PageType) {
    this.setState((state) => ({
      [`noMoreSeeChecked${[pageType]}`]: !((state as any)[`noMoreSeeChecked${pageType}`]),
    } as any));
  }

  render() {
    //
    const {
      openWelcome, openTutorial, noMoreSeeTutorial, noMoreSeeCheckedWelcome, noMoreSeeCheckedTutorial,
    } = this.state;

    if (noMoreSeeTutorial) {
      return null;
    }
    else if (openWelcome) {
      return (
        <WelcomeModalView
          open={openWelcome}
          noMoreSeeChecked={noMoreSeeCheckedWelcome}
          onClose={this.onCloseWelcome}
          onClickNoMoreSee={() => this.onCheckNoMoreSee(PageType.Welcome)}
        />
      );
    }
    else if (openTutorial) {
      return (
        <TutorialModalView
          open={openTutorial}
          noMoreSeeChecked={noMoreSeeCheckedTutorial}
          onClose={this.onCloseTutorial}
          onClickNoMoreSee={() => this.onCheckNoMoreSee(PageType.Tutorial)}
        />
      );
    }
    return null;
  }
}

export default LinkedInModal;

