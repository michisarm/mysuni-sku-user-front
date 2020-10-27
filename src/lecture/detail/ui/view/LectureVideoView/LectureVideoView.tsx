/*eslint-disable*/

import React, { useCallback, useEffect, useState } from 'react';
import { getLectureTranscripts } from 'lecture/detail/store/LectureTranscriptStore';
import SkuVideoPlayer from 'lecture/detail/service/useLectureTranscript/components/SkuPlayer/SkuVideoPlayer';

//샘플 페이지 : http://localhost:3000/lecture/cineroom/ne1-m2-c2/college/CLG00003/cube/CUBE-2jy/lecture-card/LECTURE-CARD-274

interface LectureVideoViewProps {}

const LectureVideoView: React.FC<LectureVideoViewProps> = function LectureVideoView({}) {
  const toHHMM = useCallback((idx: number) => {
    const time = idx;
    const hours = Math.floor(time / 60);
    const minutes = Math.floor(time - hours * 60);

    let sHours = '';
    let sMinutes = '';
    sHours = String(hours.toString()).padStart(2, '0');
    sMinutes = String(minutes.toString()).padStart(2, '0');

    return sHours + ':' + sMinutes;
  }, []);

  const [displayTranscript, setDisplayTranscript] = useState<boolean>(true);
  const captionInfos = {
    infos: [
      { lang: 'ko', url: 'test.srt', isDefault: false },
      { lang: 'en', url: 'test_en.srt', isDefault: true },
    ],
  };
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
                <SkuVideoPlayer
                  cubeId=""
                  deliveryId="2081ffc6-d685-4f12-9e45-ac2a0019e0b3"
                  userId="djpaek@sk.com"
                  useCaption={true}
                  captionInfos={captionInfos}
                  hasNext={true}
                  nextInfos={null}
                ></SkuVideoPlayer>
                {displayTranscript && (
                  <button
                    className="ui icon button right btn-blue"
                    onClick={() => setDisplayTranscript(false)}
                  >
                    Close Transcript
                    <i aria-hidden="true" className="icon icon morelink" />
                  </button>
                )}
                {!displayTranscript && (
                  <button
                    className="ui icon button right btn-blue"
                    onClick={() => setDisplayTranscript(true)}
                  >
                    View Transcript
                    <i aria-hidden="true" className="icon icon morelink" />
                  </button>
                )}
              </div>

              {displayTranscript && (
                <div className="course-video-tanscript">
                  <div className="course-video-scroll">
                    {getLectureTranscripts() &&
                      getLectureTranscripts().map(lectureTranscript => {
                        return (
                          <>
                            <strong>{toHHMM(lectureTranscript.idx)}</strong>
                            <p>{lectureTranscript.text}</p>
                          </>
                        );
                      })}
                  </div>
                </div>
              )}
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
