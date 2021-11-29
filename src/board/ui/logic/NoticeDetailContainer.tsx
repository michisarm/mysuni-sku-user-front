import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { CommentList } from '@nara.drama/feedback';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { findCommunityProfile } from 'community/api/profileApi';
import CommunityProfileModal from 'community/ui/view/CommunityProfileModal';
import { inject, observer } from 'mobx-react';
import { SkProfileService } from 'profile/stores';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';
import routePaths from '../../routePaths';
import { PostService } from '../../stores';
import BoardDetailContentHeaderView from '../view/BoardDetailContentHeaderView';

interface Props extends RouteComponentProps<{ postId: string }> {
  postService?: PostService;
  skProfileService?: SkProfileService;
}

interface State {
  filesMap: Map<string, any>;
  profileOpen: boolean;
  profileInfo: {
    id: string;
    profileImg: string;
    introduce: string;
    nickName: string;
    creatorName: string;
  };
}

@inject(mobxHelper.injectFrom('board.postService', 'profile.skProfileService'))
@observer
@reactAutobind
class NoticeDetailContainer extends React.Component<Props, State> {
  //
  state = {
    filesMap: new Map<string, any>(),
    profileOpen: false,
    profileInfo: {
      id: '',
      profileImg: '',
      introduce: '',
      nickName: '',
      creatorName: '',
    },
  };

  constructor(props: Props) {
    //
    super(props);
    props.postService!.clearPost();
  }

  componentDidMount() {
    //
    const { postId } = this.props.match.params;
    const { postService, skProfileService } = this.props;
    skProfileService!.findSkProfile();
    postService!.findPostByPostId(postId).then(() => this.getFileIds());

    this.setState({ profileOpen: false });
    window.addEventListener('clickProfile', this.clickProfileEventHandler);
    return () => {
      window.removeEventListener('clickProfile', this.clickProfileEventHandler);
    };
  }

  clickProfileEventHandler() {
    const id = document.body.getAttribute('selectedProfileId');
    findCommunityProfile(id!).then((result) => {
      this.setState({
        profileInfo: {
          id: result!.id,
          profileImg: result!.profileImg,
          introduce: result!.introduce,
          nickName: result!.nickname,
          creatorName: result!.name,
        },
      });
      this.setState({ profileOpen: true });
    });
  }

  selectProfileOpen(open: boolean) {
    this.setState({ profileOpen: open });
  }

  onClickList() {
    this.props.history.push(routePaths.supportNotice());
  }

  getFileIds() {
    //
    const { post } = this.props.postService!;
    const referenceFileBoxId = post && post.contents && post.contents.depotId;

    if (referenceFileBoxId) {
      this.findFiles('reference', referenceFileBoxId);
    }
  }

  async findFiles(type: string, fileBoxId: string) {
    //
    const { filesMap } = this.state;

    const files = await depot.getDepotFiles(fileBoxId);

    filesMap.set(type, files);
    const newMap = new Map(filesMap.set(type, files));
    this.setState({ filesMap: newMap });
  }

  getFeedbackId(feedbackId: string) {
    //
    const postService = this.props.postService!;
    const { post } = postService!;

    postService.changePostProps('commentFeedbackId', feedbackId);
    postService
      .deletePost(post.id, post)
      .then(() => postService!.findPostByPostId(post.id));
  }

  render() {
    //
    const { postService, skProfileService } = this.props;
    const { post } = postService!;
    const { filesMap } = this.state;
    const { skProfile } = skProfileService!;
    // const { member } = skProfileService!.skProfile;
    return (
      <>
        <div className="post-view">
          <BoardDetailContentHeaderView
            title={post.title ? parsePolyglotString(post.title) : ''}
            time={post.registeredTime}
            onClickList={this.onClickList}
          />
          {post.contents && (
            <div className="content-area">
              <div className="content-inner ql-snow">
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{
                    __html:
                      (post.contents.contents &&
                        parsePolyglotString(post.contents.contents)) ||
                      '',
                  }}
                />
              </div>
              <div className="file">
                {filesMap && filesMap.get('reference') && (
                  <span>
                    <PolyglotText
                      id="support-noti-첨부파일"
                      defaultString="첨부파일"
                    />
                    :
                  </span>
                )}
                <br />
                {(filesMap &&
                  filesMap.get('reference') &&
                  filesMap
                    .get('reference')
                    .map((foundedFile: DepotFileViewModel, index: number) => (
                      <>
                        <div>
                          <a href="#" className="link" key={index}>
                            <span
                              className="ellipsis"
                              onClick={(e) => {
                                depot.downloadDepotFile(foundedFile.id);
                                e.preventDefault();
                              }}
                            >
                              {foundedFile.name}
                            </span>
                          </a>
                        </div>
                        <br />
                      </>
                    ))) ||
                  null}
              </div>
            </div>
          )}
        </div>

        <Segment className="full">
          <div className="comment-area">
            <CommentList
              feedbackId={(post && post.commentFeedbackId) || ''}
              getFeedbackId={this.getFeedbackId}
              hideCamera
              name={parsePolyglotString(skProfile.name)}
              email={skProfile.email}
              companyName={parsePolyglotString(skProfile.companyName)}
              departmentName={parsePolyglotString(skProfile.departmentName)}
            />
          </div>
          <div className="actions bottom">
            <Button icon className="left post list2" onClick={this.onClickList}>
              <Icon className="list24" />
              <PolyglotText id="support-noti-List2" defaultString="List" />
            </Button>
          </div>
        </Segment>
        <CommunityProfileModal
          open={this.state.profileOpen}
          setOpen={this.selectProfileOpen}
          userProfile={
            this.state.profileInfo && this.state.profileInfo.profileImg
          }
          memberId={this.state.profileInfo && this.state.profileInfo.id}
          introduce={this.state.profileInfo && this.state.profileInfo.introduce}
          nickName={this.state.profileInfo && this.state.profileInfo.nickName}
          name={this.state.profileInfo && this.state.profileInfo.creatorName}
        />
      </>
    );
  }
}

export default withRouter(NoticeDetailContainer);
