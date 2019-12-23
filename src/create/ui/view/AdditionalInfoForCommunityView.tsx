import * as React from 'react';
import { Radio } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { BoardModel } from '@sku/personalcube';


interface Props {
  onChangeBoardProps: (name: string, value: string | Date | boolean, nameSub?: string) => void
  board: BoardModel
  onClickUnlimitedPeriod: () => void
}

interface States {
}

@observer
@reactAutobind
class AdditionalInfoForCommunityView extends React.Component<Props, States> {
  //
  render() {
    const { onChangeBoardProps, board, onClickUnlimitedPeriod } = this.props;
    return (

      <div className="ui grid create">
        <div className="column">
          <label className="necessary">커뮤니티 구분</label>
          <Radio
            className="base"
            label="오픈형"
            value="false"
            name="radioGroup"
            checked={board && board.config && board.config.enClosed === false}
            onClick={() => onChangeBoardProps('config.enClosed', false)}
          />
          <Radio
            className="base"
            label="폐쇄형"
            value="true"
            name="radioGroup"
            checked={board && board.config && board.config.enClosed === true}
            onClick={() => onChangeBoardProps('config.enClosed', true)}
          />
        </div>
        {
          board && board.config && board.config.enClosed ?
            <div className="column">
              <label className="necessary">기간</label>
              <div className="ui calendar" id="rangestart">
                <div className="ui input right icon">
                  <label>시작일</label>
                  {/* TODO! 시작일 종료일 날짜가 같이 바뀜.... */}
                  <DatePicker
                    placeholderText="시작날짜를 선택해주세요."
                    selected={board && board.learningPeriod && board.learningPeriod.startDateSub || ''}
                    onChange={(date: Date) => onChangeBoardProps('learningPeriod.startDateSub', date, 'learningPeriod.startDate')}
                    minDate={new Date()}
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
                    selected={board && board.learningPeriod && board.learningPeriod.endDateSub || ''}
                    onChange={(date: Date) => onChangeBoardProps('learningPeriod.endDateSub', date, 'learningPeriod.endDate')}
                    minDate={board && board.learningPeriod && board.learningPeriod.startDateSub || ''}
                    disabled={
                      board && board.learningPeriod
                      && board.learningPeriod.endDateSub.toLocaleDateString() === new Date(2100, 12, 30).toLocaleDateString()
                    }
                  />
                  <i className="calendar24 icon"><span className="blind">date</span></i>
                </div>
              </div>
            </div>
            :
            null
        }
      </div>
    );
  }
}

export default AdditionalInfoForCommunityView;

