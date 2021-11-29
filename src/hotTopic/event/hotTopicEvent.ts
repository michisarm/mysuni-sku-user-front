import { reactAlert } from '@nara.platform/accent';
import { getCurrentHistory } from 'shared/store/HistoryStore';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

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

export function copyUrl(id: string) {
  const currentUrl = window.location.toString();
  const url = `${currentUrl.split('/hot-topic/')[0]}/hot-topic/${id}`;
  const textarea = document.createElement('textarea');
  textarea.value = url;
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 9999);
  document.execCommand('copy');
  document.body.removeChild(textarea);
  reactAlert({
    title: getPolyglotText('알림', 'cicl-학상본문-알림'),
    message: getPolyglotText('URL이 복사되었습니다.', 'mypage-유저모달-url'),
  });
}
