import React from 'react';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import { useMyProfile } from '../../store/MyProfileStore';
// import {  } 
import profileIcon from '../../../style/media/img-profile-80-px.png';
import { Link } from 'react-router-dom';

function CommunityMainHeaderContainer() {
  const profile = useMyProfile();
  return (
    <div className="main-info-area community-main-header">
      <div className="progress-info-wrap">
        <div className="cell">
          <div className="cell-inner">
            <div className="profile">
              <div className="pic">
                <img src={profileIcon} />
              </div>
            </div>
            <div className="text-info">
              <div className="name">
                {profile?.nickname || profile?.name || ''}
                <Link
                  className="ui button orange-arrow2"
                  to="/community/my-profile"
                >
                  <i aria-hidden="true" className="icon post" />
                  프로필수정
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="cell">
          <div className="ui statistic community-num">
            <Label className="onlytext">
              <span>Followers</span>
            </Label>
            <div className="value2">0</div>
          </div>
          <div className="ui statistic community-num">
            <Label className="onlytext">
              <span>Following</span>
            </Label>
            <div className="value2">0</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityMainHeaderContainer;
