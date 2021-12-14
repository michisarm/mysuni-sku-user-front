import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Image, Menu, Label, Tab } from 'semantic-ui-react';
import { reactAlert } from '@nara.platform/accent';
import routePaths from 'main/routePaths';
import { SkProfileService } from 'profile/stores';
import queryString from 'query-string';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';

const PUBLIC_URL = process.env.PUBLIC_URL;
const emptyAlert = (e: any) => {
  e.preventDefault();
  reactAlert({
    title: '알림',
    message: '준비 중입니다.',
  });
};

const panes = [
  {
    menuItem: 'Management College 소개',
    key: 'tab0',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <Link
              to="/lecture/college/CLG00008/channels/pages/1"
              className="item-button"
            >
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              과정 바로가기
            </Link>
          </div>
        </div>

        <div className="belt">
          <div className="belt_wrapper">
            <div className="belt sub">
              <Image src={`${PUBLIC_URL}/images/all/con-01.png`} alt="" />
            </div>
            {/* <div className="belt_texts">
              <p>“ Intergrative Perspective &#38; Decision ”</p>
              <span>
                기업 경영 전반에 걸친 Perspective와 전략적 의사결정 역량 확보
              </span>
              <p>“ Over the Silo ”</p>
              <span>
                Function간, Function &#38; 역량 간 융합을 통해 보다 넓은 관점과{' '}
                <br />
                다양한 간접 경험 확보
              </span>
              <p>“ Set the Fundamental ”</p>
              <span>
                - Function 과정 : Function Group별 기초 지식 및 전문성 확보
              </span>
              <br />
              <span>- Competency 과정 : Deep Change를 위한 공통 역량 제고</span>
            </div> */}
          </div>
        </div>

        <div className="belt college-mana-text">
          <p>
            <strong>개인의 직무와 수준, 관심사를 고려</strong>하여 스스로 필요한
            Online Contents의 자기주도적 학습, On-Off 통합 또는 Offline W/S을
            통해 <br />
            Discussion, 내/외부 Case Study, Practice 공유 등{' '}
            <strong>실행 지향적 학습방식</strong>을 적용합니다. <br />
            특히, 외부의 Top Expert 뿐 아니라 SK 리더/전문가의 Insight와 경험을
            공유하는 SK Exclusive Contents를 제공할 계획입니다.
          </p>
          <p className="p_link">
            각 Badge를 클릭하면 해당 페이지로 이동합니다.
          </p>
        </div>

        <div className="college-cont-map sub wrap01">
          <div className="belt">
            <Image src={`${PUBLIC_URL}/images/all/main_01.jpg`} alt="" />
          </div>
        </div>
        <div className="college-cont-map sub pbtom">
          <div className="belt">
            <div className="label sub">
              Management College Badge 체계
              <span>(21년 2월 기준으로 추후 지속 확대 예정)</span>
            </div>

            <div className="manage-main-wrap">
              <div className="manage-main-table con01">
                <div className="manage-main-tit tit02">
                  <h3>
                    <strong>Level 1</strong>(Essential)
                  </h3>
                </div>
                <div className="manage-badge-main">
                  <p>
                    해당 영역 관련 역량 강화를 위한 주춧돌(Foundation)
                    과정으로서,
                    <br />
                    직무 수행 시 리더/구성원 모두 반드시 알아야 하는 기본적 지식
                    습득을 목적으로 합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="manage-main-wrap">
              <div className="manage-main-table con01">
                <div className="manage-main-tit tit02">
                  <h3>
                    <strong>Level 2</strong>(Advanced)
                  </h3>
                </div>
                <div className="manage-badge-main">
                  <p>
                    해당 직무를 5년 이상 경험한 리더/구성원들을 학습 대상으로
                    하며
                  </p>
                  <p className="badge-descrip">
                    <strong>
                      실무 현장에서 필요로 하는 전문 지식/Knowhow 학습
                    </strong>
                  </p>
                  <p className="badge-descrip">
                    <strong>
                      워크샵 등을 활용한 전문가 및 동료 구성원들과의 상호작용{' '}
                    </strong>
                    등을 통한 직무 전문성 제고를 목적으로 합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="chart_belt">
              <div className="chart-left">
                <Image src={`${PUBLIC_URL}/images/all/icon-chart.png`} alt="" />
              </div>
              <div className="chart-right">
                <table style={{ borderCollapse: 'separate' }}>
                  <tbody>
                    <tr>
                      <td colSpan={2}>ㅤ</td>
                      <td className="badge-texts">
                        <Link to="" onClick={emptyAlert}>
                          디지털 융합
                          <br />
                          마케팅
                        </Link>
                      </td>
                      <td className="badge-texts">
                        <Link to="/certification/badge/badge-detail/BADGE-30">
                          조직 Design
                        </Link>
                      </td>
                      <td className="badge-texts">
                        <Link to="" onClick={emptyAlert}>
                          구매
                          <br />
                          Advanced
                        </Link>
                      </td>
                      <td className="badge-texts">
                        <Link to="" onClick={emptyAlert}>
                          회사법
                        </Link>
                        <br />
                        /<br />
                        <Link to="/certification/badge/badge-detail/BADGE-4d">
                          공정거래법
                        </Link>
                      </td>
                      <td>ㅤ</td>
                    </tr>
                    <tr>
                      <td className="badge-texts">
                        <Link to="/certification/badge/badge-detail/BADGE-46">
                          Strategy
                          <br />
                          Essentials
                        </Link>
                      </td>
                      <td className="badge-texts">
                        <Link to="/certification/badge/badge-detail/BADGE-49">
                          재무
                          <br />
                          Essentials
                        </Link>
                      </td>
                      <td className="badge-texts">
                        <Link to="/certification/badge/badge-detail/BADGE-4c">
                          브랜드
                          <br />
                          Essentials
                        </Link>
                        <br />
                        /<br />
                        <Link to="/certification/badge/badge-detail/BADGE-4a">
                          마케팅
                          <br />
                          Essentials
                        </Link>
                      </td>
                      <td className="badge-texts">
                        <Link to="/certification/badge/badge-detail/BADGE-4b">
                          HR
                          <br />
                          Essentials
                        </Link>
                      </td>
                      <td className="badge-texts">
                        <Link to="/certification/badge/badge-detail/BADGE-4g">
                          구매
                          <br />
                          Essentials
                        </Link>
                      </td>
                      <td className="badge-texts">
                        <Link to="/certification/badge/badge-detail/BADGE-4e">
                          IP Mindset
                          <br />
                          Essentials
                        </Link>
                      </td>
                      <td className="badge-texts grey">
                        <Link to="/certification/badge/badge-detail/BADGE-4f">
                          협상
                          <br />
                          Essentials
                        </Link>
                        <br />
                        /<br />
                        <Link to="/certification/badge/badge-detail/BADGE-44">
                          Measurement
                          <br />
                          Essentials
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="badge-texts-sm">기업 경영/전략</td>
                      <td className="badge-texts-sm">재무/회계</td>
                      <td className="badge-texts-sm">마케팅/Brand</td>
                      <td className="badge-texts-sm">HR/조직 설계</td>
                      <td className="badge-texts-sm">SCM/Operation</td>
                      <td className="badge-texts-sm">법무/IP</td>
                      <td className="badge-texts-sm grey">Competency</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* <div className="combined-topic">
                <Image src={`${PUBLIC_URL}/images/all/ing-16.png`} alt="" />
              </div> */}
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: '기업 경영/전략',
    key: 'tab1',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <Link
              to="/lecture/college/CLG00008/channel/CHN00014"
              className="item-button"
            >
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              과정 바로가기
            </Link>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>기업 경영/전략</strong>
          <div>
            <ul>
              <li>
                직무별 Essential/심화 Contents는 물론, 최근의 Deep Change 화두를
                반영한 시의적절한 교육 과정을 제공합니다.
              </li>
              <li>
                이를 통해 해당 직무 구성원들의 지식 체계화는 물론, 전략적
                사고력(Way of Thinking)을 강화하는 것을 목표로 합니다.{' '}
              </li>
            </ul>
            <p className="p_link">
              각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image
              src={`${PUBLIC_URL}/images/all/enter-category.png`}
              alt=""
              className="manage_cate"
            />

            {/* 컬리지 콘텐츠 전체 틀 */}
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="level_icon">
                  <Image
                    src={`${PUBLIC_URL}/images/all/enter-lv-02.png`}
                    alt=""
                  />
                  <p>
                    방법론/ <br />
                    적용학습
                  </p>
                </div>
                <Image src={`${PUBLIC_URL}/images/all/ing-12.png`} alt="" />
              </div>

              <div className="combined-topic">
                <div className="con_wrap sub03 ing_con01">
                  {/* 콘텐츠 리스트 */}
                  <h3>AI/DT &#38; Strategy</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-1ha/view">
                        <ul>
                          <li>AI/DT 기반의 Deep Change 전략</li>
                          <li>- AI/DT 전략의 기본 개념</li>
                          <li>- AI/DT 전략 수립 Process</li>
                          <li>- AI 기반 DT의 전략적 의미</li>
                          <li>- AI/DT 전략 가설의 재구성</li>
                        </ul>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="con_wrap sub02 ing_con02">
                  <Image src={`${PUBLIC_URL}/images/all/ing-14.png`} alt="" />
                </div>

                <div className="con_wrap sub03 ing_con01">
                  {/* 콘텐츠 리스트 */}
                  <h3>ESG &#38; Strategy</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-1h9/view">
                        <ul>
                          <li>SV 기반의 Deep Change 전략</li>
                          <li>- SV 전략수립 Process</li>
                          <li>- SV 창출을 위한 논의</li>
                          <li>- SV 창출 내재화 방안</li>
                          <li>- 전략에 SV 적용하기</li>
                        </ul>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="con_wrap sub02 ing_con02">
                  <Image src={`${PUBLIC_URL}/images/all/ing-15.png`} alt="" />
                </div>
              </div>
            </div>

            {/* 컬리지 콘텐츠 전체 틀 */}
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="level_icon">
                  <Image src={`${PUBLIC_URL}/images/all/lv-01.png`} alt="" />
                  <p>개념 이해</p>
                </div>
                <div className="con_wrap sub02">
                  {/* 콘텐츠 리스트 */}
                  <h3>
                    <Link to="/certification/badge/badge-detail/BADGE-46">
                      Strategy Essentials
                    </Link>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-9m5/view">
                        <ul className="height_fixed">
                          <li>전략 101 : 어서 와, 전략은 처음이지?</li>
                          <li>- 전략이란 무엇인가?</li>
                          <li>- 전략 경영 Process</li>
                          <li>- 전략의 수립 및 실행</li>
                          <li>- Strategy in SK</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-a2s/view">
                        <ul className="height_fixed">
                          <li>All about Portfolio Strategy</li>
                          <li>- Portfolio Mgmt의 Option</li>
                          <li>- M&#38;A/JV</li>
                          <li>- Separation/Divestiture</li>
                          <li>- SK M&#38;A History &#38; Case</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a4f/view">
                        <ul className="sub height_fixed">
                          <li>전략 수립의 시작, 경영환경분석</li>
                          <li>- 외부환경분석 Tool &#38; Framework</li>
                          <li>- 내부환경분석 Tool &#38; Framework</li>
                          <li>- 경영환경분석 실전 Tip</li>
                        </ul>
                      </Link>
                      <ul className="ul_img_none height_fixed">
                        <li className="pd0">
                          <Image
                            src={`${PUBLIC_URL}/images/all/ing-13.png`}
                            alt=""
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="combined-topic">
                <Image src={`${PUBLIC_URL}/images/all/ing-16.png`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: '재무/회계',
    key: 'tab2',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <Link
              to="/lecture/college/CLG00008/channel/CHN0005w"
              className="item-button"
            >
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              과정 바로가기
            </Link>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>재무/회계</strong>
          <div>
            <ul>
              <li>
                Finance/회계/세무 분야의 직무 전문성을 제고하고, 이론 뿐만
                아니라 SK 내부 Practice 및 Case 제시를 통해 구성원 여러분들의
                다양한 학습 Needs 충족을 목표로 합니다.
              </li>
              <li>
                사내 전문가를 활용한 SK Practice/Case 발굴∙공유,
                Workshop/Community 활동 확대를 통한 구성원간 상호 지식 공유를
                지향함으로써, SK 구성원들의 Deep Change 실행력을 강화하고자
                합니다.
              </li>
            </ul>
            <p className="p_link">
              각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image
              src={`${PUBLIC_URL}/images/all/enter-category.png`}
              alt=""
              className="manage_cate"
            />
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <h2>Finance</h2>
                <h2>회계</h2>
                <h2>세무</h2>
              </div>

              <div className="combined-topic">
                <h2>Finance/회계/세무+a</h2>
              </div>

              <div className="ing_contents">
                <div className="level_icon">
                  <Image
                    src={`${PUBLIC_URL}/images/all/enter-lv-02.png`}
                    alt=""
                  />
                  <p>
                    방법론/ <br />
                    적용학습
                  </p>
                </div>
                <Image src={`${PUBLIC_URL}/images/all/ing-05.png`} alt="" />
              </div>

              <div className="fundamental-topic float-left">
                <div className="con_wrap sub02">
                  <div className="level_icon">
                    <Image src={`${PUBLIC_URL}/images/all/lv-01.png`} alt="" />
                    <p>개념 이해</p>
                  </div>
                  <h3>
                    <Link to="/certification/badge/badge-detail/BADGE-49">
                      재무 Essentials
                    </Link>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul className="ul_style">
                        <li>
                          <Link to="/lecture/card/CARD-a4o/view">
                            재무관리 101
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-a4j/view">
                            기업가치, 무엇이고 어떻게 평가하는가?
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="con_sub_box">
                      <ul className="ul_style">
                        <li>
                          <Link to="/lecture/card/CARD-a65/view">
                            궁금해요, 내부회계관리제도
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-a4x/view">
                            처음 만나는 원가/관리회계
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-a4r/view">
                            하나씩 쉽게, 계정과목 별 회계처리
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-a2x/view">
                            Fun-Fun한 회계
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="con_sub_box">
                      <ul className="ul_one">
                        <li>
                          <Link to="/lecture/card/CARD-a6f/view">
                            세무회계 실무 첫걸음
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <ul className="sub_ul">
                    <li>
                      <Link to="/lecture/card/CARD-6qg/view">
                        조직 설계 길라잡이
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-6b6/cube/CUBE-8ut/view/Video">
                        조직 설계 Tip : Smart Design
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-6m0/cube/CUBE-952/view/Video">
                        조직 설계 효과성 측정
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: '마케팅/브랜드',
    key: 'tab3',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <Link
              to="/lecture/college/CLG00008/channel/CHN00018"
              className="item-button"
            >
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              과정 바로가기
            </Link>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>마케팅/브랜드</strong>
          <div>
            <ul>
              <li>
                기업이 상품 또는 서비스를 고객에게 유통시키는 과정에서 창출되는
                다양한 Value 와 관련된 ‘마케팅’,
                <br />
                경쟁 기업/상품과 구별되는 무형자산으로서 해당 기업의 가치를
                상징하는 ‘브랜드’에 대해 다룸으로써,
                <br />
                해당 직무 관련 SK 구성원들의{' '}
                <strong>Deep Change 실행력 제고</strong>를 위한 체계적인
                컨텐츠를 제공합니다.
              </li>
            </ul>
            <p className="p_link">
              각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image
              src={`${PUBLIC_URL}/images/all/enter-category.png`}
              alt=""
              className="manage_cate"
            />
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="level_icon">
                  <Image
                    src={`${PUBLIC_URL}/images/all/enter-lv-02.png`}
                    alt=""
                  />
                  <p>
                    방법론/ <br />
                    적용학습
                  </p>
                </div>
                <Image src={`${PUBLIC_URL}/images/all/ing-06.png`} alt="" />
              </div>
              <div className="combined-topic">
                <div className="con_wrap sub03">
                  {/* 콘텐츠 리스트 */}
                  <h3>디지털 융합 마케팅</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul>
                        <li>디지털 고객 Data 마케팅</li>
                        <li>
                          <Link to="/lecture/card/CARD-9es/view">
                            - Marketing DT Trend
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-9oj/view">
                            - 데이터 기반 고객 분석
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-9oe/view">
                            - 퍼포먼스 마케팅 분석
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-9fl/view">
                            - 디지털 채널 경쟁력 분석
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-14l/view">
                            - Global Digital Marketing Trends
                          </Link>
                        </li>
                      </ul>

                      <ul>
                        <li>디지털마케팅 사례</li>
                        <li>
                          <Link to="/lecture/card/CARD-6mg/view">
                            - Mastercard의 DT 성공전략
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-14j/view">
                            - 디지털마케팅 Trend &#38; Case
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-9f7/view">
                            - SK의 고객 Data 기반 Deep Change
                          </Link>
                        </li>
                      </ul>

                      <Link to="#" onClick={emptyAlert}>
                        <ul>
                          <li>AI 마케팅</li>
                          <li>1. Reach : AI 로 고객을 유인하라</li>
                          <li>2. ACT : 고객 지갑을 열게 하는 AI</li>
                          <li>3. Convert : AI 로 단골 고객 만들기</li>
                          <li>4. Engage : AI 기반 고객 예측</li>
                        </ul>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="legal-wrap flex">
              <div className="combined-topic">
                <div className="level_icon">
                  <Image src={`${PUBLIC_URL}/images/all/lv-01.png`} alt="" />
                  <p>개념 이해</p>
                </div>
                <div className="con_wrap sub02">
                  {/* 콘텐츠 리스트 */}
                  <h3>
                    <Link to="/certification/badge/badge-detail/BADGE-4a">
                      마케팅 Essentials
                    </Link>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul onClick={emptyAlert}>
                        <li>
                          <Link to="#">마케팅 Framework &#38; Tool</Link>
                        </li>
                        <li>
                          <Link to="#">- 마케팅 환경 분석</Link>
                        </li>
                        <li>
                          <Link to="#">- 마케팅 전략 수립</Link>
                        </li>
                        <li>
                          <Link to="#">- 마케팅 실행 전술</Link>
                        </li>
                      </ul>
                      <Link to="/lecture/card/CARD-a4g/view">
                        <ul>
                          <li>Global 마케팅 사례분석</li>
                          <li>- Fedex Case : 나의 고객은 누구인가</li>
                          <li>- Ebay Case : 왕의 귀환</li>
                          <li>- Starbucks Case : 나무에서 떨어지다</li>
                          <li>- Exxon Mobil Case : 영원한 것은 없다</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-9ok/view">
                        <ul>
                          <li>키워드로 배우는 마케팅 101</li>
                          <li>- Marketing Principles / 패러다임의 이동</li>
                          <li>- Smart Marketing VS Silly Marketing</li>
                          <li>- 마케팅의 3W</li>
                        </ul>
                      </Link>

                      <Link to="/lecture/card/CARD-9ou/view">
                        <ul>
                          <li>사례로 배우는 B2B 마케팅 101</li>
                          <li>- B2B 마케팅 개요</li>
                          <li>- B2BC 마케팅 전략 수립 및 실행</li>
                          <li>- B2B 시장의 디지털마케팅 커뮤니케이션</li>
                        </ul>
                      </Link>

                      <Link to="/lecture/card/CARD-9op/view">
                        <ul>
                          <li>사례로 배우는 상품기획 101</li>
                          <li>- 제품과 서비스</li>
                          <li>- 제품 포트폴리오 비교</li>
                          <li>- 제품 혁신전략 및 수명주기</li>
                        </ul>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="fundamental-topic">
                <div className="con_wrap sub02">
                  {/* 콘텐츠 리스트 */}
                  <h3>
                    <Link to="/certification/badge/badge-detail/BADGE-4c">
                      브랜드 Essentials{' '}
                    </Link>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a06/view">
                        <ul>
                          <li>Brand What &#38; Why?</li>
                          <li>- 브랜드의 중요성</li>
                          <li>- Brand vs. Branding</li>
                          <li>- 브랜드의 정의와 브랜드 Elements</li>
                        </ul>
                      </Link>

                      <Link to="/lecture/card/CARD-a08/view">
                        <ul>
                          <li>Source of Brand Equity</li>
                          <li>- Brand Equity Pyramid와 Brand Awareness</li>
                          <li>- Brand Association</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-a0a/view">
                        <ul>
                          <li>전략적 브랜드 관리의 Key insight</li>
                          <li>- 브랜드 관리에 대한 흔한 착각</li>
                          <li>- Value : 브랜드 관리의 핵심 개념</li>
                          <li>- Value Innovation</li>
                          <li>- Holistic Branding &#38; HCEM</li>
                          <li>- 브랜드 관리의 전략적 Framework</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-a0b/view">
                        <ul>
                          <li>Brand Identify System</li>
                          <li>- BIS의 기본요소</li>
                          <li>- Brand Personality</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-a0c/view">
                        <ul>
                          <li>
                            (효과적 브랜드 관리를 위한) 소비자 행동의 이해
                          </li>
                          <li>- 소비자 정보처리와 기억</li>
                          <li>- 소비단계별 고객욕구</li>
                          <li>- 제품과 고객욕구의 연결</li>
                          <li>- 소비자 조사 방법론</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a0d/view">
                        <ul>
                          <li>브랜드 Communication</li>
                          <li>- Brand Comm.의 역할과 중요성</li>
                          <li>- 환경 변화와 Brand Comm.의 변화</li>
                          <li>- New IMC 전략</li>
                          <li>- 브랜드 Comm. 전략수립 모델</li>
                          <li>- Creative 전략</li>
                          <li>- Media Creative 전략</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-a0e/view">
                        <ul>
                          <li>DT시대 고객경험 브랜드전략</li>
                          <li>- DT 시대, Lifestyle의 변화</li>
                          <li>- 브랜드 전략에서의 Digital Native</li>
                          <li>- SV 혹은 진정성 브랜드 전략</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-a0g/view">
                        <ul>
                          <li>Brand Architecture 디자인</li>
                          <li>- 브랜드 아키텍쳐 : What &#38; Why?</li>
                          <li>- Brand Hierarchy 이해 및 분석</li>
                          <li>- Key Decisions</li>
                        </ul>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'HR/조직 설계',
    key: 'tab4',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <Link
              to="/lecture/college/CLG00008/channel/CHN00013"
              className="item-button"
            >
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              과정 바로가기
            </Link>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>HR/조직 설계</strong>
          <div>
            <ul>
              <li>
                HR Function에서는 (1) HR 실무에 기반한 기초 이해 및 방법론,
                Practice와 <br />
                (2) 미래 기술 변화에 따른 HR Tech 관련 지식 등 HR 담당자들의
                업무 실행력과 Insight 확대를 위한 <br />
                체계적인 컨텐츠를 제공합니다.
              </li>
              <li>
                조직 설계 Function에서는 (1) 조직 설계의 핵심 개념/원칙들과
                Practical 한 방법론을 익히고, <br />
                (2) Silo 해소/ 구성원 행복/ 신사업 추진 등 조직 설계상의 현실적
                고민들을 해결할 수 있는 장을 제공합니다.
              </li>
            </ul>
            <p className="p_link">
              각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image
              src={`${PUBLIC_URL}/images/all/enter-category.png`}
              alt=""
              className="manage_cate"
            />

            <div className="legal-wrap">
              <div className="fundamental-topic">
                <h3>HR</h3>
                <h3>조직 설계</h3>
                <div className="depth">
                  <div className="con_wrap sub02 ing">
                    <div className="level_icon">
                      <Image
                        src={`${PUBLIC_URL}/images/all/enter-lv-02.png`}
                        alt=""
                      />
                      <p>
                        방법론/ <br />
                        적용학습
                      </p>
                    </div>
                    <Image src={`${PUBLIC_URL}/images/all/ing-09.png`} alt="" />
                  </div>
                </div>

                <div className="depth">
                  <div className="con_wrap sub01 depth">
                    <h3>
                      <Link to="/certification/badge/badge-detail/BADGE-30">
                        조직 Design
                      </Link>
                    </h3>
                    <div className="con_box">
                      <div className="con_sub_box">
                        <Link to="/lecture/card/CARD-83u/view">
                          <ul>
                            <li>조직 설계 Workshop</li>
                            <li>1. 조직 설계 Workshop</li>
                          </ul>
                        </Link>
                        <Link to="/lecture/card/CARD-83p/view">
                          <ul>
                            <li>조직 설계 방법론</li>
                            <li>1. 조직 설계 방법론 : Star Model</li>
                            <li>2. 조직 설계 실무 Approach</li>
                          </ul>
                        </Link>
                        <Link to="/lecture/card/CARD-83o/view">
                          <ul>
                            <li>조직 Self-Design</li>
                            <li>1. 조직 Self-Design : Why &#38; What</li>
                            <li>2. 조직 Self-Design 사례</li>
                          </ul>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <ul className="sub_ul">
                    <li>
                      <Link to="/lecture/card/CARD-83t/view">
                        조직 설계 실무 Approach (중장기적)
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-9aq/cube/CUBE-bt7/view/Video">
                        양손잡이 조직 설계 이해
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-6pt/cube/CUBE-98w/view/Video">
                        미래 Tech. 기업의 조직 설계 사례
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-6ra/view">
                        Agile 조직으로의 전환 사례
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-6r9/view">
                        SV 지향 조직 설계 방안
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-qk/cube/CUBE-xg/view/Video">
                        Org. Culture &#38; Leader
                      </Link>
                    </li>
                  </ul>
                  <Image src={`${PUBLIC_URL}/images/all/ing-10.png`} alt="" />
                </div>
              </div>

              <div className="combined-topic">
                <Image src={`${PUBLIC_URL}/images/all/ing-31.png`} alt="" />
              </div>
            </div>

            <div className="legal-wrap">
              <div className="fundamental-topic float-left">
                <div className="level_icon">
                  <Image src={`${PUBLIC_URL}/images/all/lv-01.png`} alt="" />
                  <p>개념 이해</p>
                </div>
                <div className="depth">
                  <div className="con_wrap sub02 depth">
                    <h3>
                      <Link to="/certification/badge/badge-detail/BADGE-4b">
                        HR Essentials
                      </Link>
                    </h3>
                    <div className="con_box">
                      <div className="con_sub_box">
                        <Link to="/lecture/card/CARD-a6x/view">
                          <ul>
                            <li>인력 확보</li>
                            <li>1. 인력 계획! 왜 해야 하는가?</li>
                            <li>2. 채용 프로세스 꼼꼼하게 확인하기</li>
                          </ul>
                        </Link>
                        <Link to="/lecture/card/CARD-a6y/view">
                          <ul>
                            <li>직무 관리</li>
                            <li>1. 직무란 무엇인가?</li>
                            <li>2. 직무분석과 직무평가 왜 필요한가?</li>
                          </ul>
                        </Link>
                        <Link to="/lecture/card/CARD-a72/view">
                          <ul>
                            <li>보상</li>
                            <li>1. 보상 운영을 위해 꼭 알아야 할 것들</li>
                            <li>2. 보상 제도 어떻게 변화하였나</li>
                          </ul>
                        </Link>
                        <Link to="/lecture/card/CARD-a71/view">
                          <ul>
                            <li>성과 관리</li>
                            <li>1. 성과 관리와 평가, 꼭 해야 하나요?</li>
                            <li>2. 성과 관리 프로세스 핵심 요약!</li>
                          </ul>
                        </Link>

                        <Link to="/lecture/card/CARD-a73/view">
                          <ul>
                            <li>Global HR</li>
                            <li>1. 주재원 제도, 제대로 이해하기</li>
                            <li>2. 반드시 알아야 할 Global Staff 관리</li>
                          </ul>
                        </Link>
                        <Link to="/lecture/card/CARD-a74/view">
                          <ul>
                            <li>노사관계</li>
                            <li>1. 개별적 근로 관계의 이해</li>
                            <li>2. 비정규직 제도의 이해</li>
                          </ul>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="depth">
                  <div className="con_wrap sub02 depth">
                    <h3>
                      <Link to="/certification/badge/badge-detail/BADGE-30">
                        조직 Design
                      </Link>
                    </h3>
                    <div className="con_box">
                      <div className="con_sub_box">
                        <Link to="/lecture/card/CARD-83v/view">
                          <ul>
                            <li>조직 설계의 기본 원칙과 사례</li>
                            <li>1. 조직 설계의 기본 원칙</li>
                            <li>2. 조직 설계 New Trend</li>
                            <li>3. 기업 사례 ( MS, SKHY )</li>
                          </ul>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <ul className="sub_ul">
                    <li>
                      <Link to="/lecture/card/CARD-6qg/view">
                        조직 설계 길라잡이
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-6b6/cube/CUBE-8ut/view/Video">
                        조직 설계 Tip : Smart Design
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-6m0/cube/CUBE-952/view/Video">
                        조직 설계 효과성 측정
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'SCM/Operation',
    key: 'tab5',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <Link
              to="/lecture/college/CLG00008/channel/CHN0007m"
              className="item-button"
            >
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              과정 바로가기
            </Link>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>SCM/Operation</strong>
          <div>
            <ul>
              <li>
                고객에게 상품을 적시에, 저렴한 가격으로 제공하고 차별화된
                서비스를 제공하기 위한 경영활동 전반을 효율화하는 ‘공급망
                관리’에 대해 다룸으로써, 해당 직무 관련 SK 구성원들의 Deep
                Change 실행력 제고를 위한 체계적인 컨텐츠를 제공합니다.
              </li>
            </ul>
            <p className="p_link">
              각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image
              src={`${PUBLIC_URL}/images/all/enter-category.png`}
              alt=""
              className="manage_cate"
            />

            {/* 컬리지 콘텐츠 전체 틀 */}
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="con_wrap sub01">
                  <div className="level_icon">
                    <Image
                      src={`${PUBLIC_URL}/images/all/enter-lv-02.png`}
                      alt=""
                    />

                    <p>
                      방법론/ <br />
                      적용학습
                    </p>
                  </div>
                  <h3>구매 Advanced</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-9qk/view">
                        <ul>
                          <li>기업 성공을 위한 전략적 구매</li>
                          <li>- 기업 전략과 기업 경쟁력 이해</li>
                          <li>- 기업 전략과 일치된 구매 전략</li>
                          <li>- 기업의 성공과 구매의 역할</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-9qj/view">
                        <ul>
                          <li>전략적 공급자 관리</li>
                          <li>- 공급자 관리의 두 방법 - 협력과 경쟁</li>
                          <li>- 공급자 육성 및 성과공유제</li>
                          <li>- SRM &#38; 구매체스보드의 이해</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-9qi/view">
                        <ul>
                          <li>구매와 타 부서와의 협력과 연계</li>
                          <li>- 개발과 구매의 연계 - 개발 구매</li>
                          <li>- 타부서와 구매의 연계</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-9qh/view">
                        <ul>
                          <li>성공적인 구매 협상</li>
                          <li>- 협상이란 무엇인가?</li>
                          <li>
                            - 의견이 첨예하게 대립하는 현상, 어떻게 풀어야 하나?
                          </li>
                          <li>- 교착에 빠진 협상, 어떻게 타결해야 하나?</li>
                          <li>- 파이를 키우는 협상, 어떻게 해야 가능할까?</li>
                          <li>
                            - 목표와 전략도 없이 협상에 나간다고? 깨질 수 밖에
                            없다!
                          </li>
                          <li>
                            - 내 주장을 아무리 해도 꼼짝도 안하는 상대 어떻게
                            설득해야 하나?
                          </li>
                          <li>- 협상력을 결정하는 가장 중요한 요소는?</li>
                          <li>
                            - 원래 생각했던 것보다 더 많은 것을 얻는 협상의
                            방법은?
                          </li>
                          <li>- 상대를 납득시키는 최고의 무기는?</li>
                          <li>- 갑질하는 독점 공급자, 어떻게 다뤄야 하나?</li>
                        </ul>
                      </Link>
                    </div>
                  </div>
                </div>

                <Image src={`${PUBLIC_URL}/images/all/ing-04.png`} alt="" />

                <div className="con_wrap sub02">
                  <div className="level_icon">
                    <Image src={`${PUBLIC_URL}/images/all/lv-01.png`} alt="" />
                    <p>개념 이해</p>
                  </div>
                  <h3>
                    <Link to="/certification/badge/badge-detail/BADGE-4g">
                      구매 Essentials
                    </Link>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-9qt/view">
                        <ul>
                          <li>나는 진정한 구매인인가, 구매의 본질</li>
                          <li>- 구매 업무의 이해</li>
                          <li>- 구매 업무의 5R 이해</li>
                          <li>- 구매 업무의 핵심</li>
                          <li>- 발전하고 변화하는 구매관리</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-9qp/view">
                        <ul>
                          <li>
                            모르면 큰 코 다치는, 구매 계약/구매 관련 법규 이해
                          </li>
                          <li>- 구매 업무 시 지켜야할 윤리</li>
                          <li>- 구매 계약의 이해</li>
                          <li>- 하도급법과 상생협력법</li>
                          <li>- 하도급 대금, 이것만은 알아두자</li>
                          <li>- 기술자료제공 요구 금지, 무엇을 조심해야할까</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-9qr/view">
                        <ul>
                          <li>
                            나는 무엇을 구매하고 있나, 구매 품목의 이해 및 관리
                          </li>
                          <li>- 구매 품목의 분류 및 관리</li>
                          <li>- 품목 분류에 따른 자재관리 전략</li>
                          <li>- 서비스/용역 품목의 이해</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-9qn/view">
                        <ul>
                          <li>방심은 금물, 구매 위험 관리</li>
                          <li>- Intro : 타이레놀 위험 관리</li>
                          <li>- 구매 위험 관리 및 조달 연속성 계획</li>
                          <li>- 구매 자제 가격 변동 위험 관리</li>
                          <li>- 팬데믹 시대와 구매 위험관리</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-9qm/view">
                        <ul>
                          <li>디지털 구매 혁신</li>
                          <li>- 디지털 혁신의 핵심적 이해</li>
                          <li>- 디지털 구매 혁신방안</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-9qs/view">
                        <ul>
                          <li>구매 업무 프로세스 이해 및 활용</li>
                          <li>- 구매업무프로세스의 이해와 활용</li>
                          <li>- 공급자 탐색 및 평가</li>
                          <li>- RFP, RFQ 작성방법과 유의점</li>
                          <li>- 입찰 절차 관리 및 평가</li>
                          <li>- 공급자 선택 및 계약</li>
                          <li>- PO 작성의 이해</li>
                          <li>- 계약 후의 구매활동</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-9qo/view">
                        <ul>
                          <li>알수록 돈버는, 구매인을 위한 재무/회계/물류</li>
                          <li>- 계좌등록관리</li>
                          <li>- Incoterms 2020 이해와 적용</li>
                          <li>- 공급사 신용 및 재무분석</li>
                          <li>- 무역보험/수입보험 실무</li>
                          <li>- 수입통관, 관세와 부가세</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-9qq/view">
                        <ul>
                          <li>구매 원가 관리</li>
                          <li>- 구매 원가의 전략적 의미</li>
                          <li>- 가격 분석 및 가격 적정성 검토</li>
                          <li>- 원가 분석의 의미와 원가 분석 기법</li>
                          <li>- TCO ( Total Cost of Ownership ) 이해</li>
                          <li>- TCO ( Total Cost of Ownership ) 활용</li>
                          <li>- 목표원가 및 가치분석</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-9ql/view">
                        <ul>
                          <li>기업의 사회적 가치와 구매</li>
                          <li>- 구매와 ESG, SV 실천 (1)</li>
                          <li>- 구매와 ESG, SV 실천 (2)</li>
                        </ul>
                      </Link>
                    </div>
                  </div>
                </div>
                <Image src={`${PUBLIC_URL}/images/all/ing-07.png`} alt="" />
              </div>
              <div className="combined-topic">
                <Image src={`${PUBLIC_URL}/images/all/ing-08.png`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: '법무/IP',
    key: 'tab6',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <Link
              to="/lecture/college/CLG00008/channel/CHN0007l"
              className="item-button"
            >
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              과정 바로가기
            </Link>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>법무/IP</strong>
          <div>
            <ul>
              <li>
                법무/IP Function 에서는 기업활동에서 발생하는 Legal Risk를
                미연에 방지하고 해결하는 ‘법무’, 새로운 사업추진이나 기존
                사업에서 특허경쟁력을 제고하는 ‘IP’에 대해 다룸으로써, 해당 직무
                관련 SK 구성원들의 Deep Change 실행력 제고를 위한 체계적인
                컨텐츠를 제공합니다.
              </li>
            </ul>
            <p className="p_link">
              각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image
              src={`${PUBLIC_URL}/images/all/enter-category.png`}
              alt=""
              className="manage_cate"
            />

            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="con_wrap sub01">
                  <div className="level_icon">
                    <Image
                      src={`${PUBLIC_URL}/images/all/enter-lv-02.png`}
                      alt=""
                    />
                    <p>
                      방법론/ <br />
                      적용학습
                    </p>
                  </div>
                  {/* 콘텐츠 리스트 */}
                  <h3>
                    <Link to="/certification/badge/badge-detail/BADGE-4d">
                      공정거래법
                    </Link>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a5y/cube/CUBE-cb3/view/Video">
                        <ul>
                          <li>공정거래법 Overview</li>
                          <li>- 공정거래법 이해 및 정책 방향</li>
                        </ul>
                      </Link>

                      <Link to="/lecture/card/CARD-a5x/view">
                        <ul>
                          <li>부당지원, 사익편취</li>
                          <li>- 부당 지원/사익 편취 이해하기</li>
                          <li>- 부당 지원의 법리와 사례 연구</li>
                          <li>- 공정위 최근 규제 동향 및 심결례 연구</li>
                        </ul>
                      </Link>

                      <Link to="/lecture/card/CARD-a5w/view">
                        <ul>
                          <li>불공정 거래와 부당표시 광고</li>
                          <li>- 불공정 거래행위 이해하기</li>
                          <li>- 불공정 거래행위 중요 법리/사례 연구</li>
                        </ul>
                      </Link>

                      <Link to="/lecture/card/CARD-a5v/view">
                        <ul>
                          <li>경제력 집중 억제</li>
                          <li>- 공정거래법상 기업집단 규제 이해하기</li>
                          <li>- 공정위 최근 규제 사례 소개 및 시사점</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a5u/view">
                        <ul>
                          <li>기업결합의 제한</li>
                          <li>- M&#38;A, 기업결합신고 필요한가?</li>
                          <li>- 기업결합은 어떤 경우에 규제되는가?</li>
                          <li>- 혼합결합이 왜 문제가 되는가?</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-a5t/view">
                        <ul>
                          <li>시장 지배적 지위 남용 행위</li>
                          <li>- 시장 지배적 지위 남용 행위 이해하기</li>
                          <li>- 주요 법리와사례 연구</li>
                          <li>- 동의의결 사례 연구</li>
                        </ul>
                      </Link>

                      <Link to="/lecture/card/CARD-a5s/view">
                        <ul>
                          <li>부당한 공동행위</li>
                          <li>- 부당한 공동행위 알아보기</li>
                          <li>- 부당한 공동행위 사례 연구</li>
                        </ul>
                      </Link>

                      <Link to="/lecture/card/CARD-a5r/view">
                        <ul>
                          <li>하도급법</li>
                          <li>- 하도급법 알아보기</li>
                          <li>- 하도급법 주요 법리와 사례 연구</li>
                          <li>- 기술자료제공 요구 및 유용행위</li>
                        </ul>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="con_wrap sub01">
                  <h3>특허관리</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <Link to="" onClick={emptyAlert}>
                        <ul>
                          <li>한국 출원 제도와 법</li>
                          <li>- 특허요건사</li>
                          <li>- 특허출원</li>
                          <li>- 특허심사</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box">
                      <Link to="" onClick={emptyAlert}>
                        <ul>
                          <li>한국 출원 실무</li>
                          <li>- 국문명세서 작성</li>
                          <li>- 한국 심사 대응</li>
                          <li>- 한국 심판 대응</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box">
                      <Link to="" onClick={emptyAlert}>
                        <ul>
                          <li>특허활용과 매입</li>
                          <li>- 특허활용의 개요</li>
                          <li>- 특허 수익화와 IP펀드 이해</li>
                          <li>- 특허와 사업화전략</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a5e/view">
                        <ul>
                          <li>M&#38;A와 IP Transaction</li>
                          <li>- M&#38;A와 IP 이슈</li>
                          <li>- 이슈별 검토사항</li>
                          <li>- 기타 검토사항</li>
                        </ul>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="con_wrap sub01">
                  <h3>특허 분쟁</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a5d/view">
                        <ul>
                          <li>한국 특허분쟁 실무</li>
                          <li>- 특허 심판 제도의 이해</li>
                          <li>- 무효심판</li>
                          <li>- 증거보존 실무</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a5c/view">
                        <ul>
                          <li>미국 특허분쟁 Key Points</li>
                          <li>- Discovery 단계</li>
                          <li>- Trial(Jury /Bench Trial)</li>
                          <li>- ITC 소송</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a5b/view">
                        <ul>
                          <li>특허 협상 및 라이선스</li>
                          <li>- 특허 Claim 단계</li>
                          <li>- 특허기술 협상</li>
                          <li>- Royality 협상</li>
                        </ul>
                      </Link>
                    </div>
                  </div>
                </div>

                <Image src={`${PUBLIC_URL}/images/all/ing-01.png`} alt="" />

                <div className="con_wrap sub02">
                  <div className="level_icon">
                    <Image src={`${PUBLIC_URL}/images/all/lv-01.png`} alt="" />
                    <p>개념이해</p>
                  </div>
                  <h3>
                    <Link to="/certification/badge/badge-detail/BADGE-4e">
                      IP Mind-Set Essential
                    </Link>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a5q/view">
                        <ul>
                          <li>지적 재산권 101</li>
                          <li>- 지식재산권의 개념과 종류</li>
                          <li>- 특허제도 AtoZ</li>
                          <li>- 상표제도 AtoZ</li>
                        </ul>
                      </Link>

                      <Link to="/lecture/card/CARD-a5n/view">
                        <ul>
                          <li>AI 특허</li>
                          <li>- AI 특허 동향</li>
                          <li>- AI 특허 장성 방법</li>
                          <li>- AI 특허 Case Study</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a5p/view">
                        <ul>
                          <li>연구 개발과 지식재산</li>
                          <li>- R&#38;D에서의 특허개발의 필요성</li>
                          <li>- 선행기술 조사 및 검색</li>
                          <li>- 발명신고서 작성 가이드</li>
                        </ul>
                      </Link>

                      <Link to="/lecture/card/CARD-a5m/view">
                        <ul>
                          <li>특허 분쟁 개론</li>
                          <li>- 특허분쟁의 종류</li>
                          <li>- 특허분쟁의 주요 사례</li>
                          <li>- 한국 특허소송 제도</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a5o/view">
                        <ul>
                          <li>직무발명</li>
                          <li>- 직무발명의 이해</li>
                          <li>- 직무발명의 권리귀속 관계</li>
                          <li>- 보상제도와 발명보상 사례</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-a5l/view">
                        <ul>
                          <li>분쟁대응 문서관리</li>
                          <li>- 문서 관리 정책</li>
                          <li>- 상시 문서 관리</li>
                          <li>- 분쟁 발생시 문서 관리</li>
                        </ul>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="con_wrap sub02">
                  <h3>오픈소스 Essentials</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a5k/view">
                        <ul>
                          <li>오픈소스의 선형적 발전</li>
                          <li>- 오픈소스의 출현배경</li>
                          <li>- 오픈소스의 패러다임 변화와 성장 모맨텀</li>
                          <li>- 폐쇄기업의 견제에 따른 오픈소스의 성장통</li>
                        </ul>
                      </Link>
                      <Link to="/lecture/card/CARD-a5i/view">
                        <ul>
                          <li>오픈소스 라이선스</li>
                          <li>- 오픈소스의 정의 및 양면성</li>
                          <li>- GPI, BSD계열 라이선스 특징 및 의무사항</li>
                          <li>- 소프트웨어 공개범위</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a5j/view">
                        <ul>
                          <li>Software, Copyright &#38; License</li>
                          <li>- 소프트웨어 저작권의 주요 쟁점</li>
                          <li>- 소프트웨어 지식재산권과 BM</li>
                          <li>- 소프트웨어 라이선스 유형과 주요 내용</li>
                        </ul>
                      </Link>
                    </div>
                  </div>
                </div>

                <Image src={`${PUBLIC_URL}/images/all/ing-02.png`} alt="" />
              </div>
              <div className="combined-topic">
                <Image src={`${PUBLIC_URL}/images/all/ing-03.png`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Competency',
    key: 'tab7',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <Link
              to="/lecture/college/CLG00008/channel/CHN0001a"
              className="item-button"
            >
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              과정 바로가기
            </Link>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>
            Competency <br />
            (Working Smart)
          </strong>
          <div>
            <ul>
              <li>
                직무 영역과 상관없이 모든 구성원이 갖추어야 하는 공통역량
                컨텐츠를 제공합니다.
                <br />
                Communication Skill, Problem Solving, Measurement, Negotiation,
                Decision Making &#38; Risk Management까지 Role Level별로
                성공적인 업무수행을 위해 갖추어야 할 학습과정을 통해 좀더 나은
                성과, Smart Working을 위한 일/잘/법을 배우고, Deep Change 실행력
                제고를 위한 기초 체력을 단단히 만들어가시기 바랍니다.
              </li>
            </ul>
            <p className="p_link">
              각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image src={`${PUBLIC_URL}/images/all/ing_30.png`} alt="" />
            <div className="legal-wrap flex sub">
              <div className="fundamental-topic width50">
                <div className="con_wrap sub01">
                  <h3>
                    <Link to="/certification/badge/badge-detail/BADGE-44">
                      Measurement Essentials
                    </Link>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-8l7/view">
                        <ul>
                          <li>Customer Measure &#38; Analytics</li>
                          <li>- 고객 측정의 기본 개념</li>
                          <li>- Customer Value 개념과 측정</li>
                          <li>- 고객 측정 지표의 활용과 한계</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-8ic/view">
                        <ul>
                          <li>행복 지도의 이해</li>
                          <li>- 행복 지도란?</li>
                          <li>- 행복 지도 구축 Process</li>
                          <li>- 행복 측정 주요 이슈와 해결방안</li>
                        </ul>
                      </Link>
                    </div>
                  </div>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-50f/view">
                        <ul>
                          <li>SV 측정의 이해</li>
                          <li>- SV 측정의 원칙 및 체계</li>
                          <li>- SV 측정 사례 및 성과</li>
                          <li>- SV 측정의 이슈와 확산</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-74b/view">
                        <ul>
                          <li>Deep Change의 시작, 측정</li>
                          <li>- 경영 현장에서의 측정</li>
                          <li>- 인간의 동기, 행동 측정</li>
                          <li>- 사회 현상 / 문제 측정</li>
                        </ul>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="combined-topic width50">
                <div className="con_wrap sub01">
                  <h3>
                    <Link to="/certification/badge/badge-detail/BADGE-4f">
                      Negotiaion Essentials
                    </Link>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a2c/view">
                        <ul>
                          <li>Negotiation, 그 의미와 필요성</li>
                          <li>- Intro into Negotiation</li>
                          <li>- Business 통합적 영역, Negotiation</li>
                          <li>- Essential Course Framework Guide</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a6z/view">
                        <ul>
                          <li>[협상 준비 전략] 12가지 협상 Skill</li>
                          <li>- 목표를 설정하라</li>
                          <li>- 나만의 BATNA를 확보하라</li>
                          <li>- 마지막 협상이 아님을 기억하라</li>
                        </ul>
                      </Link>
                    </div>
                  </div>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <Link to="/lecture/card/CARD-a2g/view">
                        <ul>
                          <li>협상 Essence Reading</li>
                          <li>- Getting to Yes</li>
                          <li>- FBI 행동의 심리학</li>
                          <li>- 협상 레버리지</li>
                        </ul>
                      </Link>
                    </div>
                    <div className="con_sub_box flex">
                      <Link to="/lecture/card/CARD-a2f/view">
                        <ul className="height100">
                          <li>협상 Essential Wrap up</li>
                          <li>- 협상 Essential Wrap up</li>
                        </ul>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="legal-wrap flex sub">
              <div className="fundamental-topic width50">
                <div className="con_wrap sub02">
                  <h3>Communication</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul className="ul_style">
                        <li>
                          <Link to="/lecture/card/CARD-155/view">
                            엑셀 실무 Master 1 ~ 8
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-15g/view">
                            검색해도 찾기 힘든 꼭 필요한 엑셀 함수
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-14x/view">
                            부장님은 내 기획서가 쓰레기라고 말했지
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-150/view">
                            한국인이 많이 하는 이메일 영어실수 上 下
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-15i/view">
                            지나가는 팀장도 돌아보는 PPT 디자인
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="combined-topic width50">
                <div className="con_wrap sub02">
                  <h3>Problem Solving</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul className="ul_style">
                        <li>
                          <Link to="/lecture/card/CARD-14y/view">
                            10가지 키워드로 배우는 창의적 사고력
                          </Link>
                        </li>
                        <li>전략적 문제해결 스킬 (4월 오픈 예정)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
];

const panesZh = [
  {
    menuItem: 'Management College介绍',
    key: 'tab0',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a className="item-button" href="#none">
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              直接进入课程
            </a>
          </div>
        </div>

        <div className="belt">
          <div className="belt_wrapper">
            <div className="belt sub">
              <Image
                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-01-ing-01-chn.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="belt college-mana-text">
          <p>
            <strong>考虑到个人的职务、水平和关心事项，</strong>
            通过自主学习自身需要的Online Contents、On-Off综合或Offline W/S，
            <br />
            采用Discussion、内外部Case Study、Practice共享等
            <strong>实操导向型学习方式。 </strong>
            尤其是，我们计划不仅提供与外部Top
            Expert的经验共享，还有SK管理层/专家的Instight经验共享的Exclusive
            Contents。
          </p>
          <p className="p_link">{/* 点击各Badge，即可进入到相应页面。 */}</p>
        </div>

        <div className="college-cont-map sub wrap01">
          <div className="belt">
            <Image
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-01-ing-02-chn.png"
              alt=""
            />
          </div>
        </div>
        <div className="college-cont-map sub pbtom">
          <div className="belt">
            <div className="label sub">
              Management College Badge体系
              <span>（截止21年2月，未来计划不断扩张）</span>
            </div>

            <div className="manage-main-wrap">
              <div className="manage-main-table con01">
                <div className="manage-main-tit tit02">
                  <h3>
                    <strong>Level 1</strong>(Essential)
                  </h3>
                </div>
                <div className="manage-badge-main">
                  <p>
                    为加强相应领域能力提供的基础（Foundation）课程，
                    <br />
                    旨在学习执行职务中领导者/成员必须了解的基本知识。
                  </p>
                </div>
              </div>
            </div>

            <div className="manage-main-wrap">
              <div className="manage-main-table con01">
                <div className="manage-main-tit tit02">
                  <h3>
                    <strong>Level 2</strong>(Advanced)
                  </h3>
                </div>
                <div className="manage-badge-main">
                  <p>学习对象为具有5年以上相应职务经验的领导者/成员。</p>
                  <p className="badge-descrip">
                    <strong>学习现场所需的专业知识/knowhow。</strong>
                  </p>
                  <p className="badge-descrip">
                    <strong>
                      通过workshop等与专家和同事、成员互动，提高职务专业性。
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="chart_belt">
              <div className="chart-left">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/icon-chart.png"
                  alt=""
                />
              </div>
              <div className="chart-right">
                <table style={{ borderCollapse: 'separate' }}>
                  <tbody>
                    <tr>
                      <td colSpan={2}>ㅤ</td>
                      <td className="badge-texts">
                        <a href="#none">
                          数字融合
                          <br />
                          营销
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="#none">组织Design</a>
                      </td>
                      <td className="badge-texts">
                        <a href="#none">
                          采购
                          <br />
                          Advanced
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="#none">公司法</a>
                        <br />
                        /<br />
                        <a href="#none">公平交易法</a>
                      </td>
                      <td>ㅤ</td>
                    </tr>
                    <tr>
                      <td className="badge-texts">
                        <a href="#none">
                          Strategy
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="#none">
                          财务
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="#none">
                          品牌
                          <br />
                          Essentials
                        </a>
                        <br />
                        /<br />
                        <a href="#none">
                          营销
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="#none">
                          HR
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="#none">
                          采购
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="#none">
                          IP Mindset
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts grey">
                        <a href="#none">
                          谈判
                          <br />
                          Essentials
                        </a>
                        <br />
                        /<br />
                        <a href="#none">
                          Measurement
                          <br />
                          Essentials
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="badge-texts-sm">企业经营/战略</td>
                      <td className="badge-texts-sm">财务/会计</td>
                      <td className="badge-texts-sm">营销/Brand</td>
                      <td className="badge-texts-sm">HR/组织设计</td>
                      <td className="badge-texts-sm">SCM/Operation</td>
                      <td className="badge-texts-sm">法务/IP</td>
                      <td className="badge-texts-sm grey">Competency</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: '企业经营/战略',
    key: 'tab1',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a className="item-button" href="#none">
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              直接进入课程
            </a>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>企业经营/战略</strong>
          <div>
            <ul>
              <li>
                除各个职务Essential/深化Contents以外，还涵盖有关近来Deep
                Change的热门培训课程。
              </li>
              <li>
                借此不仅可以让想要职务成员具备系统化知识，还能加强战略性思维能力(Way
                of Thinking)。
              </li>
            </ul>
            <p className="p_link">
              {/* 点击各Badge与课程，即可进入到相应页面。 */}
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/enter-category.png"
              alt=""
              className="manage_cate"
            />

            {/* 컬리지 콘텐츠 전체 틀 */}
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="level_icon">
                  <Image
                    src={`${PUBLIC_URL}/images/all/enter-lv-02.png`}
                    alt=""
                  />
                  <p>
                    方法论/ <br />
                    应用学习
                  </p>
                </div>{' '}
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/ing-12-CHN.png"
                  alt=""
                />
              </div>

              <div className="combined-topic">
                <div className="con_wrap sub03 ing_con01">
                  {/* 콘텐츠 리스트 */}
                  <h3>AI/DT &#38; Strategy</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>基于AI/DT的Deep Change战略</li>
                          <li>- AI/DT战略的基本概念</li>
                          <li>- AI/DT战略制定Process</li>
                          <li>- 基于AI的DT战略意义</li>
                          <li>- 重构AI/DT战略假设</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="con_wrap sub02 ing_con02">
                  <Image
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-02-ing-02-chn.png"
                    alt=""
                  />
                </div>

                <div className="con_wrap sub03 ing_con01">
                  {/* 콘텐츠 리스트 */}
                  <h3>ESG &#38; Strategy</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>基于SV的Deep Change战略</li>
                          <li>- SV战略制定Process</li>
                          <li>- 有关创造SV的讨论</li>
                          <li>- SV创造内化方案</li>
                          <li>- 在战略中融合SV</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="con_wrap sub02 ing_con02">
                  <Image
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-02-ing-03-chn.png"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* 컬리지 콘텐츠 전체 틀 */}
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="level_icon">
                  <Image
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/lv-01.png"
                    alt=""
                  />
                  <p>概念理解</p>
                </div>
                <div className="con_wrap sub02">
                  {/* 콘텐츠 리스트 */}
                  <h3>
                    <a href="#none">Strategy Essentials</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul className="height_fixed">
                          <li>战略101：欢迎，第一次接触战略吧？</li>
                          <li>- 战略是什么？</li>
                          <li>- 战略经营Process</li>
                          <li>- 战略制定及执行</li>
                          <li>- Strategy in SK</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul className="height_fixed">
                          <li>All about Portfolio Strategy</li>
                          <li>- Portfolio Mgmt의 Option</li>
                          <li>- M&amp;A/JV</li>
                          <li>- Separation/Divestiture</li>
                          <li>- SK M&amp;A History &amp; Case</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul className="sub height_fixed">
                          <li>战略制定的开始，战略环境分析</li>
                          <li>- 外部环境分析 Tool &amp; Framework</li>
                          <li>- 内部环境分析 Tool &amp; Framework</li>
                          <li>- 经营环境分析实战Tip</li>
                        </ul>
                      </a>
                      <ul className="ul_img_none height_fixed">
                        <li className="pd0">
                          <Image
                            src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-02-ing-05-chn.png"
                            alt=""
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="combined-topic">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-02-ing-04-chn.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: '财务/会计',
    key: 'tab2',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a className="item-button" href="#none">
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              直接进入课程
            </a>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>财务/会计</strong>
          <div>
            <ul>
              <li>
                旨在提高Finance/会计/税务领域的职务专业性，通过理论、SK内部Practice及Case分享，满足成员们的各种学习需求。
              </li>
              <li>
                由公司内部专家带领sk
                practice/Case挖掘与分享、扩大Workshop/Community活动，促进成员之间的知识分享，提高SK成员的Deep
                Change执行力。
              </li>
            </ul>
            <p className="p_link">
              {/* 点击各Badge与课程，即可进入到相应页面。               */}
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/enter-category.png"
              alt=""
              className="manage_cate"
            />
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <h2>Finance</h2>
                <h2>会计</h2>
                <h2>税务</h2>
              </div>

              <div className="combined-topic">
                <h2>Finance/会计/税务+a</h2>
              </div>

              <div className="ing_contents">
                <div className="level_icon">
                  <Image
                    src={`${PUBLIC_URL}/images/all/enter-lv-02.png`}
                    alt=""
                  />
                  <p>
                    方法论/ <br />
                    应用学习
                  </p>
                </div>
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/ing-05-CHN.png"
                  alt=""
                />
              </div>

              <div className="fundamental-topic float-left">
                <div className="con_wrap sub02">
                  <div className="level_icon">
                    <Image src={`${PUBLIC_URL}/images/all/lv-01.png`} alt="" />
                    <p>概念理解</p>
                  </div>
                  <h3>
                    <a href="#none">财务Essentials</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul className="ul_style">
                        <li>
                          <a href="#none">财务管理101</a>
                        </li>
                        <li>
                          <a href="#none">企业价值是什么？如何评估？</a>
                        </li>
                      </ul>
                    </div>
                    <div className="con_sub_box">
                      <ul className="ul_style">
                        <li>
                          <a href="#none">好想了解内部会计管理制度</a>
                        </li>
                        <li>
                          <a href="#none">第一次接触的成本/管理会计</a>
                        </li>
                        <li>
                          <a href="#none">
                            一点点简单按各个会计科目进行
                            <br />
                            会计处理
                          </a>
                        </li>
                        <li>
                          <a href="#none">Fun-Fun会计</a>
                        </li>
                      </ul>
                    </div>
                    <div className="con_sub_box">
                      <ul className="ul_one">
                        <li>
                          <a href="#none">税务会计实务第一步</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <ul className="sub_ul">
                    <li>
                      <a href="#none">组织设计的方向</a>
                    </li>
                    <li>
                      <a href="#none">组织设计Tip：Smart Design</a>
                    </li>
                    <li>
                      <a href="#none">组织设计有效性测量</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: '市场/品牌',
    key: 'tab3',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a className="item-button" href="#none">
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              直接进入课程
            </a>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>市场/品牌</strong>
          <div>
            <ul>
              <li>
                学习在企业将产品或服务销售给客户的过程中所创造的各种Value和相关“营销”，
                <br />
                还有区别于竞争公司/产品的无形资产、公司价值的象征——“品牌”，
                <br />
                提高相应职务SK成员的
                <strong>Deep Change执行力。</strong>
              </li>
            </ul>
            <p className="p_link">
              {/* 点击各Badge与课程，即可进入到相应页面。 */}
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image
              src={`${PUBLIC_URL}/images/all/enter-category.png`}
              alt=""
              className="manage_cate"
            />
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="level_icon">
                  <Image
                    src={`${PUBLIC_URL}/images/all/enter-lv-02.png`}
                    alt=""
                  />
                  <p>
                    方法论/ <br />
                    应用学习
                  </p>
                </div>
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/ing-06-CHN.png"
                  alt=""
                />
              </div>
              <div className="combined-topic">
                <div className="con_wrap sub03">
                  {/* 콘텐츠 리스트 */}
                  <h3>数字融合营销</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul>
                        <li>数字客户Data营销</li>
                        <li>
                          <a href="#none">- Marketing DT Trend</a>
                        </li>
                        <li>
                          <a href="#none">- 基于数据分析客户</a>
                        </li>
                        <li>
                          <a href="#none">- 绩效营销分析</a>
                        </li>
                        <li>
                          <a href="#none">- 数字渠道竞争力分析</a>
                        </li>
                        <li>
                          <a href="#none">- Global Digital Marketing Trends</a>
                        </li>
                      </ul>

                      <ul>
                        <li>数字营销案例</li>
                        <li>
                          <a href="#none">- Mastercard的DT成功战略</a>
                        </li>
                        <li>
                          <a href="#none">- 数字营销 Trend &amp; Case</a>
                        </li>
                        <li>
                          <a href="#none">- SK基于客户Data的Deep Change</a>
                        </li>
                      </ul>

                      <a href="#none">
                        <ul>
                          <li>AI营销</li>
                          <li>1. Reach：用AI吸引客户</li>
                          <li>2. ACT：让客户慷慨解囊的AI</li>
                          <li>3. Convert：用AI形成忠诚客户</li>
                          <li>4. Engage：基于AI预测客户</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="legal-wrap flex">
              <div className="combined-topic">
                <div className="level_icon">
                  <Image src={`${PUBLIC_URL}/images/all/lv-01.png`} alt="" />
                  <p>概念理解</p>
                </div>
                <div className="con_wrap sub02">
                  {/* 콘텐츠 리스트 */}
                  <h3>
                    <a href="#none">营销 Essentials</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul>
                        <li>
                          <a href="#none">营销 Framework &#38; Tool</a>
                        </li>
                        <li>
                          <a href="#none">- 营销环境分析</a>
                        </li>
                        <li>
                          <a href="#none">- 营销战略制定</a>
                        </li>
                        <li>
                          <a href="#none">- 营销执行战术</a>
                        </li>
                      </ul>
                      <a href="#none">
                        <ul>
                          <li>Global营销案例分析</li>
                          <li>- Fedex Case : 我的客户是谁？</li>
                          <li>- Ebay Case : 王者归来</li>
                          <li>- Starbucks Case : 从树上掉落</li>
                          <li>- Exxon Mobil Case : “永恒”是不存在的</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>用关键词学习营销101</li>
                          <li>- Marketing Principles / 模式移动</li>
                          <li>- Smart Marketing VS Silly Marketing</li>
                          <li>- 营销的3W</li>
                        </ul>
                      </a>

                      <a href="#none">
                        <ul>
                          <li>通过案例学习的B2B营销101</li>
                          <li>- B2B营销概要</li>
                          <li>- B2BC营销战略制定与执行</li>
                          <li>- B2B市场的数字营销沟通</li>
                        </ul>
                      </a>

                      <a href="#none">
                        <ul>
                          <li>通过案例学习的产品策划101</li>
                          <li>- 产品与服务</li>
                          <li>- 产品组合比较</li>
                          <li>- 产品创新战略与生命周期</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="fundamental-topic">
                <div className="con_wrap sub02">
                  {/* 콘텐츠 리스트 */}
                  <h3>
                    <a href="#none">品牌Essentials</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Brand What &#38; Why?</li>
                          <li>- 品牌的重要性</li>
                          <li>- Brand vs. Branding</li>
                          <li>- 品牌的定义与品牌Elements</li>
                        </ul>
                      </a>

                      <a href="#none">
                        <ul>
                          <li>Source of Brand Equity</li>
                          <li>- Brand Equity Pyramid와 Brand Awareness</li>
                          <li>- Brand Association</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>战略品牌管理的Key Insight </li>
                          <li>- 品牌管理中常见的错觉</li>
                          <li>- Value : 品牌管理的核心概念</li>
                          <li>- Value Innovation</li>
                          <li>- Holistic Branding &amp; HCEM</li>
                          <li>- 品牌管理的战略性Framework</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Brand Identify System</li>
                          <li>- -BIS的基本要素</li>
                          <li>- Brand Personality</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>（为有效管理品牌）理解消费者行为</li>
                          <li>- 消费者信息处理与记忆</li>
                          <li>- 各个消费阶段的客户需求</li>
                          <li>- 产品与客户需求的连接</li>
                          <li>- 消费者调查方法论</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>品牌Communication</li>
                          <li>- Brand Comm.的作用与重要性</li>
                          <li>- 环境变化与Brand Comm.的变化</li>
                          <li>- New IMC战略</li>
                          <li>- 品牌Comm.战略制定模型</li>
                          <li>- Creative战略</li>
                          <li>- Media Creative战略</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>DT时代客户体验品牌战略</li>
                          <li>- DT时代，Lifestyle的变化</li>
                          <li>- 品牌战略中的Digital Native</li>
                          <li>- SV或真诚的品牌战略</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Brand Architecture设计</li>
                          <li>- 品牌架构 : What &amp; Why?</li>
                          <li>- Brand Hierarchy理解与分析</li>
                          <li>- Key Decisions</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'HR/组织设计',
    key: 'tab4',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a className="item-button" href="#none">
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              直接进入课程
            </a>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>HR/组织设计</strong>
          <div>
            <ul>
              <li>
                HR
                Function中提供系统化学习内容，包括（1）基于HR实务的基础理解及方法论、Practice；（2）应对未来技术变化的HR
                Tech相关知识等，旨在提高HR负责人的业务执行力与Insight。
              </li>
              <li>
                组织设计Function中学习内容包括（1）组织设计核心概念/原则，Practical方法论；（2）Silo消除/成员幸福/新事业推进等组织设计层面的现实思考问题。
              </li>
            </ul>
            <p className="p_link">
              {/* 点击各Badge与课程，即可进入到相应页面。 */}
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image
              src={`${PUBLIC_URL}/images/all/enter-category.png`}
              alt=""
              className="manage_cate"
            />

            <div className="legal-wrap">
              <div className="fundamental-topic">
                <h3>HR</h3>
                <h3>组织设计</h3>
                <div className="depth">
                  <div className="con_wrap sub02 ing">
                    <div className="level_icon">
                      <Image
                        src={`${PUBLIC_URL}/images/all/enter-lv-02.png`}
                        alt=""
                      />
                      <p>
                        方法论/ <br />
                        应用学习
                      </p>
                    </div>
                    <Image
                      src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-05-img-01-chn.png"
                      alt=""
                    />
                  </div>
                </div>

                <div className="depth">
                  <div className="con_wrap sub01 depth">
                    <h3>
                      <a href="#none">组织Design</a>
                    </h3>
                    <div className="con_box">
                      <div className="con_sub_box">
                        <a href="#none">
                          <ul>
                            <li>组织设计Workshop</li>
                            <li>1. 组织设计Workshop</li>
                          </ul>
                        </a>
                        <a href="#none">
                          <ul>
                            <li>组织设计方法论</li>
                            <li>1. 组织设计方法论 : Star Model</li>
                            <li>2. 组织设计实务Approach</li>
                          </ul>
                        </a>
                        <a href="#none">
                          <ul>
                            <li>组织Self-Design</li>
                            <li>1. 组织Self-Design : Why &#38; What</li>
                            <li>2. 组织Self-Design 案例</li>
                          </ul>
                        </a>
                      </div>
                    </div>
                  </div>
                  <ul className="sub_ul">
                    <li>
                      <a href="#none">组织设计实务Approach (中长期)</a>
                    </li>
                    <li>
                      <a href="#none">两手抓组织设计理解</a>
                    </li>
                    <li>
                      <a href="#none">未来Tech.企业的组织设计案例</a>
                    </li>
                    <li>
                      <a href="#none">敏捷组织转型案例</a>
                    </li>
                    <li>
                      <a href="#none">SV导向组织设计方案</a>
                    </li>
                    <li>
                      <a href="#none">Org. Culture &#38; Leader</a>
                    </li>
                  </ul>
                  <Image
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-05-img-02-chn.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="combined-topic">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-05-img-03-chn.png"
                  alt=""
                />
              </div>
            </div>

            <div className="legal-wrap">
              <div className="fundamental-topic float-left">
                <div className="level_icon">
                  <Image src={`${PUBLIC_URL}/images/all/lv-01.png`} alt="" />
                  <p>概念理解</p>
                </div>
                <div className="depth">
                  <div className="con_wrap sub02 depth">
                    <h3>
                      <a href="#none">HR Essentials</a>
                    </h3>
                    <div className="con_box">
                      <div className="con_sub_box">
                        <a href="#none">
                          <ul>
                            <li>人才获取</li>
                            <li>1. 人力计划！为什么需要？</li>
                            <li>2. 仔细确认招聘流程</li>
                          </ul>
                        </a>
                        <a href="#none">
                          <ul>
                            <li>职务管理</li>
                            <li>1. 职务是什么？</li>
                            <li>2. 为什么需要职务分析和职务评价？</li>
                          </ul>
                        </a>
                        <a href="#none">
                          <ul>
                            <li>奖励</li>
                            <li>1. 为进行奖励制度，必须要做的事</li>
                            <li>2. 奖励制度如何变化？</li>
                          </ul>
                        </a>
                        <a href="#none">
                          <ul>
                            <li>绩效管理</li>
                            <li>1. 绩效管理与评价，非做不可吗？</li>
                            <li>2. 绩效管理流程核心概要！</li>
                          </ul>
                        </a>

                        <a href="#none">
                          <ul>
                            <li>Global HR</li>
                            <li>1. 透彻理解驻在员制度</li>
                            <li>2. 必须要了解的Global Staff管理</li>
                          </ul>
                        </a>
                        <a href="#none">
                          <ul>
                            <li>劳资关系</li>
                            <li>1. 理解个体劳动关系</li>
                            <li>2. 非正式员工制度的理解</li>
                          </ul>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="depth">
                  <div className="con_wrap sub02 depth">
                    <h3>
                      <a href="#none">组织Design</a>
                    </h3>
                    <div className="con_box">
                      <div className="con_sub_box">
                        <a href="#none">
                          <ul>
                            <li>组织设计的基本原则与案例</li>
                            <li>1. 组织设计的基本原则</li>
                            <li>2. 组织设计 New Trend</li>
                            <li>3. 企业案例（MS，SKHY）</li>
                          </ul>
                        </a>
                      </div>
                    </div>
                  </div>
                  <ul className="sub_ul">
                    <li>
                      <a href="#none">组织设计的方向</a>
                    </li>
                    <li>
                      <a href="#none">组织设计Tip：Smart Design</a>
                    </li>
                    <li>
                      <a href="#none">组织设计有效性测量</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'SCM/Operation',
    key: 'tab5',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a className="item-button" href="#none">
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              直接进入课程
            </a>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>SCM/Operation</strong>
          <div>
            <ul>
              <li>
                学习为了给客户及时并以低廉价格提供产品和差异化服务，提升经营活动效率的“供应链管理”，以提高相应职务的SK成员的Deep
                Change执行力。
              </li>
            </ul>
            <p className="p_link">
              {/* 点击各Badge与课程，即可进入到相应页面。 */}
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image
              src={`${PUBLIC_URL}/images/all/enter-category.png`}
              alt=""
              className="manage_cate"
            />

            {/* 컬리지 콘텐츠 전체 틀 */}
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="con_wrap sub01">
                  <div className="level_icon">
                    <Image
                      src={`${PUBLIC_URL}/images/all/enter-lv-02.png`}
                      alt=""
                    />

                    <p>
                      方法论/ <br />
                      应用学习
                    </p>
                  </div>
                  <h3>采购Advanced</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>为让企业成功的战略性采购</li>
                          <li>- 企业战略与企业竞争力理解</li>
                          <li>- 与企业战略一致的采购战略</li>
                          <li>- 企业的成功与采购的作用</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>战略性供应商管理</li>
                          <li>- 管理供应商的两种方法 - 合作与竞争</li>
                          <li>- 供应商培养与成果共享制</li>
                          <li>- SRM &amp; 棋盘博弈采购法的理解</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>采购与其他部门的合作与联系</li>
                          <li>- 开发与采购的联系 - 开发采购</li>
                          <li>- 其他部门与采购的联系</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>成功的采购谈判</li>
                          <li>- 谈判是什么？</li>
                          <li>- 意见针锋相对，如何解决？</li>
                          <li>- 谈判陷入胶着，如何达成共识？</li>
                          <li>- 做大蛋糕的谈判，如何做到？</li>
                          <li>- 没有目标和战略就去谈判？必败无疑！</li>
                          <li>- 如何说服完全不为所动的对方？</li>
                          <li>- 决定谈判能力的最重要的因素？</li>
                          <li>- 如何在谈判中取得比预期更好的成果？</li>
                          <li>- 说服对方最强的武器是？</li>
                          <li>- 如何与垄断性甲方供应商谈判？</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>

                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-06-img-01-chn.png"
                  alt=""
                />

                <div className="con_wrap sub02">
                  <div className="level_icon">
                    <p>概念理解</p>
                  </div>
                  <h3>
                    <a href="#none">采购Essentials</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>我是真正的采购者吗？采购的本质</li>
                          <li>- 对采购业务的理解</li>
                          <li>- 理解采购业务的5R</li>
                          <li>- 采购业务的核心</li>
                          <li>- 发展变化的采购管理</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>不知道就会惹出麻烦的采购合同/采购相关法律理解</li>
                          <li>- 采购业务中需遵守的道德</li>
                          <li>- 对采购合同的理解</li>
                          <li>- 转包法与共赢合作法</li>
                          <li>- 转包价格，必知事项</li>
                          <li>- 禁止要求提供技术材料，要注意的是？</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>我在采购什么？采购品类的理解与管理</li>
                          <li>- 采购品类的分类与管理</li>
                          <li>- 根据采购品类需采取的材料管理战略</li>
                          <li>- 对服务/外包品类的理解</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>切不可大意，采购风险管理</li>
                          <li>- Intro : tylenol风险管理</li>
                          <li>- 采购风险管理及采购连续性计划</li>
                          <li>- 采购材料价格变动风险管理</li>
                          <li>- 疫情时代与采购风险管理</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>数字采购创新</li>
                          <li>- 对数字创新的核心理解</li>
                          <li>- 数字采购创新方案</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>理解与运用采购业务流程</li>
                          <li>- 理解与应用采购业务流程</li>
                          <li>- 供应商探索与评估</li>
                          <li>- RFP、RFQ制作方法与注意事项</li>
                          <li>- 投标步骤管理与评估</li>
                          <li>- 供应商选择及签合同</li>
                          <li>- 对PO制作的理解</li>
                          <li>- 合同签署后的采购活动</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>
                            越了解越赚钱，为采购者量身打造的财务/会计/物流
                          </li>
                          <li>- 账户注册管理</li>
                          <li>- Incoterms 2020理解与应用</li>
                          <li>- 供应商信用和财务分析</li>
                          <li>- 贸易保险/进口保险实务</li>
                          <li>- 进口通关、关税与附加税</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>采购成本管理</li>
                          <li>- 采购成本战略意义</li>
                          <li>- 价格分析即价格适当性判断</li>
                          <li>- 成本分析的意义与成本分析方法</li>
                          <li>- 理解TCO ( Total Cost of Ownership ) </li>
                          <li>- 运用TCO ( Total Cost of Ownership )</li>
                          <li>- 目标成本及价值分析</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>企业的社会价值与采购</li>
                          <li>- 采购与ESG、SV实践 (1)</li>
                          <li>- 采购与ESG、SV实践 (2)</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/ing-07-CHN.png"
                  alt=""
                />
              </div>
              <div className="combined-topic">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-06-img-03-chn.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: '法务/IP',
    key: 'tab6',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a className="item-button" href="#none">
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              直接进入课程
            </a>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>法务/IP</strong>
          <div>
            <ul>
              <li>
                法务/ip Function涵盖内容包括提前预防、解决企业活动中出现的Legal
                Risk的“法务”；在新的事业或已有事业中提高专利竞争力的“IP”。借此令相应职务的SK成员提高Deep
                Change执行力。
              </li>
            </ul>
            <p className="p_link">
              {/* 点击各Badge与课程，即可进入到相应页面。 */}
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image
              src={`${PUBLIC_URL}/images/all/enter-category.png`}
              alt=""
              className="manage_cate"
            />

            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="con_wrap sub01">
                  <div className="level_icon">
                    <Image
                      src={`${PUBLIC_URL}/images/all/enter-lv-02.png`}
                      alt=""
                    />
                    <p>
                      方法论/ <br />
                      应用学习
                    </p>
                  </div>
                  {/* 콘텐츠 리스트 */}
                  <h3>
                    <a href="#none">公平交易法</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>公平交易法 Overview</li>
                          <li>- 理解公平交易法与正常方向</li>
                        </ul>
                      </a>

                      <a href="#none">
                        <ul>
                          <li>不正当支持、谋取私利</li>
                          <li>- 理解不正当支持/谋取私利</li>
                          <li>- 理解不正当支持的法理和案例研究</li>
                          <li>- 公平交易委员会近期管制动向与审判案例研究</li>
                        </ul>
                      </a>

                      <a href="#none">
                        <ul>
                          <li>不公平交易与不正当标示广告</li>
                          <li>- 理解不公平交易行为</li>
                          <li>- 不公平交易行为重要法理/案例研究</li>
                        </ul>
                      </a>

                      <a href="#none">
                        <ul>
                          <li>集中压制经济力</li>
                          <li>- 理解公平交易法中的企业集团管制</li>
                          <li>- 公平交易委员会近期管制案例介绍及启发</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>企业合并的限制</li>
                          <li>- M&amp;A, 企业合并需要申报吗？</li>
                          <li>- 何种情况下企业合并会被管制？</li>
                          <li>- 混合合并为何会成问题？</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>滥用市场支配地位的行为</li>
                          <li>- 理解滥用市场支配地位的行为</li>
                          <li>- 主要法理与案例研究</li>
                          <li>- 同意决定案例研究</li>
                        </ul>
                      </a>

                      <a href="#none">
                        <ul>
                          <li>不正当共同行为</li>
                          <li>- 了解不正当共同行为</li>
                          <li>- 不正当共同行为案例研究</li>
                        </ul>
                      </a>

                      <a href="#none">
                        <ul>
                          <li>转包法</li>
                          <li>- 了解转包法</li>
                          <li>- 转包法主要法理与案例研究</li>
                          <li>- 要求提供技术材料及挪用行为</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="con_wrap sub01">
                  <h3>专利管理</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>韩国申请制度与法律</li>
                          <li>- 专利性需求</li>
                          <li>- 专利申请</li>
                          <li>- 专利审核</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>韩国申请实务</li>
                          <li>- 制作专利明细表</li>
                          <li>- 专利审核应对</li>
                          <li>- 韩国审判应对</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>专利运用与买入</li>
                          <li>- 专利运用概要</li>
                          <li>- 专利收益化与IP fund的理解</li>
                          <li>- 专利与事业化战略</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>M&amp;A与IP Transaction</li>
                          <li>- M&amp;A与IP问题</li>
                          <li>- 各个问题的研讨事项</li>
                          <li>- 其他研讨事项</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="con_wrap sub01">
                  <h3>专利纠纷</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>韩国专利纠纷实务</li>
                          <li>- 理解专利审判制度</li>
                          <li>- 无效审判</li>
                          <li>- 证据保存实务</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>美国专利纠纷Key Points</li>
                          <li>- Discovery阶段</li>
                          <li>- Trial(Jury /Bench Trial)</li>
                          <li>- ITC诉讼</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>专利谈判及许可</li>
                          <li>- 专利Claim阶段</li>
                          <li>- 专利技术谈判</li>
                          <li>- Royality谈判</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>

                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-07-img-01-chn.png"
                  alt=""
                />

                <div className="con_wrap sub02">
                  <div className="level_icon">
                    <Image src={`${PUBLIC_URL}/images/all/lv-01.png`} alt="" />
                    <p>概念理解</p>
                  </div>
                  <h3>
                    <a href="#none">IP Mind-Set Essential</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>知识产权101</li>
                          <li>- 知识产权的概念与类型</li>
                          <li>- 专利制度a to z</li>
                          <li>- 商标制度a to z</li>
                        </ul>
                      </a>

                      <a href="#none">
                        <ul>
                          <li>AI专利</li>
                          <li>- AI专利动向</li>
                          <li>- AI专利起草方法</li>
                          <li>- AI专利Case Study</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>研发与知识产权</li>
                          <li>- R&amp;D中专利开发的必要性</li>
                          <li>- 前瞻性技术调查及搜索</li>
                          <li>- 发明申报起草指南</li>
                        </ul>
                      </a>

                      <a href="#none">
                        <ul>
                          <li>专利纠纷概论</li>
                          <li>- 专利纠纷的类型</li>
                          <li>- 专利纠纷的主要案例</li>
                          <li>- 韩国专利诉讼制度</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>职务发明</li>
                          <li>- 职务发明的理解</li>
                          <li>- 职务发明的权利归属关系</li>
                          <li>- 奖励制度与发明奖励案例</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>纠纷应对文件管理</li>
                          <li>- 文件管理政策</li>
                          <li>- 长期化文件管理</li>
                          <li>- 产生纠纷时的文件管理</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="con_wrap sub02">
                  <h3>开源Essentials</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>开源的前瞻性发展</li>
                          <li>- 开源的出现背景</li>
                          <li>- 开源的模式转换和成长契机</li>
                          <li>- 封闭企业的牵制引发的开源成长痛</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>开源许可</li>
                          <li>- 开源的定义与两面性</li>
                          <li>- GPI、BSD类许可的特点和义务事项</li>
                          <li>- 软件公开范围</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Software, Copyright &amp; License</li>
                          <li>- 软件著作权的主要争论点</li>
                          <li>- 软件知识产权和BM</li>
                          <li>- 软件许可类型和主要内容</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>

                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-07-img-02-chn.png"
                  alt=""
                />
              </div>
              <div className="combined-topic">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-07-img-03-chn.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Competency',
    key: 'tab7',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a className="item-button" href="#none">
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              直接进入课程
            </a>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>
            Competency <br />
            (Working Smart)
          </strong>
          <div>
            <ul>
              <li>
                不论职务领域，提供所有成员都需要具备的共同能力学习内容。
                <br />
                按照各个Role Level，为顺利执行工作，通过学习Communication Skill,
                Problem Solving, Measurement, Negotiation, Decision Making &amp;
                Risk
                Management等学习课程，学习如何获得更好的工作成果、如何实现Smart
                Working、提高Deep Change执行力，并打下坚实基础。
              </li>
            </ul>
            <p className="p_link">
              {/* 点击各Badge与课程，即可进入到相应页面。 */}
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-08-img-01-chn.png"
              alt=""
            />
            <div className="legal-wrap flex sub">
              <div className="fundamental-topic width50">
                <div className="con_wrap sub01">
                  <h3>
                    <a href="#none">Measurement Essentials</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Customer Measure &amp; Analytics</li>
                          <li>- 客户测量的基本概念</li>
                          <li>- Customer Value概念与测量</li>
                          <li>- 客户测量指标的运用和局限性</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>幸福地图的理解</li>
                          <li>- 幸福地图是？</li>
                          <li>- 幸福地图构建Process</li>
                          <li>- 幸福测量主要问题与解决方案</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>对SV测量的理解</li>
                          <li>- SV测量原则与体系</li>
                          <li>- SV测量案例与成果</li>
                          <li>- SV测量问题与扩散</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Deep Change的起点——测量</li>
                          <li>- 经营现场中的测量</li>
                          <li>- 人类的动机、行动测量</li>
                          <li>- 社会现象/问题测量</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="combined-topic width50">
                <div className="con_wrap sub01">
                  <h3>
                    <a href="#none">Negotiaion Essentials</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Negotiation的意义与必要性</li>
                          <li>- Intro into Negotiation</li>
                          <li>- Business综合领域，Negotiation</li>
                          <li>- Essential Course Framework Guide</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>[谈判准备战略] 12种谈判技巧</li>
                          <li>- 设定目标</li>
                          <li>- 准备自己的BATNA</li>
                          <li>- 记住这不是最后的谈判</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>谈判Essence Reading</li>
                          <li>- Getting to Yes</li>
                          <li>- FBI行动心理学</li>
                          <li>- 谈判杠杆</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box flex">
                      <a href="#none">
                        <ul className="height100">
                          <li>谈判 Essential Wrap up</li>
                          <li>- 谈判 Essential Wrap up</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="legal-wrap flex sub">
              <div className="fundamental-topic width50">
                <div className="con_wrap sub02">
                  <h3>Communication</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul className="ul_style">
                        <li>
                          <a href="#none">Excel实务Master 1~8</a>
                        </li>
                        <li>
                          <a href="#none">搜也搜不到的必知Excel函数</a>
                        </li>
                        <li>
                          <a href="#none">部长说我的企划案是垃圾</a>
                        </li>
                        <li>
                          <a href="#none">
                            韩国人在英文邮件中常犯的错误 上、下
                          </a>
                        </li>
                        <li>
                          <a href="#none">路过的组长都会回头看的PPT设计</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="combined-topic width50">
                <div className="con_wrap sub02">
                  <h3>Problem Solving</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul className="ul_style">
                        <li>
                          <a href="#none">用10种关键词学习创意思考力</a>
                        </li>
                        <li>战略性问题解决技巧（预计4月开设）</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
];

const panesEn = [
  {
    menuItem: 'Introduction of \n Management College',
    key: 'tab0',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a className="item-button" href="#none">
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              Go to Courses
            </a>
          </div>
        </div>

        <div className="belt">
          <div className="belt_wrapper">
            <div className="belt sub">
              <img
                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-con-01-eng.png"
                alt=""
                className="ui image"
              />
            </div>
          </div>
        </div>

        <div className="belt college-mana-text">
          <p>
            <strong>
              Learners can opt to take online content in consideration of their
              work, level, andinterest in a manner they find suitable, either
              <br />
              online and offline or offline W/S. They are exposed to practical
              and down-to-earth learning methods that take various forms,
              <br />
              such as discussions, inside and outside case studies, and
              practices.
            </strong>
            <br />
            In particular, SK-exclusive contents are lined up for production,
            which feature the insights and experiences of not only the external
            top
            <br />
            experts but also the SK leaders and experts.
          </p>
          <p className="p_link">
            {/* Click each badge to go to the corresponding page. */}
          </p>
        </div>
        <div className="college-cont-map sub wrap01">
          <div className="belt">
            <img
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/in-02-01-c-08-main-eng.png"
              alt="Management College 체계도"
              className="ui image"
            />
          </div>
        </div>
        <div className="college-cont-map sub pbtom">
          <div className="belt">
            <div className="label sub">
              Management College Badge System
              <span>
                (Scheduled to continuously expand, as of February 2021)
              </span>
            </div>
            <div className="manage-main-wrap">
              <div className="manage-main-table con01">
                <div className="manage-main-tit tit02">
                  <h3>
                    <strong>Level 1</strong>(Essential)
                  </h3>
                </div>
                <div className="manage-badge-main">
                  <p>
                    This is a foundational course to reinforce this particular
                    area,
                    <br />
                    and it aims to equip leaders and members with the basic
                    knowledge they must know in their works.
                  </p>
                </div>
              </div>
            </div>
            <div className="manage-main-wrap">
              <div className="manage-main-table con01">
                <div className="manage-main-tit tit02">
                  <h3>
                    <strong>Level 2</strong>(Advanced)
                  </h3>
                </div>
                <div className="manage-badge-main">
                  <p>
                    It targets the leaders and members who have more than five
                    years of experience in the job.
                  </p>
                  <p className="badge-descrip">
                    <strong>
                      Learning Professional Knowledges and Know-hows Needed in
                      Offices
                    </strong>
                  </p>
                  <p className="badge-descrip">
                    <strong>
                      The goal is to increase professionalism by fostering
                      mutual cooperation and engagement between experts
                      andemployees through workshops and other related
                      activities.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="chart_belt">
              <div className="chart-left">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/icon-chart.png"
                  alt="세로:레벨2/ 레벨1"
                  className="ui image"
                />
              </div>
              <div className="chart-right">
                <table style={{ borderCollapse: 'separate' }}>
                  <tbody>
                    <tr>
                      <td colSpan={2} />
                      <td className="badge-texts">
                        <a href="#none">
                          Digital-fused
                          <br />
                          Marketing
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="#none">Organizational Design</a>
                      </td>
                      <td className="badge-texts">
                        <a href="#none">
                          Purchasing
                          <br />
                          Advanced
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="#none">Corporate Law</a>
                        <br />/<br />
                        <a href="#none">Fair Trade Act</a>
                      </td>
                      <td />
                    </tr>
                    <tr>
                      <td className="badge-texts">
                        <a href="#none">
                          Strategy
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="#none">
                          Finance
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="#none">
                          Brand
                          <br />
                          Essentials
                        </a>
                        <br />/<br />
                        <a href="#none">
                          Marketing
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="#none">
                          HR
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="#none">
                          Purchasing
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="#none">
                          IP Mindset
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts grey">
                        <a href="#none">
                          Negotiation
                          <br />
                          Essentials
                        </a>
                        <br />/<br />
                        <a href="#none">
                          Measurement
                          <br />
                          Essentials
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="badge-texts-sm">
                        Corporate
                        <br />
                        Management
                        <br />
                        /Strategy
                      </td>
                      <td className="badge-texts-sm">
                        Finance
                        <br />
                        /Accounting
                      </td>
                      <td className="badge-texts-sm">
                        Marketing
                        <br />
                        /Brand
                      </td>
                      <td className="badge-texts-sm">
                        HR/
                        <br />
                        Organizational
                        <br />
                        Design
                      </td>
                      <td className="badge-texts-sm">SCM/Operation</td>
                      <td className="badge-texts-sm">Legal/IP</td>
                      <td className="badge-texts-sm grey">Competency</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Corporate Management/Strategy',
    key: 'tab1',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a className="item-button" href="#none">
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              Go to Courses
            </a>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>
            Corporate
            <br />
            Management
            <br />
            /Strategy
          </strong>
          <div>
            <ul>
              <li>
                It not only offers essential and in-depth contents for each job,
                but also lessons that reflect Deep Change.
              </li>
              <li>
                Through this, the goal is to systematize knowledge and reinforce
                a strategic way of thinking among the employees.
              </li>
            </ul>
            <p className="p_link">
              {/* Click each badge and course to go to the corresponding page. */}
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <img
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/enter-category.png"
              alt="가로:FundamentalTopic/CombindedTopic"
              className="ui image manage_cate"
            />
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="level_icon">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/enter-lv-02.png"
                    alt="levle2"
                    className="ui image"
                  />
                  <p>
                    Methodology/
                    <br />
                    Applied Learning
                  </p>
                </div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/ing-01-eng.png"
                  alt="후속코스를 기획중입니다"
                  className="ui image"
                />
              </div>
              <div className="combined-topic">
                <div className="con_wrap sub03 ing_con01">
                  <h3>AI/DT &amp; Strategy</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>AI/DT-based Deep Change Strategy</li>
                          <li>- Basic Concept of AI/DT Strategy</li>
                          <li>- Process of Establishing AI/DT Strategy</li>
                          <li>- Strategic Meaning of AI-based DT</li>
                          <li>- Restructuring the AI/DT Strategic Theories</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="con_wrap sub02 ing_con02">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/ing-02-eng.png"
                    alt="후속코스를 기획중입니다"
                    className="ui image"
                  />
                </div>
                <div className="con_wrap sub03 ing_con01">
                  <h3>ESG &amp; Strategy</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>SV-based Deep Change Strategy</li>
                          <li>- SV Strategy Planning Process</li>
                          <li>- Discussion on SV Creation</li>
                          <li>- How to Internalize the SV Creation</li>
                          <li>- Applying SV in Strategy</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="con_wrap sub02 ing_con02">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/ing-03-eng.png"
                    alt="후속코스를 기획중입니다"
                    className="ui image"
                  />
                </div>
              </div>
            </div>
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="level_icon">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/lv-01.png"
                    alt="level1"
                    className="ui image"
                  />
                  <p>
                    Understanding
                    <br />
                    Concepts
                  </p>
                </div>
                <div className="con_wrap sub02">
                  <h3>
                    <a href="#none">Strategy Essentials</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul className="height_fixed">
                          <li>Strategy 101: Welcome, New to Strategy?</li>
                          <li>- What Is Strategy?</li>
                          <li>- Strategic Management Process</li>
                          <li>- Planning and Implementing a Strategy</li>
                          <li>- Strategy in SK</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul className="height_fixed">
                          <li>All about Portfolio Strategy</li>
                          <li>- Portfolio Mgmt Options</li>
                          <li>- M&amp;A/JV</li>
                          <li>- Separation/Divestiture</li>
                          <li>- SK M&amp;A History &amp; Case</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul className="sub height_fixed">
                          <li>
                            The Start of the Strategy Planning, Business
                            Environment Analysis
                          </li>
                          <li>
                            - External Environment Analysis, Tool &amp;
                            Framework
                          </li>
                          <li>
                            - Internal Environment Analysis, Tool &amp;
                            Framework
                          </li>
                          <li>
                            - In-practice Tips for Management Environment
                            Analysis
                          </li>
                        </ul>
                      </a>
                      <ul className="ul_img_none height_fixed">
                        <li className="pd0">
                          <img
                            src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/ing-04-eng.png"
                            alt="후속코스를 기획중입니다"
                            className="ui image"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="combined-topic">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/ing-16.png"
                  alt="후속코스를 기획중입니다"
                  className="ui image"
                />
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Finance/Accounting',
    key: 'tab2',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a className="item-button" href="#none">
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              Go to Courses
            </a>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>Finance/Accounting</strong>
          <div>
            <ul>
              <li>
                This content aims to enhance your professional skills in
                finance/ accounting/ tax and meet your various learning needs by
                providing related theories and SK practices and cases.
              </li>
              <li>
                The aim is to increase the capabilities of Deep Chance among SK
                members by discovering and sharing SK practices and cases of
                experts and sharing lessons learned to others at workshops and
                communities.
              </li>
            </ul>
            <p className="p_link">
              {/* Click each badge and course to go to the corresponding page. */}
            </p>
          </div>
        </div>
        <div className="college-link-box">
          <div className="belt">
            <img
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/enter-category.png"
              alt=""
              className="ui image manage_cate"
            />
            <div className="legal-wrap">
              <div className="fundamental-topic topic_flex">
                <h2>Finance</h2>
                <h2>Accounting</h2>
                <h2>Tax</h2>
              </div>
              <div className="combined-topic">
                <h2>Finance/ Accounting/ Tax+a</h2>
              </div>
              <div className="ing_contents">
                <div className="level_icon">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/enter-lv-02.png"
                    alt="레벨2"
                    className="ui image"
                  />
                  <p>
                    Methodology
                    <br />
                    /Applied Learning
                  </p>
                </div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-03-ing-01-eng.png"
                  alt="후속코스를 기획중입니다"
                  className="ui image"
                />
              </div>
              <div className="fundamental-topic float-left">
                <div className="con_wrap sub02">
                  <div className="level_icon">
                    <img
                      src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/lv-01.png"
                      alt="레벨1"
                      className="ui image"
                    />
                    <p>
                      Understanding
                      <br />
                      Concepts
                    </p>
                  </div>
                  <h3>
                    <a href="#none">Finance Essentials</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul className="ul_style">
                        <li>
                          <a href="#none">Finance Management 101</a>
                        </li>
                        <li>
                          <a href="#none">
                            What is Corporate Value and How is it Evaluated?
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="con_sub_box">
                      <ul className="ul_style">
                        <li>
                          <a href="#none">
                            Teach me, Internal Accounting Control System
                          </a>
                        </li>
                        <li>
                          <a href="#none">
                            First Time: Cost/ Management Accounting
                          </a>
                        </li>
                        <li>
                          <a href="#none">
                            Accounting per Account Titles, Easy and One by One
                          </a>
                        </li>
                        <li>
                          {' '}
                          <a href="#none">Fun-Fun Accounting</a>
                        </li>
                      </ul>
                    </div>
                    <div className="con_sub_box">
                      <ul className="ul_one">
                        <li>
                          <a href="#none">
                            First Step to Tax and Accounting in Real Life
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <ul className="sub_ul">
                    <li>
                      <a href="#none">Organizational Design Guide</a>
                    </li>
                    <li>
                      <a href="#none">
                        Organizational Design Tip: Smart Design
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        Measuring Organizational Design Effectiveness
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Marketing/Brand',
    key: 'tab3',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a className="item-button" href="#none">
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              Go to Courses
            </a>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>Marketing/Brand</strong>
          <div>
            <ul>
              <li>
                This content systematically deals with various values that are
                created in the process of distributing goods and services to the
                customers and the &quot;marketing&quot; related to those values,
                <br />
                as well as with &quot;brand,&quot; the intangible asset that
                symbolizes a corporation&apos;s values that are distinguishable
                from competitors and their goods.
                <br /> It aims to equip SK members with{' '}
                <strong>the drive to practice Deep Change</strong> in their
                respective jobs.
              </li>
            </ul>
            <p className="p_link">
              {/* Click each badge and course to go to the corresponding page. */}
            </p>
          </div>
        </div>
        <div className="college-link-box market_style">
          <div className="belt">
            <img
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/enter-category.png"
              alt="가로:Fundamental Topic/Combindes Topic"
              className="ui image manage_cate"
            />
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="level_icon">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/enter-lv-02.png"
                    alt="v:lv2 Methodology Applied Learning, lv1 Understanding Concepts"
                    className="ui image"
                  />
                  <p>
                    Methodology
                    <br />
                    /Applied Learning
                  </p>
                </div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-04-ing-01-eng.png"
                  alt="후속 코스를 기획 중입니다"
                  className="ui image"
                />
              </div>
              <div className="combined-topic">
                <div className="con_wrap sub03">
                  <h3>Digital-fused Marketing</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul>
                        <li>Digital Customer Data Marketing</li>
                        <li>
                          <a href="#none">- Marketing DT Trend</a>
                        </li>
                        <li>
                          <a href="#none">- Data-based Customer Analysis</a>
                        </li>
                        <li>
                          <a href="#none">- Performance Marketing Analysis</a>
                        </li>
                        <li>
                          <a href="#none">
                            - Analyzing the Digital Channel Competitiveness
                          </a>
                        </li>
                        <li>
                          <a href="#none">- Global Digital Marketing Trends</a>
                        </li>
                      </ul>
                      <ul>
                        <li>Digital Marketing Cases</li>
                        <li>
                          <a href="#none">- Mastercard’s DT Success Strategy</a>
                        </li>
                        <li>
                          <a href="#none">
                            - Digital Marketing Trend &amp; Cases
                          </a>
                        </li>
                        <li>
                          <a href="#none">
                            - SK’ s Customer-data-based Deep Change
                          </a>
                        </li>
                      </ul>
                      <a href="#none">
                        <ul>
                          <li>AI Marketing</li>
                          <li>1. Reach : Lure Customers Using AI</li>
                          <li>2. ACT : AI that Leads Customers to Spend</li>
                          <li>3. Convert : Making Regular Customers by AI</li>
                          <li>4. Engage : AI-based Customer Prediction</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="legal-wrap flex">
              <div className="combined-topic">
                <div className="level_icon">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/lv-01.png"
                    alt=""
                    className="ui image"
                  />
                  <p>
                    Understanding
                    <br />
                    Concepts
                  </p>
                </div>
                <div className="con_wrap sub02">
                  <h3>
                    <a href="#none">Marketing Essentials</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul>
                        <li>
                          <a href="#none">Marketing Framework &amp; Tool</a>
                        </li>
                        <li>
                          <a href="#none">- Marketing Environment Analysis</a>
                        </li>
                        <li>
                          <a href="#none">- Marketing Strategy Planning</a>
                        </li>
                        <li>
                          <a href="#none">- Marketing Execution Tactics</a>
                        </li>
                      </ul>
                      <a href="#none">
                        <ul>
                          <li>Global Marketing Case Analysis</li>
                          <li>- Fedex Case : Who’s My Customer</li>
                          <li>- Ebay Case : The Return of the King</li>
                          <li>- Starbucks Case : Falling from a Tree</li>
                          <li>- Exxon Mobil Case : Nothing Lasts Forever</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Learning by Keywords, Marketing 101</li>
                          <li>- Marketing Principles / Paradigm Shift</li>
                          <li>- Smart Marketing VS Silly Marketing</li>
                          <li>- 3Ws of Marketing</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Learning about B2B Marketing by Examples</li>
                          <li>- B2B Marketing Outline</li>
                          <li>
                            - Implementing and Executing the B2BC Marketing
                            Strategy
                          </li>
                          <li>
                            - Digital Marketing Communication of the B2B Market
                          </li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Learning about Products Planning by Examples</li>
                          <li>- Goods and Service</li>
                          <li>- Comparing Goods Portfolios</li>
                          <li>- Innovation Strategy and Life Cycle of Goods</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fundamental-topic">
                <div className="con_wrap sub02">
                  <h3>
                    <a href="#none">Brand Essentials</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Brand What &amp; Why?</li>
                          <li>- Importance of Brand</li>
                          <li>- Brand vs. Branding</li>
                          <li>- Definition of Brand and Brand Elements</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Source of Brand Equity</li>
                          <li>- Brand Equity Pyramid and Brand Awareness</li>
                          <li>- Brand Association</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Key Insights to Strategic Brand Management</li>
                          <li>- Common Misconceptions in Brand Management</li>
                          <li>- Value : Key Concept of Brand Management</li>
                          <li>- Value Innovation</li>
                          <li>- Holistic Branding &amp; HCEM</li>
                          <li>- Strategic Framework of Brand Management</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Brand Identify System</li>
                          <li>- Basic Components of BIS</li>
                          <li>- Brand Personality</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>
                            Understanding Consumer Behavior(for Effective Brand
                            Management)
                          </li>
                          <li>- Consumer Data-Processing and Memory</li>
                          <li>- Customer Needs in Each Consumption Stages</li>
                          <li>- Connecting the Goods and Customer Needs</li>
                          <li>- Consumer Survey Methodology</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Brand Communication</li>
                          <li>
                            - The Role and Importance of Brand Communication
                          </li>
                          <li>
                            - Environmental Change and Change in Brand
                            <br />
                            Communication
                          </li>
                          <li>- New IMC Strategy</li>
                          <li>- Brand Comm. Strategy Establishment Model</li>
                          <li>- Creative Strategy</li>
                          <li>- Media Creative Strategy</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>DT Age Customer Experience Brand Strategy</li>
                          <li>- DT Age, Change of Lifestyle</li>
                          <li>- Digital Native in Brand Strategy</li>
                          <li>- SV or Authenticity Brand Strategy</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Brand Architecture Design</li>
                          <li>- Brand Architecture : What &amp; Why?</li>
                          <li>- Understanding and Analyzing Brand Hierarchy</li>
                          <li>- Key Decisions</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'HR/Organizational \n Structure',
    key: 'tab4',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a className="item-button" href="#none">
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              Go to Courses
            </a>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>HR/Organizational Structure</strong>
          <div>
            <ul>
              <li>
                HR Function offers a systematic content to expand and enhance HR
                workers’ capabilities and insights by providing them (1) basic
                understanding, methodology, and practices that are based on real
                HR works and <br />
                (2) related HR technology knowledge following the changes in
                future technology.
              </li>
              <li>
                The organizational design function offers the following: (1)
                Practical methodologies and core concepts and principles of
                organizational design (2) and solutions to realistic concerns
                such as organizational silos, employee happiness, and hurdles
                present in new projects.
              </li>
            </ul>
            <p className="p_link">
              {/* Click each badge and course to go to the corresponding page. */}
            </p>
          </div>
        </div>
        <div className="college-link-box hr_style">
          <div className="belt">
            <img
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/enter-category.png"
              alt="가로:Fundamental Topic/ Combined Topic"
              className="ui image manage_cate"
            />
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <h3>HR</h3>
                <h3>Organizational Design</h3>
                <div className="depth">
                  <div className="con_wrap sub02 ing">
                    <div className="level_icon">
                      <img
                        src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/enter-lv-02.png"
                        alt="v: lv2 Methodology Applied Learning"
                        className="ui image"
                      />
                      <p>
                        Methodology
                        <br />
                        /Applied Learning
                      </p>
                    </div>
                    <img
                      src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-05-ing-01-eng.png"
                      alt="후속 코스를 기획중입니다"
                      className="ui image"
                    />
                  </div>
                </div>
                <div className="depth">
                  <div className="con_wrap sub01 depth">
                    <h3>
                      <a href="#none">Organizational Design</a>
                    </h3>
                    <div className="con_box">
                      <div className="con_sub_box">
                        <a href="#none">
                          <ul>
                            <li>Organizational Design Workshop</li>
                            <li>1. Organizational Design Workshop</li>
                          </ul>
                        </a>
                        <a href="#none">
                          <ul>
                            <li>Organizational Design Methodology</li>
                            <li>
                              1. Organizational Design Methodology : Star Model
                            </li>
                            <li>2. Organizational Design Work Approach</li>
                          </ul>
                        </a>
                        <a href="#none">
                          <ul>
                            <li>Organizational Self-Design</li>
                            <li>
                              1. Organization Self-Design : Why &amp; What
                            </li>
                            <li>2. Organizational Self-Design Case</li>
                          </ul>
                        </a>
                      </div>
                    </div>
                  </div>
                  <ul className="sub_ul">
                    <li>
                      <a href="#none">
                        Organizational Design Work Approach (Mid-term)
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        Understanding Ambidexterous Organizational Design
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        Future Technology Corporation’s Organizational Design
                        Cases
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        How the Company Became an Agile Organization
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        SV-oriented Organizational Design Measure
                      </a>
                    </li>
                    <li>
                      <a href="#none">Org. Culture &amp; Leader</a>
                    </li>
                  </ul>
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-ing-10-eng.png"
                    alt="후속 코스를 기획중입니다"
                    className="ui image"
                  />
                </div>
              </div>
              <div className="combined-topic">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-05-ing-03-eng.png"
                  alt="후속 코스를 기획중입니다"
                  className="ui image"
                />
              </div>
            </div>
            <div className="legal-wrap">
              <div className="fundamental-topic float-left">
                <div className="level_icon">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/lv-01.png"
                    alt="세로: 레벨1 개념이해"
                    className="ui image"
                  />
                  <p>
                    Understanding
                    <br />
                    Concepts
                  </p>
                </div>
                <div className="depth">
                  <div className="con_wrap sub02 depth">
                    <h3>
                      <a href="#none">HR Essentials</a>
                    </h3>
                    <div className="con_box">
                      <div className="con_sub_box">
                        <a href="#none">
                          <ul>
                            <li>Securing Workforce</li>
                            <li>
                              1. Personnel Planning! Why Should you Do it?
                            </li>
                            <li>2. Checking the Hiring Process in Detail</li>
                          </ul>
                        </a>
                        <a href="#none">
                          <ul>
                            <li>Job Management</li>
                            <li>1. What is a job?</li>
                            <li>
                              2. Why are Job Analysis and Job Evaluation
                              <br />
                              Necessary?
                            </li>
                          </ul>
                        </a>
                        <a href="#none">
                          <ul>
                            <li>Rewards</li>
                            <li>
                              1. Things You Must Know for Operating Compensation
                            </li>
                            <li>2. Compensation System, How did it Change?</li>
                          </ul>
                        </a>
                        <a href="#none">
                          <ul>
                            <li>Performance Management</li>
                            <li>
                              1. Performance Management and Evaluation, Is It
                              Really Necessary?
                            </li>
                            <li>
                              2. Core Summary of Performance Management Process!
                            </li>
                          </ul>
                        </a>
                        <a href="#none">
                          <ul>
                            <li>Global HR</li>
                            <li>1. Understanding Expat System Properly</li>
                            <li>2. Must-know Global Staff Management</li>
                          </ul>
                        </a>
                        <a href="#none">
                          <ul>
                            <li>Labor and Management Relations</li>
                            <li>
                              1. Understanding the Individual Employment
                              Relations
                            </li>
                            <li>
                              2. Understanding the Contractual Hiring System
                            </li>
                          </ul>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="depth">
                  <div className="con_wrap sub02 depth">
                    <h3>
                      <a href="#none">Organizational Design</a>
                    </h3>
                    <div className="con_box">
                      <div className="con_sub_box">
                        <a href="#none">
                          <ul>
                            <li>
                              Basic Principles and Cases of Organizational
                              Design
                            </li>
                            <li>
                              1. Basic Principles of Organizational Design
                            </li>
                            <li>2. New Trend in Organizational Design</li>
                            <li>3. Corporate Case (MS, SKHY)</li>
                          </ul>
                        </a>
                      </div>
                    </div>
                  </div>
                  <ul className="sub_ul">
                    <li>
                      <a href="#none">Organizational Design Guide </a>
                    </li>
                    <li>
                      <a href="#none">
                        Organizational Design Tip: Smart Design
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        Measuring Organizational Design Effectiveness
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'SCM/Operation',
    key: 'tab5',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a className="item-button" href="#none">
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              Go to Courses
            </a>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>SCM/Operation</strong>
          <div>
            <ul>
              <li>
                By dealing with the “supply chain management” that makes the
                management activities efficient, which are necessary to
                providing exceptional service and goods to our customers at an
                affordable price and at the right time, this content enables SK
                members to take more initiative in Deep Change in their
                respective works.
              </li>
            </ul>
            <p className="p_link">
              {/* Click each badge and course to go to the corresponding page. */}
            </p>
          </div>
        </div>

        <div className="college-link-box scm_style">
          <div className="belt">
            <img
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/enter-category.png"
              alt="가로:Fundamental Topic/ Combined Topic"
              className="ui image manage_cate"
            />
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="con_wrap sub01">
                  <div className="level_icon">
                    <img
                      src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/enter-lv-02.png"
                      alt="세로:레벨2 방법론, 적용학습"
                      className="ui image"
                    />
                    <p>
                      Methodology
                      <br />
                      /Applied Learning
                    </p>
                  </div>
                  <h3>Purchasing Advanced</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Strategic Purchase for Corporate Success</li>
                          <li>
                            - Understanding Corporate Strategy and Corporate
                            Competitiveness
                          </li>
                          <li>
                            - Corporate Strategy and Consistent Purchasing
                            Strategy
                          </li>
                          <li>
                            - Success of Corporations and the Role of Purchasing
                          </li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Strategic Supplier Management</li>
                          <li>
                            - Two Ways to Deal with the Supplier - Cooperation
                            and Competition
                          </li>
                          <li>
                            - Nurturing and Benefit Sharing with the Suppliers
                          </li>
                          <li>
                            - Understanding SRM and the Purchasing Chessboard
                          </li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>
                            Cooperation and Connection with Purchasing and other
                            Departments
                          </li>
                          <li>
                            - Associating Development and Purchasing -
                            Development Purchase
                          </li>
                          <li>
                            - Purchasing and its Connection with other
                            Departments
                          </li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Successful Purchasing Negotiation</li>
                          <li>- What is Negotiation?</li>
                          <li>
                            - How to Find Solutions when Negotiations Get Stuck
                          </li>
                          <li>- Negotiation Stalemate, How to Break it?</li>
                          <li>
                            - How to Increase the Size of Pies in Negotiation?
                          </li>
                          <li>
                            - Going to Negotiate Without a Goal and Strategy?
                            It&apos;s Bound to Fail!
                          </li>
                          <li>
                            - How to Convince a Person Unmoved by my Arguments?
                          </li>
                          <li>
                            - What’s Most Important in Determining the
                            Bargaining Power?
                          </li>
                          <li>- How to End Up with More in Negotiations</li>
                          <li>- What’s the Best Tool in Convincing Others?</li>
                          <li>
                            - How to Deal with Monopolizing and Power-tripping
                            Suppliers
                          </li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-06-ing-01-eng.png"
                  alt="후속 코스를 기획중입니다"
                  className="ui image"
                />
                <div className="con_wrap sub02">
                  <div className="level_icon">
                    <img
                      src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/lv-01.png"
                      alt="세로: 레벨1 개념이해"
                      className="ui image"
                    />
                    <p>
                      Understanding
                      <br />
                      Concepts
                    </p>
                  </div>
                  <h3>
                    <a href="#none">Purchasing Essentials</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>
                            Am I a True Buyer, The Fundamentals of Purchasing
                          </li>
                          <li>- Understanding Purchasing</li>
                          <li>- Understanding the 5R in Purchasing</li>
                          <li>- Core of Purchasing</li>
                          <li>- Developing and Changing Purchase Management</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>
                            Understanding the Purchasing Contracts and other
                            Laws You Must Know
                          </li>
                          <li>- Moral Obligations in Purchasing</li>
                          <li>- Understanding Purchasing Contract</li>
                          <li>
                            - Subcontracting Law and the Law on Win-Win
                            Partnership
                          </li>
                          <li>- Must Knows in Subcontract Fee</li>
                          <li>
                            - Ban on Requesting to Share Data on Technology,
                            What to Look Out For
                          </li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>
                            What am I Purchasing? Understanding and Managing
                            Purchasing Goods
                          </li>
                          <li>
                            - Classification and Management of Purchasing Goods
                          </li>
                          <li>
                            - Material Management Strategy Following the Item
                            Classification
                          </li>
                          <li>- Understanding Service / Service Goods</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>
                            Never Let Your Guard Down, Risk Management in
                            Purchasing
                          </li>
                          <li>- Intro: Risk Management of Tylenol</li>
                          <li>
                            - Purchasing Risk Management and Procurement
                            Sustainability Plan
                          </li>
                          <li>
                            - Risk Managing the Fluctuating Price of Purchasing
                            Materials
                          </li>
                          <li>
                            - The Age of Pandemic and Purchase Risk Management
                          </li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Digital Purchasing Innovation</li>
                          <li>- Core Understanding of Digital Innovation</li>
                          <li>- Innovative Measures on Digital Marketing</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>
                            Understanding and Using Purchasing Work Process
                          </li>
                          <li>
                            - Understanding and Applying the Purchasing Work
                            Process
                          </li>
                          <li>- Searching and Evaluating the Supplier</li>
                          <li>
                            - Guide to Writing the RFP and RFQ and Things to
                            Avoid
                          </li>
                          <li>- Managing and Evaluating Bidding Process</li>
                          <li>- Selecting and Contracting the Supplier</li>
                          <li>- Understanding PO Placement</li>
                          <li>- Procurement Activity after Contract</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>
                            Know More Earn More, Finance, Accounting, and
                            Distribution for Buyers
                          </li>
                          <li>- Managing Account Registration</li>
                          <li>- Understanding and Applying Incoterms 2020</li>
                          <li>- Supplier Credibility and Financial Analysis</li>
                          <li>
                            - Practical Lessons on Trade Insurance/ Import
                            Insurance
                          </li>
                          <li>- Import Clearance, Duty and Surtax</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Purchasing Cost Management</li>
                          <li>- Strategic Meaning of Purchasing Cost</li>
                          <li>
                            - Price Analysis and Price Adequacy Evaluation
                          </li>
                          <li>- Meaning and Method of Cost Analysis</li>
                          <li>- Understanding Total Cost of Ownership (TCO)</li>
                          <li>- Applying Total Cost of Ownership (TCO)</li>
                          <li>- Target Cost and Value Analysis</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Social Value and Purchase of Corporation</li>
                          <li>- Purchasing and ESG/SV Practice (1)</li>
                          <li>- Purchasing and ESG/SV Practice (2)</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-06-ing-02-eng.png"
                  alt="후속 코스를 기획중입니다"
                  className="ui image"
                />
              </div>
              <div className="combined-topic">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-06-ing-03-eng.png"
                  alt="후속 코스를 기획중입니다"
                  className="ui image"
                />
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Legal/IP',
    key: 'tab6',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a className="item-button" href="#none">
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              Go to Courses
            </a>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>Legal/IP</strong>
          <div>
            <ul>
              <li>
                In this function, it deals with the legal that solves problems
                and prevents any legal risks before the fact in the corporate
                setting and with IP matters that raise the patent
                competitiveness of the company in already existing projects or
                new ones. This content provides systematic lessons to the SK
                members on ways to increase their Deep Change drive in their
                works.
              </li>
            </ul>
            <p className="p_link">
              {/* Click each badge and course to go to the corresponding page. */}
            </p>
          </div>
        </div>
        <div className="college-link-box leg_style">
          <div className="belt">
            <img
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/enter-category.png"
              alt="가로:Fundamental Topic/ Combined Topic"
              className="ui image manage_cate"
            />
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="con_wrap sub01">
                  <div className="level_icon">
                    <img
                      src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/enter-lv-02.png"
                      alt="세로:레벨2 방법론, 적용학습"
                      className="ui image"
                    />
                    <p>
                      Methodology/
                      <br />
                      Applied Learning
                    </p>
                  </div>
                  <h3>
                    <a href="#none">Monopoly Regulation and Fair Trade Act</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>
                            Monopoly Regulation and Fair Trade Act Overview
                          </li>
                          <li>
                            - Understanding Monopoly Regulation and Fair Trade
                            Act and its Direction
                          </li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Unfair Support, Personal Gain</li>
                          <li>
                            - Understanding Wrongful Support / Illegal
                            Profit-taking
                          </li>
                          <li>
                            - Legal Principles and Case Study on Wrongful
                            Support
                          </li>
                          <li>
                            - Recent Regulation Trends by KFTC and Study on
                            KFTC’s Decisions
                          </li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>
                            Unfair Trade and Injustice Indication and
                            Advertisement
                          </li>
                          <li>- Understanding Unfair Trade Practices</li>
                          <li>
                            - Important Legal Principles / Case Study on Unfair
                            Trade Practices
                          </li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Deterring the Concentration of Economic Power</li>
                          <li>
                            - Understanding the Corporate Regulations under the
                            Monopoly Regulation and Fair Trade Act
                          </li>
                          <li>- Recent Cases by KFTC and their Implications</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>The Limits of M&amp;A</li>
                          <li>- Must We Report M&amp;A?</li>
                          <li>
                            - When does Business Consolidation get Regulated?
                          </li>
                          <li>
                            - How Does Conglomerate Merger Become a Problem?
                          </li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Market-dominating and Power-abusing Behaviors</li>
                          <li>
                            - Understanding the Market-dominating and
                            Power-abusing Behaviors
                          </li>
                          <li>- Study on Main Principles of Law and Cases</li>
                          <li>
                            - Study on Companies’ Proposed Correction Schemes
                            against Antitrust Charges
                          </li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Unfair Common Practice</li>
                          <li>- Understanding Unfair Common Practices</li>
                          <li>- Case Study on Unfair Common Practices</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Subcontracting Act</li>
                          <li>- What Is Subcontracting Act?</li>
                          <li>
                            - Main Legal Principles and Case Studies on the Law
                            on Subcontracting
                          </li>
                          <li>
                            - Request and Usefulness of the Request to Share
                            Data on Technology
                          </li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="con_wrap sub01">
                  <h3>Patent Management</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Patent Application System and Law in Korea</li>
                          <li>- Patent Requirements History</li>
                          <li>- Patent Application</li>
                          <li>- Patent Examination</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Applying for Patent in Korea</li>
                          <li>- Writing Statements in Korean</li>
                          <li>- Responding to Screenings in Korea</li>
                          <li>- Responding to Trials in Korea</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Patent Use and Purchase</li>
                          <li>- Summary of Patent Utilization</li>
                          <li>- Understanding Patent Profit and IP Fund</li>
                          <li>- Patent and Business Strategy</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>M&amp;A and IP Transaction</li>
                          <li>- M&amp;A and IP Transaction Issues</li>
                          <li>- Things to Watch Out by Each Issue</li>
                          <li>- Other Review Points</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="con_wrap sub01">
                  <h3>Patent Dispute</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Patent Dispute in Korea</li>
                          <li>- Understanding Patent Trial System</li>
                          <li>- Invalidation Trial</li>
                          <li>- Practical Lessons on Evidence Preservation</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Key Points in U.S. Patent Dispute</li>
                          <li>- Discovery Phase</li>
                          <li>- Trial(Jury /Bench Trial)</li>
                          <li>- ITC Lawsuit</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Patent Negotiation and License</li>
                          <li>- Stages of Patent Claim</li>
                          <li>- Negotiating Patent Technology</li>
                          <li>- Royality Negotiation</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-07-ing-01-eng.png"
                  alt="후속 코스를 기획중입니다"
                  className="ui image"
                />
                <div className="con_wrap sub02 b-sz">
                  <div className="level_icon">
                    <img
                      src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/lv-01.png"
                      alt="세로: 레벨1 개념이해"
                      className="ui image"
                    />
                    <p>
                      Understanding
                      <br />
                      Concepts
                    </p>
                  </div>
                  <h3>
                    <a href="#none">IP Mind-Set Essential</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Intellectual Property 101</li>
                          <li>- Concept and Kinds of Intellectual Property</li>
                          <li>- A to Z of Patent System</li>
                          <li>- A to Z of Trademark System</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>AI Patent</li>
                          <li>- AI Patent Trends</li>
                          <li>- AI Patenting</li>
                          <li>- AI Patent Case Study</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>
                            Research Development and Intellectual Property
                          </li>
                          <li>- Necessity of Patent Development in R&amp;D</li>
                          <li>- Prior Art Search</li>
                          <li>- Guide to Writing Invention Disclosures</li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Patent Dispute Introduction</li>
                          <li>- Types of Patent Disputes</li>
                          <li>- Key Cases of Patent Disputes</li>
                          <li>- Korea Patent Litigation System</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Job Invention</li>
                          <li>
                            - Understanding Employee
                            <br />
                            Invention
                          </li>
                          <li>
                            - The Relationship of Appropriation
                            <br />
                            of Rights in Employee Invention
                          </li>
                          <li>
                            - Cases on Compensation System
                            <br />
                            and Invention Compensation
                          </li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>
                            Managing Documents on
                            <br />
                            Dispute Response
                          </li>
                          <li>- Document Management Policy</li>
                          <li>- Managing Daily Documents</li>
                          <li>- Document Management in Case of Conflict</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="con_wrap sub02">
                  <h3>Open Source Essentials</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Open Source Linear Development</li>
                          <li>- Background Behind the Advent of Open Source</li>
                          <li>
                            - Paradigm Shift and Growth Momentum of Open Source
                          </li>
                          <li>
                            - Open Source’s Growing Pains following the
                            Sanctions on Closed Corporations
                          </li>
                        </ul>
                      </a>
                      <a href="#none">
                        <ul>
                          <li>Open Source License</li>
                          <li>
                            - Definition and Double-sidedness of Open Source
                          </li>
                          <li>
                            - Characteristics and Requirements of GPI and BSD
                            Licenses
                          </li>
                          <li>- Software Public Scope</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Software, Copyright &amp; License</li>
                          <li>- Main Issues behind Software Copyrights</li>
                          <li>- Intellectual Property and BM of Software</li>
                          <li>
                            - Types of Software License and Their Key Content
                          </li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-07-ing-02-eng.png"
                  alt="후속 코스를 기획중입니다"
                  className="ui image"
                />
              </div>
              <div className="combined-topic">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-07-ing-03-eng.png"
                  alt="후속 코스를 기획중입니다"
                  className="ui image"
                />
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Competency',
    key: 'tab7',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a className="item-button" href="#none">
              <Image
                style={{ display: 'inline' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                alt=""
              />
              Go to Courses
            </a>
          </div>
        </div>

        <div className="college-sub-txt">
          <strong>
            Competency
            <br />
            (Working Smart)
          </strong>
          <div>
            <ul>
              <li>
                Provides content on common competencies all employees need,
                regardless of their job areas. <br />
                This course is needed to successfully execute your job according
                to your role level (Communication Skill, Problem Solving,
                Measurement, Negotiation, Decision Making &amp; Risk
                Management). Strengthen your foundations to perform better, work
                well for smart working, and enhance your Deep Change execution
                ability.
              </li>
            </ul>
            <p className="p_link">
              {/* Click each badge and course to go to the corresponding page. */}
            </p>
          </div>
        </div>
        <div className="college-link-box comp_style">
          <div className="belt">
            <img
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/mg-08-ing-01-eng.png"
              alt=""
              className="ui image"
            />
            <div className="legal-wrap flex sub">
              <div
                className="fundamental-topic width50"
                style={{ marginRight: '10px' }}
              >
                <div className="con_wrap sub01">
                  <h3>
                    <a href="#none">Measurement Essentials</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Customer Measure &amp; Analytics</li>
                          <li>- Basic Concept of Customer Measurement</li>
                          <li>- Concept and Measurement of Customer Value</li>
                          <li>
                            - The Usage and Limits of Customer Measurement Index
                          </li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Understanding the Happiness Map</li>
                          <li>- What is a Happiness Map?</li>
                          <li>- Happiness Map Construction Process</li>
                          <li>
                            - Main Issues and Solutions in Happiness Measurement
                          </li>
                        </ul>
                      </a>
                    </div>
                  </div>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Understanding of SV Measurement</li>
                          <li>- Principle and System of SV Measurement</li>
                          <li>- Cases and Accomplishments of SV Measurement</li>
                          <li>- Issues and Expansion of SV Measurement</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>The Beginning of Deep Change, Measurement</li>
                          <li>- Measurement in the Management Field</li>
                          <li>- Human Motives, Behavior Measurement</li>
                          <li>- Social Phenomenon / Problem Measurement</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="combined-topic width50">
                <div className="con_wrap sub01">
                  <h3>
                    <a href="#none">Negotiaion Essentials</a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Negotiation, its Meaning and Necessity</li>
                          <li>- Intro into Negotiation</li>
                          <li>- Comprehensive Business Area, Negotiation</li>
                          <li>- Essential Course Framework Guide</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>
                            [Negotiation Preparation Strategy]
                            <br />
                            12 Negotiation Skills
                          </li>
                          <li>- Set a Goal</li>
                          <li>- Secure your own BATNA</li>
                          <li>
                            - Remember That This is Not your Last Negotiation
                          </li>
                        </ul>
                      </a>
                    </div>
                  </div>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="#none">
                        <ul>
                          <li>Negotiation Essence Reading</li>
                          <li>- Getting to Yes</li>
                          <li>- FBI Behavioral Psychology</li>
                          <li>- Negotiation Leverage</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box flex">
                      <a href="#none">
                        <ul className="height100">
                          <li>Negotiation Essential Wrap Up</li>
                          <li>- Negotiation Essential Wrap Up</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="legal-wrap flex sub">
              <div
                className="fundamental-topic width50"
                style={{ marginRight: '10px' }}
              >
                <div className="con_wrap sub02">
                  <h3>Communication</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul className="ul_style">
                        <li>
                          <a href="#none">Excel Practice: Master 1 ~ 8</a>
                        </li>
                        <li>
                          <a href="#none">
                            Essential Excel Functions that Hardly Show Up on
                            Searches
                          </a>
                        </li>
                        <li>
                          <a href="#none">
                            The Department Manager Told My Plan was Garbage
                          </a>
                        </li>
                        <li>
                          <a href="#none">
                            Common Mistakes Koreans Make in Email Writing Part 1
                            and 2
                          </a>
                        </li>
                        <li>
                          <a href="#none">
                            Powerpoint Slides that Make your Team Manager Look
                            Back
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="combined-topic width50">
                <div className="con_wrap sub02">
                  <h3>Problem Solving</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul className="ul_style">
                        <li>
                          <a href="#none">
                            Learning about Creative Thinking with 10 Keywords
                          </a>
                        </li>
                        <li>
                          Strategic Problem Solving Skills (To be Available in
                          April)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
];

const CollegeInnerTabView = () => {
  const history = useHistory();

  const [activeIndex, setActiveIndex] = useState(0);

  const onTabChange = (e: any, { activeIndex }: any) => {
    setActiveIndex(activeIndex);
    history.push(
      routePaths.introductionCollegeManagement(panes[activeIndex].menuItem)
    );
  };

  const queryParams = queryString.parse(window.location.search);
  const innerTab = (queryParams.innerTab as string) || '';

  useEffect(() => {
    const enIndex = panesEn.findIndex((pane) =>
      innerTab.includes(pane.menuItem)
    );
    const zhIndex = panesZh.findIndex((pane) =>
      innerTab.includes(pane.menuItem)
    );

    if (enIndex >= 0) {
      history.push(
        routePaths.introductionCollegeManagement(panes[enIndex]?.menuItem)
      );
    } else if (zhIndex >= 0) {
      history.push(
        routePaths.introductionCollegeManagement(panes[zhIndex]?.menuItem)
      );
    }
  }, []);

  const indexSetter = () => {
    const activeIndex =
      panes.findIndex((pane) => innerTab.includes(pane.menuItem)) || 0;
    if (activeIndex > 0) {
      setActiveIndex(activeIndex);
    } else {
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    indexSetter();
  }, [queryParams]);

  return (
    <Tab
      menu={{ attached: false, tabular: false }}
      panes={panes}
      className="sub-tab-menu"
      activeIndex={activeIndex}
      onTabChange={onTabChange}
    />
  );
};

export const CollegeInnerZhTabView = () => {
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);

  const onTabChange = (e: any, { activeIndex }: any) => {
    setActiveIndex(activeIndex);
    history.push(
      routePaths.introductionCollegeManagement(panesZh[activeIndex].menuItem)
    );
  };

  const queryParams = queryString.parse(window.location.search);
  const innerTab = (queryParams.innerTab as string) || '';

  const indexSetter = () => {
    const activeIndex =
      panesZh.findIndex((pane) => innerTab.includes(pane.menuItem)) || 0;
    if (activeIndex > 0) {
      setActiveIndex(activeIndex);
    } else {
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    const krIndex = panes.findIndex((pane) => innerTab.includes(pane.menuItem));
    const enIndex = panesEn.findIndex((pane) =>
      innerTab.includes(pane.menuItem)
    );

    if (krIndex >= 0) {
      history.push(
        routePaths.introductionCollegeManagement(panesZh[krIndex]?.menuItem)
      );
    } else if (enIndex >= 0) {
      history.push(
        routePaths.introductionCollegeManagement(panesZh[enIndex]?.menuItem)
      );
    }
  }, []);

  useEffect(() => {
    indexSetter();
  }, [queryParams]);

  return (
    <Tab
      menu={{ attached: false, tabular: false }}
      panes={panesZh}
      className="sub-tab-menu"
      activeIndex={activeIndex}
      onTabChange={onTabChange}
    />
  );
};

export const CollegeInnerEnTabView = () => {
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);

  const onTabChange = (e: any, { activeIndex }: any) => {
    setActiveIndex(activeIndex);
    history.push(
      routePaths.introductionCollegeManagement(panesEn[activeIndex].menuItem)
    );
  };
  const indexSetter = () => {
    const activeIndex =
      panesEn.findIndex((pane) => innerTab.includes(pane.menuItem)) || 0;
    if (activeIndex > 0) {
      setActiveIndex(activeIndex);
    } else {
      setActiveIndex(0);
    }
  };
  const queryParams = queryString.parse(window.location.search);
  const innerTab = (queryParams.innerTab as string) || '';

  useEffect(() => {
    const krIndex = panes.findIndex((pane) => innerTab.includes(pane.menuItem));
    const zhIndex = panesZh.findIndex((pane) =>
      innerTab.includes(pane.menuItem)
    );

    if (krIndex >= 0) {
      history.push(
        routePaths.introductionCollegeManagement(panesEn[krIndex]?.menuItem)
      );
    } else if (zhIndex >= 0) {
      history.push(
        routePaths.introductionCollegeManagement(panesEn[zhIndex]?.menuItem)
      );
    }
  }, []);
  useEffect(() => {
    indexSetter();
  }, [queryParams]);

  return (
    <Tab
      menu={{ attached: false, tabular: false }}
      panes={panesEn}
      className="sub-tab-menu management1"
      activeIndex={activeIndex}
      onTabChange={onTabChange}
    />
  );
};

export default CollegeInnerTabView;
