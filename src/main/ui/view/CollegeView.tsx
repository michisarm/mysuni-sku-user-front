// Publishing 파일 그대로 가져오기 때문에 eslint 비활성화
/* eslint-disable */
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { reactAlert } from '@nara.platform/accent';

import queryString from 'query-string';
import { Image, Tab } from 'semantic-ui-react';
import routePaths from '../../routePaths';
import CollegeInnerTabView from './CollegeInnerTabView';
import CollegeInnerTabAi from './CollegeInnerTabAi';
import CollegeInnerTabDt from './CollegeInnerTabDt';

const emptyAlert = (e: any) => {
  e.preventDefault();
  reactAlert({
    title: '알림',
    message: '준비 중입니다.',
  });
};

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
            <div className="belt">
              <div className="belt">
                <div className="text-right-box">
                  <a
                    href="https://mysuni.sk.com/suni-main/lecture/college/CLG00005/channels/pages/1"
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
                            <a href="" onClick={emptyAlert}>
                              디자인씽킹 <br />
                              코칭 스킬
                            </a>
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
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/cube/CUBE-3/lecture-card/LECTURE-CARD-2z">
                              디자인씽킹 <br />
                              Project
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-tx/Course/C-LECTURE-q3">
                              디자인씽킹
                              <br />
                              Team W/S
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-16o/Course/C-LECTURE-119">
                              디자인씽킹 <br />
                              Workshop
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-yv/Course/C-LECTURE-ug">
                              디자인씽킹 Self <br />
                              실습 (SV사례)
                            </a>
                          </td>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <td className="dashed">
                            <a href="" onClick={emptyAlert}>
                              서비스 디자인 <br />
                              Intensive
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-131/Course/C-LECTURE-19g">
                              From Ideas to <br />
                              Action - IDEO
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-133/Course/C-LECTURE-19i">
                              Human-Centered <br />
                              Service Design - IDEO
                            </a>
                          </td>
                          <td className="dashed">
                            <a href="" onClick={emptyAlert}>
                              기술에서 고객 중심 <br />
                              Biz - Self 실습
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-ys/Course/C-LECTURE-ud">
                              디자인씽킹 사례 <br />
                              (SV)보며 익히기
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-q/Course/C-LECTURE-8">
                              디자인씽킹 - <br />
                              Linkedin
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-1fv/Course/C-LECTURE-19j">
                              Hello Design <br />
                              Thinking - IDEO
                            </a>
                          </td>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <td></td>
                          <td className="dashed">
                            <a href="" onClick={emptyAlert}>
                              기술에서 고객 중심 <br />
                              Biz 고민하기
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-124/Course/C-LECTURE-xa">
                              디자인 사고 연습
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="two">
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-89/Course/C-LECTURE-6e">
                              처음 만나는 <br />
                              디자인씽킹
                            </a>
                          </td>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-q4/Course/C-LECTURE-m2">
                              창의적 <br />
                              IDEA 발상법
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-83/Course/C-LECTURE-6b">
                              Biz. Ideation
                              <br /> 첫걸음
                            </a>
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
                            <a href="" onClick={emptyAlert}>
                              컨설턴트의 일하는 <br />
                              스킬 익히기 <br />
                              (Lv.2)
                            </a>
                          </li>
                          <li>
                            <a href="" onClick={emptyAlert}>
                              컨설턴트의 일하는 <br />
                              스킬 익히기 <br />
                              (Lv.1)
                            </a>
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
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-132/Course/C-LECTURE-19h">
                              Insights for <br />
                              Innovation - IDEO
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td></td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-im/Course/C-LECTURE-fi">
                              고객 Research <br />
                              방법
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-ik/Course/C-LECTURE-fg">
                              고객 Needs <br />
                              Finding
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="two">
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-8e/Course/C-LECTURE-6d">
                              고객 <br />
                              Need란?
                            </a>
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
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/cube/CUBE-a2j/lecture-card/LECTURE-CARD-7tb">
                              워킹백워드 <br />
                              Project
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-yr/Course/C-LECTURE-uk">
                              워킹백워드 <br />
                              Workshop_online
                            </a>
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
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-je/Course/C-LECTURE-h3">
                              워킹백워드 <br />
                              Tools
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="two">
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-7z/Course/C-LECTURE-66">
                              처음 만나는 <br />
                              워킹백워드
                            </a>
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
                          <td className="dashed">
                            <a href="" onClick={emptyAlert}>
                              애자일 코치 <br />
                              Meetup
                            </a>
                          </td>
                          <td className="dashed">
                            <a href="" onClick={emptyAlert}>
                              애자일 코치 <br />
                              양성 과정
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/cube/CUBE-781/lecture-card/LECTURE-CARD-33u">
                              애자일 Project
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-14x/Course/C-LECTURE-zn">
                              애자일 리더십 <br />
                              Workshop
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/cube/CUBE-7id/lecture-card/LECTURE-CARD-5da">
                              애자일 Project
                              <br />
                              Management <br />
                              W/S
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-w9/Course/C-LECTURE-s6">
                              애자일 <br />
                              Workshop
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-x/Course/C-LECTURE-7">
                              Agile Management <br />- Linkedin
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-hl/Course/C-LECTURE-ei">
                              애자일 방법론 <br />- Linkedin
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-u9/Course/C-LECTURE-qd">
                              SK 네트웍스 구매팀 <br />
                              애자일 사례
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="small">
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-yj/Course/C-LECTURE-u7">
                              애자일 방법론 기초
                            </a>
                          </td>
                          <td className="small">
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-11u/Course/C-LECTURE-x3">
                              애자일 에센셜
                            </a>
                          </td>
                          <td className="small">
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-fc/Course/C-LECTURE-ch">
                              처음 만나는 애자일
                            </a>
                          </td>
                          <td className="small">
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-82/Course/C-LECTURE-6a">
                              Why 애자일
                            </a>
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
                          <td className="dashed">
                            <a href="" onClick={emptyAlert}>
                              오픈 이노베이션 <br />
                              Workshop
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-oy/Course/C-LECTURE-kz">
                              퓨처캐스팅 <br />
                              Workshop
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-80/Course/C-LECTURE-67">
                              Futurecasting
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-88/Course/C-LECTURE-68">
                              All about <br />
                              오픈 이노베이션
                            </a>
                          </td>
                          <td>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-y6/Course/C-LECTURE-u9">
                              Creative Collabo <br />
                              Skills - Linkedin
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="two">
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-81/Course/C-LECTURE-69">
                              Open
                              <br />
                              Collaboration
                              <br />
                              Tips
                            </a>
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
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-8c/Course/C-LECTURE-6i">
                          Deep Change와
                          <br />
                          Design 이해
                        </a>
                      </li>
                      <li>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-8b/Course/C-LECTURE-6h">
                          고객 이해의 중요성 <br />
                          Remind!
                        </a>
                      </li>
                      <li>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-3/Course/C-LECTURE-3">
                          YouTube <br />
                          디자인 사고 이해
                        </a>
                      </li>
                      <li>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-rp/Course/C-LECTURE-nj">
                          혁신의 비법
                        </a>
                      </li>
                      <li>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-7x/Course/C-LECTURE-62">
                          Leading with
                          <br />
                          Innovation
                        </a>
                      </li>
                    </ul>
                    <h3># Deep Change와 Design</h3>
                  </div>

                  <div className="inno-bottom con02">
                    <ul>
                      <li>
                        <a href="https://mysuni.sk.com/suni-main/lecture/college/CLG00005/channel/CHN0000q">
                          Trend &#38; Insight <br />
                          Report
                        </a>
                      </li>
                      <li>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-k3/Course/C-LECTURE-gx">
                          도약을 위한 <br />
                          미래 디자인
                        </a>
                      </li>
                      <li>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00005/course-plan/COURSE-PLAN-f5/Course/C-LECTURE-ca">
                          효율적으로 <br />
                          일하는 Tip
                        </a>
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
            <div className="belt">
              <div className="panopto">
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
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/img-co6.png`} alt="" />
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
            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="map">
                <div className="ai-top-btn leaderShip">
                  <span className="ai-btn01 leader">
                    VoD
                  </span>
                  <span className="ai-btn02 leader sub">
                    Non-VoD
                  </span>
                </div>
                <Image src={`${PUBLIC_URL}/images/all/leadership-level.png`} alt="" style={{float: 'left'}} />
                <div className="link_wrapper leadership">
                  <div className="leadership_box bg1">
                    <h3>Deep change Leadership</h3>
                    <div className="leadership_list">
                      <ul>
                        <li className="margin_25">
                          <div className="badge_box1 left">
                            <Image src={`${PUBLIC_URL}/images/all/img-card-badge-lv-3.png`} alt="" />
                          </div>
                          <a href="#">
                              Leader as Coach<br/>Advanced P/G
                          </a>
                        </li>
                        <li>
                          <div className="badge_box1 left">
                            <Image src={`${PUBLIC_URL}/images/all/img-card-badge-lv-2.png`} alt="" />
                          </div>
                          <a href="#">
                            Organization
                            <br />
                            Transformation
                          </a>
                        </li>
                        <li>
                          <div className="badge_box1 left">
                            <Image src={`${PUBLIC_URL}/images/all/img-card-badge-lv-2.png`} alt="" />
                          </div>
                          <a href="#">
                            Leader as Coach P/G
                          </a>
                        </li>
                        <li>
                          <div className="badge_box1 left">
                            <Image src={`${PUBLIC_URL}/images/all/img-card-badge-lv-2.png`} alt="" />
                          </div>
                          <a href="#">
                            Leadership
                            <br />
                            Transformation
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-uu/Course/C-LECTURE-qy" className="leader_blue">
                            진정성이 이끄는 리더의 길
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-ox/Course/C-LECTURE-ky" className="leader_blue">
                            Deep Change & 리더십?- 목적 기반의
                            <br />
                            딥체인지 실천 가이드
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="leadership_list bottom">
                      <ul>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-lc/Course/C-LECTURE-hy" className="leader_blue">
                            딥체인지와 기업문화 혁신
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-u0/Course/C-LECTURE-q5" className="leader_blue">
                            영화로 만나는
                            <br />
                            Deep Change Leadership
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-9o/Course/C-LECTURE-7g" className="leader_blue">
                            Deep Change Leadership 이해
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* //leadership_box bg1 */}
                  <div className="leadership_box bg2">
                    <h3>Leadership Foundation</h3>
                    <ul>
                      <li className="leader_boxwrap margin_sm">
                        <p>
                          Global Leadership
                          <br />
                          Acceleration P/G
                        </p>
                        <a href="#">Remote Performance Mgmt.</a>
                        <a href="#">Impactful Conversation</a>
                        <a href="#">Drives for Engagement</a> 
                        <a href="#">Leveraging Conflict</a> 
                        <a href="#">EQ Leadership</a>
                      </li>
                      <li className="leader_boxwrap col-blue margin_sm">
                        <div className="badge_box1 left">
                          <Image src={`${PUBLIC_URL}/images/all/img-card-badge-lv-1.png`} alt="" />
                        </div>
                        <p>Leadership Essentials</p>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-pe/Course/C-LECTURE-la" className="bg_blue">전략적 사고</a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-m8/Course/C-LECTURE-ii" className="bg_blue">Remote Leadership</a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-us/Course/C-LECTURE-qw" className="bg_blue">Coaching Leadership</a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-ur/Course/C-LECTURE-qv" className="bg_blue">리더의 스토리텔링</a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-wr/Course/C-LECTURE-sl" className="bg_blue">스마트한 리더의 위임</a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-16w/Course/C-LECTURE-11h" className="bg_blue">Motivation Designer</a>
                      </li>
                      <li>
                        <a href="#" className="leader_blue">
                          갈등의 재발견
                        </a>
                      </li>
                      <li>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-9n/Course/C-LECTURE-7h" className="leader_blue">
                          Leadership Self-Assessment
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="leadership_box bg3">
                    <h3>Leadership Clinic</h3>
                    <ul>
                      <li className="leader_boxwrap col-blue">
                        <p>Leadership Pain Points</p>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-8t/Course/C-LECTURE-6x" className="bg_blue">자기성장</a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-8w/Course/C-LECTURE-6z" className="bg_blue">Performance</a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-8v/Course/C-LECTURE-7i" className="bg_blue">시너지/협업</a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-8u/Course/C-LECTURE-6y" className="bg_blue">건강한 조직 운영</a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-8x/Course/C-LECTURE-70" className="bg_blue">구성원 육성</a>
                      </li>
                      <li>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-o8/Course/C-LECTURE-ka" className="leader_blue">
                          리더의 세계 Ⅰ, Ⅱ
                        </a>
                      </li>
                      <li>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-ii/Course/C-LECTURE-ff" className="leader_blue">
                          1on1 미팅
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="leadership_box bg4">
                    <h3>Leadership Insight Cafe</h3>
                    <ul>
                      <li className="leader_boxwrap col-blue">
                        <p>리더십, 인문학에 길을 묻다</p>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-mc/Course/C-LECTURE-ik" className="bg_blue">카르마 & 다르마</a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-162/Course/C-LECTURE-10x" className="bg_blue">고난의 시대에 미래를 보는 리더십</a>
                      </li>
                      <li className="leader_boxwrap col-blue">
                        <p>심리학으로 풀어보는 리더십 Talk</p>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-gy/Course/C-LECTURE-dx" className="bg_blue">I. 변화의 시작</a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-kb/Course/C-LECTURE-h6" className="bg_blue">II. 이런 고민 있나요?</a>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-of/Course/C-LECTURE-kh" className="bg_blue">III. 리더라서 고민이다</a>
                      </li>
                      <li>
                        <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-y1/Course/C-LECTURE-ts" className="leader_blue">
                          세대 이해 – 86, X, MZ
                        </a>
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
            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="map">
                <Image
                  src={`${PUBLIC_URL}/images/all/semi_con_01.png`}
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
                BM Design 전문가 양성 및 Biz Financial Story Design/ Telling 역량 강화를
                적극 지원함으로써 <br />
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
                <Image src={`${PUBLIC_URL}/images/all/img-co-11-ttl.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="college-cont-map">
            <div className="belt">
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/bmd_con_01.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="college-cont-map">
            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="bm-top-btn">
                <span className="bm-btn01">On-Line</span>
                <span className="bm-btn02">Blended</span>
                <span className="bm-btn03">Off-Line</span>
              </div>
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/bm-level-line.png`} alt="" style={{float: 'left'}} />
                <div className="bm-wrap">
                  <div className="bm-flex">
                    <div className="bm-bg-box bg_type01">
                      <h3>
                        <a href="https://mysuni.sk.com/suni-main/lecture/college/CLG00020/channel/CHN00081">BM Design @ Work</a>
                      </h3>
                      <p>( 사전 Becoming BM Designer 과정 이수 필수 )</p>
                      <ul className="list_flex">
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-1fr/Course/C-LECTURE-19c">
                            BM Design 실습 <br />
                            (4주)
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-1go/Course/C-LECTURE-19u">
                            디커플링 Workshop <br />
                            (2일)
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-1gn/Course/C-LECTURE-19t">
                            환경∙에너지 <br />
                            BM Design 실습 <br />
                            (4주)
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="bm-bg-box bg_type02">
                      <h3>
                        <a href="https://mysuni.sk.com/suni-main/lecture/college/CLG00020/channel/CHN0007o">
                        Storytelling @ Work
                          </a></h3>
                      <div className="bm-flex">
                        <ul className="list_bm bg_white">
                          <li>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/cube/CUBE-crs/lecture-card/LECTURE-CARD-acl">CEO 1:1 과정</a>
                          </li>
                          <li>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/cube/CUBE-cru/lecture-card/LECTURE-CARD-acj">6R Storytelling Workshop</a>
                          </li>
                        </ul>
                        <ul className="list_bm bg_white">
                          <li>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/cube/CUBE-crt/lecture-card/LECTURE-CARD-ack">
                              Leader Storytelling <br />
                              Workshop
                            </a>
                          </li>
                          <li>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/cube/CUBE-crv/lecture-card/LECTURE-CARD-aci">FS 전문가 심포지엄</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bm-flex">
                    <div className="bm-bg-box bg_type01">
                      <h3>
                        <a href="https://mysuni.sk.com/suni-main/lecture/college/CLG00020/channel/CHN00083">
                        Becoming BM Designer
                        </a>
                      </h3>
                      <ul className="list_flex md">
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-12v/Course/C-LECTURE-xw">
                            Ⅰ. As-Is BM <br />
                            Sustainability
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-1fh/Course/C-LECTURE-191">Ⅱ. BM 환경 분석</a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-12x/Course/C-LECTURE-xy">
                            Ⅲ. 신규 BM <br />
                            발굴 전략
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bm-flex">
                    <div className="bm-bg-box line_type01">
                      <h3>
                        <a href="https://mysuni.sk.com/suni-main/lecture/college/CLG00020/channel/CHN0007n">
                        M&#38;A Design
                        </a>
                      </h3>
                      <div className="bm-flex">
                        <ul className="list_bm">
                          <li>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-1da/Course/C-LECTURE-17d">Ⅰ. M&#38;A Overview</a>
                          </li>
                          <li>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-1dp/Course/C-LECTURE-17f">
                              Ⅲ. 대상 선정 &#38; <br />
                              Deal Structuring
                            </a>
                          </li>
                          <li>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-1dr/Course/C-LECTURE-17h">Ⅴ. Valuation</a>
                          </li>
                          <li>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-1dt/Course/C-LECTURE-17j">Ⅶ. Legal</a>
                          </li>
                          <li>
                            <a href="">
                              [심화Ⅰ] Deal Structuring <br />
                              &#38; Financing
                            </a>
                          </li>
                        </ul>
                        <ul className="list_bm">
                          <li>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-1dv/Course/C-LECTURE-17e">Ⅱ. M&#38;A Strategy</a>
                          </li>
                          <li>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-1dq/Course/C-LECTURE-17g">Ⅳ. Due Diligence</a>
                          </li>
                          <li>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-1ds/Course/C-LECTURE-17i">Ⅵ. Negotiation</a>
                          </li>
                          <li>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-1du/Course/C-LECTURE-17k">Ⅷ. PMI &#38; Value-up</a>
                          </li>
                          <li>
                            <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-1dw/Course/C-LECTURE-17l">[심화Ⅱ] Legal</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bm-bg-box line_type01 height100">
                      <h3>Becoming Storyteller</h3>
                      <div className="bm-flex">
                        <ul className="list_bm">
                          <li>
                            <a href="">Stakeholder 이해</a>
                          </li>
                          <li>
                            <a href="">
                              Financial Storytelling <br />
                              글로벌 사례 연구
                            </a>
                          </li>
                        </ul>
                        <ul className="list_bm">
                          <li>
                            <a href="">6R Comm. 전략</a>
                          </li>
                          <li>
                            <a href="">
                              [Focus] Financial <br />
                              Society Partnership
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bm-flex">
                    <div className="bm-bg-box line_type01">
                      <h3>
                        <a href="https://mysuni.sk.com/suni-main/lecture/college/CLG00020/channel/CHN00082">
                        BM Design Take-off</a></h3>
                      <ul className="list_flex md">
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-1fg/Course/C-LECTURE-190">
                            Ⅰ . Sustainable BM <br />
                            혁신 중요성
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-1fi/Course/C-LECTURE-192">
                            Ⅱ. BM Framework <br />
                            &#38; SK BM 혁신 노력
                          </a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-1fj/Course/C-LECTURE-193">
                            Ⅲ. BM / Deep Change <br />
                            Design과 실행
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="bm-bg-box line_type01">
                      <h3>
                        <a href="https://mysuni.sk.com/suni-main/lecture/college/CLG00020/channel/CHN00084">
                        Defining Storytelling
                        </a>
                          </h3>
                      <ul className="list_flex md">
                        <li>
                          <a href="">Ⅰ. Financial Story 이해</a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/course-plan/COURSE-PLAN-u7/Course/C-LECTURE-qb">Ⅱ. Financial Acumen</a>
                        </li>
                        <li>
                          <a href="https://mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00020/cube/CUBE-crx/lecture-card/LECTURE-CARD-acg">
                            Ⅲ. 투자자 관점에서 본 <br />
                            Financial Story
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
                <li># 영업구성원</li>
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
    console.log('asdf',panes[activeIndex].menuItem);
    this.props.history.push(
      routePaths.introductionCollege(panes[activeIndex].menuItem)
    );
  }

  render() {
    //
    const { activeIndex } = this.state;

    return (
      <>
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
      </>
    );
  }
}

export default withRouter(CollegeView);
