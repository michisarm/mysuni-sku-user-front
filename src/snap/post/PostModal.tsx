import React from 'react';
import { observer, inject } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';

import PostView from './PostView';
import withPostStore from './withPostStore';
import { SharedService, actionHandler } from '../../shared';
import { PostService } from '../../post';

interface Props {
  sharedService: SharedService
  postService: PostService
}

@inject('postService', 'sharedService')
@reactAutobind
@observer
class PostModal extends React.Component<Props> {

  componentDidMount() {
    actionHandler.containerMounted();
    actionHandler.setAction('handleOpen', this.handleOpen);
  }

  findPost(id: string) {
    this.props.postService.findPost(id);
  }

  handleOpen(id: string) {
    this.props.sharedService.changeModal('postSnap', true);
    this.findPost(id);
  }

  render() {
    const { sharedService, postService } = this.props;

    return (
      <PostView
        open={sharedService.modalMap.get('postSnap')}
        post={postService.post}
        onClose={() => sharedService.changeModal('postSnap', false)}
      />
    );
  }
}

export default withPostStore(PostModal);
