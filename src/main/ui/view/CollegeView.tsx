// Publishing 파일 그대로 가져오기 때문에 eslint 비활성화
/* eslint-disable */
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import queryString from 'query-string';
import { Image, Tab } from 'semantic-ui-react';
import routePaths from '../../routePaths';

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
            <div className="belt">
              <div className="panopto">
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
            </div>
          </div>
          <div className="college-tag">
            <div className="belt">
              <div className="label">AI Fundamentals</div>
              <div className="strong">
                AI의 용어와 기초 개념부터 차근차근 익히기 위한 컨텐츠
              </div>
              <ul className="tag-wrap">
                <li># AI101</li>
                <li># AI UX 기초</li>
                <li># AI Biz Insight</li>
                <li># AI독서토론</li>
                <li># AI를 만나다</li>
                <li># AI MOOC for Everyone</li>
              </ul>
              <div className="label chip1">AI Biz Track</div>
              <div className="strong">
                내 업무와 우리 Biz에 AI를 활용하기 위한 컨텐츠
              </div>
              <ul className="tag-wrap">
                <li># Biz Problem Solving with AI</li>
                <li># AI 서비스 기획 개발</li>
                <li># AI 코딩 기초</li>
                <li># AI MOOC for Biz Practitioner</li>
              </ul>
              <div className="label chip1">AI Tech Track</div>
              <div className="strong">전문 AI개발자로의 도약을 위한 컨텐츠</div>
              <ul className="tag-wrap">
                <li># Fundamentals of AI Tech.</li>
                <li># Machine Learning</li>
                <li># Vision AI Tech.</li>
                <li># Language AI Tech.</li>
                <li># Speech AI Tech.</li>
                <li># AI MOOC for Engineer</li>
                <li># AI Expert 과정</li>
                <li># AI 최신 기술 연구</li>
              </ul>
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/img-co1.png`} alt="" />
              </div>
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
            <div className="belt">
              <div className="panopto">
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
            </div>
          </div>
          <div className="college-tag">
            <div className="belt">
              <div className="label chip2">General Track</div>
              <div className="strong">
                Digital Mindset을 강화하고 Digital Tech./Biz. 전반을 이해하는
                컨텐츠
              </div>
              <ul className="tag-wrap">
                <li># DT Tech.이해</li>
                <li># Basic Data Skills</li>
                <li># DT Insight</li>
              </ul>
              <div className="label chip3">Tech. Track</div>
              <div className="strong">
                Skill 영역별 단계 학습을 통해 Digital Tech. 전문가로의 성장을
                위한 컨텐츠
              </div>
              <ul className="tag-wrap">
                <li># Data Analytics</li>
                <li># Data Engineering</li>
                <li># Cloud Engineering</li>
              </ul>
              <div className="label chip4">Biz. Track</div>
              <div className="strong">
                다른 산업/직무에서 Digital 기술을 적용하여, BM혁신을 준비하는
                컨텐츠
              </div>
              <ul className="tag-wrap">
                <li># Biz. Analytics</li>
                <li># DT 기반 BM 혁신</li>
              </ul>
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/img-co2.png`} alt="" />
              </div>
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
            </div>
          </div>

          <div className="college-free1">
            <div className="belt">
              <div className="label">이렇게 학습하면 더욱 효과적입니다.</div>
              <div className="img">
                <Image src={`${PUBLIC_URL}/images/all/img-co3-1.png`} alt="" />
              </div>
              <div className="label">
                SK만의 컨텐츠를 새롭게 만들어가고 있습니다.
              </div>
              <div className="normal">
                2020년 1월 행복학개론, SK의 행복경영, 마음 근력 키우기, 긍정
                습관 만들기 등 총 4개 과정이 개설되었습니다.
                <br />
                현재 운영 중인 4개의 과정에 추가하여 <strong>2020년 말</strong>
                까지 행복 실천을 위한{' '}
                <strong>
                  나머지 공통 과정, SK 행복 리더십 과정, 전문가 과정
                </strong>
                을<br />
                순차적으로 개설할 예정입니다.
              </div>
            </div>
          </div>

          <div className="college-cont-map">
            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/img-co3.png`} alt="" />
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
            <div className="belt">
              <div className="img">
                <Image src={`${PUBLIC_URL}/images/all/img-sv.png`} alt="" />
              </div>
              <div className="label">SV College</div>
              <div className="strong">사회와 기업의 지속가능성을 위해!</div>
              <div className="normal">
                사회와 고객의 문제를 해결하기 위한 치열한 학습과 실행으로
                <br />
                BM 혁신과 이해관계자의 행복을 추구하여​
                <br />
                사회와 기업의 지속가능성을 높이고자 합니다.
              </div>
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/img-co4.png`} alt="" />
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
            <div className="belt">
              <div className="panopto">
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
              <div className="label">혁신디자인 College</div>
              <div className="strong">
                Deep Change 필요한 “디자인 역량”을 키우는 곳!
              </div>
              <div className="normal">
                SK 구성원, 디자인 씽킹 전문가, 혁신 Biz. 리더 등 고객 중심
                BM혁신을
                <br />
                고민하는 다양한 사람들이 각자의 고민과 의견을 나누며 Deep
                Change에 필요한
                <br />
                Biz. 디자인 역량을 함께 만들어가는 곳 입니다.
                <br />
                여러분의 디자인 사고, 디자인 역량을 높이는데 도움이 될 다양한
                강의와 워크샵,
                <br />
                프로젝트에 도전해보세요!
              </div>
              <ul className="tag-wrap">
                <li># Deep Change & Design</li>
                <li># 고객 중심의 디자인 방법론</li>
                <li># 일하는 방식의 혁신</li>
                <li># 그룹 전략 Biz. 디자인</li>
              </ul>
            </div>
          </div>

          <div className="college-cont-map">
            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/img-co5.png`} alt="" />
              </div>
              <ol className="list">
                <li>
                  <div className="label chip1">
                    <i className="numb-1 icon">
                      <span className="blind">1</span>
                    </i>
                    Deep Change & Design
                  </div>
                  <div className="normal">
                    Deep Change에 필요한 디자인 역량의 의미, 고객 중심 디자인의
                    기초 개념을 학습합니다.
                  </div>
                  <ul className="tag-wrap">
                    <li># Why Design</li>
                    <li># SK 고객알기</li>
                    <li># Trend & Insight</li>
                  </ul>
                </li>
                <li>
                  <div className="label chip2">
                    <i className="numb-2 icon">
                      <span className="blind">2</span>
                    </i>
                    고객중심의 디자인 방법론
                  </div>
                  <div className="normal">
                    고객을 제대로 이해하는 법, 창의적 솔루션을 찾아내는 법 등을
                    학습합니다.
                  </div>
                  <ul className="tag-wrap">
                    <li># 디자인 씽킹</li>
                    <li># 고객 Needs이해</li>
                    <li># Biz Ideation</li>
                  </ul>
                </li>
                <li>
                  <div className="label chip3">
                    <i className="numb-3 icon">
                      <span className="blind">3</span>
                    </i>
                    일하는 방식의 혁신
                  </div>
                  <div className="normal">
                    고객 중심으로 애자일하게 일하는 법, 협업을 잘하는 방법 등을
                    학습합니다.
                  </div>
                  <ul className="tag-wrap">
                    <li># Agile process</li>
                    <li># Open Collaboration</li>
                    <li># Working backward</li>
                  </ul>
                </li>
                <li>
                  <div className="label chip4">
                    <i className="numb-4 icon">
                      <span className="blind">4</span>
                    </i>
                    그룹 전략 Biz. 디자인
                  </div>
                  <div className="normal">
                    SV, DT 등 그룹 전략 영역에 특화된, 고객중심 Biz. 디자인
                    방법을 학습합니다
                  </div>
                  <ul className="tag-wrap">
                    <li># Biz Design-SV</li>
                    <li># Biz Design-DT</li>
                  </ul>
                </li>
              </ol>
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
            <div className="belt">
              <div className="panopto">
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
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/img-co7.svg`} alt="" />
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
            <div className="belt">
              <div className="panopto">
                <iframe
                  title="audio type"
                  src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3Db1ebc675-879d-4a0c-a336-ab43009f4752%26offerviewer%3Dfalse%26showtitle%3Dfalse%26interactivity%3Dnone%26showbrand%3Dfalse"
                  width="436"
                  height="245"
                  style={{ padding: '0px', border: '0px' }}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay"
                />
              </div>
              <div className="label">Management College</div>
              <div className="strong">
                “신입사원부터 리더까지 SK인이 꼭 알아야 할 경영지식!”
              </div>
              <div className="normal">
                Mgmt. College는 전략/재무/마케팅/HR 등 공통 직무 Domain別
                전문역량과 Deep Change를 위한 실행역량 향상을 위한 학습
                Program을 제공합니다.
              </div>
              <ul className="tag-wrap">
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
              </ul>
            </div>
          </div>
          <div className="college-free3">
            <div className="belt">
              <div className="img">
                <Image src={`${PUBLIC_URL}/images/all/img-co8-1.png`} alt="" />
              </div>
            </div>
          </div>
          <div className="college-cont-map">
            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/img-co8.png`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: '반도체',
    render: () => (
      <Tab.Pane>
        <div
          className="ui attached tab full segment active"
          data-tab="colleges9"
        >
          <div className="college-cont-title semicond">
            <div className="belt">
              <div className="panopto">
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
              <div className="label">반도체 College</div>
              <div className="strong">반도체, 미래를 보는 눈을 뜨다.</div>
              <div className="normal">
                SK 구성원 누구에게나 도움이 될 반도체 소양을 높여줄 뿐 아니라
                <br />
                반도체 산업의 본질을 파악하고, 미래의 기술이 열어갈 세상을 전망
                할 수
                <br />
                있도록 도와드립니다.
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

          <div className="college-free4">
            <div className="belt">
              <div className="label">반도체 Basic Course</div>
              <div className="title">
                <strong>
                  반도체 Biz.부터 Tech까지, 이것만 알면 누구나 ‘반.잘.알’
                </strong>
                <span>(반도체 잘 아는 사람)</span>
              </div>
              <div className="dot-list">
                <dl>
                  <dt>
                    <span className="nbsp">대</span>상
                  </dt>
                  <dd>SK 구성원 누구나</dd>
                </dl>
                <dl>
                  <dt>학습방법</dt>
                  <dd>
                    3가지 Channel을 통해 제공되는 컨텐츠를 순서대로 듣다 보면,
                    반도체 Ecosystem을 이해할 수 있는 기본 다지기 완성!
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="college-cont-map in">
            <div className="belt">
              <div className="label">전체 커리큘럼</div>
              <div className="map">
                <Image src={`${PUBLIC_URL}/images/all/img-co9.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="college-free4 bottom">
            <div className="belt">
              <div className="label">반도체 Advanced Course</div>
              <div className="con">
                반도체 Advanced Track은 반도체 산업 구조 전반, Value Chain 및
                미래 반도체 기술에 대한 In-depth한 지식을 습득할 수 있는
                과정들로 구성될
                <br />
                예정이며, 최고의 강사진과 고품격 강의 제공을 위해 열심히 과정을
                준비하고 있습니다. (20년 7월 Open 예정)
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
          className="tab-menu-inner"
          panes={panes}
          activeIndex={activeIndex}
          onTabChange={this.onTabChange}
        />
      </>
    );
  }
}

export default withRouter(CollegeView);
