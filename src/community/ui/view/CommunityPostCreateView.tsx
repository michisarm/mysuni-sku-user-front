import React from 'react';
import { Checkbox, Form, Icon, Radio } from 'semantic-ui-react';

function CommunityPostCreateView() {
  return (
    <div className="form-contants">
      <Form>
        <Form.Field>
        {/* 공지 등록 체크박스 */}
          <div className="board-write-checkbox">
            <Checkbox
              className="base"
              label="중요 등록"
              name="radioGroup"
              value="oldest"
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
            {/*<Editor />*/}
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
              name="radioGroup"
              value="value01"
              //checked={this.state.value === "value01"}
              //onChange={this.handleChange}
            />
            <Radio
              className="base"
              label="비공개 (본인과 관리자만 게시물 확인)"
              name="radioGroup"
              value="value02"
              //checked={this.state.value === "value02"}
              //onChange={this.handleChange}
            />
          </div>
        </Form.Field>
      </Form>
      
      {/* Bottom */}
      <div className="survey-preview">
        <button className="ui button fix bg">등록</button>
      </div>
    </div>
  );
}

export default CommunityPostCreateView;
