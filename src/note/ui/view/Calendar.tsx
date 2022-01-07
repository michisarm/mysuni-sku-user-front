import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { setSearchBox } from '../../store/SearchBoxStore';
import { SearchBox } from '../../model/SearchBox';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { Button } from 'semantic-ui-react';

interface CalendarProps {
  searchBox: SearchBox;
  defaultSearchType?: string;
  createTime?: number;
}

enum ActiveBtnState {
  DAY = 'd',
  WEEK = 'w',
  MONTH = 'm',
  YEAR = 'y',
  NONE = '',
}

const Calendar: React.FC<CalendarProps> = function Calendar({
  searchBox,
  defaultSearchType,
  createTime,
}) {
  const [startDate, setStartDate] = useState<moment.Moment>();
  const [endDate, setEndDate] = useState<moment.Moment>();
  const [activeBtn, setActiveBtn] = useState<ActiveBtnState>(
    ActiveBtnState.NONE
  );

  useEffect(() => {
    if (defaultSearchType && defaultSearchType === 'years') {
      onSetSearchYear(1);
    } else {
      // onSetSearchWeek(1);
      onSetSearchMon(1);
    }
    createTime && createTime > 0 && setStartDate(moment(createTime));
  }, [createTime]);

  useEffect(() => {
    setSearchBox({
      ...searchBox,
      startDate: startDate && startDate.toDate().getTime(),
      endDate: endDate && endDate.toDate().getTime(),
    });
  }, [startDate, endDate]);

  const onSetDateSelect = (type: string, date: moment.Moment) => {
    //
    if (type === 'startDate') setStartDate(date);
    else setEndDate(date);

    setActiveBtn(ActiveBtnState.NONE);
  };

  const onSetSearchDate = useCallback(
    (day?: number) => {
      const endDate = moment().endOf('day');
      let startDate = moment().startOf('day');
      if (day) startDate = startDate.subtract(day, 'd');

      setEndDate(endDate);
      setStartDate(startDate);
      setActiveBtn(ActiveBtnState.DAY);
    },
    [endDate, startDate]
  );

  const onSetSearchWeek = useCallback(
    (week?: number) => {
      const endDate = moment().endOf('day');
      let startDate = moment().startOf('day');
      const period = 7;
      let day = 0;
      if (week !== undefined) {
        if (week === 1) {
          day = period - 1;
        } else if (week > 1) {
          day = period * (week - 1) + 6;
        } else {
          day = period * week;
        }
      }

      if (day) startDate = startDate.subtract(day, 'd');

      setEndDate(endDate);
      setStartDate(startDate);
      setActiveBtn(ActiveBtnState.WEEK);
    },
    [endDate, startDate]
  );

  const onSetSearchMon = useCallback(
    (mon?: number) => {
      const endDate = moment().endOf('day');
      let startDate = moment().startOf('day');
      startDate = startDate.subtract(-1, 'day');
      if (mon) startDate = startDate.subtract(mon, 'M');
      setEndDate(endDate);
      setStartDate(startDate);
      setActiveBtn(ActiveBtnState.MONTH);
    },
    [endDate, startDate]
  );

  const onSetSearchYear = useCallback(
    (year?: number) => {
      const endDate = moment().endOf('day');
      let startDate = moment().startOf('day');
      startDate = startDate.subtract(-1, 'day');
      if (year) startDate = startDate.subtract(year, 'y');
      setEndDate(endDate);
      setStartDate(startDate);
      setActiveBtn(ActiveBtnState.YEAR);
    },
    [endDate, startDate]
  );

  return (
    <div className="ui h40 admin_calendar" id="rangestart">
      <div className="ui input right icon">
        <DatePicker
          selected={startDate && startDate?.toDate()}
          // onChange={(date: Date) => setStartDate(moment(date))}
          onChange={(date: Date) => onSetDateSelect('startDate', moment(date))}
          selectsStart
          // startDate={this.state.startDate}
          // endDate={this.state.endDate}
          dateFormat="yyyy.MM.dd"
          maxDate={moment().toDate()}
        />
        <i className="calendar24 icon">
          <span className="blind">date</span>
        </i>
      </div>
      <span>~</span>
      <div className="ui input right icon">
        <DatePicker
          selected={endDate && endDate?.toDate()}
          // onChange={(date: Date) => setEndDate(moment(date))}
          onChange={(date: Date) => onSetDateSelect('endDate', moment(date))}
          selectsStart
          // startDate={this.state.startDate}
          // endDate={this.state.endDate}
          dateFormat="yyyy.MM.dd"
          maxDate={moment().toDate()}
        />
        <i className="calendar24 icon">
          <span className="blind">date</span>
        </i>
      </div>
      <div className="admin_date">
        <Button
          className="ui button"
          active={activeBtn === ActiveBtnState.DAY}
          onClick={() => onSetSearchDate()}
        >
          <PolyglotText id="Calendar-option-오늘" defaultString="오늘" />
        </Button>
        <Button
          className="ui button"
          active={activeBtn === ActiveBtnState.WEEK}
          onClick={() => onSetSearchWeek(1)}
        >
          <PolyglotText id="Calendar-option-최근주" defaultString="최근 1주" />
        </Button>
        <Button
          className="ui button"
          active={activeBtn === ActiveBtnState.MONTH}
          onClick={() => onSetSearchMon(1)}
        >
          <PolyglotText
            id="Calendar-option-최근개월"
            defaultString="최근 1개월"
          />
        </Button>
        <Button
          className="ui button"
          active={activeBtn === ActiveBtnState.YEAR}
          onClick={() => onSetSearchYear(1)}
        >
          <PolyglotText id="Calendar-option-최근년" defaultString="최근 1년" />
        </Button>
      </div>
    </div>
  );
};

export default Calendar;
