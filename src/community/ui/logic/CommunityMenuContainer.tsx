import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { MenuItem } from 'community/viewModel/CommunityAdminMenu';
import CommunityAdminMenuDetailView from '../view/CommunityAdminMenu/CommunityAdminMenuDetailView';
import { useCommunityAdminMenu } from 'community/service/useCommunityMenu/useCommunityMenu';
import { setCommunityAdminMenu } from 'community/store/CommunityAdminMenuStore';
import { useParams } from 'react-router-dom';
import { useCommunityGroups } from 'community/service/useCommunityMenu/useCommunityGroups';
import _ from 'lodash';
import { addCommunityDiscussion, addCommunityMenu, deleteCommunityMenu, requestCommunityMenu, saveCommunityMenu } from 'community/service/useCommunityMenu/requestCommunity';
import CommunityAdminMenuAddView from '../view/CommunityAdminMenu/CommunityAdminMenuAddView';
import { reactAlert } from '@nara.platform/accent';

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
    name: '',
    order: '',
    type: 'BASIC',
    surveyInformation: '',
    parentId: null
  });
  const [nameValues, setNameValues] = useState<any[]>([]);
  const [deleteValues, setDeleteValues] = useState<any[]>([]);

  useEffect(() => {
    if(communityId !== undefined) {
      handleAddMenu()
    }
  }, [communityId]);

  const onHandleClickTaskRow = useCallback(
    (e, param, type) => {
      setAddMenuFlag(false)
      e.persist(); 
      e.nativeEvent.stopImmediatePropagation();
      e.stopPropagation();
      if (type !== 'delete'){
        setSelectedRow(param)
        setAddChildMenuFlag(false)
      } else if(type === 'delete') {
        deleteValuesArr.push(param.id)
        setDeleteValues(deleteValuesArr)
        if (communityAdminMenu) {
          communityAdminMenu.menu.map((item: MenuItem, index: number) => {
            if(item.id === param.id) {
              communityAdminMenu.menu.splice(index, 1)
            }
            if(item.child) {
              item.child.map((item2: any, index2: number) => {
                if(item2.id === param.id) {
                  communityAdminMenu.menu[index].child.splice(index2, 1)
                }
              }) 
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
      surveyCaseId: '',
      surveyId: '',
      surveyInformation: '',
      url:'',
      html:'',
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
      order: communityAdminMenu ? (communityAdminMenu?.menu.length === 0 ? 1 : communityAdminMenu!.menu[communityAdminMenu!.menu.length-1].order + 1) : 1,
      parentId: null,
      patronKey: '',
      type: 'BASIC',
      child: '',
      discussionTopic: '',
      surveyCaseId: '',
      surveyId: '',
      surveyInformation: '',
      url:'',
      html:'',
    })
  }, [communityAdminMenu])

  const handleAddChildMenu = useCallback(() => {
    if(selectedRow && selectedRow!.id) {
      if(selectedRow.parentId) {
        return false
      }
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
        parentId: null,
        patronKey: '',
        type: 'BASIC',
        child: '',
        discussionTopic: '',
        surveyCaseId: '',
        surveyId: '',
        surveyInformation: '',
        html:''
      })
    }else {
      reactAlert({
        title: '',
        message:
          '메뉴를 선택해주세요.',
      });
      return false
    }

    if(!selectedRow!.child) {
      selectedRow!.child = []
    }
  }, [communityAdminMenu, selectedRow])

  const handleSave = useCallback(async (nameValues?, deleteValues?, type?, obj?) => {
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
        if(communityAdminMenu!.menu.length === 0) {
          obj.order = 1
        }else {
          obj.order = communityAdminMenu!.menu[communityAdminMenu!.menu.length-1].order + 1
        }
        if(obj.type === 'DISCUSSION') {
          addCommunityDiscussion(communityId, obj).then((result)=> {
            requestCommunityMenu(communityId);
          })
        } else {
          addCommunityMenu(communityId, obj).then((result)=> {
            requestCommunityMenu(communityId);
          })
        }
      } else if(type === 'childAdd') {
        obj.parentId = selectedRow!.id
        communityAdminMenu!.menu.map((item, index) => {
          if( selectedRow!.id === item.id) {
            if(item.child.length === 0) {
              obj.order = 1
            } else {
              obj.order = item.child.length + 1
            }
          }
        })
        if(obj.type === 'DISCUSSION') {
          addCommunityDiscussion(communityId, obj).then((result)=> {
            requestCommunityMenu(communityId);
          })
        } else {
          addCommunityMenu(communityId, obj).then((result)=> {
            requestCommunityMenu(communityId);
          })
        }
      }
      reactAlert({
        title: '',
        message:
          '저장되었습니다.',
      });
  }, [communityAdminMenu, selectedRow])

  const onChangeAddValue = useCallback((data, name, type?)=> {
    addRow[name] = data[name]
    if(data[name] === 'COMMUNITY_GROUP' && name === 'accessType') {
      addRow.groupId = 0
      addRow.accessType = 'COMMUNITY_GROUP'
    }
    if(data[name] === 'COMMUNITY_ALL_MEMBER' && name === 'accessType') {
      addRow.groupId = null
      addRow.accessType = 'COMMUNITY_ALL_MEMBER'
    }
    setAddRow({...data, [name]: data[name]})
  }, [])

  const onChangeValue = useCallback((value: any, name: string) => {
    if (communityAdminMenu) {
      communityAdminMenu.menu.map((item: MenuItem) => {
        if(item.id === value.id) {
          item = value
        }
      })
    }
    const ValuesArr = {'id': value.id, 'name': name, 'value': value[name]}

    nameValues.map((item: any, index: any) => {
      if(item.id === value.id && item.name === name) {
        nameValues.splice(index,1)
      }
    })
    setNameValues(nameValues)
    nameValuesArr.push(ValuesArr)
    setNameValues(nameValuesArr)

    setCommunityAdminMenu({'menu': communityAdminMenu?.menu!});

  }, [communityAdminMenu]);

  function changeValue(e: any) {
    const value = e.target.value;
    if(addRow) {
      addRow.name = value
    }
    onChangeAddValue(addRow, 'name')
  }

  function orderSort(menuArr: any) {
    menuArr.sort((a: any, b: any) => {
      if (a.order < b.order) {
        return -1;
      } else if (a.order > b.order) {
        return 1;
      } else {
        return 0;
      }
    })

    menuArr.map((item: any, index: number) => {
      if(item.child) {
        item.child.sort((a: any, b: any) => {
          if (a.order < b.order) {
            return -1;
          } else if (a.order > b.order) {
            return 1;
          } else {
            return 0;
          }
        })
      }
    })
    return menuArr
  }

  const handleDown = useCallback(() => {
    let nextValuesArr = {'id': '', 'name': '', 'value': 0}
    let parentIdx = 0
    let childIdx = 0

    //부모메뉴, 자식메뉴 구분
    if(selectedRow?.parentId){
      communityAdminMenu?.menu.map((parent, index)=> {
        if(parent.id === selectedRow?.parentId) {
          parentIdx = index
          //해당 부모메뉴
          parent.child.map((child: any, childIndex: number) => {
            if(child.id === selectedRow?.id) {
              childIdx = childIndex
              //최하위인경우 
              if(selectedRow!.order === parent.child.length) {
                return false
              }
            }
          })
        }
      })
      const originOrder = selectedRow!.order
      communityAdminMenu?.menu[parentIdx].child.map((item: any, index: number) => {
        if(item.order === selectedRow!.order + 1) {
          item.order = originOrder
          nextValuesArr = {'id': item.id, 'name': 'order', 'value': originOrder}
        }
      })

      selectedRow!.order = originOrder + 1

      const ValuesArr = {'id': selectedRow!.id, 'name': 'order', 'value': selectedRow!.order}

      nameValuesArr.map((item, index) => {
        if(item.id === ValuesArr.id && item.name === 'order') {
          nameValuesArr.splice(index,1)
        }
      })

      nameValuesArr.map((item, index) => {
        if(item.id === nextValuesArr.id && item.name === 'order') {
          nameValuesArr.splice(index,1)
        }
      })
      nameValuesArr.push(ValuesArr)
      nameValuesArr.push(nextValuesArr)
      setNameValues(nameValuesArr)
      const sortedData = orderSort(communityAdminMenu?.menu!)
      setCommunityAdminMenu({'menu': sortedData});
    } else {
      //최하위인경우 
      if(selectedRow!.order === communityAdminMenu?.menu.length) {
        return false
      }
      const originOrder = selectedRow!.order
      let nextValuesArr = {'id': '', 'name': '', 'value': 0}
      communityAdminMenu?.menu.map((item, index) => {
        if(item.order === selectedRow!.order + 1) {
          item.order = originOrder
          nextValuesArr = {'id': item.id, 'name': 'order', 'value': originOrder}
        }
      })
      selectedRow!.order = originOrder + 1

      const ValuesArr = {'id': selectedRow!.id, 'name': 'order', 'value': selectedRow!.order}

      nameValuesArr.map((item, index) => {
        if(item.id === ValuesArr.id && item.name === 'order') {
          nameValuesArr.splice(index,1)
        }
      })

      nameValuesArr.map((item, index) => {
        if(item.id === nextValuesArr.id && item.name === 'order') {
          nameValuesArr.splice(index,1)
        }
      })

      nameValuesArr.push(ValuesArr)
      nameValuesArr.push(nextValuesArr)

      setNameValues(nameValuesArr)
      const sortedData = orderSort(communityAdminMenu?.menu!)
      setCommunityAdminMenu({'menu': sortedData});
    }
  },[selectedRow])

  const handleUp = useCallback(() => {
    let nextValuesArr = {'id': '', 'name': '', 'value': 0}
    let parentIdx = 0
    let childIdx = 0
    let flag = true
    //부모메뉴, 자식메뉴 구분
    if(selectedRow?.parentId){
      communityAdminMenu?.menu.map((parent, index)=> {
        if(parent.id === selectedRow?.parentId) {
          parentIdx = index
          //해당 부모메뉴
          parent.child.map((child: any, childIndex: number) => {
            if(child.id === selectedRow?.id) {
              childIdx = childIndex
              //최상위인경우 
              if(selectedRow!.order <= 1) {
                flag = false
              }
            }
          })
        }
      })
      if(flag === true) {
        const originOrder = selectedRow!.order
        communityAdminMenu?.menu[parentIdx].child.map((item: any, index: number) => {
          if(item.order === selectedRow!.order - 1) {
            item.order = originOrder
            nextValuesArr = {'id': item.id, 'name': 'order', 'value': originOrder}
          }
        })
        selectedRow!.order = originOrder - 1
        const ValuesArr = {'id': selectedRow!.id, 'name': 'order', 'value': selectedRow!.order}

        nameValuesArr.map((item, index) => {
          if(item.id === ValuesArr.id && item.name === 'order') {
            nameValuesArr.splice(index,1)
          }
        })

        nameValuesArr.map((item, index) => {
          if(item.id === nextValuesArr.id && item.name === 'order') {
            nameValuesArr.splice(index,1)
          }
        })
        nameValuesArr.push(ValuesArr)
        nameValuesArr.push(nextValuesArr)

        setNameValues(nameValuesArr)
        const sortedData = orderSort(communityAdminMenu?.menu!)
        setCommunityAdminMenu({'menu': sortedData});
      }
    } else {
      //최상위인경우 
      if(selectedRow!.order === 1) {
        return false
      }
      const originOrder = selectedRow!.order

      //수동적으로 움직이게된 item
      let nextValuesObj = {'id': '', 'name': '', 'value': 0}
      communityAdminMenu?.menu.map((item, index) => {
        if(item.order === selectedRow!.order - 1) {
          item.order = originOrder
          nextValuesObj = {'id': item.id, 'name': 'order', 'value': originOrder}
        }
      })
      selectedRow!.order = originOrder - 1

      const ValuesObj = {'id': selectedRow!.id, 'name': 'order', 'value': selectedRow!.order}

      nameValuesArr.map((item, index) => {
        if(item.id === ValuesObj.id && item.name === 'order') {
          nameValuesArr.splice(index,1)
        }
      })

      nameValuesArr.map((item, index) => {
        if(item.id === nextValuesObj.id && item.name === 'order') {
          nameValuesArr.splice(index,1)
        }
      })

      nameValuesArr.push(ValuesObj)
      nameValuesArr.push(nextValuesObj)
      
      setNameValues(nameValuesArr)
      const sortedData = orderSort(communityAdminMenu?.menu!)
      setCommunityAdminMenu({'menu': sortedData});
      } 
  },[selectedRow])

  function renderMenuRow2(menu: MenuItem, handleClickTaskRow: any, parentIdx: number, childIdx: number) {
    if (menu) {
      return (
        <li key={parentIdx+'_'+childIdx} onClick={(e) => handleClickTaskRow(e, menu)} className={selectedRow && (menu.id === selectedRow.id) ? 'test' : 'ddd'}>
          <a>
            <img src={`${process.env.PUBLIC_URL}/images/all/icon-reply-16-px.svg`} />
            {menu.name}
            <span>
              <img onClick={(e)=>onHandleClickTaskRow(e, menu, 'delete')} src={`${process.env.PUBLIC_URL}/images/all/btn-clear-nomal.svg`} />
            </span>
          </a>
        </li>
      )}
  }

  function renderMenuRow(menu: MenuItem, handleClickTaskRow: any, index: number) {
    if (menu) {
      return (
        <Fragment key={index}>
          <li key={index+'_parent'} onClick={(e) => handleClickTaskRow(e, menu, 'detail')} className={selectedRow && (menu.id === selectedRow.id) ? 'active' : ''}>
            <a>
              <img src={`${process.env.PUBLIC_URL}/images/all/icon-communtiy-menu-board.png`} />
              {menu.name}
              <span>
                <img onClick={(e)=>onHandleClickTaskRow(e, menu, 'delete')} src={`${process.env.PUBLIC_URL}/images/all/btn-clear-nomal.svg`} />
              </span>
            </a>
          </li>
          {menu.child !== undefined && (
            <ul key={index+'child'}>
              { menu.child.map((item2: any, index2: any) => {
                  return renderMenuRow2(item2, onHandleClickTaskRow, index, index2);
                })
              }
              { addChildMenuFlag && selectedRow && (menu.id === selectedRow.id) && (
                <li>
                  <a>
                    <img src={`${process.env.PUBLIC_URL}/images/all/icon-reply-16-px.svg`} />
                    <input 
                      type="text"
                      placeholder="메뉴명을 입력하세요"
                      className="input_normal white width90"
                      value={addRow && addRow.name}
                      onChange={changeValue}
                    />
                  </a>
                </li>
              )}
            </ul>
          )}
        </Fragment>
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
              <button onClick={handleUp}>
                <img src={`${process.env.PUBLIC_URL}/images/all/icon-arrow-up-20-px.png`}/>
              </button>
              <button onClick={handleDown}>
                <img src={`${process.env.PUBLIC_URL}/images/all/icon-arrow-down-20-px.png`}/>
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
                return renderMenuRow(item, onHandleClickTaskRow, index);
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
              <CommunityAdminMenuAddView addMenuFlag={addMenuFlag} selectedRow={addRow} communityAdminGroups={communityAdminGroups} onChangeAddValue={(data, name) => onChangeAddValue(data, name, 'parent')}/>
              <div className="admin_bottom_button line">
                <button className="ui button admin_table_button" onClick={() => handleSave(nameValues, deleteValues, 'add', addRow)}>저장</button>
              </div>
            </>
          )}
          {addChildMenuFlag && addRow && !addMenuFlag && (
            <>
              <CommunityAdminMenuAddView addChildMenuFlag={addChildMenuFlag} selectedRow={addRow} communityAdminGroups={communityAdminGroups} onChangeAddValue={(data, name) => onChangeAddValue(data, name, 'child')}/>
              <div className="admin_bottom_button line">
                <button className="ui button admin_table_button" onClick={() => handleSave(nameValues, deleteValues, 'childAdd', addRow)}>저장</button>
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
