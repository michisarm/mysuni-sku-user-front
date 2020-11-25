import React, { Component } from "react";

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
                  <img src=""/>
                  HOME
                  <img src="" className="right-menu-arrow"/>
                </a>
              </li>
              <li>
                <a>
                  <img src="" />
                  전체글
                </a>
              </li>
              <li>
                <a>
                  <img src="" />
                  공지사항
                </a>
              </li>
              <li>
                <a>
                <img src="" />딥 러닝의 역사
                </a>
              </li>
              <li>
                <a>
                <img src="" />딥 러닝의 중요성
                </a>
              </li>

              <ul>
                <li>
                  <a className="act-on">
                  <img src="" />
                  <img src="" />
                  알고리즘
                  </a>
                </li>
                <li>
                  <a>
                  <img src="" />
                  <img src="" />
                  심층 신경망
                  </a>
                </li>
                <li>
                  <a>
                  <img src="" />
                  <img src="" />
                  선호도 조사
                  </a>
                </li>
                <li>
                  <a>
                  <img src="" />
                  <img src="" />
                  강의듣기
                  </a>
                </li>
              </ul>

              <li>
                <a>
                  <img src="" />왜 다시 딥 러닝인가?
                </a>
              </li>
              <li>
                <a>
                  <img src="" />딥 러닝과 인간 두뇌
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default LnbMenu;
