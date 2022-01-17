import { Accordion, Button, Icon } from 'semantic-ui-react';
import * as React from 'react';

interface Props {}

function UserProfileInfoTabPlaylistView(props: Props) {
  //
  return (
    <>
      <Accordion.Title active={true}>
        <div className="acc-top">
          <div className="acc-tit">
            <strong>[CEO특강_SK에너지] 행복에 이르는 다섯 계단</strong>
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
          <div className="acc-cnt">
            <Button className="acc-updown">
              {`총`}
              <strong>6개</strong>
              {` 학습카드`}
              <Icon area-hidden="true" className="drop24-down" />
            </Button>
          </div>
        </div>
      </Accordion.Title>
      <Accordion.Content active={true}>
        <div className="list-wrap">
          <ul className="acc-card-list">
            <li className="item">
              <a href="#" className="inner">
                <div className="ellipsis tit">
                  AI/DT 시대의 고객 경험 디자인
                </div>
                <div className="item-dt">
                  <span className="cnt">12개</span>
                  <span className="time">11h 30m</span>
                </div>
              </a>
            </li>
            <li className="item">
              <a href="#" className="inner">
                <div className="ellipsis tit">
                  AI/DT 시대의 고객 경험 디자인
                </div>
                <div className="item-dt">
                  <span className="cnt">12개</span>
                  <span className="time">11h 30m</span>
                </div>
              </a>
            </li>
            <li className="item">
              <a href="#" className="inner">
                <div className="ellipsis tit">
                  AI/DT 시대의 고객 경험 디자인
                </div>
                <div className="item-dt">
                  <span className="cnt">12개</span>
                  <span className="time">11h 30m</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </Accordion.Content>
    </>
  );
}

export default UserProfileInfoTabPlaylistView;
