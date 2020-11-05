import React, { useState, useEffect } from 'react';
import { AplModel } from 'myTraining/model';
import { AplState } from 'myTraining/model/AplState';


interface Props {
  model: AplModel;
  allowHour: string;
  allowMinute: string;
  onChangeAllowHour: (e: any) => void;
  onChangeAllowMinute: (e: any) => void;
  onClearAllowHour: () => void;
  onClearAllowMinute: () => void;
}

function MyApprovalInfoTable(props: Props) {
  const { model, allowHour, allowMinute, onChangeAllowHour, onChangeAllowMinute, onClearAllowHour, onClearAllowMinute } = props;

  /* render functions */
  const renderLearningTimeByApprovalState = (model: AplModel) => {
    /* 승인 */
    if (model.state === AplState.Opened || model.state === AplState.Rejected) {
      return (
        <div>{model.updateTime}</div>
      );
    }

    /* 승인요청 & 반려 */
    return (
      <div className="time-wrap">
        <div className="time">
          <div className={`ui h48 input time ${getWriteStyle(allowHour)}`}>
            <input type="text" value={allowHour} onChange={onChangeAllowHour} />
            <label>시</label>
            <i className="clear link icon" aria-hidden="true" onClick={onClearAllowHour} />
          </div>
        </div>
        <div className="time">
          <div className={`ui h48 input time ${getWriteStyle(allowMinute)}`}>
            <input type="text" value={allowMinute} onChange={onChangeAllowMinute} />
            <label>분</label>
            <i className="clear link icon" aria-hidden="true" onClick={onClearAllowMinute} />
          </div>
        </div>
        <div className="info-text">
          <i className="info16 icon">
            <span className="blind">infomation</span>
          </i>
          학습시간으로 인정되는 교육시간을 입력해주세요. / 승인자에 의해 교육시간은 변경될 수 있습니다.
        </div>
      </div>
    );
  }

  /* render */
  return (
    <table className="ui create table">
      <tbody>
        <tr>
          <th scope="row">교육명</th>
          <td>
            <div>
              {model.title}
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">교육형태</th>
          <td>
            <div>{model.displayTypeAndTypeName}</div>
          </td>
        </tr>
        <tr>
          <th scope="row">Channel</th>
          <td>
            <div>{model.channelName ? model.channelName : '-'}</div>
          </td>
        </tr>
        <tr>
          <th scope="row">교육기간</th>
          <td>
            <div>{model.displayLearningTime}</div>
          </td>
        </tr>
        <tr>
          <th scope="row">교육기관</th>
          <td>
            <div>{model.institute}</div>
          </td>
        </tr>
        <tr>
          <th scope="row">교육시간</th>
          <td>
            {renderLearningTimeByApprovalState(model)}
          </td>
        </tr>
        <tr>
          <th scope="row">교육내용</th>
          <td>
            <div>{model.content}</div>
          </td>
        </tr>
        <tr>
          <th scope="row">첨부파일</th>
          <td>
            <div><a href="#">Education UX/UI class_1.avi</a></div>
          </td>
        </tr>
        {model.state === AplState.Opened &&
          (
            <tr>
              <th scope="row">승인자</th>
              <td>
                <div>
                  <span>{model.approvalName}</span>
                  <span className="l">{model.approvalCompany}</span>
                  <span className="l">{model.approvalDepartment}</span>
                </div>
              </td>
            </tr>
          )
        }
      </tbody>
    </table >
  );
}

export default MyApprovalInfoTable;

/* globals */
const getWriteStyle = (time: string) => {
  return time === '' ? '' : 'write';
}
