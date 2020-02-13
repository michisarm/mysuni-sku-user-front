
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import BoardListPage from './ui/page/BoardListPage';
import NoticeDetailContainer from './ui/logic/NoticeDetailContainer';
import FaqDetailContainer from './ui/logic/FaqDetailContainer';
import QnaRegisterContainer from './ui/logic/QnaRegisterContainer';
import QnaDetailContainer from './ui/logic/QnaDetailContainer';
import AnsweredDetailContainer from './ui/logic/AnsweredDetailContainer';


class Routes extends React.PureComponent {
  //
  render() {
    //
    return (
      <Switch>
        <Route exact path="/board/support/:boardId" component={BoardListPage} />
        <Route exact path="/board/support/notice-detail/:postId" component={NoticeDetailContainer} />
        <Route exact path="/board/support/faq-detail/:postId" component={FaqDetailContainer} />
        <Route exact path="/board/support-qna" component={QnaRegisterContainer} />
        <Route exact path="/board/support/qna-detail/:postId" component={QnaDetailContainer} />
        <Route exact path="/board/support/answered-detail/:postId" component={AnsweredDetailContainer} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
