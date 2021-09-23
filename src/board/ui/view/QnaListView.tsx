import * as React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind, ReactComponent } from '@nara.platform/accent';
import { Table } from 'semantic-ui-react';
import { PostModel } from '../../model';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';
import moment from 'moment';
import QnAModel from '../../model/QnAModel';
import QuestionModel from '../../model/QuestionModel';

interface Props {
  // posts: PostModel[];
  getCategoryName: (id: string) => string;
  onClickPost: (postId: string) => void;

  questions: QuestionModel[];
}

@observer
@reactAutobind
class QnaListView extends ReactComponent<Props, {}> {
  //
  render() {
    //
    const { getCategoryName, onClickPost } = this.props;
    const { questions } = this.props;

    return(
      <Table selectable className="qna-admin-list">
        <colgroup>
          <col width="80px" />
          <col width="100px" />
          <col width="200px" />
          <col width="500px" />
          <col width="100px" />
          <col width="100px" />
        </colgroup>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>접수 채널</Table.HeaderCell>
            <Table.HeaderCell>카테고리</Table.HeaderCell>
            <Table.HeaderCell>제목</Table.HeaderCell>
            <Table.HeaderCell>상태</Table.HeaderCell>
            <Table.HeaderCell>등록일자</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            questions && questions.length > 0 && questions.map((question, index) => {

              return (
                <Table.Row key={index} onClick={() => onClickPost(question.id)}>
                  <Table.Cell>NO</Table.Cell>
                  <Table.Cell>{question.requestChannel}</Table.Cell>
                  <Table.Cell>{`${getCategoryName(question.mainCategoryId)} > ${getCategoryName(question.subCategoryId)}`}</Table.Cell>
                  <Table.Cell>{question.title}</Table.Cell>
                  <Table.Cell>{question.state}</Table.Cell>
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
