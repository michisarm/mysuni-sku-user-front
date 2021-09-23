import * as React from 'react';
import { ReactComponent } from '@nara.platform/accent';
import { Table, Form, Input } from 'semantic-ui-react';
import QnAModel from '../../model/QnAModel';

interface Props {
  qna: QnAModel;
}

class QnaAnswerSatisfactionView extends ReactComponent<Props> {
  //
  render() {
    //
    const { qna } = this.props;

    return (
      <div className="content-inner">
        <div className="post-view qna">
          <div className="title">문의 답변 만족도 조사</div>
          <Table>
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>
            <Table.Body>
              <Table.Row>
                <Table.Cell className="tb-header">
                  만족도 조사
                </Table.Cell>
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
                <Table.Cell className="tb-header">
                 만족도 조사 의견
                </Table.Cell>
                <Table.Cell>
                  {
                    qna.answer.satisfactionRegisteredTime &&
                    <p>{qna.answer.satisfactionComment}</p> ||
                    (
                      <>
                        <Form.Field
                          control={Input}
                        />
                      </>
                    )
                  }
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    )
  }
}

export default QnaAnswerSatisfactionView;
