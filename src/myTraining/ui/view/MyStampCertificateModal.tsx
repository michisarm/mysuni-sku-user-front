import React, {Component} from 'react'
import { Button, Icon, Modal, Image } from 'semantic-ui-react'
// import { useRequestBadgeWIthCategory } from '../../service/useRequestBadgeWIthCategory';
// import ImgCongratulating from '../../../../public/images/all/img-congratulation.svg';
import ImgCongratulating from 'style/../../public/images/all/img-congratulation.svg';
// import ImgMybadge from '../../../../../images/all/img-mybadge.png';
import { MyTrainingTableViewModel } from '../../model';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';

interface Props {
  myStamp: MyTrainingTableViewModel
}

interface States {
  open: boolean
}

@reactAutobind
class MyStampCertificateModal extends Component<Props, States> {
  
  state = {
    open: false,
  };

  onOpen() {
    this.setState({ open: true });
  }

  onClose() {
    this.setState({ open: false });
  }

  render() {
      const { myStamp } = this.props;
      const { open } = this.state;

    return (
      <>
        <Modal
          open={open} 
          onOpen={this.onOpen} 
          onClose={this.onClose}
          className="base mypage-modal-pop"
          on="click"
          trigger={
            <div className="button-area">
              <Button 
                className="fix line"
              >
                인증서 보기
              </Button>
            </div>
          }
        >
          <Modal.Header>
              Badge 인증서 보기 
              <Button className="close" onClick={this.onClose}>
                Close
              </Button>
          </Modal.Header>
          <Modal.Content>
            <div className="contents-wrapper">
              <div className="logo-area">
                  <Icon className="sk-university"/>
              </div>
              <div className="ctf-wrapper">
                <div className="image-area">
                    <Image src={ImgCongratulating}/> 
                </div>
                <div className="message-wrapper">
                  <span>
                    김써니님의 <strong>AI/DT Literacy</strong><br/>
                    과정 이수가 완료되었음을 알려드립니다.
                  </span>
                  <p className="message-area">
                      {`본 과정의 이수를 위해 의미 있는 시간과 노력을 기울여 주신 것에 진심으로 감사드리며, \nmySUNI에서 발급한 수료증을 보내드립니다.
                      \n본 과정의 이수를 통해 습득하신 역량이 현재 업무에 실제로 활용되기 위해서는 지속적인 노력과 학습이 이루어져야 한다는 점을\n당부드리며, 앞으로도 mySUNI에 많은 관심을 부탁드립니다.
                      \n감사합니다.`}
                  </p>
                  {/* <Image src={ImgMystamp}/> */}
                  <div className="bottom-button">
                      <Button className="fix line">수료증 출력하기</Button>
                      <Button className="fix bg">수료증 다운로드</Button>
                      <span>※ 이미지가 안나올 경우, 인터넷 옵션 &#8250; 도구 &#8250; 고급탭 에서 배경색 및 이미지 인쇄 부분을 체크해주세요. </span>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Content>
        </Modal>
      </>
    )
  }
}

export default MyStampCertificateModal;
