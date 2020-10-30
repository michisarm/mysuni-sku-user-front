/*eslint-disable*/

import React, { useCallback, useEffect, useState } from 'react';
import { getLectureTranscripts } from 'lecture/detail/store/LectureTranscriptStore';
import { getLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import SkuVideoPlayer from 'lecture/detail/service/useLectureMedia/components/SkuPlayer/SkuVideoPlayer';
import { patronInfo } from '@nara.platform/dock';

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
                {getLectureMedia() &&
                  (getLectureMedia()?.mediaType == 'LinkMedia' ||
                    getLectureMedia()?.mediaType ==
                      'ContentsProviderMedia') && (
                    <video controls>
                      <source
                        src={getLectureMedia()?.mediaContents.linkMediaUrl}
                      ></source>
                    </video>
                  )}
                {getLectureMedia() &&
                  (getLectureMedia()?.mediaType == 'InternalMedia' ||
                    getLectureMedia()?.mediaType == 'InternalMediaUpload') && (
                    <SkuVideoPlayer
                      cubeId=""
                      //deliveryId="2081ffc6-d685-4f12-9e45-ac2a0019e0b3"
                      deliveryId={
                        getLectureMedia()?.mediaContents.internalMedias[0]
                          .panoptoSessionId || ''
                      }
                      //userId="djpaek@sk.com"
                      userId={patronInfo.getPatronId() || ''}
                      useCaption={true}
                      captionInfos={captionInfos}
                      hasNext={true}
                      nextInfos={null}
                    />
                  )}
                {getLectureTranscripts() &&
                  getLectureMedia() &&
                  (getLectureMedia()?.mediaType == 'InternalMedia' ||
                    getLectureMedia()?.mediaType == 'InternalMediaUpload') &&
                  (getLectureTranscripts()?.length || 0) > 0 &&
                  displayTranscript && (
                    <>
                      <button
                        className="ui icon button right btn-blue"
                        onClick={() => setDisplayTranscript(false)}
                      >
                        Close Transcript
                        <i aria-hidden="true" className="icon icon morelink" />
                      </button>

                      <div className="course-video-tanscript">
                        <div className="course-video-scroll">
                          {getLectureTranscripts()?.map(lectureTranscript => {
                            return (
                              <>
                                <strong>{toHHMM(lectureTranscript.idx)}</strong>
                                <p>{lectureTranscript.text}</p>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                {getLectureTranscripts() && !displayTranscript && (
                  <button
                    className="ui icon button right btn-blue"
                    onClick={() => setDisplayTranscript(true)}
                  >
                    View Transcript
                    <i aria-hidden="true" className="icon icon morelink" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureVideoView;
