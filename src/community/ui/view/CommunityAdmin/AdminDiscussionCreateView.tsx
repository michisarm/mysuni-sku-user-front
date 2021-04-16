import React from 'react';
import { Select, Button, Image, Icon, Radio } from 'semantic-ui-react';
import HtmlEditor from './HtmlEditor';
import PlusIcon from '../../../../style/media/btn-plus-admin.svg';
import MinusIcon from '../../../../style/media/btn-minus-admin.svg';
import { FileBox } from '@nara.drama/depot';

const AdminDiscussionCreateView = () => {
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
              value="1"
              onChange={(e: any) => console.log(e)}
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
      {/* 2021-04-21 추가작업 */}
      <tr className="discussion-contents">
        <th>내용</th>
        <td>
          <div className="ui editor-wrap">
            <HtmlEditor />
          </div>
        </td>
      </tr>

      <tr className="related-url-belt">
        <th>관련 URL</th>
        <td>
          <div
            className="ui right-top-count input admin"
            style={{ width: '100%' }}
          >
            <input
              type="text"
              placeholder="메뉴명을 입력하세요."
              className="bg"
              value="1"
              onChange={(e: any) => console.log(e)}
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
                placeholder="메뉴명을 입력하세요."
                className="bg"
                value="1"
                onChange={(e: any) => console.log(e)}
              />
              {
                <Icon
                  className="clear link"
                  onClick={(e: any) => console.log(e)}
                />
              }
            </div>
            <Button className="cancle-btn">
              <Icon>
                <img src={MinusIcon} />
              </Icon>
            </Button>
          </div>
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
                  // vaultKey={{
                  //   keyString: 'sku-depot',
                  //   patronType: PatronType.Pavilion,
                  // }}
                  // patronKey={{
                  //   keyString: 'sku-denizen',
                  //   patronType: PatronType.Denizen,
                  // }}
                  // validations={[
                  //   {
                  //     type: ValidationType.Duplication,
                  //     validator: depotHelper.duplicationValidator,
                  //   },
                  // ]}
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
          <td>
            <div className="board-write-radio open-option-radio">
              <Radio
                className="base"
                label="공개"
                name="optionGroup"
                value="option01"
                checked={false}
                onChange={(e: any) => console.log(e)}
              />
              <Radio
                className="base"
                label="비공개"
                name="optionGroup"
                value="option02"
                checked={true}
                onChange={(e: any) => console.log(e)}
              />
            </div>
            <span className="open-option-detail">
              비공개 설정시 작성한 본인과 커뮤니티 관리자만 확인할 수 있습니다.
            </span>
          </td>
        </td>
      </tr>
    </>
  );
};
export default AdminDiscussionCreateView;
