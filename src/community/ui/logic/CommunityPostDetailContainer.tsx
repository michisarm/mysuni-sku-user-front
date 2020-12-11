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
import { Button, Checkbox, Icon } from 'semantic-ui-react';
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

const PUBLIC_URL = process.env.PUBLIC_URL;

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
  const [likeCount, setLikeCount] = useState<number>(0);
  const history = useHistory();
  const PUBLIC_URL = process.env.PUBLIC_URL;

  const [pdfOpen, setPdfOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const [fileId, setFileId] = useState<string>();
  const [fileName, setFileName] = useState<string>();

  const [editAuth, setEditAuth] = useState<boolean>(false);

  const originArr: string[] = []

  const fileDownload = (pdf:string, fileId:string) => {
    const PdfFile = pdf.includes('.pdf')
    if (PdfFile) {
      setPdfOpen(!pdfOpen);
      setFileId(fileId);
      setFileName(pdf);
    } else {
      depot.downloadDepotFile(fileId)
    }
  }

  const zipFileDownload = useCallback((type: string) => {
    if (type === 'select') {
      if(originArr.length === 0) {
        return
      }
      depot.downloadDepotFiles(originArr)
    } else {
      const idArr: string[] = []
      filesMap.get('reference')
      .map((foundedFile: DepotFileViewModel)=> {
        idArr.push(foundedFile.id)
      })
      depot.downloadDepotFiles(idArr)
    }
  }, [])

  useEffect(() => {
    const denizenId = patronInfo.getDenizenId();
    setCreatorId(denizenId!);
    getFileIds();
    getLikeCount();
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

  const getLikeCount = useCallback(() => {
    const likeCount = postDetail && postDetail.likeCount;

    Promise.resolve().then(() => {
      setLikeCount(likeCount || 0);
    });
  }, [postDetail]);

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
        setLikeCount(likeCount-1);
      }else{
        setLike(true);
        setLikeCount(likeCount+1);
      }
    }
  }, [like]);

  const checkOne = useCallback((e:any, value: any, depotData: any) => {
    if(value.checked && depotData.id) {
      originArr.push(depotData.id)
    }
  }, []);

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
            likeCount={likeCount}
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
            <div className="community-contants">
              <div className="community-board-down">
                <div className="board-down-title">
                  <p>
                    <img src={`${PUBLIC_URL}/images/all/icon-down-type-3-24-px.svg`} />
                    첨부파일
                  </p>
                  <div className="board-down-title-right">
                    <button className="ui icon button left post delete" onClick={() => zipFileDownload('select')}>
                      <i aria-hidden="true" className="icon check icon"/>선택 다운로드
                    </button>
                    <button className="ui icon button left post list2" onClick={() => zipFileDownload('all')}>
                      <img src={`${PUBLIC_URL}/images/all/icon-down-type-4-24-px.png`} />
                      전체 다운로드
                    </button>
                  </div>
                </div>
            {postDetail.fileBoxId &&
              filesMap.get('reference') &&
              filesMap
                .get('reference')
                .map((foundedFile: DepotFileViewModel) => (
                <div className="down">
                  <Checkbox
                    className="base"
                    label={foundedFile.name}
                    name={'depot'+foundedFile.id}
                    onChange={(event, value) => checkOne(event, value, foundedFile)}
                  />
                  <Icon
                    className="icon-down-type4"
                    onClick={() => fileDownload(foundedFile.name, foundedFile.id)}
                  />
                </div>
                ))}

              </div>
            </div>
            {menuType !== 'ANONYMOUS' && (
            <div className="community-board-card" style={{cursor:"pointer"}} onClick={() => setProfileOpen(!profileOpen)}>
              <img src={postDetail.profileImg === null || postDetail.profileImg === undefined || postDetail.profileImg === '' ?
                `data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCI+DQogICAgPGRlZnM+DQogICAgICAgIDxjaXJjbGUgaWQ9ImEiIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIvPg0KICAgIDwvZGVmcz4NCiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+DQogICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNhIi8+DQogICAgICAgIDwvbWFzaz4NCiAgICAgICAgPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMzkuNSIgc3Ryb2tlPSIjREREIi8+DQogICAgICAgIDxwYXRoIGZpbGw9IiNEREQiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTU5LjExIDY3Ljc4Yy04LjM5LTMuMDU3LTExLjA3NC01LjYzNy0xMS4wNzQtMTEuMTYyIDAtMy4zMTYgMi43NS01LjQ2NSAzLjY4Ny04LjMwNi45MzgtMi44NDIgMS40OC02LjIwNyAxLjkzLTguNjU0LjQ1MS0yLjQ0OC42My0zLjM5NC44NzUtNi4wMDJDNTQuODI4IDMwLjQwMiA1Mi42NSAyMiA0MSAyMmMtMTEuNjQ2IDAtMTMuODMyIDguNDAyLTEzLjUyNSAxMS42NTYuMjQ1IDIuNjA4LjQyNSAzLjU1NS44NzUgNi4wMDIuNDUgMi40NDcuOTg2IDUuODEyIDEuOTIzIDguNjU0LjkzNyAyLjg0MSAzLjY5IDQuOTkgMy42OSA4LjMwNiAwIDUuNTI1LTIuNjgyIDguMTA1LTExLjA3NCAxMS4xNjJDMTQuNDY3IDcwLjg0NCA5IDczLjg2NiA5IDc2djEwaDY0Vjc2YzAtMi4xMzEtNS40Ny01LjE1Mi0xMy44OS04LjIyeiIgbWFzaz0idXJsKCNiKSIvPg0KICAgIDwvZz4NCjwvc3ZnPg0K`
                  : `/files/community/${postDetail.profileImg}`} 
                alt="프로필 사진" 
              />
              <div className="board-card-title">
                <h3>{postDetail.nickName || postDetail.creatorName}</h3>
                <h4>{postDetail.introduce}</h4>
              </div>
            </div>
          )}
          <div className="task-read-bottom">
            { postDetail.menuId !== 'NOTICE' && (
              <button className="ui icon button left post edit" onClick={OnClickLike}>
                {like && (
                  <img src={`${PUBLIC_URL}/images/all/btn-community-like-on-16-px.png`} style={{marginBottom:"-3px", marginRight:"3px"}}/>
                ) || (
                  <img src={`${PUBLIC_URL}/images/all/btn-community-like-off-16-px.png`} style={{marginBottom:"-3px", marginRight:"3px"}}/>
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
        memberId={postDetail && postDetail.creatorId}
        introduce={postDetail && postDetail.introduce}
        nickName={postDetail && postDetail.nickName}
        name={postDetail && postDetail.creatorName}
      />
    </Fragment>
  );
}

export default CommunityPostDetailContainer;
