
import BoardService  from './present/logic/BoardService';
import CategoryService from './present/logic/CategoryService';
import PostService from './present/logic/PostService';
import AnswerService from './present/logic/AnswerService';


export default {
  board: {
    boardService: BoardService.instance,
    categoryService: CategoryService.instance,
    postService: PostService.instance,
    answerService: AnswerService.instance,
  },
};

export {
  BoardService,
  CategoryService,
  PostService,
  AnswerService,
};
