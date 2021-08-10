import ReactGA from 'react-ga';
import routePaths from 'myTraining/routePaths';
import { getMyTrainingRouteParams } from 'myTraining/routeParams';
import { getCurrentHistory } from 'shared/store/HistoryStore';
import { requestAplListWithPage } from './presonalCompletedList.services';
import { scrollSave } from 'myTraining/useScrollMove';

const PAGE_SIZE = 20;

export const onClickSeeMore = async () => {
  const currentHistory = getCurrentHistory();
  const params = getMyTrainingRouteParams();
  if (params === undefined) {
    return;
  }

  const currentPageNo = parseInt(params.pageNo);
  const nextPageNo = currentPageNo + 1;
  const limit = PAGE_SIZE;
  const offset = currentPageNo * PAGE_SIZE;

  requestAplListWithPage(offset, limit);

  setTimeout(() => {
    ReactGA.pageview(window.location.pathname, [], 'Learning');
  }, 1000);

  currentHistory?.replace(`./${nextPageNo}`);
};

export const onClickItem = (page: string, id: string) => {
  const currentHistory = getCurrentHistory();
  scrollSave();
  currentHistory?.push(routePaths.approvalPersonalLearningDetail(page, id));
};
