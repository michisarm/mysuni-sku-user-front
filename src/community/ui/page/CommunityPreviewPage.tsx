import { useCommunityHome } from "community/store/CommunityHomeStore";
import { param } from "jquery";
import React, { Component, createRef, useEffect } from "react";
import { Link, matchPath, useLocation, useParams } from 'react-router-dom';
import { Segment } from "semantic-ui-react";
import { findPreViewHome } from '../../service/useCommunityHome/requestCommunityHome'
import defaultHeader from '../../../style/media/bg-ttl-sample-02.png';
import { requestCommunity, requestCommunityMenus } from "community/service/useCommunityHome/requestCommunity";
import managerIcon from '../../../style/media/icon-community-manager.png';
import boardIcon from '../../../style/media/icon-communtiy-menu-board.png';
import homeArrowIcon from '../../../style/media/icon-community-menu-open.png';
import homeIcon from '../../../style/media/icon-communtiy-menu-home-on.png';

const CommunityPreviewPage : React.FC = function CommunityPreviewPage({

})  {
  interface Params{
    communityId: string;
  }

  const { communityId } = useParams<Params>();
  const preview = useCommunityHome();
  const communityHome = useCommunityHome();

  useEffect(()=>{
    requestCommunity(communityId);
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
                    {communityHome?.community?.name}
                  </div>
                  <div className="community-banner-copy">
                    {preview?.preview?.introduce}
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
                  <div className="no-cont-wrap">
                    <i aria-hidden="true" className="icon no-contents80" />
                  <div className="text">등록된 게시물이 없습니다.</div>
                  </div>
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

const LnbMenu: React.FC = function LnbMenu({ 

}) {
  interface Params{
    communityId: string;
  }

  const { communityId } = useParams<Params>();
  const communityHome = useCommunityHome();

  useEffect(()=>{
    requestCommunity(communityId);
    requestCommunityMenus(communityId);
  },[]);

  console.log(communityHome);
      return (
        <div className="community-left community-home-left">
          <div className="sub-info-box">
            <div className="commnuity-left-top">
              <div className="community-left-header">
                <span className="community-badge blue">{communityHome?.community?.fieldName}</span>
                <a className="community-share"><span>공유하기</span></a>
              </div>
  
              <h3>{communityHome?.community?.name}</h3>
              <div className="community-home-left-span">
                <div className="community-user-info">
                  <span><img src={managerIcon}/><strong>{communityHome?.community?.managerName}</strong></span>
                  <span>멤버 <strong>{communityHome?.community?.memberCount}</strong></span>
                </div>
                {/* <button className="ui button fix line">가입하기</button> */}
              </div>
            </div>
            <div className="community-home-right-contents">
              <ul>
                <li>
                  <img src={homeIcon} />
                    HOME
                  <img src={homeArrowIcon} className="right-menu-arrow" />
                </li>
                <li>
                    <img src={boardIcon} />
                    전체글
                </li>
                <li>
                    <img src={boardIcon} />
                    공지사항
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
