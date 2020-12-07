import { useCommunityHome } from "community/store/CommunityHomeStore";
import { param } from "jquery";
import React, { Component, createRef, useEffect } from "react";
import { Link, matchPath, useLocation, useParams } from 'react-router-dom';
import { Segment } from "semantic-ui-react";
import { findPreViewHome } from '../../service/useCommunityHome/requestCommunityHome'
import defaultHeader from '../../../style/media/bg-ttl-sample-02.png';

const CommunityPreviewPage : React.FC = function CommunityPreviewPage({

})  {
  interface Params{
    communityId: string;
  }

  const { communityId } = useParams<Params>();
  const preview = useCommunityHome();

  useEffect(()=>{
    findPreViewHome(communityId , 1);
  },[]);

    return (
      <div>
        <Segment className="full">
          <div className="course-detail-center community-containter">
            <LnbMenu />
            <div className="community-home-contants">
              {/* 배너 */}
              <div className="community-banner-type1">
              {preview?.preview?.type === 'BASIC' && (
                <>
                 {preview?.preview?.thumbnailId && (
                  <img src={(preview?.preview && '/files/community/' + preview?.preview.thumbnailId)} />
                )}
                {!preview?.preview?.thumbnailId && (
                  <img src={defaultHeader} />
                )}
                <div className="community-banner-inner">
                  <div className="community-banner-title">
                    {preview?.preview?.introduce}
                  </div>
                  <div className="community-banner-copy">
                    과정 플랫폼은 여러분들이 동기 구성원들과 서로 소통하고  배우며 성장할 수 있는 공간입니다
                    적극적으로 참여하여 동기 구성원들과 함께 의미 있고, 소중한 경험을 쌓으시기를 바랍니다
                    카페 소개 및 다양한 메세지 등을 넣을 수 있어요. 배경이미지 가로사이즈 고정, 세로 사이즈 가변입니다
                  </div>
                </div>
                </>
              )}
              {preview?.preview?.type === 'HTML' && (
                <div className="community-banner-type2" dangerouslySetInnerHTML={{__html: preview.preview.html || '',}} />
              )}
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
              </div>
            </div>
          </div>
        </Segment>
      </div>
    );
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
