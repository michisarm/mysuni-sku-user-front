import React, { Component, createRef } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import TabMenuItem from '../view/TabMenuItem';
import CompletedListView from '../view/CompletedListView';

interface Props{

}

interface States {

}

@reactAutobind
class CompletedContainer extends Component<Props, States> {
   contextRef = createRef();

   onChangeItem() {

   }

   render() {

     return (
       <div>
         <TabMenuItem context={this.contextRef} activeItem="completedList" onChangeItem={this.onChangeItem} />
         <CompletedListView />
       </div>
     );
   }
}

export default CompletedContainer;
