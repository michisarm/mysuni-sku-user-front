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
        <Table celled selectable>
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
              <Table.HeaderCell className="title-header">No.</Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                접수채널
              </Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                카테고리
              </Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                문의제목
              </Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                문의일자
              </Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                문의자
              </Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                담당자
              </Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                처리상태
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {qnas && qnas.length > 0 ? (
              qnas.map((qna, index) => (
                <Table.Row key={qna.question.id} textAlign="center">
                  <Table.Cell>{startNo - index}</Table.Cell>
                  <Table.Cell>{qna.question.requestChannel}</Table.Cell>
                  <Table.Cell>
                    {parsePolyglotString(
                      categoriesMap.get(qna.question.mainCategoryId)
                    )}
                  </Table.Cell>
                  <Table.Cell textAlign="left">{qna.question.title}</Table.Cell>
                  <Table.Cell>
                    {moment(qna.question.registeredTime).format('YYYY-MM-DD')}
                  </Table.Cell>
                  <Table.Cell>
                    {parsePolyglotString(qna.questionerIdentity.name)}
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
