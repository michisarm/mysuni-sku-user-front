
import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { Button, Icon, Modal } from 'semantic-ui-react';
import { ActionLogService } from 'shared/stores';


interface Props {
  actionLogService?: ActionLogService,
  trigger: React.ReactNode,
}

interface State {
  open: boolean
}

@inject(mobxHelper.injectFrom('shared.actionLogService'))
@reactAutobind
@observer
class CreateMovieModalContainer extends React.Component<Props, State> {
  //
  state = {
    open: false,
  };


  onOpen() {
    this.setState({ open: true });
  }

  onClose() {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: 'Cancel' });

    this.setState({ open: false });
  }

  onOpenPanopto() {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: 'Panopto 열기' });

    window.open('https://sku.ap.panopto.com/Panopto/Pages/Recorder/LaunchRecorder.aspx');
  }

  onDownload() {
    //
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;

    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: 'Panopto 다운로드' });

    if (userAgent.includes('Mac')) {
      window.open('https://sku.ap.panopto.com/Panopto/Cache/8.0.0.00117/Software/Panopto%20Recorder.pkg?arch=None&useCustomBinary=True');
    }
    else if (userAgent.includes('Windows')) {
      if (platform === 'Win64') {
        window.open('https://sku.ap.panopto.com/Panopto/Cache/8.1.0.00076/Software/PanoptoRecorder.exe?arch=Amd64&useCustomBinary=True');
      } else if (platform === 'Win32') {
        window.open('https://sku.ap.panopto.com/Panopto/Cache/8.1.0.00076/Software/PanoptoRecorder.exe?arch=Amd64&useCustomBinary=True');
      }
    }
  }

  render() {
    //
    const { trigger } = this.props;
    const { open } = this.state;

    return (
      <Modal className="base w700" trigger={trigger} open={open} onOpen={this.onOpen} onClose={this.onClose}>
        <Modal.Header>
          Create Movie
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="content-wrap1">
              <div className="table-css type1 type4">
                <div className="row">
                  <div className="cell th"><span className="dot">Panopto 설치 확인</span></div>
                  <div className="cell">
                    <span className="text1">Panopto가 열리지 않은 경우 아래 최신 버전의 Panopto를 다운로드하여 설치여부를 확인하십시오.</span>
                    <span className="text5">
                      <Button icon className="left icon-big-line2" onClick={this.onOpenPanopto}>
                        <Icon className="open" /><span>Panopto 열기</span>
                      </Button>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="cell"><span className="dot">Panopto 다운로드</span></div>
                  <div className="cell">
                    <span className="text1">PowerPoint, 비디오 및 오디오 프리젠테이션을 레코딩 합니다. 레코딩 결과를 Panopto 사이트에 업로드하여 학생 및 동료들과 공유하십시오.</span>
                    <span className="text5">
                      <Button icon className="left icon-big-line2" onClick={this.onDownload}>
                        <Icon className="download2" /><span>Panopto 다운로드</span>
                      </Button>
                      <span className="desc">macOS 10.13 이상 버전용</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 d" onClick={this.onClose}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default CreateMovieModalContainer;
