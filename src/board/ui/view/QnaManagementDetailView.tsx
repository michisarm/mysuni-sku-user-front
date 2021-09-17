import React from 'react';
import { observer } from 'mobx-react';
import depot, {
  DepotFileViewModel,
  FileBox,
  ValidationType,
} from '@nara.drama/depot';
import { PatronType, reactAutobind } from '@nara.platform/accent';
import ReactQuill from 'react-quill';
import moment from 'moment';
import {
  Button,
  Checkbox,
  Icon,
  Radio,
  Table,
  TextArea,
} from 'semantic-ui-react';

import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';
import { depotHelper } from '../../../shared';

import {
  parsePolyglotString,
  PolyglotString,
} from '../../../shared/viewmodel/PolyglotString';
import QnAModel from '../../model/QnAModel';
import { QnaState } from '../../model/vo/QnaState';
import OperatorModel from '../../model/vo/OperatorModel';

interface Props {
  qna: QnAModel;
  isUpdatable: boolean;
  filesMap: Map<string, any>;
  answerFilesMap: Map<string, any>;
  categoriesMap: Map<string, PolyglotString>;
  finalOperator: OperatorModel;
  emailOperator: OperatorModel;
  onClickList: () => void;
  getFileBoxIdForReference: (depotId: string) => void;
  changeQnaProps: (name: string, value: any) => void;
}

@observer
@reactAutobind
class QnaManagementDetailView extends React.Component<Props> {
  //
  render() {
    //
    const {
      qna,
      isUpdatable,
      filesMap,
      answerFilesMap,
      categoriesMap,
      finalOperator,
      emailOperator,
      onClickList,
      getFileBoxIdForReference,
      changeQnaProps,
    } = this.props;

    return (
      <>
        <div className="post-view qna">
          <div className="title-area">
            <div className="title-inner">
              <div className="title">{qna.question.title}</div>
              <div className="user-info">
                <span className="category">Q&A</span>
                <span className="category">
                  {parsePolyglotString(
                    categoriesMap.get(qna.question.mainCategoryId)
                  )}
                  {qna.question.subCategoryId
                    ? ' > ' +
                      parsePolyglotString(
                        categoriesMap.get(qna.question.subCategoryId)
                      )
                    : ''}
                </span>
                <span className="date">{qna.question.state}</span>
                <br />
                <span className="category">
                  {parsePolyglotString(qna.inquirerIdentity.name)}
                </span>
                <span className="category">
                  {parsePolyglotString(qna.inquirerIdentity.departmentName)}
                </span>
                <span className="category">{qna.inquirerIdentity.email}</span>
                <span className="date">
                  {qna.question.registeredTime &&
                    moment(qna.question.registeredTime).format('YYYY.MM.DD')}
                </span>
              </div>
              <div className="actions">
                <Button
                  icon
                  className="left postset commu-list16"
                  onClick={onClickList}
                >
                  <Icon className="commu-list16" />

                  <PolyglotText defaultString="List" id="support-noti-list1" />
                </Button>
              </div>
            </div>
          </div>

          {qna.question.content && (
            <div className="content-area">
              <div className="content-inner">
                <ReactQuill
                  theme="bubble"
                  value={qna.question.content || ''}
                  readOnly
                />
                <div className="file">
                  <span>
                    <PolyglotText
                      id="support-QnaRead-첨부파일"
                      defaultString="첨부파일 :"
                    />
                  </span>
                  <br />
                  {(filesMap &&
                    filesMap.get('reference') &&
                    filesMap
                      .get('reference')
                      .map((foundedFile: DepotFileViewModel, index: number) => (
                        <div>
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
                      ))) ||
                    ''}
                </div>
                <br />
              </div>
            </div>
          )}
        </div>

        {qna.answer && (
          <div className="post-view qna">
            <div className="content-area">
              <div className="content-inner">
                <div className="title">문의 답변</div>
                <Table>
                  <colgroup>
                    <col width="20%" />
                    <col width="80%" />
                  </colgroup>
                  <Table.Body>
                    {isUpdatable ? (
                      <>
                        <Table.Row>
                          <Table.Cell className="tb-header">
                            답변 내용 <span className="required"> *</span>
                          </Table.Cell>
                          <Table.Cell>
                            <TextArea
                              value={qna.answer.content}
                              onChange={(e, data) =>
                                changeQnaProps('answer.content', data.value)
                              }
                            />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell className="tb-header">
                            첨부 파일
                          </Table.Cell>
                          <Table.Cell>
                            <FileBox
                              vaultKey={{
                                keyString: 'sample',
                                patronType: PatronType.Audience,
                              }}
                              patronKey={{
                                keyString: 'sample',
                                patronType: PatronType.Audience,
                              }}
                              validations={[
                                {
                                  type: ValidationType.Duplication,
                                  validator: depotHelper.duplicationValidator,
                                },
                              ]}
                              onChange={getFileBoxIdForReference}
                              id={qna.answer.depotId || ''}
                            />
                            <div className="bottom" />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell className="tb-header">
                            처리 상태 <span className="required"> *</span>
                          </Table.Cell>
                          <Table.Cell>
                            <div className="list-top">
                              <div className="radio-wrap">
                                <Radio
                                  name="radioGroup"
                                  label="문의대기"
                                  value={QnaState.QuestionReceived}
                                  checked={
                                    qna.question.state ===
                                    QnaState.QuestionReceived
                                  }
                                  onChange={() =>
                                    changeQnaProps(
                                      'question.state',
                                      QnaState.QuestionReceived
                                    )
                                  }
                                />
                                <Radio
                                  name="radioGroup"
                                  label="답변완료"
                                  value={QnaState.AnswerCompleted}
                                  checked={
                                    qna.question.state ===
                                    QnaState.AnswerCompleted
                                  }
                                  onChange={() =>
                                    changeQnaProps(
                                      'question.state',
                                      QnaState.AnswerCompleted
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell className="tb-header">
                            문의자 메일 발송
                          </Table.Cell>
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
                      </>
                    ) : (
                      <>
                        <Table.Row>
                          <Table.Cell className="tb-header">
                            최종 담당자
                          </Table.Cell>
                          <Table.Cell>
                            <span className="division-span">
                              {parsePolyglotString(
                                finalOperator.operatorGroupName
                              )}
                            </span>
                            <span className="division-span">
                              {parsePolyglotString(finalOperator.operatorName)}
                            </span>
                            <span className="division-span">
                              {parsePolyglotString(finalOperator.company)}
                            </span>
                            <span className="division-span">
                              {parsePolyglotString(finalOperator.department)}
                            </span>
                            <span className="division-span">
                              {finalOperator.email}
                            </span>
                            <span className="division-span">
                              {qna.question.state}
                            </span>
                            <span>
                              {moment(qna.answer.modifiedTime).format(
                                'YYYY-MM-DD'
                              )}
                            </span>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell className="tb-header">
                            답변 내용
                          </Table.Cell>
                          <Table.Cell>{qna.answer.content}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell className="tb-header">
                            첨부 파일
                          </Table.Cell>
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
                                            depot.downloadDepotFile(
                                              foundedFile.id
                                            );
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
                          <Table.Cell className="tb-header">
                            처리 상태
                          </Table.Cell>
                          <Table.Cell>{qna.question.state}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell className="tb-header">
                            문의자 메일 발송
                          </Table.Cell>
                          <Table.Cell>
                            {qna.latestOperatorSentEmail ? (
                              <>
                                <span className="division-span">
                                  {parsePolyglotString(
                                    emailOperator.operatorGroupName
                                  )}
                                </span>
                                <span className="division-span">
                                  {parsePolyglotString(
                                    emailOperator.operatorName
                                  )}
                                </span>
                                <span className="division-span">
                                  {parsePolyglotString(emailOperator.company)}
                                </span>
                                <span className="division-span">
                                  {parsePolyglotString(
                                    emailOperator.department
                                  )}
                                </span>
                                <span className="division-span">
                                  {emailOperator.email}
                                </span>
                                <span>
                                  {moment(
                                    qna.latestOperatorSentEmail.registeredTime
                                  ).format('YYYY-MM-DD')}
                                </span>
                              </>
                            ) : (
                              'N'
                            )}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell className="tb-header">
                            만족도 조사 결과
                          </Table.Cell>
                          <Table.Cell>
                            {qna.answer.satisfactionPoint && (
                              <>
                                <span className="division-span">{`${qna.answer.satisfactionPoint} 점`}</span>
                                <span>{qna.answer.satisfactionComment}</span>
                              </>
                            )}
                          </Table.Cell>
                        </Table.Row>
                      </>
                    )}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default QnaManagementDetailView;
