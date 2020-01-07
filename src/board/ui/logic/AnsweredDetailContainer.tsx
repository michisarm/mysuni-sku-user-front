import React from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { Button, Icon, Segment } from 'semantic-ui-react';
import { ContentLayout } from 'shared';
import ReactQuill from 'react-quill';
import DepotFileViewModel from '@nara.drama/depot/src/depot/ui/model/DepotFileViewModel';
import depot from '@nara.drama/depot';
import moment from 'moment';
import { AnswerService, CategoryService, PostService } from '../../../board';


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
class AnsweredDetailContainer extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    //
    super(props);
    this.state = {
      filesMap: new Map<string, any>(),
    };
  }

  componentDidMount() {
    //
    const { postId } = this.props.match.params;
    const { postService, answerService } = this.props;

    if (postService && answerService) {
      Promise.resolve()
        .then(() => postService.findPostByPostId(postId))
        .then(() => {
          if (!postService.post.answer.id) answerService.clearAnswer();
          else {
            answerService.findAnswerByPostId(postId)
              .then(() => this.getFileIds());
          }
        });
    }
  }

  getFileIds() {
    //
    const { answer } = this.props.answerService || {} as AnswerService;
    const referenceFileBoxId = answer && answer.contents && answer.contents.depotId;

    Promise.resolve()
      .then(() => {
        if (referenceFileBoxId) this.findFiles('reference', referenceFileBoxId);
      });
  }

  findFiles(type: string, fileBoxId: string) {
    const { filesMap } = this.state;
    depot.getDepotFiles(fileBoxId)
      .then(files => {
        filesMap.set(type, files);
        const newMap = new Map(filesMap.set(type, files));
        this.setState({ filesMap: newMap });
      });
  }

  onClose(boardId: string) {
    this.props.history.push(`/board/support/${boardId}`);
  }

  render() {
    //
    const { post } = this.props.postService || {} as PostService;
    const { answer } = this.props.answerService || {} as AnswerService;
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
            {
              post && post.category && answer && (
              <div className="title-area">
                <div className="title-inner">
                  <div className="title">{answer.title}
                  </div>
                  <div className="user-info">
                    <span className="category">{post.category.name}</span>
                    <span className="date">{answer.writtenTime && moment(answer.writtenTime).format('YYYY.MM.DD HH:mm:ss')}</span>
                  </div>
                  <div className="actions">
                    <Button icon className="left postset commu-list16" onClick={() => this.onClose('Q&A')}><Icon className="commu-list16" />List</Button>
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
                    <span>첨부파일 :</span>
                    {
                      filesMap && filesMap.get('reference')
                      && filesMap.get('reference').map((foundedFile: DepotFileViewModel, index: number) => (
                        <a href="#" className="link" key={index}>
                          <span className="ellipsis" onClick={() => depot.downloadDepotFile(foundedFile.id)}>
                            {foundedFile.name}
                          </span>
                        </a>
                      )) || ''
                    }
                  </div>
                </div>
              )
        }
          </div>
          <Segment className="full">
            <div className="actions bottom">
              <Button icon className="left post list2" onClick={() => this.onClose('Q&A')}>
                <Icon className="list24" /> List
              </Button>
            </div>
          </Segment>
        </div>
      </ContentLayout>
    );
  }
}

export default withRouter(AnsweredDetailContainer);
