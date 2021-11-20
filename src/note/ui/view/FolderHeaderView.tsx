import React, { useState, useCallback, useEffect } from 'react';
import {
  Segment,
  Accordion,
  Image,
  Menu,
  Table,
  Select,
  Button,
  Label,
  Icon,
  Form,
  TextArea,
  Modal,
  Input,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Folder, { getFolderItem } from '../../model/Folder';
import { setFolder } from '../../store/FolderStore';
import { saveFolder } from '../../service/useFolder/saveFolder';
import { IdName } from '../../../shared/model';
import {
  requestFolder,
  requestCubeListByFolderId,
  requestNoteCountByFolderId,
} from '../../service/useFolder/requestFolder';
import {
  reactAlert,
  reactConfirm,
  OffsetElementList,
} from '@nara.platform/accent';
import { requestNoteCount } from '../../service/useNote/requestNote';
import { setSearchBox } from '../../store/SearchBoxStore';
import { deleteFolder } from '../../api/noteApi';
import Note from '../../model/Note';
import NoteWithLecture from '../../model/NoteWithLecture';
import { deleteFolderById } from '../../service/useFolder/deleteFolder';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';

interface FolderHeaderViewProps {
  noteList: OffsetElementList<NoteWithLecture>;
  folder: Folder | undefined;
  noteCount: number;
  folderNoteCount: number | undefined;
}

const FolderHeaderView: React.FC<FolderHeaderViewProps> = function FolderHeaderView({
  noteList,
  folder,
  folderNoteCount,
}) {
  const PUBLIC_URL = process.env.PUBLIC_URL;

  const firstFolderName = getPolyglotText(
    '폴더미지정',
    'mypage-folder-폴더미지정'
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [folderMultiLine, setFolderMultiLine] = useState<boolean>(false);
  const [editFolderId, setEditFolderId] = useState<string>('');
  const [editFolderName, setEditFolderName] = useState<string>(firstFolderName);
  const [editFolderOriginName, setEditFolderOriginName] = useState<string>(
    firstFolderName
  );
  const [editFolder, setEditFolder] = useState<boolean>(false);
  const [originFolder, setOriginFolder] = useState<Folder | undefined>();
  // const [folerNoteCount, setFolerNoteCount] = useState<number>(0);

  const [activeFolderId, setActiveFolderId] = useState<string>('');
  const [popupText, setPopupText] = useState<string>('');

  const changeArrayOrder = useCallback(
    (list: Folder, targetIdx: number, moveValue: number) => {
      // 배열값이 없는 경우 나가기
      if (list.folders.idNames.length < 0) return;

      // 이동할 index 값을 변수에 선언
      const newPosition = targetIdx + moveValue;

      // 이동할 값이 0보다 작거나 최대값을 벗어나는 경우 종료
      if (newPosition < 0 || newPosition >= list.folders.idNames.length) return;

      // 임의의 변수를 하나 만들고 배열 값 저장
      const tempList: IdName[] = JSON.parse(
        JSON.stringify(list.folders.idNames)
      );

      // 옮길 대상을 target 변수에 저장하기
      const target = tempList.splice(targetIdx, 1)[0];

      // 새로운 위치에 옮길 대상을 추가하기
      tempList.splice(newPosition, 0, target);

      setFolder({
        ...folder,
        id: folder?.id || '',
        folders: { idNames: tempList },
      });

      return tempList;
    },
    []
  );

  const removeFolder = useCallback(async () => {
    reactConfirm({
      title: getPolyglotText('알림', 'mypage-folder알림-알림1'),
      message: getPolyglotText(
        '폴더를 삭제하시겠습니까?<div className="">\n</div>해당 폴더의 노트는 미지정 상태로 변경됩니다.',
        'mypage-folder알림-폴더삭제'
      ),
      onCancel: () => {
        return true;
      },
      onOk: async () => {
        folder &&
          setFolder({
            ...folder,
            folders: {
              idNames: folder.folders.idNames.filter(
                (f) => f.id !== editFolderId
              ),
            },
          });
        folder &&
          (await saveFolder(
            {
              folders: {
                idNames: folder.folders.idNames.filter(
                  (f) => f.id !== editFolderId
                ),
              },
              id: '',
            },
            'order'
          ));
        // await requestFolder();
        await deleteFolderById(editFolderId);
        setEditFolderOriginName('');
        setEditFolderName(firstFolderName);
        setEditFolderId('0000');
        setEditFolder(false);
        // await save();
      },
    });
  }, [folder, editFolderId]);

  const save = useCallback(
    async (flag?: string) => {
      if (!folder) {
        await saveFolder(getFolderItem(popupText), 'register');
        setFolder(getFolderItem(popupText));
      } else {
        if (popupText !== '') {
          const idname: IdName = new IdName();
          idname.name = popupText;

          folder.folders.idNames.unshift(idname);
          setFolder({
            ...folder,
            folders: { idNames: folder.folders.idNames },
          });
          await saveFolder(folder, 'modify');
        } else if (flag && flag === 'updateName') {
          if (editFolderName.length === 0) {
            reactAlert({
              title: getPolyglotText('알림', 'mypage-folder알림-알림5'),
              message: getPolyglotText(
                '폴더명을 한 글자 이상 입력해주세요.',
                'mypage-folder알림-글자수'
              ),
            });
            return;
          }

          await reactConfirm({
            title: getPolyglotText('알림', 'mypage-folder알림-알림2'),
            message: getPolyglotText(
              '폴더명을 저장하시겠습니까?',
              'mypage-folder알림-생성하시'
            ),
            onCancel: () => {
              return true;
            },
            onOk: async () => {
              setFolder({
                ...folder,
                folders: {
                  idNames: folder.folders.idNames.filter((f) => {
                    if (f.id === editFolderId) {
                      f.name = editFolderName;
                    }
                    return f;
                  }),
                },
              });
              await saveFolder(folder, 'order');
              setActiveFolderId('');
              setEditFolder(false);
            },
          });
        } else {
          await reactConfirm({
            title: getPolyglotText('알림', 'mypage-folder알림-알림3'),
            message: getPolyglotText(
              '폴더순서를 저장하시겠습니까?',
              'mypage-folder알림-폴더순서'
            ),
            onCancel: () => {
              return true;
            },
            onOk: async () => {
              await saveFolder(folder, 'order');
              setActiveFolderId('');
              await requestFolder();
              return true;
            },
          });
        }
      }
      await requestFolder();
      setPopupText('');
    },
    [folder, popupText, editFolderId, editFolderName]
  );

  const confirmPopup = useCallback(async () => {
    if (popupText.length === 0) {
      reactAlert({
        title: getPolyglotText('알림', 'mypage-folder알림-알림4'),
        message: getPolyglotText(
          '폴더명을 한 글자 이상 입력해주세요.',
          'mypage-folder알림-글자수2'
        ),
      });
      return;
    }
    save();
    setIsOpen(false);
  }, [popupText]);

  const findCubeListByFolderId = useCallback(async () => {
    await requestCubeListByFolderId();
  }, []);

  const toggleFolder = useCallback(
    async (idName: IdName) => {
      if (editFolder) {
        await save('updateName');
        // return;
      } else {
        if (activeFolderId !== '') {
          return;
        }

        if (editFolderId === idName.id) {
          setEditFolderId('');
          setEditFolderName(firstFolderName);
          setEditFolderOriginName('');
        } else {
          setEditFolderId(idName.id);
          setEditFolderName(idName.name);
          setEditFolderOriginName(idName.name);
        }
      }
    },
    [editFolderId, activeFolderId, editFolder, editFolderName]
  );

  useEffect(() => {
    setSearchBox({ offset: 0, limit: 10, folderId: editFolderId });
    findCubeListByFolderId();

    requestNoteCountByFolderId();
  }, [editFolderId]);

  return (
    <>
      <div>
        <div className="cont-inner">
          <Menu className="note-tab">
            <Menu.Item
              name="NoteAll"
              active={false}
              // onClick={this.handleItemClick}
              as={Link}
              to="/my-training/my-page/EarnedNoteList/pages/1"
            >
              <PolyglotText
                id="mypage-folder-모아보기"
                defaultString="모아보기"
              />
            </Menu.Item>
            <Menu.Item
              name="NoteFolder"
              active={true}
              // onClick={this.handleItemClick}
              as={Link}
              to="/my-training/my-page/EarnedNoteList/pages/2"
            >
              <PolyglotText
                id="mypage-folder-폴더보기"
                defaultString="폴더보기"
              />
            </Menu.Item>
          </Menu>
        </div>

        <Segment className="full">
          {/* 폴더 영역 */}
          {/* <NoteFolderArea /> */}

          <div>
            {/* 생성된 폴더가 하나도 없을때 */}
            <div
              className={`folder_area ${
                (folderMultiLine || activeFolderId !== '') && 'open'
              }`}
            >
              <div className={`folder_inner ${activeFolderId && 'moveOn'}`}>
                <div className="folder_new">
                  <Button onClick={(e, data) => setIsOpen(true)}>
                    +
                    <PolyglotText
                      id="mypage-folder-새폴더"
                      defaultString="새폴더"
                    />
                  </Button>
                </div>
                <div className="folder_box">
                  {(!folder || folder.folders.idNames.length === 0) && (
                    <p>
                      <PolyglotText
                        id="mypage-folder-노트관리"
                        defaultString="폴더를 생성하여 등록된 노트를 관리할 수 있습니다."
                      />
                    </p>
                  )}
                  {folder && folder.folders.idNames.length > 0 && (
                    <ul>
                      {' '}
                      {folder.folders.idNames.map((m, index) => {
                        return (
                          <li
                            key={index}
                            className={
                              m.id === activeFolderId
                                ? 'moveActive'
                                : m.id === editFolderId
                                ? 'setActive'
                                : ''
                            }
                          >
                            <Button
                              className="folder"
                              onClick={(e, data) => {
                                toggleFolder(m);
                              }}
                            >
                              {m.name}
                            </Button>
                            {m.id === editFolderId && (
                              <Button
                                className="setting"
                                onClick={(e, data) => {
                                  m.id === editFolderId &&
                                    setActiveFolderId(m.id);
                                  setOriginFolder(folder);
                                }}
                              >
                                <Icon />
                              </Button>
                            )}
                            <Button
                              className="left"
                              onClick={(e, data) =>
                                changeArrayOrder(
                                  folder,
                                  folder.folders.idNames.findIndex(
                                    (f) => f.id === m.id
                                  ),
                                  -1
                                )
                              }
                            >
                              <Icon />
                            </Button>
                            <Button
                              className="right"
                              onClick={(e, data) =>
                                changeArrayOrder(
                                  folder,
                                  folder.folders.idNames.findIndex(
                                    (f) => f.id === m.id
                                  ),
                                  1
                                )
                              }
                            >
                              <Icon />
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
              {activeFolderId !== '' && (
                <div className="folder_btn">
                  <Button
                    className="cancel"
                    onClick={(e, data) => {
                      setActiveFolderId('');
                      setFolder(originFolder);
                    }}
                  >
                    <PolyglotText
                      id="mypage-folder-취소"
                      defaultString="취소"
                    />
                  </Button>
                  <Button
                    className="save"
                    onClick={(e, data) => {
                      save();
                    }}
                  >
                    <PolyglotText
                      id="mypage-folder-저장"
                      defaultString="저장"
                    />
                  </Button>
                </div>
              )}
              {folder && folder.folders.idNames.length > 0 && (
                <Button
                  className={folderMultiLine ? 'toggle_f open' : 'toggle_f'}
                  onClick={(e, data) => {
                    setFolderMultiLine(!folderMultiLine);
                  }}
                >
                  <Icon />
                </Button>
              )}
            </div>
            <p className="txt1">
              <i aria-hidden="true" className="icon" />
              <PolyglotText
                id="mypage-folder-노트정리"
                defaultString="학습 내용이나 목표에 따라 나의 노트를 정리해 보세요."
              />
            </p>
          </div>

          {/* 설정버튼 누르기 전 */}
          {!editFolder && (
            <div className="total_box">
              <strong className="tit_folder">
                {editFolderName}
                {editFolderId !== '' && (
                  <Button
                    className="btn_setting"
                    onClick={(e, data) => {
                      setEditFolder(true);
                    }}
                  >
                    <Icon />
                  </Button>
                )}
              </strong>
              <span
                className="tit_cnt"
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    `총 <strong>{count}개의 학습과정</strong>`,
                    'mypage-folder-학습과정수',
                    {
                      count: (
                        noteList.results.length && noteList.results.length
                      ).toString(),
                    }
                  ),
                }}
              />
              <span
                className="tit_cnt"
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    `총 <strong>{count}개의 Note</strong>`,
                    'mypage-folder-노트수',
                    { count: (folderNoteCount || 0).toString() }
                  ),
                }}
              />
            </div>
          )}
          {editFolder && (
            <div className="folder_setting">
              <Button className="delete" onClick={(e, data) => removeFolder()}>
                <Image
                  src={`${PUBLIC_URL}/images/all/icon-note-delete-24-px.svg`}
                  alt="삭제"
                />
              </Button>
              <Input
                value={editFolderName}
                onChange={(e, data) =>
                  data.value.length < 21 && setEditFolderName(data.value)
                }
              />
              <span className="txt_cnt">
                <span className="txt_now">{editFolderName.length}</span>/
                <span>20</span>
              </span>

              <div className="folder_btn">
                <button
                  className="ui button cancel"
                  onClick={(e) => {
                    setEditFolder(false);
                    setEditFolderName(editFolderOriginName);
                  }}
                >
                  <PolyglotText id="mypage-folder-취소2" defaultString="취소" />
                </button>
                <button
                  className="ui button save"
                  onClick={(e) => {
                    save('updateName');
                  }}
                >
                  <PolyglotText id="mypage-folder-저장2" defaultString="저장" />
                </button>
              </div>
            </div>
          )}
          {noteList && noteList.results.length === 0 && (
            <div className="note_nodata">
              <Icon>
                <Image src={`${PUBLIC_URL}/images/all/no-contents-80-px.svg`} />
              </Icon>
              <p
                className="txt"
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    `작성된 Note가 없습니다.
                      <span>Note는 각 학습 과정에서 작성할 수 있습니다.</span>`,
                    'mypage-folder-노트없음'
                  ),
                }}
              />
            </div>
          )}
          {/* 설정버튼 누르기 후 */}
          {/* <FolderSetting/> */}
        </Segment>
      </div>

      {/* 새폴더 등록 */}
      <Modal
        size="small"
        open={isOpen}
        // onClose={}
        className="base popup_fcreate"
      >
        <Modal.Header>
          <PolyglotText id="mypage-folder-새폴더2" defaultString="새폴더" />
        </Modal.Header>
        <Modal.Content>
          <strong className="tit">
            <PolyglotText
              id="mypage-folder-생성하시"
              defaultString="새 폴더를 생성하시겠습니까?"
            />
          </strong>
          <span className="txt_cnt">
            <span className="txt_now">{popupText.length}</span>/20
          </span>

          <Input
            placeholder={getPolyglotText(
              '사용하실 폴더명을 입력해주세요.',
              'mypage-folder-사용할폴더명'
            )}
            value={popupText}
            onChange={(e, data) =>
              data.value.length < 21 && setPopupText(data.value)
            }
          />

          {/* txt_noti 에  on 클래스 붙을 경우 아래 경고메세지 뜹니다 */}
          <span className="txt_noti on">
            <PolyglotText
              id="mypage-folder-글자수"
              defaultString="폴더명을 한 글자 이상 입력해주세요"
            />
          </span>
        </Modal.Content>
        <Modal.Actions>
          <Button
            className="cancel"
            onClick={(e, data) => {
              setIsOpen(false);
              setPopupText('');
            }}
          >
            <PolyglotText id="mypage-folder-새폴더취소" defaultString="취소" />
          </Button>
          <Button className="create" onClick={(e, data) => confirmPopup()}>
            <PolyglotText id="mypage-folder-새폴더생성" defaultString="생성" />
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default FolderHeaderView;
