import React from 'react';
import { Table } from 'semantic-ui-react';
import { PostModel } from '../../model';
import { NoSuchContentPanel } from '../../../shared/components/NoSuchContentPanel';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';
import moment from 'moment';

interface Props {
  posts: PostModel[];
  startNo: number;
  onClickPost: (postId: string) => void;
}

class NoticeListView extends React.Component<Props> {
  //
  render() {
    //
    const { posts, startNo, onClickPost } = this.props;

    return (
      <>
        <Table className="qna-admin-list">
          <colgroup>
            <col width="2%" />
            <col />
            <col width="5%" />
            <col width="12%" />
          </colgroup>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell className="title-header">No.</Table.HeaderCell>
              <Table.HeaderCell className="title-header">제목</Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                조회수
              </Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                등록일자
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {(posts &&
              posts.length !== 0 &&
              posts.map((post, index) => {
                return (
                  <Table.Row key={post.postId}>
                    <Table.Cell textAlign="center">
                      {startNo - index}
                    </Table.Cell>
                    <Table.Cell textAlign="left" className="title">
                      <div className="tit_inner">
                        <a onClick={() => onClickPost(post.postId)}>
                          {parsePolyglotString(post.title)}
                        </a>
                      </div>
                    </Table.Cell>
                    <Table.Cell textAlign="center">{post.readCount}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {moment(post.registeredTime).format('YYYY-MM-DD')}
                    </Table.Cell>
                  </Table.Row>
                );
              })) || (
              <Table.Row>
                <Table.Cell textAlign="center" colSpan={4}>
                  <NoSuchContentPanel
                    message={getPolyglotText(
                      '등록된 Notice가 없습니다.',
                      'support-noti-목록없음'
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

export default NoticeListView;
