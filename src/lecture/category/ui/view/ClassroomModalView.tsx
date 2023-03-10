import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import classNames from 'classnames';
import { Modal, Table, Popup, Icon, Button, Radio } from 'semantic-ui-react';
import { getYearMonthDateHourMinuteSecond } from 'shared/helper/dateTimeHelper';
import { Classroom } from '../../../detail/viewModel/LectureClassroom';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface Props {
  classrooms: Classroom[];
  joinRounds?: number[];
  trigger?: React.ReactNode;
  onOk?: (classroom: Classroom) => void;
}

interface States {
  open: boolean;
  selectedClassroom: Classroom | null;
  scrollEnded: boolean;
}

@reactAutobind
class ClassroomModalView extends Component<Props, States> {
  //
  state = {
    open: false,
    selectedClassroom: null,
    scrollEnded: false,
  };

  show() {
    this.setState({ open: true, selectedClassroom: null });
  }

  close() {
    this.setState({ open: false });
  }

  compare(classroom1: Classroom, classroom2: Classroom) {
    if (classroom1.round > classroom2.round) return 1;
    return -1;
  }

  onOk() {
    const { onOk } = this.props;
    const { selectedClassroom }: States = this.state;
    if (onOk && selectedClassroom) {
      onOk(selectedClassroom);
    }
    this.close();
  }

  onScroll(e: any) {
    //
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    const { scrollEnded } = this.state;

    if (scrollHeight === scrollTop + clientHeight) {
      this.setState({
        scrollEnded: true,
      });
    } else if (scrollEnded) {
      this.setState({
        scrollEnded: false,
      });
    }
  }

  render() {
    //
    const { classrooms, trigger, joinRounds } = this.props;
    const { open, selectedClassroom, scrollEnded }: States = this.state;
    if (!classrooms || !classrooms.length) return null;
    const today = new Date();

    return (
      <Modal
        className={classNames('base w1000', { 'inner-scroll': scrollEnded })}
        trigger={trigger}
        open={open}
        onClose={this.close}
        onOpen={this.show}
      >
        <Modal.Header className="res">
          <PolyglotText
            defaultString="차수세부내용"
            id="CollageState-ClassroomModalInfo-타이틀"
          />
          <span className="sub f12">
            <PolyglotText
              defaultString="차수를 선택해주세요."
              id="CollageState-ClassroomModalInfo-차수선택"
            />
          </span>
        </Modal.Header>
        <Modal.Content onScroll={this.onScroll}>
          <div className="scrolling-60vh">
            <Table className="head-fix ml-05-p01">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>
                    <PolyglotText
                      defaultString="차수"
                      id="CollageState-ClassroomModalInfo-차수"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <PolyglotText
                      defaultString="강사"
                      id="CollageState-ClassroomModalInfo-강사"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <PolyglotText
                      defaultString="교육장소/웹사이트"
                      id="CollageState-ClassroomModalInfo-교육장소"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <PolyglotText
                      defaultString="정원정보"
                      id="CollageState-ClassroomModalInfo-정원정보"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <PolyglotText
                      defaultString="수강신청 기간"
                      id="CollageState-ClassroomModalInfo-신청기간"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <PolyglotText
                      defaultString="시작일 및 종료일"
                      id="CollageState-ClassroomModalInfo-시작종료"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <PolyglotText
                      defaultString="취소 패널티"
                      id="CollageState-ClassroomModalInfo-패널티"
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {classrooms
                  .sort(this.compare)
                  .map((classroom: Classroom, index) => {
                    const {
                      year: startYear,
                      month: startMonth,
                      date: startDate,
                    } = getYearMonthDateHourMinuteSecond(
                      new Date(classroom.applyingStartDate)
                    )!;

                    const {
                      year: endYear,
                      month: endMonth,
                      date: endDate,
                    } = getYearMonthDateHourMinuteSecond(
                      new Date(classroom.applyingEndDate)
                    )!;

                    const getTime = (
                      year: number,
                      month: number,
                      date: number
                    ) => {
                      return new Date(year, month, date, 0, 0, 0).getTime();
                    };

                    const checkedIsDisabled = () => {
                      const getStartDate = getTime(
                        startYear,
                        startMonth,
                        startDate
                      );
                      const getEndDate = getTime(
                        endYear,
                        endMonth,
                        endDate + 1
                      );

                      if (joinRounds && joinRounds.includes(classroom.round)) {
                        return true;
                      }

                      if (
                        getStartDate > today.getTime() ||
                        getEndDate < today.getTime()
                      ) {
                        return true;
                      }

                      if (classroom.capacity <= classroom.studentCount) {
                        return true;
                      }

                      return false;
                    };

                    return (
                      <>
                        {new Date(
                          endYear,
                          endMonth,
                          endDate,
                          23,
                          59,
                          59
                        ).getTime() >= today.getTime() && (
                          <Table.Row key={`overview-table-row-${index}`}>
                            <Table.Cell>
                              <Table.Cell verticalAlign="middle"></Table.Cell>
                              <Radio
                                name="class-radioGroup"
                                disabled={checkedIsDisabled()}
                                checked={
                                  (selectedClassroom &&
                                    selectedClassroom!.id === classroom.id) ||
                                  false
                                }
                                onChange={() =>
                                  this.setState({
                                    selectedClassroom: classroom,
                                  })
                                }
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Table.Cell verticalAlign="middle"></Table.Cell>
                              {classroom.round}
                            </Table.Cell>
                            <Table.Cell>
                              <Table.Cell verticalAlign="middle"></Table.Cell>
                              {classroom.instructor.length > 0 &&
                                classroom.instructor.map((item) => {
                                  return (
                                    <>
                                      {parsePolyglotString(
                                        item.instructorWithIdentity?.instructor
                                          ?.name
                                      )}
                                      <p />
                                    </>
                                  );
                                })}
                            </Table.Cell>
                            <Table.Cell className="el">
                              <Table.Cell verticalAlign="middle"></Table.Cell>
                              <span>{classroom.location}</span>
                            </Table.Cell>
                            <Table.Cell>
                              <Table.Cell verticalAlign="middle"></Table.Cell>
                              {classroom.studentCount} / {classroom.capacity}
                            </Table.Cell>
                            <Table.Cell>
                              <Table.Cell verticalAlign="middle"></Table.Cell>
                              {classroom.applyingStartDate} ~
                              <br />
                              {classroom.applyingEndDate}
                            </Table.Cell>
                            <Table.Cell>
                              <Table.Cell verticalAlign="middle"></Table.Cell>
                              {classroom.learningStartDate} ~
                              <br />
                              {classroom.learningEndDate}
                            </Table.Cell>
                            <Table.Cell>
                              <Table.Cell verticalAlign="middle"></Table.Cell>
                              {classroom.cancellationPenalty ? (
                                <Popup
                                  content={
                                    <span>{classroom.cancellationPenalty}</span>
                                  }
                                  className="ui custom red"
                                  position="bottom right"
                                  trigger={
                                    <Button icon className="img-icon custom">
                                      <Icon className="noti32" />
                                      <span className="blind">
                                        <PolyglotText
                                          defaultString="취소 패널티"
                                          id="CollageState-ClassroomModalInfo-패널티"
                                        />
                                      </span>
                                    </Button>
                                  }
                                />
                              ) : (
                                <span className="empty-dash" />
                              )}
                            </Table.Cell>
                          </Table.Row>
                        )}
                      </>
                    );
                  }) || null}
              </Table.Body>
            </Table>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions">
          <Button className="w190 pop d" onClick={this.close}>
            <PolyglotText
              defaultString="Cancel"
              id="CollageState-ClassroomModalInfo-취소버튼"
            />
          </Button>
          <Button className="w190 pop p" onClick={this.onOk}>
            <PolyglotText
              defaultString="OK"
              id="CollageState-ClassroomModalInfo-ok버튼"
            />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ClassroomModalView;
