import React from 'react';
import { Button, Grid, Pagination, Segment, Table } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import PostViewModel from '../model/PostViewModel';
import { PageModel } from '../../../shared';

interface Props {
  posts: PostViewModel[]
  pageSet: PageModel
  onOpenRegister: () => void
  onChangePage: (page: number) => void
}

@observer
class PostListView extends React.Component<Props> {

  render() {
    const {
      posts,
      pageSet,
      onOpenRegister,
      onChangePage,
    } = this.props;

    return (
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column only="tablet computer">
              <Button
                basic
                size="small"
                onClick={onOpenRegister}
              >Register
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Table basic="very" unstackable selectable>
                <colgroup>
                  <col width="30%" />
                  <col width="55%" />
                  <col width="15%" />
                </colgroup>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      Title
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Contents
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Date
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {
                    posts.map(post => (
                      <Table.Row key={post.id}>
                        <Table.Cell><Link to={`/posts/${post.id}`}>{post.title}</Link></Table.Cell>
                        <Table.Cell>{post.contents}</Table.Cell>
                        <Table.Cell>{post.date}</Table.Cell>
                      </Table.Row>
                    ))
                  }
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" width={16}>
              <Pagination
                activePage={pageSet ? pageSet.page : 1}
                totalPages={pageSet ? pageSet.totalPages : 1}
                onPageChange={(e, data) => onChangePage(data.activePage as number)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default PostListView;
