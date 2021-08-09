import React from 'react';
import numeral from 'numeral';
import { Form, Table } from 'semantic-ui-react';

import { ApprovalCubeModel } from '../../model/ApprovalCubeModel';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';

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
              <div className="title">
                <PolyglotText
                  id="승인관리-개학승인-결제정보"
                  defaultString="결제 요청 정보"
                />
              </div>
              <dl className="in">
                <dt>
                  <PolyglotText
                    id="승인관리-개학승인-신청자"
                    defaultString="신청자"
                  />
                </dt>
                <dd>{approvalCube.studentName}</dd>
              </dl>
              <dl className="in">
                <dt>
                  <PolyglotText
                    id="승인관리-개학승인-조직"
                    defaultString="조직"
                  />
                </dt>
                <dd>{approvalCube.studentDepartmentName}</dd>
              </dl>
              <dl className="bl">
                <dt>
                  <PolyglotText
                    id="승인관리-개학승인-학습정보"
                    defaultString="학습정보"
                  />
                </dt>
                <dd>
                  <Table className="view-table">
                    <Table.Body>
                      <Table.Row>
                        <Table.HeaderCell>
                          <PolyglotText
                            id="승인관리-개학승인-과정명"
                            defaultString="과정명"
                          />
                        </Table.HeaderCell>
                        <Table.Cell>{approvalCube.cubeName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>
                          <PolyglotText
                            id="승인관리-개학승인-학습유형"
                            defaultString="학습유형"
                          />
                        </Table.HeaderCell>
                        <Table.Cell>{approvalCube.cubeType}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>
                          <PolyglotText
                            id="승인관리-개학승인-신청차수"
                            defaultString="신청한 차수"
                          />
                        </Table.HeaderCell>
                        <Table.Cell>{approvalCube.round}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>
                          <PolyglotText
                            id="승인관리-개학승인-교육기간"
                            defaultString="(차수)교육기간"
                          />
                        </Table.HeaderCell>
                        <Table.Cell>
                          {approvalCube.enrolling.learningPeriod.startDate} ~{' '}
                          {approvalCube.enrolling.learningPeriod.endDate}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>
                          <PolyglotText
                            id="승인관리-개학승인-강의장소"
                            defaultString="강의장소"
                          />
                        </Table.HeaderCell>
                        <Table.Cell>
                          {approvalCube.operation.location}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>
                          <PolyglotText
                            id="승인관리-개학승인-교육금액"
                            defaultString="인당 교육 금액"
                          />
                        </Table.HeaderCell>
                        <Table.Cell>
                          <PolyglotText
                            id="승인관리-개학승인-원표시"
                            defaultString="₩"
                          />
                          {numeral(
                            approvalCube.freeOfCharge.chargeAmount
                          ).format('0,0')}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </dd>
              </dl>
              <div className="title mt50">
                <PolyglotText
                  id="승인관리-개학승인-승인정보"
                  defaultString="결제 승인 정보"
                />
              </div>
              <dl className="in">
                <dt>
                  <PolyglotText
                    id="승인관리-개학승인-결제상태"
                    defaultString="결제 상태"
                  />
                </dt>
                <dd className="blue">
                  {approvalCube.proposalState === 'Submitted' && (
                    <div>
                      <PolyglotText
                        id="승인관리-개학승인-요청상태"
                        defaultString="승인요청"
                      />
                    </div>
                  )}
                  {approvalCube.proposalState === 'Canceled' && (
                    <div>
                      <PolyglotText
                        id="승인관리-개학승인-취소"
                        defaultString="취소"
                      />
                    </div>
                  )}
                  {approvalCube.proposalState === 'Rejected' && (
                    <div>
                      <PolyglotText
                        id="승인관리-개학승인-반려"
                        defaultString="반려"
                      />
                    </div>
                  )}
                  {approvalCube.proposalState === 'Approved' && (
                    <div>
                      <PolyglotText
                        id="승인관리-개학승인-승인"
                        defaultString="승인"
                      />
                    </div>
                  )}
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
