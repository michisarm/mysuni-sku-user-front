
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import classNames from 'classnames';
import { Modal, Table, Popup, Icon, Button, Radio } from 'semantic-ui-react';
import { getYearMonthDateHourMinuteSecond } from 'shared/helper/dateTimeHelper';
import { ClassroomModel } from 'personalcube/classroom/model';


interface Props {
  classrooms: ClassroomModel[]
  joinRounds?: number[]
  trigger?: React.ReactNode
  onOk?: (classroom: ClassroomModel) => void
}

interface States {
  open: boolean
  selectedClassroom: ClassroomModel | null
  scrollEnded: boolean
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

  compare(classroom1: ClassroomModel, classroom2: ClassroomModel) {
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
    }
    else if (scrollEnded) {
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
      <Modal className={classNames('base w1000', { 'inner-scroll': scrollEnded })} trigger={trigger} open={open} onClose={this.close} onOpen={this.show}>

        <Modal.Header className="res">
          차수세부내용
          <span className="sub f12">차수를 선택해주세요.</span>
        </Modal.Header>
        <Modal.Content onScroll={this.onScroll}>
          <div className="scrolling-60vh">
            <Table className="head-fix ml-05-p01">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>차수</Table.HeaderCell>
                  <Table.HeaderCell>강사</Table.HeaderCell>
                  <Table.HeaderCell>교육장소/웹사이트</Table.HeaderCell>
                  <Table.HeaderCell>정원정보</Table.HeaderCell>
                  <Table.HeaderCell>수강신청 기간</Table.HeaderCell>
                  <Table.HeaderCell>시작일 및 종료일</Table.HeaderCell>
                  <Table.HeaderCell>취소 패널티</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {
                  classrooms.sort(this.compare).map((classroom: ClassroomModel, index) => {
                    const {
                      year: startYear, month: startMonth, date: startDate,
                    } = getYearMonthDateHourMinuteSecond(classroom.enrolling.applyingPeriod!.startDateSub)!;
                    const {
                      year: endYear, month: endMonth, date: endDate,
                    } = getYearMonthDateHourMinuteSecond(classroom.enrolling.applyingPeriod!.endDateSub)!;

                    return (
                      <Table.Row key={`overview-table-row-${index}`}>
                        <Table.Cell>
                          <Radio
                            name="class-radioGroup"
                            disabled={
                              (joinRounds && joinRounds.includes(classroom.round))
                              || new Date(startYear, startMonth, startDate, 0, 0, 0).getTime() > today.getTime()
                              || new Date(endYear, endMonth, endDate, 23, 59, 59).getTime() < today.getTime()
                            }
                            checked={selectedClassroom && selectedClassroom!.id === classroom.id || false}
                            onChange={() => this.setState({ selectedClassroom: classroom })}
                          />
                        </Table.Cell>
                        <Table.Cell>{classroom.round}</Table.Cell>
                        <Table.Cell>{classroom.instructor.name}</Table.Cell>
                        <Table.Cell className="el"><span>{classroom.operation.location}</span></Table.Cell>
                        <Table.Cell>{classroom.capacity}</Table.Cell>
                        <Table.Cell>{classroom.enrolling.applyingPeriod.startDate} ~<br />{classroom.enrolling.applyingPeriod.endDate}</Table.Cell>
                        <Table.Cell>{classroom.enrolling.learningPeriod.startDate} ~<br />{classroom.enrolling.learningPeriod.endDate}</Table.Cell>
                        <Table.Cell>
                          { classroom.enrolling.cancellationPenalty ?
                            <Popup
                              content={<span>{classroom.enrolling.cancellationPenalty}</span>}
                              className="ui custom red"
                              position="bottom right"
                              trigger={
                                <Button icon className="img-icon custom">
                                  <Icon className="noti32" /><span className="blind">취소 패널티</span>
                                </Button>
                              }
                            />
                            :
                            <span className="empty-dash" />
                          }
                        </Table.Cell>
                      </Table.Row>
                    );
                  }) || null
                }
              </Table.Body>
            </Table>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions">
          <Button className="w190 pop d" onClick={this.close}>Cancel</Button>
          <Button className="w190 pop p" onClick={this.onOk}>OK</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ClassroomModalView;
