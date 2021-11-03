import { getCurrentHistory } from 'shared/store/HistoryStore';

export function onClickHotTopic(id: string) {
  const history = getCurrentHistory();
  if (history !== undefined) {
    history.push(`/hot-topic/${id}`);
  }
}

export function onClickHotTopicCard(id: string) {
  const history = getCurrentHistory();
  if (history !== undefined) {
    history.push(`/lecture/card/${id}/view`);
  }
}
