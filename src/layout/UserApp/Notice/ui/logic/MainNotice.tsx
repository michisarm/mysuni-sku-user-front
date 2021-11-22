import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { PostModel } from 'board/model';
import NoticeView from '../view/NoticeView';
import MainNoticeService from '../../../present/logic/MainNoticeService';
import { getCookie, setCookie } from '@nara.platform/accent';
import { testIsIE } from '../../../../../shared/helper/bodyHelper';

interface Props {
  mainNoticeService?: MainNoticeService;
}

const MainNoticeContainer: React.FC<Props> = (Props) => {
  //
  const { mainNoticeService } = Props;

  const today = moment(new Date().toDateString()).format('YYYYMMDD');
  const hideDate = getCookie('today');
  const [showNotice, setShowNotice] = useState(true);

  const [notices, setNotices] = useState<PostModel[] | null>(null);

  // myTrainingService 변경  실행
  useEffect(() => {
    setShowingNotice();
    if (showNotice) {
      setLatestNotice();
    }
  }, []);

  const setLatestNotice = async () => {
    mainNoticeService!.clearMainNotices();
    // 알림이 없으면 null을 리턴받는디.
    const notiInfo: PostModel[] | [] =
      await mainNoticeService!.getMainNotices();
    if (notices === null && notiInfo.length < 1) {
      setNotices([]);
    } else if (
      notices?.length !== notiInfo.length ||
      (notiInfo.length > 0 &&
        notices.length > 0 &&
        notices[0].id !== notiInfo[0].id)
    ) {
      setNotices(notiInfo);
    }
  };

  // notiMsg 값 변경 : '하루 동안 보지않기' 설정하지 않은 경우 변경된 공지 보이
  const setShowingNotice = () => {
    if (today !== hideDate || getCookie('notice_show') === 'SHOW') {
      setCookie('today', moment(new Date().toDateString()).format('YYYYMMDD'));
      // 공지사항 존재
      if (notices !== null && notices.length > 0) {
        setCookie('notice_show', 'SHOW');
        if (!showNotice) {
          setShowNotice(true);
        }
      }
      // 공지사항 없음
      else if (notices !== null && notices.length < 1) {
        //setCookie('notice_show', 'HIDE');
        if (showNotice) {
          setShowNotice(false);
        }
      }
    }
  };

  // 로컬스토리지에 저장된 날짜가 현재 날짜가 아니면 현재 날짜 기록하고 공지사항 보이기
  if (today !== hideDate) {
    setCookie('today', moment(new Date().toDateString()).format('YYYYMMDD'));
    setCookie('notice_show', 'SHOW');
    if (!showNotice && notices !== null && notices.length > 0) {
      setShowNotice(true);
    }
  } else if (getCookie('notice_show') === 'HIDE' && showNotice) {
    setShowNotice(false);
  }

  const isIE = useMemo<boolean>(testIsIE, []);

  // 임시 코드 ~ 2021-11-30 이후에 제거
  if (!isIE) {
    return null;
  }

  return showNotice && notices !== null && notices.length > 0 ? (
    <NoticeView notices={notices} showNoti={showNotice} />
  ) : null;
};

export default inject(mobxHelper.injectFrom('notice.mainNoticeService'))(
  observer(MainNoticeContainer)
);
