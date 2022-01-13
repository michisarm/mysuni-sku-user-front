import React, { useState, useEffect } from 'react';
import {
  Link,
  useHistory,
  withRouter,
  useParams,
  useLocation,
} from 'react-router-dom';
import { Image, Tab, MenuItem } from 'semantic-ui-react';
import routePaths from 'main/routePaths';
import { reactAlert } from '@nara.platform/accent';
import queryString from 'query-string';

const PUBLIC_URL = process.env.PUBLIC_URL;
interface tapName {
  tab: string;
  subTabAI: string;
}

const CollegeInnerTabAi = () => {
  const history = useHistory();

  const pageMove = (path: string) => {
    history.replace(path);
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const onTabChange = (e: any, { activeIndex }: any) => {
    setActiveIndex(activeIndex);
    history.push(routePaths.introductionCollegeAI(panes[activeIndex].menuItem));
  };

  const queryParams = queryString.parse(window.location.search);
  const subTab = (queryParams.innerTab as string) || '';

  const indexSetter = () => {
    const activeIndex =
      panes.findIndex((pane) => subTab.includes(pane.menuItem)) || 0;
    if (activeIndex > 0) {
      setActiveIndex(activeIndex);
    } else {
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    indexSetter();
  }, [queryParams]);

  const panes = [
    {
      menuItem: 'AI Category 소개',
      key: 'tab0',
      render: () => (
        <Tab.Pane attached={false}>
          <div className="belt">
            <div className="text-right-box">
              <Link
                to="/lecture/college/CLG00001/channels/pages/1"
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
              이제 AI는 우리가 인지하지 못할 정도로 Seamless하게 일상 속에
              자리잡고 있듯이, 우리 SK가 추구하는 Deep Change 또한 모든 비즈니스
              영역에서 AI가 접목된 변화를 필요로 하고 있습니다. <br />
              <br />
              AI Category에서는 이러한 AI 기반의 Deep Change 실행 역량과 Align된
              Learning Experience를 제공하고 있습니다.
              <br /> 비즈니스 현장의 기술 인력들에게 요구되는 다양한 전문 AI
              기술 습득은 물론, SK 구성원이라면 누구나 알아야 할 기본적인 AI
              지식에 이르기까지 <br />
              일상의 업무에 폭넓게 AI를 활용할 수 있는 역량을 갖출 수 있도록
              지원하고 있습니다. <br />
              <br />
              Literacy에 해당하는 기본 과정을 시작으로 본인이 성장하고자 하는
              Role과 직무에 맞는 Specialty 과정이 체계적으로 제공되고 있어,
              머신러닝, 딥러닝 등과 같은 AI 핵심 기술을 학습하고 이를 적용한
              다양한 Biz Case를 통해 AI가 가져올 새로운 기회를 구체적으로 그려볼
              수 있을 것입니다.
            </div>
            <Image src={`${PUBLIC_URL}/images/all/ai-con01-1.png`} alt="" />
          </div>

          <div className="college-cont-map sub pbtom">
            <div className="belt">
              <div className="label sub">전체 커리큘럼</div>
              <div className="ai-top-btn">
                <span className="ai-btn01">Self-directive</span>
                <span className="ai-btn02">Intensive</span>
              </div>
              <div className="ai-background">
                <div className="ai-belt one">
                  <div className="ai-belt-box">
                    <div className="ai-intro">
                      <h3>AI Technologies</h3>
                      <ul>
                        <li>딥러닝</li>
                        <li>Meta Learner</li>
                      </ul>
                    </div>

                    <div className="ai-intro sub">
                      <ul>
                        <li>TensorFlow/Pytorch 프레임워크</li>
                        <li>머신러닝</li>
                        <li>AI 기초 개념 및 동작원리</li>
                        <li>AI 수학 기초</li>
                      </ul>
                    </div>
                  </div>

                  <div className="ai-belt-box">
                    <div className="ai-intro">
                      <h3>AI Trend Watch</h3>
                      <ul className="ai-bottom">
                        <li>AI 최신 기술</li>
                      </ul>
                    </div>

                    <div className="ai-intro sub">
                      <ul>
                        <li>AI Biz/Tech Conference</li>
                        <li>ai.x Conference</li>
                        <li>ICT Tech Summit</li>
                      </ul>
                    </div>
                  </div>

                  <div className="ai-belt-box">
                    <div className="ai-intro">
                      <h3>AI Biz. Implementation</h3>
                      <ul className="ai-bottom">
                        <li>AI Biz Case Study</li>
                      </ul>
                    </div>

                    <div className="ai-intro sub">
                      <ul>
                        <li>SK AI적용 Practice</li>
                        <li>AI To Biz Methodology</li>
                      </ul>
                    </div>
                  </div>

                  <div className="ai-belt-track">
                    <div className="bedge-box">
                      <span className="bedge">Badge</span>
                    </div>

                    <h3>ML Engineer Track</h3>
                    <p>(Intensive Course, 9주)</p>
                    <ul>
                      <li>Tabular / NLP</li>
                      <li>Deep Learning</li>
                      <li>Computer Vision</li>
                      <li>ML Model 및 History</li>
                      <li>AI 수학</li>
                      <li>ML 기초</li>
                    </ul>
                  </div>
                </div>

                <div className="ai-belt width100">
                  <div className="ai-belt-box">
                    <div className="ai-intro">
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
      menuItem: 'AI Biz. Implementation',
      key: 'tab2',
      render: () => (
        <Tab.Pane attached={false}>
          <div className="belt">
            <div className="text-right-box">
              <Link
                to="/lecture/college/CLG00001/channel/CHN00002"
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
              AI Biz. <br />
              Implementation
            </strong>
            <div>
              <ul>
                <li>
                  본 채널은 AI를 활용하여 고객 경험, Business, 운영 프로세스의
                  변화를 가져온 다양한 그룹 내/외의 AI 활용사례를 배우고,
                  현장에서 AI를 적용하는 방안을 고민해 볼 수 있는 채널입니다.
                </li>
              </ul>
              <p className="p_link ai">
                각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
              </p>
            </div>
          </div>

          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table">
                <h3>AI Biz Case Study</h3>
                <div className="ai_box">
                  <h4>
                    Industry별/Function별 국내외 AI 활용 사례와 적용 과정의
                    Lessons Learned를 공유하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-7dq/view">
                        AI Biz Case : 환경
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-79m/view">
                        AI Biz Case : 에너지/화학
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-6xe/view">
                        AI Biz Case : 바이오/헬스
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-7b3/view">
                        AI Biz Case : 마케팅
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-6y1/view">
                        AI Biz Case : 생산/공정
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>SK AI Practice</h3>
                <div className="ai_box">
                  <h4>
                    그룹 내에서 AI를 활용하고 있는 다양한 형태의 사례와 경험을
                    공유하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-84c/view">
                        SK텔레콤의 AI업무 적용 사례 및 Lessons Learned
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-83g/view">
                        SK관계사의 Industrial AI도입 사례 및 Lessons Learned
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-aau/cube/CUBE-7j9/view/Video">
                        [AI Biz Insight] RPA를 활용한 SK텔레콤의 업무 효율화
                        사례
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-aaw/cube/CUBE-10n/view/Video">
                        [AI Biz Insight] 딥러닝을 활용한 Film Defect
                        자동유형분류
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-83k/view">
                        SK 관계사의 AI도입/적용 Pain Points와 그룹차원의
                        협력방안
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-aax/cube/CUBE-865/view/Video">
                        [AI Biz Insight] 딥러닝을 활용한 Sales QA 자동화
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-aav/cube/CUBE-2ix/view/Video">
                        [AI Biz Insight] 사무실 책상 위 AI, AI Assistant와 RDA
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>AI To Biz Methodology</h3>
                <div className="ai_box">
                  <h4>
                    AI를 현장에 도입하기 위한 방법론과 프로세스, Checklist 등을
                    제공합니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-aat/view">
                        The Road to AI – AI Biz 적용 프로세스
                      </Link>
                    </li>
                    <li>
                      <Link to="/search?query=AI%EC%84%9C%EB%B9%84%EC%8A%A4%20%EA%B8%B0%ED%9A%8D/%EA%B0%9C%EB%B0%9C%20%EA%B8%B0%EC%B4%88">
                        AI서비스 기획 개발 (입문/기획/기초)
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-57d/view">
                        Industrial AI솔루션 동향과 도입 방안
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
      menuItem: 'AI Trend Watch',
      key: 'tab3',
      render: () => (
        <Tab.Pane attached={false}>
          <div className="belt">
            <div className="text-right-box">
              <Link
                to="/lecture/college/CLG00001/channel/CHN0006i"
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
            <strong>AI Trend Watch</strong>
            <div>
              <ul>
                <li>
                  본 채널은 구성원에게 AI 분야의 최신 Trend를 빠르게 제공하는
                  ‘구독형 채널’입니다. <br />
                  AI 관련 그룹 내외의 Conference와 최신 논문 등을 통해 소개되는
                  기술 동향을 학습할 수 있습니다.
                  <br /> 관심 채널 등록 시 개인 메일을 통해서도 새로운 컨텐츠
                  소식을 받아보실 수 있습니다.
                </li>
              </ul>
              <p className="p_link ai">
                각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
              </p>
            </div>
          </div>

          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table">
                <h3>AI 최신 기술</h3>
                <div className="ai_box">
                  <h4>
                    사내외 AI 전문가의 논문 설명을 통해 AI 최신 기술의 내용을
                    학습할 수 있는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9pa/cube/CUBE-c88/view/Video">
                        [꼼꼼한 논문 읽기] Batch Normalization (속도, 성능 개선)
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-8lx/cube/CUBE-b6t/view/Video">
                        [꼼꼼한 논문 읽기] TextFooler (자연어처리 공격기법)
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-85x/cube/CUBE-apm/view/Video">
                        [꼼꼼한 논문 읽기] ResNet (잔류학습, 이미지분류)
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-7nh/cube/CUBE-a7u/view/Video">
                        [꼼꼼한 논문 읽기] Shadow Attack (딥러닝 보안)
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-79b/cube/CUBE-9sd/view/Video">
                        [AI최신기술동향] DDSP Differentiable Digital Signal
                        Processing
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-78z/cube/CUBE-9rz/view/Video">
                        [AI최신기술동향] Adversarially Trained End-to-end Korean
                        <br />
                        Singing Voice Synthesis System
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-6cg/cube/CUBE-8w5/view/Video">
                        [AI최신기술동향] Mogrifier LSTM
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-69b/cube/CUBE-8t0/view/Video">
                        [AI최신기술동향] Revisiting the Sibling Head in Object
                        Detector
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>ai.x Conference</h3>
                <div className="ai_box">
                  <h4>
                    AI가 사회와 조화롭게 공존하는 기술 생태계를 도모하고자 매년
                    SK텔레콤에서 주관하는 AI conference 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-7tj/view">
                        [ai.x2020] 1.인간과 AI의 공존
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-7th/view">
                        [ai.x2020] 3. AI 최신 연구와 적용 사례
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-7ti/view">
                        [ai.x2020] 2.뉴노멀과 AI Tech
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-7tg/view">
                        [ai.x2020] 4. Secret Talk (연사 인터뷰)
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>ICT Tech summit</h3>
                <div className="ai_box">
                  <h4>
                    SK의 ICT 기술 활용 현황을 대내외에 공유하고 시너지를
                    제고하고자 2016년부터 매년 열리고 있는 SK의 대표적인 기술전
                    컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9ez/view">
                        [SK ICT Tech Summit] Industrial AI
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-9f2/view">
                        [SK ICT Tech Summit] AI 응용 기술 &#38; 솔루션
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9f0/view">
                        [SK ICT Tech Summit] AI 적용 Platform
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>AI Biz/Tech Conference</h3>
                <div className="ai_box">
                  <h4>
                    국내외에서 진행되는 AI 특화 컨퍼런스 내용의 핵심을
                    전달해주는 컨텐츠입니다.
                  </h4>
                  <ul className="float-left">
                    <li>
                      <Link to="/lecture/card/CARD-7e6/view">
                        [Conference] AI의 현재와 미래
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
      menuItem: 'AI Technologies',
      key: 'tab4',
      render: () => (
        <Tab.Pane attached={false}>
          <div className="belt">
            <div className="text-right-box">
              <Link
                to="/lecture/college/CLG00001/channel/CHN00003"
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
            <strong>AI Technologies</strong>
            <div>
              <ul>
                <li>
                  본 채널은 다양한 AI Tech를 소개해 주는 채널입니다. <br />
                  AI 개념부터, 수학 기초, Machine Learning과 Deep Learning의
                  기초를 학습하실 수 있습니다.
                </li>
              </ul>
              <p className="p_link ai">
                각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
              </p>
            </div>
          </div>

          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table">
                <h3>딥러닝</h3>
                <div className="ai_box">
                  <h4>
                    딥러닝의 기본적인 개념부터 수식, 코드 구현까지 신경망,
                    역전파, CNN 등 전반적인 딥러닝의 기본기를 다질 수 있는
                    컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9yw/view">
                        [딥러닝 기초] 1. 신경망, 경사하강, 역전파
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-9z2/view">
                        [딥러닝 기초] 3. 주요 적용 기법
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9yz/view">
                        [딥러닝 기초] 2. CNN, RNN
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-9z6/view">
                        [딥러닝] Vision, GAN, NLP, Reinforcement 등
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>Meta Learner</h3>
                <div className="ai_box">
                  <h4>
                    AI의 Meta-Learning 개념을 이해하고 SKT에서 개발한
                    Meta-Learner 시스템 사용 방법에 대해 학습할 수 있는
                    컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-16x/view">
                        AI Expert with Meta Learner 입문 (온라인)
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9d0/view">
                        Meta Learner 입문
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>
                  TensorFlow/Pytorch
                  <br />
                  프레임워크
                </h3>
                <div className="ai_box">
                  <h4>
                    딥러닝을 다루기 위한 프레임워크인 TensorFlow와 Pytorch의
                    기본 개념부터 구현 및 모델 설계까지 학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9xu/view">
                        Tensorflow 2.0 와 Pytorch 프레임워크 기초
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9yc/view">
                        이미지 분석으로 배우는 Tensorflow와 Pytorch
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>머신러닝</h3>
                <div className="ai_box">
                  <h4>
                    다양한 머신러닝 방법론의 개념을 이해하고 코딩 실습을 통해
                    핵심 주제들을 전반적으로 학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-16w/view">
                        머신러닝 이해와 실습 上
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-16v/view">
                        머신러닝 이해와 실습 下
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>AI 기초 개념 및 동작원리</h3>
                <div className="ai_box">
                  <h4>
                    기본적인 AI 이론과 실제 머신 러닝의 동작을 간단한 코딩
                    실습을 통해 이해해 볼 수 있는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-178/view">AI 101</Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-1bn/view">
                        인공지능/머신러닝 기초
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-1bl/view">
                        비전공자를 위한 머신러닝
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>AI 수학 기초</h3>
                <div className="ai_box">
                  <h4>
                    AI를 이해하기 위한 기초 선형 대수학을 이해하기 위한
                    컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-7pc/view">
                        [AI수학 #1] 선형대수 기초
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-7pd/view">
                        [AI수학 #2] 확률통계 기초
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
      menuItem: 'ML Engineer Track',
      key: 'tab5',
      render: () => {
        pageMove('/certification/badge/badge-detail/BADGE-3i');
        return <Tab.Pane attached={false} />;
      },
    },
  ];

  return (
    <Tab
      menu={{ attached: false, tabular: false }}
      panes={panes}
      className="sub-tab-menu ai"
      activeIndex={activeIndex}
      onTabChange={onTabChange}
    />
  );
};

export const CollegeInnerEnTabAi = () => {
  const history = useHistory();

  const [activeIndex, setActiveIndex] = useState(0);

  const queryParams = queryString.parse(window.location.search);
  const subTab = (queryParams.innerTab as string) || '';

  const onTabChange = (e: any, { activeIndex }: any) => {
    if (activeIndex === 1 || activeIndex === 5) {
      reactAlert({
        title: 'No permission',
        message:
          'This content is not ready for service yet. I will open it later after consulting with the person in charge of each company. ',
      });
    } else {
      setActiveIndex(activeIndex);
      history.push(
        routePaths.introductionCollegeAI(panes[activeIndex].menuItem)
      );
    }
  };

  const indexSetter = () => {
    const activeIndex =
      panes.findIndex((pane) => subTab.includes(pane.menuItem)) || 0;
    if (activeIndex > 0) {
      setActiveIndex(activeIndex);
    } else {
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    indexSetter();
  }, [queryParams]);

  const panes = [
    {
      menuItem: 'Introduction of AI Category',
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
              Just as AI has seamlessly found its place in our daily lives, the
              Deep Chance we SK strives to achieve calls for us to fuse AI into
              our businesses.
              <br />
              <br />
              &quot;AI Category provides learning experiences that are aligned
              with the AI-based Deep Change performance capability.
              <br />
              From acquiring various specialized AI skills technological
              manpower require in the business field to basic AI knowledge that
              all SK employees must know, this course helps all employees to
              have the ability to widely utilize AI in their daily tasks.&quot;
              <br />
              <br />
              By starting from the basic course that falls under literacy, you
              will be able to systematically take the specialty course that
              helps you grow in the role and job of your choice. In addition,
              you can also learn the core AI technologies such as machine
              learning and deep learning and various business cases that applied
              such technologies, granting you a more detailed picture of how AI
              will bring new opportunities.
            </div>
            <img
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-co-1-1_ENG.png"
              alt=""
              className="ui image"
            />
          </div>

          <div className="college-cont-map sub pbtom">
            <div className="belt">
              <div className="label sub">Full Curriculum</div>
              <div className="ai-top-btn">
                <span className="ai-btn01">Self-directive</span>
                <span className="ai-btn02">Intensive</span>
              </div>
              <div className="ai-background">
                <div className="ai-belt one">
                  <div className="ai-belt-box">
                    <div className="ai-intro">
                      <h3>AI Technologies</h3>
                      <ul>
                        <li>Deep Learning</li>
                        <li>Meta Learner</li>
                      </ul>
                    </div>
                    <div className="ai-intro sub">
                      <ul>
                        <li>TensorFlow/Pytorch Framework</li>
                        <li>Machine Learning</li>
                        <li>AI Basic Concept and How it Works</li>
                        <li>AI Mathematics Basic</li>
                      </ul>
                    </div>
                  </div>
                  <div className="ai-belt-box">
                    <div className="ai-intro">
                      <h3>AI Trend Watch</h3>
                      <ul className="ai-bottom">
                        <li>Latest AI Technology</li>
                      </ul>
                    </div>
                    <div className="ai-intro sub">
                      <ul>
                        <li>AI Biz/Tech Conference</li>
                        <li>ai.x Conference</li>
                        <li>ICT Tech Summit</li>
                      </ul>
                    </div>
                  </div>
                  <div className="ai-belt-box">
                    <div className="ai-intro">
                      <h3>AI Biz. Implementation</h3>
                      <ul className="ai-bottom">
                        <li>AI Biz Case Study</li>
                      </ul>
                    </div>
                    <div className="ai-intro sub">
                      <ul>
                        <li>SK AI-Applied Practice</li>
                        <li>AI To Biz Methodology</li>
                      </ul>
                    </div>
                  </div>
                  <div className="ai-belt-track">
                    <div className="bedge-box">
                      <span className="bedge">Badge</span>
                    </div>
                    <h3>ML Engineer Track</h3>
                    <p>(Intensive Course, 9 weeks)</p>
                    <ul>
                      <li>Tabular / NLP</li>
                      <li>Deep Learning</li>
                      <li>Computer Vision</li>
                      <li>ML Model and History</li>
                      <li>AI Mathematics</li>
                      <li>ML Basics</li>
                    </ul>
                  </div>
                </div>
                <div className="ai-belt width100">
                  <div className="ai-belt-box">
                    <div className="ai-intro">
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
      menuItem: 'AI Biz. Implementation',
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
              AI Biz.
              <br />
              Implementation
            </strong>
            <div>
              <ul>
                <li>
                  This channel offers learners multiple cases inside and outside
                  the company, wherein the usage of AI led to the change in
                  dealing with customers, in their business, and the operations
                  processes. This will also provide the opportunity to apply AI
                  in real works.
                </li>
              </ul>
              <p className="p_link ai">
                {/* Click each badge and course to go to the corresponding page. */}
              </p>
            </div>
          </div>

          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table">
                <h3>AI Biz Case Study</h3>
                <div className="ai_box">
                  <h4>
                    This content shares the international and domestic cases of
                    using the AI per industry and function and the lessons
                    learned in the application process.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">AI Biz Case : Environment</a>
                    </li>
                    <li>
                      <a href="#none">AI Biz Case : Energy/ Chemical</a>
                    </li>
                    <li>
                      <a href="#none">AI Biz Case : Bio/ Health</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">AI Biz Case : Marketing</a>
                    </li>
                    <li>
                      <a href="#none">AI Biz Case : Factory/ Process</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>SK AI Practice</h3>
                <div className="ai_box">
                  <h4>
                    This content shares the various cases and experiences in
                    using AI inside the group.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        SK Telecom’s Case of Applying AI and Lessons Learned
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        SK Subsidiaries Introducing Industrial AI and Lessons
                        Learned
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [AI Business Insight] <br />
                        Cases on Using RPA to Increase Work Efficiency in SK
                        Telecom
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [AI Business Insight] <br />
                        Film Detect Automatic Type Classification that used Deep
                        Learning
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        The Pain Points SK Subsidiaries Underwent in Introducing
                        and Applying AI and the Cooperative Measure on a
                        Group-level
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [AI Business Insight] Automation of Sales QA Using Deep
                        Learning
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [AI Business Insight] AI on the Table, AI Assistant and
                        RDA
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>AI To Biz Methodology</h3>
                <div className="ai_box">
                  <h4>
                    This content provides methods to introduce AI in the work
                    field and processes, checklists, etc.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        The Road to AI – AI Business Application Process
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        AI Service Planning Development (Beginner/ Planning/
                        Basic)
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        Trends in and Measures to Industrial AI Solutions
                        Introduction
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
      menuItem: 'AI Trend Watch',
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
            <strong>AI Trend Watch</strong>
            <div>
              <ul>
                <li>
                  This channel provides subscribers the latest trends in the
                  field of AI in a flash.
                  <br />
                  It offers a glance at the trends in technology that have
                  appeared in international and domestic conferences and
                  journals.
                  <br />
                  You can also receive new content and news directly to your
                  email if you mark it as your channel of interest.
                </li>
              </ul>
              <p className="p_link ai">
                {/* Click each badge and course to go to the corresponding page. */}
              </p>
            </div>
          </div>

          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table">
                <h3>Latest AI Technology</h3>
                <div className="ai_box">
                  <h4>
                    This content allows learners to learn about the latest AI
                    technologies through the journals and studies of AI
                    professionals inside and outside the company.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        [Close Reading Thesis] Batch Normalization (Speed,
                        Performance Improvement)
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [Close Reading Thesis] TextFooler (Adversarial Attack on
                        Natural Language Processing)
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [Close Reading Thesis] ResNet (Residual Learning, Image
                        Classification)
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [Close Reading Thesis] Shadow Attack (Deep Learning
                        Security)
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        [AI Latest Technology Trend] DDSP Differentiable Digital
                        Signal Processing
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [Recent Trends of AI Technology] Adversarially Trained
                        End-to-end Korean Singing Voice Synthesis System
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [AI Latest Technology Trend] Mogrifier LSTM
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [AI Latest Technology Trend] Revisiting the Sibling Head
                        in Object Detector
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>ai.x Conference</h3>
                <div className="ai_box">
                  <h4>
                    This is an AI conference content, which SK Telecom annually
                    hosts, to promote a harmonious technology ecosystem wherein
                    the AI can coexist with society.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        [ai.x2020] 1. Co-existence between humans and AI
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [ai.x2020] 3. Recent Study and Application Case of AI
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">[ai.x2020] 2. New Normal and AI Tech</a>
                    </li>
                    <li>
                      <a href="#none">
                        [ai.x2020] 4. Secret Talk (Interview with the Lecturers)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>ICT Tech summit</h3>
                <div className="ai_box">
                  <h4>
                    This technology exhibition has been held since 2016 to share
                    SK’s use of ICT technology inside and outside the company
                    and increase the synergy. It&apos;s one of the leading
                    contents of SK.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">[SK ICT Tech Summit] Industrial AI</a>
                    </li>
                    <li>
                      <a href="#none">
                        [SK ICT Tech Summit] AI Application Technology &amp;
                        Solution
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        [SK ICT Tech Summit] AI Application Platform
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>AI Biz/Tech Conference</h3>
                <div className="ai_box">
                  <h4>
                    This content delivers the core points discussed at AI
                    conferences held both inside and outside the country.
                  </h4>
                  <ul className="float-left">
                    <li>
                      <a href="#none">[Conference] Present and Future of AI</a>
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
      menuItem: 'AI Technologies',
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
          {/* 컬리지 텍스트 */}
          <div className="college-sub-txt">
            <strong>AI Technologies</strong>
            <div>
              <ul>
                <li>
                  This channel provides various AI technologies.
                  <br />
                  You can learn from the basic concept of AI to basic math,
                  machine learning, and deep learning.
                </li>
              </ul>
              <p className="p_link ai">
                {/* Click each badge and course to go to the corresponding page. */}
              </p>
            </div>
          </div>

          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table">
                <h3>Deep Learning</h3>
                <div className="ai_box">
                  <h4>
                    This content teaches you the basics of deep learning, from
                    the basic concept to implementing the codes. Moreover, it
                    deals with the neural network, back-propagation, CNN, etc.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        [Deep Learning Basics] 1. Neural Network, Gradient
                        Descent, Backpropagation
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [Deep Learning Basics] 3. Main Application Technique
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">[Deep Learning Basics] 2. CNN, RNN</a>
                    </li>
                    <li>
                      <a href="#none">
                        [Deep Learning] Vision, GAN, NLP, Reinforcement, etc.
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>Meta Learner</h3>
                <div className="ai_box">
                  <h4>
                    This content equips you with the concept of AI’s
                    Meta-Learning and teaches you how to use the Meta-Learner
                    system developed by SKT.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        AI Expert with Meta Learner Introduction (Online)
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">Meta Learner Introduction</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>TensorFlow/Pytorch Framework</h3>
                <div className="ai_box">
                  <h4>
                    This content teaches you from the basic concept of Pytorch
                    to build up the model and TensorFlow, which is the framework
                    for dealing with deep learning.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        Tensorflow 2.0 and Pytorch Framework Beginner{' '}
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        Learning about Tensorflow and Pytorch through image
                        analysis.
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>Machine Learning</h3>
                <div className="ai_box">
                  <h4>
                    This content teaches you the concepts of various machine
                    learning methodologies and provides you with practical
                    coding lessons to equip you with core subjects.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        Understanding and Practical Lesson on Machine Learning
                        (Part 1){' '}
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        Understanding and Practical Lesson on Machine Learning
                        (Part 2){' '}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>
                  AI Basic Concept and <br />
                  How it Works
                </h3>
                <div className="ai_box">
                  <h4>
                    This content teaches you basic AI theories and provides you
                    with practical lessons on basic coding to understand machine
                    learning.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">AI 101</a>
                    </li>
                    <li>
                      <a href="#none">
                        Artificial Intelligence/ Machine Learning Basics
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        Artificial Intelligence/ Machine Learning Basics
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>AI Mathematics Basic</h3>
                <div className="ai_box">
                  <h4>
                    This content is intended to understand basic linear algebra,
                    which is essential in understanding AI.
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">[AI Math #1] Linear Algebra Basic </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        [AI Math #2] Probability and Statistics Basic{' '}
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
      menuItem: 'ML Engineer Track',
      key: 'tab5',
      render: () => {
        return <Tab.Pane attached={false} />;
      },
    },
  ];

  return (
    <Tab
      menu={{ attached: false, tabular: false }}
      panes={panes}
      className="sub-tab-menu ai"
      activeIndex={activeIndex}
      onTabChange={onTabChange}
    />
  );
};

export const CollegeInnerZhTabAi = () => {
  const history = useHistory();

  const [activeIndex, setActiveIndex] = useState(0);

  const queryParams = queryString.parse(window.location.search);
  const subTab = (queryParams.innerTab as string) || '';

  const onTabChange = (e: any, { activeIndex }: any) => {
    if (activeIndex === 1 || activeIndex === 5) {
      reactAlert({
        title: '没有权限',
        message: '本版内容还没有准备好服务。 与各公司负责人协商后，秋后开放。',
      });
    } else {
      setActiveIndex(activeIndex);
      history.push(
        routePaths.introductionCollegeAI(panes[activeIndex].menuItem)
      );
    }
  };

  const indexSetter = () => {
    const activeIndex =
      panes.findIndex((pane) => subTab.includes(pane.menuItem)) || 0;
    if (activeIndex > 0) {
      setActiveIndex(activeIndex);
    } else {
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    indexSetter();
  }, [queryParams]);
  const panes = [
    {
      menuItem: 'AI Category介绍',
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
              现在AI已经深入到我们的日常生活中，SK追求的Deep
              Change也需要在所有商业领域融合AI。
              <span className="mg10" />
              &quot;AI Category培养以AI为基础的Deep
              Change执行能力，提供Align的学习经验。
              <br />
              不仅帮助现场技术人力学习到需要具备的各种专业AI技术，还提供SK成员都需要知道的AI基础知识，让成员能广泛将AI应用到日常工作中。&quot;
              <span className="mg10" />
              系统提供从相当于Literacy的基本课程开始，到符合个人成长目标的Role与职务的Specialty课程。学习机器学习、深度学习等AI核心技术，通过应用这些技术的各种商业案例，具体想象AI可能带来的新机会。
            </div>
            <img
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/img-co-1-1_CHN.png"
              alt=""
              className="ui image"
            />
          </div>

          <div className="college-cont-map sub pbtom">
            <div className="belt">
              <div className="label sub">全部课程</div>
              <div className="ai-top-btn">
                <span className="ai-btn01">Self-directive</span>
                <span className="ai-btn02">Intensive</span>
              </div>
              <div className="ai-background">
                <div className="ai-belt one">
                  <div className="ai-belt-box">
                    <div className="ai-intro">
                      <h3>AI Technologies</h3>
                      <ul>
                        <li>深度学习</li>
                        <li>Meta Learner</li>
                      </ul>
                    </div>
                    <div className="ai-intro sub">
                      <ul>
                        <li>TensorFlow/Pytorch框架</li>
                        <li>机器学习</li>
                        <li>AI 基础概念及运作原理</li>
                        <li>AI 数学基础</li>
                      </ul>
                    </div>
                  </div>
                  <div className="ai-belt-box">
                    <div className="ai-intro">
                      <h3>AI Trend Watch</h3>
                      <ul className="ai-bottom">
                        <li>AI 最新技术</li>
                      </ul>
                    </div>
                    <div className="ai-intro sub">
                      <ul>
                        <li>AI Biz/Tech Conference</li>
                        <li>ai.x Conference</li>
                        <li>ICT Tech Summit</li>
                      </ul>
                    </div>
                  </div>
                  <div className="ai-belt-box">
                    <div className="ai-intro">
                      <h3>AI Biz. Implementation</h3>
                      <ul className="ai-bottom">
                        <li>AI Biz Case Study</li>
                      </ul>
                    </div>
                    <div className="ai-intro sub">
                      <ul>
                        <li>SK AI应用Practice</li>
                        <li>AI To Biz Methodology</li>
                      </ul>
                    </div>
                  </div>
                  <div className="ai-belt-track">
                    <div className="bedge-box">
                      <span className="bedge">Badge</span>
                    </div>
                    <h3>ML Engineer Track</h3>
                    <p>(Intensive Course, 9周)</p>
                    <ul>
                      <li>Tabular / NLP</li>
                      <li>Deep Learning</li>
                      <li>Computer Vision</li>
                      <li>ML Model及 History</li>
                      <li>AI 数学</li>
                      <li>ML 基础</li>
                    </ul>
                  </div>
                </div>
                <div className="ai-belt width100">
                  <div className="ai-belt-box">
                    <div className="ai-intro">
                      <div className="bedge-box">
                        <span className="bedge">Badge</span>
                      </div>
                      <h3>AI/DT Literacy</h3>
                      <ul>
                        <li>Customer Empathy</li>
                        <li>Data-Centric Approach</li>
                        <li>理解ICT Techs</li>
                        <li>Biz Insight</li>
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
      menuItem: 'AI/DT Literacy',
      key: 'tab1',
      render: () => {
        return <Tab.Pane attached={false} />;
      },
    },
    {
      menuItem: 'AI Biz. Implementation',
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
              AI Biz.
              <br />
              Implementation
            </strong>
            <div>
              <ul>
                <li>
                  在本频道中可以学习应用AI改变客户体验、Business、运营流程变化的各种集团内外AI应用案例，思考在现场应用AI的案例。
                </li>
              </ul>
              <p className="p_link ai">
                {/* 点击各Badge与课程，即可进入到相应页面。 */}
              </p>
            </div>
          </div>

          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table">
                <h3>AI Biz Case Study</h3>
                <div className="ai_box">
                  <h4>
                    分享各行业/功能的国内外AI应用案例课程Lesson Learned的内容。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">AI Biz Case : 环境</a>
                    </li>
                    <li>
                      <a href="#none">AI Biz Case : 能源/化学</a>
                    </li>
                    <li>
                      <a href="#none">AI Biz Case : 生物/健康</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">AI Biz Case : 营销</a>
                    </li>
                    <li>
                      <a href="#none">AI Biz Case : 生产/工艺</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>SK AI Practice</h3>
                <div className="ai_box">
                  <h4>该内容分享了集团内各种AI的应用案例。</h4>
                  <ul>
                    <li>
                      <a href="#none">SK电讯的AI应用案例及Lessons Learned</a>
                    </li>
                    <li>
                      <a href="#none">
                        SK相关公司的Industrial AI引进案例及Lessons Learned
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [AI Biz Insight] 应用rpa，提升SK电讯工作效率的案例
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [AI Biz Insight] 应用深度学习的Film Defect自动类型分类
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        SK相关公司AI引进/引用痛点与集团层面的合作方案
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [AI Biz Insight] 应用深度学习的Sales QA自动化
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [AI Biz Insight] 办公桌上的AI、AI Assistant与RDA
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>AI To Biz Methodology</h3>
                <div className="ai_box">
                  <h4>为将AI引进现场的方法论、流程及Checklist等。</h4>
                  <ul>
                    <li>
                      <a href="#none">The Road to AI – AI Biz 应用流程</a>
                    </li>
                    <li>
                      <a href="#none">AI服务策划开发（入门/策划/基础）</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">Industrail AI解决方案动向和引进方案</a>
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
      menuItem: 'AI Trend Watch',
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
            <strong>AI Trend Watch</strong>
            <div>
              <ul>
                <li>
                  本频道为“订阅型频道”，为成员提供AI领域最新趋势快讯。
                  <br />
                  通过集团内外有关AI的会议、最新论文等，学习技术动向。
                  <br />
                  订阅感兴趣的频道，还可通过邮件获取最新内容消息。
                </li>
              </ul>
              <p className="p_link ai">
                {/* 点击各Badge与课程，即可进入到相应页面。 */}
              </p>
            </div>
          </div>

          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table">
                <h3>AI最新技术</h3>
                <div className="ai_box">
                  <h4>通过了解公司内外AI专家论文，学习AI最新技术内容。</h4>
                  <ul>
                    <li>
                      <a href="#none">
                        [仔细读论文]Bath Normalization（速度、性能改善）
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [仔细读论文]TextFooler（自然语言处理攻击技法）
                      </a>
                    </li>
                    <li>
                      <a href="#none">[仔细读论文]ResNet（残差学习，图像分类</a>
                    </li>
                    <li>
                      <a href="#none">
                        [仔细读论文]Shadow Attack（深度学习安保
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">
                        [AI最新技术动向]DDSP Differentiable Digital Signal
                        Processing
                      </a>
                    </li>
                    <li>
                      <a href="#none">
                        [AI最新技术动向]Adversarially Trained End-to-end
                        KoreanSinging Voice Synthesis System
                      </a>
                    </li>
                    <li>
                      <a href="#none">[AI最新技术动向]Mogrifier LSTM</a>
                    </li>
                    <li>
                      <a href="#none">
                        [AI最新技术动向]Revisiting the Sibling Head in Object
                        Detector
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>ai.x Conference</h3>
                <div className="ai_box">
                  <h4>
                    为追求AI与社会和谐共存的技术生态系统，每年由SK电讯主办的AI
                    Conference内容。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">[ai.X2020]1.人类与AI共存</a>
                    </li>
                    <li>
                      <a href="#none">[ai.x2020] 3.AI最新研究与应用案例</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">[Ai.x2020] 2. 新常态与AI Tech</a>
                    </li>
                    <li>
                      <a href="#none">[ai.x2020] 4.Secret Talk（演讲者采访）</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>ICT Tech summit</h3>
                <div className="ai_box">
                  <h4>
                    为对内外共享SK的ICT技术应用现状，增大增效效果，从2016年开始每年举办的SK具代表性的技术展内容。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">[SK ICT Tech Summit] Industrial AI</a>
                    </li>
                    <li>
                      <a href="#none">
                        [SK ICT Tech Summit] AI应用技术&amp;解决方案
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">[SK ICT Tech Summit] AI应用Platform</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>AI Biz/Tech Conference</h3>
                <div className="ai_box">
                  <h4>汇聚在国内外举办的AI专门会议核心内容。</h4>
                  <ul className="float-left">
                    <li>
                      <a href="#none">[Conference] AI的现在与未来</a>
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
      menuItem: 'AI Technologies',
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
          {/* 컬리지 텍스트 */}
          <div className="college-sub-txt">
            <strong>AI Technologies</strong>
            <div>
              <ul>
                <li>
                  本频道是介绍各类AI Tech的频道。
                  <br />
                  可以学习从AI概念到数学基础，机器学习、深度学习基础内容。
                </li>
              </ul>
              <p className="p_link ai">
                {/* 点击各Badge与课程，即可进入到相应页面。 */}
              </p>
            </div>
          </div>

          <div className="college-link-box">
            <div className="belt">
              <div className="ai_sub_table">
                <h3>深度学习</h3>
                <div className="ai_box">
                  <h4>
                    包含从深度学习的基本概念到使用公式、代码，以及神经网络、逆传播、CNN等整体深度学习基础学习。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        [深度学习基础] 1.神经网络、梯度下降、逆传播
                      </a>
                    </li>
                    <li>
                      <a href="#none">[深度学习基础] 3.主要应用技法</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">[深度学习基础] 2.CNN、RNN</a>
                    </li>
                    <li>
                      <a href="#none">
                        [深度学习]Vision、GAN、NLP、Reinforcement等
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>Meta Learner</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可理解AI的Meta-Learning概念，学习SKT开发的Meta-Learner系统使用方法。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">
                        AI Expert with Meta Learner入门（在线）
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">Meta Learner入门</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>
                  TensorFlow/Pytorch
                  <br />
                  TensorFlow/Pytorch框架
                </h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可学习深度学习基础框架TensorFlow和Pytorch的基本概念、构建方法、模型设计等。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">Tensorflow 2.0和Pytorch框架基础</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">通过图像分析学习Tensorflow和Pytorch</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>机器学习</h3>
                <div className="ai_box">
                  <h4>
                    通过本内容可理解各种机器学习方法论的概念，通过代码练习，从整体学习核心主题。
                  </h4>
                  <ul>
                    <li>
                      <a href="#none">理解机器学习与实操 上</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">理解机器学习与实操 下</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>AI基础概念及运作原理</h3>
                <div className="ai_box">
                  <h4>通过AI基础理论，还有简单的机器学习编码实操加深理解。</h4>
                  <ul>
                    <li>
                      <a href="#none">AI 101</a>
                    </li>
                    <li>
                      <a href="#none">人工智能/机器学习基础 </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">适合非专业学习者的机器学习课程</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>AI数学基础</h3>
                <div className="ai_box">
                  <h4>通过本内容可学习基础线性代数，以加深对AI的理解。</h4>
                  <ul>
                    <li>
                      <a href="#none">[Ai数学 #1]线性代数基础</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#none">[Ai数学 #2]概率统计基础</a>
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
      menuItem: 'ML Engineer Track',
      key: 'tab5',
      render: () => {
        return <Tab.Pane attached={false} />;
      },
    },
  ];

  return (
    <Tab
      menu={{ attached: false, tabular: false }}
      panes={panes}
      className="sub-tab-menu ai"
      activeIndex={activeIndex}
      onTabChange={onTabChange}
    />
  );
};
export default withRouter(CollegeInnerTabAi);
