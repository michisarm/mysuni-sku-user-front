import { CommentList } from '@nara.drama/feedback';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { Checkbox, Comment, Icon, Image } from 'semantic-ui-react';
import SkProfileService from '../../../../profile/present/logic/SkProfileService';
import { findSkProfileByAudienceId } from '../../api/profileApi';
import { useLectureDiscussion } from '../../service/useLectureDiscussion';
import { getLectureDiscussion,setLectureDiscussion } from '../../store/LectureDiscussionStore';
import depot, { DepotFileViewModel } from '@nara.drama/depot';

const PUBLIC_URL = process.env.PUBLIC_URL;

function LectureDiscussionContainer() {
  const [lectureDiscussion] = useLectureDiscussion();
  useEffect(() => {
    if (lectureDiscussion === undefined) {
      return;
    }
    findSkProfileByAudienceId(lectureDiscussion.creatorAudienceId).then(
      profile => {
        const mLectureDiscussion = getLectureDiscussion();
        if (profile !== undefined && mLectureDiscussion !== undefined) {
          if (mLectureDiscussion.creatorImage != profile.photoImage) {
            setLectureDiscussion({
              ...lectureDiscussion,
              creatorImage: profile.photoImage,
            });
          }
        }
      }
    );
  }, [lectureDiscussion?.creatorAudienceId]);

  const {
    skProfile: {
      member: { company, department, email, name },
    },
  } = SkProfileService.instance;

  const zipFileDownload = useCallback((type: string) => {
    console.log('첨부파일');
    // if (type === 'select') {
    //   if (origin === '') {
    //     // console.log('선택 첨부파일 없음 err')
    //     return;
    //   }
    //   if (originArr!.length === 1) {
    //     depot.downloadDepotFile(origin);
    //     return;
    //   }
    //   depot.downloadDepotFiles(originArr);
    // } else {
    //   if (type === 'all') {
    //     const idArr: string[] = [];
    //     filesMap.get('reference')?.map((foundedFile: DepotFileViewModel) => {
    //       idArr.push(foundedFile.id);
    //     });
    //     if (idArr.length === 0) {
    //       // console.log('전체 첨부파일 없음 err');
    //       return;
    //     }
    //     depot.downloadDepotFiles(idArr);
    //   }
    // }
  }, []);
  console.log('id',lectureDiscussion?.id)
  return (
    <>
      {lectureDiscussion && (
        <>
          <div className="discuss-wrap">
            
            {/* 제목 */}
            <div className="discuss-box">
              <Image src={`${PUBLIC_URL}/images/all/icon-communtiy-discussion.png`} alt="" style={{display: 'inline-block'}}/>
              <h2>{lectureDiscussion.name}</h2>
              <span className="peo-opinion">전체 의견 <strong>638</strong></span>
              <span><strong className="peo-date">2020.09.26</strong></span>
            </div>
            
            {/* 본문 */}
            <div className="discuss-box2">
              {/* <img src={MaskImg} className="discuss-main-img" /> */}
              <div className="discuss-text-wrap">
                <span className="discuss-text-belt">
                  2019년 지구상에 새로 등장한 신종 바이러스 감염병인 코로나19는 세계 많은 국가에 서 1년째 대유행을 하고 있다.
                  코로나19는 21세기 들어 가장 많은 인명 피해를 주고 있는 감염병이란 타이틀을 이미 거머쥐었다. 지금도 정치, 경제,
                  사회, 문화, 보건의료, 과학기술 등 많은 분야를 이전과 다른 모습으로 바꿔놓고 있는 중이다. 따라서 코로나19가 바꾸었거나
                  바꾸고 있는 우리 사회의 다양 한 모습을 살펴보고 또 앞으로 어디까지 어떻게 바꿀지를 분석하는 것은 인류의 지속가능성을
                  위해 매우 중요한 과제라고 할 수 있다. 코로나 사태와 관련, 코로나 사태가 시작되었던 1월 말 당시의 예상 및 결과를 Review해보고,
                  향후 사태 지속 시 사회가 어떤 모습으로 변할지에 대해 답변하면서 평소에 생각하지 못했던 부분까지 생각의 영역을 확장해봅니다.
                </span>
                <button className="ui icon button right btn-blue">
                  more
                  <i aria-hidden="true" className="icon icon morelink more2" />
                </button>
              </div>
             
              {/* 관련 URL */}
              <div className="community-board-down discuss2">
                <div className="board-down-title href">
                    <p>
                      {" "}
                      <Image src={`${PUBLIC_URL}/images/all/icon-url.png`} alt="" style={{display: 'inline-block'}}/>
                      관련 URL
                    </p>
                    <a href="#">코로나19 100일째 전 세계 확진자 150만명… (2020-04-09 한국경제)</a>
                    <a href="#">센트럴 파크에 들어선 야전병원… 뉴욕은 지금 전쟁터 (2020-03-31 한국일보)</a>
                    <a href="#">헤지펀드 배부 코로나 충력, 경제공황으로 이어질수도 (2020-04-10 중앙일보)</a>
                </div>
              </div>

              {/* 관련 자료 */}
              <div className="community-board-down discuss2">
                <div className="community-contants">
                  <div className="community-board-down">
                    <div className="board-down-title">
                      <p>
                        <img
                          src={`${PUBLIC_URL}/images/all/icon-down-type-3-24-px.svg`}
                        />
                        첨부파일
                      </p>
                      <div className="board-down-title-right">
                        <button
                          className="ui icon button left post delete"
                          onClick={() => zipFileDownload('select')}
                        >
                          <i aria-hidden="true" className="icon check icon" />
                          선택 다운로드
                        </button>
                        <button
                          className="ui icon button left post list2"
                          onClick={() => zipFileDownload('all')}
                        >
                          <img
                            src={`${PUBLIC_URL}/images/all/icon-down-type-4-24-px.png`}
                          />
                          전체 다운로드
                        </button>
                      </div>
                    </div>
                    <div className="down">
                      <Checkbox
                        className="base"
                      />
                      <Icon
                        className="icon-down-type4"
                      />
                    </div>
                  </div>
                </div>
              </div>  
            {/* discuss-box2 */}
            </div>
          {/* discuss-wrap */}
          </div>

          <CommentList
            feedbackId={lectureDiscussion.id}
            hideCamera
            name={name}
            email={email}
            companyName={company}
            departmentName={department}
          />
        </>
      )}
    </>
  );
}

export default LectureDiscussionContainer;
