import React from 'react';
import numeral from 'numeral';
import { Form, Table } from 'semantic-ui-react';

import { ApprovalCubeModel } from '../../model/ApprovalCubeModel';

interface Props {
  approvalCube: ApprovalCubeModel;
  filesMap?: Map<string, any>;
}

class ApprovalDetailBasicInfoView extends React.Component<Props> {
  render() {
    const { approvalCube } = this.props;
    return (
      <>
        {approvalCube && (
          <Form>
            <div className="result-view">
              <div className="title">결제 요청 정보</div>
              <dl className="in">
                <dt>신청자</dt>
                <dd>{approvalCube.studentName}</dd>
              </dl>
              <dl className="in">
                <dt>조직</dt>
                <dd>{approvalCube.getStudentDepartmentNames}</dd>
              </dl>
              <dl className="bl">
                <dt>학습정보</dt>
                <dd>
                  <Table className="view-table">
                    <Table.Body>
                      <Table.Row>
                        <Table.HeaderCell>과정명</Table.HeaderCell>
                        <Table.Cell>{approvalCube.cubeName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>학습유형</Table.HeaderCell>
                        <Table.Cell>{approvalCube.cubeType}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>신청한 차수</Table.HeaderCell>
                        <Table.Cell>{approvalCube.round}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>(차수)교육기간</Table.HeaderCell>
                        <Table.Cell>
                          {approvalCube.enrolling.learningPeriod.startDate} ~{' '}
                          {approvalCube.enrolling.learningPeriod.endDate}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>강의장소</Table.HeaderCell>
                        <Table.Cell>
                          {approvalCube.operation.location}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>인당 교육 금액</Table.HeaderCell>
                        <Table.Cell>
                          ₩
                          {numeral(
                            approvalCube.freeOfCharge.chargeAmount
                          ).format('0,0')}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </dd>
              </dl>
              <div className="title mt50">결제 승인 정보</div>
              <dl className="in">
                <dt>결제 상태</dt>
                <dd className="blue">
                  {approvalCube.proposalState === 'Submitted' && (
                    <div>승인요청</div>
                  )}
                  {approvalCube.proposalState === 'Canceled' && <div>취소</div>}
                  {approvalCube.proposalState === 'Rejected' && <div>반려</div>}
                  {approvalCube.proposalState === 'Approved' && <div>승인</div>}
                </dd>
              </dl>
            </div>
          </Form>
        )}
      </>
    );
  }
}

export default ApprovalDetailBasicInfoView;
