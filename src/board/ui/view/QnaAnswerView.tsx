import * as React from 'react';
import { ReactComponent } from '@nara.platform/accent';
import { Table, Form } from 'semantic-ui-react';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import moment from 'moment';
import QnAModel from '../../model/QnAModel';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';

interface Props {
  qna: QnAModel;
  filesMap: Map<string, any>;
}

class QnaAnswerView extends ReactComponent<Props> {
  //
  render() {
    //
    const { qna, filesMap } = this.props;

    return (
      qna.answer && (
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
                {
                  <>
                    <Table.Row>
                      <Table.HeaderCell>
                        <span>답변 내용</span>
                      </Table.HeaderCell>
                      <Table.Cell>
                        <div dangerouslySetInnerHTML={{ __html: qna.answer.content, }}/>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>
                        <span>첨부 파일</span>
                      </Table.HeaderCell>
                      <Table.Cell>
                        {(filesMap &&
                          filesMap.get('reference') &&
                          filesMap
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
                      <Table.HeaderCell>
                        <span>답변 일시</span>
                      </Table.HeaderCell>
                      <Table.Cell>{moment(qna.question.modifiedTime).format('YYYY.MM.DD')}</Table.Cell>
                    </Table.Row>
                  </>
                }
              </Table.Body>
            </Table>
          </div>
        </Form.Field>
        )
    )
  }
}
export default QnaAnswerView;
