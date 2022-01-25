/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { Menu } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  selectedMenu: string;
  setMneu: (state: string) => void;
}

function UserProfileInfoTabMenu(props: Props) {
  const onMenuItemClick = useCallback((menuName: string) => {
    props.setMneu(menuName);
  }, []);

  return (
    <div className="contents-tab-menu">
      <Menu className="sku">
        {/* <Menu.Item name="Badge" active={props.selectedMenu === "Badge"} onClick={() => onMenuItemClick('Badge')}>Badge</Menu.Item> */}
        <Menu.Item
          name="Playlist"
          active={props.selectedMenu === 'Playlist'}
          onClick={() => onMenuItemClick('Playlist')}
        >
          <PolyglotText
            defaultString="Playlist"
            id="mypage-유저모달-Playlist"
          />
        </Menu.Item>
        <Menu.Item
          name="Community"
          active={props.selectedMenu === 'Community'}
          onClick={() => onMenuItemClick('Community')}
        >
          <PolyglotText
            defaultString="커뮤니티"
            id="mypage-유저모달-커뮤니티2"
          />
        </Menu.Item>
        <Menu.Item
          name="Feed"
          active={props.selectedMenu === 'Feed'}
          onClick={() => onMenuItemClick('Feed')}
        >
          <PolyglotText defaultString="Feed" id="mypage-유저모달-Feed" />
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default UserProfileInfoTabMenu;
