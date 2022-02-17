import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Table, TableBody } from 'semantic-ui-react';
import { PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

interface Props {
  policyVer: String;
}

@reactAutobind
export default class PrivacyPolicyView extends Component<Props> {
  render() {
    const { policyVer } = this.props;
    return (
      <>
        {policyVer === '20210614' && (
          <>
            <div className="terms-text-wrap">
              <div className="privacy">
                <div className="scrolling-80vh">
                  <div className="inner">
                    <p className="text1">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text1"
                        defaultString="SK 이노베이션(이하 서비스명 ‘mySUNI’) 개인정보 처리방침"
                      />
                    </p>
                    <p className="text1">
                      {' '}
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text2"
                        defaultString=" SK이노베이션 주식회사(이하 “회사”)는 mySUNI 홈페이지운영과 관련하여 「개인정보보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다."
                      />
                    </p>
                    <p className="text3 mt30">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text3"
                        defaultString="제1조(처리하는 개인정보 항목)"
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text4"
                          defaultString="①"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text5"
                        defaultString="회사는 다음의 개인정보 항목을 처리하고있습니다."
                      />
                    </p>
                    <p className="text4 mb0">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text6"
                        defaultString="1) 홈페이지 회원가입 및 관리 (임직원)"
                      />
                    </p>
                    <p className="text4 mb0">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text7"
                        defaultString="- 필수항목 : 소속, 성명, 사번, 직위, 직책, 이메일, 사내전화번호, 휴대전화번호, 비밀번호"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text8"
                        defaultString="- 선택항목 : 관심분야, 선호학습유형, 사진, 출생년도, 성별"
                      />
                    </p>
                    <p className="text4 mb0">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text9"
                        defaultString="2) 홈페이지 회원가입 및 관리 (외부강사)"
                      />
                    </p>
                    <p className="text4 mb0">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text10"
                        defaultString="- 필수항목 : 소속기관, 성명, 직위, 이메일, 휴대전화번호,비밀번호"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text11"
                        defaultString="- 선택항목 : 강의분야, 경력, 사진, 출생년도, 성별"
                      />
                    </p>
                    <p className="text2">
                      <span>②</span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text12"
                        defaultString="인터넷 서비스 이용과정에서 아래 개인정보 항목이 자동으로 생성되어 수집될 수 있습니다."
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text13"
                        defaultString="- IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록"
                      />
                    </p>
                    <p className="text3 mt30">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text14"
                        defaultString="제2조(개인정보 처리 목적)"
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text15"
                          defaultString="①"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text16"
                        defaultString="회사는 다음의 목적을 위하여 개인정보를 처리합니다.처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는「개인정보보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다."
                      />
                    </p>
                    <p className="text4 mb0">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text17"
                        defaultString="1) mySUNI Learning Management System (이하 ‘mySUNI’)가입 및 관리"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text18"
                        defaultString="- 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별∙인증, 회원자격 유지∙관리, 서비스 부정이용 방지, 각종 고지∙통지, 고충처리 목적으로 개인정보를 처리합니다."
                      />
                    </p>
                    <p className="text4 mb0">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text19"
                        defaultString="2) 서비스 제공"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text20"
                        defaultString="- 콘텐츠/서비스 제공, 맞춤서비스 제공, 본인인증 등을 목적으로 개인정보를 처리합니다."
                      />
                    </p>
                    <p className="text4 mb0">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text21"
                        defaultString="3) 관계사 시스템 및 외부 Contents Providers 회사 시스템 연동"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text22"
                        defaultString="- 콘텐츠/서비스 제공, 맞춤서비스 제공, 본인인증 등을 목적으로 개인정보를 처리합니다."
                      />
                    </p>
                    <p className="text3 mt30">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text23"
                        defaultString="제3조(개인정보 처리 및 보유기간)"
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text24"
                          defaultString="①"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text25"
                        defaultString="회사는 법령에 따른 개인정보 보유∙이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유∙이용기간 내에서 개인정보를 처리∙보유합니다."
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text26"
                          defaultString="②"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text27"
                        defaultString="각각의 개인정보 처리 및 보유 기간은 다음과 같습니다."
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text28"
                        defaultString="1) 홈페이지 회원 가입 및 관리 (임직원) : 해당 구성원의 재직 기간까지"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text29"
                        defaultString="2) 홈페이지 회원 가입 및 관리 (외부강사) : 해당 회원의 탈퇴 기간까지"
                      />
                    </p>
                    <p className="text4 mb0">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text30"
                        defaultString="3) 서비스 제공 : 콘텐츠 유효기간 만료시 까지"
                      />
                    </p>
                    <p className="text4 mb0">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text31"
                        defaultString="다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지"
                      />
                    </p>
                    <p className="text4 mb0">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text32"
                        defaultString="- 관계 법령 위반에 따른 수사∙조사 등이 진행중인 경우에는 해당 수사∙조사 종료 시까지"
                      />
                    </p>
                    <p className="text4 mb0">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text33"
                        defaultString="- 홈페이지 이용에 따른 채권∙채무관계 잔존 시에는 해당 채권∙채무관계 정산 시까지"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text34"
                        defaultString="- 통신사실확인자료를 제공할 때 필요한 로그기록자료, IP주소 등 : 3개월 (통신비밀보호법)"
                      />
                    </p>
                    <p className="text3 mt30">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text35"
                        defaultString="제4조(개인정보의 제3자 제공)"
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text36"
                          defaultString="①"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text37"
                        defaultString="회사는 정보주체의 개인정보를 제2조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다."
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text38"
                          defaultString="②"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text39"
                        defaultString="회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다."
                      />
                    </p>
                    <div className="table-wrap">
                      <Table>
                        <colgroup>
                          <col width="25%" />
                          <col width="25%" />
                          <col width="25%" />
                          <col width="25%" />
                        </colgroup>
                        <Table.Header>
                          <Table.HeaderCell>
                            <PolyglotText
                              id="Privacy-2021Y6M14D-text40"
                              defaultString="제공받는 자"
                            />
                          </Table.HeaderCell>
                          <Table.HeaderCell>
                            <PolyglotText
                              id="Privacy-2021Y6M14D-text41"
                              defaultString="제공받는 자의 개인정보 이용목적"
                            />
                          </Table.HeaderCell>
                          <Table.HeaderCell>
                            <PolyglotText
                              id="Privacy-2021Y6M14D-text42"
                              defaultString="제공하는 개인정보 항목"
                            />
                          </Table.HeaderCell>
                          <Table.HeaderCell>
                            <PolyglotText
                              id="Privacy-2021Y6M14D-text43"
                              defaultString="보유∙이용기간"
                            />
                          </Table.HeaderCell>
                        </Table.Header>
                        <TableBody>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text44"
                                defaultString="SK 그룹 계열회사 (자세한 내역은 http://sk.co.kr 에서 확인 가능)"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text45"
                                defaultString="구성원의 교육 신청, 이수 현황 관리"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text46"
                                defaultString="과정 이수 현황"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text47"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text48"
                                defaultString="Linked In"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text49"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리, 안내 메일 발송"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text50"
                                defaultString="소속, 성명, 이메일"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text51"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text52"
                                defaultString="Coursera"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text53"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리, 안내 메일 발송"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text54"
                                defaultString="소속, 성명, 이메일"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text55"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text56"
                                defaultString="Elice"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text57"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리, 안내 메일 발송"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text58"
                                defaultString="소속, 성명, 이메일"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text59"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text60"
                                defaultString="SK M&Service"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text61"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리, 안내 메일 발송"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text62"
                                defaultString="소속, 성명, 이메일, 휴대전화번호"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text63"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text64"
                                defaultString="Panopto"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text65"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text66"
                                defaultString="소속, 성명, 이메일"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text67"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text68"
                                defaultString="Globe Smart(APERIAN Global)"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text69"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리, 안내 메일 발송"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text70"
                                defaultString="소속, 성명, 이메일"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text71"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text72"
                                defaultString="블룸컴퍼니"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text73"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리, 안내 메일 발송"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text74"
                                defaultString="소속, 성명, 이메일"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text75"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text76"
                                defaultString="LLC(Josh Bersin Academy)"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text77"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리, 안내 메일 발송"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text78"
                                defaultString="소속, 성명, 이메일"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text79"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text80"
                                defaultString="IDEO"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text81"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리, 안내 메일 발송"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text82"
                                defaultString="소속, 성명, 이메일"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text83"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text84"
                                defaultString="Google"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text85"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리, 안내 메일 발송"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text86"
                                defaultString="소속, 성명, 이메일"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text87"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text88"
                                defaultString="Microsoft"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text89"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리, 안내 메일 발송"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text90"
                                defaultString="소속, 성명, 이메일, 휴대전화번호"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text91"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text92"
                                defaultString="AMT Training"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text93"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리, 안내 메일 발송"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text94"
                                defaultString="소속, 성명, 이메일"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text95"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text96"
                                defaultString="BTS"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text97"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리, 안내 메일 발송"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text98"
                                defaultString="소속, 성명, 이메일"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text99"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text100"
                                defaultString="대학내일"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text101"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리, 안내 메일 발송"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text102"
                                defaultString="소속, 성명, 이메일, 휴대전화번호"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text103"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text104"
                                defaultString="페어플레이"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text105"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리, 안내 메일 발송"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text106"
                                defaultString="소속, 성명, 이메일, 휴대전화번호"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text107"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text108"
                                defaultString="더플레이컴퍼니"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text109"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리, 안내 메일 발송"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text110"
                                defaultString="소속, 성명, 이메일"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text111"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text112"
                                defaultString="멀티캠퍼스"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text113"
                                defaultString="구성원 SSO접속, 학습현황관리, 과정 이수 처리, 안내 메일 발송"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text114"
                                defaultString="소속, 성명, 이메일, 휴대전화번호"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text115"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </Table.Cell>
                          </Table.Row>
                        </TableBody>
                      </Table>
                    </div>
                    <p className="text3 mt30">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text116"
                        defaultString="제5조(개인정보처리의 위탁)"
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text117"
                          defaultString="①"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text118"
                        defaultString="회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다."
                      />
                    </p>
                    <div className="table-wrap">
                      <Table>
                        <colgroup />
                        <colgroup />
                        <Table.Header>
                          <Table.HeaderCell>
                            <PolyglotText
                              id="Privacy-2021Y6M14D-text119"
                              defaultString="위탁받는 자(수탁자)"
                            />
                          </Table.HeaderCell>
                          <Table.HeaderCell>
                            <PolyglotText
                              id="Privacy-2021Y6M14D-text120"
                              defaultString="위탁하는 업무의 내용"
                            />
                          </Table.HeaderCell>
                        </Table.Header>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text121"
                                defaultString="SK 주식회사"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text122"
                                defaultString="‘mySUNI’ LMS 운영/개발 위탁"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text123"
                                defaultString="SK M&Service"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text124"
                                defaultString="서비스 운영을 위한 메일 안내 및 교육 운영/관리, 결과 Data정리, HelpDesk 운영"
                              />
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </div>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text125"
                          defaultString="②"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text126"
                        defaultString="회사는 위탁계약 체결 시 「개인정보보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다."
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text127"
                          defaultString="③"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text128"
                        defaultString="위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리 방침을 통하여 공개하도록 하겠습니다."
                      />
                    </p>
                    <p className="text3 mt30">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text129"
                        defaultString="제6조(정보주체와 법정대리인의 권리∙의무 및 행사방법)"
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text130"
                          defaultString="①"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text131"
                        defaultString="정보주체는 회사에 대해 언제든지 개인정보 열람∙정정∙삭제∙처리정지 요구 등의 권리를 행사할 수 있습니다."
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text132"
                          defaultString="②"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text133"
                        defaultString="제1항에 따른 권리 행사는 회사에 대해「개인정보보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체없이 조치하겠습니다."
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text134"
                          defaultString="③"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text135"
                        defaultString="제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시(제2020-7)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다."
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text136"
                          defaultString="④"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text137"
                        defaultString="개인정보 열람 및 처리정지 요구는「개인정보보호법」 제35조제4항, 제37조제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다."
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text138"
                          defaultString="⑤"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text139"
                        defaultString="개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다."
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text140"
                          defaultString="⑥"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text141"
                        defaultString="회사는 정보주체의 권리에 따른 열람의 요구, 정정∙삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다."
                      />
                    </p>
                    <p className="text3 mt30">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text142"
                        defaultString="제7조(개인정보의 파기)"
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text143"
                          defaultString="①"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text144"
                        defaultString="회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다."
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text145"
                          defaultString="②"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text146"
                        defaultString="개인정보 파기의 절차 및 방법은 다음과 같습니다."
                      />
                    </p>
                    <p className="text4 mb0">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text147"
                        defaultString="1) 파기절차"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text148"
                        defaultString="회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다."
                      />
                    </p>
                    <p className="text4 mb0">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text149"
                        defaultString="2) 파기방법"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text150"
                        defaultString="회사는 전자적 파일 형태로 기록∙저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록∙저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다."
                      />
                    </p>
                    <p className="text3 mt30">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text151"
                        defaultString="제8조(개인정보의 안전성 확보조치)"
                      />
                    </p>
                    <p>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text152"
                        defaultString="회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다."
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text153"
                        defaultString="1) 관리적 조치 : 내부관리계획 수립·시행, 정기적 직원 교육 등"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text154"
                        defaultString="2) 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text155"
                        defaultString="3) 물리적 조치 : 전산실, 자료보관실 등의 접근통제"
                      />
                    </p>
                    <p className="text3 mt30">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text156"
                        defaultString="제9조(개인정보 자동 수집 장치의 설치∙운영 및 거부에 관한 사항)"
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text157"
                          defaultString="①"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text158"
                        defaultString="회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다."
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text159"
                          defaultString="②"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text160"
                        defaultString="쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다."
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text161"
                        defaultString="1) 쿠키의 사용목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다."
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text162"
                        defaultString="2) 쿠키의 설치∙운영 및 거부 : 웹브라우저 상단의 도구&gt;인터넷 옵션&gt;개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다."
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text163"
                        defaultString="3) 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다."
                      />
                    </p>
                    <p className="text3 mt30">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text164"
                        defaultString="제10조(개인정보 보호책임자)"
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text165"
                          defaultString="①"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text166"
                        defaultString="회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다."
                      />
                    </p>
                    <div className="table-wrap">
                      <Table>
                        <colgroup>
                          <col width="25%" />
                          <col width="25%" />
                          <col width="25%" />
                          <col width="25%" />
                        </colgroup>
                        <Table.Header>
                          <Table.HeaderCell>
                            <PolyglotText
                              id="Privacy-2021Y6M14D-text167"
                              defaultString="회사"
                            />
                          </Table.HeaderCell>
                          <Table.HeaderCell>
                            <PolyglotText
                              id="Privacy-2021Y6M14D-text168"
                              defaultString="구분"
                            />
                          </Table.HeaderCell>
                          <Table.HeaderCell>
                            <PolyglotText
                              id="Privacy-2021Y6M14D-text169"
                              defaultString="개인정보 보호책임자"
                            />
                          </Table.HeaderCell>
                          <Table.HeaderCell>
                            <PolyglotText
                              id="Privacy-2021Y6M14D-text170"
                              defaultString="개인정보 보호담당자"
                            />
                          </Table.HeaderCell>
                        </Table.Header>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell rowSpan="4">
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text171"
                                defaultString="SK이노베이션"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text172"
                                defaultString="소속"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text173"
                                defaultString="정보보호담당"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text174"
                                defaultString="LMS"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text175"
                                defaultString="성명/직급"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text176"
                                defaultString="고흥태/담당"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text177"
                                defaultString="이의연/RF"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text178"
                                defaultString="연락처"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text179"
                                defaultString="02-6323-9002"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text180"
                                defaultString="02-6323-9002"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text181"
                                defaultString="이메일"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text182"
                                defaultString="kite.lee@sk.com"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <PolyglotText
                                id="Privacy-2021Y6M14D-text183"
                                defaultString="kite.lee@sk.com"
                              />
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </div>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text184"
                          defaultString="②"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text185"
                        defaultString="정보주체께서는 회사의 서비스(또는 사업)를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다."
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text186"
                          defaultString="③"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text187"
                        defaultString="정보주체는 「개인정보 보호법」 제35조에 따른 개인정보의 열람 청구를 위의 개인정보 보호담당자에게 할 수 있습니다."
                      />
                    </p>
                    <p className="text3 mt30">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text188"
                        defaultString="제11조(추가적인 이용∙제공 판단기준)"
                      />
                    </p>
                    <p className="mb0">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text189"
                        defaultString="회사는 「개인정보보호법」 제15조제3항 및 제17조제4항에 따라 ｢개인정보보호법 시행령｣ 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용·제공할 수 있습니다."
                      />
                    </p>
                    <p>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text190"
                        defaultString="이에 따라 회사가 정보주체의 동의 없이 추가적인 이용·제공을 하기 위해서 다음과 같은 사항을 고려하였습니다."
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text191"
                        defaultString="1) 개인정보를 추가적으로 이용·제공하려는 목적이 당초 수집 목적과 관련성이 있는지 여부"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text192"
                        defaultString="2) 개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용·제공에 대한 예측 가능성이 있는지 여부"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text193"
                        defaultString="3) 개인정보의 추가적인 이용·제공이 정보주체의 이익을 부당하게 침해하는지 여부"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text194"
                        defaultString="4) 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text195"
                        defaultString="※ 추가적인 이용·제공 시 고려사항에 대한 판단기준은 사업자/단체 스스로 자율적으로 판단하여 작성·공개함"
                      />
                    </p>
                    <p className="text3 mt30">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text196"
                        defaultString="제12조(권익침해 구제방법)"
                      />
                    </p>
                    <p>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text197"
                        defaultString="정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁 해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다."
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text198"
                        defaultString="1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972(www.kopico.go.kr)"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text199"
                        defaultString="2. 개인정보침해신고센터 : (국번없이) 118(privacy.kisa.or.kr)"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text200"
                        defaultString="3. 대검찰청 사이버수사과 : (국번없이) 1301(www.spo.go.kr)"
                      />
                    </p>
                    <p className="text4">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text201"
                        defaultString="4. 경찰청 사이버수사국 : (국번없이) 182(ecrm.cyber.go.kr/minwon/main)"
                      />
                    </p>
                    <p className="text3 mt30">
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text202"
                        defaultString="제13조(개인정보 처리방침 변경)"
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text203"
                          defaultString="①"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text204"
                        defaultString="본 개인정보처리방침은 법령 또는 회사 내부 정책 등에 따라 내용의 추가, 삭제 및 수정이 있을 시에는 변경되는 개인정보처리방침을 시행하기 7일전에 홈페이지를 통해 변경사항을 공지하도록 하겠습니다."
                      />
                    </p>
                    <p className="text2">
                      <span>
                        <PolyglotText
                          id="Privacy-2021Y6M14D-text205"
                          defaultString="②"
                        />
                      </span>
                      <PolyglotText
                        id="Privacy-2021Y6M14D-text206"
                        defaultString="이 개인정보 처리방침은 2021. 06. 14부터 적용됩니다."
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {policyVer === '20200901' && (
          <>
            {/* 개인정보 처리방침 20200901 */}
            <div className="terms-text-wrap">
              <div className="privacy">
                <div className="scrolling-80vh">
                  <div className="">
                    <div className="text1">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text1"
                        defaultString="SK 이노베이션(이하 서비스명 ‘mySUNI’) 개인정보처리방침"
                      />
                    </div>
                    <div className="text1">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text2"
                        defaultString='SK 이노베이션 주식회사 (이하 "회사")는 mySUNI Learning Management System 운영과 관련하여 정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하 ‘정보통신망법’), 개인정보보호법에 따라 구성원의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침을 수립ㆍ공개합니다.'
                      />
                    </div>
                    <div className="text1">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text3"
                        defaultString="회사는 개인정보처리방침을 개정하는 경우 공지사항(또는 개별공지)을 통하여 공지할 것입니다."
                      />
                    </div>
                    <div className="text1">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text4"
                        defaultString="○ 본 방침은 2020년 9월 1일부터 시행됩니다."
                      />
                    </div>
                    <div className="text2">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text5"
                        defaultString="1. 개인정보의 처리 목적"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text6"
                        defaultString="회사는 구성원의 개인정보를 다음의 목적을 위하여 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 정보통신망법 제22조, 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다."
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text7"
                        defaultString="① mySUNI Learning Management System (이하 ‘mySUNI’)가입 및 관리"
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text8"
                        defaultString="구성원 서비스 제공에 따른 본인 식별/인증, 구성원 회원 자격 유지/관리, 각종 고지/통지, 고충처리 등의 목적으로 개인정보를 처리합니다."
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text9"
                        defaultString="② 서비스 제공"
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text10"
                        defaultString="콘텐츠/서비스 제공, 본인 인증 등을 목적으로 개인정보를 처리합니다."
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text11"
                        defaultString="③ 관계사 시스템 및 외부 Contents Providers 회사 시스템 연동"
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text12"
                        defaultString="관계사 및 외부 Contents Provider 회사의 교육 프로그램 활용 및 서비스 제공 등의 목적으로 개인정보를 처리합니다."
                      />
                    </div>
                    <div className="text2">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text13"
                        defaultString="2. 개인정보 처리 항목 및 보유기간"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text14"
                        defaultString="회사는 구성원의 개인정보를 DB형태로 보관/관리하고있습니다."
                      />
                    </div>
                    <div className="bt">
                      <table className="four">
                        <thead>
                          <tr>
                            <th scope="col">
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text15"
                                defaultString="수집항목"
                              />
                            </th>
                            <th scope="col">
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text16"
                                defaultString="수집방법"
                              />
                            </th>
                            <th scope="col">
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text17"
                                defaultString="보유근거"
                              />
                            </th>
                            <th scope="col">
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text18"
                                defaultString="처리 및 보유기간"
                              />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text19"
                                defaultString="소속, 성명, 사번, 직위, 직책, 이메일주소, 사내 전화번호, 휴대전화번호"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text20"
                                defaultString="TokTok을 통한 시스템 연계"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text21"
                                defaultString="근로기준법 등 관련 법률 및 정보주체 동의"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text22"
                                defaultString="해당 구성원 퇴직 시 까지"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="text2">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text23"
                        defaultString="3. 개인정보의 제3자 제공에 관한 사항"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text24"
                        defaultString="① mySUNI는 SK 구성원으로부터 수집한 개인정보를 고지한 범위 내에서만 사용하며, SK 구성원의 동의 없이는 동범위를 초과하여 이용하거나 제3자에게 제공하거나 공유하지 않습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text25"
                        defaultString="②mySUNI는 보다 나은 서비스 제공을 위하여 개인정보를 제3자에게 제공하거나 공유할 필요가 있는 경우 제공 또는 공유할 정보의 항목, 제공 또는 공유받는 자, 이용목적 및 보유기간, 연락처, 동의하지 않는 경우의 불이익 내용 등을 명시하여 SK 구성원께 동의를 구하는 절차를 거치게 되며,동의하지 않는 경우에는 제3자에게 제공 또는 공유하지않습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text26"
                        defaultString="③ 다만, 다음 각 호의 경우에는 예외로 합니다. "
                      />
                      <br />
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text27"
                        defaultString="- 고객님이 사전에 동의하셨거나 서비스 제공 관련 계약 이행을 위하여 필요한 개인정보로 통상의 동의를 받기가 경제적/기술적 사유로 현저히 곤란한 경우"
                      />
                      <br />
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text28"
                        defaultString="- 서비스 제공에 따른 요금정산을 위하여 필요한 경우"
                      />
                      <br />
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text29"
                        defaultString="- 관련법령에 의거 적법한 절차에 의한 정부기관 등의 요청이 있는 경우 고지하고, 개인정보 수집/이용 등에 대한 동의 철회의 선택권을 부여합니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text30"
                        defaultString="④ SK 구성원께서 온라인상의 게시판 등을 통해 기재한 인적사항을 제3자가 수집하는 경우가 있을 수 있으므로 이에 유의하시기 바랍니다. SK 구성원께서 스스로 게시판 등을 통해 기재한 인적사항과 관련하여 회사는 어떠한 책임도 지지 않습니다."
                      />
                    </div>
                    <div className="bt">
                      <table className="four">
                        <thead>
                          <tr>
                            <th scope="col">
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text31"
                                defaultString="제공받는 자"
                              />
                            </th>
                            <th scope="col">
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text32"
                                defaultString="제공받는 자의 이용목적"
                              />
                            </th>
                            <th scope="col">
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text33"
                                defaultString="제공하는 항목"
                              />
                            </th>
                            <th scope="col">
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text34"
                                defaultString="보유 및 이용기간"
                              />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <a href="http://sk.co.kr" target="_blank">
                                (
                                <PolyglotText
                                  id="Privacy-2020Y9M1D-text35"
                                  defaultString="http://sk.co.kr"
                                />
                              </a>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text36"
                                defaultString="에서 확인 가능)"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text37"
                                defaultString="구성원의 교육 신청, 이수 현황 등 사용 이력"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text38"
                                defaultString="교육 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text39"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text40"
                                defaultString="Linked In"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text41"
                                defaultString="구성원 SSO접속, 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text42"
                                defaultString="소속, 성명, 이메일"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text43"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text44"
                                defaultString="Carrot Global"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text45"
                                defaultString="구성원 SSO접속, 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text46"
                                defaultString="소속, 성명, 이메일"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text47"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text48"
                                defaultString="Coursera"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text49"
                                defaultString="구성원 SSO접속, 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text50"
                                defaultString="소속, 성명, 이메일"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text51"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text52"
                                defaultString="Elice"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text53"
                                defaultString="구성원 SSO접속, 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text54"
                                defaultString="소속, 성명, 이메일"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text55"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text56"
                                defaultString="SK M&amp;Service"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text57"
                                defaultString="구성원 SSO접속, 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text58"
                                defaultString="소속, 성명, 이메일, 전화번호"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text59"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text60"
                                defaultString="Panopto"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text61"
                                defaultString="구성원 SSO접속, 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text62"
                                defaultString="소속, 성명, 이메일"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text63"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text64"
                                defaultString="Globe Smart(APERIAN Global)"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text65"
                                defaultString="구성원 SSO접속, 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text66"
                                defaultString="소속, 성명, 이메일"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text67"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text68"
                                defaultString="블룸컴퍼니"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text69"
                                defaultString="구성원 SSO접속, 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text70"
                                defaultString="소속, 성명, 이메일"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text71"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text72"
                                defaultString="LLC(Josh Bersin Academy)"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text73"
                                defaultString="구성원 SSO접속, 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text74"
                                defaultString="소속, 성명, 이메일"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text75"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text76"
                                defaultString="IDEO"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text77"
                                defaultString="구성원 SSO접속, 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text78"
                                defaultString="소속, 성명, 이메일"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text79"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text80"
                                defaultString="Google"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text81"
                                defaultString="구성원 SSO접속, 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text82"
                                defaultString="소속, 성명, 이메일"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text83"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text84"
                                defaultString="Microsoft"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text85"
                                defaultString="구성원 SSO접속, 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text86"
                                defaultString="소속, 성명, 이메일, 전화번호"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text87"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text88"
                                defaultString="SK주식회사"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text89"
                                defaultString="구성원 SSO접속, 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text90"
                                defaultString="소속, 성명, 이메일, 전화번호"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text91"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text92"
                                defaultString="AMT Training"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text93"
                                defaultString="구성원 SSO접속, 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text94"
                                defaultString="소속, 성명, 이메일"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text95"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text96"
                                defaultString="BTS"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text97"
                                defaultString="구성원 SSO접속, 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text98"
                                defaultString="소속, 성명, 이메일"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text99"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text100"
                                defaultString="대학내일"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text101"
                                defaultString="구성원 SSO접속, 이수 현황 등"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text102"
                                defaultString="소속, 성명, 이메일"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text103"
                                defaultString="해당 구성원 퇴직시까지"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="text2">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text104"
                        defaultString="4. 개인정보 처리 위탁"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text105"
                        defaultString="회사는 안정적인 개인정보 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다."
                      />
                    </div>
                    <div className="bt">
                      <table>
                        <thead>
                          <tr>
                            <th scope="col">
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text106"
                                defaultString="위탁받는 자(수탁자)"
                              />
                            </th>
                            <th scope="col">
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text107"
                                defaultString="위탁하는 업무의 내용"
                              />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text108"
                                defaultString="SK 주식회사"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text109"
                                defaultString="‘mySUNI’ LMS 운영/개발 위탁"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text110"
                                defaultString="SK M&amp;Service"
                              />
                            </td>
                            <td>
                              <PolyglotText
                                id="Privacy-2020Y9M1D-text111"
                                defaultString="서비스 운영을 위한 메일 안내 및 교육 운영/관리, 결과 Data정리"
                              />{' '}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text112"
                        defaultString="회사는 위탁계약 체결시 정보통신망법 제25조, 개인정보보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적/관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리/감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다."
                      />
                      <br />

                      <PolyglotText
                        id="Privacy-2020Y9M1D-text113"
                        defaultString="위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text114"
                        defaultString="mySUNI는 SK 구성원에 대한 서비스의 유지 및 관리, 고객상담, 기타 서비스 안내를 위하여 전문용역 업체에 일부 업무를 위탁운영하고 있습니다. 위탁을 받은 업체는 위탁을 받은 목적을 벗어나서 개인정보를 이용할 수 없습니다. 또한, mySUNI는 이러한 위탁업체에 대하여 해당 개인정보가 위법하게 이용되지 않도록 정기적인 감시와 감독을 실시합니다."
                      />
                    </div>
                    <div className="text2">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text115"
                        defaultString="5. 정보주체의 권리, 의무 및 그 행사방법"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text116"
                        defaultString="① 구성원은 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다."
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text117"
                        defaultString="- 개인정보 열람요구"
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text118"
                        defaultString="- 오류 등이 있을 경우 정정 요구"
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text119"
                        defaultString="- 삭제요구"
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text120"
                        defaultString="- 처리정지 요구"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text121"
                        defaultString="② 제1항에 따른 권리 행사는 개인정보 보호법 시행규칙 별지제8호 서식 또는 각 구성원 소속사 사규(개인정보보호규칙)에 따라 서면 · 전자우편 · 모사전송(FAX) 등을 통하여 하실 수 있습니다. 다만, 구성원 개인정보의 오류로 인하여 불이익이 발생할 수 있으니 상세한 사항은 인사부서에 문의하여 주시기 바랍니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text122"
                        defaultString="③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식 또는 회사 사규(개인정보보호규칙)에 따른 위임장을 제출하셔야 합니다."
                      />
                    </div>
                    <div className="text2">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text123"
                        defaultString="개인정보의 열람 및 정정"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text124"
                        defaultString="① SK 구성원은 언제든지 등록되어 있는 본인의 개인정보를 열람하거나 정정하실 수 있습니다. 특히 SK 구성원의 개인정보의 정정 요구에 대하여 MYSUNI는 해당 내용에 대해 정정할 때까지 당해 개인정보를 이용하지 않습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text125"
                        defaultString="② mySUNI는 회원의 개인정보 이용내역을 연 1회 이상 회원에게 전자우편·서면·팩스·전화 등의 방법으로 통지합니다."
                      />
                    </div>
                    <div className="text2">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text126"
                        defaultString="개인정보 수집, 이용, 제공에 대한 동의철회"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text127"
                        defaultString="① SK 구성원은 회원가입 시 개인정보 수집, 이용 및 제공에 대해 동의하신 내용을 언제든지 철회하실 수 있습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text128"
                        defaultString="② 동의 철회는 홈페이지나 고객센터에 연락하여 본인 확인 절차를 거치신 후 직접 동의철회 신청을 하시거나,개인정보 보호책임자 또는 개인정보보호담당자에게 서면 또는 E-Mail등으로 송부하여 주시면 지체 없이 조치하여 드립니다."
                      />
                    </div>
                    <div className="text2">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text129"
                        defaultString="개인정보의 처리정지"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text130"
                        defaultString="① SK 구성원은 개인정보 수집, 이용 및 제공에 동의하신 내용에 대하여 SK 구성원 본인의 개인정보 처리의 정지를 요구할 수 있습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text131"
                        defaultString="② 처리정지 요청은 홈페이지나 고객센터에 연락하여 본인 확인 절차를 거치신 후 직접 처리정지를 신청을 하시거나, 개인정보 보호책임자 또는 개인정보 보호담당자에게 서면 또는 E-Mail등으로 송부하여 주시면 지체 없이 조치하여 드립니다. 다만, 다음 각 호의 어느 하나에 해당하는 경우에는 SK 구성원의 처리정지 요구를 거절할 수 있습니다."
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text132"
                        defaultString="- 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우"
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text133"
                        defaultString="- 다른 사람의 생명/신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우"
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text134"
                        defaultString="- 개인정보를 처리하지 아니하면 SK 구성원과 약정한 서비스를 제공하지 못하는 등 계약의 이행이 곤란한 경우로서 SK 구성원께서 그 계약의 해지 의사를 명확하게 밝히지 아니한 경우"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text135"
                        defaultString="※ 로그인이 불가능하신 고객께서는 ‘개인정보 처리 요구서 다운로드 하기’를 이용하여 신청서를 작성하신 후 개인정보 담당자에게 이메일 송부 하여 주시기 바랍니다. (문의"
                      />
                      <a href="mailto:kite.lee@sk.com">
                        <PolyglotText
                          id="Privacy-2020Y9M1D-text136"
                          defaultString="kite.lee@sk.com"
                        />
                      </a>
                      ) <br />
                      <a href="https://mysuni.sk.com/profile/commondocs/mySUNI_Privacy_Handling_Request.docx">
                        <PolyglotText
                          id="Privacy-2020Y9M1D-text137"
                          defaultString="개인정보처리 요구서 다운로드 하기"
                        />
                      </a>
                    </div>
                    <div className="text2">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text138"
                        defaultString="6. 개인정보의 파기"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text139"
                        defaultString="회사는 원칙적으로 개인정보 보유기간의 경과, 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다."
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text140"
                        defaultString="- 파기절차"
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text141"
                        defaultString="회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다."
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text142"
                        defaultString="- 파기기한"
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text143"
                        defaultString="정보주체로부터 동의 받은 개인정보 보유기간이 경과하거나 처리 목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는 해당 개인정보는 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보관합니다."
                      />
                      <br />

                      <PolyglotText
                        id="Privacy-2020Y9M1D-text144"
                        defaultString="또한, 처리목적의 달성, 해당 서비스의 폐지, 사업의 종료 등 개인정보가 불필요한 것으로 인정되는 날로부터 3일 이내에 파기합니다."
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text145"
                        defaultString="- 파기방법"
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text146"
                        defaultString="전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다."
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text147"
                        defaultString="개인정보 파기 절차 및 방법"
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text148"
                        defaultString="mySUNI는 수집한 개인정보의 이용목적이 달성되거나, 서비스 회원을 탈퇴할 경우 당해 SK 구성원의 개인정보를 다음 각호의 방법으로 지체 없이 파기하여 향후 어떠한 용도로도 열람 또는 이용할 수 없도록 처리하고 있습니다. 단, &#39;5.개인정보 보유기간 및 이용기간 ②&#39;와 같은 예외 경우를 두고 있습니다."
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text149"
                        defaultString="- 종이에 출력된 개인정보는 분쇄기로 분쇄, 소각 또는 용해를 통하여 파기합니다."
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text150"
                        defaultString="- 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다."
                      />
                    </div>
                    <div className="text2">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text151"
                        defaultString="7. 개인정보의 안전성 확보 조치"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text152"
                        defaultString="회사는 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text153"
                        defaultString="① 개인정보 취급 직원의 최소화 및 교육"
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text154"
                        defaultString="개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text155"
                        defaultString="② 정기적인 자체 감사 실시"
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text156"
                        defaultString="개인정보 취급 관련 안정성 확보를 위해 정기적으로 자체 감사를 실시하고 있습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text157"
                        defaultString="③ 내부관리계획의 수립 및 시행"
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text158"
                        defaultString="개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text159"
                        defaultString="④ 개인정보의 암호화"
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text160"
                        defaultString="구성원의 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text161"
                        defaultString="⑤ 해킹 등에 대비한 기술적 대책"
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text162"
                        defaultString="회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text163"
                        defaultString="⑥ 개인정보에 대한 접근 제한"
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text164"
                        defaultString="개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text165"
                        defaultString="⑦ 접속기록의 보관 및 위변조 방지"
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text166"
                        defaultString="개인정보처리시스템에 접속한 기록을 최소 1년 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능을 사용하고 있습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text167"
                        defaultString="⑧ 문서보안을 위한 잠금장치 사용"
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text168"
                        defaultString="개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text169"
                        defaultString="⑨ 비인가자에 대한 출입 통제"
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text170"
                        defaultString="개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text171"
                        defaultString="개인정보보호를 위한 안정성 확보 조치"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text172"
                        defaultString="① mySUNI는 SK 구성원의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조, 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적 대책을 강구하고 있습니다."
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text173"
                        defaultString="- SK 구성원의 주요 개인정보는 암호화하여 저장하고 있으며, 파일 및 전송 데이터를 암호화하여 혹시 발생할 수 있는 사고 시라도 SK 구성원의 개인정보가 유출되지 않도록 관리되고 있습니다."
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text174"
                        defaultString="- SK 구성원의 개인정보를 저장하고 처리하는 시스템은 방화벽과 침입탐지시스템을 통하여 보호되며 24시간 감시를 통하여 외부로부터의 위협에 대해 관리되고 있습니다."
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text175"
                        defaultString="- SK 구성원의 개인정보를 저장하고 처리하는 시스템은 자동으로 갱신되는 백신프로그램을 이용하여 컴퓨터 바이러스에 의한 피해로부터 보호되고 있습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text176"
                        defaultString="② 또한 mySUNI는 SK 구성원의 개인정보를 처리함에 있어 다음과 같은 관리적 대책을 강구하고 있습니다."
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text177"
                        defaultString="- SK 구성원의 개인정보에 대한 접근권한을 최소한의 인원으로 제한하고 있습니다."
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text178"
                        defaultString="- 임직원이 업무를 함에 있어 SK 구성원의 개인정보를 보호하기 위해 지켜야 할 사내규정을 마련하여 준수하고 있습니다."
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text179"
                        defaultString="- 임직원이 SK 구성원의 개인정보를 처리하기 이전에 보안서약서를 통하여 SK 구성원의 개인정보에 대한 정보유출을 사전에 방지하고 사내규정에 대한 이행사항 및 준수여부를 감시하기 위한 내부절차를 마련하고 있습니다."
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text180"
                        defaultString="- 임직원의 개인정보보호 고취를 위한 정기적인 개인정보보호교육을 실시하고 있습니다."
                      />
                    </div>
                    <div className="text4">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text181"
                        defaultString="- 그 외 내부 관리자의 실수나 기술관리 상의 사고로 인해 개인정보의 상실, 유출, 변조, 훼손이 유발될 경우 즉각 SK 구성원께 사실을 알리고 적절한 대책과 보상을 강구할 것입니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text182"
                        defaultString="③ 하지만 근본적으로 개인정보의 보안관리에는 회원 본인의 노력도 중요합니다. Online 서비스는 오직 아이디와 패스워드를 알고 있는 본인에게만 개인정보에 접근할 수 있는 권한이 있으며, 패스워드를 유지하고 관리할 책임 역시도 본인에게 있습니다. 반드시 본인만이 알 수 있는 내용으로 패스워드를 구성해야 하며, 생년월일 또는 전화번호 등 타인이 쉽게 도용 할 수 있는 패스워드의 사용을 지양해야 합니다. 또한 공동으로 사용하는 PC에서 저희 Online서비스에 접속하여 로그온 한 상태에서 다른 사이트로 이동할 경우, 혹은 서비스 이용을 종료하였을 경우에는 반드시 해당 브라우저를 종료하시기 바랍니다. 그렇지 않을 경우, 해당 브라우저를 통해 아이디, 패스워드, 주민등록번호가 포함된 SK 구성원의 정보가 타인에게 손쉽게 유출될 위험이 있습니다"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text183"
                        defaultString="④ mySUNI는 SK 구성원 개인의 실수나 기본적인 인터넷의위험성 때문에 일어나는 일들에 대해 책임을 지지 않습니다."
                      />
                    </div>
                    <div className="text2">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text184"
                        defaultString="8. 개인정보 보호책임자"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text185"
                        defaultString="회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text186"
                        defaultString="▶ 개인정보 보호책임자"
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text187"
                        defaultString="성명 : 이규석"
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text188"
                        defaultString="소속 : IT전략지원실"
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text189"
                        defaultString="직책 : 실장"
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text190"
                        defaultString="연락처 : 02-6323-9002 /"
                      />
                      <a href="mailto:kite.lee@sk.com">
                        <PolyglotText
                          id="Privacy-2020Y9M1D-text191"
                          defaultString="kite.lee@sk.com"
                        />
                      </a>
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text192"
                        defaultString="▶ 개인정보 보호담당자"
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text193"
                        defaultString="성명 : 이의연"
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text194"
                        defaultString="소속 : LMS실"
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text195"
                        defaultString="직책 : 매니저"
                      />
                    </div>
                    <div className="text5">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text196"
                        defaultString="연락처 : 010-9246-1785 /"
                      />
                      <a href="mailto:kite.lee@sk.com">
                        <PolyglotText
                          id="Privacy-2020Y9M1D-text197"
                          defaultString="kite.lee@sk.com"
                        />
                      </a>
                    </div>
                    <div className="text2">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text198"
                        defaultString="9.인터넷 접속정보파일의 수집 등 등 개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text199"
                        defaultString='① 회사는 이용자에게 특화된 맞춤서비스를 제공하기 위해서 이용자들의 정보를 수시로 저장하고 찾아내는 "쿠키(cookie)", ”로그기록” 등을 수집하고 활용합니다.'
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text200"
                        defaultString="② “쿠키” 및 “로그기록”은 [이용자가 방문한 각 서비스(교육 프로그램)에 대한 이용형태, 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공] 목적으로 이용됩니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text201"
                        defaultString="③ 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을 설정함으로써 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다."
                      />
                    </div>
                    <div className="text2">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text202"
                        defaultString="10. 권익침해에 대한 구제 방법 (예시)"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text203"
                        defaultString="① SK 구성원께서는 mySUNI의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원에 대해개인정보보호책임자 및 개인정보보호담당자에게 알려주시기 바랍니다. 지적하신 문제를 조속히 확인하고 수정이 필요한 경우에는 최대한 빠른 시간 내에 조치하도록 노력하겠습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text204"
                        defaultString="② 또한 개인정보 침해에 대한 신고, 상담이 필요하신 경우에는 한국인터넷진흥원(KISA) 개인정보 침해신고센터로 문의하시기 바랍니다. SK 구성원이 개인정보침해를 통한 금전적, 정신적 피해를 입으신 경우에는 개인정보분쟁조정위원회에 피해구제를 신청하실 수 있습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text205"
                        defaultString="▶ 개인정보 침해신고센터 : (국번없이)118,"
                      />
                      <a href="mailto:privacy.kisa.or.kr">
                        <PolyglotText
                          id="Privacy-2020Y9M1D-text206"
                          defaultString="privacy.kisa.or.kr"
                        />
                      </a>
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text207"
                        defaultString="▶ 개인정보 분쟁조정위원회 : 1833-6972,"
                      />
                      <a href="mailto:kopico.go.kr">
                        <PolyglotText
                          id="Privacy-2020Y9M1D-text208"
                          defaultString="kopico.go.kr"
                        />
                      </a>
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text209"
                        defaultString="▶ 대검찰청 사이버수사과 : (국번없이)1301,"
                      />
                      <a href="mailto:cid@spo.go.kr">
                        <PolyglotText
                          id="Privacy-2020Y9M1D-text210"
                          defaultString="cid@spo.go.kr"
                        />
                      </a>{' '}
                      ,
                      <a href="http://www.spo.go.kr" target="_blank">
                        <PolyglotText
                          id="Privacy-2020Y9M1D-text211"
                          defaultString="spo.go.kr"
                        />
                      </a>
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text212"
                        defaultString="▶ 경찰청 사이버안전국 : (국번없이)182,"
                      />
                      <a href="mailto:cyberbureau.police.go.kr">
                        <PolyglotText
                          id="Privacy-2020Y9M1D-text213"
                          defaultString="cyberbureau.police.go.kr"
                        />
                      </a>
                    </div>
                    <div className="text2">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text214"
                        defaultString="11. 개인정보처리방침의 변경에 관한 사항"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text215"
                        defaultString="① 본 개인정보처리방침은 홈페이지 첫 화면에 공개함으로써 SK 구성원께서 언제나 용이하게 보실 수 있도록 조치하고 있습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text216"
                        defaultString="② 법령 정책 또는 보안기술의 변경에 따라 내용의 추가 삭제 및 수정이 있을 시에는 변경되는 개인정보처리방침을 시행하기 7일전에 홈페이지를 통해 변경이유 및 내용 등을 공지하도록 하겠습니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text217"
                        defaultString="본 개인정보처리방침의 내용은 수시로 변경될 수 있으므로 사이트를 방문하실 때마다, 이를 확인하시기 바랍니다."
                      />
                    </div>
                    <div className="text2">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text218"
                        defaultString="[부칙]"
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text219"
                        defaultString="(시행일) 본 개인정보처리방침은 2020년 9월 1일부터 시행합니다."
                      />
                    </div>
                    <div className="text3">
                      <PolyglotText
                        id="Privacy-2020Y9M1D-text220"
                        defaultString="- 공고일자 : 2020년 9월 1일"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {policyVer === '20200117' && (
          <>
            {/* 개인정보 처리방침 20200117 */}
            <div className="terms-text-wrap">
              <div className="privacy">
                <div className="scrolling-80vh">
                  <div className="text1">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text1"
                      defaultString="SK 이노베이션(이하 서비스명 ‘mySUNI’) 개인정보처리방침"
                    />
                  </div>
                  <div className="text1">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text2"
                      defaultString='SK 이노베이션 주식회사 (이하 "회사")는 mySUNI Learning Management System 운영과 관련하여 정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하 ‘정보통신망법’), 개인정보보호법에 따라 구성원의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침을 수립ㆍ공개합니다.'
                    />
                  </div>
                  <div className="text1">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text3"
                      defaultString="회사는 개인정보처리방침을 개정하는 경우 공지사항(또는 개별공지)을 통하여 공지할 것입니다."
                    />
                  </div>
                  <div className="text1">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text4"
                      defaultString="○ 본 방침은 2020년 1월 17일부터 시행됩니다."
                    />
                  </div>
                  <div className="text2">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text5"
                      defaultString="1. 개인정보의 처리 목적"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text6"
                      defaultString="회사는 구성원의 개인정보를 다음의 목적을 위하여 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 정보통신망법 제22조, 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다."
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text7"
                      defaultString="① mySUNI Learning Management System (이하 ‘mySUNI’)가입 및 관리"
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text8"
                      defaultString="구성원 서비스 제공에 따른 본인 식별/인증, 구성원 회원 자격 유지/관리, 각종 고지/통지, 고충처리 등의 목적으로 개인정보를 처리합니다."
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text9"
                      defaultString="② 서비스 제공"
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text10"
                      defaultString="콘텐츠/서비스 제공, 본인 인증 등을 목적으로 개인정보를 처리합니다."
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text11"
                      defaultString="③ 관계사 시스템 및 외부 Contents Providers 회사 시스템 연동"
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text12"
                      defaultString="관계사 및 외부 Contents Provider 회사의 교육 프로그램 활용 및 서비스 제공 등의 목적으로 개인정보를 처리합니다."
                    />
                  </div>
                  <div className="text2">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text13"
                      defaultString="2. 개인정보 처리 항목 및 보유기간"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text14"
                      defaultString="회사는 구성원의 개인정보를 DB형태로 보관/관리하고 있습니다."
                    />
                  </div>
                  <div className="bt">
                    <table className="four">
                      <thead>
                        <tr>
                          <th scope="col">
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text15"
                              defaultString="수집항목"
                            />
                          </th>
                          <th scope="col">
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text16"
                              defaultString="수집방법"
                            />
                          </th>
                          <th scope="col">
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text17"
                              defaultString="보유근거"
                            />
                          </th>
                          <th scope="col">
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text18"
                              defaultString="처리 및 보유기간"
                            />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text19"
                              defaultString="소속, 성명, 사번, 직위, 직책, 이메일주소, 사내 전화번호, 휴대전화번호"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text20"
                              defaultString="TokTok을 통한 시스템 연계"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text21"
                              defaultString="근로기준법 등 관련 법률 및 정보주체 동의"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text22"
                              defaultString="해당 구성원 퇴직 시 까지"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text2">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text23"
                      defaultString="3. 개인정보의 제3자 제공에 관한 사항"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text24"
                      defaultString="① mySUNI는 SK 구성원으로부터 수집한 개인정보를 &#39;2. 개인정보 수집 및 이용목적&#39;에서 고지한 범위 내에서만 사용하며, SK 구성원의 동의 없이는 동범위를 초과하여 이용하거나 제3자에게 제공하거나 공유하지 않습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text25"
                      defaultString="②mySUNI는 보다 나은 서비스 제공을 위하여 개인정보를 제3자에게 제공하거나 공유할 필요가 있는 경우 제공 또는 공유할 정보의 항목, 제공 또는 공유받는 자, 이용목적 및 보유기간, 연락처, 동의하지 않는 경우의 불이익 내용 등을 명시하여 SK 구성원께 동의를 구하는 절차를 거치게 되며,동의하지 않는 경우에는 제3자에게 제공 또는 공유하지않습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text26"
                      defaultString="③ 다만, 다음 각 호의 경우에는 예외로 합니다."
                    />
                    <br />
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text27"
                      defaultString="- 고객님이 사전에 동의하셨거나 서비스 제공 관련 계약 이행을 위하여 필요한 개인정보로 통상의 동의를 받기가 경제적/기술적 사유로 현저히 곤란한 경우"
                    />
                    <br />
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text28"
                      defaultString="- 서비스 제공에 따른 요금정산을 위하여 필요한 경우"
                    />
                    <br />
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text29"
                      defaultString="- 관련법령에 의거 적법한 절차에 의한 정부기관 등의요청이 있는 경우 고지하고, 개인정보 수집/이용 등에 대한 동의 철회의 선택권을 부여합니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text30"
                      defaultString="④ SK 구성원께서 온라인상의 게시판 등을 통해 기재한 인적사항을 제3자가 수집하는 경우가 있을 수 있으므로 이에 유의하시기 바랍니다. SK 구성원께서 스스로 게시판 등을 통해 기재한 인적사항과 관련하여 회사는 어떠한 책임도 지지않습니다."
                    />
                  </div>
                  <div className="bt">
                    <table className="four">
                      <thead>
                        <tr>
                          <th scope="col">
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text31"
                              defaultString="제공받는 자"
                            />
                          </th>
                          <th scope="col">
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text32"
                              defaultString="제공받는 자의 이용목적"
                            />
                          </th>
                          <th scope="col">
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text33"
                              defaultString="제공하는 항목"
                            />
                          </th>
                          <th scope="col">
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text34"
                              defaultString="보유 및 이용기간"
                            />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text35"
                              defaultString="SK 그룹 계열회사 (자세한 내역은 http://sk.co.kr 에서 확인 가능)"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text38"
                              defaultString="구성원의 교육 신청, 이수 현황 등 사용 이력"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text39"
                              defaultString="교육 이수 현황 등"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text40"
                              defaultString="해당 구성원 퇴직시까지"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text41"
                              defaultString="Linked In"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text42"
                              defaultString="구성원 SSO접속, 이수 현황 등"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text43"
                              defaultString="소속, 성명, 이메일"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text44"
                              defaultString="해당 구성원 퇴직시까지"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text45"
                              defaultString="Carrot Global"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text46"
                              defaultString="구성원 SSO접속, 이수 현황 등"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text47"
                              defaultString="소속, 성명, 이메일"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text48"
                              defaultString="해당 구성원 퇴직시까지"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text49"
                              defaultString="Culturetree"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text50"
                              defaultString="구성원 SSO접속, 이수 현황 등"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text51"
                              defaultString="소속, 성명, 이메일"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text52"
                              defaultString="해당 구성원 퇴직시까지"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text53"
                              defaultString="Coursera"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text54"
                              defaultString="구성원 SSO접속, 이수 현황 등"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text55"
                              defaultString="소속, 성명, 이메일"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text56"
                              defaultString="해당 구성원 퇴직시까지"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text57"
                              defaultString="Elice"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text58"
                              defaultString="구성원 SSO접속, 이수 현황 등"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text59"
                              defaultString="소속, 성명, 이메일"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text60"
                              defaultString="해당 구성원 퇴직시까지"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text61"
                              defaultString="휴레드 컨설팅"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text62"
                              defaultString="구성원 SSO접속, 이수 현황 등"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text63"
                              defaultString="소속, 성명, 이메일"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text64"
                              defaultString="해당 구성원 퇴직시까지"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text65"
                              defaultString="11번가 도서"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text66"
                              defaultString="구성원 SSO접속, 이수 현황 등"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text67"
                              defaultString="소속, 성명, 이메일"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text68"
                              defaultString="해당 구성원 퇴직시까지"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text69"
                              defaultString="SK M&amp;Service"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text70"
                              defaultString="구성원 SSO접속, 이수 현황 등"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text71"
                              defaultString="소속, 성명, 이메일"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text72"
                              defaultString="해당 구성원 퇴직시까지"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text73"
                              defaultString="Panopto"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text74"
                              defaultString="구성원 SSO접속, 이수 현황 등"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text75"
                              defaultString="소속, 성명, 이메일"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text76"
                              defaultString="해당 구성원 퇴직시까지"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text77"
                              defaultString="Globe Smart(APERIAN Global)"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text78"
                              defaultString="구성원 SSO접속, 이수 현황 등"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text79"
                              defaultString="소속, 성명, 이메일"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text80"
                              defaultString="해당 구성원 퇴직시까지"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text81"
                              defaultString="블룸컴퍼니"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text82"
                              defaultString="구성원 SSO접속, 이수 현황 등"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text83"
                              defaultString="소속, 성명, 이메일"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text84"
                              defaultString="해당 구성원 퇴직시까지"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text85"
                              defaultString="Leadership College"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text86"
                              defaultString="구성원 SSO접속, 이수 현황 등"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text87"
                              defaultString="소속, 성명, 이메일"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text88"
                              defaultString="해당 구성원 퇴직시까지"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text2">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text89"
                      defaultString="4. 개인정보 처리 위탁"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text90"
                      defaultString="회사는 안정적인 개인정보 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다."
                    />
                  </div>
                  <div className="bt">
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text91"
                              defaultString="위탁받는 자(수탁자)"
                            />
                          </th>
                          <th scope="col">
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text92"
                              defaultString="위탁하는 업무의 내용"
                            />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text93"
                              defaultString="SK 주식회사"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text94"
                              defaultString="‘mySUNI’ LMS 운영/개발 위탁"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text95"
                              defaultString="SK M&amp;Service"
                            />
                          </td>
                          <td>
                            <PolyglotText
                              id="Privacy-2020Y1M17D-text96"
                              defaultString="서비스 운영을 위한 메일 안내 및 교육 운영/관리, 결과 Data정리"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text97"
                      defaultString="회사는 위탁계약 체결시 정보통신망법 제25조, 개인정보보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적/관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리/감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다."
                    />
                    <br />

                    <PolyglotText
                      id="Privacy-2020Y1M17D-text98"
                      defaultString="위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text99"
                      defaultString="mySUNI는 SK 구성원에 대한 서비스의 유지 및 관리, 고객상담, 기타 서비스 안내를 위하여 전문용역 업체에 일부 업무를 위탁운영하고 있습니다. 위탁을 받은 업체는 위탁을 받은 목적을 벗어나서 개인정보를 이용할 수 없습니다. 또한, mySUNI는 이러한 위탁업체에 대하여 해당 개인정보가 위법하게 이용되지 않도록 정기적인 감시와 감독을 실시합니다."
                    />
                  </div>

                  <div className="text2">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text100"
                      defaultString="5. 정보주체의 권리, 의무 및 그 행사방법"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text101"
                      defaultString="① 구성원은 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다."
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text102"
                      defaultString="- 개인정보 열람요구"
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text103"
                      defaultString="- 오류 등이 있을 경우 정정 요구"
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text104"
                      defaultString="- 삭제요구"
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text105"
                      defaultString="- 처리정지 요구"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text106"
                      defaultString="② 제1항에 따른 권리 행사는 개인정보 보호법 시행규칙 별지 제8호 서식 또는 각 구성원 소속사 사규(개인정보보호규칙)에 따라 서면 &middot; 전자우편 &middot; 모사전송(FAX) 등을 통하여 하실 수 있습니다. 다만, 구성원 개인정보의 오류로 인하여 불이익이 발생할 수 있으니 상세한 사항은 인사부서에 문의하여 주시기 바랍니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text107"
                      defaultString="③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식 또는 회사 사규(개인정보보호규칙)에 따른 위임장을 제출하셔야 합니다."
                    />
                  </div>

                  <div className="text2">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text108"
                      defaultString="개인정보의 열람 및 정정"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text109"
                      defaultString="① SK 구성원은 언제든지 등록되어 있는 본인의 개인정보를 열람하거나 정정하실 수 있습니다. 특히 SK 구성원의 개인정보의 정정 요구에 대하여 MYSUNI는 해당 내용에 대해 정정할 때까지 당해 개인정보를 이용하지 않습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text110"
                      defaultString="② mySUNI는 회원의 개인정보 이용내역을 연 1회 이상 회원에게 전자우편·서면·팩스·전화 등의 방법으로 통지합니다."
                    />
                  </div>

                  <div className="text2">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text111"
                      defaultString="개인정보 수집, 이용, 제공에 대한 동의철회"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text112"
                      defaultString="① SK 구성원은 회원가입 시 개인정보 수집, 이용 및 제공에 대해 동의하신 내용을 언제든지 철회하실 수 있습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text113"
                      defaultString="② 동의 철회는 홈페이지나 고객센터에 연락하여 본인 확인 절차를 거치신 후 직접 동의철회 신청을 하시거나,개인정보 보호책임자 또는 개인정보보호담당자에게 서면 또는 E-Mail등으로 송부하여 주시면 지체 없이 조치하여 드립니다."
                    />
                  </div>

                  <div className="text2">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text114"
                      defaultString="개인정보의 처리정지"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text115"
                      defaultString="① SK 구성원은 개인정보 수집, 이용 및 제공에 동의하신 내용에 대하여 SK 구성원 본인의 개인정보 처리의 정지를 요구할 수 있습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text116"
                      defaultString="② 처리정지 요청은 홈페이지나 고객센터에 연락하여 본인 확인 절차를 거치신 후 직접 처리정지를 신청을 하시거나, 개인정보 보호책임자 또는 개인정보 보호담당자에게 서면 또는 E-Mail등으로 송부하여 주시면 지체 없이 조치하여 드립니다. 다만, 다음 각 호의 어느 하나에 해당하는 경우에는 SK 구성원의 처리정지 요구를 거절할 수 있습니다."
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text117"
                      defaultString="- 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우"
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text118"
                      defaultString="- 다른 사람의 생명/신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우"
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text119"
                      defaultString="- 개인정보를 처리하지 아니하면 SK 구성원과 약정한 서비스를 제공하지 못하는 등 계약의 이행이 곤란한 경우로서 SK 구성원께서 그 계약의 해지 의사를 명확하게 밝히지 아니한 경우"
                    />
                  </div>
                  <div className="text3">
                    {' '}
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text120"
                      defaultString="※ 로그인이 불가능하신 고객께서는 ‘개인정보 처리 요구서 다운로드 하기’를 이용하여 신청서를 작성하신 후 개인정보 담당자에게 이메일 송부 하여 주시기 바랍니다. (문의"
                    />
                    <a href="mailto:kite.lee@sk.com">
                      <PolyglotText
                        id="Privacy-2020Y1M17D-text121"
                        defaultString="kite.lee@sk.com"
                      />
                    </a>
                    ) <br />
                    <a href="https://mysuni.sk.com/profile/commondocs/mySUNI_Privacy_Handling_Request.docx">
                      <PolyglotText
                        id="Privacy-2020Y1M17D-text122"
                        defaultString="개인정보처리 요구서 다운로드 하기"
                      />
                    </a>
                  </div>

                  <div className="text2">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text123"
                      defaultString="6. 개인정보의 파기"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text124"
                      defaultString="회사는 원칙적으로 개인정보 보유기간의 경과, 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다."
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text125"
                      defaultString="- 파기절차"
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text126"
                      defaultString="회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다."
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text127"
                      defaultString="- 파기기한"
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text128"
                      defaultString="정보주체로부터 동의 받은 개인정보 보유기간이 경과하거나 처리 목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는 해당 개인정보는 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보관합니다."
                    />
                    <br />
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text129"
                      defaultString="또한, 처리목적의 달성, 해당 서비스의 폐지, 사업의 종료 등 개인정보가 불필요한 것으로 인정되는 날로부터 3일 이내에 파기합니다."
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text130"
                      defaultString="- 파기방법"
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text131"
                      defaultString="전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다."
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text132"
                      defaultString="개인정보 파기 절차 및 방법"
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text133"
                      defaultString="mySUNI는 수집한 개인정보의 이용목적이 달성되거나, 서비스 회원을 탈퇴할 경우 당해 SK 구성원의 개인정보를 다음 각호의 방법으로 지체 없이 파기하여 향후 어떠한 용도로도 열람 또는 이용할 수 없도록 처리하고 있습니다. 단, &#39;5.개인정보 보유기간 및 이용기간 ②&#39;와 같은 예외 경우를 두고 있습니다."
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text134"
                      defaultString="- 종이에 출력된 개인정보는 분쇄기로 분쇄, 소각 또는 용해를 통하여 파기합니다."
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text135"
                      defaultString="- 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다."
                    />
                  </div>
                  <div className="text2">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text136"
                      defaultString="7. 개인정보의 안전성 확보 조치"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text137"
                      defaultString="회사는 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text138"
                      defaultString="① 개인정보 취급 직원의 최소화 및 교육"
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text139"
                      defaultString="개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text140"
                      defaultString="② 정기적인 자체 감사 실시"
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text141"
                      defaultString="개인정보 취급 관련 안정성 확보를 위해 정기적으로 자체 감사를 실시하고 있습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text142"
                      defaultString="③ 내부관리계획의 수립 및 시행"
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text143"
                      defaultString="개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text144"
                      defaultString="④ 개인정보의 암호화"
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text145"
                      defaultString="구성원의 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text146"
                      defaultString="⑤ 해킹 등에 대비한 기술적 대책"
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text147"
                      defaultString="회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text148"
                      defaultString="⑥ 개인정보에 대한 접근 제한"
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text149"
                      defaultString="개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text150"
                      defaultString="⑦ 접속기록의 보관 및 위변조 방지"
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text151"
                      defaultString="개인정보처리시스템에 접속한 기록을 최소 1년 이상 보관,관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능을 사용하고 있습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text152"
                      defaultString="⑧ 문서보안을 위한 잠금장치 사용"
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text153"
                      defaultString="개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text154"
                      defaultString="⑨ 비인가자에 대한 출입 통제"
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text155"
                      defaultString="개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text156"
                      defaultString="개인정보보호를 위한 안정성 확보 조치"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text157"
                      defaultString="① mySUNI는 SK 구성원의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조, 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적 대책을 강구하고 있습니다."
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text158"
                      defaultString="- SK 구성원의 주요 개인정보는 암호화하여 저장하고 있으며, 파일 및 전송 데이터를 암호화하여 혹시 발생할 수 있는 사고 시라도 SK 구성원의 개인정보가 유출되지 않도록 관리되고 있습니다."
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text159"
                      defaultString="- SK 구성원의 개인정보를 저장하고 처리하는 시스템은 방화벽과 침입탐지시스템을 통하여 보호되며 24시간 감시를 통하여 외부로부터의 위협에 대해 관리되고 있습니다."
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text160"
                      defaultString="- SK 구성원의 개인정보를 저장하고 처리하는 시스템은 자동으로 갱신되는 백신프로그램을 이용하여 컴퓨터 바이러스에 의한 피해로부터 보호되고 있습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text161"
                      defaultString="② 또한 mySUNI는 SK 구성원의 개인정보를 처리함에 있어 다음과 같은 관리적 대책을 강구하고 있습니다."
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text162"
                      defaultString="- SK 구성원의 개인정보에 대한 접근권한을 최소한의 인원으로 제한하고 있습니다."
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text163"
                      defaultString="- 임직원이 업무를 함에 있어 SK 구성원의 개인정보를 보호하기 위해 지켜야 할 사내규정을 마련하여 준수하고 있습니다."
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text164"
                      defaultString="- 임직원이 SK 구성원의 개인정보를 처리하기 이전에 보안서약서를 통하여 SK 구성원의 개인정보에 대한 정보유출을 사전에 방지하고 사내규정에 대한 이행사항 및 준수여부를 감시하기 위한 내부절차를 마련하고 있습니다."
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text165"
                      defaultString="- 임직원의 개인정보보호 고취를 위한 정기적인 개인정보보호교육을 실시하고 있습니다."
                    />
                  </div>
                  <div className="text4">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text166"
                      defaultString="- 그 외 내부 관리자의 실수나 기술관리 상의 사고로 인해 개인정보의 상실, 유출, 변조, 훼손이 유발될 경우 즉각 SK 구성원께 사실을 알리고 적절한 대책과 보상을 강구할 것입니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text167"
                      defaultString="③ 하지만 근본적으로 개인정보의 보안관리에는 회원 본인의 노력도 중요합니다. Online 서비스는 오직 아이디와 패스워드를 알고 있는 본인에게만 개인정보에 접근할 수 있는 권한이 있으며, 패스워드를 유지하고 관리할 책임 역시도 본인에게 있습니다. 반드시 본인만이 알 수 있는 내용으로 패스워드를 구성해야 하며, 생년월일 또는 전화번호 등 타인이 쉽게 도용 할 수 있는 패스워드의 사용을 지양해야 합니다. 또한 공동으로 사용하는 PC에서 저희 Online서비스에 접속하여 로그온 한 상태에서 다른 사이트로 이동할 경우, 혹은 서비스 이용을 종료하였을 경우에는 반드시 해당 브라우저를 종료하시기 바랍니다. 그렇지 않을 경우, 해당 브라우저를 통해 아이디, 패스워드, 주민등록번호가 포함된 SK 구성원의 정보가 타인에게 손쉽게 유출될 위험이 있습니다"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text168"
                      defaultString="④ mySUNI는 SK 구성원 개인의 실수나 기본적인 인터넷의 위험성 때문에 일어나는 일들에 대해 책임을 지지 않습니다."
                    />
                  </div>
                  <div className="text2">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text169"
                      defaultString="8. 개인정보 보호책임자"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text170"
                      defaultString="회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text171"
                      defaultString="▶ 개인정보 보호책임자"
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text172"
                      defaultString="성명 : 이규석"
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text173"
                      defaultString="소속 : IT전략지원실"
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text174"
                      defaultString="직책 : 실장"
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text175"
                      defaultString="연락처 : 02-6323-9002 /"
                    />
                    <a href="mailto:kite.lee@sk.com">
                      <PolyglotText
                        id="Privacy-2020Y1M17D-text176"
                        defaultString="kite.lee@sk.com"
                      />
                    </a>
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text177"
                      defaultString="▶ 개인정보 보호담당자"
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text178"
                      defaultString="성명 : 이의연"
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text179"
                      defaultString="소속 : LMS실"
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text180"
                      defaultString="직책 : 매니저"
                    />
                  </div>
                  <div className="text5">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text181"
                      defaultString="연락처 : 010-9246-1785 /"
                    />
                    <a href="mailto:kite.lee@sk.com">
                      <PolyglotText
                        id="Privacy-2020Y1M17D-text182"
                        defaultString="kite.lee@sk.com"
                      />
                    </a>
                  </div>
                  <div className="text2">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text183"
                      defaultString="9.인터넷 접속정보파일의 수집 등 등 개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text184"
                      defaultString='① 회사는 이용자에게 특화된 맞춤서비스를 제공하기 위해서 이용자들의 정보를 수시로 저장하고 찾아내는 "쿠키(cookie)", ”로그기록” 등을 수집하고 활용합니다.'
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text185"
                      defaultString="② “쿠키” 및 “로그기록”은 [이용자가 방문한 각 서비스(교육 프로그램)에 대한 이용형태, 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공] 목적으로 이용됩니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text186"
                      defaultString="③ 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을 설정함으로써 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다."
                    />
                  </div>
                  <div className="text2">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text187"
                      defaultString="10. 권익침해에 대한 구제 방법 (예시)"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text188"
                      defaultString="① SK 구성원께서는 mySUNI의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원에 대해개인정보보호책임자 및 개인정보보호담당자에게 알려주시기 바랍니다. 지적하신 문제를 조속히 확인하고 수정이 필요한 경우에는 최대한 빠른 시간 내에 조치하도록 노력하겠습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text189"
                      defaultString="② 또한 개인정보 침해에 대한 신고, 상담이 필요하신 경우에는 한국인터넷진흥원(KISA) 개인정보 침해신고센터로 문의하시기 바랍니다. SK 구성원이 개인정보침해를 통한 금전적, 정신적 피해를 입으신 경우에는 개인정보분쟁조정위원회에 피해구제를 신청하실 수 있습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text190"
                      defaultString="▶ 개인정보 침해신고센터 : (국번없이)118,"
                    />
                    <a href="mailto:privacy.kisa.or.kr">
                      <PolyglotText
                        id="Privacy-2020Y1M17D-text191"
                        defaultString="privacy.kisa.or.kr"
                      />
                    </a>
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text192"
                      defaultString="▶ 개인정보 분쟁조정위원회 : 1833-6972,"
                    />{' '}
                    <a href="mailto:kopico.go.kr">
                      <PolyglotText
                        id="Privacy-2020Y1M17D-text193"
                        defaultString="kopico.go.kr"
                      />
                    </a>
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text194"
                      defaultString="▶ 대검찰청 사이버수사과 : (국번없이)1301,"
                    />{' '}
                    <a href="mailto:cid@spo.go.kr">
                      <PolyglotText
                        id="Privacy-2020Y1M17D-text195"
                        defaultString="cid@spo.go.kr"
                      />
                    </a>
                    ,
                    <a href="http://www.spo.go.kr" target="_blank">
                      <PolyglotText
                        id="Privacy-2020Y1M17D-text196"
                        defaultString="spo.go.kr"
                      />
                    </a>
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text197"
                      defaultString="▶ 경찰청 사이버안전국 : (국번없이)182,"
                    />
                    <a href="mailto:cyberbureau.police.go.kr">
                      <PolyglotText
                        id="Privacy-2020Y1M17D-text198"
                        defaultString="cyberbureau.police.go.kr"
                      />
                    </a>
                  </div>

                  <div className="text2">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text199"
                      defaultString="11. 개인정보처리방침의 변경에 관한 사항"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text200"
                      defaultString="① 본 개인정보처리방침은 홈페이지 첫 화면에 공개함으로써 SK 구성원께서 언제나 용이하게 보실 수 있도록 조치하고 있습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text201"
                      defaultString="② 법령 정책 또는 보안기술의 변경에 따라 내용의 추가 삭제 및 수정이 있을 시에는 변경되는 개인정보처리방침을 시행하기 7일전에 홈페이지를 통해 변경이유 및 내용 등을 공지하도록 하겠습니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text202"
                      defaultString="본 개인정보처리방침의 내용은 수시로 변경될 수 있으므로 사이트를 방문하실 때마다, 이를 확인하시기 바랍니다."
                    />
                  </div>
                  <div className="text2">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text203"
                      defaultString="[부칙]"
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text204"
                      defaultString="(시행일) 본 개인정보처리방침은 2020년 1월 17일부터 시행합니다."
                    />
                  </div>
                  <div className="text3">
                    <PolyglotText
                      id="Privacy-2020Y1M17D-text205"
                      defaultString="- 공고일자 : 2020년 1월 17일"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
