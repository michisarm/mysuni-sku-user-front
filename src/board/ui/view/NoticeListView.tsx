import React from 'react';
import { Table } from 'semantic-ui-react';
import { PostModel } from '../../model';
import { NoSuchContentPanel } from '../../../shared/components/NoSuchContentPanel';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';
import moment from 'moment';

interface Props {
  posts: PostModel[];
  startNo: number;
  onClickPost: (postId: string) => void;
  isNewPost: (time: number) => boolean;
}

class NoticeListView extends React.Component<Props> {
  //
  render() {
    //
    const { posts, startNo, onClickPost, isNewPost } = this.props;

    return (
      <>
        <Table className="qna-admin-list">
          <colgroup>
            <col width="80px" />
            <col width="500px" />
            <col width="100px" />
            <col width="100px" />
          </colgroup>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell className="title-header">No.</Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                <PolyglotText id="support-notice-제목" defaultString="제목" />
              </Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                <PolyglotText
                  id="support-notice-조회수"
                  defaultString="조회수"
                />
              </Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                <PolyglotText
                  id="support-notice-등록일자"
                  defaultString="등록일자"
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {(posts &&
              posts.length !== 0 &&
              posts.map((post, index) => {
                return (
                  <Table.Row
                    selectable={posts && posts.length > 0}
                    key={post.postId}
                    onClick={() => onClickPost(post.postId)}
                  >
                    <Table.Cell>{startNo - index}</Table.Cell>
                    <Table.Cell
                      className={
                        isNewPost(post.registeredTime) ? 'title new' : 'title'
                      }
                    >
                      <div className="tit_inner">
                        <a>
                          <span className="ellipsis">
                            {parsePolyglotString(post.title)}
                          </span>
                        </a>
                        {post.commentCount > 0 && (
                          <span className="reply">
                            [<strong>{post.commentCount}</strong>]
                          </span>
                        )}
                      </div>
                    </Table.Cell>
                    <Table.Cell>{post.readCount}</Table.Cell>
                    <Table.Cell>
                      {moment(post.registeredTime).format('YYYY.MM.DD')}
                    </Table.Cell>
                  </Table.Row>
                );
              })) || (
              <Table.Row>
                <Table.Cell colSpan={4}>
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
