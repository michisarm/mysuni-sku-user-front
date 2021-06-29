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

const CollegeInnerTabDt = () => {
  const history = useHistory();

  const pageMove = (path: string) => {
    history.push(path);
  };

  const panes = [
    {
      menuItem: 'DT College 소개',
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
      render: () => {
        pageMove('/certification/badge/badge-detail/BADGE-2t');
        return <Tab.Pane attached={false} />;
      },
    },
    {
      menuItem: 'DT Biz. & Implementation',
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
                        3. Scala class &#38; object
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
    />
  );
};

export default CollegeInnerTabDt;
