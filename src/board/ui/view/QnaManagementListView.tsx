import React from 'react';
import { Table } from 'semantic-ui-react';
import { NoSuchContentPanel } from '../../../shared/components/NoSuchContentPanel';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import QnAModel from '../../model/QnAModel';
import moment from 'moment';
import {
  parsePolyglotString,
  PolyglotString,
} from '../../../shared/viewmodel/PolyglotString';
import { QnaState } from '../../model/vo/QnaState';
import { RequestChannel } from '../../model/vo/RequestChannel';

interface Props {
  qnas: QnAModel[];
  startNo: number;
  categoriesMap: Map<string, PolyglotString>;
  onClickQnA: (qnaId: string) => void;
  getStateToString: (state: QnaState) => string;
  getChannelToString: (channel: RequestChannel) => string;
}

class QnaManagementListView extends React.Component<Props> {
  //
  render() {
    //
    const {
      qnas,
      startNo,
      categoriesMap,
      onClickQnA,
      getStateToString,
      getChannelToString,
    } = this.props;

    return (
      <>
        <Table selectable className="qna-admin-list">
          <colgroup>
            <col width="80px" />
            <col width="100px" />
            <col width="100px" />
            <col width="500px" />
            <col width="140px" />
            <col width="100px" />
            <col width="100px" />
            <col width="100px" />
          </colgroup>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No.</Table.HeaderCell>
              <Table.HeaderCell>
                <PolyglotText
                  id="support-qnamgt-접수채널"
                  defaultString="접수채널"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <PolyglotText
                  id="support-qnamgt-카테고리"
                  defaultString="카테고리"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <PolyglotText
                  id="support-qnamgt-문의제목"
                  defaultString="문의제목"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <PolyglotText
                  id="support-qnamgt-문의일자"
                  defaultString="문의일자"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <PolyglotText
                  id="support-qnamgt-문의자"
                  defaultString="문의자"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <PolyglotText
                  id="support-qnamgt-담당자"
                  defaultString="담당자"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <PolyglotText
                  id="support-qnamgt-처리상태"
                  defaultString="처리상태"
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {qnas && qnas.length > 0 ? (
              qnas.map((qna, index) => (
                <Table.Row
                  key={qna.question.id}
                  onClick={() => onClickQnA(qna.question.id)}
                >
                  <Table.Cell>{startNo - index}</Table.Cell>
                  <Table.Cell>
                    {getChannelToString(qna.question.requestChannel)}
                  </Table.Cell>
                  <Table.Cell className="ctg">
                    {parsePolyglotString(
                      categoriesMap.get(qna.question.mainCategoryId)
                    )}
                  </Table.Cell>
                  <Table.Cell className="title">
                    <span className="ellipsis">{qna.question.title}</span>
                  </Table.Cell>
                  <Table.Cell>
                    {moment(qna.question.registeredTime).format('YYYY.MM.DD')}
                  </Table.Cell>
                  <Table.Cell>
                    <span className="ellipsis">
                      {parsePolyglotString(qna.inquirerIdentity?.name)}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="ellipsis">
                      {qna.answer.content === ''
                        ? '미정'
                        : parsePolyglotString(qna.answer.modifierName)}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    {getStateToString(qna.question.state)}
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell textAlign="center" colSpan={8}>
                  <NoSuchContentPanel
                    message={getPolyglotText(
                      '등록된 Q&A가 없습니다.',
                      'support-qna-목록없음'
                    )}
                  />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </>
    );
  }
}

export default QnaManagementListView;
