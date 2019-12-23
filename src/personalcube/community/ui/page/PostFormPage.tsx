
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { BoardService, PostForm } from '@sku/personalcube';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ContentLayout, mobxHelper } from 'shared';
import { inject, observer } from 'mobx-react';
import { PersonalCubeService } from 'personalcube/personalcube';
import { LectureCardService } from 'lecture';
import { LearningCardService } from 'course';

interface Props extends RouteComponentProps<{ collegeId: string, cubeId: string, lectureCardId: string, postId: string }>{
  boardService?: BoardService
  personalCubeService?: PersonalCubeService
  lectureCardService: LectureCardService
  learningCardService: LearningCardService
}

@inject(mobxHelper.injectFrom(
  'personalCube.personalCubeService',
  'personalCube.boardService',
  'lecture.lectureCardService',
  'course.learningCardService'
))
@observer
@reactAutobind
class PostFormPage extends React.Component<Props> {
  //
  componentDidMount(): void {
    this.init();
  }

  async init() {
    const { personalCubeService, boardService, lectureCardService, learningCardService } = this.props;
    const { lectureCardId } = this.props.match.params;
    const lectureCard = await lectureCardService!.findLectureCard(lectureCardId);
    const learningCard = await learningCardService!.findLearningCard(lectureCard!.learningCard.id);
    const personalCube = await personalCubeService!.findPersonalCube(learningCard.personalCube.id);
    boardService!.findBoard(personalCube!.contents.contents.id);
  }

  routeTo() {
    const { collegeId, cubeId, lectureCardId, postId } = this.props.match.params;
    this.props.history.push(`${process.env.PUBLIC_URL}/lecture/college/${collegeId}/cube/${cubeId}lecture-card/${lectureCardId}/${postId && postId !== 'new' ? `/posts/${postId}` : ''}`);
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
