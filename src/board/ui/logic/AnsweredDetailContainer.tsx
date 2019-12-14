import React from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router';
import ReactQuill from 'react-quill';
import { AnswerService, CategoryService, PostService } from '../../index';

interface Props extends RouteComponentProps<{ postId: string }> {
  postService?: PostService
  categoryService?: CategoryService
  answerService?: AnswerService
}

@inject('postService', 'categoryService', 'answerService')
@observer
@reactAutobind
class AnsweredDetailContainer extends React.Component<Props> {
  //
  componentDidMount() {
    //
    const { postId } = this.props.match.params;
    const { postService, answerService } = this.props;

    if (postService && answerService) {
      Promise.resolve()
        .then(() => postService.findPostByPostId(postId))
        .then(() => {
          if (!postService.post.answer.id) answerService.clearAnswer();
          else answerService.findAnswerByPostId(postId);
        });
    }
  }

  onClose(boardId: string) {
    this.props.history.push(`/board/support/${boardId}`);
  }

  render() {
    //
    const { post } = this.props.postService || {} as PostService;
    const { answer } = this.props.answerService || {} as AnswerService;

    return (
      <section className="content support">
        <div className="post-view-wrap">
          <div className="post-view qna">
            {
              post && post.category && answer && (
              <div className="title-area">
                <div className="title-inner">
                  <div className="title">{answer.title}
                  </div>
                  <div className="user-info">
                    <span className="category">{post.category.name}</span>
                    <span className="date">{answer.writtenTime && new Date(answer.writtenTime).toLocaleDateString()}</span>
                  </div>
                  <div className="actions">
                    <Button icon className="left postset commu-list16" onClick={() => this.onClose('qa')}><Icon className="commu-list16" />List</Button>
                  </div>
                </div>
              </div>
              )
          }
            {
              answer && answer.contents && (
                <div className="content-area">
                  <div className="content-inner">
                    <ReactQuill
                      theme="bubble"
                      value={answer && answer.contents && answer.contents.contents || ''}
                      readOnly
                    />
                  </div>
                  <div className="file">
                    <span>첨부파일 :</span> <a href="#" className="link"><span className="ellipsis">다운로드 Width값 700px 이후로는 말줌임 표시 부탁드립니다. Mobile_App_UI_UX_GUI_Design_Tutorials.pptx</span></a>
                  </div>
                </div>
              )
        }
          </div>
          <Segment className="full">
            <div className="actions bottom">
              <Button icon className="left post list2" onClick={() => this.onClose('qa')}>
                <Icon className="list24" /> List
              </Button>
            </div>
          </Segment>
        </div>
      </section>
    );
  }
}

export default withRouter(AnsweredDetailContainer);
