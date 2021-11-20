import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  value: string;
  name: string;
  selectedValue: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function DateFilterButton(props: Props) {
  const { name, value, selectedValue, onClick } = props;
  const isSelected = selectedValue === value;
  const classes = `ui button ${isSelected && 'active'}`;

  return (
    <button className={classes} value={value} tabIndex={1} onClick={onClick}>
      {name}
    </button>
  );
}

const ButtonList = [
  {
    name: '오늘',
    value: 'day',
  },
  {
    name: '최근 1주',
    value: 'week',
  },
  {
    name: '최근 1개월',
    value: 'month',
  },
  {
    name: '최근 1년',
    value: 'year',
  },
];

interface CalendarProps {
  // selectedDateValue: string;
  startDate: Date;
  endDate: Date;
  // onClickDateValue: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChangeStartDate: (date: Date) => void;
  onChangeEndDate: (date: Date) => void;
}

function Calendar({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
}: CalendarProps) {
  const [selectDateFilterName, setSelectDateFilterName] = useState('');

  const onClickDateFilterButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setSelectDateFilterName(e.currentTarget.value);
    },
    [],
  );

  useEffect(() => {
    const now = new Date();

    let assignedStartDate: Date;

    switch (selectDateFilterName) {
      case 'day':
        assignedStartDate = new Date(new Date().setHours(0, 0, 0));
        break;
      case 'week':
        assignedStartDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        assignedStartDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        assignedStartDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        return;
    }

    onChangeStartDate(assignedStartDate);
    onChangeEndDate(new Date(new Date().setHours(23, 59, 59)));
  }, [selectDateFilterName, onChangeStartDate, onChangeEndDate]);

  return (
    <div className="ui h40 admin_calendar" id="rangestart">
      <div className="ui input right icon">
        <DatePicker
          selected={startDate}
          onChange={onChangeStartDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate}
          dateFormat="yy.MM.d"
        />
        <i className="calendar24 icon">
          <span className="blind">date</span>
        </i>
      </div>
      <span>~</span>
      <div className="ui input right icon">
        <DatePicker
          selected={endDate}
          onChange={onChangeEndDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yy.MM.d"
        />
        <i className="calendar24 icon">
          <span className="blind">date</span>
        </i>
      </div>
      <div className="admin_date">
        {ButtonList.map((button, i) => (
          <DateFilterButton
            key={i}
            name={button.name}
            value={button.value}
            selectedValue={selectDateFilterName}
            onClick={onClickDateFilterButton}
          />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
