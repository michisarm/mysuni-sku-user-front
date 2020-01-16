import * as React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

interface Props {
  open: boolean
  handleChangeOpen: (open: boolean) => void
}

class CreateMovieDetailModal extends React.Component<Props> {

  handleCancel() {
    //
    const { handleChangeOpen } = this.props;
    handleChangeOpen(false);
  }

  handleClick() {
    window.open('https://sku.ap.panopto.com/Panopto/Pages/Recorder/LaunchRecorder.aspx');
  }

  handleClickDownload() {
    const userAgent = window.navigator.userAgent;

    if (userAgent.includes('Mac')) {
      window.open('https://sku.ap.panopto.com/Panopto/Cache/8.0.0.00117/Software/Panopto%20Recorder.pkg?arch=None&useCustomBinary=True');
    }
    else if (userAgent.includes('Windows')) {
      if (userAgent.includes('x64')) {
        window.open('https://sku.ap.panopto.com/Panopto/Cache/8.0.0.00117/Software/PanoptoRecorder.exe?arch=Amd64&useCustomBinary=True');
      } else if (userAgent.includes('x86')) {
        window.open('https://sku.ap.panopto.com/Panopto/Cache/8.0.0.00117/Software/PanoptoRecorder.exe?arch=X86&useCustomBinary=True');
      }
    }
  }

  render() {
    const { open, handleChangeOpen } = this.props;
    return (
      <>
        <Button className="personal line" onClick={() => handleChangeOpen(true)}>Create Movie</Button>

        <Modal open={open} onClose={() => handleChangeOpen(false)} className="base w700">
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
                        <Button icon className="left icon-big-line2" onClick={this.handleClick}>
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
                        <Button icon className="left icon-big-line2" onClick={this.handleClickDownload}>
                          <Icon className="download2" /><span>Panopto 다운로드</span>
                        </Button>
                        <span className="desc">macOS 10.13 이상 버전용</span>
                      </span>
                      <span className="text1">기타 다운로드 옵션을 보려면 <a href="#">여기</a>를 클릭하십시오.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Content>
          <Modal.Actions className="actions2">
            <Button className="pop2 d" onClick={() => this.handleCancel()}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default CreateMovieDetailModal;
