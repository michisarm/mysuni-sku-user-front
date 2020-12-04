import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useCommunityPostDetail } from 'community/service/useCommunityPostDetail/useCommunityPostDetail';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { CommentList, CommentService, CommunityCommentList } from '@nara.drama/feedback';
import { Button, Icon } from 'semantic-ui-react';
import { deleteCubeLectureTaskPost } from 'lecture/detail/service/useLectureTask/utility/getCubeLectureTaskDetail';
import { deleteCommunityPostDetail } from 'community/service/useCommunityPostCreate/utility/getPostDetailMapFromCommunity';
import { useCommunityPostList } from 'community/service/useCommunityPostCreate/useCommunityPostList';
import { getCommunityPostListItem } from 'community/store/CommunityPostListStore';
import PostDetailViewContentHeaderView from '../view/CommunityPostDetailView/PostDetailViewContentHeaderView';
import { patronInfo } from '@nara.platform/dock';
import CommunityPdfModal from '../view/CommunityPdfModal';
import { saveCommunityPostLike } from '../../service/useCommunityPostDetail/utility/saveCommunityPostLike';
import { getCommunityPostLikeCountByMember } from '../../service/useCommunityPostDetail/utility/getCommunityPostLike';
import CommunityProfileModal from '../view/CommunityProfileModal';
import { reactConfirm } from '@nara.platform/accent';
import { getCommunityHome } from 'community/store/CommunityHomeStore';
import moment from 'moment';

import DefaultImg from '../../../style/media/img-profile-80-px.png';

interface Params {
  communityId: string;
  postId: string;
  menuType?: string;
}

function CommunityPostDetailContainer() {
  const { communityId, postId, menuType } = useParams<Params>();
  const [postDetail] = useCommunityPostDetail(communityId, postId);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [filesMap, setFilesMap] = useState<Map<string, any>>(
    new Map<string, any>()
  );
  const [creatorId, setCreatorId] = useState<string>('');
  const [like, setLike] = useState<boolean>();
  const history = useHistory();
  const PUBLIC_URL = process.env.PUBLIC_URL;

  const [pdfOpen, setPdfOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const [fileId, setFileId] = useState<string>();
  const [fileName, setFileName] = useState<string>();

  const [editAuth, setEditAuth] = useState<boolean>(false);

  const viewModal = (pdf:string, fileId:string) => {
    const PdfFile = pdf.includes('.pdf')
    if (PdfFile) {
      setPdfOpen(!pdfOpen);
      setFileId(fileId);
      setFileName(pdf);
    } else {
      depot.downloadDepotFile(fileId)
    }

  }
  useEffect(() => {
    const denizenId = patronInfo.getDenizenId();
    setCreatorId(denizenId!);
    getFileIds();
    getLikeState();
    if(!postDetail || communityId || !postDetail.creatorId) {
      return
    }
    setEditAuth(denizenId === postDetail.creatorId)
  }, [postDetail, communityId]);

  const getFileIds = useCallback(() => {
    const referenceFileBoxId = postDetail && postDetail.fileBoxId;

    Promise.resolve().then(() => {
      if (referenceFileBoxId) findFiles('reference', referenceFileBoxId);
    });
  }, [postDetail]);

  const findFiles = useCallback((type: string, fileBoxId: string) => {
    depot.getDepotFiles(fileBoxId).then(files => {
      filesMap.set(type, files);
      const newMap = new Map(filesMap.set(type, files));
      setFilesMap(newMap);
    });
  }, []);

  const getLikeState = useCallback(() => {
    const memberId = patronInfo.getDenizenId();
    if(memberId != undefined && memberId != ''){
      getCommunityPostLikeCountByMember(postId, memberId).then((result) => {
        if(result > 0){
          setLike(true);
        }else{
          setLike(false);
        }
      })
    }
  }, []);

  const OnClickList = useCallback(() => {
    history.goBack();
  }, []);

  const OnClickDelete = useCallback(() => {
    reactConfirm({
      title: '알림',
      message: '삭제하시겠습니까?',
      onOk: async () => {
        deletePost(communityId, postId);
        history.goBack();
      },
    });
  }, []);

  const OnClickModify = useCallback(() => {
    history.push({
      pathname: `/community/${communityId}/post/${postId}/edit`,
    });
  }, []);

  const OnClickLike = useCallback(() => {
    const memberId = patronInfo.getDenizenId();
    if(memberId != undefined && memberId != ''){
      saveCommunityPostLike(postId, memberId).then((result) => {

      })
      if(like === true){
        setLike(false);
      }else{
        setLike(true);
      }
    }
  }, [like]);

  async function deletePost(communityId: string, postId: string) {
    await deleteCommunityPostDetail(communityId, postId);
  }

  return (
    <Fragment>
      {postDetail && (
        <>
          <PostDetailViewContentHeaderView
            postDetail={postDetail}
            title={postDetail.title}
            time={postDetail.createdTime}
            readCount={postDetail.readCount}
            replyCount={postDetail.replyCount}
            likeCount={postDetail.likeCount}
            deletable={true}
            editAuth={editAuth}
            onClickList={OnClickList}
            onClickModify={OnClickModify}
            onClickDelete={OnClickDelete}
          />
          <div className="class-guide-txt fn-parents ql-snow">
            <div
              className="text ql-editor"
              dangerouslySetInnerHTML={{
                __html: postDetail.html,
              }}
              ref={textContainerRef}
            />
          </div>
          <div className="ov-paragraph download-area task-read-down">
            <div className="detail">
              {postDetail.fileBoxId &&
                filesMap.get('reference') &&
                filesMap
                  .get('reference')
                  .map((foundedFile: DepotFileViewModel, index: number) => (
                    <>
                      <div className="file-down-wrap">
                        <div className="down">
                          <span>첨부파일 :</span>

                          <a
                            key={index}
                            onClick={() => viewModal(foundedFile.name, foundedFile.id)}
                          >
                            <span>{foundedFile.name}</span>
                          </a>
                        </div>
                      </div>
                    </>
                  ))}
            </div>
          </div>
          {menuType !== 'ANONYMOUS' && (
            <div className="community-board-card" style={{cursor:"pointer"}} onClick={() => setProfileOpen(!profileOpen)}>
              <img src={postDetail.profileImg === null || postDetail.profileImg === undefined || postDetail.profileImg === ''  ? `${DefaultImg}` : `/files/community/${postDetail.profileImg}`} alt="프로필 사진" />
              <div className="board-card-title">
                <h3>{postDetail.nickName}</h3>
                <h4>{postDetail.introduce}</h4>
              </div>
            </div>
          )}
          <div className="task-read-bottom">
            { postDetail.menuId !== 'NOTICE' && (
              <button className="ui icon button left post edit dataroom-icon" onClick={OnClickLike}>
                {like && (
                  <img src={`${PUBLIC_URL}/images/all/btn-community-like-on-16-px.png`} />
                ) || (
                  <img src={`${PUBLIC_URL}/images/all/btn-community-like-off-16-px.png`} />
                )}
                좋아요
              </button>
            )}
            { creatorId === postDetail.creatorId && (
              <>
                <Button
                  className="ui icon button left post edit"
                  onClick={OnClickModify}
                >
                  <Icon className="edit" />
                  Edit
                </Button>
                <Button
                  className="ui icon button left post delete"
                  onClick={OnClickDelete}
                >
                  <Icon className="delete" />
                  delete
                </Button>
              </>
              )
            }
            <Button
              className="ui icon button left post list2"
              onClick={OnClickList}
            >
              <Icon className="list" />
              list
            </Button>
          </div>
          <CommunityCommentList
            feedbackId={postDetail.commentFeedbackId}
            menuType={menuType}
            hideCamera
            name=""
            email=""
            companyName=""
            departmentName=""
          />
          {menuType !== 'all' && (
            <div className="paging" style={{ marginTop: '20px' }}>
              <div className="paging-list">
                {postDetail.prevPost && (
                  <Link to={`/community/${postDetail.prevPost!.communityId}/post/${postDetail.prevPost!.postId}`}>
                    <div className="paging-list-box">
                      <div className="paging-list-icon" />
                      <h2>이전글</h2>
                      <h3>{postDetail.prevPost.title}</h3>
                      <div className="paging-list-span">
                        <span>{moment(postDetail.prevPost.createdTime).format('YYYY.MM.DD HH:MM')}</span>
                      </div>
                    </div>
                  </Link>
                )}
                {postDetail.nextPost && (
                  <Link to={`/community/${postDetail.nextPost!.communityId}/post/${postDetail.nextPost!.postId}`}>
                    <div className="paging-list-box">
                      <div className="paging-list-icon" />
                      <h2>다음글</h2>
                      <h3>{postDetail.nextPost.title}</h3>
                      <div className="paging-list-span">
                        <span>{moment(postDetail.nextPost.createdTime).format('YYYY.MM.DD HH:MM')}</span>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      )}
      <CommunityPdfModal open={pdfOpen} setOpen={setPdfOpen} fileId={fileId||''} fileName={fileName || ''} />
      <CommunityProfileModal
        open={profileOpen}
        setOpen={setProfileOpen}
        userProfile={postDetail && postDetail.profileImg}
        creatorId={postDetail && postDetail.creatorId}
        introduce={postDetail && postDetail.introduce}
        nickName={postDetail && postDetail.nickName}
      />
    </Fragment>
  );
}

export default CommunityPostDetailContainer;
