import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Button, Icon, Image } from 'semantic-ui-react';
import LectureStructureContainer from '../logic/LectureStructureContainer';
import { useLocation, useParams } from 'react-router-dom';
import LectureParams from '../../viewModel/LectureParams';
import { getCookie } from '@nara.platform/accent';
import { debounceActionTrack } from 'tracker/present/logic/ActionTrackService';
import { ActionTrackParam } from 'tracker/model/ActionTrackModel';
import { ActionType, Action, Area } from 'tracker/model/ActionType';
import {
  getLectureNoteTab,
  setLectureNoteItem,
  setLectureNoteTab,
  setLectureNoteWriteState,
  useLectureNoteTab,
} from '../../store/LectureNoteStore';
import { loadPlayVideo, seekTo } from '@sku/skuniv-ui-video-player';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';

const LectureDetailLayout: React.FC = function LectureDetailLayout({
  children,
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [structureVisible, setStructureVisible] = useState<boolean>(true);
  const { pathname } = useLocation();
  const [scrollValue, setScrollValue] = useState<any>();
  const [nowScroll, setNowScroll] = useState<any>(0);
  const [noteTabUsable, setNoteTabUsable] = useState<boolean>(false);
  const [noteTabDetail, setNoteTabDetail] = useState<boolean>(false);

  const params = useParams<LectureParams>();
  const noteTabActivity = useLectureNoteTab();

  const closeStructure = useCallback(() => {
    setStructureVisible(false);
  }, []);

  const openStructure = useCallback(() => {
    setStructureVisible(true);
  }, []);

  useEffect(() => {
    if (
      !params.cubeType ||
      params.viewType === 'report' ||
      params.viewType === 'test' ||
      params.viewType === 'survey' ||
      params.viewType === 'discussion'
    ) {
      setNoteTabUsable(false);
    } else {
      setNoteTabUsable(true);
    }
  }, []);

  // 실시간 스크롤 감시
  useEffect(() => {
    const onScroll = () => setNowScroll(window.pageYOffset);
    window.scrollTo(0, 0);
    window.addEventListener('scroll', onScroll);
    const playTime = sessionStorage.getItem('playTime');
    setTimeout(() => {
      if (playTime) {
        if (params.cubeType === 'Video') {
          loadPlayVideo();
          setTimeout(() => {
            seekTo(Number(playTime));
          }, 3000);
          sessionStorage.removeItem('playTime');
        }
      }
    }, 2000);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Action Scroll
  useEffect(() => {
    // max bottom
    if (
      nowScroll > 100 &&
      nowScroll ===
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight
    ) {
      // vertical scroll
      debounceActionTrack({
        email:
          (window.sessionStorage.getItem('email') as string) ||
          (window.localStorage.getItem('nara.email') as string) ||
          getCookie('tryingLoginId'),
        path: window.location.pathname,
        search: window.location.search,
        area: window.location.pathname.includes('/cube')
          ? Area.CUBE_CONTENT
          : Area.CARD_CONTENT,
        actionType: ActionType.GENERAL,
        action: Action.SCROLL_V,
        actionName: window.location.pathname.includes('/cube')
          ? '큐브상세 스크롤'
          : '카드상세 스크롤',
      } as ActionTrackParam);
    }
  }, [nowScroll]);

  // 리스트 헤더위치 추출
  const tabScrollRef = useCallback((node) => {
    if (node !== null) {
      setScrollValue(window.pageYOffset + node.getBoundingClientRect().top);
    }
  }, []);

  const tabFlag = useCallback(
    (type: string) => {
      if (type === 'note') {
        if (getLectureNoteTab() || noteTabActivity) {
          return false;
        }
        setNoteTabDetail(true);
      } else {
        setLectureNoteItem();
        setNoteTabDetail(false);
        setLectureNoteWriteState(false);
      }
      setLectureNoteTab(false);
    },
    [noteTabUsable, noteTabActivity]
  );

  const getStickyClassName = () => {
    if (!structureVisible) {
      return '';
    }

    if (sectionRef && sectionRef.current) {
      // console.log(nowScroll, scrollValue, sectionRef.current.scrollHeight);
      // console.log(
      //   sectionRef.current.clientHeight,
      //   sectionRef.current.offsetHeight
      // );
      if (
        nowScroll >=
        sectionRef.current.scrollHeight - (scrollValue + 287 + 113 + 70)
      ) {
        return 'v-wide v-wide2';
      }
    }

    if (nowScroll > scrollValue) {
      return 'v-wide lms-lnb-fixed';
    }

    return 'v-wide';
  };

  return (
    <section
      ref={sectionRef}
      className={`content lms ${getStickyClassName()}`}
      id="lms-content"
      // style={nowScroll > scrollValue ? { margin: '70px 0' } : {}}
    >
      <div
        className="course-info-list"
        ref={tabScrollRef}
        data-area={Area.CARD_LIST}
      >
        <div className="course-header-list">
          <a className="btn-view-change" onClick={() => tabFlag('list')}>
            <Icon className="list24 icon" />
            <span>
              <PolyglotText defaultString="List" id="cube-DetailLayout-List" />
            </span>
          </a>
          {noteTabUsable && (
            <Button
              onClick={() => tabFlag('note')}
              id="handleNoteTab"
              className={
                noteTabActivity ? 'btn_note_new ing' : 'btn_note_new on'
              }
            >
              <Icon />
              <span>Note</span>
            </Button>
          )}
          {!noteTabUsable && (
            <Button className="btn_note_new" id="handleNoteTab">
              <Icon />
              <span>Note</span>
              <div className="bubble">
                <p
                  dangerouslySetInnerHTML={{
                    __html: getPolyglotText(
                      `Note는 각 콘텐츠별로<br />작성하실 수 있습니다.`,
                      'cube-DetailLayout-작성'
                    ),
                  }}
                />
              </div>
            </Button>
          )}
          <a className="btn-fold" onClick={closeStructure}>
            <Image src={`${process.env.PUBLIC_URL}/images/all/icon-fold.svg`} />
          </a>
        </div>
        <LectureStructureContainer
          noteTab={noteTabDetail}
          cubeType={params.cubeType}
        />
      </div>
      <div
        className="course-info-detail responsive-course"
        data-area={Area.CARD_CONTENT}
      >
        <a
          className={
            nowScroll > scrollValue ? 'btn-wide lms-wide-fixed' : 'btn-wide'
          }
          onClick={openStructure}
        >
          <span>
            <PolyglotText
              defaultString="펼치기"
              id="cube-DetailLayout-펼치기"
            />
          </span>
        </a>
        <div className="course-detail-center">
          <div className="main-wrap">
            <div className="scrolling-area area2 ">
              <div className="ui segment full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LectureDetailLayout;
