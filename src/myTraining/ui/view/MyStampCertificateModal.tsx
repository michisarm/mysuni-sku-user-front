import React, { Component } from 'react';
import { Button, Icon, Modal, Image } from 'semantic-ui-react';
// import { useRequestBadgeWIthCategory } from '../../service/useRequestBadgeWIthCategory';
// import ImgCongratulating from '../../../../public/images/all/img-congratulation.svg';
import ImgCongratulating from 'style/../../public/images/all/img-congratulation.svg';
import PassedStamp from 'style/../../public/images/all/passed_badge.png';
// import ImgMybadge from '../../../../../images/all/img-mybadge.png';
import { MyTrainingTableViewModel } from '../../model';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { SkProfileService } from 'profile/stores';
// import * as htmlToImage from 'html-to-image';
import { toJpeg } from 'html-to-image';
import html2canvas from 'html2canvas';
import ReactToPrint from 'react-to-print';
import bg_mystamp from 'style/../../public/images/all/bg_mystamp.png';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface Props {
  myStamp: MyTrainingTableViewModel;
  skProfileService?: SkProfileService;
}

interface States {
  open: boolean;
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@observer
@reactAutobind
class MyStampCertificateModal extends Component<Props, States> {
  state = {
    open: false,
  };

  printRef = React.createRef<HTMLDivElement>();

  onOpen() {
    this.setState({ open: true });
  }

  onClose() {
    this.setState({ open: false });
  }

  onClickcertificatePrint() {
    alert('준비중입니다.');
  }

  onClickCertificateImageDownload(id: string, name: string, time: number) {
    if (id) {
      const img = document.getElementById(`MY-STAMP-${id}`) as HTMLImageElement;
      // toJpeg(img, { quality: 1 })
      // .then( dataUrl => {
      //   const link = document.createElement('a');
      //   link.download = `mySUNI-STAMP-CERTIFICATE-${name}-${moment(time).format('YYYY.MM.DD')}.jpeg`;
      //   link.href = dataUrl;
      //   link.click();
      // });

      html2canvas(img).then((canvas) => {
        const _download = document.createElement('a');
        _download.id = 'MY-STAMP';
        _download.href = canvas
          .toDataURL('image/jpeg')
          .replace('image/jpeg', 'image/octet-stream');
        _download.setAttribute(
          'download',
          `mySUNI-STAMP-CERTIFICATE-${name}-${moment(time).format(
            'YYYY.MM.DD'
          )}.jpg`
        );
        document.body.appendChild(_download);
        _download.click();
      });
    }
  }

  render() {
    const { myStamp, skProfileService } = this.props;
    const { skProfile } = skProfileService!;
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
            <Link to="#" className="btn-blue">
              보기
            </Link>
          }
        >
          <Modal.Header>
            Stamp 수료증 보기
            <Button className="close" onClick={this.onClose}>
              Close
            </Button>
          </Modal.Header>
          <Modal.Content>
            <div className="contents-wrapper">
              <div className="logo-area">
                <Icon className="sk-university" />
              </div>
              <div className="ctf-wrapper">
                <div className="image-area">
                  <Image src={ImgCongratulating} />
                </div>
                <div className="message-wrapper">
                  <span>
                    {skProfile.member.name}님의 <strong>{myStamp.name}</strong>
                    <br />
                    과정 이수가 완료되었음을 알려드립니다.
                  </span>
                  <p className="message-area">
                    {`본 과정의 이수를 위해 의미 있는 시간과 노력을 기울여 주신 것에 진심으로 감사드리며, \nmySUNI에서 발급한 수료증을 보내드립니다.
                      \n본 과정의 이수를 통해 습득하신 역량이 현재 업무에 실제로 활용되기 위해서는 지속적인 노력과 학습이 이루어져야 한다는 점을\n당부드리며, 앞으로도 mySUNI에 많은 관심을 부탁드립니다.
                      \n감사합니다.`}
                  </p>

                  {/* 인증서 영역 */}
                  <div className="certi_box" ref={this.printRef}>
                    <div
                      className="my_certificate mystamp"
                      id={`MY-STAMP-${myStamp.id}`}
                    >
                      <Image src={bg_mystamp} />
                      <div className="txt_box">
                        <strong className="name">
                          {skProfile.member.name}
                          <p>
                            귀하는 아래 과정을 성공적으로 이수하였기에
                            <br />이 증서를 드립니다.
                          </p>
                          <span className="category">{myStamp.name}</span>
                          <span className="date">
                            {moment(myStamp.time).format('YYYY.MM.DD')}
                          </span>
                        </strong>
                      </div>
                      <div className="stamp">
                        <Image src={PassedStamp} />
                      </div>
                    </div>
                  </div>
                  {/* 인증서 영역 끝 */}
                  {/* <Image src={ImgMystamp}/> */}
                  <div className="bottom-button">
                    {/* <Button
                        className="fix line"
                        onClick={this.onClickcertificatePrint}
                      >
                        수료증 출력하기
                      </Button> */}
                    <ReactToPrint
                      trigger={() => {
                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                        // to the root node of the returned component as it will be overwritten.
                        return (
                          <Button className="fix line">수료증 출력하기</Button>
                        );
                      }}
                      content={() => this.printRef.current}
                      pageStyle=""
                    />
                    <Button
                      className="fix bg"
                      onClick={() =>
                        this.onClickCertificateImageDownload(
                          myStamp.id,
                          parsePolyglotString(myStamp.name),
                          myStamp.time
                        )
                      }
                    >
                      수료증 다운로드
                    </Button>
                    <span style={{ textAlign: 'left' }}>
                      ※ 이미지가 안나올 경우, 인터넷 옵션 &#8250; 도구 &#8250;
                      고급탭 에서 배경색 및 이미지 인쇄 부분을 체크해주세요.{' '}
                      <br />※ 인쇄 사이즈 조정이 어려우면, 이미지 파일을
                      다운받아 인쇄하여 주시기 바랍니다.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

export default MyStampCertificateModal;
