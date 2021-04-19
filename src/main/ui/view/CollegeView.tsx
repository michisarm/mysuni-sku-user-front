// Publishing 파일 그대로 가져오기 때문에 eslint 비활성화
/* eslint-disable */
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { reactAlert } from '@nara.platform/accent';

import queryString from 'query-string';
import { Image, Tab } from 'semantic-ui-react';
import routePaths from '../../routePaths';
import CollegeInnerTabView from './CollegeInnerTabView';
import CollegeInnerTabAi from './CollegeInnerTabAi';
import CollegeInnerTabDt from './CollegeInnerTabDt';
import { Area } from 'tracker/model';

const emptyAlert = (e: any) => {
  e.preventDefault();
  reactAlert({
    title: '알림',
    message: '준비 중입니다.',
  });
};

function pageMove(path: string){
  // const history = useHistory();
  // history.push(path);
  alert(1);
  return (<Tab.Pane attached={false}></Tab.Pane>);
}

const PUBLIC_URL = process.env.PUBLIC_URL;

const panes = [
  {
    menuItem: 'AI',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges1"
        >
          <div className="college-cont-title ai">
            <div className="belt sub">
              <div className="label">AI College</div>
              <div className="strong">
                AI 아싸(Outsider)에서 AI 핵인싸(Insider)로!
              </div>
              <div className="normal">
                AI College는 SK 구성원 누구나 알아야 할 기본 지식을 바탕으로,
                <br />
                각 산업과 직무에서 AI를 활용하는 실무역량을 배양하고 AI기술
                전문가로
                <br />
                성장할 수 있는 기회를 제공합니다.
              </div>
              <div className="panopto sub">
                <Image src={`${PUBLIC_URL}/images/all/Ai-banner.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="college-free3 sub">
            <div className="tab-menu-wrap">
              <CollegeInnerTabAi />
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'DT',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges2"
        >
          <div className="college-cont-title dt">
            <div className="belt sub">
              <div className="label">DT College</div>
              <div className="strong">'그룹의 Deep Change는 우리 손으로!’</div>
              <div className="normal">
                Digital Skill을 장착하고 고객과 업을 이해하여,
                <br />
                SK Deep Change를 맨 앞에서 이끌어 나가실 구성원들을 위한
                과정들이,
                <br />
                여기 DT College에 마련되어 있습니다.
              </div>
              <div className="panopto sub">
                <Image src={`${PUBLIC_URL}/images/all/Dt-banner.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="college-free3 sub">
            <div className="tab-menu-wrap">
              <CollegeInnerTabDt />
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: '행복',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges3"
        >
          <div className="college-cont-title happiness">
            <div className="belt">
              <div className="label">행복 College</div>
              <div className="strong">SK 구성원 전체의 행복을 키워갑니다.</div>
              <div className="normal">
                행복에 대한 기본 개념과 SK경영철학의 이해를 기반으로 직장을
                포함한 삶 전반에서
                <br />
                행복을 증진할 수 있는 역량을 배양하고 실천함으로써, SK 구성원
                전체의 행복 추구에
                <br />
                실질적으로 기여하는 것을 목표로 합니다.
              </div>
              <div className="panopto sub">
                <Image
                  src={`${PUBLIC_URL}/images/all/happy-banner.png`}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="college-cont-map">
            <div className="belt">
              <div className="map">
                <Image
                  src={`${PUBLIC_URL}/images/all/happy_con_01.png`}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="college-cont-map">
            <div className="belt">
              <div className="map">
                <Image
                  src={`${PUBLIC_URL}/images/all/happy_con_02.png`}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="college-cont-map pbtom">
            <div className="belt">
              <div className="map">
                <Image
                  src={`${PUBLIC_URL}/images/all/happy_con_03.png`}
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
    menuItem: 'SV',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges4"
        >
          <div className="college-cont-title sv">
            <div className="belt sub">
              <div className="label">SV College</div>
              <div className="strong">
                내일[Tomorrow+My Work]을 위한 SV, <br />
                기업과 사회의 지속가능성을 위한 필수 역량을 키우는 곳!
              </div>
              <div className="normal">
                Deep Change의 방향을 제시하는 ‘사회적 가치’ <br />
                이해관계자들의 Painpoint를 공감하고 해결하는 역량을 함께
                키워봅시다!
              </div>
              <ul className="tag-wrap">
                <li># 사회문제</li>
                <li># ESG</li>
                <li># SV Biz</li>
                <li># SV 측정</li>
              </ul>
              <div className="panopto sub">
                <Image src={`${PUBLIC_URL}/images/all/sv-banner.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="college-cont-map">
            <div className="belt">
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/sv_con_01.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="college-cont-map">
            <div className="belt">
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/sv_con_02.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="college-cont-map pbtom">
            <div className="belt">
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/sv_con_03.png`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: '혁신디자인',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges5"
        >
          <div className="college-cont-title design">
            <div className="belt sub">
              <div className="label">혁신디자인 College</div>
              <div className="strong">고객을 이해하고 혁신을 디자인하라!</div>
              <div className="normal">
                고객에서 출발하는 Biz. Idea를 발굴하고, 통합적 사고로 고객의{' '}
                <br />
                문제를 해결하며, 끊임없이 일하는 방식을 혁신하는데 필요한 <br />
                구성원 및 조직의 혁신 디자인 역량 향상을 도와드립니다.
              </div>
              <div className="panopto sub">
                <iframe
                  title="audio type"
                  src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3D7658f240-2fd6-4f09-97fe-ab43006f0655"
                  width="436"
                  height="245"
                  style={{ padding: '0px', border: '0px' }}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay"
                />
              </div>
            </div>
          </div>

          <div className="college-cont-map sub2">
            <div className="belt inno">
              <div className="belt">
                <div className="text-left-box">
                  <p className="p_link inno">
                    각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
                  </p>
                </div>
                <div className="text-right-box">
                  <Link
                    to="/lecture/college/CLG00005/channels/pages/1"
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
              <div className="map">
                <Image
                  src={`${PUBLIC_URL}/images/all/design_con_01.png`}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="college-cont-map">
            <div className="belt">
              <div className="map">
                <h1 className="inno-title">
                  “ <strong>통합적 사고</strong>에 기반한{' '}
                  <strong>고객중심</strong> 문제해결,{' '}
                  <strong>일하는 방식</strong> 혁신 ”
                </h1>
                <div className="inno-top-btn">
                  <span>개설예정</span>
                </div>
                <div className="inno-wrap">
                  <Image
                    src={`${PUBLIC_URL}/images/all/inno-level.png`}
                    alt=""
                  />

                  <div className="inno-item fi-item">
                    <h3># 디자인씽킹</h3>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="two dashed">
                            <Link to="#" onClick={emptyAlert}>
                              디자인씽킹 <br />
                              코칭 스킬
                            </Link>
                          </td>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <td></td>
                          <td></td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <Link to="/lecture/card/CARD-2/cube/CUBE-3/view/ClassRoomLecture">
                              디자인씽킹 <br />
                              Project
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-6xo/view">
                              디자인씽킹
                              <br />
                              Team W/S
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-ag7/view">
                              디자인씽킹 <br />
                              Workshop
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-7pk/view">
                              디자인씽킹 Self <br />
                              실습 (SV사례)
                            </Link>
                          </td>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <td className="dashed">
                            <Link to="#" onClick={emptyAlert}>
                              서비스 디자인 <br />
                              Intensive
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-8cr/view">
                              From Ideas to <br />
                              Action - IDEO
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-8ct/view">
                              Human-Centered <br />
                              Service Design - IDEO
                            </Link>
                          </td>
                          <td className="dashed">
                            <Link to="#" onClick={emptyAlert}>
                              기술에서 고객 중심 <br />
                              Biz - Self 실습
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <Link to="/lecture/card/CARD-7pb/view">
                              디자인씽킹 사례 <br />
                              (SV)보며 익히기
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-13c/view">
                              디자인씽킹 - <br />
                              Linkedin
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-aac/view">
                              Hello Design <br />
                              Thinking - IDEO
                            </Link>
                          </td>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <td></td>
                          <td className="dashed">
                            <Link to="#" onClick={emptyAlert}>
                              기술에서 고객 중심 <br />
                              Biz 고민하기
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-86m/view">
                              디자인 사고 연습
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="two">
                            <Link to="/lecture/card/CARD-1f0/view">
                              처음 만나는 <br />
                              디자인씽킹
                            </Link>
                          </td>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <td>
                            <Link to="/lecture/card/CARD-6f3/view">
                              창의적 <br />
                              IDEA 발상법
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-1ew/view">
                              Biz. Ideation
                              <br /> 첫걸음
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="inno-item">
                    <h3># 로지컬씽킹</h3>
                    <div className="logical-box">
                      <div className="logical-list tab01">
                        <ul>
                          <li>
                            <Link to="#" onClick={emptyAlert}>
                              컨설턴트의 일하는 <br />
                              스킬 익히기 <br />
                              (Lv.2)
                            </Link>
                          </li>
                          <li>
                            <Link to="#" onClick={emptyAlert}>
                              컨설턴트의 일하는 <br />
                              스킬 익히기 <br />
                              (Lv.1)
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="inno-item">
                    <h3># 고객알기</h3>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td></td>
                          <td></td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <Link to="/lecture/card/CARD-8cs/view">
                              Insights for <br />
                              Innovation - IDEO
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td></td>
                          <td>
                            <Link to="/lecture/card/CARD-5js/view">
                              고객 Research <br />
                              방법
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-5j8/view">
                              고객 Needs <br />
                              Finding
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="two">
                            <Link to="/lecture/card/CARD-1f4/view">
                              고객 <br />
                              Need란?
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="inno-item">
                    <h3># 워킹백워드</h3>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td></td>
                          <td></td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td></td>
                          <td></td>
                          <td>
                            <Link to="/lecture/card/CARD-7j3/cube/CUBE-a2j/view/ClassRoomLecture">
                              워킹백워드 <br />
                              Project
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-7pa/view">
                              워킹백워드 <br />
                              Workshop_online
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td></td>
                          <td></td>
                          <td>
                            <Link to="/lecture/card/CARD-5mq/view">
                              워킹백워드 <br />
                              Tools
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="two">
                            <Link to="/lecture/card/CARD-1es/view">
                              처음 만나는 <br />
                              워킹백워드
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="inno-item orange">
                    <h3># 애자일</h3>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <Link to="/community/COMMUNITY-1n">
                              애자일 코치 <br />
                              Meetup
                            </Link>
                          </td>
                          <td className="dashed-or">
                            <Link to="#" onClick={emptyAlert}>
                              애자일 코치 <br />
                              양성 과정
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <Link to="/lecture/card/CARD-4vu/cube/CUBE-781/view/ClassRoomLecture">
                              애자일 Project
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-8j1/view">
                              애자일 리더십 <br />
                              Workshop
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-53b/cube/CUBE-7id/view/ClassRoomLecture">
                              애자일 Project
                              <br />
                              Management <br />
                              W/S
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-7dd/view">
                              애자일 <br />
                              Workshop
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <Link to="/lecture/card/CARD-13d/view">
                              Agile Management <br />- Linkedin
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-5c4/view">
                              애자일 방법론 <br />- Linkedin
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-6zk/view">
                              SK 네트웍스 구매팀 <br />
                              애자일 사례
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="small">
                            <Link to="/lecture/card/CARD-7np/view">
                              애자일 방법론 기초
                            </Link>
                          </td>
                          <td className="small">
                            <Link to="/lecture/card/CARD-84k/view">
                              애자일 에센셜
                            </Link>
                          </td>
                          <td className="small">
                            <Link to="/lecture/card/CARD-52y/view">
                              처음 만나는 애자일
                            </Link>
                          </td>
                          <td className="small">
                            <Link to="/lecture/card/CARD-1ev/view">
                              Why 애자일
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="inno-item orange">
                    <h3># 오픈콜라보</h3>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td></td>
                          <td></td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td></td>
                          <td></td>
                          <td className="dashed-or">
                            <Link to="#" onClick={emptyAlert}>
                              오픈 이노베이션 <br />
                              Workshop
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-69v/view">
                              퓨처캐스팅 <br />
                              Workshop
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <Link to="/lecture/card/CARD-1et/view">
                              Futurecasting
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-1ez/view">
                              All about <br />
                              오픈 이노베이션
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-7lo/view">
                              Creative Collabo <br />
                              Skills - Linkedin
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="two">
                            <Link to="/lecture/card/CARD-1eu/view">
                              Open
                              <br />
                              Collaboration
                              <br />
                              Tips
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="inno-bottom-wrap">
                  <div className="inno-bottom con01">
                    <ul>
                      <li>
                        <Link to="/lecture/card/CARD-1f3/view">
                          Deep Change와
                          <br />
                          Design 이해
                        </Link>
                      </li>
                      <li>
                        <Link to="/lecture/card/CARD-1f2/view">
                          고객 이해의 중요성 <br />
                          Remind!
                        </Link>
                      </li>
                      <li>
                        <Link to="/lecture/card/CARD-139/view">
                          YouTube <br />
                          디자인 사고 이해
                        </Link>
                      </li>
                      <li>
                        <Link to="/lecture/card/CARD-6om/view">
                          혁신의 비법
                        </Link>
                      </li>
                      <li>
                        <Link to="/lecture/card/CARD-1er/view">
                          Leading with
                          <br />
                          Innovation
                        </Link>
                      </li>
                    </ul>
                    <h3># Deep Change와 Design</h3>
                  </div>

                  <div className="inno-bottom con02">
                    <ul>
                      <li>
                        <Link to="/lecture/college/CLG00005/channel/CHN0000q">
                          Trend &#38; Insight <br />
                          Report
                        </Link>
                      </li>
                      <li>
                        <Link to="/lecture/card/CARD-5p3/view">
                          도약을 위한 <br />
                          미래 디자인
                        </Link>
                      </li>
                      <li>
                        <Link to="/lecture/card/CARD-502/view">
                          효율적으로 <br />
                          일하는 Tip
                        </Link>
                      </li>
                    </ul>
                    <h3># 혁신 트렌드와 인사이트</h3>
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
    menuItem: 'Global',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges6"
        >
          <div className="college-cont-title global">
            <div className="belt sub">
              <div className="label">Global College</div>
              <div className="strong">Globalization을 위한 새로운 시작</div>
              <div className="normal">
                글로벌 비즈니스의 판을 읽는 'Global Perspective'를 키우고 환경이
                바뀌어도
                <br />
                성과를 만들어 낼 수 있는 ‘Global Manager’를 키우는 것을 목표로
                합니다.
                <br />
                이를 통해 SK그룹의 Globalization에 필요한 Human Capital들을
                길러내고자 합니다.
              </div>
              <ul className="tag-wrap">
                <li># Geopolitics & Biz</li>
                <li># Managing Global Biz</li>
                <li># 지역 전문가</li>
                <li># Glopedia</li>
                <li># Global Leader's Table</li>
              </ul>
              <div className="panopto sub">
                <iframe
                  title="audio type"
                  src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3D80b7b6d1-c2e6-41c0-9d93-ab42005d5dbf%26offerviewer%3Dfalse%26showtitle%3Dfalse%26interactivity%3Dnone%26showbrand%3Dfalse"
                  width="436"
                  height="245"
                  style={{ padding: '0px', border: '0px' }}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay"
                />
              </div>
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt">
              <div className="label">Geopolitics & Biz / Managing Global Biz. 커리큘럼</div>
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/img-co-6-1.png`} alt="" />
              </div>
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt">
              <div className="label">지역전문가 커리큘럼</div>
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/img-co-6-2.png`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Leadership',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges7"
        >
          <div className="college-cont-title leadership">
            <div className="belt sub">
              <div className="label">Leadership College</div>
              <div className="strong">Deep Change Leader로 성장!</div>
              <div className="normal">
                개인별 리더십 진단과 맞춤형 역량 개발 가이드를 지원하고
                <br />
                최신 컨텐츠와 효과적인 학습 환경을 제공하여, 모든 구성원이
                스스로를 성장시키고,
                <br />
                다른 사람의 변화를 촉진하며, 회사(BM,조직)를 혁신하는
                <br />
                Deep Change Leader로 성장하도록 돕습니다.
              </div>
              <ul className="tag-wrap">
                <li># Leading Myself</li>
                <li># Leading People</li>
                <li># Leading Business</li>
                <li># Leadership Clinic</li>
                <li># Deep Change Leadership</li>
              </ul>

              <div className="panopto sub">
                <iframe
                  title="audio type"
                  src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3D0b02b5c8-a5b7-438f-9366-ab4200a3bd77%26offerviewer%3Dfalse%26showtitle%3Dfalse%26interactivity%3Dnone%26showbrand%3Dfalse"
                  width="436"
                  height="245"
                  style={{ padding: '0px', border: '0px' }}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay"
                />
              </div>
            </div>
          </div>

          <div className="college-cont-map">
            <div className="belt fu">
              <div className="text-left-box">
                <p className="p_link ">
                  각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
                </p>
              </div>
              <div className="text-right-box">
                <Link
                  to="/lecture/college/CLG00007/channels/pages/1"
                  className="item-button"
                >
                  <Image
                    src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
                    alt=""
                    style={{ display: 'inline-block' }}
                  />
                  과정 바로가기
                </Link>
              </div>
            </div>
            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="map">
                <div className="ai-top-btn leaderShip">
                  <span className="ai-btn01 leader">VoD</span>
                  <span className="ai-btn02 leader sub">Non-VoD</span>
                </div>
                <Image
                  src={`${PUBLIC_URL}/images/all/leadership-level.png`}
                  alt=""
                  style={{ float: 'left' }}
                />
                <div className="link_wrapper leadership">
                  <div className="leadership_box bg1">
                    <h3>Deep change Leadership</h3>
                    <div className="leadership_list">
                      <ul>
                        <li className="margin_25">
                          <div className="badge_box1 left">
                            <Link
                              to="/certification/badge/badge-detail/BADGE-38"
                              className="card-badge-link"
                            >
                              <Image
                                src={`${PUBLIC_URL}/images/all/img-card-badge-lv-3.png`}
                                alt=""
                              />
                            </Link>
                          </div>
                          <Link to="/lecture/card/CARD-9l6/view">
                            Leader as Coach
                            <br />
                            Advanced P/G
                          </Link>
                        </li>
                        <li>
                          <div className="badge_box1 left">
                            <Image
                              src={`${PUBLIC_URL}/images/all/img-card-badge-lv-2.png`}
                              alt=""
                            />
                          </div>
                          <Link to="#" onClick={emptyAlert}>
                            Organization
                            <br />
                            Transformation
                          </Link>
                        </li>
                        <li>
                          <div className="badge_box1 left">
                            <Link
                              to="/certification/badge/badge-detail/BADGE-37"
                              className="card-badge-link"
                            >
                              <Image
                                src={`${PUBLIC_URL}/images/all/img-card-badge-lv-2.png`}
                                alt=""
                              />
                            </Link>
                          </div>
                          <Link to="/lecture/card/CARD-acn/view">
                            Leader as Coach P/G
                          </Link>
                        </li>
                        <li>
                          <div className="badge_box1 left">
                            <Image
                              src={`${PUBLIC_URL}/images/all/img-card-badge-lv-2.png`}
                              alt=""
                            />
                          </div>
                          <Link to="#" onClick={emptyAlert}>
                            Leadership
                            <br />
                            Transformation
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/lecture/card/CARD-729/view"
                            className="leader_blue"
                          >
                            진정성이 이끄는 리더의 길
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/lecture/card/CARD-69m/view"
                            className="leader_blue"
                          >
                            Deep Change &#38; 리더십?- 목적 기반의
                            <br />
                            딥체인지 실천 가이드
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="leadership_list bottom">
                      <ul>
                        <li>
                          <Link
                            to="/lecture/card/CARD-5uk/view"
                            className="leader_blue"
                          >
                            딥체인지와 기업문화 혁신
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/lecture/card/CARD-6y9/view"
                            className="leader_blue"
                          >
                            영화로 만나는
                            <br />
                            Deep Change Leadership
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/lecture/card/CARD-1gt/view"
                            className="leader_blue"
                          >
                            Deep Change Leadership 이해
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* //leadership_box bg1 */}
                  <div className="leadership_box bg2">
                    <h3>Leadership Foundation</h3>
                    <ul>
                      <li
                        className="leader_boxwrap margin_sm"
                        onClick={emptyAlert}
                      >
                        <p className="non-link">
                          Global Leadership
                          <br />
                          Acceleration P/G
                        </p>
                        <Link to="#" onClick={emptyAlert}>
                          Remote Performance Mgmt.
                        </Link>
                        <Link to="#" onClick={emptyAlert}>
                          Impactful Conversation
                        </Link>
                        <Link to="#" onClick={emptyAlert}>
                          Drives for Engagement
                        </Link>
                        <Link to="#" onClick={emptyAlert}>
                          Leveraging Conflict
                        </Link>
                        <Link to="#" onClick={emptyAlert}>
                          EQ Leadership
                        </Link>
                      </li>
                      <li className="leader_boxwrap col-blue margin_sm">
                        <div className="badge_box1 left">
                          <Link
                            to="/certification/badge/badge-detail/BADGE-36"
                            className="card-badge-link"
                          >
                            <Image
                              src={`${PUBLIC_URL}/images/all/img-card-badge-lv-1.png`}
                              alt=""
                            />
                          </Link>
                        </div>
                        <p className="non-link">Leadership Essentials</p>
                        <Link
                          to="/lecture/card/CARD-6ch/view"
                          className="bg_blue"
                        >
                          전략적 사고
                        </Link>
                        <Link
                          to="/lecture/card/CARD-5xc/view"
                          className="bg_blue"
                        >
                          Remote Leadership
                        </Link>
                        <Link
                          to="/lecture/card/CARD-71i/view"
                          className="bg_blue"
                        >
                          Coaching Leadership
                        </Link>
                        <Link
                          to="/lecture/card/CARD-71h/view"
                          className="bg_blue"
                        >
                          리더의 스토리텔링
                        </Link>
                        <Link
                          to="/lecture/card/CARD-7fj/view"
                          className="bg_blue"
                        >
                          스마트한 리더의 위임
                        </Link>
                        <Link
                          to="/lecture/card/CARD-8yh/view"
                          className="bg_blue"
                        >
                          Motivation Designer
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/lecture/card/CARD-ack/view"
                          className="leader_blue"
                        >
                          갈등의 재발견
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/lecture/card/CARD-1gq/view"
                          className="leader_blue"
                        >
                          Leadership Self-Assessment
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="leadership_box bg3">
                    <h3>Leadership Clinic</h3>
                    <ul>
                      <li className="leader_boxwrap col-blue">
                        <p className="non-link">Leadership Pain Points</p>
                        <Link
                          to="/lecture/card/CARD-1fg/view"
                          className="bg_blue"
                        >
                          자기성장
                        </Link>
                        <Link
                          to="/lecture/card/CARD-1fj/view"
                          className="bg_blue"
                        >
                          Performance
                        </Link>
                        <Link
                          to="/lecture/card/CARD-1fi/view"
                          className="bg_blue"
                        >
                          시너지/협업
                        </Link>
                        <Link
                          to="/lecture/card/CARD-1fh/view"
                          className="bg_blue"
                        >
                          건강한 조직 운영
                        </Link>
                        <Link
                          to="/lecture/card/CARD-1fk/view"
                          className="bg_blue"
                        >
                          구성원 육성
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/lecture/card/CARD-65j/view"
                          className="leader_blue"
                        >
                          리더의 세계 Ⅰ, Ⅱ
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/lecture/card/CARD-5id/view"
                          className="leader_blue"
                        >
                          1on1 미팅
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="leadership_box bg4">
                    <h3>Leadership Insight Cafe</h3>
                    <ul>
                      <li className="leader_boxwrap col-blue">
                        <p className="non-link">리더십, 인문학에 길을 묻다</p>
                        <Link
                          to="/lecture/card/CARD-5xh/view"
                          className="bg_blue"
                        >
                          카르마 &#38; 다르마
                        </Link>
                        <Link
                          to="/lecture/card/CARD-8r6/view"
                          className="bg_blue"
                        >
                          고난의 시대에 미래를 보는 리더십
                        </Link>
                      </li>
                      <li className="leader_boxwrap col-blue">
                        <p className="non-link">
                          심리학으로 풀어보는 리더십 Talk
                        </p>
                        <Link
                          to="/lecture/card/CARD-59v/view"
                          className="bg_blue"
                        >
                          I. 변화의 시작
                        </Link>
                        <Link
                          to="/lecture/card/CARD-5pr/view"
                          className="bg_blue"
                        >
                          II. 이런 고민 있나요?
                        </Link>
                        <Link
                          to="/lecture/card/CARD-671/view"
                          className="bg_blue"
                        >
                          III. 리더라서 고민이다
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/lecture/card/CARD-7kq/view"
                          className="leader_blue"
                        >
                          세대 이해 – 86, X, MZ
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* //link_wrapper */}
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Management',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges8"
        >
          <div className="college-cont-title management">
            <div className="belt sub">
              <div className="label">Management College</div>
              <div className="strong">
                Deep Change를 위해 내가 하는 일은 어떻게 바뀌어야 할까요?
                <br />
                어떻게 성장할 수 있을까요?
              </div>
              <div className="normal">
                Management College는 Deep Change를 위한 Biz. 실행 역량 제고를
                위해 6개 Function Group, 1개 Competency 영역의 직무 역량 학습을
                제공합니다. Function Group별 지식/전문성 뿐 아니라 여러
                Function간 결합을 통한 융합/통합 역량 확보도 계획하고 있습니다.
              </div>
              <div className="panopto sub">
                <iframe
                  title="audio type"
                  src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3Db1ebc675-879d-4a0c-a336-ab43009f4752"
                  width="436"
                  height="245"
                  style={{ padding: '0px', border: '0px' }}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay"
                />
              </div>
            </div>
          </div>
          <div className="college-free3 sub">
            <div className="tab-menu-wrap">
              <CollegeInnerTabView />
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: '미래반도체',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges9"
        >
          <div className="college-cont-title semicond">
            <div className="belt sub">
              <div className="label">미래 반도체 College</div>
              <div className="strong">반도체, 미래를 보는 눈을 뜨다.</div>
              <div className="normal">
                SK 구성원 누구에게나 도움이 될 반도체 소양을 높여줄 뿐 아니라{' '}
                <br />
                반도체 산업의 본질을 파악하고, 미래의 기술이 열어갈 세상을 전망
                할 수 <br />
                있도록 도와드립니다.
              </div>
              <div className="panopto sub">
                <iframe
                  title="audio type"
                  src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3Dfbe4050a-7d9d-40bb-a819-ab89007cb3cd%26offerviewer%3Dfalse%26showtitle%3Dfalse%26interactivity%3Dnone%26showbrand%3Dfalse"
                  width="436"
                  height="245"
                  style={{ padding: '0px', border: '0px' }}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay"
                />
              </div>
              <ul className="tag-wrap">
                <li># 반도체 역사</li>
                <li># 반도체 산업 전망</li>
                <li># 반도체 용어</li>
                <li># 반도체 기술 이론</li>
                <li># 반도체 종류</li>
                <li># 미래 기술</li>
                <li># 반도체 Ecosystem</li>
              </ul>
            </div>
          </div>

          <div className="college-cont-map pbtom">
            <div className="belt fu">
              <div className="text-left-box">
                <p className="p_link ">
                  각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
                </p>
              </div>
              <div className="text-right-box">
                <Link
                  to="/lecture/college/CLG00019/channels/pages/1"
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
              <div className="label">전체 커리큘럼</div>
              <div className="semi-topBackground"/>
              <div className="map">
                <div className="semi-background">
                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan">
                        <div className="semi_txt">
                          <h3>
                            AI Manufacturing <br />
                            Professional
                          </h3>
                          <p>
                            반도체 Engineering + AI/DT접목, <br />
                            제조 IT시스템 최적화 역량 확보로
                            <br /> AI manufacturing 전문가로 <br />
                            Continuous 성장 지원
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle">
                          <ul>
                            <li>
                              <Link
                                to={`${semiconductorLinks['반도체 FAB 생산 운영 전문가']}`}
                              >
                                반도체 FAB 생산 운영 전문가
                              </Link>
                            </li>
                            <li className="dashed">
                              <Image
                                src={`${PUBLIC_URL}/images/all/badge-open-blue.png`}
                                alt=""
                              />
                              <Link to="#" onClick={emptyAlert}>
                                Smart SCM 전문가
                              </Link>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <Link
                                to={`${semiconductorLinks['반도체 FAB 최적화 전문가']}`}
                              >
                                반도체 FAB 최적화 전문가
                              </Link>
                            </li>
                            <li className="dashed">
                              <Image
                                src={`${PUBLIC_URL}/images/all/badge-open-blue.png`}
                                alt=""
                              />
                              <Link to="#" onClick={emptyAlert}>
                                AI manufacturing <br />
                                Project (PBL)
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="semi_badge">
                        <h4>AI Manufacturing Professional</h4>
                        <dl>
                          <dt>Badge 유형</dt>
                          <dd>미래Biz</dd>
                        </dl>
                        <dl>
                          <dt>Level</dt>
                          <dd>★ ★ ★</dd>
                        </dl>
                        <dl>
                          <dt>인증내용</dt>
                          <dd>
                            AI 활용한 반도체 수요예측, 최적의 생산계획 및 의사결
                            정 역량을 내재화한 전문가
                          </dd>
                        </dl>
                        <dl>
                          <dt>획득 요건</dt>
                          <dd>
                            Course 이수 / Project
                            <br /> 수행 및 pass
                          </dd>
                        </dl>
                        <button type="button" onClick={emptyAlert}>
                          OPEN 예정
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan">
                        <div className="semi_txt">
                          <h3>
                            Hot emerging <br />
                            Tech Insight
                          </h3>
                          <p>
                            미래 반도체 응용 분야별
                            <br />폭 넓은 이해 및 New Biz 창출 위한
                            <br />
                            ‘미래 Biz/Tech 탐색의 장’
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle ver-top">
                          <ul>
                            <li>
                              <Link
                                to={`${semiconductorLinks['AI반도체 - Next Tech Trend']}`}
                              >
                                AI반도체
                                <br />
                                <span>Next Tech Trend</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['자동차 반도체, 기회와 도전']}`}
                              >
                                자동차 반도체, 기회와 도전
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['Next Generation Semiconductor Packaging Technology']}`}
                              >
                                Next Generation Semiconductor
                                <br />
                                Packaging Technology
                              </Link>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <Link
                                to={`${semiconductorLinks['Neuromorphic Computing : Challenges and Opportunities']}`}
                              >
                                Neuromorphic Computing <br />
                                <span>Challenges and Opportunities</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['양자 컴퓨팅과 양자 암호 기술의 현재와 미래']}`}
                              >
                                양자 컴퓨팅과 양자 암호 <br />
                                기술의 현재와 미래
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan conHeight01">
                        <div className="semi_txt">
                          <h3>
                            Smart factory <br />
                            Fundamental
                          </h3>
                          <p>
                            Smart factory의 기본개념 및 <br />
                            구성요소, 실제 반도체 FAB <br />
                            자동화 System 이해
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle pad">
                          <ul>
                            <li>
                              <Link
                                to={`${semiconductorLinks['Smart Factory구현을 위한 제조 시스템 이해와 의사결정']}`}
                              >
                                Smart Factory 구현을 위한 <br />
                                제조 시스템 이해와 의사결정
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['Smart Factory 시스템의 연결과 지능화']}`}
                              >
                                Smart Factory <br />
                                시스템의 연결과 지능화
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['AI 알고리즘 기반 반도체 Factory']}`}
                              >
                                AI 알고리즘 기반
                                <br />
                                반도체 Factory
                              </Link>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <Link
                                to={`${semiconductorLinks['Smart Factory의 구성요소와 사례']}`}
                              >
                                Smart Factory의 <br />
                                구성요소와 사례
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['첨단 기술과 제조의 만남']}`}
                              >
                                첨단 기술과 제조의 만남
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['반도체 FAB 자동화 이해']}`}
                              >
                                반도체 FAB 자동화 이해
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="semi_badge">
                        <h4>Smart factory Fundamental</h4>
                        <dl>
                          <dt>Badge 유형</dt>
                          <dd>미래Biz</dd>
                        </dl>
                        <dl>
                          <dt>Level</dt>
                          <dd>★ ★</dd>
                        </dl>
                        <dl>
                          <dt>인증내용</dt>
                          <dd>
                            Smart Factory의 기본
                            <br />
                            개념과 AI 기반 반도체 제조
                            <br />
                            IT시스템 이해
                          </dd>
                        </dl>
                        <dl>
                          <dt>획득 요건</dt>
                          <dd>
                            Course 이수 / Test 및<br /> 실습과제 수행
                          </dd>
                        </dl>
                        <button type="button" onClick={emptyAlert}>
                          OPEN 예정
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan">
                        <div className="semi_txt">
                          <h3>
                            반도체 소재 <br />
                            Fundamental
                          </h3>
                          <p>
                            반도체 소재의 물성 이해 및 개발에
                            <br />
                            필요한 기초 이론과 반도체 공정 응용을 <br />
                            포괄적으로 학습
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle ver-top">
                          <ul>
                            <li>
                              <Link to={`${semiconductorLinks['첨단 소재']}`}>
                                첨단 소재
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['Lithography 공정 및 소재']}`}
                              >
                                Lithography 공정 및 소재
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['Metallization 공정 및 소재']}`}
                              >
                                Metallization 공정 및 소재
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['Solar Cell 소자 및 소재']}`}
                              >
                                Solar Cell 소자 및 소재
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['Thin Film 공정 및 소재']}`}
                              >
                                Thin Film 공정 및 소재
                              </Link>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <Link
                                to={`${semiconductorLinks['Image Sensor 소자 및 소재']}`}
                              >
                                Image Sensor 소자 및 소재
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['Etching 공정 및 소재']}`}
                              >
                                Etching 공정 및 소재
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['화합물 반도체 소자 및 소재']}`}
                              >
                                화합물 반도체 소자 및 소재
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['Doping 공정 및 소재']}`}
                              >
                                Doping 공정 및 소재
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="semi_badge biz02 biz03">
                        <h4>반도체 소재 Fundamental</h4>
                        <dl>
                          <dt>Badge 유형</dt>
                          <dd>미래Biz</dd>
                        </dl>
                        <dl>
                          <dt>Level</dt>
                          <dd>★ ★</dd>
                        </dl>
                        <dl>
                          <dt>인증 내용</dt>
                          <dd>
                            반도체 공정 / 소자별 핵심
                            <br />
                            소재 연계 역량
                          </dd>
                        </dl>
                        <dl>
                          <dt>획득 요건</dt>
                          <dd>
                            Course 이수 / Test 및<br />
                            과제 수행
                          </dd>
                        </dl>
                        <button type="button" onClick={emptyAlert}>
                          OPEN 예정
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan">
                        <div className="semi_txt">
                          <h3>
                            AI 반도체 <br />
                            Fundamental
                          </h3>
                          <p>
                            인공지능(AI)을 처리하는 AI <br />
                            하드웨어의 종류, 동작 원리와 <br />
                            HW개발에 필요한 기본개념 이해
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle">
                          <ul>
                            <li>
                              <Link
                                to={`${semiconductorLinks['[Computing System 이해] 컴퓨터 동작의 이해']}`}
                              >
                                [Computer System] <br />
                                <span>컴퓨터 동작의 이해</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['[AI HW 개론] AI Model']}`}
                              >
                                [AI HW 개론]
                                <br />
                                <span>AI Model</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['[AI HW 이해] DNN HW 가속기 아키텍처']}`}
                              >
                                [AI HW 이해] <br />
                                <span> DNN HW 가속기 아키텍쳐</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['[HW 개발] Fundamentals']}`}
                              >
                                [HW 개발] <br />
                                <span>Fundamentals</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['[HW 개발] CPU Micro-Architecture']}`}
                              >
                                CPU Micro-Architecture
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['[HW 개발] SoC 설계 Flow']}`}
                              >
                                SoC 설계 Flow
                              </Link>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <Link
                                to={`${semiconductorLinks['[AI HW 개론] AI Hardware']}`}
                              >
                                [AI HW 개론] <br />
                                <span>AI Hardware</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['[AI HW 개론] AI Platform']}`}
                              >
                                [AI HW 개론] <br />
                                <span>AI Platform</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['[AI HW 이해] DNN 알고리즘 및 워크로드 특성']}`}
                              >
                                [AI HW 이해]
                                <br />
                                <span>DNN 알고리즘 및 워크로드 특성</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['[HW 개발] Analog Design']}`}
                              >
                                [HW 개발]
                                <br />
                                <span>Analog Design</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['[HW 개발] Digital Design']}`}
                              >
                                Digital Design
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['[HW 개발] SoC 설계 사례 - Mobile Computing']}`}
                              >
                                SoC 설계 사례 <br />
                                <span>Mobile Computing</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan conHeight03">
                        <div className="semi_txt">
                          <h3>반도체 Tech Essential</h3>
                          <p>
                            非 이공계 구성원도 쉽게 이해할 수<br />
                            있는 반도체 용어와 기술 이해
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle ver-mid">
                          <ul>
                            <li>
                              <Link
                                to={`${semiconductorLinks['한방에 이해하는 꿀잼 반도체']}`}
                              >
                                <strong>핵인싸</strong>
                                한방에 이해하는 <br />
                                꿀잼 반도체
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['반도체 What - 반도체 Tech 지식백과']}`}
                              >
                                반도체 What
                                <br />
                                <span>반도체 Tech 지식백과</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['[CEO특강_SK하이닉스 이석희 사장] 반도체, 미래를 열다']}`}
                              >
                                [CEO특강_SK하이닉스 이석희 사장]
                                <br />
                                <span>반도체, 미래를 열다</span>
                              </Link>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <Link
                                to={`${semiconductorLinks['슬기로운 IT생활 - 전자기기의 구조와 동작원리']}`}
                              >
                                슬기로운 IT 생활 <br />
                                <span>전자기기의 구조와 동작원리</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['반도체 제대로 이해하기 - 기본편']}`}
                              >
                                반도체 제대로 이해하기 <br />
                                (기본편)
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="semi_badge">
                        <h4>반도체 Tech Essential</h4>
                        <dl>
                          <dt>Badge 유형</dt>
                          <dd>미래Biz</dd>
                        </dl>
                        <dl>
                          <dt>Level</dt>
                          <dd>★</dd>
                        </dl>
                        <dl>
                          <dt>인증 내용</dt>
                          <dd>반도체 Tech 핵심개념 및 기술용어 습득</dd>
                        </dl>
                        <dl>
                          <dt>획득 요건</dt>
                          <dd>
                            4개 Course 이수 / Badge 종합 Test 통과 (80점 이상)
                          </dd>
                        </dl>
                        <Link
                          className="cha_btn"
                          to="/certification/badge/badge-detail/BADGE-3y"
                          style={{ fontWeight: 'bold' }}
                        >
                          도전하기
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan">
                        <div className="semi_txt">
                          <h3>반도체 Biz Essential</h3>
                          <p>
                            반도체 Ecosystem과 향후 <br />
                            반도체 산업 변화를 이해하는데 <br />
                            필요한 기본 지식과 Insight 제공
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle ver-top">
                          <ul className="sm">
                            <li>
                              <Link
                                to={`${semiconductorLinks['News로 본 반도체 - 다가온 미래, Big Data 시대의 경쟁력 강화']}`}
                              >
                                [News로 본 반도체]
                                <br />
                                <span>
                                  다가온 미래, Big Data시대의 경쟁력 강화
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['News로 본 반도체 - 반도체 제품 분류별 시장 분석과 AI 반도체']}`}
                              >
                                [News로 본 반도체] <br />
                                <span>
                                  반도체 제품 분류별 시장 분석과 AI반도체
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['News로 본 반도체 - 반도체의 미래와 우리의 준비']}`}
                              >
                                [News로 본 반도체]
                                <br />
                                <strong>핵인싸</strong>
                                <span>반도체의 미래와 우리의 준비</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['반도체 Industry 이해 Part2. 무모한 도전에서 챔피언이 된 삼성전자']}`}
                              >
                                [반도체 Industry 이해 Part2] <br />
                                <span>
                                  무모한 도전에서 챔피언이 된 삼성전자
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['반도체 Industry 이해 Part4. 펩리스와 파운드리- 거대한 IDM 사이의 기회와 전략']}`}
                              >
                                [반도체 Industry 이해 Part4] <br />
                                <span>
                                  펩리스와 파운드리 - 거대한 IDM사이의 <br />
                                  기회와 전략
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['News 심층분석 - 미국의 대중 제재와 반도체 시장의 변화']}`}
                              >
                                News 심층 분석 <br />
                                <span>
                                  미국의 대중 제재와 반도체 시장의 변화
                                </span>
                              </Link>
                            </li>
                          </ul>
                          <ul className="sm">
                            <li>
                              <Link
                                to={`${semiconductorLinks['News로 본 반도체 - Data Centric World']}`}
                              >
                                [News로 본 반도체]
                                <br />
                                <span>Data Centric World</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['News로 본 반도체 - 반도체 Value Chain In-depth 분석']}`}
                              >
                                [News로 본 반도체]
                                <br />
                                <span>반도체 Value Chain In-depth 분석</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['반도체 Industry 이해 Part1. 반도체 산업의 기본 개념과 시장 경쟁구도']}`}
                              >
                                [반도체 Industry 이해 Part1]
                                <br />
                                <span>
                                  반도체 산업의 기본 개념과 시장 경쟁구도
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['반도체 Industry 이해 Part3. CPU의 강자 인텔의 과거 현재 미래']}`}
                              >
                                [반도체 Industry 이해 Part3]
                                <br />
                                <span>CPU의 강자 인텔의 과거 현재 미래</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['반도체 Industry 이해 Part5. 무한 경쟁시대의 미래 전망 - 반도체 기업들의 도전과 과제']}`}
                              >
                                [반도체 Industry 이해 Part5]
                                <br />
                                <span>
                                  무한 경쟁시대의 미래전망 - 반도체 기업들의{' '}
                                  <br />
                                  도전과 과제
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${semiconductorLinks['Covid-19이 반도체 Supply Chain에 미치는 영향']}`}
                              >
                                Covid-19이 반도체 Supply Chain에 <br />
                                미치는 영향
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="semi_badge biz">
                        <h4>반도체 Biz Essential</h4>
                        <dl>
                          <dt>Badge 유형</dt>
                          <dd>미래Biz</dd>
                        </dl>
                        <dl>
                          <dt>Level</dt>
                          <dd>★</dd>
                        </dl>
                        <dl>
                          <dt>인증 내용</dt>
                          <dd>
                            반도체 산업 이해와 분석에 필요한 기본지식 확보
                          </dd>
                        </dl>
                        <dl>
                          <dt>획득 요건</dt>
                          <dd>
                            10개 Course 이수 /<br />
                            Badge 종합 Test 통과
                            <br />
                            (80점 이상)
                          </dd>
                        </dl>
                        <Link
                          className="cha_btn"
                          style={{ fontWeight: 'bold' }}
                          to="/certification/badge/badge-detail/BADGE-3x"
                        >
                          도전하기
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan conHeight02">
                        <div className="semi_txt">
                          <h3>반도체 Introduction</h3>
                          <p>
                            재미있고 흥미로운 Story로, <br />
                            반도체 학습을 처음 시작하는 <br />
                            구성원들을 위한 과정
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle">
                          <ul>
                            <li>
                              <Link
                                to={`${semiconductorLinks['[입문] 반쓸신잡 - 반도체 산업의 과거, 현재, 그리고 미래']}`}
                              >
                                반쓸신잡 <br />
                                <span>
                                  반도체 산업의 과거, 현재 그리고 미래
                                </span>
                              </Link>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <Link
                                to={`${semiconductorLinks['반도체 클라쓰 - Keyword로 알아보는 반도체의 품격']}`}
                              >
                                반도체 클라쓰 <br />
                                <span>Keyword로 알아보는 반도체 품격</span>
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
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: '에너지솔루션',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges11"
        >
          <div className="college-cont-title energy">
            <div className="belt">
              <div className="panopto">
                <iframe
                  title="video type"
                  src="https://sku.ap.panopto.com/Panopto/Pages/Embed.aspx?id=260511f9-c00b-436c-87db-abe5004db668"
                  width="436"
                  height="245"
                  style={{ padding: '0px', border: '0px' }}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay"
                />
              </div>

              <div className="label">에너지솔루션 College</div>
              <div className="strong">
                “에너지와 AI/DT가 만나 Deep Change가 시작되는 곳”
              </div>
              <div className="normal">
                에너지 역량과 AI/DT 역량의 융합을 통해 새로운 에너지솔루션
                비즈니스를 준비합니다.
                <br />
                융합을 위한 공감대 형성부터 고객 가치 창출 및 플랫폼
                비즈니스로의 확장을
                <br />
                위한 과정들을 통해 Deep Change를 위한 Human Capital Pool을
                확보하는
                <br />
                것을 목표로 두고 있습니다.
              </div>
            </div>
          </div>
          <div className="college-cont-map energy">
            <div className="belt">
              <div className="map">
                <Image
                  src={`${PUBLIC_URL}/images/all/in-02-01-c-11.svg`}
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
    menuItem: 'BM Design & Storytelling',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges8"
        >
          <div className="college-cont-title bmd">
            <div className="belt sub">
              <div className="label">BM Design &#38; Storytelling College</div>
              <div className="strong">Ideate and Accelerate Deep Change!</div>
              <div className="normal">
                BM Design 전문가 양성 및 Biz Financial Story Design/ Telling
                역량 강화를 적극 지원함으로써 <br />
                그룹/관계사 Deep Change 성과 창출에 기여하겠습니다.
              </div>
              <ul className="tag-wrap">
                <li># BM혁신</li>
                <li># Sustainable BM</li>
                <li># BM Design</li>
                <li># Portfolio Management</li>
                <li># Financial Story</li>
                <li># Storytelling</li>
                <li># Stakeholder</li>
              </ul>
              <div className="panopto sub">
                <Image
                  src={`${PUBLIC_URL}/images/all/img-co-11-ttl.png`}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="college-cont-map">
            <div className="belt fu">
              <div className="text-left-box">
                <p className="p_link" style={{ color: '#bd38a5' }}>
                  각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
                </p>
              </div>
              <div className="text-right-box">
                <Link
                  to="/lecture/college/CLG00020/channels/pages/1"
                  className="item-button"
                >
                  <Image
                    src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
                    alt=""
                    style={{ display: 'inline-block' }}
                  />
                  과정 바로가기
                </Link>
              </div>
            </div>
            <div className="belt">
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/bmd_con_01.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="college-cont-map">
            {/* <div className="belt fu">
              <div className="text-left-box">
                <p className="p_link" style={{color: '#bd38a5'}}>각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.</p>
              </div>
              <div className="text-right-box">
                <Link
                  to="/lecture/college/CLG00020/channels/pages/1"
                  className="item-button"
                >
                  <Image src={`${PUBLIC_URL}/images/all/icon-course-book.png`} alt="" style={{display: 'inline-block'}} />
                  과정 바로가기
                </Link>
              </div>
            </div> */}

            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="bm-top-btn">
                <span className="bm-btn01">On-Line</span>
                <span className="bm-btn02">Blended</span>
                <span className="bm-btn03">Off-Line</span>
              </div>
              <div className="map">
                <Image
                  src={`${PUBLIC_URL}/images/all/bm-level-line.png`}
                  alt=""
                  style={{ float: 'left' }}
                />
                <div className="bm-wrap">
                  <div className="bm-flex">
                    <div className="bm-bg-box bg_type01">
                      <h3>
                        <Link to="/lecture/college/CLG00020/channel/CHN00081">
                          BM Design @ Work
                        </Link>
                      </h3>
                      <p>( 사전 Becoming BM Designer 과정 이수 필수 )</p>
                      <ul className="list_flex">
                        <li>
                          <Link to="/lecture/card/CARD-a9s/view">
                            BM Design 실습 <br />
                            (4주)
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-abv/view">
                            디커플링 Workshop <br />
                            (2일)
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-abt/view">
                            환경∙에너지 <br />
                            BM Design 실습 <br />
                            (4주)
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="bm-bg-box bg_type02">
                      <h3>
                        <Link to="/lecture/college/CLG00020/channel/CHN0007o">
                          Storytelling @ Work
                        </Link>
                      </h3>
                      <div className="bm-flex">
                        <ul className="list_bm bg_white">
                          <li>
                            <Link to="/lecture/card/CARD-abm/cube/CUBE-crs/view/ClassRoomLecture">
                              CEO 1:1 과정
                            </Link>
                          </li>
                          <li>
                            <Link to="/lecture/card/CARD-abo/cube/CUBE-cru/view/ClassRoomLecture">
                              6R Storytelling Workshop
                            </Link>
                          </li>
                        </ul>
                        <ul className="list_bm bg_white">
                          <li>
                            <Link to="/lecture/card/CARD-abn/cube/CUBE-crt/view/ClassRoomLecture">
                              Leader Storytelling <br />
                              Workshop
                            </Link>
                          </li>
                          <li>
                            <Link to="/lecture/card/CARD-abp/cube/CUBE-crv/view/ClassRoomLecture">
                              FS 전문가 심포지엄
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bm-flex">
                    <div className="bm-bg-box bg_type01">
                      <h3>
                        <Link to="/lecture/college/CLG00020/channel/CHN00083">
                          Becoming BM Designer
                        </Link>
                      </h3>
                      <ul className="list_flex md">
                        <li>
                          <Link to="/lecture/card/CARD-8c9/view">
                            Ⅰ. As-Is BM <br />
                            Sustainability
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-a8f/view">
                            Ⅱ. BM 환경 분석
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-8cb/view">
                            Ⅲ. 신규 BM <br />
                            발굴 전략
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bm-flex">
                    <div className="bm-bg-box line_type01">
                      <h3>
                        <Link to="/lecture/college/CLG00020/channel/CHN0007n">
                          M&#38;A Design
                        </Link>
                      </h3>
                      <div className="bm-flex">
                        <ul className="list_bm">
                          <li>
                            <Link to="/lecture/card/CARD-a1p/view">
                              Ⅰ. M&#38;A Overview
                            </Link>
                          </li>
                          <li>
                            <Link to="/lecture/card/CARD-a1w/view">
                              Ⅲ. 대상 선정 &#38; <br />
                              Deal Structuring
                            </Link>
                          </li>
                          <li>
                            <Link to="/lecture/card/CARD-a1y/view">
                              Ⅴ. Valuation
                            </Link>
                          </li>
                          <li>
                            <Link to="/lecture/card/CARD-a20/view">
                              Ⅶ. Legal
                            </Link>
                          </li>
                          <li>
                            <Link to="#" onClick={emptyAlert}>
                              [심화I] Deal Structuring <br />
                              &#38; Financing
                            </Link>
                          </li>
                        </ul>
                        <ul className="list_bm">
                          <li>
                            <Link to="/lecture/card/CARD-a22/view">
                              Ⅱ. M&#38;A Strategy
                            </Link>
                          </li>
                          <li>
                            <Link to="/lecture/card/CARD-a1x/view">
                              Ⅳ. Due Diligence
                            </Link>
                          </li>
                          <li>
                            <Link to="/lecture/card/CARD-a1z/view">
                              Ⅵ. Negotiation
                            </Link>
                          </li>
                          <li>
                            <Link to="/lecture/card/CARD-a21/view">
                              Ⅷ. PMI &#38; Value-up
                            </Link>
                          </li>
                          <li>
                            <Link to="/lecture/card/CARD-a23/view">
                              [심화Ⅱ] Legal
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bm-bg-box line_type01 height100">
                      <h3>
                        <Link to="/lecture/college/CLG00020/channel/CHN0007p">
                          Becoming Storyteller
                        </Link>
                      </h3>
                      <div className="bm-flex">
                        <ul className="list_bm">
                          <li>
                            <Link to="#" onClick={emptyAlert}>
                              Financial Storytelling <br />
                              글로벌 사례 연구
                            </Link>
                          </li>
                          <li>
                            <Link to="/lecture/card/CARD-ac8/view">
                              [Focus] Financial <br />
                              Society Partnership
                            </Link>
                          </li>
                        </ul>
                        <ul className="list_bm">
                          <li>
                            <Link to="#" onClick={emptyAlert}>
                              6R 관점 Stakeholder 이해
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bm-flex">
                    <div className="bm-bg-box line_type01">
                      <h3>
                        <Link to="/lecture/college/CLG00020/channel/CHN00082">
                          BM Design Take-off
                        </Link>
                      </h3>
                      <ul className="list_flex md">
                        <li>
                          <Link to="/lecture/card/CARD-a8e/view">
                            Ⅰ.Sustainable BM <br />
                            혁신 중요성
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-a8g/view">
                            Ⅱ. BM Framework <br />
                            &#38; SK BM 혁신 노력
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-a8h/view">
                            Ⅲ. BM / Deep Change <br />
                            Design과 실행
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="bm-bg-box line_type01">
                      <h3>
                        <Link to="/lecture/college/CLG00020/channel/CHN00084">
                          Defining Storytelling
                        </Link>
                      </h3>
                      <ul className="list_flex md">
                        <li>
                          <Link to="#" onClick={emptyAlert}>
                            Financial Story 이해
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-6z1/view">
                            Financial Acumen
                          </Link>
                        </li>
                        <li>
                          <Link to="/lecture/card/CARD-abr/cube/CUBE-crx/view/Video">
                            투자자 관점에서 본 <br />
                            Financial Story
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
    menuItem: 'SK아카데미',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges10"
        >
          <div className="college-cont-title skacademy">
            <div className="belt">
              <div className="img">
                <Image
                  src={`${PUBLIC_URL}/images/all/player-area.svg`}
                  alt=""
                />
              </div>
              <div className="label">SK아카데미 College</div>
              <div className="strong">
                “나무를 키우듯, 인재를 키워온 SK인재육성의 산실”
              </div>
              <div className="normal">
                SK아카데미는 SKMS/Values 전파를 통해 SK 기업문화의 토대를
                강화하고, <br />
                체계적인 육성 Pipeline에 따라 미래 경영자와 Biz. 전문가를
                육성합니다.
              </div>
              <ul className="tag-wrap">
                <li># 신입사원</li>
                <li># 영입구성원</li>
                <li># 신임팀장</li>
                <li># 신임임원</li>
                <li># 영입임원</li>
                <li># HLP</li>
                <li># 여성리더</li>
                <li># 역량 School</li>
                <li># HR Conference</li>
                <li># Global HR Seminar</li>
              </ul>
            </div>
          </div>
          <div className="college-cont-map skacademy">
            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/img-co10.svg`} alt="" />
              </div>
            </div>
          </div>

          <div className="college-tag skacademy">
            <div className="belt">
              <div className="label chip5">SKMS / SK Values</div>
              <div className="strong">
                신입/영입구성원 대상 SKMS/핵심가치 전파와 신임팀장의 행복경영
                실천을 위한 역할 정립
              </div>
              <ul className="tag-wrap">
                <li># 신입사원</li>
                <li># 영입구성원</li>
                <li># 신임팀장</li>
                <li># 신임임원</li>
                <li># 영입임원</li>
                <li># SKMS 강사양성</li>
              </ul>
              <div className="label chip6">미래경영자 육성</div>
              <div className="strong">
                SK Leadership Pipeline 및 Assessment와 연계한 체계적인
                미래경영자 육성
              </div>
              <ul className="tag-wrap">
                <li># HLP</li>
                <li># 여성리더</li>
              </ul>
              <div className="label chip7">역량 School</div>
              <div className="strong">
                mySUNI의 Management College와 연계, 그룹 공통 직무 및 Biz.
                전문역량 강화
              </div>
              <ul className="tag-wrap">
                <li># 전략 Intermediate/Advanced</li>
                <li># 마케팅 Intermediate/Advanced</li>
                <li># 재무 Intermediate/Advanced</li>
                <li># HR Intermediate/Advanced</li>
                <li># 구매 Intermediate/Advanced</li>
                <li># 법무</li>
                <li># IP(지식재산)</li>
                <li># M&A</li>
                <li># 사업개발</li>
                <li># 협상</li>
                <li># Biz. Contract</li>
                <li># HR Analytics</li>
                <li># HR Conference</li>
                <li># Global HR Seminar</li>
              </ul>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
];

interface Props extends RouteComponentProps {}

interface State {
  activeIndex: number;
}
@reactAutobind
class CollegeView extends Component<Props, State> {
  //
  state = {
    activeIndex: 0,
  };

  componentDidMount() {
    //
    this.setActiveTab();

    if (
      window.location.search === '?subTab=BM%20Design&Storytelling' ||
      window.location.search ===
        '?subTab=BM%2520Design%2520%2526%2520Storytelling'
    ) {
      this.setState({ activeIndex: 10 });
    }
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.location.key !== this.props.location.key) {
      this.setActiveTab();
    }
  }

  setActiveTab() {
    //
    const queryParams = queryString.parse(this.props.location.search);
    const subTab = queryParams.subTab as string;

    if (subTab) {
      const activeIndex = panes.findIndex(pane => pane.menuItem === subTab);

      if (activeIndex >= 0) {
        this.setState({ activeIndex });
      }
    }
  }

  onTabChange(e: any, { activeIndex }: any) {
    //
    this.props.history.push(
      routePaths.introductionCollege(panes[activeIndex].menuItem)
    );
  }

  render() {
    //
    const { activeIndex } = this.state;

    return (
      <div data-area={Area.INTRODUCTION_COLLEGE}>
        <style
          dangerouslySetInnerHTML={{
            __html:
              'body.msie #root section.content .tab-menu-inner .ui.menu .item{flex:none;width:auto;flex-grow:1}',
          }}
        />
        <Tab
          className="tab-menu-inner sub"
          panes={panes}
          activeIndex={activeIndex}
          onTabChange={this.onTabChange}
        />
      </div>
    );
  }
}

export default withRouter(CollegeView);

const semiconductorLinks: any = {
  '[입문] 반쓸신잡 - 반도체 산업의 과거, 현재, 그리고 미래':
    '/lecture/card/CARD-535/view',
  '반도체 클라쓰 - Keyword로 알아보는 반도체의 품격':
    '/lecture/card/CARD-534/view',
  'News로 본 반도체 - 다가온 미래, Big Data 시대의 경쟁력 강화':
    '/lecture/card/CARD-533/view',
  'News로 본 반도체 - Data Centric World':
    '/lecture/card/CARD-6mb/view',
  'News로 본 반도체 - 반도체 제품 분류별 시장 분석과 AI 반도체':
    '/lecture/card/CARD-6mc/view',
  'News로 본 반도체 - 반도체 Value Chain In-depth 분석':
    '/lecture/card/CARD-72y/view',
  'News로 본 반도체 - 반도체의 미래와 우리의 준비':
    '/lecture/card/CARD-73c/view',
  'News 심층분석 - 미국의 대중 제재와 반도체 시장의 변화':
    '/lecture/card/CARD-86v/view',
  '반도체 Industry 이해 Part1. 반도체 산업의 기본 개념과 시장 경쟁구도':
    '/lecture/card/CARD-5vj/view',
  '반도체 Industry 이해 Part2. 무모한 도전에서 챔피언이 된 삼성전자':
    '/lecture/card/CARD-645/view',
  '반도체 Industry 이해 Part3. CPU의 강자 인텔의 과거 현재 미래':
    '/lecture/card/CARD-691/view',
  '반도체 Industry 이해 Part4. 펩리스와 파운드리- 거대한 IDM 사이의 기회와 전략':
    '/lecture/card/CARD-6co/view',
  '반도체 Industry 이해 Part5. 무한 경쟁시대의 미래 전망 - 반도체 기업들의 도전과 과제':
    '/lecture/card/CARD-6jt/view',
  '한방에 이해하는 꿀잼 반도체':
    '/lecture/card/CARD-532/view',
  '슬기로운 IT생활 - 전자기기의 구조와 동작원리':
    '/lecture/card/CARD-5xw/view',
  '반도체 What - 반도체 Tech 지식백과':
    '/lecture/card/CARD-531/view',
  '반도체 제대로 이해하기 - 기본편':
    '/lecture/card/CARD-530/view',
  '[CEO특강_SK하이닉스 이석희 사장] 반도체, 미래를 열다':
    '/lecture/card/CARD-5pa/view',
  '[Computing System 이해] 컴퓨터 동작의 이해':
    '/lecture/card/CARD-7bf/view',
  '[AI HW 개론] AI Hardware':
    '/lecture/card/CARD-8h6/view',
  '[AI HW 개론] AI Model':
    '/lecture/card/CARD-7sd/view',
  '[AI HW 개론] AI Platform':
    '/lecture/card/CARD-7ns/view',
  '[HW 개발] Fundamentals':
    '/lecture/card/CARD-7gh/view',
  '[HW 개발] CPU Micro-Architecture':
    '/lecture/card/CARD-7vh/view',
  '[HW 개발] Analog Design':
    '/lecture/card/CARD-847/view',
  '[HW 개발] Digital Design':
    '/lecture/card/CARD-7rf/view',
  '[HW 개발] SoC 설계 Flow':
    '/lecture/card/CARD-7ep/view',
  '[HW 개발] SoC 설계 사례 - Mobile Computing':
    '/lecture/card/CARD-7ec/view',
  '[AI HW 이해] DNN HW 가속기 아키텍처':
    '/lecture/card/CARD-7kt/view',
  '[AI HW 이해] DNN 알고리즘 및 워크로드 특성':
    '/lecture/card/CARD-7j4/view',
  '첨단 소재':
    '/lecture/card/CARD-97q/view',
  'Lithography 공정 및 소재':
    '/lecture/card/CARD-8jl/view',
  'Etching 공정 및 소재':
    '/lecture/card/CARD-8bf/view',
  'Metallization 공정 및 소재':
    '/lecture/card/CARD-84s/view',
  'Doping 공정 및 소재':
    '/lecture/card/CARD-7e2/view',
  'Thin Film 공정 및 소재':
    '/lecture/card/CARD-78k/view',
  'Image Sensor 소자 및 소재':
    '/lecture/card/CARD-97n/view',
  '화합물 반도체 소자 및 소재':
    '/lecture/card/CARD-7mg/view',
  'Solar Cell 소자 및 소재':
    '/lecture/card/CARD-7fr/view',
  'Smart Factory구현을 위한 제조 시스템 이해와 의사결정':
    '/lecture/card/CARD-733/view',
  'Smart Factory의 구성요소와 사례':
    '/lecture/card/CARD-7b2/view',
  'Smart Factory 시스템의 연결과 지능화':
    '/lecture/card/CARD-7ck/view',
  '첨단 기술과 제조의 만남':
    '/lecture/card/CARD-7k7/view',
  'AI 알고리즘 기반 반도체 Factory':
    '/lecture/card/CARD-84n/view',
  '반도체 FAB 자동화 이해':
    '/lecture/card/CARD-7vi/cube/CUBE-afs/view/ClassRoomLecture',
  'Neuromorphic Computing : Challenges and Opportunities':
    '/lecture/card/CARD-77f/view',
  'AI반도체 - Next Tech Trend':
    '/lecture/card/CARD-7a1/view',
  '자동차 반도체, 기회와 도전':
    '/lecture/card/CARD-7bv/view',
  '양자 컴퓨팅과 양자 암호 기술의 현재와 미래':
    '/lecture/card/CARD-7ip/view',
  'Next Generation Semiconductor Packaging Technology':
    '/lecture/card/CARD-8c8/view',
  '반도체 FAB 생산 운영 전문가':
    '/lecture/card/CARD-9nm/view',
  '반도체 FAB 최적화 전문가':
    '/lecture/card/CARD-9np/view',
  'Covid-19이 반도체 Supply Chain에 미치는 영향':
    '/lecture/card/CARD-68a/view',
};
