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
import CommunityHtmlPage from './CommunityHtmlPage';
import CreatePostPage from './CreatePostPage';
import DataPostEditPage from './DataPostEditPage';
import DataPostPage from './DataPostPage';
import DiscussionPostPage from './DiscussionPostPage';
import MemberRoutes from './MemberRoutes';
import NoticePostsPage from './NoticePostsPage';
import PostsPage from './PostsPage';
import SurveyPostPage from './SurveyPostPage';

interface Params {
  communityId: string;
}

function CommunityRoutes() {
  const { communityId } = useParams<Params>();
  useEffect(() => {
    requestCommunity(communityId);
    requestCommunityMenus(communityId);
  }, [communityId]);
  return (
    <section className="content community">
      <Segment className="full">
        <div className="course-detail-center community-containter">
          <CommunityHomeTreeContainer />
          <div className="community-home-contants">
            <Switch>
              <Route
                exact
                path="/community/:communityId"
                component={CommunityHomePage}
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
                path="/community/:communityId/post/:postId"
                component={BasicPostPage}
              />
              <Route
                exact
                path="/community/:communityId/data/:postId"
                component={DataPostPage}
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
