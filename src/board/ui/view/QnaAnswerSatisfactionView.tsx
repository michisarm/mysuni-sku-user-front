import * as React from 'react';
import { ReactComponent } from '@nara.platform/accent';
import { Table, Form, Input, Button } from 'semantic-ui-react';
import QnAModel from '../../model/QnAModel';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import moment from 'moment';

interface Props {
  qna: QnAModel;
}

class QnaAnswerSatisfactionView extends ReactComponent<Props> {
  //
  render() {
    //
    const { qna } = this.props;

    return (

      <Form.Field>
        <div className="admin-answer-top">
          <strong>문의 답변 만족도 조사</strong>
        </div>
        <div className="form-table-wrapper">
          <Table className="admin-answer-form">
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>
            <Table.Body>
              <Table.Row>
                <Table.HeaderCell>
                  만족도 조사
                </Table.HeaderCell>
                {
                }
                <Table.Cell>
                  {
                    qna.answer.satisfactionRegisteredTime &&
                    <p>{qna.answer.satisfactionPoint}</p> ||
                    <p>별점</p>
                  }
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  만족도 조사 의견
                </Table.HeaderCell>
                <Table.Cell>
                  {
                    qna.answer.satisfactionRegisteredTime &&
                    <p>{qna.answer.satisfactionComment}</p> ||
                    (
                      <div className="svy-inpt">
                        <Input>
                          <input />
                          <Button />
                        </Input>
                      </div>
                    )
                  }
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </Form.Field>
    )
  }
}

export default QnaAnswerSatisfactionView;
