// Publishing 파일 그대로 가져오기 때문에 eslint 비활성화
/* eslint-disable */
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import queryString from 'query-string';
import { Image, Tab } from 'semantic-ui-react';
import routePaths from '../../routePaths';
import CollegeInnerTabView from './CollegeInnerTabView';
import CollegeInnerTabAi from './CollegeInnerTabAi';
import CollegeInnerTabDt from './CollegeInnerTabDt';

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
                <iframe
                  title="audio type"
                  src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3D7f027217-af12-4ce2-8216-ab42002e5be2%26offerviewer%3Dfalse%26showtitle%3Dfalse%26interactivity%3Dnone%26showbrand%3Dfalse"
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
            <div className="belt sub ">
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
                <iframe
                  title="audio type"
                  src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3D47d87f43-03b6-4559-97eb-ab420078ff59%26offerviewer%3Dfalse%26showtitle%3Dfalse%26interactivity%3Dnone%26showbrand%3Dfalse"
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
              <div className="strong">SK 구성원 전체의 행복을 위하여!</div>
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
              <div className="label">전체 커리큘럼</div>
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
              <div className="strong">
              고객을 이해하고 혁신을 디자인하라!
              </div>
              <div className="normal">
              고객에서 출발하는 Biz. Idea를 발굴하고, 통합적 사고로 고객의 <br />
문제를 해결하며, 끊임없이 일하는 방식을 혁신하는데 필요한 <br />
구성원 및 조직의 혁신 디자인 역량 향상을 도와드립니다.
              </div>
              <div className="panopto sub">
                <iframe
                  title="audio type"
                  src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3D7658f240-2fd6-4f09-97fe-ab43006f0655%26offerviewer%3Dfalse%26showtitle%3Dfalse%26interactivity%3Dnone%26showbrand%3Dfalse"
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
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/design_con_01.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="college-cont-map">
            <div className="belt">
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/design_con_02.png`} alt="" />
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
                <Image
                  src={`${PUBLIC_URL}/images/all/leader_con_01.png`}
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
              {/* <ul className="tag-wrap">
                <li># 전략</li>
                <li># 재무</li>
                <li># 마케팅</li>
                <li># HR</li>
                <li># M&A</li>
                <li># Biz. Development</li>
                <li># Biz. Trend & Insigh</li>
                <li># Working Smart</li>
                <li># Financing</li>
                <li># Digital Marketing</li>
                <li># 조직설계</li>
              </ul> */}
            </div>
          </div>
          <div className="college-free3 sub">
            {/*<div className="belt">
              <div className="img">
                <Image src={`${PUBLIC_URL}/images/all/img-co8-1.png`} alt="" />
              </div>
            </div>*/}
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
                 <Image
                  src={`${PUBLIC_URL}/images/all/semi_con_02.png`}
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
              <div className="label">BM Design & Storytelling College</div>
              <div className="strong">Ideate and Accelerate Deep Change!</div>
              <div className="normal">
                BM Design 전문가 양성 및 Biz Story Design/ Telling 역량 강화를
                적극 지원함으로써 그룹/관계사 Deep Change 성과 창출에 기여하겠습니다.
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
            <div className="belt">
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/bmd_con_01.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="college-cont-map">
            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/bmd_con_02.png`} alt="" />
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
