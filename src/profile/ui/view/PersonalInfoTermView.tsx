import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody } from 'semantic-ui-react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

export class PersonalInfoTermView extends Component {
  render() {
    //
    return (
      <div className="terms-text-wrap">
        <div className="privacy">
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
                <PolyglotText id="Privacy-2021Y6M14D-text4" defaultString="①" />
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
    );
  }
}
