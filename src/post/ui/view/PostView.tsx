import React from 'react';
import { Button, Form, Segment, TextArea } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import PostViewModel from '../model/PostViewModel';

interface Props {
  post: PostViewModel
  onDelete: () => void
}

@observer
class PostView extends React.Component<Props> {

  render() {
    const {
      post,
      onDelete,
    } = this.props;

    return (
      <>
        <Segment>
          <Form>
            <Form.Group>
              <label>Title</label>
              <Form.Input
                width={16}
                value={post.title || ''}
                readOnly
              />
            </Form.Group>

            <Form.Group>
              <label>Contents</label>
              <Form.Field width={16}>
                <TextArea
                  rows={20}
                  value={post.contents || ''}
                  readOnly
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Segment>

        <div className="button-group blue aligned center ui">
          <Button primary onClick={onDelete}>Delete</Button>
          <Button as={Link} to="/posts">List</Button>
        </div>
      </>
    );
  }
}

export default PostView;
