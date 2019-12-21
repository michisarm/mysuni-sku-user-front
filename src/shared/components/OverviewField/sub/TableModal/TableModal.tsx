
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Modal, Table, Popup, Icon, Button } from 'semantic-ui-react';
import { ClassroomModel } from 'personalcube/classroom';


interface Props {
  classrooms: ClassroomModel[]
  trigger: React.ReactNode
}

interface States {
  open: boolean
}

@reactAutobind
class TableModal extends Component<Props, States> {
  //
  state = { open: false };

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

  render() {
    //
    const { classrooms, trigger } = this.props;
    if (!classrooms || !classrooms.length) return null;

    return (
      <Modal open={this.state.open} onClose={this.close} className="base w1000 inner-scroll" trigger={trigger} onOpen={this.show}>

        <Modal.Header className="res">
          Class Series Detail
          <span className="sub f12">Please check it.</span>
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-60vh">
            <Table className="head-fix ml-05-p01">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>차수</Table.HeaderCell>
                  <Table.HeaderCell>강사</Table.HeaderCell>
                  <Table.HeaderCell>담당자 정보 및 이메일</Table.HeaderCell>
                  <Table.HeaderCell>장소</Table.HeaderCell>
                  <Table.HeaderCell>정원정</Table.HeaderCell>
                  <Table.HeaderCell>수강신청 기간</Table.HeaderCell>
                  <Table.HeaderCell>시작일 및 종료일</Table.HeaderCell>
                  <Table.HeaderCell>취소 패널티</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {
                  classrooms.sort(this.compare).map(cineroom => (
                    <Table.Row>
                      <Table.Cell>{cineroom.round}</Table.Cell>
                      <Table.Cell>{cineroom.instructor.name}</Table.Cell>
                      <Table.Cell>
                        {cineroom.operation.operator.name}
                        <span className="dash" />{cineroom.operation.operator.company}<br />{cineroom.operation.operator.email}
                      </Table.Cell>
                      <Table.Cell className="el"><span>{cineroom.operation.location}</span></Table.Cell>
                      <Table.Cell>{cineroom.capacity}</Table.Cell>
                      <Table.Cell>{cineroom.enrolling.applyingPeriod.startDate} ~<br />{cineroom.enrolling.applyingPeriod.endDate}</Table.Cell>
                      <Table.Cell>{cineroom.enrolling.learningPeriod.startDate} ~<br />{cineroom.enrolling.learningPeriod.endDate}</Table.Cell>
                      <Table.Cell>
                        {
                          cineroom.enrolling.cancellationPenalty && (
                            <Popup
                              content={<span>{cineroom.enrolling.cancellationPenalty}</span>}
                              className="ui custom red"
                              position="bottom right"
                              trigger={
                                <Button icon className="img-icon custom" content="Button">
                                  <Icon className="noti32" /><span className="blind">취소 패널티</span>
                                </Button>
                              }
                            />
                          ) || null
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
