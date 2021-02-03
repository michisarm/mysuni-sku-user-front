import React from 'react';
import { Image, Menu, Label, Tab } from 'semantic-ui-react';

const PUBLIC_URL = process.env.PUBLIC_URL;

const panes = [
  {
    menuItem: 'DT College 소개',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN0007m"
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
            Digital Transformation이란 고객에서 출발하여 Digital 기술을 활용,
            기존의 운영 프로세스와 Business Model, 나아가서는 문화/일하는
            방식까지도 바꾸는 포괄적 활동이며, 우리 SK가 추구하는 Deep Change
            실행의 핵심 요소로 자리매김하고 있습니다. <br /> <br />
            DT College에서는 이러한 DT 추진의 근간이라 할 수 있는 Data/Cloud를
            중심으로 한 Digital 요소 기술을 학습할 수 있는 기회를 제공함은 물론,
            새로운 고객 경험의 창출, BM/운영 프로세스의 혁신 및 일하는 방식의
            변화를 이루어낸 다양한 국내외 Business Case들을 폭넓게 학습할 수
            있습니다. 아울러 주요 Digital 기술에 대해서는 시장에서 인정받는
            Certificate 취득을 지원할 수 있는 상시적인 프로그램들이 활발하게
            제공되고 있습니다.
          </div>
          <Image src={`${PUBLIC_URL}/images/all/dt-con01-1.png`} alt="" />
        </div>

        <div className="college-cont-map sub pbtom">
          <div className="belt">
            <div className="label sub">전체 커리큘럼</div>
            <Image src={`${PUBLIC_URL}/images/all/dt-con01-2.png`} alt="" />
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
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN0007m"
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
            Data Analyst <br />
            Track
          </strong>
          <div>
            <ul>
              <li>
                본 채널은 Data Analyst로 성장하는데 필요한 기초 Programming,
                통계/분석 지식과 전문적 분석 기술을 종합적으로 학습할 수 있는
                채널입니다.
              </li>
            </ul>
            <p className="p_link hidden">
              각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
          <Image src={`${PUBLIC_URL}/images/all/dt-con02-1.png`} alt="" />
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
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN0007m"
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
            Data Analyst <br />
            Track
          </strong>
          <div>
            <ul>
              <li>
                본 채널은 Data Analyst로 성장하는데 필요한 기초 Programming,
                통계/분석 지식과 전문적 분석 기술을 종합적으로 학습할 수 있는
                채널입니다.
              </li>
            </ul>
            <p className="p_link hidden">
              각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
          <Image src={`${PUBLIC_URL}/images/all/dt-con03-1.png`} alt="" />
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
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN0007m"
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
                변화를 가져온 다양한 그룹 내/외의 AI 활용사례를 배우고, <br />
                현장에서 AI를 적용하는 방안을 고민해 볼 수 있는 채널입니다.
              </li>
            </ul>
            <p className="p_link">
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
    menuItem: 'DT Technologies',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN0007m"
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
                변화를 가져온 다양한 그룹 내/외의 AI 활용사례를 배우고, <br />
                현장에서 AI를 적용하는 방안을 고민해 볼 수 있는 채널입니다.
              </li>
            </ul>
            <p className="p_link">
              각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
          <Image src={`${PUBLIC_URL}/images/all/ai-con05-1.png`} alt="" />
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'DT Biz. & Implementation',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN0007m"
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
                변화를 가져온 다양한 그룹 내/외의 AI 활용사례를 배우고, <br />
                현장에서 AI를 적용하는 방안을 고민해 볼 수 있는 채널입니다.
              </li>
            </ul>
            <p className="p_link">
              각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
          <Image src={`${PUBLIC_URL}/images/all/ai-con06-1.png`} alt="" />
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'CDS Track',
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN0007m"
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
                변화를 가져온 다양한 그룹 내/외의 AI 활용사례를 배우고, <br />
                현장에서 AI를 적용하는 방안을 고민해 볼 수 있는 채널입니다.
              </li>
            </ul>
            <p className="p_link">
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
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a
              href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN0007m"
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
                변화를 가져온 다양한 그룹 내/외의 AI 활용사례를 배우고, <br />
                현장에서 AI를 적용하는 방안을 고민해 볼 수 있는 채널입니다.
              </li>
            </ul>
            <p className="p_link">
              각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
            </p>
          </div>
        </div>

        <div className="college-link-box">
          <div className="belt">
          <Image src={`${PUBLIC_URL}/images/all/dt-con06-1.png`} alt="" />
          </div>
        </div>
      </Tab.Pane>
    ),
  },
];

const CollegeInnerTabDt = () => (
  <Tab
    menu={{ attached: false, tabular: false }}
    panes={panes}
    className="sub-tab-menu dt"
  />
);

export default CollegeInnerTabDt;
