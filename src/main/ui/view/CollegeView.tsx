// Publishing 파일 그대로 가져오기 때문에 eslint 비활성화
/* eslint-disable */
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { reactAlert } from '@nara.platform/accent';

import queryString from 'query-string';
import { Image, Tab } from 'semantic-ui-react';
import routePaths from '../../routePaths';
import CollegeInnerTabView, {
  CollegeInnerEnTabView,
  CollegeInnerZhTabView,
} from './CollegeInnerTabView';
import CollegeInnerTabAi, {
  CollegeInnerEnTabAi,
  CollegeInnerZhTabAi,
} from './CollegeInnerTabAi';
import CollegeInnerTabDt, {
  CollegeInnerEnTabDt,
  CollegeInnerZhTabDt,
} from './CollegeInnerTabDt';
import { Area } from 'tracker/model';
import { SkProfileService } from '../../../profile/stores';

import './CollegeView.css';

const emptyAlert = (e: any) => {
  e.preventDefault();
  reactAlert({
    title: '알림',
    message: '준비 중입니다.',
  });
};
const emptyAlertOct = (e: any) => {
  e.preventDefault();
  reactAlert({
    title: '알림',
    message: '10월 중 오픈 예정',
  });
};
const emptyAlertSep = (e: any) => {
  e.preventDefault();
  reactAlert({
    title: '알림',
    message: '9월 말 오픈 예정',
  });
};

const goToCommunity = (e: any) => {
  window.location.href = '/suni-community/community/COMMUNITY-1n/home';
};
const PUBLIC_URL = process.env.PUBLIC_URL;

const koPanes = [
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
              <div className="label">AI</div>
              <div className="strong">
                AI 아싸(Outsider)에서 AI 핵인싸(Insider)로!
              </div>
              <div className="normal">
                AI는 SK 구성원 누구나 알아야 할 기본 지식을 바탕으로,
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
              <div className="label">DT</div>
              <div className="strong">'그룹의 Deep Change는 우리 손으로!’</div>
              <div className="normal">
                Digital Skill을 장착하고 고객과 업을 이해하여,
                <br />
                SK Deep Change를 맨 앞에서 이끌어 나가실 구성원들을 위한
                과정들이,
                <br />
                여기 DT Category에 마련되어 있습니다.
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
              <div className="label">행복</div>
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
                  src={`${PUBLIC_URL}/images/all/happy_con_03.png`} //교체필요
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
    menuItem: 'SV·ESG',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges4"
        >
          <div className="college-cont-title sv">
            <div className="belt sub">
              <div className="label">SV·ESG</div>
              <div className="strong">
                내일[Tomorrow+My Work]을 위한 SV·ESG, <br />
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
              <div className="label">혁신디자인</div>
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
                      src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
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
                            <Link to="/lecture/card/CARD-8x7/view">
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
                          <td>
                            <Link to="/search?query=%EC%8B%A4%EC%A0%84%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20topic">
                              [실전 프로젝트]
                              <br />
                              고객중심 Biz 만들기
                              <br />
                              Topic 1-4
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
                              LinkedIn
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
                          <td>
                            <Link to="/search?query=기술은%20있는데%20사업화가%20어렵다면?%20고객중심%20Biz%20만들기">
                              기술은 있는데 사업화가 어렵다면?
                              <br />
                              고객중심 Biz 만들기!
                              <br />
                              1부 2부
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
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td></td>
                          <td></td>
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
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td></td>
                          <td>
                            <Link to="/lecture/card/CARD-12s5/view">
                              컨설턴트의 일하는
                              <br />
                              스킬 익히기
                              <br />
                              2부. 프로젝트 관리 & 전략적 관점
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-12nd/view">
                              컨설턴트의 일하는
                              <br />
                              스킬 익히기
                              <br />
                              1부. 문제해결 방법론
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <Link to="/lecture/card/CARD-13xc/view">
                              Logic & Play <br />
                              인도로 가는 길
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-13tz/view">
                              처음 만나는 로지컬씽킹
                            </Link>
                          </td>
                        </tbody>
                      </table>
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
                          <td>
                            <Link to="/lecture/card/CARD-1311/view">
                              공간 혁신과 그 변화에 대한 이야기
                            </Link>
                          </td>

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
                            <a onClick={goToCommunity}>
                              애자일 코치 <br />
                              Meetup
                            </a>
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
                              애자일 리더십 (M3.0)
                              <br />
                              Workshop
                            </Link>
                          </td>
                          <td>
                            <Link to="/lecture/card/CARD-7dd/view">
                              애자일 Dive
                              <br /> Workshop
                            </Link>
                          </td>
                          <td className="dashed">
                            <Link to="#" onClick={emptyAlertOct}>
                              애자일 Practice
                              <br />
                              (Self 실습)
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="small small2-1 dashed">
                            <Link to="#" onClick={emptyAlertOct}>
                              WoW! 애자일 트랜스포메이션
                            </Link>
                          </td>
                          <td className="small dashed">
                            <Link to="#" onClick={emptyAlertSep}>
                              애자일과 스크럼
                            </Link>
                          </td>
                          <td className="small">
                            <Link to="/lecture/card/CARD-afx/view">
                              퍼스널 칸반
                            </Link>
                          </td>
                          <td className="small">
                            <Link to="/lecture/card/CARD-a2p/view">
                              카이젠 저니
                            </Link>
                          </td>
                          <td className="small small2-1">
                            <Link to="/lecture/card/CARD-5c4/view">
                              애자일 방법론
                              <br />- LinkedIn
                            </Link>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="small">
                            <Link to="/lecture/card/CARD-84k/view">
                              애자일 에센셜
                            </Link>
                          </td>
                          <td className="small">
                            <Link to="/lecture/card/CARD-13ul/view">
                              애자일 선언문
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
                          <td>
                            <Link to="/lecture/card/CARD-13zl/cube/CUBE-hqi/view/ClassRoomLecture">
                              오픈 이노베이션 <br />
                              Project
                            </Link>
                          </td>
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
                          <td className="small">
                            <Link to="/lecture/card/CARD-1et/view">
                              퓨처캐스팅
                            </Link>
                          </td>
                          <td className="small">
                            <Link to="/lecture/card/CARD-13xj/view">
                              린스타트업
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
                              Skills - LinkedIn
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
              <div className="label">Global</div>
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

          {/* <div className="college-cont-map">
                <div className="belt">
                    <div className="label">지역전문가 커리큘럼</div>
                    <div className="map">
                        <Image src={curriculumn1}></Image>
                    </div>
                </div>
            </div> */}

          <div className="college-cont-map">
            <div className="belt global flex mb50">
              <div className="text-left-box">
                <p className="p_link global">
                  각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
                </p>
              </div>
              <div className="text-right-box">
                <Link
                  to="/lecture/college/CLG00006/channels/pages/1"
                  className="item-button"
                >
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                    alt=""
                  />
                  과정 바로가기
                </Link>
              </div>
            </div>

            <div className="belt global">
              <div className="label">
                Geopolitics & Biz / Managing Global Biz. 커리큘럼
              </div>
              <img
                src={`${PUBLIC_URL}/images/all/global-college-top.svg`}
                className="global-top-img"
              />
              <img
                src={`${PUBLIC_URL}/images/all/global-college-left.png`}
                className="global-left-img"
              />
              <div className="global-belt-wrap">
                <div className="global-belt flex">
                  <div className="global-curriculum-wrap">
                    <div className="global-component">
                      <div className="global-curriculum-box box-heit140">
                        <div className="curriculum-link-box">
                          <strong>Biz. Impact 분석</strong>
                          <Link to="#" onClick={emptyAlert}>
                            <span>Geopolitical Scenario Planning</span>
                          </Link>
                        </div>
                      </div>

                      <div className="global-curriculum-box box-heit220">
                        <div className="curriculum-link-box">
                          <strong>산업/통상에 미치는 영향</strong>
                          <div className="link-wrap">
                            <Link to="/lecture/card/CARD-12nx/view">
                              <span>
                                Geo. & Biz.
                                <br />
                                Nexus
                              </span>
                            </Link>
                            <div className="link-colum-box">
                              <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-197/Course/C-LECTURE-13i">
                                <span>
                                  미-중 Tech 경쟁 Ch.2
                                  <br />
                                  (입장 및 대응 방향)
                                </span>
                              </Link>
                              <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-s2/Course/C-LECTURE-nq">
                                <span>
                                  미-중 Tech 경쟁 Ch.1
                                  <br />
                                  (법률적/제도적 환경 변화)
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="global-curriculum-wrap wrap2">
                    <div className="global-component">
                      <div className="global-curriculum-box box-heit370">
                        <div className="curriculum-link-box">
                          <strong>Global Financial Story</strong>
                          <div className="link-wrap">
                            <div className="link-colum-box">
                              <Link to="#" onClick={emptyAlert}>
                                <span>
                                  Global Financial Story
                                  <br />
                                  케이스 스터디
                                </span>
                              </Link>
                              <Link to="/lecture/card/CARD-12ts/view">
                                <span>
                                  Global Financial Story의
                                  <br />
                                  이해
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="global-curriculum-wrap wrap2">
                    <div className="global-component">
                      <div className="global-curriculum-box box-heit370">
                        <div className="curriculum-link-box">
                          <strong>Diversity Inclusion</strong>
                          <div className="link-wrap">
                            <div className="link-colum-box sty2">
                              <Link to="#" onClick={emptyAlert}>
                                <span>
                                  글로벌 멤버들과
                                  <br />
                                  함께 일하기
                                </span>
                              </Link>
                              <Link to="#" onClick={emptyAlert}>
                                <span>
                                  Diversity
                                  <br />
                                  Inclusion의 이해
                                </span>
                              </Link>
                              <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-k4/Course/C-LECTURE-gy">
                                <span>
                                  Diversity
                                  <br />
                                  Awareness
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* //global-belt */}
                <div className="global-belt flex">
                  <div className="global-curriculum-wrap wrap3">
                    <div className="global-component">
                      <div className="global-curriculum-box box-heit380">
                        <div className="curriculum-link-box">
                          <strong>Why Geopolitics?</strong>
                          <div className="link-wrap big-colum">
                            <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/cube/CUBE-8ba/lecture-card/LECTURE-CARD-638">
                              <span>
                                How to manage
                                <br />
                                Geopolitical
                                <br />
                                Uncertainties?
                              </span>
                            </Link>
                            <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/cube/CUBE-8b8/lecture-card/LECTURE-CARD-637">
                              <span>
                                Why Geopolitics for
                                <br />
                                Business?
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="global-curriculum-wrap wrap3 left-mg10">
                    <div className="global-component">
                      <div className="global-curriculum-box">
                        <div className="curriculum-link-box">
                          <strong>지정학적 변화 동향</strong>
                          <div className="link-wrap big-colum">
                            <div className="link-colum-box">
                              <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-1dc/Course/C-LECTURE-16q">
                                <span>
                                  바이든 시대,
                                  <br />
                                  국제정세 변화
                                </span>
                              </Link>
                              <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-me/Course/C-LECTURE-im">
                                <span>
                                  국제정세 현상과
                                  <br />
                                  본질 Series 3
                                </span>
                              </Link>
                              <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-l9/Course/C-LECTURE-i1">
                                <span>
                                  국제정세 현상과
                                  <br />
                                  본질 Series 2
                                </span>
                              </Link>
                              <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-io/Course/C-LECTURE-fl">
                                <span>
                                  국제정세 현상과
                                  <br />
                                  본질 Series 1
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="global-curriculum-wrap left-mg10">
                    <div className="global-component">
                      <div className="global-curriculum-box box-heit380">
                        <div className="curriculum-link-box">
                          <strong>Global Communication Skill & Attitude</strong>
                          <div className="link-wrap type2">
                            <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-xz/Course/C-LECTURE-tq">
                              <span>글로벌 비즈니스 매너</span>
                            </Link>
                            <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-18/Course/C-LECTURE-x">
                              <span>글로벌 Biz.네트워킹</span>
                            </Link>
                            <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-i3/Program/P-LECTURE-r">
                              <span>Biz.이메일</span>
                            </Link>
                            <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-kw/Program/P-LECTURE-s">
                              <span>Biz.미팅</span>
                            </Link>
                            <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-l3/Program/P-LECTURE-u">
                              <span>프리젠테이션</span>
                            </Link>
                            <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-l1/Program/P-LECTURE-t">
                              <span>Biz.협상</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="global-link-bottom">
                    <Link to="/lecture/college/CLG00006/channel/CHN0000v">
                      <span>
                        <strong>Global Leader’s Table</strong>
                        <br />
                        (Global Guru들이 들려주는 비즈니스 통찰)
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="college-cont-map">
                <div className="belt">
                    <div className="label">지역전문가 커리큘럼</div>
                    <div className="map">
                        <Image src={curriculumn2}></Image>
                    </div>
                </div>
            </div> */}

          <div className="college-cont-map">
            <div className="belt global">
              <div className="label">지역전문가 커리큘럼</div>
              <img
                src={`${PUBLIC_URL}/images/all/global-college-location-top.png`}
                className="global-top-img2"
              />
              <img
                src={`${PUBLIC_URL}/images/all/global-college-location-contents.png`}
                className="global-left-img2"
              />
              <div className="global-belt-wrap section2">
                <div>
                  <Link to="about" onClick={emptyAlert}>
                    <span>Post 주재원</span>
                  </Link>
                  <Link to="about" onClick={emptyAlert}>
                    <span>법인장</span>
                  </Link>
                  <Link to="/lecture/card/CARD-86s/view">
                    <span>
                      Local Experience
                      <br />
                      (현채인, 주재원)
                    </span>
                  </Link>
                </div>
                <table>
                  <colgroup>
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                  </colgroup>
                  <thead>
                    <th></th>
                    <th>
                      <span>중국</span>
                    </th>
                    <th>
                      <span>미국</span>
                    </th>
                    <th>
                      <span>베트남</span>
                    </th>
                    <th>
                      <span>헝가리</span>
                    </th>
                    <th>
                      <span>폴란드</span>
                    </th>
                  </thead>
                  <tbody>
                    <tr>
                      <th>
                        <span>Networking</span>
                      </th>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-hj/Course/C-LECTURE-ek">
                          중국 GR 기초
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-kz/Course/C-LECTURE-hs">
                          Networking with
                          <br />
                          Americans
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-or/Course/C-LECTURE-ks">
                          주재원이 알아야 할<br />
                          베트남, 베트남인
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/card/CARD-8kg/view">
                          주재원이 알아야 할<br />
                          헝가리, 헝가리인
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/card/CARD-60u/view">
                          주재원이 알아야 할<br />
                          폴란드, 폴란드인
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>Biz 법률</span>
                      </th>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-iz/Course/C-LECTURE-fv">
                          중국 Biz. 법률 기초
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-15e/Course/C-LECTURE-100">
                          미국 Biz. 법률 기초
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/card/CARD-74q/view">
                          베트남 Biz. 법률
                          <br />
                          기초
                        </Link>
                      </td>
                      <td>
                        <Link to="#" onClick={emptyAlert}>
                          헝가리 Biz. 법률
                          <br />
                          기초
                        </Link>
                      </td>
                      <td>
                        <Link to="#" onClick={emptyAlert}>
                          폴란드 Biz. 법률
                          <br />
                          기초
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>세무/회계</span>
                      </th>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-j0/Course/C-LECTURE-fw">
                          중국 세무/회계 기초
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-yw/Course/C-LECTURE-uh">
                          미국 세무/회계 기초
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-j9/Course/C-LECTURE-g5">
                          베트남 세무/회계
                          <br />
                          기초
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-r9/Course/C-LECTURE-n2">
                          헝가리 세무/회계
                          <br />
                          기초
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-s3/Course/C-LECTURE-nr">
                          폴란드 세무/회계
                          <br />
                          기초
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>경제동향</span>
                      </th>
                      <td className="bg-none">
                        {/* <Link to='#' onClick={emptyAlert}></Link> */}
                      </td>
                      <td className="bg-none">
                        {/* <Link to='#' onClick={emptyAlert}></Link> */}
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-iu/Course/C-LECTURE-fr">
                          베트남 경제동향
                          <br />및 진출전략
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-199/Course/C-LECTURE-13j">
                          헝가리 Biz.
                          <br />
                          Landscape
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-mi/Course/C-LECTURE-iq">
                          폴란드 Biz.
                          <br />
                          Landscape
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <colgroup>
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-jq/Course/C-LECTURE-gm">
                          중국
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-k6/Course/C-LECTURE-gz">
                          미국
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-kx/Course/C-LECTURE-hr">
                          베트남
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/cube/CUBE-c0r/lecture-card/LECTURE-CARD-9mb">
                          헝가리
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/cube/CUBE-al8/lecture-card/LECTURE-CARD-8aq">
                          폴란드
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/card/CARD-acm/view">중동</Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="/lecture/card/CARD-12n5/view">
                          인도네시아
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-1bb/Course/C-LECTURE-152">
                          인도
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-1a7/Course/C-LECTURE-14h">
                          CIS
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-lb/Course/C-LECTURE-hx">
                          북한
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00006/course-plan/COURSE-PLAN-l7/Course/C-LECTURE-hv">
                          일본
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <colgroup>
                    <col width="528px" />
                    <col width="528px" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <Link to="/lecture/college/CLG00006/channel/CHN0006q">
                          중국 Issue &amp; Trend
                        </Link>
                      </td>
                      <td>
                        <Link to="/lecture/college/CLG00006/channel/CHN00056">
                          베트남 Issue &amp; Trend
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="global-link-bottom">
                  <Link to="/lecture/college/CLG00006/channel/CHN0000u">
                    <span>
                      <strong>Glopedia</strong>
                      <br />
                      (Global 경험을 축적하고 공유하는 커뮤니티)
                    </span>
                  </Link>
                </div>
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
              <div className="label">Leadership</div>
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
                    src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
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
                  style={{ flot: 'left' }}
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
              <div className="label">Management</div>
              <div className="strong">
                Deep Change를 위해 내가 하는 일은 어떻게 바뀌어야 할까요?
                <br />
                어떻게 성장할 수 있을까요?
              </div>
              <div className="normal">
                Management Category는 Deep Change를 위한 Biz. 실행 역량 제고를
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
              <div className="label">미래 반도체</div>
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
                    src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                    alt=""
                  />
                  과정 바로가기
                </Link>
              </div>
            </div>

            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="semi-topBackground" />
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
    menuItem: 'Green',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges11"
        >
          <div className="college-cont-title energy">
            <div className="belt sub">
              <div className="label">Green</div>
              <div className="strong">
                에너지솔루션 Category에서 진화한 “Green Category”
              </div>
              <div className="normal">
                환경 사업이 만드는 새로운 세상, 환경의 중요성에 대한 인식을
                제고하고,
                <br />
                탄소중립, 수소, 순환경제, 에너지솔루션 등에 필요한 전문지식을
                학습하여,
                <br />
                Green Deep Change에 한걸음 한걸음 나아가는 것을 목표로 하고
                있습니다.
                <br />
                환경 사업의 성공을 위한 우리의 도전, Green Start!
              </div>

              <div className="panopto sub">
                <Image
                  src={`${PUBLIC_URL}/images/all/envir-player.png`}
                  alt=""
                  style={{ display: 'inline-block' }}
                />
              </div>
            </div>
          </div>
          <div className="college-cont-map energe">
            <div className="belt">
              <div className="map">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/envir-con-01.png"
                  alt=""
                  style={{ display: 'inline-block' }}
                />
              </div>
            </div>
          </div>
          <div className="college-cont-map energe">
            <div className="belt">
              <div className="label energy">Green Category Curriculum</div>
              <div className="map">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/envir-con-02.png"
                  alt=""
                  style={{ display: 'inline-block' }}
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
              <div className="label">BM Design &#38; Storytelling</div>
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
                    src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
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
                  <Image src='https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png' alt="" style={{display: 'inline-block'}} />
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
              <div className="label">SK아카데미</div>
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
                mySUNI의 Management Category와 연계, 그룹 공통 직무 및 Biz.
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

const EnPanes = [
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
              <div className="label">AI</div>
              <div className="strong">
                From an AI outsider to an AI insider!
              </div>
              <div className="normal">
                AI Category provides opportunities to cultivate practical AI
                capacity to be used
                <br />
                every industry and job, and grow into an AI technology expert
                based on the foundational knowledge that all SK members need to
                know.
              </div>
              <div className="panopto sub">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/Ai-banner.png"
                  alt=""
                  className="ui image"
                />
              </div>
            </div>
          </div>

          <div className="college-free3 sub">
            <div className="tab-menu-wrap">
              <CollegeInnerEnTabAi />
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
              <div className="label">DT</div>
              <div className="strong">
                &quot;The group's deep change comes from our hands!&quot;
              </div>
              <div className="normal">
                DT Category offers courses for members who will lead the
                forefront of SK Deep Change by equipping themselves with digital
                skills and understanding the customers and the business.
              </div>
              <div className="panopto sub">
                <Image src={`${PUBLIC_URL}/images/all/Dt-banner.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="college-free3 sub">
            <div className="tab-menu-wrap">
              <CollegeInnerEnTabDt />
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Happiness',
    render: () => (
      <Tab.Pane>
        <div className="ui bottom attached segment active tab">
          <div
            className="ui attached tab full segment active"
            data-tab="colleges3"
          >
            <div className="college-cont-title happiness">
              <div className="belt">
                <div className="label">Happiness</div>
                <div className="strong">
                  For the happiness of all SK members!
                </div>
                <div className="normal">
                  Happiness Category aims to contribute substantially to the
                  pursuit of happiness of
                  <br />
                  all SK members by cultivating and putting into practice the
                  capacity to promote
                  <br />
                  happiness throughout life, including the workplace, on the
                  basis of understanding
                  <br />
                  the foundational concept of happiness and the SK management
                  philosophy.
                </div>
                <div className="panopto sub">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/happy-banner.png"
                    alt="하트이미지"
                    className="ui image"
                  />
                </div>
              </div>
            </div>
            <div className="college-cont-map">
              <div className="belt">
                <div className="map">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/happy_con_01_ENG.png"
                    alt="이렇게 행복을 만들어 가세요."
                    className="ui image"
                  />
                </div>
              </div>
            </div>
            <div className="college-cont-map">
              <div className="belt">
                <div className="map">
                  <img
                    src={`${PUBLIC_URL}/images/all/happy_con_02_ENG.png`}
                    //src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/happy_con_02_ENG.png"
                    alt="행복 Badge"
                    className="ui image"
                  />
                </div>
              </div>
            </div>
            <div className="college-cont-map pbtom">
              <div className="belt">
                <div className="map">
                  <img
                    //src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/happy_con_03_ENG.png"
                    src={`${PUBLIC_URL}/images/all/happy_con_03_ENG.png`}
                    alt="행복 컬리지 커리큘럼"
                    className="ui image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'SV·ESG',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges4"
        >
          <div className="college-cont-title sv">
            <div className="belt sub">
              <div className="label">SV·ESG</div>
              <div className="strong">
                SV·ESG for Tomorrow[Tomorrow+My Work],
                <br /> this is the Place where You become Competent in Achieving
                Sustainability in the Corporation and Society!
              </div>
              <div className="normal">
                Let's develop together the ability to empathize and resolve the
                pain points of stakeholders, which is the 'social value' that
                presents the direction of Deep Change
              </div>
              <ul className="tag-wrap">
                <li># Social Issues </li>
                <li># ESG</li>
                <li># SV Biz</li>
                <li># SV Measurement</li>
              </ul>
              <div className="panopto sub">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/sv-banner.png"
                  alt="Social Value"
                  className="ui image"
                />
              </div>
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt">
              <div className="map">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/sv_con_01_ENG.png"
                  alt="학습 FLOW"
                  className="ui image"
                />
              </div>
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt">
              <div className="map">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/sv_con_02_ENG.png"
                  alt="채널"
                  className="ui image"
                />
              </div>
            </div>
          </div>
          <div className="college-cont-map pbtom">
            <div className="belt">
              <div className="map">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/sv_con_03_ENG.png"
                  alt="전체커리큘럼"
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
    menuItem: 'Innovation & Design',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges5"
        >
          <div className="college-cont-title design">
            <div className="belt sub">
              <div className="label">Innovation & Design</div>
              <div className="strong">
                Understand the Customers and Innovate Design!
              </div>
              <div className="normal">
                Business that Starts from Customers We are here to help the
                learners be equipped with enhanced and innovative design
                capabilities necessary to seek ideas, solve customers’ problems
                with integrated thinking, and innovate ways of working
                relentlessly.
              </div>
              <div className="panopto sub">
                <iframe
                  title="audio type"
                  src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&amp;ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3D7658f240-2fd6-4f09-97fe-ab43006f0655"
                  width="436"
                  height="245"
                  allow="autoplay"
                  style={{ padding: '0px', border: '0px' }}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div className="college-cont-map sub2">
            <div className="belt inno">
              <div className="belt">
                <div className="text-left-box">
                  <p className="p_link inno">
                    {/* Click each badge and course to go to the corresponding page. */}
                  </p>
                </div>
                <div className="text-right-box">
                  <a className="item-button" href="#none">
                    <img
                      src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                      alt=""
                      className="ui image"
                      style={{ display: 'inline' }}
                    />
                    Go to Courses
                  </a>
                </div>
              </div>
              <div className="map">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/design_con_01_ENG.png"
                  alt="이렇게 활용해 보세요"
                  className="ui image"
                />
              </div>
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt">
              <div className="map">
                <h1 className="inno-title">
                  “Customer-centered problem solving and innovation in the way
                  we work based on integrated thinking”
                </h1>
                <div className="inno-top-btn">
                  <span>Available Soon</span>
                </div>
                <div className="inno-wrap">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/inno-level_ENG.png"
                    alt="세로제목"
                    className="ui image"
                  />
                  <div className="inno-item fi-item">
                    <h3># Design Thinking</h3>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="two dashed">
                            <a href="#none">
                              Coaching Skills
                              <br />
                              for Design Thinking
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
                            <a href="#none">
                              Design Thinking
                              <br />
                              Project
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              Design Thinking
                              <br />
                              Team W/S
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              Design Thinking
                              <br />
                              Workshop
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              Design Thinking
                              <br />
                              Self-Practice
                              <br />
                              (SV Cases)
                            </a>
                          </td>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <td className="dashed">
                            <a href="#none">
                              Service Design
                              <br />
                              Intensive
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              From Ideas to
                              <br />
                              Action - IDEO
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              Human-Centered
                              <br />
                              Service Design - IDEO
                            </a>
                          </td>
                          <td className="txt-small">
                            <a href="#none">
                              [Actual Project] <br /> Creating a
                              Customer-centered Biz, <br />
                              Topic 1-4
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <a href="#none">
                              Learning Through Design Thinking Cases (SV)
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              Design Thinking -<br />
                              LinkedIn
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              Hello Design
                              <br />
                              Thinking - IDEO
                            </a>
                          </td>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <td className="two">
                            <a href="#none">
                              Got the Tech, but Having Difficulties Making It a
                              Business?
                              <br />
                              Creating Customer-centered Biz! <br />
                              Part 1 Part 2
                            </a>
                          </td>
                          <td>
                            <a href="#none">Design Thinking Practice</a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="two">
                            <a href="#none">
                              First Encounter <br />
                              with Design Thinking
                            </a>
                          </td>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <td>
                            <a href="#none">
                              How to Come Up With a Creative Idea
                            </a>
                          </td>
                          <td>
                            <a href="#none">Business Ideation First Step</a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="inno-item">
                    <h3># Logical Thinking</h3>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td></td>
                          <td></td>
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
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td></td>
                          <td className="txt-small">
                            <a href="#none">
                              Learning the Skills of a Consultant Part 2:
                              Project Management & Strategic Perspectives
                            </a>
                          </td>
                          <td className="txt-small">
                            <a href="#none">
                              Learning the Skills of a Consultant Part 1:
                              Troubleshooting Methodology
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <a href="#none">
                              Play & Logic <br />A Passage to India
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              First Encounter with Logical Thinking
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="inno-item">
                    <h3># Knowing the Customers</h3>
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
                            <a href="#none">
                              Insights for
                              <br />
                              Innovation - IDEO
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <a href="#none">
                              The Story of Space Innovation and the Change
                              Thereof
                            </a>
                          </td>
                          <td>
                            <a href="#none">How to Do Customer Research</a>
                          </td>
                          <td>
                            <a href="#none">
                              Customer Needs
                              <br />
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
                            <a href="#none">What is a Customer Need?</a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="inno-item">
                    <h3># Working Backwards</h3>
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
                            <a href="#none">
                              Working Backwards
                              <br />
                              Project
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              Working Backwards
                              <br />
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
                            <a href="#none">
                              Working Backwards
                              <br />
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
                            <a href="#none">First Time: Working Backwards</a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="inno-item orange">
                    <h3># Agile</h3>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <a href="#none">
                              Agile Coach <br />
                              Meetup
                            </a>
                          </td>
                          <td className="dashed-or">
                            <a href="#none">
                              Agile Coach <br />
                              Training Course
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <a href="#none">Agile Project</a>
                          </td>
                          <td>
                            <a href="#none">
                              Agile Leadership(M3.0)
                              <br />
                              Workshop
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              Agile Dive
                              <br /> Workshop
                            </a>
                          </td>
                          <td className="dashed">
                            <a href="#none">
                              Agile Practice
                              <br />
                              (Self-practice)
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="small small2-1 dashed">
                            <a href="#none">WoW! Agile Transformation</a>
                          </td>
                          <td className="small dashed">
                            <a href="#none">Agile and Scrum</a>
                          </td>
                          <td className="small">
                            <a href="#none">Personal Kanban</a>
                          </td>
                          <td className="small">
                            <a href="#none">Kaizen Journey</a>
                          </td>
                          <td className="small small2-1">
                            <a href="#none">
                              Agile Methodology
                              <br />- LinkedIn
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="small">
                            <a href="#none">Agile Essentials</a>
                          </td>
                          <td className="small">
                            <a href="#none">The Manifesto for Agile</a>
                          </td>
                          <td className="small">
                            <a href="#none">First Encounter with Agile</a>
                          </td>
                          <td className="small">
                            <a href="#none">Why Agile</a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="inno-item orange">
                    <h3># Open Collaboration</h3>
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
                          <td>
                            <a href="#none">
                              Open Innovation
                              <br />
                              Project
                            </a>
                          </td>
                          <td></td>
                          <td className="dashed-or">
                            <a href="#none">
                              Open Innovation
                              <br />
                              Workshop
                            </a>
                          </td>
                          <td>
                            <a href="#none">Future Casting Workshop</a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="small">
                            <a href="#none">Futurecasting</a>
                          </td>
                          <td className="small">
                            <a href="#none">Lean Startup</a>
                          </td>
                          <td>
                            <a href="#none">
                              All about
                              <br />
                              Open Innovation
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              Creative Collabo
                              <br />
                              Skills - LinkedIn
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="two">
                            <a href="#none">
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
                        <a href="#none">Deep Change and Design</a>
                      </li>
                      <li>
                        <a href="#none">
                          The Importance of Customer Understanding, Remind!
                        </a>
                      </li>
                      <li>
                        <a href="#none">
                          Understanding YouTube's Design Thinking
                        </a>
                      </li>
                      <li>
                        <a href="#none">How to be Innovative</a>
                      </li>
                      <li>
                        <a href="#none">
                          Leading with
                          <br />
                          Innovation
                        </a>
                      </li>
                    </ul>
                    <h3># Deep Change and Design</h3>
                  </div>
                  <div className="inno-bottom con02">
                    <ul>
                      <li>
                        <a href="#none">
                          Trend &amp; Insight
                          <br />
                          Report
                        </a>
                      </li>
                      <li>
                        <a href="#none">Future Design to Lead Forward</a>
                      </li>
                      <li>
                        <a href="#none">Tips for Efficient Working</a>
                      </li>
                    </ul>
                    <h3># Innovation Trend and Insight</h3>
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
              <div className="label">Global</div>
              <div className="strong">A New Start for Globalization</div>
              <div className="normal">
                Global Category aims to foster "Global Managers" who can develop
                a "Global Pers-
                <br />
                pective" that can read the trends of global business and produce
                results even
                <br />
                when the environment changes. The college also hopes to train
                the human capital
                <br />
                that is required for the globalization of the SK Group.
              </div>
              <ul className="tag-wrap">
                <li># Geopolitics &amp; Biz</li>
                <li># Managing Global Biz</li>
                <li># Area Experts</li>
                <li># Glopedia</li>
                <li># Global Leader's Table</li>
              </ul>
              <div className="panopto sub">
                <iframe
                  title="audio type"
                  src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&amp;ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3D80b7b6d1-c2e6-41c0-9d93-ab42005d5dbf%26offerviewer%3Dfalse%26showtitle%3Dfalse%26interactivity%3Dnone%26showbrand%3Dfalse"
                  width="436"
                  height="245"
                  allow="autoplay"
                  style={{ padding: '0px', border: '0px' }}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt global flex mb50">
              <div className="text-left-box">
                <p className="p_link global">
                  {/* Click each badge and course to go to the corresponding page. */}
                </p>
              </div>
              <div className="text-right-box">
                <a href="#none" className="item-button">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                    alt=""
                  />
                  Go to Courses
                </a>
              </div>
            </div>
            <div className="belt global">
              <div className="label">
                Geopolitics &amp; Biz. / Managing Global Biz. Curriculum
              </div>
              <img
                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/global-college-top.svg"
                alt="H:Geopolitics&Biz/ ManagingGlobalBiz"
                className="global-top-img"
              />
              <img
                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/global-college-eng.png"
                alt="V:Advanced/Intermediate/Basic"
                className="global-left-img"
              />
              <div className="global-belt-wrap">
                <div className="global-belt flex">
                  <div className="global-curriculum-wrap">
                    <div className="global-component">
                      <div className="global-curriculum-box box-heit140">
                        <div className="curriculum-link-box">
                          <strong>Business Impact Analysis</strong>
                          <a href="#none">
                            <span>Geopolitical Scenario Planning</span>
                          </a>
                        </div>
                      </div>
                      <div className="global-curriculum-box box-heit220">
                        <div className="curriculum-link-box">
                          <strong>Impact on Industry/Commerce</strong>
                          <div className="link-wrap">
                            <a href="#none">
                              <span>
                                Geo. &amp; Biz.
                                <br />
                                Nexus
                              </span>
                            </a>
                            <div className="link-colum-box">
                              <a href="#none">
                                <span>
                                  US-China Tech Competition Ch.2
                                  <br />
                                  (Positions and Direction of Response)
                                </span>
                              </a>
                              <a href="#none">
                                <span>
                                  US-China Tech Competition Ch.1
                                  <br />
                                  (Changes in Legal/Institutional Environment)
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="global-curriculum-wrap wrap2">
                    <div className="global-component">
                      <div className="global-curriculum-box box-heit370">
                        <div className="curriculum-link-box">
                          <strong>Global Financial Story</strong>
                          <div className="link-wrap">
                            <div className="link-colum-box">
                              <a href="#none">
                                <span>
                                  Global Financial Story Case
                                  <br />
                                  Studies
                                </span>
                              </a>
                              <a href="#none">
                                <span>
                                  Understanding Global
                                  <br />
                                  Financial Story
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="global-curriculum-wrap wrap2">
                    <div className="global-component">
                      <div className="global-curriculum-box box-heit370">
                        <div className="curriculum-link-box">
                          <strong>Diversity Inclusion</strong>
                          <div className="link-wrap">
                            <div className="link-colum-box sty2">
                              <a href="#none">
                                <span>
                                  Working Together With Global
                                  <br />
                                  Members
                                </span>
                              </a>
                              <a href="#none">
                                <span>
                                  Understanding Diversity
                                  <br />
                                  Inclusion
                                </span>
                              </a>
                              <a href="#none">
                                <span>
                                  Diversity
                                  <br />
                                  Awareness
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="global-belt flex">
                  <div className="global-curriculum-wrap wrap3">
                    <div className="global-component">
                      <div className="global-curriculum-box box-heit380">
                        <div className="curriculum-link-box">
                          <strong>Why Geopolitics?</strong>
                          <div className="link-wrap big-colum">
                            <a href="#none">
                              <span>
                                How to manage
                                <br />
                                Geopolitical
                                <br />
                                Uncertainties?
                              </span>
                            </a>
                            <a href="#none">
                              <span>
                                Why Geopolitics for
                                <br />
                                Business?
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="global-curriculum-wrap wrap3 left-mg10">
                    <div className="global-component">
                      <div className="global-curriculum-box">
                        <div className="curriculum-link-box">
                          <strong>Recent Geopolitical Change</strong>
                          <div className="link-wrap big-colum">
                            <div className="link-colum-box">
                              <a href="#none">
                                <span>
                                  Changes in the International
                                  <br />
                                  Situation in the Era of Biden
                                </span>
                              </a>
                              <a href="#none">
                                <span>
                                  Status Quo and Essence of the
                                  <br />
                                  International Situation - Series 3
                                </span>
                              </a>
                              <a href="#none">
                                <span>
                                  Status Quo and Essence of the
                                  <br />
                                  International Situation - Series 2
                                </span>
                              </a>
                              <a href="#none">
                                <span>
                                  Status Quo and Essence of the
                                  <br />
                                  International Situation - Series 1
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="global-curriculum-wrap left-mg10">
                    <div className="global-component">
                      <div className="global-curriculum-box box-heit380">
                        <div className="curriculum-link-box">
                          <strong>
                            Global Communication Skill &amp; Attitude
                          </strong>
                          <div className="link-wrap type2">
                            <a href="#none">
                              <span>Global Business Manner</span>
                            </a>
                            <a href="#none">
                              <span>Global Biz Networking</span>
                            </a>
                            <a href="#none">
                              <span>Biz E-mail</span>
                            </a>
                            <a href="#none">
                              <span>Biz Meeting</span>
                            </a>
                            <a href="#none">
                              <span>Presentation</span>
                            </a>
                            <a href="#none">
                              <span>Biz Negotiations</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="global-link-bottom">
                    <a href="#none">
                      <span>
                        <strong>Global Leader’s Table</strong>
                        <br />
                        (Business insights from global gurus)
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt global">
              <div className="label">Local Expert Curriculum</div>
              <img
                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/global-college-location-top-ENG.png"
                alt="가로 : 지역전문가"
                className="global-top-img2"
              />
              <img
                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/global-college-location-contents-ENG.png"
                alt="세로 : LocalLeadership/지역전문가/국가의이해"
                className="global-left-img2"
              />
              <div className="global-belt-wrap section2">
                <div>
                  <a href="#none">
                    <span>Post-Expat</span>
                  </a>
                  <a href="#none">
                    <span>President of Corporation</span>
                  </a>
                  <a href="#none">
                    <span>
                      Local Experience
                      <br />
                      (Host-Country Nationals, Expatriates)
                    </span>
                  </a>
                </div>
                <table>
                  <colgroup>
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                  </colgroup>
                  <thead>
                    <th />
                    <th>
                      <span>China</span>
                    </th>
                    <th>
                      <span>US</span>
                    </th>
                    <th>
                      <span>Vietnam</span>
                    </th>
                    <th>
                      <span>Hungary</span>
                    </th>
                    <th>
                      <span>Poland</span>
                    </th>
                  </thead>
                  <tbody>
                    <tr>
                      <th>
                        <span>Networking</span>
                      </th>
                      <td>
                        <a href="#none">Basics of Chinese GR</a>
                      </td>
                      <td>
                        <a href="#none">
                          Networking with
                          <br />
                          Americans
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          What Expats Need to Know About Vietnam
                          <br />
                          and the Vietnamese
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          What Expats Need to Know About Hungary
                          <br />
                          and the Hungarian
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          What Expats Need to Know About Poland
                          <br />
                          and the Polish
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>Business Law</span>
                      </th>
                      <td>
                        <a href="#none">
                          Biz in China
                          <br />
                          Basics of Law
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          Biz in the U.S.
                          <br />
                          Basics of Law
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          Biz in Vietnam
                          <br />
                          Basics of Law
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          Biz in Hungary
                          <br />
                          Basics of Law
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          Biz in Poland
                          <br />
                          Basics of Law
                        </a>{' '}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>Tax/Accounting</span>
                      </th>
                      <td>
                        <a href="#none">
                          Basics of Tax/
                          <br />
                          Accounting in China
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          Basics of Tax/
                          <br />
                          Accounting in the US
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          Basics of Tax/
                          <br />
                          Accounting in Vietnam
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          Basics of Tax/
                          <br />
                          Accounting in Hungary
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          Basics of Tax/
                          <br />
                          Accounting in Poland
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>Economic Trend</span>
                      </th>
                      <td className="bg-none"></td>
                      <td className="bg-none"></td>
                      <td>
                        <a href="#none">
                          Economic Trends of
                          <br />
                          Vietnam, and
                          <br />
                          Strategies for Entering
                          <br />
                          Vietnamese Market
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          Biz in Hungary
                          <br />
                          Landscape
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          Biz in Poland
                          <br />
                          Landscape
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <colgroup>
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <a href="#none">China</a>
                      </td>
                      <td>
                        <a href="#none">US</a>
                      </td>
                      <td>
                        <a href="#none">Vietnam</a>
                      </td>
                      <td>
                        <a href="#none">Hungary</a>
                      </td>
                      <td>
                        <a href="#none">Poland</a>
                      </td>
                      <td>
                        <a href="#none">Middle East</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#none">Indonesia</a>
                      </td>
                      <td>
                        <a href="#none">India</a>
                      </td>
                      <td>
                        <a href="#none">CIS</a>
                      </td>
                      <td>
                        <a href="#none">North Korea</a>
                      </td>
                      <td>
                        <a href="#none">Japan</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <colgroup>
                    <col width="528px" />
                    <col width="528px" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <a href="#none">Issues and Trends in China</a>
                      </td>
                      <td>
                        <a href="#none">Issues and Trends in Vietnam</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="global-link-bottom">
                  <a href="#none">
                    <span>
                      <strong>Glopedia</strong>
                      <br />
                      (Community that accumulates and shares global experiences)
                    </span>
                  </a>
                </div>
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
              <div className="label">Leadership</div>
              <div className="strong">Grow into a Deep Change leader!</div>
              <div className="normal">
                Leadership Category helps all members grow into Deep Change
                leaders who can
                <br />
                self-grow, promote change in others, and innovate the company
                (BM, an
                <br />
                organization) by providing individual leadership diagnoses,
                customized capacity
                <br />
                development guides, the latest content, and an effective
                learning environment.
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
                  src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&amp;ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3D0b02b5c8-a5b7-438f-9366-ab4200a3bd77%26offerviewer%3Dfalse%26showtitle%3Dfalse%26interactivity%3Dnone%26showbrand%3Dfalse"
                  width="436"
                  height="245"
                  allow="autoplay"
                  style={{ padding: '0px', border: '0px' }}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          <div className="college-cont-map leadership">
            <div className="belt fu">
              <div className="text-left-box">
                <p className="p_link ">
                  {/* Click each badge and course to go to the corresponding page. */}
                </p>
              </div>
              <div className="text-right-box">
                <a className="item-button" href="#none">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                    alt=""
                    className="ui image"
                    style={{ display: 'inline-block' }}
                  />
                  Go to Courses
                </a>
              </div>
            </div>
            <div className="belt">
              <div className="label">Full Curriculum</div>
              <div className="map">
                <div className="ai-top-btn leaderShip">
                  <span className="ai-btn01 leader">VoD</span>
                  <span className="ai-btn02 leader sub">Non-VoD</span>
                </div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/leadership-level-ENG.png"
                  alt="세로:Advanced/Intermediate/Basic"
                  className="ui image"
                  style={{ float: 'left' }}
                />
                <div className="link_wrapper leadership">
                  <div className="leadership_box bg1">
                    <h3>Deep change Leadership</h3>
                    <div className="leadership_list">
                      <ul>
                        <li className="margin_25">
                          <div className="badge_box1 left">
                            <a className="card-badge-link" href="#none">
                              <img
                                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-card-badge-lv-3.png"
                                alt=""
                                className="ui image"
                              />
                            </a>
                          </div>
                          <a href="#none">
                            Leader as Coach
                            <br />
                            Advanced P/G
                          </a>
                        </li>
                        <li>
                          <div className="badge_box1 left">
                            <img
                              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-card-badge-lv-2.png"
                              alt=""
                              className="ui image"
                            />
                          </div>
                          <a href="#none">
                            Organization
                            <br />
                            Transformation
                          </a>
                        </li>
                        <li>
                          <div className="badge_box1 left">
                            <a className="card-badge-link" href="#none">
                              <img
                                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-card-badge-lv-2.png"
                                alt=""
                                className="ui image"
                              />
                            </a>
                          </div>
                          <a href="#none">Leader as Coach P/G</a>
                        </li>
                        <li>
                          <div className="badge_box1 left">
                            <img
                              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-card-badge-lv-2.png"
                              alt=""
                              className="ui image"
                            />
                          </div>
                          <a href="#none">
                            Leadership
                            <br />
                            Transformation
                          </a>
                        </li>
                        <li>
                          <a className="leader_blue" href="#none">
                            The Leader’s Way Driven by Sincerity
                          </a>
                        </li>
                        <li>
                          <a className="leader_blue" href="#none">
                            Deep Change &amp; Leadership? - Guide to
                            <br />
                            Practicing Purpose-based Deep Change
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="leadership_list bottom">
                      <ul>
                        <li>
                          <a className="leader_blue" href="#none">
                            Deep Change and Innovating the Corporate Culture
                          </a>
                        </li>
                        <li>
                          <a className="leader_blue" href="#none">
                            Deep Change Leadership Seen
                            <br />
                            in Movies
                          </a>
                        </li>
                        <li>
                          <a className="leader_blue" href="#none">
                            Understanding Deep Change
                            <br />
                            Leadership
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="leadership_box bg2">
                    <h3>Leadership Foundation</h3>
                    <ul>
                      <li className="leader_boxwrap margin_sm">
                        <p className="non-link">
                          Global Leadership
                          <br />
                          Acceleration P/G
                        </p>
                        <a href="#none">Remote Performance Mgmt.</a>
                        <a href="#none">Impactful Conversation</a>
                        <a href="#none">Drives for Engagement</a>
                        <a href="#none">Leveraging Conflict</a>
                        <a href="#none">EQ Leadership</a>
                      </li>
                      <li className="leader_boxwrap col-blue margin_sm">
                        <div className="badge_box1 left">
                          <a className="card-badge-link" href="#none">
                            <img
                              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-card-badge-lv-1.png"
                              alt=""
                              className="ui image"
                            />
                          </a>
                        </div>
                        <p className="non-link">Leadership Essentials</p>
                        <a className="bg_blue" href="#none">
                          Strategic Thinking
                        </a>
                        <a className="bg_blue" href="#none">
                          Remote Leadership
                        </a>
                        <a className="bg_blue" href="#none">
                          Coaching Leadership
                        </a>
                        <a className="bg_blue" href="#none">
                          Leader’s Storytelling
                        </a>
                        <a className="bg_blue" href="#none">
                          The Dignity of a Smart Leader
                        </a>
                        <a className="bg_blue" href="#none">
                          Motivation Designer
                        </a>
                      </li>
                      <li>
                        <a className="leader_blue" href="#none">
                          Rediscovering Conflict
                        </a>
                      </li>
                      <li>
                        <a className="leader_blue" href="#none">
                          Leadership Self-Assessment
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="leadership_box bg3">
                    <h3>Leadership Clinic</h3>
                    <ul>
                      <li className="leader_boxwrap col-blue">
                        <p className="non-link">Leadership Pain Points</p>
                        <a className="bg_blue" href="#none">
                          Self-growth
                        </a>
                        <a className="bg_blue" href="#none">
                          Performance
                        </a>
                        <a className="bg_blue" href="#none">
                          Synergy/Collaboration
                        </a>
                        <a className="bg_blue" href="#none">
                          Operating a Healthy Organization
                        </a>
                        <a className="bg_blue" href="#none">
                          Fostering Community Members
                        </a>
                      </li>
                      <li>
                        <a className="leader_blue" href="#none">
                          The World of the Leader Ⅰ, Ⅱ
                        </a>
                      </li>
                      <li>
                        <a className="leader_blue" href="#none">
                          One-on-One Meeting
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="leadership_box bg4">
                    <h3>Leadership Insight Cafe</h3>
                    <ul>
                      <li className="leader_boxwrap col-blue">
                        <p className="non-link">
                          Leadership, Finding its Way in Humanities
                        </p>
                        <a className="bg_blue" href="#none">
                          Karma &amp; Dharma
                        </a>
                        <a className="bg_blue" href="#none">
                          Leadership That Looks at the Future in Difficult Times
                        </a>
                      </li>
                      <li className="leader_boxwrap col-blue">
                        <p className="non-link">
                          Leadership Talk Portrayed in Psychology
                        </p>
                        <a className="bg_blue" href="#none">
                          I. Start of Change
                        </a>
                        <a className="bg_blue" href="#none">
                          II. Can't Sleep Thinking About These?
                        </a>
                        <a className="bg_blue" href="#none">
                          III. I Worry Because I’m a Leader
                        </a>
                      </li>
                      <li>
                        <a className="leader_blue" href="#none">
                          Understanding Generations - 86, X, MZ
                        </a>
                      </li>
                    </ul>
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
    menuItem: 'Management',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges8"
        >
          <div className="college-cont-title management">
            <div className="belt sub">
              <div className="label">Management</div>
              <div className="strong">
                How Should I Change My Work for Deep Change?
                <br />
                How Can I Improve Myself?
              </div>
              <div className="normal">
                Management Category conducts business to achieve Deep Change. It
                offers professional
                <br />
                lessons in 6 function groups and one competency area to
                reinforce the learners’ initiative.
                <br />
                Currently, the plan is the allowance of combining different
                functions (instead of just
                <br />
                knowledge and expertise of each function group) to ensure mixed
                and integrated skill sets.
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
              <CollegeInnerEnTabView />
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Future Semiconductor',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges9"
        >
          <div className="college-cont-title semicond">
            <div className="belt sub">
              <div className="label">Future Semiconductor</div>
              <div className="strong">
                Semiconductors, opening eyes that see the future.
              </div>
              <div className="normal">
                The college helps all SK members not only enhance their
                knowledge of semicon-
                <br />
                ductors that will be helpful to themselves, but also assess the
                nature of the semi- <br />
                conductor industry and predict the world that future
                technologies will open up.
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
                <li># Semiconductor History</li>
                <li># Prospect of the Semiconductor Industry</li>
                <li># Semiconductor Terminology</li>
                <li># Semiconductor Technology Theories</li>
                <li># Semiconductor Types</li>
                <li># Future Technology</li>
                <li># Semiconductor Ecosystem</li>
              </ul>
            </div>
          </div>

          <div className="college-cont-map pbtom">
            <div className="belt fu">
              <div className="text-left-box">
                {/* <p className="p_link ">
                  Click each badge and course to go to the corresponding page.
                </p> */}
              </div>
              <div className="text-right-box">
                <a href="#none" className="item-button">
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
              <div className="label">Full Curriculum</div>
              <div className="semi-topBackground" />
              <div className="map">
                <div className="semi-background">
                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan">
                        <div className="semi_txt">
                          <h3>
                            AI Manufacturing
                            <br />
                            Professional
                          </h3>
                          <p>
                            Semiconductor Engineering combined with AI/DT,
                            <br />
                            Securing the competency optimized for manufacturing
                            IT system
                            <br />
                            to become an AI manufacturing expert,
                            <br />
                            we support your continuous improvement
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle">
                          <ul>
                            <li>
                              <a href="#none">
                                Semiconductor FAB Production
                                <br />
                                and Operations Expert
                              </a>
                            </li>
                            <li className="dashed">
                              <Image
                                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/badge-open-blue-ENG.png"
                                alt=""
                                className="ui image"
                              />
                              <a href="#none">Smart SCM Expert</a>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <a href="#none">
                                Semiconductor FAB
                                <br />
                                Optimization Expert
                              </a>
                            </li>
                            <li className="dashed">
                              <Image
                                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/badge-open-blue-ENG.png"
                                alt=""
                                className="ui image"
                              />
                              <a href="#none">
                                AI manufacturing <br />
                                Project (PBL)
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="semi_badge">
                        <h4>AI Manufacturing Professional</h4>
                        <dl>
                          <dt>Badge Types</dt>
                          <dd>Future Business</dd>
                        </dl>
                        <dl>
                          <dt>Level</dt>
                          <dd>★ ★ ★</dd>
                        </dl>
                        <dl>
                          <dt>About the Certification</dt>
                          <dd>
                            Expert in Predicting Semiconductor
                            <br />
                            Demands using AI, Planning Optimized
                            <br />
                            Productions, and Decision Making.
                          </dd>
                        </dl>
                        <dl>
                          <dt>Requirements</dt>
                          <dd>
                            Requirements and Projects for Passing
                            <br />
                            the Course
                          </dd>
                        </dl>
                        <button type="button">To be Opened</button>
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
                            “Future Business and Technology
                            <br />
                            Exploration Site”to raise understanding and create
                            new business opportunities
                            <br />
                            in each field the future semiconductor
                            <br />
                            can be applied.
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle ver-top">
                          <ul>
                            <li>
                              <a href="#none">
                                AI Semiconductor
                                <br />
                                <span>Next Tech Trend</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                Car Semiconductor, Opportunities and Challenges
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                Next Generation Semiconductor
                                <br />
                                Packaging Technology
                              </a>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <a href="#none">
                                Neuromorphic Computing <br />
                                <span>Challenges and Opportunities</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                The Present and Future of
                                <br />
                                Quantum Computing and
                                <br />
                                Quantum Cryptography
                                <br />
                                Technologies
                              </a>
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
                            Smart Factory’s Basic Concept and
                            <br />
                            Components, Understanding Actual
                            <br />
                            FAB Automation System
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle pad">
                          <ul>
                            <li>
                              <a href="#none">
                                Decision Making and Under-
                                <br />
                                standing the Production System
                                <br />
                                to Actualize Smart Factory
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                Connection and Intellectuali-
                                <br />
                                zation of Smart Factory System
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                AI Algorithm-Based
                                <br />
                                Semiconductor Factory
                              </a>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <a href="#none">
                                Components and Cases of
                                <br />
                                Smart Factory
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                Advanced Technology
                                <br />
                                Meets Production
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                Understanding Semiconductor
                                <br />
                                FAB Automation
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="semi_badge">
                        <h4>Smart factory Fundamental</h4>
                        <dl>
                          <dt>Badge Types</dt>
                          <dd>Future Business</dd>
                        </dl>
                        <dl>
                          <dt>Level</dt>
                          <dd>★ ★</dd>
                        </dl>
                        <dl>
                          <dt>About the Certification</dt>
                          <dd>
                            Basic Concepts of Smart Factory and
                            <br />
                            Understanding the AI-based Semi-
                            <br />
                            conductor Production IT System
                          </dd>
                        </dl>
                        <dl>
                          <dt>Requirements</dt>
                          <dd>Take the course / Test and Perform Tasks</dd>
                        </dl>
                        <button type="button">To be Opened</button>
                      </div>
                    </div>
                  </div>

                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan">
                        <div className="semi_txt">
                          <h3>
                            Semiconductor Materials
                            <br />
                            Fundamental
                          </h3>
                          <p>
                            Comprehensive learning on the basic
                            <br />
                            theories and the application of
                            <br />
                            semiconductor processing is nece-
                            <br />
                            ssary to understand and develop
                            <br />
                            properties of semiconductor
                            <br />
                            materials.
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle ver-top">
                          <ul>
                            <li>
                              <a href="#none">Advanced Material</a>
                            </li>
                            <li>
                              <a href="#none">
                                Lithography Process and
                                <br />
                                Material
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                Metallization Process and
                                <br />
                                Material
                              </a>
                            </li>
                            <li>
                              <a href="#none">Solar Cell Device and Material</a>
                            </li>
                            <li>
                              <a href="#none">Thin Film Process and Material</a>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <a href="#none">
                                Image Sensor Device and
                                <br />
                                material
                              </a>
                            </li>
                            <li>
                              <a href="#none">Etching Process and Material</a>
                            </li>
                            <li>
                              <a href="#none">
                                Compound Semiconductor
                                <br />
                                Device and Material
                              </a>
                            </li>
                            <li>
                              <a href="#none">Doping Process and Material</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="semi_badge biz02 biz03">
                        <h4>Semiconductor Materials Fundamental</h4>
                        <dl>
                          <dt>Badge Types</dt>
                          <dd>Future Business</dd>
                        </dl>
                        <dl>
                          <dt>Level</dt>
                          <dd>★ ★</dd>
                        </dl>
                        <dl>
                          <dt>About the Certification</dt>
                          <dd>
                            Semiconductor Processing / Capacity to Connect Core
                            Materials per Device
                          </dd>
                        </dl>
                        <dl>
                          <dt>Requirements</dt>
                          <dd>
                            Take the course / Test and
                            <br />
                            Perform Tasks
                          </dd>
                        </dl>
                        <button type="button">To be Opened</button>
                      </div>
                    </div>
                  </div>

                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan">
                        <div className="semi_txt">
                          <h3>
                            AI Semiconductor
                            <br />
                            Fundamental
                          </h3>
                          <p>
                            Understanding the basic concepts to
                            <br />
                            HW development, the motion
                            <br />
                            principle, the kinds of AI hardware
                            <br />
                            necessary to process AI
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle">
                          <ul>
                            <li>
                              <a href="#none">
                                [Computer System] <br />
                                <span>
                                  Understanding the Motion of Computers
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [AI HW 101]
                                <br />
                                <span>AI Model</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [AI HW 101] <br />
                                <span> DNN HW Accelerator Architecture </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [HW Development] <br />
                                <span>Fundamentals</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">CPU Micro-Architecture</a>
                            </li>
                            <li>
                              <a href="#none">SoC Design Flow</a>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <a href="#none">
                                [AI HW 101] <br />
                                <span>AI Hardware</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [AI HW 101] <br />
                                <span>AI Platform</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [Understanding AI HW]
                                <br />
                                <span>
                                  Characteristics of DNN Algorithm
                                  <br />
                                  and Workload
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [HW Development]
                                <br />
                                <span>Analog Design</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">Digital Design</a>
                            </li>
                            <li>
                              <a href="#none">
                                SoC Design Case <br />
                                <span>Mobile Computing</span>
                              </a>
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
                          <h3>Semiconductor Tech Essential</h3>
                          <p>
                            Understanding semiconductor terminologies and
                            technologies that
                            <br />
                            even non-technical members can easily grasp
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle ver-mid">
                          <ul>
                            <li>
                              <a href="#none">
                                <strong className="ts_style">
                                  <img
                                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/tag-trend-tag-eng.svg"
                                    alt="Trend-setter"
                                  />
                                </strong>
                                Easy Peasy Lemon Squeezy <br />
                                Semiconductors
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                What Is Semiconductor?
                                <br />
                                <span>
                                  Semiconductor Tech
                                  <br />
                                  Encyclopedia
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [CEO Talks: President Lee, Seok-
                                <br />
                                hee of SK Hynix]
                                <br />
                                <span>
                                  Semiconductors, Opening a<br />
                                  Future
                                </span>
                              </a>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <a href="#none">
                                Smart IT Life
                                <br />
                                <span>
                                  Structure and Principle of
                                  <br />
                                  Electronic Device
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                Understanding Semiconductor
                                <br />
                                Right (Basic)
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="semi_badge">
                        <h4>Semiconductor Tech Essential</h4>
                        <dl>
                          <dt>Badge Types</dt>
                          <dd>Future Business</dd>
                        </dl>
                        <dl>
                          <dt>Level</dt>
                          <dd>★</dd>
                        </dl>
                        <dl>
                          <dt>About the Certification</dt>
                          <dd>
                            Acquire core concepts and terminologies in
                            semiconductor technology
                          </dd>
                        </dl>
                        <dl>
                          <dt>Requirements</dt>
                          <dd>
                            Finished 4 Courses / Passed the badge comprehensive
                            test (Scored 80 and above)
                          </dd>
                        </dl>
                        <a href="#none">Take the Challenge</a>
                      </div>
                    </div>
                  </div>

                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan">
                        <div className="semi_txt">
                          <h3>Semiconductor Business Essentials</h3>
                          <p>
                            Provides the basic knowledge and insight <br />
                            necessary to understand the semiconductor ecosystem
                            and <br />
                            future changes in the semiconductor industry
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle ver-top">
                          <ul className="sm">
                            <li>
                              <a href="#none">
                                [Semiconductors Portrayed in the
                                <br />
                                News]
                                <br />
                                <span>
                                  Near Future, Increasing Competitiveness in the
                                  Age of Big Data
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [Semiconductors Portrayed in the
                                <br />
                                News]
                                <span>
                                  AI Semiconductor and Analyzing
                                  <br />
                                  the Market According to the Various
                                  <br />
                                  Semiconductors Available on the Market
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [Semiconductors Portrayed in the News]
                                <br />
                                <strong className="ts_style">
                                  <img
                                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/tag-trend-tag-eng.svg"
                                    alt="Trend-setter"
                                  />
                                </strong>
                                <span>
                                  The Future of Semiconductor,
                                  <br />
                                  and How We Should Prepare
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [Understanding the Semiconductor
                                <br />
                                Industry Part2]
                                <span>
                                  Samsung Electronics,
                                  <br />
                                  The Reckless Champion
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [Understanding the Semiconductor
                                <br />
                                Industry Part4]
                                <span>
                                  Fabless and Foundry
                                  <br />
                                  - Opportunities and Strategies between
                                  <br />
                                  Gigantic IDM
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                News In-depth Analysis <br />
                                <span>
                                  United State’s Sanctions against China
                                  <br />
                                  and the Change in Semiconductor
                                  <br />
                                  Market
                                </span>
                              </a>
                            </li>
                          </ul>
                          <ul className="sm">
                            <li>
                              <a href="#none">
                                [Semiconductors Portrayed in the
                                <br />
                                News]
                                <span>Data Centric World</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [Semiconductors Portrayed in the
                                <br />
                                News]
                                <br />
                                <span>
                                  Semiconductor Value Chain
                                  <br />
                                  In-depth Analysis
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [Understanding the Semiconductor
                                <br />
                                Industry Part 1]
                                <br />
                                <span>
                                  Basic Concept of
                                  <br />
                                  Semiconductor Industry and Market
                                  <br />
                                  Competition
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [Understanding the Semiconductor
                                <br />
                                Industry Part 3]
                                <br />
                                <span>
                                  The Past, Present,
                                  <br />
                                  and Future of CPU Powerhouse, Intel
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [Understanding the Semiconductor
                                <br />
                                Industry Part 5]
                                <br />
                                <span>
                                  Future Prospects in the
                                  <br />
                                  Age of Infinite Competition- Challenges
                                  <br />
                                  and Tasks of Semiconductor Companies
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                The Effects of COVID-19 to the Supply
                                <br />
                                Chain of Semiconductor
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="semi_badge h441">
                        <h4>Semiconductor Business Essentials</h4>
                        <dl>
                          <dt>Badge Types</dt>
                          <dd>Future Business</dd>
                        </dl>
                        <dl>
                          <dt>Level</dt>
                          <dd>★</dd>
                        </dl>
                        <dl>
                          <dt>About the Certification</dt>
                          <dd>
                            Acquire basic knowledge necessary to
                            <br />
                            understanding and analyzing
                            <br />
                            semiconductor industry
                          </dd>
                        </dl>
                        <dl>
                          <dt>Requirements</dt>
                          <dd>
                            Finished 10 Courses / Passed the badge
                            <br />
                            comprehensive test(Scored 80 and
                            <br />
                            above)
                          </dd>
                        </dl>
                        <a
                          className="cha_btn"
                          href="#none"
                          style={{ fontWeight: 'bold' }}
                        >
                          Take the Challenge
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan conHeight02">
                        <div className="semi_txt">
                          <h3>Introduction to Semiconductors</h3>
                          <p>
                            Course with fun and interesting stories
                            <br />
                            for members who are new to learning
                            <br />
                            about semiconductors
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle">
                          <ul>
                            <li>
                              <a href="#none">
                                The Dictionary of Useful Semi-
                                <br />
                                conductors
                                <span>
                                  The Past, Present,
                                  <br />
                                  and Future of Semiconductor
                                  <br />
                                  Industry
                                </span>
                              </a>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <a href="#none">
                                Semiconductor Class
                                <br />
                                <span>
                                  Semiconductors with class,
                                  <br />
                                  learned with keywords
                                </span>
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
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Green',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges11"
        >
          <div className="college-cont-title energy">
            <div className="belt sub">
              <div className="label">Green</div>
              <div className="strong">
                The “Green Category”, the evolved version of Energy Solution
                Category
              </div>
              <div className="normal">
                The aim is to raise awareness of the importance of the
                environment and of the new
                <br />
                world the environment businesses make and equip learners with
                professional
                <br />
                knowledge essential to carbon neutrality, resource circulation,
                energy solution, etc.
                <br />
                It also aims to take a step one by one towards the “Green Deep
                Change.”
                <br />
                We challenge ourselves to the success of environmental
                businesses - Green Start!
              </div>
              <div className="panopto sub">
                <Image
                  src={`${PUBLIC_URL}/images/all/envir-player.png`}
                  alt=""
                  style={{ display: 'inline-block' }}
                />
              </div>
            </div>
          </div>
          <div className="college-cont-map energy">
            <div className="belt">
              <div className="map">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/envir-con-01-eng.png"
                  alt=""
                  style={{ display: 'inline-block' }}
                />
              </div>
            </div>
          </div>
          <div className="college-cont-map energe">
            <div className="belt">
              <div className="label energy">Green Category Curriculum</div>
              <div className="map">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/envir-con-02-eng.png"
                  alt=""
                  style={{ display: 'inline-block' }}
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
              <div className="label">BM Design &#38; Storytelling</div>
              <div className="strong">Ideate and Accelerate Deep Change!</div>
              <div className="normal">
                We are committed to actively support the cause of raising BM
                design experts and enhancing BM design and storytelling
                capacities in business and finance.
                <br />
                By doing so, we hope to contribute to bringing about the Deep
                Change outcomes in our group and subsidiaries.
              </div>
              <ul className="tag-wrap">
                <li># BM Innovation</li>
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
                {/* <p className="p_link" style={{ color: '#bd38a5' }}>
                  각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
                </p> */}
              </div>
              <div className="text-right-box">
                <a href="#none" className="item-button">
                  <Image
                    src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                    alt=""
                    style={{ display: 'inline-block' }}
                  />
                  Go to Courses
                </a>
              </div>
            </div>
            <div className="belt">
              <div className="map">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-co-11-1-eng.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="college-cont-map">
            <div className="belt">
              <div className="label">Full Curriculum</div>
              <div className="bm-top-btn">
                <span className="bm-btn01">On-Line</span>
                <span className="bm-btn02">Blended</span>
                <span className="bm-btn03">Off-Line</span>
              </div>
              <div className="map">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/bm-level-line-eng.png"
                  alt=""
                  style={{ float: 'left' }}
                />
                <div className="bm-wrap">
                  <div className="bm-flex">
                    <div className="bm-bg-box bg_type01">
                      <h3>
                        <a href="#none">BM Design @ Work</a>
                      </h3>
                      <p>( Prerequisite course: Becoming a BM Designer )</p>
                      <ul className="list_flex">
                        <li>
                          <a href="#none">
                            BM Design Practice
                            <br />
                            (4 weeks)
                          </a>
                        </li>
                        <li>
                          <a href="#none">
                            Decoupling Workshop
                            <br />
                            (2 days)
                          </a>
                        </li>
                        <li>
                          <a href="#none">
                            Environment∙Energy
                            <br />
                            BM Design Practice
                            <br />
                            (4 weeks)
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="bm-bg-box bg_type02">
                      <h3>
                        <a href="#none">Storytelling @ Work</a>
                      </h3>
                      <div className="bm-flex">
                        <ul className="list_bm bg_white">
                          <li>
                            <a href="#none">CEO 1:1 Course</a>
                          </li>
                          <li>
                            <a href="#none">6R Storytelling Workshop</a>
                          </li>
                        </ul>
                        <ul className="list_bm bg_white">
                          <li>
                            <a href="#none">
                              Leader Storytelling <br />
                              Workshop
                            </a>
                          </li>
                          <li>
                            <a href="#none">FS Expert Symposium</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bm-flex">
                    <div className="bm-bg-box bg_type01">
                      <h3>
                        <a href="#none">Becoming BM Designer</a>
                      </h3>
                      <ul className="list_flex md">
                        <li>
                          <a href="#none">
                            Ⅰ. As-Is BM
                            <br />
                            Sustainability
                          </a>
                        </li>
                        <li>
                          <a href="#none">Ⅱ. BM Environment Analysis</a>
                        </li>
                        <li>
                          <a href="#none">
                            Ⅲ. Strategy for
                            <br />
                            DiscoveringNew BM
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bm-flex">
                    <div className="bm-bg-box line_type01">
                      <h3>
                        <a href="#none">M&#38;A Design</a>
                      </h3>
                      <div className="bm-flex">
                        <ul className="list_bm">
                          <li>
                            <a href="#none">Ⅰ. M&#38;A Overview</a>
                          </li>
                          <li>
                            <a href="#none">
                              Ⅲ. Target Selection &amp;
                              <br />
                              Deal Structuring
                            </a>
                          </li>
                          <li>
                            <a href="#none">Ⅴ. Valuation</a>
                          </li>
                          <li>
                            <a href="#none">Ⅶ. Legal</a>
                          </li>
                          <li>
                            <a href="#none">
                              [AdvancedI] Deal Structuring
                              <br />
                              &amp; Financing
                            </a>
                          </li>
                        </ul>
                        <ul className="list_bm">
                          <li>
                            <a href="#none">Ⅱ. M&#38;A Strategy</a>
                          </li>
                          <li>
                            <a href="#none">Ⅳ. Due Diligence</a>
                          </li>
                          <li>
                            <a href="#none">Ⅵ. Negotiation</a>
                          </li>
                          <li>
                            <a href="#none">Ⅷ. PMI &#38; Value-up</a>
                          </li>
                          <li>
                            <a href="#none">[AdvancedⅡ] Legal</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bm-bg-box line_type01 height100">
                      <h3>
                        <a href="#none">Becoming Storyteller</a>
                      </h3>
                      <div className="bm-flex">
                        <ul className="list_bm">
                          <li>
                            <a href="#none">
                              Global Case Studies of
                              <br />
                              Financial Storytelling
                            </a>
                          </li>
                          <li>
                            <a href="#none">
                              [Focus] Financial <br />
                              Society Partnership
                            </a>
                          </li>
                        </ul>
                        <ul className="list_bm">
                          <li>
                            <a href="#none">
                              Understanding the 6R Perspectives Stakeholder
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bm-flex">
                    <div className="bm-bg-box line_type01">
                      <h3>
                        <a href="#none">BM Design Take-off</a>
                      </h3>
                      <ul className="list_flex md">
                        <li>
                          <a href="#none">
                            Ⅰ.Sustainable BM
                            <br />
                            The Importance of Innovation
                          </a>
                        </li>
                        <li>
                          <a href="#none">
                            Ⅱ. BM Framework
                            <br />
                            &amp; SK BM Innovation Efforts
                          </a>
                        </li>
                        <li>
                          <a href="#none">
                            Ⅲ. BM / Deep Change
                            <br />
                            Design and Execution
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="bm-bg-box line_type01">
                      <h3>
                        <a href="#none">Defining Storytelling</a>
                      </h3>
                      <ul className="list_flex md">
                        <li>
                          <a href="#none">
                            Understanding
                            <br />
                            Financial Story
                          </a>
                        </li>
                        <li>
                          <a href="#none">Financial Acumen</a>
                        </li>
                        <li>
                          <a href="#none">
                            Financial Story from the
                            <br />
                            Investor’s Point of View
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
    menuItem: 'SK Academy',
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
              <div className="label">SK Academy</div>
              <div className="strong">
                “The cradle of SK talent nurturing that has raised talented{' '}
                <br />
                employees like trees”
              </div>
              <div className="normal">
                SK Academy reinforces the foundation of SK corporate culture
                through the
                <br />
                spread of SKMS/Values, and nurtures future managers and business
                experts in
                <br />
                line with the systematic nurturing pipeline.
              </div>
              <ul className="tag-wrap">
                <li># New Employees</li>
                <li># Recruited Members</li>
                <li># New Team Leaders</li>
                <li># New Executives</li>
                <li># Recruited Executives</li>
                <li># HLP</li>
                <li># Female Leaders</li>
                <li># Capacity School</li>
                <li># HR Conference</li>
                <li># Global HR Seminar</li>
              </ul>
            </div>
          </div>
          <div className="college-cont-map skacademy">
            <div className="belt">
              <div className="label">Full Curriculum</div>
              <div className="map">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-co10_ENG.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="college-tag skacademy">
            <div className="belt">
              <div className="label chip5">SKMS / SK Values</div>
              <div className="strong">
                Spread SKMS/core values to new/recruited members and establish
                the roles of new team leaders to practice happiness management
              </div>
              <ul className="tag-wrap">
                <li># New Recruits</li>
                <li># Recruited Members</li>
                <li># New Team Leaders</li>
                <li># New Executives</li>
                <li># Recruited Executives</li>
                <li># Nurturing SKMS Instructors</li>
              </ul>
              <div className="label chip6">Nurturing Future Managers</div>
              <div className="strong">
                Systematic nurturing of future managers in connection with SK
                leadership pipeline and assessment
              </div>
              <ul className="tag-wrap">
                <li># HLP</li>
                <li># Female Leaders</li>
              </ul>
              <div className="label chip7">Capacity School</div>
              <div className="strong">
                Strengthening business specialty capacity in common job duties
                of the group in connection with the mySUNI Management Category
              </div>
              <ul className="tag-wrap">
                <li># Strategy Intermediate/Advanced</li>
                <li># Marketing Intermediate/Advanced</li>
                <li># Finance Intermediate/Advanced</li>
                <li># HR Intermediate/Advanced</li>
                <li># Purchasing Intermediate/Advanced</li>
                <li># Legal</li>
                <li># IP(Intellectual Property)</li>
                <li># M&amp;A</li>
                <li># Business Development</li>
                <li># Negotiation</li>
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

const ZhPanes = [
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
              <div className="label">AI</div>
              <div className="strong">
                从AI局外人（Outsider）到AI达人（Insider)!
              </div>
              <div className="normal">
                AI
                Category以所有SK成员都要了解的基础知识为基础，培养成员们在各产业和职务
                <br />
                能够灵活应用AI的实操力量，提供可以成长为AI技术专家的机会。
              </div>
              <div className="panopto sub">
                <Image src={`${PUBLIC_URL}/images/all/Ai-banner.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="college-free3 sub">
            <div className="tab-menu-wrap">
              <CollegeInnerZhTabAi />
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
              <div className="label">DT</div>
              <div className="strong">“小组的Deep Change在我们手中!”</div>
              <div className="normal">
                掌握Digital Skill，了解客户和行业，为引领SK Deep Change的成员在
                <br />
                DT Category开设的课程。
              </div>
              <div className="panopto sub">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/Dt-banner.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="college-free3 sub">
            <div className="tab-menu-wrap">
              <CollegeInnerZhTabDt />
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: '幸福',
    render: () => (
      <Tab.Pane>
        <div className="ui bottom attached segment active tab">
          <div
            className="ui attached tab full segment active"
            data-tab="colleges3"
          >
            <div className="college-cont-title happiness">
              <div className="belt">
                <div className="label">幸福</div>
                <div className="strong">为了SK全体成员的幸福!</div>
                <div className="normal">
                  基于对幸福的基本概念和SK经营哲学的理解，培养和实践包括工作在内的全部人
                  <br />
                  生中增进幸福的力量，把投身SK全体成员的幸福追求为目标。
                </div>
                <div className="panopto sub">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/happy-banner.png"
                    alt="하트이미지"
                    className="ui image"
                  />
                </div>
              </div>
            </div>
            <div className="college-cont-map">
              <div className="belt">
                <div className="map">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/happy_con_01_CHN.png"
                    alt="이렇게 행복을 만들어 가세요."
                    className="ui image"
                  />
                </div>
              </div>
            </div>
            <div className="college-cont-map">
              <div className="belt">
                <div className="map">
                  <img
                    src={`${PUBLIC_URL}/images/all/happy_con_02_CHN.png`}
                    //src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/happy_con_02_CHN.png"
                    alt="행복 Badge"
                    className="ui image"
                  />
                </div>
              </div>
            </div>
            <div className="college-cont-map pbtom">
              <div className="belt">
                <div className="map">
                  <img
                    src={`${PUBLIC_URL}/images/all/happy_con_03_CHN.png`}
                    //src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/happy_con_03_CHN.png"
                    alt="행복 컬리지 커리큘럼"
                    className="ui image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'SV·ESG',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges4"
        >
          <div className="college-cont-title sv">
            <div className="belt sub">
              <div className="label">SV·ESG</div>
              <div className="strong">
                为了明天的[Tomorrow+My
                Work]SV·ESG，为实现企业与社会的可持续发展，培养必备能力的地方！
              </div>
              <div className="normal">
                为Deep
                Change指明方向的“社会价值”利益相关者，理解他们的痛点，培养解决问题的能力！
              </div>
              <ul className="tag-wrap">
                <li># 社会问题</li>
                <li># ESG</li>
                <li># SV Biz</li>
                <li># SV测量</li>
              </ul>
              <div className="panopto sub">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/sv-banner.png"
                  alt="Social Value"
                  className="ui image"
                />
              </div>
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt">
              <div className="map">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/sv_con_01_CHN.png"
                  alt="학습 FLOW"
                  className="ui image"
                />
              </div>
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt">
              <div className="map">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/sv_con_02_CHN.png"
                  alt="채널"
                  className="ui image"
                />
              </div>
            </div>
          </div>
          <div className="college-cont-map pbtom">
            <div className="belt">
              <div className="map">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/sv_con_03_CHN.png"
                  alt="전체커리큘럼"
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
    menuItem: '创新设计',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges5"
        >
          <div className="college-cont-title design">
            <div className="belt sub">
              <div className="label">创新设计</div>
              <div className="strong">理解客户，设计创新！</div>
              <div className="normal">
                挖掘从客户角度出发的Biz.Idea，以综合思维解决客户问题，不断创新工作方式所
                <br />
                需的成员及组织创新设计能力提升。
              </div>
              <div className="panopto sub">
                <iframe
                  title="audio type"
                  src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&amp;ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3D7658f240-2fd6-4f09-97fe-ab43006f0655"
                  width="436"
                  height="245"
                  allow="autoplay"
                  style={{ padding: '0px', border: '0px' }}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div className="college-cont-map sub2">
            <div className="belt inno">
              <div className="belt">
                <div className="text-left-box">
                  <p className="p_link inno">
                    {/* 点击各Badge与课程，即可进入到相应页面。 */}
                  </p>
                </div>
                <div className="text-right-box">
                  <a className="item-button" href="#none">
                    <img
                      src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                      alt=""
                      className="ui image"
                      style={{ display: 'inline' }}
                    />
                    直接进入课程
                  </a>
                </div>
              </div>
              <div className="map">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/design_con_01_CHN.png"
                  alt="课程使用指南"
                  className="ui image"
                />
              </div>
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt">
              <div className="map">
                <h1 className="inno-title">
                  “基于综合思维，以客户为中心解决问题，创新工作方式。”
                </h1>
                <div className="inno-top-btn">
                  <span>即将开设</span>
                </div>
                <div className="inno-wrap">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/inno-level_CHN.png"
                    alt="세로제목"
                    className="ui image"
                  />
                  <div className="inno-item fi-item">
                    <h3># 设计思维</h3>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="two dashed">
                            <a href="#none">设计思维指导技巧</a>
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
                            <a href="#none">
                              设计思维
                              <br />
                              Project
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              设计思维
                              <br />
                              Team W/S
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              设计思维
                              <br />
                              Workshop
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              设计思维Self实习
                              <br />
                              （SV案例）
                            </a>
                          </td>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <td className="dashed">
                            <a href="#none">
                              服务设计
                              <br />
                              Intensive
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              From Ideas to
                              <br />
                              Action - IDEO
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              Human-Centered
                              <br />
                              Service Design - <br />
                              IDEO
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              [实战项目] <br />
                              打造以顾客为中心的Biz <br />
                              Topic 1-4
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <a href="#none">
                              通过了解设计思维
                              <br />
                              案例（SV）学习
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              设计思维 -<br />
                              LinkedIn
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              Hello Design
                              <br />
                              Thinking - IDEO
                            </a>
                          </td>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <td></td>
                          <td className="txt-small txt-break">
                            <a href="#none">
                              拥有技术却无法加以商业化？
                              <br />
                              以顾客为中心的Biz！
                              <br />
                              第一部 第二部
                            </a>
                          </td>
                          <td>
                            <a href="#none">设计思维练习</a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="two">
                            <a href="#none">
                              第一次接触的设
                              <br />
                              计思维
                            </a>
                          </td>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <td>
                            <a href="#none">创意IDEA思维发散法</a>
                          </td>
                          <td>
                            <a href="#none">Biz.Ideation的第一步</a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="inno-item">
                    <h3># 逻辑思维</h3>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td></td>
                          <td></td>
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
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td></td>
                          <td>
                            <a href="#none">
                              掌握顾问的业务水平
                              <br />
                              第二部
                              <br />
                              项目管理&战略观点
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              掌握顾问的业务水平
                              <br />
                              第一部
                              <br />
                              问题解决方法论
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <a href="#none">Logic & Play印度之旅</a>
                          </td>
                          <td>
                            <a href="#none">初次相逢的逻辑思考</a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="inno-item">
                    <h3># 了解客户</h3>
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
                            <a href="#none">
                              Insights for
                              <br />
                              Innovation - IDEO
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <a href="#none">
                              关于空间创新及其
                              <br />
                              变化的故事
                            </a>
                          </td>
                          <td>
                            <a href="#none">客户 Research方法</a>
                          </td>
                          <td>
                            <a href="#none">
                              客户 Needs
                              <br />
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
                            <a href="#none">客户Need是？</a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="inno-item">
                    <h3># 逆向工作</h3>
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
                            <a href="#none">
                              逆向工作
                              <br />
                              Project
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              逆向工作
                              <br />
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
                            <a href="#none">
                              逆向工作
                              <br />
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
                            <a href="#none">
                              第一次接触的
                              <br />
                              设计思维
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="inno-item orange">
                    <h3># 敏捷</h3>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <a href="#none">
                              敏捷训练
                              <br />
                              Meetup
                            </a>
                          </td>
                          <td className="dashed-or">
                            <a href="#none">
                              敏捷训练
                              <br />
                              课程
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td>
                            <a href="#none">敏捷 Project</a>
                          </td>
                          <td>
                            <a href="#none">
                              敏捷领导力(M3.0)
                              <br />
                              Workshop
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              敏捷Dive
                              <br /> Workshop
                            </a>
                          </td>
                          <td className="dashed">
                            <a href="#none">
                              敏捷Practice
                              <br />
                              (Self实习)
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>

                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="small small2-1 dashed">
                            <a href="#none">WoW! 敏捷变身</a>
                          </td>
                          <td className="small dashed">
                            <a href="#none">敏捷与Scrum</a>
                          </td>
                          <td className="small">
                            <a href="#none">个人看板管理</a>
                          </td>
                          <td className="small">
                            <a href="#none">改善法日志</a>
                          </td>
                          <td className="small small2-1">
                            <a href="#none">
                              敏捷方法论
                              <br />- LinkedIn
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="small">
                            <a href="#none">敏捷Essential</a>
                          </td>
                          <td className="small">
                            <a href="#none">敏捷宣言</a>
                          </td>
                          <td className="small">
                            <a href="#none">第一次接触的敏捷</a>
                          </td>
                          <td className="small">
                            <a href="#none">Why敏捷？</a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="inno-item orange">
                    <h3># 开放式合作</h3>
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
                          <td>
                            <a href="#none">
                              开放式创新
                              <br />
                              Project
                            </a>
                          </td>
                          <td></td>
                          <td className="dashed-or">
                            <a href="#none">
                              开放式创新
                              <br />
                              Workshop
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              创造未来
                              <br />
                              Workshop
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="small">
                            <a href="#none">未来投射</a>
                          </td>
                          <td className="small">
                            <a href="#none">精益创业</a>
                          </td>
                          <td>
                            <a href="#none">
                              All about
                              <br />
                              开放式创新
                            </a>
                          </td>
                          <td>
                            <a href="#none">
                              Creative Collabo
                              <br />
                              Skills - LinkedIn
                            </a>
                          </td>
                        </tbody>
                      </table>
                    </div>
                    <div className="inno-li">
                      <table>
                        <tbody>
                          <td className="two">
                            <a href="#none">
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
                        <a href="#none">
                          Deep Change
                          <br />
                          和Design理解
                        </a>
                      </li>
                      <li>
                        <a href="#none">
                          理解客户的重要性，
                          <br />
                          Remind！
                        </a>
                      </li>
                      <li>
                        <a href="#none">
                          YouTube
                          <br />
                          设计思维的理解
                        </a>
                      </li>
                      <li>
                        <a href="#none">创新秘诀</a>
                      </li>
                      <li>
                        <a href="#none">
                          Leading with
                          <br />
                          Innovation
                        </a>
                      </li>
                    </ul>
                    <h3># Deep Change与Design</h3>
                  </div>
                  <div className="inno-bottom con02">
                    <ul>
                      <li>
                        <a href="#none">
                          Trend &amp; Insight
                          <br />
                          Report
                        </a>
                      </li>
                      <li>
                        <a href="#none">为实现突破设计未来</a>
                      </li>
                      <li>
                        <a href="#none">高效工作的Tip</a>
                      </li>
                    </ul>
                    <h3># 创新趋势和洞察</h3>
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
              <div className="label">Global</div>
              <div className="strong">基于Globalization的新开始</div>
              <div className="normal">
                目标是培养能够解读全球商业格局的“Global Perspective”
                <br />
                培养即使环境改变也能取得成果的“Global Manager”。
                <br />
                通过这些培养SK集团的Globalization所需要的Human Capital。
              </div>
              <ul className="tag-wrap">
                <li># Geopolitics &amp; Biz</li>
                <li># Managing Global Biz</li>
                <li># 地区专家</li>
                <li># Glopedia</li>
                <li># Global Leader's Table</li>
              </ul>
              <div className="panopto sub">
                <iframe
                  title="audio type"
                  src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&amp;ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3D80b7b6d1-c2e6-41c0-9d93-ab42005d5dbf%26offerviewer%3Dfalse%26showtitle%3Dfalse%26interactivity%3Dnone%26showbrand%3Dfalse"
                  width="436"
                  height="245"
                  allow="autoplay"
                  style={{ padding: '0px', border: '0px' }}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt global flex mb50">
              <div className="text-left-box">
                <p className="p_link global">
                  {/* 点击各Badge与课程，即可进入到相应页面。 */}
                </p>
              </div>
              <div className="text-right-box">
                <a href="#none" className="item-button">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                    alt=""
                  />
                  直接进入课程
                </a>
              </div>
            </div>
            <div className="belt global">
              <div className="label">
                Geopolitics & Biz./Managing Global Biz.课程
              </div>
              <img
                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/global-college-top.svg"
                alt="Horizontal:Geopolitics&Biz/ ManagingGlobalBiz"
                className="global-top-img"
              />
              <img
                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/global-college-left-chn.png"
                alt="vertical:Advanced/Intermediate/Basic "
                className="global-left-img"
              />
              <div className="global-belt-wrap">
                <div className="global-belt flex">
                  <div className="global-curriculum-wrap">
                    <div className="global-component">
                      <div className="global-curriculum-box box-heit140">
                        <div className="curriculum-link-box">
                          <strong>Biz.Impact分析</strong>
                          <a href="#none">
                            <span>Geopolitical Scenario Planning</span>
                          </a>
                        </div>
                      </div>
                      <div className="global-curriculum-box box-heit220">
                        <div className="curriculum-link-box">
                          <strong>对产业/贸易产生的影响</strong>
                          <div className="link-wrap">
                            <a href="#none">
                              <span>
                                Geo. &amp; Biz.
                                <br />
                                Nexus
                              </span>
                            </a>
                            <div className="link-colum-box">
                              <a href="#none">
                                <span>
                                  中美Tech竞争Ch.2
                                  <br />
                                  （立场与应对方向）
                                </span>
                              </a>
                              <a href="#none">
                                <span>
                                  中美Tech竞争Ch.1
                                  <br />
                                  （法律/制度环境变化）
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="global-curriculum-wrap wrap2">
                    <div className="global-component">
                      <div className="global-curriculum-box box-heit370">
                        <div className="curriculum-link-box">
                          <strong>Global Financial Story</strong>
                          <div className="link-wrap">
                            <div className="link-colum-box">
                              <a href="#none">
                                <span>
                                  Global Financial Story
                                  <br />
                                  案例学习
                                </span>
                              </a>
                              <a href="#none">
                                <span>
                                  Global Financial Story的
                                  <br />
                                  理解
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="global-curriculum-wrap wrap2">
                    <div className="global-component">
                      <div className="global-curriculum-box box-heit370">
                        <div className="curriculum-link-box">
                          <strong>Diversity Inclusion</strong>
                          <div className="link-wrap">
                            <div className="link-colum-box sty2">
                              <a href="#none">
                                <span>与全球成员共事</span>
                              </a>
                              <a href="#none">
                                <span>
                                  理解
                                  <br />
                                  Diversity Inclusion
                                </span>
                              </a>
                              <a href="#none">
                                <span>
                                  Diversity
                                  <br />
                                  Awareness
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="global-belt flex">
                  <div className="global-curriculum-wrap wrap3">
                    <div className="global-component">
                      <div className="global-curriculum-box box-heit380">
                        <div className="curriculum-link-box">
                          <strong>Why Geopolitics?</strong>
                          <div className="link-wrap big-colum">
                            <a href="#none">
                              <span>
                                How to manage
                                <br />
                                Geopolitical
                                <br />
                                Uncertainties?
                              </span>
                            </a>
                            <a href="#none">
                              <span>
                                Why Geopolitics for
                                <br />
                                Business?
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="global-curriculum-wrap wrap3 left-mg10">
                    <div className="global-component">
                      <div className="global-curriculum-box">
                        <div className="curriculum-link-box">
                          <strong>地缘政治学变化动向</strong>
                          <div className="link-wrap big-colum">
                            <div className="link-colum-box">
                              <a href="#none">
                                <span>
                                  拜登时代，
                                  <br />
                                  国际形势的变化
                                </span>
                              </a>
                              <a href="#none">
                                <span>
                                  国际形势的现象与本质
                                  <br />
                                  Series 3
                                </span>
                              </a>
                              <a href="#none">
                                <span>
                                  国际形势的现象与本质
                                  <br />
                                  Series 2
                                </span>
                              </a>
                              <a href="#none">
                                <span>
                                  国际形势的现象与本质
                                  <br />
                                  Series 1
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="global-curriculum-wrap left-mg10">
                    <div className="global-component">
                      <div className="global-curriculum-box box-heit380">
                        <div className="curriculum-link-box">
                          <strong>
                            Global Communication Skill &amp; Attitude
                          </strong>
                          <div className="link-wrap type2">
                            <a href="#none">
                              <span>全球商务礼仪</span>
                            </a>
                            <a href="#none">
                              <span>全球Biz. Networking</span>
                            </a>
                            <a href="#none">
                              <span>商务邮件</span>
                            </a>
                            <a href="#none">
                              <span>商务会议</span>
                            </a>
                            <a href="#none">
                              <span>Presentation</span>
                            </a>
                            <a href="#none">
                              <span>商业谈判</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="global-link-bottom">
                    <a href="#none">
                      <span>
                        <strong>Global Leader’s Table</strong>
                        <br />
                        (Global Guru们讲述的商业洞察)
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt global">
              <div className="label">地域专家课程</div>
              <img
                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/global-college-location-top-CHN.png"
                alt="가로 : 지역전문가"
                className="global-top-img2"
              />
              <img
                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/global-college-location-contents-CHN.png"
                alt="세로 : LocalLeadership/지역전문가/국가의이해"
                className="global-left-img2"
              />
              <div className="global-belt-wrap section2">
                <div>
                  <a href="#none">
                    <span>Post驻在员</span>
                  </a>
                  <a href="#none">
                    <span>法人长</span>
                  </a>
                  <a href="#none">
                    <span>
                      Local Experience
                      <br />
                      (当地员工，驻在员)
                    </span>
                  </a>
                </div>
                <table>
                  <colgroup>
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                  </colgroup>
                  <thead>
                    <th></th>
                    <th>
                      <span>中国</span>
                    </th>
                    <th>
                      <span>美国</span>
                    </th>
                    <th>
                      <span>越南</span>
                    </th>
                    <th>
                      <span>匈牙利</span>
                    </th>
                    <th>
                      <span>波兰</span>
                    </th>
                  </thead>
                  <tbody>
                    <tr>
                      <th>
                        <span>Networking</span>
                      </th>
                      <td>
                        <a href="#none">中国GR基础</a>
                      </td>
                      <td>
                        <a href="#none">
                          Networking with
                          <br />
                          Americans
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          驻在员需要了解的
                          <br />
                          越南、越南人
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          驻在员需要了解的
                          <br />
                          匈牙利、匈牙利人
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          驻在员需要了解的
                          <br />
                          波兰、波兰人
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>Biz法律</span>
                      </th>
                      <td>
                        <a href="#none">中国Biz.法律基础</a>
                      </td>
                      <td>
                        <a href="#none">美国Biz.法律基础</a>
                      </td>
                      <td>
                        <a href="#none">越南Biz.法律基础</a>
                      </td>
                      <td>
                        <a href="#none">匈牙利Biz.法律基础</a>
                      </td>
                      <td>
                        <a href="#none">波兰Biz.法律基础</a>{' '}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>税务/会计</span>
                      </th>
                      <td>
                        <a href="#none">中国税务/会计基础</a>
                      </td>
                      <td>
                        <a href="#none">美国税务/会计基础</a>
                      </td>
                      <td>
                        <a href="#none">
                          越南税务/会计
                          <br />
                          基础
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          匈牙利税务/会计
                          <br />
                          基础
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          波兰税务/会计
                          <br />
                          基础
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>经济动向</span>
                      </th>
                      <td className="bg-none"></td>
                      <td className="bg-none"></td>
                      <td>
                        <a href="#none">
                          越南经济动向与市场
                          <br />
                          进入战略
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          匈牙利Biz.
                          <br />
                          Landscape
                        </a>
                      </td>
                      <td>
                        <a href="#none">
                          波兰Biz.
                          <br />
                          Landscape
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <colgroup>
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                    <col width="169px" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <a href="#none">中国</a>
                      </td>
                      <td>
                        <a href="#none">美国</a>
                      </td>
                      <td>
                        <a href="#none">越南</a>
                      </td>
                      <td>
                        <a href="#none">匈牙利</a>
                      </td>
                      <td>
                        <a href="#none">波兰</a>
                      </td>
                      <td>
                        <a href="#none">中东</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#none">印尼</a>
                      </td>
                      <td>
                        <a href="#none">印度</a>
                      </td>
                      <td>
                        <a href="#none">CIS</a>
                      </td>
                      <td>
                        <a href="#none">朝鲜</a>
                      </td>
                      <td>
                        <a href="#none">日本</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <colgroup>
                    <col width="528px" />
                    <col width="528px" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <a href="#none">中国 Issue &amp; Trend</a>
                      </td>
                      <td>
                        <a href="#none">越南 Issue &amp; Trend</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="global-link-bottom">
                  <a href="#none">
                    <span>
                      <strong>Glopedia</strong>
                      <br />
                      (积累并共享Global经验的社区)
                    </span>
                  </a>
                </div>
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
              <div className="label">Leadership</div>
              <div className="strong">成长为Deep Change Leader！</div>
              <div className="normal">
                支持个人领导能力诊断和定制型力量开发指南，提供最新内容和有效的学习环境，
                <br />
                帮助所有成员自我成长、带动变化他人、改革公司（BM、组织）的Deep
                Change
                <br />
                Leader。
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
                  src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&amp;ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3D0b02b5c8-a5b7-438f-9366-ab4200a3bd77%26offerviewer%3Dfalse%26showtitle%3Dfalse%26interactivity%3Dnone%26showbrand%3Dfalse"
                  width="436"
                  height="245"
                  allow="autoplay"
                  style={{ padding: '0px', border: '0px' }}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          <div className="college-cont-map leadership">
            <div className="belt fu">
              <div className="text-left-box">
                <p className="p_link ">
                  {/* 点击各Badge与课程，即可进入到相应页面。 */}
                </p>
              </div>
              <div className="text-right-box">
                <a className="item-button" href="#none">
                  <img
                    src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                    alt=""
                    className="ui image"
                    style={{ display: 'inline-block' }}
                  />
                  直接进入课程
                </a>
              </div>
            </div>
            <div className="belt">
              <div className="label">全部课程</div>
              <div className="map">
                <div className="ai-top-btn leaderShip">
                  <span className="ai-btn01 leader">VoD</span>
                  <span className="ai-btn02 leader sub">Non-VoD</span>
                </div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/leadership-level-CHN.png"
                  alt="세로:Advanced/Intermediate/Basic"
                  className="ui image"
                  style={{ float: 'left' }}
                />
                <div className="link_wrapper leadership">
                  <div className="leadership_box bg1">
                    <h3>Deep change Leadership</h3>
                    <div className="leadership_list">
                      <ul>
                        <li className="margin_25">
                          <div className="badge_box1 left">
                            <a className="card-badge-link" href="#none">
                              <img
                                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-card-badge-lv-3.png"
                                alt=""
                                className="ui image"
                              />
                            </a>
                          </div>
                          <a href="#none">
                            Leader as Coach
                            <br />
                            Advanced P/G
                          </a>
                        </li>
                        <li>
                          <div className="badge_box1 left">
                            <img
                              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-card-badge-lv-2.png"
                              alt=""
                              className="ui image"
                            />
                          </div>
                          <a href="#none">
                            Organization
                            <br />
                            Transformation
                          </a>
                        </li>
                        <li>
                          <div className="badge_box1 left">
                            <a className="card-badge-link" href="#none">
                              <img
                                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-card-badge-lv-2.png"
                                alt=""
                                className="ui image"
                              />
                            </a>
                          </div>
                          <a href="#none">Leader as Coach P/G</a>
                        </li>
                        <li>
                          <div className="badge_box1 left">
                            <img
                              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-card-badge-lv-2.png"
                              alt=""
                              className="ui image"
                            />
                          </div>
                          <a href="#none">
                            Leadership
                            <br />
                            Transformation
                          </a>
                        </li>
                        <li>
                          <a className="leader_blue" href="#none">
                            真诚主导的领导者之路
                          </a>
                        </li>
                        <li>
                          <a className="leader_blue" href="#none">
                            Deep Change & 领导力？-基于目标的
                            <br />
                            深度变革实践指南
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="leadership_list bottom">
                      <ul>
                        <li>
                          <a className="leader_blue" href="#none">
                            深度变革与企业文化创新
                          </a>
                        </li>
                        <li>
                          <a className="leader_blue" href="#none">
                            通过电影看
                            <br />
                            Deep Change Leadership
                          </a>
                        </li>
                        <li>
                          <a className="leader_blue" href="#none">
                            Deep Change leadership理解
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="leadership_box bg2">
                    <h3>Leadership Foundation</h3>
                    <ul>
                      <li className="leader_boxwrap margin_sm">
                        <p className="non-link">
                          Global Leadership
                          <br />
                          Acceleration P/G
                        </p>
                        <a href="#none">Remote Performance Mgmt.</a>
                        <a href="#none">Impactful Conversation</a>
                        <a href="#none">Drives for Engagement</a>
                        <a href="#none">Leveraging Conflict</a>
                        <a href="#none">EQ Leadership</a>
                      </li>
                      <li className="leader_boxwrap col-blue margin_sm">
                        <div className="badge_box1 left">
                          <a className="card-badge-link" href="#none">
                            <img
                              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-card-badge-lv-1.png"
                              alt=""
                              className="ui image"
                            />
                          </a>
                        </div>
                        <p className="non-link">Leadership Essentials</p>
                        <a className="bg_blue" href="#none">
                          战略性思维
                        </a>
                        <a className="bg_blue" href="#none">
                          Remote Leadership
                        </a>
                        <a className="bg_blue" href="#none">
                          Coaching Leadership
                        </a>
                        <a className="bg_blue" href="#none">
                          领导者的story telling
                        </a>
                        <a className="bg_blue" href="#none">
                          明智领导者的委任
                        </a>
                        <a className="bg_blue" href="#none">
                          Motivation Designer
                        </a>
                      </li>
                      <li>
                        <a className="leader_blue" href="#none">
                          重新发现冲突
                        </a>
                      </li>
                      <li>
                        <a className="leader_blue" href="#none">
                          Leadership Self-Assessment
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="leadership_box bg3">
                    <h3>Leadership Clinic</h3>
                    <ul>
                      <li className="leader_boxwrap col-blue">
                        <p className="non-link">Leadership Pain Points</p>
                        <a className="bg_blue" href="#none">
                          自我成长
                        </a>
                        <a className="bg_blue" href="#none">
                          Performance
                        </a>
                        <a className="bg_blue" href="#none">
                          互助/协作
                        </a>
                        <a className="bg_blue" href="#none">
                          健康的组织运营
                        </a>
                        <a className="bg_blue" href="#none">
                          成员培养
                        </a>
                      </li>
                      <li>
                        <a className="leader_blue" href="#none">
                          领导者的世界Ⅰ, Ⅱ
                        </a>
                      </li>
                      <li>
                        <a className="leader_blue" href="#none">
                          一对一会议
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="leadership_box bg4">
                    <h3>Leadership Insight Cafe</h3>
                    <ul>
                      <li className="leader_boxwrap col-blue">
                        <p className="non-link">领导力，从人文学寻找答案。</p>
                        <a className="bg_blue" href="#none">
                          Karma &amp; Dharma
                        </a>
                        <a className="bg_blue" href="#none">
                          苦难时代，看向未来的领导力
                        </a>
                      </li>
                      <li className="leader_boxwrap col-blue">
                        <p className="non-link">用心理学解析的领导能力Talk</p>
                        <a className="bg_blue" href="#none">
                          I. 变化的开始
                        </a>
                        <a className="bg_blue" href="#none">
                          II. 你有这样的苦恼吗？
                        </a>
                        <a className="bg_blue" href="#none">
                          III. 领导者的苦恼
                        </a>
                      </li>
                      <li>
                        <a className="leader_blue" href="#none">
                          代际理解-86、X、MZ一代
                        </a>
                      </li>
                    </ul>
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
    menuItem: 'Management',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges8"
        >
          <div className="college-cont-title management">
            <div className="belt sub">
              <div className="label">Management</div>
              <div className="strong">
                为实现Deep Change，如何改变工作方式呢？
                <br />
                如何才能成长呢？
              </div>
              <div className="normal">
                Management Category为实现Deep
                Change，提高Biz.执行能力，涵盖6个Function
                Group，1个Competency领域的职务能力学习内容。除了各个Function
                Group的知识/专业性，还结合各Function，企划融合/整合能力培养课程。
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
              <CollegeInnerZhTabView />
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: '未来半导体',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges9"
        >
          <div className="college-cont-title semicond">
            <div className="belt sub">
              <div className="label">未来半导体</div>
              <div className="strong">半导体，开始展望未来。</div>
              <div className="normal">
                不仅能提高SK所有成员的半导体水平，还能了解半导体产业的本质， 并
                <br />
                展望由未来技术开启的世界。
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
                <li># 半导体历史</li>
                <li># 半导体产业展望</li>
                <li># 半导体术语</li>
                <li># 半导体技术理论</li>
                <li># 半导体种类</li>
                <br />
                <li># 未来技术</li>
                <li># 半导体Ecosystem</li>
              </ul>
            </div>
          </div>

          <div className="college-cont-map pbtom">
            <div className="belt fu">
              <div className="text-left-box">
                {/* <p className="p_link ">
                  각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
                </p> */}
              </div>
              <div className="text-right-box">
                <a href="#none" className="item-button">
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
              <div className="label">全部课程</div>
              <div className="semi-topBackground" />
              <div className="map">
                <div className="semi-background">
                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan">
                        <div className="semi_txt">
                          <h3>
                            AI Manufacturing
                            <br />
                            Professional
                          </h3>
                          <p>
                            半导体Engineering+AI/DT融合，
                            <br />
                            具备制造IT系统最优化能力，
                            <br />
                            AI manufacturing专家,
                            <br />
                            Contiunous成长支持
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle">
                          <ul>
                            <li>
                              <a href="#none">半导体FAB生产运营专家</a>
                            </li>
                            <li className="dashed">
                              <Image
                                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/badge-open-blue-chn.png"
                                alt=""
                                className="ui image"
                              />
                              <a href="#none">Smart SCM专家</a>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <a href="#none">半导体FAB最优化专家</a>
                            </li>
                            <li className="dashed">
                              <Image
                                src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/badge-open-blue-chn.png"
                                alt=""
                                className="ui image"
                              />
                              <a href="#none">
                                AI manufacturing
                                <br />
                                Project (PBL)
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="semi_badge">
                        <h4>AI Manufacturing Professional</h4>
                        <dl>
                          <dt>Badge类型</dt>
                          <dd>未来Biz</dd>
                        </dl>
                        <dl>
                          <dt>Level</dt>
                          <dd>★ ★ ★</dd>
                        </dl>
                        <dl>
                          <dt>认证内容</dt>
                          <dd>
                            具备运用AI预测半导体需
                            <br />
                            求、最佳生产计划及决策
                            <br />
                            能力的专家
                          </dd>
                        </dl>
                        <dl>
                          <dt>获得条件</dt>
                          <dd>
                            完成Course/Project
                            <br />
                            执行及pass
                          </dd>
                        </dl>
                        <button type="button">预计OPEN</button>
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
                            “广泛理解各类未来半导体应用领域，
                            <br />
                            为创造New Biz的
                            <br />
                            ‘未来Biz/Tech探索之窗’”
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle ver-top">
                          <ul>
                            <li>
                              <a>
                                AI半导体
                                <br />
                                <span>Next Tech Trend</span>
                              </a>
                            </li>
                            <li>
                              <a>汽车半导体，机会与挑战</a>
                            </li>
                            <li>
                              <a>
                                Next Generation Semiconductor
                                <br />
                                Packaging Technology
                              </a>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <a>
                                Neuromorphic Computing <br />
                                <span>Challenges and Opportunities</span>
                              </a>
                            </li>
                            <li>
                              <a>
                                量子计算与量子密码
                                <br />
                                技术的现在与未来
                              </a>
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
                            Smart factory的基本概念及
                            <br />
                            组成因素，实际半导体FAB
                            <br />
                            自动化System的理解
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle pad">
                          <ul>
                            <li>
                              <a>
                                打造Smart Factory，
                                <br />
                                对制造系统的理解与决策。
                              </a>
                            </li>
                            <li>
                              <a>
                                Smart Factory
                                <br />
                                系统的相连与智能化
                              </a>
                            </li>
                            <li>
                              <a>基于AI算法的半导体Factory</a>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <a>
                                Smart Factory的
                                <br />
                                组成因素案例
                              </a>
                            </li>
                            <li>
                              <a>尖端技术与制造的相遇</a>
                            </li>
                            <li>
                              <a>半导体FAB自动化理解</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="semi_badge">
                        <h4>Smart factory Fundamental</h4>
                        <dl>
                          <dt>Badge类型</dt>
                          <dd>未来Biz</dd>
                        </dl>
                        <dl>
                          <dt>Level</dt>
                          <dd>★ ★</dd>
                        </dl>
                        <dl>
                          <dt>认证内容</dt>
                          <dd>
                            Smart Factory的基本概念与
                            <br />
                            基于AI的半导体制造
                            <br />
                            IT系统理解
                          </dd>
                        </dl>
                        <dl>
                          <dt>获得条件</dt>
                          <dd>完成Course / Test及实习课题</dd>
                        </dl>
                        <button type="button">预计OPEN</button>
                      </div>
                    </div>
                  </div>

                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan">
                        <div className="semi_txt">
                          <h3>
                            半导体材料 <br />
                            Fundamental
                          </h3>
                          <p>
                            半导体材料的物理性质理解，
                            <br />
                            学习开发所需基础理论和半导体工艺 <br />
                            应用
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle ver-top">
                          <ul>
                            <li>
                              <a href="#none">尖端材料</a>
                            </li>
                            <li>
                              <a href="#none">Lithography工艺与材料</a>
                            </li>
                            <li>
                              <a href="#none">Metallization工艺与材料</a>
                            </li>
                            <li>
                              <a href="#none">Solar Cell元件与材料</a>
                            </li>
                            <li>
                              <a href="#none">Thin Film工艺与材料</a>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <a href="#none">Image Sensor元件与材料</a>
                            </li>
                            <li>
                              <a href="#none">Etching工艺与材料</a>
                            </li>
                            <li>
                              <a href="#none">化合物半导体元件与材料</a>
                            </li>
                            <li>
                              <a href="#none">Doping工艺与材料</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="semi_badge biz02 biz03">
                        <h4>半导体材料Fundamental</h4>
                        <dl>
                          <dt>Badge类型</dt>
                          <dd>未来Biz</dd>
                        </dl>
                        <dl>
                          <dt>Level</dt>
                          <dd>★ ★</dd>
                        </dl>
                        <dl>
                          <dt>认证内容</dt>
                          <dd>
                            半导体工艺/各元件核心
                            <br />
                            材料连接能力
                          </dd>
                        </dl>
                        <dl>
                          <dt>获得条件</dt>
                          <dd>
                            完成Course/
                            <br />
                            Test及实习课题
                          </dd>
                        </dl>
                        <button type="button">预计OPEN</button>
                      </div>
                    </div>
                  </div>

                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan">
                        <div className="semi_txt">
                          <h3>
                            AI半导体
                            <br />
                            Fundamental
                          </h3>
                          <p>
                            处理人工智能(AI)的AI
                            <br />
                            硬件类型，运作原理和
                            <br />
                            HW开发所需基本概念理解
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle">
                          <ul>
                            <li>
                              <a href="#none">
                                [Computer System] <br />
                                <span>计算机运作理解</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [AI Hw 概论]
                                <br />
                                <span>AI Model</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [AI Hw 理解] <br />
                                <span> DNN HW加速器结构</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [Hw 开发] <br />
                                <span>Fundamentals</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">CPU Micro-Architecture</a>
                            </li>
                            <li>
                              <a href="#none">SoC设计Flow</a>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <a href="#none">
                                [AI Hw 概论] <br />
                                <span>AI Hardware</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [AI Hw 概论] <br />
                                <span>AI Platform</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [AI Hw 理解]
                                <br />
                                <span>DNN算法与工作负载特点</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [HW 开发]
                                <br />
                                <span>Analog Design</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">Digital Design</a>
                            </li>
                            <li>
                              <a href="#none">
                                SoC设计案例 <br />
                                <span>Mobile Computing</span>
                              </a>
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
                          <h3>半导体Tech Essential</h3>
                          <p>
                            非理工科成员也能轻易理解的半
                            <br />
                            导体术语和技术理解
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle ver-mid">
                          <ul>
                            <li>
                              <a href="#none">
                                <strong>人气</strong>
                                轻松理解的 <br />
                                有趣半导体
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                半导体What
                                <br />
                                <span>半导体 Tech.知识百科</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [CEO特讲_SK海力士李锡熙CEO]
                                <br />
                                <span>半导体，开启未来</span>
                              </a>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <a href="#none">
                                智慧的IT生活 <br />
                                <span>电子产品的构造和运作原理</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                正确理解半导体 <br />
                                (基础篇)
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="semi_badge">
                        <h4>半导体Tech Essential</h4>
                        <dl>
                          <dt>Badge类型</dt>
                          <dd>未来Biz</dd>
                        </dl>
                        <dl>
                          <dt>Level</dt>
                          <dd>★</dd>
                        </dl>
                        <dl>
                          <dt>认证内容</dt>
                          <dd>
                            半导体Tech核心概念与术
                            <br />
                            语学习
                          </dd>
                        </dl>
                        <dl>
                          <dt>获得条件</dt>
                          <dd>
                            完成4个Course/通过Badge
                            <br />
                            综合Test（80分以上）
                          </dd>
                        </dl>
                        <a
                          className="cha_btn"
                          href="#none"
                          style={{ fontWeight: 'bold' }}
                        >
                          挑战
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan">
                        <div className="semi_txt">
                          <h3>半导体Biz Essential</h3>
                          <p>
                            提供理解半导体Ecosystem和未来半
                            <br />
                            导体产业变化所必需的基础知识和
                            <br />
                            Insight
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle ver-top">
                          <ul className="sm">
                            <li>
                              <a href="#none">
                                [从News了解半导体]
                                <br />
                                <span>未来，大数据时代的竞争力提升</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [从News了解半导体]
                                <br />
                                <span>
                                  半导体各产品类型的市场分析与AI半导体
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [从News了解半导体]
                                <br />
                                <strong>人气</strong>
                                <span>半导体的未来与我们的准备</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [半导体Industry理解 Part2]
                                <br />
                                <span>在无限竞争中成为龙头的三星电子</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [半导体Industry理解 Part4]
                                <br />
                                <span>
                                  Fabless和Foundry——在大型IDM之间的
                                  <br />
                                  机遇和战略
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                News深度分析
                                <br />
                                <span>美国大众制裁与半导体市场的变化</span>
                              </a>
                            </li>
                          </ul>
                          <ul className="sm">
                            <li>
                              <a href="#none">
                                [从News了解半导体]
                                <br />
                                <span>Data Centric World</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [从News了解半导体]
                                <br />
                                <span>半导体Value Chain In-depth分析</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [半导体Industry理解 Part1]
                                <br />
                                <span>半导体产业的基本概念和市场竞争格局</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [半导体Industry理解 Part3]
                                <br />
                                <span>CPU强者英特尔的过去、现在和未来</span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                [半导体Industry理解 Part5]
                                <br />
                                <span>
                                  无限竞争时代的未来展望-
                                  <br />
                                  半导体企业的挑战与课题
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#none">
                                新冠疫情对半导体供应链带来的影响
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="semi_badge biz">
                        <h4>半导体Biz Essential</h4>
                        <dl>
                          <dt>Badge类型</dt>
                          <dd>未来Biz</dd>
                        </dl>
                        <dl>
                          <dt>Level</dt>
                          <dd>★</dd>
                        </dl>
                        <dl>
                          <dt>认证内容</dt>
                          <dd>
                            具备半导体产业理解与分
                            <br />
                            析所需的基础知识
                          </dd>
                        </dl>
                        <dl>
                          <dt>获得条件</dt>
                          <dd>
                            完成10个Course /<br />
                            通过Badge
                            <br />
                            综合Test（80分以上）
                          </dd>
                        </dl>
                        <a
                          className="cha_btn"
                          href="#none"
                          style={{ fontWeight: 'bold' }}
                        >
                          挑战
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="semi_wrap">
                    <div className="semi_belt">
                      <div className="semi_chan conHeight02">
                        <div className="semi_txt">
                          <h3>半导体Introduction</h3>
                          <p>
                            以有趣的Story为初次开始学习的成员
                            <br />
                            们准备的半导体学习课程
                          </p>
                        </div>
                      </div>
                      <div className="semi_course">
                        <div className="semi_course_middle">
                          <ul>
                            <li>
                              <a href="#none">
                                有用的半导体知识 <br />
                                <span>半导体产业的过去、现在和未来</span>
                              </a>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <a href="#none">
                                半导体 CLASS <br />
                                <span>用Keyword理解的半导体格调</span>
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
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Green',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges11"
        >
          <div className="college-cont-title energy">
            <div className="belt sub">
              <div className="label">Green</div>
              <div className="strong">
                从能源解决方案Category进化的 “Green Category”
              </div>
              <div className="normal">
                环境事业创造的全新世界，提高环境重要性的认知，学习碳中和、氢气、资源循
                <br />
                环、能源解决方案等所需专业知识，一步步走向Green Deep Change。
                <br />
                为在环境事业中获得成功我们要做的挑战——Green Start！
              </div>

              <div className="panopto sub">
                <Image
                  src={`${PUBLIC_URL}/images/all/envir-player.png`}
                  alt=""
                  style={{ display: 'inline-block' }}
                />
              </div>
            </div>
          </div>
          <div className="college-cont-map energy">
            <div className="belt">
              <div className="map">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/envir-con-01-chn.png"
                  alt=""
                  style={{ display: 'inline-block' }}
                />
              </div>
            </div>
          </div>
          <div className="college-cont-map energe">
            <div className="belt">
              <div className="label energy">Green Category Curriculum</div>
              <div className="map">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images//envir-con-02-chn.png"
                  alt=""
                  style={{ display: 'inline-block' }}
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
              <div className="label">BM Design &#38; Storytelling</div>
              <div className="strong">Ideate and Accelerate Deep Change!</div>
              <div className="normal">
                积极进行BM Design专家培养及Biz Financial Story
                Design/Telling能力提升，
                <br />
                为集团/相关公司创造Deep Change成果做出贡献。
              </div>
              <ul className="tag-wrap">
                <li># BM创新</li>
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
                  {/* 点击各Badge与课程，即可进入到相应页面。 */}
                </p>
              </div>
              <div className="text-right-box">
                <a href="#none" className="item-button">
                  <Image
                    src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-course-book.png"
                    alt=""
                    style={{ display: 'inline-block' }}
                  />
                  直接进入课程
                </a>
              </div>
            </div>
            <div className="belt">
              <div className="map">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-co-11-1-chn.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="college-cont-map">
            <div className="belt">
              <div className="label">全部课程</div>
              <div className="bm-top-btn">
                <span className="bm-btn01">On-Line</span>
                <span className="bm-btn02">Blended</span>
                <span className="bm-btn03">Off-Line</span>
              </div>
              <div className="map">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/bm-level-line-chn.png"
                  alt="세로: 전문가,코치 레벨3/ 심화과정 레벨2/ 기본과정 레벨1"
                  style={{ float: 'left' }}
                />
                <div className="bm-wrap">
                  <div className="bm-flex">
                    <div className="bm-bg-box bg_type01">
                      <h3>
                        <a href="#none">BM Design @ Work</a>
                      </h3>
                      <p>( 需先完成Becoming BM Designer课程 )</p>
                      <ul className="list_flex">
                        <li>
                          <a href="#none">
                            BM Design实习
                            <br />
                            （4周）
                          </a>
                        </li>
                        <li>
                          <a href="#none">
                            脱钩Workshop
                            <br />
                            (2日)
                          </a>
                        </li>
                        <li>
                          <a href="#none">
                            环境·能源
                            <br />
                            BM Design实习
                            <br />
                            (4周)
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="bm-bg-box bg_type02">
                      <h3>
                        <a href="#none">Storytelling @ Work</a>
                      </h3>
                      <div className="bm-flex">
                        <ul className="list_bm bg_white">
                          <li>
                            <a href="#none">CEO 1:1课程</a>
                          </li>
                          <li>
                            <a href="#none">6R Storytelling Workshop</a>
                          </li>
                        </ul>
                        <ul className="list_bm bg_white">
                          <li>
                            <a href="#none">
                              Leader Storytelling
                              <br />
                              Workshop
                            </a>
                          </li>
                          <li>
                            <a href="#none">FS专家研讨会</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bm-flex">
                    <div className="bm-bg-box bg_type01">
                      <h3>
                        <a href="#none">Becoming BM Designer</a>
                      </h3>
                      <ul className="list_flex md">
                        <li>
                          <a href="#none">
                            Ⅰ. As-Is BM
                            <br />
                            Sustainability
                          </a>
                        </li>
                        <li>
                          <a href="#none">Ⅱ. BM环境分析</a>
                        </li>
                        <li>
                          <a href="#none">
                            Ⅲ. 新BM
                            <br />
                            挖掘战略
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="bm-flex">
                    <div className="bm-bg-box line_type01">
                      <h3>
                        <a href="#none">M&#38;A Design</a>
                      </h3>
                      <div className="bm-flex">
                        <ul className="list_bm">
                          <li>
                            <a href="#none">Ⅰ. M&amp;A Overview</a>
                          </li>
                          <li>
                            <a href="#none">
                              Ⅲ. 对象选择 &amp;
                              <br />
                              Deal Structuring
                            </a>
                          </li>
                          <li>
                            <a href="#none">Ⅴ. Valuation</a>
                          </li>
                          <li>
                            <a href="#none">Ⅶ. Legal</a>
                          </li>
                          <li>
                            <a href="#none">
                              [深化Ⅰ] Deal Structuring
                              <br />
                              &amp; Financing
                            </a>
                          </li>
                        </ul>
                        <ul className="list_bm">
                          <li>
                            <a href="#none">Ⅱ. M&amp;A Strategy</a>
                          </li>
                          <li>
                            <a href="#none">Ⅳ. Due Diligence</a>
                          </li>
                          <li>
                            <a href="#none">Ⅵ. Negotiation</a>
                          </li>
                          <li>
                            <a href="#none">Ⅷ. PMI &amp; Value-up</a>
                          </li>
                          <li>
                            <a href="#none">[深化Ⅱ] Legal</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bm-bg-box line_type01 height100">
                      <h3>
                        <a href="#none">Becoming Storyteller</a>
                      </h3>
                      <div className="bm-flex">
                        <ul className="list_bm">
                          <li>
                            <a href="#none">
                              Financial Storytelling
                              <br />
                              全球案例研究
                            </a>
                          </li>
                          <li>
                            <a href="#none">
                              [Focus] Financial
                              <br />
                              Society Partnership
                            </a>
                          </li>
                        </ul>
                        <ul className="list_bm">
                          <li>
                            <a href="#none">从6R角度理解Stakeholder</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bm-flex">
                    <div className="bm-bg-box line_type01">
                      <h3>
                        <a href="#none">BM Design Take-off</a>
                      </h3>
                      <ul className="list_flex md">
                        <li>
                          <a href="#none">
                            Ⅰ.Sustainable BM
                            <br />
                            创新的重要性
                          </a>
                        </li>
                        <li>
                          <a href="#none">
                            Ⅱ. BM Framework
                            <br />
                            &amp; SK BM创新努力
                          </a>
                        </li>
                        <li>
                          <a href="#none">
                            Ⅲ. BM / Deep Change
                            <br />
                            Design与实行
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="bm-bg-box line_type01">
                      <h3>
                        <a href="#none">Defining Storytelling</a>
                      </h3>
                      <ul className="list_flex md">
                        <li>
                          <a href="#none">Financial Story的理解</a>
                        </li>
                        <li>
                          <a href="#none">Financial Acumen</a>
                        </li>
                        <li>
                          <a href="#none">
                            从投资人角度看
                            <br />
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
    menuItem: 'SK学院',
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
              <div className="label">SK学院</div>
              <div className="strong">
                “如培育树木般培养人才、SK人才培养的摇篮”
              </div>
              <div className="normal">
                SK Academy通过传播SKMS（SK Management System)/Values，
                <br />
                强化SK企业文化的基础，根据系统的培养Pipeline，培养未来经营者与Biz.专家。
              </div>
              <ul className="tag-wrap">
                <li># 新员工</li>
                <li># 邀请成员</li>
                <li># 新任组长</li>
                <li># 新任管理人员</li>
                <li># 邀请管理人员</li>
                <li># HLP</li>
                <li># 女性领导</li>
                <li># 力量 School</li>
                <li># HR Conference</li>
                <li># Global HR Seminar</li>
              </ul>
            </div>
          </div>
          <div className="college-cont-map skacademy">
            <div className="belt">
              <div className="label">全部课程</div>
              <div className="map">
                <Image
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-co10_CHN.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="college-tag skacademy">
            <div className="belt">
              <div className="label chip5">SKMS / SK Values</div>
              <div className="strong">
                新/邀请成员对象
                SKMS/为核心价值传播和新任组长的幸福经营实践而进行的角色确立
              </div>
              <ul className="tag-wrap">
                <li># 新员工</li>
                <li># 邀请成员</li>
                <li># 新任组长</li>
                <li># 新任管理人员</li>
                <li># 邀请管理人员</li>
                <li># SKMS讲师培养</li>
              </ul>
              <div className="label chip6">未来经营者培养</div>
              <div className="strong">
                与SK Leadership Pipeline和Assessment相关联的未来经营者系统培养
              </div>
              <ul className="tag-wrap">
                <li># HLP</li>
                <li># 女性领导</li>
              </ul>
              <div className="label chip7">力量 School</div>
              <div className="strong">
                与mySUNI的Management
                Category相关联，强化集团通用职务和Biz.强化专业力量
              </div>
              <ul className="tag-wrap">
                <li># 战略 Intermediate/Advanced</li>
                <li># 营销 Intermediate/Advanced</li>
                <li># 财务 Intermediate/Advanced</li>
                <li># HR Intermediate/Advanced</li>
                <li># 采购 Intermediate/Advanced</li>
                <li># 法务</li>
                <li># IP(知识产权)</li>
                <li># M&amp;A</li>
                <li># 事业开发</li>
                <li># 协商</li>
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

  panes: any[] = koPanes;

  constructor(props: Props) {
    super(props);

    if (SkProfileService.instance.skProfile.language === 'English') {
      this.panes = EnPanes;
    }
    if (SkProfileService.instance.skProfile.language === 'Chinese') {
      this.panes = ZhPanes;
    }
  }

  componentDidMount() {
    //
    this.setActiveTab();

    if (
      window.location.search === '?subTab=BM%20Design&Storytelling' ||
      window.location.search ===
        '?subTab=BM%2520Design%2520%2526%2520Storytelling'
    ) {
      this.setState({ activeIndex: 10 });
    } else if (window.location.search === '?subTab=Innovation%20&%20Design') {
      this.setState({ activeIndex: 4 });
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
    const queryParams = queryString.parse(window.location.search);
    const subTab = queryParams.subTab as string;

    if (subTab) {
      const activeIndex = this.panes.findIndex((pane) =>
        subTab.includes(pane.menuItem)
      );

      const krIndex = koPanes.findIndex((pane) =>
        subTab.includes(pane.menuItem)
      );
      const enIndex = EnPanes.findIndex((pane) =>
        subTab.includes(pane.menuItem)
      );
      const zhIndex = ZhPanes.findIndex((pane) =>
        subTab.includes(pane.menuItem)
      );
      if (activeIndex >= 0) {
        this.setState({ activeIndex });
      } else if (activeIndex === -1) {
        if (SkProfileService.instance.skProfile.language === 'English') {
          if (zhIndex >= 0) {
            this.setState({ activeIndex: zhIndex });
            this.props.history.push(
              routePaths.introductionCollege(this.panes[zhIndex].menuItem)
            );
          } else if (krIndex >= 0) {
            this.setState({ activeIndex: krIndex });
            this.props.history.push(
              routePaths.introductionCollege(this.panes[krIndex].menuItem)
            );
          }
        } else if (SkProfileService.instance.skProfile.language === 'Chinese') {
          if (enIndex >= 0) {
            this.setState({ activeIndex: enIndex });
            this.props.history.push(
              routePaths.introductionCollege(this.panes[enIndex].menuItem)
            );
          } else if (krIndex >= 0) {
            this.setState({ activeIndex: krIndex });
            this.props.history.push(
              routePaths.introductionCollege(this.panes[krIndex].menuItem)
            );
          }
        } else if (SkProfileService.instance.skProfile.language === 'Korean') {
          if (zhIndex >= 0) {
            this.setState({ activeIndex: zhIndex });
            this.props.history.push(
              routePaths.introductionCollege(this.panes[zhIndex].menuItem)
            );
          } else if (enIndex >= 0) {
            this.setState({ activeIndex: enIndex });
            this.props.history.push(
              routePaths.introductionCollege(this.panes[enIndex].menuItem)
            );
          }
        }
      }
    }
  }

  onTabChange(e: any, { activeIndex }: any) {
    //
    this.props.history.push(
      routePaths.introductionCollege(this.panes[activeIndex].menuItem)
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
              'body.msie #root section.content .tab-menu-inner .ui.menu .item{flex:none;width:auto;flex-grow:1;}',
          }}
        />
        <Tab
          className={`tab-menu-inner sub ${SkProfileService.instance.skProfile.language}`}
          panes={this.panes}
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
  'News로 본 반도체 - Data Centric World': '/lecture/card/CARD-6mb/view',
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
  '한방에 이해하는 꿀잼 반도체': '/lecture/card/CARD-532/view',
  '슬기로운 IT생활 - 전자기기의 구조와 동작원리': '/lecture/card/CARD-5xw/view',
  '반도체 What - 반도체 Tech 지식백과': '/lecture/card/CARD-531/view',
  '반도체 제대로 이해하기 - 기본편': '/lecture/card/CARD-530/view',
  '[CEO특강_SK하이닉스 이석희 사장] 반도체, 미래를 열다':
    '/lecture/card/CARD-5pa/view',
  '[Computing System 이해] 컴퓨터 동작의 이해': '/lecture/card/CARD-7bf/view',
  '[AI HW 개론] AI Hardware': '/lecture/card/CARD-8h6/view',
  '[AI HW 개론] AI Model': '/lecture/card/CARD-7sd/view',
  '[AI HW 개론] AI Platform': '/lecture/card/CARD-7ns/view',
  '[HW 개발] Fundamentals': '/lecture/card/CARD-7gh/view',
  '[HW 개발] CPU Micro-Architecture': '/lecture/card/CARD-7vh/view',
  '[HW 개발] Analog Design': '/lecture/card/CARD-847/view',
  '[HW 개발] Digital Design': '/lecture/card/CARD-7rf/view',
  '[HW 개발] SoC 설계 Flow': '/lecture/card/CARD-7ep/view',
  '[HW 개발] SoC 설계 사례 - Mobile Computing': '/lecture/card/CARD-7ec/view',
  '[AI HW 이해] DNN HW 가속기 아키텍처': '/lecture/card/CARD-7kt/view',
  '[AI HW 이해] DNN 알고리즘 및 워크로드 특성': '/lecture/card/CARD-7j4/view',
  '첨단 소재': '/lecture/card/CARD-97q/view',
  'Lithography 공정 및 소재': '/lecture/card/CARD-8jl/view',
  'Etching 공정 및 소재': '/lecture/card/CARD-8bf/view',
  'Metallization 공정 및 소재': '/lecture/card/CARD-84s/view',
  'Doping 공정 및 소재': '/lecture/card/CARD-7e2/view',
  'Thin Film 공정 및 소재': '/lecture/card/CARD-78k/view',
  'Image Sensor 소자 및 소재': '/lecture/card/CARD-97n/view',
  '화합물 반도체 소자 및 소재': '/lecture/card/CARD-7mg/view',
  'Solar Cell 소자 및 소재': '/lecture/card/CARD-7fr/view',
  'Smart Factory구현을 위한 제조 시스템 이해와 의사결정':
    '/lecture/card/CARD-733/view',
  'Smart Factory의 구성요소와 사례': '/lecture/card/CARD-7b2/view',
  'Smart Factory 시스템의 연결과 지능화': '/lecture/card/CARD-7ck/view',
  '첨단 기술과 제조의 만남': '/lecture/card/CARD-7k7/view',
  'AI 알고리즘 기반 반도체 Factory': '/lecture/card/CARD-84n/view',
  '반도체 FAB 자동화 이해':
    '/lecture/card/CARD-7vi/cube/CUBE-afs/view/ClassRoomLecture',
  'Neuromorphic Computing : Challenges and Opportunities':
    '/lecture/card/CARD-77f/view',
  'AI반도체 - Next Tech Trend': '/lecture/card/CARD-7a1/view',
  '자동차 반도체, 기회와 도전': '/lecture/card/CARD-7bv/view',
  '양자 컴퓨팅과 양자 암호 기술의 현재와 미래': '/lecture/card/CARD-7ip/view',
  'Next Generation Semiconductor Packaging Technology':
    '/lecture/card/CARD-8c8/view',
  '반도체 FAB 생산 운영 전문가': '/lecture/card/CARD-9nm/view',
  '반도체 FAB 최적화 전문가': '/lecture/card/CARD-9np/view',
  'Covid-19이 반도체 Supply Chain에 미치는 영향': '/lecture/card/CARD-68a/view',
};
