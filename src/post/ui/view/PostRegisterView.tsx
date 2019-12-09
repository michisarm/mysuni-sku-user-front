import React from 'react';
import { Button, Form, Segment, TextArea, Modal } from 'semantic-ui-react';
import { observer } from 'mobx-react';

import PostViewModel from '../model/PostViewModel';

interface Props {
  open: boolean
  post: PostViewModel
  onClose: () => void
  onRegister: () => void
  onChangePostProp: (prop: string, value: string) => void
}

@observer
class PostRegisterView extends React.Component<Props> {

  render() {
    const {
      open,
      post,
      onClose,
      onRegister,
      onChangePostProp,
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
                  onChange={(e, data) => onChangePostProp('title', data.value)}
                />
              </Form.Group>

              <Form.Group>
                <label>Contents</label>
                <Form.Field width={16}>
                  <TextArea
                    rows={20}
                    value={post.contents || ''}
                    onChange={(e, data) => onChangePostProp('contents', data.value as string)}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            onClick={onRegister}
          >Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default PostRegisterView;
