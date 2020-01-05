import BookMainContainer from './ui/logic/BookMainContainer';
import NoticeDetailContainer from './ui/logic/NoticeDetailContainer';
import QnaRegisterContainer from './ui/logic/QnaRegisterContainer';
import QnaDetailContainer from './ui/logic/QnaDetailContainer';
import FaqDetailContainer from './ui/logic/FaqDetailContainer';
import AnsweredDetailContainer from './ui/logic/AnsweredDetailContainer';
import BoardService  from './present/logic/BoardService';
import CategoryService from './present/logic/CategoryService';
import PostService from './present/logic/PostService';
import AnswerService from './present/logic/AnswerService';

export const boardStores = {
  board: {
    boardService: BoardService.instance,
    categoryService: CategoryService.instance,
    postService: PostService.instance,
    answerService: AnswerService.instance,
  },
};


export {
  BookMainContainer,
  NoticeDetailContainer,
  QnaRegisterContainer,
  QnaDetailContainer,
  FaqDetailContainer,
  AnsweredDetailContainer,
  BoardService,
  CategoryService,
  PostService,
  AnswerService,
};
