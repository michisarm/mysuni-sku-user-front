import { AplService } from 'myTraining/stores';

export function onChangeFile(fileBoxId: string) {
  AplService.instance.changeAplProps('fileIds', fileBoxId);
}
