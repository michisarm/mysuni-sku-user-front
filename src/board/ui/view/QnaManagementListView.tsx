import React from 'react';
import { Table } from 'semantic-ui-react';
import { NoSuchContentPanel } from '../../../shared/components/NoSuchContentPanel';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';
import QnAModel from '../../model/QnAModel';
import moment from 'moment';
import {
  parsePolyglotString,
  PolyglotString,
} from '../../../shared/viewmodel/PolyglotString';

interface Props {
  qnas: QnAModel[];
  startNo: number;
  categoriesMap: Map<string, PolyglotString>;
  onClickQnA: (qnaId: string) => void;
}

class QnaManagementListView extends React.Component<Props> {
  //
  render() {
    //
    const { qnas, startNo, categoriesMap, onClickQnA } = this.props;

    return (
      <>
        <Table className="qna-admin-list">
          <colgroup>
            <col width="2%" />
            <col width="10%" />
            <col width="10%" />
            <col />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>No.</Table.HeaderCell>
              <Table.HeaderCell>접수채널</Table.HeaderCell>
              <Table.HeaderCell>카테고리</Table.HeaderCell>
              <Table.HeaderCell>문의제목</Table.HeaderCell>
              <Table.HeaderCell>문의일자</Table.HeaderCell>
              <Table.HeaderCell>문의자</Table.HeaderCell>
              <Table.HeaderCell>담당자</Table.HeaderCell>
              <Table.HeaderCell>처리상태</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {qnas && qnas.length > 0 ? (
              qnas.map((qna, index) => (
                <Table.Row key={qna.question.id}>
                  <Table.Cell>{startNo - index}</Table.Cell>
                  <Table.Cell>{qna.question.requestChannel}</Table.Cell>
                  <Table.Cell>
                    {parsePolyglotString(
                      categoriesMap.get(qna.question.mainCategoryId)
                    )}
                  </Table.Cell>
                  <Table.Cell textAlign="left" className="title">
                    <a onClick={() => onClickQnA(qna.question.id)}>
                      {qna.question.title}
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    {moment(qna.question.registeredTime).format('YYYY-MM-DD')}
                  </Table.Cell>
                  <Table.Cell>
                    {parsePolyglotString(qna.inquirerIdentity.name)}
                  </Table.Cell>
                  <Table.Cell>
                    {parsePolyglotString(qna.answer.modifierName) || '미정'}
                  </Table.Cell>
                  <Table.Cell>{qna.question.state}</Table.Cell>
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
