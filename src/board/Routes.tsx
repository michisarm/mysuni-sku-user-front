
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import BoardListPage from './ui/page/BoardListPage';
import NoticeDetailPage from './ui/page/NoticeDetailPage';
import FaqDetailPage from './ui/page/FaqDetailPage';
import QnaRegisterPage from './ui/page/QnaRegisterPage';
import QnaModifyPage from './ui/page/QnaModifyPage';
import QnaDetailPage from './ui/page/QnaDetailPage';
import AnswerDetailPage from './ui/page/AnswerDetailPage';


class Routes extends React.PureComponent {
  //
  render() {
    //
    return (
      <Switch>
        <Route exact path="/board/support/:boardId" component={BoardListPage} />
        <Route exact path="/board/support/notice-detail/:postId" component={NoticeDetailPage} />
        <Route exact path="/board/support/faq-detail/:postId" component={FaqDetailPage} />
        <Route exact path="/board/support-qna" component={QnaRegisterPage} />
        <Route exact path="/board/support/qna-modify/:postId" component={QnaModifyPage} />
        <Route exact path="/board/support/qna-detail/:postId" component={QnaDetailPage} />
        <Route exact path="/board/support/answered-detail/:postId" component={AnswerDetailPage} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
