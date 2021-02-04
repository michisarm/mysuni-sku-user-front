import React from 'react';
import { Image, Menu, Label, Tab } from 'semantic-ui-react';

const PUBLIC_URL = process.env.PUBLIC_URL;

const panes = [
  {
    menuItem: 'AI College 소개',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00001/channels/pages/1"
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
          <div className="ai-con-text">
            이제 AI는 우리가 인지하지 못할 정도로 Seamless하게 일상 속에
            자리잡고 있듯이, 우리 SK가 추구하는 Deep Change 또한 모든 비즈니스
            영역에서 AI가 접목된 변화를 필요로 하고 있습니다. <br />
            <br />
            AI College에서는 이러한 AI 기반의 Deep Change 실행 역량과 Align된
            Learning Experience를 제공하고 있습니다.<br /> 비즈니스 현장의 기술
            인력들에게 요구되는 다양한 전문 AI 기술 습득은 물론, SK 구성원이라면
            누구나 알아야 할 기본적인 AI 지식에 이르기까지 <br />일상의 업무에 폭넓게
            AI를 활용할 수 있는 역량을 갖출 수 있도록 지원하고 있습니다. <br />
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
            <Image src={`${PUBLIC_URL}/images/all/ai-con01-2.png`} alt="" />
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
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00001/channel/CHN00003"
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
          <strong>AI Technologies</strong>
          <div>
            <ul>
              <li>
                본 채널은 다양한 AI Tech를 소개해 주는 채널입니다. <br />
                AI 개념부터, 수학 기초, Machine Learning과 Deep Learning의
                기초를 학습하실 수 있습니다.
              </li>
            </ul>
            <p className="p_link hidden">
              각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image src={`${PUBLIC_URL}/images/all/ai-con02-1.png`} alt="" />
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
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00001/channel/CHN0006i"
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
          <strong>AI Trend Watch</strong>
          <div>
            <ul>
              <li>
                본 채널은 구성원에게 AI 분야의 최신 Trend를 빠르게 제공하는
                ‘구독형 채널’입니다. <br />
                AI 관련 그룹 내외의 Conference와 최신 논문 등을 통해 소개되는
                기술 동향을 학습할 수 있습니다.<br /> 관심 채널 등록 시 개인 
                메일을 통해서도 새로운 컨텐츠 소식을 받아보실 수 있습니다.
              </li>
            </ul>
            <p className="p_link hidden">
              각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
            <Image src={`${PUBLIC_URL}/images/all/ai-con03-1.png`} alt="" />
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'AI Biz. Implementation',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00001/channel/CHN00002"
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
            <p className="p_link hidden">
              각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
          <Image src={`${PUBLIC_URL}/images/all/ai-con04-1.png`} alt="" />
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'AI/DT Literacy',
    render: () => (
      window.location.href = "https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-2t",
      <Tab.Pane attached={false} />
    ),
  },
  {
    menuItem: 'ML Engineer Track',
    render: () => (
      window.location.href = "https://mysuni.sk.com/suni-main/certification/badge/badge-detail/BADGE-3i",
      <Tab.Pane attached={false} />
    ),
  },
];

const CollegeInnerTabAi = () => (
  <Tab
    menu={{ attached: false, tabular: false }}
    panes={panes}
    className="sub-tab-menu ai"
  />
);

export default CollegeInnerTabAi;
