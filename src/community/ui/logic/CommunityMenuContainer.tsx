import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { MenuItem } from 'community/viewModel/CommunityAdminMenu';
import CommunityAdminMenuDetailView from '../view/CommunityAdminMenu/CommunityAdminMenuDetailView';
import { useCommunityAdminMenu } from 'community/service/useCommunityMenu/useCommunityMenu';
import { setCommunityAdminMenu } from 'community/store/CommunityAdminMenuStore';
import { useParams } from 'react-router-dom';
import { useCommunityGroups } from 'community/service/useCommunityMenu/useCommunityGroups';
import _ from 'lodash';
import { addCommunityDiscussion, addCommunityMenu, deleteCommunityMenu, requestCommunityMenu, requestCommunityMenuOrder, saveCommunitydiscussionMenu, saveCommunityMenu } from 'community/service/useCommunityMenu/requestCommunity';
import CommunityAdminMenuAddView from '../view/CommunityAdminMenu/CommunityAdminMenuAddView';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import discussionIcon from '../../../style/media/icon-communtiy-menu-discussion.png';
import htmlIcon from '../../../style/media/icon-community-menu-html.png';
import storeIcon from '../../../style/media/icon-communtiy-menu-download.png';
import surveyIcon from '../../../style/media/icon-communtiy-menu-survey.png';
import linkIcon from '../../../style/media/icon-community-menu-link.png';

interface RouteParams {
  communityId: string;
}

const nameValuesArr: any[] = []
const deleteValuesArr: any[] = []

function CommunityMenuContainer() {
  const { communityId } = useParams<RouteParams>();
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
    if (communityId !== undefined) {
      handleAddMenu()
    }
  }, [communityId]);

  const onHandleClickTaskRow = useCallback(
    (e, param, type) => {
      setAddMenuFlag(false)
      e.persist();
      e.nativeEvent.stopImmediatePropagation();
      e.stopPropagation();
      if (type !== 'delete') {
        setSelectedRow(param)
        setAddChildMenuFlag(false)
      } else if (type === 'delete') {

        reactConfirm({
          title: '알림',
          message: '메뉴 삭제 시 메뉴에 등록된 게시물도 전체 삭제됩니다.',
          onOk: async () => {
            deleteValuesArr.push(param.id)
            setDeleteValues(deleteValuesArr)
            if (communityAdminMenu) {
              communityAdminMenu.menu.map((item: MenuItem, index: number) => {
                if (item.id === param.id) {
                  communityAdminMenu.menu.splice(index, 1)
                }
                if (item.child) {
                  item.child.map((item2: any, index2: number) => {
                    if (item2.id === param.id) {
                      communityAdminMenu.menu[index].child.splice(index2, 1)
                    }
                  })
                }
              })
            }
            setCommunityAdminMenu({ 'menu': communityAdminMenu?.menu! });
          },
        });
      }
    },
    [communityAdminMenu]
  );

  const handleAddMenu = useCallback(() => {

    // 선택된 row 초기화
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
      url: '',
      html: '',
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
      order: communityAdminMenu ? (communityAdminMenu?.menu.length === 0 ? 1 : communityAdminMenu.menu.map(m => { return m.child ? m.child.length : 0 }).reduce((r, c) => r + c) + communityAdminMenu!.menu.length + 1) : 1,
      parentId: null,
      patronKey: '',
      type: 'BASIC',
      child: '',
      discussionTopic: '',
      surveyCaseId: '',
      surveyId: '',
      surveyInformation: '',
      url: '',
      html: '',
    })
  }, [communityAdminMenu])

  const handleAddChildMenu = useCallback(() => {
    if (selectedRow && selectedRow!.id) {
      if (selectedRow.parentId) {
        reactAlert({
          title: '',
          message:
            '상위 메뉴를 선택해주세요.',
        });
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
        order: communityAdminMenu && communityAdminMenu.menu.map(m => { return m.child ? m.child.length : 0 }).reduce((r, c) => r + c) + communityAdminMenu!.menu.length + 1,
        parentId: null,
        patronKey: '',
        type: 'BASIC',
        child: '',
        discussionTopic: '',
        surveyCaseId: '',
        surveyId: '',
        surveyInformation: '',
        html: ''
      })
    } else {
      reactAlert({
        title: '',
        message:
          '메뉴를 선택해주세요.',
      });
      return false
    }

    if (!selectedRow!.child) {
      selectedRow!.child = []
    }
  }, [communityAdminMenu, selectedRow])

  const confirmBlank = useCallback((obj) => {
    if (!obj.name) {
      if (obj.type === 'CATEGORY') {
        return "카테고리명을 입력해주세요."
      } else {
        return "메뉴명을 입력해주세요."
      }
    }
    if (obj.type === 'DISCUSSION') {
      if (!obj.discussionTopic) {
        return "주제를 입력해주세요."
      }
    }
    if (obj.accessType !== 'COMMUNITY_ALL_MEMBER') {
      if (obj.groupId === 0) {
        return "그룹을 지정해주세요"
      }
    }
    if (obj.type === 'LINK') {
      if (!obj.url) {
        return 'URL를 입력해주세요.'
      }
      if (
        !obj.url.includes('http://') &&
        !obj.url.includes('https://')
      ) {
        return '링크는 http:// 또는 https:// 으로 시작되어야 합니다.'
      }
    }
    if (obj.type === 'SURVEY') {
      if (!obj.surveyInformation) {
        return '설문 안내글을 입력해주세요.'
      }
      if (!obj.surveyId) {
        return 'survey를 추가해주세요.'
      }
    }
    if (obj.type === 'HTML') {
      if (!obj.html) {
        return "HTML를 입력해주세요."
      }
    }
    return 'success'
  }, [])

  const handleSave = useCallback(async (nameValues?, deleteValues?, type?, obj?) => {
    let successFlag = false
    const result =
      _.chain(nameValues)
        .groupBy('id')
        .map((v, i) => {
          return {
            'id': _.get(_.find(v, 'id'), 'id'),
            'order': _.get(_.find(v, 'order'), 'order'),
            'type': _.get(_.find(v, 'type'), 'type'),
            'nameValues':
              _.chain(v)
                .groupBy('name')
                .map((v, i) => {
                  return {
                    name: i,
                    value: _.get(_.find(v, 'value'), 'value')
                  }
                }).value()
          }
        })
        .orderBy(['id'])
        .value()

    // 삭제한 메뉴있을시
    if (deleteValues.length !== 0) {
      await deleteCommunityMenu(communityId, deleteValues)
      successFlag = true
    }
    if (result.length !== 0) {
      const editValidateCheck = result.map((item, index) => {
        return item.nameValues.map((item2, index2) => {
          if (item2.name === 'name') {
            if (!item2.value) {
              return {
                'state': false,
                'text': (item.order + 3) + "번째 메뉴의 " + (item.type === 'CATEGORY' ? '카테고리명' : '메뉴명') + "을 지정해주세요."
              }
            }
          }
          if (item2.name === 'groupId') {
            if (!item2.value) {
              return {
                'state': false,
                'text': (item.order + 3) + "번째 메뉴의 그룹을 지정해주세요."
              }
            }
          }
          if (item2.name === 'url') {
            if (!item2.value) {
              return (item.order + 3) + "번째 메뉴의 URL를 지정해주세요."
            } else if (
              !item2.value.includes('http://') &&
              !item2.value.includes('https://')
            ) {
              return {
                'state': false,
                'text': (item.order + 3) + "번째 메뉴의 링크는 http:// 또는 https:// 으로 시작되어야 합니다."
              }
            }
          }
          if (item2.name === 'discussionTopic') {
            if (!item2.value) {
              return {
                'state': false,
                'text': (item.order + 3) + "번째 메뉴의 토론 주제를 입력해주세요."
              }
            }
          }
          if (item2.name === 'surveyInformation') {
            if (!item2.value) {
              return {
                'state': false,
                'text': (item.order + 3) + "번째 메뉴의 설문 안내글을 입력해주세요"
              }
            }
          }
          if (item2.name === 'surveyId') {
            if (!item2.value) {
              return {
                'state': false,
                'text': (item.order + 3) + "번째 메뉴의 survey를 추가해주세요."
              }
            }
          }
          return {
            'state': true,
            'text': ''
          }
        })
      })
      let text = ''
      editValidateCheck.map((item) => {
        item.map((item2: any) => {
          if (item2.state === false) {
            text += item2.text + '</br>'
          }
        })
      })

      if (text !== '') {
        reactAlert({
          title: '',
          message: text,
        });
      } else {
        saveCommunityMenu(communityId, result, selectedRow)
        successFlag = true
      }
    }
    setNameValues([...nameValues, []])
    if (type === 'add') {
      if (communityAdminMenu!.menu.length === 0) {
        obj.order = 1
      } else {
        obj.order = communityAdminMenu && communityAdminMenu.menu.map(m => { return m.child ? m.child.length : 0 }).reduce((r, c) => r + c) + communityAdminMenu!.menu.length + 1
      }
      const validateCheck = confirmBlank(obj)
      if (validateCheck === 'success') {
        if (obj.type === 'DISCUSSION') {
          addCommunityDiscussion(communityId, obj).then((result) => {
            //오더정리
            requestCommunityMenu(communityId).then((result) => {
              requestCommunityMenuOrder(communityId);
              reactAlert({
                title: '',
                message:
                  '저장되었습니다.',
              });
            })
          })
        } else {
          addCommunityMenu(communityId, obj).then((result) => {
            //오더정리
            requestCommunityMenu(communityId).then((result) => {
              requestCommunityMenuOrder(communityId);
              reactAlert({
                title: '',
                message:
                  '저장되었습니다.',
              });
            })
          })
        }
      } else {
        reactAlert({
          title: '',
          message: validateCheck,
        });
      }
    } else if (type === 'childAdd') {
      obj.parentId = selectedRow!.id
      communityAdminMenu!.menu.map((item, index) => {
        if (selectedRow!.id === item.id) {
          if (item.child.length === 0) {
            obj.order = 1
          } else {
            obj.order = communityAdminMenu && communityAdminMenu.menu.map(m => { return m.child ? m.child.length : 0 }).reduce((r, c) => r + c) + communityAdminMenu!.menu.length + 1
          }
        }
      })
      const validateCheck = confirmBlank(obj)
      if (validateCheck === 'success') {
        if (obj.type === 'DISCUSSION') {
          addCommunityDiscussion(communityId, obj).then(() => {
            //오더정리
            requestCommunityMenuOrder(communityId).then(() => {
              requestCommunityMenu(communityId);
              reactAlert({
                title: '',
                message:
                  '저장되었습니다.',
              });
            })
          })
        } else {
          addCommunityMenu(communityId, obj).then((result) => {
            //오더정리
            requestCommunityMenuOrder(communityId).then(() => {
              requestCommunityMenu(communityId);
              reactAlert({
                title: '',
                message:
                  '저장되었습니다.',
              });
            })
          })
        }
      } else {
        reactAlert({
          title: '',
          message: validateCheck,
        });
      }
    } else {
      if (successFlag) {
        //오더정리
        requestCommunityMenuOrder(communityId).then((result) => {
          reactAlert({
            title: '',
            message:
              '저장되었습니다.',
          });
        })
      }
    }
  }, [communityAdminMenu, selectedRow])

  const onChangeAddValue = useCallback((data, name, type?) => {
    addRow[name] = data[name]
    if (data[name] === 'COMMUNITY_GROUP' && name === 'accessType') {
      addRow.groupId = 0
      addRow.accessType = 'COMMUNITY_GROUP'
    }
    if (data[name] === 'COMMUNITY_ALL_MEMBER' && name === 'accessType') {
      addRow.groupId = null
      addRow.accessType = 'COMMUNITY_ALL_MEMBER'
    }
    setAddRow({ ...data, [name]: data[name] })
  }, [])

  const onChangeValue = useCallback((value: any, name: string) => {
    if (communityAdminMenu) {
      communityAdminMenu.menu.map((item: MenuItem) => {
        if (item.id === value.id) {
          item = value
        }
      })
    }
    const ValuesArr = { 'id': value.id, 'name': name, 'value': value[name], 'order': value.order, 'type': value.type }

    nameValues.map((item: any, index: any) => {
      if (item.id === value.id && item.name === name) {
        nameValues.splice(index, 1)
      }
    })
    nameValuesArr.push(ValuesArr)
    setNameValues(nameValuesArr)

    setCommunityAdminMenu({ 'menu': communityAdminMenu?.menu! });

  }, [communityAdminMenu]);

  function changeValue(e: any) {
    const value = e.target.value;
    if (addRow) {
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
      if (item.child) {
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
console.log('1')
    if (!selectedRow) {
      return;
    }
    console.log('11')
    const originOrder = selectedRow.order;
    console.log(communityAdminMenu?.menu.filter((m) => {
      if (m.id === selectedRow?.parentId) {
        return m.child
      }
    //나보다 order가 큰게있다면 바꾼다
    })[0].child)
    const list = (selectedRow?.parentId ?
      //2뎁스
      communityAdminMenu?.menu.filter((m) => {
        if (m.id === selectedRow?.parentId) {
          return m.child
        }
      //나보다 order가 큰게있다면 바꾼다
      })[0].child.filter((c: any) => c.order > selectedRow.order).sort((a: any, b: any) => a.order - b.order) 
      :
      //1뎁스
      communityAdminMenu?.menu.filter((c) => c.parentId === null && c.order > selectedRow.order).sort((a, b) => a.order - b.order)
    )
  console.log('list', list)

    if (list && list.length === 0) {
      return;
    }
    console.log('111')
    const nextOrder = list[0].order;
    const ValuesArr = { 'id': selectedRow.id, 'name': 'order', 'value': list && list[0].order };
    const nextValuesArr = { 'id': list && list[0].id, 'name': 'order', 'value': selectedRow.order };

    const menu = list && (selectedRow?.parentId ? communityAdminMenu?.menu.filter((m) => {
      if (m.id === selectedRow?.parentId) {
        return m.child
      }
    })[0].child.map((m: any) => {
      if (m.id === list[0].id) {
        m.order = originOrder
      }

      if (m.id === selectedRow.id) {
        m.order = nextOrder
      }

      return m
    }) : communityAdminMenu?.menu.map((m) => {
      if (m.id === list[0].id) {
        m.order = originOrder
      }

      if (m.id === selectedRow.id) {
        m.order = nextOrder
      }

      return m
    }));
    console.log('1111')
    menu && setCommunityAdminMenu({ 'menu': menu });

    nameValuesArr.map((item, index) => {
      if (item.id === ValuesArr.id && item.name === 'order') {
        nameValuesArr.splice(index, 1)
      }
    })

    nameValuesArr.map((item, index) => {
      if (item.id === nextValuesArr.id && item.name === 'order') {
        nameValuesArr.splice(index, 1)
      }
    })

    console.log('끝')
    nameValuesArr.push(ValuesArr)
    console.log('ValuesArr', ValuesArr)
    nameValuesArr.push(nextValuesArr)
    console.log('nextValuesArr', nextValuesArr)

    setNameValues(nameValuesArr)
    const sortedData = orderSort(communityAdminMenu?.menu!)
    setCommunityAdminMenu({ 'menu': sortedData });

  }, [selectedRow])

  const handleUp = useCallback(() => {
    if (!selectedRow) {
      return;
    }

    const originOrder = selectedRow.order;

    const list = (selectedRow?.parentId ? communityAdminMenu?.menu.filter((m) => {
      if (m.id === selectedRow?.parentId) {
        return m.child
      }
    })[0].child.filter((c: any) => c.order < selectedRow.order)
      .sort((a: any, b: any) => a.order - b.order) :
      communityAdminMenu?.menu.filter((c) => c.parentId === null && c.order < selectedRow.order)
        .sort((a, b) => a.order - b.order)
    )

    if (list && list.length === 0) {
      return;
    }

    const nextOrder = list[list.length - 1].order;
    const ValuesArr = { 'id': selectedRow.id, 'name': 'order', 'value': list && list[list.length - 1].order };
    const nextValuesArr = { 'id': list && list[list.length - 1].id, 'name': 'order', 'value': selectedRow.order };

    const menu = list && (selectedRow?.parentId ? communityAdminMenu?.menu.filter((m) => {
      if (m.id === selectedRow?.parentId) {
        return m.child
      }
    })[0].child.map((m: any) => {
      if (m.id === list[list.length - 1].id) {
        m.order = originOrder
      }

      if (m.id === selectedRow.id) {
        m.order = nextOrder
      }

      return m
    }) : communityAdminMenu?.menu.map((m) => {
      if (m.id === list[list.length - 1].id) {
        m.order = originOrder
      }

      if (m.id === selectedRow.id) {
        m.order = nextOrder
      }

      return m
    }));

    menu && setCommunityAdminMenu({ 'menu': menu });

    nameValuesArr.map((item, index) => {
      if (item.id === ValuesArr.id && item.name === 'order') {
        nameValuesArr.splice(index, 1)
      }
    })

    nameValuesArr.map((item, index) => {
      if (item.id === nextValuesArr.id && item.name === 'order') {
        nameValuesArr.splice(index, 1)
      }
    })
    nameValuesArr.push(ValuesArr)
    nameValuesArr.push(nextValuesArr)

    setNameValues(nameValuesArr)
    const sortedData = orderSort(communityAdminMenu?.menu!)
    setCommunityAdminMenu({ 'menu': sortedData });
  }, [selectedRow])


  function imageHandle(type: string) {
    let nextIcon = `${process.env.PUBLIC_URL}/images/all/icon-communtiy-menu-board.png`;
    switch (type) {
      case 'DISCUSSION':
        nextIcon = discussionIcon;
        break;
      case 'STORE':
        nextIcon = storeIcon;
        break;
      case 'SURVEY':
        nextIcon = surveyIcon;
        break;
      case 'LINK':
        nextIcon = linkIcon;
        break;
      case 'HTML':
        nextIcon = htmlIcon;
        break;
      default:
        break;
    }
    return nextIcon;
  }

  function renderMenuRow2(menu: MenuItem, handleClickTaskRow: any, parentIdx: number, childIdx: number) {
    if (menu) {
      return (
        <li key={parentIdx + '_' + childIdx} onClick={(e) => handleClickTaskRow(e, menu)} className={selectedRow && (menu.id === selectedRow.id) ? 'active' : ''}>
          <a>
            <img src={`${process.env.PUBLIC_URL}/images/all/icon-reply-16-px.svg`} />
            <img src={imageHandle(menu.type)} />
            {menu.name}
            <span>
              <img onClick={(e) => onHandleClickTaskRow(e, menu, 'delete')} src={`${process.env.PUBLIC_URL}/images/all/btn-clear-nomal.svg`} />
            </span>
          </a>
        </li>
      )
    }
  }

  function renderMenuRow(menu: MenuItem, handleClickTaskRow: any, index: number) {
    if (menu) {
      return (
        <Fragment key={index}>
          <li key={index + '_parent'} onClick={(e) => handleClickTaskRow(e, menu, 'detail')} className={selectedRow && (menu.id === selectedRow.id) ? 'active' : ''}>
            <a>
              <img src={imageHandle(menu.type)} />
              {menu.name}
              <span>
                <img onClick={(e) => onHandleClickTaskRow(e, menu, 'delete')} src={`${process.env.PUBLIC_URL}/images/all/btn-clear-nomal.svg`} />
              </span>
            </a>
          </li>
          {menu.child !== undefined && (
            <ul key={index + 'child'}>
              {menu.child.map((item2: any, index2: any) => {
                return renderMenuRow2(item2, onHandleClickTaskRow, index, index2);
              })
              }
              {addChildMenuFlag && selectedRow && (menu.id === selectedRow.id) && (
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
              ㆍ <strong>Home, 전체 글, 공지사항</strong> 메뉴는 편집 및 삭제가 불가합니다.
            </p>
          </div>
          <div className="admin_menu_wrap">
            <div className="admin_menu_left">
              <div className="menu_left_contents">
                <div className="menu_left_btn">
                  <button onClick={handleUp}>
                    <img src={`${process.env.PUBLIC_URL}/images/all/icon-arrow-up-20-px.png`} />
                  </button>
                  <button onClick={handleDown}>
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
                    return renderMenuRow(item, onHandleClickTaskRow, index);
                  })}
                  {addMenuFlag && (
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
                  <CommunityAdminMenuDetailView addMenuFlag={addMenuFlag} selectedRow={selectedRow} communityAdminGroups={communityAdminGroups} onChangeValue={(data, name) => onChangeValue(data, name)} />
                  <div className="admin_bottom_button line">
                    <button className="ui button admin_table_button" onClick={() => handleSave(nameValues, deleteValues)}>저장</button>
                  </div>
                </>
              )}
              {addMenuFlag && addRow && !addChildMenuFlag && (
                <>
                  <CommunityAdminMenuAddView addMenuFlag={addMenuFlag} selectedRow={addRow} communityAdminGroups={communityAdminGroups} onChangeAddValue={(data, name) => onChangeAddValue(data, name, 'parent')} />
                  <div className="admin_bottom_button line">
                    <button className="ui button admin_table_button" onClick={() => handleSave(nameValues, deleteValues, 'add', addRow)}>저장</button>
                  </div>
                </>
              )}
              {addChildMenuFlag && addRow && !addMenuFlag && (
                <>
                  <CommunityAdminMenuAddView addChildMenuFlag={addChildMenuFlag} selectedRow={addRow} communityAdminGroups={communityAdminGroups} onChangeAddValue={(data, name) => onChangeAddValue(data, name, 'child')} />
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
