import React, { useState, useCallback, useEffect } from 'react';
import { Segment, Accordion, Image, Menu, Table, Select, Button, Label, Icon, Form, TextArea, Modal, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Folder, { getFolderItem } from '../../model/Folder';
import { setFolder } from '../../store/FolderStore';
import { saveFolder } from '../../service/useFolder/saveFolder';
import { IdName } from '../../../shared/model';
import { requestFolder, requestCubeListByFolderId } from '../../service/useFolder/requestFolder';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { requestNoteCount } from '../../service/useNote/requestNote';
import { setSearchBox } from '../../store/SearchBoxStore';
import { deleteFolder } from '../../api/noteApi';

interface FolderHeaderViewProps {
  folder: Folder | undefined;
  noteCount: number;
}

const FolderHeaderView: React.FC<FolderHeaderViewProps> = function FolderHeaderView({ folder, noteCount }) {

  const PUBLIC_URL = process.env.PUBLIC_URL;

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItem, setActiveItem] = useState('NoteAll');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [folderMultiLine, setFolderMultiLine] = useState<boolean>(false);
  const [editFolderId, setEditFolderId] = useState<string>('');
  const [editFolderName, setEditFolderName] = useState<string>('폴더미지정');
  const [editFolderOriginName, setEditFolderOriginName] = useState<string>('폴더미지정');
  const [editFolder, setEditFolder] = useState<boolean>(false);
  const [originFolder, setOriginFolder] = useState<Folder | undefined>();



  const [activeFolderId, setActiveFolderId] = useState<string>('');
  const [popupText, setPopupText] = useState<string>('');

  const changeArrayOrder = useCallback((list: Folder, targetIdx: number, moveValue: number) => {
    // 배열값이 없는 경우 나가기
    if (list.folders.idNames.length < 0) return;

    // 이동할 index 값을 변수에 선언
    const newPosition = targetIdx + moveValue;

    // 이동할 값이 0보다 작거나 최대값을 벗어나는 경우 종료
    if (newPosition < 0 || newPosition >= list.folders.idNames.length) return;

    // 임의의 변수를 하나 만들고 배열 값 저장
    const tempList: IdName[] = JSON.parse(JSON.stringify(list.folders.idNames));

    // 옮길 대상을 target 변수에 저장하기
    const target = tempList.splice(targetIdx, 1)[0];

    // 새로운 위치에 옮길 대상을 추가하기
    tempList.splice(newPosition, 0, target);

    setFolder({ ...folder, id: folder?.id || '', folders: { idNames: tempList } });

    return tempList;
  }, []
  );

  const removeFolder = useCallback(async () => {
    reactConfirm({
      title: '알림',
      message: '폴더를 삭제하시겠습니까?<div className="">\n</div>해당 폴더의 노트는 미지정 상태로 변경됩니다.',
      onCancel: () => { return true },
      onOk: async () => {
        folder && setFolder({ ...folder, folders: { idNames: folder.folders.idNames.filter(f => f.id !== editFolderId) } });
        folder && await saveFolder({ folders: { idNames: folder.folders.idNames.filter(f => f.id !== editFolderId) }, id: '' }, 'order');
        // await requestFolder();
        setEditFolderOriginName('');
        setEditFolderName('폴더미지정');
        setEditFolderId('0000');
        setEditFolder(false)
        // await save();
      }
    });
  }, [folder, editFolderId])

  const save = useCallback(async (flag?: string) => {
    if (!folder) {
      await saveFolder(getFolderItem(popupText), 'register');
      setFolder(getFolderItem(popupText));
    } else {
      if (popupText !== '') {
        const idname: IdName = new IdName();
        idname.name = popupText;

        folder.folders.idNames.unshift(idname);
        setFolder({ ...folder, folders: { idNames: folder.folders.idNames } });
        await saveFolder(folder, 'modify');
      } else if (flag && flag === 'updateName') {

        if (editFolderName.length === 0) {
          reactAlert({
            title: '알림',
            message:
              '폴더명을 한 글자 이상 입력해주세요.',
          });
          return;
        }

        await reactConfirm({
          title: '알림',
          message: '폴더명을 저장하시겠습니까?',
          onCancel: () => { return true },
          onOk: async () => {
            setFolder({ ...folder, folders: { idNames: folder.folders.idNames.filter(f => { if (f.id === editFolderId) { f.name = editFolderName } return f; }) } });
            await saveFolder(folder, 'order');
            setActiveFolderId('');
            setEditFolder(false);
          }
        });
      } else {
        await reactConfirm({
          title: '알림',
          message: '폴더순서를 저장하시겠습니까?',
          onCancel: () => { return true },
          onOk: async () => {
            await saveFolder(folder, 'order');
            setActiveFolderId('');
            await requestFolder();
            return true;
          }
        });
      }
    }
    await requestFolder();
    setPopupText('');

  }, [folder, popupText, editFolderId, editFolderName])


  const confirmPopup = useCallback(async () => {
    if (popupText.length === 0) {
      reactAlert({
        title: '알림',
        message:
          '폴더명을 한 글자 이상 입력해주세요.',
      });
      return;
    }
    save();
    setIsOpen(false);
  }, [popupText])

  const findCubeListByFolderId = useCallback(async () => {
    await requestCubeListByFolderId();
  }, [])

  const toggleFolder = useCallback(async (idName: IdName) => {
    if (editFolderId !== '') {
      setEditFolderId(''); setEditFolderName('폴더미지정'); setEditFolderOriginName('');
    } else {
      setEditFolderId(idName.id); setEditFolderName(idName.name); setEditFolderOriginName(idName.name);
    }
  }, [editFolderId])

  useEffect(() => {
    setSearchBox({ offset: 0, limit: 10, folderId: editFolderId })
    findCubeListByFolderId();
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
              모아보기
            </Menu.Item>
            <Menu.Item
              name="NoteFolder"
              active={true}
              // onClick={this.handleItemClick}
              as={Link}
              to="/my-training/my-page/EarnedNoteList/pages/2"
            >
              폴더보기
            </Menu.Item>

          </Menu>
        </div>

        <Segment className="full">
          {/* 폴더 영역 */}
          {/* <NoteFolderArea /> */}

          <div>
            {/* 생성된 폴더가 하나도 없을때 */}
            <div className={`folder_area ${(folderMultiLine || activeFolderId !== '') && 'open'}`}>
              <div className={`folder_inner ${activeFolderId && 'moveOn'}`}>
                <div className="folder_new"><Button onClick={(e, data) => setIsOpen(true)}>+ 새폴더</Button></div>
                <div className="folder_box">

                  {(!folder || folder.folders.idNames.length === 0) && (<p>폴더를 생성하여 등록된 노트를 관리할 수 있습니다.</p>)}
                  {folder &&
                    folder.folders.idNames.length > 0 && (
                      <ul> {
                        folder.folders.idNames.map((m, index) => {
                          return (
                            <li key={index} className={m.id === activeFolderId ? 'moveActive' : m.id === editFolderId ? 'setActive' : ''} >
                              <Button className="folder" onClick={(e, data) => { toggleFolder(m); }}>{m.name}</Button>
                              {m.id === editFolderId && <Button className="setting" onClick={(e, data) => { m.id === editFolderId && setActiveFolderId(m.id); setOriginFolder(folder); }}><Icon /></Button>}
                              <Button className="left" onClick={(e, data) => changeArrayOrder(folder, folder.folders.idNames.findIndex(f => f.id === m.id), -1)}><Icon /></Button>
                              <Button className="right" onClick={(e, data) => changeArrayOrder(folder, folder.folders.idNames.findIndex(f => f.id === m.id), 1)}><Icon /></Button>
                            </li>
                          )
                        })}
                      </ul>
                    )}

                </div>
              </div>
              {activeFolderId !== '' &&
                (
                  <div className="folder_btn">
                    <Button className="cancel" onClick={(e, data) => { setActiveFolderId(''); setFolder(originFolder); }}>취소</Button>
                    <Button className="save" onClick={(e, data) => { save(); }}>저장</Button>
                  </div>
                )
              }
              {(folder && folder.folders.idNames.length > 0) && (<Button className={folderMultiLine ? "toggle_f" : "toggle_f open"} onClick={(e, data) => { setFolderMultiLine(!folderMultiLine) }}><Icon /></Button>)}
            </div>
          </div>


          {/* 설정버튼 누르기 전 */}
          {!editFolder &&
            (
              <div className="total_box">
                <strong className="tit_folder">
                  {editFolderName}
                  {editFolderId !== '' && <Button className="btn_setting" onClick={(e, data) => { setEditFolder(true) }}><Icon /></Button>}
                </strong>
            총 <strong>{noteCount}개의 Note</strong>
              </div>
            )
          }
          {editFolder &&
            (
              <div className="folder_setting">
                <Button className="delete" onClick={(e, data) => removeFolder()}><Image src={`${PUBLIC_URL}/images/all/icon-note-delete-24-px.svg`} alt="삭제" /></Button>
                <Input value={editFolderName} onChange={(e, data) => data.value.length < 21 && setEditFolderName(data.value)} />
                <span className="txt_cnt">
                  <span className="txt_now">{editFolderName.length}</span>
                    /
                    <span>20</span>
                </span>

                <span>총 <strong>{noteCount}개의 Note</strong></span>

                <div className="folder_btn">
                  <button className="ui button cancel" onClick={(e) => { setEditFolder(false); setEditFolderName(editFolderOriginName) }}>취소</button>
                  <button className="ui button save" onClick={(e) => { save('updateName'); }} >저장</button>
                </div>
              </div>
            )
          }

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
          새폴더
        </Modal.Header>
        <Modal.Content>
          <strong className="tit">새 폴더를 생성하시겠습니까?</strong>
          <span className="txt_cnt">
            <span className="txt_now">{popupText.length}</span>/20
          </span>

          <Input placeholder="사용하실 폴더명을 입력해주세요." value={popupText} onChange={(e, data) => data.value.length < 21 && setPopupText(data.value)} />

          {/* txt_noti 에  on 클래스 붙을 경우 아래 경고메세지 뜹니다 */}
          <span className="txt_noti on">폴더명을 한 글자 이상 입력해주세요</span>

        </Modal.Content>
        <Modal.Actions>
          <Button className="cancel" onClick={(e, data) => { setIsOpen(false); setPopupText(''); }}>취소</Button>
          <Button className="create" onClick={(e, data) => confirmPopup()}>생성</Button>
        </Modal.Actions>

      </Modal>
    </>
  )
};

export default FolderHeaderView;
