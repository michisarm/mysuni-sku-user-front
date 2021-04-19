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

const CollegeInnerTabAi = () => {

  const history = useHistory();

  const pageMove = (path: string) => {
    history.push(path);
  }

  const panes = [
    {
      menuItem: 'AI College 소개',
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
              AI College에서는 이러한 AI 기반의 Deep Change 실행 역량과 Align된
              Learning Experience를 제공하고 있습니다.
              <br /> 비즈니스 현장의 기술 인력들에게 요구되는 다양한 전문 AI 기술
              습득은 물론, SK 구성원이라면 누구나 알아야 할 기본적인 AI 지식에
              이르기까지 <br />
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
      render: () => {
        pageMove('/certification/badge/badge-detail/BADGE-2t');
        return (<Tab.Pane attached={false} />)
      },
    },
    {
      menuItem: 'AI Biz. Implementation',
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
                  변화를 가져온 다양한 그룹 내/외의 AI 활용사례를 배우고, 현장에서
                  AI를 적용하는 방안을 고민해 볼 수 있는 채널입니다.
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
                      <Link to="/lecture/card/CARD-7dq/view">AI Biz Case : 환경</Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-79m/view">AI Biz Case : 에너지/화학</Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-6xe/view">AI Biz Case : 바이오/헬스</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-7b3/view">AI Biz Case : 마케팅</Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-6y1/view">AI Biz Case : 생산/공정</Link>
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
                        [AI Biz Insight] RPA를 활용한 SK텔레콤의 업무 효율화 사례
                      </Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-aaw/cube/CUBE-10n/view/Video">
                        [AI Biz Insight] 딥러닝을 활용한 Film Defect 자동유형분류
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-83k/view">
                        SK 관계사의 AI도입/적용 Pain Points와 그룹차원의 협력방안
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
                      <Link to="/lecture/card/CARD-aat/view">The Road to AI – AI Biz 적용 프로세스</Link>
                    </li>
                    <li>
                      <Link to="/search?query=AI%EC%84%9C%EB%B9%84%EC%8A%A4%20%EA%B8%B0%ED%9A%8D/%EA%B0%9C%EB%B0%9C%20%EA%B8%B0%EC%B4%88">AI서비스 기획 개발 (입문/기획/기초)</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-57d/view">Industrial AI솔루션 동향과 도입 방안</Link>
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
                      <Link to="/lecture/card/CARD-6cg/cube/CUBE-8w5/view/Video">[AI최신기술동향] Mogrifier LSTM</Link>
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
                      <Link to="/lecture/card/CARD-7tj/view">[ai.x2020] 1.인간과 AI의 공존</Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-7th/view">[ai.x2020] 3. AI 최신 연구와 적용 사례</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-7ti/view">[ai.x2020] 2.뉴노멀과 AI Tech</Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-7tg/view">[ai.x2020] 4. Secret Talk (연사 인터뷰)</Link>
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
                      <Link to="/lecture/card/CARD-9ez/view">[SK ICT Tech Summit] Industrial AI</Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-9f2/view">[SK ICT Tech Summit] AI 응용 기술 &#38; 솔루션</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/cineroom/ne1-m2-c2/college/CLG00001/course-plan/COURSE-PLAN-19q/Course/C-LECTURE-140">[SK ICT Tech Summit] AI 적용 Platform</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>AI Biz/Tech Conference</h3>
                <div className="ai_box">
                  <h4>
                    국내외에서 진행되는 AI 특화 컨퍼런스 내용의 핵심을 전달해주는
                    컨텐츠입니다.
                  </h4>
                  <ul className="float-left">
                    <li>
                      <Link to="/lecture/card/CARD-9f0/view">[Conference] AI의 현재와 미래</Link>
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
                  src={`${PUBLIC_URL}/images/all/icon-course-book.png`}
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
                    딥러닝의 기본적인 개념부터 수식, 코드 구현까지 신경망, 역전파,
                    CNN 등 전반적인 딥러닝의 기본기를 다질 수 있는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9yw/view">[딥러닝 기초] 1. 신경망, 경사하강, 역전파</Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-9z2/view">[딥러닝 기초] 3. 주요 적용 기법</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9yz/view">[딥러닝 기초] 2. CNN, RNN</Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-9z6/view">[딥러닝] Vision, GAN, NLP, Reinforcement 등</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>Meta Learner</h3>
                <div className="ai_box">
                  <h4>
                    AI의 Meta-Learning 개념을 이해하고 SKT에서 개발한 Meta-Learner
                    시스템 사용 방법에 대해 학습할 수 있는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-16x/view">AI Expert with Meta Learner 입문 (온라인)</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9d0/view">Meta Learner 입문</Link>
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
                    딥러닝을 다루기 위한 프레임워크인 TensorFlow와 Pytorch의 기본
                    개념부터 구현 및 모델 설계까지 학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9xu/view">Tensorflow 2.0 와 Pytorch 프레임워크 기초</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-9yc/view">이미지 분석으로 배우는 Tensorflow와 Pytorch</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>머신러닝</h3>
                <div className="ai_box">
                  <h4>
                    다양한 머신러닝 방법론의 개념을 이해하고 코딩 실습을 통해 핵심
                    주제들을 전반적으로 학습하는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-16w/view">머신러닝 이해와 실습 上</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-16v/view">머신러닝 이해와 실습 下</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ai_sub_table">
                <h3>AI 기초 개념 및 동작원리</h3>
                <div className="ai_box">
                  <h4>
                    기본적인 AI 이론과 실제 머신 러닝의 동작을 간단한 코딩 실습을
                    통해 이해해 볼 수 있는 컨텐츠입니다.
                  </h4>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-178/view">AI 101</Link>
                    </li>
                    <li>
                      <Link to="/lecture/card/CARD-1bn/view">인공지능/머신러닝 기초</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-1bl/view">비전공자를 위한 머신러닝</Link>
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
                      <Link to="/lecture/card/CARD-7pc/view">[AI수학 #1] 선형대수 기초</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/lecture/card/CARD-7pd/view">[AI수학 #2] 확률통계 기초</Link>
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
      render: () => {
        pageMove('/certification/badge/badge-detail/BADGE-3i');
        return (<Tab.Pane attached={false} />)
      },
    },
  ];

  return (
    <Tab
      menu={{ attached: false, tabular: false }}
      panes={panes}
      className="sub-tab-menu ai"
    />
  );
}

export default CollegeInnerTabAi;
