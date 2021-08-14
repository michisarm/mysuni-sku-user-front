import React, { Component } from 'react';
import { Modal, Button, Select } from 'semantic-ui-react';
import { reactAutobind } from '@nara.platform/accent';
import depot from '@nara.drama/depot';
import PrivacyPolicyView from '../view/PrivacyPolicyView';
import { getPolyglotText, PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

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
        key: '20210614',
        value: '20210614',
        text: getPolyglotText(
          '공고일자 : 2021 년 6월 14일',
          'home-개정얼-공고3'
        ),
      },
      {
        key: '20200901',
        value: '20200901',
        text: getPolyglotText(
          '공고일자 : 2020 년 9월 1일',
          'home-개정얼-공고1'
        ),
      },
      {
        key: '20200117',
        value: '20200117',
        text: getPolyglotText(
          '공고일자 : 2020 년 1월 17일',
          'home-개정얼-공고2'
        ),
      },
    ],
    policyVer: '20210614',
  };

  componentWillUnmount(): void {
    this.setState({ open: false, policyVer: '20210614' });
  }

  show() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false, policyVer: '20210614' });
  }

  async onDownloadPrivacyPolicy() {
    //
    const depotFile: any = await depot.getDepotFiles('ee-1', true);

    if (depotFile) {
      depot.downloadDepotFile(depotFile.id);
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
          <div className="modal-header">
            <PolyglotText defaultString="개인정보 처리방침" id="home-개정얼-타이틀" />
            <Select
              className="small-border select-right"
              placeholder={getPolyglotText('선택하세요', 'home-개정얼-선택')}
              options={privacyPolicyOption}
              value={policyVer}
              onChange={this.onChangePolicy}
            />
          </div>
          <div className="modal-header-li">
            <PolyglotText defaultString="※ 이전버전의 공고사항은 상단의 공고일자를 변경하여 확인 부탁드립니다." id="home-개정얼-상세설명" />
          </div>
        </Modal.Header>
        <Modal.Content>
          <PrivacyPolicyView policyVer={policyVer} />
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 p" onClick={this.close}>
            <PolyglotText defaultString="OK" id="home-개정얼-ok" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
