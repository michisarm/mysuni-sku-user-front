import React from 'react';
import { Button, Checkbox, Image, Modal } from 'semantic-ui-react'

import ProfileImg from '../../../../style/media/profile-110-px-sample-4.png';

const MyProfileModalFollower: React.FC = () => {
  return(
    // <section className="content">
      <Modal>
        <Modal.Header>
            Followers
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-60vh">
            <div className="content-wrap-follow">
              <ul className="follow_list">
                <li>
                  <p className="pic"><img src={ProfileImg} alt="프로필 사진"/></p>
                  <p className="nickname">seungki86</p>
                  {/*Follow checkbox : default*/}
                  <label className="chk_follow">
                    <input type="checkbox" name=""/>
                    <span>Follow</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </Modal.Content>
          <Modal.Actions className="actions2">
            <Button className="pop2 d">닫기</Button>
          </Modal.Actions>
      </Modal>
    // </section>
  );
}

export default MyProfileModalFollower;