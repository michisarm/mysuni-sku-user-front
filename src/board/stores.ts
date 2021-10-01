import BoardService from './present/logic/BoardService';
import CategoryService from './present/logic/CategoryService';
import PostService from './present/logic/PostService';
import AnswerService from './present/logic/AnswerService';
import SupportService from './present/logic/SupportService';

export default {
  board: {
    boardService: BoardService.instance,
    categoryService: CategoryService.instance,
    postService: PostService.instance,
    answerService: AnswerService.instance,
    supportService: SupportService.instance,
  },
};

export {
  BoardService,
  CategoryService,
  PostService,
  AnswerService,
  SupportService,
};
