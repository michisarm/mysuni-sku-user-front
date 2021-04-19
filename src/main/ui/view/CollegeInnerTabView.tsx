import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Image, Menu, Label, Tab } from 'semantic-ui-react';
import { reactAlert } from '@nara.platform/accent';

const PUBLIC_URL = process.env.PUBLIC_URL;

const emptyAlert = (e: any) => {
  e.preventDefault();
  reactAlert({
    title: '알림',
    message: '준비 중입니다.',
  });
};

const CollegeInnerTabView = () => {

  const history = useHistory();

  const pageMove = (path: string) => {
    history.push(path);
  }

  const panes = [
    {
      menuItem: 'Management College 소개',
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
                  <table style={{borderCollapse: 'separate'}}>
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
                          <Link to="" onClick={emptyAlert}>회사법</Link>
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
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: '기업 경영/전략',
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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

  return (
    <Tab
      menu={{ attached: false, tabular: false }}
      panes={panes}
      className="sub-tab-menu"
    />
  );
}
export default CollegeInnerTabView;
