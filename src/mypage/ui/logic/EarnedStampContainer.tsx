import React, { Component, createRef } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import TabMenuItem from '../view/TabMenuItem';
import EarnedStampListView from '../view/EarnedStampListView';

@reactAutobind
class EarnedStampContainer extends Component {
  contextRef = createRef();

  onChangeItem() {

  }

  render() {

    return (
      <div>
        <TabMenuItem context={this.contextRef} activeItem="EarnedStampList" onChangeItem={this.onChangeItem} />
        <EarnedStampListView />
      </div>
    );
  }
}

export default EarnedStampContainer;
