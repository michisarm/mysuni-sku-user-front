
import React, { Fragment } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Button, Icon, Radio, Segment } from 'semantic-ui-react';
import moment from 'moment';
import { NoSuchContentPanel } from 'shared';
import { PostModel } from '../../model';
import { CategoryService, PostService } from '../../stores';
import routePaths from '../../routePaths';


interface Props extends RouteComponentProps {
  postService?: PostService
  categoryService?: CategoryService
}

interface State {
  offset: number
  answered: string
}

@inject(mobxHelper.injectFrom(
  'board.categoryService',
  'board.postService',
))
@observer
@reactAutobind
class QnaListContainer extends React.Component<Props, State> {
  //
  state = {
    offset: 0,
    answered: '',
  };


  constructor(props: Props) {
    //
    super(props);
    props.postService!.clearPosts();
  }

  componentDidMount() {
    //
    this.findQnaPosts('all', 10);
  }

  findQnaPosts(answered: any, offset: number) {
    //
    const postService = this.props.postService!;

    if (answered === 'all' || !String(answered).length) {
      postService.findQnaPosts(0, offset)
        .then(() => {
          this.setState({
            answered,
            offset: offset + 10,
          });
        });
    }
    else {
      postService.clearPosts();
      postService.findQnaPostsByAnswered( answered, 0, offset)
        .then(() => {
          this.setState({
            answered,
            offset: offset + 10,
          });
        });
    }
  }

  onClickNewQna() {
    //
    this.props.history.push(routePaths.supportQnANewPost());
  }

  onClickPost(postId: string) {
    //
    this.props.history.push(routePaths.supportQnAPost(postId));
  }

  onClickPostAnswer(postId: string) {
    //
    this.props.history.push(routePaths.supportQnAAnswer(postId));
  }

  renderPostRow(post: PostModel, index: number) {
    //
    let answerElement = null;

    if (post.answered) {
      answerElement = (
        <a target="_blank" className="row reply" onClick={() => this.onClickPostAnswer(post.postId)}>
          <span className="cell title">
            <Icon className="reply16-b" /><span className="blind">reply</span>
            <span className="ellipsis">{post.answer.name}</span>
          </span>
          <span className="cell category" />
          <span className="cell status" />
          <span className="cell date">{post.answeredAt && moment(post.time).format('YYYY.MM.DD')}</span>
        </a>
      );
    }

    return (
      <Fragment key={`post-${index}`}>
        <a target="_blank" className="row" onClick={() => this.onClickPost(post.postId)}>
          <span className="cell title">
            <span className="inner">
              <span className="ellipsis">{post.title}</span>
            </span>
          </span>
          <span className="cell category">{post.category.name}</span>
          <span className="cell status">{post.answered ? '답변완료' : '답변대기'}</span>
          <span className="cell date">{post.time && moment(post.time).format('YYYY.MM.DD')}</span>
        </a>
        {answerElement}
      </Fragment>
    );
  }

  render() {
    //
    const { posts } = this.props.postService!;
    const { offset, answered } = this.state;

    if (!posts.results || posts.results.length < 1) {
      return (
        <Segment className="full">
          <NoSuchContentPanel message="등록된 Q&A가 없습니다." />
        </Segment>
      );
    }

    return (
      <Segment className="full">
        <div className="support-list-wrap">
          <div className="list-top">
            <Button icon className="left post ask" onClick={this.onClickNewQna}>
              <Icon className="ask24" />&nbsp;&nbsp;Ask a Question
            </Button>
            <div className="radio-wrap">
              <Radio
                className="base"
                label="모두 보기"
                name="radioGroup"
                value="all"
                checked={answered === 'all'}
                onChange={(e: any, data: any) => {
                  this.findQnaPosts(data.value, 10 );
                }}
              />
              <Radio
                className="base"
                label="답변 완료"
                name="radioGroup"
                value="true"
                checked={answered === 'true'}
                onChange={(e: any, data: any) => {
                  this.findQnaPosts(data.value, 10 );
                }}
              />
              <Radio
                className="base"
                label="답변 대기"
                name="radioGroup"
                value="false"
                checked={answered === 'false'}
                onChange={(e: any, data: any) => {
                  this.findQnaPosts(data.value, 10 );
                }}
              />
            </div>
          </div>
          <div className="su-list qna">
            { posts.results.map((post, index) =>
              this.renderPostRow(post, index)
            )}
          </div>

          { posts.results.length < posts.totalCount && (
            <div className="more-comments" onClick={() => this.findQnaPosts(answered, offset)}>
              <Button icon className="left moreview">
                <Icon className="moreview" />list more
              </Button>
            </div>
          )}
        </div>
      </Segment>
    );
  }
}

export default withRouter(QnaListContainer);
