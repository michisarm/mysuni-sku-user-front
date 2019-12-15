import React, { Component } from 'react';
import {
  Button,
  Icon,
  Modal,
} from 'semantic-ui-react';

interface States {
    open : boolean;
    size? : 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen'
    value? : any
}

interface Props {

}

class CompletedAddPersonalLearningModal extends React.Component<Props, States> {
  constructor(props : Props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  handleChange(e:any, { value }:any) {
    // this.setState({value});
  }

  show(size:'mini' | 'tiny' | 'small' | 'large' | 'fullscreen') {
    this.setState({
      size,
      open: true,
    });
  }

  close() {
    this.setState({ open: false });
  }

  render() {
    const { open, size, value } = this.state;

    return (
      <>
        {/*<Button onClick={this.show('fullscreen')} basic>보기</Button>*/}

        <Modal size={size} open={open} onClose={this.close} className="base w700">
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
                      <span className="text1">Panopto가 열리지 않은 경우 아래 최신 버전의 Panoto를 다운로드하여 설치여부를 확인하십시오.</span>
                      <span className="text5">
                        <Button icon className="left icon-big-line2">
                          <Icon className="open" /><span>Panopto 열기</span>
                        </Button>
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="cell"><span className="dot">Panopto 다운로드</span></div>
                    <div className="cell">
                      <span className="text1">PanoptoPoint, 비디오 및 오디오 프리젠테이션을 레코딩 합니다. 레코딩 결과를 Panopto 사이트에 업로드하여 학생 및 동료들과 공유하십시오.</span>
                      <span className="text5">
                        <Button icon className="left icon-big-line2">
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
            <Button className="pop2 d" onClick={this.close}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default CompletedAddPersonalLearningModal;
