import depot, { DepotFileViewModel } from '@nara.drama/depot';
import {
  mobxHelper,
  reactAlert,
  reactAutobind,
  reactConfirm,
} from '@nara.platform/accent';
import { Comment } from '@sku/skuniv-ui-comment';
import {
  NotieSimpleCdo,
  NotieSpaceType,
} from '@sku/skuniv-ui-comment/lib/api.models';
import { findCommunityProfile } from 'community/api/profileApi';
import CommunityProfileModal from 'community/ui/view/CommunityProfileModal';
import { inject, observer } from 'mobx-react';
import { SkProfileService } from 'profile/stores';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { getDenizenIdFromAudienceId } from 'shared/helper/keyStringHelper';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
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
  }

  clickProfileEventHandler(denizenId: string) {
    findCommunityProfile(denizenId!).then((result) => {
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

  onNoContentAlert() {
    reactAlert({
      title: getPolyglotText('??????', 'feedback-comment-notice-title'),
      message: getPolyglotText(
        '?????? ????????? ???????????????.',
        'feedback-comment-notice-nonetext-message'
      ),
    });
  }

  onRemoveCommentConfirm() {
    return new Promise<boolean>((resolve) => {
      reactConfirm({
        title: getPolyglotText('??????', 'feedback-comment-delete-title'),
        message: getPolyglotText(
          '????????? ?????? ???????????????????',
          'feedback-comment-delete-message'
        ),
        onOk: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  }

  // ??????, ?????????, ????????? ?????? ??????
  getNotieCdo(): NotieSimpleCdo | undefined {
    //
    const { postService } = this.props;
    const { post } = postService!;

    // audienceId --> denizenId
    const receiverId = getDenizenIdFromAudienceId(post.patronKey?.keyString);
    if (!receiverId) {
      return;
    }

    const result = {
      backLink: window.location.pathname.replace('/suni-main', ''),
      title: NotieSpaceType.NOTICE,
      receiverId,
    };

    return result;
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
              {filesMap && filesMap.get('reference') && (
                <div className="file">
                  <span>
                    <PolyglotText
                      id="support-noti-????????????"
                      defaultString="????????????"
                    />
                    :
                  </span>
                  <br />
                  {filesMap
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
                    )) || null}
                </div>
              )}
            </div>
          )}
        </div>

        <Segment className="full">
          <div className="comment-area">
            <div className="contents comment">
              <Comment
                feedbackId={(post && post.commentFeedbackId) || ''}
                name={JSON.stringify(skProfile.name)}
                email={skProfile.email}
                companyName={parsePolyglotString(skProfile.companyName)}
                departmentName={parsePolyglotString(skProfile.departmentName)}
                hasPinRole={false}
                onOpenProfileModal={this.clickProfileEventHandler}
                onRemoveCommentConfirm={this.onRemoveCommentConfirm}
                onNoContentAlert={this.onNoContentAlert}
                notieSimpleCdo={this.getNotieCdo()}
              />
            </div>
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
