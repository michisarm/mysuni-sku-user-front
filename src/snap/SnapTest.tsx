import React from 'react';
import { reactAutobind } from '@nara.platform/accent';

import post, { PostModal } from './index';

@reactAutobind
class SnapTest extends React.Component {

  showPost() {
    const id = window.prompt('Input id what you want to find.') as string;
    post.showPost(id);
  }

  render() {
    return (
      <>
        <button onClick={this.showPost}>find the post!</button>
        <PostModal />
      </>
    );
  }
}

export default SnapTest;
