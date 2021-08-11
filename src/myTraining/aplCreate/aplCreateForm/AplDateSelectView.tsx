import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import { Form, Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { AplModel } from 'myTraining/model';

interface AplDateSelectViewProps {
  apl: AplModel;
  startDateRef: any;
  endDateRef: any;
  changeAplProps: (
    name: string,
    value: string | {} | string[] | undefined
  ) => void;
}

function AplDateSelectView({
  apl,
  startDateRef,
  endDateRef,
  changeAplProps,
}: AplDateSelectViewProps) {
  return (
    <Form.Field>
      <label className="necessary">
        <PolyglotText id="개학등록-uisf-교육기간" defaultString="교육기간" />
      </label>
      <div className="calendar-wrap">
        <div className="ui calendar" id="rangestart">
          <div className="ui input right icon">
            <label>
              <PolyglotText id="개학등록-uisf-시작" defaultString="시작일" />
            </label>
            <DatePicker
              placeholderText="시작날짜를 선택해주세요."
              selected={(apl && apl.period && apl.period.startDateObj) || ''}
              onChange={(date: Date) =>
                changeAplProps(
                  'period.startDateMoment',
                  moment(date).startOf('day')
                )
              }
              dateFormat="yyyy.MM.dd"
              ref={startDateRef}
            />
            <Icon className="calendar24">
              <span className="blind">date</span>
            </Icon>
          </div>
        </div>
        <span className="dash">-</span>
        <div className="ui calendar" id="rangeend">
          <div className="ui input right icon">
            <label>
              <PolyglotText id="개학등록-uisf-종료" defaultString="종료일" />
            </label>
            <DatePicker
              placeholderText="시작날짜를 선택해주세요."
              selected={(apl && apl.period && apl.period.endDateObj) || ''}
              onChange={(date: Date) =>
                changeAplProps(
                  'period.endDateMoment',
                  moment(date).startOf('day')
                )
              }
              dateFormat="yyyy.MM.dd"
              minDate={apl.period.startDateObj}
              ref={endDateRef}
            />
            <Icon className="calendar24">
              <span className="blind">date</span>
            </Icon>
          </div>
        </div>
        <div className="info-text">
          <Icon className="info16">
            <span className="blind">infomation</span>
          </Icon>
          <PolyglotText
            id="개학등록-uisf-부가1"
            defaultString="일일 강좌 등록 시 시작일과 종료일의 날짜를 동일하게 설정해주시기 바랍니다."
          />
        </div>
      </div>
    </Form.Field>
  );
}

export default observer(AplDateSelectView);
