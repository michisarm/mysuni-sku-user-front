import React, { ReactNode, useState } from 'react';
import { Button, Checkbox, Icon, Radio } from 'semantic-ui-react';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import ResultBtn from '../../resources/images/all/icon-result-arrow.png';

interface Props {
  isOnFilter: boolean;
}

const SearchFilter: React.FC<Props> = ({ isOnFilter }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [cpOpened, setCpOpened] = useState(false);

  const handleChangeStart = (date: any) => {
    setStartDate(date);
  };
  const handleChangeEnd = (date: any) => {
    setEndDate(date);
  };

  return (
    <div className={classNames('filter-table', isOnFilter ? 'on' : '')}>
      <div className="title">
        Filter
        <a className="result-button">
          {/* <img src={ResultBtn} alt="btn" className="result-btn-img" /> */}
          <span className="result-text">결과보기</span>
        </a>
      </div>
      <table>
        <tbody>
          <tr>
            <th>컬리지</th>
            <td>
              <Checkbox className="base" label="SelectAll" />
              <Checkbox className="base" label="Al(13)" checked={true} />
              <Checkbox className="base" label="DT(13)" />
              <Checkbox className="base" label="행복(13)" />
              <Checkbox className="base" label="SV(13)" />
              <Checkbox className="base" label="혁신디자인(13)" />
              <Checkbox className="base" label="Global(13)" />
              <Checkbox className="base" label="Leadership(13)" />
              <Checkbox className="base" label="Management(13)" />
              <Checkbox className="base" label="반도체(13)" />
              <Checkbox className="base" label="에너지솔루션(13)" />
              <Checkbox className="base" label="SK경영(13)" />
              <Checkbox className="base" label="SK아카데미(13)" />
              <Checkbox className="base" label="Life Style(13)" />
            </td>
          </tr>
          <tr>
            <th>난이도</th>
            <td>
              <Checkbox className="base" label="SelectAll" />
              <Checkbox className="base" label="Basic" />
              <Checkbox className="base" label="Intermediate" checked={true} />
              <Checkbox className="base" label="Advanced" />
              <Checkbox className="base" label="Expert" />
            </td>
          </tr>
          <tr>
            <th>학습시간</th>
            <td>
              <Checkbox className="base" label="SelectAll" />
              <Checkbox className="base" label="30분 미만" checked={true} />
              <Checkbox
                className="base"
                label="30분 이상~1시간 미만"
                checked={true}
              />
              <Checkbox className="base" label="1시간 이상~4시간 미만" />
              <Checkbox className="base" label="4시간 이상~12시간 미만" />
              <Checkbox className="base" label="12시간 이상" />
            </td>
          </tr>
          <tr>
            <th>
              교육기관
              {/*확장버튼 추가*/}
              <button
                type="button"
                className={`btn_filter_extend ${cpOpened ? 'open' : ''}`}
                onClick={() => setCpOpened(!cpOpened)}
              >
                펼치기
              </button>
              {/*<button type="button" className="btn_filter_extend">펼치기</button>*/}
            </th>
            <td>
              <Checkbox className="base" label="SelectAll" />
              <Checkbox className="base" label="mySUNI" checked={true} />
              <Checkbox className="base" label="Course" checked={true} />
              <Checkbox className="base" label="Linkedin" />
              <Checkbox className="base" label="POSTEC" />

              {/*확장 item area : 기본노출을 제외한 item들을 div로 한번 더 감싸줌.
                            확장시 'on' class 추가.*/}
              {cpOpened && (
                <div className="extend_area on">
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                </div>
              )}
            </td>
          </tr>
          <tr>
            <th>교육유형</th>
            <td>
              <Checkbox className="base" label="SelectAll" />
              <Checkbox className="base" label="Course(13)" checked={true} />
              <Checkbox className="base" label="Video(13)" checked={true} />
              <Checkbox className="base" label="Audio(13)" />
              <Checkbox className="base" label="e-Learning(13)" />
              <Checkbox className="base" label="Classroom(13)" />
              <Checkbox className="base" label="Community(13)" />
              <Checkbox className="base" label="Web Page(13)" />
              <Checkbox className="base" label="Documents(13)" />
            </td>
          </tr>
          <tr>
            <th>핵인싸 과정</th>
            <td>
              <Radio
                className="base"
                label="Select All"
                name="radio01"
                checked={true}
              />
              <Radio className="base" label="포함" name="radio01" />
              <Radio className="base" label="비포함" name="radio01" />
            </td>
          </tr>
          <tr>
            <th>Certification</th>
            <td>
              <Checkbox className="base" label="SelectAll" />
              <Checkbox className="base" label="Stamp" checked={true} />
              <Checkbox className="base" label="Badge" />
            </td>
          </tr>
          <tr>
            <th>교육일정</th>
            <td>
              <div className="calendar-cell">
                <div className="ui h40 calendar" id="rangeStart">
                  <div className="ui input right icon">
                    <label>시작일</label>
                    <DatePicker
                      selected={startDate}
                      onChange={date => handleChangeStart(date)}
                      selectsStart
                      dateFormat="yy.MM.d"
                    />
                    <Icon className="calendar24">
                      <span className="blind">date</span>
                    </Icon>
                  </div>
                </div>
                <span className="dash">-</span>
                <div className="ui h40 calendar" id="rangeEnd">
                  <div className="ui input right icon">
                    <label>종료일</label>
                    <DatePicker
                      selected={endDate}
                      onChange={date => handleChangeEnd(date)}
                      selectsEnd
                      minDate={startDate}
                      dateFormat="yy.MM.d"
                    />
                    <Icon className="calendar24">
                      <span className="blind">date</span>
                    </Icon>
                  </div>
                </div>
              </div>
              <Checkbox
                className="base"
                label="수강신청 가능 학습만 보기"
                checked={true}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="selected">
        <table>
          <tbody>
            <tr>
              <th>
                <button className="clear">
                  <Icon className="reset" />
                  <span className="blind">reset</span>
                </button>
                <span>전체해제</span>
              </th>
              <td>
                <Button className="del" content="Course" />
                <Button className="del" content="Video" />
                <Button className="del" content="AI" />
                <Button className="del" content="Intermediate" />
                <Button className="del" content="30분 미만" />
                <Button className="del" content="30분 이상~1시간 미만" />
                <Button className="del" content="mySUNI" />
                <Button className="del" content="Coursera" />
                <Button className="del" content="핵인싸" />
                <Button className="del" content="Stamp" />
                <Button className="del" content="수강신청 가능 학습만 보기" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="moreAll">
        <span className="arrow-more">→</span>
        <a className="more-text">결과보기</a>
      </div>
    </div>
  );
};

export default SearchFilter;
