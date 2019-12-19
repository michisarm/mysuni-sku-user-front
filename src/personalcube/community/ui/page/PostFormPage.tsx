
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { BoardService, PostForm } from '@sku/personalcube';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ContentLayout, mobxHelper } from 'shared';
import { inject, observer } from 'mobx-react';
import { PersonalCubeService } from 'personalcube/personalcube';

interface Props extends RouteComponentProps<{ cubeId: string, postId: string }>{
  boardService?: BoardService
  personalCubeService?: PersonalCubeService
}

@inject(mobxHelper.injectFrom('personalCube.personalCubeService', 'personalCube.boardService'))
@observer
@reactAutobind
class PostFormPage extends React.Component<Props> {
  //
  componentDidMount(): void {
    const { personalCubeService, boardService } = this.props;
    const { cubeId } = this.props.match.params;

    if (personalCubeService && boardService && cubeId) {
      personalCubeService.findPersonalCube(cubeId)
        .then(() => {
          boardService.findBoard(personalCubeService.personalCube.contents.contents.id);
        });
    }
  }

  routeTo() {
    const { cubeId, postId } = this.props.match.params;
    this.props.history.push(`${process.env.PUBLIC_URL}/community/${cubeId}/posts${postId && postId !== 'new' ? `/${postId}` : ''}`);
  }

  render() {
    //
    const { postId } = this.props.match.params;
    const { boardService } = this.props;
    const { board } = boardService as BoardService;

    return (
      <ContentLayout
        className="content bg-white"
        breadcrumb={[
          { text: `Community` },
        ]}
      >
        <PostForm
          boardId={board && board.id || ''}
          postId={postId && postId !== 'new' ? postId : ''}
          onCancel={this.routeTo}
          onSaveCallback={this.routeTo}
        />
      </ContentLayout>
    );
  }
}

export default withRouter(PostFormPage);
