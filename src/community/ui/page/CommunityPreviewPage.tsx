import React, { Component, createRef } from "react";
import { Link, useParams } from 'react-router-dom';
import { Segment } from "semantic-ui-react";
import { useCommunityHome } from '../../store/CommunityHomeStore';


class CommunityPreviewPage extends Component {
  contextRef = createRef();
//   state = { activeItem: "MyCommunity" };

  render() {
    return (
      <div>
        <Segment className="full">
          <div className="course-detail-center community-containter">
            <LnbMenu />
            <div className="community-home-contants">
              {/* 배너 */}
              <div className="community-banner-type1">
                {/* <img src={Banner} /> */}
                <div className="community-banner-inner">
                  <div className="community-banner-title">
                    Deep Learning Community
                  </div>
                  <div className="community-banner-copy">
                    과정 플랫폼은 여러분들이 동기 구성원들과 서로 소통하고  배우며 성장할 수 있는 공간입니다
                    적극적으로 참여하여 동기 구성원들과 함께 의미 있고, 소중한 경험을 쌓으시기를 바랍니다
                    카페 소개 및 다양한 메세지 등을 넣을 수 있어요. 배경이미지 가로사이즈 고정, 세로 사이즈 가변입니다
                  </div>
                </div>
              </div>

              {/* 공지사항 */}
              <div className="home-card-container">
                <div className="home-card-title">
                  <p>공지사항</p>
                  {/* more */}
                  <button className="ui icon button right btn-blue btn-more">
                  more{/* <i aria-hidden="true" className="icon more3"></i> */}
                  </button>
                </div>
                <CommunityCard01 />
                <CommunityCard02 />
                <CommunityCard03 />
              </div>

              {/* 최근 게시글 */}
              <div className="home-card-container">
                <div className="home-card-title">
                  <p>최근 게시글</p>
                  {/* more */}
                  <button className="ui icon button right btn-blue btn-more">
                  more{/* <i aria-hidden="true" className="icon more3"></i> */}
                  </button>
                </div>
                <NewBoard />
              </div>
            </div>
          </div>
        </Segment>
      </div>
    );
  }
}

export default CommunityPreviewPage;

class LnbMenu extends Component {
    render() {
      return (
        <div className="community-left community-home-left">
          <div className="sub-info-box">
            <div className="commnuity-left-top">
              <div className="community-left-header">
                <span className="community-badge blue">커뮤니티주제</span>
                <a className="community-share"><span>공유하기</span></a>
              </div>
  
              <h3>에너지 거래의 현재와 미래</h3>
              <div className="community-home-left-span">
                <div className="community-user-info">
                  <span><img src=""/><strong>nickname</strong></span>
                  <span>멤버 <strong>260</strong></span>
                </div>
                <button className="ui button fix line">가입하기</button>
              </div>
            </div>
            <div className="community-home-right-contents">
              <ul>
                <li>
                  <a className="act-on">
                    {/* <img src={home} /> */}
                    HOME
                    {/* <img src={arrow} className="right-menu-arrow" /> */}
                  </a>
                </li>
                <li>
                  <a>
                    {/* <img src={leftBoard01} /> */}
                    전체글
                  </a>
                </li>
                <li>
                  <a>
                    {/* <img src={leftBoard01} /> */}
                    공지사항
                  </a>
                </li>
                <li>
                  <a>
                    {/* <img src={leftBoard01} /> */}
                    딥 러닝의 역사
                  </a>
                </li>
                <li>
                  <a>
                    {/* <img src={leftBoard01} /> */}
                    딥 러닝의 중요성
                  </a>
                </li>
                <ul>
                  <li>
                    <a className="act-on">
                      {/* <img src={reply} />
                      <img src={leftBoard01} /> */}
                      알고리즘
                    </a>
                  </li>
                  <li>
                    <a>
                      {/* <img src={reply} />
                      <img src={leftBoard04} /> */}
                      심층 신경망
                    </a>
                  </li>
                  <li>
                    <a>
                      {/* <img src={reply} />
                      <img src={leftBoard05} /> */}
                      선호도 조사
                    </a>
                  </li>
                  <li>
                    <a>
                      {/* <img src={reply} />
                      <img src={leftBoard06} /> */}
                      강의듣기
                    </a>
                  </li>
                </ul>
  
                <li>
                  <a>
                    {/* <img src={leftBoard02} /> */}
                    왜 다시 딥 러닝인가?
                  </a>
                </li>
                <li>
                  <a>
                    {/* <img src={leftBoard03} /> */}
                    딥 러닝과 인간 두뇌
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }

  class CommunityCard01 extends Component {
    render() {
      return (
        <div className="community-home-card">
          <div className="ui comments base">
            <div className="home-card-top">
              <h3>데이터 혁신이 답이다 <span className="new-label">NEW</span></h3>
              <p>
                본격적인 데이터 분석 학습에 앞서 데이터의 중요성 및 데이터 기반
                비즈니스 혁신 산업으로…
              </p>
             
            </div>
            <div className="home-card-bottom">
              <span>2020.09.20</span>
              <span>3</span>
                {/* <img src={CommentImg05} /> */}
            </div>
          </div>
        </div>
      );
    }
  }

  class CommunityCard02 extends Component {
    render() {
      return (
        <div className="community-home-card">
          <div className="ui comments base">
            <div className="home-card-top">
              <h3>애플의 앱클립과 스트리밍 서비스 안내</h3>
              <p>
              카이스트 산업 공학과 장영재 교수와 함께 스마트팩토리가 추구하는 기본적인 철학을 유지…
              </p>
            </div>
            <div className="home-card-bottom">
              <span>2020.09.18</span>
              <span>99</span>
                {/* <img src={CommentImg05} /> */}
            </div>
          </div>
        </div>
      );
    }
  }
  
  class CommunityCard03 extends Component {
    render() {
      return (
        <div className="community-home-card">
          <div className="ui comments base">
            <div className="home-card-top">
              {/* <img src={HomeFile} /> */}
              <h3>스트리밍 서비스 안내</h3>
              <p>
              인공지능과 SW를 중심으로 크게 변화하는 미래자동차 산업에서 자동차 반도체의 중요성을…
              </p>
            </div>
            <div className="home-card-bottom">
              <span>2020.09.09</span>
              <span>36</span>
                {/* <img src={CommentImg05} /> */}
            </div>
          </div>
        </div>
      );
    }
  }
  
  class NewBoard extends Component {
    render() {
      return (
        <div className="new-board">
        <NewBoardList01 />
        <NewBoardList02 />
        <NewBoardList03 />
        <NewBoardList04 />
        </div>
      );
    }
  }

  class NewBoardList01 extends Component {
    render() {
      return (
        <div className="new-board-list">
          <div className="new-board-list-top">
            {/* <img src={BadgeImportant} className="board-badge" />
            <img src={HomeFile} className="board-file" /> */}
            <strong>애플의 앱클립과 스트리밍 서비스</strong>
            <span className="new-label">NEW</span>
          </div>
          <p>
            SK그룹이 구성원들의 딥체인지 역량을 키워나갈 교육·연구 통합 플랫폼인 
            &#39;SUNI&#39;를 출범시킨다. 국내기업 최고 수준의 교육·연구 전문조직을
            운영해야 구성원들이 4차 산업혁명 등 급변하는 경영환경에 선제적으로
            대응할 수 있는 역량을…
          </p>
          <div className="survey-read-side mb0">
            <div className="title-area read-header-left">
              <div className="text-list">
                {/* <img src={CommentImg04} /> */}
                <span>nickname</span>
              </div>
              <div className="text-list">
                <span>2020.09.09</span>
              </div>
            </div>
            <div className="right-area">
              <button>
                {/* <img src={CommentImg05} /> */}
                99
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  class NewBoardList02 extends Component {
    render() {
      return (
        <div className="new-board-list">
          <div className="new-board-list-top">
            <strong>황이석 교수의 Financial Acumen</strong>
            <span className="new-label">NEW</span>
          </div>
          <p>
            인공지능과 SW를 중심으로 크게 변화하는 미래자동차 산업에서 자동차
            반도체의 중요성과 그 의미를 살펴보고, 우리가 자동차 반도체 산업의
            리더가 되기 위해 극복해야 할 이슈들을 분석합니다.
          </p>
          <div className="survey-read-side mb0">
            <div className="title-area read-header-left">
              <div className="text-list">
                {/* <img src={CommentImg04} /> */}
                <span>hyoshin</span>
              </div>
              <div className="text-list">
                <span>2020.09.09</span>
              </div>
            </div>
            <div className="right-area">
              <button>
                {/* <img src={CommentImg05} /> */}
                3
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  class NewBoardList03 extends Component {
    render() {
      return (
        <div className="new-board-list">
          <div className="new-board-list-top">
            <strong>숏폼 플랫폼인 Quibi 서비스가 론칭되었다</strong>
            <span className="new-label">NEW</span>
          </div>
          <p>
            카이스트 산업 공학과 장영재 교수와 함께 스마트팩토리가 추구하는
            기본적인 철학을 배우고, Smart Factory를 구현하기 위한 제조 시스템의
            이해와 의사결정에 대해 학습해 보세요.
          </p>
          <div className="survey-read-side mb0">
            <div className="title-area read-header-left">
              <div className="text-list">
                {/* <img src={CommentImg04} /> */}
                <span>EBBLE</span>
              </div>
              <div className="text-list">
                <span>2020.09.09</span>
              </div>
            </div>
            <div className="right-area">
              <button>
                {/* <img src={CommentImg05} /> */}
                99
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  class NewBoardList04 extends Component {
    render() {
      return (
        <div className="new-board-list">
          <div className="new-board-list-top">
            {/* <img src={HomeFile} sclassName="board-file" /> */}
            <strong>딥러닝 동향과 관련된 자료 모음입니다.</strong>
            <span className="new-label">NEW</span>
          </div>
          <p>
            모든 방면에서 최고의 강의!! 최고의 학습 중 하나였습니다. 실습을
            수행하고 개념을 이해하는데 매우 간단하고 쉽습니다. 내용은 기본
            내용이지만 용어를 기억하는 데 도움이됩니다. 유연하고 강력한 클라우드
            개발 환경에서 탁월한 경험을…
          </p>
          <div className="survey-read-side mb0">
            <div className="title-area read-header-left">
              <div className="text-list">
                {/* <img src={CommentImg04} /> */}
                <span>captain</span>
              </div>
              <div className="text-list">
                <span>2020.08.30</span>
              </div>
            </div>
            <div className="right-area">
              <button>
                {/* <img src={CommentImg05} />3 */}
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
  