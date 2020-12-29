import React, { useCallback, useEffect, useState } from 'react';
import { MenuItem } from 'community/viewModel/CommunityAdminMenu';
import CommunityAdminMenuDetailView from '../view/CommunityAdminMenu/CommunityAdminMenuDetailView';
import { useCommunityAdminMenu } from 'community/service/useCommunityMenu/useCommunityMenu';
import { setCommunityAdminMenu } from 'community/store/CommunityAdminMenuStore';
import { useParams } from 'react-router-dom';
import { useCommunityGroups } from 'community/service/useCommunityMenu/useCommunityGroups';
import _ from 'lodash';
import { saveCommunityMenu } from 'community/service/useCommunityMenu/requestCommunity';

interface RouteParams {
  communityId: string;
}

function CommunityMenuContainer() {
  const {communityId} = useParams<RouteParams>();
  const [communityAdminMenu] = useCommunityAdminMenu();
  const [communityAdminGroups] = useCommunityGroups()
  const [addMenuFlag, setAddMenuFlag] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<MenuItem>();
  const [nameValues, setnameValues] = useState<any[]>([]);

  const onHandleClickTaskRow = useCallback(
    param => {
      // handleClickTaskRow(param);
      setSelectedRow(param)
    },
    [communityAdminMenu]
  );

  const handleAddMenu = useCallback(() => {
    setAddMenuFlag(true);
  }, [])

  const handleSave = useCallback(() => {
    const result = 
    _.chain(nameValues)
      .groupBy('id')
      .map((v, i) => {
        return {
          'id': _.get(_.find(v, 'id'), 'id'),
          'nameValues': 
          _.chain(v)
            .groupBy('name')
            .map((v, i) => {
              return{
                name: i,
                value: _.get(_.find(v, 'value'), 'value')
              }
            }).value()
        }
      })
      .orderBy(['id'])
      .value()

      console.log('result', result)
      //communityId, [id, namevalueList[name, value]]
      saveCommunityMenu(communityId, result)
      
  }, [])

  const onChangeValue = useCallback((value: any, name: string) => {
    if (communityAdminMenu) {
      communityAdminMenu.menu.map((item: MenuItem) => {
        if(item.id === value.id) {
          item = value
        }
      })
    }
    setCommunityAdminMenu({'menu': communityAdminMenu?.menu!});
    const test = {'id': value.id, 'name': name, 'value': value[name]}
    nameValues.map((item, index) => {
      if(item.id === value.id && item.name === name) {
        nameValues.splice(index,1)
      }
    })
    nameValues.push(test)
    setnameValues(nameValues)
  }, [communityAdminMenu]);


  function renderMenuRow(menu: MenuItem, handleClickTaskRow: any) {
    let childElement = null;
    childElement = '<span></span>'
    if (menu) {
      return (
        <>
          <li onClick={() => handleClickTaskRow(menu)}>
            <a>
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
              <li onClick={() => handleClickTaskRow(menu)}>
                <a>
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
            </ul>
          </div>
        </div>
        <div className="admin_menu_right">
          {selectedRow && communityAdminGroups && (
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
