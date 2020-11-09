import React, { useRef } from 'react';
import { Button, Icon, Label, Table } from 'semantic-ui-react';
import TableModal from '../../../../../personalcube/shared/OverviewField/sub/TableModal';
import ClassroomModalView from '../../../../category/ui/view/ClassroomModalView';
import LectureClassroom from '../../../viewModel/LectureClassroom';

interface LectureClassroomViewProps {
  lectureClassroom: LectureClassroom;
}

const LectureClassroomView: React.FC<LectureClassroomViewProps> = function LectureClassroomView({
  lectureClassroom,
}) {
  return (
    <div className="contents overview width100" id="lms-classroom">
      <div className="ov-paragraph">
        {/* 차수 */}
        <div className="series-wrap">
          <h3 className="title-style">
            <Label className="onlytext bold size24">
              <Icon className="series" />
              <span>{/* Class Series */}차수정보</span>
            </Label>
          </h3>
          <TableModal
            classrooms={lectureClassroom.remote}
            trigger={
              <Button icon className="right btn-blue">
                more <Icon className="morelink" />
              </Button>
            }
          />

          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>차수</Table.HeaderCell>
                <Table.HeaderCell>강사</Table.HeaderCell>
                <Table.HeaderCell>장소</Table.HeaderCell>
                <Table.HeaderCell>수강신청 기간</Table.HeaderCell>
                <Table.HeaderCell>시작일 및 종료일</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {lectureClassroom.classrooms.map(
                ({
                  round,
                  operator,
                  location,
                  applyingStartDate,
                  applyingEndDate,
                  learningStartDate,
                  learningEndDate,
                }) => (
                  <Table.Row>
                    <Table.Cell className="num">{round}</Table.Cell>
                    <Table.Cell className="teacher">
                      <span>{operator}</span>
                    </Table.Cell>
                    <Table.Cell className="location">
                      <span>{location}</span>
                    </Table.Cell>
                    <Table.Cell className="center">
                      {`${applyingStartDate} ~ ${applyingEndDate}`}
                    </Table.Cell>
                    <Table.Cell className="center">
                      {`${learningStartDate} ~ ${learningEndDate}`}
                    </Table.Cell>
                  </Table.Row>
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
