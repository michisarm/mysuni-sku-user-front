
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { Button, Icon, Segment } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { ContentLayout } from 'shared';
import routePaths from '../../routePaths';
import { AnswerService, CategoryService, PostService } from '../../stores';
import BoardDetailContentHeaderView from '../view/BoardDetailContentHeaderView';


interface Props extends RouteComponentProps<{ postId: string }> {
  postService?: PostService
  categoryService?: CategoryService
  answerService?: AnswerService
}

interface States {
  filesMap: Map<string, any>
}

@inject(mobxHelper.injectFrom(
  'board.postService',
  'board.postService',
  'board.answerService',
))
@observer
@reactAutobind
class AnswerDetailContainer extends Component<Props, States> {
  //
  state = {
    filesMap: new Map<string, any>(),
  };

  componentDidMount() {
    //
    const { postId } = this.props.match.params;
    const { postService, answerService } = this.props;

    postService!.findPostByPostId(postId).then(() => {
      if (!postService!.post.answer.id) {
        answerService!.clearAnswer();
      }
      else {
        answerService!.findAnswerByPostId(postId)
          .then(() => this.getFileIds());
      }
    });
  }

  getFileIds() {
    //
    const { answer } = this.props.answerService!;
    const referenceFileBoxId = answer && answer.contents && answer.contents.depotId;

    if (referenceFileBoxId) {
      this.findFiles('reference', referenceFileBoxId);
    }
  }

  findFiles(type: string, fileBoxId: string) {
    //
    const { filesMap } = this.state;

    depot.getDepotFiles(fileBoxId)
      .then(files => {
        filesMap.set(type, files);
        const newMap = new Map(filesMap.set(type, files));
        this.setState({ filesMap: newMap });
      });
  }

  onClickList() {
    this.props.history.push(routePaths.supportQnA());
  }

  render() {
    //
    const { post } = this.props.postService!;
    const { answer } = this.props.answerService!;
    const { filesMap } = this.state;

    return (
      <ContentLayout
        className="support"
        breadcrumb={[
          { text: 'Support' },
          { text: 'Q&A' },
          { text: 'Answered' },
        ]}
      >
        <div className="post-view-wrap">
          <div className="post-view qna">
            <BoardDetailContentHeaderView
              title={answer.title}
              time={answer.writtenTime}
              subField={<span className="category">{post.category.name}</span>}
              onClickList={this.onClickList}
            />

            { answer.contents && (
              <div className="content-area">
                <div className="content-inner">
                  <ReactQuill
                    theme="bubble"
                    value={answer.contents.contents || ''}
                    readOnly
                  />
                </div>
                <div className="file">
                  <span>첨부파일 :</span><br/>
                  {
                    filesMap && filesMap.get('reference')
                    && filesMap.get('reference').map((foundedFile: DepotFileViewModel, index: number) => (
                      <a href="#" className="link" key={index}>
                        <span className="ellipsis" onClick={() => depot.downloadDepotFile(foundedFile.id)}>
                          {foundedFile.name}
                        </span>
                      </a>+'<br/>'
                    )) || ''
                  }
                </div>
              </div>
            )}
          </div>

          <Segment className="full">
            <div className="actions bottom">
              <Button icon className="left post list2" onClick={this.onClickList}>
                <Icon className="list24" /> List
              </Button>
            </div>
          </Segment>
        </div>
      </ContentLayout>
    );
  }
}

export default withRouter(AnswerDetailContainer);
