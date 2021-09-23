import * as React from 'react';
import { ReactComponent } from '@nara.platform/accent';
import { Table, Form, Input, Button, Rating } from 'semantic-ui-react';
import QnAModel from '../../model/QnAModel';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import moment from 'moment';
import { observer } from 'mobx-react';

interface Props {
  onChangeQnaProps: (name: string, value:any ) => void;
  onClickRegisterSatisfaction: () => void;

  qna: QnAModel;
}

@observer
class QnaAnswerSatisfactionView extends ReactComponent<Props> {
  //
  render() {
    //
    const { onChangeQnaProps, onClickRegisterSatisfaction } = this.props;
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
                <Table.Cell>
                  {
                    <>
                      <Rating
                        defaultRating={3}
                        maxRating={5}
                        size="small"
                        disabled={qna.answer.satisfactionRegisteredTime !== 0 && qna.answer.satisfactionRegisteredTime !== null}
                        className="rating-num"
                        rating={qna.answer.satisfactionPoint}
                        onRate={(e, data) => onChangeQnaProps('answer.satisfactionPoint', data.rating)}
                      />
                      {
                        qna.answer.satisfactionRegisteredTime && (
                          <span>
                            {moment(qna.answer.satisfactionRegisteredTime).format('YYYY.MM.DD')}
                          </span>
                        ) || null
                      }
                    </>
                  }
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  <span>만족도 조사 의견</span>
                </Table.HeaderCell>
                <Table.Cell>
                  {
                    qna.answer.satisfactionRegisteredTime &&
                    <p>{qna.answer.satisfactionComment}</p> ||
                    (
                      <div className="svy-inpt">
                        <Form.Field
                          control={Input}
                          width={16}
                          placeholder="문의 답변에 대한 만족도 의견을 자유롭게 남겨주세요."
                          value={qna.answer.satisfactionComment}
                          onChange={(e: any, data: any) => onChangeQnaProps('answer.satisfactionComment', data.value)}
                        />
                        <Button className="bg" onClick={onClickRegisterSatisfaction}>
                          등록
                        </Button>
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
