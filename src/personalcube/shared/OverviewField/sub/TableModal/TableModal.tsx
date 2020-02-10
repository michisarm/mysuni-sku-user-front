
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import classNames from 'classnames';
import { Modal, Table, Popup, Icon, Button } from 'semantic-ui-react';
import { ClassroomModel } from 'personalcube/classroom/model';


interface Props {
  classrooms: ClassroomModel[]
  trigger: React.ReactNode
}

interface States {
  open: boolean
  scrollEnded: boolean
}

@reactAutobind
class TableModal extends Component<Props, States> {
  //
  state = {
    open: false,
    scrollEnded: false,
  };

  show() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  compare(classroom1: ClassroomModel, classroom2: ClassroomModel) {
    if (classroom1.round > classroom2.round) return 1;
    return -1;
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
    const { classrooms, trigger } = this.props;
    const { open, scrollEnded } = this.state;

    if (!classrooms || classrooms.length < 1) {
      return null;
    }

    return (
      <Modal className={classNames('base w1000', { 'inner-scroll': scrollEnded })} open={open} onClose={this.close} trigger={trigger} onOpen={this.show}>
        <Modal.Header className="res">
          차수세부내용
          <span className="sub f12">차수를 확인해주세요.</span>
        </Modal.Header>
        <Modal.Content onScroll={this.onScroll}>
          <div className="scrolling-60vh">
            <Table className="head-fix ml-05-p01">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>차수</Table.HeaderCell>
                  <Table.HeaderCell>강사</Table.HeaderCell>
                  <Table.HeaderCell>담당자 정보 및 이메일</Table.HeaderCell>
                  <Table.HeaderCell>교육장소/웹사이트</Table.HeaderCell>
                  <Table.HeaderCell>정원정보</Table.HeaderCell>
                  <Table.HeaderCell>수강신청 기간</Table.HeaderCell>
                  <Table.HeaderCell>시작일 및 종료일</Table.HeaderCell>
                  <Table.HeaderCell>취소 패널티</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {
                  classrooms.sort(this.compare).map((classroom, index) => (
                    <Table.Row key={`overview-table-row-${index}`}>
                      <Table.Cell>{classroom.round}</Table.Cell>
                      <Table.Cell>{classroom.instructor.name}</Table.Cell>
                      <Table.Cell>
                        {classroom.operation.operator.name}
                        {(classroom.operation.operator.company || classroom.operation.operator.email) && (
                          <>
                            <span className="dash" />
                            {classroom.operation.operator.company}<br />
                            {classroom.operation.operator.email}
                          </>
                        )}
                      </Table.Cell>
                      <Table.Cell className="el"><span>{classroom.operation.location}</span></Table.Cell>
                      <Table.Cell>{classroom.capacity}</Table.Cell>
                      <Table.Cell>{classroom.enrolling.applyingPeriod.startDate} ~<br />{classroom.enrolling.applyingPeriod.endDate}</Table.Cell>
                      <Table.Cell>{classroom.enrolling.learningPeriod.startDate} ~<br />{classroom.enrolling.learningPeriod.endDate}</Table.Cell>
                      <Table.Cell>
                        {
                          classroom.enrolling.cancellationPenalty ?
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
                  )) || null
                }
              </Table.Body>
            </Table>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions">
          <Button className="w190 pop p" onClick={this.close}>OK</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default TableModal;
