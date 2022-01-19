import React, { useEffect, useState, useCallback } from 'react';
import { Modal } from 'semantic-ui-react';
import { UserProfileInfoProfileCard } from './views/UserProfileInfoProfileCard';
import {
  requestUserProfileInfo,
  initUserProfileInfo,
} from './userProfileInfo.request.services';
import { UserProfileInfoTabMenu } from './views/UserProfileInfoTabMenu';
import { UserProfileInfoTabFeed } from './views/UserProfileInfoTabFeed';
import { UserProfileInfoTabCommunity } from './views/UserProfileInfoTabCommunity';
import { checkExternalInstructor } from '../app.services';
import { Area } from '../../../tracker/model';
import UserProfileInfoTabPlaylist from '../../../layout/UserApp/Header/ui/view/UserProfileInfoTabPlaylist';

interface Props {
  open: boolean;
  setOpen: (state: boolean) => void;
  memberId: string;
}

export function CommunityProfileModal(props: Props) {
  useEffect(() => {
    initUserProfileInfo();
    requestUserProfileInfo(props.memberId);
  }, [props.memberId]);

  const [selectedMenuName, setSelectMenuName] = useState<string>('Playlist');

  const setMenu = useCallback(
    (menuName: string) => {
      setSelectMenuName(menuName);
    },
    [selectedMenuName]
  );

  let style = {};
  if (checkExternalInstructor()) {
    style = { width: '280px' };
  }

  return (
    <>
      <Modal
        open={props.open}
        className=" w1044 profile-modal-new"
        style={style}
      >
        <Modal.Content>
          <div
            className="contents-wrapper"
            data-area={Area.COMMUNITY_PROFILE_MODAL}
          >
            <div className="profile-contents-area left-side side-wrapper">
              <UserProfileInfoProfileCard
                open={props.open}
                setOpen={props.setOpen}
                memberId={props.memberId}
              />
            </div>
            {!checkExternalInstructor() && (
              <div className="right-side side-wrapper">
                <UserProfileInfoTabMenu
                  selectedMenu={selectedMenuName}
                  setMneu={setMenu}
                />
                {selectedMenuName === 'Playlist' && (
                  <UserProfileInfoTabPlaylist
                    memberId={props.memberId}
                    setOpen={props.setOpen}
                  />
                )}
                {selectedMenuName === 'Community' && (
                  <UserProfileInfoTabCommunity
                    memberId={props.memberId}
                    setOpen={props.setOpen}
                  />
                )}
                {selectedMenuName === 'Feed' && (
                  <UserProfileInfoTabFeed
                    memberId={props.memberId}
                    setOpen={props.setOpen}
                  />
                )}
              </div>
            )}
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}
