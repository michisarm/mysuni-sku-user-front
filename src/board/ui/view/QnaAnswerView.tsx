import * as React from 'react';
import { ReactComponent } from '@nara.platform/accent';
import { Table } from 'semantic-ui-react';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import moment from 'moment';
import QnAModel from '../../model/QnAModel';

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
        <div className="content-inner">
          <div className="post-view qna">
            <div className="title">문의 답변</div>
            <Table>
              <colgroup>
                <col width="20%" />
                <col width="80%" />
              </colgroup>
              <Table.Body>
                {
                  <>
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
                      <Table.Cell className="tb-header">
                        답변 일시
                      </Table.Cell>
                      <Table.Cell>{moment(qna.question.modifiedTime).format('YYYY.MM.DD')}</Table.Cell>
                    </Table.Row>
                  </>
                }
              </Table.Body>
            </Table>
          </div>
        </div>
        )
    )
  }
}
export default QnaAnswerView;
