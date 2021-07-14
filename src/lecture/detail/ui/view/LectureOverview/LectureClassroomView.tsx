/* eslint-disable react/jsx-closing-tag-location */
import moment from 'moment';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label, Table } from 'semantic-ui-react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import TableModal from '../../../../../personalcube/shared/OverviewField/sub/TableModal';
import LectureClassroom from '../../../viewModel/LectureClassroom';

interface LectureClassroomViewProps {
  lectureClassroom: LectureClassroom;
}

function numberWithCommas(x: number) {
  let s = x.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(s)) s = s.replace(pattern, '$1,$2');
  return s;
}

function formatDate(dateString: string) {
  return `${moment(dateString).format('YYYY.MM.DD')}`;
}

function Represent() {
  return <img src={REPRESENT_IMAGE} className="p-label" />;
}

const LectureClassroomView: React.FC<LectureClassroomViewProps> = function LectureClassroomView({
  lectureClassroom,
}) {
  return (
    <div className="contents overview width100" id="lms-classroom">
      <div className="ov-paragraph ov-paragraph-v2">
        <div className="series-wrap">
          <h3 className="title-style">
            <Label className="onlytext bold size24">
              <Icon className="series" />
              <span><PolyglotText defaultString="차수정보" id="cube-Contents-차수정보" /></span>
            </Label>
          </h3>
          <TableModal
            classrooms={lectureClassroom.classrooms}
            trigger={
              <Button icon className="right btn-blue">
                <PolyglotText defaultString="more" id="cube-Contents-more" /> <Icon className="morelink" />
              </Button>
            }
          />
          <Table className="ui table th-info">
            <colgroup>
              <col width="120px" />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <Table.Body>
              {lectureClassroom.classrooms.map(
                ({
                  round,
                  instructor,
                  freeOfCharge,
                  location,
                  applyingStartDate,
                  applyingEndDate,
                  learningStartDate,
                  learningEndDate,
                }) => (
                  <Fragment key={round}>
                    <Table.Row>
                      <Table.HeaderCell rowSpan="2">
                        <span>{round}<PolyglotText defaultString="차수" id="cube-Contents-차수" /></span>
                      </Table.HeaderCell>
                      <Table.HeaderCell><PolyglotText defaultString="강사정보" id="cube-Contents-강사정보" /></Table.HeaderCell>
                      <Table.HeaderCell><PolyglotText defaultString="비용" id="cube-Contents-비용" /></Table.HeaderCell>
                      <Table.HeaderCell><PolyglotText defaultString="장소" id="cube-Contents-장소" /></Table.HeaderCell>
                      <Table.HeaderCell><PolyglotText defaultString="수강신청기간" id="cube-Contents-수강신청기간" /></Table.HeaderCell>
                      <Table.HeaderCell><PolyglotText defaultString="교육기간" id="cube-Contents-교육기간" /></Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        {instructor.map((item) => (
                          <span key={item.instructorId}>{item.name}</span>
                        ))}
                      </Table.Cell>
                      <Table.Cell>
                        {`${numberWithCommas(freeOfCharge.chargeAmount)} ${getPolyglotText('원', 'cube-Contents-원')}`}
                      </Table.Cell>
                      <Table.Cell>{location}</Table.Cell>
                      <Table.Cell>
                        {`${formatDate(applyingStartDate)} ~ ${formatDate(
                          applyingEndDate
                        )}`}
                      </Table.Cell>
                      <Table.Cell>
                        {`${formatDate(learningStartDate)} ~ ${formatDate(
                          learningEndDate
                        )}`}
                      </Table.Cell>
                    </Table.Row>
                  </Fragment>
                )
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default LectureClassroomView;

const REPRESENT_IMAGE =
  'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDMxIDIwIj4NCiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8Zz4NCiAgICAgICAgICAgIDxnPg0KICAgICAgICAgICAgICAgIDxnPg0KICAgICAgICAgICAgICAgICAgICA8Zz4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NDkgLTEyMjEpIHRyYW5zbGF0ZSg0MDAgMTU5KSB0cmFuc2xhdGUoMCA0MTMpIHRyYW5zbGF0ZSgwIDU1NCkgdHJhbnNsYXRlKDQ5IDk1KSI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjE5IiB4PSIuNSIgeT0iLjUiIGZpbGw9IiNGRkYiIHN0cm9rZT0iI0ZGNjY0RCIgcng9IjkuNSIvPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0IGZpbGw9IiNGRjY2NEQiIGZvbnQtZmFtaWx5PSJOb3RvU2Fuc0NKS2tyLUJvbGQsIE5vdG8gU2FucyBDSksgS1IiIGZvbnQtc2l6ZT0iMTAiIGZvbnQtd2VpZ2h0PSJib2xkIiBsZXR0ZXItc3BhY2luZz0iLS40Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRzcGFuIHg9IjYuNyIgeT0iMTQiPuuMgO2RnDwvdHNwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZXh0Pg0KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+DQo=';
