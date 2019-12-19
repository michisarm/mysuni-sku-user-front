
import { observable, action } from 'mobx';
import autobind from 'autobind-decorator';


@autobind
class ModalService {

  static instance: ModalService;

  @observable
  modalMap = new Map();


  @action
  changeModal(key: string, value: boolean) {
    this.modalMap.set(key, value);
  }

  @action
  initModalMap(key: string) {
    if (Array.isArray(key)) {
      key.map(mapKey => this.modalMap.delete(mapKey));
    } else {
      this.modalMap.delete(key);
    }
  }

}

ModalService.instance = new ModalService();

export default ModalService;
