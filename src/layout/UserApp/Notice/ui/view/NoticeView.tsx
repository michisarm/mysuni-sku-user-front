import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Checkbox } from 'semantic-ui-react';
import moment from 'moment';
import { PostModel } from 'board/model';
import routePaths from 'board/routePaths';


interface Props extends RouteComponentProps {
  notices: PostModel[],
  showNoti: boolean,
}

const NoticeView: React.FC<Props> = (Props) => {
  const {notices, showNoti, history} = Props;
  const [hideToday, setHideToday] = useState(false);
  const [showNotice, setShowNotice] = useState(showNoti);

  // checkbox click
  const handleChange = () => {
    setHideToday(!hideToday);
  };

  // Notice 닫을 때 오늘 안보기 여부에 따라 로컬 스토리지에 저장
  const handleClose = () => {
    // 오늘 하루 안보기 체크
    window.localStorage.setItem('today', moment(new Date().toDateString()).format('YYYYMMDD'));
    window.localStorage.setItem('notice_show', hideToday ? 'HIDE' : 'SHOW');
    // 공지 컨테이너 숨기기
    setShowNotice(false);
  };

  const onClickPost = (postId: string) => {
    //
    history.push(routePaths.supportNoticePost(postId));
    setShowNotice(false);
  };

  return (
    showNotice && notices.length > 0 ?
      <>
        <section className="notice-bar visible">
          <div className="inner">
            <div className="text">
              <a className="ellipsis" onClick={() => onClickPost(notices[0].postId)}>{notices[0].title}</a>
            </div>
            <div className="right">
              <Checkbox
                label="오늘 하루 보지 않기"
                className="black"
                checked={hideToday}
                onChange={handleChange}
              />
              <Button className="close2" onClick={handleClose}><span className="blind">close</span></Button>
            </div>
          </div>
        </section>
      </>
      :
      null
  );
};

export default withRouter(NoticeView);
