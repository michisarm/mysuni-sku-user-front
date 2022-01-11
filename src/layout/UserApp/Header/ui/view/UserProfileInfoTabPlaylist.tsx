import * as React from 'react';
import { Accordion, Button, Icon, Tab } from 'semantic-ui-react';

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
                <Accordion.Title active={true}>
                  <div className="acc-top">
                    <div className="acc-tit">
                      <strong>
                        {`[CEO특강_SK에너지] "행복에 이르는 다섯 계단"`}
                      </strong>
                    </div>
                    <div className="acc-meta">
                      <Button className="like">
                        <Icon aria-hidden="true" className="heart16 active" />
                        {`4,288`}
                      </Button>
                      <Button className="add-black">
                        <Icon aria-hidden="true" className="add-black16'" />
                        {`Playlist 담기`}
                      </Button>
                    </div>
                    {/*<div className="acc-cnt">*/}
                    {/*  <Button className="acc-updown">{`총`}</Button>*/}
                    {/*</div>div*/}
                  </div>
                </Accordion.Title>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </Tab.Pane>
  );
}

export default UserProfileInfoTabPlaylist;
