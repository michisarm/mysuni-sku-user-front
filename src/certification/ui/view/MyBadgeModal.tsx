import React, {Component} from 'react'
import { Button, Icon, Modal, Image } from 'semantic-ui-react'
import { useRequestBadgeWIthCategory } from '../../service/useRequestBadgeWIthCategory';
// import ImgCongratulating from '../../../../public/images/all/img-congratulation.svg';
import ImgCongratulating from 'style/../../public/images/all/img-congratulation.svg';
// import ImgMybadge from '../../../../../images/all/img-mybadge.png';
import { MyBadge } from '../../model/MyBadge';
import { Badge } from '../../model/Badge';

import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import BadgeService from '../../present/logic/BadgeService';
import BadgeView from '../view/BadgeView';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import { SkProfileService } from 'profile/stores';
import moment from 'moment';

interface Props {
  myBadge: MyBadge;
  badgeService?: BadgeService;
  skProfileService?: SkProfileService;
  // test: any;
}

interface States {
  open: boolean,
}

@inject(
  mobxHelper.injectFrom(
    'badge.badgeService',
    'profile.skProfileService',
  )
)
@reactAutobind
@observer
class MyBadgeModal extends Component<Props, States> {
  
  state = {
    open: false,
  };

  onOpen() {
    this.setState({ open: true });
    // const { badgeStudent, challengeState, passedCardCount } = this.props.badgeStudentService!;
    const { badgeService, myBadge } = this.props;
    badgeService!.findBadge(myBadge.id).then(res => console.log("test", res))
    // const test = this.props.test(this.props.myBadge.id)
    // console.log("badgeStudent", badgeService, aaa)
  }

  onClose() {
    this.setState({ open: false });
  }

  onClickcertificatePrint() {
    alert("준비중입니다.")
    // const printableElements = document.getElementById('printme')?.innerHTML;
    // if(printableElements){
    //   const orderHtml = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
    //   const oldPage = document.body.innerHTML;
    //   document.body.innerHTML = orderHtml;
    //   window.print();
    //   document.body.innerHTML = oldPage
    // }
  }

  onClickCertificateImageDownload() {
    alert("준비중입니다.")
  }

  render() {
      const { myBadge, badgeService, skProfileService } = this.props;
      const { skProfile } = skProfileService!;
      const { badge } = badgeService!;
      const { open } = this.state;
      
      // const starStyle = getStarStyle(myBadge.level);
      // const emHtml = getEmHtml(myBadge.level, myBadge.badgeCategory?.themeColor || '#ea012c');

      console.log("MyBadgeModal")
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
        {badge && (
          <>
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
                <div className="image-area" id="printme">
                    <Image src={ImgCongratulating}/> 
                </div>
                <div className="message-wrapper">
                  <span>
                    {skProfile.member.name}님의 <strong>{myBadge.name}</strong><br/>
                    프로그램 이수가 완료되었음을 알려드립니다.
                  </span>
                  <p className="message-area">
                      {`본 프로그램의 이수를 위해 의미 있는 시간과 노력을 기울여 주신 것에 진심으로 감사드리며, mySUNI에서 발급한 수료증을 보내드립니다.
                      \n『${myBadge.name}』 프로그램을 이수한다는 것은 SK의 구성원들이 필히 갖추어야 하는 ${myBadge.badgeCategory.name} 역량에 대한 기본적인 이해와 \n지식을 보유한 것은 물론, ${myBadge.badgeCategory.name} College에서 제공하는 상위 과정들을 수강할 수 있는 자격을 갖추게 되었음을 의미합니다. \n본 프로그램의 이수를 통해 습득하신 역량이 현재 업무에 실제적으로 활용되기 위해서는지속적인 노력과 학습이 이루어져야 \n한다는 점을 당부드리며, 앞으로도 mySUNI ${myBadge.badgeCategory.name} College에 많은 관심을 부탁드립니다.
                      \n감사합니다.`}
                  </p>
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
                  <div className="my_certificate mybadge">
                    <div className="txt_box">
                        <strong className="name">{skProfile.member.name}</strong>
                        <p>
                            귀하는 아래 프로그램의 전 과정을
                            <br/>성공적으로 이수하였으며, Badge 획득 요건을
                            <br/>충족하였기에 이 증서를 드립니다.
                        </p>
                        <span className="category">{badge.name}</span>
                        <span className="date">{moment(badge.time).format('YYYY.MM.DD')}</span>   
                    </div>
                    <div className="badge badge-list-type">
                      <BadgeView
                        id={myBadge.id}
                        name={myBadge.name}
                        level={myBadge.level}
                        iconUrl={myBadge.iconUrl}
                        categoryId={myBadge.categoryId}
                        badgeStyle={BadgeStyle.List}
                        badgeSize={BadgeSize.Small}
                      />
                        {/* <BadgeCard
                            size={size}
                            learningLevel={learningLevel}
                            isCombine={isCombine}
                            linkable={linkable}
                        >
                            <span className="badge_thumb">
                                <img src={badgeStyle} alt="뱃지이미지"/>
                            </span>
                            <span className="issuing">
                                <Image src={myBadge.badgeCategory?.topImagePath} alt="발급기관:mySUNI"/>
                            </span>
                            <span className="college">
                                <Image src={CollegeImg} alt="College" />
                            </span>
                            <span className="title">
                                <span className="cell">
                                    <span>AWS Certified Cloud Practitioner</span>
                                </span>
                            </span>
                            <p className="star-score">
                                <em>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15">
                                        <g fill="none" fill-rule="evenodd">
                                            <g fill="#EA012C" fill-rule="nonzero">
                                                <g>
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <g>
                                                                    <path d="M7 10.5L2.886 12.663 3.671 8.082 0.343 4.837 4.943 4.168 7 0 9.057 4.168 13.657 4.837 10.329 8.082 11.114 12.663z" transform="translate(-226 -979) translate(100 421) translate(0 58) translate(0 326) translate(92 174) translate(34 .714)"/>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </em>
                                <em>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15">
                                        <g fill="none" fill-rule="evenodd">
                                            <g fill="#EA012C" fill-rule="nonzero">
                                                <g>
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <g>
                                                                    <path d="M7 10.5L2.886 12.663 3.671 8.082 0.343 4.837 4.943 4.168 7 0 9.057 4.168 13.657 4.837 10.329 8.082 11.114 12.663z" transform="translate(-226 -979) translate(100 421) translate(0 58) translate(0 326) translate(92 174) translate(34 .714)"/>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </em>
                                <em>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15">
                                        <g fill="none" fill-rule="evenodd">
                                            <g fill="#EA012C" fill-rule="nonzero">
                                                <g>
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <g>
                                                                    <path d="M7 10.5L2.886 12.663 3.671 8.082 0.343 4.837 4.943 4.168 7 0 9.057 4.168 13.657 4.837 10.329 8.082 11.114 12.663z" transform="translate(-226 -979) translate(100 421) translate(0 58) translate(0 326) translate(92 174) translate(34 .714)"/>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </em>
                            </p>
                        </BadgeCard> */}
                    </div>
                  </div>
                  {/* 인증서 영역 끝 */}
                  
                  <div className="bottom-button">
                      <Button 
                        className="fix line"
                        onClick={this.onClickcertificatePrint}
                      >
                        인증서 출력하기
                      </Button>
                      <Button 
                        className="fix bg"
                        onClick={this.onClickCertificateImageDownload}
                      >
                        인증서 다운로드
                      </Button>
                      <span>※ 이미지가 안나올 경우, 인터넷 옵션 &#8250; 도구 &#8250; 고급탭 에서 배경색 및 이미지 인쇄 부분을 체크해주세요. </span>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Content>
          </>
        )}
        </Modal>
      </>
    )
  }
}

export default MyBadgeModal;
