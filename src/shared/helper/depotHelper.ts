import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { EXTENSION_WHITELIST, DepotFileViewModel } from '@nara.drama/depot';


export function sizeValidator(file: File) {
  if (file.size > 1024 * 1024 * 10) {
    reactAlert({ title: '알림', message: '10MB 이하의 파일을 업로드 해주세요!!!!' });
    return false;
  }
  return true;
}

export function extensionValidator(file: File) {
  if (!file.name.match(EXTENSION_WHITELIST)) {
    reactAlert({ title: '알림', message: `${file.type} 형식은 업로드 할 수 없습니다.` });
    return false;
  }
  return true;
}

export function duplicationValidator(file: File, depotFiles: DepotFileViewModel[] | undefined) {
  return new Promise(resolve => {
    if (!depotFiles || !depotFiles.some(depotFile => depotFile.name === file.name)) {
      resolve(true);
    } else {
      reactConfirm({
        title: '알림',
        message: '중복된 파일이름이 존재합니다. 덮어쓰시겠습니까?',
        onOk: () => resolve(true),
        onCancel: () => resolve(false),
      });
    }
  });
}

export default {
  sizeValidator,
  extensionValidator,
  duplicationValidator,
};

