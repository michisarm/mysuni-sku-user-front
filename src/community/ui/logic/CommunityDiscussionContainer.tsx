import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { CommunityCommentList } from '@nara.drama/feedback';
import { patronInfo } from '@nara.platform/dock';
import { useCommunityDiscussionPostDetail } from 'community/service/useCommunityPostDetail/useCommunityDiscussionPost';
import PostDetailViewContentHeaderView from '../view/CommunityPostDetailView/PostDetailViewContentHeaderView';
import DiscussionViewContentHeaderView from '../view/CommunityPostDetailView/DiscussionViewContentHeaderView';


interface Params {
  communityId: string;
  menuId: string;
}

function CommunityDiscussionContainer() {
  
  const { communityId, menuId} = useParams<Params>();
  const [postDetail] = useCommunityDiscussionPostDetail(menuId);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [filesMap, setFilesMap] = useState<Map<string, any>>(
    new Map<string, any>()
  );
  const [creatorId, setCreatorId] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    const denizenId = patronInfo.getDenizenId();
    setCreatorId(denizenId!);
  }, [postDetail]);

  const OnClickList = useCallback(() => {
    history.goBack();
  }, []);

  return (
    <Fragment>
      {postDetail && (
        <div className="ui segment full">
          <DiscussionViewContentHeaderView
            postDetail={postDetail}
            title={postDetail.title}
            time={postDetail.createdTime}
            readCount={postDetail.readCount}
            deletable={true}
            onClickList={OnClickList}
          />         
          {/* <div className="class-guide-txt fn-parents ql-snow">
            <div className="text ql-editor">
              <div
                className="text description ql-editor"
                dangerouslySetInnerHTML={{
                  __html: postDetail.title,
                }}
                ref={textContainerRef}
              />
            </div>
          </div> */}
          {/* <div className="ov-paragraph download-area task-read-down">
            <div className="detail">
              {postDetail.fileBoxId &&
                filesMap.get('reference') &&
                filesMap
                  .get('reference')
                  .map((foundedFile: DepotFileViewModel, index: number) => (
                    <div className="file-down-wrap">
                      <div className="down">
                        <span>첨부파일 :</span>
                        <a
                          key={index}
                          onClick={() =>
                            depot.downloadDepotFile(foundedFile.id)
                          }
                        >
                          <span>{foundedFile.name}</span>
                        </a>
                      </div>
                    </div>
                  ))}
            </div>
          </div> */}
          <CommunityCommentList
            feedbackId={postDetail.commentFeedbackId}
            hideCamera
            name=""
            email=""
            companyName=""
            departmentName=""
          />
        </div>
      )}
    </Fragment>
  );
}

export default CommunityDiscussionContainer;
