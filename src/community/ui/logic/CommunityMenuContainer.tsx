import React, { useCallback } from 'react';
import { useCommunityProfileMyCommunity } from '../../store/CommunityProfileMyCommunityStore';
import ContentsMyCommunityView from '../view/CommunityProfile/ContentsMyCommunityView';
import ContentsFeedView from '../view/CommunityProfile/ContentsFeedView';
import ContentsBookmarkView from '../view/CommunityProfile/ContentsBookmarkView';
import { useCommunityProfileBookmark } from 'community/store/CommunityProfileBookmarkStore';
import { Icon, Radio, Select } from 'semantic-ui-react';
import classNames from 'classnames';
import { CommunityAdminMenuDetailView } from '../view/CommunityAdminMenu/CommunityAdminMenuDetailView';
import { useCommunityAdminMenu } from 'community/store/CommunityAdminMenuStore';
import { MenuItem } from 'community/viewModel/CommunityAdminMenu';

function CommunityMenuContainer() {

  const communityAdminMenu = useCommunityAdminMenu();
  console.log('communityAdminMenu', communityAdminMenu)

  const onHandleClickTaskRow = useCallback(
    param => {
      // handleClickTaskRow(param);
    },
    [communityAdminMenu]
  );

  function renderMenuRow(menu: MenuItem, handleClickTaskRow: any) {
    let childElement = null;
    console.log('menu', menu)
    console.log('menu.child', menu.child)
    childElement = '<span></span>'
    // return ''
    if (menu) {
      // childElement = menu.child.map((child, index) => {
        return (
          <li>
            <a
              href="#detail"
              onClick={() => handleClickTaskRow()}
            >
              <img src={`${process.env.PUBLIC_URL}/images/all/icon-communtiy-menu-board.png`} />
              {menu.name}
            </a>
          </li>
        );
      // });
    }
  
    return (
      <>
        {/* {menu.delete === false && (
          <div className="depth1">
            <a
              href="#detail"
              onClick={() => handleClickTaskRow({ id: task.id, type: 'parent' })}
            >
              {task.count !== 0 && (
                <span className="title">
                  {task.title}[{task.count}]
                </span>
              )}
              {task.count === 0 && task.pinned && <span className="title important"><span className="ellipsis">{task.title}</span></span>}
              {task.count === 0 && !task.pinned && <span className="title"><span>{task.title}</span></span>}
              <span className="writer">{task.writer}</span>
              <span className="view">{task.readCount} 읽음</span>
              <span className="date">
                {task.time && moment(task.time).format('YYYY.MM.DD')}
              </span>
            </a>
          </div>
        )} */}
        {childElement}
      </>
    );
  }

  return (
    <>
    {communityAdminMenu !== undefined && ( 
      <>
      <div className="admin_menu_title">
        <p>
          ㆍ 메뉴를 편집한 후에 <strong>저장</strong> 버튼을 눌러야 반영됩니다.
        </p>
        <p>
          ㆍ <strong>Home, 전체 글, 공지사항</strong> 메뉴는 편집 및 삭제가
          불가합니다.
        </p>
      </div>
      <div className="admin_menu_wrap">
        <div className="admin_menu_left">
          <div className="menu_left_contents">
            <div className="menu_left_btn">
              <button>
                <img src={`${process.env.PUBLIC_URL}/images/all/icon-arrow-up-20-px.png`} />
              </button>
              <button>
                <img src={`${process.env.PUBLIC_URL}/images/all/icon-arrow-down-20-px.png`} />
              </button>
              <button>메뉴 추가</button>
              <button>하위 메뉴</button>
            </div>
            <ul>
              <li>
                <a href="">
                  <img src={`${process.env.PUBLIC_URL}/images/all/icon-communtiy-menu-home-off.png`} />
                  Home
                  <span>
                    <img src={`${process.env.PUBLIC_URL}/images/all/icon-required.png`} />
                  </span>
                </a>
              </li>
              <li>
                <a href="">
                  <img src={`${process.env.PUBLIC_URL}/images/all/icon-communtiy-menu-board.png`} />
                  전체글
                  <span>
                    <img src={`${process.env.PUBLIC_URL}/images/all/icon-required.png`} />
                  </span>
                </a>
              </li>
              <li>
                <a href="">
                  <img src={`${process.env.PUBLIC_URL}/images/all/icon-communtiy-menu-board.png`} />
                  공지사항
                  <span>
                    <img src={`${process.env.PUBLIC_URL}/images/all/icon-required.png`} />
                  </span>
                </a>
              </li>
              {communityAdminMenu.menu.map((item, index) => {
                console.log('2', item)
                return renderMenuRow(item, onHandleClickTaskRow);
              })}

              {/* <li>
                <a href="">
                  ㆍ 딥 러닝의 역사
                  <span>
                    <img src={`${process.env.PUBLIC_URL}/images/all/btn-clear-nomal.svg`} />
                  </span>
                </a>
              </li>
              <ul>
                <li>
                  <a href="">
                    <img src={`${process.env.PUBLIC_URL}/images/all/icon-reply-16-px.svg`} />
                    알고리즘
                    <span>
                      <img src={`${process.env.PUBLIC_URL}/images/all/btn-clear-nomal.svg`} />
                    </span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src={`${process.env.PUBLIC_URL}/images/all/icon-reply-16-px.svg`} />
                    심층 신경망
                    <span>
                      <img src={`${process.env.PUBLIC_URL}/images/all/btn-clear-nomal.svg`} />
                    </span>
                  </a>
                </li>
              </ul> */}
              <li>
                <input type="text" placeholder="메뉴명을 입력하세요" />
              </li>
            </ul>
          </div>
        </div>
        <div className="admin_menu_right">
          <CommunityAdminMenuDetailView />
          <div className="admin_bottom_button line">
            <button className="ui button admin_table_button">저장</button>
          </div>
        </div>
      </div>
      </>
    )}
    </>
  );  
}

export default CommunityMenuContainer;
