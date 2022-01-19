import React, { useCallback } from 'react';
import { Menu } from 'semantic-ui-react';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';

interface Props {
  selectedMenu: string;
  setMneu: (state: string) => void;
}

export function UserProfileInfoTabMenu(props: Props) {
  const onMenuItemClick = useCallback((menuName: string) => {
    props.setMneu(menuName);
  }, []);
  return (
    <>
      <div className="contents-tab-menu">
        <Menu className="sku">
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
            커뮤니티
          </Menu.Item>
          <Menu.Item
            name="Feed"
            active={props.selectedMenu === 'Feed'}
            onClick={() => onMenuItemClick('Feed')}
          >
            Feed
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
}
