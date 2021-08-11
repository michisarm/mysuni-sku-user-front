import React from 'react';
import { observer } from 'mobx-react';
import { Form, Icon } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { onChangeAplTimePropsValid, onClear } from '../aplCreate.events';
import { AplModel } from 'myTraining/model';

interface AplCreateLearningTimeViewProps {
  apl: AplModel;
  requestHourRef: any;
  requestMinuteRef: any;
  onChangeAplTimePropsValid: (name: string, value: string | number) => void;
}

function AplCreateLearningTimeView({
  apl,
  requestHourRef,
  requestMinuteRef,
  onChangeAplTimePropsValid,
}: AplCreateLearningTimeViewProps) {
  const requestHourCount =
    (apl && apl.requestHour && apl.requestHour.toString().length) || 0;
  const requestMinuteCount =
    (apl && apl.requestMinute && apl.requestMinute.toString().length) || 0;

  return (
    <Form.Field>
      <label className="necessary">
        <PolyglotText id="개학등록-uisf-교육시간" defaultString="교육시간" />
      </label>
      <div className="time-wrap">
        <div className="time">
          <div
            className={
              requestHourCount === 0
                ? 'ui h48 input time'
                : 'ui h48 input time write'
            }
          >
            <input
              id="requestHour"
              type="text"
              value={
                isNaN(apl && apl.requestHour)
                  ? 0
                  : parseInt(String(apl && apl.requestHour))
              }
              min="0"
              onChange={(e: any) =>
                onChangeAplTimePropsValid('requestHour', e.target.value)
              }
              onBlur={(e: any) =>
                onChangeAplTimePropsValid('requestHour', e.target.value)
              }
              ref={requestHourRef}
            />
            <label>
              <PolyglotText id="개학등록-uisf-h" defaultString="시간" />
            </label>
            <Icon
              aria-hidden="true"
              className="clear link"
              onClick={() => onClear('requestHour')}
            />
          </div>
        </div>
        <div className="time">
          <div
            className={
              requestMinuteCount === 0
                ? 'ui h48 input time'
                : 'ui h48 input time write'
            }
          >
            <input
              id="requestMinute"
              type="text"
              value={
                isNaN(apl && apl.requestMinute)
                  ? 0
                  : parseInt(String(apl && apl.requestMinute))
              }
              min="0"
              onChange={(e: any) =>
                onChangeAplTimePropsValid('requestMinute', e.target.value)
              }
              onBlur={(e: any) =>
                onChangeAplTimePropsValid('requestMinute', e.target.value)
              }
              ref={requestMinuteRef}
            />
            <label>
              <PolyglotText id="개학등록-uisf-m" defaultString="분" />
            </label>
            <Icon
              aria-hidden="true"
              className="clear link"
              onClick={() => onClear('requestMinute')}
            />
          </div>
        </div>
        <div className="info-text">
          <Icon className="info16">
            <span className="blind">infomation</span>
          </Icon>
          <PolyglotText
            id="개학등록-uisf-부가2"
            defaultString="학습시간으로 인정되는 교육시간을 입력해주세요."
          />
          <br />
          <Icon className="info16">
            <span className="blind">infomation</span>
          </Icon>
          <PolyglotText
            id="개학등록-uisf-부가3"
            defaultString="교육시간은 100시간 이상, 1분 이내는 등록할 수 없습니다."
          />
          <br />
          <Icon className="info16">
            <span className="blind">infomation</span>
          </Icon>
          <PolyglotText
            id="개학등록-uisf-부가4"
            defaultString="승인자에 의해 교육시간은 변경될 수 있습니다."
          />
        </div>
      </div>
    </Form.Field>
  );
}

export default observer(AplCreateLearningTimeView);
