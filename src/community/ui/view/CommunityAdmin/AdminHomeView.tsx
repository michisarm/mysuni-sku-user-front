import React from 'react';

// sementic-ui
import { Segment, Select, Form, Icon } from 'semantic-ui-react';
import classNames from 'classnames';

interface AdminHomeViewProps {
  communityId: string;
}

const AdminHomeView: React.FC<AdminHomeViewProps> = function AdminHomeView({
  communityId,
}) {
  const selectOptions = [{ key: 'normal', value: 'normal', text: '기본' }];
  return (
    <>
      {/* 검색창 */}
      <table className="ui admin_table_top none">
        <colgroup>
          <col width="200px" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>
              유형<span>*</span>
            </th>
            <td>
              <Select
                placeholder="전체"
                className="ui small-border admin_tab_select"
                defaultValue={selectOptions[0].value}
                options={selectOptions}
              />
            </td>
          </tr>
          <tr>
            <th>
              대표 이미지<span>*</span>
            </th>
            <td className="admin_img">
              <div className="preview admin">
                <div className="ui input file2">
                  <label
                    htmlFor="hidden-new-file2"
                    className="ui button admin_text_button"
                  >
                    이미지 첨부
                  </label>
                  <input type="file" id="hidden-new-file2" />
                </div>
              </div>
              <span className="regi_span">
                ※ 이미지 최적 사이즈는 가로 850px 입니다. (jpg, jpeg, png, gif
                확장자만 첨부 가능)
              </span>
            </td>
          </tr>
          <tr>
            <th>
              환영 메세지<span>*</span>
            </th>
            <td>
              <div
                className={classNames('ui right-top-count input admin', {
                  // focus: this.state.focus,
                  // write: this.state.write,
                })}
                style={{ width: '100%' }}
              >
                <input
                  type="text"
                  placeholder="커뮤니티 환영 메시지를 입력해주세요."
                  // // value={this.state.write}
                  // onClick={() => this.setState({ focus: true })}
                  // onBlur={() => this.setState({ focus: false })}
                  // onChange={e => this.setState({ write: e.target.value })}
                />
                <Icon
                  className="clear link"
                  // onClick={() => this.setState({ write: '' })}
                />
                <span className="validation">
                  You can enter up to 100 characters.
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="admin_bottom_button line none">
        <button className="ui button admin_table_button02 left">
          미리보기
        </button>
        <button className="ui button admin_table_button">저장</button>
      </div>
    </>
  );
};

export default AdminHomeView;
