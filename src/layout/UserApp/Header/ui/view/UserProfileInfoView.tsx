import React, { useCallback, useState } from 'react';
import UserProfileInfoProfileCard from './UserProfileInfoProfileCard';
import UserProfileInfoTabMenu from './UserProfileInfoTabMenu';
import { Modal } from 'semantic-ui-react';
import UserProfileInfoTabCommunity from './UserProfileInfoTabCommunity';
import UserProfileInfoTabFeed from './UserProfileInfoTabFeed';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { isCommunityAuth } from 'layout/UserApp/store/MenuAuthStore';
import UserProfileInfoTabPlaylist from './UserProfileInfoTabPlaylist';

interface Props {
  open: boolean;
  setOpen: (state: boolean) => void;
  memberId: string | undefined;
  preProfileInfo: {
    isSetProfile: boolean;
    nickName: string;
    introduce: string;
    profileImg: string;
    profileBgImg: string;
  };
}

interface State {}

function UserProfileInfoView(props: Props) {
  const [selectedMenuName, setSelectMenuName] = useState<string>('Playlist');

  const setMenu = useCallback((menuName: string) => {
    setSelectMenuName(menuName);
  }, []);

  return (
    <section className="content">
      <Modal
        open={props.open}
        className={`w1044 profile-modal-new ${
          isCommunityAuth() ? '' : 'g-type'
        }`}
      >
        <Modal.Content>
          {props.preProfileInfo && props.preProfileInfo.isSetProfile
            ? getPolyglotText('미리보기', 'mypage-유저모달-미리보기')
            : ''}
          <div className="contents-wrapper">
            <div className="profile-contents-area left-side side-wrapper">
              <UserProfileInfoProfileCard
                open={props.open}
                setOpen={props.setOpen}
                memberId={props.memberId}
                preProfileInfo={props.preProfileInfo}
              />
            </div>
            {isCommunityAuth() && (
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
                {/* {selectedMenuName === 'Badge' && <UserProfileInfoTabBadge memberId={props.memberId} setOpen={props.setOpen} />} */}
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
    </section>
  );
}

export default UserProfileInfoView;
