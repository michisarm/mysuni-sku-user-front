import React, { useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import {
  requestCommunity,
  requestCommunityMenus,
} from '../../service/useCommunityHome/requestCommunity';
import CommunityHomeTreeContainer from '../logic/CommunityHomeTreeContainer';
import AllPostsPage from './AllPostsPage';
import BasicPostEditPage from './BasicPostEditPage';
import BasicPostPage from './BasicPostPage';
import CommunityHomePage from './CommunityHomePage';
import CommunityDetailPage from './CommunityDetailPage';
import CommunityPreviewPage from './CommunityPreviewPage';
import CommunityHtmlPage from './CommunityHtmlPage';
import CreatePostPage from './CreatePostPage';
import DataPostEditPage from './DataPostEditPage';
import DataPostPage from './DataPostPage';
import DiscussionPostPage from './DiscussionPostPage';
import MemberRoutes from './MemberRoutes';
import NoticePostsPage from './NoticePostsPage';
import PostsPage from './PostsPage';
import SurveyPostPage from './SurveyPostPage';
import { Area } from 'tracker/model';
import { setCommunityHome } from '../../store/CommunityHomeStore';

interface Params {
  communityId: string;
}

function CommunityRoutes() {
  const { communityId } = useParams<Params>();
  useEffect(() => {
    requestCommunity(communityId);
    requestCommunityMenus(communityId);

    return setCommunityHome;
  }, [communityId]);
  return (
    <section className="content community">
      <Segment className="full">
        <div className="course-detail-center community-containter">
          <CommunityHomeTreeContainer />
          <div
            className="community-home-contants"
            data-area={Area.COMMUNITY_CONTENT}
          >
            <Switch>
              <Route
                exact
                path="/community/:communityId"
                component={CommunityHomePage}
              />
              <Route
                exact
                path="/community/:communityId/detail"
                component={CommunityDetailPage}
              />
              <Route
                exact
                path="/community/:communityId/all"
                component={AllPostsPage}
              />
              <Route
                exact
                path="/community/:communityId/notice"
                component={NoticePostsPage}
              />
              <Route
                exact
                path="/community/:communityId/board/:menuId"
                component={PostsPage}
              />
              <Route
                exact
                path="/community/:communityId/board/:menuId/create"
                component={CreatePostPage}
              />
              <Route
                exact
                path="/community/:communityId/board/:menuId/:menuType/create"
                component={CreatePostPage}
              />
              <Route
                exact
                path="/community/:communityId/board/noticeCreate/create"
                component={CreatePostPage}
              />
              <Route
                exact
                path="/community/:communityId/post/:postId"
                component={BasicPostPage}
              />
              <Route
                exact
                path="/community/:communityId/:menuType/post/:postId"
                component={BasicPostPage}
              />
              <Route
                exact
                path="/community/:communityId/data/:menuId"
                component={PostsPage}
              />
              <Route
                exact
                path="/community/:communityId/post/:postId/edit"
                component={BasicPostEditPage}
              />
              <Route
                exact
                path="/community/:communityId/data/:postId/edit"
                component={DataPostEditPage}
              />
              <Route
                exact
                path="/community/:communityId/discussion/:menuId"
                component={DiscussionPostPage}
              />
              <Route
                exact
                path="/community/:communityId/anodiscussion/:menuId"
                component={DiscussionPostPage}
              />
              <Route
                exact
                path="/community/:communityId/poll/:menuId"
                component={SurveyPostPage}
              />
              <Route
                exact
                path="/community/:communityId/content/:menuId"
                component={CommunityHtmlPage}
              />
              <Route
                path="/community/:communityId/member"
                component={MemberRoutes}
              />{' '}
            </Switch>
          </div>
        </div>
      </Segment>
    </section>
  );
}

export default CommunityRoutes;

export const COMMUNITY_MAIN_PATH = '/community/:communityId';
export const COMMUNITY_INTRO_PATH = '/community/:communityId/intro';
export const COMMUNITY_ALL_PATH = '/community/:communityId/all/:pageNo';
export const COMMUNITY_NOTICE_PATH = '/community/:communityId/notice/:pageNo';
export const COMMUNITY_NOTICE_RECOMMEND_CARD_PATH =
  '/community/:communityId/notice/card/recommend';
export const COMMUNITY_MEMBER_PATH = '/community/:communityId/member';
export const COMMUNITY_BOARD_PATH =
  '/community/:communityId/board/:boardId/:pageNo';
export const COMMUNITY_NOTICE_CREATE_PATH =
  '/community/:communityId/notice/create';
export const COMMUNITY_POST_PATH = '/community/:communityId/post/:postId';
export const COMMUNITY_EDIT_POST_PATH =
  '/community/:communityId/post/:postId/edit';
export const COMMUNITY_MAIN_PARAM_COMMUNITYID = ':communityId';
export const COMMUNITY_HOME_PATH = '/community/:communityId/home';
