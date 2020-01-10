import * as React from 'react';
import { Radio } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { BoardModel } from '../../../board/model/BoardModel';

interface Props {
  onChangeBoardProps: (name: string, value: string | Date | boolean, nameSub?: string) => void
  board: BoardModel
}

interface States {
}

@observer
@reactAutobind
class AdditionalInfoForCommunityView extends React.Component<Props, States> {
  //
  render() {
    const { onChangeBoardProps, board } = this.props;

    return (

      <div className="ui grid create">
        <div className="column">
          <label className="necessary">커뮤니티 구분</label>
          <Radio
            className="base"
            label="오픈형"
            name="config"
            checked={board && board.config && board.config.enClosed === false}
            onClick={() => onChangeBoardProps('config.enClosed', false)}
          />
          <Radio
            className="base"
            label="폐쇄형"
            name="config"
            checked={board && board.config && board.config.enClosed === true}
            onClick={() => onChangeBoardProps('config.enClosed', true)}
          />
        </div>
        {
          board && board.config && board.config.enClosed && (
            <div className="column">
              <label className="necessary">기간</label>
              <div className="ui calendar" id="rangestart">
                <div className="ui input right icon">
                  <label>시작일</label>
                  {/* TODO! 시작일 종료일 날짜가 같이 바뀜.... */}
                  <DatePicker
                    placeholderText="시작날짜를 선택해주세요."
                    selected={board && board.learningPeriod && board.learningPeriod.startDateObj || ''}
                    onChange={(date: Date) => onChangeBoardProps('learningPeriod.startDateObj', date, 'learningPeriod.startDate')}
                    minDate={new Date()}
                    dateFormat="yyyy.MM.dd"
                  />
                  <i className="calendar24 icon"><span className="blind">date</span></i>
                </div>
              </div>
              <span className="dash">-</span>
              <div className="ui calendar" id="rangeend">
                <div className="ui input right icon">
                  <label>종료일</label>
                  {/* TODO! 시작일 종료일 날짜가 같이 바뀜.... */}
                  <DatePicker
                    placeholderText="종료날짜를 선택해주세요."
                    selected={board && board.learningPeriod && board.learningPeriod.endDateObj || ''}
                    onChange={(date: Date) => onChangeBoardProps('learningPeriod.endDateObj', date, 'learningPeriod.endDate')}
                    minDate={board && board.learningPeriod && board.learningPeriod.startDateObj || ''}
                    disabled={
                      board && board.learningPeriod
                      && board.learningPeriod.endDateDot === '2100.12.30'
                    }
                    dateFormat="yyyy.MM.dd"
                  />
                  <i className="calendar24 icon"><span className="blind">date</span></i>
                </div>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}


export default AdditionalInfoForCommunityView;

