import React from 'react';
import { MemberList } from '../playlistRecommendPopUp.store';
import Image from '../../../shared/components/Image/Image';
import { Popup } from 'semantic-ui-react';

export function ProfileComponent(props: MemberList) {
  const { name, email, thumbnailImagePath, departmentName, companyName } =
    props;

  return (
    <div className="ui profile">
      <div className="pic s48">
        <Image src={thumbnailImagePath} alt="프로필사진" />
      </div>
      <div className="prf-info">
        <Popup
          className="user-prf-popup"
          trigger={
            <div className="info-top">
              <strong className="prf-name">{name}</strong>
              <span className="prf-comp">{departmentName}</span>
              <span className="prf-group">{`/ ${companyName}`}</span>
            </div>
          }
          position="top left"
        >
          <Popup.Content>
            <div className="info-top">
              <strong className="prf-name">{name}</strong>
              <span className="prf-comp">{departmentName}</span>
              <span className="prf-group">{`/ ${companyName}`}</span>
            </div>
          </Popup.Content>
        </Popup>
        <span className="prf-email">{email}</span>
      </div>
    </div>
  );
}
