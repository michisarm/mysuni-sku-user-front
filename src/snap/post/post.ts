
import { actionHandler } from '../../shared';

const post = {
  showPost: (postId: string) => {
    actionHandler.dispatchAction('handleOpen', postId);
  },
};

export default post;
