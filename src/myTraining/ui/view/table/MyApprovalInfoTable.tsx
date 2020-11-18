import React, { memo, useCallback } from 'react';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { AplModel } from 'myTraining/model';
import { AplState } from 'myTraining/model/AplState';



interface Props {
  model: AplModel;
  files: Map<string, any>;
  allowHour: string;
  allowMinute: string;
  onChangeTime: (hourOrMinute: string, e: any) => void;
  onClearTime: (hourOrMinute: string) => void;
  allowHourRef: any;
  allowMinuteRef: any;
}


function MyApprovalInfoTable(props: Props) {
  const { model, files, allowHour, allowMinute, onChangeTime, onClearTime, allowHourRef, allowMinuteRef } = props;
  /* handlers */
  const changeAllowHour = useCallback((e: any) => {
    onChangeTime('hour', e);
  }, []);

  const changeAllowMinute = useCallback((e: any) => {
    onChangeTime('minute', e);
  }, []);

  const clearAllowHour = useCallback(() => {
    onClearTime('hour');
  }, [onClearTime]);

  const clearAllowMinute = useCallback(() => {
    onClearTime('minute');
  }, [onClearTime]);

  /* render functions */
  const getAllowTimeByState = (model: AplModel) => {
    /* 승인 또는 반려 */
    if (model.state === AplState.Opened || model.state === AplState.Rejected) {
      return (
        <div>{model.displayAllowTime}</div>
      );
    }

    /* 승인요청 & 반려 */
    return (
      <div className="time-wrap">
        <div className="time">
          <div className={`ui h48 input time ${getWriteStyle(allowHour)}`}>
            <input type="text" value={allowHour} onChange={changeAllowHour} ref={allowHourRef} />
            <label>시</label>
            <i className="clear link icon" aria-hidden="true" onClick={clearAllowHour} />
          </div>
        </div>
        <div className="time">
          <div className={`ui h48 input time ${getWriteStyle(allowMinute)}`}>
            <input type="text" value={allowMinute} onChange={changeAllowMinute} ref={allowMinuteRef} />
            <label>분</label>
            <i className="clear link icon" aria-hidden="true" onClick={clearAllowMinute} />
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
            <div>{model.displayTypeName}</div>
          </td>
        </tr>
        <tr>
          <th scope="row">Channel</th>
          <td>
            <div>{model.displayCollegeChannelName}</div>
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
            {getAllowTimeByState(model)}
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
            {(files &&
              files.get('reference') &&
              files
                .get('reference')
                .map((foundedFile: DepotFileViewModel, index: number) => (
                  <div>
                    <a href="#" className="link" key={index}>
                      <span
                        className="ellipsis"
                        onClick={() =>
                          depot.downloadDepotFile(foundedFile.id)
                        }
                      >
                        {'    ' + foundedFile.name + '     '}
                      </span>
                    </a>
                  </div>
                ))) ||
              null}
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

export default memo(MyApprovalInfoTable);

/* globals */
const getWriteStyle = (time: string) => {
  return time === '' ? '' : 'write';
}
