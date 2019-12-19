
import React from 'react';
import { DatePeriod, reactAutobind } from '@nara.platform/accent';
import { BoardService, PostList } from '@sku/personalcube';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { ContentLayout, ContentMenu, LectureContentHeader, LectureSubInfo, mobxHelper } from 'shared';
import { inject, observer } from 'mobx-react';
import { PersonalCubeService } from 'personalcube/personalcube';
import { CubeIntroService } from 'personalcube/cubeintro';

interface Props extends RouteComponentProps<{ cubeId: string }>{
  boardService?: BoardService
  personalCubeService?: PersonalCubeService
  cubeIntroService?: CubeIntroService
}

@inject(mobxHelper.injectFrom('personalCube.personalCubeService', 'personalCube.boardService', 'personalCube.cubeIntroService'))
@observer
@reactAutobind
class PostListPage extends React.Component<Props> {
  //
  componentDidMount(): void {
    const { personalCubeService, boardService, cubeIntroService } = this.props;
    const { cubeId } = this.props.match.params;

    if (personalCubeService && boardService && cubeIntroService && cubeId) {
      personalCubeService.findPersonalCube(cubeId)
        .then(() => {
          boardService.findBoard(personalCubeService.personalCube.contents.contents.id);
          cubeIntroService.findCubeIntro(personalCubeService.personalCube.cubeIntro.id);
        });
    }
  }

  render() {
    //
    const { cubeId } = this.props.match.params;
    const { personalCubeService, boardService, cubeIntroService } = this.props;
    const { personalCube } = personalCubeService as PersonalCubeService;
    const { board } = boardService as BoardService;
    const { cubeIntro } = cubeIntroService as CubeIntroService;

    const startDate = board.learningPeriod && board.learningPeriod.startDate;
    let endDate = board.learningPeriod && board.learningPeriod.endDate;
    if (board.boardConfig && board.boardConfig.unLimited) endDate = '2100-01-01';

    return (
      <ContentLayout
        className="content community"
        breadcrumb={[
          { text: `Community` },
        ]}
      >
        <LectureContentHeader>
          <LectureContentHeader.ThumbnailCell
            image={`${process.env.PUBLIC_URL}/images/all/thumb-card-60-px.jpg`}
          />
          <LectureContentHeader.TitleCell
            label={{
              color: 'blue',
              text: `${personalCube.category && personalCube.category.channel && personalCube.category.channel.name || ''}`,
            }}
            title={board.name || ''}
            type={personalCube.contents && personalCube.contents.type || ''}
            creationTime={board.time}
            learningPeriod={{ startDate, endDate } as DatePeriod}
          />
          <LectureContentHeader.RightCell>
          </LectureContentHeader.RightCell>
        </LectureContentHeader>
        <div>
          <ContentMenu
            menus={[
              { name: 'Community', path: `/community/${cubeId}/posts` },
              { name: 'My posts', path: `/community/${cubeId}/my-posts` },
              { name: 'Overview', path: `/community/${cubeId}/overview` }] as typeof ContentMenu.Menu[]
            }
            activeIndex={0}
          />
          <Segment className="full">
            <LectureSubInfo
              level={cubeIntro.difficultyLevel}
              clazz={{ learningTime: cubeIntro.learningTime, participantCount: 0 }}
              operator={cubeIntro.operation.operator}
              onBookmark={() => {}}
              onShare={() => {}}
            />
            <PostList
              boardId={board && board.id || ''}
              emptyMessage="Community에 등록 된 글이 없습니다."
              type={PostList.ListType.Basic}
              linkedUrl={`/community/${cubeId}/posts`}
              routeToPost={() => this.props.history.push(`/community/${cubeId}/posts/new`)}
            />
          </Segment>
        </div>
      </ContentLayout>
    );
  }
}

export default withRouter(PostListPage);
