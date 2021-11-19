import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation, withRouter } from 'react-router-dom';
import { Image, Menu, Label, Tab } from 'semantic-ui-react';
import { reactAlert } from '@nara.platform/accent';
import routePaths from 'main/routePaths';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { getCurrentHistory } from 'shared/store/HistoryStore';
import queryString from 'query-string';

const PUBLIC_URL = process.env.PUBLIC_URL;

const emptyAlert = (e: any) => {
  e.preventDefault();
  reactAlert({
    title: '알림',
    message: '준비 중입니다.',
  });
};

const CollegeInnerTabDt = () => {
  const history = useHistory();

  const pageMove = (path: string) => {
    history.replace(path);
  };
  const [activeIndex, setActiveIndex] = useState(0);

  const onTabChange = (e: any, { activeIndex }: any) => {
    setActiveIndex(activeIndex);
    history.push(routePaths.introductionCollegeDT(panes[activeIndex].menuItem));
  };

  const queryParams = queryString.parse(window.location.search);
  const subTab = (queryParams.innerTab as string) || '';

  const indexSetter = () => {
    if (subTab === 'DT Biz. ') {
      setActiveIndex(2);
    } else {
      const activeIndex =
        panes.findIndex((pane) => subTab.includes(pane.menuItem)) || 0;
      if (activeIndex > 0) {
        setActiveIndex(activeIndex);
      } else {
        setActiveIndex(0);
      }
    }
  };

  useEffect(() => {
    indexSetter();
  }, [queryParams]);

  const panes = [
    {
      menuItem: 'DT College 소개',
      key: 'tab0',
      render: () => (
        <Tab.Pane attached={false}>
          <div className="belt">
            <div className="text-right-box">
              <Link
                to="/lecture/college/CLG00002/channels/pages/1"
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
            <div className="ai-con-text">
              Digital Transformation이란 고객에서 출발하여 Digital 기술을 활용,
              기존의 운영 프로세스와 Business Model, 나아가서는 문화/일하는
              방식까지도 바꾸는 포괄적 활동이며, 우리 SK가 추구하는 Deep Change
              실행의 핵심 요소로 자리매김하고 있습니다. <br /> <br />
              DT College에서는 이러한 DT 추진의 근간이라 할 수 있는 Data/Cloud를
              중심으로 한 Digital 요소 기술을 학습할 수 있는 기회를 제공함은
              물론, 새로운 고객 경험의 창출, BM/운영 프로세스의 혁신 및 일하는
              방식의 변화를 이루어낸 다양한 국내외 Business Case들을 폭넓게
              학습할 수 있습니다. 아울러 주요 Digital 기술에 대해서는 시장에서
              인정받는 Certificate 취득을 지원할 수 있는 상시적인 프로그램들이
              활발하게 제공되고 있습니다.
            </div>
            <Image src={`${PUBLIC_URL}/images/all/dt-con01-1.png`} alt="" />
          </div>

          <div className="college-cont-map sub pbtom">
            <div className="belt">
              <div className="label sub">전체 커리큘럼</div>
              <div className="ai-top-btn">
                <span className="ai-btn01">Self-directive</span>
                <span className="ai-btn02 dt">Intensive</span>
              </div>

              <div className="dt-background">
                <div className="dt_belt">
                  <div className="dt_belt_le">
                    <div className="dt-le-list">
                      <div className="dt-le-item">
                        <h3>Data Engineer Track</h3>
                        <ul>
                          <li>Scala 이해와 활용</li>
                          <li>NoSQL 이해와 활용</li>
                          <li>Hadoop 이해와 활용</li>
                          <li>SQL</li>
                        </ul>
                      </div>

                      <div className="dt-le-item">
                        <div className="bedge-box">
                          <span className="bedge">Badge</span>
                        </div>
                        <h3>Cloud Engineer Track</h3>
                        <ul>
                          <li>Certification</li>
                          <li>Cloud 기술</li>
                          <li>Cloud 개발 기초</li>
                          <li>Cloud 기본 (Azure)</li>
                        </ul>
                      </div>

                      <div className="dt-le-item">
                        <h3>Data Analyst Track</h3>
                        <ul>
                          <li>Machine Learning 활용</li>
                          <li>Data Visualization</li>
                          <li>Data 수집/가공</li>
                          <li>Statistics &#38; Analytics</li>
                          <li>코딩 For Big Data 분석</li>
                        </ul>
                      </div>
                    </div>

                    <div className="dt-le-list two">
                      <div className="dt-le-item">
                        <h3 className="dt_intro_h3">DT Technologies</h3>
                        <ul>
                          <li>프로그래밍 언어 (R, Python)</li>
                          <li>Cloud Computing</li>
                          <li>Block chain</li>
                          <li>IoT</li>
                          <li>Big Data</li>
                        </ul>
                      </div>

                      <div className="dt-le-item other">
                        <div className="bedge-box">
                          <span className="bedge">Badge</span>
                        </div>
                        <h3>CDS Track</h3>
                        <p>(Intensive Course, 2주)</p>
                        <ul>
                          <li>현업 활용 Project</li>
                          <li>Machine Learning</li>
                          <li>Data Visualization</li>
                          <li>EDA 및 데이터 가공</li>
                          <li>Data Pre-Processing</li>
                          <li>Python 기본 문법</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="dt_belt_rg">
                    <div className="dt-le-list">
                      <div className="dt-le-item">
                        <h3>DT Biz. &#38; Implementation</h3>
                        <ul>
                          <li>Tech &#38; Biz Talk (미래Tech포럼)</li>
                          <li>Zoom-in Mobility Biz</li>
                          <li>DT &#38; BM혁신 Case Study</li>
                          <li>글로벌 Tech 이벤트</li>
                          <li>SK, DT를 만나다</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dt_belt">
                  <div className="dt-bottom">
                    <div className="bedge-box">
                      <span className="bedge">Badge</span>
                    </div>
                    <h3>AI/DT Literacy</h3>
                    <ul>
                      <li>Customer Empathy</li>
                      <li>Data-Centric Approach</li>
                      <li>ICT Tech 이해</li>
                      <li>Biz Insight</li>
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
      menuItem: 'AI/DT Literacy',
      key: 'tab1',
      render: () => {
        pageMove('/certification/badge/badge-detail/BADGE-2t');
        return <Tab.Pane attached={false} />;
      },
    },
    {
      menuItem: 'DT Biz. & Implementation',
      key: 'tab2',
      render: () => (
        <Tab.Pane attached={false}>
          <div className="belt">
            <div className="text-right-box">
              <Link
                to="/lecture/college/CLG00002/channel/CHN0006o"
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

          {/* 컬리지 텍스트 */}
          <div className="college-sub-txt">
            <strong>
              DT Biz. &#38; <br />
              Implementation
            </strong>
            <div>
              <ul>
                <li>
                  본 채널은 고객 경험과 BM, 운영 프로세스의 변화를 가져 온 그룹
                  내/외의 다양한 DT 사례와 적용 방안에 대해 학습할 수 <br />
                  있는 채널입니다.
                </li>
              </ul>
              <p className="p_link dt">
                각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
              </p>
            </div>
          </div>

          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table dt">
                <h3>
                  Tech &#38; Biz Talk <br />
                  (미래Tech포럼)
                </h3>
                <div className="ai_box">
                  <h4>
                    정재승 교수(사회)와 주제별 초대 연사/패널들이 특정 기술 및
                    Biz영역의 최신 현황과 이슈에 대해 발표/토론하는 자리입니다.
                    <span>
                      (월 1회씩 연간 7회의 포럼을 Live로 진행한 뒤, 추후 편집을
                      거쳐 VoD로 제공)
                    </span>
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-7vt/cube/CUBE-ag2/view/ELearning">
                        엣지 컴퓨팅 기술의 Biz 활용 현황 및 향후 전망
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-6ya/cube/CUBE-9fw/view/ELearning">
                        클라우드 컴퓨팅이 가져온 비즈니스 혁신과 기술의 미래
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9bs/cube/CUBE-bu5/view/ELearning">
                        IoT는 세상을 어떻게 바꾸고 있는가? - IoT 업데이트
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-672/cube/CUBE-8qc/view/ClassRoomLecture">
                        블록체인의 도전, 어디쯤 지나고 있나?
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>Zoom-in Mobility Biz</h3>
                <div className="ai_box">
                  <h4>
                    혁신의 Cross road로 부상하고 있는 Mobility 분야에 관해 Tech,
                    Biz Model, 경쟁구도 등 다양한 관점의 스토리를 제공하는
                    컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-8j2/view">
                        Mobility Biz의 경쟁흐름을 읽어내는 즐거움
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-9gk/view">
                        모빌리티 Biz 분야별 업데이트
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-5ro/view">
                        테슬라를 통해 본 전기차 비즈니스 스토리
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>DT &#38; BM혁신 Case Study</h3>
                <div className="ai_box">
                  <h4>
                    전통기업의 DT 성공 사례, BM 관련 최신 트렌드, 데이터
                    활용/규제 관련한 트렌드 등을 학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-8d8/cube/CUBE-aws/view/Video">
                        고객을 사로잡는 법, 구독
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-7ln/view">
                        데이터 3법, SK 구성원이 묻고 전문가가 말하다
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-6m1/cube/CUBE-953/view/Video">
                        팩트 체크! 데이터 3법 개정, 무엇이 달라지나?
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>글로벌 Tech 이벤트</h3>
                <div className="ai_box">
                  <h4>
                    CES, MWC와 같은 IT 이벤트와 GAFA의 자체 개발자대회 등 글로벌
                    테크/비즈니스 이벤트에 나타난 트렌드를 요약, 소개해 주는
                    컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9l2/view">
                        DT 트렌드 능력평가 : CES 2021 이 정도는 알아야...
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-8eh/view">
                        CES 2020 치트키
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li className="ai_sub_li">
                      <Link to="" onClick={emptyAlert}>
                        MWC 2021 (6/28~7/1) ※Upload 예정
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>SK, DT를 만나다</h3>
                <div className="ai_box">
                  <h4>
                    SK 그룹에서 진행되고 있는 DT기반 Deep Change 노력과 경험을
                    공유하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-8de/view">
                        [이천포럼 2020] SK, Platform-driven BM혁신을 말하다
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-1bc/view">
                        [SK,DT를 만나다] SK이노베이션편
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-1bb/view">
                        [SK,DT를 만나다] SK하이닉스편
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li className="ai_sub_li">
                      <Link to="" onClick={emptyAlert}>
                        [이천포럼 2021] ※Upload 예정
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-1bd/view">
                        [SK,DT를 만나다] SK브로드밴드편
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-4x7/view">
                        [SK,DT를 만나다] SK(주) C&#38;C편
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'DT Technologies',
      key: 'tab3',
      render: () => (
        <Tab.Pane attached={false}>
          <div className="belt">
            <div className="text-right-box">
              <Link
                to="/lecture/college/CLG00002/channel/CHN0000d"
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

          {/* 컬리지 텍스트 */}
          <div className="college-sub-txt">
            <strong>DT Technologies</strong>
            <div>
              <ul>
                <li>
                  본 채널은 프로그래밍 언어, Cloud Computing, Blockchain, IoT,
                  Big Data 등 DT 실행에 요구되는 주요 핵심 <br />
                  기술들에 대해 학습하는 채널입니다.
                </li>
              </ul>
              <p className="p_link dt">
                각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
              </p>
            </div>
          </div>

          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table dt">
                <h3>프로그래밍 기초 (Python, R)</h3>
                <div className="ai_box">
                  <h4>
                    현장에서 발생되는 각종 Biz Data를 효과적으로 분석하고자 할
                    때, 기본적으로 필요한 Python/R에 대해 학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/search?query=%EB%8F%84%EB%A0%88%EB%AF%B8">
                        도레미 파이썬 Vol. 1~2
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-5bj/view">
                        [코세라] Programming for Everybody
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-1bo/view">
                        R 프로그래밍 기초
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>Cloud Computing</h3>
                <div className="ai_box">
                  <h4>
                    언제 어디서나 인터넷의 저장 공간과 컴퓨팅 파워를 On-Demand로
                    활용하는 Cloud Computing에 대해 학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-aar/view">
                        Cloud 입문 A to Z – What is the Cloud?
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-8f4/view">
                        엣지 컴퓨팅, 클라우드 컴퓨팅의 대체재인가?
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9b6/view">
                        클라우드 컴퓨팅이 가져온 비즈니스 혁신과 기술의 미래
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>Blockchain</h3>
                <div className="ai_box">
                  <h4>
                    가상 화폐는 물론 다양한 산업에 확장되고 있는 Blockchain의
                    기본 개념과 Biz 기회에 대해 학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-aap/view">
                        Blockchain 입문 A to Z – What is the Blockchain?
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-56h/view">
                        [코세라] Blockchain Basics
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>IoT</h3>
                <div className="ai_box">
                  <h4>
                    센서와 통신을 사용하여 수많은 기기에 데이터를
                    수집/저장/분석할 수 IOT 기술과 Biz 적용 방안을 학습해 볼 수
                    있는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-aaq/view">
                        IoT 입문 A to Z – What is the IoT?
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9bs/cube/CUBE-bu5/view/ELearning">
                        [정재승 교수와 함께하는 Tech &#38; Biz Talk] IoT는
                        세상을 어떻게 바꾸고 있는가?
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>Big Data</h3>
                <div className="ai_box">
                  <h4>
                    복잡한 대용량 Data를 분석해 Data의 진정한 가치와 Biz
                    Insight를 찾아내는 Big Data 기본 개념과 방법에 대해 학습하는
                    컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-aas/view">
                        Big Data입문 A to Z – What is the Big Data?
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-5mp/view">
                        [코세라] Introduction to Big Data
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Data Engineer Track',
      key: 'tab4',
      render: () => (
        <Tab.Pane attached={false}>
          <div className="belt">
            <div className="text-right-box">
              <Link
                to="/lecture/college/CLG00002/channel/CHN00009"
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

          {/* 컬리지 텍스트 */}
          <div className="college-sub-txt">
            <strong>
              Data Engineer <br />
              Track
            </strong>
            <div>
              <ul>
                <li>
                  본 채널은 Data Engineer로 성장하는데 필요한 Database 기초
                  지식부터 Big Data 처리를 위한 다양한 <br />
                  Engineering skill을 학습할 수 있는 채널입니다.
                </li>
              </ul>
              <p className="p_link dt">
                각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
              </p>
            </div>
          </div>

          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table dt">
                <h3>Scala 이해와 활용</h3>
                <div className="ai_box">
                  <h4>
                    Scala 언어의 기본 문법과 Functional Programming 기법 등을
                    실습기반으로 학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9an/view">
                        1. Background of Scala ~ Control Structure
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-9ap/view">
                        3. Scala className &#38; object
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9ao/view">
                        2. Functions ~ Collections
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-9ar/view">
                        4. Function type, Programing
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>NoSQL 이해와 활용</h3>
                <div className="ai_box">
                  <h4>
                    NoSQL 요소 기술의 개념과 현장에서의 활용 방안에 대해 실습을
                    통해 학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-5vw/view">
                        1. What is NoSQL
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-5vy/view">3. Cassandra</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-5vx/view">2. HBase</Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-5vz/view">4. MongoDB</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>Hadoop 이해와 활용</h3>
                <div className="ai_box">
                  <h4>
                    Big data 분석 및 처리를 위한 Hadoop의 개념 및 요소 기술에
                    대해 학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-1it/view">
                        1. What is Hadoop, Hadoop
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-1ir/view">
                        3. Configuration, Data Ingestion/Analytics
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-1is/view">
                        2. HDFS, YARN
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-1iq/view">
                        4. HiveQL, Pig Script, HUE &#38; Oozie, Security
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>SQL</h3>
                <div className="ai_box">
                  <h4>
                    Database에서 데이터를 추출하는 기초 언어인 SQL의 개념 및
                    기술에 대해 학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-1hv/view">SQL 기초</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-5bk/view">
                        [코세라] Databases and SQL for Data Science
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Cloud Engineer Track',
      key: 'tab5',
      render: () => (
        <Tab.Pane attached={false}>
          <div className="belt">
            <div className="text-right-box">
              <Link
                to="/lecture/college/CLG00002/channel/CHN0000a"
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

          {/* 컬리지 텍스트 */}
          <div className="college-sub-txt">
            <strong>
              Cloud Engineer <br />
              Track
            </strong>
            <div>
              <ul>
                <li>
                  본 채널은 Cloud Engineer로 성장하는 데 필요한 클라우드 전환 및
                  운영에 관한 기본 지식과 다양한 스킬을 학습하는 <br />
                  채널입니다. 또한 Market 인증 Certificate 취득을 위한 학습
                  컨텐츠도 제공하고 있습니다.
                </li>
              </ul>
              <p className="p_link dt">
                각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
              </p>
            </div>
          </div>

          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table dt">
                <h3>Cloud 기본 (Azure)</h3>
                <div className="ai_box">
                  <h4>
                    초급자들을 위한 Azure Cloud의 기본 개념, 요소기술, 다양한
                    서비스에 대해 학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-56o/view">
                        1: Azure 둘러보기, 가상서버 만들기
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-56q/view">
                        3: Azure VNET 생성, 부하분산 서비스 이해, Azure DevOps
                        환경
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-56p/view">
                        2: Azure Functions 이해, Azure 스토리지 활용 및 데이터
                        백업/마이그레이션 방법
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-56r/view">
                        4: Azure 모니터링/거버넌스/보안의 이해와 활용, Azure +
                        인공지능/IoT/블록체인
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>Cloud 기술</h3>
                <div className="ai_box">
                  <h4>
                    Cloud 기본 개념과 Cloud상의 네트워킹, 스토리지, 서비스 등에
                    대해 학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-5mv/view">
                        [코세라] Cloud Computing Concepts, Part 1 (UIUC)
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-5mx/view">
                        [코세라] Cloud Networking (UIUC)
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-5mw/view">
                        [코세라] Cloud Computing Concepts: Part 2 (UIUC)
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>Cloud 개발 기초</h3>
                <div className="ai_box">
                  <h4>
                    Cloud Engineer로서 Cloud 개발/운영에 필요한 기반 기술에 대해
                    학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-1hz/view">
                        Git을 사용한 버전 관리
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-1ht/view">리눅스 기초</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-1hx/view">
                        Spring 프레임워크 입문
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>Certification</h3>
                <div className="ai_box">
                  <h4 className="cloud_h4">
                    Global Market에서 인정 받는 Certificate 취득을 위한
                    컨텐츠입니다. (LMS 內 Certification 메뉴를 참고하세요)
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Data Analyst Track',
      key: 'tab6',
      render: () => (
        <Tab.Pane attached={false}>
          <div className="belt">
            <div className="text-right-box">
              <Link
                to="/lecture/college/CLG00002/channel/CHN00008"
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
          {/* 컬리지 텍스트 */}
          <div className="college-sub-txt">
            <strong>
              Data Analyst <br />
              Track
            </strong>
            <div>
              <ul>
                <li>
                  본 채널은 Data Analyst로 성장하는데 필요한 기초 Programming,
                  통계/분석 지식과 전문적 분석 기술을 종합적으로 <br />
                  학습할 수 있는 채널입니다.
                </li>
              </ul>
              <p className="p_link dt">
                각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
              </p>
            </div>
          </div>

          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table dt">
                <h3>Machine Learning 활용</h3>
                <div className="ai_box">
                  <h4>
                    머신러닝과 AI에 대한 이론/개념부터, 개별 알고리즘에 대한
                    코딩 실습까지 머신러닝을 활용한 분석 스킬을 학습하는
                    컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-5bw/view">
                        [코세라] Applied Machine Learning in Python
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-1bl/view">
                        비전공자를 위한 머신러닝
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-5mt/view">
                        [코세라] Machine Learning with Big Data
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-1bn/view">
                        인공지능/머신러닝 기초
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>Data Visualization</h3>
                <div className="ai_box">
                  <h4>
                    적절한 시각화 기법을 학습하고, 이를 통해 탐색적 분석에
                    활용하거나, 분석 결과를 표현하고 스토리로 만들어 낼 수 있는
                    방법을 학습합니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-569/view">
                        [코세라] Data Visualization
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-5mu/view">
                        [코세라] Graph Analytics for Big Data
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>Data 수집/가공</h3>
                <div className="ai_box">
                  <h4>
                    데이터 분석을 위해 필요한 데이터 구조를 이해하고, 이를
                    DB에서 추출하여 활용 가능 형태로 정제, 전처리하는 방법을
                    학습합니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-5bh/view">
                        [코세라] Using Database with Python
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-5bk/view">
                        [코세라] Database and SQL for Data Science
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-5bf/view">
                        [코세라] Using Python to Access Web Data
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-5bg/view">
                        [코세라] Python Data Structures
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>Statistics &#38; Analytics</h3>
                <div className="ai_box">
                  <h4>
                    기초 통계에 대한 이해 및 이를 통한 통계 분석 및 추론 분석
                    방법에 대해 학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-1bk/view">
                        파이썬으로 배우는 기초 통계
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-566/view">
                        [코세라] Inferential and Predictive Statistics for
                        Business
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-1bj/view">
                        파이썬으로 시작하는 데이터 분석
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-1bp/view">
                        R 패키지로 배우는 데이터 분석
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table dt">
                <h3>코딩 For Big Data 분석</h3>
                <div className="ai_box">
                  <h4>
                    Big Data 분석에 필요한 Python 기초지식과 스킬을 프로그래밍
                    실습을 통해 학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-1jc/view">
                        1. Why Python, Variables &#38; Data Types, String
                        Methods, Math Functions
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-1ja/view">
                        3. Collections Data Type - List/Tuple/Set/Dictionary
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-1jb/view">
                        2. Python Functions, Decision Making, Repeating Code,
                        Iteration
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-1j9/view">
                        4. Advanced Python Function, Exception Handling, Classes
                        and Objects
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },

    {
      menuItem: 'CDS Track',
      key: 'tab7',
      render: () => {
        pageMove('/certification/badge/badge-detail/BADGE-2v');
        return <Tab.Pane attached={false} />;
      },
    },
  ];
  return (
    <Tab
      menu={{ attached: false, tabular: false }}
      panes={panes}
      className="sub-tab-menu dt"
      activeIndex={activeIndex}
      onTabChange={onTabChange}
    />
  );
};

export const CollegeInnerEnTabDt = () => {
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);

  const queryParams = queryString.parse(window.location.search);
  const subTab = (queryParams.innerTab as string) || '';

  const onTabChange = (e: any, { activeIndex }: any) => {
    if (activeIndex === 1 || activeIndex === 7) {
      reactAlert({
        title: 'No permission',
        message:
          'This content is not ready for service yet. I will open it later after consulting with the person in charge of each company. ',
      });
    } else {
      setActiveIndex(activeIndex);
      history.push(
        routePaths.introductionCollegeDT(panes[activeIndex].menuItem)
      );
    }
  };

  const indexSetter = () => {
    if (subTab === 'DT Biz. ') {
      setActiveIndex(2);
    } else {
      const activeIndex =
        panes.findIndex((pane) => subTab.includes(pane.menuItem)) || 0;
      if (activeIndex > 0) {
        setActiveIndex(activeIndex);
      } else {
        setActiveIndex(0);
      }
    }
  };

  useEffect(() => {
    indexSetter();
  }, [queryParams]);

  const panes = [
    {
      menuItem: 'Introduction of \n DT College',
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
            <div className="ai-con-text">
              Digital Transformation refers to the comprehensive activity that
              starts from the customers and uses digital technologies to
              transform the existing operating process, the business model, and
              the work culture. It has become the core component in practicing
              Deep Change we SK families strive to achieve.
              <br />
              <br />
              DT College offers opportunities to learn major digital
              technologies such as data and cloud, which are the foundations of
              the DT drive. Not only that, it allows learners to be exposed to
              international and domestic business cases that have brought new
              experiences with the customers, innovated the BM and operations
              process, and changed the way of work. In addition, programs that
              allow them to acquire digital technology certificates approved by
              the market are available all the time.
            </div>
            <img
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-co-2-1_ENG.png"
              alt="채널명/ 채널소개 테이블"
              className="ui image"
            />
          </div>
          <div className="college-cont-map sub pbtom">
            <div className="belt">
              <div className="label sub">Full Curriculum</div>
              <div className="ai-top-btn">
                <span className="ai-btn01">Self-directive</span>
                <span className="ai-btn02 dt">Intensive</span>
              </div>
              <div className="dt-background">
                <div className="dt_belt">
                  <div className="dt_belt_le">
                    <div className="dt-le-list">
                      <div className="dt-le-item">
                        <h3>Data Engineer Track</h3>
                        <ul>
                          <li>Understanding and Using Scala</li>
                          <li>Understanding and Using NoSQL</li>
                          <li>Understanding and Using Hadoops</li>
                          <li>SQL</li>
                        </ul>
                      </div>
                      <div className="dt-le-item">
                        <div className="bedge-box">
                          <span className="bedge">Badge</span>
                        </div>
                        <h3>Cloud Engineer Track</h3>
                        <ul>
                          <li>Certification</li>
                          <li>Cloud Technology</li>
                          <li>Cloud Development Beginner</li>
                          <li>Cloud Basic (Azure)</li>
                        </ul>
                      </div>
                      <div className="dt-le-item">
                        <h3>Data Analyst Track</h3>
                        <ul>
                          <li>Using Machine Learning</li>
                          <li>Data Visualization</li>
                          <li>Data Collection/Processing</li>
                          <li>Statistics &amp; Analytics</li>
                          <li>Coding For Big Data Analysis</li>
                        </ul>
                      </div>
                    </div>
                    <div className="dt-le-list two">
                      <div className="dt-le-item">
                        <h3 className="dt_intro_h3">DT Technologies</h3>
                        <ul>
                          <li>Programming Language (R, Python)</li>
                          <li>Cloud Computing</li>
                          <li>Block chain</li>
                          <li>IoT</li>
                          <li>Big Data</li>
                        </ul>
                      </div>
                      <div className="dt-le-item other">
                        <div className="bedge-box">
                          <span className="bedge">Badge</span>
                        </div>
                        <h3>CDS Track</h3>
                        <p>(Intensive Course, 2weeks)</p>
                        <ul>
                          <li>Project in Actual Use</li>
                          <li>Machine Learning</li>
                          <li>Data Visualization</li>
                          <li>EDA and Data Processing</li>
                          <li>Data Pre-Processing</li>
                          <li>Python Basic Grammar</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="dt_belt_rg">
                    <div className="dt-le-list">
                      <div className="dt-le-item">
                        <h3>DT Biz. &amp; Implementation</h3>
                        <ul>
                          <li>
                            Tech & Biz Talk <br />
                            (Future Tech Forum)
                          </li>
                          <li>Zoom-in Mobility Biz</li>
                          <li>DT & BM Innovation Case Study</li>
                          <li>Global Tech event</li>
                          <li>Meeting SK,DT</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dt_belt">
                  <div className="dt-bottom">
                    <div className="bedge-box">
                      <span className="bedge">Badge</span>
                    </div>
                    <h3>AI/DT Literacy</h3>
                    <ul>
                      <li>Customer Empathy</li>
                      <li>Data-Centric Approach</li>
                      <li>Understanding ICT Tech</li>
                      <li>Biz Insight</li>
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
      menuItem: 'AI/DT Literacy',
      key: 'tab1',
      render: () => {
        return <Tab.Pane attached={false} />;
      },
    },
    {
      menuItem: 'DT Biz. & Implementation',
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
            <strong>
              DT Biz. &amp;
              <br />
              Implementation
            </strong>
            <div>
              <ul>
                <li>
                  This channel offers learners multiple cases inside and outside
                  the company, wherein the application of DT led to the change
                  in dealing with customers, in BM, and the operations
                  processes. This will provide the opportunity to learn ab out
                  various ways for application.
                </li>
              </ul>
              <p className="p_link dt">
                {/* Click each badge and course to go to the corresponding page. */}
              </p>
            </div>
          </div>

          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table dt">
                <h3>
                  Tech & Biz Talk <br />
                  (Future Tech Forum)
                </h3>
                <div className="ai_box">
                  <h4>
                    Hosted by Professor Jeong, Jae-seung, various lecturers and
                    panels come to present and discuss various trends and issues
                    in technology and business
                    <span>
                      (the forum is held live, once a month, seven times a year;
                      VoD is provided after editing)
                    </span>
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        Edge Computing, Applications in Business and its
                        Prospect
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        Business Innovation and Future of Technology <br />
                        Brought by Cloud Computing
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        How is IoT Changing the World? - IoT Update
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        The Challenge to Blockchain, Where is it Now?
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Zoom-in Mobility Biz</h3>
                <div className="ai_box">
                  <h4>
                    This content offers stories told from various perspectives
                    in the field of mobility, which is emerging as a crossroad
                    in innovation, such as technology, business model, and
                    competition structure.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        The Joy of Reading the Competition Flow in Mobility
                        Business
                      </a>
                    </li>
                    <li>
                      <a href="#none">Mobility Business Update by Fields</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">EV Business Story Told from Tesla</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>DT & BM Innovation Case Study</h3>
                <div className="ai_box">
                  <h4>
                    This content offers you lessons on the successful DT stories
                    by traditional companies and the latest trends in BM and
                    data usage and regulation.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">How to Capture Customers: Subscription</a>
                    </li>
                    <li>
                      <a href="#none">
                        SK Members Asked and Experts Answered: <br />
                        Questions on the 3 Laws of Data
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        Fact Check! 3 Major Laws in Data, What are the
                        Revisions?
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Global Tech event</h3>
                <div className="ai_box">
                  <h4>
                    This content summarizes and introduces the trends identified
                    in global tech and business events such as CES, MWC, and
                    GAFA.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        DT Trend Performance Evaluation: <br />
                        The Least You Should Know about CES 2021...
                      </a>
                    </li>
                    <li>
                      <a href="#none">CES 2020 Cheat Codes</a>
                    </li>
                  </ul>
                  <ul>
                    <li className="ai_sub_li">
                      <a href="#none">MWC 2021 (6/28~7/1) ※To be Uploaded</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Meeting SK,DT</h3>
                <div className="ai_box">
                  <h4>
                    This content shares the efforts to achieve the SK
                    Corporation’s initiative, DT-based Deep Change, and
                    experiences with it.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        [Icheon Forum 2020] SK Leads Innovation on
                        Platform-driven BM
                      </a>
                    </li>
                    <li>
                      <a href="#none">[Meeting SK,DT] SK Innovation</a>
                    </li>
                    <li>
                      <a href="#none">[Meeting SK,DT] SK Hynix</a>
                    </li>
                  </ul>
                  <ul>
                    <li className="ai_sub_li">
                      <a href="#none">[Icheon Forum 2021] ※To be Uploaded</a>
                    </li>
                    <li>
                      <a href="#none">[Meeting SK,DT] SK Broadband</a>{' '}
                    </li>
                    <li>
                      <a href="#none">[Meeting SK,DT] SK Co., Ltd. C&C</a>{' '}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'DT Technologies',
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
            <strong>DT Technologies</strong>
            <div>
              <ul>
                <li>
                  This channel offers various main core skills required in DT,
                  such as programming language, cloud computing, blockchain,
                  IoT, big data, etc.
                </li>
              </ul>
              <p className="p_link dt">
                {/* Click each badge and course to go to the corresponding page. */}
              </p>
            </div>
          </div>
          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table dt">
                <h3>
                  Programming Basics
                  <br />
                  (Python, R)
                </h3>
                <div className="ai_box">
                  <h4>
                    This content offers lessons on Python/R that are necessary
                    to effectively analyze business data at work.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">Doremi Python Volume 1~2</a>
                    </li>
                    <li>
                      <a href="#none">[Coursera] Programming for Everybody</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">R Programming Basics</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Cloud Computing</h3>
                <div className="ai_box">
                  <h4>
                    This content offers you lessons on cloud computing that uses
                    Internet storage and computing power as on-demand.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        Introducing Cloud from A to Z – What is the Cloud?
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        Edge Computing, Can it Replace the Cloud Computing?
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        Business Innovation and Future of Technology Brought{' '}
                        <br />
                        by Cloud Computing
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Blockchain</h3>
                <div className="ai_box">
                  <h4>
                    This content provides you with the business opportunity and
                    the basic concept of Blockchain, which is being expanded to
                    various industries, including the crypto currency.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        Introducing Blockchain from A to Z – What is the
                        Blockchain?
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">[Coursera] Blockchain Basics</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>IoT</h3>
                <div className="ai_box">
                  <h4>
                    This content teaches the learners how to apply IoT
                    technology, which can collect, save, and analyze data in
                    many devices via sensors and communications.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        Introducing IoT from A to Z – What is IoT?
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        [Tech & Biz Talk with Professor Jeong] How Is IoT
                        Changing the World?
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Big Data</h3>
                <div className="ai_box">
                  <h4>
                    This content teaches you the basic concept of big data,
                    which allows you to find out the true value in business and
                    be equipped with business insights by analyzing large and
                    complicated data.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        Introducing Big Data from A to Z – What is the Big Data?
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">[Coursera] Introduction to Big Data</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Data Engineer Track',
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
            <strong>
              Data Engineer
              <br />
              Track
            </strong>
            <div>
              <ul>
                <li>
                  This channel provides learners with basic knowledge of
                  databases and other engineering skills needed to process big
                  data, all of which are essential to the growth as a data
                  engineer.
                </li>
              </ul>
              <p className="p_link dt">
                {/* Click each badge and course to go to the corresponding page. */}
              </p>
            </div>
          </div>
          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table dt">
                <h3>
                  Understanding and <br />
                  Using Scala
                </h3>
                <div className="ai_box">
                  <h4>
                    This content provides lessons on the basic grammar of Scala
                    language and practical training on functional programming
                    techniques, among others.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        1. Background of Scala ~ Control Structure
                      </a>
                    </li>
                    <li>
                      <a href="#none">3. Scala className &amp; object</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">2. Functions ~ Collections</a>
                    </li>
                    <li>
                      <a href="#none">4. Function type, Programing</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>
                  Understanding and <br />
                  Using NoSQL
                </h3>
                <div className="ai_box">
                  <h4>
                    This content provides lessons on the component technology of
                    NoSQL and the method to use it in the work field.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">1. What is NoSQL</a>
                    </li>
                    <li>
                      <a href="#none">3. Cassandra</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">2. HBase</a>
                    </li>
                    <li>
                      <a href="#none">4. MongoDB</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>
                  Understanding and <br />
                  Using Hadoops
                </h3>
                <div className="ai_box">
                  <h4>
                    This content teaches you about Hadoop&apos;s concept and
                    component technology essential in big data analysis and
                    processing.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">1. What is Hadoop, Hadoop</a>
                    </li>
                    <li>
                      <a href="#none">
                        3. Configuration, Data Ingestion/Analytics
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">2. HDFS, YARN</a>
                    </li>
                    <li>
                      <a href="#none">
                        4. HiveQL, Pig Script, HUE &amp; Oozie, Security
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>SQL</h3>
                <div className="ai_box">
                  <h4>
                    This content teaches you the basic concept and technology of
                    SQL, the basic language in extracting data from the
                    database.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">SQL Basics</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        [Coursera] Databases and SQL for Data Science
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Cloud Engineer Track',
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
            <strong>
              Cloud Engineer
              <br />
              Track
            </strong>
            <div>
              <ul>
                <li>
                  It also provides learners with basic knowledge and basic
                  skills in transforming and operating the cloud, which is
                  essential in the growth as a cloud engineer. Not only that, it
                  offers learning contents that are necessary for getting
                  certificated approved by the market.
                </li>
              </ul>
              <p className="p_link dt">
                {/* Click each badge and course to go to the corresponding page. */}
              </p>
            </div>
          </div>
          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table dt">
                <h3>Cloud Basic (Azure)</h3>
                <div className="ai_box">
                  <h4>
                    This content provides lessons on the basic concept,
                    component technology and various services offered in Azure
                    Cloud.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        1: Exploring Azure, Making a Virtual Server
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        3: Create Azure VNET, Understanding Load Balancing
                        Service, <br />
                        Azure DevOps Environment
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        2: Understanding Azure Functions, How to Use Azure
                        Storage and <br />
                        Data Backup/ Migration Methods
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        4: Azure Monitoring/ Governance/ Understanding and{' '}
                        <br />
                        Using Security, Azure + AI/ IoT/ Blockchain
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Cloud Technology</h3>
                <div className="ai_box">
                  <h4>
                    This content teaches you the basic concept of cloud and its
                    networking, storage, service, etc.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        [Coursera] Cloud Computing Concepts, Part 1 (UIUC)
                      </a>
                    </li>
                    <li>
                      <a href="#none">[Coursera] Cloud Networking (UIUC)</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        [Coursera] Cloud Computing Concepts: Part 2 (UIUC)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>
                  Cloud Development <br />
                  Beginner
                </h3>
                <div className="ai_box">
                  <h4>
                    This content teaches you the basic technologies necessary
                    for developing and operating the cloud as a cloud engineer.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">Version Management using Git</a>
                    </li>
                    <li>
                      <a href="#none">Linux Basics</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">Spring Framework Beginner</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Certification</h3>
                <div className="ai_box">
                  <h4 className="cloud_h4">
                    This content allows learners to acquire certification
                    recognized in the global market. (Check Certification Menu
                    in the LMS.)
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Data Analyst Track',
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
            <strong>
              Data Analyst
              <br />
              Track
            </strong>
            <div>
              <ul>
                <li>
                  This channel provides learners with basic programming,
                  statistics and analysis knowledge, and professional analytical
                  skills, essential to the growth as a data analyst.
                </li>
              </ul>
              <p className="p_link dt">
                {/* Click each badge and course to go to the corresponding page. */}
              </p>
            </div>
          </div>
          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table dt">
                <h3>Using Machine Learning</h3>
                <div className="ai_box">
                  <h4>
                    This content provides you with analytical skills that use
                    machine learning. You can learn from theories and concept of
                    machine learning and AI to practical coding lessons on
                    separate algorithms.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        [Coursera] Applied Machine Learning in Python
                      </a>
                    </li>
                    <li>
                      <a href="#none">Machine Learning for Non-majors</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        [Coursera] Machine Learning with Big Data
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        Artificial Intelligence/ Machine Learning Basics
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Data Visualization</h3>
                <div className="ai_box">
                  <h4>
                    It offers lessons on the visual techniques and how it can be
                    used for exploratory analysis and analysis results to be
                    expressed <br />
                    in the form of a story.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">[Coursera] Data Visualization</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        [Coursera] Graph Analytics for Big Data
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Data Collection/Processing</h3>
                <div className="ai_box">
                  <h4>
                    You can understand the data structure needed for the data
                    analysis and the ways to refine and precondition the data
                    extracted <br />
                    from the DB.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">[Coursera] Using Database with Python</a>
                    </li>
                    <li>
                      <a href="#none">
                        [Coursera] Database and SQL for Data Science
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        [Coursera] Using Python to Access Web Data
                      </a>
                    </li>
                    <li>
                      <a href="#none">[Coursera] Python Data Structures</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Statistics &amp; Analytics</h3>
                <div className="ai_box">
                  <h4>
                    This content offers lessons on the basic understanding of
                    basic statistics and the ways to perform statistical and
                    inferential analysis.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        Learning about Basic Statistics with Python
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [Coursera] Inferential and Predictive Statistics for
                        Business
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        Starting with Data Analysis with Python
                      </a>
                    </li>
                    <li>
                      <a href="#none">Learning Data Analysis with R Package</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>
                  Coding For <br />
                  Big Data Analysis
                </h3>
                <div className="ai_box">
                  <h4>
                    This content equips you with the basic things you need to
                    know about Python and offers you programming lessons to
                    practice your skills, all of which are essential in big data
                    analysis.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        1. Why Python, Variables &amp; Data Types, String
                        Methods, Math Functions
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        3. Collections Data Type - List/Tuple/Set/Dictionary
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        2. Python Functions, Decision Making, Repeating Code,
                        Iteration
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        4. Advanced Python Function, Exception Handling, Classes
                        and Objects
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },

    {
      menuItem: 'CDS Track',
      key: 'tab7',
      render: () => {
        return <Tab.Pane attached={false} />;
      },
    },
  ];
  return (
    <Tab
      menu={{ attached: false, tabular: false }}
      panes={panes}
      className="sub-tab-menu dt"
      activeIndex={activeIndex}
      onTabChange={onTabChange}
    />
  );
};

export const CollegeInnerZhTabDt = () => {
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);

  const onTabChange = (e: any, { activeIndex }: any) => {
    if (activeIndex === 1 || activeIndex === 7) {
      reactAlert({
        title: '没有权限',
        message: '本版内容还没有准备好服务。 与各公司负责人协商后，秋后开放。',
      });
    } else {
      setActiveIndex(activeIndex);
      history.push(
        routePaths.introductionCollegeDT(panes[activeIndex].menuItem)
      );
    }
  };

  const queryParams = queryString.parse(window.location.search);
  const subTab = (queryParams.innerTab as string) || '';

  const indexSetter = () => {
    if (subTab === 'DT Biz. ') {
      setActiveIndex(2);
    } else {
      const activeIndex =
        panes.findIndex((pane) => subTab.includes(pane.menuItem)) || 0;
      if (activeIndex > 0) {
        setActiveIndex(activeIndex);
      } else {
        setActiveIndex(0);
      }
    }
  };

  useEffect(() => {
    indexSetter();
  }, [queryParams]);
  const panes = [
    {
      menuItem: 'DT College介绍',
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
            <div className="ai-con-text">
              Digital
              Transformation是从客户角度出发，应用Digital技术，改变现有的运营流程和Business
              Model，甚至是文化、工作方式，是SK所追求的Deep
              Change的核心执行因素。
              <span className="mg10" />
              DT
              College不仅提供推进DT的根本，即以Data/Cloud为中心的Digital主要技术学习机会，还可以广泛学习国内外有关创造新的客户体验、创新BM/运营流程、改变工作方式的商业案例。市场中，长期有为主要Digital技术提供Certificate申请支持的项目。
            </div>
            <img
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-co-2-1_CHN.png"
              alt="채널명/ 채널소개 테이블"
              className="ui image"
            />
          </div>
          <div className="college-cont-map sub pbtom">
            <div className="belt">
              <div className="label sub">全部课程</div>
              <div className="ai-top-btn">
                <span className="ai-btn01">Self-directive</span>
                <span className="ai-btn02 dt">Intensive</span>
              </div>
              <div className="dt-background">
                <div className="dt_belt">
                  <div className="dt_belt_le">
                    <div className="dt-le-list">
                      <div className="dt-le-item">
                        <h3>Data Engineer Track</h3>
                        <ul>
                          <li>理解与应用Scala</li>
                          <li>理解与应用NoSQL</li>
                          <li>理解与应用Hadoop</li>
                          <li>SQL</li>
                        </ul>
                      </div>
                      <div className="dt-le-item">
                        <div className="bedge-box">
                          <span className="bedge">Badge</span>
                        </div>
                        <h3>Cloud Engineer Track</h3>
                        <ul>
                          <li>Certification</li>
                          <li>Cloud技术</li>
                          <li>Cloud开发基础</li>
                          <li>Cloud基础（Azure）</li>
                        </ul>
                      </div>
                      <div className="dt-le-item">
                        <h3>Data Analyst Track</h3>
                        <ul>
                          <li>应用机器学习</li>
                          <li>Data Visualization</li>
                          <li>数据收集/加工</li>
                          <li>Statistics &amp; Analytics</li>
                          <li>编码For Big Data分析</li>
                        </ul>
                      </div>
                    </div>
                    <div className="dt-le-list two">
                      <div className="dt-le-item">
                        <h3 className="dt_intro_h3">DT Technologies</h3>
                        <ul>
                          <li>编程语言（R，Python）</li>
                          <li>Cloud Computing</li>
                          <li>Block chain</li>
                          <li>IoT</li>
                          <li>Big Data</li>
                        </ul>
                      </div>
                      <div className="dt-le-item other">
                        <div className="bedge-box">
                          <span className="bedge">Badge</span>
                        </div>
                        <h3>CDS Track</h3>
                        <p>CDS Track (Intensive Course，2周)</p>
                        <ul>
                          <li>现场应用Project</li>
                          <li>机器学习</li>
                          <li>Data Visualization</li>
                          <li>EDA及数据加工</li>
                          <li>Data Pre-Processing</li>
                          <li>Python基础语法</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="dt_belt_rg">
                    <div className="dt-le-list">
                      <div className="dt-le-item">
                        <h3>DT Biz. &amp; Implementation</h3>
                        <ul>
                          <li>Tech &amp; Biz Talk（未来Tech论坛）</li>
                          <li>Zoom-in Mobility Biz</li>
                          <li>DT &amp; BM创新 Case study</li>
                          <li>全球Tech Event</li>
                          <li>SK，遇见DT</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dt_belt">
                  <div className="dt-bottom">
                    <div className="bedge-box">
                      <span className="bedge">Badge</span>
                    </div>
                    <h3>AI/DT Literacy</h3>
                    <ul>
                      <li>Customer Empathy</li>
                      <li>Data-Centric Approach</li>
                      <li>理解ICT Tech</li>
                      <li>Biz Insight</li>
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
      menuItem: 'AI/DT Literacy',
      key: 'tab1',
      render: () => {
        return <Tab.Pane attached={false} />;
      },
    },
    {
      menuItem: 'DT Biz. & Implementation',
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
            <strong>
              DT Biz. &amp;
              <br />
              Implementation
            </strong>
            <div>
              <ul>
                <li>
                  通过本频道可学习改变客户体验与BM/运营流程的集团内外DT案例与应用方案。
                </li>
              </ul>
              <p className="p_link dt">
                {/* 点击各Badge与课程，即可进入到相应页面。 */}
              </p>
            </div>
          </div>

          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table dt">
                <h3>Tech & Biz Talk（未来Tech论坛）</h3>
                <div className="ai_box">
                  <h4>
                    与郑载胜教授（社会）一起，围绕各个主题的演讲嘉宾发表/讨论特定技术及Biz领域的最新现况和问题。
                    <span>
                      （每月1次，一年共7次举办Live论坛后，通过后剪辑以VOD呈现）
                    </span>
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">边缘计算技术的Biz应用现状及未来展望</a>
                    </li>
                    <li>
                      <a href="#none">云计算带来的商业创新和技术的未来</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">IoT如何改变世界？-IoT更新</a>
                    </li>
                    <li>
                      <a href="#none">区块链的挑战，当前处于什么阶段？</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Zoom-in Mobility Biz</h3>
                <div className="ai_box">
                  <h4>
                    围绕正在成为创新Cross road的Mobility领域，讲述Tech、Biz
                    Model、竞争结构等各种角度story的内容。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">洞悉Mobility Biz竞争趋势的快乐</a>
                    </li>
                    <li>
                      <a href="#none">Mobility Biz各领域更新</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">通过特斯拉了解电动汽车商业故事</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>DT & BM创新 Case study</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可学习传统企业DT成功案例，BM相关最新趋势，数据应用/管制相关趋势等。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">捕获客户的心——订阅</a>
                    </li>
                    <li>
                      <a href="#none">数据三法，SK成员问，专家答。</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        确认真相！数据三法修订后会发生什么改变？
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>全球Tech Event</h3>
                <div className="ai_box">
                  <h4>
                    本内容旨在总结、介绍CES、MWC等IT活动，还有GAFA的开发者大会等全球Tech/Biz.盛会中出现的趋势。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">DT趋势能力评估：至少要知道CES 2021……</a>
                    </li>
                    <li>
                      <a href="#none">CES 2020 cheat key</a>
                    </li>
                  </ul>
                  <ul>
                    <li className="ai_sub_li">
                      <a href="#none">MWC 2021（6/28 ~ 7/1）※计划Upload</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>SK，遇见DT</h3>
                <div className="ai_box">
                  <h4>
                    本内容旨在分享SK集团围绕基于DT的Deep
                    Change所付出的努力与经验。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        [利川论坛2020] SK,提出Platform-driven BM创新。
                      </a>
                    </li>
                    <li>
                      <a href="#none">[SK，遇见DT] SK Innovation篇</a>
                    </li>
                    <li>
                      <a href="#none">[SK，遇见DT] SK海力士篇</a>
                    </li>
                  </ul>
                  <ul>
                    <li className="ai_sub_li">
                      <a href="#none">[利川论坛2021] ※计划Upload</a>
                    </li>
                    <li>
                      <a href="#none">[SK，遇见DT] SK Broadband篇</a>{' '}
                    </li>
                    <li>
                      <a href="#none">[SK，遇见DT] SK(株) C&C篇</a>{' '}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'DT Technologies',
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
            <strong>DT Technologies</strong>
            <div>
              <ul>
                <li>
                  通过本频道可学习编程语言、Cloud
                  Computiing、Blockchain、IoT、Big
                  Data等DT实行中所需的主要核心技术。
                </li>
              </ul>
              <p className="p_link dt">
                {/* 点击各Badge与课程，即可进入到相应页面。 */}
              </p>
            </div>
          </div>
          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table dt">
                <h3>编程基础（Python，R）</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可学习在想要有效分析现场发生的各种Biz
                    Data时基本需要用到的Python/R。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">DO RE MI Python Vol.1~2</a>
                    </li>
                    <li>
                      <a href="#none">[Coursera] Programming for Everybody</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">R Programming基础</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Cloud Computing</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可以学习随时随地ON-Demand应用互联网存储空间和运算力的云计算。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">Could入门A to Z - What is the Cloud？</a>
                    </li>
                    <li>
                      <a href="#none">边缘计算，是否可以替代云计算？</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">云计算带来的商业创新和技术的未来</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Blockchain</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可以学习虚拟货币，以及扩散到各个产业的Blockchain基本概念和Biz机会。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        Blockchain入门A to Z - What is the Blockchain？
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">[Coursera] Blockchain Basics</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>IoT</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可学习通过使用传感器和通信在众多设备上收集、存储、分析数据的IoT技术及Biz应用方案。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">IoT入门A to Z - What is the IoT？</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        [与郑载胜教授一起Tech & Biz Talk] IoT如何改变世界？
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Big Data</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容学习分析复杂大规模Data，寻找Data真正价值和Biz
                    Insight的Big Data基本概念和方法。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        Big Data入门A to Z - What is the Big Data？
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">[Coursera]Introduction to Big Data</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Data Engineer Track',
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
            <strong>
              Data Engineer
              <br />
              Track
            </strong>
            <div>
              <ul>
                <li>
                  通过本频道可以学习想要成为Data
                  Engineer所需的从Database基础知识到处理大数据所需的各种Engineering
                  skill。
                </li>
              </ul>
              <p className="p_link dt">
                {/* 点击各Badge与课程，即可进入到相应页面。 */}
              </p>
            </div>
          </div>
          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table dt">
                <h3>理解与应用Scala</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可以Scala语言的基础语法和Functional
                    Programming技法等为实习基础进行学习。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        1. Background of Scala ~ Control Structure
                      </a>
                    </li>
                    <li>
                      <a href="#none">3. Scala className &amp; object</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">2. Functions ~ Collections</a>
                    </li>
                    <li>
                      <a href="#none">4. Function type, Programing</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>理解与应用NoSQL</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可以通过实习方式学习NoSQL要素技术的概念和现场应用方案。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">1. What is NoSQL</a>
                    </li>
                    <li>
                      <a href="#none">3. Cassandra</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">2. HBase</a>
                    </li>
                    <li>
                      <a href="#none">4. MongoDB</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>理解与应用Hadoop</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可以学习Big
                    Data分析及处理所需Hadoop概念与要素技术。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">1. What is Hadoop, Hadoop</a>
                    </li>
                    <li>
                      <a href="#none">
                        3. Configuration, Data Ingestion/Analytics
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">2. HDFS, YARN</a>
                    </li>
                    <li>
                      <a href="#none">
                        4. HiveQL, Pig Script, HUE &amp; Oozie, Security
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>SQL</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可以学习在Database提取数据时用的基础语言SQL的概念与技术。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">SQL基础</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        [Coursera]Databases and SQL for Data Science
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Cloud Engineer Track',
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
            <strong>
              Cloud Engineer
              <br />
              Track
            </strong>
            <div>
              <ul>
                <li>
                  通过本频道可以学习想成为Could
                  Engineer所需的云转换与运营相关基础知识和各种技巧。并且还涵盖了Market认证Certificate申请方式教学内容。
                </li>
              </ul>
              <p className="p_link dt">
                {/* 点击各Badge与课程，即可进入到相应页面。 */}
              </p>
            </div>
          </div>
          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table dt">
                <h3>Cloud基础（Azure）</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可学习初级Azure
                    Cloud基础概念、要素技术、各种服务。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">1：Azure概览，建立虚拟服务器</a>
                    </li>
                    <li>
                      <a href="#none">
                        3：Azure VNET创建，理解负载均衡服务，Azure DevOps环境
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        2：理解Azure Functions，Azure
                        storage应用及数据备份/迁移方法
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        4：对Azure监测/治理/安全的理解和应用，Azure+
                        人工智能/IoT/区块链
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Cloud技术</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可以学习Cloud基础概念，Cloud上的Networking、存储、服务等。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        [Coursera] Cloud Computing Concepts, Part 1 (UIUC)
                      </a>
                    </li>
                    <li>
                      <a href="#none">[Coursera] Cloud Networking (UIUC)</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        [Coursera] Cloud Computing Concepts: Part 2 (UIUC)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Cloud开发基础</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可以学习作为Cloud
                    Engineer需要学习的Cloud开发/运营基础技术。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">使用Git进行版本管理</a>
                    </li>
                    <li>
                      <a href="#none">Linux基础</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">Spring框架入门</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Certification</h3>
                <div className="ai_box">
                  <h4 className="cloud_h4">
                    通过本内容可了解在Global
                    Market获得认证的Certificate获取方法。（请参考LMS中Certification菜单）
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Data Analyst Track',
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
            <strong>
              Data Analyst
              <br />
              Track
            </strong>
            <div>
              <ul>
                <li>
                  通过本频道可综合学习成为Data
                  Analyst所需的基础Programming、统计/分析知识和专业分析技术。
                </li>
              </ul>
              <p className="p_link dt">
                {/* 点击各Badge与课程，即可进入到相应页面。 */}
              </p>
            </div>
          </div>
          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table dt">
                <h3>应用机器学习</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可学习机器学习、AI理论/概念，以及部分算法的编码实习等应用机器学习的分析技巧。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        [Coursera] Applied Machine Learning in Python
                      </a>
                    </li>
                    <li>
                      <a href="#none">适合非专业学习者的机器学习课程</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        [Coursera] Machine Learning with Big Data
                      </a>
                    </li>
                    <li>
                      <a href="#none">人工智能/机器学习基础</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Data Visualization</h3>
                <div className="ai_box">
                  <h4>
                    学习适合的视觉化方式，将其应用于探索分析或表达分析结果，导出story的方法。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">[Coursera] Data Visualization</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        [Coursera] Graph Analytics for Big Data
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>数据收集/加工</h3>
                <div className="ai_box">
                  <h4>
                    理解分析数据所需的数据结构，学习如何从DB提取数据，加工、预处理成可使用的形态。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">[Coursera] Using Database with Python</a>
                    </li>
                    <li>
                      <a href="#none">
                        [Coursera] Database and SQL for Data Science
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        [Coursera] Using Python to Access Web Data
                      </a>
                    </li>
                    <li>
                      <a href="#none">[Coursera] Python Data Structures</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>Statistics &amp; Analytics</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可以理解基础统计，以及借此进行统计分析和推论分析的方法。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">通过Python学习基础统计</a>
                    </li>
                    <li>
                      <a href="#none">
                        [Coursera] Inferential and Predictive Statistics for
                        Business
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">以Python开始的数据分析</a>
                    </li>
                    <li>
                      <a href="#none">通过R package学习数据分析</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ai_sub_table dt">
                <h3>编码For Big Data分析</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容以编程实习方式学习大数据分析所需的Python基础知识和技巧。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        1. Why Python, Variables &amp; Data Types, String
                        Methods, Math Functions
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        3. Collections Data Type - List/Tuple/Set/Dictionary
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        2. Python Functions, Decision Making, Repeating Code,
                        Iteration
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        4. Advanced Python Function, Exception Handling, Classes
                        and Objects
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },

    {
      menuItem: 'CDS Track',
      key: 'tab7',
      render: () => {
        return <Tab.Pane attached={false} />;
      },
    },
  ];
  return (
    <Tab
      menu={{ attached: false, tabular: false }}
      panes={panes}
      className="sub-tab-menu dt"
      activeIndex={activeIndex}
      onTabChange={onTabChange}
    />
  );
};

export default withRouter(CollegeInnerTabDt);
