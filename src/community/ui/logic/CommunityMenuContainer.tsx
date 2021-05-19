import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { MenuItem } from 'community/viewModel/CommunityAdminMenu';
import CommunityAdminMenuDetailView from '../view/CommunityAdminMenu/CommunityAdminMenuDetailView';
import { useCommunityAdminMenu } from 'community/service/useCommunityMenu/useCommunityMenu';
import { getCommunityAdminMenu, setCommunityAdminMenu } from 'community/store/CommunityAdminMenuStore';
import { useParams } from 'react-router-dom';
import { useCommunityGroups } from 'community/service/useCommunityMenu/useCommunityGroups';
import _ from 'lodash';
import {
  addCommunityDiscussion,
  addCommunityMenu,
  deleteCommunityMenu,
  requestCommunityMenu,
  requestCommunityMenuOrder,
  saveCommunitydiscussionMenu,
  saveCommunityMenu,
} from 'community/service/useCommunityMenu/requestCommunity';
import CommunityAdminMenuAddView from '../view/CommunityAdminMenu/CommunityAdminMenuAddView';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import discussionIcon from '../../../style/media/icon-communtiy-menu-discussion.png';
import htmlIcon from '../../../style/media/icon-community-menu-html.png';
import storeIcon from '../../../style/media/icon-communtiy-menu-download.png';
import surveyIcon from '../../../style/media/icon-communtiy-menu-survey.png';
import linkIcon from '../../../style/media/icon-community-menu-link.png';
import { findCommunityMenuDetail } from '../../api/CommunityMenuApi';
import {
  CommunityDiscussion,
  getEmptyCommunityDiscussion,
} from '../../model/CommunityDiscussion';
import {
  findAllMenus,
  findMenuDiscussionFeedBack,
  findPostMenuDiscussion,
} from '../../api/communityApi';
import { findFeedbackMenu } from '../../../lecture/detail/api/feedbackApi';

interface RouteParams {
  communityId: string;
}

let nameValuesArr: any[] = [];
let deleteValuesArr: any[] = [];

function CommunityMenuContainer() {
  const { communityId } = useParams<RouteParams>();
  const [communityAdminMenu] = useCommunityAdminMenu();
  const [communityAdminGroups] = useCommunityGroups();
  const [addMenuFlag, setAddMenuFlag] = useState<boolean>(false);
  const [addChildMenuFlag, setAddChildMenuFlag] = useState<boolean>(false);
  const [discussRow, setDiscussRow] = useState<CommunityDiscussion>();
  const [selectedRow, setSelectedRow] = useState<MenuItem>();
  const [addRow, setAddRow] = useState<any>({
    accessType: 'COMMUNITY_ALL_MEMBER',
    name: '',
    order: '',
    type: 'BASIC',
    surveyInformation: '',
    parentId: null,
  });
  const [nameValues, setNameValues] = useState<any[]>([]);
  const [deleteValues, setDeleteValues] = useState<any[]>([]);
  const [privateCommentState, setPrivateCommentState] = useState<boolean>(
    false
  );

  useEffect(() => {
    if (communityId !== undefined) {
      handleAddMenu();
    }
  }, [communityId]);

  const onHandleClickTaskRow = useCallback(
    async (e, param, type) => {
      setAddMenuFlag(false);
      e.persist();
      e.nativeEvent.stopImmediatePropagation();
      e.stopPropagation();
      if (type !== 'delete') {
        setDiscussRow(getEmptyCommunityDiscussion());
        if (param.type === 'DISCUSSION' || param.type === 'ANODISCUSSION') {
          const discussionParams = await findPostMenuDiscussion(
            param.menuId
          ).then(res => res);
          if (discussionParams) {

            //메뉴데이터
            const menuData = getCommunityAdminMenu()
            if(menuData) {
              menuData.menu.map((item, index) => {
                if(item.id === param.id) {
                  menuData.menu[index].type = discussionParams.type
                  menuData.menu[index].content = discussionParams.content
                  menuData.menu[index].relatedUrlList = discussionParams.relatedUrlList
                  menuData.menu[index].fileBoxId = discussionParams.fileBoxId
                  menuData.menu[index].privateComment = discussionParams.privateComment
                }
              })
            }
            setCommunityAdminMenu({ menu: menuData!.menu })
            findMenuDiscussionFeedBack(discussionParams.commentFeedbackId).then(
              findPrivateState => {
                if (findPrivateState !== null) {
                  setDiscussRow({
                    content: discussionParams.content,
                    privateComment:
                      findPrivateState.config.privateComment === undefined
                        ? false
                        : findPrivateState?.config.privateComment,
                    relatedUrlList: discussionParams.relatedUrlList
                      ? discussionParams.relatedUrlList
                      : [{ title: '', url: '' }],
                    fileBoxId: discussionParams.fileBoxId,
                  });
                }
              }
            );
            setSelectedRow(param);
          }
        } else {
          setSelectedRow(param);
          setAddChildMenuFlag(false);
        }
        //
      } else if (type === 'delete') {
        reactConfirm({
          title: '알림',
          message: '메뉴 삭제 시 메뉴에 등록된 게시물도 전체 삭제됩니다.',
          onOk: async () => {
            deleteValuesArr.push(param.id);
            setDeleteValues(deleteValuesArr);
            if (communityAdminMenu) {
              communityAdminMenu.menu.map((item: MenuItem, index: number) => {
                if (item.id === param.id) {
                  communityAdminMenu.menu.splice(index, 1);
                }
                if (item.child) {
                  item.child.map((item2: any, index2: number) => {
                    if (item2.id === param.id) {
                      communityAdminMenu.menu[index].child.splice(index2, 1);
                    }
                  });
                }
              });
            }
            setCommunityAdminMenu({ menu: communityAdminMenu?.menu! });
          },
        });
      }
    },
    [communityAdminMenu, discussRow, selectedRow]
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
      content: '',
      relatedUrlList: [{ title: '', url: '' }],
    });
    setAddMenuFlag(true);
    setAddChildMenuFlag(false);
    setAddRow({
      accessType: 'COMMUNITY_ALL_MEMBER',
      communityId: '',
      groupId: null,
      id: '',
      munuId: '',
      name: '',
      order: communityAdminMenu
        ? communityAdminMenu?.menu.length === 0
          ? 1
          : communityAdminMenu.menu
              .map(m => {
                return m.child ? m.child.length : 0;
              })
              .reduce((r, c) => r + c) +
            communityAdminMenu!.menu.length +
            1
        : 1,
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
      content: '',
      relatedUrlList: [{ title: '', url: '' }],
    });
    setDiscussRow({
      content: '',
      privateComment: false,
      relatedUrlList: [{ title: '', url: '' }],
      fileBoxId: '',
    });
    setNameValues([]);
    nameValuesArr = [];

    setDeleteValues([]);
    deleteValuesArr = [];
  }, [communityAdminMenu]);

  const handleAddChildMenu = useCallback(() => {
    if (selectedRow && selectedRow!.id) {
      if (selectedRow.parentId) {
        reactAlert({
          title: '',
          message: '상위 메뉴를 선택해주세요.',
        });
        return false;
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
        order:
          communityAdminMenu &&
          communityAdminMenu.menu
            .map(m => {
              return m.child ? m.child.length : 0;
            })
            .reduce((r, c) => r + c) +
            communityAdminMenu!.menu.length +
            1,
        parentId: null,
        patronKey: '',
        type: 'BASIC',
        child: '',
        discussionTopic: '',
        surveyCaseId: '',
        surveyId: '',
        surveyInformation: '',
        html: '',
        content: '',
        relatedUrlList: [{ title: '', url: '' }],
      });
      setDiscussRow({
        content: '',
        privateComment: false,
        relatedUrlList: [{ title: '', url: '' }],
        fileBoxId: '',
      });
    } else {
      reactAlert({
        title: '',
        message: '메뉴를 선택해주세요.',
      });
      return false;
    }

    if (!selectedRow!.child) {
      selectedRow!.child = [];
    }
    setNameValues([]);
    nameValuesArr = [];

    setDeleteValues([]);
    deleteValuesArr = [];
  }, [communityAdminMenu, selectedRow]);

  const confirmBlank = useCallback(obj => {
    if (!obj.name) {
      if (obj.type === 'CATEGORY') {
        return '카테고리명을 입력해주세요.';
      } else {
        return '메뉴명을 입력해주세요.';
      }
    }
    if (obj.type === 'DISCUSSION') {
      if (!obj.discussionTopic) {
        return '주제를 입력해주세요.';
      }
    }
    if (obj.accessType !== 'COMMUNITY_ALL_MEMBER') {
      if (obj.groupId === 0) {
        return '그룹을 지정해주세요';
      }
    }
    if (obj.type === 'LINK') {
      if (!obj.url) {
        return 'URL를 입력해주세요.';
      }
      if (!obj.url.includes('http://') && !obj.url.includes('https://')) {
        return '링크는 http:// 또는 https:// 으로 시작되어야 합니다.';
      }
    }
    if (obj.type === 'SURVEY') {
      if (!obj.surveyInformation) {
        return '설문 안내글을 입력해주세요.';
      }
      if (!obj.surveyId) {
        return 'survey를 추가해주세요.';
      }
    }
    if (obj.type === 'HTML') {
      if (!obj.html) {
        return 'HTML를 입력해주세요.';
      }
    }
    return 'success';
  }, []);

  const handleSave = useCallback(
    async (nameValues?, deleteValues?, type?, obj?) => {
      let successFlag = false;
      const result = _.chain(nameValues)
        .groupBy('id')
        .map((v, i) => {
          return {
            id: _.get(_.find(v, 'id'), 'id'),
            order: _.get(_.find(v, 'order'), 'order'),
            type: _.get(_.find(v, 'type'), 'type'),
            nameValues: _.chain(v)
              .groupBy('name')
              .map((v, i) => {
                return {
                  name: i,
                  value: _.get(_.find(v, 'value'), 'value'),
                };
              })
              .value(),
          };
        })
        .orderBy(['id'])
        .value();

      // 삭제한 메뉴있을시
      if (deleteValues.length !== 0) {
        await deleteCommunityMenu(communityId, deleteValues);
        successFlag = true;
      }

      // discussion Check
      if (discussRow && discussRow.relatedUrlList) {
        const urlValue = discussRow.relatedUrlList.map((row, index) => {
          // if (row.title === '') {
          //   reactAlert({
          //     title: '',
          //     message: `관련 URL의 ${index + 1}번째 타이틀 지정해주세요.`,
          //   });
          //   return false;
          // }

          // if (row.url === '') {
          //   reactAlert({
          //     title: '',
          //     message: `관련 URL의 ${index + 1}번째 URL를 지정해주세요.`,
          //   });
          //   return false;
          // }

          if (
            row.url !== '' &&
            !row.url.includes('http://') &&
            !row.url.includes('https://')
          ) {
            reactAlert({
              title: '',
              message: `관련 URL의 링크는 http:// 또는 https:// 으로 시작되어야 합니다.`,
            });
            return false;
          }
          return row;
        });

        if (urlValue.includes(false)) {
          return;
        }
      }

      if (result.length !== 0) {
        const editValidateCheck = result.map((item, index) => {
          return item.nameValues.map((item2, index2) => {
            if (item2.name === 'name') {
              if (!item2.value) {
                return {
                  state: false,
                  text:
                    item.order +
                    3 +
                    '번째 메뉴의 ' +
                    (item.type === 'CATEGORY' ? '카테고리명' : '메뉴명') +
                    '을 지정해주세요.',
                };
              }
            }
            if (item2.name === 'groupId') {
              if (!item2.value) {
                return {
                  state: false,
                  text: item.order + 3 + '번째 메뉴의 그룹을 지정해주세요.',
                };
              }
            }
            if (item2.name === 'url') {
              if (!item2.value) {
                return item.order + 3 + '번째 메뉴의 URL를 지정해주세요.';
              } else if (
                !item2.value.includes('http://') &&
                !item2.value.includes('https://')
              ) {
                return {
                  state: false,
                  text:
                    item.order +
                    3 +
                    '번째 메뉴의 링크는 http:// 또는 https:// 으로 시작되어야 합니다.',
                };
              }
            }
            if (item2.name === 'discussionTopic') {
              if (!item2.value) {
                return {
                  state: false,
                  text:
                    item.order + 3 + '번째 메뉴의 토론 주제를 입력해주세요.',
                };
              }
            }
            if (item2.name === 'surveyInformation') {
              if (!item2.value) {
                return {
                  state: false,
                  text:
                    item.order + 3 + '번째 메뉴의 설문 안내글을 입력해주세요',
                };
              }
            }
            if (item2.name === 'surveyId') {
              if (!item2.value) {
                return {
                  state: false,
                  text: item.order + 3 + '번째 메뉴의 survey를 추가해주세요.',
                };
              }
            }
            return {
              state: true,
              text: '',
            };
          });
        });
        let text = '';
        editValidateCheck.map(item => {
          item.map((item2: any) => {
            if (item2.state === false) {
              text += item2.text + '</br>';
            }
          });
        });
        if (text !== '') {
          reactAlert({
            title: '',
            message: text,
          });
        } else {
          saveCommunityMenu(communityId, result, selectedRow, discussRow);
          successFlag = true;
        }
        // setNameValues([])
        // nameValuesArr = []
      }
      if (type === 'add') {
        if (communityAdminMenu!.menu.length === 0) {
          obj.order = 1;
        } else {
          obj.order =
            communityAdminMenu &&
            communityAdminMenu.menu
              .map(m => {
                return m.child ? m.child.length : 0;
              })
              .reduce((r, c) => r + c) +
              communityAdminMenu!.menu.length +
              1;
        }
        const validateCheck = confirmBlank(obj);
        if (validateCheck === 'success') {
          if (obj.type === 'DISCUSSION' || obj.type === 'ANODISCUSSION') {
            const discusstionParams = {
              accessType: obj.accessType,
              order: obj.order,
              discussionTopic: obj.discussionTopic,
              type: obj.type,
              name: obj.name,
              ...discussRow,
            };
            addCommunityDiscussion(communityId, discusstionParams).then(
              result => {
                //오더정리
                requestCommunityMenu(communityId).then(result => {
                  requestCommunityMenuOrder(communityId);
                  reactAlert({
                    title: '',
                    message: '저장되었습니다.',
                  });
                });
              }
            );
          } else {
            addCommunityMenu(communityId, obj).then(() => {
              //오더정리

              requestCommunityMenu(communityId).then(() => {
                requestCommunityMenuOrder(communityId);
                reactAlert({
                  title: '',
                  message: '저장되었습니다.',
                });
              });
            });
          }
          //입력 항목 초기화
          handleAddMenu();
        } else {
          reactAlert({
            title: '',
            message: validateCheck,
          });
        }
      } else if (type === 'childAdd') {
        obj.parentId = selectedRow!.id;
        communityAdminMenu!.menu.map((item, index) => {
          if (selectedRow!.id === item.id) {
            if (item.child.length === 0) {
              obj.order = 1;
            } else {
              obj.order =
                communityAdminMenu &&
                communityAdminMenu.menu
                  .map(m => {
                    return m.child ? m.child.length : 0;
                  })
                  .reduce((r, c) => r + c) +
                  communityAdminMenu!.menu.length +
                  1;
            }
          }
        });
        const validateCheck = confirmBlank(obj);
        if (validateCheck === 'success') {
          if (obj.type === 'DISCUSSION' || obj.type === 'ANODISCUSSION') {
            addCommunityDiscussion(communityId, obj).then(() => {
              requestCommunityMenu(communityId).then(() => {
                requestCommunityMenuOrder(communityId);
                reactAlert({
                  title: '',
                  message: '저장되었습니다.',
                });
              });
            });
          } else {
            addCommunityMenu(communityId, obj).then(result => {
              requestCommunityMenu(communityId).then(() => {
                requestCommunityMenuOrder(communityId);
                reactAlert({
                  title: '',
                  message: '저장되었습니다.',
                });
              });
            });
          }
          //입력 항목 초기화
          handleAddChildMenu();
        } else {
          reactAlert({
            title: '',
            message: validateCheck,
          });
        }
      } else {
        if (successFlag) {
          setTimeout(() => {
            requestCommunityMenuOrder(communityId).then(() => {
              reactAlert({
                title: '',
                message: '저장되었습니다.',
                onClose: () => findAllMenus(communityId),
              });
              setNameValues([]);
              nameValuesArr = [];

              setDeleteValues([]);
              deleteValuesArr = [];
            });
          }, 500);
        }
      }
    },
    [communityAdminMenu, selectedRow, discussRow]
  );

  const onChangeDiscussValue = useCallback(
    (value, type, currentIndex?) => {
      if (discussRow) {
        if (type === 'content') {
          // editor state
          setDiscussRow({ ...discussRow, [type]: value });
          onChangeValue(selectedRow, 'content')
        }

        if (type === 'urlValue') {
          discussRow.relatedUrlList[currentIndex].url = value;
          setDiscussRow({
            ...discussRow,
            relatedUrlList: [...discussRow.relatedUrlList],
          });
          onChangeValue(selectedRow, 'urlValue')
        }

        if (type === 'urlTitle') {
          discussRow.relatedUrlList[currentIndex].title = value;
          setDiscussRow({
            ...discussRow,
            relatedUrlList: [...discussRow.relatedUrlList],
          });
          onChangeValue(selectedRow, 'urlTitle')
        }

        if (type === 'urlDelete') {
          setDiscussRow({
            ...discussRow,
            relatedUrlList: value,
          });
          if(selectedRow){
            selectedRow.relatedUrlList = value
          }
          onChangeValue(selectedRow, 'urlDelete')
        }

        if (type === 'privateComment') {
          setDiscussRow({ ...discussRow, privateComment: value });
          onChangeValue(selectedRow, 'privateComment')
        }

        if (type === 'accessType') {
          setDiscussRow({ ...discussRow, accessType: value });
        }

        if (type === 'group') {
          setDiscussRow({
            ...discussRow,
            groupId: value === null ? '' : value,
          });
        }
      }
    },
    [discussRow, selectedRow]
  );

  const onAddUrlsList = useCallback(() => {
    if (discussRow) {
      const newUrlsList = discussRow.relatedUrlList.concat({
        title: '',
        url: '',
      });
      setDiscussRow({ ...discussRow, relatedUrlList: newUrlsList });
    }
  }, [discussRow]);

  const onDeleteUrlsList = useCallback(
    (currentIndex: number) => {
      if (discussRow && discussRow.relatedUrlList.length === 1) {
        return;
      }

      if (discussRow) {
        const filteredUrlsList = discussRow.relatedUrlList.filter(
          (url, index) => index !== currentIndex
        );
        onChangeDiscussValue(filteredUrlsList, 'urlDelete')
      }
    },
    [discussRow]
  );

  const onAddFileBoxId = useCallback(
    (depotId: string) => {
      if (discussRow) {
        setDiscussRow({ ...discussRow, fileBoxId: depotId });
      }
    },
    [discussRow]
  );

  const onChangeAddValue = useCallback(
    (data, name, type?) => {
      addRow[name] = data[name];
      if (data[name] === 'COMMUNITY_GROUP' && name === 'accessType') {
        addRow.groupId = data.groupId;
        addRow.accessType = 'COMMUNITY_GROUP';
      }
      if (data[name] === 'COMMUNITY_ALL_MEMBER' && name === 'accessType') {
        addRow.groupId = null;
        addRow.accessType = 'COMMUNITY_ALL_MEMBER';
      }
      setAddRow({ ...data, [name]: data[name] });
      if (discussRow) {
        setDiscussRow({ ...discussRow, groupId: data.groupId });
      }
    },
    [addRow]
  );

  const onChangeValue = useCallback(
    (value: any, nameValue: string) => {
      if (communityAdminMenu) {
        communityAdminMenu.menu.map((item: MenuItem) => {
          if (item.id === value.id) {
            item = value;
          }
        });
      }
      const ValuesArr = {
        id: value.id,
        name: nameValue,
        value: value[nameValue],
        order: value.order,
        type: value.type,
      };

      nameValues.map((item: any, index: any) => {
        if (item.id === value.id && item.name === nameValue) {
          nameValues.splice(index, 1);
        }
      });
      nameValuesArr.push(ValuesArr);
      setNameValues(nameValuesArr);

      setCommunityAdminMenu({ menu: communityAdminMenu?.menu! });
    },
    [communityAdminMenu]
  );

  function changeValue(e: any) {
    const value = e.target.value;
    if (addRow) {
      addRow.name = value;
    }
    onChangeAddValue(addRow, 'name');
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
    });

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
        });
      }
    });
    return menuArr;
  }

  const handleDown = useCallback(() => {
    if (!selectedRow) {
      return;
    }
    const originOrder = selectedRow.order;
    const list = selectedRow?.parentId
      ? communityAdminMenu?.menu
          .filter(m => {
            if (m.id === selectedRow?.parentId) {
              return m.child;
            }
          })[0]
          .child.filter((c: any) => c.order > selectedRow.order)
          .sort((a: any, b: any) => a.order - b.order)
      : communityAdminMenu?.menu
          .filter(c => c.parentId === null && c.order > selectedRow.order)
          .sort((a, b) => a.order - b.order);

    let currentIdx: number = 0;
    if (list && list.length === 0) {
      //2뎁스 속해있는 마지막 메뉴가 아닌경우는 변경 못하도록
      if (selectedRow.parentId) {
        let nextIdx = 0; //다음 부모 메뉴
        communityAdminMenu?.menu.filter((item: any, index: number) => {
          if (selectedRow.parentId === item.id) {
            nextIdx = index + 1;
            currentIdx = index;
          }
        });
        //다음 부모 메뉴가 존재
        if (communityAdminMenu?.menu[nextIdx]) {
          if (communityAdminMenu.menu[nextIdx].child) {
            selectedRow.order = 1;
          } else {
            selectedRow.order = 1;
            communityAdminMenu.menu[nextIdx].child = [];
          }
          selectedRow.parentId = communityAdminMenu?.menu[nextIdx].id;
          communityAdminMenu?.menu[nextIdx].child.push(selectedRow);
          const test = communityAdminMenu?.menu[currentIdx].child.findIndex(
            (item: any) => {
              return item.id === selectedRow.id;
            }
          );

          if (test > -1) {
            communityAdminMenu?.menu[currentIdx].child.splice(test, 1);
          }

          const sortedData = orderSort(communityAdminMenu?.menu!);
          setCommunityAdminMenu({ menu: sortedData });
          nameValuesArr.push({
            id: selectedRow.id,
            name: 'parentId',
            value: selectedRow.parentId,
          });
          communityAdminMenu.menu.map((item, index) => {
            if (item.child) {
              item.child.map((item2: any, index2: any) => {
                if (item2.parentId === selectedRow.parentId) {
                  const add = item2.order + 1;

                  const orderFlag: boolean[] = [];
                  const parentFlag: boolean[] = [];
                  nameValuesArr.map((item, index) => {
                    if (item.id === item2.id && item.name === 'order') {
                      item.value = add;
                      orderFlag.push(true);
                    }

                    if (item.id === item2.id && item.name === 'parentId') {
                      item.value = item2.parentId;
                      parentFlag.push(true);
                    }
                  });

                  if (orderFlag.indexOf(true) === -1) {
                    nameValuesArr.push({
                      id: selectedRow.id,
                      name: 'order',
                      value: add,
                    });
                  }

                  if (parentFlag.indexOf(true) === -1) {
                    nameValuesArr.push({
                      id: selectedRow.id,
                      name: 'parentId',
                      value: item2.parentId,
                    });
                  }
                  communityAdminMenu.menu[index].child[index2].order = add;
                }
              });
            }
          });
          setNameValues(nameValuesArr);
        }
        return;
      } else {
        return;
      }
    }
    const nextOrder = list[0].order;
    const ValuesArr = {
      id: selectedRow.id,
      name: 'order',
      value: list && list[0].order,
    };
    const nextValuesArr = {
      id: list && list[0].id,
      name: 'order',
      value: selectedRow.order,
    };

    const menuValue =
      list &&
      (selectedRow?.parentId
        ? communityAdminMenu?.menu
            .filter(m => {
              if (m.id === selectedRow?.parentId) {
                return m.child;
              }
            })[0]
            .child.map((m: any) => {
              if (m.id === list[0].id) {
                m.order = originOrder;
              }

              if (m.id === selectedRow.id) {
                m.order = nextOrder;
              }

              return m;
            })
        : communityAdminMenu?.menu.map(m => {
            if (m.id === list[0].id) {
              m.order = originOrder;
            }

            if (m.id === selectedRow.id) {
              m.order = nextOrder;
            }

            return m;
          }));
    menuValue && setCommunityAdminMenu({ menu: menuValue });

    nameValuesArr.map((item, index) => {
      if (item.id === ValuesArr.id && item.name === 'order') {
        nameValuesArr.splice(index, 1);
      }
    });

    nameValuesArr.map((item, index) => {
      if (item.id === nextValuesArr.id && item.name === 'order') {
        nameValuesArr.splice(index, 1);
      }
    });

    nameValuesArr.push(ValuesArr);
    nameValuesArr.push(nextValuesArr);

    setNameValues(nameValuesArr);
    const sortedData = orderSort(communityAdminMenu?.menu!);
    setCommunityAdminMenu({ menu: sortedData });
  }, [selectedRow]);

  const handleUp = useCallback(() => {
    if (!selectedRow) {
      return;
    }

    const originOrder = selectedRow.order;

    const list = selectedRow?.parentId
      ? communityAdminMenu?.menu
          .filter(m => {
            if (m.id === selectedRow?.parentId) {
              return m.child;
            }
          })[0]
          .child.filter((c: any) => c.order < selectedRow.order)
          .sort((a: any, b: any) => a.order - b.order)
      : communityAdminMenu?.menu
          .filter(c => c.parentId === null && c.order < selectedRow.order)
          .sort((a, b) => a.order - b.order);

    let currentIdx: number = 0;

    if (list && list.length === 0) {
      if (selectedRow.parentId) {
        let nextIdx = 0; //다음 부모 메뉴
        communityAdminMenu?.menu.filter((item: any, index: number) => {
          if (selectedRow.parentId === item.id) {
            nextIdx = index - 1;
            currentIdx = index;
          }
        });
        //다음 부모 메뉴가 존재
        if (communityAdminMenu?.menu[nextIdx]) {
          if (communityAdminMenu.menu[nextIdx].child) {
            selectedRow.order = 999;
          } else {
            selectedRow.order = 999;
            communityAdminMenu.menu[nextIdx].child = [];
          }
          selectedRow.parentId = communityAdminMenu?.menu[nextIdx].id;
          communityAdminMenu?.menu[nextIdx].child.push(selectedRow);
          const test = communityAdminMenu?.menu[currentIdx].child.findIndex(
            (item: any) => {
              return item.id === selectedRow.id;
            }
          );

          if (test > -1) {
            communityAdminMenu?.menu[currentIdx].child.splice(test, 1);
          }

          const sortedData = orderSort(communityAdminMenu?.menu!);
          setCommunityAdminMenu({ menu: sortedData });
          nameValuesArr.push({
            id: selectedRow.id,
            name: 'parentId',
            value: selectedRow.parentId,
          });
          communityAdminMenu.menu.map((item, index) => {
            if (item.child) {
              item.child.map((item2: any, index2: any) => {
                if (item2.parentId === selectedRow.parentId) {
                  const add = item2.order - 1;

                  const orderFlag: boolean[] = [];
                  const parentFlag: boolean[] = [];
                  nameValuesArr.map((item, index) => {
                    if (item.id === item2.id && item.name === 'order') {
                      item.value = add;
                      orderFlag.push(true);
                    }

                    if (item.id === item2.id && item.name === 'parentId') {
                      item.value = item2.parentId;
                      parentFlag.push(true);
                    }
                  });

                  if (orderFlag.indexOf(true) === -1) {
                    nameValuesArr.push({
                      id: selectedRow.id,
                      name: 'order',
                      value: add,
                    });
                  }

                  if (parentFlag.indexOf(true) === -1) {
                    nameValuesArr.push({
                      id: selectedRow.id,
                      name: 'parentId',
                      value: item2.parentId,
                    });
                  }
                  communityAdminMenu.menu[index].child[index2].order = add;
                }
              });
            }
          });
          setNameValues(nameValuesArr);
        }
        return;
      } else {
        return;
      }
    }

    const nextOrder = list[list.length - 1].order;
    const ValuesArr = {
      id: selectedRow.id,
      name: 'order',
      value: list && list[list.length - 1].order,
    };
    const nextValuesArr = {
      id: list && list[list.length - 1].id,
      name: 'order',
      value: selectedRow.order,
    };
    const menuValue =
      list &&
      (selectedRow?.parentId
        ? communityAdminMenu?.menu
            .filter(m => {
              if (m.id === selectedRow?.parentId) {
                return m.child;
              }
            })[0]
            .child.map((m: any) => {
              if (m.id === list[list.length - 1].id) {
                m.order = originOrder;
              }

              if (m.id === selectedRow.id) {
                m.order = nextOrder;
              }

              return m;
            })
        : communityAdminMenu?.menu.map(m => {
            if (m.id === list[list.length - 1].id) {
              m.order = originOrder;
            }

            if (m.id === selectedRow.id) {
              m.order = nextOrder;
            }

            return m;
          }));

    menuValue && setCommunityAdminMenu({ menu: menuValue });

    nameValuesArr.map((item, index) => {
      if (item.id === ValuesArr.id && item.name === 'order') {
        nameValuesArr.splice(index, 1);
      }
    });

    nameValuesArr.map((item, index) => {
      if (item.id === nextValuesArr.id && item.name === 'order') {
        nameValuesArr.splice(index, 1);
      }
    });
    nameValuesArr.push(ValuesArr);
    nameValuesArr.push(nextValuesArr);

    setNameValues(nameValuesArr);
    const sortedData = orderSort(communityAdminMenu?.menu!);
    setCommunityAdminMenu({ menu: sortedData });
  }, [selectedRow]);

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

  function renderMenuRow2(
    menu: MenuItem,
    handleClickTaskRow: any,
    parentIdx: number,
    childIdx: number
  ) {
    if (menu) {
      return (
        <li
          key={parentIdx + '_' + childIdx}
          onClick={e => handleClickTaskRow(e, menu)}
          className={selectedRow && menu.id === selectedRow.id ? 'active' : ''}
        >
          <a>
            <img
              src={`${process.env.PUBLIC_URL}/images/all/icon-reply-16-px.svg`}
            />
            <img src={imageHandle(menu.type)} />
            {menu.name}
            <span>
              <img
                onClick={e => onHandleClickTaskRow(e, menu, 'delete')}
                src={`${process.env.PUBLIC_URL}/images/all/btn-clear-nomal.svg`}
              />
            </span>
          </a>
        </li>
      );
    }
  }

  function renderMenuRow(
    menu: MenuItem,
    handleClickTaskRow: any,
    index: number
  ) {
    if (menu) {
      return (
        <Fragment key={index}>
          <li
            key={index + '_parent'}
            onClick={e => handleClickTaskRow(e, menu, 'detail')}
            className={
              selectedRow && menu.id === selectedRow.id ? 'active' : ''
            }
          >
            <a>
              <img src={imageHandle(menu.type)} />
              {menu.name}
              <span>
                <img
                  onClick={e => onHandleClickTaskRow(e, menu, 'delete')}
                  src={`${process.env.PUBLIC_URL}/images/all/btn-clear-nomal.svg`}
                />
              </span>
            </a>
          </li>
          {menu.child !== undefined && (
            <ul key={index + 'child'}>
              {menu.child.map((item2: any, index2: any) => {
                return renderMenuRow2(
                  item2,
                  onHandleClickTaskRow,
                  index,
                  index2
                );
              })}
              {addChildMenuFlag && selectedRow && menu.id === selectedRow.id && (
                <li>
                  <a>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/all/icon-reply-16-px.svg`}
                    />
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
              ㆍ 메뉴를 편집한 후에 <strong>저장</strong> 버튼을 눌러야
              반영됩니다.
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
                    <img
                      src={`${process.env.PUBLIC_URL}/images/all/icon-arrow-up-20-px.png`}
                    />
                  </button>
                  <button onClick={handleDown}>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/all/icon-arrow-down-20-px.png`}
                    />
                  </button>
                  <button onClick={handleAddMenu}>메뉴 추가</button>
                  <button onClick={handleAddChildMenu}>하위 메뉴</button>
                </div>
                <ul>
                  <li>
                    <a>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/all/icon-communtiy-menu-home-off.png`}
                      />
                      Home
                      <span>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/all/icon-required.png`}
                        />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/all/icon-communtiy-menu-board.png`}
                      />
                      전체글
                      <span>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/all/icon-required.png`}
                        />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/all/icon-communtiy-menu-board.png`}
                      />
                      공지사항
                      <span>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/all/icon-required.png`}
                        />
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
              {selectedRow &&
                communityAdminGroups &&
                !addMenuFlag &&
                !addChildMenuFlag && (
                  <>
                    <CommunityAdminMenuDetailView
                      addMenuFlag={addMenuFlag}
                      selectedRow={selectedRow}
                      discussRow={discussRow}
                      communityAdminGroups={communityAdminGroups}
                      onChangeValue={(data, name) => onChangeValue(data, name)}
                      onChangeDiscussValue={onChangeDiscussValue}
                      onAddUrlsList={onAddUrlsList}
                      onDeleteUrlsList={onDeleteUrlsList}
                      onAddFileBoxId={onAddFileBoxId}
                    />
                    <div className="admin_bottom_button line">
                      <button
                        className="ui button admin_table_button"
                        onClick={() => handleSave(nameValues, deleteValues)}
                      >
                        저장
                      </button>
                    </div>
                  </>
                )}
              {addMenuFlag && addRow && !addChildMenuFlag && (
                <>
                  <CommunityAdminMenuAddView
                    addMenuFlag={addMenuFlag}
                    selectedRow={addRow}
                    discussRow={discussRow}
                    communityAdminGroups={communityAdminGroups}
                    onChangeAddValue={(data, name) =>
                      onChangeAddValue(data, name, 'parent')
                    }
                    onChangeDiscussValue={onChangeDiscussValue}
                    onAddUrlsList={onAddUrlsList}
                    onDeleteUrlsList={onDeleteUrlsList}
                    onAddFileBoxId={onAddFileBoxId}
                  />
                  <div className="admin_bottom_button line">
                    <button
                      className="ui button admin_table_button"
                      onClick={() =>
                        handleSave(nameValues, deleteValues, 'add', addRow)
                      }
                    >
                      저장
                    </button>
                  </div>
                </>
              )}
              {addChildMenuFlag && addRow && !addMenuFlag && (
                <>
                  <CommunityAdminMenuAddView
                    addChildMenuFlag={addChildMenuFlag}
                    selectedRow={addRow}
                    discussRow={discussRow}
                    communityAdminGroups={communityAdminGroups}
                    onChangeAddValue={(data, name) =>
                      onChangeAddValue(data, name, 'child')
                    }
                    onChangeDiscussValue={onChangeDiscussValue}
                    onAddUrlsList={onAddUrlsList}
                    onDeleteUrlsList={onDeleteUrlsList}
                    onAddFileBoxId={onAddFileBoxId}
                  />
                  <div className="admin_bottom_button line">
                    <button
                      className="ui button admin_table_button"
                      onClick={() =>
                        handleSave(nameValues, deleteValues, 'childAdd', addRow)
                      }
                    >
                      저장
                    </button>
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
