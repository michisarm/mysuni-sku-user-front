
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import CreateDetailContainer from '../logic/CreateDetailContainer';


@observer
@reactAutobind
class CreateDetailPage extends Component {
  //
  render() {
    //
    return (
      <CreateDetailContainer />
    );
  }
}

export default CreateDetailPage;
