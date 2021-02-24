import DashBoardSentence from '../viewModel/DashBoardSentence';
import BadgeLearningTime from '../viewModel/DashBoardSentence';
import { createStore } from './Store';

const [
    setDashBoardSentenceItem, 
    onDashBoardSentenceItem, 
    getDashBoardSentenceItem,
    useDashBoardSentenceItem
] = createStore<DashBoardSentence>(
    {
        dashboardSentence: [],
        recentlyShowNumber: 0
    }
);

export {
    setDashBoardSentenceItem,
    onDashBoardSentenceItem,
    getDashBoardSentenceItem,
    useDashBoardSentenceItem
}