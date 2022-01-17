import * as React from 'react';
import { Accordion, Button, Icon, Tab } from 'semantic-ui-react';
import UserProfileInfoTabPlaylistView from './UserProfileInfoTablPlaylistView';

interface Props {
  memberId: string | undefined;
  setOpen: (state: boolean) => void;
}

function UserProfileInfoTabPlaylist(props: Props) {
  //

  return (
    <Tab.Pane>
      <div className="pl-pc-wrap">
        <div className="inner">
          <div className="list-top">
            총<strong> 32개</strong>의 Playlist가 있습니다.
          </div>
          <div className="pl-mylist">
            <Accordion className="pl-mylist-acc">
              <div className="mylist-acc-item">
                <UserProfileInfoTabPlaylistView />
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </Tab.Pane>
  );
}

export default UserProfileInfoTabPlaylist;
