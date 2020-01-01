import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { ContentLayout } from 'shared';
import { Button, Icon, Radio } from 'semantic-ui-react';


@reactAutobind
class PisAgreementPage extends Component {
  state = {
    value: 'noAgreement',
    globalValue: 'noGrobalAgreement',
  };

  handleChange(e:any, checkProp:any) {
    if ( e.target.name === 'agreement') this.setState({ value: checkProp.value });
    if ( e.target.name === 'globalAgreement') this.setState({ globalValue: checkProp.value });

    console.log(this.state.value, this.state.globalValue);
  }

  render() {
    return (

      <ContentLayout breadcrumb={[
        { text: '개인정보', path: '/profile' },
        { text: '개인정보사용동의' },
      ]}
        className="content-half bg-white"
      >
        <section className="content bg-white privacy-agree">
          <div className="terms-content">
            <div className="logo">
              <Icon className="sk-university-login" /><span className="blind">SUNI</span>
            </div>
            <h2 className="title1">mySUNI 개인정보 처리방침에 동의해주세요.</h2>
            <h3 className="title2">mySUNI 개인정보 처리방침 동의 (필수)</h3>
            <div className="terms-text-wrap">
              <div className="privacy">
                <div className="scrolling">
                  <div className="text1">SK 이노베이션 주식회사 (이하 &quot;회사&quot;)는 mySUNI Learning Management System 운영과
                    관련하여 개인정보보호법 제30조에 따라 구성원의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
                    개인정보처리방침을 수립ㆍ공개합니다.
                  </div>
                  <div className="text1">회사는 개인정보처리방침을 개정하는 경우 공지사항(또는 개별공지)을 통하여 공지할 것입니다.</div>
                  <div className="text1">○ 본 방침은 2020년 1월 17일부터 시행됩니다.</div>
                  <div className="text2">1. 개인정보의 처리 목적</div>
                  <div className="text3">회사는 구성원의 개인정보를 다음의 목적을 위하여 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                    이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
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
                  <div className="text2">2. 개인정보 처리 및 보유기간</div>
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
                          <td>서면양식 및 전산시스템</td>
                          <td>근로기준법 등 관련 법률 및 정보주체 동의</td>
                          <td>고용계약 목적의 필요기간 및 퇴직 시 까지</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text2">3. 개인정보의 제3자 제공에 관한 사항</div>
                  <div className="text3">회사는 구성원의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를
                    제3자에게 제공하며, 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.
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
                          <td>SK 그룹 계열회사 (자세한 내역은 <a href="http://sk.co.kr" target="_blank">http://sk.co.kr</a> 에서 확인 가능)
                          </td>
                          <td>구성원의 교육 신청, 이수 현황 등 사용 이력</td>
                          <td>교육 이수 현황 등</td>
                          <td>해당 구성원 퇴직시까지</td>
                        </tr>
                        <tr>
                          <td>Linked In</td>
                          <td>구성원 정보 연동을 통한 교육 서비스 제공</td>
                          <td>소속, 성명, 이메일</td>
                          <td>해당 구성원 퇴직시까지</td>
                        </tr>
                        <tr>
                          <td>Carrot Global</td>
                          <td>구성원 정보 연동을 통한 교육 서비스 제공</td>
                          <td>소속, 성명, 이메일</td>
                          <td>해당 구성원 퇴직시까지</td>
                        </tr>
                        <tr>
                          <td>Culturetree</td>
                          <td>구성원 정보 연동을 통한 교육 서비스 제공</td>
                          <td>소속, 성명, 이메일</td>
                          <td>해당 구성원 퇴직시까지</td>
                        </tr>
                        <tr>
                          <td>Coursera</td>
                          <td>구성원 정보 연동을 통한 교육 서비스 제공</td>
                          <td>소속, 성명, 이메일</td>
                          <td>해당 구성원 퇴직시까지</td>
                        </tr>
                        <tr>
                          <td>Elice</td>
                          <td>구성원 정보 연동을 통한 교육 서비스 제공</td>
                          <td>소속, 성명, 이메일</td>
                          <td>해당 구성원 퇴직시까지</td>
                        </tr>
                        <tr>
                          <td>휴레드 컨설팅</td>
                          <td>구성원 정보 연동을 통한 교육 서비스 제공</td>
                          <td>소속, 성명, 이메일</td>
                          <td>해당 구성원 퇴직시까지</td>
                        </tr>
                        <tr>
                          <td>11번가 도서</td>
                          <td>구성원 정보 연동을 통한 도서구매 서비스 제공</td>
                          <td>소속, 성명, 이메일</td>
                          <td>해당 구성원 퇴직시까지</td>
                        </tr>
                        <tr>
                          <td>SK M&amp;Service</td>
                          <td>구성원 정보 연동을 통한 교육 서비스 제공</td>
                          <td>소속, 성명, 이메일</td>
                          <td>해당 구성원 퇴직시까지</td>
                        </tr>
                        <tr>
                          <td>Panopto</td>
                          <td>구성원 정보 연동을 통한 교육 서비스 제공</td>
                          <td>소속, 성명, 이메일</td>
                          <td>해당 구성원 퇴직시까지</td>
                        </tr>
                        <tr>
                          <td>Globe Smart(APERIAN Global)</td>
                          <td>구성원 정보 연동을 통한 교육 서비스 제공</td>
                          <td>소속, 성명, 이메일</td>
                          <td>해당 구성원 퇴직시까지</td>
                        </tr>
                        <tr>
                          <td>Leadership College</td>
                          <td>구성원 정보 연동을 통한 교육 서비스 제공</td>
                          <td>소속, 성명, 이메일</td>
                          <td>해당 구성원 퇴직시까지</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text2">4. 개인정보 처리 위탁</div>
                  <div className="text3">회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</div>
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

                  <div className="text3">회사는 위탁계약 체결시 개인정보 보호법 제25조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적/관리적
                    보호조치, 재위탁 제한, 수탁자에 대한 관리/감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게
                    처리하는지를 감독하고 있습니다.<br />위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.
                  </div>
                  <div className="text2">5. 정보주체의 권리, 의무 및 그 행사방법</div>
                  <div className="text3">① 구성원은 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</div>
                  <div className="text4">1. 개인정보 열람요구</div>
                  <div className="text4">2. 오류 등이 있을 경우 정정 요구</div>
                  <div className="text4">3. 삭제요구</div>
                  <div className="text4">4. 처리정지 요구</div>
                  <div className="text3">② 제1항에 따른 권리 행사는 개인정보 보호법 시행규칙 별지 제8호 서식 또는 각 구성원 소속사
                    사규(개인정보보호규칙)에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있습니다. 다만, 구성원 개인정보의 오류로 인하여 불이익이
                    발생할 수 있으니 상세한 사항은 인사부서에 문의하여 주시기 바랍니다.
                  </div>
                  <div className="text3">③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이
                    경우 개인정보 보호법 시행규칙 별지 제11호 서식 또는 회사 사규(개인정보보호규칙)에 따른 위임장을 제출하셔야 합니다.
                  </div>

                  <div className="text2">6. 개인정보의 파기</div>
                  <div className="text3">회사는 원칙적으로 개인정보 보유기간의 경과, 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다.
                    파기의 절차, 기한 및 방법은 다음과 같습니다.
                  </div>
                  <div className="text4">- 파기절차</div>
                  <div className="text5">회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
                  </div>
                  <div className="text4">- 파기기한</div>
                  <div className="text5">정보주체로부터 동의 받은 개인정보 보유기간이 경과하거나 처리 목적이 달성되었음에도 불구하고 다른 법령에 따라
                    개인정보를 계속 보존하여야 하는 경우에는 해당 개인정보는 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보관합니다.<br />이용자의
                    개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 3일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등
                    그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 3일 이내에 그 개인정보를 파기합니다.
                  </div>
                  <div className="text4">- 파기방법</div>
                  <div className="text5">전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</div>
                  <div className="text2">7. 개인정보의 안전성 확보 조치</div>
                  <div className="text3">회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고
                    있습니다.
                  </div>
                  <div className="text3">① 개인정보 취급 직원의 최소화 및 교육</div>
                  <div className="text4">개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.
                  </div>
                  <div className="text3">② 정기적인 자체 감사 실시</div>
                  <div className="text4">개인정보 취급 관련 안정성 확보를 위해 정기적으로 자체 감사를 실시하고 있습니다.</div>
                  <div className="text3">③ 내부관리계획의 수립 및 시행</div>
                  <div className="text4">개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.</div>
                  <div className="text3">④ 개인정보의 암호화</div>
                  <div className="text4">구성원의 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송
                    데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.
                  </div>
                  <div className="text3">⑤ 해킹 등에 대비한 기술적 대책</div>
                  <div className="text4">회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인
                    갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.
                  </div>
                  <div className="text3">⑥ 개인정보에 대한 접근 제한</div>
                  <div className="text4">개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여
                    필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.
                  </div>
                  <div className="text3">⑦ 접속기록의 보관 및 위변조 방지</div>
                  <div className="text4">개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지
                    않도록 보안기능을 사용하고 있습니다.
                  </div>
                  <div className="text3">⑧ 문서보안을 위한 잠금장치 사용</div>
                  <div className="text4">개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.</div>
                  <div className="text3">⑨ 비인가자에 대한 출입 통제</div>
                  <div className="text4">개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.
                  </div>
                  <div className="text2">8. 개인정보 보호책임자</div>
                  <div className="text3">① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제
                    등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                  </div>
                  <div className="text3">▶ 개인정보 보호책임자</div>
                  <div className="text5">성명 : 이규석</div>
                  <div className="text5">소속 : IT전략지원실</div>
                  <div className="text5">직책 : 실장</div>
                  <div className="text5">연락처 : 010-5301-9592 / <a href="mailto:ski.ia01784@partner.sk.com">ski.ia01784@partner.sk.com</a>
                  </div>
                  <div className="text3">▶ 개인정보 보호담당자</div>
                  <div className="text5">성명 : 이의연</div>
                  <div className="text5">소속 : LMS실</div>
                  <div className="text5">직책 : 매니저</div>
                  <div className="text5">연락처 : 010-9246-1785 / <a href="mailto:kite.lee@sk.com">kite.lee@sk.com</a>
                  </div>
                  <div className="text3">② 구성원은 회사에 근무 중 또는 퇴직 이후 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한
                    사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
                  </div>
                  <div className="text2">9.인터넷 접속정보파일의 수집 등 등 개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항
                  </div>
                  <div className="text3">[추후 사이트에서 쿠키나 유사 접속정보파일을 자동으로 수집하는 장치 운영 시 수정 및 삽입]</div>
                  <div className="text3">① 회사는 이용자에게 특화된 맞춤서비스를 제공하기 위해서 이용자들의 정보를 수시로 저장하고 찾아내는
                    &quot;쿠키(cookie)&quot;, &quot;로그기록&quot; 등을 수집하고 활용합니다.
                  </div>
                  <div className="text3">② &quot;쿠키&quot; 및 &quot;로그기록&quot;은 [이용자가 방문한 각 서비스(교육 프로그램)에 대한 이용형태, 검색어, 보안접속 여부,
                    등을 파악하여 이용자에게 최적화된 정보 제공] 목적으로 이용됩니다.
                  </div>
                  <div className="text3">③ 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을 설정함으로써 쿠키를
                    허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이
                    발생할 수 있습니다.
                  </div>
                  <div className="text2">10. 개인정보 처리방침 변경</div>
                  <div className="text3">개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는
                    변경사항의 시행 30일 전부터 공지사항을 통하여 고지할 것입니다.
                  </div>
                  <div className="text2">11. 개인정보 열람청구</div>
                  <div className="text3">구성원은 개인정보보호법 제35조에 따른 개인정보의 열람청구를 &apos;8. 개인정보 보호책임자에 관한 사항’의 ‘개인정보
                    보호 담당부서&apos;에 할 수 있습니다.
                  </div>
                </div>
              </div>
            </div>
            <div className="guide">약관 동의 후 mySUNI를 이용할 수 있습니다.</div>
            <div className="agree-box">
              <ul>
                <li>
                  <div className="tit">
                    1) 제3자제공에 대해 동의하십니까?
                  </div>
                  <div className="description">
                    <Radio
                      className="base"
                      label="예"
                      name="agreement"
                      value="yesAgreement"
                      checked={this.state.value === 'agreement'}
                      onChange={(e, checkProps) => this.handleChange(e, checkProps)}
                      defaultChecked
                    />
                    <Radio
                      className="base"
                      label="아니오"
                      name="agreement"
                      value="noAgreement"
                      checked={this.state.value === 'noAgreement'}
                      onChange={(e, checkProps) => this.handleChange(e, checkProps)}
                    />
                  </div>
                </li>
                <li>
                  <div className="tit">
                    2) 국외 제3자 제공에 대해 동의하십니까?
                  </div>
                  <div className="description">
                    <Radio
                      className="base"
                      label="예"
                      name="globalAgreement"
                      value="yesGlobalAgreement"
                      checked={this.state.globalValue === 'globalAgreement'}
                      onChange={(e, checkProps) => this.handleChange(e, checkProps)}
                      defaultChecked
                    />
                    <Radio
                      className="base"
                      label="아니오"
                      name="globalAgreement"
                      value="noGlobalAgreement"
                      checked={this.state.globalValue === 'noGlobalAgreement'}
                      onChange={(e, checkProps) => this.handleChange(e, checkProps)}
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div className="button-area">
              <Button className="fix line">Cancel</Button>
              <Button className="fix bg">Agree
              </Button>
            </div>
          </div>
        </section>
      </ContentLayout>
    );
  }
}

export default PisAgreementPage;
