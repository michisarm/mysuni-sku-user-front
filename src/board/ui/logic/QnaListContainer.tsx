import React, { Fragment } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Button, Icon, Radio, Segment, Table } from 'semantic-ui-react';
import moment from 'moment';
import { NoSuchContentPanel, Loadingpanel } from 'shared';
import { PostModel } from '../../model';
import { CategoryService, PostService } from '../../stores';
import routePaths from '../../routePaths';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import QnaListView from '../view/QnaListView';

interface Props extends RouteComponentProps {
  postService?: PostService;
  categoryService?: CategoryService;
}

interface State {
  offset: number;
  answered: string;
  isLoading: boolean;
}

@inject(mobxHelper.injectFrom('board.categoryService', 'board.postService'))
@observer
@reactAutobind
class QnaListContainer extends React.Component<Props, State> {
  //
  state = {
    offset: 0,
    answered: '',
    isLoading: false,
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
    this.setState({ isLoading: true });
    const postService = this.props.postService!;

    if (answered === 'all' || !String(answered).length) {
      postService.findQnaPosts(0, offset).then(() => {
        this.setState({
          answered,
          offset: offset + 10,
        });
      });
    } else {
      postService.clearPosts();
      postService.findQnaPostsByAnswered(answered, 0, offset).then(() => {
        this.setState({
          answered,
          offset: offset + 10,
        });
      });
    }
    this.setState({ isLoading: false });
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

  render() {
    //
    const { posts } = this.props.postService!;
    const { offset, answered, isLoading } = this.state;
    const result = posts.results;
    const totalCount = posts.totalCount;

    return (
      <div className="full">
        <div className="support-list-wrap">
          <div className="list-top">
            <Button icon className="left post ask" onClick={this.onClickNewQna}>
              <Icon className="ask24" />
              &nbsp;&nbsp;{' '}
              <PolyglotText
                id="support-qna-질문"
                defaultString="Ask a Question"
              />
            </Button>
            <div className="radio-wrap">
              <Radio
                className="base"
                label={getPolyglotText('모두 보기', 'support-qna-rall')}
                name="radioGroup"
                value="all"
                checked={answered === 'all'}
                onChange={(e: any, data: any) => {
                  this.findQnaPosts(data.value, 10);
                }}
              />
              <Radio
                className="base"
                label={getPolyglotText('답변 완료', 'support-qna-rdn')}
                name="radioGroup"
                value="true"
                checked={answered === 'true'}
                onChange={(e: any, data: any) => {
                  this.findQnaPosts(data.value, 10);
                }}
              />
              <Radio
                className="base"
                label={getPolyglotText('답변 대기', 'support-qna-rwt')}
                name="radioGroup"
                value="false"
                checked={answered === 'false'}
                onChange={(e: any, data: any) => {
                  this.findQnaPosts(data.value, 10);
                }}
              />
            </div>
          </div>
          {isLoading ? (
            <Segment
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                height: 400,
                boxShadow: '0 0 0 0',
                border: 0,
              }}
            >
              <Loadingpanel loading={isLoading} />
            </Segment>
          ) : result.length === 0 ? (
            <NoSuchContentPanel
              message={getPolyglotText(
                '등록된 Q&A가 없습니다.',
                'support-qna-목록없음'
              )}
            />
          ) : (
            <>
              <div className="qna-admin-list-wrap">
                <QnaListView
                  posts={posts.results}
                />
              </div>

              {posts.results.length < posts.totalCount && (
                <div
                  className="more-comments"
                  onClick={() => this.findQnaPosts(answered, offset)}
                >
                  <Button icon className="left moreview">
                    <Icon className="moreview" />
                    <PolyglotText
                      id="support-qna-더보기"
                      defaultString="list more"
                    />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(QnaListContainer);
