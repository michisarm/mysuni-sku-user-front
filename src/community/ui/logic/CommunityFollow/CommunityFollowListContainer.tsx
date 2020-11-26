import React, {useState} from 'react';
import { Icon, Button } from "semantic-ui-react";
import classNames from "classnames";

// 임시 이미지 
import ProfileImg from '../../../../style/media/profile-110-px-sample-4.png';

const CommunityFollowListContainer: React.FC = () => {
  const [text, setText] = useState<string>('');

  return(
    <>
      {/* Right */}
      <div className="community-left community-main-left">
        <div className="sub-info-box">
          <div className="main-left-search">
            {/* searchBox */}
            <div className={classNames("ui h38 search input")}>
              <input type="text"
                placeholder="닉네임을 입력하세요."
                value={text}
                onChange={e => setText(e.target.value)}
              />
              {/* <Icon className="clear link" onClick={() => this.setState({write: ''})}/> */}
              <Icon className="search link"/>
            </div>
          </div>

          {/* 프로필 카드 */}
          <div className="community-main-left-contents">
            <div className="thumbnail">
              <img src={ProfileImg} />
            </div>
            <div className="community-main-left-list">
              <div className="community-main-left-h3">chang</div>
              <div className="community-main-left-span">
                Followers
                <span>789</span>
                Following<span>99</span>
              </div>
            </div>
          </div>
          <div className="more-comments community-side">
            <Button icon className="left moreview">
              <Icon className="moreview" /> list more
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommunityFollowListContainer;