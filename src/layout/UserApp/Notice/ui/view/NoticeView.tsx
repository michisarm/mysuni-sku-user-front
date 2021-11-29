import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Checkbox } from 'semantic-ui-react';
import moment from 'moment';
import { PostModel } from 'board/model';
import routePaths from 'board/routePaths';
import { setCookie } from '@nara.platform/accent';
import { Area } from 'tracker/model';
import { getPolyglotText } from '../../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';

interface Props extends RouteComponentProps {
  notices: PostModel[];
  showNoti: boolean;
}

const NoticeView: React.FC<Props> = (Props) => {
  const { notices, showNoti, history } = Props;
  const [hideToday, setHideToday] = useState(false);
  const [showNotice, setShowNotice] = useState(showNoti);

  // checkbox click
  const handleChange = () => {
    setHideToday(!hideToday);
  };

  // Notice 닫을 때 오늘 안보기 여부에 따라 로컬 스토리지에 저장
  const handleClose = () => {
    // 오늘 하루 안보기 체크
    setCookie('today', moment(new Date().toDateString()).format('YYYYMMDD'));
    setCookie('notice_show', hideToday ? 'HIDE' : 'SHOW');
    // 공지 컨테이너 숨기기
    setShowNotice(false);
  };

  const onClickPost = (postId: string) => {
    //
    history.push(routePaths.supportNoticePost(postId));
    setShowNotice(false);
  };

  return showNotice && notices.length > 0 ? (
    <section className="notice-bar visible" data-area={Area.HEADER_NOTICE}>
      <div className="inner">
        <div className="text">
          <a
            className="ellipsis"
            onClick={() => onClickPost(notices[0].postId)}
          >
            {parsePolyglotString(
              notices[0].title,
              getDefaultLang(notices[0].langSupports)
            )}
          </a>
        </div>
        <div className="right">
          <Checkbox
            label={getPolyglotText('오늘 하루 보지 않기', 'home-nt-오늘닫기')}
            className="black"
            checked={hideToday}
            onChange={handleChange}
          />
          <Button className="close2" onClick={handleClose}>
            <span className="blind">close</span>
          </Button>
        </div>
      </div>
    </section>
  ) : null;
};

export default withRouter(NoticeView);
