import React, { useCallback, useState } from 'react';
import { useCommunityProfileMyCommunity } from '../../store/CommunityProfileMyCommunityStore';
import ContentsMyCommunityView from '../view/CommunityProfile/ContentsMyCommunityView';
import ContentsFeedView from '../view/CommunityProfile/ContentsFeedView';
import ContentsBookmarkView from '../view/CommunityProfile/ContentsBookmarkView';
import { useCommunityProfileBookmark } from 'community/store/CommunityProfileBookmarkStore';
import { Icon, Radio, Select } from 'semantic-ui-react';
import classNames from 'classnames';
import { MenuItem } from 'community/viewModel/CommunityAdminMenu';
import CommunityAdminMenuDetailView from '../view/CommunityAdminMenu/CommunityAdminMenuDetailView';
import { useCommunityAdminMenu } from 'community/service/useCommunityMenu/useCommunityMenu';
import { getCommunityAdminMenu, setCommunityAdminMenu } from 'community/store/CommunityAdminMenuStore';
import { requestCommunityGroups, saveCommunityMenu } from 'community/service/useCommunityMenu/requestCommunity';
import { useParams } from 'react-router-dom';
import { useCommunityGroups } from 'community/service/useCommunityMenu/useCommunityGroups';

interface RouteParams {
  communityId: string;
}

function CommunityMenuContainer() {

  const {communityId} = useParams<RouteParams>();
  const [communityAdminMenu] = useCommunityAdminMenu();
  const [communityAdminGroups] = useCommunityGroups()
  const [addMenuFlag, setAddMenuFlag] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<MenuItem>();
  const [nameValueList, setNameValueList] = useState<[]>();

  const onHandleClickTaskRow = useCallback(
    param => {
      // handleClickTaskRow(param);
      console.log('param', param)
      setSelectedRow(param)
    },
    [communityAdminMenu]
  );

  const handleAddMenu = useCallback(() => {
    setAddMenuFlag(true);
  }, [])

  const handleSave = useCallback(() => {
    console.log('handelSave')
    console.log('getCommunityAdminMenu', getCommunityAdminMenu())
    // modifyMenu(communityId, id, namevalueList);
    saveCommunityMenu(communityId)
  }, [])

  const onChangeValue = useCallback((value: any, name: string) => {
    console.log('communityAdminMenu', communityAdminMenu)
    console.log('value', value)
    if (communityAdminMenu) {
      communityAdminMenu.menu.map((item: MenuItem) => {
        if(item.id === value.id) {
          item = value
        }
      })
    }
    setCommunityAdminMenu({'menu': communityAdminMenu?.menu!});

    // setNameValueList()
    //communityId, [id, namevalueList[name, value]]


  }, [communityAdminMenu]);


  function renderMenuRow(menu: MenuItem, handleClickTaskRow: any) {
    let childElement = null;
    childElement = '<span></span>'
    // return ''
    if (menu) {
      // childElement = menu.child.map((child, index) => {
        return (
          <>
            <li>
              <a
                onClick={() => handleClickTaskRow(menu)}
              >
                <img src={`${process.env.PUBLIC_URL}/images/all/icon-communtiy-menu-board.png`} />
                {menu.name}
                <span>
                  <img src={`${process.env.PUBLIC_URL}/images/all/btn-clear-nomal.svg`} />
                </span>
                {/* {menu.child !== undefined && (
                  <span>{menu.child.name}</span>
                )} */}
              </a>
            </li>
            {menu.child !== undefined && (
              <ul>
                <li>
                  <a href="">
                    <img src={`${process.env.PUBLIC_URL}/images/all/icon-reply-16-px.svg`} />
                    {menu.child.name}
                    <span>
                      <img src={`${process.env.PUBLIC_URL}/images/all/btn-clear-nomal.svg`} />
                    </span>
                  </a>
                </li>
              </ul>
            )}
          </>
        );
      // });
    }
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
              <button onClick={handleAddMenu}>메뉴 추가</button>
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
                return renderMenuRow(item, onHandleClickTaskRow);
              })}
              { addMenuFlag && (
                <li>
                  <input type="text" placeholder="메뉴명을 입력하세요" />
                </li>
              )}

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
            </ul>
          </div>
        </div>
        <div className="admin_menu_right">
          {selectedRow && (
            <>
              <CommunityAdminMenuDetailView addMenuFlag={addMenuFlag} selectedRow={selectedRow} communityAdminGroups={communityAdminGroups} onChangeValue={(data, name) => onChangeValue(data, name)}/>
              <div className="admin_bottom_button line">
                <button className="ui button admin_table_button" onClick={() => handleSave()}>저장</button>
              </div>
            </>
          )}
        </div>
      </div>
      </>
    )}
    </>
  );  
}

export default CommunityMenuContainer;
