import React, { Component } from 'react';
import { Button, Icon, Modal, Image } from 'semantic-ui-react';
import { useRequestBadgeWIthCategory } from '../../service/useRequestBadgeWIthCategory';
// import ImgCongratulating from '../../../../public/images/all/img-congratulation.svg';
import ImgCongratulating from 'style/../../public/images/all/img-congratulation.svg';
// import ImgMybadge from '../../../../../images/all/img-mybadge.png';
import { MyBadge } from '../../model/MyBadge';
import { Badge } from '../../model/Badge';

import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
// import BadgeService from '../../present/logic/BadgeService';
import { BadgeStudentService } from '../../../lecture/stores';
import MyBadgeCertificateView from '../view/MyBadgeCertificateView';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import moment from 'moment';
import html2canvas from 'html2canvas';
import ReactToPrint from 'react-to-print';
import bg_mybadge from 'style/../../public/images/all/bg_mybadge.png';
import { saveAs } from 'file-saver';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';

interface Props {
  myBadge: MyBadge;
  badgeStudentService?: BadgeStudentService;
  // test: any;
}

interface States {
  open: boolean;
}

@inject(mobxHelper.injectFrom('badge.badgeStudentService'))
@reactAutobind
@observer
class MyBadgeModal extends Component<Props, States> {
  state = {
    open: false,
  };

  printRef = React.createRef<HTMLDivElement>();

  onOpen() {
    this.setState({ open: true });
    // const { badgeStudent, challengeState, passedCardCount } = this.props.badgeStudentService!;
    const { badgeStudentService, myBadge } = this.props;
    // badgeService!.findBadge(myBadge.id)
    badgeStudentService!.findBadgeStudent(myBadge.id);
    // const test = this.props.test(this.props.myBadge.id)
    // console.log("badgeStudent", badgeService, aaa)
  }

  onClose() {
    this.setState({ open: false });
  }

  onClickcertificatePrint() {
    alert('준비중입니다.');
    // const printableElements = document.getElementById('printme')?.innerHTML;
    // if(printableElements){
    //   const orderHtml = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
    //   const oldPage = document.body.innerHTML;
    //   document.body.innerHTML = orderHtml;
    //   window.print();
    //   document.body.innerHTML = oldPage
    // }
  }

  b64toBlob(b64Data: string, contentType: string, sliceSize?: number) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  onClickCertificateImageDownload(id: string, name: string, time: number) {
    if (id) {
      const img = document.getElementById(`MY-BADGE-${id}`) as HTMLImageElement;
      const fileName = `mySUNI-BADGE-CERTIFICATE-${name}-${moment(time).format(
        'YYYY.MM.DD'
      )}.png`;

      // 크롬에서 문제가 있을시 아래 주석 해제하여 따로 사용
      html2canvas(img).then((canvas) => {
        const base64image = canvas.toDataURL('image/png');

        // Split the base64 string in data and contentType
        const block = base64image.split(';');
        // Get the content type
        const mimeType = block[0].split(':')[1]; // In this case "image/png"
        // get the real base64 content of the file
        const realData = block[1].split(',')[1]; // For example:  iVBORw0KGgouqw23....

        // Convert b64 to blob and store it into a variable (with real base64 as value)
        const canvasBlob = this.b64toBlob(realData, mimeType);

        // Generate file download
        saveAs(canvasBlob, fileName);
      });

      // if (typeof window.navigator.msSaveBlob !== 'undefined') {
      //   html2canvas(img).then((canvas) => {
      //     const base64image = canvas.toDataURL("image/png");

      //     // Split the base64 string in data and contentType
      //     const block = base64image.split(";");
      //     // Get the content type
      //     const mimeType = block[0].split(":")[1];// In this case "image/png"
      //     // get the real base64 content of the file
      //     const realData = block[1].split(",")[1];// For example:  iVBORw0KGgouqw23....

      //     // Convert b64 to blob and store it into a variable (with real base64 as value)
      //     const canvasBlob = this.b64toBlob(realData, mimeType);

      //     // Generate file download
      //     saveAs(canvasBlob, fileName);
      //   });
      // }else{
      //   toJpeg(img, { quality: 1 })
      //   .then( dataUrl => {
      //     const link = document.createElement('a');
      //     link.download = fileName;
      //     link.href = dataUrl;
      //     link.click();
      //   });
      // }
    }
  }

  render() {
    const { myBadge, badgeStudentService } = this.props;
    const { badgeStudent } = badgeStudentService!;
    const { open } = this.state;

    const myBadgeName = parsePolyglotString(myBadge.name);
    const myBadgeCategoryName = parsePolyglotString(myBadge.badgeCategory.name);
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
              <Button className="fix line">
                {/* 김민준 - 번역 추가 필요 */}
                <PolyglotText
                  id="Certification-mybadgemodal-인증서보기"
                  defaultString="인증서 보기"
                />
              </Button>
            </div>
          }
        >
          {badgeStudent && (
            <>
              <Modal.Header>
                <PolyglotText
                  id="Certification-mybadgemodal-badge인증서"
                  defaultString="Badge 인증서 보기"
                />
                <Button className="close" onClick={this.onClose}>
                  <PolyglotText
                    id="Certification-mybadgemodal-close"
                    defaultString="Close"
                  />
                </Button>
              </Modal.Header>
              <Modal.Content>
                <div className="contents-wrapper">
                  <div className="logo-area">
                    <Icon className="sk-university" />
                  </div>
                  <div className="ctf-wrapper">
                    <div className="image-area" id="printme">
                      <Image src={ImgCongratulating} />
                    </div>
                    <div className="message-wrapper">
                      <span>
                        {parsePolyglotString(badgeStudent.name, 'ko')}
                        <PolyglotText
                          id="Certification-mybadgemodal-이수증타이틀1"
                          defaultString="님의"
                        />
                        <strong>
                          {parsePolyglotString(
                            myBadge.name,
                            getDefaultLang(myBadge.langSupport)
                          )}
                        </strong>
                        <br />
                        <PolyglotText
                          id="Certification-mybadgemodal-이수증타이틀2"
                          defaultString="프로그램 이수가 완료되었음을 알려드립니다."
                        />
                      </span>
                      <p
                        className="message-area"
                        dangerouslySetInnerHTML={{
                          __html: getPolyglotText(
                            `본 프로그램의 이수를 위해 의미 있는 시간과 노력을 기울여 주신 것에 진심으로 감사드리며, mySUNI에서 발급한 수료증을 보내드립니다.
                            <br/>『{myBadgeName}』 프로그램을 이수한다는 것은 SK의 구성원들이 필히 갖추어야 하는 {CategoyName1} 역량에 대한 기본적인 이해와 지식을 보유한 것은 물론, {CategoyName2} College에서 제공하는 상위 과정들을 수강할 수 있는 자격을 갖추게 되었음을 의미합니다. <br/>본 프로그램의 이수를 통해 습득하신 역량이 현재 업무에 실제적으로 활용되기 위해서는지속적인 노력과 학습이 이루어져야 <br/>한다는 점을 당부드리며, 앞으로도 mySUNI {CategoyName3} College에 많은 관심을 부탁드립니다.
                            <br/>감사합니다.`,
                            'Certification-mybadgemodal-이수증내용',
                            {
                              myBadgeName: myBadgeName.toString(),
                              CategoyName1: myBadgeCategoryName.toString(),
                              CategoyName2: myBadgeCategoryName.toString(),
                              CategoyName3: myBadgeCategoryName.toString(),
                            }
                          ),
                        }}
                      />

                      {/* {`본 프로그램의 이수를 위해 의미 있는 시간과 노력을 기울여 주신 것에 진심으로 감사드리며, mySUNI에서 발급한 수료증을 보내드립니다.
                        \n『${myBadge.name}』 프로그램을 이수한다는 것은 SK의 구성원들이 필히 갖추어야 하는 ${myBadge.badgeCategory.name} 역량에 대한 기본적인 이해와 지식을 보유한 것은 물론, ${myBadge.badgeCategory.name} College에서 제공하는 상위 과정들을 수강할 수 있는 자격을 갖추게 되었음을 의미합니다. \n본 프로그램의 이수를 통해 습득하신 역량이 현재 업무에 실제적으로 활용되기 위해서는지속적인 노력과 학습이 이루어져야 \n한다는 점을 당부드리며, 앞으로도 mySUNI ${myBadge.badgeCategory.name} College에 많은 관심을 부탁드립니다.
                        \n감사합니다.`} */}

                      {/* <Image src={ImgMybadge}/> */}
                      {/* <iframe
                      // title="video type"
                      src="https://ma.mysuni.sk.com/certification/badge/?badgeStudentId=d29343fd-e11b-4ea9-8b49-54626092ca6d"
                      // title={videoUrl}
                      // src={videoUrl}
                      width="100%"
                      height="562"
                      style={{padding: '0px', border: '0px'}}
                      frameBorder="0"
                    /> */}

                      {/* 인증서 영역 */}
                      <div className="certi_box" ref={this.printRef}>
                        <div
                          className="my_certificate mybadge"
                          id={`MY-BADGE-${badgeStudent.id}`}
                        >
                          <Image src={bg_mybadge} />
                          <div className="txt_box">
                            <strong className="name">
                              {parsePolyglotString(badgeStudent.name, 'ko')}
                            </strong>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: getPolyglotText(
                                  `귀하는 아래 프로그램의 전 과정을 <br/>성공적으로 이수하였으며,  Badge 획득 요건을<br/>충족하였기에 이 증서를 드립니다.`,
                                  'Certification-mybadgemodal-이수증내용2'
                                ),
                              }}
                            />
                            <span className="category">
                              {parsePolyglotString(
                                myBadge.name,
                                getDefaultLang(myBadge.langSupport)
                              )}
                            </span>
                            <span className="date">
                              {moment(
                                badgeStudent.badgeIssueStateModifiedTime || 0
                              ).format('YYYY.MM.DD')}
                            </span>
                          </div>
                          <div className="badge badge-list-type">
                            <MyBadgeCertificateView
                              id={myBadge.id}
                              name={parsePolyglotString(
                                myBadge.name,
                                getDefaultLang(myBadge.langSupport)
                              )}
                              level={myBadge.level}
                              iconUrl={myBadge.iconUrl}
                              categoryId={myBadge.categoryId}
                              badgeStyle={BadgeStyle.List}
                              badgeSize={BadgeSize.Small}
                            />
                          </div>
                        </div>
                      </div>
                      {/* 인증서 영역 끝 */}

                      <div className="bottom-button">
                        {/* <Button
                          className="fix line"
                          onClick={this.onClickcertificatePrint}
                        >
                          인증서 출력하기
                        </Button> */}
                        <ReactToPrint
                          trigger={() => {
                            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                            // to the root node of the returned component as it will be overwritten.
                            return (
                              <Button className="fix line">
                                <PolyglotText
                                  id="Certification-mybadgemodal-출력하기"
                                  defaultString="인증서 출력하기"
                                />
                              </Button>
                            );
                          }}
                          content={() => this.printRef.current}
                          pageStyle=""
                        />
                        <Button
                          className="fix bg"
                          onClick={() =>
                            this.onClickCertificateImageDownload(
                              badgeStudent.id,
                              parsePolyglotString(badgeStudent.name, 'ko'),
                              badgeStudent.badgeIssueStateModifiedTime
                            )
                          }
                        >
                          <PolyglotText
                            id="Certification-mybadgemodal-다운로드"
                            defaultString="인증서 다운로드"
                          />
                        </Button>
                        <span
                          style={{ textAlign: 'left' }}
                          dangerouslySetInnerHTML={{
                            __html: getPolyglotText(
                              `※ 이미지가 안나올 경우, 인터넷 옵션 &#8250; 도구
                            &#8250; 고급탭 에서 배경색 및 이미지 인쇄 부분을
                            체크해주세요.`,
                              'Certification-mybadgemodal-출력안내1'
                            ),
                          }}
                        />
                        <br />
                        <span>
                          <PolyglotText
                            id="Certification-mybadgemodal-출력안내2"
                            defaultString="※ 인쇄 사이즈 조정이 어려우면, 이미지 파일을 다운받아
                            인쇄하여 주시기 바랍니다."
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Content>
            </>
          )}
        </Modal>
      </>
    );
  }
}

export default MyBadgeModal;
