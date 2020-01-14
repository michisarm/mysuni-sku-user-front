import React, { Component } from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import SkProfileService from '../../present/logic/SkProfileService';
import { SkProfileUdo } from '../../model/SkProfileUdo';
import { PisAgreementModel } from '../../model/PisAgreementModel';

interface Props extends RouteComponentProps{
  skProfileService? : SkProfileService
}

@inject(mobxHelper.injectFrom('college.collegeService', 'profile.skProfileService'))
@observer
@reactAutobind
class PisAgreementContainer extends Component<Props> {

  state = {
    all: false,
    mySuni: false,
    domestic: false,
    international: false,
  };

  handleChange(e:any, checkProps:any) {
    const name = e.target.id;
    this.setState({
      [name]: checkProps.checked,
    });
    if ( name === 'all' ) {
      this.setState({
        mySuni: checkProps.checked,
        domestic: checkProps.checked,
        international: checkProps.checked,
      });
    }

  }

  onOk() {
    const { skProfileService } = this.props;
    const { skProfile } = skProfileService as SkProfileService;
    const { studySummary } = skProfileService as SkProfileService;

    const { all, mySuni, domestic, international } = this.state;

    if ( all || (mySuni && domestic && international)) {
      if (skProfileService) {
        skProfileService.findSkProfile();
        // skProfileService.findStudySummary();

        if (skProfile ) {
          skProfile.pisAgreement.signed = true;
          skProfile.pisAgreement.date = new Date().toISOString().slice(1, 10);
          skProfileService.modifySkProfile(new SkProfileUdo({} as any, new PisAgreementModel(skProfile.pisAgreement)));

          // if ( skProfile.member.favoriteJobGroup.favoriteJobDuty
          //   && studySummary.favoriteChannels
          //   && studySummary.favoriteChannels.idNames.length < 4
          //   && studySummary.favoriteLearningType ) {
          //   this.props.history.push('/');
          // } else {
          //   this.props.history.push('/profile/interest/');
          // }
          if ( skProfile.studySummaryConfigured ) {
            this.props.history.push('/');
          } else {
            this.props.history.push('/profile/interest/');
          }
        }
      }
    }
    else reactAlert({ title: '알림', message: '개인정보 처리방침을 확인하시고 동의해주세요' });

  }

  render() {
    const { all, mySuni, domestic, international } = this.state;
    return (

      <ContentLayout
        breadcrumb={[
          { text: '개인정보', path: '/profile' },
          { text: '개인정보 처리방침 동의' },
        ]}
        className="bg-white privacy-agree"
      >
        <div className="terms-content">
          <div className="logo">
            <Icon className="sk-university-login" /><span className="blind">SUNI</span>
          </div>
          <h2 className="title1">mySUNI 개인정보 처리방침에 동의해주세요.</h2>
          <div className="check-area">
            {/*<Checkbox label='전체동의' className='base'/>*/}
            <Checkbox className="black base" label="전체동의" onChange={this.handleChange} id="all" checked={all} />
          </div>
          <div className="check-area">
            <Checkbox label="mySUNI 개인정보 처리방침 동의(필수)" className="base" id="mySuni" checked={mySuni} onChange={this.handleChange} />
            <Checkbox label="제3자 정보제공에 대한 동의(필수)" className="base" id="domestic" checked={domestic} onChange={this.handleChange} />
            <Checkbox label="국외 제3자 정보제공에 대해 동의(필수)" className="base" id="international" checked={international} onChange={this.handleChange} />
          </div>
          <h3 className="title2">mySUNI 개인정보 처리방침 동의 (필수)</h3>
          <div className="terms-text-wrap">
            <div className="privacy">
              <div className="">
                <div className="text1">SK 이노베이션(이하 서비스명 ‘mySUNI’) 개인정보처리방침</div>
                <div className="text1">SK 이노베이션 주식회사 (이하 &quot;회사&quot;)는 mySUNI Learning Management System 운영과 관련하여
                  정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하 ‘정보통신망법’), 개인정보보호법에 따라 구성원의 개인정보를 보호하고 이와 관련한 고충을 신속하고
                  원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침을 수립ㆍ공개합니다.
                </div>
                <div className="text1">회사는 개인정보처리방침을 개정하는 경우 공지사항(또는 개별공지)을 통하여 공지할 것입니다.</div>
                <div className="text1">○ 본 방침은 2020년 1월 17일부터 시행됩니다.</div>
                <div className="text2">1. 개인정보의 처리 목적</div>
                <div className="text3">회사는 구성원의 개인정보를 다음의 목적을 위하여 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지
                  않으며, 이용 목적이 변경되는 경우에는 정보통신망법 제22조, 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                </div>
                <div className="text4">① mySUNI Learning Management System (이하 ‘mySUNI’)가입 및 관리</div>
                <div className="text5">구성원 서비스 제공에 따른 본인 식별/인증, 구성원 회원 자격 유지/관리, 각종 고지/통지, 고충처리 등의 목적으로
                  개인정보를 처리합니다.
                </div>
                <div className="text4">② 서비스 제공</div>
                <div className="text5">콘텐츠/서비스 제공, 본인 인증 등을 목적으로 개인정보를 처리합니다.</div>
                <div className="text4">③ 관계사 시스템 및 외부 Contents Providers 회사 시스템 연동</div>
                <div className="text5">관계사 및 외부 Contents Provider 회사의 교육 프로그램 활용 및 서비스 제공 등의 목적으로 개인정보를
                  처리합니다.
                </div>
                <div className="text2">2. 개인정보 처리 항목 및 보유기간</div>
                <div className="text3">회사는 구성원의 개인정보를 DB형태로 보관/관리하고 있습니다.</div>
                <div className="bt">
                  <table className="four">
                    <thead>
                      <tr>
                        <th scope="col">수집항목</th>
                        <th scope="col">수집방법</th>
                        <th scope="col">보유근거</th>
                        <th scope="col">처리 및 보유기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>소속, 성명, 사번, 직위, 직책, 이메일주소, 사내 전화번호, 휴대전화번호</td>
                        <td>TokTok을 통한 시스템 연계</td>
                        <td>근로기준법 등 관련 법률 및 정보주체 동의</td>
                        <td>해당 구성원 퇴직 시 까지</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text2">3. 개인정보의 제3자 제공에 관한 사항</div>
                <div className="text3">
                  ① mySUNI는 SK 구성원으로부터 수집한 개인정보를 &#39;2. 개인정보 수집 및 이용목적&#39;에서 고지한 범위 내에서만 사용하며, SK 구성원의 동의
                  없이는 동범위를 초과하여 이용하거나 제3자에게 제공하거나 공유하지 않습니다.
                </div>
                <div className="text3">
                  ②mySUNI는 보다 나은 서비스 제공을 위하여 개인정보를 제3자에게 제공하거나 공유할 필요가 있는 경우 제공 또는 공유할 정보의 항목, 제공 또는
                  공유받는 자, 이용목적 및 보유기간, 연락처, 동의하지 않는 경우의 불이익 내용 등을 명시하여 SK 구성원께 동의를 구하는 절차를 거치게 되며,동의하지
                  않는 경우에는 제3자에게 제공 또는 공유하지 않습니다.
                </div>
                <div className="text3">
                  ③ 다만, 다음 각 호의 경우에는 예외로 합니다. <br />
                  - 고객님이 사전에 동의하셨거나 서비스 제공 관련 계약 이행을 위하여 필요한 개인정보로 통상의 동의를 받기가 경제적/기술적 사유로 현저히 곤란한
                  경우<br />
                  - 서비스 제공에 따른 요금정산을 위하여 필요한 경우<br />
                  - 관련법령에 의거 적법한 절차에 의한 정부기관 등의 요청이 있는 경우 고지하고, 개인정보 수집/이용 등에 대한 동의 철회의 선택권을 부여합니다.
                </div>
                <div className="text3">
                  ④ SK 구성원께서 온라인상의 게시판 등을 통해 기재한 인적사항을 제3자가 수집하는 경우가 있을 수 있으므로 이에 유의하시기 바랍니다. SK 구성원께서
                  스스로 게시판 등을 통해 기재한 인적사항과 관련하여 회사는 어떠한 책임도 지지 않습니다.
                </div>
                <div className="bt">
                  <table className="four">
                    <thead>
                      <tr>
                        <th scope="col">제공받는 자</th>
                        <th scope="col">제공받는 자의 이용목적</th>
                        <th scope="col">제공하는 항목</th>
                        <th scope="col">보유 및 이용기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>SK 그룹 계열회사 (자세한 내역은 <a href="http://sk.co.kr" target="_blank">http://sk.co.kr</a> 에서 확인 가능)</td>
                        <td>구성원의 교육 신청, 이수 현황 등 사용 이력</td>
                        <td>교육 이수 현황 등</td>
                        <td>해당 구성원 퇴직시까지</td>
                      </tr>
                      <tr>
                        <td>Linked In</td>
                        <td>구성원 SSO접속, 이수 현황 등</td>
                        <td>소속, 성명, 이메일</td>
                        <td>해당 구성원 퇴직시까지</td>
                      </tr>
                      <tr>
                        <td>Carrot Global</td>
                        <td>구성원 SSO접속, 이수 현황 등</td>
                        <td>소속, 성명, 이메일</td>
                        <td>해당 구성원 퇴직시까지</td>
                      </tr>
                      <tr>
                        <td>Culturetree</td>
                        <td>구성원 SSO접속, 이수 현황 등</td>
                        <td>소속, 성명, 이메일</td>
                        <td>해당 구성원 퇴직시까지</td>
                      </tr>
                      <tr>
                        <td>Coursera</td>
                        <td>구성원 SSO접속, 이수 현황 등</td>
                        <td>소속, 성명, 이메일</td>
                        <td>해당 구성원 퇴직시까지</td>
                      </tr>
                      <tr>
                        <td>Elice</td>
                        <td>구성원 SSO접속, 이수 현황 등</td>
                        <td>소속, 성명, 이메일</td>
                        <td>해당 구성원 퇴직시까지</td>
                      </tr>
                      <tr>
                        <td>휴레드 컨설팅</td>
                        <td>구성원 SSO접속, 이수 현황 등</td>
                        <td>소속, 성명, 이메일</td>
                        <td>해당 구성원 퇴직시까지</td>
                      </tr>
                      <tr>
                        <td>11번가 도서</td>
                        <td>구성원 SSO접속, 이수 현황 등</td>
                        <td>소속, 성명, 이메일</td>
                        <td>해당 구성원 퇴직시까지</td>
                      </tr>
                      <tr>
                        <td>SK M&amp;Service</td>
                        <td>구성원 SSO접속, 이수 현황 등</td>
                        <td>소속, 성명, 이메일</td>
                        <td>해당 구성원 퇴직시까지</td>
                      </tr>
                      <tr>
                        <td>Panopto</td>
                        <td>구성원 SSO접속, 이수 현황 등</td>
                        <td>소속, 성명, 이메일</td>
                        <td>해당 구성원 퇴직시까지</td>
                      </tr>
                      <tr>
                        <td>Globe Smart(APERIAN Global)</td>
                        <td>구성원 SSO접속, 이수 현황 등</td>
                        <td>소속, 성명, 이메일</td>
                        <td>해당 구성원 퇴직시까지</td>
                      </tr>
                      <tr>
                        <td>블룸컴퍼니</td>
                        <td>구성원 SSO접속, 이수 현황 등</td>
                        <td>소속, 성명, 이메일</td>
                        <td>해당 구성원 퇴직시까지</td>
                      </tr>
                      <tr>
                        <td>Leadership College</td>
                        <td>구성원 SSO접속, 이수 현황 등</td>
                        <td>소속, 성명, 이메일</td>
                        <td>해당 구성원 퇴직시까지</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text2">4. 개인정보 처리 위탁</div>
                <div className="text3">회사는 안정적인 개인정보 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</div>
                <div className="bt">
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">위탁받는 자(수탁자)</th>
                        <th scope="col">위탁하는 업무의 내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>SK 주식회사</td>
                        <td>‘mySUNI’ LMS 운영/개발 위탁</td>
                      </tr>
                      <tr>
                        <td>SK M&amp;Service</td>
                        <td>서비스 운영을 위한 메일 안내 및 교육 운영/관리, 결과 Data정리</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="text3">회사는 위탁계약 체결시 정보통신망법 제25조, 개인정보보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지,
                  기술적/관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리/감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를
                  안전하게 처리하는지를 감독하고 있습니다.<br />위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록
                  하겠습니다.
                </div>
                <div className="text3">mySUNI는 SK 구성원에 대한 서비스의 유지 및 관리, 고객상담, 기타 서비스 안내를 위하여 전문용역 업체에 일부 업무를
                  위탁운영하고 있습니다. 위탁을 받은 업체는 위탁을 받은 목적을 벗어나서 개인정보를 이용할 수 없습니다. 또한, mySUNI는 이러한 위탁업체에 대하여
                  해당 개인정보가 위법하게 이용되지 않도록 정기적인 감시와 감독을 실시합니다.
                </div>

                <div className="text2">5. 정보주체의 권리, 의무 및 그 행사방법</div>
                <div className="text3">① 구성원은 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</div>
                <div className="text4">- 개인정보 열람요구</div>
                <div className="text4">- 오류 등이 있을 경우 정정 요구</div>
                <div className="text4">- 삭제요구</div>
                <div className="text4">- 처리정지 요구</div>
                <div className="text3">② 제1항에 따른 권리 행사는 개인정보 보호법 시행규칙 별지 제8호 서식 또는 각 구성원 소속사 사규(개인정보보호규칙)에
                  따라 서면 &middot; 전자우편 &middot; 모사전송(FAX) 등을 통하여 하실 수 있습니다. 다만, 구성원 개인정보의 오류로 인하여 불이익이
                  발생할 수 있으니 상세한 사항은 인사부서에 문의하여 주시기 바랍니다.
                </div>
                <div className="text3">③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우
                  개인정보 보호법 시행규칙 별지 제11호 서식 또는 회사 사규(개인정보보호규칙)에 따른 위임장을 제출하셔야 합니다.
                </div>

                <div className="text2">개인정보의 열람 및 정정</div>
                <div className="text3">① SK 구성원은 언제든지 등록되어 있는 본인의 개인정보를 열람하거나 정정하실 수 있습니다. 특히 SK 구성원의 개인정보의
                  정정 요구에 대하여 MYSUNI는 해당 내용에 대해 정정할 때까지 당해 개인정보를 이용하지 않습니다.
                </div>
                <div className="text3">② mySUNI는 회원의 개인정보 이용내역을 연 1회 이상 회원에게 전자우편·서면·팩스·전화 등의 방법으로 통지합니다.
                </div>

                <div className="text2">개인정보 수집, 이용, 제공에 대한 동의철회</div>
                <div className="text3">① SK 구성원은 회원가입 시 개인정보 수집, 이용 및 제공에 대해 동의하신 내용을 언제든지 철회하실 수 있습니다.
                </div>
                <div className="text3">② 동의 철회는 홈페이지나 고객센터에 연락하여 본인 확인 절차를 거치신 후 직접 동의철회 신청을 하시거나,개인정보 보호책임자
                  또는 개인정보보호담당자에게 서면 또는 E-Mail등으로 송부하여 주시면 지체 없이 조치하여 드립니다.
                </div>

                <div className="text2">개인정보의 처리정지</div>
                <div className="text3">① SK 구성원은 개인정보 수집, 이용 및 제공에 동의하신 내용에 대하여 SK 구성원 본인의 개인정보 처리의 정지를 요구할
                  수 있습니다.
                </div>
                <div className="text3">② 처리정지 요청은 홈페이지나 고객센터에 연락하여 본인 확인 절차를 거치신 후 직접 처리정지를 신청을 하시거나, 개인정보
                  보호책임자 또는 개인정보 보호담당자에게 서면 또는 E-Mail등으로 송부하여 주시면 지체 없이 조치하여 드립니다. 다만, 다음 각 호의 어느 하나에
                  해당하는 경우에는 SK 구성원의 처리정지 요구를 거절할 수 있습니다.
                </div>
                <div className="text4">- 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우</div>
                <div className="text4">- 다른 사람의 생명/신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우
                </div>
                <div className="text4">- 개인정보를 처리하지 아니하면 SK 구성원과 약정한 서비스를 제공하지 못하는 등 계약의 이행이 곤란한 경우로서 SK
                  구성원께서 그 계약의 해지 의사를 명확하게 밝히지 아니한 경우
                </div>
                <div className="text3">※ 로그인이 불가능하신 고객께서는 ‘개인정보 처리 요구서 다운로드 하기’를 이용하여 신청서를 작성하신 후 개인정보 담당자에게
                  이메일 송부 하여 주시기 바랍니다. (문의 <a href="mailto:kite.lee@sk.com">kite.lee@sk.com</a>) <br /><a href="#none">개인정보처리 요구서 다운로드 하기</a>
                </div>

                <div className="text2">6. 개인정보의 파기</div>
                <div className="text3">회사는 원칙적으로 개인정보 보유기간의 경과, 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의
                  절차, 기한 및 방법은 다음과 같습니다.
                </div>
                <div className="text4">- 파기절차</div>
                <div className="text5">회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</div>
                <div className="text4">- 파기기한</div>
                <div className="text5">정보주체로부터 동의 받은 개인정보 보유기간이 경과하거나 처리 목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속
                  보존하여야 하는 경우에는 해당 개인정보는 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보관합니다.<br />또한, 처리목적의 달성, 해당
                  서비스의 폐지, 사업의 종료 등 개인정보가 불필요한 것으로 인정되는 날로부터 3일 이내에 파기합니다.
                </div>
                <div className="text4">- 파기방법</div>
                <div className="text5">전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</div>
                <div className="text5">개인정보 파기 절차 및 방법</div>
                <div className="text5">mySUNI는 수집한 개인정보의 이용목적이 달성되거나, 서비스 회원을 탈퇴할 경우 당해 SK 구성원의 개인정보를 다음 각호의
                  방법으로 지체 없이 파기하여 향후 어떠한 용도로도 열람 또는 이용할 수 없도록 처리하고 있습니다. 단, &#39;5.개인정보 보유기간 및 이용기간 ②&#39;와 같은
                  예외 경우를 두고 있습니다.
                </div>
                <div className="text5">- 종이에 출력된 개인정보는 분쇄기로 분쇄, 소각 또는 용해를 통하여 파기합니다.</div>
                <div className="text5">- 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</div>

                <div className="text2">7. 개인정보의 안전성 확보 조치</div>
                <div className="text3">회사는 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.</div>
                <div className="text3">① 개인정보 취급 직원의 최소화 및 교육</div>
                <div className="text4">개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.</div>
                <div className="text3">② 정기적인 자체 감사 실시</div>
                <div className="text4">개인정보 취급 관련 안정성 확보를 위해 정기적으로 자체 감사를 실시하고 있습니다.</div>
                <div className="text3">③ 내부관리계획의 수립 및 시행</div>
                <div className="text4">개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.</div>
                <div className="text3">④ 개인정보의 암호화</div>
                <div className="text4">구성원의 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를
                  암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.
                </div>
                <div className="text3">⑤ 해킹 등에 대비한 기술적 대책</div>
                <div className="text4">회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을
                  하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.
                </div>
                <div className="text3">⑥ 개인정보에 대한 접근 제한</div>
                <div className="text4">개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한
                  조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.
                </div>
                <div className="text3">⑦ 접속기록의 보관 및 위변조 방지</div>
                <div className="text4">개인정보처리시스템에 접속한 기록을 최소 1년 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록
                  보안기능을 사용하고 있습니다.
                </div>
                <div className="text3">⑧ 문서보안을 위한 잠금장치 사용</div>
                <div className="text4">개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.</div>
                <div className="text3">⑨ 비인가자에 대한 출입 통제</div>
                <div className="text4">개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.</div>
                <div className="text3">개인정보보호를 위한 안정성 확보 조치</div>
                <div className="text3">① mySUNI는 SK 구성원의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조, 또는 훼손되지 않도록 안전성
                  확보를 위하여 다음과 같은 기술적 대책을 강구하고 있습니다.
                </div>
                <div className="text4">- SK 구성원의 주요 개인정보는 암호화하여 저장하고 있으며, 파일 및 전송 데이터를 암호화하여 혹시 발생할 수 있는 사고
                  시라도 SK 구성원의 개인정보가 유출되지 않도록 관리되고 있습니다.
                </div>
                <div className="text4">- SK 구성원의 개인정보를 저장하고 처리하는 시스템은 방화벽과 침입탐지시스템을 통하여 보호되며 24시간 감시를 통하여
                  외부로부터의 위협에 대해 관리되고 있습니다.
                </div>
                <div className="text4">- SK 구성원의 개인정보를 저장하고 처리하는 시스템은 자동으로 갱신되는 백신프로그램을 이용하여 컴퓨터 바이러스에 의한
                  피해로부터 보호되고 있습니다.
                </div>
                <div className="text3">② 또한 mySUNI는 SK 구성원의 개인정보를 처리함에 있어 다음과 같은 관리적 대책을 강구하고 있습니다.</div>
                <div className="text4">- SK 구성원의 개인정보에 대한 접근권한을 최소한의 인원으로 제한하고 있습니다.</div>
                <div className="text4">- 임직원이 업무를 함에 있어 SK 구성원의 개인정보를 보호하기 위해 지켜야 할 사내규정을 마련하여 준수하고 있습니다.
                </div>
                <div className="text4">- 임직원이 SK 구성원의 개인정보를 처리하기 이전에 보안서약서를 통하여 SK 구성원의 개인정보에 대한 정보유출을 사전에
                  방지하고 사내규정에 대한 이행사항 및 준수여부를 감시하기 위한 내부절차를 마련하고 있습니다.
                </div>
                <div className="text4">- 임직원의 개인정보보호 고취를 위한 정기적인 개인정보보호교육을 실시하고 있습니다.</div>
                <div className="text4">- 그 외 내부 관리자의 실수나 기술관리 상의 사고로 인해 개인정보의 상실, 유출, 변조, 훼손이 유발될 경우 즉각 SK
                  구성원께 사실을 알리고 적절한 대책과 보상을 강구할 것입니다.
                </div>
                <div className="text3">③ 하지만 근본적으로 개인정보의 보안관리에는 회원 본인의 노력도 중요합니다. Online 서비스는 오직 아이디와 패스워드를
                  알고 있는 본인에게만 개인정보에 접근할 수 있는 권한이 있으며, 패스워드를 유지하고 관리할 책임 역시도 본인에게 있습니다. 반드시 본인만이 알 수 있는
                  내용으로 패스워드를 구성해야 하며, 생년월일 또는 전화번호 등 타인이 쉽게 도용 할 수 있는 패스워드의 사용을 지양해야 합니다. 또한 공동으로 사용하는
                  PC에서 저희 Online서비스에 접속하여 로그온 한 상태에서 다른 사이트로 이동할 경우, 혹은 서비스 이용을 종료하였을 경우에는 반드시 해당
                  브라우저를 종료하시기 바랍니다. 그렇지 않을 경우, 해당 브라우저를 통해 아이디, 패스워드, 주민등록번호가 포함된 SK 구성원의 정보가 타인에게 손쉽게
                  유출될 위험이 있습니다
                </div>
                <div className="text3">④ mySUNI는 SK 구성원 개인의 실수나 기본적인 인터넷의 위험성 때문에 일어나는 일들에 대해 책임을 지지 않습니다.
                </div>
                <div className="text2">8. 개인정보 보호책임자</div>
                <div className="text3">회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여
                  아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                </div>
                <div className="text3">▶ 개인정보 보호책임자</div>
                <div className="text5">성명 : 이규석</div>
                <div className="text5">소속 : IT전략지원실</div>
                <div className="text5">직책 : 실장</div>
                <div className="text5">연락처 : 02-6323-9002 / <a href="mailto:kite.lee@sk.com">kite.lee@sk.com</a></div>
                <div className="text3">▶ 개인정보 보호담당자</div>
                <div className="text5">성명 : 이의연</div>
                <div className="text5">소속 : LMS실</div>
                <div className="text5">직책 : 매니저</div>
                <div className="text5">연락처 : 010-9246-1785 / <a href="mailto:kite.lee@sk.com">kite.lee@sk.com</a></div>
                <div className="text2">9.인터넷 접속정보파일의 수집 등 등 개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항</div>
                <div className="text3">① 회사는 이용자에게 특화된 맞춤서비스를 제공하기 위해서 이용자들의 정보를 수시로 저장하고 찾아내는 &quot;쿠키(cookie)&quot;,
                  ”로그기록” 등을 수집하고 활용합니다.
                </div>
                <div className="text3">② “쿠키” 및 “로그기록”은 [이용자가 방문한 각 서비스(교육 프로그램)에 대한 이용형태, 검색어, 보안접속 여부, 등을
                  파악하여 이용자에게 최적화된 정보 제공] 목적으로 이용됩니다.
                </div>
                <div className="text3">③ 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을 설정함으로써 쿠키를
                  허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이
                  발생할 수 있습니다.
                </div>
                <div className="text2">10. 권익침해에 대한 구제 방법 (예시)</div>
                <div className="text3">① SK 구성원께서는 mySUNI의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원에 대해개인정보보호책임자 및
                  개인정보보호담당자에게 알려주시기 바랍니다. 지적하신 문제를 조속히 확인하고 수정이 필요한 경우에는 최대한 빠른 시간 내에 조치하도록 노력하겠습니다.
                </div>
                <div className="text3">② 또한 개인정보 침해에 대한 신고, 상담이 필요하신 경우에는 한국인터넷진흥원(KISA) 개인정보 침해신고센터로 문의하시기
                  바랍니다. SK 구성원이 개인정보침해를 통한 금전적, 정신적 피해를 입으신 경우에는 개인정보분쟁조정위원회에 피해구제를 신청하실 수 있습니다.
                </div>
                <div className="text3">▶ 개인정보 침해신고센터 : (국번없이)118, <a href="mailto:privacy.kisa.or.kr">privacy.kisa.or.kr</a></div>
                <div className="text3">▶ 개인정보 분쟁조정위원회 : 1833-6972, <a href="mailto:kopico.go.kr">kopico.go.kr</a></div>
                <div className="text3">▶ 대검찰청 사이버수사과 : (국번없이)1301, <a href="mailto:cid@spo.go.kr">cid@spo.go.kr</a> , <a href="http://www.spo.go.kr" target="_blank">spo.go.kr</a></div>
                <div className="text3">▶ 경찰청 사이버안전국 : (국번없이)182, <a href="mailto:cyberbureau.police.go.kr">cyberbureau.police.go.kr</a></div>

                <div className="text2">11. 개인정보처리방침의 변경에 관한 사항</div>
                <div className="text3">① 본 개인정보처리방침은 홈페이지 첫 화면에 공개함으로써 SK 구성원께서 언제나 용이하게 보실 수 있도록 조치하고
                  있습니다.
                </div>
                <div className="text3">② 법령 정책 또는 보안기술의 변경에 따라 내용의 추가 삭제 및 수정이 있을 시에는 변경되는 개인정보처리방침을 시행하기
                  7일전에 홈페이지를 통해 변경이유 및 내용 등을 공지하도록 하겠습니다.
                </div>
                <div className="text3">본 개인정보처리방침의 내용은 수시로 변경될 수 있으므로 사이트를 방문하실 때마다, 이를 확인하시기 바랍니다.</div>
                <div className="text2">[부칙]</div>
                <div className="text3">(시행일) 본 개인정보처리방침은 2020년 1월 17일부터 시행합니다.</div>
                <div className="text3">- 공고일자 : 2020년 1월 17일</div>
              </div>
            </div>
          </div>
          <div className="guide">약관 동의 후 mySUNI를 이용할 수 있습니다.</div>
          <div className="button-area">
            <Button className="fix line">Cancel</Button>
            <Button className="fix bg" onClick={this.onOk}>OK</Button>
          </div>
        </div>
      </ContentLayout>
    );
  }
}

export default PisAgreementContainer;
