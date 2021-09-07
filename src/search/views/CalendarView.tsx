import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { getQueryId, search } from 'search/search.events';
import { FilterCondition, SearchParam } from 'search/search.models';
import { getFilterCondition, setFilterCondition } from 'search/search.services';
import { Button, Image } from 'semantic-ui-react';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

interface CalendarViewProps {
  filterCondition: FilterCondition;
}

export function CalendarView({ filterCondition }: CalendarViewProps) {
  const PUBLIC_URL = process.env.PUBLIC_URL;

  const params = useParams<SearchParam>();
  const queryId = getQueryId();

  let calenderClassName = 'search_calender';
  if (filterCondition.applying) {
    calenderClassName += ' disabled';
  }
  return (
    // <div className="search_calender">에  disabled클래스 추가될 경우 시작일 선택/종료일 선택/ 불가합니다
    <div className={calenderClassName}>
      <div className="date_picker">
        <DatePicker
          selected={filterCondition.learning_start_date_str}
          onChange={(learning_start_date_str) => {
            const mFilterCondition = getFilterCondition();
            if (mFilterCondition === undefined) {
              return;
            }
            setFilterCondition({
              ...mFilterCondition,
              learning_start_date_str,
            });
          }}
          dateFormat="yyyy.MM.dd"
          placeholderText={getPolyglotText('시작일', '통검-필레팝-시작일')}
        />
      </div>
      <span>~</span>
      <div className="date_picker">
        <DatePicker
          selected={filterCondition.learning_end_date_str}
          onChange={(learning_end_date_str) => {
            const mFilterCondition = getFilterCondition();
            if (mFilterCondition === undefined) {
              return;
            }
            setFilterCondition({
              ...mFilterCondition,
              learning_end_date_str,
            });
          }}
          dateFormat="yyyy.MM.dd"
          placeholderText={getPolyglotText('종료일', '통검-필레팝-종료일')}
          minDate={filterCondition.learning_start_date_str}
        />
        {filterCondition.applying && (
          <Button className="btn_dateP">
            <Image
              src={`${PUBLIC_URL}/images/all/search-smallbox-dim.png`}
              alt="검색버튼"
              className="before"
            />
          </Button>
        )}
        {!filterCondition.applying && (
          <Button
            className="btn_dateP"
            onClick={() => search(queryId, params && params.searchType)}
          >
            <Image
              src={`${PUBLIC_URL}/images/all/search-smallbox-act.png`}
              alt="검색버튼"
              className="after"
            />
          </Button>
        )}
      </div>
    </div>
  );
}
