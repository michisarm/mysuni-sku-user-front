import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { CommunityCommentList } from '@nara.drama/feedback';
import { patronInfo } from '@nara.platform/dock';
import { useCommunityDiscussionPostDetail } from 'community/service/useCommunityPostDetail/useCommunityDiscussionPost';
import DiscussionViewContentHeaderView from '../view/CommunityPostDetailView/DiscussionViewContentHeaderView';
import { Checkbox, Icon, Image } from 'semantic-ui-react';

const PUBLIC_URL = process.env.PUBLIC_URL;

interface Params {
  communityId: string;
  menuId: string;
}

function CommunityDiscussionContainer() {
  const { pathname } = useLocation();
  const { menuId } = useParams<Params>();
  const discussionType = pathname.split('/')[3];
  const [postDetail] = useCommunityDiscussionPostDetail(menuId);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [filesMap, setFilesMap] = useState<Map<string, any>>(
    new Map<string, any>()
  );

  const [creatorId, setCreatorId] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    const denizenId = patronInfo.getDenizenId();
    getFileIds();
    setCreatorId(denizenId!);
  }, [postDetail]);

  const OnClickList = useCallback(() => {
    history.goBack();
  }, []);

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

  const fileDownload = (pdf: string, fileId: string) => {
    depot.downloadDepotFile(fileId);
  };

  const originArr: string[] = [];
  let origin: string = '';

  const checkOne = useCallback((e: any, value: any, depotData: any) => {
    if (value.checked && depotData.id) {
      originArr.push(depotData.id);
      origin = depotData.id;
    }
    if (!(value.checked && depotData.id)) {
      originArr.splice(originArr.indexOf(depotData.id), 1);
    }
  }, []);

  const zipFileDownload = useCallback((type: string) => {
    if (type === 'select') {
      if (origin === '') {
        return;
      }
      if (originArr!.length === 1) {
        depot.downloadDepotFile(origin);
        return;
      }
      depot.downloadDepotFiles(originArr);
    } else {
      if (type === 'all') {
        const idArr: string[] = [];
        filesMap.get('reference')?.map((foundedFile: DepotFileViewModel) => {
          idArr.push(foundedFile.id);
        });
        if (idArr.length === 0) {
          return;
        }
        depot.downloadDepotFiles(idArr);
      }
    }
  }, []);
  return (
    <Fragment>
      {postDetail && (
        <>
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
                  __html: postDetail.content,
                }}
                ref={textContainerRef}
              />
            </div>
          </div> */}

          {/* {postDetail && postDetail.relatedUrlList ? (
            <div className="community-board-down discuss2">
              <div className="board-down-title href">
                <p>
                  {' '}
                  <Image
                    src={`${PUBLIC_URL}/images/all/icon-url.png`}
                    alt=""
                    style={{ display: 'inline-block' }}
                  />
                  관련 URL :
                </p>
                {postDetail &&
                  postDetail.relatedUrlList?.map((item: any) => (
                    <span
                      style={{
                        display: 'block',
                        marginLeft: '10px',
                        marginTop: '4px',
                        color: '#0e73db',
                        lineHeight: '1.5rem',
                        fontSize: '14px',
                        textDecoration: 'underline',
                      }}
                    >
                      <a href={item.url} target="blank">
                        {item.title}
                      </a>
                    </span>
                  ))}
              </div>
            </div>
          ) : null}

          {postDetail && postDetail.fileBoxId ? (
            <div className="community-contants">
              <div
                className="community-board-down"
                style={{ marginBottom: '40px' }}
              >
                <div className="board-down-title">
                  <p>
                    <img
                      style={{ verticalAlign: 'middle' }}
                      src={`${PUBLIC_URL}/images/all/icon-down-type-3-24-px.svg`}
                    />
                    첨부파일
                  </p>
                  <div className="board-down-title-right">
                    <button
                      className="ui icon button left post delete"
                      onClick={() => zipFileDownload('select')}
                    >
                      <i aria-hidden="true" className="icon check icon" />
                      선택 다운로드
                    </button>
                    <button
                      className="ui icon button left post list2"
                      onClick={() => zipFileDownload('all')}
                    >
                      <img
                        src={`${PUBLIC_URL}/images/all/icon-down-type-4-24-px.png`}
                      />
                      전체 다운로드
                    </button>
                  </div>
                </div>
                {filesMap.get('reference') &&
                  filesMap
                    .get('reference')
                    .map((foundedFile: DepotFileViewModel) => (
                      <div className="down">
                        <Checkbox
                          className="base"
                          label={foundedFile.name}
                          name={'depot' + foundedFile.id}
                          onChange={(event, value) =>
                            checkOne(event, value, foundedFile)
                          }
                        />
                        <Icon
                          className="icon-down-type4"
                          onClick={() =>
                            fileDownload(foundedFile.name, foundedFile.id)
                          }
                        />
                      </div>
                    ))}
              </div>
            </div>
          ) : null} */}
          <CommunityCommentList
            feedbackId={postDetail.commentFeedbackId}
            menuType={discussionType}
            hideCamera
            name=""
            email=""
            companyName=""
            departmentName=""
          />
        </>
      )}
    </Fragment>
  );
}

export default CommunityDiscussionContainer;
