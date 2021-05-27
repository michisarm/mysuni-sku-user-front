/* eslint-disable react/jsx-closing-tag-location */
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label, Table } from 'semantic-ui-react';
import TableModal from '../../../../../personalcube/shared/OverviewField/sub/TableModal';
import LectureClassroom from '../../../viewModel/LectureClassroom';

interface LectureClassroomViewProps {
  lectureClassroom: LectureClassroom;
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
              <span>차수정보</span>
            </Label>
          </h3>
          <TableModal
            classrooms={lectureClassroom.classrooms}
            trigger={
              <Button icon className="right btn-blue">
                more <Icon className="morelink" />
              </Button>
            }
          />
          <Table>
            <Table.Body>
              {lectureClassroom.classrooms.map(
                ({
                  round,
                  instructor,
                  location,
                  applyingStartDate,
                  applyingEndDate,
                  learningStartDate,
                  learningEndDate,
                }) => (
                  <>
                    <Table className="th-info">
                      <colgroup>
                        <col width="120px" />
                        <col />
                        <col />
                        <col />
                        <col />
                      </colgroup>
                      <Table.Body>
                        <Table.Row>
                          <Table.HeaderCell rowSpan="2">
                            <span>{round}차수</span>
                          </Table.HeaderCell>
                          <Table.HeaderCell>강사정보</Table.HeaderCell>
                          <Table.HeaderCell>장소</Table.HeaderCell>
                          <Table.HeaderCell>수강신청기간</Table.HeaderCell>
                          <Table.HeaderCell>교육기간</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            {instructor.map(item => (
                              <span>{item.name}</span>
                            ))}
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
                      </Table.Body>
                    </Table>
                  </>
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
