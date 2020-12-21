import React, { Component } from "react";
import { Select } from "semantic-ui-react";
const selectOptions02 = [
  { key: "all", value: "all", text: "20개씩 보기" },
  { key: "subject", value: "subject", text: "제목" },
  { key: "contents", value: "contents", text: "내용" },
  { key: "writer", value: "writer", text: "작성자" },
];

class TableTitle extends Component {
  render() {
    return (
      <div className="table-board-title">
        <div className="table_list_string">
         ㆍ전체 <strong>30,980명</strong>멤버
        </div>
        <div className="right-wrap">
        <Select
                className="ui small-border admin_table_select"
                defaultValue={selectOptions02[0].value}
                options={selectOptions02}
              />
              <button class="ui button admin_table_button" disabled="" tabindex="">멤버 삭제</button>
              {/* <button class="ui button admin_table_button02" disabled="" tabindex="">그룹 멤버 삭제</button> */}
        </div>
      </div>
    );
  }
}

export default TableTitle;
