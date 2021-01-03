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
import { useParams } from 'react-router-dom';
import { useCommunityGroups } from 'community/service/useCommunityMenu/useCommunityGroups';
import _ from 'lodash';
import { addCommunityMenu, deleteCommunityMenu, requestCommunityMenu, saveCommunityMenu } from 'community/service/useCommunityMenu/requestCommunity';
import CommunityAdminMenuAddView from '../view/CommunityAdminMenu/CommunityAdminMenuAddView';

interface RouteParams {
  communityId: string;
}

const nameValuesArr: any[] = []
const deleteValuesArr: any[] = []

function CommunityMenuContainer() {

  const {communityId} = useParams<RouteParams>();
  const [communityAdminMenu] = useCommunityAdminMenu();
  const [communityAdminGroups] = useCommunityGroups()
  const [addMenuFlag, setAddMenuFlag] = useState<boolean>(false);
  const [addChildMenuFlag, setAddChildMenuFlag] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<MenuItem>();
  const [addRow, setAddRow] = useState<any>({
    accessType: 'COMMUNITY_ALL_MEMBER',
    groupId: null,
    name: '',
    order: '',
    type: 'BASIC',
    surveyInformation: '',
  });
  const [nameValues, setNameValues] = useState<any[]>([]);
  const [deleteValues, setDeleteValues] = useState<any[]>([]);

  const onHandleClickTaskRow = useCallback(
    (e, param, type) => {
      setAddMenuFlag(false)
      e.persist(); 
      e.nativeEvent.stopImmediatePropagation();
      e.stopPropagation();
      if (type !== 'delete'){
        setSelectedRow(param)
        console.log('selectedRow', selectedRow)
      } else if(type === 'delete') {
        deleteValuesArr.push(param.id)
        setDeleteValues(deleteValuesArr)
        if (communityAdminMenu) {
          communityAdminMenu.menu.map((item: MenuItem, index: number) => {
            if(item.id === param.id) {
              communityAdminMenu.menu.splice(index, 1)
            }
          })
        }
        setCommunityAdminMenu({'menu': communityAdminMenu?.menu!});
      }
    },
    [communityAdminMenu]
  );

  const handleAddMenu = useCallback(() => {
    //선택된 row 초기화
    setSelectedRow({
      accessType: '',
      communityId: '',
      groupId: '',
      id: '',
      munuId: '',
      name: '',
      order: 0,
      parentId: '',
      patronKey: '',
      type: '',
      child: '',
      discussionTopic: '',
    })
    setAddMenuFlag(true);
    setAddChildMenuFlag(false);
    setAddRow({
      accessType: 'COMMUNITY_ALL_MEMBER',
      communityId: '',
      groupId: null,
      id: '',
      munuId: '',
      name: '',
      order: communityAdminMenu!.menu[communityAdminMenu!.menu.length-1].order + 1,
      parentId: '',
      patronKey: '',
      type: 'BASIC',
      child: '',
      discussionTopic: '',
      surveyCaseId: '',
      surveyId: '',
      surveyInformation: '',
    })
  }, [communityAdminMenu])

  const handleAddChildMenu = useCallback(() => {
    console.log('1111')
    console.log("selectedRow", selectedRow)
    if(selectedRow && selectedRow!.id) {
      setAddChildMenuFlag(true);
      setAddMenuFlag(false);
      setAddRow({
        accessType: 'COMMUNITY_ALL_MEMBER',
        communityId: '',
        groupId: null,
        id: '',
        munuId: '',
        name: '',
        order: communityAdminMenu!.menu[communityAdminMenu!.menu.length-1].order + 1,
        parentId: '',
        patronKey: '',
        type: 'BASIC',
        child: '',
        discussionTopic: '',
        surveyCaseId: '',
        surveyId: '',
        surveyInformation: '',
      })
    }else {
      alert('메뉴를 선택해주세요.')
    }
  }, [communityAdminMenu, selectedRow])

  const handleSave = useCallback(async (nameValues?, deleteValues?, type?) => {
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

      // 삭제한 메뉴있을시
      if(deleteValues.length !== 0) {
        deleteCommunityMenu(communityId, deleteValues)
      }
      if(result.length !== 0) {
        saveCommunityMenu(communityId, result)
      }
      setNameValues([])

      if(type === 'add') {
        addRow.order = communityAdminMenu!.menu[communityAdminMenu!.menu.length-1].order + 1
        addCommunityMenu(communityId, addRow).then((result)=> {
          requestCommunityMenu(communityId);
        })
      }
  }, [communityAdminMenu])

  const onChangeAddValue = useCallback((data, name)=> {
    addRow[name] = data[name]
    if(data[name] === 'COMMUNITY_GROUP' && name === 'accessType') {
      addRow.groupId = 0
      addRow.accessType = 'COMMUNITY_GROUP'
    }
    if(data[name] === 'COMMUNITY_ALL_MEMBER' && name === 'accessType') {
      addRow.groupId = null
      addRow.accessType = 'COMMUNITY_ALL_MEMBER'
    }
    setAddRow({...addRow})
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
    const ValuesArr = {'id': value.id, 'name': name, 'value': value[name]}
    nameValues.map((item: any, index: any) => {
      if(item.id === value.id && item.name === name) {
        nameValues.splice(index,1)
      }
    })
    setNameValues(nameValues)
    nameValuesArr.push(ValuesArr)
    setNameValues(nameValuesArr)
  }, [communityAdminMenu]);

  function changeValue(e: any) {
    const value = e.target.value;
    if(addRow) {
      addRow.name = value
    }
    onChangeAddValue(addRow, 'name')
  }

  function selectedRow1() {
    return {
      border: 'red'
    } as React.CSSProperties;
    
  }


  function renderMenuRow2(menu: MenuItem, handleClickTaskRow: any) {
    if (menu) {
      return (
        <>
          <ul>
            <li onClick={(e) => handleClickTaskRow(e, menu)}>
              <a>
                <img src={`${process.env.PUBLIC_URL}/images/all/icon-reply-16-px.svg`} />
                {menu.name}
                <span>
                  <img src={`${process.env.PUBLIC_URL}/images/all/btn-clear-nomal.svg`} />
                </span>
              </a>
            </li>
          </ul>
        </>
      )}
  }

  function renderMenuRow(menu: MenuItem, handleClickTaskRow: any) {

    let childElement = null;
    childElement = '<span></span>'
    // return ''
    if (menu) {
      return (
        <>
          <li onClick={(e) => handleClickTaskRow(e, menu, 'detail')} className={selectedRow && (menu.id === selectedRow.id) ? 'test' : 'ddd'}>
            <a>
              <img src={`${process.env.PUBLIC_URL}/images/all/icon-communtiy-menu-board.png`} />
              {menu.name}
              <span>
                <img onClick={(e)=>onHandleClickTaskRow(e, menu, 'delete')} src={`${process.env.PUBLIC_URL}/images/all/btn-clear-nomal.svg`} />
              </span>
            </a>
          </li>
          {menu.child !== undefined && 
            menu.child.map((item2: any, index2: any) => {
              return renderMenuRow2(item2, onHandleClickTaskRow);
            })
          }
          { addChildMenuFlag && selectedRow && (menu.id === selectedRow.id) && (
            <li>
              <input 
                type="text"
                placeholder="제목을 입력해주세요."
                value={addRow && addRow.name}
                onChange={changeValue}
              />
            </li>
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
              <button onClick={handleAddChildMenu}>하위 메뉴</button>
            </div>
            <ul>
              <li>
                <a>
                  <img src={`${process.env.PUBLIC_URL}/images/all/icon-communtiy-menu-home-off.png`} />
                  Home
                  <span>
                    <img src={`${process.env.PUBLIC_URL}/images/all/icon-required.png`} />
                  </span>
                </a>
              </li>
              <li>
                <a>
                  <img src={`${process.env.PUBLIC_URL}/images/all/icon-communtiy-menu-board.png`} />
                  전체글
                  <span>
                    <img src={`${process.env.PUBLIC_URL}/images/all/icon-required.png`} />
                  </span>
                </a>
              </li>
              <li>
                <a>
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
                  <input 
                    type="text"
                    placeholder="제목을 입력해주세요."
                    value={addRow && addRow.name}
                    onChange={changeValue}
                  />
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
          {selectedRow && communityAdminGroups && !addMenuFlag && !addChildMenuFlag && (
            <>
              <CommunityAdminMenuDetailView addMenuFlag={addMenuFlag} selectedRow={selectedRow} communityAdminGroups={communityAdminGroups} onChangeValue={(data, name) => onChangeValue(data, name)}/>
              <div className="admin_bottom_button line">
                <button className="ui button admin_table_button" onClick={() => handleSave(nameValues, deleteValues)}>저장</button>
              </div>
            </>
          )}
          {addMenuFlag && addRow && !addChildMenuFlag && (
            <>
              <span>메뉴추가</span>
              {/* <span>{addRow}</span> */}
              <CommunityAdminMenuAddView addMenuFlag={addMenuFlag} selectedRow={addRow} communityAdminGroups={communityAdminGroups} onChangeAddValue={(data, name) => onChangeAddValue(data, name)}/>
              <div className="admin_bottom_button line">
                <button className="ui button admin_table_button" onClick={() => handleSave(nameValues, deleteValues, 'add')}>저장</button>
              </div>
            </>
          )}
          {addChildMenuFlag && addRow && !addMenuFlag && (
            <>
              <span>하위메뉴추가</span>
              {/* <span>{addRow}</span> */}
              <CommunityAdminMenuAddView addChildMenuFlag={addChildMenuFlag} selectedRow={addRow} communityAdminGroups={communityAdminGroups} onChangeAddValue={(data, name) => onChangeAddValue(data, name)}/>
              <div className="admin_bottom_button line">
                <button className="ui button admin_table_button" onClick={() => handleSave(nameValues, deleteValues, 'add')}>저장</button>
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
