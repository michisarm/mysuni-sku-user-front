import routePaths from 'myTraining/routePaths';
import { getCurrentHistory } from 'shared/store/HistoryStore';

export function onClickItem(page: string, id: string) {
  const currentHistory = getCurrentHistory();
  currentHistory?.push(routePaths.approvalPersonalLearningDetail(page, id));
}
