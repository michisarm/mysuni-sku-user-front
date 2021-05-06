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
import { reactAlert } from '@nara.platform/accent';
import { useCommunityHome } from '../../store/CommunityHomeStore';
import { CommunityPostDetail } from '../../viewModel/CommunityPostDetail';

const PUBLIC_URL = process.env.PUBLIC_URL;

interface Params {
  communityId: string;
  menuId: string;
}

function CommunityDiscussionContainer() {
  const { pathname } = useLocation();
  const communityHome = useCommunityHome();
  const { menuId } = useParams<Params>();
  const discussionType = pathname.split('/')[3];
  const [postDetail] = useCommunityDiscussionPostDetail(menuId);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [filesMap, setFilesMap] = useState<Map<string, any>>(
    new Map<string, any>()
  );
  const [creatorId, setCreatorId] = useState<string>('');
  const [feedbackId, setFeedbackId] = useState<string>('');

  const history = useHistory();
  const [adminAuth, setAdminAuth] = useState<boolean>(false);
  const [communityAdminAuth, setCommunityAdminAuth] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const denizenId = patronInfo.getDenizenId();
    getFileIds();
    setCreatorId(denizenId!);

    if (postDetail && postDetail?.menuId === '') {
      setFeedbackId(postDetail.commentFeedbackId);
    }

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
    if (originArr && originArr.length > 0) {
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
    } else {
      reactAlert({
        title: '안내',
        message: `다운로드 받으실 첨부파일을 선택해 주세요.`,
      });
    }
  }, []);

  useEffect(() => {
    const denizenId = patronInfo.getDenizenId();

    if (communityHome?.community?.managerId === denizenId) {
      setAdminAuth(communityHome?.community?.managerId === denizenId);
    }

    if (communityHome?.community?.memberType === 'ADMIN') {
      setCommunityAdminAuth(communityHome?.community?.memberType === 'ADMIN');
    }
  }, [communityHome?.community?.managerId, communityHome?.community?.memberType]);

  // console.log('관리자여부', state);
  // console.log('!@@@@', communityAdminAuth, adminAuth);
  return (
    <>
      {postDetail && (
        <>
          <div style={{width: '850px'}}>
            <DiscussionViewContentHeaderView
              postDetail={postDetail}
              title={postDetail.title}
              time={postDetail.createdTime}
              readCount={count}
              deletable={true}
              onClickList={OnClickList}
            />
            {feedbackId && (
              <CommunityCommentList
                feedbackId={feedbackId}
                menuType={discussionType}
                hideCamera
                name=""
                email=""
                companyName=""
                departmentName=""
                adminAuth={adminAuth}
                communityAdminAuth={communityAdminAuth}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default CommunityDiscussionContainer;
