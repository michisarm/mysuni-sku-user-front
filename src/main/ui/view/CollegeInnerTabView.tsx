import React from "react";
import { Image, Menu, Label, Tab } from "semantic-ui-react";

const PUBLIC_URL = process.env.PUBLIC_URL;

const panes = [
  {
    menuItem: "Management College 소개",
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channels/pages/1" className="item-button">
              <Image style={{display:'inline'}} src={`${PUBLIC_URL}/images/all/icon-course-book.png`} alt="" />
              과정 바로가기
            </a>
          </div>
        </div>
        <div className="belt">
          <Image src={`${PUBLIC_URL}/images/all/con-01.png`} alt="" />
        </div>
        <div className="belt college-mana-text">
          <p>
            <strong>개인의 직무와 수준, 관심사를 고려</strong>하여 스스로 필요한
            Online Contents의 자기주도적 학습, On-Off 통합 또는 Offline W/S을
            통해 <br />
            Discussion, 내/외부 Case Study, Practice 공유 등{" "}
            <strong>실행 지향적 학습방식</strong>을 적용합니다. <br />
            특히, 외부의 Top Expert 뿐 아니라 SK 리더/전문가의 Insight와 경험을
            공유하는 SK Exclusive Contents를 제공할 계획입니다.
          </p>
        </div>
        <div className="college-cont-map sub wrap01">
          <div className="belt">
            {/* <div className="label sub">Management College 체계도</div> */}
            <Image src={`${PUBLIC_URL}/images/all/main_01.jpg`} alt="" />
          </div>
        </div>
        <div className="college-cont-map sub">
          <div className="belt">
            <Image src={`${PUBLIC_URL}/images/all/main_02.jpg`} alt="" style={{paddingBottom: '8rem'}}/>
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: "기업 경영/전략",
    render: () => (
      <Tab.Pane attached={false}>
        <div className="belt">
          <div className="text-right-box">
            <a href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN00014" className="item-button">
              <Image style={{display:'inline'}} src={`${PUBLIC_URL}/images/all/icon-course-book.png`} alt="" />
              과정 바로가기
            </a>
          </div>
        </div>
        <div className="college-sub-txt">
          <strong>기업 경영/전략</strong>
          <div>
            <ul>
              <li>
                직무별 Essential/심화 Contents는 물론, 최근의 Deep Change 화두를
                반영한 시의적절한 교육 과정을 제공합니다.
              </li>
              <li>
                이를 통해 해당 직무 구성원들의 지식 체계화는 물론, 전략적
                사고력(Way of Thinking)을 강화하는 것을 목표로 합니다.{" "}
              </li>
            </ul>
            <p className="p_link hidden">
              각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
            </p>
          </div>
        </div>
        <div className="college-link-box">
          <div className="belt">
            <Image src={`${PUBLIC_URL}/images/all/sub_01.jpg`} alt="" />
          </div>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: "재무/회계",
    render: () =>
    <Tab.Pane attached={false}>
      <div className="belt">
        <div className="text-right-box">
          <a href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN0005w" className="item-button">
            <Image style={{display:'inline'}} src={`${PUBLIC_URL}/images/all/icon-course-book.png`} alt="" />
            과정 바로가기
          </a>
        </div>
      </div>
      <div className="college-sub-txt">
        <strong>재무/회계</strong>
        <div>
          <ul>
            <li>
            Finance/회계/세무 분야의 직무 전문성을 제고하고, 이론 뿐만 아니라 SK 내부 Practice 및 Case 제시를 통해 구성원 
            여러분들의 다양한 학습 Needs 충족을 목표로 합니다.
            </li>
            <li>
            사내 전문가를 활용한 SK Practice/Case 발굴∙공유, Workshop/Community 활동 확대를 통한 구성원간 상호 지식 
공유를 지향함으로써, SK 구성원들의 Deep Change 실행력을 강화하고자 합니다.
            </li>
          </ul>
          <p className="p_link hidden">
            각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
          </p>
        </div>
      </div>
      <div className="college-link-box">
        <div className="belt">
        <Image src={`${PUBLIC_URL}/images/all/sub_02.jpg`} alt="" />
        </div>
      </div>
    </Tab.Pane>,
  },
  {
    menuItem: "마케팅/브랜드",
    render: () =>
    <Tab.Pane attached={false}>
      <div className="belt">
        <div className="text-right-box">
          <a href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN00018" className="item-button">
            <Image style={{display:'inline'}} src={`${PUBLIC_URL}/images/all/icon-course-book.png`} alt="" />
            과정 바로가기
          </a>
        </div>
      </div>
      <div className="college-sub-txt">
        <strong>마케팅/브랜드</strong>
        <div>
          <ul>
            <li>
            기업이 상품 또는 서비스를 고객에게 유통시키는 과정에서 창출되는 다양한 Value 와 관련된 ‘마케팅’,<br />
              경쟁 기업/상품과 구별되는 무형자산으로서 해당 기업의 가치를 상징하는 ‘브랜드’에 대해 다룸으로써, <br />
              해당 직무 관련 SK 구성원들의 Deep Change 실행력 제고를 위한 체계적인 컨텐츠를 제공합니다.
            </li>
          </ul>
          <p className="p_link hidden">
            각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
          </p>
        </div>
      </div>
      <div className="college-link-box">
        <div className="belt">
        <Image src={`${PUBLIC_URL}/images/all/sub_03.jpg`} alt="" />
        </div>
      </div>
    </Tab.Pane>,
  },
  {
    menuItem: "HR/조직 설계",
    render: () => 
    <Tab.Pane attached={false}>
      <div className="belt">
        <div className="text-right-box">
          <a href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN00013" className="item-button">
            <Image style={{display:'inline'}} src={`${PUBLIC_URL}/images/all/icon-course-book.png`} alt="" />
            과정 바로가기
          </a>
        </div>
      </div>
      <div className="college-sub-txt">
        <strong>HR/조직 설계</strong>
        <div>
          <ul>
            <li>
            HR Function에서는  (1) HR 실무에 기반한 기초 이해 및 방법론, Practice와 
(2) 미래 기술 변화에 따른 HR Tech 관련 지식 등 HR 담당자들의 업무 실행력과 Insight 확대를 위한 
체계적인 컨텐츠를 제공합니다.
            </li>
            <li>
            조직 설계 Function에서는 (1) 조직 설계의 핵심 개념/원칙들과 Practical 한 방법론을 익히고, 
(2) Silo 해소/ 구성원 행복/ 신사업 추진 등 조직 설계상의 현실적 고민들을 해결할 수 있는 장을 제공합니다.

            </li>
          </ul>
          <p className="p_link hidden">
            각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
          </p>
        </div>
      </div>
      <div className="college-link-box">
        <div className="belt">
        <Image src={`${PUBLIC_URL}/images/all/sub_04.jpg`} alt="" />
        </div>
      </div>
    </Tab.Pane>,
  },
  {
    menuItem: "SCM/Operation",
    render: () => 
    <Tab.Pane attached={false}>
      <div className="belt">
        <div className="text-right-box">
          <a href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN0007m" className="item-button">
            <Image style={{display:'inline'}} src={`${PUBLIC_URL}/images/all/icon-course-book.png`} alt="" />
            과정 바로가기
          </a>
        </div>
      </div>
      <div className="college-sub-txt">
        <strong>SCM/Operation</strong>
        <div>
          <ul>
            <li>
            고객에게 상품을 적시에, 저렴한 가격으로 제공하고 차별화된 서비스를 제공하기 위한 경영활동 전반을 효율화하는 
‘공급망 관리’에 대해 다룸으로써, 해당 직무 관련 SK 구성원들의 Deep Change 실행력 제고를 위한 체계적인 
컨텐츠를 제공합니다.
            </li>
          </ul>
          <p className="p_link hidden">
            각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
          </p>
        </div>
      </div>
      <div className="college-link-box">
        <div className="belt">
        <Image src={`${PUBLIC_URL}/images/all/sub_05.jpg`} alt="" />
        </div>
      </div>
    </Tab.Pane>,
  },
  {
    menuItem: "법무/IP",
    render: () => 
    <Tab.Pane attached={false}>
      <div className="belt">
        <div className="text-right-box">
          <a href="https://mysuni.sk.com/suni-main/lecture/college/CLG00008/channel/CHN0007l" className="item-button">
            <Image style={{display:'inline'}} src={`${PUBLIC_URL}/images/all/icon-course-book.png`} alt="" />
            과정 바로가기
          </a>
        </div>
      </div>
      <div className="college-sub-txt">
        <strong>법무/IP</strong>
        <div>
          <ul>
            <li>
            법무/IP Function 에서는 기업활동에서 발생하는 Legal Risk를 미연에 방지하고 해결하는 ‘법무’, 새로운 사업추진이나 
기존 사업에서 특허경쟁력을 제고하는 ‘IP’에 대해 다룸으로써, 해당 직무 관련 SK 구성원들의 Deep Change 실행력 
제고를 위한 체계적인 컨텐츠를 제공합니다.
            </li>
          </ul>
          <p className="p_link hidden">
            각 Badge와 코스를 클릭하면 해당 페이지로 이동합니다.
          </p>
        </div>
      </div>
      <div className="college-link-box">
        <div className="belt">
          <Image src={`${PUBLIC_URL}/images/all/sub_06.jpg`} alt="" />
        </div>
      </div>

    </Tab.Pane>,
  },
];

const CollegeInnerTabView = () => (
  <Tab
    menu={{ attached: false, tabular: false }}
    panes={panes}
    className="sub-tab-menu"
  />
);

export default CollegeInnerTabView;
