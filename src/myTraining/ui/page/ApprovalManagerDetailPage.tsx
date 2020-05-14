import React, {Component} from 'react';

import {
  Segment, Form, Table, TextArea, Button
} from 'semantic-ui-react';
import {RouteComponentProps, withRouter} from 'react-router';
import {ActionLogService} from '../../../shared/stores';

interface Props extends RouteComponentProps<RouteParams> {
  actionLogService?: ActionLogService
}

interface RouteParams {
  tab: string
  pageNo: string
}

class ApprovalManagerDetailPage extends Component<Props> {
  render() {
    return(
      <section className="content bg-white">
        <div className="add-personal-learning">
          <div className="add-personal-learning-wrap">
            <div className="apl-tit">교육 승인 요청</div>
            <div className="apl-notice">
              학습 수강에 대한 승인 요청을 결제하실 수 있습니다.<br/>승인 혹은 반려 처리에 대한 승인자 의견을 함께 작성하실 수 있습니다.
            </div>
          </div>
        </div>
        <Segment className="full">
          <div className="apl-form-wrap">
            <Form>
              <div className="result-view">
                <div className="title">결제 요청 정보</div>
                <dl className="in">
                  <dt>신청자</dt>
                  <dd>유은미</dd>
                </dl>
                <dl className="bl">
                  <dt>학습정보</dt>
                  <dd>
                    <Table className="view-table">
                      <Table.Body>
                        <Table.Row>
                          <Table.HeaderCell>과정명</Table.HeaderCell>
                          <Table.Cell>AI 101</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell>학습유형</Table.HeaderCell>
                          <Table.Cell>Classroom</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell>신청한 차수</Table.HeaderCell>
                          <Table.Cell>1</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell>(차수)교육기간</Table.HeaderCell>
                          <Table.Cell>2020.02.20~2020.03.20</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell>강의장소</Table.HeaderCell>
                          <Table.Cell>SK C&C 본사 지하 1층 대강당</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell>인당 교육 금액</Table.HeaderCell>
                          <Table.Cell>₩1,000,000</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </dd>
                </dl>
                <div className="title mt50">결제 승인 정보</div>
                <dl className="in">
                  <dt>결제 상태</dt>
                  <dd className="blue">승인요청</dd>
                </dl>
                <dl className="bl">
                  <dt>승인자 의견</dt>
                  <dd>
                    <TextArea placeholder="승인자 의견을 입력해주세요"/>
                  </dd>
                </dl>
              </div>

              <div className="buttons border-none">
                <Button className="fix line">List</Button>
                <Button className="fix line">반려</Button>
                <Button className="fix bg">승인</Button>
              </div>
            </Form>
          </div>
        </Segment>
      </section>
    );
  }
}

export default withRouter(ApprovalManagerDetailPage);
