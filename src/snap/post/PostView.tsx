import React from 'react';
import { Form, Segment, TextArea, Modal } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { PostViewModel } from '../../post';

interface Props {
  open: boolean
  post: PostViewModel
  onClose: () => void
}

@observer
class PostView extends React.Component<Props> {

  render() {
    const {
      open,
      post,
      onClose,
    } = this.props;

    return (
      <Modal
        open={open}
      >
        <Modal.Header>
          Post
          <div
            className="close-btn"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
          </div>
        </Modal.Header>
        <Modal.Content className="fluid">
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
        </Modal.Content>
      </Modal>
    );
  }
}

export default PostView;
