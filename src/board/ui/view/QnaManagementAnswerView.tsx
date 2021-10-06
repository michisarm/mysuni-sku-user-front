import React from 'react';
import { observer } from 'mobx-react';
import { PatronType, reactAutobind } from '@nara.platform/accent';
import depot, {
  DepotFileViewModel,
  FileBox,
  ValidationType,
} from '@nara.drama/depot';
import { Checkbox, Form, Radio, Table, TextArea } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import moment from 'moment';

import { depotHelper } from '../../../shared';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';

import { QnaState } from '../../model/vo/QnaState';
import QnAModel from '../../model/QnAModel';
import OperatorModel from '../../model/vo/OperatorModel';

interface Props {
  isUpdatable: boolean;
  qna: QnAModel;
  finalOperator: OperatorModel;
  emailOperator: OperatorModel;
  answerFilesMap: Map<string, any>;
  changeQnaProps: (name: string, value: any) => void;
  getFileBoxIdForReference: (depotId: string) => void;
  getStateToString: (state: QnaState) => string;
}

@observer
@reactAutobind
class QnaManagementAnswerView extends React.Component<Props> {
  //
  render() {
    //
    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
      ],
    };

    const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
      'video',
    ];

    const {
      isUpdatable,
      qna,
      answerFilesMap,
      changeQnaProps,
      getFileBoxIdForReference,
      finalOperator,
      emailOperator,
      getStateToString,
    } = this.props;

    return (
      <>
        <Form.Field>
          <div className="admin-answer-top">
            <strong>문의 답변</strong>
          </div>
          <div className="form-table-wrapper">
            <Table className="admin-answer-form">
              <colgroup>
                <col width="20%" />
                <col width="80%" />
              </colgroup>
              <Table.Body>
                {isUpdatable ? (
                  <>
                    <Table.Row>
                      <Table.HeaderCell>
                        <span className="impt">답변 내용</span>
                      </Table.HeaderCell>
                      <Table.Cell>
                        <div className="write-form ui form">
                          <Form.Field>
                            <ReactQuill
                              theme="snow"
                              modules={modules}
                              formats={formats}
                              value={qna.answer.content}
                              onChange={(value) =>
                                changeQnaProps('answer.content', value)
                              }
                            />
                          </Form.Field>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>
                        <span>첨부 파일</span>
                      </Table.HeaderCell>
                      <Table.Cell>
                        <div className="lg-attach add-discussion">
                          <div className="attach-inner">
                            <div>
                              <FileBox
                                id={qna.answer.depotId || ''}
                                vaultKey={{
                                  keyString: 'qna-sample',
                                  patronType: PatronType.Audience,
                                }}
                                patronKey={{
                                  keyString: 'qna-sample',
                                  patronType: PatronType.Audience,
                                }}
                                validations={[
                                  {
                                    type: ValidationType.Duplication,
                                    validator: depotHelper.duplicationValidator,
                                  },
                                ]}
                                onChange={getFileBoxIdForReference}
                              />
                              <div className="bottom" />
                            </div>
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>
                        <span className="impt">처리 상태</span>
                      </Table.HeaderCell>
                      <Table.Cell>
                        <div className="radio-bttn">
                          <Radio
                            name="radioGroup"
                            label="답변대기"
                            className="base"
                            value={QnaState.AnswerWaiting}
                            checked={
                              qna.question.state === QnaState.AnswerWaiting
                            }
                            onChange={() =>
                              changeQnaProps(
                                'question.state',
                                QnaState.AnswerWaiting
                              )
                            }
                          />
                          <Radio
                            name="radioGroup"
                            label="답변완료"
                            className="base"
                            value={QnaState.AnswerCompleted}
                            checked={
                              qna.question.state === QnaState.AnswerCompleted
                            }
                            onChange={() =>
                              changeQnaProps(
                                'question.state',
                                QnaState.AnswerCompleted
                              )
                            }
                          />
                        </div>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>
                        <span>메일 발송 여부</span>
                      </Table.HeaderCell>
                      <Table.Cell>
                        <Checkbox
                          label="문의자에게 해당 내용을 메일로 발송합니다."
                          checked={qna.checkMail}
                          onChange={(e, data) =>
                            changeQnaProps('checkMail', data.checked)
                          }
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>
                        <span>메모</span>
                      </Table.HeaderCell>
                      <Table.Cell>
                        <TextArea
                          value={qna.answer.memo}
                          className="memo-ipt"
                          placeHolder="내용을 입력해주세요."
                          onChange={(e, data) => {
                            changeQnaProps('answer.memo', data.value);
                          }}
                        />
                        <p>
                          <i aria-hidden="true" className="icon info20" />
                          답변 담당자와 Help Desk 부서가 서로 공유되는
                          메모입니다. 문의자에게는 메모 내용이 공유되지
                          않습니다.
                        </p>
                      </Table.Cell>
                    </Table.Row>
                  </>
                ) : (
                  <>
                    <Table.Row>
                      <Table.HeaderCell>담당자 정보</Table.HeaderCell>
                      <Table.Cell>
                        <div>
                          <span>
                            {parsePolyglotString(
                              finalOperator.operatorGroupName
                            )}
                          </span>
                          <span>
                            {parsePolyglotString(finalOperator.operatorName)}
                          </span>
                          <span>
                            {parsePolyglotString(finalOperator.company)}
                          </span>
                          <span>
                            {parsePolyglotString(finalOperator.department)}
                          </span>
                          <span>{finalOperator.email}</span>
                          <strong>
                            {getStateToString(qna.question.state)}
                          </strong>
                          <span>
                            {moment(qna.answer.modifiedTime).format(
                              'YYYY.MM.DD'
                            )}
                          </span>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>
                        <span>답변 내용</span>
                      </Table.HeaderCell>
                      <Table.Cell>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: qna.answer.content,
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>
                        <span>첨부 파일</span>
                      </Table.HeaderCell>
                      <Table.Cell>
                        {(answerFilesMap &&
                          answerFilesMap.get('reference') &&
                          answerFilesMap
                            .get('reference')
                            .map(
                              (
                                foundedFile: DepotFileViewModel,
                                index: number
                              ) => (
                                <div key={foundedFile.id}>
                                  <a href="#" className="link" key={index}>
                                    <span
                                      className="ellipsis"
                                      onClick={(e) => {
                                        depot.downloadDepotFile(foundedFile.id);
                                        e.preventDefault();
                                      }}
                                    >
                                      {'    ' + foundedFile.name + '     '}
                                    </span>
                                    <br />
                                  </a>
                                  <br />
                                </div>
                              )
                            )) ||
                          ''}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>
                        <span>문의자 메일 발송</span>
                      </Table.HeaderCell>
                      <Table.Cell>
                        {qna.latestOperatorSentEmail ? (
                          <div>
                            <strong>Y</strong>
                            <span>
                              {parsePolyglotString(
                                emailOperator.operatorGroupName
                              )}
                            </span>
                            <span>
                              {parsePolyglotString(emailOperator.operatorName)}
                            </span>
                            <span>
                              {parsePolyglotString(emailOperator.company)}
                            </span>
                            <span>
                              {parsePolyglotString(emailOperator.department)}
                            </span>
                            <span>{emailOperator.email}</span>
                            <span>
                              {moment(
                                qna.latestOperatorSentEmail.registeredTime
                              ).format('YYYY.MM.DD')}
                            </span>
                          </div>
                        ) : (
                          'N'
                        )}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>
                        <span>만족도 조사 결과</span>
                      </Table.HeaderCell>
                      <Table.Cell>
                        {qna.answer.satisfactionPoint && (
                          <div>
                            <strong>{`${qna.answer.satisfactionPoint} 점`}</strong>
                            <span>{qna.answer.satisfactionComment}</span>
                          </div>
                        )}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>
                        <span>메모</span>
                      </Table.HeaderCell>
                      <Table.Cell>{qna.answer.memo}</Table.Cell>
                    </Table.Row>
                  </>
                )}
              </Table.Body>
            </Table>
          </div>
        </Form.Field>
      </>
    );
  }
}

export default QnaManagementAnswerView;
