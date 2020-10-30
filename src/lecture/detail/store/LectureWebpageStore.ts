import LectureWebpage from '../viewModel/LectureWebpage';
import { createStore } from './Store';

const [setLectureWebpage, onLectureWebpage, getLectureWebpage] = createStore<
  LectureWebpage
>();

export { setLectureWebpage, onLectureWebpage, getLectureWebpage };
