import React, { Component, createRef, useCallback, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { setSearchBox, getSearchBox, useSearchBox } from 'community/store/SearchBoxStore';
import { SearchBox } from 'community/model/SearchBox';


interface CalendarProps {
  searchBox: SearchBox
  defaultSearchType?: string
}

const Calendar: React.FC<CalendarProps> = function Calendar({ searchBox, defaultSearchType
}) {

  const [startDate, setStartDate] = useState<moment.Moment>();
  const [endDate, setEndDate] = useState<moment.Moment>();

  useEffect(() => {
    if (defaultSearchType && defaultSearchType === 'years') {
      onSetSearchYear(1);
    } else {
      onSetSearchWeek(1);
    }
  }, [])

  useEffect(() => {
    setSearchBox({
      ...searchBox,
      startDate: startDate && startDate.toDate().getTime(),
      endDate: endDate && endDate.toDate().getTime()
    });
  }, [startDate, endDate]);

  const onSetSearchDate = useCallback((day?: number) => {
    const endDate = moment().endOf('day');
    let startDate = moment().startOf('day');
    if (day) startDate = startDate.subtract(day, 'd');

    setEndDate(endDate);
    setStartDate(startDate);
  }, [endDate, startDate]);

  const onSetSearchWeek = useCallback((week?: number) => {
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
  }, [endDate, startDate]);

  const onSetSearchMon = useCallback((mon?: number) => {
    const endDate = moment().endOf('day');
    let startDate = moment().startOf('day');
    startDate = startDate.subtract(-1, 'day');
    if (mon) startDate = startDate.subtract(mon, 'M');
    setEndDate(endDate);
    setStartDate(startDate);
  }, [endDate, startDate]);

  const onSetSearchYear = useCallback((year?: number) => {
    const endDate = moment().endOf('day');
    let startDate = moment().startOf('day');
    startDate = startDate.subtract(-1, 'day');
    if (year) startDate = startDate.subtract(year, 'y');
    setEndDate(endDate);
    setStartDate(startDate);
  }, [endDate, startDate]);

  return (
    <div className="ui h40 admin_calendar" id="rangestart">
      <div className="ui input right icon">
        <DatePicker
          selected={startDate && startDate?.toDate()}
          onChange={(date: Date) =>
            setStartDate(moment(date))
          }
          selectsStart
          // startDate={this.state.startDate}
          // endDate={this.state.endDate}
          dateFormat="yyyy.MM.dd"
          maxDate={moment().toDate()}
        />
        <i className="calendar24 icon"><span className="blind">date</span></i>
      </div>
      <span>~</span>
      <div className="ui input right icon">
        <DatePicker
          selected={endDate && endDate?.toDate()}
          onChange={(date: Date) =>
            setEndDate(moment(date))
          }
          selectsStart
          // startDate={this.state.startDate}
          // endDate={this.state.endDate}
          dateFormat="yyyy.MM.dd"
          maxDate={moment().toDate()}
        />
        <i className="calendar24 icon"><span className="blind">date</span></i>
      </div>
      <div className="admin_date">
        <button className="ui button" onClick={() => onSetSearchDate()}>오늘</button>
        <button className="ui button" onClick={() => onSetSearchWeek(1)}>최근 1주</button>
        <button className="ui button" onClick={() => onSetSearchMon(1)}>최근 1개월</button>
        <button className="ui button" onClick={() => onSetSearchYear(1)}>최근 1년</button>
      </div>
    </div>
  )
}

export default Calendar;