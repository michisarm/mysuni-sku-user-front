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
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';

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
            <strong>
              <PolyglotText
                id="support-qnamgt-????????????"
                defaultString="????????????"
              />
            </strong>
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
                        <span className="impt">
                          <PolyglotText
                            id="support-qnamgt-????????????"
                            defaultString="?????? ??????"
                          />
                        </span>
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
                        <span>
                          <PolyglotText
                            id="support-qnamgt-????????????"
                            defaultString="?????? ??????"
                          />
                        </span>
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
                        <span className="impt">
                          <PolyglotText
                            id="support-qnamgt-????????????2"
                            defaultString="?????? ??????"
                          />
                        </span>
                      </Table.HeaderCell>
                      <Table.Cell>
                        <div className="radio-bttn">
                          <Radio
                            name="radioGroup"
                            label={getStateToString(QnaState.AnswerWaiting)}
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
                            label={getStateToString(QnaState.AnswerCompleted)}
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
                        <span>
                          <PolyglotText
                            id="support-qnamgt-??????????????????"
                            defaultString="?????? ?????? ??????"
                          />
                        </span>
                      </Table.HeaderCell>
                      <Table.Cell>
                        <Checkbox
                          label={getPolyglotText(
                            '??????????????? ?????? ????????? ????????? ???????????????.',
                            'support-qnamgt-??????????????????label'
                          )}
                          checked={qna.checkMail}
                          onChange={(e, data) =>
                            changeQnaProps('checkMail', data.checked)
                          }
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>
                        <span>
                          <PolyglotText
                            id="support-qnamgt-??????"
                            defaultString="??????"
                          />
                        </span>
                      </Table.HeaderCell>
                      <Table.Cell>
                        <TextArea
                          value={qna.answer.memo}
                          className="memo-ipt"
                          placeHolder={getPolyglotText(
                            '????????? ??????????????????.',
                            'support-qnamgt-??????-placeholder'
                          )}
                          onChange={(e, data) => {
                            changeQnaProps('answer.memo', data.value);
                          }}
                        />
                        <p>
                          <i aria-hidden="true" className="icon info20" />
                          <PolyglotText
                            defaultString="?????? ???????????? Help Desk ????????? ?????? ???????????? ???????????????. ?????????????????? ?????? ????????? ???????????? ????????????."
                            id="support-qnamgt-????????????"
                          />
                        </p>
                      </Table.Cell>
                    </Table.Row>
                  </>
                ) : (
                  <>
                    <Table.Row>
                      <Table.HeaderCell>
                        <PolyglotText
                          defaultString="????????? ??????"
                          id="support-qnamgt-???????????????"
                        />
                      </Table.HeaderCell>
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
                        <span>
                          <PolyglotText
                            id="support-qnamgt-????????????"
                            defaultString="?????? ??????"
                          />
                        </span>
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
                        <span>
                          <PolyglotText
                            id="support-qnamgt-????????????"
                            defaultString="?????? ??????"
                          />
                        </span>
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
                        <span>
                          <PolyglotText
                            id="support-qnamgt-???????????????????????????"
                            defaultString="????????? ?????? ??????"
                          />
                        </span>
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
                        <span>
                          <PolyglotText
                            id="support-qnamgt-???????????????"
                            defaultString="????????? ?????? ??????"
                          />
                        </span>
                      </Table.HeaderCell>
                      <Table.Cell>
                        {qna.answer.satisfactionPoint && (
                          <div>
                            <strong>
                              {getPolyglotText(
                                `{count} ???`,
                                'support-qnamgt-??????',
                                {
                                  count: (
                                    qna.answer.satisfactionPoint || 0
                                  ).toString(),
                                }
                              )}
                            </strong>
                            <span>{qna.answer.satisfactionComment}</span>
                          </div>
                        )}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>
                        <span>
                          <PolyglotText
                            id="support-qnamgt-??????"
                            defaultString="??????"
                          />
                        </span>
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
