import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { BoardService, PostForm } from '@sku/personalcube';
import { ContentLayout } from 'shared';
import { CollegeService } from 'college/stores';
import { PersonalCubeService } from 'personalcube/personalcube/stores';
import { LectureCardService } from 'lecture/stores';
import { LearningCardService } from 'course/stores';
import routePaths from '../../../routePaths';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../model/LangSupport';

interface Props
  extends RouteComponentProps<{
    collegeId: string;
    cubeId: string;
    lectureCardId: string;
    postId: string;
  }> {
  collegeService?: CollegeService;
  boardService?: BoardService;
  personalCubeService?: PersonalCubeService;
  lectureCardService: LectureCardService;
  learningCardService: LearningCardService;
}

@inject(
  mobxHelper.injectFrom(
    'college.collegeService',
    'personalCube.personalCubeService',
    'personalCube.boardService',
    'lecture.lectureCardService',
    'course.learningCardService'
  )
)
@observer
@reactAutobind
class PostFormPage extends React.Component<Props> {
  //
  hasAdminRole = patronInfo.hasPavilionRole(
    'SuperManager',
    'CollegeManager',
    'CompanyManager'
  );

  componentDidMount(): void {
    this.init();
  }

  componentWillUnmount(): void {
    //
    patronInfo.clearWorkspace();
  }

  async init() {
    const {
      collegeService,
      personalCubeService,
      boardService,
      lectureCardService,
      learningCardService,
    } = this.props;
    const { collegeId, lectureCardId } = this.props.match.params;
    collegeService!.findCollege(collegeId);
    const lectureCard = await lectureCardService!.findLectureCard(
      lectureCardId
    );
    const learningCard = await learningCardService!.findLearningCard(
      lectureCard!.learningCard.id
    );
    const personalCube = await personalCubeService!.findPersonalCube(
      learningCard.personalCube.id
    );
    boardService!.findBoard(personalCube!.contents.contents.id);

    if (this.hasAdminRole) {
      patronInfo.setWorkspaceById('ne1-m2-c2');
    }
  }

  routeTo() {
    const { collegeId, cubeId, lectureCardId, postId } =
      this.props.match.params;
    this.props.history.push(
      `/lecture/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}/${
        postId && postId !== 'new' ? `posts/${postId}` : ''
      }`
    );
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
          {
            text: `${parsePolyglotString(
              college.name,
              getDefaultLang(college.langSupports)
            )} College`,
            path: routePaths.collegeLectures(college.collegeId),
          },
          {
            text: `${parsePolyglotString(
              college.name,
              getDefaultLang(college.langSupports)
            )} Lecture`,
            path: routePaths.lectureCardOverviewPrev(
              college.collegeId,
              cubeId,
              lectureCardId
            ),
          },
          { text: `${postId ? 'Edit Post' : 'New Post'}` },
        ]}
      >
        <PostForm
          boardId={(board && board.id) || ''}
          postId={postId && postId !== 'new' ? postId : ''}
          onCancel={this.routeTo}
          onSaveCallback={this.routeTo}
        />
      </ContentLayout>
    );
  }
}

export default withRouter(PostFormPage);
