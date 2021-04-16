import React from 'react';
import { Select, Button, Image, Icon, Radio } from 'semantic-ui-react';
import HtmlEditor from './HtmlEditor';
import PlusIcon from '../../../../style/media/btn-plus-admin.svg';
import MinusIcon from '../../../../style/media/btn-minus-admin.svg';
import { FileBox, ValidationType } from '@nara.drama/depot';
import { PatronType } from '@nara.platform/accent';
import { depotHelper } from '../../../../shared';
import { MenuItem } from '../../../viewModel/CommunityAdminMenu';
import AdminDiscussionCreateEditor from './AdminDiscussionCreateEditor';

interface Props {
  changeValue: (event: any, targetName?: string, index?: number) => void;
  handleAddUrlField: () => void;
  handleDeleteUrlField: (fieldIndex: number) => void;
  selectedRow: MenuItem | undefined;
}

const AdminDiscussionCreateView: React.FC<Props> = ({
  changeValue,
  selectedRow,
  handleAddUrlField,
  handleDeleteUrlField,
}) => {
  return (
    <>
      <tr>
        <th>주제</th>
        <td>
          <div
            className="ui right-top-count input admin"
            style={{ width: '100%' }}
          >
            <input
              style={{ width: '100%' }}
              type="text"
              placeholder="메뉴명을 입력하세요."
              className="bg"
              name="discussionTopic"
              value={selectedRow && selectedRow.discussionTopic}
              onChange={(e: any) => changeValue(e)}
            />
            {
              <Icon
                className="clear link"
                onClick={(e: any) => console.log(e)}
              />
            }
          </div>
        </td>
      </tr>

      <tr className="discussion-contents">
        <th>내용</th>
        <td>
          <div className="ui editor-wrap">
            <AdminDiscussionCreateEditor
              contents={(selectedRow && selectedRow.content) || ''}
              onChange={(e: any) => changeValue(e, 'content')}
            />
          </div>
        </td>
      </tr>

      <tr className="related-url-belt">
        <th>관련 URL</th>
        <td>
          {selectedRow &&
            selectedRow?.relatedUrlList?.map(({ title, url }, index) => (
              <div className="related-url-bar">
                <div
                  className="ui right-top-count input admin"
                  style={{ width: '100%' }}
                >
                  <input
                    type="text"
                    placeholder="관련 URL 타이틀을 입력해주세요."
                    className="bg"
                    value={title}
                    onChange={(e: any) => changeValue(e, 'urlTitle', index)}
                  />
                  {
                    <Icon
                      className="clear link"
                      onClick={(e: any) => console.log(e)}
                    />
                  }
                </div>
                <div>
                  <div className="ui right-top-count input admin">
                    <input
                      type="text"
                      placeholder="https://"
                      className="bg"
                      value={url}
                      onChange={(e: any) => changeValue(e, 'urlValue', index)}
                    />
                    {
                      <Icon
                        className="clear link"
                        onClick={(e: any) => console.log(e)}
                      />
                    }
                  </div>
                  {index ===
                  (selectedRow &&
                    selectedRow.relatedUrlList &&
                    selectedRow?.relatedUrlList?.length - 1) ? (
                    <Button className="plus" onClick={handleAddUrlField}>
                      <Icon>
                        <img src={PlusIcon} />
                      </Icon>
                    </Button>
                  ) : (
                    <Button
                      className="cancle-btn"
                      onClick={() => handleDeleteUrlField(index)}
                    >
                      <Icon>
                        <img src={MinusIcon} />
                      </Icon>
                    </Button>
                  )}
                </div>
              </div>
            ))}
        </td>
      </tr>

      <tr className="related-material">
        <th>관련 자료</th>
        <td>
          <div className="lg-attach add-discussion">
            <div className="attach-inner">
              <div>
                <FileBox
                  id="id"
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
                  // onChange={this.getFileBoxIdForReference}
                />
                <div className="bottom">
                  <span className="text1">
                    <span className="blind">information</span>최대 10MB 용량의
                    파일을 등록하실 수 있습니다. ( 등록가능 : doc, pdf, exl )
                  </span>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>

      <tr className="opinion-option">
        <th>의견 공개 설정</th>
        <td>
          <div className="board-write-radio open-option-radio">
            <Radio
              className="base"
              label="공개"
              name="optionGroup"
              value="option01"
              checked={true}
              onChange={(e: any) => console.log(e)}
            />
            <Radio
              className="base"
              label="비공개"
              name="optionGroup"
              value="option02"
              checked={false}
              onChange={(e: any) => console.log(e)}
            />
          </div>
          <span className="open-option-detail">
            비공개 설정시 작성한 본인과 커뮤니티 관리자만 확인할 수 있습니다.
          </span>
        </td>
      </tr>
    </>
  );
};
export default AdminDiscussionCreateView;
