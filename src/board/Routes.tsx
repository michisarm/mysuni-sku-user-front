
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import BoardListPage from './ui/page/BoardListPage';
import NoticeDetailPage from './ui/page/NoticeDetailPage';
import FaqDetailPage from './ui/page/FaqDetailPage';
import QnaRegisterContainer from './ui/logic/QnaRegisterContainer';
import QnaDetailPage from './ui/page/QnaDetailPage';
import AnsweredDetailContainer from './ui/logic/AnsweredDetailContainer';


class Routes extends React.PureComponent {
  //
  render() {
    //
    return (
      <Switch>
        <Route exact path="/board/support/:boardId" component={BoardListPage} />
        <Route exact path="/board/support/notice-detail/:postId" component={NoticeDetailPage} />
        <Route exact path="/board/support/faq-detail/:postId" component={FaqDetailPage} />
        <Route exact path="/board/support-qna" component={QnaRegisterContainer} />
        <Route exact path="/board/support/qna-detail/:postId" component={QnaDetailPage} />
        <Route exact path="/board/support/answered-detail/:postId" component={AnsweredDetailContainer} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
