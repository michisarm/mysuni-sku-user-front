import React, { useCallback, useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { getCookie } from '@nara.platform/accent';
import LectureStructureContainer from '../logic/LectureStructureContainer';
import { debounceActionTrack } from 'tracker/present/logic/ActionTrackService';
import { ActionType, Action, Area, ActionTrackParam } from 'tracker/model';

const LectureDetailLayout: React.FC = function LectureDetailLayout({
  children,
}) {
  const [structureVisible, setStructureVisible] = useState<boolean>(true);

  const closeStructure = useCallback(() => {
    setStructureVisible(false);
  }, []);

  const openStructure = useCallback(() => {
    setStructureVisible(true);
  }, []);

  const [scrollValue, setScrollValue] = useState<any>();
  const [nowScroll, setNowScroll] = useState<any>(0);

  // 실시간 스크롤 감시
  useEffect(() => {
    const onScroll = () => setNowScroll(window.pageYOffset);
    window.scrollTo(0, 0);
    window.addEventListener('scroll', onScroll);
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
          getCookie('tryingLoginId') ||
          (window.sessionStorage.getItem('email') as string) ||
          (window.localStorage.getItem('nara.email') as string),
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
  const tabScrollRef = useCallback(node => {
    // console.log('asdf', lecturePrecourse, lectureDescription);
    if (node !== null) {
      setScrollValue(window.pageYOffset + node.getBoundingClientRect().top);
    }
  }, []);

  return (
    <section
      className={`content lms ${
        structureVisible
          ? nowScroll > scrollValue
            ? 'v-wide lms-lnb-fixed'
            : 'v-wide'
          : ''
      }`}
      id="lms-content"
      style={nowScroll > scrollValue ? { margin: '70px 0' } : {}}
    >
      <div
        className="course-info-list"
        ref={tabScrollRef}
        data-area={Area.CARD_LIST}
      >
        <div className="course-header-list">
          <a className="btn-view-change">
            <Icon className="list24 icon" />
            <span>List</span>
          </a>
          <a className="btn-close" onClick={closeStructure}>
            <span>close</span>
          </a>
        </div>
        <LectureStructureContainer />
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
          <span>펼치기</span>
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
