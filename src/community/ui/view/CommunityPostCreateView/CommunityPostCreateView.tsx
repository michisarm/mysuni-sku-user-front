import { FileBox, ValidationType } from '@nara.drama/depot';
import { PatronType, reactConfirm } from '@nara.platform/accent';
import { saveCommunityPost } from 'community/service/useCommunityPostCreate/utility/saveCommunityPost';
import {
  getCommunityPostCreateItem,
  setCommunityPostCreateItem,
} from 'community/store/CommunityPostCreateStore';
import { CommunityPostCreateItem } from 'community/viewModel/CommunityPostCreate';
import React, { useCallback } from 'react';
import { Checkbox, Form, Icon, Radio } from 'semantic-ui-react';
import { depotHelper } from 'shared';
import CommunityMenu from '../../../model/CommunityMenu';
import Editor from './Editor';

interface CommunityPostCreateViewProps {
  postItem: CommunityPostCreateItem;
  communityId: string;
  menuId?: string;
  postId?: string;
  menus: CommunityMenu[];
}

const CommunityPostCreateView: React.FC<CommunityPostCreateViewProps> = function CommunityPostCreateView({
  postItem,
  communityId,
  menuId,
  postId,
  menus,
}) {
  const handlePinnedChange = useCallback((e: any, data: any) => {
    const value = data.checked;
    const postCreateItem = getCommunityPostCreateItem();
    if (postCreateItem === undefined) {
      return;
    }
    const nextPostCreateItem = { ...postCreateItem, pinned: value };
    setCommunityPostCreateItem(nextPostCreateItem);
  }, []);

  const titleLength =
    (postItem && postItem.title && postItem.title.length) || 0;
  const handleTitleChange = useCallback((e: any) => {
    //
    const value = e.target.value;
    if (value.length > 100) {
      return;
    }
    const postCreateItem = getCommunityPostCreateItem();
    if (postCreateItem === undefined) {
      return;
    }
    const nextPostCreateItem = { ...postCreateItem, title: value };
    setCommunityPostCreateItem(nextPostCreateItem);
  }, []);

  const getFileBoxIdForReference = useCallback((depotId: string) => {
    const postCreateItem = getCommunityPostCreateItem();
    if (postCreateItem === undefined) {
      return;
    }
    const nextPostCreateItem = { ...postCreateItem, fileBoxId: depotId };
    setCommunityPostCreateItem(nextPostCreateItem);
  }, []);

  const handleVisibleChange = useCallback((e: any, data: any) => {
    let value = false;
    if (data.value) {
      value = true;
    }

    const postCreateItem = getCommunityPostCreateItem();
    if (postCreateItem === undefined) {
      return;
    }
    const nextPostCreateItem = { ...postCreateItem, visible: value };
    setCommunityPostCreateItem(nextPostCreateItem);
  }, []);

  const handleSubmitClick = useCallback(() => {
    const menu = menus.find(c => c.menuId === menuId);
    if (menu === undefined) {
      return;
    }
    reactConfirm({
      title: '알림',
      message: '저장하시겠습니까?',
      onOk: () => saveCommunityPost(communityId, menu.id, postId),
    });
  }, [communityId, menuId, postId, menus]);

  const menu = menus.find(c => c.menuId === menuId);

  return (
    <>
      <div className="course-info-header">
        <div className="survey-header pt0">
          <div className="survey-header-left">{menu?.name}</div>
        </div>
      </div>
      <div className="form-contants">
        <Form>
          <Form.Field>
            {/* 공지 등록 체크박스 */}
            <div className="board-write-checkbox">
              <Checkbox
                className="base"
                label="중요 등록"
                name="communityPostCreatePinned"
                checked={postItem.pinned}
                onChange={handlePinnedChange}
              />
            </div>
            <div
              className={
                titleLength >= 100
                  ? 'ui right-top-count input error'
                  : 'ui right-top-count input'
              }
            >
              <span className="count">
                <span className="now">{titleLength}</span>/
                <span className="max">100</span>
              </span>
              <input
                type="text"
                placeholder="제목을 입력해 주세요."
                value={postItem.title}
                onChange={handleTitleChange}
              />
              <Icon className="clear link" />
              {/*<span className="validation">You can enter up to 100 characters.</span>*/}
            </div>
          </Form.Field>

          <Form.Field>
            <label>본문</label>
            <div className="ui editor-wrap">
              <Editor contents={postItem.contents} />
            </div>
          </Form.Field>

          <Form.Field>
            <label>파일첨부</label>
            <div className="report-attach">
              {/* <AttachFileUpload filesMap={filesMap}/> */}
              <div className="lg-attach">
                <div className="attach-inner">
                  <FileBox
                    id={postItem.fileBoxId || ''}
                    vaultKey={{
                      keyString: 'sku-depot',
                      patronType: PatronType.Pavilion,
                    }}
                    patronKey={{
                      keyString: 'sku-denizen',
                      patronType: PatronType.Denizen,
                    }}
                    validations={[
                      {
                        type: ValidationType.Duplication,
                        validator: depotHelper.duplicationValidator,
                      },
                    ]}
                    onChange={getFileBoxIdForReference}
                  />
                  <div className="bottom">
                    <span className="text1">
                      <Icon className="info16" />
                      <span className="blind">information</span>
                      1개 이상의 첨부파일을 등록하실 수 있습니다.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Form.Field>
          <Form.Field>
            {/* 공개, 비공개 */}
            <div className="board-write-radio">
              <Radio
                className="base"
                label="멤버 공개"
                name="communityPostVisible"
                value={1}
                checked={postItem.visible}
                onChange={handleVisibleChange}
              />
              <Radio
                className="base"
                label="비공개 (본인과 관리자만 게시물 확인)"
                name="communityPostVisible"
                value={0}
                checked={!postItem.visible}
                onChange={handleVisibleChange}
              />
            </div>
          </Form.Field>
        </Form>

        {/* Bottom */}
        <div className="survey-preview">
          <button className="ui button fix bg" onClick={handleSubmitClick}>
            등록
          </button>
        </div>
      </div>
    </>
  );
};

export default CommunityPostCreateView;