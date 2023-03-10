import React, { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { AplModel } from 'myTraining/model';
import { AplState } from 'myTraining/model/AplState';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import {
  getChannelName,
  getCollgeName,
} from 'shared/service/useCollege/useRequestCollege';

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

interface RouteParams {
  page: string;
}

function MyApprovalInfoTable(props: Props) {
  const {
    model,
    files,
    allowHour,
    allowMinute,
    onChangeTime,
    onClearTime,
    allowHourRef,
    allowMinuteRef,
  } = props;
  const { page } = useParams<RouteParams>();

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

  const getAllowTimeByState = (model: AplModel) => {
    /* LearningPage :: 전체 */
    if (page === 'learning') {
      return <div>{model.displayAllowTime}</div>;
    }
    /* MyApprovalPage :: 승인 & 반려 */
    if (model.state === AplState.Opened || model.state === AplState.Rejected) {
      return <div>{model.displayAllowTime}</div>;
    }
    /* MyApprovalPage :: 승인대기 */
    return (
      <div className="time-wrap">
        <div className="time">
          <div className={`ui h48 input time ${getWriteStyle(allowHour)}`}>
            <input
              type="text"
              value={allowHour}
              onChange={changeAllowHour}
              ref={allowHourRef}
            />
            <label>
              <PolyglotText id="승인관리-개인상세-설명" defaultString="시" />
            </label>
            <i
              className="clear link icon"
              aria-hidden="true"
              onClick={clearAllowHour}
            />
          </div>
        </div>
        <div className="time">
          <div className={`ui h48 input time ${getWriteStyle(allowMinute)}`}>
            <input
              type="text"
              value={allowMinute}
              onChange={changeAllowMinute}
              ref={allowMinuteRef}
            />
            <label>
              <PolyglotText id="승인관리-개인상세-설명1" defaultString="분" />
            </label>
            <i
              className="clear link icon"
              aria-hidden="true"
              onClick={clearAllowMinute}
            />
          </div>
        </div>
        <div className="info-text">
          <i className="info16 icon">
            <span className="blind">infomation</span>
          </i>
          <PolyglotText
            id="승인관리-개인상세-설명2"
            defaultString="학습시간으로 인정되는 교육시간을 입력해주세요. / 승인자에 의해 교육시간은 변경될 수 있습니다."
          />
        </div>
      </div>
    );
  };

  const collegeName = getCollgeName(model.collegeId);
  const channelName = getChannelName(model.channelId);
  return (
    <table className="ui create table">
      <tbody>
        <tr>
          <th scope="row">
            <PolyglotText id="승인관리-개인상세-th1" defaultString="교육명" />
          </th>
          <td>
            <div>{model.title}</div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <PolyglotText id="승인관리-개인상세-th2" defaultString="교육형태" />
          </th>
          <td>
            <div>{model.displayTypeName}</div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <PolyglotText id="승인관리-개인상세-th3" defaultString="Channel" />
          </th>
          <td>
            <div>{`${collegeName} | ${channelName}`}</div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <PolyglotText id="승인관리-개인상세-th4" defaultString="교육기간" />
          </th>
          <td>
            <div>{model.displayLearningTime}</div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <PolyglotText id="승인관리-개인상세-th5" defaultString="교육기관" />
          </th>
          <td>
            <div>{model.institute}</div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <PolyglotText id="승인관리-개인상세-th6" defaultString="교육시간" />
          </th>
          <td>{getAllowTimeByState(model)}</td>
        </tr>
        <tr>
          <th scope="row">
            <PolyglotText id="승인관리-개인상세-th7" defaultString="교육내용" />
          </th>
          <td>
            <div>{model.content}</div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <PolyglotText id="승인관리-개인상세-th8" defaultString="첨부파일" />
          </th>
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
                        onClick={(e) => {
                          depot.downloadDepotFile(foundedFile.id);
                          e.preventDefault();
                        }}
                      >
                        {'    ' + foundedFile.name + '     '}
                      </span>
                    </a>
                  </div>
                ))) ||
              null}
          </td>
        </tr>
        {model.state === AplState.Opened && (
          <tr>
            <th scope="row">
              <PolyglotText
                id="승인관리-개인상세-승인자"
                defaultString="승인자"
              />
            </th>
            <td>
              <div>
                <span>
                  {parsePolyglotString(model.approvalUserIdentity?.name)}
                </span>
                <span className="l">
                  {parsePolyglotString(model.approvalUserIdentity?.companyName)}
                </span>
                <span className="l">
                  {parsePolyglotString(
                    model.approvalUserIdentity?.departmentName
                  )}
                </span>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default memo(MyApprovalInfoTable);

/* globals */
const getWriteStyle = (time: string) => {
  return time === '' ? '' : 'write';
};
