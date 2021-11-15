import { showAlert } from '../alert/Alert';

export function copyUrl(url: string) {
  const textarea = document.createElement('textarea');
  textarea.value = url;
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 9999);
  document.execCommand('copy');
  document.body.removeChild(textarea);
  showAlert({ title: '알림', message: 'URL이 복사되었습니다.' });
}
