import React from 'react';
import { reviewAnswers } from 'lecture/detail/model/SurveySummaries';
import moment from 'moment';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import ProfileImage from '../../../../../../src/shared/components/Image/Image';

interface props {
  item: reviewAnswers;
  onClickMember: (profileId: string, profileNickname: string) => void;
}

const FeedbackCard = (props: props) => {
  const { item, onClickMember } = props;
  const {
    registeredTime,
    sentence,
    itemNumber,
    name,
    denizenId,
    nickName,
    profileImage,
  } = item;
  const profileName = parsePolyglotString(name);
  const date = moment(registeredTime).format('YYYY.MM.DD');

  return (
    <>
      <div className="feedback-card">
        {/* {modal && <InfoModal />} */}
        <div className="inner">
          <div className="top-prf">
            <a
              className="ui profile"
              onClick={() => {
                onClickMember(denizenId, nickName || '');
              }}
            >
              <div className="pic s48">
                <ProfileImage
                  src={profileImage || ''}
                  alt="프로필사진 임시이미지"
                  className="ui image"
                />
              </div>

              <div className="prf-info">
                <div className="info-top">
                  <strong className="prf-name">{profileName}</strong>
                  <span className="reg-date">{date}</span>
                </div>
              </div>
            </a>
          </div>
          <div className="bottom-detail">
            <p>{sentence}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackCard;
