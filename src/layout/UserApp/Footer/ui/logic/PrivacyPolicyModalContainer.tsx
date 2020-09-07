import React, { Component } from 'react';
import { Modal, Button, Select } from 'semantic-ui-react';
import { reactAutobind } from '@nara.platform/accent';
import depot from '@nara.drama/depot';
import PrivacyPolicyView from '../view/PrivacyPolicyView';

interface Props {
  trigger: React.ReactNode;
}

interface State {
  open: boolean;
  privacyPolicyOption: {};
  policyVer: string;
}

@reactAutobind
export default class PrivacyPolicyModalContainer extends Component<
  Props,
  State
> {
  //
  state = {
    open: false,
    privacyPolicyOption: [
      {
        key: '20200901',
        value: '20200901',
        text: '공고일자 : 2020 년 9월 1일',
      },
      {
        key: '20200117',
        value: '20200117',
        text: '공고일자 : 2020 년 1월 17일',
      },
    ],
    policyVer: '20200901',
  };

  componentWillUnmount(): void {
    this.setState({ open: false, policyVer: '20200901' });
  }

  show() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false, policyVer: '20200901' });
  }

  async onDownloadPrivacyPolicy() {
    //
    const depotFile: any = await depot.getDepotFiles('ee-1', true);

    if (depotFile) {
      depot.downloadDepotFile(depotFile.id);
    } else {
      console.warn('[mySUNI] 개인정보처 요구서 파일이 없습니다.');
    }
  }

  onChangePolicy(e: any, data: any) {
    //
    this.setState({ policyVer: data.value });
  }

  render() {
    //
    const { open, privacyPolicyOption, policyVer } = this.state;
    const { trigger } = this.props;

    return (
      <Modal
        open={open}
        onOpen={this.show}
        onClose={this.close}
        className="base w700"
        trigger={trigger}
      >
        <Modal.Header>
          개인정보 처리방침
          <Select
            className="small-border select-right"
            placeholder="선택하세요"
            options={privacyPolicyOption}
            value={policyVer}
            onChange={this.onChangePolicy}
          />
        </Modal.Header>
        <Modal.Content>
          <PrivacyPolicyView policyVer={policyVer} />
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 p" onClick={this.close}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
