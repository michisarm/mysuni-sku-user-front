import * as React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind, ReactComponent } from '@nara.platform/accent';
import { Table } from 'semantic-ui-react';
import { PostModel } from '../../model';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';
import moment from 'moment';

interface Props {
  posts: PostModel[];
}

@observer
@reactAutobind
class QnaListView extends ReactComponent<Props, {}> {
  //
  render() {
    //
    const { posts } = this.props;

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
            posts && posts.length > 0 && posts.map((post, index) => {
              return (
                <Table.Row>
                  <Table.Cell>NO</Table.Cell>
                  <Table.Cell>접수채널</Table.Cell>
                  <Table.Cell>{parsePolyglotString(post.category.name)}</Table.Cell>
                  <Table.Cell>{parsePolyglotString(post.title)}</Table.Cell>
                  <Table.Cell>{post.openState}</Table.Cell>
                  <Table.Cell>{moment(post.registeredTime).format('YYYY.MM.DD')}</Table.Cell>
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
