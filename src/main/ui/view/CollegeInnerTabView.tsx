import React from 'react';
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

const panes = [
  {
    menuItem: 'Management College 소개',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channels/pages/1"
              className="item-button"
            >
              <Image
                style={{ display: 'inline' }}
                src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
                alt=""
              />
              과정 바로가기
            </a>
          </div>
        </div>
        <div className="belt">
          <div className="belt_wrapper">
            <div className="belt sub">
              <Image src={`${PUBLIC_URL}/images/all/con-01.png`} alt="" />
            </div>
            <div className="belt_texts">
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
            </div>
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
            {/* <div className="label sub">Management College 체계도</div> */}
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
                <table>
                  <tbody>
                    <tr>
                      <td colSpan={2}>ㅤ</td>
                      <td className="badge-texts">
                        <a href="" onClick={emptyAlert}>
                          디지털 융합
                          <br />
                          마케팅
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-30">
                          조직 Design
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="" onClick={emptyAlert}>
                          구매
                          <br />
                          Advanced
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="" onClick={emptyAlert}>
                          회사법
                        </a>
                        <br />
                        /<br />
                        <a href="https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-4d">
                          공정거래법
                        </a>
                      </td>
                      <td>ㅤ</td>
                    </tr>
                    <tr>
                      <td className="badge-texts">
                        <a href="https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-46">
                          Strategy
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-49">
                          재무
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-4c">
                          브랜드
                          <br />
                          Essentials
                        </a>
                        <br />
                        /<br />
                        <a href="https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-4a">
                          마케팅
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-4b">
                          HR
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="" onClick={emptyAlert}>
                          구매
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts">
                        <a href="" onClick={emptyAlert}>
                          IP Mindset
                          <br />
                          Essentials
                        </a>
                      </td>
                      <td className="badge-texts grey">
                        <a href="" onClick={emptyAlert}>
                          협상
                          <br />
                          Essentials
                        </a>
                          <br />
                          /<br />
                          <a href="https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-44">
                            Measurement
                            <br />
                            Essentials
                          </a>
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
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN00014"
              className="item-button"
            >
              <Image
                style={{ display: 'inline' }}
                src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
                alt=""
              />
              과정 바로가기
            </a>
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
        {/* 컬리지 콘텐츠 */}
        <div className="college-link-box">
          <div className="belt">
            <Image src={`${PUBLIC_URL}/images/all/enter-category.png`} alt="" style={{float:"right",marginBottom:"0.5rem"}}/>

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
                  <h3>AI/DT & Strategy</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-9s/Course/C-LECTURE-7k">
                        <ul>
                          <li>AI/DT 기반의 Deep Change 전략</li>
                          <li>- AI/DT 전략의 기본 개념</li>
                          <li>- AI/DT 전략 수립 Process</li>
                          <li>- AI 기반 DT의 전략적 의미</li>
                          <li>- AI/DT 전략 가설의 재구성</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="con_wrap sub02 ing_con02">
                  <Image src={`${PUBLIC_URL}/images/all/ing-14.png`} alt="" />
                </div>

                <div className="con_wrap sub03 ing_con01">
                  {/* 콘텐츠 리스트 */}
                  <h3>ESG & Strategy</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-9r/Course/C-LECTURE-7j">
                        <ul>
                          <li>SV 기반의 Deep Change 전략</li>
                          <li>- SV 전략수립 Process</li>
                          <li>- SV 창출을 위한 논의</li>
                          <li>- SV 창출 내재화 방안</li>
                          <li>- 전략에 SV 적용하기</li>
                        </ul>
                      </a>
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
                    <a href="https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-46">
                      Strategy Essentials
                    </a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1aj/Program/P-LECTURE-1z">
                        <ul>
                          <li>전략 101 : 어서 와, 전략은 처음이지?</li>
                          <li>- 전략이란 무엇인가?</li>
                          <li>- 전략 경영 Process</li>
                          <li>- 전략의 수립 및 실행</li>
                          <li>- Strategy in SK</li>
                        </ul>
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1e7/Course/C-LECTURE-17w">
                        <ul>
                          <li>All about Portfolio Strategy</li>
                          <li>- Portfolio Mgmt의 Option</li>
                          <li>- M&A/JV</li>
                          <li>- Separation/Divestiture</li>
                          <li>- SK M&A History & Case</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1ek/Course/C-LECTURE-186">
                        <ul className="sub">
                          <li>전략 수립의 시작, 경영환경분석</li>
                          <li>- 외부환경분석 Tool & Framework</li>
                          <li>- 내부환경분석 Tool & Framework</li>
                          <li>- 경영환경분석 실전 Tip</li>
                        </ul>
                      </a>
                      <ul>
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
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN0005w"
              className="item-button"
            >
              <Image
                style={{ display: 'inline' }}
                src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
                alt=""
              />
              과정 바로가기
            </a>
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
            <Image src={`${PUBLIC_URL}/images/all/enter-category.png`} alt="" style={{float:"right",marginBottom:"0.5rem"}}/>
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

              <div className="fundamental-topic" style={{float:"left"}}>
                <div className="con_wrap sub02">
                  <div className="level_icon">
                    <Image src={`${PUBLIC_URL}/images/all/lv-01.png`} alt="" />
                    <p>개념 이해</p>
                  </div>
                  <h3>
                    <a href="https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-49">
                      재무 Essentials
                    </a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul className="ul_style">
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1eo/Course/C-LECTURE-18a">
                            재무관리 101
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1em/Course/C-LECTURE-188">
                            기업가치, 무엇이고 어떻게 평가하는가?
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="con_sub_box">
                      <ul className="ul_style">
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1es/Course/C-LECTURE-18e">
                            궁금해요, 내부회계관리제도
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1eq/Course/C-LECTURE-18c">
                            처음 만나는 원가/관리회계
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1ep/Course/C-LECTURE-18b">
                            하나씩 쉽게, 계정과목 별 회계처리
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1eb/Course/C-LECTURE-17y">
                            Fun-Fun한 회계
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="con_sub_box">
                      <ul className="ul_one">
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1ew/Course/C-LECTURE-18h">
                            세무회계 실무 첫걸음
                          </a>
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
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN00018"
              className="item-button"
            >
              <Image
                style={{ display: 'inline' }}
                src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
                alt=""
              />
              과정 바로가기
            </a>
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
            <Image src={`${PUBLIC_URL}/images/all/enter-category.png`} alt="" style={{float:"right",marginBottom:"0.5rem"}}/>

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
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-19m/Course/C-LECTURE-144">
                            - Marketing DT Trend
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1bd/Course/C-LECTURE-154">
                            - 데이터 기반 고객 분석
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1bc/Course/C-LECTURE-153">
                            - 퍼포먼스 마케팅 분석
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-19x/Course/C-LECTURE-148">
                            - 디지털 채널 경쟁력 분석
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-31/Course/C-LECTURE-1a">
                            - Global Digital Marketing Trends
                          </a>
                        </li>
                      </ul>

                      <ul>
                        <li>디지털마케팅 사례</li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-rd/Course/C-LECTURE-n4">
                            - Mastercard의 DT 성공전략
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-2x/Course/C-LECTURE-1b">
                            - 디지털마케팅 Trend & Case
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-19t/Course/C-LECTURE-146">
                            - SK의 고객 Data 기반 Deep Change
                          </a>
                        </li>
                      </ul>

                      <a href="" onClick={emptyAlert}>
                        <ul>
                          <li>AI 마케팅</li>
                          <li>1. Reach : AI 로 고객을 유인하라</li>
                          <li>2. ACT : 고객 지갑을 열게 하는 AI</li>
                          <li>3. Convert : AI 로 단골 고객 만들기</li>
                          <li>4. Engage : AI 기반 고객 예측</li>
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
                  <p>개념 이해</p>
                </div>
                <div className="con_wrap sub02">
                  {/* 콘텐츠 리스트 */}
                  <h3>
                    <a href="https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-4a">
                      마케팅 Essentials
                    </a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul>
                        <li>
                          <a href="" onClick={emptyAlert}>
                            마케팅 Framework & Tool
                          </a>
                        </li>
                        <li>
                          <a href="" onClick={emptyAlert}>
                            - 마케팅 환경 분석
                          </a>
                        </li>
                        <li>
                          <a href="" onClick={emptyAlert}>
                            - 마케팅 전략 수립
                          </a>
                        </li>
                        <li>
                          <a href="" onClick={emptyAlert}>
                            - 마케팅 실행 전술
                          </a>
                        </li>
                      </ul>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1el/Course/C-LECTURE-187">
                        <ul>
                          <li>Global 마케팅 사례분석</li>
                          <li>- Fedex Case : 나의 고객은 누구인가</li>
                          <li>- Ebay Case : 왕의 귀환</li>
                          <li>- Starbucks Case : 나무에서 떨어지다</li>
                          <li>- Exxon Mobil Case : 영원한 것은 없다</li>
                        </ul>
                      </a>

                      <ul>
                        <li>마케팅 101</li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-19l/Course/C-LECTURE-143">
                            - 키워드로 배우는 마케팅 101
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1bf/Course/C-LECTURE-156">
                            - 사례로 배우는 B2B 마케팅 101
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1be/Course/C-LECTURE-155">
                            - 사례로 배우는 상품기획 관리 101
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="fundamental-topic">
                <div className="con_wrap sub02">
                  {/* 콘텐츠 리스트 */}
                  <h3>
                    <a href="https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-4c">
                      브랜드 Essentials{' '}
                    </a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1d2/Course/C-LECTURE-16z">
                        <ul>
                          <li>Brand What & Why?</li>
                          <li>- 브랜드의 중요성</li>
                          <li>- Brand vs. Branding</li>
                          <li>- 브랜드의 정의와 브랜드 Elements</li>
                        </ul>
                      </a>

                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1d3/Course/C-LECTURE-170">
                        <ul>
                          <li>Source of Brand Equity</li>
                          <li>- Brand Equity Pyramid와 Brand Awareness</li>
                          <li>- Brand Association</li>
                        </ul>
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1d4/Course/C-LECTURE-171">
                        <ul>
                          <li>전략적 브랜드 관리의 Key insight</li>
                          <li>- 브랜드 관리에 대한 흔한 착각</li>
                          <li>- Value : 브랜드 관리의 핵심 개념</li>
                          <li>- Value Innovation</li>
                          <li>- Holistic Branding & HCEM</li>
                          <li>- 브랜드 관리의 전략적 Framework</li>
                        </ul>
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1d5/Course/C-LECTURE-172">
                        <ul>
                          <li>Brand Identify System</li>
                          <li>- BIS의 기본요소</li>
                          <li>- Brand Personality</li>
                        </ul>
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1d6/Course/C-LECTURE-173">
                        <ul>
                          <li>
                            (효과적 브랜드 관리를 위한) 소비자 행동의 이해
                          </li>
                          <li>- 소비자 정보처리와 기억</li>
                          <li>- 소비단계별 고객욕구</li>
                          <li>- 제품과 고객욕구의 연결</li>
                          <li>- 소비자 조사 방법론</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1d7/Course/C-LECTURE-174">
                        <ul>
                          <li>브랜드 Communication</li>
                          <li>- Brand Comm.의 역할과 중요성</li>
                          <li>- 환경 변화와 Brand Comm.의 변화</li>
                          <li>- New IMC 전략</li>
                          <li>- 브랜드 Comm. 전략수립 모델</li>
                          <li>- Creative 전략</li>
                          <li>- Media Creative 전략</li>
                        </ul>
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1d8/Course/C-LECTURE-175">
                        <ul>
                          <li>DT시대 고객경험 브랜드전략</li>
                          <li>- DT 시대, Lifestyle의 변화</li>
                          <li>- 브랜드 전략에서의 Digital Native</li>
                          <li>- SV 혹은 진정성 브랜드 전략</li>
                        </ul>
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1d9/Course/C-LECTURE-176">
                        <ul>
                          <li>Brand Architecture 디자인</li>
                          <li>- 브랜드 아키텍쳐 : What & Why?</li>
                          <li>- Brand Hierarchy 이해 및 분석</li>
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
    menuItem: 'HR/조직 설계',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN00013"
              className="item-button"
            >
              <Image
                style={{ display: 'inline' }}
                src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
                alt=""
              />
              과정 바로가기
            </a>
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
            <Image src={`${PUBLIC_URL}/images/all/enter-category.png`} alt="" style={{float:"right",marginBottom:"0.5rem"}}/>

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
                      <a href="https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-30">
                        조직 Design
                      </a>
                    </h3>
                    <div className="con_box">
                      <div className="con_sub_box">
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-11i/Course/C-LECTURE-wr">
                          <ul>
                            <li>조직 설계 Workshop</li>
                            <li>1. 조직 설계 Workshop</li>
                          </ul>
                        </a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-11b/Course/C-LECTURE-wv">
                          <ul>
                            <li>조직 설계 방법론</li>
                            <li>1. 조직 설계 방법론 : Star Model</li>
                            <li>2. 조직 설계 실무 Approach</li>
                          </ul>
                        </a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-11a/Course/C-LECTURE-ww">
                          <ul>
                            <li>조직 Self-Design</li>
                            <li>1. 조직 Self-Design : Why & What</li>
                            <li>2. 조직 Self-Design 사례</li>
                          </ul>
                        </a>
                      </div>
                    </div>
                  </div>
                  <ul className="sub_ul">
                    <li>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-11g/Course/C-LECTURE-ws">
                        조직 설계 실무 Approach (중장기적)
                      </a>
                    </li>
                    <li>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/cube/CUBE-bt7/lecture-card/LECTURE-CARD-9gn">
                        양손잡이 조직 설계 이해
                      </a>
                    </li>
                    <li>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/cube/CUBE-98w/lecture-card/LECTURE-CARD-6zj">
                        미래 Tech. 기업의 조직 설계 사례
                      </a>
                    </li>
                    <li>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-sd/Course/C-LECTURE-nu">
                        Agile 조직으로의 전환 사례
                      </a>
                    </li>
                    <li>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-sc/Course/C-LECTURE-nv">
                        SV 지향 조직 설계 방안
                      </a>
                    </li>
                    <li>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/cube/CUBE-xg/lecture-card/LECTURE-CARD-167#">
                        Org. Culture & Leader
                      </a>
                    </li>
                  </ul>
                  <Image src={`${PUBLIC_URL}/images/all/ing-10.png`} alt="" />
                </div>
              </div>

              <div className="combined-topic">
                <Image src={`${PUBLIC_URL}/images/all/ing-11.png`} alt="" />
              </div>
            </div>

            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="level_icon">
                  <Image src={`${PUBLIC_URL}/images/all/lv-01.png`} alt="" />
                  <p>개념 이해</p>
                </div>
                <div className="depth">
                  <div className="con_wrap sub02 depth">
                    <h3>
                      <a href="https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-4b">
                        HR Essentials
                      </a>
                    </h3>
                    <div className="con_box">
                      <div className="con_sub_box">
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1f0/Course/C-LECTURE-18q">
                          <ul>
                            <li>인력 확보</li>
                            <li>1. 인력 계획! 왜 해야 하는가?</li>
                            <li>2. 채용 프로세스 꼼꼼하게 확인하기</li>
                          </ul>
                        </a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1f1/Course/C-LECTURE-18p">
                          <ul>
                            <li>직무 관리</li>
                            <li>1. 직무란 무엇인가?</li>
                            <li>2. 직무분석과 직무평가 왜 필요한가?</li>
                          </ul>
                        </a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1f4/Course/C-LECTURE-18o">
                          <ul>
                            <li>보상</li>
                            <li>1. 보상 운영을 위해 꼭 알아야 할 것들</li>
                            <li>2. 보상 제도 어떻게 변화하였나</li>
                          </ul>
                        </a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1f3/Course/C-LECTURE-18n">
                          <ul>
                            <li>성과 관리</li>
                            <li>1. 성과 관리와 평가, 꼭 해야 하나요?</li>
                            <li>2. 성과 관리 프로세스 핵심 요약!</li>
                          </ul>
                        </a>

                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1f5/Course/C-LECTURE-18l">
                          <ul>
                            <li>Global HR</li>
                            <li>1. 주재원 제도, 제대로 이해하기</li>
                            <li>2. 반드시 알아야 할 Global Staff 관리</li>
                          </ul>
                        </a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1f6/Course/C-LECTURE-18k">
                          <ul>
                            <li>노사관계</li>
                            <li>1. 개별적 근로 관계의 이해</li>
                            <li>2. 비정규직 제도의 이해</li>
                          </ul>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="depth">
                  <div className="con_wrap sub02 depth">
                    <h3>
                      <a href="https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-30">
                        조직 Design
                      </a>
                    </h3>
                    <div className="con_box">
                      <div className="con_sub_box">
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-11k/Course/C-LECTURE-wx">
                          <ul>
                            <li>조직 설계의 기본 원칙과 사례</li>
                            <li>1. 조직 설계의 기본 원칙</li>
                            <li>2. 조직 설계 New Trend</li>
                            <li>3. 기업 사례 ( MS, SKHY )</li>
                          </ul>
                        </a>
                      </div>
                    </div>
                  </div>
                  <ul className="sub_ul">
                    <li>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-rx/Course/C-LECTURE-nn">
                        조직 설계 길라잡이
                      </a>
                    </li>
                    <li>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/cube/CUBE-8ut/lecture-card/LECTURE-CARD-6uk">
                        조직 설계 Tip : Smart Design
                      </a>
                    </li>
                    <li>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/cube/CUBE-952/lecture-card/LECTURE-CARD-6uj">
                        조직 설계 효과성 측정
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
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN0007m"
              className="item-button"
            >
              <Image
                style={{ display: 'inline' }}
                src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
                alt=""
              />
              과정 바로가기
            </a>
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

        {/* 컬리지 콘텐츠 */}
        <div className="college-link-box">
          <div className="belt">
            <Image src={`${PUBLIC_URL}/images/all/enter-category.png`} alt="" style={{float:"right",marginBottom:"0.5rem"}}/>

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
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1f8/Course/C-LECTURE-18r">
                        <ul>
                          <li>기업 성공을 위한 전략적 구매</li>
                          <li>- 기업 전략과 기업 경쟁력 이해</li>
                          <li>- 기업 전략과 일치된 구매 전략</li>
                          <li>- 기업의 성공과 구매의 역할</li>
                        </ul>
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1f9/Course/C-LECTURE-18s">
                        <ul>
                          <li>전략적 공급자 관리</li>
                          <li>- 공급자 관리의 두 방법 - 협력과 경쟁</li>
                          <li>- 공급자 육성 및 성과공유제</li>
                          <li>- SRM & 구매체스보드의 이해</li>
                        </ul>
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1fa/Course/C-LECTURE-18u">
                        <ul>
                          <li>구매와 타 부서와의 협력과 연계</li>
                          <li>- 개발과 구매의 연계 - 개발 구매</li>
                          <li>- 타부서와 구매의 연계</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1fb/Course/C-LECTURE-18v">
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
                      </a>
                    </div>
                  </div>
                </div>

                <Image src={`${PUBLIC_URL}/images/all/ing-04.png`} alt="" />

                <div className="con_wrap sub02">
                  <div className="level_icon">
                    <Image src={`${PUBLIC_URL}/images/all/lv-01.png`} alt="" />
                    <p>개념 이해</p>
                  </div>
                  <h3>구매 Essentials</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1bk/Course/C-LECTURE-15a">
                        <ul>
                          <li>나는 진정한 구매인인가, 구매의 본질</li>
                          <li>- 구매 업무의 이해</li>
                          <li>- 구매 업무의 5R 이해</li>
                          <li>- 구매 업무의 핵심</li>
                          <li>- 발전하고 변화하는 구매관리</li>
                        </ul>
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1bo/Course/C-LECTURE-15h">
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
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1bm/Course/C-LECTURE-15c">
                        <ul>
                          <li>
                            나는 무엇을 구매하고 있나, 구매 품목의 이해 및 관리
                          </li>
                          <li>- 구매 품목의 분류 및 관리</li>
                          <li>- 품목 분류에 따른 자재관리 전략</li>
                          <li>- 서비스/용역 품목의 이해</li>
                        </ul>
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1bq/Course/C-LECTURE-15f">
                        <ul>
                          <li>방심은 금물, 구매 위험 관리</li>
                          <li>- Intro : 타이레놀 위험 관리</li>
                          <li>- 구매 위험 관리 및 조달 연속성 계획</li>
                          <li>- 구매 자제 가격 변동 위험 관리</li>
                          <li>- 팬데믹 시대와 구매 위험관리</li>
                        </ul>
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1br/Course/C-LECTURE-15e">
                        <ul>
                          <li>디지털 구매 혁신</li>
                          <li>- 디지털 혁신의 핵심적 이해</li>
                          <li>- 디지털 구매 혁신방안</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1bl/Course/C-LECTURE-15b">
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
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1bp/Course/C-LECTURE-15g">
                        <ul>
                          <li>알수록 돈버는, 구매인을 위한 재무/회계/물류</li>
                          <li>- 계좌등록관리</li>
                          <li>- Incoterms 2020 이해와 적용</li>
                          <li>- 공급사 신용 및 재무분석</li>
                          <li>- 무역보험/수입보험 실무</li>
                          <li>- 수입통관, 관세와 부가세</li>
                        </ul>
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1bn/Course/C-LECTURE-15i">
                        <ul>
                          <li>구매 원가 관리</li>
                          <li>- 구매 원가의 전략적 의미</li>
                          <li>- 가격 분석 및 가격 적정성 검토</li>
                          <li>- 원가 분석의 의미와 원가 분석 기법</li>
                          <li>- TCO ( Total Cost of Ownership ) 이해</li>
                          <li>- TCO ( Total Cost of Ownership ) 활용</li>
                          <li>- 목표원가 및 가치분석</li>
                        </ul>
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1bs/Course/C-LECTURE-15d">
                        <ul>
                          <li>기업의 사회적 가치와 구매</li>
                          <li>- 구매와 ESG, SV 실천 (1)</li>
                          <li>- 구매와 ESG, SV 실천 (2)</li>
                        </ul>
                      </a>
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
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN0007l"
              className="item-button"
            >
              <Image
                style={{ display: 'inline' }}
                src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
                alt=""
              />
              과정 바로가기
            </a>
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
            <Image src={`${PUBLIC_URL}/images/all/enter-category.png`} alt="" style={{float:"right",marginBottom:"0.5rem"}}/>

            {/* 컬리지 콘텐츠 전체 틀 */}
            <div className="legal-wrap">
              <div className="fundamental-topic">
                <div className="con_wrap sub01">
                  {/* Level 사이드 */}
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
                    <a href="https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-4d">
                      공정거래법
                    </a>
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/cube/CUBE-cb3/lecture-card/LECTURE-CARD-9sl">
                        <ul>
                          <li>공정거래법 Overview</li>
                          <li>- 공정거래법 이해 및 정책 방향</li>
                        </ul>
                      </a>

                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1d0/Course/C-LECTURE-16k">
                        <ul>
                          <li>전략적 공급자 관리</li>
                          <li>- 부당 지원/사익 편취 이해하기</li>
                          <li>- 부당 지원의 법리와 사례 연구</li>
                          <li>- 공정위 최근 규제 동향 및 심결례 연구</li>
                        </ul>
                      </a>

                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1bz/Course/C-LECTURE-15o">
                        <ul>
                          <li>불공정 거래와 부당표시 광고</li>
                          <li>- 불공정 거래행위 이해하기</li>
                          <li>- 불공정 거래행위 중요 법리/사례 연구</li>
                        </ul>
                      </a>

                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1c0/Course/C-LECTURE-15p">
                        <ul>
                          <li>경제력 집중 억제</li>
                          <li>- 공정거래법상 기업집단 규제 이해하기</li>
                          <li>- 공정위 최근 규제 사례 소개 및 시사점</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1bw/Course/C-LECTURE-15n">
                        <ul>
                          <li>기업결합의 제한</li>
                          <li>- M&A, 기업결합신고 필요한가?</li>
                          <li>- 기업결합은 어떤 경우에 규제되는가?</li>
                          <li>- 혼합결합이 왜 문제가 되는가?</li>
                        </ul>
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1c1/Course/C-LECTURE-15q">
                        <ul>
                          <li>시장 지배적 지위 남용 행위</li>
                          <li>- 시장 지배적 지위 남용 행위 이해하기</li>
                          <li>- 주요 법리와사례 연구</li>
                          <li>- 동의의결 사례 연구</li>
                        </ul>
                      </a>

                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1c2/Course/C-LECTURE-15r">
                        <ul>
                          <li>부당한 공동행위</li>
                          <li>- 부당한 공동행위 알아보기</li>
                          <li>- 부당한 공동행위 사례 연구</li>
                        </ul>
                      </a>

                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1c3/Course/C-LECTURE-15s">
                        <ul>
                          <li>하도급법</li>
                          <li>- 하도급법 알아보기</li>
                          <li>- 하도급법 주요 법리와 사례 연구</li>
                          <li>- 기술자료제공 요구 및 유용행위</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="con_wrap sub01">
                  <h3>특허관리</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="" onClick={emptyAlert}>
                        <ul>
                          <li>한국 출원 제도와 법</li>
                          <li>- 특허요건사</li>
                          <li>- 특허출원</li>
                          <li>- 특허심사</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="" onClick={emptyAlert}>
                        <ul>
                          <li>한국 출원 실무</li>
                          <li>- 국문명세서 작성</li>
                          <li>- 한국 심사 대응</li>
                          <li>- 한국 심판 대응</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="" onClick={emptyAlert}>
                        <ul>
                          <li>특허활용과 매입</li>
                          <li>- 특허활용의 개요</li>
                          <li>- 특허 수익화와 IP펀드 이해</li>
                          <li>- 특허와 사업화전략</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1b1/Course/C-LECTURE-17m">
                        <ul>
                          <li>M&A와 IP Transaction</li>
                          <li>- M&A와 IP 이슈</li>
                          <li>- 이슈별 검토사항</li>
                          <li>- 기타 검토사항</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="con_wrap sub01">
                  <h3>특허 분쟁</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1b2/Course/C-LECTURE-17n">
                        <ul>
                          <li>한국 특허분쟁 실무</li>
                          <li>- 특허 심판 제도의 이해</li>
                          <li>- 무효심판</li>
                          <li>- 증거보존 실무</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1b3/Course/C-LECTURE-16n">
                        <ul>
                          <li>미국 특허분쟁 Key Points</li>
                          <li>- Discovery 단계</li>
                          <li>- Trial(Jury /Bench Trial)</li>
                          <li>- ITC 소송</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1b4/Course/C-LECTURE-16m">
                        <ul>
                          <li>특허 협상 및 라이선스</li>
                          <li>- 특허 Claim 단계</li>
                          <li>- 특허기술 협상</li>
                          <li>- Royality 협상</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>

                <Image src={`${PUBLIC_URL}/images/all/ing-01.png`} alt="" />

                <div className="con_wrap sub02">
                  <div className="level_icon">
                    <Image src={`${PUBLIC_URL}/images/all/lv-01.png`} alt="" />
                    <p>개념이해</p>
                  </div>
                  <h3>IP Mind-Set Essential</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1ei/Program/P-LECTURE-2d">
                        <ul>
                          <li>지적 재산권 101</li>
                          <li>- 지식재산권의 개념과 종류</li>
                          <li>- 특허제도 AtoZ</li>
                          <li>- 상표제도 AtoZ</li>
                        </ul>
                      </a>

                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1ea/Course/C-LECTURE-17x">
                        <ul>
                          <li>AI 특허</li>
                          <li>- AI 특허 동향</li>
                          <li>- AI 특허 장성 방법</li>
                          <li>- AI 특허 Case Study</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1am/Course/C-LECTURE-178">
                        <ul>
                          <li>연구 개발과 지식재산</li>
                          <li>- R&D에서의 특허개발의 필요성</li>
                          <li>- 선행기술 조사 및 검색</li>
                          <li>- 발명신고서 작성 가이드</li>
                        </ul>
                      </a>

                      <a href="">
                        <ul>
                          <li>특허 분쟁 개론</li>
                          <li>- 특허분쟁의 종류</li>
                          <li>- 특허분쟁의 주요 사례</li>
                          <li>- 한국 특허소송 제도</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1as/Course/C-LECTURE-177">
                        <ul>
                          <li>직무발명</li>
                          <li>- 직무발명의 이해</li>
                          <li>- 직무발명의 권리귀속 관계</li>
                          <li>- 보상제도와 발명보상 사례</li>
                        </ul>
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1au/Course/C-LECTURE-16o">
                        <ul>
                          <li>분쟁대응 문서관리</li>
                          <li>- 문서 관리 정책</li>
                          <li>- 상시 문서 관리</li>
                          <li>- 분쟁 발생시 문서 관리</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="con_wrap sub02">
                  <h3>오픈소스 Essentials</h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1av/Course/C-LECTURE-179">
                        <ul>
                          <li>오픈소스의 선형적 발전</li>
                          <li>- 오픈소스의 출현배경</li>
                          <li>- 오픈소스의 패러다임 변화와 성장 모맨텀</li>
                          <li>- 폐쇄기업의 견제에 따른 오픈소스의 성장통</li>
                        </ul>
                      </a>
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1ax/Course/C-LECTURE-17b">
                        <ul>
                          <li>오픈소스 라이선스</li>
                          <li>- 오픈소스의 정의 및 양면성</li>
                          <li>- GPI, BSD계열 라이선스 특징 및 의무사항</li>
                          <li>- 소프트웨어 공개범위</li>
                        </ul>
                      </a>
                    </div>
                    <div className="con_sub_box">
                      <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00008/course-plan/COURSE-PLAN-1aw/Course/C-LECTURE-17a">
                        <ul>
                          <li>Software, Copyright & License</li>
                          <li>- 소프트웨어 저작권의 주요 쟁점</li>
                          <li>- 소프트웨어 지식재산권과 BM</li>
                          <li>- 소프트웨어 라이선스 유형과 주요 내용</li>
                        </ul>
                      </a>
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
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN0001a"
              className="item-button"
            >
              <Image
                style={{ display: 'inline' }}
                src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
                alt=""
              />
              과정 바로가기
            </a>
          </div>
        </div>

        {/* 컬리지 텍스트 */}
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
                Decision Making & Risk Management까지 Role Level별로 성공적인
                업무수행을 위해 갖추어야 할 학습과정을 통해 좀더 나은 성과,
                Smart Working을 위한 일/잘/법을 배우고, Deep Change 실행력
                제고를 위한 기초 체력을 단단히 만들어가시기 바랍니다.
              </li>
            </ul>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image src={`${PUBLIC_URL}/images/all/ing_30.png`} alt="" />
            <div className="legal-wrap flex sub">
              <div className="fundamental-topic">
                <div className="con_wrap sub01">
                  <h3>
                    Measurement Essentials
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul>
                        <li>Customer Measure & Analytics</li>
                        <li>- 고객 측정의 기본 개념</li>
                        <li>- Customer Value 개념과 측정</li>
                        <li>- 고객 측정 지표의 활용과 한계</li>
                      </ul>
                    </div>
                    <div className="con_sub_box">
                      <ul>
                        <li>행복 지도의 이해</li>
                        <li>- 행복 지도란?</li>
                        <li>- 행복 지도 구축 Process</li>
                        <li>- 행복 측정 주요 이슈와 해결방안</li>
                      </ul>
                    </div>
                    <div className="con_sub_box">
                      <ul>
                        <li>SV 측정의 이해</li>
                        <li>- SV 측정의 원칙 및 체계</li>
                        <li>- SV 측정 사례 및 성과</li>
                        <li>- SV 측정의 이슈와 확산</li>
                      </ul>
                    </div>
                  </div>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul>
                        <li>Deep Change의 시작, 측정</li>
                        <li>- 경영 현장에서의 측정</li>
                        <li>- 인간의 동기, 행동 측정</li>
                        <li>- 사회 현상 / 문제 측정</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="combined-topic">
                <div className="con_wrap sub01">
                  <h3>
                    Negotiaion Essentials
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                        <ul>
                          <li>Negotiation 101</li>
                          <li>- 경영자에게 협상이란</li>
                          <li>- 협상 준비전략</li>
                          <li>- [Case Study] Sell Phones</li>
                        </ul>
                    </div>
                    <div className="con_sub_box">
                        <ul>
                          <li>Negotiation Essence Reading</li>
                          <li>- 협상책을 읽어주는 남자</li>
                          <li>- 협상 기본서</li>
                          <li>- 준비와 설득의 기법</li>
                        </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="legal-wrap flex sub">
              <div className="fundamental-topic">
                <div className="con_wrap sub02">
                  <h3>
                    Communication
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul className="ul_style">
                        <li>엑셀 실무 Master 1 ~ 8</li>
                        <li>검색해도 찾기 힘든 꼭 필요한 엑셀 함수</li>
                        <li>부장님은 내 기획서가 쓰레기라고 말했지</li>
                        <li>한국인이 많이 하는 이메일 영어실수 上 下 </li>
                        <li>지나가는 팀장도 돌아보는 PPT 디자인</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="combined-topic">
                <div className="con_wrap sub02">
                  <h3>
                    Problem Solving
                  </h3>
                  <div className="con_box">
                    <div className="con_sub_box">
                      <ul className="ul_style">
                        <li>10가지 키워드로 배우는 창의적 사고력</li>
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

const CollegeInnerTabView = () => (
  <Tab
    menu={{ attached: false, tabular: false }}
    panes={panes}
    className="sub-tab-menu"
  />
);

export default CollegeInnerTabView;
