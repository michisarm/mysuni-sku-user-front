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
import { CommentList } from '@nara.drama/feedback';
import { Button, Icon } from 'semantic-ui-react';
import { deleteCubeLectureTaskPost } from 'lecture/detail/service/useLectureTask/utility/getCubeLectureTaskDetail';
import { deleteCommunityPostDetail } from 'community/service/useCommunityPostCreate/utility/getPostDetailMapFromCommunity';
import { useCommunityPostList } from 'community/service/useCommunityPostCreate/useCommunityPostList';
import { getCommunityPostListItem } from 'community/store/CommunityPostListStore';
import PostDetailViewContentHeaderView from '../view/CommunityPostDetailView/PostDetailViewContentHeaderView';
import { patronInfo } from '@nara.platform/dock';
import CommunityPdfModal from '../view/CommunityPdfModal';
import { saveCommunityPostLike } from 'community/service/useCommunityPostDetail/utility/saveCommunityPostLike';
import { getCommunityPostLikeCountByMember } from 'community/service/useCommunityPostDetail/utility/getCommunityPostLike';
import CommunityProfileModal from '../view/CommunityProfileModal';
import { reactConfirm } from '@nara.platform/accent';
import { getCommunityHome } from 'community/store/CommunityHomeStore';
import moment from 'moment';

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
  }, [postDetail]);

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
        <div>
          <PostDetailViewContentHeaderView
            postDetail={postDetail}
            title={postDetail.title}
            time={postDetail.createdTime}
            readCount={postDetail.readCount}
            replyCount={postDetail.replyCount}
            likeCount={postDetail.likeCount}
            deletable={true}
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
          <div className="community-board-card" style={{cursor:"pointer"}} onClick={() => setProfileOpen(!profileOpen)}>
            <img src={`/files/community/${postDetail.profileImg}`} alt="프로필 사진"/>
            {/* <img src="data:image/png;base64,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" /> */}
            <div className="board-card-title">
              <h3>{postDetail.nickName}</h3>
              <h4>{postDetail.introduce}</h4>
            </div>
          </div>
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
              <Button
                className="ui icon button left post edit"
                onClick={OnClickModify}
              >
                <Icon className="edit" />
                Edit
              </Button>
              )
            }
            <Button
              className="ui icon button left post delete"
              onClick={OnClickDelete}
            >
              <Icon className="delete" />
              delete
            </Button>
            <Button
              className="ui icon button left post list2"
              onClick={OnClickList}
            >
              <Icon className="list" />
              list
            </Button>
          </div>
          <CommentList
            feedbackId={postDetail.commentFeedbackId}
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
        </div>
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
