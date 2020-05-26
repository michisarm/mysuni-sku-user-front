
import React from 'react';

import { Segment, Form, Table, TextArea, Button } from 'semantic-ui-react';

import moment from 'moment';
import EnumUtil, { CubeStateView } from 'shared/ui/logic/EnumUtil';

import { ApprovalCubeModel } from '../../model/ApprovalCubeModel';

interface Props {
  approvalCube: ApprovalCubeModel
  filesMap?: Map<string, any>
}

class ApprovalDetailBasicInfoView extends React.Component<Props> {

  routeToCreateList() {
    //
    //window.location.replace('/my-training/my-page/ApprovalList/pages/1');
    
    window.history.go(-1);
    // window.history.back();
  }

  render()
  {
    const { approvalCube } = this.props;
    const selectedChannels: any = [];
    
    return (
      <>
        <div className="section-tit">
          <span className="text1">기본정보</span>
        </div>
        { approvalCube && (
          <Form>
            <div className="result-view">
              <div className="title">결제 요청 정보</div>
              <dl className="in">
                <dt>신청자</dt>
                <dd>{approvalCube.memberName}</dd>
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
                        <Table.Cell>{approvalCube.enrolling.applyingPeriod.startDate} ~ {approvalCube.enrolling.applyingPeriod.endDate}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>강의장소</Table.HeaderCell>
                        <Table.Cell>{approvalCube.operation.operator.company}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>인당 교육 금액</Table.HeaderCell>
                        <Table.Cell>₩{approvalCube.freeOfCharge.chargeAmount}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </dd>
              </dl>
              <div className="title mt50">결제 승인 정보</div>
              <dl className="in">
                <dt>결제 상태</dt>
                <dd className="blue">
                  {
                    approvalCube.proposalState === 'Submitted' && (
                      <div>
                        승인요청
                      </div>
                    )
                  }
                  {
                    approvalCube.proposalState === 'Canceled' && (
                      <div>
                        취소
                      </div>
                    )
                  }
                  {
                    approvalCube.proposalState === 'Rejected' && (
                      <div>
                        반려
                      </div>
                    )
                  }
                  {
                    approvalCube.proposalState === 'Approved' && (
                      <div>
                        승인
                      </div>
                    )
                  }
                </dd>
              </dl>
              <dl className="bl">
                <dt>승인자 의견</dt>
                <dd>
                  <TextArea placeholder="승인자 의견을 입력해주세요"/>
                </dd>
              </dl>
            </div>

            <div className="buttons border-none">
              
              {
                approvalCube.proposalState === 'Submitted' && (
                  <div>
                    <Button className="fix line" onClick={this.routeToCreateList}>List</Button>
                    <Button className="fix line">반려</Button>
                    <Button className="fix bg">승인</Button>
                  </div>
                )
              }
              {
                approvalCube.proposalState !== 'Submitted' && (
                  <div>
                    <Button className="fix line" onClick={this.routeToCreateList}>List</Button>
                  </div>
                )
              }
            </div>
          </Form>
        )}
      </>
    );
  }
}

export default ApprovalDetailBasicInfoView;

