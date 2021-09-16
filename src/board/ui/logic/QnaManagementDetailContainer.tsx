import React from 'react';
import {
  ReactComponent,
  mobxHelper,
  reactAutobind,
} from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { SupportService } from '../../stores';

interface Param {
  //
  qnaId: string;
}

interface Props extends RouteComponentProps<Param> {
  //
}

interface Injected {
  supportService: SupportService;
}

@inject(mobxHelper.injectFrom('board.supportService'))
@observer
@reactAutobind
class QnaManagementDetailContainer extends ReactComponent<Props, {}, Injected> {
  //
  componentDidMount() {
    //
    this.init();
  }

  async init() {
    //
    const { qnaId } = this.props.match.params;
    const { supportService } = this.injected;

    await supportService.findQnaById(qnaId);
  }

  render() {
    //
    return <></>;
  }
}

export default withRouter(QnaManagementDetailContainer);
