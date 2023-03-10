import * as React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind, ReactComponent } from '@nara.platform/accent';
import { Table } from 'semantic-ui-react';
import { PostModel } from '../../model';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';
import moment from 'moment';
import QnAModel from '../../model/QnAModel';
import QuestionModel from '../../model/QuestionModel';
import { getQuestionStateReactNode } from '../logic/QuestionStateHelper';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';
import { QnaState } from '../../model/vo/QnaState';

interface Props {
  // posts: PostModel[];
  getCategoryName: (id: string) => string;
  onClickPost: (postId: string) => void;
  getStateToString: (state: QnaState) => string;

  questions: QuestionModel[];
  startNo: number;
}

@observer
@reactAutobind
class QnaListView extends ReactComponent<Props, {}> {
  //
  render() {
    //
    const { getCategoryName, onClickPost, getStateToString } = this.props;
    const { questions, startNo } = this.props;

    return(
      <Table selectable className="qna-admin-list">
        <colgroup>
          <col width="80px" />
          {/*<col width="100px" />*/}
          <col width="200px" />
          <col width="500px" />
          <col width="150px" />
          <col width="150px" />
        </colgroup>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            {/*<Table.HeaderCell>접수 채널</Table.HeaderCell>*/}
            <Table.HeaderCell>{getPolyglotText('카테고리', 'support-qna-th-category')}</Table.HeaderCell>
            <Table.HeaderCell>{getPolyglotText('제목', 'support-qna-th-title')}</Table.HeaderCell>
            <Table.HeaderCell>{getPolyglotText('상태', 'support-qna-th-state')}</Table.HeaderCell>
            <Table.HeaderCell>{getPolyglotText('등록일자', 'support-qna-th-date')}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            questions && questions.length > 0 && questions.map((question, index) => {

              return (
                <Table.Row key={index} onClick={() => onClickPost(question.id)}>
                  <Table.Cell>{startNo - index}</Table.Cell>
                  {/*<Table.Cell>{question.requestChannel}</Table.Cell>*/}
                  <Table.Cell className="ctg">{`${getCategoryName(question.mainCategoryId)} > ${getCategoryName(question.subCategoryId)}`}</Table.Cell>
                  <Table.Cell className="title">
                    <div className="tit inner">
                      {/*<a href="#" onClick={() => onClickPost(question.id)}>*/}
                        <span className="ellipsis">{question.title}</span>
                      {/*</a>*/}
                    </div>
                  </Table.Cell>
                  <Table.Cell>{getStateToString(question.state)}</Table.Cell>
                  <Table.Cell>{moment(question.registeredTime).format('YYYY.MM.DD')}</Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    )
  }
}

export default QnaListView;
