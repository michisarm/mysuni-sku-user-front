import { reactConfirm } from '@nara.platform/accent';
import { saveCommunityPost } from 'community/service/useCommunityPostCreate/utility/saveCommunityPost';
import { getCommunityPostCreateItem, setCommunityPostCreateItem } from 'community/store/CommunityPostCreateStore';
import { CommunityPostCreateItem } from 'community/viewModel/CommunityPostCreate';
import React, { useCallback } from 'react';
import { Checkbox, Form, Icon, Radio } from 'semantic-ui-react';
import Editor from './Editor';

interface CommunityPostCreateViewProps {
  postItem: CommunityPostCreateItem;
  communityId: string;
  postId: string;
}

const CommunityPostCreateView: React.FC<CommunityPostCreateViewProps> = function CommunityPostCreateView({
  postItem,
  communityId,
  postId,
}) {

  const handlePinnedChange = useCallback(
    (e: any, data: any) => {
      const value = data.checked;
      const postCreateItem = getCommunityPostCreateItem();
      if (postCreateItem === undefined) {
        return;
      }
      const nextPostCreateItem = { ...postCreateItem, pinned:value };
      setCommunityPostCreateItem(nextPostCreateItem);
  },[]);

  const handleTitleChange = useCallback(
    (e: any) => {
    //
    const value = e.target.value;
    const postCreateItem = getCommunityPostCreateItem();
    if (postCreateItem === undefined) {
      return;
    }
    const nextPostCreateItem = { ...postCreateItem, title:value };
    setCommunityPostCreateItem(nextPostCreateItem);
  },[]);

  const handleVisibleChange = useCallback(
    (e: any, data: any) => {
      let value = false;
      if (data.value) {
        value = true;
      }
      
      const postCreateItem = getCommunityPostCreateItem();
      if (postCreateItem === undefined) {
        return;
      }
      const nextPostCreateItem = { ...postCreateItem, visible:value };
      setCommunityPostCreateItem(nextPostCreateItem);
  },[]);

  const handleSubmitClick = useCallback(() => {
    reactConfirm({
      title: '알림',
      message:
        '저장하시겠습니까?',
      onOk: () => saveCommunityPost(communityId, postId),
    });
  },[communityId, postId]);

  return (
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
          <div className="ui right-top-count input">
            <span className="count">
              <span className="now">0</span>/
              <span className="max">100</span>
            </span>
            <input
              type="text"
              placeholder="제목을 입력해 주세요. (최대 입력 글자 수 확인 필요)"
              value={postItem.title}
              onChange={handleTitleChange}
            />
            <Icon className="clear link" />
            <span className="validation">
              You can enter up to 100 characters.
            </span>
          </div>
        </Form.Field>

        <Form.Field>
          <label>본문</label>
          <div className="ui editor-wrap">
            <Editor contents={postItem.contents}/>
          </div>
        </Form.Field>

        <Form.Field>
          <label>파일첨부</label>
          <div className="report-attach">
            {/*<AttachFileUpload />*/}
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
        <button className="ui button fix bg" onClick={handleSubmitClick}>등록</button>
      </div>
    </div>
  );
}

export default CommunityPostCreateView;
