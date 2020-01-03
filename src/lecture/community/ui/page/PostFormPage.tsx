
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { BoardService, PostForm } from '@sku/personalcube';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ContentLayout, mobxHelper } from 'shared';
import { inject, observer } from 'mobx-react';
import { CollegeService } from 'college';
import { PersonalCubeService } from 'personalcube/personalcube';
import { LectureCardService } from 'lecture/index';
import { LearningCardService } from 'course';
import routePaths from '../../../routePaths';


interface Props extends RouteComponentProps<{ collegeId: string, cubeId: string, lectureCardId: string, postId: string }>{
  collegeService?: CollegeService
  boardService?: BoardService
  personalCubeService?: PersonalCubeService
  lectureCardService: LectureCardService
  learningCardService: LearningCardService
}

@inject(mobxHelper.injectFrom(
  'college.collegeService',
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
    const { collegeService, personalCubeService, boardService, lectureCardService, learningCardService } = this.props;
    const { collegeId, lectureCardId } = this.props.match.params;
    collegeService!.findCollege(collegeId);
    const lectureCard = await lectureCardService!.findLectureCard(lectureCardId);
    const learningCard = await learningCardService!.findLearningCard(lectureCard!.learningCard.id);
    const personalCube = await personalCubeService!.findPersonalCube(learningCard.personalCube.id);
    boardService!.findBoard(personalCube!.contents.contents.id);
  }

  routeTo() {
    const { collegeId, cubeId, lectureCardId, postId } = this.props.match.params;
    this.props.history.push(`/lecture/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}/${postId && postId !== 'new' ? `/posts/${postId}` : ''}`);
  }

  render() {
    //
    const { cubeId, lectureCardId, postId } = this.props.match.params;
    const { boardService, collegeService } = this.props;
    const { board } = boardService as BoardService;
    const { college } = collegeService as CollegeService;

    return (
      <ContentLayout
        className="content bg-white"
        breadcrumb={[
          { text: `${college.name} College`, path: routePaths.collegeLectures(college.collegeId) },
          { text: `${college.name} Lecture`, path: routePaths.lectureCardOverview(college.collegeId, cubeId, lectureCardId) },
          { text: `${postId ? 'Edit Post' : 'New Post'}` },
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
