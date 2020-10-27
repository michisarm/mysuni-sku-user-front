/*eslint-disable*/

import React, { useCallback, useEffect, useState } from 'react';

interface LectureVideoViewProps {}

const LectureVideoView: React.FC<LectureVideoViewProps> = function LectureVideoView({}) {
  return (
    <div className="course-info-detail responsive-course">
      <div className="course-detail-center">
        <a className="btn-wide">
          <span>펼치기</span>
        </a>
        <div className="main-wrap">
          <div className="scrolling-area area2 ">
            <div className="ui segment full">
              {/* Header */}
              <div className="course-info-header">
                {/* <Contentsheader />
                <ContentsheaderSide /> */}
              </div>

              <div className="course-video">
                <button className="ui icon button right btn-blue">
                  Close Transcript
                  <i aria-hidden="true" className="icon icon morelink" />
                </button>
              </div>

              <div className="course-video-tanscript">
                <div className="course-video-scroll">
                  <strong>0:06</strong>
                  <p>
                    Now one question that you might have about that,
                    is aboutthis notion of the right way of thinking about
                    things.
                  </p>
                  <strong>0:37</strong>
                  <p>
                    Now these are really, really important questions for
                    philosophy, and I don't want to try and answer them now. But
                    I do want to consider what a couple of famous, influential
                    philosophers have said about those questions. And that's why
                    I'm here at Old Calton Cemetery, outside the David Hume
                    monument. David Hume was a famous Edinburgh-based
                    philosopher. And he thought that a skeptical attitude
                    towards philosophy's capacity to find the truth about the
                    world was entirely appropriate.
                  </p>
                  <strong>1:20</strong>
                  <p>
                    Now one question that you might have about that, is about
                    this notion of the right way of thinking about things.
                  </p>
                  <strong>1:48</strong>
                  <p>
                    Now these are really, really important questions for
                    philosophy, and I don't want to try and answer them now. But
                    I do want to consider what a couple of famous, influential
                    philosophers have said about those questions. And that's why
                    I'm here at Old Calton Cemetery, outside the David Hume
                    monument. David Hume was a famous Edinburgh-based
                    philosopher. And he thought that a skeptical attitude
                    towards philosophy's capacity to find the truth about the
                    world was entirely appropriate.
                  </p>
                  <strong>0:06</strong>
                  <p>
                    Now one question that you might have about that, is about
                    this notion of the right way of thinking about things.
                  </p>
                  <strong>0:37</strong>
                  <p>
                    Now these are really, really important questions for
                    philosophy, and I don't want to try and answer them now. But
                    I do want to consider what a couple of famous, influential
                    philosophers have said about those questions. And that's why
                    I'm here at Old Calton Cemetery, outside the David Hume
                    monument. David Hume was a famous Edinburgh-based
                    philosopher. And he thought that a skeptical attitude
                    towards philosophy's capacity to find the truth about the
                    world was entirely appropriate.
                  </p>
                  <strong>1:20</strong>
                  <p>
                    Now one question that you might have about that, is about
                    this notion of the right way of thinking about things.
                  </p>
                  <strong>1:48</strong>
                  <p>
                    Now these are really, really important questions for
                    philosophy, and I don't want to try and answer them now. But
                    I do want to consider what a couple of famous, influential
                    philosophers have said about those questions. And that's why
                    I'm here at Old Calton Cemetery, outside the David Hume
                    monument. David Hume was a famous Edinburgh-based
                    philosopher. And he thought that a skeptical attitude
                    towards philosophy's capacity to find the truth about the
                    world was entirely appropriate.
                  </p>
                </div>
              </div>
              <div className="lms-inner-menu">
                <a href="#lms-overview" className="lms-act">
                  Overview
                </a>
                <a href="#lms-comment" className="lms-comment">
                  Comment<span className="count">+12</span>
                </a>
              </div>
              <div className="class-guide-txt fn-parents">
                <div className="text">
                  <p>
                    「한방에 이해하는 꿀잼 반도체」 는 반도체 Tech 이해에 필요한
                    기반지식과 핵심이론을 총 3편에 걸쳐 쉽고 재밌고 빠르게
                    정리해 드립니다.
                  </p>
                  <p className="margin30">
                    1. 인류 최고의 발명품 트랜지스터
                    <br />
                    2. 반도체는 어떻게 만들어 지는가
                    <br />
                    3. 반도체 제품의 종류와 동작원리
                  </p>
                  <p>
                    - 원고 : mySUNI 반도체 College
                    <br />- 내래이터 : 과학 유튜버 공진(정현승)
                  </p>
                </div>
              </div>

              <div className="badge-detail border-none">
                {/* 관련카테고리 , 태그 */}
                {/* <ContentsText /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureVideoView;
