import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import classNames from 'classnames';
import { Modal, Table, Popup, Icon, Button } from 'semantic-ui-react';
import { Classroom } from '../../../../../lecture/detail/viewModel/LectureClassroom';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  classrooms: Classroom[];
  trigger: React.ReactNode;
}

interface States {
  open: boolean;
  scrollEnded: boolean;
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

  compare(classroom1: Classroom, classroom2: Classroom) {
    if (classroom1.round < classroom2.round) return 1;
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
    } else if (scrollEnded) {
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
      <Modal
        className={classNames('base w1000', { 'inner-scroll': scrollEnded })}
        open={open}
        onClose={this.close}
        trigger={trigger}
        onOpen={this.show}
      >
        <Modal.Header className="res">
          <PolyglotText
            defaultString="차수세부내용"
            id="lecture-차수세부내용모달-타이틀"
          />
          <span className="sub f12">
            <PolyglotText
              defaultString="차수를 선택해주세요."
              id="lecture-차수세부내용모달-차수선택"
            />
          </span>
        </Modal.Header>
        <Modal.Content onScroll={this.onScroll}>
          <div className="scrolling-60vh">
            <Table className="head-fix ml-05-p01">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <PolyglotText
                      defaultString="차수"
                      id="lecture-차수세부내용모달-차수"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <PolyglotText
                      defaultString="강사"
                      id="lecture-차수세부내용모달-강사"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <PolyglotText
                      defaultString="담당자 정보 및 이메일"
                      id="lecture-차수세부내용모달-담당자정보"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <PolyglotText
                      defaultString="교육장소/웹사이트"
                      id="lecture-차수세부내용모달-교육장소"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <PolyglotText
                      defaultString="정원정보"
                      id="lecture-차수세부내용모달-정원정보"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <PolyglotText
                      defaultString="수강신청 기간"
                      id="lecture-차수세부내용모달-신청기간"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <PolyglotText
                      defaultString="교육기간"
                      id="lecture-차수세부내용모달-교육기간"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <PolyglotText
                      defaultString="취소 패널티"
                      id="lecture-차수세부내용모달-패널티"
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {[...classrooms].reverse().map((classroom, index) => (
                  <Table.Row key={`overview-table-row-${index}`}>
                    <Table.Cell>{classroom.round}</Table.Cell>
                    <Table.Cell>
                      {classroom.instructor.length > 0 &&
                        classroom.instructor.map((item) => (
                          <>
                            {parsePolyglotString(
                              item.instructorWithIdentity?.instructor?.name
                            )}
                            <p />
                          </>
                        ))}
                    </Table.Cell>
                    <Table.Cell>
                      {parsePolyglotString(classroom.operator?.name)}
                      {(classroom.operator?.companyName ||
                        classroom.operator?.email) && (
                        <>
                          <span className="dash" />
                          {parsePolyglotString(classroom.operator?.companyName)}
                          <br />
                          {classroom.operator?.email}
                        </>
                      )}
                    </Table.Cell>
                    <Table.Cell className="el">
                      <span>{classroom.location}</span>
                    </Table.Cell>
                    <Table.Cell>
                      {classroom.studentCount} / {classroom.capacity}
                    </Table.Cell>
                    <Table.Cell>
                      {classroom.remote.enrolling.applyingPeriod.startDate} ~
                      <br />
                      {classroom.remote.enrolling.applyingPeriod.endDate}
                    </Table.Cell>
                    <Table.Cell>
                      {classroom.remote.enrolling.learningPeriod.startDate} ~
                      <br />
                      {classroom.remote.enrolling.learningPeriod.endDate}
                    </Table.Cell>
                    <Table.Cell>
                      {classroom.remote.enrolling.cancellationPenalty ? (
                        <Popup
                          content={
                            <span>
                              {classroom.remote.enrolling.cancellationPenalty}
                            </span>
                          }
                          className="ui custom red"
                          position="bottom right"
                          trigger={
                            <Button icon className="img-icon custom">
                              <Icon className="noti32" />
                              <span className="blind">
                                <PolyglotText
                                  defaultString="취소 패널티"
                                  id="lecture-차수세부내용모달-패널티"
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
                )) || null}
              </Table.Body>
            </Table>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions">
          <Button className="w190 pop p" onClick={this.close}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default TableModal;
